-- Allow admins and page owners to INSERT into pages table
DROP POLICY IF EXISTS "pages_admin_insert" ON public.pages;
CREATE POLICY "pages_admin_insert" ON public.pages
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() OR public.is_admin());
