#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emit(obj, name) {
  const keys = Object.keys(obj);
  const lines = ["export const t = {"];
  for (const k of keys) lines.push(`  ${JSON.stringify(k)}: \`${esc(obj[k])}\`,`);
  lines.push("};");
  lines.push("");
  fs.writeFileSync(path.join(dir, name), lines.join("\n"), "utf8");
  return keys.length;
}

const { MECH, SMALL } = await import(`./_siman363-batchA-data.mjs?t=${Date.now()}`);

const mechKeys = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, "_mechaber363-he.json"), "utf8")));
for (const k of mechKeys) {
  if (!(k in MECH)) throw new Error(`missing mech: ${k}`);
}
const extraMech = Object.keys(MECH).filter((k) => !mechKeys.includes(k));
if (extraMech.length) throw new Error(`extra mech keys: ${extraMech.join(", ")}`);

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

const expectedSmall = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) expectedSmall[`${slug}:${k}`] = true;
}
for (const k of Object.keys(expectedSmall)) {
  if (!(k in SMALL)) throw new Error(`missing small: ${k}`);
}
const extraSmall = Object.keys(SMALL).filter((k) => !(k in expectedSmall));
if (extraSmall.length) throw new Error(`extra small keys: ${extraSmall.slice(0, 5).join(", ")}... (${extraSmall.length})`);

emit(MECH, "mech363-en.mjs");
const smallSorted = {};
for (const k of Object.keys(SMALL).sort((a, b) => a.localeCompare(b, "en"))) smallSorted[k] = SMALL[k];
emit(smallSorted, "small363-en.mjs");
console.log(`mech363-en.mjs: ${mechKeys.length} keys`);
console.log(`small363-en.mjs: ${Object.keys(smallSorted).length} keys`);
