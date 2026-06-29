import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugMap = {
  "_baer_heitev358-he.json": "baer-heitev",
  "_beer_hagolah358-he.json": "beer-hagolah",
  "_beur_hagra358-he.json": "beur-hagra",
  "_biur_halacha358-he.json": "biur-halacha",
  "_eliyah_rabbah358-he.json": "eliyah-rabbah",
  "_eshel_avraham358-he.json": "eshel-avraham",
  "_kaf_hachayyim358-he.json": "kaf-hachayyim",
  "_machatzit_hashekel358-he.json": "machatzit-hashekel",
  "_magen_avraham358-he.json": "magen-avraham",
  "_mishnah_berurah358-he.json": "mishnah-berurah",
  "_netiv_chayim358-he.json": "netiv-chayim",
  "_peri_megadim358-he.json": "peri-megadim",
  "_rabbi_akiva_eiger358-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah358-he.json": "shaarei-teshuvah",
  "_turei_zahav358-he.json": "turei-zahav",
  "_yad_ephraim358-he.json": "yad-ephraim",
};

const pairs = [
  ["mech358-en.mjs", "_mechaber358-he.json", null],
  ["small358-en.mjs", Object.keys(slugMap), slugMap],
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
