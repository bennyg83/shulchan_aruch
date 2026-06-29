#!/usr/bin/env node
/** Assemble _tr-data-187.mjs from parts */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PART1 } from './_tr-187-part1.mjs';
import { PART2 } from './_tr-187-part2.mjs';
import { PART3 } from './_tr-187-part3.mjs';
import { PART4 } from './_tr-187-part4.mjs'; // merges part4a + part4b

const WORK = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const TRANSLATIONS = { ...PART1, ...PART2, ...PART3, ...PART4 };

let body = `/** Editorial translations for siman 187 failing blocks — roeh machmat tashmish / wound / birth */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(TRANSLATIONS).sort()) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys).sort()) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;

const out = path.join(WORK, '_tr-data-187.mjs');
fs.writeFileSync(out, body, 'utf8');
const total = Object.values(TRANSLATIONS).reduce((a, o) => a + Object.keys(o).length, 0);
console.log('wrote _tr-data-187.mjs, keys:', total);
