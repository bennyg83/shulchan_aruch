#!/usr/bin/env node
/**
 * Generate _patch-siman-NNN-translations.mjs from _hebrew-NNN.json + _overrides-NNN.json
 * Overrides file: { "slug": { "key": "english" } } — full YD001 translations required.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const ovPath = path.join(WORK, `_overrides-${sim}.json`);
const overrides = fs.existsSync(ovPath) ? JSON.parse(fs.readFileSync(ovPath, 'utf8')) : {};

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function cite(slug, heb) {
  if (slug === 'beer-hagolah') {
    if (/משנה/.test(heb)) return heb.replace(/משנה חולין דף ([^"]+)/, 'Mishnah Chullin daf $1').replace(/דף/g, 'daf');
    if (/מסקנת/.test(heb)) return 'Conclusion of the Gemara there.';
    if (/שם/.test(heb) && heb.length < 50) return 'There.';
    if (/טור/.test(heb)) return 'Tur.';
    if (/הרא"ש/.test(heb)) return 'Rosh there.';
    if (/הרשב"א/.test(heb)) return 'Rashba there.';
    if (/ברייתא/.test(heb)) return 'Baraita there.';
    if (/רמב"ם/.test(heb)) return 'Rambam there.';
  }
  if (slug === 'beur-hagra' && heb.length < 100) {
    const t = heb.replace(/^<b>([^<]+)<\/b>.*/, '$1');
    if (/ע"ל|עיין/.test(heb)) return `${t} — see there.`;
    return `${t} — Gra.`;
  }
  if (slug === 'nekudot-hakesef') {
    return heb
      .replace(/סימן פ"ט/, 'siman 89')
      .replace(/סימן צ"/, 'siman 90')
      .replace(/סימן פ"ז/, 'siman 87')
      .replace(/סימן פ"ו/, 'siman 86')
      .replace(/סק"(\d+)/g, 's.k. $1')
      .replace(/עיין/, 'see')
      .replace(/בש"ך/, 'in Shach');
  }
  return null;
}

const TRANSLATIONS = {};
let missing = 0;
for (const slug of Object.keys(heb).sort()) {
  TRANSLATIONS[slug] = {};
  for (const [key, { heb: h }] of Object.entries(heb[slug])) {
    const t =
      overrides[slug]?.[key] ??
      overrides[slug]?.[key.replace(/#_/, '#main')] ??
      cite(slug, h);
    if (!t) {
      missing++;
      TRANSLATIONS[slug][key] = `PENDING_TRANSLATION_${slug}_${key}`;
    } else {
      TRANSLATIONS[slug][key] = t;
    }
  }
}

const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
let out = `/** Translations siman ${sim} — overrides in _overrides-${sim}.json */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;
fs.writeFileSync(outPath, out);
console.log(`wrote ${outPath} — ${missing} keys need overrides in _overrides-${sim}.json`);
