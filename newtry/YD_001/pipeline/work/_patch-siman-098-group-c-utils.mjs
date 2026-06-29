#!/usr/bin/env node
/** Shared patch helpers — siman 098 GROUP C */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const OUT = path.join(ROOT, 'output');
export const BLOCK = '**** YD001 SOURCE BLOCK ****';
export const ENG = '**** ENGLISH ****';
export const END = '**** END BLOCK ****';

export function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const keysInFile = new Set();
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
    keysInFile.add(key);
    if (!(key in T)) throw new Error(`No translation for ${rel} ${key}`);
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`ENGLISH/END missing: ${rel} ${key}`);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = [...keysInFile].filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`Keys not patched in ${rel}: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}

export function runPatches(entries, logLabel) {
  let total = 0;
  const bySlug = {};
  for (const [rel, slug, T] of entries) {
    const n = patchFile(rel, slug, T);
    total += n;
    bySlug[slug] = (bySlug[slug] || 0) + n;
  }
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  for (const [slug, n] of Object.entries(bySlug)) {
    fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098/${slug} ${n} blocks editorial CLEAN\n`);
  }
  fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_098 ${logLabel} editorial CLEAN (quality-gate)\n`);
  console.log(`[DONE] ${logLabel} — ${total} blocks`);
  return total;
}
