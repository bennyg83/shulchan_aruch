#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const base = JSON.parse(fs.readFileSync(path.join(WORK, `_manual-${sim}.json`), 'utf8'));
const chunkDir = path.join(WORK, `_chunks-${sim}`);
if (fs.existsSync(chunkDir)) {
  for (const f of fs.readdirSync(chunkDir).filter((x) => x.endsWith('.json'))) {
    let slug = f.replace(/\.json$/i, '');
    if (slug.startsWith('_')) slug = slug.slice(1);
    const part = JSON.parse(fs.readFileSync(path.join(chunkDir, f), 'utf8'));
    base[slug] = { ...(base[slug] || {}), ...part };
  }
}
let miss = 0;
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    if (!base[slug]?.[key]) {
      miss++;
      console.error('missing', slug, key);
    }
  }
}
if (miss) process.exit(1);
fs.writeFileSync(path.join(WORK, `_manual-${sim}.json`), JSON.stringify(base, null, 2));
console.log(`merged _manual-${sim}.json OK`);
