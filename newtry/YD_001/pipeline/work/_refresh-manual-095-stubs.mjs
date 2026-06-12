#!/usr/bin/env node
/** Replace stub entries in _manual-095.json with full phrase-engine translations */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases, polish095, translateBaer095 } from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-095.json'), 'utf8'));
const manualPath = path.join(WORK, '_manual-095.json');
const manual = JSON.parse(fs.readFileSync(manualPath, 'utf8'));

function stripHtml(h) {
  return String(h)
    .replace(/<b>/g, '')
    .replace(/<\/b>/g, '')
    .replace(/<small>[^<]*<\/small>/g, (m) => m.replace(/<\/?small>/g, ''))
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .trim();
}

function translateMateh(heb) {
  const h = stripHtml(heb);
  const m = h.match(/^\(([^)]+)\)\s*(.*)/s);
  if (m) return `(${polish095(m[1])}) ${polish095(m[2])}`;
  return polish095(h);
}

function translateBaer(heb, raw) {
  const src = stripHtml(raw || heb);
  return polish095(translateBaer095(src));
}

function translateNekudot(heb) {
  let s = stripHtml(heb);
  s = s.replace(/סימן צ"ה/, 'siman 95');
  s = s.replace(/סק"(\d+)/g, 's.k. $1');
  return polish095(s);
}

function translateBlock(slug, entry) {
  const { heb: h, raw } = entry;
  switch (slug) {
    case 'pitchei-teshuva':
      return translateBaer(h, raw);
    case 'nekudot-hakesef':
      return translateNekudot(h);
    case 'mateh-yehonatan':
    case 'yad-avraham':
    case 'yad-ephraim':
    case 'rabbi-akiva-eiger-yd':
      return translateMateh(h);
    case 'peleti':
      return polish095(applyPhrases(h));
    default:
      return polish095(applyPhrases(h));
  }
}

const SKIP_SLUGS = new Set(['mechaber', 'baer-heitev', 'beer-hagolah', 'siftei-kohen', 'turei-zahav', 'kaf-hachayim']);

let updated = 0;
for (const slug of Object.keys(heb)) {
  if (SKIP_SLUGS.has(slug)) continue;
  for (const [key, entry] of Object.entries(heb[slug])) {
    const cur = manual[slug]?.[key] ?? '';
    const hebLen = stripHtml(entry.heb).length;
    const curLen = cur.replace(/^\["|"\]$/g, '').length;
    if (hebLen > 120 && curLen / hebLen < 0.35) {
      if (!manual[slug]) manual[slug] = {};
      manual[slug][key] = translateBlock(slug, entry);
      updated++;
      console.log(`updated ${slug}|${key} ${curLen} -> ${manual[slug][key].length}`);
    }
  }
}

fs.writeFileSync(manualPath, JSON.stringify(manual, null, 2) + '\n');
console.log(`Updated ${updated} stub entries in _manual-095.json`);
