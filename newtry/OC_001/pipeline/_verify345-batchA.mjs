import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugMap = {
  "_baer_heitev345-he.json": "baer-heitev",
  "_beer_hagolah345-he.json": "beer-hagolah",
  "_beur_hagra345-he.json": "beur-hagra",
  "_biur_halacha345-he.json": "biur-halacha",
  "_chokhmat_shlomo345-he.json": "chokhmat-shlomo",
  "_eliyah_rabbah345-he.json": "eliyah-rabbah",
  "_kaf_hachayyim345-he.json": "kaf-hachayyim",
  "_machatzit_hashekel345-he.json": "machatzit-hashekel",
  "_magen_avraham345-he.json": "magen-avraham",
  "_mishnah_berurah345-he.json": "mishnah-berurah",
  "_netiv_chayim345-he.json": "netiv-chayim",
  "_peri_megadim345-he.json": "peri-megadim",
  "_rabbi_akiva_eiger345-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah345-he.json": "shaarei-teshuvah",
  "_turei_zahav345-he.json": "turei-zahav",
  "_yad_ephraim345-he.json": "yad-ephraim",
};

const pairs = [
  ["mech345-en.mjs", "_mechaber345-he.json", null],
  ["small345-en.mjs", Object.keys(slugMap), slugMap],
];

let total = 0;
let ok = true;
for (const [enFile, heSpec, map] of pairs) {
  const heFiles = Array.isArray(heSpec) ? heSpec : [heSpec];
  const he = {};
  for (const hf of heFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, hf), "utf8"));
    for (const [k] of Object.entries(data)) {
      const slug = map ? map[hf] : null;
      he[slug ? `${slug}:${k}` : k] = true;
    }
  }
  const heKeys = Object.keys(he);
  const mod = await import(pathToFileURL(path.join(dir, enFile)).href);
  const enKeys = Object.keys(mod.t);
  total += enKeys.length;
  const missing = heKeys.filter((k) => !(k in mod.t));
  const extra = enKeys.filter((k) => !(k in he));
  const match = enKeys.length === heKeys.length && !missing.length && !extra.length;
  console.log(`${enFile}: ${enKeys.length}/${heKeys.length} ${match ? "OK" : "FAIL"}`);
  if (missing.length) console.log("  missing:", missing.slice(0, 10), missing.length > 10 ? `...+${missing.length - 10}` : "");
  if (extra.length) console.log("  extra:", extra.slice(0, 10), extra.length > 10 ? `...+${extra.length - 10}` : "");
  if (!match) ok = false;
}
console.log(`Total: ${total} ${ok ? "ALL OK" : "FAILURES"}`);
process.exit(ok ? 0 : 1);
