#!/usr/bin/env node
/** Build _fixes-simanNNN-slot8.mjs from pipeline/*NNN-en.mjs slot2 translation maps */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { blockKey } from "./_slot8-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _gen-fixes-siman-slot8-from-en.mjs <siman>");

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
};

const OUT = path.join(__dirname, "..", "output", `siman_${siman}`);
const fixes = {};

function add(slug, seif, marker, en) {
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

const smallFp = path.join(__dirname, `small${siman}-en.mjs`);
if (fs.existsSync(smallFp)) {
  const { t } = await import(pathToFileURL(smallFp).href);
  for (const [k, v] of Object.entries(t)) {
    const i = k.indexOf(":");
    const slug = k.slice(0, i);
    const rest = k.slice(i + 1);
    const [seif, marker = "_"] = rest.split(":");
    add(slug, seif, marker, v);
  }
}

const outPath = path.join(__dirname, `_fixes-siman${siman}-slot8.mjs`);
const count = Object.values(fixes).reduce((n, m) => n + Object.keys(m).length, 0);
const body = `/** worker-slot-8 — siman ${siman} fixes from slot2 en maps (${count} blocks) */\nexport const FIXES = ${JSON.stringify(fixes, null, 2)};\n`;
fs.writeFileSync(outPath, body, "utf8");
console.log("wrote", outPath, count, "blocks");
