#!/usr/bin/env node
/** Extract T map from _build-siftei-119.mjs into JSON (fixes quote issues). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const lines = fs.readFileSync(path.join(WORK, '_build-siftei-119.mjs'), 'utf8').split('\n');

const T = {};
let key = null;
let quote = null;
let buf = '';

function flush() {
  if (!key) return;
  T[key] = buf;
  key = null;
  buf = '';
  quote = null;
}

for (const line of lines) {
  const km = line.match(/^  '([^']+)':\s*$/);
  if (km) {
    flush();
    key = km[1];
    continue;
  }
  if (!key) continue;

  const one = line.match(/^    (["'`])(.*)\1,\s*$/);
  if (one) {
    buf = one[2].replace(/\\'/g, "'").replace(/\\"/g, '"');
    flush();
    continue;
  }

  const open = line.match(/^    (["'`])(.*)$/);
  if (open && !quote) {
    quote = open[1];
    buf = open[2];
    continue;
  }

  if (quote) {
    const close = line.match(/^(.*)\1,\s*$/);
    if (close && line.includes(quote)) {
      buf += '\n' + close[1];
      flush();
    } else {
      buf += '\n' + line;
    }
  }
}
flush();

const outPath = path.join(WORK, '_tr119-siftei-translations.json');
fs.writeFileSync(outPath, JSON.stringify(T, null, 2) + '\n');
console.log('Wrote', outPath, Object.keys(T).length, 'keys');
const bad = Object.keys(T).filter((k) => !T[k] || T[k].length < 20);
if (bad.length) console.log('short/missing:', bad.join(', '));
