#!/usr/bin/env node
/**
 * Generate _patch-siman-NNN-translations.mjs for simanim 091–095.
 * Merges hand translations (_tr091, translations-094, p1/p2 parts) + YD001 phrase engine.
 * Siman 093: merge p1+p2+p3 only (no phrase fallback).
 * Usage: node _gen-091-095-translations.mjs [091|092|...|all]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases, translateBaer095 } from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);

const SIMAN_GERSH = {
  '091': 'צ"א',
  '092': 'צ"ב',
  '093': 'צ"ג',
  '094': 'צ"ד',
  '095': 'צ"ה',
};

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function shachWrap(en) {
  if (en.startsWith('["')) return en;
  const inner = en.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  return `["${inner}"]`;
}

async function loadPartial091() {
  const out = {};
  const dir = path.join(WORK, '_tr091');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
    const slug = f.replace(/\.mjs$/, '');
    const mod = await import(`./_tr091/${f}`);
    out[slug] = mod.default;
  }
  return out;
}

async function loadPartial094() {
  const out = {};
  const dir = path.join(WORK, 'translations-094');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.mjs'))) {
    const slug = f.replace(/\.mjs$/, '');
    const mod = await import(`./translations-094/${f}`);
    out[slug] = mod.default;
  }
  return out;
}

async function loadPartial092() {
  const merged = {};
  const { TRANSLATIONS_P1 } = await import('./_patch-siman-092-translations-p1.mjs');
  Object.assign(merged, TRANSLATIONS_P1);
  const p2Path = path.join(WORK, '_patch-siman-092-translations-p2.mjs');
  if (fs.existsSync(p2Path)) {
    const { TRANSLATIONS_P2 } = await import('./_patch-siman-092-translations-p2.mjs');
    for (const [slug, keys] of Object.entries(TRANSLATIONS_P2)) {
      merged[slug] = { ...merged[slug], ...keys };
    }
  }
  return merged;
}

async function loadPartial093() {
  const { TRANSLATIONS_P1 } = await import('./_patch-siman-093-translations-p1.mjs');
  const { TRANSLATIONS_P2 } = await import('./_patch-siman-093-translations-p2.mjs');
  const { TRANSLATIONS_P3 } = await import('./_patch-siman-093-translations-p3.mjs');
  const merged = {};
  for (const part of [TRANSLATIONS_P1, TRANSLATIONS_P2, TRANSLATIONS_P3]) {
    for (const [slug, keys] of Object.entries(part)) {
      merged[slug] = { ...merged[slug], ...keys };
    }
  }
  return merged;
}

function translateBeer(heb) {
  const h = stripHtml(heb);
  if (/^מסקנת/.test(h)) return applyPhrases(h);
  if (/^טור/.test(h)) return applyPhrases(h);
  if (/^בית יוסף/.test(h)) return applyPhrases(h);
  if (/^הרמב"ם/.test(h)) return applyPhrases(h);
  return translateBaer095(heb);
}

function translateGra(heb, raw) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]+)<\/b>\s*(.*)/s);
  if (m) {
    const title = applyPhrases(stripHtml(m[1]));
    const body = applyPhrases(stripHtml(m[2]));
    if (body.length < 3 && /ע"כ|עכ"ל/.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  return applyPhrases(stripHtml(heb));
}

function translateBaer(heb, raw) {
  return translateBaer095(stripHtml(raw || heb));
}

function translateSiftei(heb, raw) {
  let h = stripHtml(raw || heb);
  if (h.startsWith('["')) h = h.slice(2, -2);
  const titleM = h.match(/^([^.]+\.)\s*/);
  let title = '';
  let body = h;
  if (titleM) {
    title = applyPhrases(titleM[1].trim());
    body = h.slice(titleM[0].length);
  }
  body = applyPhrases(body);
  if ((raw || heb).trim().startsWith('["')) return `["${title} ${body}"]`;
  return `${title} ${body}`.trim();
}

function translateKaf(heb) {
  const h = stripHtml(heb);
  const ordM = h.match(/^\(([א-ת])\)/);
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7', ח: '8', ט: '9' }[ordM?.[1]];
  const prefix = ord ? `(${ord}) ` : '';
  return prefix + applyPhrases(h.replace(/^\([א-ת]\)\s*/, ''));
}

