#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '_yd001-translate-shared.mjs');
let s = fs.readFileSync(p, 'utf8');
const start = s.indexOf('    [/אמרינן/g');
const end = s.indexOf('const BAER_LEAD_095');
if (start < 0 || end < 0) throw new Error(`markers not found ${start} ${end}`);
const insert = `  ];
  for (const [re, to] of reps) s = s.replace(re, to);
  return s;
}

/** Two-pass phrase polish for siman 095 */
export function polish095(text) {
  let out = String(text);
  for (let i = 0; i < 2; i++) out = applyPhrases(out);
  return out.replace(/\\s+/g, ' ').trim();
}

`;
const newS = s.slice(0, start) + insert + s.slice(end);
fs.writeFileSync(p, newS);
console.log('trimmed', s.length - newS.length, 'chars');
