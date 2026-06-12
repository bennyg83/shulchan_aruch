#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function strip(html) {
  return html
    .replace(/<small>/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<i[^>]*data-label="\(([^)]+)\)"[^>]*>/g, '($1) ')
    .replace(/<i[^>]*>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

const dir = path.join(OUT, 'siman_105');
const all = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const sd = path.join(dir, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  all[slug] = {};
  for (const f of fs.readdirSync(sd).filter((x) => x.startsWith('part-'))) {
    const s = fs.readFileSync(path.join(sd, f), 'utf8');
    for (const part of s.split(BLOCK).slice(1)) {
      const seif = part.match(/^\s*seif: (.+)$/m)[1].trim();
      const markerM = part.match(/^\s*marker: (.+)$/m);
      const marker = markerM ? markerM[1].trim() : 'main';
      const h0 = part.indexOf(HEB);
      const h1 = part.indexOf(ENG);
      all[slug][`${seif}#${marker}`] = strip(part.slice(h0 + HEB.length + 1, h1));
    }
  }
}
const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '_siman-105-hebrew.json');
fs.writeFileSync(outPath, JSON.stringify(all, null, 2));
console.log('wrote', outPath, Object.values(all).reduce((a, s) => a + Object.keys(s).length, 0), 'blocks');
