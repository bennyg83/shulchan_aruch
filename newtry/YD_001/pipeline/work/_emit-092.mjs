import fs from 'fs';

const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));
const manualPath = '_translations-092.json';
const manual = fs.existsSync(manualPath)
  ? JSON.parse(fs.readFileSync(manualPath, 'utf8'))
  : {};

function getHeb(s) {
  if (typeof s === 'string' && s.startsWith('["')) {
    try {
      return JSON.parse(s)[0];
    } catch {
      return s;
    }
  }
  return s;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function shachFormat(en) {
  if (en.startsWith('["')) return en;
  return `["${en.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;
}

let out = `/** Translations siman 092 — imported by _patch-siman-092.mjs */\nexport const TRANSLATIONS = {\n`;
let total = 0;
let missing = 0;

for (const slug of Object.keys(heb).sort()) {
  out += `  '${slug}': {\n`;
  for (const key of Object.keys(heb[slug]).sort()) {
    total++;
    let t = manual[slug]?.[key];
    if (!t) {
      missing++;
      t = `[Translation required ${slug} ${key}] ${getHeb(heb[slug][key].heb).slice(0, 80)}...`;
    }
    if (slug === 'siftei-kohen' && !t.startsWith('[')) {
      t = shachFormat(t);
    }
    out += `    '${key}': \`${esc(t)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync('_patch-siman-092-translations.mjs', out);
console.log('wrote _patch-siman-092-translations.mjs', { total, missing });
