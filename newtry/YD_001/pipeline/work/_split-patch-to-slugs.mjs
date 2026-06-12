#!/usr/bin/env node
/** Split _patch-siman-NNN-translations.mjs into translations-NNN/{slug}.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = (process.argv[2] || '090').padStart(3, '0');
const WORK = path.dirname(fileURLToPath(import.meta.url));
const { TRANSLATIONS } = await import(`./_patch-siman-${sim}-translations.mjs?update=${Date.now()}`);
const outDir = path.join(WORK, `translations-${sim}`);
fs.mkdirSync(outDir, { recursive: true });
const skip = new Set(['mechaber']);

for (const [slug, map] of Object.entries(TRANSLATIONS)) {
  if (skip.has(slug) && fs.existsSync(path.join(outDir, `${slug}.mjs`))) continue;
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(map)) {
    lines.push(`  '${k}': ${JSON.stringify(v)},`);
  }
  lines.push('};', '');
  fs.writeFileSync(path.join(outDir, `${slug}.mjs`), lines.join('\n'), 'utf8');
  const heb = (lines.join('\n').match(/[\u0590-\u05FF]/g) || []).length;
  console.log(`${slug}: ${Object.keys(map).length} keys, ${heb} Hebrew chars in values`);
}
