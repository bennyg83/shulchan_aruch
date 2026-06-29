import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugMap = {
  "_baer_heitev363-he.json": "baer-heitev",
  "_beer_hagolah363-he.json": "beer-hagolah",
  "_beur_hagra363-he.json": "beur-hagra",
  "_biur_halacha363-he.json": "biur-halacha",
  "_chatam_sofer363-he.json": "chatam-sofer",
  "_chokhmat_shlomo363-he.json": "chokhmat-shlomo",
  "_eliyah_rabbah363-he.json": "eliyah-rabbah",
  "_eshel_avraham363-he.json": "eshel-avraham",
  "_kaf_hachayyim363-he.json": "kaf-hachayyim",
  "_machatzit_hashekel363-he.json": "machatzit-hashekel",
  "_magen_avraham363-he.json": "magen-avraham",
  "_mishnah_berurah363-he.json": "mishnah-berurah",
  "_netiv_chayim363-he.json": "netiv-chayim",
  "_peri_megadim363-he.json": "peri-megadim",
  "_rabbi_akiva_eiger363-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah363-he.json": "shaarei-teshuvah",
  "_turei_zahav363-he.json": "turei-zahav",
  "_yad_ephraim363-he.json": "yad-ephraim",
};

let total = 0;
let ok = true;

const mechHe = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber363-he.json"), "utf8"));
const mechMod = await import(pathToFileURL(path.join(dir, "mech363-en.mjs")).href);
const mechKeys = Object.keys(mechHe);
const mechEn = Object.keys(mechMod.t);
const mechMatch = mechKeys.length === mechEn.length && mechKeys.every((k) => k in mechMod.t);
console.log(`mech363-en.mjs: ${mechEn.length}/${mechKeys.length} ${mechMatch ? "OK" : "FAIL"}`);
if (!mechMatch) ok = false;
total += mechEn.length;

const he = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(data)) he[`${slug}:${k}`] = true;
}
const smallMod = await import(pathToFileURL(path.join(dir, "small363-en.mjs")).href);
const enKeys = Object.keys(smallMod.t);
total += enKeys.length;
const heKeys = Object.keys(he);
const missing = heKeys.filter((k) => !(k in smallMod.t));
const extra = enKeys.filter((k) => !(k in he));
const match = enKeys.length === heKeys.length && !missing.length && !extra.length;
console.log(`small363-en.mjs: ${enKeys.length}/${heKeys.length} ${match ? "OK" : "FAIL"}`);
if (missing.length) console.log("  missing:", missing.slice(0, 5), missing.length > 5 ? `...+${missing.length - 5}` : "");
if (extra.length) console.log("  extra:", extra.slice(0, 5), extra.length > 5 ? `...+${extra.length - 5}` : "");
if (!match) ok = false;

console.log(`Total: ${total} ${ok ? "ALL OK" : "FAILURES"}`);
process.exit(ok ? 0 : 1);
