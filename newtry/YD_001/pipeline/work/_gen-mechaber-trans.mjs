#!/usr/bin/env node
/** Write _mechaber-trans-NNN.mjs from _hebrew-NNN.json mechaber + optional _overrides-mechaber-NNN.json */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _gen-mechaber-trans.mjs SIMAN');
  process.exit(1);
}

function stripHtml(html) {
  return String(html)
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<i[^>]*>/g, '')
    .replace(/<\/i>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function translateMechaber(raw) {
  let s = String(raw || '');
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => `{Rama: ${applyPhrases(stripHtml(g))}}`);
  s = s.replace(/<small>([\s\S]*?)<\/small>/gi, (_, g) => {
    const t = stripHtml(g).replace(/^הגה\s*/, '');
    return `{Rama: ${applyPhrases(t)}}`;
  });
  return applyPhrases(stripHtml(s));
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const hebPath = path.join(WORK, `_hebrew-${sim}.json`);
const ovPath = path.join(WORK, `_overrides-mechaber-${sim}.json`);
const raw = JSON.parse(fs.readFileSync(hebPath, 'utf8'));
const heb = raw.hebrewBySlug?.mechaber || raw.mechaber || {};
const overrides = fs.existsSync(ovPath) ? JSON.parse(fs.readFileSync(ovPath, 'utf8')) : {};

let out = `/** YD001 mechaber quality-pass siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const [key, entry] of Object.entries(heb)) {
  const text =
    overrides[key] ??
    translateMechaber(entry.raw || entry.heb);
  out += `  '${key}': \`${esc(text)}\`,\n`;
}
out += `};\n`;

const outPath = path.join(WORK, `_mechaber-trans-${sim}.mjs`);
fs.writeFileSync(outPath, out, 'utf8');
console.log(`Wrote ${outPath} (${Object.keys(heb).length} keys)`);
