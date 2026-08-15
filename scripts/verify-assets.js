import fs from "fs";
import path from "path";

const publicDir = path.resolve("public");
console.log("=== SCANNING ALL TEMPLATE FILES FOR STATIC ASSETS ===");

const templateSrcDirs = [
  path.resolve("src/external-templates"),
  path.resolve("src/templates"),
];

let totalAssetsFound = 0;
let missingAssets = 0;

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const matches = content.matchAll(/["'](\/templates\/[^"']+)["']/g);
      for (const m of matches) {
        const assetUrl = m[1];
        totalAssetsFound++;
        const diskPath = path.join(publicDir, assetUrl.replace(/^\//, ""));
        if (!fs.existsSync(diskPath)) {
          console.error(`❌ Missing asset: "${assetUrl}" in ${path.relative(process.cwd(), fullPath)} -> Not found at: ${diskPath}`);
          missingAssets++;
        }
      }
    }
  }
}

for (const d of templateSrcDirs) {
  scanDir(d);
}

console.log(`\nScan Summary:`);
console.log(`- Total asset references found: ${totalAssetsFound}`);
console.log(`- Total missing assets: ${missingAssets}`);

if (missingAssets > 0) {
  console.error("❌ Some referenced assets are missing!");
  process.exit(1);
} else {
  console.log("✅ ALL REFERENCED TEMPLATE ASSETS EXIST IN /public/!");
}
