#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-069-translations.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const dump = JSON.parse(
  fs.readFileSync(path.join(DIR, '_siman-069-hebrew-dump.json'), 'utf8'),
);

const merged = {};
let total = 0;
for (const [slug, map] of Object.entries(TRANSLATIONS)) {
  merged[slug] = Object.keys(map).length;
  total += Object.keys(map).length;
}

const dumpCounts = {};
let dumpTotal = 0;
for (const [slug, map] of Object.entries(dump)) {
  dumpCounts[slug] = Object.keys(map).length;
  dumpTotal += Object.keys(map).length;
}

const missing = [];
const extra = [];
for (const [slug, map] of Object.entries(dump)) {
  const T = TRANSLATIONS[slug] || {};
  for (const k of Object.keys(map)) {
    if (!(k in T)) missing.push(`${slug}:${k}`);
  }
  for (const k of Object.keys(T)) {
    if (!(k in map)) extra.push(`${slug}:${k}`);
  }
}

console.log('TRANSLATIONS total:', total);
console.log('dump total:', dumpTotal);
console.log('per slug TRANSLATIONS:', merged);
console.log('per slug dump:', dumpCounts);
console.log('missing:', missing.length, missing.slice(0, 10));
console.log('extra:', extra.length, extra.slice(0, 10));
if (missing.length || extra.length || total !== dumpTotal) {
  process.exit(1);
}
console.log('[OK] All', dumpTotal, 'keys present — 0 missing, 0 extra');
