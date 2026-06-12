import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const H = '**** HEBREW ****';
const dir = path.join(ROOT, 'output', 'siman_064');

function strip(html) {
  return html
    .replace(/<small>\s*הגה\s*/g, '{Rama: ')
    .replace(/<\/small>/g, '}')
    .replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&[^;]+;/g, '')
    .trim();
}

const out = {};
for (const slug of fs
  .readdirSync(dir)
  .filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
  .sort()) {
  const s = fs.readFileSync(path.join(dir, slug, 'part-001.txt'), 'utf8');
  out[slug] = {};
  for (const b of s.split(BLOCK).slice(1)) {
    const seif = (b.match(/seif: (.+)/) || [])[1]?.trim();
    const marker = (b.match(/marker: (.+)/) || [])[1]?.trim() || 'main';
    const hi = b.indexOf(H);
    const ei = b.indexOf('**** ENGLISH ****');
    out[slug][`${seif}#${marker}`] = strip(b.slice(hi + H.length, ei));
  }
}
fs.writeFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), '_siman-064-hebrew-dump.json'),
  JSON.stringify(out, null, 2),
);
console.log('keys', Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Object.keys(v).length])));
