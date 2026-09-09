# 🚀 Quick Setup Guide

## Just 2 Steps!

### Step 1: Run Database Setup

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a new query
3. Copy the ENTIRE contents of: **`supabase/COMPLETE_SETUP.sql`**
4. Paste it into the SQL Editor
5. Click **"Run"**

✅ This will:
- Remove old package system (if any)
- Create packages table with 2 packages (PKR 1,499 / PKR 2,999)
- Add columns to pages and orders tables
- Create automatic expiration system
- Create cleanup function
- Setup cron job (if available)

### Step 2: Make User Admin (After They Sign Up)

1. Have the user sign up with email: **greetingvibes786@gmail.com**
2. Go to **Supabase Dashboard** → **SQL Editor**
3. Copy contents of: **`supabase/ADMIN_SETUP.sql`**
4. Paste and click **"Run"**

✅ This makes greetingvibes786@gmail.com an admin

---

## Verify It Worked

Run this in SQL Editor:

```sql
-- Should show 2 packages
SELECT name, price_pkr, duration_days FROM public.packages;

-- Should show 3 columns
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'pages' 
AND column_name IN ('package_id', 'activated_at', 'expires_at');
```

---

## ✅ That's It!

Your system now has:
- ✅ PKR 1,499 for 21 days
- ✅ PKR 2,999 for 45 days
- ✅ Automatic expiration
- ✅ Auto-deletion of expired pages
- ✅ Admin user configured

The website will automatically show correct prices everywhere!
