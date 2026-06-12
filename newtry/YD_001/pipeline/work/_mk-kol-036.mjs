#!/usr/bin/env node
/** Build _patch-siman-036-kol.mjs from per-key translation strings in kol-strings.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function strip(s) {
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

const strings = JSON.parse(fs.readFileSync(path.join(__dir, 'kol-strings.json'), 'utf8'));
const KOL_YAAKOV = {};
const KOL_YAAKOV_PART2 = {};

for (const part of ['part-001.txt', 'part-002.txt']) {
  const s = fs.readFileSync(path.join(ROOT, 'output', 'siman_036/kol-yaakov', part), 'utf8');
  for (const block of s.split(BLOCK).slice(1)) {
    const seif = block.match(/seif: (.+)/)[1].trim();
    const marker = (block.match(/marker: (.+)/) || [])[1]?.trim() || 'main';
    const key = `${seif}#${marker}`;
    const he = strip(block.slice(block.indexOf(HEB) + HEB.length + 1, block.indexOf(ENG)));
    if (!(key in strings)) {
      console.error('MISSING', key, he.slice(0, 80));
      process.exit(1);
    }
    const target = part === 'part-002.txt' ? KOL_YAAKOV_PART2 : KOL_YAAKOV;
    target[key] = strings[key];
  }
}

const out = `/** Kol Yaakov siman 036 — generated from kol-strings.json */
export const KOL_YAAKOV = ${JSON.stringify(KOL_YAAKOV, null, 2)};
export const KOL_YAAKOV_PART2 = ${JSON.stringify(KOL_YAAKOV_PART2, null, 2)};
`;
fs.writeFileSync(path.join(__dir, '_patch-siman-036-kol.mjs'), out, 'utf8');
console.log('OK kol', Object.keys(KOL_YAAKOV).length, '+', Object.keys(KOL_YAAKOV_PART2).length);
