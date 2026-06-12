#!/usr/bin/env node
/** Patch mechaber English only for one siman from _mechaber-overrides/NNN.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _patch-mechaber-siman.mjs SIMAN');
  process.exit(2);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const rel = `siman_${sim}/mechaber/part-001.txt`;
const fp = path.join(OUT, rel);
const ovPath = path.join(WORK, '_mechaber-overrides', `${sim}.json`);

if (!fs.existsSync(ovPath)) throw new Error(`Missing ${ovPath}`);
if (!fs.existsSync(fp)) throw new Error(`Missing ${fp}`);

const T = JSON.parse(fs.readFileSync(ovPath, 'utf8'));
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

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
