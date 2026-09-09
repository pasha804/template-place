/**
 * Bulk User Invite Script
 * 
 * This script invites multiple users to the new Supabase database.
 * Users will receive email invites to set their passwords.
 * 
 * Usage:
 * 1. Get your Service Role Key from: 
 *    https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api
 * 2. Add user emails to the 'emails' array below
 * 3. Run: node scripts/bulk-invite-users.js
 */

import { createClient } from '@supabase/supabase-js';

// === CONFIGURATION ===
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE'; // Get from: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

// === USER EMAILS TO INVITE ===
// Add emails from old database here
// To get emails: Go to https://supabase.com/dashboard/project/ptcbaphzoceumekzymsa/sql
// Run: SELECT email FROM auth.users WHERE email IS NOT NULL ORDER BY created_at DESC;
// Copy the email column and paste below
const emails = [
  // Paste user emails here, one per line:
  // 'user1@example.com',
  // 'user2@example.com',
  // 'user3@example.com',
];

// === SCRIPT ===
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function inviteUsers() {
  console.log(`🚀 Starting bulk invite for ${emails.length} users...\n`);
  
  let successCount = 0;
  let failureCount = 0;
  const failures = [];

  for (let i = 0; i < emails.length; i++) {
    const email = emails[i].trim();
    
    if (!email) continue;
    
    console.log(`[${i + 1}/${emails.length}] Inviting: ${email}`);
    
    try {
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.PUBLIC_URL || 'https://your-website.com'}/auth/reset-password`
      });
      
      if (error) {
        console.error(`  ❌ Failed: ${error.message}`);
        failureCount++;
        failures.push({ email, error: error.message });
      } else {
        console.log(`  ✅ Invited successfully`);
        successCount++;
      }
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
      failureCount++;
      failures.push({ email, error: err.message });
    }
    
    // Rate limiting: wait 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 MIGRATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Successfully invited: ${successCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  
  if (failures.length > 0) {
    console.log('\n❌ Failed invites:');
    failures.forEach(f => {
      console.log(`  - ${f.email}: ${f.error}`);
    });
  }
  
  console.log('\n✨ Done! Users will receive invite emails.');
  console.log('They need to click the link to set their password.\n');
}

// Run the script
if (SERVICE_ROLE_KEY === 'YOUR_SERVICE_ROLE_KEY_HERE') {
  console.error('❌ ERROR: Please set your SERVICE_ROLE_KEY in the script!');
  console.error('\nGet it from: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api');
  console.error('Look for "service_role" key (NOT the anon key)\n');
  process.exit(1);
}

if (emails.length === 0) {
  console.error('❌ ERROR: No emails provided!');
  console.error('\nAdd user emails to the "emails" array in the script.\n');
  process.exit(1);
}

inviteUsers().catch(console.error);
