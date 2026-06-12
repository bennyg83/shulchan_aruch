#!/usr/bin/env node
/**
 * Generate _patch-siman-095-translations.mjs from _hebrew-095.json
 * Mechaber from _mechaber-overrides.json; other slugs via YD001 phrase engine.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  applyPhrases,
  polish095,
  translateBaer095,
} from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const mechaberAll = JSON.parse(
  fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'),
);
const manualBaer = JSON.parse(
  fs.readFileSync(path.join(WORK, '_manual-095-baer.json'), 'utf8'),
);
const overridesPath = path.join(WORK, '_overrides-095.json');
const manual095Path = path.join(WORK, '_manual-095.json');
const manual095All = fs.existsSync(manual095Path)
  ? JSON.parse(fs.readFileSync(manual095Path, 'utf8'))
  : {};
const overrides095 = fs.existsSync(overridesPath)
  ? JSON.parse(fs.readFileSync(overridesPath, 'utf8'))
  : {};

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>[^<]*<\/small>/g, (m) => m.replace(/<\/?small>/g, ''))
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function translateBeer095(heb) {
  const h = stripHtml(heb);
  if (/^מסקנת הגמרא/.test(h))
    return 'Conclusion of the Gemara there according to Rav — Chullin daf 118, as Tosafot and Rosh explained there from Rashi\'s language, and so too Tur.';
  if (/^הרמב"ם והרשב"א/.test(h) && !/בת"ה/.test(h))
    return 'Rambam, Rashba, Ran, Ra\'avyah, his elder, and R\' Yitzchak.';
  if (/^הרמב"ם והרשב"א בת"ה/.test(h)) return 'Rambam and Rashba in Torat HaBayit.';
  if (/^תשובות הרשב"א/.test(h)) return 'Responsa of Rashba siman 276.';
  if (/^שם שקליפת/.test(h))
    return 'There — that the shell of the egg is clearly perforated, and when a person cooks it he finds the egg itself colored from that color; and see above siman 86 seif 5 in the gloss.';
  if (/^טור בשם/.test(h))
    return 'Tur in name of his father the Rosh, Ramban, and Rashba.';
  if (/^בית יוסף/.test(h))
    return 'Beit Yosef; and as Rashba wrote regarding fish that came up in a bowl above seif 1 — because it is not comparable to fish that came up in a bowl, for here it is different since the bowls touch the cauldron and taste is emitted from one to the other and it becomes a second taste in prohibition; and further, when the second taste of meat and milk enters the water they are immediately forbidden and return and forbid the cauldron and the pan.';
  return polish095(translateBaer095(heb));
}

function translateGra(heb, raw) {
  const src = raw || heb;
  const m = src.match(/<b>([^<]+)<\/b>\s*(.*)/s);
  if (m) {
    const title = polish095(stripHtml(m[1]));
    const body = polish095(stripHtml(m[2]));
    if (body.length < 3 && /end of his words/.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  return polish095(stripHtml(heb));
}

function translateBaer(heb, raw) {
  const src = stripHtml(raw || heb);
  const m = src.match(/^([^.]+)\.\s*(.*)$/s);
  if (m) return polish095(translateBaer095(src));
  return polish095(src);
}

function translateSiftei(heb, raw) {
  let h = stripHtml(raw || heb);
  const bracketed = h.startsWith('["');
  if (bracketed) h = h.slice(2, -2);
  const titleM = h.match(/^([^.]+\.)\s*/);
  let title = '';
  let body = h;
  if (titleM) {
    title = polish095(titleM[1].trim());
    body = h.slice(titleM[0].length);
  }
  body = polish095(body);
  const out = `${title} ${body}`.trim();
  return bracketed ? `["${out}"]` : out;
}

function translateKaf(heb) {
  const h = stripHtml(heb);
  const ordM = h.match(/^\(([א-ת])\)/);
  const ord = { א: '1', ב: '2', ג: '3', ד: '4', ה: '5', ו: '6', ז: '7' }[ordM?.[1]];
  const prefix = ord ? `(${ord}) ` : '';
  return prefix + polish095(h.replace(/^\([א-ת]\)\s*/, ''));
}

function translateNekudot(heb) {
  let s = stripHtml(heb);
  s = s.replace(/סימן צ"ה/, 'siman 95');
  s = s.replace(/סק"(\d+)/g, 's.k. $1');
  return polish095(s);
}

function translateMateh(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) {
    const head = polish095(m[1]);
    const body = polish095(m[2]);
    return `(${head}) ${body}`;
  }
  return polish095(h);
}

function translateRae(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) return `(${polish095(m[1])}) ${polish095(m[2])}`;
  return polish095(h);
}

function translateKereti(heb) {
  return polish095(stripHtml(heb));
}

function translatePeleti(heb) {
  return polish095(stripHtml(heb));
}

function translateBlock(slug, entry) {
  const heb = entry.heb;
  const raw = entry.raw || heb;

  switch (slug) {
    case 'beer-hagolah':
      return translateBeer095(heb);
    case 'beur-hagra':
      return translateGra(heb, raw);
    case 'baer-heitev':
      return translateBaer(heb, raw);
    case 'siftei-kohen':
      return translateSiftei(heb, raw);
    case 'kaf-hachayim':
      return translateKaf(heb);
    case 'nekudot-hakesef':
      return translateNekudot(heb);
    case 'mateh-yehonatan':
      return translateMateh(heb);
    case 'rabbi-akiva-eiger-yd':
      return translateRae(heb);
    case 'pitchei-teshuva':
      return translateBaer(heb, raw);
    case 'yad-avraham':
      return translateMateh(heb);
    case 'yad-ephraim':
      return translateMateh(heb);
    case 'kereti':
      return translateKereti(heb);
    case 'peleti':
      return translatePeleti(heb);
    case 'turei-zahav':
      return translateBaer(heb, raw);
    default:
      return polish095(stripHtml(heb));
  }
}

function buildSiman() {
  const sim = '095';
  const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
  const TRANSLATIONS = {};

  if (mechaberAll[sim]?.mechaber) {
    TRANSLATIONS.mechaber = { ...mechaberAll[sim].mechaber };
  }

  for (const slug of Object.keys(heb).sort()) {
    if (slug === 'mechaber') continue;
    TRANSLATIONS[slug] = {};
    for (const [key, entry] of Object.entries(heb[slug])) {
      TRANSLATIONS[slug][key] =
        overrides095[slug]?.[key] ??
        manual095All[slug]?.[key] ??
        (slug === 'baer-heitev' ? manualBaer[key] : null) ??
        translateBlock(slug, entry);
    }
  }

  let out = `/** Full translations siman ${sim} — YD001 editorial pass */\nexport const TRANSLATIONS = {\n`;
  for (const slug of Object.keys(TRANSLATIONS)) {
    out += `  '${slug}': {\n`;
    for (const [key, val] of Object.entries(TRANSLATIONS[slug])) {
      out += `    '${key}': \`${esc(val)}\`,\n`;
    }
    out += `  },\n`;
  }
  out += `};\n`;

  const outPath = path.join(WORK, `_patch-siman-${sim}-translations.mjs`);
  fs.writeFileSync(outPath, out);
  const n = Object.values(TRANSLATIONS).reduce((a, m) => a + Object.keys(m).length, 0);
  console.log(`Wrote ${outPath} — ${n} blocks`);
  return { outPath, n };
}

const { outPath, n } = buildSiman();
console.log(JSON.stringify({ path: outPath, blocks: n }));
