# 🤖 Automatic Cleanup Setup

## Set Up Automatic Daily Deletion of Expired Pages

### Step 1: Deploy Edge Function

Run these commands in your terminal:

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref qizoleiqjxylpiickeye

# Deploy the cleanup function
supabase functions deploy cleanup-expired-pages
```

### Step 2: Setup Automatic Schedule

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Find the function **"cleanup-expired-pages"**
3. Click **"Enable Cron"** or **"Schedule"**
4. Set schedule: **`0 2 * * *`** (runs daily at 2 AM)
5. Click **"Save"**

### Step 3: Test It Works

Run this to manually trigger the function:

```bash
supabase functions invoke cleanup-expired-pages
```

Or test via HTTP:
```bash
curl -X POST https://qizoleiqjxylpiickeye.supabase.co/functions/v1/cleanup-expired-pages \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

---

## Alternative: Use Supabase Dashboard

If CLI doesn't work:

1. Go to **Supabase Dashboard** → **Edge Functions**
2. Click **"Create Function"**
3. Name: `cleanup-expired-pages`
4. Copy code from: `supabase/functions/cleanup-expired-pages/index.ts`
5. Paste into editor
6. Click **"Deploy"**
7. Enable cron schedule: `0 2 * * *`

---

## What This Does

✅ **Runs daily at 2 AM**  
✅ **Finds expired pages** (where `expires_at <= now()`)  
✅ **Deletes related data** (page_versions, page_views)  
✅ **Soft deletes pages** (sets `deleted_at`, `status = 'expired'`)  
✅ **Completely automatic** - no manual work needed!

---

## Verify It's Running

Check logs in Supabase Dashboard → Edge Functions → cleanup-expired-pages → Logs

You should see daily runs showing how many pages were cleaned up.

---

## Manual Trigger (If Needed)

You can also run cleanup manually anytime:

**In SQL Editor:**
```sql
SELECT public.cleanup_expired_pages();
```

**Via Edge Function:**
```bash
supabase functions invoke cleanup-expired-pages
```

---

**Once set up, expired pages will be automatically deleted every day!** 🎉
