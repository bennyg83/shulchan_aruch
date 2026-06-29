#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugMap = {
  "_ateret_zekenim467-he.json": "ateret-zekenim",
  "_baer_heitev467-he.json": "baer-heitev",
  "_beer_hagolah467-he.json": "beer-hagolah",
  "_beur_hagra467-he.json": "beur-hagra",
  "_biur_halacha467-he.json": "biur-halacha",
  "_chatam_sofer467-he.json": "chatam-sofer",
  "_chok_yaakov467-he.json": "chok-yaakov",
  "_chokhmat_shlomo467-he.json": "chokhmat-shlomo",
  "_dagul_merevavah467-he.json": "dagul-merevavah",
  "_eliyah_rabbah467-he.json": "eliyah-rabbah",
  "_eshel_avraham467-he.json": "eshel-avraham",
  "_kaf_hachayyim467-he.json": "kaf-hachayyim",
  "_machatzit_hashekel467-he.json": "machatzit-hashekel",
  "_magen_avraham467-he.json": "magen-avraham",
  "_mishnah_berurah467-he.json": "mishnah-berurah",
  "_netiv_chayim467-he.json": "netiv-chayim",
  "_peri_megadim467-he.json": "peri-megadim",
  "_rabbi_akiva_eiger467-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah467-he.json": "shaarei-teshuvah",
  "_turei_zahav467-he.json": "turei-zahav",
  "_yad_ephraim467-he.json": "yad-ephraim",
};

let ok = true;
let total = 0;

const mechHe = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber467-he.json"), "utf8"));
const mechMod = await import(pathToFileURL(path.join(dir, "mech467-en.mjs")).href + `?t=${Date.now()}`);
const mechKeys = Object.keys(mechHe);
const mechEn = Object.keys(mechMod.t);
const mechMatch = mechKeys.length === mechEn.length && mechKeys.every((k) => k in mechMod.t);
console.log(`mech467-en.mjs: ${mechEn.length}/${mechKeys.length} ${mechMatch ? "OK" : "FAIL"}`);
if (!mechMatch) ok = false;
total += mechEn.length;

const he = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(data)) he[`${slug}:${k}`] = true;
}
const smallMod = await import(pathToFileURL(path.join(dir, "small467-en.mjs")).href + `?t=${Date.now()}`);
const enKeys = Object.keys(smallMod.t);
total += enKeys.length;
const heKeys = Object.keys(he);
const missing = heKeys.filter((k) => !(k in smallMod.t));
const extra = enKeys.filter((k) => !(k in he));
const match = enKeys.length === heKeys.length && !missing.length && !extra.length;
console.log(`small467-en.mjs: ${enKeys.length}/${heKeys.length} ${match ? "OK" : "FAIL"}`);
if (missing.length) console.log("  missing:", missing.slice(0, 10), missing.length > 10 ? `...+${missing.length - 10}` : "");
if (extra.length) console.log("  extra:", extra.slice(0, 10), extra.length > 10 ? `...+${extra.length - 10}` : "");
if (!match) ok = false;

console.log(`Total: ${total} ${ok && total === 558 ? "ALL OK" : "FAILURES"}`);
process.exit(ok && total === 558 ? 0 : 1);
