#!/usr/bin/env node
/**
 * Build _overrides-SIM.json with full English from _hebrew-SIM.json
 * Uses translateBlock + extra polish passes + slug-specific citation helpers.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { translateBlock, stripHtml, esc } from './_gen-siman-translations.mjs';

const sim = process.argv[2];
if (!sim || !/^\d{3}$/.test(sim)) {
  console.error('Usage: node _build-full-overrides.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));

function polishFull(text) {
  let s = String(text);
  for (let i = 0; i < 8; i++) s = applyPhrases(s);
  return s
    .replace(/\s+/g, ' ')
    .replace(/ ([.,;:])/g, '$1')
    .trim();
}

function translateBeer111(h) {
  const t = h.trim();
  if (/^טור בשם סת"ה/.test(t))
    return 'Tur in name of Sefer HaTerumah, from the baraita of two pots, one of terumah, etc. — Pesachim daf 9 and daf 44 and Yevamot daf 82, as explained there.';
  if (/^שם תספות/.test(t)) return 'There — Tosafot chapter 9 of Terumot.';
  if (/^שם ממשנה דשתי קופוס/.test(t))
    return 'There — from the mishnah of two containers, chapter 7 of Terumot mishnah 5.';
  if (/^שם ממשמעות הגמרא יבמות/.test(t))
    return 'There — from the implication of the Gemara Yevamot daf 22, that they challenged R\' Yochanan from a mikveh that has forty se\'ah, etc.';
  if (/^שם בפסחים/.test(t)) return 'There — in Pesachim and in the other place.';
  if (/^ג"ז מהא דפסחים/.test(t)) return 'Also from this in Pesachim above.';
  if (/^שם וכדעת ר"ת/.test(t))
    return 'There — and according to R\' Tam, as I noted above siman 98 seif 2.';
  return polishFull(t);
}

function extra(slug, entry) {
  const raw = entry.raw || entry.heb;
  if (slug === 'beer-hagolah') return translateBeer111(entry.heb);
  let t = translateBlock(slug, entry);
  t = polishFull(t);
  if (/[\u0590-\u05FF]/.test(t)) {
    const plain = polishFull(stripHtml(raw));
    if (!/[\u0590-\u05FF]/.test(plain)) t = plain;
  }
  return t;
}

const out = {};
let hebLeft = 0;
for (const slug of Object.keys(heb).sort()) {
  out[slug] = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    const t = extra(slug, entry);
    out[slug][key] = t;
    if (/[\u0590-\u05FF]{3,}/.test(t)) hebLeft++;
  }
}

const outPath = path.join(WORK, `_overrides-${sim}.json`);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`Wrote ${outPath} — ${hebLeft} blocks still contain Hebrew`);
