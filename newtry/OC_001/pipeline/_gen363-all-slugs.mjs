#!/usr/bin/env node
/** Generate _en363-slugs/*.json from embedded translations */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(dir, "_en363-slugs");

const slugFiles = {
  "beer-hagolah": "_beer_hagolah363-he.json",
  "beur-hagra": "_beur_hagra363-he.json",
  "biur-halacha": "_biur_halacha363-he.json",
  "chokhmat-shlomo": "_chokhmat_shlomo363-he.json",
  "eliyah-rabbah": "_eliyah_rabbah363-he.json",
  "kaf-hachayyim": "_kaf_hachayyim363-he.json",
  "machatzit-hashekel": "_machatzit_hashekel363-he.json",
  "magen-avraham": "_magen_avraham363-he.json",
  "mishnah-berurah": "_mishnah_berurah363-he.json",
  "peri-megadim": "_peri_megadim363-he.json",
  "rabbi-akiva-eiger": "_rabbi_akiva_eiger363-he.json",
  "turei-zahav": "_turei_zahav363-he.json",
  "yad-ephraim": "_yad_ephraim363-he.json",
};

// Translations loaded from companion module
const { T } = await import(`./_363-translations-data.mjs?t=${Date.now()}`);

for (const [slug, heFile] of Object.entries(slugFiles)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8"));
  const obj = {};
  let missing = 0;
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(full in T)) {
      console.error(`MISSING ${full}`);
      missing++;
      continue;
    }
    obj[k] = T[full];
  }
  if (missing) {
    console.error(`${slug}: ${missing} missing keys`);
    process.exit(1);
  }
  fs.writeFileSync(path.join(outDir, `${slug}.json`), JSON.stringify(obj, null, 2) + "\n", "utf8");
  console.log(`${slug}.json: ${Object.keys(obj).length} keys`);
}
