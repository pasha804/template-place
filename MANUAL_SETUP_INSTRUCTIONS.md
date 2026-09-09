# 📋 Manual Supabase Setup Instructions

Since we reverted the git history, we need to manually apply the database changes.

## Step 1: Rollback Old Changes (if any exist)

Go to Supabase SQL Editor and run this script:

**File:** `supabase/ROLLBACK_SEPT8.sql`

Or copy-paste this:

```sql
-- ROLLBACK SCRIPT
DROP FUNCTION IF EXISTS public.cleanup_expired_pages CASCADE;
DROP FUNCTION IF EXISTS public.is_page_accessible CASCADE;
DROP FUNCTION IF EXISTS public.log_page_expiration CASCADE;
DROP TRIGGER IF EXISTS trg_page_set_expiration ON public.pages;
DROP TRIGGER IF EXISTS trg_log_page_expiration ON public.pages;
DROP FUNCTION IF EXISTS public.set_page_expiration CASCADE;
DROP TABLE IF EXISTS public.page_expiration_log CASCADE;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_package_id_fkey;
ALTER TABLE public.pages DROP CONSTRAINT IF EXISTS pages_package_id_fkey;
ALTER TABLE public.orders DROP COLUMN IF EXISTS package_id;
ALTER TABLE public.pages DROP COLUMN IF EXISTS activated_at;
ALTER TABLE public.pages DROP COLUMN IF EXISTS package_id;
DROP TABLE IF EXISTS public.packages CASCADE;
```

## Step 2: Apply New Package System

Go to Supabase SQL Editor and run this script:

**File:** `supabase/migrations/20260909000000_create_packages_system.sql`

This will create:
- ✅ Packages table with 2 packages (PKR 1,499 for 21 days, PKR 2,999 for 45 days)
- ✅ Automatic expiration system
- ✅ Auto-deletion of expired pages
- ✅ Proper relationships and triggers

## Step 3: Setup Admin Email

After the migration runs, you need to:

1. Have the user `greetingvibes786@gmail.com` sign up on your website
2. Then run this SQL to make them admin:

```sql
-- Make user admin
UPDATE public.profiles 
SET role = 'admin'
WHERE email = 'greetingvibes786@gmail.com';
```

## Step 4: Setup Automatic Cleanup (Optional)

If your Supabase project supports `pg_cron`, run:

**File:** `supabase/migrations/20260909000001_setup_auto_cleanup.sql`

This sets up daily automatic cleanup at 2 AM.

**Alternative:** If pg_cron is not available:
- Go to Supabase Dashboard → Edge Functions
- Create a new function called "cleanup-expired-pages"
- Use the Supabase cron to call it daily

## Step 5: Verify Installation

Run this to verify everything is set up:

```sql
-- Check packages exist
SELECT * FROM public.packages ORDER BY sort_order;

-- Should show:
-- 1. 21-Day Package | 1499 PKR | 21 days
-- 2. 45-Day Package | 2999 PKR | 45 days

-- Check pages table has new columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'pages' 
AND column_name IN ('package_id', 'activated_at', 'expires_at');

-- Should show all three columns
```

## Verification Checklist

- [ ] Old migrations rolled back
- [ ] Packages table created
- [ ] Two packages exist (1499/21d and 2999/45d)
- [ ] Pages table has package_id column
- [ ] Pages table has activated_at column  
- [ ] Pages table has expires_at column (should already exist)
- [ ] Expiration trigger created
- [ ] Cleanup function created
- [ ] Admin user configured
- [ ] Cron job scheduled (optional)

## What This Does

1. **When user selects a package:**
   - Page is created with `package_id`
   - Status is `draft` or `pending_approval`

2. **When admin approves (status → published):**
   - `activated_at` is set to now()
   - `expires_at` is automatically calculated (activated_at + package duration)
   - Page goes live

3. **When time expires:**
   - Cron job runs daily
   - Finds pages where `expires_at <= now()`
   - Soft deletes them (sets `deleted_at`, `status = 'expired'`)
   - Removes related data (versions, views)
   - User can no longer see it in dashboard
   - Public cannot access it

4. **Prices across website:**
   - Homepage: Shows PKR 1,499 and PKR 2,999
   - Package selection: Shows PKR 1,499 and PKR 2,999
   - Checkout: Shows selected package price
   - Admin panel: Shows package price in orders

## Troubleshooting

**If migration fails:**
1. Check if old tables/functions still exist
2. Run rollback script again
3. Retry migration

**If prices don't match:**
- Check `public.packages` table has correct prices
- Frontend components pull from this table
- Update `src/components/home/PricingSection.tsx` if hardcoded

**If expiration doesn't work:**
- Check trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'trg_page_set_expiration';`
- Check cron job: `SELECT * FROM cron.job;`
- Manually run: `SELECT public.cleanup_expired_pages();`
