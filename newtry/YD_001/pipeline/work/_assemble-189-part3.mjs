#!/usr/bin/env node
/** Assemble _tr-189-part3.mjs from SK + CH modules */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SK } from './_tr-189-part3-sk.mjs';
import { CH } from './_tr-189-part3-ch.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const PART3 = { 'siftei-kohen': SK, 'chiddushei-hilkhot-niddah': CH };

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = `/** Hand-authored editorial translations — siman 189 part 3 (46 blocks) */\nexport const PART3 = {\n`;
for (const [slug, keys] of Object.entries(PART3)) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys).sort()) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;

const out = path.join(WORK, '_tr-189-part3.mjs');
fs.writeFileSync(out, body, 'utf8');
const n = Object.values(PART3).reduce((a, o) => a + Object.keys(o).length, 0);
console.log(`wrote ${out} (${n} blocks)`);
