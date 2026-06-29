import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugMap = {
  "_baer_heitev362-he.json": "baer-heitev",
  "_beer_hagolah362-he.json": "beer-hagolah",
  "_beur_hagra362-he.json": "beur-hagra",
  "_biur_halacha362-he.json": "biur-halacha",
  "_chatam_sofer362-he.json": "chatam-sofer",
  "_chokhmat_shlomo362-he.json": "chokhmat-shlomo",
  "_eliyah_rabbah362-he.json": "eliyah-rabbah",
  "_kaf_hachayyim362-he.json": "kaf-hachayyim",
  "_machatzit_hashekel362-he.json": "machatzit-hashekel",
  "_magen_avraham362-he.json": "magen-avraham",
  "_mishnah_berurah362-he.json": "mishnah-berurah",
  "_netiv_chayim362-he.json": "netiv-chayim",
  "_peri_megadim362-he.json": "peri-megadim",
  "_rabbi_akiva_eiger362-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah362-he.json": "shaarei-teshuvah",
  "_turei_zahav362-he.json": "turei-zahav",
  "_yad_ephraim362-he.json": "yad-ephraim",
};

const pairs = [
  ["mech362-en.mjs", "_mechaber362-he.json", null],
  ["small362-en.mjs", Object.keys(slugMap), slugMap],
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
