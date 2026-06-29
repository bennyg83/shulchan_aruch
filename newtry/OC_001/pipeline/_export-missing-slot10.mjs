#!/usr/bin/env node
/** Export missing Hebrew blocks for hand translation */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { blockKey, hePlain } from "./_slot10-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");

const PREFIX = {
  mech: "mechaber", bh: "baer-heitev", taz: "turei-zahav", beer: "beer-hagolah",
  gra: "beur-hagra", biur: "biur-halacha", mb: "mishnah-berurah", mh: "machatzit-hashekel",
  ma: "magen-avraham", er: "eliyah-rabbah", kaf: "kaf-hachayyim", ls: "levushei-serad",
  pm: "peri-megadim", cs: "chatam-sofer", netiv: "netiv-chayim", dag: "dagul-merevavah",
};

async function loadEn(siman) {
  const m = {};
  for (const [prefix, slug] of Object.entries(PREFIX)) {
    const fp = path.join(__dirname, `${prefix}${siman}-en.mjs`);
    if (!fs.existsSync(fp)) continue;
    const { t } = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    for (const [k, v] of Object.entries(t)) if (v?.trim()) m[`${slug}:${k}`] = v;
  }
  for (const name of [`small${siman}-en.mjs`, `_small${siman}-translations.mjs`]) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) continue;
    const mod = await import(pathToFileURL(fp).href + "?v=" + Date.now());
    const t = mod.t || mod.tSmall || mod.SMALL || {};
    for (const [k, v] of Object.entries(t)) if (v?.trim()) m[k.includes(":") ? k : k] = v;
  }
  // batch data files
  for (const fp of fs.readdirSync(__dirname).filter((f) => f.match(new RegExp(`363-batch.*-data\\.mjs$`)))) {
    const mod = await import(pathToFileURL(path.join(__dirname, fp)).href + "?v=" + Date.now());
    for (const [k, v] of Object.entries(mod.MECH || {})) if (v?.trim()) m[`mechaber:${k}`] = v;
    for (const [k, v] of Object.entries(mod.SMALL || {})) if (v?.trim()) m[k] = v;
  }
  return m;
}

const siman = parseInt(process.argv[2], 10);
const en = await loadEn(siman);
const missing = [];
const base = path.join(OUT, `siman_${siman}`);
for (const slug of fs.readdirSync(base).filter((d) => fs.statSync(path.join(base, d)).isDirectory())) {
  for (const part of fs.readdirSync(path.join(base, slug)).filter((f) => /^part/.test(f)).sort()) {
    const rel = `${slug}/${part}`;
    for (const b of parseBlocksInFile(fs.readFileSync(path.join(base, slug, part), "utf8"))) {
      if (!String(b.he || "").trim()) continue;
      const key = `${b.slug}:${blockKey(b.seif, b.marker)}`;
      if (!en[key]) {
        missing.push({ rel, key, slug: b.slug, seif: b.seif, marker: b.marker || "_", he: b.he, hePlain: hePlain(b.he) });
      }
    }
  }
}
const outPath = path.join(__dirname, "work", `missing-slot10-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: missing.length, items: missing }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, missing.length, "missing");
