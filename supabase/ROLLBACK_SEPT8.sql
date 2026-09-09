-- ============================================================
-- ROLLBACK SCRIPT FOR SEPTEMBER 8, 2026 CHANGES
-- Run this in Supabase SQL Editor to revert all changes
-- ============================================================

-- 1. Drop package-related functions
DROP FUNCTION IF EXISTS public.cleanup_expired_pages CASCADE;
DROP FUNCTION IF EXISTS public.is_page_accessible CASCADE;
DROP FUNCTION IF EXISTS public.log_page_expiration CASCADE;

-- 2. Drop triggers
DROP TRIGGER IF EXISTS trg_page_set_expiration ON public.pages;
DROP TRIGGER IF EXISTS trg_log_page_expiration ON public.pages;
DROP FUNCTION IF EXISTS public.set_page_expiration CASCADE;

-- 3. Drop audit table
DROP TABLE IF EXISTS public.page_expiration_log CASCADE;

-- 4. Remove foreign key constraints
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_package_id_fkey;
ALTER TABLE public.pages DROP CONSTRAINT IF EXISTS pages_package_id_fkey;

-- 5. Remove package-related columns from orders
ALTER TABLE public.orders DROP COLUMN IF EXISTS package_id;

-- 6. Remove package-related columns from pages
ALTER TABLE public.pages DROP COLUMN IF EXISTS activated_at;
ALTER TABLE public.pages DROP COLUMN IF EXISTS package_id;

-- 7. Drop packages table
DROP TABLE IF EXISTS public.packages CASCADE;

-- 8. Remove admin email entry (if added)
DELETE FROM public.profiles 
WHERE email = 'greetingvibes786@gmail.com' 
AND role = 'admin';

-- 9. Restore original RLS policies
DROP POLICY IF EXISTS "pages_public_read_published" ON public.pages;
DROP POLICY IF EXISTS "pages_owner_all" ON public.pages;

CREATE POLICY "pages_public_read" ON public.pages 
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published' 
    AND deleted_at IS NULL 
    AND is_public = true
  );

CREATE POLICY "pages_owner_all" ON public.pages 
  FOR ALL TO authenticated 
  USING (
    (user_id = auth.uid() OR public.is_admin())
    AND deleted_at IS NULL
  );

-- ============================================================
-- ROLLBACK COMPLETE
-- ============================================================
