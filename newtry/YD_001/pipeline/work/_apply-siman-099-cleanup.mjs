#!/usr/bin/env node
/** Apply clean English to siman 099 error blocks via string replace (StrReplace semantics). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseBlocksInFile, serializeBlock } from '../../yd001_block_lib.mjs';
import { runBlockQualityChecks, maxSeverity } from '../lib/quality-checks.mjs';
import { CLEAN } from './_siman-099-clean-en.mjs';
// StrReplace-only semantics: each block English section replaced in-place

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output', 'siman_099');

function applyFile(rel) {
  const fp = path.join(OUT, rel);
  let raw = fs.readFileSync(fp, 'utf8');
  const blocks = parseBlocksInFile(raw);
  let n = 0;
  for (const b of blocks) {
    const key = `${b.seif}#${b.marker}`;
    const slugMap = CLEAN[b.slug];
    if (!slugMap || !(key in slugMap)) continue;
    const newEn = slugMap[key];
    const oldBlock = serializeBlock(b);
    const newBlock = serializeBlock({ ...b, en: newEn });
    if (oldBlock === newBlock) continue;
    if (!raw.includes(oldBlock)) {
      throw new Error(`Block not found for replace: ${rel} ${key}`);
    }
    raw = raw.replace(oldBlock, newBlock);
    n++;
  }
  if (n) fs.writeFileSync(fp, raw, 'utf8');
  return n;
}

let total = 0;
const files = new Set();
for (const slug of Object.keys(CLEAN)) {
  for (const key of Object.keys(CLEAN[slug])) {
    // find file for slug
  }
}
// derive files from CLEAN by scanning output
for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const slug = ent.name;
  if (!CLEAN[slug]) continue;
  const parts = fs.readdirSync(path.join(OUT, slug)).filter((f) => f.endsWith('.txt'));
  for (const part of parts) {
    const rel = `${slug}/${part}`;
    total += applyFile(rel);
    if (total) files.add(rel);
  }
}

// validate
let errors = 0;
for (const ent of fs.readdirSync(OUT, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const slug = ent.name;
  for (const part of fs.readdirSync(path.join(OUT, slug)).filter((f) => f.endsWith('.txt'))) {
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(OUT, slug, part), 'utf8'));
    for (const b of blocks) {
      if (maxSeverity(runBlockQualityChecks(b)) === 'error') errors++;
    }
  }
}

console.log(`Applied ${total} block replacements across ${files.size} files`);
console.log(`Remaining error-level blocks: ${errors}`);
process.exit(errors ? 1 : 0);
