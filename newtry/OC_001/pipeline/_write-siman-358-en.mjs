#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
}

function emit(obj, name) {
  const lines = ["export const t = {"];
  for (const [k, v] of Object.entries(obj)) lines.push(`  ${JSON.stringify(k)}: \`${esc(v)}\`,`);
  lines.push("};");
  fs.writeFileSync(path.join(dir, name), lines.join("\n") + "\n", "utf8");
}

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

const raw = JSON.parse(fs.readFileSync(path.join(dir, "_en358-small-raw.json"), "utf8"));
const small = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(full in raw)) throw new Error(`missing translation: ${full}`);
    small[full] = raw[full];
  }
}
emit(small, "small358-en.mjs");
console.log(`small358-en.mjs: ${Object.keys(small).length} keys`);
