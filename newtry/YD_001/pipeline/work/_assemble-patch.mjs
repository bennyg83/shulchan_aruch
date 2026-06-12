#!/usr/bin/env node
/** Apply translations from _translations-siman-NNN.json to output files */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _assemble-patch.mjs 078');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const jsonPath = path.join(WORK, `_translations-siman-${sim}.json`);
if (!fs.existsSync(jsonPath)) {
  console.error(`Missing ${jsonPath}`);
  process.exit(1);
}
const TRANSLATIONS = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

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
  return applied.size;
}

const simDir = path.join(OUT, `siman_${sim}`);
const FILES = [];
for (const slug of fs.readdirSync(simDir)) {
  const fp = path.join(simDir, slug, 'part-001.txt');
  if (fs.existsSync(fp) && TRANSLATIONS[slug]) {
    FILES.push([`siman_${sim}/${slug}/part-001.txt`, slug]);
  }
}

let total = 0;
for (const [rel, slug] of FILES) {
  total += patchFile(rel, slug, TRANSLATIONS[slug]);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
const progress = FILES.map(([rel, slug]) => {
  const n = Object.keys(TRANSLATIONS[slug]).length;
  return `${ts} siman_${sim}/${slug} ${n} blocks DONE`;
});
progress.push(`${ts} siman_${sim} COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');

console.log(`[COMPLETE] siman_${sim} — ${total} blocks across ${FILES.length} files`);
