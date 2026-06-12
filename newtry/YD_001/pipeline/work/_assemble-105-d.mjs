/** Assemble _patch-siman-105-translations-d.mjs from _en-part-d.json */
import fs from 'fs';

const heb = JSON.parse(fs.readFileSync('_siman-105-hebrew.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('_en-part-d.json', 'utf8'));

const slugs = ['kaf-hachayim', 'beur-hagra', 'siftei-kohen'];
for (const slug of slugs) {
  const hk = Object.keys(heb[slug]).sort();
  const ek = Object.keys(en[slug] || {}).sort();
  if (hk.length !== ek.length) {
    console.error(`${slug}: heb=${hk.length} en=${ek.length}`);
    const miss = hk.filter((k) => !ek.includes(k));
    const extra = ek.filter((k) => !hk.includes(k));
    if (miss.length) console.error('  missing:', miss.join(', '));
    if (extra.length) console.error('  extra:', extra.join(', '));
    process.exit(1);
  }
  console.log(`${slug}: ${ek.length} keys OK`);
}

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
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
const body = slugs.map((slug) => `  '${slug}': ${formatObj(en[slug], '  ')},`).join('\n');
const footer = `};
`;

fs.writeFileSync('_patch-siman-105-translations-d.mjs', header + body + footer, 'utf8');
console.log('Wrote _patch-siman-105-translations-d.mjs');
