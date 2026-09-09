-- Add role column to profiles table for easier role management
-- This replaces the complex user_roles table approach with a simple column

-- First, check if user_role enum exists, if not create it
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'support', 'moderator', 'admin');
  END IF;
END $$;

-- Add role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user'::public.user_role;

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Migrate existing data from user_roles table to profiles.role (if user_roles exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_roles') THEN
    -- Update profiles with admin role
    UPDATE public.profiles p
    SET role = 'admin'::public.user_role
    FROM public.user_roles ur
    WHERE p.id = ur.user_id AND ur.role = 'admin'::public.app_role;
    
    -- Update profiles with moderator role
    UPDATE public.profiles p
    SET role = 'moderator'::public.user_role
    FROM public.user_roles ur
    WHERE p.id = ur.user_id AND ur.role = 'moderator'::public.app_role;
    
    -- Update profiles with support role (if app_role has it)
    UPDATE public.profiles p
    SET role = 'support'::public.user_role
    FROM public.user_roles ur
    WHERE p.id = ur.user_id AND ur.role = 'support'::public.app_role;
  END IF;
END $$;

-- Update is_admin function to check profiles.role instead of user_roles
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

-- Create function to check any role
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

-- Update the admin user trigger to set role in profiles
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
    -- For non-admin users, just ensure profile exists with default role
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

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();

-- Grant permissions
GRANT SELECT ON public.profiles TO authenticated, anon;
GRANT UPDATE (role) ON public.profiles TO authenticated;

-- Add RLS policy for role updates (only admins can change roles)
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
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
      AND p.role = 'admin'::public.user_role
      AND p.deleted_at IS NULL
    )
  );

-- Make greetingvibes786@gmail.com admin if they already exist
UPDATE public.profiles 
SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email = 'greetingvibes786@gmail.com';

-- Make pashadev804@gmail.com admin if they already exist
UPDATE public.profiles 
SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email = 'pashadev804@gmail.com';

COMMENT ON COLUMN public.profiles.role IS 'User role for access control (user, support, moderator, admin)';
