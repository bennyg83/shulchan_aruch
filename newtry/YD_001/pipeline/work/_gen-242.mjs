#!/usr/bin/env node
import fs from 'fs';
import { TRANSLATIONS } from './_tr-data-242-partial.mjs';

let body = `/** Editorial translations — siman 242 (83 blocks) — Kavod HaRav */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(TRANSLATIONS)) {
  body += `  '${slug}': {\n`;
  for (const [k, v] of Object.entries(keys)) {
    const esc = v.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
    body += `    '${k}': \`${esc}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;
fs.writeFileSync('pipeline/work/_tr-data-242.mjs', body);
console.log('done', Object.values(TRANSLATIONS).reduce((n,o)=>n+Object.keys(o).length,0));
