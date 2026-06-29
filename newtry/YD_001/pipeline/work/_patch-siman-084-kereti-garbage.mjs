#!/usr/bin/env node
/** Fix remaining Lord's Prayer / Hashem's Word garbage — siman 084 kereti 6#א */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { ROOT, OUT, BLOCK, ENG, END } from './_patch-siman-098-group-c-utils.mjs';

/** Partial patchFile (group-c-utils requires every key; we patch listed keys only). */
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
    const afterEng = block.slice(enStart + ENG.length);
    const lineEnd = afterEng.match(/^[\r\n]+/)?.[0] ?? '\n';
    const before = block.slice(0, enStart + ENG.length) + lineEnd;
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied.size;
}

const mod = await import(pathToFileURL(path.join(path.dirname(fileURLToPath(import.meta.url)), '_tr-084-kereti.mjs')).href);
let total = 0;
for (const [rel, slug] of mod.FILES) {
  total += patchFile(rel, slug, mod.TRANSLATIONS);
}
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
fs.appendFileSync(path.join(ROOT, 'progress.log'), `${ts} siman_084/kereti 6#א garbage CLEAN\n`);
console.log(`[DONE] siman_084 kereti garbage — ${total} block(s)`);
