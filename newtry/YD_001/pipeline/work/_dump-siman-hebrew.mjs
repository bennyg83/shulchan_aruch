#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) throw new Error('usage: node _dump-siman-hebrew.mjs 068');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const H = '**** HEBREW ****';
const dir = path.join(ROOT, 'output', `siman_${sim}`);

function strip(html) {
  return html
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[^;]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const out = {};
for (const slug of fs
  .readdirSync(dir)
  .filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
  .sort()) {
  const fp = path.join(dir, slug, 'part-001.txt');
  if (!fs.existsSync(fp)) continue;
  const s = fs.readFileSync(fp, 'utf8');
  out[slug] = {};
  for (const b of s.split(BLOCK).slice(1)) {
    const seif = (b.match(/seif: (.+)/) || [])[1]?.trim();
    const marker = (b.match(/marker: (.+)/) || [])[1]?.trim() || 'main';
    const hi = b.indexOf(H);
    const ei = b.indexOf('**** ENGLISH ****');
    out[slug][`${seif}#${marker}`] = strip(b.slice(hi + H.length, ei));
  }
}
const outPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  `_siman-${sim}-hebrew-dump.json`,
);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(
  'wrote',
  outPath,
  Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Object.keys(v).length])),
);
