#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-110-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const KEYS_BY_REL = {
  "siman_110/baer-heitev/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "2#א",
    "2#ב",
    "3#א",
    "3#ב",
    "3#ג",
    "3#ד",
    "4#א",
    "4#ב",
    "5#א",
    "5#ב",
    "5#ג",
    "6#א",
    "6#ב",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "8#א",
    "8#ב",
    "8#ג",
    "9#א",
    "9#ב",
    "9#ג",
    "9#ד"
  ],
  "siman_110/beer-hagolah/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_"
  ],
  "siman_110/beur-hagra/part-001.txt": [
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
    "5#ג",
    "5#ד",
    "6#א",
    "6#ב",
    "6#ג",
    "6#ד",
    "6#ה",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "7#ה",
    "7#ו",
    "7#ז",
    "7#ח",
    "8#א",
    "8#ב",
    "8#ג",
    "8#ד",
    "8#ה",
    "8#ו",
    "9#א",
    "9#ב",
    "9#ג",
    "9#ד",
    "10#_"
  ],
  "siman_110/kaf-hachayim/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_"
  ],
  "siman_110/kereti/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "1#ז",
    "2#א",
    "2#ב",
    "3#א",
    "3#ב",
    "3#ג",
    "3#ד",
    "3#ה",
    "4#_",
    "5#א",
    "5#ב",
    "5#ג",
    "5#ד",
    "6#א",
    "6#ב",
    "6#ג",
    "6#ד",
    "6#ה",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "8#_",
    "9#א",
    "9#ב"
  ],
  "siman_110/mateh-yehonatan/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_"
  ],
  "siman_110/mechaber/part-001.txt": [
    "1#main",
    "2#main",
    "3#main",
    "4#main",
    "5#main",
    "6#main",
    "7#main",
    "8#main",
    "9#main",
    "10#main"
  ],
  "siman_110/nekudot-hakesef/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_"
  ],
  "siman_110/peleti/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "2#_",
    "3#א",
    "3#ב",
    "4#_",
    "5#א",
    "5#ב",
    "5#ג",
    "5#ד",
    "6#א",
    "6#ב",
    "6#ג",
    "6#ד",
    "6#ה",
    "6#ו"
  ],
  "siman_110/peleti/part-002.txt": [
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "7#ה",
    "8#א",
    "8#ב",
    "8#ג",
    "8#ד",
    "9#א",
    "9#ב",
    "9#ג"
  ],
  "siman_110/pitchei-teshuva/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_"
  ],
  "siman_110/rabbi-akiva-eiger-yd/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_",
    "8#_",
    "9#_",
    "10#_"
  ],
  "siman_110/siftei-kohen/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "1#ז",
    "1#ח",
    "1#ט",
    "1#י",
    "2#א",
    "2#ב",
    "2#ג",
    "3#א",
    "3#ב",
    "3#ג",
    "3#ד",
    "3#ה",
    "3#ו",
    "3#ז",
    "3#ח",
    "4#א",
    "4#ב",
    "4#ג",
    "4#ד",
    "4#ה",
    "4#ו",
    "5#א",
    "5#ב",
    "5#ג",
    "5#ד",
    "6#א",
    "6#ב",
    "6#ג",
    "6#ד",
    "6#ה",
    "6#ו",
    "6#ז",
    "7#א",
    "7#ב",
    "7#ג",
    "7#ד",
    "7#ה",
    "7#ו",
    "7#ז",
    "7#ח",
    "7#ט",
    "7#י",
    "7#כ",
    "8#א",
    "8#ב",
    "8#ג",
    "8#ד",
    "8#ה",
    "8#ו",
    "8#ז",
    "8#ח",
    "8#ט",
    "8#י",
    "9#א",
    "9#ב",
    "9#ג"
  ],
  "siman_110/siftei-kohen/part-002.txt": [
    "9#ד",
    "9#ה",
    "9#ו",
    "9#ז"
  ],
  "siman_110/turei-zahav/part-001.txt": [
    "1#_",
    "2#_",
    "4#_",
    "5#א",
    "5#ב",
    "6#א",
    "6#ב",
    "7#א",
    "7#ב",
    "8#א",
    "8#ב",
    "9#א",
    "9#ב",
    "9#ג",
    "9#ד",
    "9#ה"
  ],
  "siman_110/yad-avraham/part-001.txt": [
    "1#_",
    "2#_",
    "3#_",
    "4#_",
    "5#_",
    "6#_",
    "7#_"
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
  ['siman_110/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_110/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_110/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_110/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_110/kereti/part-001.txt', 'kereti'],
  ['siman_110/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_110/mechaber/part-001.txt', 'mechaber'],
  ['siman_110/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_110/peleti/part-001.txt', 'peleti'],
  ['siman_110/peleti/part-002.txt', 'peleti'],
  ['siman_110/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_110/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_110/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_110/siftei-kohen/part-002.txt', 'siftei-kohen'],
  ['siman_110/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_110/yad-avraham/part-001.txt', 'yad-avraham'],
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
  .map(([slug, n]) => `${ts} siman_110/${slug} ${n} blocks DONE`);
progress.push(`${ts} siman_110 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_110 — ${total} blocks across ${FILES.length} files`);
