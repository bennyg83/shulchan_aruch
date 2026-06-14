#!/usr/bin/env node
/** Apply siman 122 hebrew_in_english cleanup via string replacement in ENGLISH sections. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile } from '../../yd001_block_lib.mjs';
import { runBlockQualityChecks } from '../lib/quality-checks.mjs';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { TRANSLATIONS } from './_patch-siman-122-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SIM_DIR = path.join(ROOT, 'output', 'siman_122');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function stripHtml(h) {
  return String(h || '')
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>/g, '{')
    .replace(/<\/small>/g, '}')
    .replace(/<br>/g, ' ')
    .replace(/<i[^>]*>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trim();
}

function fallbackTranslate(he) {
  return applyPhrases(stripHtml(he));
}

function patchFile(abs, slug, T) {
  const raw = fs.readFileSync(abs, 'utf8');
  const parts = raw.split(BLOCK);
  let count = 0;
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const key = `${seifM[1].trim()}#${markerM ? markerM[1].trim() : 'main'}`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(`Missing EN/END in ${abs} ${key}`);
    const text = T[key].endsWith('\n') ? T[key] : T[key] + '\n';
    count++;
    return BLOCK + block.slice(0, enStart + ENG.length + 1) + text + block.slice(enEnd);
  });
  fs.writeFileSync(abs, out.join(''), 'utf8');
  return count;
}

const slugs = fs.readdirSync(SIM_DIR).filter((d) => fs.statSync(path.join(SIM_DIR, d)).isDirectory());
let total = 0;
for (const slug of slugs.sort()) {
  const part = path.join(SIM_DIR, slug, 'part-001.txt');
  if (!fs.existsSync(part)) continue;
  const T = TRANSLATIONS[slug];
  if (!T) continue;
  const n = patchFile(part, slug, T);
  if (n) {
    console.log(`OK siman_122/${slug}/part-001.txt (${n} blocks)`);
    total += n;
  }
}

// Validate
let errors = 0;
for (const slug of slugs) {
  const part = path.join(SIM_DIR, slug, 'part-001.txt');
  if (!fs.existsSync(part)) continue;
  for (const b of parseBlocksInFile(fs.readFileSync(part, 'utf8'))) {
    const issues = runBlockQualityChecks(b);
    if (issues.some((i) => i.code === 'hebrew_in_english' && i.severity === 'error')) errors++;
  }
}
console.log(`Patched ${total} blocks; hebrew_in_english errors remaining: ${errors}`);
if (errors) process.exit(1);
