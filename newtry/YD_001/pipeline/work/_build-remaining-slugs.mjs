#!/usr/bin/env node
/** Builds peleti, mateh-yehonatan, yad-ephraim, siftei-kohen from _remaining-094.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(DIR, '_remaining-094.json'), 'utf8'));

for (const [slug, entries] of Object.entries(data)) {
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(entries)) {
    const s = typeof v === 'string' && v.startsWith('[') ? v : JSON.stringify(v);
    lines.push(`  '${k}': ${s},`);
  }
  lines.push('};');
  lines.push('');
  fs.writeFileSync(path.join(DIR, 'translations-094', `${slug}.mjs`), lines.join('\n'), 'utf8');
  console.log(slug, Object.keys(entries).length);
}
