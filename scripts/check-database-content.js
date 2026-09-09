/**
 * Check Database Content Script
 * 
 * This script checks what data exists in the new Supabase database:
 * - Templates count
 * - Categories count
 * - Packages count
 * - Users count
 * - Pages count
 * 
 * Usage: node scripts/check-database-content.js
 */

import { createClient } from '@supabase/supabase-js';

// === CONFIGURATION ===
const SUPABASE_URL = 'https://qizoleiqjxylpiickeye.supabase.co';
const SERVICE_ROLE_KEY = 'YOUR_SERVICE_ROLE_KEY_HERE'; // Get from: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/settings/api

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function checkDatabaseContent() {
  console.log('🔍 Checking Database Content...\n');
  console.log('━'.repeat(80));
  
  try {
    // Check Templates
    const { data: templates, error: templatesError, count: templatesCount } = await supabase
      .from('templates')
      .select('id, plugin_id, name, slug', { count: 'exact' });
    
    if (templatesError) {
      console.log('❌ Templates Error:', templatesError.message);
    } else {
      console.log(`\n📋 TEMPLATES: ${templatesCount || templates?.length || 0} found`);
      if (templates && templates.length > 0) {
        console.log('\nTemplate List:');
        templates.forEach((t, i) => {
          console.log(`  ${i + 1}. ${t.name} (${t.slug})`);
        });
      } else {
        console.log('  ⚠️  No templates found in database!');
      }
    }
    
    // Check Categories
    const { data: categories, error: categoriesError, count: categoriesCount } = await supabase
      .from('categories')
      .select('id, name, slug', { count: 'exact' });
    
    if (categoriesError) {
      console.log('\n❌ Categories Error:', categoriesError.message);
    } else {
      console.log(`\n\n📁 CATEGORIES: ${categoriesCount || categories?.length || 0} found`);
      if (categories && categories.length > 0) {
        console.log('\nCategory List:');
        categories.forEach((c, i) => {
          console.log(`  ${i + 1}. ${c.name} (${c.slug})`);
        });
      } else {
        console.log('  ⚠️  No categories found in database!');
      }
    }
    
    // Check Packages
    const { data: packages, error: packagesError, count: packagesCount } = await supabase
      .from('packages')
      .select('id, name, price, duration_days', { count: 'exact' });
    
    if (packagesError) {
      console.log('\n❌ Packages Error:', packagesError.message);
    } else {
      console.log(`\n\n💰 PACKAGES: ${packagesCount || packages?.length || 0} found`);
      if (packages && packages.length > 0) {
        console.log('\nPackage List:');
        packages.forEach((p, i) => {
          console.log(`  ${i + 1}. ${p.name} - Rs. ${p.price} for ${p.duration_days} days`);
        });
      } else {
        console.log('  ⚠️  No packages found in database!');
      }
    }
    
    // Check Users (admin check)
    const { data: users, error: usersError, count: usersCount } = await supabase
      .rpc('get_user_count')
      .then(() => ({ data: null, error: { message: 'RPC not available' }, count: null }))
      .catch(() => ({ data: null, error: null, count: null }));
    
    // Alternative: Check profiles table
    const { data: profiles, error: profilesError, count: profilesCount } = await supabase
      .from('profiles')
      .select('id, role', { count: 'exact' });
    
    if (profilesError) {
      console.log('\n❌ Profiles Error:', profilesError.message);
    } else {
      console.log(`\n\n👥 USERS (Profiles): ${profilesCount || profiles?.length || 0} found`);
      if (profiles && profiles.length > 0) {
        const admins = profiles.filter(p => p.role === 'admin');
        const users = profiles.filter(p => p.role === 'user');
        console.log(`  • Admins: ${admins.length}`);
        console.log(`  • Users: ${users.length}`);
      } else {
        console.log('  ⚠️  No user profiles found in database!');
      }
    }
    
    // Check Pages
    const { data: pages, error: pagesError, count: pagesCount } = await supabase
      .from('pages')
      .select('id, status', { count: 'exact' })
      .is('deleted_at', null);
    
    if (pagesError) {
      console.log('\n❌ Pages Error:', pagesError.message);
    } else {
      console.log(`\n\n📄 PAGES: ${pagesCount || pages?.length || 0} found`);
      if (pages && pages.length > 0) {
        const draft = pages.filter(p => p.status === 'draft').length;
        const published = pages.filter(p => p.status === 'published').length;
        console.log(`  • Draft: ${draft}`);
        console.log(`  • Published: ${published}`);
      } else {
        console.log('  ℹ️  No pages found (expected - fresh database)');
      }
    }
    
    // Check Orders
    const { data: orders, error: ordersError, count: ordersCount } = await supabase
      .from('orders')
      .select('id, status', { count: 'exact' });
    
    if (ordersError) {
      console.log('\n❌ Orders Error:', ordersError.message);
    } else {
      console.log(`\n\n🛒 ORDERS: ${ordersCount || orders?.length || 0} found`);
      if (orders && orders.length > 0) {
        const pending = orders.filter(o => o.status === 'pending').length;
        const paid = orders.filter(o => o.status === 'paid').length;
        console.log(`  • Pending: ${pending}`);
        console.log(`  • Paid: ${paid}`);
      } else {
        console.log('  ℹ️  No orders found (expected - fresh database)');
      }
    }
    
  } catch (err) {
    console.error('\n❌ Unexpected Error:', err.message);
    console.error(err);
  }
  
  console.log('\n' + '━'.repeat(80));
  console.log('\n📊 SUMMARY');
  console.log('━'.repeat(80));
  console.log('✅ Templates: Should have 16 templates');
  console.log('✅ Categories: Should have 4-6 categories (birthday, proposal, sorry, anniversary, etc.)');
  console.log('✅ Packages: Should have 2 packages (Rs. 1,499 & Rs. 2,999)');
  console.log('✅ Users: Should have at least 1 admin (greetingvibes786@gmail.com)');
  console.log('ℹ️  Pages/Orders: 0 is expected for fresh migration');
  console.log('\n🔗 Dashboard: https://supabase.com/dashboard/project/qizoleiqjxylpiickeye/editor');
  console.log('\n');
}

// Run the check
checkDatabaseContent().catch(console.error);
