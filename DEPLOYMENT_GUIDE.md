# TEMPLATE WEAVER — DEPLOYMENT GUIDE

**Repair Version:** 2026.08.12  
**Critical Fixes:** Template Identity Bug (UUID Collisions + FK Constraints)

---

## ⚠️ CRITICAL WARNING

**DO NOT SKIP STEPS — Follow in exact order**

This deployment fixes a critical bug where templates render incorrectly (e.g., Birthday Magical showing as Sorry Apology). The fixes require database migration + code changes deployed together.

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Local Verification

- [ ] `npx tsc --noEmit` passes ✅
- [ ] `node verify-templates.mjs` shows 16 unique UUIDs ✅
- [ ] Review `REPAIR_REPORT.md` — understand all changes
- [ ] Review `TESTING_CHECKLIST.md` — understand test plan
- [ ] Verify `supabase/migrations/20260812100000_populate_external_templates.sql` exists

### Files Changed (Ready to Commit)

**Template Manifests (3):**
- `src/external-templates/birthday-galaxy/index.ts`
- `src/external-templates/birthday-rose/index.ts`
- `src/external-templates/sorry-sweet/index.ts`

**Application Code (4):**
- `src/routes/editor/template/$templateId.tsx`
- `src/hooks/use-orders.ts`
- `src/routes/p/$slug.tsx`
- `src/routes/admin/pending.tsx`

**Migration (1):**
- `supabase/migrations/20260812100000_populate_external_templates.sql`

**Tools/Docs (4):**
- `verify-templates.mjs`
- `REPAIR_REPORT.md`
- `TESTING_CHECKLIST.md`
- `DEPLOYMENT_GUIDE.md` (this file)

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Backup Database (CRITICAL)

```bash
# Export current state
supabase db dump > backup-pre-template-fix-$(date +%Y%m%d).sql

# Or via Supabase Dashboard:
# Settings → Database → Database Backups → Download Backup
```

**Store backup safely before proceeding!**

### Step 2: Apply Database Migration

**Option A: Via Supabase CLI (Recommended)**
```bash
# Reset local database (dev only)
supabase db reset

# Or apply migration
supabase migration up
```

**Option B: Via Supabase Dashboard**
1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/migrations/20260812100000_populate_external_templates.sql`
3. Copy entire contents
4. Paste into SQL Editor
5. Click "Run"
6. Verify: "Success. 16 rows affected"

### Step 3: Verify Migration Success

Run this query in Supabase SQL Editor:

```sql
-- Should return exactly 16 rows
SELECT id, plugin_id, slug, name 
FROM public.templates 
ORDER BY slug;
```

**Expected Output:** 16 rows with all template names

**If query returns 0 rows:** Migration failed — DO NOT PROCEED

### Step 4: Verify Foreign Key Constraint

```sql
-- Test FK constraint is working
SELECT 
  COUNT(*) as total_pages,
  COUNT(template_id) as pages_with_template_id,
  COUNT(*) - COUNT(template_id) as pages_null_template_id
FROM public.pages;
```

**Expected:** `pages_null_template_id` should be 0 after code deployment

### Step 5: Clean Up Corrupted Data (Optional)

⚠️ **CAUTION:** Only run if you have confirmed backups

```sql
-- Delete draft pages with NULL template_id (test data)
DELETE FROM public.pages 
WHERE template_id IS NULL 
  AND status = 'draft'
  AND created_at < now() - interval '7 days';

-- Check orders without valid pages
SELECT o.id, o.reference, o.created_at 
FROM public.orders o
LEFT JOIN public.pages p ON p.id = (
  SELECT oi.page_id 
  FROM public.order_items oi 
  WHERE oi.order_id = o.id 
  LIMIT 1
)
WHERE p.id IS NULL
  AND o.status = 'pending';
```

Review before deleting any orders!

### Step 6: Deploy Code Changes

**Option A: Git Push (if auto-deploy enabled)**
```bash
# Review all changes
git status
git diff

# Stage changes
git add src/external-templates/birthday-galaxy/index.ts
git add src/external-templates/birthday-rose/index.ts
git add src/external-templates/sorry-sweet/index.ts
git add src/routes/editor/template/\$templateId.tsx
git add src/hooks/use-orders.ts
git add src/routes/p/\$slug.tsx
git add src/routes/admin/pending.tsx
git add supabase/migrations/20260812100000_populate_external_templates.sql

# Commit
git commit -m "fix: resolve template identity bug (UUID collisions + FK constraints)

- Fixed UUID collisions: birthday-galaxy, birthday-rose, sorry-sweet
- Populated templates table with all 16 external templates
- Removed dangerous template_id:null fallbacks in editor/orders/admin
- Improved error handling for missing templates
- Added verification tooling (verify-templates.mjs)

Fixes: Birthday Magical rendering as Sorry Apology
Closes: #[issue-number]"

# Push to main (or feature branch)
git push origin main
```

**Option B: Manual Deploy**
- Upload changed files to your hosting platform
- Ensure migration runs on production database
- Restart application server

### Step 7: Post-Deployment Verification

**Immediate Checks (within 5 minutes):**

```bash
# Check application health
curl https://your-domain.com/api/health

