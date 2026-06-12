#!/usr/bin/env node
/**
 * Write translations-NNN/{slug}.mjs from _hebrew-NNN.json using _gen-089-090-translations logic.
 * Skips slugs listed in SKIP (already hand-translated).
 * Usage: node _write-slug-modules.mjs 089|090
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const sim = (process.argv[2] || '090').padStart(3, '0');

// Import translate helpers by dynamic import of gen module internals
const genUrl = new URL('./_gen-089-090-translations.mjs', import.meta.url);
// Re-implement minimal: load hebrew + call build via spawning is heavy; inline import won't export.
// Run gen to temp and split — instead eval the gen file's functions by reading and extracting.

const heb = JSON.parse(fs.readFileSync(path.join(WORK, `_hebrew-${sim}.json`), 'utf8'));
const mechaberAll = JSON.parse(fs.readFileSync(path.join(WORK, '_mechaber-overrides.json'), 'utf8'));
const outDir = path.join(WORK, `translations-${sim}`);
fs.mkdirSync(outDir, { recursive: true });

const SKIP = new Set(
  sim === '089'
    ? [
        'mechaber',
        'baer-heitev',
        'beer-hagolah',
        'kereti',
        'kaf-hachayim',
        'nekudot-hakesef',
        'pitchei-teshuva',
        'rabbi-akiva-eiger-yd',
        'yad-ephraim',
      ]
    : ['mechaber'],
);

// Dynamic import gen module — it doesn't export; spawn node one-liner
const { execSync } = await import('child_process');
execSync(`node "${path.join(WORK, '_gen-089-090-translations.mjs')}" ${sim}`, {
  stdio: 'inherit',
  cwd: WORK,
});

const { TRANSLATIONS } = await import(`./_patch-siman-${sim}-translations.mjs?t=${Date.now()}`);

for (const [slug, map] of Object.entries(TRANSLATIONS)) {
  if (SKIP.has(slug)) continue;
  const existing = path.join(outDir, `${slug}.mjs`);
  if (fs.existsSync(existing) && sim === '089') continue;
  const lines = ['export default {'];
  for (const [k, v] of Object.entries(map)) {
    lines.push(`  '${k}': ${JSON.stringify(v)},`);
  }
  lines.push('};', '');
  fs.writeFileSync(existing, lines.join('\n'), 'utf8');
  console.log(`Wrote ${slug}.mjs (${Object.keys(map).length} keys)`);
}

let hebCount = 0;
let total = 0;
for (const slug of fs.readdirSync(outDir)) {
  if (!slug.endsWith('.mjs')) continue;
  const t = fs.readFileSync(path.join(outDir, slug), 'utf8');
  const m = t.match(/[\u0590-\u05FF]/g);
  if (m) {
    hebCount += m.length;
    console.log(`  Hebrew in ${slug}: ${m.length} chars`);
  }
  total++;
}
console.log(`Done translations-${sim}: ${total} files, Hebrew chars in modules: ${hebCount}`);
