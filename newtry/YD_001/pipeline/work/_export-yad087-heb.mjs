#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const h = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-087.json'), 'utf8'));
const dir = path.join(WORK, '_en', 'yad087');
fs.mkdirSync(dir, { recursive: true });

function strip(html) {
  return html
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"');
}

for (const slug of ['yad-avraham', 'yad-ephraim']) {
  const short = slug === 'yad-avraham' ? 'avraham' : 'ephraim';
  for (const [k, v] of Object.entries(h[slug])) {
    const name = `${short}-${k.replace('#', '')}.heb.txt`;
    fs.writeFileSync(path.join(dir, name), strip(v.heb));
  }
}
console.log('exported to', dir);
