#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dir, '../..');
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

const imports = [
  ['siman_039/mechaber/part-001.txt', 'mechaber', '_patch-siman-039-mechaber.mjs'],
  ['siman_039/siftei-kohen/part-001.txt', 'siftei-kohen', '_patch-siman-039-siftei-kohen.mjs'],
  ['siman_039/turei-zahav/part-001.txt', 'turei-zahav', '_patch-siman-039-turei-zahav.mjs'],
  ['siman_039/baer-heitev/part-001.txt', 'baer-heitev', '_patch-siman-039-baer-heitev.mjs'],
  ['siman_039/beer-hagolah/part-001.txt', 'beer-hagolah', '_patch-siman-039-beer-hagolah.mjs'],
  ['siman_039/beur-hagra/part-001.txt', 'beur-hagra', '_patch-siman-039-beur-hagra.mjs'],
  ['siman_039/kereti/part-001.txt', 'kereti', '_patch-siman-039-kereti.mjs'],
  ['siman_039/peleti/part-001.txt', 'peleti', '_patch-siman-039-peleti.mjs'],
  ['siman_039/pitchei-teshuva/part-001.txt', 'pitchei-teshuva', '_patch-siman-039-pitchei-teshuva.mjs'],
  ['siman_039/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd', '_patch-siman-039-rabbi-akiva-eiger-yd.mjs'],
  ['siman_039/nekudot-hakesef/part-001.txt', 'nekudot-hakesef', '_patch-siman-039-nekudot-hakesef.mjs'],
  ['siman_039/kaf-hachayim/part-001.txt', 'kaf-hachayim', '_patch-siman-039-kaf-hachayim.mjs'],
  ['siman_039/mateh-yehonatan/part-001.txt', 'mateh-yehonatan', '_patch-siman-039-mateh-yehonatan.mjs'],
  ['siman_039/yad-avraham/part-001.txt', 'yad-avraham', '_patch-siman-039-yad-avraham.mjs'],
  ['siman_039/yad-ephraim/part-001.txt', 'yad-ephraim', '_patch-siman-039-yad-ephraim.mjs'],
  ['siman_039/kol-yaakov/part-001.txt', 'kol-yaakov', '_patch-siman-039-kol-yaakov.mjs'],
];

let total = 0;
for (const [rel, slug, mod] of imports) {
  const { T } = await import(pathToFileURL(path.join(__dir, mod)).href);
  patchFile(rel, slug, T);
  total += Object.keys(T).length;
}

const logPath = path.join(ROOT, 'progress.log');
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(logPath, `${ts} siman_039 patch applied (${total} blocks)\n`, 'utf8');
fs.appendFileSync(logPath, `${ts} siman_039 COMPLETE\n`, 'utf8');
console.log(`[COMPLETE] Siman 039 — ${total} blocks patched`);
