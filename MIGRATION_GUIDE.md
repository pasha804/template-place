# 🔄 USER DATA MIGRATION GUIDE

## Migrating Users from Old Database to New Database

**Old Database**: `ptcbaphzoceumekzymsa`  
**New Database**: `qizoleiqjxylpiickeye`

---

## ⚠️ IMPORTANT NOTES

### What CAN Be Migrated:
✅ User emails and profile data  
✅ User pages and content  
✅ User orders  
✅ Templates and categories  

### What CANNOT Be Migrated:
❌ **Passwords** (users must reset)  
❌ **Auth tokens** (users must login again)  
❌ **Sessions** (users must re-authenticate)

**Why?** Passwords are encrypted with project-specific keys. Users will need to use "Forgot Password" to reset.

---

## 🚀 Migration Steps

### Step 1: Export Data from Old Database

We'll use Supabase CLI to dump data from the old database:

```bash
# First, link to OLD database temporarily
supabase link --project-ref ptcbaphzoceumekzymsa

# Export only data (not schema, we already have that)
supabase db dump --data-only -f old_database_data.sql

# This creates: old_database_data.sql
```

---

### Step 2: Clean the Export File

The exported file will have ALL data. We need to:
1. Keep: profiles, pages, orders, order_items
2. Skip: auth.users (can't import directly)
3. Skip: migrations history

**I'll create a cleaned version for you.**

---

### Step 3: Import to New Database

```bash
# Link to NEW database
supabase link --project-ref qizoleiqjxylpiickeye

# Import the data
supabase db query --linked --file cleaned_data.sql
```

---

### Step 4: Manually Invite Users

Since passwords can't migrate, we need to invite users via Supabase dashboard:

1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/auth/users
2. For each old user:
   - Click "Invite User"
   - Enter their email
   - They receive invite link
   - They set new password

**OR** they can use "Forgot Password" on your website.

---

## 📝 Automated Migration Script

Let me create the migration scripts for you:
