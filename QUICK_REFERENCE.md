# Quick Reference Guide

## Admin Emails
- **Primary Admin:** greetingvibes786@gmail.com
- **Secondary Admin:** pashadev804@gmail.com (needs SQL migration applied)

## Contact Information
- **WhatsApp Support:** +92 332 4967481

## Supabase Project
- **Project ID:** qizoleiqjxylpiickeye
- **Dashboard:** https://supabase.com/dashboard/project/qizoleiqjxylpiickeye

## Key Features Status

### Template System
- **Total Templates:** 16 (all migrated)
- **Background Music:** Enabled in all templates ✅
- **Editor:** Full-featured with audio upload, demo library, preview
- **Preview Mode:** Removed from editor (only available on published pages)

### User Roles
- **Available Roles:** user, support, moderator, admin
- **Role Management:** Admins can change any user's role (except their own)
- **Location:** `/admin/users`

### Payment Flow
1. User creates template
2. User submits for payment
3. Admin reviews in dashboard
4. Admin approves → status becomes "published"
5. Template link appears for user
6. User can contact support via WhatsApp (+92 332 4967481)

### Database Structure
- **Templates:** 16 templates in `templates` table
- **Packages:** 2 packages in `packages` table
- **Users:** Managed via `profiles` table with `role` column
- **Pages:** User-created pages with status (draft, pending, published)

## Admin Tasks

### Make Someone Admin
**Option 1 - Via SQL (for existing users):**
```sql
UPDATE profiles 
SET role = 'admin', updated_at = NOW() 
WHERE email = 'user@example.com';
```

**Option 2 - Via Trigger (for new signups):**
Add email to the trigger function in `20260909000003_add_pashadev_admin.sql`

### Approve Payment
1. Go to `/admin/pages`
2. Find pending page
3. Change status to "published"
4. User will now see the template link

### Check Template
1. User creates page → shows in `/dashboard/pages`
2. Admin sees it in `/admin/pages`
3. After approval, user sees external link icon
4. Link format: `https://yourdomain.com/view/{pageId}`

## Common Issues & Solutions

### Issue: "Invalid API key"
**Solution:** Already fixed! API keys updated in all client files.

### Issue: User can't see template link
**Solution:** Admin must change page status to "published" in `/admin/pages`

### Issue: Music not playing in template
**Solution:** 
- Check if audio file uploaded successfully
- Try using demo music from the library
- Verify audio URL is accessible

### Issue: Can't change user role
**Solution:** 
- Make sure you're logged in as admin
- You cannot change your own role
- Refresh page after role change

### Issue: Preview button not working
**Solution:** Preview button removed intentionally. View published pages from dashboard instead.

## File Locations

### Configuration
- Supabase Client: `src/integrations/supabase/client.ts`
- Supabase Server: `src/integrations/supabase/client.server.ts`
- Auth Middleware: `src/integrations/supabase/auth-middleware.ts`

### Admin Pages
- User Management: `src/routes/admin/users.tsx`
- Page Approval: `src/routes/admin/pages.tsx`

### Editor
- Form Panel: `src/components/template-editor/EditorFormPanel.tsx`
- Field Widget: `src/components/template-editor/FieldWidget.tsx`
- Topbar: `src/components/editor/EditorTopbar.tsx`

### Templates
- All templates: `src/external-templates/{template-name}/`
- Schema files: `src/external-templates/{template-name}/schema.ts`
- Component files: `src/external-templates/{template-name}/index.tsx`

### Migrations
- All migrations: `supabase/migrations/`
- Latest: `supabase/migrations/20260909000003_add_pashadev_admin.sql`

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run Supabase locally (optional)
npx supabase start

# Push migrations to remote database
npx supabase db push

# Generate TypeScript types from database
npx supabase gen types typescript --local > src/integrations/supabase/types.ts
```

## Support

For technical issues with the codebase, check:
1. `DEPLOYMENT_SUMMARY.md` - Latest changes and status
2. `INVALID_API_KEY_FIXED.md` - API key fix documentation
3. This file - Quick reference for common tasks

For user support:
- WhatsApp: +92 332 4967481
- Admin Dashboard: `/admin`
