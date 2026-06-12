#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_tr119-full.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(WORK, '_tr-parts-119');
fs.mkdirSync(outDir, { recursive: true });
let n = 0;
for (const [slug, keys] of Object.entries(TRANSLATIONS)) {
  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify({ [slug]: keys }, null, 2) + '\n',
  );
  n += Object.keys(keys).length;
}
console.log(`Wrote ${outDir} — ${n} keys in ${Object.keys(TRANSLATIONS).length} files`);
