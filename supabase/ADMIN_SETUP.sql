-- ============================================================
-- ADMIN USER SETUP
-- Run this AFTER greetingvibes786@gmail.com has signed up
-- ============================================================

-- Option 1: If you have a profiles table with role column
UPDATE public.profiles 
SET role = 'admin'
WHERE email = 'greetingvibes786@gmail.com';

-- Option 2: If you use auth.users metadata for roles
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', 
  '"admin"'
)
WHERE email = 'greetingvibes786@gmail.com';

-- Verify admin is set
SELECT email, raw_user_meta_data->>'role' as role 
FROM auth.users 
WHERE email = 'greetingvibes786@gmail.com';
