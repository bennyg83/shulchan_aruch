#!/usr/bin/env node
/** Write _mechaber-trans-NNN.mjs directly from _overrides-mechaber-NNN.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _gen-mechaber-from-overrides.mjs SIMAN');
  process.exit(1);
}
const ovPath = path.join(WORK, `_overrides-mechaber-${sim}.json`);
const ov = JSON.parse(fs.readFileSync(ovPath, 'utf8'));
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
let out = `/** YD001 mechaber quality-pass siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const [key, text] of Object.entries(ov)) {
  out += `  '${key}': \`${esc(text)}\`,\n`;
}
out += `};\n`;
const outPath = path.join(WORK, `_mechaber-trans-${sim}.mjs`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(ov).length} keys)`);
