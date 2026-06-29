#!/usr/bin/env node
/** Audit *NNN-en.mjs coverage vs output blocks */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { blockKey } from "./_slot8-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

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
};

async function collectEnKeys(siman) {
  const keys = new Set();
  for (const [prefix, slug] of Object.entries(PREFIX)) {
    const fp = path.join(__dirname, `${prefix}${siman}-en.mjs`);
    if (!fs.existsSync(fp)) continue;
    const { t } = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    for (const [k, v] of Object.entries(t)) {
      if (v && String(v).trim()) keys.add(`${slug}:${k}`);
    }
  }
  for (const name of [`small${siman}-en.mjs`, `_small${siman}-translations.mjs`]) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) continue;
    const mod = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    const t = mod.t || mod.tSmall || mod.SMALL || {};
    for (const [k, v] of Object.entries(t)) {
      if (v && String(v).trim()) keys.add(k.includes(":") ? k : k);
    }
  }
  return keys;
}

function collectOutputKeys(siman) {
  const keys = new Set();
  const base = path.join(OUT, `siman_${siman}`);
  for (const slug of fs.readdirSync(base).filter((d) => fs.statSync(path.join(base, d)).isDirectory())) {
    for (const part of fs.readdirSync(path.join(base, slug)).filter((f) => /^part/.test(f))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(base, slug, part), "utf8"))) {
        if (!String(b.he || "").trim()) continue;
        keys.add(`${b.slug}:${blockKey(b.seif, b.marker)}`);
      }
    }
  }
  return keys;
}

for (const siman of [362, 363, 364, 365, 366, 367, 368, 369]) {
  const outKeys = collectOutputKeys(siman);
  const enKeys = await collectEnKeys(siman);
  let covered = 0;
  for (const k of outKeys) if (enKeys.has(k)) covered++;
  console.log(`siman ${siman}: blocks=${outKeys.size} enKeys=${enKeys.size} covered=${covered} missing=${outKeys.size - covered}`);
}
