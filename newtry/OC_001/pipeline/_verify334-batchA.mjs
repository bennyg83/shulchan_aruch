import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pairs = [
  ["mech334-en.mjs", "_mechaber334-he.json"],
  ["small334-en.mjs", [
    "_chatam_sofer334-he.json",
    "_chokhmat_shlomo334-he.json",
    "_dagul_merevavah334-he.json",
    "_eshel_avraham334-he.json",
    "_netiv_chayim334-he.json",
    "_rabbi_akiva_eiger334-he.json",
    "_shaarei_teshuvah334-he.json",
    "_yad_ephraim334-he.json",
  ]],
];

const slugMap = {
  "_chatam_sofer334-he.json": "chatam-sofer",
  "_chokhmat_shlomo334-he.json": "chokhmat-shlomo",
  "_dagul_merevavah334-he.json": "dagul-merevavah",
  "_eshel_avraham334-he.json": "eshel-avraham",
  "_netiv_chayim334-he.json": "netiv-chayim",
  "_rabbi_akiva_eiger334-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah334-he.json": "shaarei-teshuvah",
  "_yad_ephraim334-he.json": "yad-ephraim",
};

let total = 0;
let ok = true;
for (const [enFile, heSpec] of pairs) {
  const heFiles = Array.isArray(heSpec) ? heSpec : [heSpec];
  const he = {};
  for (const hf of heFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, hf), "utf8"));
    for (const [k, v] of Object.entries(data)) {
      const slug = slugMap[hf];
      he[slug ? `${slug}:${k}` : k] = v;
    }
  }
  const heKeys = Object.keys(he);
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  const enKeys = Object.keys(mod.t);
  total += enKeys.length;
  const missing = heKeys.filter((k) => !(k in mod.t));
  const extra = enKeys.filter((k) => !(k in he));
  const match = enKeys.length === heKeys.length && missing.length === 0 && extra.length === 0;
  console.log(`${enFile}: ${enKeys.length}/${heKeys.length} keys ${match ? "OK" : "FAIL"}`);
  if (missing.length) console.log("  missing:", missing);
  if (extra.length) console.log("  extra:", extra);
  if (!match) ok = false;
}
console.log(`Total: ${total} ${ok ? "ALL OK" : "FAILURES"}`);
process.exit(ok ? 0 : 1);
