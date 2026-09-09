/**
 * Test Supabase API Keys
 * 
 * This script tests if your Supabase API keys are valid by:
 * 1. Attempting to connect to Supabase
 * 2. Making a simple query
 * 3. Reporting if keys are valid or invalid
 * 
 * Usage:
 * 1. Update SUPABASE_URL and SUPABASE_KEY below
 * 2. Run: node scripts/test-api-keys.js
 */

import { createClient } from '@supabase/supabase-js';

// === CONFIGURATION ===
// Paste your keys from: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SUPABASE_KEY = 'sb_publishable_JY2lrUz1vqi2qMJreIfprg_3xbJ4jCCC'; // anon/public key

console.log('🔍 Testing Supabase API Keys...\n');
console.log('━'.repeat(80));
console.log('\n📋 Configuration:');
console.log(`  URL: ${SUPABASE_URL}`);
console.log(`  Key: ${SUPABASE_KEY.substring(0, 20)}...${SUPABASE_KEY.substring(SUPABASE_KEY.length - 10)}`);
console.log('\n' + '━'.repeat(80));

async function testAPIKeys() {
  try {
    console.log('\n🔌 Step 1: Creating Supabase client...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    
    console.log('✅ Client created successfully');
    
    console.log('\n🔍 Step 2: Testing connection (querying templates table)...');
    
    const { data, error, count } = await supabase
      .from('templates')
      .select('id, name', { count: 'exact', head: false });
    
    if (error) {
      console.log('\n❌ ERROR: API keys are INVALID or database access is restricted');
      console.log('\n📋 Error Details:');
      console.log(`  Message: ${error.message}`);
      console.log(`  Code: ${error.code || 'N/A'}`);
      console.log(`  Hint: ${error.hint || 'N/A'}`);
      
      if (error.message.includes('Invalid API key') || error.message.includes('JWT')) {
        console.log('\n💡 Solution:');
        console.log('  1. Go to: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api');
        console.log('  2. Copy the "anon public" key');
        console.log('  3. Update SUPABASE_KEY in this script');
        console.log('  4. Run again: node scripts/test-api-keys.js');
      }
      
      console.log('\n' + '━'.repeat(80));
      process.exit(1);
    }
    
    console.log('✅ Connection successful!');
    console.log(`✅ Found ${count || data?.length || 0} templates in database`);
    
    console.log('\n🔍 Step 3: Testing authentication endpoints...');
    
    // Test if we can access auth (this will fail but error message tells us if key works)
    const { error: authError } = await supabase.auth.getSession();
    
    if (authError && authError.message.includes('Invalid API key')) {
      console.log('\n❌ Auth test failed - API key is invalid');
      console.log('\n💡 Get correct key from: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api');
      console.log('\n' + '━'.repeat(80));
      process.exit(1);
    }
    
    console.log('✅ Authentication endpoint accessible');
    
    console.log('\n' + '━'.repeat(80));
    console.log('\n🎉 SUCCESS! Your API keys are VALID ✅');
    console.log('\n✅ Summary:');
    console.log('  • Connection: Working');
    console.log('  • Database: Accessible');
    console.log('  • Auth: Configured');
    console.log(`  • Templates: ${count || data?.length || 0} found`);
    
    console.log('\n📋 These keys are correct! Use them in:');
    console.log('  • src/integrations/supabase/client.ts');
    console.log('  • src/integrations/supabase/client.server.ts');
    console.log('  • src/integrations/supabase/auth-middleware.ts');
    
    console.log('\n' + '━'.repeat(80));
    console.log('\n✨ Your Supabase configuration is working correctly!\n');
    
  } catch (err) {
    console.log('\n❌ UNEXPECTED ERROR:');
    console.log(err);
    console.log('\n💡 This might be a network issue or invalid URL');
    console.log('\nVerify:');
    console.log(`  • URL is correct: ${SUPABASE_URL}`);
    console.log('  • You have internet connection');
    console.log('  • Supabase project exists');
    console.log('\n' + '━'.repeat(80));
    process.exit(1);
  }
}

// Run the test
testAPIKeys();
