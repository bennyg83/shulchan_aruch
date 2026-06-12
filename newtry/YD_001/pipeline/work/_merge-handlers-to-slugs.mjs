#!/usr/bin/env node
/** Merge translations-090/*.mjs with HANDLERS_090 overrides (handlers win). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HANDLERS_090 } from './_handlers-090.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(WORK, 'translations-090');

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.mjs'))) {
  const slug = file.replace(/\.mjs$/, '');
  const mod = await import(`./translations-090/${slug}.mjs?u=${Date.now()}`);
  const merged = { ...mod.default, ...(HANDLERS_090[slug] || {}) };
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(merged)) {
    lines.push(`  '${k}': ${JSON.stringify(v)},`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(dir, file), lines.join('\n'), 'utf8');
  const heb = (lines.join('\n').match(/[\u0590-\u05FF]/g) || []).length;
  console.log(`${slug}: ${Object.keys(merged).length} keys, ${heb} Hebrew chars`);
}
