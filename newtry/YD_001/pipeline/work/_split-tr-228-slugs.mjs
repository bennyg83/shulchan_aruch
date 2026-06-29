#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SLUGS } from './_tr-228-slugs.mjs';

const WORK = path.dirname(fileURLToPath(import.meta.url));
const failing = JSON.parse(fs.readFileSync(path.join(WORK, '_failing-siman-228.json'), 'utf8'));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

for (const [slug, T] of Object.entries(SLUGS)) {
  const rels = [...new Set(failing.filter((x) => x.slug === slug).map((x) => x.rel))];
  const rel = rels[0] || `siman_228/${slug}/part-001.txt`;
  const entries = Object.entries(T)
    .map(([k, v]) => `  '${k}': \`${esc(v)}\`,`)
    .join('\n');
  const content = `/** Editorial translations — siman 228 / ${slug} (${Object.keys(T).length} blocks) */
export const TRANSLATIONS = {
${entries}
};

export const FILES = [
  ['${rel}', '${slug}'],
];
`;
  fs.writeFileSync(path.join(WORK, `_tr-228-${slug}.mjs`), content);
  console.log('wrote', slug, Object.keys(T).length);
}
