#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../output/siman_055');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const slugs = fs.readdirSync(OUT).filter((s) => fs.statSync(path.join(OUT, s)).isDirectory());
const all = {};
for (const slug of slugs) {
  const fp = path.join(OUT, slug, 'part-001.txt');
  if (!fs.existsSync(fp)) continue;
  all[slug] = fs
    .readFileSync(fp, 'utf8')
    .split(BLOCK)
    .slice(1)
    .map((b) => {
      const seif = b.match(/^\s*seif: (.+)$/m)?.[1]?.trim();
      const marker = b.match(/^\s*marker: (.+)$/m)?.[1]?.trim() || 'main';
      return `${seif}#${marker}`;
    });
}
fs.writeFileSync('_siman-055-all-keys.json', JSON.stringify(all, null, 2));
console.log(JSON.stringify(Object.fromEntries(Object.entries(all).map(([k, v]) => [k, v.length]))));
