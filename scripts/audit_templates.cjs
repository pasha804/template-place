const fs = require('fs');
const path = require('path');

const extDir = path.resolve(__dirname, '../src/external-templates');
const templates = fs.readdirSync(extDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log('=== FULL TEMPLATE AUDIT ===');
for (const t of templates) {
  console.log('\n========================================');
  console.log(`TEMPLATE: ${t}`);
  
  const indexPath = path.join(extDir, t, 'index.ts');
  const schemaPath = path.join(extDir, t, 'schema.ts');
  const rendererPath = path.join(extDir, t, 'Renderer.tsx');

  let manifest = {};
  if (fs.existsSync(indexPath)) {
    const iContent = fs.readFileSync(indexPath, 'utf8');
    const idMatch = iContent.match(/id:\s*["']([^"']+)["']/);
    const slugMatch = iContent.match(/slug:\s*["']([^"']+)["']/);
    const nameMatch = iContent.match(/name:\s*["']([^"']+)["']/);
    manifest = {
      id: idMatch ? idMatch[1] : 'unknown',
      slug: slugMatch ? slugMatch[1] : 'unknown',
      name: nameMatch ? nameMatch[1] : 'unknown',
    };
    console.log(`Manifest ID: ${manifest.id} | Slug: ${manifest.slug} | Name: ${manifest.name}`);
  }

  if (fs.existsSync(schemaPath)) {
    const sContent = fs.readFileSync(schemaPath, 'utf8');
    // Extract sections
    console.log('\n--- Schema Sections & Fields ---');
    const secRegex = /{\s*key:\s*["']([^"']+)["'],\s*label:\s*["']([^"']+)["'],[\s\S]*?fields:\s*\[([\s\S]*?)\]\s*}/g;
    let secMatch;
    while ((secMatch = secRegex.exec(sContent)) !== null) {
      const secKey = secMatch[1];
      const secLabel = secMatch[2];
      const fieldsBlock = secMatch[3];
      const fieldRegex = /key:\s*["']([^"']+)["'],\s*label:\s*["']([^"']+)["'],\s*kind:\s*["']([^"']+)["']/g;
      const fields = [];
      let fMatch;
      while ((fMatch = fieldRegex.exec(fieldsBlock)) !== null) {
        fields.push(`${fMatch[1]} (${fMatch[3]})`);
      }
      console.log(`  Section [${secKey}] "${secLabel}": ${fields.join(', ')}`);
    }

    // Extract defaults audio keys
    const audioDefMatches = sContent.match(/(?:audioSrc|audio|bgMusic|bgMusicUrl|music|song|trackUrl|soundUrl)[^,\n]*/gi);
    console.log('  Audio Defaults:', audioDefMatches || 'None');
    
    // Name fields in defaults
    const nameDefMatches = sContent.match(/(?:birthdayName|recipientName|personName|name|groomName|brideName|senderName)[^,\n]*/gi);
    console.log('  Name Defaults:', nameDefMatches || 'None');
  }

  if (fs.existsSync(rendererPath)) {
    const rContent = fs.readFileSync(rendererPath, 'utf8');
    // Check how audio is handled in Renderer
    const hasAudioTag = /<audio/i.test(rContent);
    const hasNewAudio = /new Audio/i.test(rContent);
    const hasMusicComponent = /Music|Song|Audio|BgMusic/i.test(rContent);
    console.log('\n--- Renderer Audio Handling ---');
    console.log(`  <audio> tag: ${hasAudioTag} | new Audio: ${hasNewAudio} | Music Component: ${hasMusicComponent}`);
    
    // Extract audio references in Renderer
    const audioLines = rContent.split('\n').filter(line => /audio|music|song|sound|play/i.test(line));
    console.log(`  Audio lines in Renderer (${audioLines.length} lines found):`);
    audioLines.slice(0, 5).forEach(l => console.log('    ' + l.trim()));
    if (audioLines.length > 5) console.log(`    ... (${audioLines.length - 5} more lines)`);
  }
}
