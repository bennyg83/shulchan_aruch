#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CHUNK1 } from "./_382-small-chunk1.mjs";
import { CHUNK2 } from "./_382-small-chunk2.mjs";
import { CHUNK3 } from "./_382-small-chunk3.mjs";
import { CHUNK4 } from "./_382-small-chunk4.mjs";
import { CHUNK5 } from "./_382-small-chunk5.mjs";
import { CHUNK6 } from "./_382-small-chunk6.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function emit(obj, name) {
  const keys = Object.keys(obj).sort((a, b) => a.localeCompare(b, "en"));
  const lines = ["/** OC siman 382 batch A — small commentators (313 keys) */", "export const t = {"];
  for (const k of keys) lines.push(`  ${JSON.stringify(k)}: \`${esc(obj[k])}\`,`);
  lines.push("};");
  lines.push("");
  fs.writeFileSync(path.join(dir, name), lines.join("\n"), "utf8");
  return keys.length;
}

const SMALL = { ...CHUNK1, ...CHUNK2, ...CHUNK3, ...CHUNK4, ...CHUNK5, ...CHUNK6 };

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

const expected = {};
for (const [file, slug] of Object.entries(slugMap)) {
  const he = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(he)) expected[`${slug}:${k}`] = true;
}

const missing = Object.keys(expected).filter((k) => !(k in SMALL));
const extra = Object.keys(SMALL).filter((k) => !(k in expected));
if (missing.length) {
  console.error("Missing keys:", missing.length, missing);
  process.exit(1);
}
if (extra.length) {
  console.error("Extra keys:", extra.length, extra);
  process.exit(1);
}

const n = emit(SMALL, "small382-en.mjs");
console.log(`small382-en.mjs: ${n} keys OK`);
