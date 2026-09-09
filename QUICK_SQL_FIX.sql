-- QUICK FIX - Copy this entire thing and run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/sql/new

-- 1. Create enum type
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('user', 'support', 'moderator', 'admin');
  END IF;
END $$;

-- 2. Add role column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user'::public.user_role;

-- 3. Make both emails admin
UPDATE public.profiles SET role = 'admin'::public.user_role, updated_at = NOW() 
WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');

-- 4. Verify (should show both emails as admin)
SELECT email, role FROM public.profiles WHERE email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com');
