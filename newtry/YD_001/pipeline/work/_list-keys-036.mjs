#!/usr/bin/env node
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
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}
function keysFrom(rel) {
  const s = fs.readFileSync(path.join(ROOT, 'output', rel), 'utf8');
  return s.split(BLOCK).slice(1).map((b) => {
    const seif = b.match(/seif: (.+)/)[1].trim();
    const marker = (b.match(/marker: (.+)/) || [])[1]?.trim() || 'main';
    const he = strip(b.slice(b.indexOf(HEB) + HEB.length + 1, b.indexOf(ENG)));
    return `${seif}#${marker}`;
  });
}
const files = [
  'siman_036/siftei-kohen/part-001.txt',
  'siman_036/turei-zahav/part-001.txt',
  'siman_036/baer-heitev/part-001.txt',
  'siman_036/beur-hagra/part-001.txt',
  'siman_036/kereti/part-001.txt',
  'siman_036/peleti/part-001.txt',
  'siman_036/pitchei-teshuva/part-001.txt',
  'siman_036/kaf-hachayim/part-001.txt',
  'siman_036/yad-avraham/part-001.txt',
  'siman_036/kol-yaakov/part-001.txt',
  'siman_036/kol-yaakov/part-002.txt',
];
for (const rel of files) console.log(rel, keysFrom(rel).join(', '));
