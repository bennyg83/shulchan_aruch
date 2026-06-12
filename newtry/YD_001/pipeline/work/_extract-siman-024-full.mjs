#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SIMAN = path.join(ROOT, 'output', 'siman_024');
const WORK = path.dirname(fileURLToPath(import.meta.url));
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(h) {
  return h
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<p[^>]*>/gi, '')
    .replace(/<small>([\s\S]*?)<\/small>/gi, (_, t) => `{Rama: ${t}}`)
    .replace(/<i[^>]*data-label="([^"]*)"[^>]*>/gi, '($1)')
    .replace(/<\/i>/gi, '')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();
}

const order = [
  'mechaber', 'siftei-kohen', 'turei-zahav', 'baer-heitev', 'beer-hagolah',
  'beur-hagra', 'kereti', 'peleti', 'pitchei-teshuva', 'rabbi-akiva-eiger-yd',
  'nekudot-hakesef', 'kaf-hachayim', 'yad-avraham', 'yad-ephraim',
];

let md = '# Siman 024 Hebrew blocks\n\n';
for (const d of order) {
  const fp = path.join(SIMAN, d, 'part-001.txt');
  const s = fs.readFileSync(fp, 'utf8');
  const blocks = s.split(BLOCK).slice(1);
  md += `\n## ${d} (${blocks.length})\n\n`;
  for (const b of blocks) {
    const seif = (b.match(/^\s*seif: (.+)$/m) || [])[1]?.trim();
    const marker = (b.match(/^\s*marker: (.+)$/m) || [])[1]?.trim() || 'main';
    const h0 = b.indexOf(HEB);
    const h1 = b.indexOf(ENG);
    const hebrew = stripHtml(b.slice(h0 + HEB.length + 1, h1));
    md += `### ${seif}#${marker}\n\n${hebrew}\n\n---\n\n`;
  }
}
fs.writeFileSync(path.join(WORK, '_siman-024-hebrew.md'), md, 'utf8');
console.log('Wrote', path.join(WORK, '_siman-024-hebrew.md'));
