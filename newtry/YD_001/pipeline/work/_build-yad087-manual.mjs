#!/usr/bin/env node
/** Build _manual-087-yad*.json from _en/yad087/*.en.txt (key = N#_) */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(WORK, '_en', 'yad087');

function load(prefix, outFile) {
  const map = {};
  for (const f of fs.readdirSync(dir)) {
    const m = f.match(new RegExp(`^${prefix}-(\\d+)_\\.en\\.txt$`));
    if (!m) continue;
    const key = `${m[1]}#_`;
    const t = fs.readFileSync(path.join(dir, f), 'utf8').trim();
    if (t.length < 40) throw new Error(`too short ${f}`);
    if (/[\u0590-\u05FF]/.test(t)) throw new Error(`hebrew in ${f}`);
    map[key] = t;
  }
  const expected = 11;
  if (Object.keys(map).length !== expected) {
    throw new Error(`${prefix}: got ${Object.keys(map).length}, need ${expected}`);
  }
  fs.writeFileSync(path.join(WORK, outFile), JSON.stringify(map, null, 2) + '\n');
  console.log('wrote', outFile, Object.keys(map).length);
}

load('avraham', '_manual-087-yad.json');
load('ephraim', '_manual-087-yad-eph.json');
