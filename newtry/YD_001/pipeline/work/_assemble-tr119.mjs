#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS as BASE } from './_tr119-full.mjs';
import { AUTO } from './_tr119-auto-remaining.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const slugDir = path.join(WORK, '_tr119-slugs');
const merged = structuredClone(BASE);

for (const slug of Object.keys(AUTO)) {
  merged[slug] = { ...(merged[slug] || {}), ...AUTO[slug] };
}

for (const f of fs.readdirSync(slugDir).filter((x) => x.endsWith('.json'))) {
  const part = JSON.parse(fs.readFileSync(path.join(slugDir, f), 'utf8'));
  for (const [slug, keys] of Object.entries(part)) {
    merged[slug] = { ...(merged[slug] || {}), ...keys };
  }
}

fs.mkdirSync(path.join(WORK, '_tr-parts-119'), { recursive: true });
let n = 0;
for (const [slug, keys] of Object.entries(merged)) {
  fs.writeFileSync(
    path.join(WORK, '_tr-parts-119', `${slug}.json`),
    JSON.stringify({ [slug]: keys }, null, 2) + '\n',
  );
  n += Object.keys(keys).length;
}

const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-119.json'), 'utf8'));
const missing = [];
let hebLeft = 0;
for (const slug of Object.keys(heb)) {
  for (const key of Object.keys(heb[slug])) {
    const v = merged[slug]?.[key];
    if (!v) missing.push(`${slug}:${key}`);
    else if (/[\u0590-\u05FF]/.test(v)) hebLeft++;
  }
}
console.log(`Assembled ${n} keys; missing ${missing.length}; with Hebrew letters ${hebLeft}`);
if (missing.length) {
  console.error(missing.slice(0, 20).join('\n'));
  process.exit(1);
}
