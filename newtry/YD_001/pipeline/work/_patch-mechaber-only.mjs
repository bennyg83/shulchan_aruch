#!/usr/bin/env node
/** Patch only mechaber blocks using _mechaber-overrides.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const mechaber = JSON.parse(fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'));
const sims = process.argv.slice(2);

for (const sim of sims) {
  const T = mechaber[sim]?.mechaber;
  if (!T) {
    console.error(`No mechaber overrides for siman ${sim}`);
    continue;
  }
  const rel = `siman_${sim}/mechaber/part-001.txt`;
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== 'mechaber') return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(`siman ${sim} mechaber missing keys: ${missing.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
  fs.appendFileSync(
    path.join(ROOT, 'progress.log'),
    `${ts} siman_${sim}/mechaber ${applied.size} blocks DONE (mechaber-only pass)\n`
  );
  console.log(`[MECHABER] siman_${sim} — ${applied.size} blocks`);
}
