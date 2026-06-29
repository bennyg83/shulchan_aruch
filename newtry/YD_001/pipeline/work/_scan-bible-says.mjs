#!/usr/bin/env node
/** Scan output/ for blocks whose English contains "bible says". */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile } from '../../yd001_block_lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const hits = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.txt')) {
      const raw = fs.readFileSync(p, 'utf8');
      if (!/bible says/i.test(raw)) continue;
      const rel = path.relative(OUT, p).split(path.sep).join('/');
      for (const b of parseBlocksInFile(raw)) {
        if (/bible says/i.test(b.en)) {
          const marker = b.marker || '_';
          hits.push({
            rel,
            slug: b.slug,
            seif: b.seif,
            marker,
            key: `${b.seif}#${marker}`,
            he: b.he,
            en: b.en,
          });
        }
      }
    }
  }
}

walk(OUT);
const simanim = new Set(hits.map((h) => h.rel.split('/')[0]));
const bySiman = {};
for (const h of hits) {
  const s = h.rel.split('/')[0].replace('siman_', '');
  bySiman[s] = (bySiman[s] || 0) + 1;
}
const top = Object.entries(bySiman)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 15)
  .map(([k, v]) => `${k}:${v}`)
  .join(', ');
console.log(`blocks: ${hits.length} simanim: ${simanim.size} files: ${new Set(hits.map((h) => h.rel)).size}`);
console.log(`top: ${top}`);
const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '_bible-says-scan.json');
fs.writeFileSync(outPath, JSON.stringify(hits, null, 2));
console.log(`wrote ${outPath}`);
