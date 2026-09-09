# 🔄 USER MIGRATION - ACTION PLAN

## ⚡ Quick Summary

You need to migrate user accounts from the old Supabase database to the new one. Since passwords cannot be migrated (they're encrypted with project-specific keys), users will receive invite emails to set new passwords.

---

## 🎯 THE PLAN: Bulk User Invite (Recommended)

### Why This Approach?
- ✅ **Fast**: Invite all users at once with one script
- ✅ **Professional**: Users receive official invite emails
- ✅ **Automatic**: Script handles everything
- ✅ **Safe**: No password security issues

### What Users Experience:
1. They receive an email: "You've been invited to join..."
2. They click the invite link
3. They set a new password
4. They're logged into the new website ✅

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### Step 1: Get Service Role Key (2 minutes)

1. **Open this link**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

2. **Scroll down** to find: "Service Role Key" or "service_role"

3. **Click**: "Reveal" or "Copy" button

4. **Copy the key** - It starts with `eyJhbGciOi...`

   ⚠️ **IMPORTANT**: This is the **service_role** key, NOT the anon/publishable key!

5. **Keep it safe** - Don't share this key publicly

---

### Step 2: Get User Emails from Old Database (3 minutes)

1. **Open old database SQL editor**: https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql

2. **Paste and run this query**:

   ```sql
   SELECT email FROM auth.users 
   WHERE email IS NOT NULL 
   ORDER BY created_at DESC;
   ```

3. **Copy the results**:
   - You'll see a list of emails in the results
   - Click on each email and copy OR
   - Click "Download as CSV" button

4. **Format the email list**:
   ```javascript
   // Your list should look like:
   const emails = [
     'user1@example.com',
     'user2@example.com',
     'user3@example.com',
   ];
   ```

---

### Step 3: Update the Invite Script (3 minutes)

1. **Open file**: `scripts/bulk-invite-users.js`

2. **Find line 12** - Replace `YOUR_SERVICE_ROLE_KEY_HERE` with the actual key:
   ```javascript
   const SERVICE_ROLE_KEY = 'eyJhbGciOi...' // Your actual service role key
   ```

3. **Find line 19** - Add the user emails:
   ```javascript
   const emails = [
     'user1@example.com',
     'user2@example.com',
     'user3@example.com',
     // ... all your user emails
   ];
   ```

4. **Save the file** (Ctrl+S)

---

### Step 4: Run the Script (1 minute)

1. **Open terminal** in project folder

2. **Run the script**:
   ```bash
   node scripts/bulk-invite-users.js
   ```

3. **Watch the magic** ✨:
   ```
   🚀 Starting bulk invite for 15 users...

   [1/15] Inviting: user1@example.com
     ✅ Invited successfully
   [2/15] Inviting: user2@example.com
     ✅ Invited successfully
   [3/15] Inviting: user3@example.com
     ✅ Invited successfully
   ...
   
   ==================================================
   📊 MIGRATION SUMMARY
   ==================================================
   ✅ Successfully invited: 15
   ❌ Failed: 0
   
   ✨ Done! Users will receive invite emails.
   ```

4. **Done!** 🎉 All users will receive invite emails

---

## 📧 What Happens Next?

### User Experience:

1. **User receives email** from Supabase:
   ```
   Subject: You've been invited to join [Your App]
   
   Click here to accept the invitation and set your password:
   [Accept Invitation Button]
   ```

2. **User clicks** the invitation link

3. **User is redirected** to your website's password reset page

4. **User enters** new password

5. **User is logged in** automatically ✅

6. **User can create** new pages with their account

### Timeline:
- **Emails sent**: Immediately (within seconds)
- **User receives**: Within 1-5 minutes
- **Link valid for**: 24 hours
- **Users can request resend**: Yes, via "Forgot Password"

---

## 🛟 Alternative Methods (If Script Doesn't Work)

### Option 1: Manual Invite from Dashboard (10 min for 5 users)

1. **Go to**: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users

2. **Click**: "Invite User" button (top right)

3. **Enter**: User's email address

4. **Click**: "Send Invite"

5. **Repeat** for each user

✅ **Best for**: Small number of users (under 10)

---

### Option 2: Let Users Self-Reset (Lazy Method)

1. **Deploy your website** with new database

2. **Tell users**: "Please use Forgot Password feature"

3. **Users go to**: Your website login page

4. **Users click**: "Forgot Password?"

5. **Users enter**: Their email

6. **Users receive**: Password reset link

7. **Users set**: New password

8. **Account created** in new database

✅ **Best for**: When you don't have access to old database OR users are already familiar with the system

---

## ⚠️ Important Notes

### About Passwords:
- ❌ **Cannot migrate passwords** - They're encrypted with old project's secret keys
- ✅ **Users must set new passwords** - This is secure and normal
- ✅ **Invite method is best** - Professional and guided

### About Data:
- ✅ **Database structure**: Already migrated (28 tables)
- ✅ **Admin account**: Already set (greetingvibes786@gmail.com)
- ✅ **Packages**: Already configured (Rs. 1,499 / Rs. 2,999)
- ⏳ **User accounts**: Need to be invited (this task)
- ⏳ **User pages**: Will be recreated by users after they login

### About Old Database:
- 🔒 **Keep old database** - Don't delete yet
- 📊 **Reference for data** - Can check old orders/pages if needed
- ⏰ **Delete after 1 month** - Once everything is verified working

---

## 🔍 Troubleshooting

### Problem: "Invalid Service Role Key"
**Solution**: Make sure you copied the **service_role** key, not the anon/publishable key
- Should start with: `eyJhbGciOi...`
- Length: Very long (500+ characters)
- Location: Dashboard → Settings → API → service_role

### Problem: "Email already registered"
**Solution**: That user already exists in new database (probably admin)
- Script will continue with other users
- This is normal and safe

### Problem: "Rate limit exceeded"
**Solution**: Script has 100ms delay between requests (10 users/second)
- For many users (100+), run in batches
- Or increase delay in script: `setTimeout(resolve, 200)`

### Problem: Users don't receive emails
**Solution**:
1. Check spam/junk folder
2. Verify email in old database is valid
3. Check Supabase email settings
4. Resend invite from dashboard manually

---

## 📊 Migration Checklist

### Before Running Script:
- [ ] Have access to old database SQL editor
- [ ] Copied service role key from new database
- [ ] Exported user emails from old database
- [ ] Updated `bulk-invite-users.js` with service role key
- [ ] Updated `bulk-invite-users.js` with user emails
- [ ] Saved the file

### After Running Script:
- [ ] Script completed successfully
- [ ] All users invited (check summary)
- [ ] No failures (or acceptable failures)
- [ ] Users notified to check email
- [ ] Test with one user to verify it works

### User Verification (1-2 days):
- [ ] Users received emails
- [ ] Users set new passwords
- [ ] Users can login to website
- [ ] Users can create new pages
- [ ] Users can purchase packages

---

## 🎯 Expected Results

### For 10 users:
- **Script runtime**: ~2 seconds
- **Emails sent**: 10
- **Users receive emails**: Within 5 minutes
- **Success rate**: 95%+ (some emails may be invalid)

### For 50 users:
- **Script runtime**: ~5 seconds
- **Emails sent**: 50
- **Users receive emails**: Within 5 minutes
- **Success rate**: 90%+ (some emails may be invalid/spam)

### For 100+ users:
- **Script runtime**: ~10-20 seconds
- **Emails sent**: 100+
- **Users receive emails**: Within 10 minutes
- **Success rate**: 85%+ (consider batching)

---

## 💡 Pro Tips

1. **Test with yourself first**: Add your own email to test the flow

2. **Notify users beforehand**: Send WhatsApp/email: "You'll receive an invite email soon to reset your password"

3. **Have support ready**: Users may ask questions about the invite

4. **Check spam**: Tell users to check spam folder if they don't see email

5. **Set redirect URL**: The script sends users to your website after password reset

6. **Monitor dashboard**: Check Auth → Users in new database to see who accepted

---

## 📞 Need Help?

If something doesn't work:

1. **Check error message** - Script shows specific errors
2. **Verify keys** - Service role key must be correct
3. **Check email format** - Must be valid email addresses
4. **Try manual invite** - For one user to test
5. **Check Supabase logs** - Dashboard → Logs → Edge Functions

---

## 🚀 Ready to Start?

### Quick Checklist:
1. ✅ Get service role key
2. ✅ Export user emails from old database
3. ✅ Update script with key and emails
4. ✅ Run: `node scripts/bulk-invite-users.js`
5. ✅ Notify users to check email
6. ✅ Verify users are logging in

**Estimated time**: 10-15 minutes total  
**User migration**: Happens over 1-2 days as users accept invites

---

**Status**: Ready to execute  
**Next**: Follow Step 1 above  
**File**: `scripts/bulk-invite-users.js`

🎉 **Let's migrate those users!**
