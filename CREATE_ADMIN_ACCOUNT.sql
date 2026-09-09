-- ============================================================
-- CREATE ADMIN ACCOUNT FOR greetingvibes786@gmail.com
-- Run this in Supabase SQL Editor
-- ============================================================

-- Option 1: Best way - Just have them sign up normally
-- The trigger will automatically make them admin
-- They can sign up at: https://your-domain.com/auth/signup
-- Once they sign up, they will automatically be admin!

-- ============================================================

-- Option 2: If you need to create it manually NOW
-- Run this to check if trigger exists:
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  tgfoid::regproc as function_name
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created_admin';

-- If trigger doesn't exist, create it:
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

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();

-- ============================================================
-- VERIFICATION
-- ============================================================

-- Check if trigger is active
SELECT 
  tgname as trigger_name,
  tgenabled as enabled,
  'Trigger is active!' as status
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created_admin';

-- ============================================================
-- NOW: Have greetingvibes786@gmail.com sign up at your website
-- They will automatically become admin!
-- ============================================================

-- After they sign up, verify with:
-- SELECT email, role, full_name FROM public.profiles WHERE email = 'greetingvibes786@gmail.com';
