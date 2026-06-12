#!/usr/bin/env node
import fs from 'fs';
import { applyPhrases } from './_yd001-translate-shared.mjs';

const words = new Map();
for (const sim of ['089', '090']) {
  const h = JSON.parse(fs.readFileSync(`_hebrew-${sim}.json`, 'utf8'));
  for (const slug of Object.values(h)) {
    for (const { heb } of Object.values(slug)) {
      const after = applyPhrases(heb);
      const rem = after.match(/[\u0590-\u05FF][\u0590-\u05FF"']*/g) || [];
      for (const w of rem) words.set(w, (words.get(w) || 0) + 1);
    }
  }
}
const sorted = [...words.entries()].sort((a, b) => b[1] - a[1]);
console.log('unique', sorted.length);
console.log(sorted.slice(0, 100).map(([w, c]) => `${c}\t${w}`).join('\n'));
