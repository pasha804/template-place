-- ============================================================
-- FIX ADMIN ROLES - Run this in Supabase SQL Editor
-- This adds role column to profiles and makes both emails admin
-- ============================================================

-- Step 1: Create user_role enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'support', 'moderator', 'admin');
  END IF;
END $$;

-- Step 2: Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user'::public.user_role;

-- Step 3: Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Step 4: Update is_admin function to check profiles.role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'::public.user_role
    AND deleted_at IS NULL
  );
$$;

-- Step 5: Create function to check any role
CREATE OR REPLACE FUNCTION public.has_role(check_role public.user_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = check_role
    AND deleted_at IS NULL
  );
$$;

-- Step 6: Create trigger function for auto-admin assignment
CREATE OR REPLACE FUNCTION public.handle_admin_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email should be admin
  IF NEW.email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com') THEN
    -- Insert or update profile with admin role
    INSERT INTO public.profiles (id, role, full_name, email, created_at, updated_at)
    VALUES (
      NEW.id,
      'admin'::public.user_role,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
      NEW.email,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      role = 'admin'::public.user_role,
      email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      updated_at = NOW();
  ELSE
    -- For non-admin users, ensure profile exists with default role
    INSERT INTO public.profiles (id, role, full_name, email, created_at, updated_at)
    VALUES (
      NEW.id,
      'user'::public.user_role,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
      NEW.email,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 7: Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();

-- Step 8: Add RLS policy for role updates (only admins can change roles)
DROP POLICY IF EXISTS "profiles_admin_update_role" ON public.profiles;
CREATE POLICY "profiles_admin_update_role" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'admin'::public.user_role
      AND p.deleted_at IS NULL
    )
  );

-- Step 9: Make existing users admin
UPDATE public.profiles 
SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');

-- Step 10: Verify admin users
SELECT 
  email,
  role,
  full_name,
  created_at
FROM public.profiles
WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');

-- ============================================================
-- DONE! Both emails should now be admin.
-- ============================================================
