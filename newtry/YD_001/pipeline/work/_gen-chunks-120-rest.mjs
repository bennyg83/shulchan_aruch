#!/usr/bin/env node
/** Generate chunk JSON for remaining slugs via enhanced applyPhrases */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyPhrases } from './_yd001-translate-shared.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(WORK, '_hebrew-120.json'), 'utf8'));

function strip(s) {
  return String(s)
    .replace(/<small>\s*הגה\s*/gi, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function polish(s) {
  let t = s;
  for (let i = 0; i < 4; i++) t = applyPhrases(t);
  t = t
    .replace(/\s+/g, ' ')
    .replace(/עכ"ל/g, 'end of his words')
    .replace(/ע"ש/g, 'see there')
    .replace(/ע"ל/g, 'see above')
    .replace(/כו'/g, 'etc.')
    .replace(/כ"מ/g, 'as written')
    .replace(/כן הוא/g, 'so it is')
    .replace(/משמע/g, 'it implies')
    .replace(/פי'/g, 'Explanation:')
    .replace(/ד"ה/g, 's.v.')
    .replace(/ס"ק/g, 's.k.')
    .replace(/סי'/g, 'siman')
    .replace(/סעיף/g, 'seif')
    .replace(/פ"([א-ת"]+)/g, (_, p) => `chapter ${p.replace(/"/g, '')}`)
    .replace(/דף ([^:]+):/g, 'daf $1:')
    .replace(/דף ([^,]+),/g, 'daf $1,');
  return t.trim();
}

function translateEntry(raw, slug) {
  let h = strip(raw);
  if (slug === 'siftei-kohen' && h.startsWith('["')) {
    const inner = h.slice(2, -2);
    const m = inner.match(/^<b>([^<]*)<\/b>\s*([\s\S]*)/) || inner.match(/^([^.]+\.)\s*([\s\S]*)/);
    if (m) {
      const title = polish(m[1].trim());
      const body = polish(m[2]);
      return `["${title} ${body}"]`;
    }
    return `["${polish(inner)}"]`;
  }
  const m = h.match(/^<b>([^<]*)<\/b>\s*([\s\S]*)/) || h.match(/^([^.]+\.)\s*([\s\S]*)/);
  if (m) {
    const title = polish(m[1].trim());
    let body = polish(m[2]);
    if (!body && /עכ"ל|ע"ש|see there/i.test(title)) return title;
    return `${title} ${body}`.trim();
  }
  return polish(h);
}

const SLUGS = ['pitchei-teshuva', 'turei-zahav', 'siftei-kohen', 'beur-hagra'];
const chunkDir = path.join(WORK, '_chunks-120');
fs.mkdirSync(chunkDir, { recursive: true });

for (const slug of SLUGS) {
  const out = {};
  for (const [key, entry] of Object.entries(heb[slug])) {
    out[key] = translateEntry(entry.raw || entry.heb, slug);
  }
  const hebLeft = Object.values(out).filter((v) => /[\u0590-\u05FF]{3,}/.test(v)).length;
  const fp = path.join(chunkDir, `${slug}.json`);
  fs.writeFileSync(fp, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`${slug}: ${Object.keys(out).length} blocks, ${hebLeft} with Hebrew`);
}
