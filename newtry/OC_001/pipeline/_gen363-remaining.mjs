#!/usr/bin/env node
/** Generate remaining siman 363 slug JSON from embedded translations + Hebrew key validation */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugDir = path.join(dir, "_en363-slugs");

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
  "yad-ephraim": "_yad_ephraim363-he.json",
};

// Import translations module (to be populated)
let TR = {};
try {
  TR = (await import(`./_siman363-en-translations.mjs?t=${Date.now()}`)).TR;
} catch (e) {
  console.error("Missing _siman363-en-translations.mjs:", e.message);
  process.exit(1);
}

let total = 0;
const report = [];
for (const [slug, heFile] of Object.entries(slugFiles)) {
  const hePath = path.join(dir, heFile);
  const he = JSON.parse(fs.readFileSync(hePath, "utf8"));
  const keys = Object.keys(he);
  const out = {};
  const missing = [];
  for (const k of keys) {
    const v = TR[`${slug}:${k}`] ?? TR[slug]?.[k];
    if (!v) missing.push(k);
    else out[k] = v;
  }
  if (missing.length) {
    report.push(`${slug}: MISSING ${missing.length}/${keys.length} — ${missing.slice(0, 3).join(", ")}...`);
    continue;
  }
  const outPath = path.join(slugDir, `${slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n", "utf8");
  total += keys.length;
  report.push(`${slug}: ${keys.length} keys written`);
}

console.log(report.join("\n"));
console.log(`TOTAL written: ${total}`);
if (report.some((r) => r.includes("MISSING"))) process.exit(1);
