#!/usr/bin/env node
/** Apply editorial translation modules for siman 216 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const modules = process.argv.slice(2).length ? process.argv.slice(2) : [
  '_tr-216-baer-heitev.mjs',
  '_tr-216-beer-hagolah.mjs',
  '_tr-216-beur-hagra.mjs',
  '_tr-216-pitchei-teshuva.mjs',
  '_tr-216-rabbi-akiva-eiger-yd.mjs',
  '_tr-216-siftei-kohen.mjs',
  '_tr-216-turei-zahav.mjs',
];

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
    const marker = markerM ? markerM[1].trim() : '_';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    applied.add(key);
    return BLOCK + block.slice(0, enStart + ENG.length + 1) + T[key] + '\n' + END + block.slice(enEnd + END.length);
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}

let total = 0;
for (const modName of modules) {
  const modPath = path.join(path.dirname(fileURLToPath(import.meta.url)), modName);
  const mod = await import(pathToFileURL(modPath).href);
  for (const [rel, slug] of mod.FILES) {
    total += patchFile(rel, slug, mod.TRANSLATIONS);
  }
}
console.log(`[DONE] ${total} blocks`);
