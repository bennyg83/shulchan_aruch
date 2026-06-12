#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-126-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const KEYS_BY_REL = {
  "siman_126/baer-heitev/part-001.txt": [
    "1#_",
    "2#א",
    "2#ב",
    "3#_",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "6#_",
    "7#א",
    "7#ב"
  ],
  "siman_126/beer-hagolah/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_"
  ],
  "siman_126/beur-hagra/part-001.txt": [
    "2#א",
    "2#ב",
    "2#ג",
    "3#_",
    "4#א",
    "4#ב",
    "4#ג",
    "5#א",
    "5#ב",
    "5#ג",
    "5#ד",
    "6#א",
    "6#ב",
    "7#א",
    "7#ב",
    "7#ג"
  ],
  "siman_126/mechaber/part-001.txt": [
    "1#main",
    "2#main",
    "3#main",
    "4#main",
    "5#main",
    "6#main",
    "7#main"
  ],
  "siman_126/nekudot-hakesef/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_126/pitchei-teshuva/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_126/rabbi-akiva-eiger-yd/part-001.txt": [
    "1#_"
  ],
  "siman_126/siftei-kohen/part-001.txt": [
    "1#_",
    "2#א",
    "2#ב",
    "2#ג",
    "3#_",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "5#ג",
    "6#_",
    "7#א",
    "7#ב"
  ],
  "siman_126/turei-zahav/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_"
  ],
  "siman_126/yad-ephraim/part-001.txt": [
    "1#_"
  ]
};

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const fileKeys = KEYS_BY_REL[rel];
  const Tuse = fileKeys
    ? Object.fromEntries(Object.entries(T).filter(([k]) => fileKeys.includes(k)))
    : T;
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in Tuse)) {
      if (key in T) throw new Error(`Key ${key} belongs to another part file, not ${rel}`);
      return BLOCK + block;
    }
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = Tuse[key].endsWith('\n') ? Tuse[key] : Tuse[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(Tuse).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}

const FILES = [
  ['siman_126/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_126/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_126/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_126/mechaber/part-001.txt', 'mechaber'],
  ['siman_126/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_126/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_126/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_126/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_126/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_126/yad-ephraim/part-001.txt', 'yad-ephraim'],
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(`No translations for slug: ${slug}`);
  total += patchFile(rel, slug, T);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
const slugDone = {};
for (const [rel, slug] of FILES) {
  const n = (KEYS_BY_REL[rel] || []).length;
  slugDone[slug] = (slugDone[slug] || 0) + n;
}
const progress = Object.entries(slugDone)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, n]) => `${ts} siman_126/${slug} ${n} blocks DONE`);
progress.push(`${ts} siman_126 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_126 — ${total} blocks across ${FILES.length} files`);
