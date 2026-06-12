#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-115-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const KEYS_BY_REL = {
  "siman_115/baer-heitev/part-001.txt": [
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
    "1#כ",
    "2#א",
    "2#ב",
    "2#ג",
    "2#ד",
    "2#ה",
    "3#א",
    "3#ב",
    "3#ג"
  ],
  "siman_115/beer-hagolah/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "2#א",
    "2#ב",
    "3#א",
    "3#ב",
    "3#ג"
  ],
  "siman_115/beur-hagra/part-001.txt": [
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
    "1#כ",
    "1#ל",
    "2#א",
    "2#ב",
    "2#ג",
    "2#ד",
    "3#א",
    "3#ב",
    "3#ג",
    "3#ד",
    "3#ה",
    "3#ו",
    "3#ז",
    "3#ח"
  ],
  "siman_115/kaf-hachayim/part-001.txt": [
    "1#_",
    "2#_",
    "3#_"
  ],
  "siman_115/mateh-yehonatan/part-001.txt": [
    "1#_",
    "2#_",
    "3#_"
  ],
  "siman_115/mechaber/part-001.txt": [
    "1#main",
    "2#main",
    "3#main"
  ],
  "siman_115/nekudot-hakesef/part-001.txt": [
    "1#_",
    "2#_",
    "3#_"
  ],
  "siman_115/pitchei-teshuva/part-001.txt": [
    "1#_",
    "2#_",
    "3#_"
  ],
  "siman_115/rabbi-akiva-eiger-yd/part-001.txt": [
    "1#_"
  ],
  "siman_115/siftei-kohen/part-001.txt": [
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
    "1#כ",
    "1#ל",
    "1#מ",
    "1#נ",
    "1#ס",
    "1#ע",
    "1#פ",
    "1#צ",
    "2#א",
    "2#ב",
    "2#ג",
    "2#ד",
    "2#ה",
    "2#ו",
    "2#ז",
    "2#ח",
    "3#א",
    "3#ב",
    "3#ג"
  ],
  "siman_115/turei-zahav/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "1#ז",
    "1#ח",
    "2#א",
    "2#ב",
    "2#ג",
    "3#א",
    "3#ב",
    "3#ג"
  ],
  "siman_115/yad-ephraim/part-001.txt": [
    "1#_",
    "2#_",
    "3#_"
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
  ['siman_115/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_115/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_115/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_115/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_115/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_115/mechaber/part-001.txt', 'mechaber'],
  ['siman_115/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_115/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_115/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_115/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_115/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_115/yad-ephraim/part-001.txt', 'yad-ephraim'],
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
  .map(([slug, n]) => `${ts} siman_115/${slug} ${n} blocks DONE`);
progress.push(`${ts} siman_115 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_115 — ${total} blocks across ${FILES.length} files`);
