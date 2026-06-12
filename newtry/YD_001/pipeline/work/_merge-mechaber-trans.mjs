#!/usr/bin/env node
/** Merge partial TRANSLATIONS modules: node _merge-mechaber-trans.mjs 331 p1 p2 p3 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const parts = process.argv.slice(3);
if (!sim || !parts.length) {
  console.error('Usage: node _merge-mechaber-trans.mjs SIMAN part1 part2 ...');
  process.exit(1);
}
const merged = {};
for (const p of parts) {
  const mod = await import(pathToFileURL(path.join(WORK, `_mechaber-trans-${sim}-${p}.mjs`)).href);
  Object.assign(merged, mod.TRANSLATIONS);
}
function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
let out = `/** YD001 mechaber quality-pass siman ${sim} (merged) */\nexport const TRANSLATIONS = {\n`;
for (const [key, text] of Object.entries(merged)) {
  out += `  '${key}':\n    '${esc(text)}',\n`;
}
out += `};\n`;
const outPath = path.join(WORK, `_mechaber-trans-${sim}.mjs`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(merged).length} keys)`);
