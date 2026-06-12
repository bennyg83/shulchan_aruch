#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-106-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
const KEYS_BY_REL = {
  "siman_106/baer-heitev/part-001.txt": [
    "1#_",
    "2#א",
    "2#ב",
    "2#ג"
  ],
  "siman_106/beer-hagolah/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "2#_"
  ],
  "siman_106/beur-hagra/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "1#ז",
    "2#א",
    "2#ב",
    "2#ג"
  ],
  "siman_106/kaf-hachayim/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_106/kereti/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "1#ה",
    "1#ו",
    "1#ז",
    "2#_"
  ],
  "siman_106/mateh-yehonatan/part-001.txt": [
    "1#_"
  ],
  "siman_106/mechaber/part-001.txt": [
    "1#main",
    "2#main"
  ],
  "siman_106/peleti/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג"
  ],
  "siman_106/pitchei-teshuva/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_106/rabbi-akiva-eiger-yd/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_106/siftei-kohen/part-001.txt": [
    "1#א",
    "1#ב",
    "1#ג",
    "1#ד",
    "2#א",
    "2#ב",
    "2#ג"
  ],
  "siman_106/turei-zahav/part-001.txt": [
    "1#_",
    "2#_"
  ],
  "siman_106/yad-avraham/part-001.txt": [
    "1#_",
    "2#_"
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
  ['siman_106/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_106/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_106/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_106/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_106/kereti/part-001.txt', 'kereti'],
  ['siman_106/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_106/mechaber/part-001.txt', 'mechaber'],
  ['siman_106/peleti/part-001.txt', 'peleti'],
  ['siman_106/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_106/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_106/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_106/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_106/yad-avraham/part-001.txt', 'yad-avraham'],
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
  .map(([slug, n]) => `${ts} siman_106/${slug} ${n} blocks DONE`);
progress.push(`${ts} siman_106 COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_106 — ${total} blocks across ${FILES.length} files`);
