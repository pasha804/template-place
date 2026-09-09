# 🔧 Fix Admin Role Issue - Run This in Supabase

## Problem
The error "column 'role' does not exist" happened because the `profiles` table didn't have a `role` column.

## Solution
Run the SQL below in your Supabase SQL Editor to fix this.

---

## Steps to Fix

### 1. Go to Supabase SQL Editor
Open: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/sql/new

### 2. Copy and Paste This SQL
Copy the ENTIRE content from `FIX_ADMIN_ROLES.sql` file in your project root, or use this:

```sql
-- Create user_role enum
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'support', 'moderator', 'admin');
  END IF;
END $$;

-- Add role column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user'::public.user_role;

-- Create index
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Update is_admin function
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

-- Create role check function
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

-- Create trigger function
CREATE OR REPLACE FUNCTION public.handle_admin_users()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com') THEN
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

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();

-- Add RLS policy
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

-- Make both emails admin RIGHT NOW
UPDATE public.profiles 
SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');

-- Verify it worked
SELECT email, role, full_name FROM public.profiles
WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');
```

### 3. Click "Run" or Press Ctrl+Enter

### 4. Check the Results
You should see a result table at the bottom showing both emails with role = "admin"

---

## What This Does

✅ Adds `role` column to `profiles` table  
✅ Makes **greetingvibes786@gmail.com** admin (if account exists)  
✅ Makes **pashadev804@gmail.com** admin (if account exists)  
✅ Sets up trigger so these emails are ALWAYS admin when they sign up  
✅ Updates admin checking functions to use the new column  
✅ Adds security policy so only admins can change roles  

---

## After Running This

1. Refresh your app
2. Go to `/admin/users`
3. You should now see all users with their roles
4. You can change any user's role using the dropdown
5. Both admin emails can manage roles

---

## Troubleshooting

**If you see "type user_role already exists":**
- That's OK, it means the enum was already created. The script handles this.

**If you don't see the admin role for your email:**
- Check if the email is EXACTLY correct (no spaces, correct spelling)
- Check if you're logged in with that email
- Try logging out and back in

**If role changes don't save:**
- Make sure you're logged in as an admin
- Check the browser console for errors
- Refresh the page

---

## Need Help?
Contact: +92 332 4967481 (WhatsApp)
