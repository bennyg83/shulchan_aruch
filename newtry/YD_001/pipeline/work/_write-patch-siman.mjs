#!/usr/bin/env node
/** Write _patch-siman-NNN.mjs (FILES list from all part-*.txt under output). */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sim = process.argv[2]?.padStart(3, '0');
if (!sim) {
  console.error('Usage: node _write-patch-siman.mjs SIMAN');
  process.exit(1);
}

const WORK = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(WORK, '../..');
const OUT = path.join(ROOT, 'output');
const simDir = path.join(OUT, `siman_${sim}`);

const files = [];
for (const slug of fs.readdirSync(simDir).sort()) {
  const slugDir = path.join(simDir, slug);
  if (!fs.statSync(slugDir).isDirectory()) continue;
  for (const f of fs
    .readdirSync(slugDir)
    .filter((x) => /^part-.*\.txt$/.test(x))
    .sort()) {
    files.push([`siman_${sim}/${slug}/${f}`, slug]);
  }
}

const filesList = files.map(([rel, slug]) => `  ['${rel}', '${slug}'],`).join('\n');

const patchContent = `#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TRANSLATIONS } from './_patch-siman-${sim}-translations.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'output');
const BLOCK = '**** YD001 SOURCE BLOCK ****';
const ENG = '**** ENGLISH ****';
const END = '**** END BLOCK ****';

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
    const before = block.slice(0, enStart + ENG.length + 1);
    const after = block.slice(enEnd);
    const text = T[key].endsWith('\\n') ? T[key] : T[key] + '\\n';
    applied.add(key);
    return BLOCK + before + text + after;
  });
  const missing = Object.keys(T).filter((k) => !applied.has(k));
  if (missing.length) throw new Error(\`Keys not found in \${rel}: \${missing.join(', ')}\`);
  fs.writeFileSync(fp, out.join(''), 'utf8');
  console.log(\`OK \${rel} (\${applied.size} blocks)\`);
  return applied.size;
}

const FILES = [
${filesList}
];

let total = 0;
for (const [rel, slug] of FILES) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error(\`No translations for slug: \${slug}\`);
  total += patchFile(rel, slug, T);
}

const ts = new Date().toISOString().replace(/\\.\\d{3}Z$/, '');
const progress = FILES.map(([rel, slug]) => {
  const n = Object.keys(TRANSLATIONS[slug]).length;
  return \`\${ts} siman_${sim}/\${slug} \${n} blocks DONE\`;
});
progress.push(\`\${ts} siman_${sim} COMPLETE\`);
fs.appendFileSync(path.join(ROOT, 'progress.log'), progress.join('\\n') + '\\n');

console.log(\`[COMPLETE] siman_${sim} — \${total} blocks across \${FILES.length} files\`);
`;

const outPath = path.join(WORK, `_patch-siman-${sim}.mjs`);
fs.writeFileSync(outPath, patchContent);
console.log(`wrote ${outPath} (${files.length} part files)`);
