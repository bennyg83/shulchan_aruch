#!/usr/bin/env node
import fs from 'fs';
import { applyPhrases, polish095 } from './_yd001-translate-shared.mjs';
import { EXTRA_087 } from './_draft-087.mjs';

const strip = (h) => h.replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').trim();
const heb = JSON.parse(fs.readFileSync('_hebrew-087.json', 'utf8'));

function deepFt(h, passes = 4) {
  let s = strip(h);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA_087) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  return polish095(s);
}

let h = 0;
let t = 0;
for (const [slug, blocks] of Object.entries(heb)) {
  if (slug === 'mechaber') continue;
  for (const v of Object.values(blocks)) {
    t++;
    if (/[\u0590-\u05FF]/.test(deepFt(v.heb))) h++;
  }
}
console.log('deepFt+polish', h, '/', t);
