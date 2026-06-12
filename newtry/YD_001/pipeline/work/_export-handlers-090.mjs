#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { HANDLERS_090 } from './_handlers-090.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(WORK, 'translations-090');

function strip(v) {
  if (typeof v !== 'string') return v;
  const m = v.match(/^\["([\s\S]*)"\]$/);
  return m ? m[1] : v;
}

for (const [slug, entries] of Object.entries(HANDLERS_090)) {
  const out = {};
  for (const [k, v] of Object.entries(entries)) out[k] = strip(v);
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(out)) {
    lines.push(`  '${k}': ${JSON.stringify(v)},`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(dir, `${slug}.mjs`), lines.join('\n'), 'utf8');
  let bad = 0;
  for (const v of Object.values(out)) if (/[\u0590-\u05FF]/.test(v)) bad++;
  console.log(`${slug}: ${Object.keys(out).length} keys, ${bad} Hebrew in values`);
}
