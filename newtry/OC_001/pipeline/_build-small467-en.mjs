#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CHUNK1 } from "./_467-small-chunk1.mjs";
import { CHUNK2 } from "./_467-small-chunk2.mjs";
import { CHUNK3 } from "./_467-small-chunk3.mjs";
import { CHUNK4 } from "./_467-small-chunk4.mjs";
import { CHUNK5 } from "./_467-small-chunk5.mjs";
import { CHUNK6 } from "./_467-small-chunk6.mjs";
import { CHUNK7 } from "./_467-small-chunk7.mjs";
import { CHUNK8 } from "./_467-small-chunk8.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emit(obj, name) {
  const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b, "en"));
  const lines = ["/** OC siman 467 batch A — small commentators (542 keys) */", "export const t = {"];
  for (const k of keys) lines.push(`  ${JSON.stringify(k)}: \`${esc(obj[k])}\`,`);
  lines.push("};");
  lines.push("");
  fs.writeFileSync(path.join(dir, name), lines.join("\n"), "utf8");
  return keys.length;
}

const SMALL = {
  ...CHUNK1,
  ...CHUNK2,
  ...CHUNK3,
  ...CHUNK4,
  ...CHUNK5,
  ...CHUNK6,
  ...CHUNK7,
  ...CHUNK8,
};

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

const expected = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) expected[`${slug}:${k}`] = true;
}

const missing = Object.keys(expected).filter((k) => !(k in SMALL));
const extra = Object.keys(SMALL).filter((k) => !(k in expected));
if (missing.length) {
  console.error("Missing keys:", missing.length, missing.slice(0, 20));
  process.exit(1);
}
if (extra.length) {
  console.error("Extra keys:", extra.length, extra.slice(0, 20));
  process.exit(1);
}

const n = emit(SMALL, "small467-en.mjs");
console.log(`small467-en.mjs: ${n} keys OK`);
