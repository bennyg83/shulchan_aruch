#!/usr/bin/env node
/** Fill _chunks-SIM/*.json using polish101 for slugs/keys not already present */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { polish101, polish102 } from './_yd001-translate-shared.mjs';

const sim = process.argv[2];
const slugs = process.argv.slice(3);
if (!sim) {
  console.error('Usage: node _fill-chunks-polish.mjs SIMAN [slug ...]');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const polish = sim === '102' ? polish102 : polish101;
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const chunkDir = path.join(WORK, `_chunks-${sim}`);
fs.mkdirSync(chunkDir, { recursive: true });

function strip(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

const targets = slugs.length ? slugs : Object.keys(heb);
let added = 0;
let hebLeft = 0;

for (const slug of targets) {
  if (!heb[slug]) continue;
  const fp = path.join(chunkDir, `${slug}.json`);
  const existing = fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    if (existing[key] && !/[\u0590-\u05FF]{3,}/.test(existing[key])) continue;
    const t = polish(strip(entry.heb || entry.raw || ''));
    existing[key] = t;
    added++;
    if (/[\u0590-\u05FF]{3,}/.test(t)) hebLeft++;
  }
  fs.writeFileSync(fp, JSON.stringify(existing, null, 2) + '\n');
  console.log(`Updated ${slug} (${Object.keys(existing).length} keys)`);
}

console.log(`Filled ${added} keys, ${hebLeft} still contain Hebrew`);
