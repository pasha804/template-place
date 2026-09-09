# 🚀 Quick Setup Guide

## Just 3 Steps!

### Step 1: Run Database Setup

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a new query
3. Copy the ENTIRE contents of: **`supabase/SETUP_NO_CRON.sql`**
4. Paste it into the SQL Editor
5. Click **"Run"**

✅ This will:
- Remove old package system (if any)
- Create packages table with 2 packages (PKR 1,499 / PKR 2,999)
- Add columns to pages and orders tables
- Create automatic expiration system
- Create cleanup function

### Step 2: Setup Automatic Cleanup (IMPORTANT!)

**Option A - Using CLI (Recommended):**
```bash
supabase login
supabase link --project-ref ptcbaphzoceumekzymsa
supabase functions deploy cleanup-expired-pages
```

Then in Supabase Dashboard → Edge Functions → enable cron: `0 2 * * *`

**Option B - Using Dashboard:**
1. Go to **Supabase Dashboard** → **Edge Functions** → **Create Function**
2. Name: `cleanup-expired-pages`
3. Copy code from: `supabase/functions/cleanup-expired-pages/index.ts`
4. Deploy
5. Enable cron schedule: `0 2 * * *` (daily at 2 AM)

✅ This makes expired pages auto-delete every day!

### Step 3: Make User Admin (After They Sign Up)

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

-- Test cleanup function
SELECT public.cleanup_expired_pages();
```

---

## ✅ That's It!

Your system now has:
- ✅ PKR 1,499 for 21 days
- ✅ PKR 2,999 for 45 days
- ✅ Automatic expiration
- ✅ **Auto-deletion every day at 2 AM** (if you did Step 2!)
- ✅ Admin user configured

The website will automatically show correct prices everywhere!
