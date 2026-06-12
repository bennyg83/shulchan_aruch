/**
 * Generates _patch-siman-092-translations-p3-rest.mjs from _p3-rest-092.json
 * Run: node _gen-rest-092.mjs  (after filling JSON)
 */
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('_p3-rest-092.json', 'utf8'));
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
let out = `/** Siman 092 — peleti, mateh-yehonatan, yad-avraham */\nexport const TRANSLATIONS_P3_REST = {\n`;
for (const [slug, keys] of Object.entries(data)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    out += `    '${key}': \`${esc(val)}\`,\n`;
  }
  out += `  },\n`;
}
out += `};\n`;
fs.writeFileSync('_patch-siman-092-translations-p3-rest.mjs', out);
console.log('blocks', Object.values(data).reduce((n, o) => n + Object.keys(o).length, 0));
