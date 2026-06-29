#!/usr/bin/env node
/** Export ALL Hebrew blocks for slot11 (ignore editorial done ids) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { hePlain, blockKey } from "./_slot11-lib.mjs";
import { walkOc001PartFiles, relFromOutRoot } from "./lib/blocks.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _export-he-slot11-all.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const pad = String(siman).padStart(3, "0");
const needle = `${path.sep}siman_${pad}${path.sep}`;
const items = [];

for (const absPath of walkOc001PartFiles(OUT)) {
  if (!absPath.includes(needle)) continue;
  const rel = relFromOutRoot(absPath, OUT).replace(/^siman_\d+\//, "");
  for (const b of parseBlocksInFile(fs.readFileSync(absPath, "utf8"))) {
    if (!String(b.he ?? "").trim()) continue;
    items.push({
      rel,
      key: blockKey(b.seif, b.marker),
      slug: b.slug,
      seif: b.seif,
      marker: b.marker || "_",
      he: b.he,
      hePlain: hePlain(b.he),
      enBad: String(b.en ?? "").trim(),
    });
  }
}

const outPath = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, items.length, "blocks");
