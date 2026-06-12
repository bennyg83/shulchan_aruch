#!/usr/bin/env node
import fs from 'fs';
const parts = ['_trans-267-p1.json', '_trans-267-p2.json', '_trans-267-p3.json', '_trans-267-p4.json'];
const merged = {};
for (const p of parts) {
  Object.assign(merged, JSON.parse(fs.readFileSync(p, 'utf8')));
}
const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const body = Object.entries(merged)
  .sort((a, b) => Number(a[0].split('#')[0]) - Number(b[0].split('#')[0]))
  .map(([k, v]) => `  '${k}': \`${esc(v)}\`,`)
  .join('\n');
fs.writeFileSync('_mechaber-trans-267.mjs', `/** YD001 mechaber quality-pass siman 267 */\nexport const TRANSLATIONS = {\n${body}\n};\n`);
console.log('keys', Object.keys(merged).length);
