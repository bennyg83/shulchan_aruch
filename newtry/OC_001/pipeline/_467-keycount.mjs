#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

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
  const j = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
  for (const k of Object.keys(j)) expected[`${slug}:${k}`] = true;
}

const chunks = [];
for (const f of fs.readdirSync(dir).filter((x) => x.match(/^\_467-small-chunk\d+\.mjs$/))) {
  const mod = await import(new URL(f, import.meta.url).href);
  const key = Object.keys(mod).find((k) => k.startsWith("CHUNK"));
  Object.assign(expected, {}); // no-op keep lint happy
  chunks.push({ f, n: Object.keys(mod[key]).length, data: mod[key] });
}

let all = {};
for (const c of chunks) all = { ...all, ...c.data };

console.log("expected small keys:", Object.keys(expected).length);
console.log(
  "chunks:",
  chunks.map((c) => `${c.f}=${c.n}`).join(", ")
);
console.log("done:", Object.keys(all).length);
const missing = Object.keys(expected).filter((k) => !(k in all));
console.log("missing:", missing.length);
const bySlug = {};
for (const k of missing) {
  const s = k.split(":")[0];
  bySlug[s] = (bySlug[s] || 0) + 1;
}
console.log("missing by slug:", JSON.stringify(bySlug, null, 2));
