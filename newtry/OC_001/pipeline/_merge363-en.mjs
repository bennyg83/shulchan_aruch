#!/usr/bin/env node
/** Merge slug JSON translations into _siman363-batchA-data.mjs and write mech363-en.mjs + small363-en.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const slugDir = path.join(dir, "_en363-slugs");

const slugMap = {
  "baer-heitev.json": "baer-heitev",
  "beer-hagolah.json": "beer-hagolah",
  "beur-hagra.json": "beur-hagra",
  "biur-halacha.json": "biur-halacha",
  "chatam-sofer.json": "chatam-sofer",
  "chokhmat-shlomo.json": "chokhmat-shlomo",
  "eliyah-rabbah.json": "eliyah-rabbah",
  "eshel-avraham.json": "eshel-avraham",
  "kaf-hachayyim.json": "kaf-hachayyim",
  "machatzit-hashekel.json": "machatzit-hashekel",
  "magen-avraham.json": "magen-avraham",
  "mishnah-berurah.json": "mishnah-berurah",
  "netiv-chayim.json": "netiv-chayim",
  "peri-megadim.json": "peri-megadim",
  "rabbi-akiva-eiger.json": "rabbi-akiva-eiger",
  "shaarei-teshuvah.json": "shaarei-teshuvah",
  "turei-zahav.json": "turei-zahav",
  "yad-ephraim.json": "yad-ephraim",
};

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

const { MECH } = await import(pathToFileURL(path.join(dir, "_siman363-batchA-data.mjs")).href + `?t=${Date.now()}`);

const mechHe = JSON.parse(fs.readFileSync(path.join(dir, "_mechaber363-he.json"), "utf8"));
for (const k of Object.keys(mechHe)) {
  if (!(k in MECH)) throw new Error(`missing MECH: ${k}`);
}

const SMALL = {};
const missing = [];
for (const [file, slug] of Object.entries(slugMap)) {
  const hePath = path.join(dir, `_${slug.replace(/-/g, "_")}363-he.json`.replace("kaf_hachayyim", "kaf_hachayyim"));
  const heFile = Object.keys(
    Object.fromEntries(
      fs
        .readdirSync(dir)
        .filter((f) => f.endsWith("363-he.json") && !f.includes("mechaber"))
        .map((f) => {
          const s = f.replace(/^_/, "").replace(/363-he\.json$/, "").replace(/_/g, "-");
          return [s, f];
        })
    )
  );
  const actualHe = fs.readdirSync(dir).find((f) => f.includes(slug.replace(/-/g, "_")) && f.endsWith("363-he.json"));
  if (!actualHe) throw new Error(`no he file for ${slug}`);
  const he = JSON.parse(fs.readFileSync(path.join(dir, actualHe), "utf8"));
  const trPath = path.join(slugDir, file);
  if (!fs.existsSync(trPath)) {
    for (const k of Object.keys(he)) missing.push(`${slug}:${k}`);
    continue;
  }
  const tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
  for (const k of Object.keys(he)) {
    const full = `${slug}:${k}`;
    if (!(k in tr)) missing.push(full);
    else SMALL[full] = tr[k];
  }
}

if (missing.length) {
  console.error(`MISSING ${missing.length} translations:`);
  console.error(missing.slice(0, 20).join("\n"));
  process.exit(1);
}

emit(MECH, "mech363-en.mjs");
const smallSorted = {};
for (const k of Object.keys(SMALL).sort((a, b) => a.localeCompare(b, "en"))) smallSorted[k] = SMALL[k];
emit(smallSorted, "small363-en.mjs");
console.log(`mech363-en.mjs: ${Object.keys(MECH).length}`);
console.log(`small363-en.mjs: ${Object.keys(smallSorted).length}`);
