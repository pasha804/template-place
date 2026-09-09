-- ============================================================
-- COMPLETE DATABASE SETUP (WITHOUT CRON JOB)
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- ============ STEP 1: ROLLBACK OLD CHANGES ============
DROP FUNCTION IF EXISTS public.cleanup_expired_pages CASCADE;
DROP FUNCTION IF EXISTS public.is_page_accessible CASCADE;
DROP FUNCTION IF EXISTS public.log_page_expiration CASCADE;
DROP TRIGGER IF EXISTS trg_page_set_expiration ON public.pages;
DROP TRIGGER IF EXISTS trg_log_page_expiration ON public.pages;
DROP FUNCTION IF EXISTS public.set_page_expiration CASCADE;
DROP TABLE IF EXISTS public.page_expiration_log CASCADE;

-- Remove foreign keys if they exist
DO $$ 
BEGIN
    ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_package_id_fkey;
    ALTER TABLE public.pages DROP CONSTRAINT IF EXISTS pages_package_id_fkey;
EXCEPTION
    WHEN undefined_table THEN NULL;
    WHEN undefined_object THEN NULL;
END $$;

-- Remove columns if they exist
DO $$ 
BEGIN
    ALTER TABLE public.orders DROP COLUMN IF EXISTS package_id;
    ALTER TABLE public.pages DROP COLUMN IF EXISTS activated_at;
    ALTER TABLE public.pages DROP COLUMN IF EXISTS package_id;
EXCEPTION
    WHEN undefined_table THEN NULL;
    WHEN undefined_column THEN NULL;
END $$;

-- Drop packages table
DROP TABLE IF EXISTS public.packages CASCADE;

-- ============ STEP 2: CREATE PACKAGES TABLE ============
CREATE TABLE public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_pkr INT NOT NULL,
  duration_days INT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT packages_price_positive CHECK (price_pkr > 0),
  CONSTRAINT packages_duration_positive CHECK (duration_days > 0)
);

-- Grant permissions
GRANT SELECT ON public.packages TO anon, authenticated;
GRANT ALL ON public.packages TO service_role;

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "packages_public_read" ON public.packages;
CREATE POLICY "packages_public_read" ON public.packages 
  FOR SELECT TO anon, authenticated 
  USING (is_active = true);

DROP POLICY IF EXISTS "packages_admin_all" ON public.packages;
CREATE POLICY "packages_admin_all" ON public.packages 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trg_packages_updated ON public.packages;
CREATE TRIGGER trg_packages_updated 
  BEFORE UPDATE ON public.packages 
  FOR EACH ROW 
  EXECUTE FUNCTION public.set_updated_at();

-- Index for active packages
DROP INDEX IF EXISTS idx_packages_active;
CREATE INDEX idx_packages_active ON public.packages(is_active, sort_order) 
  WHERE is_active = true;

-- ============ STEP 3: INSERT PACKAGES ============
INSERT INTO public.packages (name, price_pkr, duration_days, description, features, sort_order)
VALUES 
  (
    '21-Day Package',
    1499,
    21,
    'Perfect for short-term celebrations and events',
    '["21 days access", "Full template customization", "Live website hosting", "Mobile responsive design", "WhatsApp sharing link"]'::jsonb,
    1
  ),
  (
    '45-Day Package',
    2999,
    45,
    'Ideal for extended celebrations and special occasions',
    '["45 days access", "Full template customization", "Live website hosting", "Mobile responsive design", "WhatsApp sharing link", "Priority support"]'::jsonb,
    2
  );

-- ============ STEP 4: ADD COLUMNS TO PAGES ============
ALTER TABLE public.pages 
  ADD COLUMN IF NOT EXISTS package_id UUID REFERENCES public.packages(id) ON DELETE RESTRICT;

ALTER TABLE public.pages 
  ADD COLUMN IF NOT EXISTS activated_at TIMESTAMPTZ;

-- Create index for package lookups
DROP INDEX IF EXISTS idx_pages_package;
CREATE INDEX idx_pages_package 
  ON public.pages(package_id) 
  WHERE package_id IS NOT NULL;

-- ============ STEP 5: CREATE EXPIRATION TRIGGER ============
CREATE OR REPLACE FUNCTION public.set_page_expiration()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public 
AS $$
DECLARE
  package_duration INT;
