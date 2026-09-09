-- Add pashadev804@gmail.com as admin
-- This migration makes pashadev804@gmail.com an admin user when they sign up

-- Create a function to auto-assign admin role for specific emails
CREATE OR REPLACE FUNCTION public.handle_admin_users()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email should be admin
  IF NEW.email IN ('greetingvibes786@gmail.com', 'pashadev804@gmail.com') THEN
    -- Update or insert profile with admin role
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
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;

-- Create trigger on auth.users  
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_admin_users();
