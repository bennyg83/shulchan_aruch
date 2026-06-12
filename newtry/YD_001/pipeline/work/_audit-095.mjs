import fs from 'fs';
const heb = JSON.parse(fs.readFileSync('_hebrew-095.json', 'utf8'));
const { TRANSLATIONS: T } = await import('./_patch-siman-095-translations.mjs');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const bad = [];
for (const slug of Object.keys(heb)) {
  for (const k of Object.keys(heb[slug])) {
    const h = strip(heb[slug][k].heb || heb[slug][k].raw || '');
    const e = (T[slug]?.[k] || '').replace(/^\["|"\]$/g, '').trim();
    const ratio = e.length / (h.length || 1);
    if (ratio < 0.35 && h.length > 120) bad.push({ slug, k, hLen: h.length, eLen: e.length, ratio: ratio.toFixed(2) });
  }
}
bad.sort((a, b) => a.ratio - b.ratio);
console.log('thin translations', bad.length);
for (const x of bad) console.log(`${x.slug}|${x.k} heb=${x.hLen} eng=${x.eLen} ratio=${x.ratio}`);
