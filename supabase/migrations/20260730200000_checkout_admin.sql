-- ============================================================
-- Checkout, Admin Approval, and Publishing workflow
-- ============================================================

-- Add pending_approval to page_status enum
ALTER TYPE public.page_status ADD VALUE IF NOT EXISTS 'pending_approval';

-- Add payment fields to orders
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS payment_method     TEXT,
  ADD COLUMN IF NOT EXISTS payment_screenshot TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_sent      BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS admin_notes        TEXT,
  ADD COLUMN IF NOT EXISTS page_id            UUID REFERENCES public.pages(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS currency_display   TEXT NOT NULL DEFAULT 'PKR';

-- Index for quick admin lookups
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_page ON public.orders(page_id);

-- Admin can update orders (approve/reject)
DROP POLICY IF EXISTS "orders_admin_update" ON public.orders;
CREATE POLICY "orders_admin_update" ON public.orders
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Admin can read ALL orders
DROP POLICY IF EXISTS "orders_admin_all" ON public.orders;
CREATE POLICY "orders_admin_all" ON public.orders
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());

-- Admin can publish pages
DROP POLICY IF EXISTS "pages_admin_publish" ON public.pages;
CREATE POLICY "pages_admin_publish" ON public.pages
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Allow admins to SELECT all pages (needed for /admin/pages view)
DROP POLICY IF EXISTS "pages_admin_select_all" ON public.pages;
CREATE POLICY "pages_admin_select_all" ON public.pages
  FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_admin());
