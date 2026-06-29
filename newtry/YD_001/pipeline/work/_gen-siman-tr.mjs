#!/usr/bin/env node
/** Generate _tr-NNN-slug.mjs files from failing JSON + translations map, then apply patch */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const siman = Number(process.argv[2]);
if (!siman) {
  console.error('Usage: node _gen-siman-tr.mjs NNN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const pad = String(siman).padStart(3, '0');
const failingPath = path.join(WORK, `_failing-siman-${pad}.json`);
const dataPath = path.join(WORK, `_tr-data-${pad}.mjs`);

if (!fs.existsSync(failingPath)) {
  console.error('Missing', failingPath);
  process.exit(1);
}
if (!fs.existsSync(dataPath)) {
  console.error('Missing', dataPath);
  process.exit(1);
}

const failing = JSON.parse(fs.readFileSync(failingPath, 'utf8'));
const { TRANSLATIONS } = await import(pathToFileURL(dataPath).href);

const missing = failing.filter((b) => !(b.key in TRANSLATIONS));
if (missing.length) {
  console.error('MISSING keys:', missing.map((b) => `${b.slug}\t${b.key}`).join('\n'));
  process.exit(1);
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const bySlug = {};
for (const b of failing) {
  if (!bySlug[b.slug]) bySlug[b.slug] = { rel: b.rel, keys: [] };
  bySlug[b.slug].keys.push(b.key);
}

const trFiles = [];
for (const [slug, { rel, keys }] of Object.entries(bySlug)) {
  const fname = `_tr-${pad}-${slug}.mjs`;
  let body = `/** Editorial translations — siman ${pad} / ${slug} (${keys.length} blocks) */\nexport const TRANSLATIONS = {\n`;
  for (const k of keys) {
    body += `  '${k}': \`${esc(TRANSLATIONS[k])}\`,\n`;
  }
  body += `};\n\nexport const FILES = [\n  ['${rel}', '${slug}'],\n];\n`;
  fs.writeFileSync(path.join(WORK, fname), body, 'utf8');
  trFiles.push(fname);
  console.log('Wrote', fname, keys.length, 'blocks');
}

// Write patch file if missing
const patchPath = path.join(WORK, `_patch-siman-${pad}-editorial.mjs`);
if (!fs.existsSync(patchPath)) {
  const tpl = fs.readFileSync(path.join(WORK, '_patch-siman-editorial.mjs'), 'utf8')
    .replace('Generic editorial patch applier', `Apply editorial translation modules for siman ${pad}`)
    .replace('node _patch-siman-editorial.mjs NNN', `node _patch-siman-${pad}-editorial.mjs`);
  fs.writeFileSync(patchPath, tpl.replace("const siman = process.argv[2];\nconst modules = process.argv.slice(3);", `const modules = process.argv.slice(2);`).replace('siman_${siman}', `siman_${pad}`), 'utf8');
}

// Apply
const { spawnSync } = await import('child_process');
const r = spawnSync('node', [patchPath, ...trFiles], { cwd: WORK, stdio: 'inherit', shell: true });
process.exit(r.status ?? 1);
