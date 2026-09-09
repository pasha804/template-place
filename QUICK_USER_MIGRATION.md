# ⚡ QUICK USER MIGRATION GUIDE

**Goal**: Invite all users from old database to new database

---

## 🚀 4 STEPS TO COMPLETE

### ✅ Step 1: Get Service Role Key (2 min)

**Link**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

**Find**: "Service Role Key" or "service_role"  
**Copy**: The long key (starts with `eyJhbGciOi...`)

---

### ✅ Step 2: Get User Emails (3 min)

**Link**: https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql

**Run this query**:
```sql
SELECT email FROM auth.users 
WHERE email IS NOT NULL 
ORDER BY created_at DESC;
```

**Copy**: All the emails from results

---

### ✅ Step 3: Update Script (2 min)

**Open**: `scripts/bulk-invite-users.js`

**Line 12** - Add your service role key:
```javascript
const SERVICE_ROLE_KEY = 'eyJhbGciOi...'; // Your actual key
```

**Line 19** - Add user emails:
```javascript
const emails = [
  'user1@example.com',
  'user2@example.com',
  // ... paste all emails here
];
```

**Save** the file (Ctrl+S)

---

### ✅ Step 4: Run Script (1 min)

**Open terminal** and run:
```bash
node scripts/bulk-invite-users.js
```

**Expected output**:
```
🚀 Starting bulk invite for 15 users...

[1/15] Inviting: user1@example.com
  ✅ Invited successfully
[2/15] Inviting: user2@example.com
  ✅ Invited successfully
...

📊 MIGRATION SUMMARY
✅ Successfully invited: 15
❌ Failed: 0

✨ Done! Users will receive invite emails.
```

---

## 📧 What Users Get

Users receive email from Supabase:

**Subject**: "You've been invited to join [Your App]"

**Content**: 
- Invitation message
- "Accept Invitation" button
- Link to set new password

**User clicks** → Sets password → Logged in ✅

---

## ⏰ Timeline

- **Script runs**: 10-20 seconds
- **Emails sent**: Immediate
- **Users receive**: 1-5 minutes
- **Users accept**: Over 1-2 days
- **Link valid**: 24 hours (can resend)

---

## 🛟 If Something Goes Wrong

### Error: "Invalid Service Role Key"
→ Get the **service_role** key (not anon key)  
→ From: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

### Error: "Email already registered"
→ That user already exists (probably admin)  
→ Script continues with other users  
→ This is normal ✅

### Users don't receive email
→ Check spam folder  
→ Verify email is valid  
→ Manually invite from dashboard: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users

---

## 📋 Quick Checklist

- [ ] Got service role key from new database
- [ ] Got user emails from old database
- [ ] Updated `bulk-invite-users.js` with key
- [ ] Updated `bulk-invite-users.js` with emails
- [ ] Saved the file
- [ ] Ran: `node scripts/bulk-invite-users.js`
- [ ] Script completed successfully
- [ ] Notified users to check email

---

## 🎯 Alternative: Manual Invite

**If script doesn't work**, manually invite users:

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users
2. Click: "Invite User"
3. Enter: User's email
4. Click: "Send Invite"
5. Repeat for each user

---

## 📞 Important Links

**New Database Dashboard**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye

**Service Role Key**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

**Auth Users**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users

**Old Database SQL**: https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql

---

## ✅ After Migration

Users can:
- ✅ Login with new password
- ✅ Create new pages
- ✅ Purchase packages (Rs. 1,499 / Rs. 2,999)
- ✅ Access all features

Old data:
- ⚠️ User pages from old database are NOT migrated
- ⚠️ Users need to recreate their pages
- ✅ They can start fresh with new templates

---

**Total Time**: 10 minutes setup + users accepting invites over 1-2 days

**Status**: Ready to execute ⚡

**Next**: Follow Step 1 above 🚀
