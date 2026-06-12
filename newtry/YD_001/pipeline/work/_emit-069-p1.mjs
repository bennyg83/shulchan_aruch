import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dump = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_siman-069-hebrew-dump.json'), 'utf8'),
);
const { EN: en } = await import('./_en-069-p1-data.mjs');

const slugs = [
  'mechaber',
  'beer-hagolah',
  'mateh-yehonatan',
  'pitchei-teshuva',
  'rabbi-akiva-eiger-yd',
  'kaf-hachayim',
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

let out =
  '/** siman 069 translations — part 1: mechaber, beer-hagolah, mateh-yehonatan, pitchei-teshuva, rabbi-akiva-eiger-yd, kaf-hachayim */\nexport const TRANSLATIONS_PART1 = {\n';

for (const slug of slugs) {
  const heKeys = Object.keys(dump[slug]).sort();
  const enMap = en[slug] || {};
  const missing = heKeys.filter((k) => !enMap[k]);
  if (missing.length) {
    console.error(`Missing ${slug}:`, missing);
    process.exit(1);
  }
  out += `  '${slug}': {\n`;
  for (const key of heKeys) {
    out += `    '${key}': \`${esc(enMap[key])}\`,\n`;
  }
  out += '  },\n';
}
out += '};\n';

const outPath = path.join(__dirname, '_patch-siman-069-translations-part1.mjs');
fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath);
for (const slug of slugs) {
  console.log(slug + ':', Object.keys(dump[slug]).length, 'blocks');
}
