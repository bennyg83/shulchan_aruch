#!/usr/bin/env node
import fs from 'fs';
import { applyPhrases, polish095, translateBaer095 } from './_yd001-translate-shared.mjs';

function stripHtml(h) {
  return String(h)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

const heb = JSON.parse(fs.readFileSync('_hebrew-087.json', 'utf8'));
let total = 0;
let hebLeft = 0;
for (const [slug, blocks] of Object.entries(heb)) {
  if (slug === 'mechaber') continue;
  for (const [key, entry] of Object.entries(blocks)) {
    total++;
    const s = polish095(stripHtml(entry.heb));
    if (/[\u0590-\u05FF]/.test(s)) hebLeft++;
  }
}
console.log('polish095 only:', hebLeft, '/', total);
