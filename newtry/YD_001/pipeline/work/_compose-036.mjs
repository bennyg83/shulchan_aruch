#!/usr/bin/env node
/** Merge translation modules and emit _patch-siman-036.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const { TRANSLATIONS } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations.mjs')).href
);
const { TRANSLATIONS_B } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-b.mjs')).href
);
const { TRANSLATIONS_C } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-translations-c.mjs')).href
);
const { KOL_YAAKOV, KOL_YAAKOV_PART2 } = await import(
  pathToFileURL(path.join(__dir, '_patch-siman-036-kol.mjs')).href
);

for (const [slug, map] of Object.entries({ ...TRANSLATIONS_B, ...TRANSLATIONS_C })) {
  TRANSLATIONS[slug] = { ...(TRANSLATIONS[slug] || {}), ...map };
}
TRANSLATIONS['kol-yaakov'] = { ...KOL_YAAKOV, ...KOL_YAAKOV_PART2 };

const FILES = [
  ['siman_036/mechaber/part-001.txt', 'mechaber'],
  ['siman_036/siftei-kohen/part-001.txt', 'siftei-kohen'],
  ['siman_036/turei-zahav/part-001.txt', 'turei-zahav'],
  ['siman_036/baer-heitev/part-001.txt', 'baer-heitev'],
  ['siman_036/beer-hagolah/part-001.txt', 'beer-hagolah'],
  ['siman_036/beur-hagra/part-001.txt', 'beur-hagra'],
  ['siman_036/kereti/part-001.txt', 'kereti'],
  ['siman_036/peleti/part-001.txt', 'peleti'],
  ['siman_036/pitchei-teshuva/part-001.txt', 'pitchei-teshuva'],
  ['siman_036/rabbi-akiva-eiger-yd/part-001.txt', 'rabbi-akiva-eiger-yd'],
  ['siman_036/nekudot-hakesef/part-001.txt', 'nekudot-hakesef'],
  ['siman_036/kaf-hachayim/part-001.txt', 'kaf-hachayim'],
  ['siman_036/mateh-yehonatan/part-001.txt', 'mateh-yehonatan'],
  ['siman_036/yad-avraham/part-001.txt', 'yad-avraham'],
  ['siman_036/yad-ephraim/part-001.txt', 'yad-ephraim'],
  ['siman_036/kol-yaakov/part-001.txt', 'kol-yaakov'],
  ['siman_036/kol-yaakov/part-002.txt', 'kol-yaakov'],
];

const HEADER = fs.readFileSync(path.join(__dir, '_patch-siman-032.mjs'), 'utf8').split('// --- mechaber')[0];

let body = '';
let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(`Missing slug ${slug}`);
  const n = Object.keys(T).length;
  total += n;
  body += `\n// --- ${slug} — ${rel} (${n}) ---\n`;
  body += `patchFile('${rel}', '${slug}', ${JSON.stringify(T, null, 2)});\n`;
}

const out = HEADER + body + "\nconsole.log('siman_036 patch complete');\n";
fs.writeFileSync(path.join(__dir, '_patch-siman-036.mjs'), out, 'utf8');
console.log('Wrote _patch-siman-036.mjs keys:', total);
