#!/usr/bin/env node
/**
 * Generates _patch-siman-057-translations-part*.mjs from _siman-057-translations.jsonl
 * Each JSONL line: {"slug":"siftei-kohen","key":"1#א","en":"..."}
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const JSONL = path.join(DIR, '_siman-057-translations.jsonl');
const PARTS = [
  ['part2', ['siftei-kohen']],
  ['part3', ['turei-zahav', 'baer-heitev']],
  ['part4', ['beur-hagra']],
  ['part5', ['kaf-hachayim', 'kereti', 'peleti', 'pitchei-teshuva']],
  ['part6', ['mateh-yehonatan', 'nekudot-hakesef', 'yad-avraham', 'yad-ephraim', 'rabbi-akiva-eiger-yd']],
];

if (!fs.existsSync(JSONL)) {
  console.error('Missing', JSONL);
  process.exit(1);
}

const lines = fs.readFileSync(JSONL, 'utf8').trim().split(/\n/).filter(Boolean);
const bySlug = {};
for (const line of lines) {
  const { slug, key, en } = JSON.parse(line);
  (bySlug[slug] ||= {})[key] = en;
}

for (const [partName, slugs] of PARTS) {
  const obj = {};
  for (const slug of slugs) {
    if (!bySlug[slug]) throw new Error(`No translations for slug: ${slug}`);
    obj[slug] = bySlug[slug];
  }
  const constName = partName.replace('part', 'PART').toUpperCase().replace('PART', 'PART');
  const exportName = `PART${partName.replace('part', '')}`;
  const body = `/** siman 057 translations ${partName} — auto-generated */\nexport const ${exportName} = ${JSON.stringify(obj, null, 2)};\n`;
  const out = path.join(DIR, `_patch-siman-057-translations-${partName}.mjs`);
  fs.writeFileSync(out, body, 'utf8');
  const n = Object.values(obj).reduce((a, o) => a + Object.keys(o).length, 0);
  console.log(`Wrote ${out} (${n} blocks)`);
}
