#!/usr/bin/env node
/** Merge _tr-189-part*.mjs into _tr-data-189.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PART1 } from './_tr-189-part1.mjs';
import { PART2 } from './_tr-189-part2.mjs';
import { PART3 } from './_tr-189-part3.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const failing = JSON.parse(fs.readFileSync(path.join(WORK, '_failing-siman-189.json'), 'utf8'));

function mergeParts(...parts) {
  const TRANSLATIONS = {};
  for (const part of parts) {
    for (const [slug, keys] of Object.entries(part)) {
      if (!TRANSLATIONS[slug]) TRANSLATIONS[slug] = {};
      Object.assign(TRANSLATIONS[slug], keys);
    }
  }
  return TRANSLATIONS;
}

const TRANSLATIONS = mergeParts(PART1, PART2, PART3);

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

let body = `/** Editorial translations for siman 189 failing blocks — veset establishment (${failing.length} blocks) */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS).sort()) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug]).sort()) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;

fs.writeFileSync(path.join(WORK, '_tr-data-189.mjs'), body, 'utf8');
const total = Object.values(TRANSLATIONS).reduce((a, o) => a + Object.keys(o).length, 0);
console.log(`wrote _tr-data-189.mjs (${total} blocks)`);
