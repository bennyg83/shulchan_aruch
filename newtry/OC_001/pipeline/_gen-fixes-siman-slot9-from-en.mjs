#!/usr/bin/env node
/** Build _fixes-simanNNN-slot9.mjs from pipeline/*NNN-en.mjs slot2 translation maps */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { blockKey } from "./_slot9-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _gen-fixes-siman-slot9-from-en.mjs <siman>");

const PREFIX = {
  mech: "mechaber",
  bh: "baer-heitev",
  taz: "turei-zahav",
  beer: "beer-hagolah",
  gra: "beur-hagra",
  biur: "biur-halacha",
  mb: "mishnah-berurah",
  mh: "machatzit-hashekel",
  ma: "magen-avraham",
  er: "eliyah-rabbah",
  kaf: "kaf-hachayyim",
  ls: "levushei-serad",
  pm: "peri-megadim",
  cs: "chatam-sofer",
  netiv: "netiv-chayim",
  dag: "dagul-merevavah",
  chatam: "chatam-sofer",
  ye: "yad-ephraim",
  st: "shaarei-teshuvah",
  sha: "shaarei-teshuvah",
  rae: "rabbi-akiva-eiger",
};

const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const fixes = {};

function add(slug, seif, marker, en) {
  const slugDir = path.join(OUT, slug);
  if (!fs.existsSync(slugDir)) return;
  for (const part of fs
    .readdirSync(path.join(OUT, slug))
    .filter((f) => /^part-\d+\.txt$/.test(f))
    .sort()) {
    const rel = `${slug}/${part}`;
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(OUT, rel), "utf8"));
    const hit = blocks.find(
      (b) => String(b.seif) === String(seif) && String(b.marker || "_") === String(marker || "_")
    );
    if (hit) {
      if (!fixes[rel]) fixes[rel] = {};
      fixes[rel][blockKey(seif, marker)] = en;
      return;
    }
  }
}

for (const [prefix, slug] of Object.entries(PREFIX)) {
  const fp = path.join(__dirname, `${prefix}${siman}-en.mjs`);
  if (!fs.existsSync(fp)) continue;
  const { t } = await import(pathToFileURL(fp).href);
  for (const [k, v] of Object.entries(t)) {
    const [seif, marker = "_"] = k.split(":");
    add(slug, seif, marker, v);
  }
}

for (const smallName of [`small${siman}-en.mjs`, `_small${siman}-translations.mjs`]) {
  const smallFp = path.join(__dirname, smallName);
  if (!fs.existsSync(smallFp)) continue;
  const mod = await import(pathToFileURL(smallFp).href + "?v=" + Date.now());
  const t = mod.t || mod.tSmall || mod.SMALL || {};
  for (const [k, v] of Object.entries(t)) {
    const i = k.indexOf(":");
    const slug = k.slice(0, i);
    const rest = k.slice(i + 1);
    const [seif, marker = "_"] = rest.split(":");
    add(slug, seif, marker, v);
  }
}

for (const batchName of fs
  .readdirSync(__dirname)
  .filter((f) => f.match(new RegExp(`^_siman${siman}-batch[A-Z]-data\\.mjs$`)))
  .sort()) {
  const mod = await import(pathToFileURL(path.join(__dirname, batchName)).href + "?v=" + Date.now());
  for (const [k, v] of Object.entries(mod.MECH || {})) {
    if (!v?.trim()) continue;
    const [seif, marker = "_"] = k.split(":");
    add("mechaber", seif, marker, v);
  }
  for (const [k, v] of Object.entries(mod.SMALL || {})) {
    if (!v?.trim()) continue;
    const i = k.indexOf(":");
    add(k.slice(0, i), ...k.slice(i + 1).split(":"), v);
  }
}

const transFile = path.join(__dirname, `_translations-siman${siman}.mjs`);
if (fs.existsSync(transFile)) {
  const mod = await import(pathToFileURL(transFile).href + "?v=" + Date.now());
  const t = mod[`t${siman}`] || mod.t || {};
  for (const [k, v] of Object.entries(t)) {
    const i = k.indexOf(":");
    const slug = k.slice(0, i);
    const rest = k.slice(i + 1);
    const [seif, marker = "_"] = rest.split(":");
    add(slug, seif, marker, v);
  }
}

const outPath = path.join(__dirname, `_fixes-siman${siman}-slot9.mjs`);
const count = Object.values(fixes).reduce((n, m) => n + Object.keys(m).length, 0);
const body = `/** worker-slot-9 — siman ${siman} fixes from slot2 en maps (${count} blocks) */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log("wrote", outPath, count, "blocks");
