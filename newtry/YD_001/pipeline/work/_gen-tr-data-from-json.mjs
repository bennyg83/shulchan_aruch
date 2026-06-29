#!/usr/bin/env node
/** Generate _tr-data-NNN.mjs skeleton from failing JSON — fill TRANSLATIONS values manually or via editorial pass */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { plainFromHtml } from '../lib/quality-checks.mjs';

const siman = Number(process.argv[2]);
if (!siman) {
  console.error('Usage: node _gen-tr-data-from-json.mjs SIMAN');
  process.exit(1);
}
const WORK = path.dirname(fileURLToPath(import.meta.url));
const failing = JSON.parse(fs.readFileSync(path.join(WORK, `_failing-siman-${String(siman).padStart(3, '0')}.json`), 'utf8'));
const bySlug = {};
for (const b of failing) {
  if (!bySlug[b.slug]) bySlug[b.slug] = {};
  const hePlain = plainFromHtml(b.he).replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  bySlug[b.slug][b.key] = `TODO: translate from Hebrew — ${hePlain.slice(0, 120)}...`;
}
let out = `/** Editorial translations for siman ${siman} failing blocks — REPLACE TODO entries */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(bySlug).sort()) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys).sort()) {
    out += `    '${key}': \`${val}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;
const outPath = path.join(WORK, `_tr-data-${siman}.mjs`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${failing.length} TODO entries → ${outPath}`);
