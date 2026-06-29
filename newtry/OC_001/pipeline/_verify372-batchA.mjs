import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugMap = {
  "_baer_heitev372-he.json": "baer-heitev",
  "_beer_hagolah372-he.json": "beer-hagolah",
  "_beur_hagra372-he.json": "beur-hagra",
  "_biur_halacha372-he.json": "biur-halacha",
  "_eliyah_rabbah372-he.json": "eliyah-rabbah",
  "_kaf_hachayyim372-he.json": "kaf-hachayyim",
  "_machatzit_hashekel372-he.json": "machatzit-hashekel",
  "_magen_avraham372-he.json": "magen-avraham",
  "_mishnah_berurah372-he.json": "mishnah-berurah",
  "_netiv_chayim372-he.json": "netiv-chayim",
  "_peri_megadim372-he.json": "peri-megadim",
  "_rabbi_akiva_eiger372-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah372-he.json": "shaarei-teshuvah",
  "_turei_zahav372-he.json": "turei-zahav",
  "_yad_ephraim372-he.json": "yad-ephraim",
};

let ok = true;
let total = 0;

const mechHe = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber372-he.json"), "utf8"));
const mechMod = await import(pathToFileURL(path.join(dir, "mech372-en.mjs")).href);
const mechKeys = Object.keys(mechHe);
const mechEn = Object.keys(mechMod.t);
const mechMatch = mechKeys.length === mechEn.length && mechKeys.every((k) => k in mechMod.t);
console.log(`mech372-en.mjs: ${mechEn.length}/${mechKeys.length} ${mechMatch ? "OK" : "FAIL"}`);
if (!mechMatch) ok = false;
total += mechEn.length;

const he = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(data)) he[`${slug}:${k}`] = true;
}
const smallMod = await import(pathToFileURL(path.join(dir, "small372-en.mjs")).href);
const enKeys = Object.keys(smallMod.t);
total += enKeys.length;
const heKeys = Object.keys(he);
const missing = heKeys.filter((k) => !(k in smallMod.t));
const extra = enKeys.filter((k) => !(k in he));
const match = enKeys.length === heKeys.length && !missing.length && !extra.length;
console.log(`small372-en.mjs: ${enKeys.length}/${heKeys.length} ${match ? "OK" : "FAIL"}`);
if (missing.length) console.log("  missing:", missing.slice(0, 5), missing.length > 5 ? `...+${missing.length - 5}` : "");
if (extra.length) console.log("  extra:", extra.slice(0, 5), extra.length > 5 ? `...+${extra.length - 5}` : "");
if (!match) ok = false;

console.log(`Total: ${total} ${ok ? "ALL OK" : "FAILURES"}`);
process.exit(ok ? 0 : 1);
