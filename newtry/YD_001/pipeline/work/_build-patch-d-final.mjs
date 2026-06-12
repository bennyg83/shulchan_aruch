/**
 * Builds _patch-siman-105-translations-d.mjs from Hebrew + inline EN map.
 * Run: node _build-patch-d-final.mjs
 */
import fs from 'fs';
import { PART_D_EXTRA } from './_patch-d-extra-translations.mjs';

const heb = JSON.parse(fs.readFileSync('_siman-105-hebrew.json', 'utf8'));

const PART_D = {
  'kaf-hachayim': { ...PART_D_EXTRA.kafHachayim },
  'beur-hagra': { ...PART_D_EXTRA.beurHagra },
  'siftei-kohen': { ...PART_D_EXTRA.sifteiKohen },
};

// Verify counts
for (const slug of ['siftei-kohen', 'beur-hagra', 'kaf-hachayim']) {
  const hebKeys = Object.keys(heb[slug]).sort();
  const enKeys = Object.keys(PART_D[slug]).sort();
  if (hebKeys.length !== enKeys.length) {
    console.error(`${slug}: count mismatch heb=${hebKeys.length} en=${enKeys.length}`);
    const missing = hebKeys.filter((k) => !enKeys.includes(k));
    const extra = enKeys.filter((k) => !hebKeys.includes(k));
    if (missing.length) console.error('  missing EN:', missing);
    if (extra.length) console.error('  extra EN:', extra);
    process.exit(1);
  }
  console.log(`${slug}: ${enKeys.length} keys OK`);
}

const out = `/** YD001 quality-pass translations siman 105 — Part D: siftei-kohen, beur-hagra, kaf-hachayim */
export const PART_D = ${JSON.stringify(PART_D, null, 2)
  .replace(/"([^"]+)":/g, "'$1':")
  .replace(/"/g, '`')
  .replace(/`([^`]+)`:/g, '"$1":')
  .replace(/\\`/g, '`');
`;

// JSON.stringify won't work well for template literals - write manually
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function formatObj(obj, indent) {
  const lines = ['{'];
  for (const [k, v] of Object.entries(obj)) {
    lines.push(`${indent}  '${k}': \`${esc(v)}\`,`);
  }
  lines.push(`${indent}}`);
  return lines.join('\n');
}

const header = `/** YD001 quality-pass translations siman 105 — Part D: siftei-kohen, beur-hagra, kaf-hachayim */
export const PART_D = {
`;
const body = Object.entries(PART_D)
  .map(([slug, obj]) => `  '${slug}': ${formatObj(obj, '  ')},`)
  .join('\n');
const footer = `};
`;

fs.writeFileSync('_patch-siman-105-translations-d.mjs', header + body + footer, 'utf8');
console.log('Wrote _patch-siman-105-translations-d.mjs');
