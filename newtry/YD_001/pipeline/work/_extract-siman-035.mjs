#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const d = path.join(ROOT, 'output', 'siman_035');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const H = '**** HEBREW ****';
const E = '**** ENGLISH ****';

function stripHtml(s) {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const out = {};
for (const slug of fs.readdirSync(d).sort()) {
  const fp = path.join(d, slug, 'part-001.txt');
  if (!fs.existsSync(fp)) continue;
  const s = fs.readFileSync(fp, 'utf8');
  const parts = s.split(BLOCK).slice(1);
  out[slug] = parts.map((block) => {
    const seif = block.match(/^\s*seif: (.+)$/m)[1].trim();
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const marker = markerM ? markerM[1].trim() : 'main';
    const hStart = block.indexOf(H) + H.length + 1;
    const hEnd = block.indexOf(E);
    const heb = stripHtml(block.slice(hStart, hEnd));
    return { key: `${seif}#${marker}`, heb };
  });
}

const dest = path.join(path.dirname(fileURLToPath(import.meta.url)), '_siman-035-blocks.json');
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
let t = 0;
for (const k of Object.keys(out)) {
  console.log(`${k}: ${out[k].length}`);
  t += out[k].length;
}
console.log('TOTAL', t);
