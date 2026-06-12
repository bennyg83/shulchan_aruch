#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(h) {
  return h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

const from = Number(process.argv[2] ?? 326);
const to = Number(process.argv[3] ?? 350);
const hebDir = path.join(WORK, '_mechaber-hebrew');
fs.mkdirSync(hebDir, { recursive: true });

for (let sim = from; sim <= to; sim++) {
  const tag = String(sim).padStart(3, '0');
  const dir = path.join(OUT, `siman_${tag}`, 'mechaber');
  if (!fs.existsSync(dir)) {
    console.log(`skip siman_${tag} (no mechaber dir)`);
    continue;
  }
  const out = {};
  for (const f of fs.readdirSync(dir).filter((x) => /^part-.*\.txt$/i.test(x)).sort()) {
    const s = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const part of s.split(BLOCK).slice(1)) {
      const seifM = part.match(/^\s*seif:\s*(.+)\s*$/m);
      const markerM = part.match(/^\s*marker:\s*(.+)\s*$/m);
      if (!seifM) continue;
      const key = `${seifM[1].trim()}#${(markerM ? markerM[1].trim() : 'main') || 'main'}`;
      const hStart = part.indexOf(HEB);
      const eStart = part.indexOf(ENG);
      if (hStart < 0 || eStart < 0) continue;
      const hebrew = part.slice(hStart + HEB.length, eStart).replace(/^\n/, '').trimEnd();
      out[key] = { raw: hebrew, clean: stripHtml(hebrew) };
    }
  }
  const outPath = path.join(hebDir, `${tag}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n');
  console.log(`wrote ${tag}.json (${Object.keys(out).length} keys)`);
}
