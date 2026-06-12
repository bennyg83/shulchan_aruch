#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2] || '055';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dir = path.join(ROOT, 'output', `siman_${sim}`);
const BLOCK = '**** YD001 SOURCE BLOCK ****';
let total = 0;
for (const slug of fs.readdirSync(dir).filter((d) => fs.statSync(path.join(dir, d)).isDirectory()).sort()) {
  const fp = path.join(dir, slug, 'part-001.txt');
  const parts = fs.readFileSync(fp, 'utf8').split(BLOCK);
  const keys = [];
  for (let i = 1; i < parts.length; i++) {
    const b = parts[i];
    const seifM = b.match(/^\s*seif: (.+)$/m);
    if (!seifM) {
      console.error('no seif in', slug, 'block', i);
      continue;
    }
    const markerM = b.match(/^\s*marker: (.+)$/m);
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    keys.push(`${seif}#${marker}`);
  }
  console.log(slug, keys.length);
  total += keys.length;
}
console.log('TOTAL', total);
