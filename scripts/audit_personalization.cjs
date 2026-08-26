const fs = require('fs');
const path = require('path');

const extDir = path.resolve(__dirname, '../src/external-templates');
const templates = fs.readdirSync(extDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('=== PERSONALIZATION & NAME AUDIT ===\n');

for (const t of templates) {
  console.log('====================================================');
  console.log(`TEMPLATE: ${t}`);
  
  const templateDir = path.join(extDir, t);
  const schemaPath = path.join(templateDir, 'schema.ts');
  const rendererPath = path.join(templateDir, 'Renderer.tsx');

  // Check schema for name fields
  if (fs.existsSync(schemaPath)) {
    const s = fs.readFileSync(schemaPath, 'utf8');
    const fields = [];
    const fRegex = /key:\s*["']([^"']+)["']/g;
    let m;
    while ((m = fRegex.exec(s)) !== null) {
      fields.push(m[1]);
    }
    const nameFields = fields.filter(k => /name|recipient|person|groom|bride|partner|sender/i.test(k));
    console.log('Schema name fields:', nameFields.join(', ') || 'NONE');
  }

  // Scan all files in original/ and Renderer.tsx for hardcoded names or suspicious patterns
  const allFiles = [];
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) scanDir(full);
      else if (/\.(tsx|ts|jsx|js)$/.test(e.name)) allFiles.push(full);
    }
  }
  scanDir(templateDir);

  const hardcodedNames = ['Ayesha', 'Madam Jii', 'Cutiepie', 'Jana', 'My Star', 'My Rose', 'Alexander', 'Sophia', 'Aariyan', 'Ananya', 'Champion', 'Angel'];
  const occurrences = [];

  for (const f of allFiles) {
    const relPath = path.relative(templateDir, f);
    const content = fs.readFileSync(f, 'utf8');
    for (const name of hardcodedNames) {
      if (content.includes(name)) {
        // Count occurrences
        const count = (content.match(new RegExp(name, 'g')) || []).length;
        occurrences.push({ file: relPath, name, count });
      }
    }
  }

  if (occurrences.length > 0) {
    console.log('Detected names in files:');
    occurrences.forEach(o => console.log(`  [${o.file}] "${o.name}" (${o.count}x)`));
  } else {
    console.log('No hardcoded sample names found.');
  }
}
