# 🚀 QUICK REFERENCE — Template Weaver Repair

**Status:** ✅ Ready for Deployment  
**Date:** August 12, 2026

---

## 📋 THE FIX IN 30 SECONDS

**Problem:** Birthday Magical renders as Sorry Apology  
**Cause:** UUID collisions + empty database table + bad fallbacks  
**Fix:** Unique UUIDs + populate database + remove fallbacks  
**Files Changed:** 8 (3 UUIDs + 4 app logic + 1 migration)  
**Risk:** Low (tested, documented, rollback ready)

---

## ✅ PRE-DEPLOYMENT CHECKLIST

```bash
# 1. Verify TypeScript (should pass)
npx tsc --noEmit

# 2. Verify UUIDs (should show 16 unique)
node verify-templates.mjs

# 3. Check changes
git status
```

---

## 🚀 DEPLOYMENT COMMANDS

```bash
# === BACKUP (CRITICAL) ===
supabase db dump > backup-$(date +%Y%m%d).sql

# === APPLY MIGRATION ===
# Option A: CLI
supabase db push

# Option B: Dashboard
# Copy: supabase/migrations/20260812100000_populate_external_templates.sql
# Paste into: Supabase Dashboard → SQL Editor → Run

# === VERIFY MIGRATION ===
# Run in SQL Editor:
# SELECT COUNT(*) FROM public.templates;
# Should return: 16

# === COMMIT & DEPLOY ===
git add src/external-templates/birthday-galaxy/index.ts \
        src/external-templates/birthday-rose/index.ts \
        src/external-templates/sorry-sweet/index.ts \
        src/routes/editor/template/\$templateId.tsx \
        src/hooks/use-orders.ts \
        src/routes/p/\$slug.tsx \
        src/routes/admin/pending.tsx \
        supabase/migrations/20260812100000_populate_external_templates.sql

git commit -m "fix: resolve template identity bug (UUID collisions + FK constraints)"

git push origin main
```

---

## 🧪 CRITICAL TEST (5 minutes)

1. Go to `/templates`
2. Click "Birthday Magical"
3. **VERIFY:** Editor shows Birthday Magical (NOT Sorry)
4. Save → Checkout → Admin → Publish
5. **VERIFY:** Published page shows Birthday Magical (NOT Sorry)

**If FAILS → ROLLBACK immediately!**

---

## 🔙 ROLLBACK (If Needed)

```bash
# Revert code
git revert HEAD
git push origin main

# Revert database (in SQL Editor)
DELETE FROM public.templates 
WHERE plugin_id IN (
  'birthday-magical', 'birthday-aurora', 'birthday-bloom',
  'birthday-galaxy', 'birthday-rose', 'birthday-surprise',
  'anniversary-galaxy', 'anniversary-romantic',
  'sorry-apology', 'sorry-sweet', 'sorry-teddy',
  'proposal-cook', 'proposal-romantic',
  'congratulations-triumph', 'wedding-eternal', 'wedding-petals'
);
```

---

## 📊 POST-DEPLOYMENT CHECK

```sql
-- No NULL template_id in new pages
SELECT COUNT(*) 
FROM public.pages 
WHERE template_id IS NULL 
  AND created_at > now() - interval '1 hour';
-- Should return: 0
```

---

## 📚 FULL DOCUMENTATION

- **STATUS_REPORT.md** — Overview
- **EXECUTIVE_SUMMARY.md** — What was fixed
- **DEPLOYMENT_GUIDE.md** — Detailed steps
- **TESTING_CHECKLIST.md** — All 16 templates
- **REPAIR_REPORT.md** — Complete investigation

---

## 🎯 FILES CHANGED

**UUIDs Fixed (3):**
- `src/external-templates/birthday-galaxy/index.ts`
- `src/external-templates/birthday-rose/index.ts`
- `src/external-templates/sorry-sweet/index.ts`

**Logic Fixed (4):**
- `src/routes/editor/template/$templateId.tsx`
- `src/hooks/use-orders.ts`
- `src/routes/p/$slug.tsx`
- `src/routes/admin/pending.tsx`

**Database (1):**
- `supabase/migrations/20260812100000_populate_external_templates.sql`

---

## ⚠️ CRITICAL WARNINGS

1. **BACKUP DATABASE FIRST** — No exceptions
2. **APPLY MIGRATION BEFORE CODE** — Order matters
3. **TEST IMMEDIATELY AFTER** — Don't wait
4. **HAVE ROLLBACK READY** — Just in case

---

## ✅ VERIFICATION COMMANDS

```bash
# Before deployment
npx tsc --noEmit              # Should pass
node verify-templates.mjs     # Should show 16 unique

# After migration
# SELECT COUNT(*) FROM public.templates;  # Should return 16

# After deployment
# Check no NULL template_id in new pages
```

---

## 🏁 SUCCESS METRICS

- ✅ 16/16 templates in database
- ✅ 0% pages with NULL template_id
- ✅ Birthday Magical shows correctly
- ✅ No collision pair mix-ups
- ✅ 0 "Template not found" errors

---

**Estimated Time:** 1-2 hours (backup + deploy + test)  
**Risk Level:** LOW (tested, documented, reversible)  
**Recommendation:** DEPLOY when ready

**Questions?** Read the full documentation above.