function translateNekudot(heb, sim) {
  let s = stripHtml(heb);
  const g = SIMAN_GERSH[sim];
  if (g) s = s.replace(new RegExp(`סימן ${g.replace(/"/g, '"')}`, 'g'), `siman ${parseInt(sim, 10)}`);
  s = s.replace(/סק"(\d+)/g, 's.k. $1');
  return applyPhrases(s);
}

function translateMateh(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) return `(${applyPhrases(m[1])}) ${applyPhrases(m[2])}`;
  return applyPhrases(h);
}

function translateBlock(slug, entry, sim) {
  const heb = entry.heb;
  const raw = entry.raw || heb;
  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(heb);
    case 'beur-hagra':
      return translateGra(heb, raw);
    case 'baer-heitev':
    case 'pitchei-teshuva':
    case 'turei-zahav':
      return translateBaer(heb, raw);
    case 'siftei-kohen':
      return translateSiftei(heb, raw);
    case 'kaf-hachayim':
      return translateKaf(heb);
    case 'nekudot-hakesef':
      return translateNekudot(heb, sim);
    case 'mateh-yehonatan':
    case 'yad-avraham':
    case 'yad-ephraim':
      return translateMateh(heb);
    case 'rabbi-akiva-eiger-yd':
      return translateMateh(heb);
    case 'kereti':
    case 'peleti':
      return applyPhrases(stripHtml(heb));
    default:
      return applyPhrases(stripHtml(heb));
  }
}

async function loadOverrides(sim) {
  const p = path.join(WORK, `_overrides-${sim}.json`);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
}

async function buildSiman(sim) {
  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  const overrides = await loadOverrides(sim);

  let partial = {};
  if (sim === '091') partial = await loadPartial091();
  else if (sim === '092') partial = await loadPartial092();
  else if (sim === '093') partial = await loadPartial093();
  else if (sim === '094') partial = await loadPartial094();

  const phraseOnly = sim === '093';
  const TRANSLATIONS = {};
  let fromPartial = 0;
  let fromPhrase = 0;

  if (mechaberAll[sim]?.mechaber) {
    TRANSLATIONS.mechaber = { ...mechaberAll[sim].mechaber };
  }

  for (const slug of Object.keys(heb).sort()) {
    if (slug === 'mechaber' && TRANSLATIONS.mechaber) continue;
    TRANSLATIONS[slug] = TRANSLATIONS[slug] || {};
    if (slug === 'mechaber' && !TRANSLATIONS.mechaber) TRANSLATIONS.mechaber = {};

    for (const [key, entry] of Object.entries(heb[slug])) {
      let t =
        overrides[slug]?.[key] ??
        partial[slug]?.[key] ??
        (phraseOnly ? null : translateBlock(slug, entry, sim));

      if (!t) {
        if (phraseOnly) {
          console.error(`MISSING ${sim}/${slug}/${key}`);
          process.exit(1);
        }
        t = translateBlock(slug, entry, sim);
        fromPhrase++;
      } else {
        fromPartial++;
      }

      if (slug === 'siftei-kohen' && !t.startsWith('[')) {
        t = shachWrap(t);
      }
      TRANSLATIONS[slug][key] = t;
    }
  }

  let out = `/** Full translations siman ${sim} — YD001 editorial pass */\nexport const TRANSLATIONS = {\n`;
  for (const slug of Object.keys(TRANSLATIONS)) {
    out += `  '${slug}': {\n`;
    for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
      const v = typeof val === 'string' ? val : String(val);
      out += `    '${key}': \`${esc(v)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;

  const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
  fs.writeFileSync(outPath, out);
  const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
  console.log(`Wrote ${outPath} — ${n} blocks (partial: ${fromPartial}, phrase: ${fromPhrase})`);
  return n;
}

const arg = process.argv[2] || 'all';
const sims =
  arg === 'all' ? ['091', '092', '093', '094', '095'] : [arg.padStart(3, '0')];

let total = 0;
for (const sim of sims) {
  if (sim === '095') {
    const { spawnSync } = await import('child_process');
    const r = spawnSync('node', ['_gen-095-translations.mjs'], {
      cwd: WORK,
      stdio: 'inherit',
    });
    if (r.status !== 0) process.exit(r.status ?? 1);
    total += 154;
    continue;
  }
  total += await buildSiman(sim);
}
console.log(`Total: ${total} blocks`);
