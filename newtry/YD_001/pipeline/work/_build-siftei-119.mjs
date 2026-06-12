#!/usr/bin/env node
/** Build siftei-kohen.json with bracket wrapping */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { T } from './_tr119-siftei-data.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-119.json'), 'utf8'))['siftei-kohen'];

fs.writeFileSync(
  path.join(WORK, '_tr119-siftei-translations.json'),
  JSON.stringify(T, null, 2) + '\n',
);

const out = { 'siftei-kohen': {} };
for (const [key, entry] of Object.entries(heb)) {
  const bracket = entry.heb.trim().startsWith('[');
  const body = T[key];
  if (!body) throw new Error('missing translation ' + key);
  const escaped = body.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  out['siftei-kohen'][key] = bracket ? `["${escaped}"]` : body;
}

fs.mkdirSync(path.join(WORK, '_tr119-slugs'), { recursive: true });
fs.writeFileSync(
  path.join(WORK, '_tr119-slugs', 'siftei-kohen.json'),
  JSON.stringify(out, null, 2) + '\n',
);
console.log('Wrote siftei-kohen.json', Object.keys(out['siftei-kohen']).length);