# Check for server errors
# (Monitor logs in Vercel/Netlify/Railway dashboard)
```

**Database Verification:**
```sql
-- Verify all new pages have template_id
SELECT COUNT(*) 
FROM public.pages 
WHERE template_id IS NULL 
  AND created_at > now() - interval '1 hour';
-- Should return 0

-- Check recent orders have valid page references
SELECT o.id, o.reference, p.template_id, t.name
FROM public.orders o
JOIN public.order_items oi ON oi.order_id = o.id
JOIN public.pages p ON p.id = oi.page_id
LEFT JOIN public.templates t ON t.id = p.template_id
WHERE o.created_at > now() - interval '1 hour'
ORDER BY o.created_at DESC
LIMIT 10;
```

---

## 🧪 POST-DEPLOYMENT TESTING

### Critical Test (5 minutes)

**Test the exact bug we fixed:**

1. Go to `/templates`
2. Find "Birthday Magical"
3. Click "Create Now"
4. **VERIFY:** Editor shows Birthday Magical fields (not Sorry Apology)
5. Edit: Change name, age, birthday message
6. Click "Save"
7. Click "Continue to Checkout"
8. Complete checkout with dummy payment
9. Login as admin → Go to `/admin/pending`
10. **VERIFY:** Preview shows Birthday Magical (not Sorry)
11. Click "Publish Live"
12. Open published URL in incognito
13. **VERIFY:** Public page shows Birthday Magical (not Sorry)

**If any verification fails:** ROLLBACK IMMEDIATELY (see below)

### Comprehensive Testing (20-30 minutes)

Follow `TESTING_CHECKLIST.md`:
- Test birthday-magical (primary bug case)
- Test birthday-galaxy (collision pair #1)
- Test sorry-apology (collision pair #1)
- Test birthday-rose (collision pair #2)
- Test sorry-sweet (collision pair #2)
- Spot check 3-5 other templates

---

## 🔙 ROLLBACK PROCEDURE

**If deployment fails or critical bugs found:**

### Step 1: Revert Code
```bash
git revert HEAD
git push origin main
```

### Step 2: Revert Database Migration
```sql
-- Delete the 16 inserted templates
DELETE FROM public.templates 
WHERE plugin_id IN (
  'birthday-magical', 'birthday-aurora', 'birthday-bloom', 
  'birthday-galaxy', 'birthday-rose', 'birthday-surprise',
  'anniversary-galaxy', 'anniversary-romantic',
  'sorry-apology', 'sorry-sweet', 'sorry-teddy',
  'proposal-cook', 'proposal-romantic',
  'congratulations-triumph', 'wedding-eternal', 'wedding-petals'
);

-- Or restore from backup
-- psql < backup-pre-template-fix-YYYYMMDD.sql
```

### Step 3: Notify Team
- Document what failed
- Review logs/errors
- Plan fix for next attempt

---

## 📊 MONITORING

### Key Metrics to Watch (First 24 hours)

**Database Queries:**
```sql
-- Pages created per hour
SELECT 
  date_trunc('hour', created_at) as hour,
  COUNT(*) as pages_created,
  COUNT(template_id) as pages_with_template_id
FROM public.pages
WHERE created_at > now() - interval '24 hours'
GROUP BY hour
ORDER BY hour DESC;

-- Template usage distribution
SELECT 
  t.name,
  COUNT(p.id) as page_count
FROM public.templates t
LEFT JOIN public.pages p ON p.template_id = t.id
WHERE p.created_at > now() - interval '24 hours'
GROUP BY t.name
ORDER BY page_count DESC;

-- Error rate (pages without template)
SELECT 
  COUNT(*) FILTER (WHERE template_id IS NULL) * 100.0 / COUNT(*) as null_percentage
FROM public.pages
WHERE created_at > now() - interval '24 hours';
-- Should be 0%
```

**Application Logs:**
- Watch for "Template plugin not found" errors
- Watch for "Page missing template_id" console errors
- Monitor checkout failure rate

### Success Indicators

- ✅ 0% pages with NULL template_id
- ✅ 0 "Template not found" errors
- ✅ All admin previews show correct templates
- ✅ All published pages render correctly
- ✅ User feedback: No template mismatch reports

---

## 📞 SUPPORT

If issues arise post-deployment:

1. Check `REPAIR_REPORT.md` — understand what was fixed
2. Check `TESTING_CHECKLIST.md` — verify test coverage
3. Review application logs for specific errors
4. Check database for NULL template_id entries
5. Verify migration ran successfully (16 templates exist)

---

## ✅ DEPLOYMENT COMPLETE

Once all tests pass:

- [ ] Update status in project management
- [ ] Document successful deployment date/time
- [ ] Archive pre-deployment backup (keep 30 days)
- [ ] Monitor metrics for 24-48 hours
- [ ] Mark bug as resolved/closed

**Deployment Date:** _______________  
**Deployed By:** _______________  
**Status:** ✅ SUCCESS / ❌ ROLLBACK  
**Notes:** _______________