BEGIN
  IF NEW.status = 'published' AND NEW.package_id IS NOT NULL THEN
    SELECT duration_days INTO package_duration
    FROM public.packages
    WHERE id = NEW.package_id;

    IF package_duration IS NOT NULL THEN
      IF NEW.activated_at IS NULL THEN
        NEW.activated_at := now();
      END IF;
      NEW.expires_at := NEW.activated_at + (package_duration || ' days')::interval;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_page_set_expiration ON public.pages;
CREATE TRIGGER trg_page_set_expiration
  BEFORE INSERT OR UPDATE OF status, package_id, activated_at ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_page_expiration();

-- ============ STEP 6: CREATE CLEANUP FUNCTION ============
CREATE OR REPLACE FUNCTION public.cleanup_expired_pages()
RETURNS TABLE (
  pages_deleted INT,
  data_removed TEXT
) 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public 
AS $$
DECLARE
  v_deleted_count INT := 0;
  expired_page_ids UUID[];
BEGIN
  SELECT array_agg(id) INTO expired_page_ids
  FROM public.pages
  WHERE expires_at IS NOT NULL 
    AND expires_at <= now()
    AND deleted_at IS NULL;

  v_deleted_count := coalesce(array_length(expired_page_ids, 1), 0);

  IF v_deleted_count > 0 THEN
    BEGIN
      DELETE FROM public.page_versions WHERE page_id = ANY(expired_page_ids);
    EXCEPTION WHEN undefined_table THEN NULL;
    END;
    
    BEGIN
      DELETE FROM public.page_views WHERE page_id = ANY(expired_page_ids);
    EXCEPTION WHEN undefined_table THEN NULL;
    END;
    
    UPDATE public.pages
    SET 
      deleted_at = now(),
      is_public = false,
      status = CASE 
        WHEN status::text = 'published' THEN 'draft'::page_status 
        ELSE status 
      END
    WHERE id = ANY(expired_page_ids);
  END IF;

  RETURN QUERY SELECT v_deleted_count, 
    format('Deleted %s expired pages and their related data', v_deleted_count);
END;
$$;

GRANT EXECUTE ON FUNCTION public.cleanup_expired_pages TO service_role, authenticated;

-- ============ STEP 7: ADD PACKAGE TO ORDERS ============
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS package_id UUID REFERENCES public.packages(id) ON DELETE RESTRICT;

DROP INDEX IF EXISTS idx_orders_package;
CREATE INDEX idx_orders_package 
  ON public.orders(package_id) 
  WHERE package_id IS NOT NULL;

-- ============ STEP 8: UPDATE RLS POLICIES ============
DROP POLICY IF EXISTS "pages_public_read_published" ON public.pages;
DROP POLICY IF EXISTS "pages_public_read" ON public.pages;

CREATE POLICY "pages_public_read_published" ON public.pages 
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published' 
    AND deleted_at IS NULL 
    AND is_public = true
    AND (expires_at IS NULL OR expires_at > now())
  );

DROP POLICY IF EXISTS "pages_owner_all" ON public.pages;
CREATE POLICY "pages_owner_all" ON public.pages 
  FOR ALL TO authenticated 
  USING (
    (user_id = auth.uid() OR public.is_admin())
    AND deleted_at IS NULL
  ) 
  WITH CHECK (
    (user_id = auth.uid() OR public.is_admin())
    AND deleted_at IS NULL
  );

-- ============ COMMENTS ============
COMMENT ON TABLE public.packages IS 'Package definitions for pricing system with time-based expiration';
COMMENT ON COLUMN public.pages.package_id IS 'Package purchased for this page, determines expiration duration';
COMMENT ON COLUMN public.pages.activated_at IS 'Timestamp when package was activated (when published)';
COMMENT ON FUNCTION public.cleanup_expired_pages IS 'Automatically deletes expired pages and their data';
COMMENT ON FUNCTION public.set_page_expiration IS 'Automatically sets expiration date when page is published';

-- ============ VERIFICATION ============
SELECT '✅ Setup Complete!' AS status;
SELECT 'Packages created:' AS info, COUNT(*) AS count FROM public.packages;
SELECT name, price_pkr, duration_days FROM public.packages ORDER BY sort_order;

-- ============================================================
-- SETUP COMPLETE!
-- 
-- Note: Cron job not set up (requires pg_cron extension)
-- You can manually run cleanup with: SELECT public.cleanup_expired_pages();
-- 
-- Or setup Supabase Edge Function to run daily
-- 
-- Next: Make admin user with ADMIN_SETUP.sql
-- ============================================================
