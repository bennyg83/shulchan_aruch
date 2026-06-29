#!/usr/bin/env node
/** Generator for _tr-data-190.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PART1 } from './_gen-tr-190-part1.mjs';
import { PART2 } from './_gen-tr-190-part2.mjs';
import { PART3 } from './_gen-tr-190-part3.mjs';
import { PART4 } from './_gen-tr-190-part4.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const TRANSLATIONS = {
  ...PART1,
  ...PART2,
  ...PART3,
  ...PART4,
};

let body = `/** Editorial translations for siman 190 failing blocks — per slug */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(TRANSLATIONS)) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;
fs.writeFileSync(path.join(WORK, '_tr-data-190.mjs'), body);
const total = Object.values(TRANSLATIONS).reduce((a, o) => a + Object.keys(o).length, 0);
console.log('wrote _tr-data-190.mjs, keys:', total);
