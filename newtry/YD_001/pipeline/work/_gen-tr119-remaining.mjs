#!/usr/bin/env node
/** Generate draft remaining slugs via translateBlock; write _tr119-auto-remaining.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = '119';
process.argv[2] = sim;

const { translateBlock } = await import('./_gen-siman-translations.mjs');

const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const slugs = ['baer-heitev', 'beur-hagra', 'kaf-hachayim', 'siftei-kohen', 'turei-zahav'];
const AUTO = {};

for (const slug of slugs) {
  AUTO[slug] = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    AUTO[slug][key] = translateBlock(slug, entry);
  }
}

const outPath = path.join(WORK, '_tr119-auto-remaining.mjs');
fs.writeFileSync(outPath, `export const AUTO = ${JSON.stringify(AUTO, null, 2)};\n`);
const left = Object.values(AUTO).flatMap((m) => Object.values(m)).filter((v) => /[\u0590-\u05FF]{3,}/.test(v)).length;
console.log(`Wrote ${outPath} — ${left} strings still with 3+ Hebrew letters`);
