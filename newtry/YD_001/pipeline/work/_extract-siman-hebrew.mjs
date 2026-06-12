#!/usr/bin/env node
/**
 * Extract Hebrew and block keys from YD001 `output/siman_NNN/<slug>/part-*.txt`.
 *
 * Output schema:
 * {
 *   siman: 129,
 *   files: [{ rel, slug, keys: ["1#main", "1#א", ...] }],
 *   hebrewBySlug: { [slug]: { [key]: "raw hebrew w/ html" } }
 * }
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
 
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const HEB = '**** HEBREW ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';
 
function parseBlocks(fileText) {
  const parts = fileText.split(BLOCK);
  const blocks = [];
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i];
    const slugM = block.match(/^\s*slug:\s*(.+)\s*$/m);
    const seifM = block.match(/^\s*seif:\s*(.+)\s*$/m);
    const markerM = block.match(/^\s*marker:\s*(.+)\s*$/m);
    if (!slugM || !seifM) continue;
    const slug = slugM[1].trim();
    const seif = seifM[1].trim();
    const marker = (markerM ? markerM[1].trim() : 'main') || 'main';
    const key = `${seif}#${marker}`;
 
    const hStart = block.indexOf(HEB);
    const eStart = block.indexOf(ENG);
    const eEnd = block.indexOf(END);
    if (hStart < 0 || eStart < 0 || eEnd < 0) {
      throw new Error(`Missing HEBREW/ENGLISH/END markers for key ${key}`);
    }
    const hebrew = block.slice(hStart + HEB.length).slice(block.slice(hStart + HEB.length).indexOf('\n') + 1, eStart).trimEnd();
    blocks.push({ slug, key, hebrew });
  }
  return blocks;
}
 
function listPartFiles(siman) {
  const simanDir = path.join(OUT, `siman_${String(siman).padStart(3, '0')}`);
  if (!fs.existsSync(simanDir)) throw new Error(`Missing siman dir: ${simanDir}`);
  const rels = [];
  for (const slug of fs.readdirSync(simanDir, { withFileTypes: true })) {
    if (!slug.isDirectory()) continue;
    const slugDir = path.join(simanDir, slug.name);
    for (const f of fs.readdirSync(slugDir)) {
      if (/^part-.*\.txt$/i.test(f)) {
        rels.push(path.relative(OUT, path.join(slugDir, f)).replace(/\\/g, '/'));
      }
    }
  }
  rels.sort((a, b) => a.localeCompare(b));
  return rels;
}
 
function main() {
  const siman = Number(process.argv[2]);
  if (!Number.isFinite(siman)) {
    console.error('Usage: node _extract-siman-hebrew.mjs <simanNumber>');
    process.exit(2);
  }
 
  const rels = listPartFiles(siman);
  const hebrewBySlug = {};
  const files = [];
  let total = 0;
 
  for (const rel of rels) {
    const fp = path.join(OUT, rel);
    const s = fs.readFileSync(fp, 'utf8');
    const blocks = parseBlocks(s);
    if (!blocks.length) continue;
    const slug = blocks[0].slug;
    if (!hebrewBySlug[slug]) hebrewBySlug[slug] = {};
    const keys = [];
    for (const b of blocks) {
      if (b.slug !== slug) throw new Error(`Mixed slugs in file ${rel}`);
      if (hebrewBySlug[slug][b.key] != null) {
        throw new Error(`Duplicate key ${slug}:${b.key} (file ${rel})`);
      }
      hebrewBySlug[slug][b.key] = b.hebrew;
      keys.push(b.key);
      total++;
    }
    files.push({ rel, slug, keys });
  }
 
  const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), `_hebrew-${siman}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ siman, totalBlocks: total, files, hebrewBySlug }, null, 2) + '\n', 'utf8');
  console.log(`OK wrote ${path.relative(process.cwd(), outPath)} (${total} blocks, ${files.length} files)`);
}
 
main();

