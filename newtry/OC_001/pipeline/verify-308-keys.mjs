import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const pairs = [
  ["ma308-en.mjs", "_magen_avraham308-he.json"],
  ["mh308-en.mjs", "_machatzit_hashekel308-he.json"],
  ["mb308-en.mjs", "_mishnah_berurah308-he.json"],
];

let ok = true;
for (const [enFile, heFile] of pairs) {
  const heKeys = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8")));
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  const enKeys = Object.keys(mod.t);
  const missing = heKeys.filter((k) => !mod.t[k]);
  const extra = enKeys.filter((k) => !heKeys.includes(k));
  console.log(`${enFile}: en=${enKeys.length} he=${heKeys.length} missing=${missing.length} extra=${extra.length}`);
  if (missing.length) {
    console.log("  MISSING:", missing.slice(0, 5));
    ok = false;
  }
  if (extra.length) {
    console.log("  EXTRA:", extra.slice(0, 5));
    ok = false;
  }
}
console.log(ok ? "ALL KEYS MATCH" : "KEY MISMATCH");
process.exit(ok ? 0 : 1);
