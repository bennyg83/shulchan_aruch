#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugFiles = [
  ["baer-heitev", "_baer_heitev366-he.json", "./bh366-en.mjs"],
  ["biur-halacha", "_biur_halacha366-he.json", "./biur366-en.mjs"],
  ["eliyah-rabbah", "_eliyah_rabbah366-he.json", "./er366-en.mjs"],
  ["magen-avraham", "_magen_avraham366-he.json", "./ma366-en.mjs"],
  ["turei-zahav", "_turei_zahav366-he.json", "./taz366-en.mjs"],
  ["mishnah-berurah", "_mishnah_berurah366-he.json", "./mb366-en.mjs"],
  ["peri-megadim", "_peri_megadim366-he.json", "./pm366-en.mjs"],
  ["netiv-chayim", "_netiv_chayim366-he.json", "./netiv366-en.mjs"],
  ["machatzit-hashekel", "_machatzit_hashekel366-he.json", "./mh366-en.mjs"],
  ["kaf-hachayyim", "_kaf_hachayyim366-he.json", "./kaf366-en.mjs"],
  ["chatam-sofer", "_chatam_sofer366-he.json", "./cs366-en.mjs"],
  ["rabbi-akiva-eiger", "_rabbi_akiva_eiger366-he.json", "./rae366-en.mjs"],
  ["shaarei-teshuvah", "_shaarei_teshuvah366-he.json", "./st366-en.mjs"],
  ["yad-ephraim", "_yad_ephraim366-he.json", "./ye366-en.mjs"],
];

const out = {};
for (const [slug, heFile, enMod] of slugFiles) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const { t } = await import(`${enMod}?t=${Date.now()}`);
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(k in t)) throw new Error(`missing ${full}`);
    out[full] = t[k];
  }
  const extra = Object.keys(t).filter((k) => !(k in he));
  if (extra.length) throw new Error(`extra keys in ${enMod}: ${extra.join(", ")}`);
}

const sorted = {};
for (const k of Object.keys(out).sort((a, b) => a.localeCompare(b, "en"))) sorted[k] = out[k];

const outPath = path.join(dir, "_en366-small-raw.json");
fs.writeFileSync(outPath, JSON.stringify(sorted, null, 2) + "\n", "utf8");
console.log(`Wrote ${Object.keys(sorted).length} keys to ${outPath}`);
