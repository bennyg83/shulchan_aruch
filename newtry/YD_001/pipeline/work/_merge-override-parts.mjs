import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const siman = process.argv[2];
const parts = process.argv.slice(3);
const out = {};
for (const p of parts) {
  Object.assign(out, JSON.parse(fs.readFileSync(path.join(dir, '_mechaber-overrides', p), 'utf8')));
}
fs.writeFileSync(path.join(dir, '_mechaber-overrides', `${siman}.json`), JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote ${siman}.json (${Object.keys(out).length} keys)`);
