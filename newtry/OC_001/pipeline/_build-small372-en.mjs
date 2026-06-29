#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CHUNK1 } from "./_372-small-chunk1.mjs";
import { CHUNK2 } from "./_372-small-chunk2.mjs";
import { CHUNK3 } from "./_372-small-chunk3.mjs";
import { CHUNK4 } from "./_372-small-chunk4.mjs";
import { CHUNK5A } from "./_372-small-chunk5a.mjs";
import { CHUNK5B } from "./_372-small-chunk5b.mjs";
const CHUNK5 = { ...CHUNK5A, ...CHUNK5B };

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emit(obj, name) {
  const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b, "en"));
  const lines = ["export const t = {"];
  for (const k of keys) lines.push(`  ${JSON.stringify(k)}: \`${esc(obj[k])}\`,`);
  lines.push("};");
  lines.push("");
  fs.writeFileSync(path.join(dir, name), lines.join("\n"), "utf8");
  return keys.length;
}

const SMALL = { ...CHUNK1, ...CHUNK2, ...CHUNK3, ...CHUNK4, ...CHUNK5 };

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

const expected = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) expected[`${slug}:${k}`] = true;
}

const missing = Object.keys(expected).filter((k) => !(k in SMALL));
const extra = Object.keys(SMALL).filter((k) => !(k in expected));
if (missing.length) {
  console.error("Missing keys:", missing.length, missing.slice(0, 10));
  process.exit(1);
}
if (extra.length) {
  console.error("Extra keys:", extra.length, extra.slice(0, 10));
  process.exit(1);
}

const n = emit(SMALL, "small372-en.mjs");
console.log(`small372-en.mjs: ${n} keys OK`);
