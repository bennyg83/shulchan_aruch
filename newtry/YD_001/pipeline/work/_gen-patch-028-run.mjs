#!/usr/bin/env node
/** One-shot: writes _patch-siman-028.mjs from embedded T data */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const imp = (f) => import(pathToFileURL(path.join(__dir, f)).href);
const { TRANSLATIONS } = await imp('_patch-siman-028-data.mjs');
const { TRANSLATIONS_B } = await imp('_patch-siman-028-data-b.mjs');
const { TRANSLATIONS_C } = await imp('_patch-siman-028-data-c.mjs');
const { TRANSLATIONS_D } = await imp('_patch-siman-028-data-d.mjs');
Object.assign(TRANSLATIONS, TRANSLATIONS_B, TRANSLATIONS_C, TRANSLATIONS_D);

const HEADER = `#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
}

`;

const ORDER = [
  'mechaber', 'siftei-kohen', 'turei-zahav', 'baer-heitev', 'beer-hagolah', 'beur-hagra',
  'kereti', 'peleti', 'pitchei-teshuva', 'rabbi-akiva-eiger-yd', 'nekudot-hakesef',
  'kaf-hachayim', 'yad-avraham', 'yad-ephraim',
];

let body = '';
for (const slug of ORDER) {
  const T = TRANSLATIONS[slug];
  if (!T) throw new Error('missing slug: ' + slug);
  const n = Object.keys(T).length;
  body += `\n// --- ${slug} (${n}) ---\n`;
  body += `patchFile('siman_028/${slug}/part-001.txt', '${slug}', ${JSON.stringify(T, null, 2)});\n`;
}

const out = HEADER + body + "\nconsole.log('siman 028 patch complete');\n";
fs.writeFileSync(path.join(__dir, '_patch-siman-028.mjs'), out, 'utf8');
console.log('Wrote _patch-siman-028.mjs, keys:', Object.values(TRANSLATIONS).reduce((a,t)=>a+Object.keys(t).length,0));
