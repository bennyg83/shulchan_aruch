#!/usr/bin/env node
/** Apply mechaber-only TRANSLATIONS map to output/siman_NNN/mechaber/part-*.txt */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const transArg = process.argv[3];
if (!sim || !/^\d{3}$/.test(sim) || !transArg) {
  console.error('Usage: node _apply-mechaber-siman.mjs SIMAN ./_mechaber-trans-NNN.mjs');
  process.exit(1);
}

const transPath = path.isAbsolute(transArg)
  ? transArg
  : path.join(WORK, transArg);

const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const { TRANSLATIONS } = await import(pathToFileURL(path.resolve(transPath)).href);

function patchFile(rel, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug:\s*(.+)\s*$/m);
    const seifM = block.match(/^\s*seif:\s*(.+)\s*$/m);
    const markerM = block.match(/^\s*marker:\s*(.+)\s*$/m);
    if (!slugM || slugM[1].trim() !== 'mechaber') return BLOCK + block;
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
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
  return applied;
}

const simDir = path.join(OUT, `siman_${sim}`, 'mechaber');
const allApplied = new Set();
let total = 0;
for (const f of fs.readdirSync(simDir).filter((x) => /^part-.*\.txt$/.test(x)).sort()) {
  const applied = patchFile(`siman_${sim}/mechaber/${f}`, TRANSLATIONS);
  total += applied.size;
  for (const k of applied) allApplied.add(k);
}
const extra = Object.keys(TRANSLATIONS).filter((k) => !allApplied.has(k));
if (extra.length) {
  console.warn(`[WARN] siman_${sim}/mechaber unused translation keys: ${extra.join(', ')}`);
}
console.log(`[PATCHED] siman_${sim}/mechaber — ${total} blocks`);
