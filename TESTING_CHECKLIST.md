# TEMPLATE WEAVER — TESTING CHECKLIST

**Purpose:** Verify all 16 templates work end-to-end after bug fixes

**Date:** August 12, 2026  
**Status:** Ready for Testing (Post-Migration)

---

## ⚠️ PREREQUISITES

Before testing, ensure:

1. ✅ Migration `20260812100000_populate_external_templates.sql` has been applied
2. ✅ All template UUID collisions are fixed (verified by `verify-templates.mjs`)
3. ✅ TypeScript compilation passes (`npx tsc --noEmit`)
4. ✅ Development server is running

---

## 🔄 TEST FLOW (Per Template)

### Phase 1: Gallery → Editor
- [ ] Template appears in `/templates` gallery
- [ ] Correct thumbnail/cover displayed
- [ ] Click "Create Now" opens editor
- [ ] Editor URL contains correct template ID
- [ ] Correct template loads in editor

### Phase 2: Editor → Save
- [ ] All editor fields are editable
- [ ] Change at least 3 different fields
- [ ] Click "Save" — success toast appears
- [ ] Reload page — changes persist
- [ ] No console errors

### Phase 3: Editor → Checkout
- [ ] Click "Continue to Checkout"
- [ ] Correct template name in checkout
- [ ] Select payment plan
- [ ] Upload dummy payment screenshot
- [ ] Click "Place Order" — success

### Phase 4: Admin → Preview
- [ ] Login as admin
- [ ] Navigate to `/admin/pending`
- [ ] Page appears in pending queue
- [ ] Click "Preview Website"
- [ ] **CRITICAL:** Verify preview shows SAME template as edited
- [ ] Verify all edited values appear in preview

### Phase 5: Admin → Publish
- [ ] Click "Publish Live"
- [ ] Success confirmation
- [ ] Copy published URL slug

### Phase 6: Public Page
- [ ] Open `/p/{slug}` in new incognito tab
- [ ] **CRITICAL:** Verify SAME template renders
- [ ] Verify ALL edited values appear correctly
- [ ] No console errors
- [ ] Template is fully interactive

---

## 📋 TEMPLATE TEST MATRIX

Test each template individually. Mark ✅ when all 6 phases pass.

| # | Template | Gallery | Editor | Save | Checkout | Admin | Publish | Public | Status |
|---|----------|---------|--------|------|----------|-------|---------|--------|--------|
| 1 | birthday-magical | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 2 | birthday-aurora | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 3 | birthday-bloom | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 4 | birthday-galaxy | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 5 | birthday-rose | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 6 | birthday-surprise | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 7 | anniversary-galaxy | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 8 | anniversary-romantic | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 9 | sorry-apology | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 10 | sorry-sweet | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 11 | sorry-teddy | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 12 | proposal-cook | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 13 | proposal-romantic | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 14 | congratulations-triumph | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 15 | wedding-eternal | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| 16 | wedding-petals | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

**Legend:**
- ⏳ Not tested yet
- ✅ Passed
- ❌ Failed (document issue)

---

## 🐛 BUG TRACKING

If any test fails, document here:

### Template: ___________
**Phase Failed:** Gallery / Editor / Save / Checkout / Admin / Publish / Public  
**Issue:**  
**Expected:**  
**Actual:**  
**Console Errors:**  

---

## 🎯 CRITICAL VALIDATION POINTS

### The Bug We Fixed
**Original Problem:** Birthday Magical opened as Sorry Apology

**Test Case:** 
1. Select "Birthday Magical" from gallery
2. Open editor
3. **Verify:** Editor shows Birthday Magical fields (not Sorry fields)
4. Save → Checkout → Admin Preview
5. **Verify:** Admin preview shows Birthday Magical (not Sorry)
6. Publish → Public page
7. **Verify:** Public page shows Birthday Magical (not Sorry)

### UUID Collision Verification
**Previously Colliding Templates:**
- birthday-galaxy ↔ sorry-apology (FIXED)
- birthday-rose ↔ sorry-sweet (FIXED)

**Test Both Pairs:**
1. Test birthday-galaxy (should never show sorry-apology)
2. Test sorry-apology (should never show birthday-galaxy)
3. Test birthday-rose (should never show sorry-sweet)
4. Test sorry-sweet (should never show birthday-rose)

---

## 📊 SUCCESS CRITERIA

- [ ] All 16 templates pass all 6 phases
- [ ] No template mismatches detected
- [ ] No console errors in any phase
- [ ] Database `pages.template_id` is never NULL
- [ ] Admin preview always shows correct template
- [ ] Public pages always render correct template
- [ ] All user-edited values persist through entire flow

---

## 🚀 NEXT STEPS AFTER TESTING

If all tests pass:
1. Clean up test data (pages/orders)
2. Review and commit changes
3. Deploy migration to production
4. Monitor for any regressions

If tests fail:
1. Document failures in Bug Tracking section
2. Investigate root cause
3. Apply additional fixes
4. Re-test failed templates
5. Do NOT proceed until all pass
