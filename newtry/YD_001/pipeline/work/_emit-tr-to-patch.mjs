#!/usr/bin/env node
/** _tr-NNN.json (slug -> key -> english) → _patch-siman-NNN-translations.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _emit-tr-to-patch.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const trPath = path.join(WORK, `_tr-${sim}.json`);
if (!fs.existsSync(trPath)) {
  console.error(`Missing ${trPath}`);
  process.exit(1);
}
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

const missing = [];
let hebLeft = 0;
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    if (!tr[slug]?.[key]) missing.push(`${slug}:${key}`);
    else if (/[\u0590-\u05FF]{3,}/.test(tr[slug][key])) hebLeft++;
  }
}
if (missing.length) {
  console.error(`Missing ${missing.length} keys in _tr-${sim}.json`);
  console.error(missing.slice(0, 30).join('\n'));
  process.exit(1);
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let out = `/** YD001 full translations siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(tr).sort()) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(tr[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
fs.writeFileSync(outPath, out);
console.log(`Wrote ${outPath} — ${Object.values(tr).reduce((a, m) => a + Object.keys(m).length, 0)} blocks, ${hebLeft} with Hebrew remaining`);
