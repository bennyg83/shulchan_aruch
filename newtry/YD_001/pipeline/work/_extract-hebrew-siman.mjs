#!/usr/bin/env node
/** Extract Hebrew from all part-*.txt for one siman → _hebrew-NNN.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _extract-hebrew-siman.mjs SIMAN (e.g. 106)');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(html) {
  return String(html)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<i[^>]*data-label="\(([^)]+)\)"[^>]*>/g, '($1) ')
    .replace(/<i[^>]*>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const simDir = path.join(OUT, `siman_${sim}`);
const all = {};
let total = 0;

for (const slug of fs.readdirSync(simDir).sort()) {
  const sd = path.join(simDir, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  const parts = fs.readdirSync(sd).filter((x) => /^part-.*\.txt$/.test(x)).sort();
  if (!parts.length) continue;
  all[slug] = {};
  for (const f of parts) {
    const rel = `siman_${sim}/${slug}/${f}`;
    const s = fs.readFileSync(path.join(sd, f), 'utf8');
    for (const part of s.split(BLOCK).slice(1)) {
      const seifM = part.match(/^\s*seif: (.+)$/m);
      if (!seifM) continue;
      const seif = seifM[1].trim();
      const markerM = part.match(/^\s*marker: (.+)$/m);
      const marker = markerM ? markerM[1].trim() : 'main';
      const h0 = part.indexOf(HEB);
      const h1 = part.indexOf(ENG);
      if (h0 < 0 || h1 < 0) continue;
      const raw = part.slice(h0 + HEB.length + 1, h1).trim();
      const key = `${seif}#${marker}`;
      all[slug][key] = { rel, heb: stripHtml(raw), raw };
      total++;
    }
  }
}

const outPath = path.join(WORK, `_hebrew-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(all, null, 2), 'utf8');
console.log(`wrote ${outPath} — ${total} blocks in ${Object.keys(all).length} slugs`);
