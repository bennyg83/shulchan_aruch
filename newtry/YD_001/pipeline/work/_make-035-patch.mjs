#!/usr/bin/env node
/**
 * One-shot: read _siman-035-blocks.json + inline TRANSLATIONS below,
 * write _siman-035-translations.json and _patch-siman-035.mjs, run patch.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, '../..');
const blocks = JSON.parse(fs.readFileSync(path.join(dir, '_siman-035-blocks.json'), 'utf8'));

// Load supplemental slug files if present
const extraFiles = [
  '_s035-trans-part1.mjs',
  '_s035-trans-part2.mjs',
  '_s035-trans-part3.mjs',
  '_s035-trans-kol.mjs',
];
const TRANSLATIONS = {};
for (const f of extraFiles) {
  const fp = path.join(dir, f);
  if (fs.existsSync(fp)) {
    const mod = await import(pathToFileURL(fp).href);
    Object.assign(TRANSLATIONS, mod.default);
  }
}

function pathToFileURL(p) {
  const u = new URL('file://');
  if (process.platform === 'win32') u.pathname = '/' + p.replace(/\\/g, '/');
  else u.pathname = p;
  return u;
}

// --- INLINE: halacha slugs not yet in part files (generated/merged here) ---
Object.assign(TRANSLATIONS, INLINE);

const INLINE = {}; // filled by build script append below

// Validate
let missing = [];
for (const [slug, arr] of Object.entries(blocks)) {
  if (!TRANSLATIONS[slug]) TRANSLATIONS[slug] = {};
  for (const { key, heb } of arr) {
    if (!(key in TRANSLATIONS[slug])) {
      missing.push({ slug, key, heb: heb.slice(0, 80) });
    }
  }
}

if (missing.length) {
  fs.writeFileSync(path.join(dir, '_siman-035-missing.json'), JSON.stringify(missing, null, 2));
  console.error('Missing', missing.length, '— wrote _siman-035-missing.json');
  process.exit(1);
}

fs.writeFileSync(path.join(dir, '_siman-035-translations.json'), JSON.stringify(TRANSLATIONS, null, 2));

// Generate patch mjs
let body = '';
for (const slug of Object.keys(TRANSLATIONS).sort()) {
  const T = TRANSLATIONS[slug];
  const keys = Object.keys(T);
  body += `\npatchFile('siman_035/${slug}/part-001.txt', '${slug}', {\n`;
  for (const key of keys) {
    const val = T[key].replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
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

fs.writeFileSync(
  path.join(dir, '_patch-siman-035.mjs'),
  header + body + `\nconsole.log('siman 035 patch complete');\n`
);
console.log('Wrote patch', Object.values(TRANSLATIONS).reduce((n, o) => n + Object.keys(o).length, 0), 'blocks');
