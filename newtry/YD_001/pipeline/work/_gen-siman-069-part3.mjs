#!/usr/bin/env node
/** Generates _patch-siman-069-translations-part3.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SK, TZ } from './_en-069-p3-translations.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, '../../output/siman_069');
const hebDump = JSON.parse(
  fs.readFileSync(path.join(dir, '_siman-069-hebrew-dump.json'), 'utf8'),
);

function sortKeys(keys) {
  return keys.sort((a, b) => {
    const [sa, ma] = a.split('#');
    const [sb, mb] = b.split('#');
    const na = Number(sa) || 0;
    const nb = Number(sb) || 0;
    if (na !== nb) return na - nb;
    if (ma === '_') return -1;
    if (mb === '_') return 1;
    return ma.localeCompare(mb, 'he');
  });
}

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

/** @returns {Map<string,string>} key -> raw Hebrew from source txt */
function loadSourceHebrew(slug) {
  const map = new Map();
  for (const part of ['part-001.txt', 'part-002.txt']) {
    const fp = path.join(root, slug, part);
    if (!fs.existsSync(fp)) continue;
    const txt = fs.readFileSync(fp, 'utf8');
    const blocks = txt.split(/\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*/);
    for (const block of blocks) {
      const seifM = block.match(/^seif:\s*(\d+)/m);
      const markerM = block.match(/^marker:\s*(\S+)/m);
      const heM = block.match(/\*\*\*\* HEBREW \*\*\*\*\r?\n([\s\S]*?)\r?\n\*\*\*\* ENGLISH/m);
      if (!seifM || !markerM || !heM) continue;
      const key = `${seifM[1]}#${markerM[1]}`;
      map.set(key, heM[1].trim());
    }
  }
  return map;
}

function extractBoldHtml(hebrew) {
  const inner = hebrew.startsWith('["') ? hebrew.slice(2, -2) : hebrew;
  const m = inner.match(/^<b>([\s\S]*?)<\/b>\s*([\s\S]*)$/);
  if (!m) return { boldHtml: '', restHe: inner };
  return { boldHtml: m[1].trim(), restHe: m[2].trim() };
}

function formatSk(key, srcHe, entry) {
  if (!srcHe.startsWith('["')) {
    return typeof entry === 'string' ? entry : entry.rest || entry.bold;
  }
  const { boldHtml } = extractBoldHtml(srcHe);
  const boldEn = entry.bold;
  const restEn = entry.rest;
  const open = boldHtml.includes('</b>') ? `<b>${boldEn}</b>` : `<b>${boldEn}</b>`;
  return `["${open} ${restEn}"]`;
}

const skSrc = loadSourceHebrew('siftei-kohen');
const skKeys = sortKeys(Object.keys(hebDump['siftei-kohen']));
const tzKeys = sortKeys(Object.keys(hebDump['turei-zahav']));

let body =
  '/** siman 069 translations — part 3: siftei-kohen (Siftei Kohen / Shach), turei-zahav (Taz) */\nexport const TRANSLATIONS_PART3 = {\n';

body += "  'siftei-kohen': {\n";
for (const key of skKeys) {
  const entry = SK[key];
  if (!entry) throw new Error(`Missing SK translation: ${key}`);
  const src = skSrc.get(key) || hebDump['siftei-kohen'][key];
  const val = formatSk(key, src, entry);
  body += `    '${key}': \`${esc(val)}\`,\n`;
}
body += '  },\n';

body += "  'turei-zahav': {\n";
for (const key of tzKeys) {
  const val = TZ[key];
  if (!val) throw new Error(`Missing TZ translation: ${key}`);
  body += `    '${key}': \`${esc(val)}\`,\n`;
}
body += '  },\n};\n';

const out = path.join(dir, '_patch-siman-069-translations-part3.mjs');
fs.writeFileSync(out, body, 'utf8');

const counts = {
  'siftei-kohen': skKeys.length,
  'turei-zahav': tzKeys.length,
};
console.log('Wrote', out);
console.log('Block counts:', JSON.stringify(counts));
