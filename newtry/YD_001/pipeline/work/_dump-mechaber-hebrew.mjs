import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const h = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const m = h.hebrewBySlug?.mechaber || {};
for (const [k, v] of Object.entries(m)) {
  const clean = v.split('\n**** ENGLISH ****')[0].trim();
  console.log(`\n=== ${k} ===\n${clean.slice(0, 500)}${clean.length > 500 ? '...' : ''}`);
}
