# ⚡ DO THIS NOW - 3 Simple Steps

## ✅ Status: Code is ready. Database needs setup.

---

## Step 1️⃣: Setup Database (5 minutes)

1. **Open**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/sql

2. **In VS Code**: Open file `supabase/SETUP_NO_CRON.sql`

3. **Copy**: Select ALL text (Ctrl+A)

4. **Paste**: Into Supabase SQL Editor

5. **Run**: Click the "Run" button

6. **Wait**: For "Success ✓" message

✅ **Done!** Packages table created with correct prices.

---

## Step 2️⃣: Deploy Edge Function (2 minutes)

### Option A - Command Line:
```bash
supabase login
supabase link --project-ref qizoleiqjxylpiickeye
supabase functions deploy cleanup-expired-pages
```

### Option B - Dashboard:
1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/functions
2. Create function: `cleanup-expired-pages`
3. Copy code from: `supabase/functions/cleanup-expired-pages/index.ts`
4. Deploy

✅ **Done!** Auto-cleanup function deployed.

---

## Step 3️⃣: Enable Cron (1 minute)

1. In Edge Functions, find: `cleanup-expired-pages`
2. Enable cron schedule: **`0 2 * * *`**
3. Click "Save"

✅ **Done!** Pages will auto-delete after expiration.

---

## Bonus Step: Set Admin (After Signup)

**After** signing up with `greetingvibes786@gmail.com`:

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/sql
2. Copy from: `supabase/ADMIN_SETUP.sql`
3. Paste and Run

✅ **Done!** Admin access enabled.

---

## 🧪 Verify Everything Works

### Quick Test:
```sql
-- Run this in Supabase SQL Editor
SELECT name, price_pkr, duration_days FROM packages;
```

### Expected Result:
```
21-Day Package | 1499 | 21
45-Day Package | 2999 | 45
```

✅ If you see this → Everything is working!

---

## 📞 Quick Links

**Database Setup**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/sql  
**Edge Functions**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/functions  
**GitHub Repo**: https://github.com/pasha804/template-place

---

## 🎉 What Changed

✅ **New Supabase Project**: `qizoleiqjxylpiickeye`  
✅ **Fixed Prices**: Rs. 1,499 (21 days) & Rs. 2,999 (45 days)  
✅ **Pushed to GitHub**: Commit `c185a6b`  
✅ **Build Passed**: No errors  

---

## ⏱️ Time Required

- Step 1: **5 minutes** (database setup)
- Step 2: **2 minutes** (edge function)
- Step 3: **1 minute** (enable cron)

**Total: ~8 minutes** to full setup! 🚀

---

**Start here**: Open Supabase SQL Editor and run `SETUP_NO_CRON.sql` 👆
