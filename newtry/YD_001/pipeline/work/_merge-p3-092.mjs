import fs from 'fs';

const parts = [];
for (const f of [
  '_patch-siman-092-translations-p3-sk.mjs',
  '_patch-siman-092-translations-p3-turei.mjs',
  '_patch-siman-092-translations-p3-rest.mjs',
]) {
  if (!fs.existsSync(f)) {
    console.error('Missing', f);
    process.exit(1);
  }
  const mod = await import('./' + f);
  const key = Object.keys(mod).find((k) => k.startsWith('TRANSLATIONS_P3'));
  parts.push(mod[key]);
}

const merged = {};
for (const part of parts) {
  for (const [slug, keys] of Object.entries(part)) {
    merged[slug] = { ...merged[slug], ...keys };
  }
}

let out = `/** Siman 092 translations — part 3 */\nexport const TRANSLATIONS_P3 = {\n`;
for (const [slug, keys] of Object.entries(merged)) {
  out += `  '${slug}': {\n`;
  for (const [key, val] of Object.entries(keys)) {
    if (slug === 'siftei-kohen') {
      const text = Array.isArray(val) ? val[0] : val;
      const esc = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      out += `    '${key}': ["${esc(text)}"],\n`;
    } else {
      const esc = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
      out += `    '${key}': \`${esc(val)}\`,\n`;
    }
  }
  out += `  },\n`;
}
out += `};\n`;
fs.writeFileSync('_patch-siman-092-translations-p3.mjs', out);
const n = Object.values(merged).reduce((a, o) => a + Object.keys(o).length, 0);
console.log('Merged p3:', n, 'blocks');
