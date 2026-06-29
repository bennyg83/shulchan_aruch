#!/usr/bin/env node
/** Assemble 6 chunk JSON files for siman 363 batch-8 slugs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { t as SMALL } from "./small363-en.mjs";
import { EXTRA } from "./_363-chunk8-extra.mjs";
import { PMG } from "./_363-pmg-en-data.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

const slugFiles = {
  "yad-ephraim": "_yad_ephraim363-he.json",
  "chokhmat-shlomo": "_chokhmat_shlomo363-he.json",
  "eliyah-rabbah": "_eliyah_rabbah363-he.json",
  "biur-halacha": "_biur_halacha363-he.json",
  "magen-avraham": "_magen_avraham363-he.json",
  "peri-megadim": "_peri_megadim363-he.json",
};

const chunkNames = {
  "yad-ephraim": "_363chunk-yad-ephraim.json",
  "chokhmat-shlomo": "_363chunk-chokhmat-shlomo.json",
  "eliyah-rabbah": "_363chunk-eliyah-rabbah.json",
  "biur-halacha": "_363chunk-biur-halacha.json",
  "magen-avraham": "_363chunk-magen-avraham.json",
  "peri-megadim": "_363chunk-peri-megadim.json",
};

const T = { ...SMALL, ...EXTRA };
for (const [k, v] of Object.entries(PMG)) T[`peri-megadim:${k}`] = v;

for (const [slug, heFile] of Object.entries(slugFiles)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const out = {};
  const missing = [];
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(full in T)) missing.push(full);
    else out[full] = T[full];
  }
  if (missing.length) {
    console.error(`${slug}: missing ${missing.length}: ${missing.join(", ")}`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(dir, chunkNames[slug]), JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`Wrote ${chunkNames[slug]} (${Object.keys(out).length} keys)`);
}
