#!/usr/bin/env node
/** Export failing blocks as JSON for editorial patch authoring. */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile } from '../../yd001_block_lib.mjs';
import { runBlockQualityChecks, plainFromHtml } from '../lib/quality-checks.mjs';

const siman = Number(process.argv.find((a, i) => process.argv[i - 1] === '--siman') || 0);
const slugFilter = process.argv.find((a) => a.startsWith('--slug='))?.slice(7);
if (!siman) {
  console.error('Usage: node _export-failing-blocks.mjs --siman N [--slug=SLUG]');
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dir = path.join(ROOT, 'output', `siman_${String(siman).padStart(3, '0')}`);
const out = [];

for (const slug of fs.readdirSync(dir).sort()) {
  if (slugFilter && slug !== slugFilter) continue;
  const sd = path.join(dir, slug);
  if (!fs.statSync(sd).isDirectory()) continue;
  for (const f of fs.readdirSync(sd).filter((x) => x.endsWith('.txt'))) {
    const rel = `siman_${String(siman).padStart(3, '0')}/${slug}/${f}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), 'utf8'))) {
      const issues = runBlockQualityChecks({
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
        he: b.he,
        en: b.en,
      });
      if (!issues.some((i) => i.severity === 'error')) continue;
      const key = `${b.seif}#${b.marker || 'main'}`;
      out.push({
        key,
        rel,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker || 'main',
        codes: issues.filter((i) => i.severity === 'error').map((i) => i.code),
        he: b.he,
        en: b.en,
        englishPreview: (b.en || '').slice(0, 200),
      });
    }
  }
}

const outPath = path.join(
  ROOT,
  'pipeline/work',
  `_failing-siman-${String(siman).padStart(3, '0')}${slugFilter ? `-${slugFilter}` : ''}.json`
);
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`Wrote ${out.length} blocks → ${outPath}`);
