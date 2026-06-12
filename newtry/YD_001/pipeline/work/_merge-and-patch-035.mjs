#!/usr/bin/env node
/** Merge translation modules + emit _patch-siman-035.mjs + apply patch */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, '../..');
const OUT = path.join(ROOT, 'output');
const blocks = JSON.parse(fs.readFileSync(path.join(dir, '_siman-035-blocks.json'), 'utf8'));

async function loadMod(name) {
  const m = await import(pathToFileURL(path.join(dir, name)).href);
  return m.default ?? m;
}

const parts = [
  '_s035-trans-part1.mjs',
  '_s035-trans-kol.mjs',
  '_s035-trans-part2.mjs',
  '_s035-trans-part3a.mjs',
  '_s035-trans-part3b.mjs',
  '_s035-trans-part3c.mjs',
];
const T = {};
for (const f of parts) {
  const fp = path.join(dir, f);
  if (!fs.existsSync(fp)) continue;
  Object.assign(T, await loadMod(f));
}

const missing = [];
for (const [slug, arr] of Object.entries(blocks)) {
  if (!T[slug]) T[slug] = {};
  for (const { key, heb } of arr) {
    if (!(key in T[slug])) missing.push({ slug, key, heb });
  }
}
if (missing.length) {
  fs.writeFileSync(path.join(dir, '_siman-035-missing.json'), JSON.stringify(missing, null, 2));
  console.error('Missing', missing.length, '— wrote _siman-035-missing.json');
  process.exit(1);
}

fs.writeFileSync(path.join(dir, '_siman-035-translations.json'), JSON.stringify(T, null, 2));

let body = '';
for (const slug of Object.keys(T).sort()) {
  const map = T[slug];
  body += `\npatchFile('siman_035/${slug}/part-001.txt', '${slug}', {\n`;
  for (const [key, val] of Object.entries(map)) {
    const esc = String(val).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    body += `  '${key}': \`${esc}\`,\n`;
  }
  body += `});\n`;
}

const header = fs.readFileSync(path.join(dir, '_patch-siman-032.mjs'), 'utf8').split('// --- mechaber')[0];
const patch = header + body + `\nconsole.log('siman 035 patch complete');\n`;
fs.writeFileSync(path.join(dir, '_patch-siman-035.mjs'), patch);

// Apply
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

function patchFile(rel, slug, map) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const out = s.split(BLOCK).map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\s*slug: (.+)$/m);
    const seifM = block.match(/^\s*seif: (.+)$/m);
    const markerM = block.match(/^\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = `${seif}#${marker}`;
    if (!(key in map)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = map[key].endsWith('\n') ? map[key] : map[key] + '\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const miss = Object.keys(map).filter((k) => !applied.has(k));
  if (miss.length) throw new Error(`Keys not found in ${rel}: ${miss.join(', ')}`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(`OK ${rel} (${applied.size} blocks)`);
}

for (const slug of Object.keys(T).sort()) {
  patchFile(`siman_035/${slug}/part-001.txt`, slug, T[slug]);
}
console.log('siman 035 patch complete —', Object.values(T).reduce((n, o) => n + Object.keys(o).length, 0), 'blocks');
