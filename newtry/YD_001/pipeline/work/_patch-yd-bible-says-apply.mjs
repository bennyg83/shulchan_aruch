#!/usr/bin/env node
/** Apply editorial fixes — remove "the Bible says" MT garbage across YD001 output */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROOT, OUT, BLOCK, ENG, END } from './_patch-siman-098-group-c-utils.mjs';
import { PATCHES, SIMANIM, BLOCK_COUNT } from './_tr-yd-bible-says.mjs';

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

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
let total = 0;
const bySiman = {};

for (const [rel, slug, T] of PATCHES) {
  const n = patchFile(rel, slug, T);
  total += n;
  const sim = rel.split('/')[0];
  bySiman[sim] = (bySiman[sim] || 0) + n;
}

for (const [sim, n] of Object.entries(bySiman).sort()) {
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} ${sim} bible-says cleanup ${n} blocks editorial CLEAN\n`,
  );
}
fs.appendFileSync(
  path.join(ROOT, 'progress.log'),
  `${ts} YD001 bible-says cleanup ${total} blocks across ${SIMANIM.length} simanim editorial CLEAN (quality-gate)\n`,
);

console.log(`[DONE] bible-says cleanup — ${total} blocks across ${SIMANIM.length} simanim (expected ${BLOCK_COUNT})`);
if (total !== BLOCK_COUNT) {
  console.error(`[WARN] patched ${total} !== expected ${BLOCK_COUNT}`);
  process.exit(1);
}
