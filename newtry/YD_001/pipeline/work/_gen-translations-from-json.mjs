#!/usr/bin/env node
/**
 * Generate _patch-siman-NNN-translations.mjs from _hebrew-NNN.json
 * Usage: node _gen-translations-from-json.mjs 086
 * Manual overrides in _manual-NNN.mjs export const MANUAL = { slug: { key: text } }
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = process.argv[2];
if (!sim) {
  console.error('Usage: node _gen-translations-from-json.mjs SIMAN');
  process.exit(1);
}

const hebPath = path.join(WORK, `_hebrew-${sim}.json`);
const manualPath = path.join(WORK, `_manual-${sim}.mjs`);
const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);

const heb = JSON.parse(fs.readFileSync(hebPath, 'utf8'));
let MANUAL = {};
if (fs.existsSync(manualPath)) {
  MANUAL = (await import(`./_manual-${sim}.mjs`)).MANUAL;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function beerTranslate(heb) {
  if (/משנה חולין/.test(heb)) return heb.match(/דף [^:]+/) ? `Mishnah Chullin ${heb.match(/דף ([^:]+)/)?.[1] || ''}`.trim() : 'Mishnah Chullin.';
  if (/מסקנת/.test(heb)) return 'Conclusion of the Gemara there.';
  if (/שם במשנה/.test(heb)) return 'There in the Mishnah.';
  if (/ברייתא/.test(heb) && /תוספות/.test(heb)) return 'There in the baraita and as Tosafot explain there.';
  if (/ברייתא/.test(heb)) return 'There in the baraita.';
  if (/שם/.test(heb) && heb.length < 40) return 'There.';
  if (/טור/.test(heb) && heb.length < 30) return 'Tur.';
  if (/הרשב"א/.test(heb)) return 'Rashba there.';
  if (/הרא"ש/.test(heb)) return 'Rosh there.';
  return null;
}

function graShort(heb) {
  const m = heb.match(/^(.+?)\.\s*ע/);
  if (m && heb.length < 80) return `${m[1].replace(/^<b>|<\/b>/g, '')} — see there.`;
  if (/^אפי' הם/.test(heb)) return 'Even if they are, etc. — Gemara there.';
  if (/^ויהיו/.test(heb)) return 'And they shall be, etc. — as stated in the Mishnah there and provided that not, etc. — Gemara there.';
  return null;
}

function defaultTranslate(heb, slug) {
  if (slug === 'beer-hagolah') {
    const b = beerTranslate(heb);
    if (b) return b;
  }
  if (slug === 'beur-hagra' && heb.length < 120) {
    const g = graShort(heb);
    if (g) return g;
  }
  if (slug === 'nekudot-hakesef') {
    return heb.replace(/סימן פ"ח/, 'siman 88').replace(/סימן פ"ה/, 'siman 85').replace(/סק"(\d+)/, 's.k. $1').replace(/עיין/, 'see').replace(/בש"ך/, 'in Shach').replace(/ובב"ח/, 'and in Bach');
  }
  return `[Translation required — ${slug}] ${heb.slice(0, 100)}...`;
}

const TRANSLATIONS = {};
for (const slug of Object.keys(heb).sort()) {
  TRANSLATIONS[slug] = {};
  for (const [key, { heb: h }] of Object.entries(heb[slug])) {
    TRANSLATIONS[slug][key] =
      MANUAL[slug]?.[key] ?? defaultTranslate(h, slug);
  }
}

let out = `/** Auto-generated + manual overrides for siman ${sim} */\nexport const TRANSLATIONS = {\n`;
for (const slug of Object.keys(TRANSLATIONS)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;
fs.writeFileSync(outPath, out);
let n = 0;
for (const s of Object.values(TRANSLATIONS)) n += Object.keys(s).length;
const req = Object.values(TRANSLATIONS).flatMap((s) => Object.values(s)).filter((v) => v.startsWith('[Translation required')).length;
console.log(`wrote ${outPath} — ${n} blocks, ${req} still need manual`);
