import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pairs = [
  ["mech331-en.mjs", "_mechaber331-he.json"],
  ["bh331-en.mjs", "_baer_heitev331-he.json"],
  ["taz331-en.mjs", "_turei_zahav331-he.json"],
  ["beer331-en.mjs", "_beer_hagolah331-he.json"],
  ["gra331-en.mjs", "_beur_hagra331-he.json"],
  ["biur331-en.mjs", "_biur_halacha331-he.json"],
  ["mb331-en.mjs", "_mishnah_berurah331-he.json"],
  ["mh331-en.mjs", "_machatzit_hashekel331-he.json"],
  ["ma331-en.mjs", "_magen_avraham331-he.json"],
  ["er331-en.mjs", "_eliyah_rabbah331-he.json"],
  ["kaf331-en.mjs", "_kaf_hachayyim331-he.json"],
  ["pm331-en.mjs", "_peri_megadim331-he.json"],
  ["small331-en.mjs", [
    "_chatam_sofer331-he.json",
    "_chokhmat_shlomo331-he.json",
    "_eshel_avraham331-he.json",
    "_netiv_chayim331-he.json",
    "_rabbi_akiva_eiger331-he.json",
    "_shaarei_teshuvah331-he.json",
  ]],
];

const slugMap = {
  "_chatam_sofer331-he.json": "chatam-sofer",
  "_chokhmat_shlomo331-he.json": "chokhmat-shlomo",
  "_eshel_avraham331-he.json": "eshel-avraham",
  "_netiv_chayim331-he.json": "netiv-chayim",
  "_rabbi_akiva_eiger331-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah331-he.json": "shaarei-teshuvah",
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
