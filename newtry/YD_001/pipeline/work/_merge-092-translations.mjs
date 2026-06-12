import fs from 'fs';
import { TRANSLATIONS_P1 } from './_patch-siman-092-translations-p1.mjs';

const parts = [TRANSLATIONS_P1];
for (const n of [2, 3]) {
  const path = `./_patch-siman-092-translations-p${n}.mjs`;
  if (fs.existsSync(path)) {
    const mod = await import(path);
    parts.push(mod[`TRANSLATIONS_P${n}`]);
  }
}

const heb = JSON.parse(fs.readFileSync('_hebrew-092.json', 'utf8'));

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function shachWrap(en) {
  if (en.startsWith('["')) return en;
  return `["${en.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"]`;
}

const merged = {};
for (const part of parts) {
  for (const [slug, keys] of Object.entries(part)) {
    merged[slug] = { ...merged[slug], ...keys };
  }
}

let out = `/** Translations siman 092 — imported by _patch-siman-092.mjs */\nexport const TRANSLATIONS = {\n`;
let total = 0;
let missing = 0;

for (const slug of Object.keys(heb).sort()) {
  out += `  '${slug}': {\n`;
  for (const key of Object.keys(heb[slug]).sort()) {
    total++;
    let t = merged[slug]?.[key];
    if (!t) {
      missing++;
      t = `[Translation required ${slug} ${key}]`;
    }
    if (slug === 'siftei-kohen') {
      if (Array.isArray(t)) {
        const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        t = `["${esc(t[0])}"]`;
      } else if (!String(t).startsWith('[')) {
        t = shachWrap(t);
      }
      out += `    '${key}': ${t},\n`;
    } else {
      out += `    '${key}': \`${esc(t)}\`,\n`;
    }
  }
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync('_patch-siman-092-translations.mjs', out);
console.log(JSON.stringify({ path: '_patch-siman-092-translations.mjs', total, missing }, null, 2));
