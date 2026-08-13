// Template Registry Verification Script
// Checks all 16 external templates for UUID uniqueness

import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

const templatesDir = './src/external-templates';
const templates = readdirSync(templatesDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`\n🔍 Verifying ${templates.length} templates...\n`);

const manifestData = [];
const uuidMap = new Map();
let errors = 0;

for (const template of templates) {
  const indexPath = join(templatesDir, template, 'index.ts');
  try {
    const content = readFileSync(indexPath, 'utf-8');
    const idMatch = content.match(/id:\s*["']([^"']+)["']/);
    const slugMatch = content.match(/slug:\s*["']([^"']+)["']/);
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    
    if (!idMatch || !slugMatch || !nameMatch) {
      console.log(`❌ ${template}: Missing manifest data`);
      errors++;
      continue;
    }
    
    const id = idMatch[1];
    const slug = slugMatch[1];
    const name = nameMatch[1];
    
    manifestData.push({ template, id, slug, name });
    
    if (uuidMap.has(id)) {
      console.log(`❌ UUID COLLISION: ${template} and ${uuidMap.get(id)} share UUID: ${id}`);
      errors++;
    } else {
      uuidMap.set(id, template);
      console.log(`✅ ${template.padEnd(25)} → ${id}`);
    }
  } catch (e) {
    console.log(`❌ ${template}: Error reading file - ${e.message}`);
    errors++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Total templates: ${templates.length}`);
console.log(`   Unique UUIDs: ${uuidMap.size}`);
console.log(`   Errors: ${errors}`);

if (errors === 0 && uuidMap.size === templates.length) {
  console.log(`\n✅ All templates verified successfully!\n`);
  process.exit(0);
} else {
  console.log(`\n❌ Verification failed!\n`);
  process.exit(1);
}
