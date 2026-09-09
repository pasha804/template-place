# ⚡ DO THIS NOW - USER MIGRATION

## 🎯 Your Old Users Can't Login Yet!

The website is live with the new database, but old user accounts don't exist in the new database.

**Solution**: Invite them via email (10 minutes of work)

---

## 📋 4 SIMPLE STEPS

### Step 1️⃣: Get Service Role Key

**Click**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

**Find**: "Service Role Key" (not anon key)

**Copy**: The long key (starts with `eyJhbGciOi...`)

---

### Step 2️⃣: Get User Emails

**Click**: https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql

**Paste & Run**:
```sql
SELECT email FROM auth.users 
WHERE email IS NOT NULL;
```

**Copy**: All the emails from the results

---

### Step 3️⃣: Update the Script

**Open**: `scripts/bulk-invite-users.js`

**Line 12** - Paste your service role key:
```javascript
const SERVICE_ROLE_KEY = 'eyJhbGciOi...'; // Your key here
```

**Line 19** - Paste user emails:
```javascript
const emails = [
  'user1@example.com',
  'user2@example.com',
  // ... all your users
];
```

**Save** (Ctrl+S)

---

### Step 4️⃣: Run It!

**Terminal**:
```bash
node scripts/bulk-invite-users.js
```

**Result**: ✨ All users receive invite emails!

---

## 📧 What Happens Next?

1. Users receive email: "You've been invited..."
2. Users click invitation link
3. Users set new password
4. Users login to website ✅
5. Done! 🎉

---

## 🆘 Need More Help?

**Complete guide**: Open `QUICK_USER_MIGRATION.md`

**Having issues?**
- Wrong key? Make sure it's **service_role** (not anon)
- No emails? Check old database SQL access
- Script error? Read error message carefully

---

## ⏰ How Long?

- **Your work**: 10 minutes
- **Users receive emails**: 1-5 minutes
- **Users accept**: Over 1-2 days

---

## 🚀 Alternative: Manual Invite

Don't want to run script? Invite manually:

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users
2. Click "Invite User"
3. Enter email
4. Click "Send"
5. Repeat for each user

(Good for small number of users)

---

## ✅ After Migration

Everything works:
- ✅ Old users can login
- ✅ Users can create pages
- ✅ Users can buy packages (Rs. 1,499 / Rs. 2,999)
- ✅ Admin can manage orders
- ✅ Pages auto-expire after package duration

---

**Priority**: 🔴 HIGH  
**Time**: 10 minutes  
**Impact**: Users can't login until this is done

**👉 Start with Step 1 above!**
