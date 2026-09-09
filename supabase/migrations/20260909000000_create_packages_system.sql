-- ============================================================
-- PACKAGE SYSTEM WITH AUTOMATIC EXPIRATION
-- Created: September 9, 2026
-- ============================================================

-- ============ 1. CREATE PACKAGES TABLE ============
CREATE TABLE IF NOT EXISTS public.packages (
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
CREATE POLICY "packages_public_read" ON public.packages 
  FOR SELECT TO anon, authenticated 
  USING (is_active = true);

CREATE POLICY "packages_admin_all" ON public.packages 
  FOR ALL TO authenticated 
  USING (public.is_admin()) 
  WITH CHECK (public.is_admin());

-- Trigger for updated_at
CREATE TRIGGER trg_packages_updated 
  BEFORE UPDATE ON public.packages 
  FOR EACH ROW 
  EXECUTE FUNCTION public.set_updated_at();

-- Index for active packages
CREATE INDEX idx_packages_active ON public.packages(is_active, sort_order) 
  WHERE is_active = true;

-- ============ 2. INSERT PACKAGE DEFINITIONS ============
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
  )
ON CONFLICT DO NOTHING;

-- ============ 3. ADD PACKAGE COLUMNS TO PAGES ============
DO $$ 
BEGIN
  -- Add package_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'pages' 
    AND column_name = 'package_id'
  ) THEN
    ALTER TABLE public.pages 
      ADD COLUMN package_id UUID REFERENCES public.packages(id) ON DELETE RESTRICT;
  END IF;

  -- Add activated_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'pages' 
    AND column_name = 'activated_at'
  ) THEN
    ALTER TABLE public.pages 
      ADD COLUMN activated_at TIMESTAMPTZ;
  END IF;
END $$;

-- Create index for package lookups
CREATE INDEX IF NOT EXISTS idx_pages_package 
  ON public.pages(package_id) 
  WHERE package_id IS NOT NULL;

-- ============ 4. AUTOMATIC EXPIRATION TRIGGER ============
-- Function to set expires_at based on package duration
CREATE OR REPLACE FUNCTION public.set_page_expiration()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public 
AS $$
DECLARE
  package_duration INT;
BEGIN
  -- Only set expiration when status changes to 'published' and package_id is set
  IF NEW.status = 'published' AND NEW.package_id IS NOT NULL THEN
    -- Get the duration from the package
    SELECT duration_days INTO package_duration
    FROM public.packages
    WHERE id = NEW.package_id;

    IF package_duration IS NOT NULL THEN
      -- Set activated_at if not already set
      IF NEW.activated_at IS NULL THEN
        NEW.activated_at := now();
      END IF;

      -- Calculate expires_at based on activated_at + duration
      NEW.expires_at := NEW.activated_at + (package_duration || ' days')::interval;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS trg_page_set_expiration ON public.pages;
CREATE TRIGGER trg_page_set_expiration
  BEFORE INSERT OR UPDATE OF status, package_id, activated_at ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.set_page_expiration();

-- ============ 5. AUTOMATIC CLEANUP FUNCTION ============
-- Function to delete expired pages and their data
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
  -- Find all expired pages
  SELECT array_agg(id) INTO expired_page_ids
  FROM public.pages
  WHERE expires_at IS NOT NULL 
    AND expires_at <= now()
    AND deleted_at IS NULL;

  -- Count how many will be deleted
  v_deleted_count := coalesce(array_length(expired_page_ids, 1), 0);

  IF v_deleted_count > 0 THEN
    -- Delete related data first
    DELETE FROM public.page_versions WHERE page_id = ANY(expired_page_ids);
    DELETE FROM public.page_views WHERE page_id = ANY(expired_page_ids);
    
    -- Soft delete pages by setting deleted_at
    UPDATE public.pages
    SET 
      deleted_at = now(),
      is_public = false,
      status = 'expired'
    WHERE id = ANY(expired_page_ids);
  END IF;

  RETURN QUERY SELECT v_deleted_count, 
    format('Deleted %s expired pages and their related data', v_deleted_count);
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.cleanup_expired_pages TO service_role;

-- ============ 6. ADD PACKAGE RELATIONSHIP TO ORDERS ============
DO $$ 
BEGIN
  -- Add package_id column to orders if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'orders' 
    AND column_name = 'package_id'
  ) THEN
    ALTER TABLE public.orders 
      ADD COLUMN package_id UUID REFERENCES public.packages(id) ON DELETE RESTRICT;
  END IF;
END $$;

-- Create index for package-order lookups
CREATE INDEX IF NOT EXISTS idx_orders_package 
  ON public.orders(package_id) 
  WHERE package_id IS NOT NULL;

-- ============ 7. UPDATE RLS POLICIES FOR EXPIRATION ============
-- Drop and recreate pages policies to include expiration checks

-- Drop existing policies
DROP POLICY IF EXISTS "pages_public_read_published" ON public.pages;
DROP POLICY IF EXISTS "pages_public_read" ON public.pages;

-- Create new policy with expiration enforcement
CREATE POLICY "pages_public_read_published" ON public.pages 
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published' 
    AND deleted_at IS NULL 
    AND is_public = true
    AND (expires_at IS NULL OR expires_at > now())
  );

-- Owner policy - allow access even if expired (for viewing only)
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

-- ============ 8. ADD ADMIN EMAIL ============
-- Add greetingvibes786@gmail.com as admin
-- This will be done via application since we need the user to exist first
-- The application will check and add admin role on first login

-- ============ COMMENTS ============
COMMENT ON TABLE public.packages IS 'Package definitions for pricing system with time-based expiration';
COMMENT ON COLUMN public.pages.package_id IS 'Package purchased for this page, determines expiration duration';
COMMENT ON COLUMN public.pages.activated_at IS 'Timestamp when package was activated (when published)';
COMMENT ON COLUMN public.pages.expires_at IS 'Automatic expiration timestamp based on package duration';
COMMENT ON FUNCTION public.cleanup_expired_pages IS 'Automatically deletes expired pages and their data';
COMMENT ON FUNCTION public.set_page_expiration IS 'Automatically sets expiration date when page is published';

-- ============================================================
-- MIGRATION COMPLETE
-- Next: Set up cron job to run cleanup_expired_pages() daily
-- ============================================================
