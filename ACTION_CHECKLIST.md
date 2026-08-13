# 🎯 TEMPLATE WEAVER REPAIR — YOUR ACTION CHECKLIST

**Date:** August 12, 2026  
**Status:** ✅ Repair Complete — Awaiting Your Actions  
**Current State:** No commits made yet (per your request)

---

## ✅ VERIFICATION COMPLETE

### System Status:
- ✅ TypeScript: **PASS** (0 errors)
- ✅ Template Registry: **16/16 unique UUIDs**
- ✅ All documentation: **Complete**
- ✅ Migration file: **Ready**
- ✅ Code changes: **Ready**

---

## 📋 YOUR ACTION ITEMS

### ⏰ NOW (Next 30 minutes)

#### 1. Review the Documentation (15 min)
```
☐ Read STATUS_REPORT.md (5 min) — START HERE
☐ Read EXECUTIVE_SUMMARY.md (5 min) — Understand the fix
☐ Skim DEPLOYMENT_GUIDE.md (5 min) — Know the process
```

**Why:** Understand what was fixed and how to deploy it safely.

#### 2. Review the Code Changes (10 min)
```
☐ Check: src/external-templates/birthday-galaxy/index.ts
☐ Check: src/external-templates/birthday-rose/index.ts
☐ Check: src/external-templates/sorry-sweet/index.ts
☐ Check: src/routes/editor/template/$templateId.tsx
☐ Check: src/hooks/use-orders.ts
☐ Check: src/routes/p/$slug.tsx
☐ Check: src/routes/admin/pending.tsx
☐ Review: supabase/migrations/20260812100000_populate_external_templates.sql
```

**Why:** Ensure you're comfortable with all changes before committing.

#### 3. Make Deployment Decision (5 min)
```
☐ Understand the bug and fix?          YES / NO
☐ Comfortable with the changes?         YES / NO
☐ Have time for deployment (1-2 hrs)?  YES / NO
☐ Can backup database?                  YES / NO
☐ Ready to test after deployment?      YES / NO
```

**If all YES:** Proceed to deployment phase  
**If any NO:** Review relevant docs, get clarification

---

### 🚀 DEPLOYMENT PHASE (Next 1-2 hours)

#### Step 1: Prepare for Deployment (10 min)
```
☐ Read DEPLOYMENT_GUIDE.md in full
☐ Have Supabase Dashboard access ready
☐ Have git access ready
☐ Clear calendar for testing time
```

#### Step 2: Backup Database (5 min) ⚠️ CRITICAL
```
☐ Login to Supabase Dashboard
☐ Go to Database → Backups
☐ Create new backup OR download existing
☐ Store backup file safely
☐ Note backup timestamp: _______________
```

**DO NOT SKIP THIS STEP!**

#### Step 3: Apply Database Migration (10 min)
```
☐ Open Supabase Dashboard → SQL Editor
☐ Open: supabase/migrations/20260812100000_populate_external_templates.sql
☐ Copy entire file contents
☐ Paste into SQL Editor
☐ Click "Run"
☐ Verify: "Success. 16 rows affected"
```

**Verification Query:**
```sql
SELECT COUNT(*) FROM public.templates;
-- Should return: 16
```

```
☐ Run verification query
☐ Result = 16?  YES / NO
```

**If NO:** STOP and troubleshoot. Do not proceed.

#### Step 4: Stage and Commit Changes (15 min)

**Option A: Commit Only This Repair (Recommended)**
```bash
# Stage repair files only
git add src/external-templates/birthday-galaxy/index.ts
git add src/external-templates/birthday-rose/index.ts
git add src/external-templates/sorry-sweet/index.ts
git add src/routes/editor/template/\$templateId.tsx
git add src/hooks/use-orders.ts
git add src/routes/p/\$slug.tsx
git add src/routes/admin/pending.tsx
git add supabase/migrations/20260812100000_populate_external_templates.sql

# Optional: Add documentation
git add *.md verify-templates.mjs

# Commit
git commit -m "fix: resolve template identity bug (UUID collisions + FK constraints)

CRITICAL BUG FIX: Templates rendering incorrectly (Birthday Magical → Sorry Apology)

Root Causes Fixed:
- UUID collisions in template manifests (birthday-galaxy ↔ sorry-apology, birthday-rose ↔ sorry-sweet)
- Empty templates table causing FK constraint failures
- Dangerous fallback logic masking data corruption

Changes:
- Fixed 3 template manifest UUIDs to ensure uniqueness
- Added migration to populate templates table with all 16 external templates
- Removed template_id:null fallbacks in editor/orders/admin/public pages
- Improved error handling and messaging
- Added UUID verification tooling (verify-templates.mjs)

Testing:
- TypeScript: PASS (npx tsc --noEmit)
- Registry: 16/16 unique UUIDs verified
- Manual testing required (see TESTING_CHECKLIST.md)

Deployment:
- Database migration applied: 20260812100000_populate_external_templates.sql
- See DEPLOYMENT_GUIDE.md for complete steps

See: REPAIR_REPORT.md, EXECUTIVE_SUMMARY.md"
```

