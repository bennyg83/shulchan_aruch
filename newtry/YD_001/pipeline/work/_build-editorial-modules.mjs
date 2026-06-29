#!/usr/bin/env node
/** Build _tr-{N}-{slug}.mjs + _patch-siman-{N}-editorial.mjs from failing JSON + translations map */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const siman = Number(process.argv[2]);
const dataPath = process.argv[3];
if (!siman || !dataPath) {
  console.error('Usage: node _build-editorial-modules.mjs SIMAN ./_tr-data-NNN.mjs');
  process.exit(1);
}

const failing = JSON.parse(
  fs.readFileSync(path.join(WORK, `_failing-siman-${String(siman).padStart(3, '0')}.json`), 'utf8')
);
const dataFile = path.isAbsolute(dataPath) ? dataPath : path.join(WORK, path.basename(dataPath));
const dataMod = await import(pathToFileURL(dataFile).href);
const flat = dataMod.TRANSLATIONS;
const T = {};
const isPerSlug = Object.values(flat).every((v) => typeof v === 'object' && v !== null && !Array.isArray(v));
if (isPerSlug) {
  for (const [slug, keys] of Object.entries(flat)) {
    for (const [key, val] of Object.entries(keys)) T[`${slug}\t${key}`] = val;
  }
} else {
  for (const [k, v] of Object.entries(flat)) T[k] = v;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const bySlug = {};
for (const b of failing) {
  const tk = `${b.slug}\t${b.key}`;
  const val = T[tk] ?? T[b.key];
  if (val === undefined) {
    console.error(`MISSING: ${b.slug} ${b.key}`);
    process.exit(1);
  }
  if (!bySlug[b.slug]) bySlug[b.slug] = { files: new Set(), tr: {} };
  bySlug[b.slug].tr[b.key] = val;
  bySlug[b.slug].files.add(b.rel);
}

const modNames = [];
for (const [slug, { files, tr }] of Object.entries(bySlug).sort()) {
  const n = Object.keys(tr).length;
  const modName = `_tr-${siman}-${slug}.mjs`;
  modNames.push(modName);
  const filesArr = [...files].sort().map((rel) => `  ['${rel}', '${slug}'],`);
  let body = `/** Editorial translations — siman ${siman} / ${slug} (${n} blocks) */\nexport const TRANSLATIONS = {\n`;
  for (const [key, val] of Object.entries(tr).sort()) {
    body += `  '${key}': \`${esc(val)}\`,\n`;
  }
  body += `};\n\nexport const FILES = [\n${filesArr.join('\n')}\n];\n`;
  fs.writeFileSync(path.join(WORK, modName), body, 'utf8');
  console.log(`wrote ${modName} (${n} blocks)`);
}

const patchBody = `#!/usr/bin/env node
/** Apply editorial translation modules for siman ${siman} */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

const modules = process.argv.slice(2);
if (!modules.length) {
  console.error('Usage: node _patch-siman-${siman}-editorial.mjs ${modNames.join(' ')}');
  process.exit(1);
}

function patchFile(rel, slug, T) {
  const fp = path.join(OUT, rel);
  const s = fs.readFileSync(fp, 'utf8');
  const applied = new Set();
  const parts = s.split(BLOCK);
  const out = parts.map((block, i) => {
    if (i === 0) return block;
    const slugM = block.match(/^\\s*slug: (.+)$/m);
    const seifM = block.match(/^\\s*seif: (.+)$/m);
    const markerM = block.match(/^\\s*marker: (.+)$/m);
    if (!slugM || slugM[1].trim() !== slug) return BLOCK + block;
    const seif = seifM[1].trim();
    const marker = markerM ? markerM[1].trim() : 'main';
    const key = \`\${seif}#\${marker}\`;
    if (!(key in T)) return BLOCK + block;
    const enStart = block.indexOf(ENG);
    const enEnd = block.indexOf(END);
    if (enStart < 0 || enEnd < 0) throw new Error(\`ENGLISH/END missing: \${rel} \${key}\`);
    applied.add(key);
    return BLOCK + block.slice(0, enStart + ENG.length + 1) + T[key] + '\\n' + END + block.slice(enEnd + END.length);
  });
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
  return applied.size;
}

let total = 0;
for (const modName of modules) {
  const modPath = path.join(path.dirname(fileURLToPath(import.meta.url)), modName);
  const mod = await import(pathToFileURL(modPath).href);
  for (const [rel, slug] of mod.FILES) {
    total += patchFile(rel, slug, mod.TRANSLATIONS);
  }
}
console.log(\`[DONE] \${total} blocks\`);
`;
fs.writeFileSync(path.join(WORK, `_patch-siman-${siman}-editorial.mjs`), patchBody, 'utf8');
console.log(`wrote _patch-siman-${siman}-editorial.mjs`);
console.log(`modules: ${modNames.join(' ')}`);
