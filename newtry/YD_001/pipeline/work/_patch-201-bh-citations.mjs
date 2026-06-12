#!/usr/bin/env node
/** Quick citation fixes for siman 201 beer-hagolah */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fp = path.join(ROOT, 'output/siman_201/beer-hagolah/part-001.txt');
const T = {
  '1#_': 'Rambam\'s wording in chapter 1 of Hilchot Mikvaot:',
  '2#_': 'I cited this above at the beginning of siman 197 and 198.',
  '3#_': 'Braita, Avodah Zarah daf 75, and end of chapter 2 of Chagigah.',
  '18#_': 'Mishnah 5, chapter 4 of Mikvaot, and in several places.',
};

const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
let s = fs.readFileSync(fp, 'utf8');
const parts = s.split(BLOCK);
const out = parts.map((block, i) => {
  if (i === 0) return block;
  const seif = block.match(/^\s*seif: (\d+)/m)?.[1];
  const marker = block.match(/^\s*marker: (.+)/m)?.[1]?.trim() || 'main';
  const key = `${seif}#${marker}`;
  if (!(key in T)) return BLOCK + block;
  const enStart = block.indexOf(ENG);
  const enEnd = block.indexOf(END);
  const before = block.slice(0, enStart + ENG.length + 1);
  const after = block.slice(enEnd);
  return BLOCK + before + T[key] + '\n' + after;
});
fs.writeFileSync(fp, out.join(''), 'utf8');
console.log('OK beer-hagolah siman 201 —', Object.keys(T).length, 'blocks');
