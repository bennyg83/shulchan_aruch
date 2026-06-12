#!/usr/bin/env node
/** node _json-to-mechaber-trans.mjs 334 _trans-data-334.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const jsonArg = process.argv[3];
if (!sim || !jsonArg) {
  console.error('Usage: node _json-to-mechaber-trans.mjs SIMAN data.json');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(path.join(WORK, jsonArg), 'utf8'));
function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
let out = `/** YD001 mechaber quality-pass siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const [key, text] of Object.entries(data)) {
  out += `  '${key}':\n    '${esc(text)}',\n`;
}
out += `};\n`;
const outPath = path.join(WORK, `_mechaber-trans-${sim}.mjs`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(data).length} keys)`);
