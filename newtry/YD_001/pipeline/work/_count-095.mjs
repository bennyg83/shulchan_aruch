import fs from 'fs';
const heb = JSON.parse(fs.readFileSync('_hebrew-095.json', 'utf8'));
let hebCount = 0;
const hebKeys = [];
for (const slug of Object.keys(heb)) {
  for (const k of Object.keys(heb[slug])) {
    hebCount++;
    hebKeys.push(`${slug}|${k}`);
  }
}
const mod = await import('./_patch-siman-095-translations.mjs');
const T = mod.TRANSLATIONS;
let patchCount = 0;
const missing = [];
for (const key of hebKeys) {
  const [slug, k] = key.split('|');
  if (!T[slug]?.[k]) missing.push(key);
  else patchCount++;
}
let extra = [];
for (const slug of Object.keys(T)) {
  for (const k of Object.keys(T[slug])) {
    if (!heb[slug]?.[k]) extra.push(`${slug}|${k}`);
  }
}
console.log('hebrew', hebCount);
console.log('patch matched', patchCount);
console.log('missing', missing.length, missing.slice(0, 30));
console.log('extra', extra.length, extra.slice(0, 10));
const short = [];
for (const key of hebKeys) {
  const [slug, k] = key.split('|');
  const t = T[slug]?.[k] ?? '';
  if (t.length < 40 && !k.includes('main') && k !== '_') short.push(`${key} (${t.length})`);
}
console.log('very short', short.length, short.slice(0, 20));
