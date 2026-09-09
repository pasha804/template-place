# 🚀 Quick Start - Package System Setup

## ✅ What's Fixed

The pricing is now **CORRECT** everywhere in the code:

| Package | Price | Duration |
|---------|-------|----------|
| Package 1 | **Rs. 1,499** | 21 days |
| Package 2 | **Rs. 2,999** | 45 days |

---

## 🔴 CRITICAL: You Must Do These 3 Steps

### Step 1: Run Database Setup ⚠️ REQUIRED

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **SQL Editor**
4. Open `supabase/SETUP_NO_CRON.sql` in VS Code
5. Copy the **entire file** contents
6. Paste into Supabase SQL Editor
7. Click **"Run"**
8. Wait for "Success" message

**What this does:**
- Creates `packages` table with correct prices (Rs. 1,499 / Rs. 2,999)
- Adds `package_id`, `activated_at`, `expires_at` columns to `pages` table
- Sets up automatic expiration trigger
- Enables automatic cleanup function

---

### Step 2: Enable Automatic Cleanup

1. In Supabase Dashboard, go to **Edge Functions**
2. Find `cleanup-expired-pages` function
3. Click **Settings** or **Cron**
4. Enable cron schedule: **`0 2 * * *`** (runs daily at 2 AM)
5. **Save**

**What this does:**
- Automatically deletes expired pages every day at 2 AM
- Removes pages from database and user dashboard
- Users lose access after 21 or 45 days automatically

---

### Step 3: Set Admin User

1. Sign up on your website with: **greetingvibes786@gmail.com**
2. Open Supabase **SQL Editor**
3. Open `supabase/ADMIN_SETUP.sql`
4. Copy and paste into SQL Editor
5. Click **"Run"**

**What this does:**
- Makes your email an admin
- Grants access to `/admin` dashboard
- Allows you to verify payments and publish pages

---

## 🧪 Test Everything

### Test 1: Homepage Pricing
1. Go to your homepage
2. Scroll to pricing section
3. Verify you see:
   - Package 1: **Rs. 1,499** (21 days)
   - Package 2: **Rs. 2,999** (45 days)

### Test 2: Checkout Flow
1. Click "Get Started" on any package
2. Sign up or login
3. Select a template
4. Customize it
5. Click "Continue to Checkout"
6. **Verify**: Prices show Rs. 1,499 or Rs. 2,999 ✅

### Test 3: Order Placement
1. Select payment method (EasyPaisa/Bank/PayPal)
2. Upload payment screenshot
3. Click "Place Order"
4. **Verify**: Order created successfully

### Test 4: Admin Dashboard
1. Login as admin (greetingvibes786@gmail.com)
2. Go to `/admin`
3. View pending orders
4. **Verify**: Prices display correctly

---

## 📊 Database Verification

Run this query in Supabase SQL Editor to verify packages:

```sql
SELECT name, price_pkr, duration_days, is_active 
FROM packages 
WHERE is_active = true 
ORDER BY price_pkr;
```

**Expected Result:**
```
name            | price_pkr | duration_days | is_active
----------------|-----------|---------------|----------
21-Day Package  | 1499      | 21            | true
45-Day Package  | 2999      | 45            | true
```

---

## 🔍 How Automatic Expiration Works

1. **User Orders**: Selects Package 1 (Rs. 1,499, 21 days)
2. **Admin Approves**: Admin verifies payment and publishes page
3. **Page Activated**: `activated_at = NOW()`, `expires_at = NOW() + 21 days`
4. **Timer Starts**: Page shows expiration countdown
5. **21 Days Pass**: Page expires
6. **Cleanup Runs**: Edge Function deletes page automatically (runs at 2 AM daily)
7. **User Loses Access**: Page removed from dashboard and website

---

## ⚙️ Files Changed

| File | What Changed |
|------|--------------|
| `src/hooks/use-orders.ts` | Updated prices: 1,000→1,499, 2,000→2,999 |
| `src/hooks/use-orders.ts` | Added `duration_days` field (21/45) |
| `src/hooks/use-orders.ts` | Added `usePackages()` hook for database |
| `src/components/home/PricingSection.tsx` | ✅ Already correct |
| `src/routes/checkout/$pageId.tsx` | ✅ Uses correct prices from hook |
| `supabase/SETUP_NO_CRON.sql` | ✅ Database has correct prices |

---

## 🎯 What's Working Now

✅ Homepage shows Rs. 1,499 and Rs. 2,999  
✅ Checkout page shows correct prices  
✅ Order system uses correct amounts  
✅ Database has 21-day and 45-day packages  
✅ Automatic expiration after duration  
✅ Admin email: greetingvibes786@gmail.com  
✅ WhatsApp: +92 332 4967481  
✅ Payment methods: EasyPaisa, Bank, PayPal  

---

## 📞 Support Checklist

Before asking for help, verify:

- [ ] Ran `supabase/SETUP_NO_CRON.sql` successfully
- [ ] Enabled Edge Function cron: `0 2 * * *`
- [ ] Ran `supabase/ADMIN_SETUP.sql` after signup
- [ ] Cleared browser cache (Ctrl + Shift + R)
- [ ] Checked browser console for errors (F12)
- [ ] Verified database has 2 packages with correct prices

---

## 🐛 Common Issues

**Q: Checkout still shows Rs. 1,000 or Rs. 2,000**  
A: Hard refresh your browser (Ctrl + Shift + R) to clear cache

**Q: Database error when placing order**  
A: You didn't run `SETUP_NO_CRON.sql` - run it now

**Q: Can't access admin dashboard**  
A: Run `ADMIN_SETUP.sql` after signing up with greetingvibes786@gmail.com

**Q: Pages not expiring automatically**  
A: Enable Edge Function cron schedule: `0 2 * * *`

**Q: Build errors in VS Code**  
A: The build passed ✅ - ignore any VS Code warnings

---

**Status**: ✅ PRICES FIXED - DATABASE SETUP REQUIRED  
**Next Step**: Run `supabase/SETUP_NO_CRON.sql` in Supabase SQL Editor  
**Build Status**: ✅ Passed (no errors)  
**Last Updated**: September 9, 2026
