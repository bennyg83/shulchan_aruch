#!/usr/bin/env node
/** Extract block keys + stripped Hebrew for simanim 085-090 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..', 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';

function stripHtml(s) {
  return s
    .replace(/<small>הגה[^<]*<\/small>/gi, ' {HAGAH} ')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function walkSiman(sim) {
  const dir = path.join(ROOT, `siman_${sim}`);
  const out = {};
  function walk(d, slug) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, e.name);
      else if (/^part-.*\.txt$/.test(e.name)) {
        const rel = `siman_${sim}/${slug}/${e.name}`;
        const parts = fs.readFileSync(p, 'utf8').split(BLOCK).slice(1);
        if (!out[slug]) out[slug] = {};
        for (const block of parts) {
          const seif = block.match(/seif: (.+)/)?.[1].trim();
          const marker = block.match(/marker: (.+)/)?.[1].trim() ?? 'main';
          const h0 = block.indexOf(HEB);
          const h1 = block.indexOf(ENG);
          const raw = block.slice(h0 + HEB.length, h1).trim();
          out[slug][`${seif}#${marker}`] = { rel, heb: stripHtml(raw), raw };
        }
      }
    }
  }
  for (const slug of fs.readdirSync(dir)) {
    const p = path.join(dir, slug);
    if (fs.statSync(p).isDirectory()) walk(p, slug);
  }
  return out;
}

for (const sim of process.argv.slice(2)) {
  const data = walkSiman(sim);
  const fp = path.join(WORK, `_hebrew-${sim}.json`);
  fs.writeFileSync(fp, JSON.stringify(data, null, 2));
  let n = 0;
  for (const slug of Object.keys(data)) n += Object.keys(data[slug]).length;
  console.log(`wrote ${fp} (${n} blocks)`);
}
