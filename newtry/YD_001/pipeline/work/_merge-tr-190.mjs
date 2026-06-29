#!/usr/bin/env node
/** Merge _gen-tr-190-part*.mjs into _tr-data-190.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PART1 } from './_gen-tr-190-part1.mjs';
import { PART2 } from './_gen-tr-190-part2.mjs';
import { PART3 } from './_gen-tr-190-part3.mjs';
import { PART4 } from './_gen-tr-190-part4.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const failing = JSON.parse(fs.readFileSync(path.join(WORK, '_failing-siman-190.json'), 'utf8'));

const TRANSLATIONS = { ...PART1, ...PART2, ...PART3, ...PART4 };

const missing = [];
for (const b of failing) {
  if (!TRANSLATIONS[b.slug]?.[b.key]) missing.push(`${b.slug}\t${b.key}`);
}
if (missing.length) {
  console.error('MISSING', missing.length);
  missing.forEach((m) => console.error(m));
  process.exit(1);
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = `/** Editorial translations for siman 190 failing blocks — ketamim (${failing.length} blocks) */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS).sort()) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug]).sort()) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;

fs.writeFileSync(path.join(WORK, '_tr-data-190.mjs'), body, 'utf8');
const total = Object.values(TRANSLATIONS).reduce((a, o) => a + Object.keys(o).length, 0);
console.log(`wrote _tr-data-190.mjs (${total} blocks)`);
