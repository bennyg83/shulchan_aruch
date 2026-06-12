#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output', 'siman_036');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function stripHtml(s) {
  return s
    .replace(/<small>הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .trim();
}

const files = [];
for (const dir of fs.readdirSync(OUT)) {
  const d = path.join(OUT, dir);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d)) {
    if (f.startsWith('part-') && f.endsWith('.txt'))
      files.push(`siman_036/${dir}/${f}`);
  }
}
files.sort();

const all = [];
for (const rel of files) {
  const s = fs.readFileSync(path.join(ROOT, 'output', rel), 'utf8');
  const parts = s.split(BLOCK).slice(1);
  for (const block of parts) {
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    const heStart = block.indexOf(HEB);
    const heEnd = block.indexOf(ENG);
    const hebrew = stripHtml(block.slice(heStart + HEB.length + 1, heEnd));
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    all.push({ rel, slug: slugM[1].trim(), key: `${seif}#${marker}`, hebrew });
  }
}
console.log(JSON.stringify(all, null, 0));
console.error('TOTAL', all.length);
