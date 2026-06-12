#!/usr/bin/env node
/** Emit _patch-siman-036-kol.mjs skeleton with all keys — fill en values from Hebrew manually or via editor. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
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

const T = {};
for (const part of ['part-001.txt', 'part-002.txt']) {
  const s = fs.readFileSync(
    path.join(ROOT, 'output', 'siman_036/kol-yaakov', part),
    'utf8'
  );
  for (const block of s.split(BLOCK).slice(1)) {
    const seif = block.match(/seif: (.+)/)[1].trim();
    const marker = (block.match(/marker: (.+)/) || [])[1]?.trim() || 'main';
    const he = strip(block.slice(block.indexOf(HEB) + HEB.length + 1, block.indexOf(ENG)));
    T[`${seif}#${marker}`] = he.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }
}

let out = 'export const KOL_YAAKOV = {\n';
for (const [k, he] of Object.entries(T)) {
  out += `  '${k}': ${JSON.stringify(he)},\n`;
}
out += '};\n';
fs.writeFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), '_patch-siman-036-kol-PLACEHOLDER.mjs'), out);
console.log('keys', Object.keys(T).length);
