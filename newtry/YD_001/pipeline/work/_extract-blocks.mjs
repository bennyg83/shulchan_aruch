#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _extract-blocks.mjs 080|081|082');
  process.exit(1);
}
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dir = path.join(ROOT, 'output', `siman_${sim}`);
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(s) {
  return s
    .replace(/<small>הגה\s*/gi, '{Rama: ')
    .replace(/<\/small>/gi, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const out = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const fp = path.join(dir, slug, 'part-001.txt');
  if (!fs.existsSync(fp)) continue;
  out[slug] = {};
  for (const block of fs.readFileSync(fp, 'utf8').split(BLOCK).slice(1)) {
    const seif = block.match(/^\s*seif: (.+)$/m)?.[1].trim();
    const marker = block.match(/^\s*marker: (.+)$/m)?.[1].trim() ?? 'main';
    const h0 = block.indexOf(HEB);
    const e0 = block.indexOf(ENG);
    const heb = stripHtml(block.slice(h0 + HEB.length, e0));
    out[slug][`${seif}#${marker}`] = heb;
  }
}
const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), `_hebrew-siman-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
let n = 0;
for (const s of Object.values(out)) n += Object.keys(s).length;
console.log(`Wrote ${outPath} — ${n} blocks`);
