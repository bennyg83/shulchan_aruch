#!/usr/bin/env node
/**
 * Generic YD001 patcher.
 *
 * Expects:
 * - `output/siman_NNN/<slug>/part-*.txt` exist
 * - `TRANSLATIONS` object shaped: { [slug]: { [key]: englishText } }
 *
 * It patches each block's ENGLISH section for matching slug+key.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 
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
    const slugM = block.match(/^\s*slug:\s*(.+)\s*$/m);
    const seifM = block.match(/^\s*seif:\s*(.+)\s*$/m);
    const markerM = block.match(/^\s*marker:\s*(.+)\s*$/m);
    if (!slugM || !seifM) return BLOCK + block;
    if (slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = (markerM ? markerM[1].trim() : 'main') || 'main';
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
 
  // ensure no unused keys (usually signals wrong key set)
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) {
    throw new Error(`Keys not found in ${rel} (${slug}): ${missing.slice(0, 30).join(', ')}${missing.length > 30 ? ` ... +${missing.length - 30}` : ''}`);
  }
 
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}
 
export function patchSiman({ siman, translationsBySlug, files }) {
  let total = 0;
  for (const { rel, slug } of files) {
    const T = translationsBySlug[slug];
    if (!T) throw new Error(`No translations for slug: ${slug} (siman ${siman})`);
    total += patchFile(rel, slug, T);
  }
  return total;
}

