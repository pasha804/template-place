# 🔧 FIX: Invalid API Key Error

## Problem

You're getting "Invalid API key" error when trying to create an account. This means the Supabase credentials in the code don't match your actual project credentials.

---

## 🚀 SOLUTION (5 minutes)

### Step 1: Get Correct API Keys from Dashboard

1. **Open API Settings**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

2. **Find these keys**:
   - **Project URL**: Should be `https://qizoleiqjxylpiickeye.supabase.co`
   - **Anon/Publishable Key**: Look for "anon" or "public" key (starts with `eyJ...` or `sb_publishable_...`)

3. **Copy both values**

---

### Step 2: Update the Code

**File to Update**: `src/integrations/supabase/client.ts`

**Current values** (lines 33-34):
```typescript
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_JY2lrUz1vqi2qMJreIfprg_3xbJ4jCCC';
```

**Replace with** (use your actual keys from dashboard):
```typescript
const SUPABASE_URL = 'YOUR_PROJECT_URL_FROM_DASHBOARD';
const SUPABASE_PUBLISHABLE_KEY = 'YOUR_ANON_KEY_FROM_DASHBOARD';
```

---

### Step 3: Update Server-Side Files

You also need to update server-side credential files:

#### File 1: `src/integrations/supabase/client.server.ts`

Look for these lines and update:
```typescript
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'YOUR_ANON_KEY_FROM_DASHBOARD';
```

#### File 2: `src/integrations/supabase/auth-middleware.ts`

Look for these lines and update:
```typescript
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_FROM_DASHBOARD';
```

---

### Step 4: Rebuild and Test

```bash
# Stop the dev server (Ctrl+C)
# Rebuild the project
npm run build

# Restart dev server
npm run dev

# Or if using Vercel/production
git add .
git commit -m "Fix Supabase API key"
git push
```

---

## ⚡ Quick Fix Script

I'll create an automated script for you. Just provide the correct keys!

**Tell me**:
1. What is the **Project URL** from the dashboard?
2. What is the **anon key** (publishable key) from the dashboard?

Then I'll update all files automatically.

---

## 🔍 How to Find the Correct Keys

### Method 1: Dashboard API Settings (Easiest)

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

2. You'll see a page like this:
   ```
   Project URL
   https://qizoleiqjxylpiickeye.supabase.co
   
   Project API keys
   anon public    eyJhbGc... [Copy button]
   service_role   eyJhbGc... [Copy button]
   ```

3. Copy the **anon public** key (this is your publishable key)

### Method 2: Project Settings

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api
2. Scroll to "Project API keys"
3. Copy the key labeled "anon" or "anon public"

---

## 📋 Checklist

- [ ] Open Supabase dashboard API settings
- [ ] Copy Project URL
- [ ] Copy anon/publishable key
- [ ] Update `src/integrations/supabase/client.ts`
- [ ] Update `src/integrations/supabase/client.server.ts`
- [ ] Update `src/integrations/supabase/auth-middleware.ts`
- [ ] Rebuild project (`npm run build`)
- [ ] Test signup - should work! ✅

---

## 🆘 Alternative: Let Me Do It

**Provide me with**:
1. Screenshot of API settings page, OR
2. Copy-paste the Project URL and anon key

**I'll update all 3 files for you automatically!**

---

## ⚠️ Common Issues

### Issue 1: "Key starts with sb_publishable_"
- The new Supabase format
- This is correct! ✅
- Make sure you copied the FULL key

### Issue 2: "Key starts with eyJhbGci"
- The JWT token format (also valid)
- This is the traditional format ✅
- Make sure you copied the FULL key (very long)

### Issue 3: "URL is wrong"
- Should be: `https://qizoleiqjxylpiickeye.supabase.co`
- NO trailing slash
- Must match exactly

---

## 🎯 Expected Result

After fix:
- ✅ "Invalid API key" error disappears
- ✅ Can create new account
- ✅ Can login
- ✅ Can use the website

---

**Next Step**: Go to the API settings page and get the correct keys, then I'll update all files!

**Link**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api
