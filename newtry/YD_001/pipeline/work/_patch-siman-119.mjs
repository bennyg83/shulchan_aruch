#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-119-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const KEYS_BY_REL = {
  "siman_119/baer-heitev/part-001.txt": [
    "1#א",
    "1#ב",
    "2#_",
    "3#א",
    "3#ב",
    "4#_",
    "5#_",
    "6#_",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "8#_",
    "11#_",
    "13#א",
    "13#ב",
    "13#ג",
    "14#א",
    "14#ב",
    "15#_",
    "16#_",
    "17#_",
    "19#א",
    "19#ב",
    "19#ג",
    "20#_"
  ],
  "siman_119/beer-hagolah/part-001.txt": [
    "1#א",
    "1#ב",
    "2#א",
    "2#ב",
    "3#א",
    "3#ב",
    "3#ג",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_",
    "11#_",
    "12#_",
    "13#א",
    "13#ב",
    "14#_",
    "15#_",
    "16#_",
    "17#_",
    "18#_",
    "19#_",
    "20#א",
    "20#ב"
  ],
  "siman_119/beur-hagra/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "2#_",
    "3#א",
    "3#ב",
    "3#ג",
    "3#ד",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "7#ה",
    "7#ו",
    "7#ז",
    "8#_",
    "9#_",
    "10#_",
    "11#_",
    "12#_",
    "13#א",
    "13#ב",
    "14#א",
    "14#ב",
    "15#_",
    "16#א",
    "16#ב",
    "17#_",
    "18#א",
    "18#ב",
    "19#א",
    "19#ב",
    "19#ג",
    "19#ד",
    "20#_"
  ],
  "siman_119/kaf-hachayim/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "2#_",
    "3#א",
    "3#ב",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_",
    "11#_",
    "12#_",
    "13#_",
    "14#_",
    "15#_",
    "16#_",
    "17#_",
    "18#_",
    "19#_",
    "20#_"
  ],
  "siman_119/mateh-yehonatan/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_"
  ],
  "siman_119/mechaber/part-001.txt": [
    "1#main",
    "2#main",
    "3#main",
    "4#main",
    "5#main",
    "6#main",
    "7#main",
    "8#main",
    "9#main",
    "10#main",
    "11#main",
    "12#main",
    "13#main",
    "14#main",
    "15#main",
    "16#main",
    "17#main",
    "18#main",
    "19#main",
    "20#main"
  ],
  "siman_119/nekudot-hakesef/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_"
  ],
  "siman_119/pitchei-teshuva/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_"
  ],
  "siman_119/siftei-kohen/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "2#א",
    "2#ב",
    "3#א",
    "3#ב",
    "3#ג",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "6#_",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "7#ה",
    "7#ו",
    "8#א",
    "8#ב",
    "10#_",
    "11#_",
    "13#א",
    "13#ב",
    "13#ג",
    "14#א",
    "14#ב",
    "15#א",
    "15#ב",
    "16#_",
    "17#_",
    "19#א",
    "19#ב",
    "19#ג",
    "19#ד",
    "20#_"
  ],
  "siman_119/turei-zahav/part-001.txt": [
    "1#א",
    "1#ב",
    "2#א",
    "2#ב",
    "3#_",
    "4#א",
    "4#ב",
    "5#_",
    "7#_",
    "8#_",
    "11#_",
    "13#א",
    "13#ב",
    "14#א",
    "14#ב",
    "15#_",
    "18#_",
    "19#_"
  ],
  "siman_119/yad-avraham/part-001.txt": [
    "1#_"
  ],
  "siman_119/yad-ephraim/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_"
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
  ['siman_119/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_119/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_119/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_119/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_119/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_119/mechaber/part-001.txt', 'mechaber'],
  ['siman_119/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_119/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_119/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_119/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_119/yad-avraham/part-001.txt', 'yad-avraham'],
  ['siman_119/yad-ephraim/part-001.txt', 'yad-ephraim'],
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
  .map(([slug, n]) => `${ts} siman_119/${slug} ${n} blocks DONE`);
progress.push(`${ts} siman_119 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_119 — ${total} blocks across ${FILES.length} files`);
