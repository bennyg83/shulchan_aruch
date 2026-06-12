#!/usr/bin/env node
/** Reads _siman-035-translations.json and writes _patch-siman-035.mjs */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(dir, '_siman-035-translations.json'), 'utf8'));

const slugs = Object.keys(T).sort();
let body = '';
for (const slug of slugs) {
  const keys = Object.keys(T[slug]);
  body += `\n// --- ${slug} (${keys.length}) ---\n`;
  body += `patchFile('siman_035/${slug}/part-001.txt', '${slug}', {\n`;
  for (const key of keys) {
    const val = T[slug][key].replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
    body += `  '${key}': \`${val}\`,\n`;
  }
  body += `});\n`;
}

const header = `#!/usr/bin/env node
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
    const markerM = block.match(/^\s*marker: (.+)$/m);
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

const footer = `\nconsole.log('siman 035 patch complete');\n`;
fs.writeFileSync(path.join(dir, '_patch-siman-035.mjs'), header + body + footer);
console.log('Wrote _patch-siman-035.mjs');
