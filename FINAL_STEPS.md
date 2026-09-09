# ✅ Final Steps to Complete Setup

## ✅ DONE: Edge Function Deployed!
The automatic cleanup function is already deployed and ready.

## 🎯 What You Need to Do Now:

### 1️⃣ Run the Database Setup (5 minutes)

**Go to:** [Supabase SQL Editor](https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql)

**Copy and paste this entire file:**
```
supabase/SETUP_NO_CRON.sql
```

**Click "Run"**

This creates:
- ✅ Packages table (PKR 1,499 for 21 days, PKR 2,999 for 45 days)
- ✅ Automatic expiration system
- ✅ All necessary columns and triggers

---

### 2️⃣ Enable Automatic Daily Cleanup (2 minutes)

**Go to:** [Supabase Edge Functions](https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/functions)

**Steps:**
1. Find function: **"cleanup-expired-pages"** (already deployed!)
2. Click on it
3. Look for **"Cron"** or **"Schedule"** option
4. Set schedule to: **`0 2 * * *`** (runs daily at 2 AM)
5. Click **"Save"** or **"Enable"**

✅ **Now expired pages will be automatically deleted every day!**

---

### 3️⃣ Setup Admin User (1 minute)

**After** greetingvibes786@gmail.com signs up:

**Go to:** [Supabase SQL Editor](https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql)

**Run this:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb), 
  '{role}', 
  '"admin"'
)
WHERE email = 'greetingvibes786@gmail.com';
```

---

## 🧪 Test Everything Works

### Test 1: Check Packages Exist
```sql
SELECT name, price_pkr, duration_days FROM public.packages;
```
**Should show:** 2 packages (1499/21 days and 2999/45 days)

### Test 2: Check Columns Added
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'pages' 
AND column_name IN ('package_id', 'activated_at', 'expires_at');
```
**Should show:** All 3 columns

### Test 3: Test Cleanup Function
```sql
SELECT public.cleanup_expired_pages();
```
**Should run without errors**

### Test 4: Test Edge Function
Go to: Edge Functions → cleanup-expired-pages → click **"Invoke"**
**Should return:** Success message

---

## ✅ Checklist

- [ ] Step 1: Run `SETUP_NO_CRON.sql` in Supabase
- [ ] Step 2: Enable cron schedule for Edge Function (`0 2 * * *`)
- [ ] Step 3: Make admin user (after signup)
- [ ] Test 1: Verify packages exist
- [ ] Test 2: Verify columns added
- [ ] Test 3: Test cleanup function works
- [ ] Test 4: Test Edge Function works

---

## 🎉 Once Complete

Your system will have:
- ✅ **2 packages:** PKR 1,499 (21 days) and PKR 2,999 (45 days)
- ✅ **Automatic expiration:** Pages expire after duration
- ✅ **Automatic deletion:** Expired pages deleted daily at 2 AM
- ✅ **Admin user:** greetingvibes786@gmail.com
- ✅ **Consistent pricing:** Same prices across entire website

**Everything will work automatically!** No manual cleanup needed. 🚀
