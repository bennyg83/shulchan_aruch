#!/usr/bin/env node
/** Dump mechaber block keys + clean Hebrew from part-001 for one siman */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const fp = path.join(ROOT, 'output', `siman_${sim}/mechaber/part-001.txt`);
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const s = fs.readFileSync(fp, 'utf8');
const out = {};
for (const part of s.split(BLOCK).slice(1)) {
  const seifM = part.match(/^\s*seif: (.+)$/m);
  const markerM = part.match(/^\s*marker: (.+)$/m);
  if (!seifM) continue;
  const key = `${seifM[1].trim()}#${(markerM ? markerM[1].trim() : 'main') || 'main'}`;
  const hStart = part.indexOf(HEB);
  const eStart = part.indexOf(ENG);
  if (hStart < 0 || eStart < 0) continue;
  const hebrew = part.slice(hStart + HEB.length, eStart).replace(/^\n/, '').trimEnd();
  out[key] = hebrew;
}
const outPath = path.join(WORK, '_mechaber-hebrew', `${sim}.json`);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${outPath} (${Object.keys(out).length} keys)`);
