#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-044-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
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
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not found in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
}

const FILES = [
  ['siman_044/mechaber/part-001.txt', 'mechaber'],
  ['siman_044/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_044/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_044/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_044/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_044/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_044/kereti/part-001.txt', 'kereti'],
  ['siman_044/peleti/part-001.txt', 'peleti'],
  ['siman_044/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_044/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_044/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_044/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_044/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_044/yad-avraham/part-001.txt', 'yad-avraham'],
  ['siman_044/yad-ephraim/part-001.txt', 'yad-ephraim'],
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(`No translations for slug: ${slug}`);
  patchFile(rel, slug, T);
  total += Object.keys(T).length;
}

console.log(`[COMPLETE] siman_044 — ${total} blocks across ${FILES.length} files`);
