#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '../..');
const OUT = path.join(ROOT, 'output', 'siman_036');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(s) {
  return s
    .replace(/<small>הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<img[^>]*>/g, '[diagram]')
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
    if (f.startsWith('part-') && f.endsWith('.txt')) files.push(`${dir}/${f}`);
  }
}
files.sort();

const all = [];
for (const dirFile of files) {
  const rel = `siman_036/${dirFile}`;
  const s = fs.readFileSync(path.join(ROOT, 'output', rel), 'utf8');
  for (const block of s.split(BLOCK).slice(1)) {
    const slug = block.match(/^\s*slug: (.+)$/m)[1].trim();
    const seif = block.match(/^\s*seif: (.+)$/m)[1].trim();
    const marker = (block.match(/^\s*marker: (.+)$/m) || [])[1]?.trim() || 'main';
    const heStart = block.indexOf(HEB);
    const heEnd = block.indexOf(ENG);
    const hebrew = stripHtml(block.slice(heStart + HEB.length + 1, heEnd));
    all.push({ rel, slug, key: `${seif}#${marker}`, hebrew });
  }
}

fs.writeFileSync(path.join(__dir, 'blocks-036.json'), JSON.stringify(all, null, 2), 'utf8');
console.log('Wrote', all.length, 'blocks');
