# 🚀 DEPLOYMENT INSTRUCTIONS

## ⚠️ CRITICAL: Invalid API Error Fix

You're seeing "invalid api" errors because:
1. The website is using **OLD** Supabase credentials (cached)
2. We changed to a **NEW** Supabase project
3. Old user accounts don't exist in the new database

**Solution**: Deploy the updated code with new credentials.

---

## 🎯 Quick Fix Options

### Option 1: Deploy to Vercel (Recommended)

#### If Already Deployed on Vercel:

```bash
# Push to GitHub (already done ✅)
git push origin main

# Vercel auto-deploys from GitHub
# Wait 2-3 minutes for deployment
```

**Check**: https://vercel.com/dashboard

#### If Not Yet on Vercel:

1. Go to: https://vercel.com
2. Click: "Import Project"
3. Select: Your GitHub repo (pasha804/template-place)
4. Click: "Deploy"
5. Wait 2-3 minutes

---

### Option 2: Manual Vercel CLI Deploy

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

### Option 3: Local Testing (Development)

If you want to test locally first:

```bash
# Start dev server with new credentials
npm run dev
```

Then open: http://localhost:3000

**Note**: Old browser cache will still cause issues. Clear browser data:
1. Press F12 (DevTools)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

---

## 🗑️ Clear Browser Cache

Before testing, users must clear cache:

### Chrome/Edge:
1. Press `Ctrl + Shift + Delete`
2. Select: "Cached images and files"
3. Select: "Cookies and other site data"
4. Time range: "All time"
5. Click "Clear data"

### Firefox:
1. Press `Ctrl + Shift + Delete`
2. Select: "Cookies" and "Cache"
3. Time range: "Everything"
4. Click "Clear Now"

---

## ✅ After Deployment

### 1. Old Users Must Re-Register

**Important**: Old accounts from the previous database **don't exist** in the new database.

Users must:
1. Clear browser cache/cookies
2. Visit your website
3. **Sign up again** (old email/password won't work)
4. Create new account with same email

### 2. Admin Account

The admin account is already set up:
- **Email**: greetingvibes786@gmail.com
- **Sign up** on the website first
- Admin role is pre-configured in database ✅

### 3. Test Everything

After deployment, test:
- ✅ Sign up works
- ✅ Login works
- ✅ Homepage shows Rs. 1,499 / Rs. 2,999
- ✅ Templates load
- ✅ Editor works
- ✅ Checkout shows correct prices
- ✅ Admin dashboard works (greetingvibes786@gmail.com)

---

## 🔧 Vercel Environment Variables

Vercel should use the hardcoded credentials from the code. 

**No environment variables needed!** The new credentials are in:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/client.server.ts`
- `src/integrations/supabase/auth-middleware.ts`

---

## 📊 Deployment Checklist

- [x] Code updated with new Supabase credentials
- [x] Build passing (`npm run build`)
- [x] Changes pushed to GitHub
- [x] Database migrated (28 migrations)
- [x] Admin user configured
- [ ] **Deploy to production** (Vercel/hosting)
- [ ] Clear browser cache
- [ ] Test signup/login
- [ ] Admin account signup (greetingvibes786@gmail.com)

---

## 🐛 Troubleshooting

### "Invalid API key" Error
→ **Solution**: Deploy new code, then clear browser cache

### "User not found" Error
→ **Solution**: Old account doesn't exist. Sign up again with same email

### Old prices still showing
→ **Solution**: Hard refresh (Ctrl + Shift + R)

### Can't login with old account
→ **Solution**: Normal! Database changed. Create new account.

---

## 🎯 Quick Deploy Commands

```bash
# If using Vercel
vercel --prod

# If using Netlify
netlify deploy --prod

# If using other hosting
# 1. Upload .vercel/output/ folder
# 2. Or run: npm run build && upload dist/
```

---

## 📞 Post-Deployment

After successful deployment:

1. **Announce to users**: "Database migrated. Please sign up again."
2. **Clear your own cache**: Hard refresh browser
3. **Sign up admin account**: greetingvibes786@gmail.com
4. **Test admin panel**: Go to /admin
5. **Enable cron**: Set Edge Function schedule `0 2 * * *`

---

## ✅ Expected Behavior After Deployment

### For New Users:
✅ Sign up works normally
✅ Correct prices shown (Rs. 1,499 / Rs. 2,999)
✅ Templates load correctly
✅ Editor works
✅ Checkout works
✅ Orders can be placed

### For Old Users:
⚠️ Old credentials won't work (expected)
✅ Must sign up again with same email
✅ Fresh start in new database

### For Admin:
✅ Sign up with greetingvibes786@gmail.com
✅ Admin role automatically applied
✅ Access to /admin dashboard
✅ Can manage orders

---

## 🚀 Status

**Code**: ✅ Ready for deployment  
**Build**: ✅ Passing  
**Database**: ✅ Migrated  
**Credentials**: ✅ Updated  
**Next Step**: **Deploy to production**

---

## 📱 Notify Users

After deployment, send message to users:

```
🔄 System Upgrade Complete!

We've upgraded to a new database system with better performance.

⚠️ Action Required:
1. Clear your browser cache
2. Sign up again (old accounts don't transfer)
3. You can use the same email address

✅ New Features:
- Correct pricing: Rs. 1,499 (21 days) & Rs. 2,999 (45 days)
- Automatic expiration system
- Better performance

Sorry for any inconvenience!
```

---

**Deploy Now**: Push to Vercel/hosting, then clear browser cache! 🚀