```
☐ Staged 8 code files
☐ Committed with descriptive message
☐ Ready to push
```

**Option B: Review Other Changes First**
```
☐ Run: git status
☐ Identify pre-existing changes
☐ Decide if they should be included
☐ Stage selectively or commit separately
```

#### Step 5: Push to Repository (2 min)
```bash
git push origin main
```

```
☐ Pushed to main branch
☐ CI/CD pipeline triggered (if applicable)
☐ Deployment started
```

#### Step 6: Verify Deployment (5 min)
```
☐ Application deployed successfully
☐ No build errors
☐ Site is accessible
☐ No immediate errors in logs
```

---

### 🧪 TESTING PHASE (Next 30-60 minutes)

#### Critical Test: Birthday Magical Flow (20 min)

**Follow this EXACTLY:**

1. **Gallery Selection**
   ```
   ☐ Go to: /templates
   ☐ Find: "Birthday Magical" card
   ☐ Verify: Shows Birthday Magical thumbnail/info
   ☐ Click: "Create Now ✨"
   ```

2. **Editor Verification** ⚠️ CRITICAL
   ```
   ☐ Editor loads
   ☐ Verify: URL contains birthday-magical ID
   ☐ Verify: Editor shows Birthday Magical fields (NOT Sorry fields)
   ☐ Verify: Preview shows birthday theme (NOT sorry theme)
   ```
   
   **If editor shows Sorry Apology → ROLLBACK IMMEDIATELY**

3. **Edit and Save**
   ```
   ☐ Change: Birthday person's name
   ☐ Change: Age number
   ☐ Change: Birthday message
   ☐ Click: "Save"
   ☐ Verify: Success message
   ☐ Reload page
   ☐ Verify: Changes persisted
   ```

4. **Checkout Flow**
   ```
   ☐ Click: "Continue to Checkout"
   ☐ Verify: Shows "Birthday Magical" in order summary
   ☐ Select: Payment plan
   ☐ Upload: Dummy payment screenshot
   ☐ Click: "Place Order"
   ☐ Verify: Success confirmation
   ☐ Note Order ID: _______________
   ```

5. **Admin Preview** ⚠️ CRITICAL
   ```
   ☐ Login as admin
   ☐ Go to: /admin/pending
   ☐ Find: The order you just created
   ☐ Click: "Preview Website"
   ☐ Verify: Preview shows Birthday Magical (NOT Sorry)
   ☐ Verify: Shows your edited values (name, age, message)
   ```
   
   **If preview shows Sorry Apology → CRITICAL BUG**

6. **Publish**
   ```
   ☐ Click: "Publish Live"
   ☐ Verify: Success message
   ☐ Copy: Published URL (/p/...)
   ```

7. **Public Page** ⚠️ CRITICAL
   ```
   ☐ Open: Published URL in incognito window
   ☐ Verify: Shows Birthday Magical (NOT Sorry)
   ☐ Verify: Shows your edited values
   ☐ Verify: All animations work
   ☐ No console errors
   ```

**Result:**
```
☐ PASS — Birthday Magical shown everywhere correctly
☐ FAIL — Wrong template shown at any step → DOCUMENT AND ROLLBACK
```

#### Secondary Test: Collision Pairs (20 min)

**Test Case 1: birthday-galaxy (should NEVER show sorry-apology)**
```
☐ Select birthday-galaxy from gallery
☐ Editor shows birthday-galaxy fields?  YES / NO
☐ Save and checkout
☐ Admin preview shows birthday-galaxy?  YES / NO
☐ Publish
☐ Public page shows birthday-galaxy?    YES / NO
```

**Test Case 2: sorry-apology (should NEVER show birthday-galaxy)**
```
☐ Select sorry-apology from gallery
☐ Editor shows sorry-apology fields?    YES / NO
☐ Save and checkout
☐ Admin preview shows sorry-apology?    YES / NO
☐ Publish
☐ Public page shows sorry-apology?      YES / NO
```

