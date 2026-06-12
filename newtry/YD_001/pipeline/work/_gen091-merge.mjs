#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const heb = JSON.parse(fs.readFileSync(path.join(DIR, '_hebrew-091.json'), 'utf8'));
const parts = [
  'mechaber', 'siftei-kohen', 'turei-zahav', 'baer-heitev', 'beer-hagolah',
  'beur-hagra', 'kaf-hachayim', 'kereti', 'mateh-yehonatan', 'nekudot-hakesef',
  'peleti', 'pitchei-teshuva', 'rabbi-akiva-eiger-yd', 'yad-avraham', 'yad-ephraim',
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function fmtVal(v) {
  if (Array.isArray(v)) return `[\`${esc(v[0])}\`]`;
  const s = String(v);
  if (s.startsWith('[') && s.endsWith(']')) return s;
  return `\`${esc(s)}\``;
}

let out = '/** Translations siman 091 */\nexport const TRANSLATIONS = {\n';
let total = 0;
const missing = [];

for (const slug of parts) {
  const mod = await import(`./_tr091/${slug}.mjs`);
  const T = mod.default;
  out += `  '${slug}': {\n`;
  const hebKeys = Object.keys(heb[slug] || {});
  for (const k of hebKeys) {
    if (!(k in T)) {
      missing.push(`${slug}/${k}`);
      continue;
    }
    out += `    '${k}': ${fmtVal(T[k])},\n`;
    total++;
  }
  out += '  },\n';
}
out += '};\n';

if (missing.length) {
  console.error('MISSING:', missing.join(', '));
  process.exit(1);
}

const outPath = path.join(DIR, '_patch-siman-091-translations.mjs');
fs.writeFileSync(outPath, out);
console.log('Wrote', outPath, 'blocks', total);
