-- ============================================================
-- CHECK ADMIN STATUS - Run this to see current state
-- ============================================================

-- 1. Check if role column exists in profiles table
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'profiles'
  AND column_name = 'role';

-- 2. Check if user_role enum exists
SELECT enumlabel 
FROM pg_enum 
WHERE enumtypid = (
  SELECT oid FROM pg_type WHERE typname = 'user_role'
)
ORDER BY enumsortorder;

-- 3. Check pashadev804@gmail.com profile
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
WHERE email = 'pashadev804@gmail.com';

-- 4. Check greetingvibes786@gmail.com profile
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
WHERE email = 'greetingvibes786@gmail.com';

-- 5. Check all users and their roles
SELECT 
  email,
  role,
  full_name,
  created_at
FROM public.profiles
ORDER BY created_at DESC
LIMIT 10;

-- ============================================================
-- Run this first to see what's the current state
-- Then we'll know what needs to be fixed
-- ============================================================