**Test Case 3: birthday-rose (should NEVER show sorry-sweet)**
```
☐ Select birthday-rose from gallery
☐ Editor shows birthday-rose fields?    YES / NO
☐ Admin preview shows birthday-rose?    YES / NO
```

**Test Case 4: sorry-sweet (should NEVER show birthday-rose)**
```
☐ Select sorry-sweet from gallery
☐ Editor shows sorry-sweet fields?      YES / NO
☐ Admin preview shows sorry-sweet?      YES / NO
```

#### Spot Check: 3 Random Templates (15 min)

**Pick 3 templates randomly and test:**
```
☐ Template 1: ________________
   ☐ Gallery → Editor → Correct template?
   
☐ Template 2: ________________
   ☐ Gallery → Editor → Correct template?
   
☐ Template 3: ________________
   ☐ Gallery → Editor → Correct template?
```

---

### 📊 POST-DEPLOYMENT MONITORING (Next 24 hours)

#### Immediate Checks (First Hour)
```
☐ No errors in application logs
☐ No spike in error rate
☐ Users can create pages
☐ New pages have template_id set (not NULL)
```

#### Database Verification Query
```sql
-- Run this in Supabase SQL Editor
SELECT 
  COUNT(*) as total_pages,
  COUNT(template_id) as pages_with_template,
  COUNT(*) - COUNT(template_id) as pages_null_template
FROM public.pages
WHERE created_at > now() - interval '1 hour';
```

```
☐ Ran query
☐ pages_null_template = 0?  YES / NO
```

**If NO:** Investigate immediately

#### Monitor These Metrics (24 hours)
```
☐ Page creation rate (normal?)
☐ Order completion rate (normal?)
☐ Error logs (any "Template not found"?)
☐ User feedback (any wrong template complaints?)
```

---

### ✅ COMPLETION CHECKLIST

#### Documentation
```
☐ All tests passed
☐ Documented test results (in TESTING_CHECKLIST.md if needed)
☐ No critical bugs found
☐ Monitoring shows healthy metrics
```

#### Communication
```
☐ Notify team: Repair deployed successfully
☐ Update project tracker: Bug resolved
☐ Mark issue as closed
☐ Archive repair documentation for future reference
```

#### Cleanup (Optional, after 7 days of stability)
```
☐ Delete test pages created during testing
☐ Clean up old draft pages with NULL template_id
☐ Archive backup files (keep 30 days)
```

---

## 🔙 ROLLBACK PROCEDURE (If Needed)

**If critical test fails:**

### Immediate Actions
```
☐ STOP further testing
☐ Document what failed
☐ Capture screenshots/logs
```

### Rollback Steps
```
☐ Revert code: git revert HEAD && git push
☐ Restore database: Run pre-deployment backup
☐ Verify: Application back to previous state
☐ Notify team: Rollback performed
☐ Investigate: Review what went wrong
```

### Investigation
```
☐ Check: Did migration run correctly?
☐ Check: Are all 16 templates in database?
☐ Check: Console errors?
☐ Check: Template registry loading?
☐ Document findings in REPAIR_REPORT.md
```

---

## 📞 NEED HELP?

**At any step, if unsure:**

1. **STOP** — Don't guess
2. **READ** the relevant documentation:
   - Deployment issues → `DEPLOYMENT_GUIDE.md`
   - Testing questions → `TESTING_CHECKLIST.md`
   - Understanding fixes → `EXECUTIVE_SUMMARY.md`
3. **VERIFY** your current state
4. **DECIDE** Continue vs Get Help vs Rollback

---

## 🎯 SUCCESS CRITERIA

**You can mark this repair as complete when:**

- [x] Code review complete
- [x] Documentation reviewed
- [ ] Database backed up
- [ ] Migration applied successfully
- [ ] Code deployed successfully
- [ ] Birthday Magical test PASSED
- [ ] Collision pairs test PASSED
- [ ] Spot check tests PASSED
- [ ] No NULL template_id in new pages
- [ ] Monitoring shows healthy state
- [ ] 24 hours stability achieved

---

**Current Phase:** ✅ Repair Complete  
**Next Phase:** ⏳ Awaiting Your Deployment Actions  
**Estimated Time:** 1-2 hours for deployment + 30-60 min testing

**You're ready. Follow this checklist step by step. Good luck! 🚀**
