# 🔄 MANUAL USER DATA MIGRATION

## Since CLI access to old database is restricted, use the Dashboard method:

---

## 📊 Step 1: Export from Old Database (Dashboard)

### Export Users:

1. **Go to OLD database**: https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql

2. **Run this query** to get user list:

```sql
-- Get all user emails
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC;
```

3. **Copy the results** (or click "Download CSV")

---

### Export Profiles:

```sql
-- Get all profiles
SELECT * FROM public.profiles
ORDER BY created_at DESC;
```

**Download CSV** or copy results.

---

### Export Pages:

```sql
-- Get all pages
SELECT 
  id,
  user_id,
  template_id,
  title,
  slug,
  content,
  status,
  created_at,
  updated_at
FROM public.pages
WHERE deleted_at IS NULL
ORDER BY created_at DESC;
```

**Download CSV** or copy results.

---

### Export Orders:

```sql
-- Get all orders
SELECT * FROM public.orders
ORDER BY created_at DESC;
```

**Download CSV** or copy results.

---

### Export Order Items:

```sql
-- Get all order items
SELECT * FROM public.order_items
ORDER BY created_at DESC;
```

**Download CSV** or copy results.

---

## 📥 Step 2: Prepare Import SQL

Save the data you exported, and I'll create import SQL scripts for you.

**Create a text file** with this information:

1. **Number of users**: How many users in old database?
2. **User emails**: List of emails (from first query)
3. **Important pages**: Any critical pages to migrate?
4. **Active orders**: Any pending/paid orders to migrate?

---

## 🎯 Quick Alternative: Invite Users Method

Since migrating encrypted data is complex, **the easiest approach is**:

### For Each User:

**Option A - Email Invite** (Recommended):
1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users
2. Click: **"Invite User"**
3. Enter: User's email
4. They get invite link → Set new password
5. They're in new database! ✅

**Option B - User Self-Reset**:
1. User goes to your website
2. Clicks: "Forgot Password"
3. Enters their email
4. Gets reset link
5. Sets new password
6. Account created in new database ✅

---

## 🚀 Automated Invite Script

If you have the user emails, I can create a script to bulk-invite them via Supabase API.

### What I need from you:

Run this in OLD database and give me the results:

```sql
-- Just the emails
SELECT email FROM auth.users 
WHERE email IS NOT NULL 
ORDER BY created_at DESC;
```

Then I'll create a Node.js script to:
1. Read email list
2. Invite each user via Supabase API
3. They receive emails to set passwords

---

## 📋 Migration Priority

### Critical Data (Manual Copy):
1. ✅ **Admin user** - Already done (greetingvibes786@gmail.com)
2. ⏳ **User emails** - For invites
3. ⏳ **Active orders** - Need to migrate if any

### Nice-to-Have:
4. ⏳ **User pages** - Can be recreated
5. ⏳ **Profile data** - Minimal impact

---

## 🔧 Quick Script: Bulk User Invite

If you give me the user emails, I'll create this script:

```javascript
// invite-users.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qizoleiqjxylpiickeye.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // From new project settings
);

const emails = [
  'user1@example.com',
  'user2@example.com',
  // ... from your export
];

for (const email of emails) {
  const { error } = await supabase.auth.admin.inviteUserByEmail(email);
  if (error) console.error(`Failed: ${email}`, error);
  else console.log(`Invited: ${email}`);
}
```

---

## 🎯 What To Do Now

**Choose your approach:**

### Approach 1: Get User List (5 minutes)
1. Go to old database SQL editor
2. Run: `SELECT email FROM auth.users;`
3. Give me the list
4. I create bulk invite script

### Approach 2: Manual Invite (10 minutes if few users)
1. Go to new database: Auth → Users
2. Click "Invite User" for each
3. Users receive emails

### Approach 3: Let Users Self-Reset
1. Deploy website with new database
2. Tell users: "Use Forgot Password"
3. They reset and create account in new database

---

## 📊 Next Steps

**Tell me:**
1. How many users are in the old database?
2. Do you have access to old database dashboard?
3. Can you run SQL queries in old database?

Then I'll create the exact migration script you need! 🚀
