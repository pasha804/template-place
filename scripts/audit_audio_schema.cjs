const fs = require('fs');
const path = require('path');

const extDir = path.join(__dirname, '../src/external-templates');
const templates = fs.readdirSync(extDir).filter(f => fs.statSync(path.join(extDir, f)).isDirectory());

console.log('=== EXTERNAL TEMPLATES AUDIO SCHEMA AUDIT ===');
templates.forEach(t => {
  const schemaPath = path.join(extDir, t, 'schema.ts');
  if (!fs.existsSync(schemaPath)) {
    console.log(t, 'NO SCHEMA FILE!');
    return;
  }
  const content = fs.readFileSync(schemaPath, 'utf8');
  const hasAudioKind = content.includes('kind: "audio"') || content.includes("kind: 'audio'");
  const hasAudioKey = content.includes('audioSrc') || content.includes('bgMusicUrl') || content.includes('musicUrl');
  console.log(t.padEnd(26), '=> kind:audio?', hasAudioKind ? 'YES' : 'MISSING', '| hasAudioKey?', hasAudioKey ? 'YES' : 'MISSING');
});
