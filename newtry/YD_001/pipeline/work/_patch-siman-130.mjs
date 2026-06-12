#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-130-translations.mjs';
import { patchSiman } from './_patch-siman-generic.mjs';
 
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
 
function listFiles(siman) {
  const simanDir = path.join(OUT, `siman_${String(siman).padStart(3, '0')}`);
  const files = [];
  for (const ent of fs.readdirSync(simanDir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const slugDir = path.join(simanDir, slug);
    for (const f of fs.readdirSync(slugDir)) {
      if (/^part-.*\.txt$/i.test(f)) {
        const rel = path.relative(OUT, path.join(slugDir, f)).replace(/\\/g, '/');
        files.push({ rel, slug });
      }
    }
  }
  files.sort((a, b) => (a.slug + a.rel).localeCompare(b.slug + b.rel));
  return files;
}
 
const siman = 130;
const files = listFiles(siman);
 
const total = patchSiman({
  siman,
  translationsBySlug: TRANSLATIONS,
  files,
});
 
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '');
const progress = [];
for (const { slug } of files) {
  const n = Object.keys(TRANSLATIONS[slug] || {}).length;
  progress.push(`${ts} siman_${String(siman).padStart(3, '0')}/${slug} ${n} blocks DONE`);
}
progress.push(`${ts} siman_${String(siman).padStart(3, '0')} COMPLETE`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\n') + '\n');
 
console.log(`[COMPLETE] siman_${String(siman).padStart(3, '0')} — ${total} blocks across ${files.length} files`);

