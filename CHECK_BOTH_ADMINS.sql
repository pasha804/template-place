-- Check all profiles to find greetingvibes786@gmail.com

-- 1. Check if greetingvibes786@gmail.com exists (exact match)
SELECT 'Exact Match Check' as check_type, email, role, full_name, created_at
FROM public.profiles
WHERE email = 'greetingvibes786@gmail.com';

-- 2. Check for similar emails (in case of typo)
SELECT 'Similar Email Check' as check_type, email, role, full_name, created_at
FROM public.profiles
WHERE email LIKE '%greeting%' OR email LIKE '%vibes%';

-- 3. Show ALL profiles
SELECT 'All Users' as check_type, email, role, full_name, created_at
FROM public.profiles
ORDER BY created_at DESC;

-- 4. If greetingvibes786@gmail.com doesn't exist, this will do nothing
-- But if it exists, it will make sure it's admin
UPDATE public.profiles 
SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email = 'greetingvibes786@gmail.com';

-- 5. Final check - show both admin emails
SELECT email, role, full_name
FROM public.profiles
WHERE role = 'admin'::public.user_role
ORDER BY email;
