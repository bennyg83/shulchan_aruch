#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { pathToFileURL, fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugMap = {
  "_baer_heitev382-he.json": "baer-heitev",
  "_beer_hagolah382-he.json": "beer-hagolah",
  "_beur_hagra382-he.json": "beur-hagra",
  "_biur_halacha382-he.json": "biur-halacha",
  "_chatam_sofer382-he.json": "chatam-sofer",
  "_chokhmat_shlomo382-he.json": "chokhmat-shlomo",
  "_dagul_merevavah382-he.json": "dagul-merevavah",
  "_eliyah_rabbah382-he.json": "eliyah-rabbah",
  "_eshel_avraham382-he.json": "eshel-avraham",
  "_kaf_hachayyim382-he.json": "kaf-hachayyim",
  "_machatzit_hashekel382-he.json": "machatzit-hashekel",
  "_magen_avraham382-he.json": "magen-avraham",
  "_mishnah_berurah382-he.json": "mishnah-berurah",
  "_netiv_chayim382-he.json": "netiv-chayim",
  "_peri_megadim382-he.json": "peri-megadim",
  "_rabbi_akiva_eiger382-he.json": "rabbi-akiva-eiger",
  "_shaarei_teshuvah382-he.json": "shaarei-teshuvah",
  "_turei_zahav382-he.json": "turei-zahav",
  "_yad_ephraim382-he.json": "yad-ephraim",
};

let ok = true;
let total = 0;

const mechHe = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber382-he.json"), "utf8"));
const mechMod = await import(pathToFileURL(path.join(dir, "mech382-en.mjs")).href + `?t=${Date.now()}`);
const mechKeys = Object.keys(mechHe);
const mechEn = Object.keys(mechMod.t);
const mechMatch = mechKeys.length === mechEn.length && mechKeys.every((k) => k in mechMod.t);
console.log(`mech382-en.mjs: ${mechEn.length}/${mechKeys.length} ${mechMatch ? "OK" : "FAIL"}`);
if (!mechMatch) ok = false;
total += mechEn.length;

const he = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(data)) he[`${slug}:${k}`] = true;
}
const smallMod = await import(pathToFileURL(path.join(dir, "small382-en.mjs")).href + `?t=${Date.now()}`);
const enKeys = Object.keys(smallMod.t);
total += enKeys.length;
const heKeys = Object.keys(he);
const missing = heKeys.filter((k) => !(k in smallMod.t));
const extra = enKeys.filter((k) => !(k in he));
const match = enKeys.length === heKeys.length && !missing.length && !extra.length;
console.log(`small382-en.mjs: ${enKeys.length}/${heKeys.length} ${match ? "OK" : "FAIL"}`);
if (missing.length) console.log("  missing:", missing.slice(0, 10), missing.length > 10 ? `...+${missing.length - 10}` : "");
if (extra.length) console.log("  extra:", extra.slice(0, 10), extra.length > 10 ? `...+${extra.length - 10}` : "");
if (!match) ok = false;

console.log(`Total: ${total} ${ok ? "ALL OK" : "FAILURES"}`);
process.exit(ok ? 0 : 1);
