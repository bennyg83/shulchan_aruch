#!/usr/bin/env node
/** Assembles _patch-siman-090-translations.mjs from translations-090/*.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const SLUGS = [
  'mechaber',
  'siftei-kohen',
  'turei-zahav',
  'baer-heitev',
  'beer-hagolah',
  'beur-hagra',
  'kaf-hachayim',
  'kereti',
  'mateh-yehonatan',
  'nekudot-hakesef',
  'peleti',
  'pitchei-teshuva',
  'rabbi-akiva-eiger-yd',
  'yad-avraham',
];

const parts = [
  `/** Full translations siman 090 — translations-090 modules */\nexport const TRANSLATIONS = {`,
];
let total = 0;
for (const slug of SLUGS) {
  const mod = await import(`./translations-090/${slug}.mjs`);
  const keys = Object.keys(mod.default);
  total += keys.length;
  parts.push(`  '${slug}': {`);
  for (const [k, v] of Object.entries(mod.default)) {
    parts.push(`    '${k}': ${JSON.stringify(v)},`);
  }
  parts.push('  },');
}
parts.push('};');
parts.push('');
fs.writeFileSync(path.join(DIR, '_patch-siman-090-translations.mjs'), parts.join('\n'), 'utf8');
console.log(`Wrote _patch-siman-090-translations.mjs — ${total} blocks`);
