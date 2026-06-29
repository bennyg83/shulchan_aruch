import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pairs = [
  ["mb328-en.mjs", "_mishnah_berurah328-he.json", 152],
  ["biur328-en.mjs", "_biur_halacha328-he.json", 18],
  ["er328-en.mjs", "_eliyah_rabbah328-he.json", 49],
  ["kaf328-en.mjs", "_kaf_hachayyim328-he.json", 50],
  ["pm328-en.mjs", "_peri_megadim328-he.json", 35],
];

let total = 0;
let ok = true;
for (const [enFile, heFile, expected] of pairs) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const heKeys = Object.keys(he);
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  const enKeys = Object.keys(mod.t);
  total += enKeys.length;
  const missing = heKeys.filter((k) => !(k in mod.t));
  const extra = enKeys.filter((k) => !(k in he));
  const match = enKeys.length === expected && missing.length === 0 && extra.length === 0;
  console.log(`${enFile}: ${enKeys.length} keys (expected ${expected}) ${match ? "OK" : "FAIL"}`);
  if (missing.length) console.log("  missing:", missing.slice(0, 5));
  if (extra.length) console.log("  extra:", extra.slice(0, 5));
  if (!match) ok = false;
}
console.log(`Total: ${total} (expected 304) ${total === 304 && ok ? "OK" : "FAIL"}`);
