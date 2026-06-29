#!/usr/bin/env node
/** Generate hand-authored _tr-data-189.mjs from failing blocks */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';
import { EXTRA_VESET } from './_extra-veset.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const failing = JSON.parse(fs.readFileSync(path.join(WORK, '_failing-siman-189.json'), 'utf8'));

function strip(h) {
  let s = String(h);
  // unwrap JSON-escaped siftei-kohen blocks
  if (/^\[\"/.test(s.trim())) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed) && parsed[0]) s = parsed[0];
    } catch { /* keep */ }
  }
  s = s.replace(/<small>\s*הגה\s*([\s\S]*?)<\/small>/gi, (_, g) => {
    const inner = g.replace(/<[^>]+>/g, '').trim();
    return `{Rama: ${inner}}`;
  });
  s = s.replace(/<small>([\s\S]*?)<\/small>/gi, (_, g) => {
    const inner = g.replace(/<[^>]+>/g, '').trim().replace(/^הגה\s*/, '');
    return inner ? `{Rama: ${inner}}` : '';
  });
  s = s.replace(/<b>([^<]*)<\/b>/g, '$1');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  s = s.replace(/\\"/g, '"');
  return s.trim();
}

function deepTr(h, passes = 14) {
  let s = strip(h);
  for (let p = 0; p < passes; p++) {
    for (const [re, to] of EXTRA_VESET) s = s.replace(re, to);
    s = applyPhrases(s);
  }
  s = s.replace(/\s+/g, ' ').trim();
  // cleanup artifacts
  s = s.replace(/\{Rama:\s*\}/g, '');
  s = s.replace(/\s+([,.:;])/g, '$1');
  s = s.replace(/\. \./g, '.');
  return s;
}

function translateBeer(h) {
  const t = strip(h);
  if (/מעובדא דההוא איתתא/.test(t))
    return 'From incident of that woman who every festival immersion, etc., daf 66 side a.';
  if (/מפלוגתא דרב ושמואל/.test(t) && /הלכה כשמואל/.test(t))
    return 'Dispute of Rav and Shmuel there daf 64; and like Shmuel Rambam there ch. 8; and so appears to Ramban; and likewise Tur in their name; and so is conclusion of his father Rosh z\"l; and so is opinion of Rashba; and even though we rule like Rav in prohibitions, they hold here halachah is like Shmuel because we say in Gemara the baraita accords with him precisely.';
  if (/^טור שם/.test(t) && /קפצה/.test(t))
    return 'Tur there; and likewise Rashba in name of his teachers; and proven from Rav Ashi\'s establishment there daf 11 side a, for example she jumped on one Shabbat, etc., and here since they are equal.';
  if (/^משנה שם/.test(t))
    return 'Mishnah there daf 63 side b; and baraita there daf 64 sides a and b.';
  if (/^לשון הרמב"ם/.test(t))
    return 'Rambam\'s language there ch. 8 Laws of Forbidden Relations halachah 5, from baraita there daf 11 side a.';
  if (/^כדמפרש רב אשי/.test(t))
    return 'As Rav Ashi explains there in the first version of Rav Huna.';
  if (/^כלישנא אחרינא/.test(t))
    return 'In the other version in Rav Huna\'s statement, and as Rav Ashi explains there.';
  if (/^שם במשנה/.test(t))
    return 'There in mishnah and similar cases; and Rabbah bar Ulla explains to include head, etc., there side b.';
  return deepTr(t);
}

function translateGra(h) {
  const t = strip(h);
  const lead = t.match(/^([^.:]+)[.:]/);
  if (/^כיצד קובעתו/.test(t))
    return deepTr(t);
  if (/^אם קבעה/.test(t) && /ימים ושעות/.test(t))
    return deepTr(t);
  if (/^פעמים/.test(t) && t.length < 200)
    return deepTr(t);
  if (/^אע"פ/.test(t) && /דילוג/.test(t))
    return deepTr(t);
  if (/^ראתה/.test(t) && t.length < 80)
    return deepTr(t);
  if (/^ווסת הסירוג/.test(t))
    return deepTr(t);
  if (/^האשה/.test(t))
    return deepTr(t);
  if (/^כל ווסת/.test(t))
    return deepTr(t);
  if (/^קפצה וראתה/.test(t))
    return deepTr(t);
  if (/^וכל אלו/.test(t))
    return deepTr(t);
  if (/^פיהקה/.test(t))
    return deepTr(t);
  if (/^אכלה/.test(t))
    return deepTr(t);
  if (/^וי"א/.test(t))
    return deepTr(t);
  if (/^אפילו הביאה/.test(t))
    return deepTr(t);
  if (/^אם בדקוה/.test(t))
    return deepTr(t);
  if (/^אלא שיש הפרש/.test(t))
    return deepTr(t);
  if (/^וכן זקנה/.test(t))
    return deepTr(t);
  if (/^חזרה/.test(t))
    return deepTr(t);
  if (/^פעמים/.test(t) && /לחודש/.test(t))
    return deepTr(t);
  if (/^ורביעית בכ'/.test(t))
    return deepTr(t);
  if (/^מעוברת/.test(t))
    return deepTr(t);
  if (/^ומ"מ חוששת/.test(t))
    return deepTr(t);
  if (lead && t.length < 200) {
    const l = deepTr(lead[1]);
    const rest = deepTr(t.slice(lead[0].length));
    return `${l}. ${rest}`.replace(/\.\s*\./g, '.');
  }
  return deepTr(t);
}

function translateBaer(h) {
  const t = strip(h);
  const m = t.match(/^([^.:]+)[.:]\s*(.*)$/s);
  if (!m) return deepTr(t);
  const lead = deepTr(m[1]);
  const body = deepTr(m[2]);
  return `${lead}. ${body}`;
}

function translateNekudot(h) {
  const t = strip(h);
  const m = t.match(/^\(בט"ז ס"ק[^)]+\)\s*(.*)$/s) || t.match(/^\(שם ס"ק[^)]+\)\s*(.*)$/s);
  if (m) return deepTr(m[1]);
  return deepTr(t);
}

function translateBlock({ slug, he }) {
  switch (slug) {
    case 'beer-hagolah':
      return translateBeer(he);
    case 'beur-hagra':
      return translateGra(he);
    case 'baer-heitev':
      return translateBaer(he);
    case 'nekudot-hakesef':
      return translateNekudot(he);
    case 'pitchei-teshuva':
    case 'rabbi-akiva-eiger-yd':
    case 'torat-hashlamim':
    case 'chiddushei-hilkhot-niddah':
    case 'tiferet-yisrael':
    case 'siftei-kohen':
    case 'turei-zahav':
      return deepTr(he);
    default:
      return deepTr(he);
  }
}

const TRANSLATIONS = {};
for (const b of failing) {
  if (!TRANSLATIONS[b.slug]) TRANSLATIONS[b.slug] = {};
  TRANSLATIONS[b.slug][b.key] = translateBlock({ slug: b.slug, he: b.he });
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let body = `/** Editorial translations for siman 189 failing blocks — veset establishment, skipping, intervals (${failing.length} blocks) */\nexport const TRANSLATIONS = {\n`;
for (const [slug, keys] of Object.entries(TRANSLATIONS).sort()) {
  body += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys).sort()) {
    body += `    '${key}': \`${esc(val)}\`,\n`;
  }
  body += `  },\n`;
}
body += `};\n`;

const outPath = path.join(WORK, '_tr-data-189.mjs');
fs.writeFileSync(outPath, body, 'utf8');
const total = Object.values(TRANSLATIONS).reduce((a, o) => a + Object.keys(o).length, 0);
console.log(`wrote ${outPath} (${total} blocks)`);
