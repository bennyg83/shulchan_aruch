#!/usr/bin/env node
/** Merge 8-slug translations into _363-translations-data.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

const slugHeFiles = {
  "rabbi-akiva-eiger": "_rabbi_akiva_eiger363-he.json",
  "yad-ephraim": "_yad_ephraim363-he.json",
  "turei-zahav": "_turei_zahav363-he.json",
  "biur-halacha": "_biur_halacha363-he.json",
  "eliyah-rabbah": "_eliyah_rabbah363-he.json",
  "chokhmat-shlomo": "_chokhmat_shlomo363-he.json",
  "magen-avraham": "_magen_avraham363-he.json",
  "peri-megadim": "_peri_megadim363-he.json",
};

const T = {};

for (const slug of ["rabbi-akiva-eiger", "turei-zahav"]) {
  const obj = JSON.parse(fs.readFileSync(path.join(dir, "_en363-slugs", `${slug}.json`), "utf8"));
  for (const [k, v] of Object.entries(obj)) T[`${slug}:${k}`] = v;
}

for (const f of fs.readdirSync(dir).filter((x) => x.startsWith("_363chunk-") && x.endsWith(".json"))) {
  Object.assign(T, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
}

let total = 0;
for (const [slug, heFile] of Object.entries(slugHeFiles)) {
  const keys = Object.keys(JSON.parse(fs.readFileSync(path.join(dir, heFile), "utf8")));
  const missing = keys.filter((k) => !T[`${slug}:${k}`]);
  if (missing.length) {
    console.error(`${slug}: missing ${missing.length}: ${missing.join(", ")}`);
    process.exit(1);
  }
  total += keys.length;
}

const lines = [`/** OC siman 363 — 8 slugs, ${total} keys */`, "export const T = {"];
for (const k of Object.keys(T).sort()) {
  lines.push(`  ${JSON.stringify(k)}: \`${esc(T[k])}\`,`);
}
lines.push("};", "");

const out = path.join(dir, "_363-translations-data.mjs");
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
console.log(`Key count: ${Object.keys(T).length}`);
