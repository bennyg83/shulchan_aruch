#!/usr/bin/env node
/** Export only bad-MT blocks to hand-slot12-siman-NNN.json for retranslation. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";
import { hePlain, blockKey } from "./_slot12-lib.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _export-bad-hand.mjs <siman>");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");
const dir = path.join(OUT, `siman_${siman}`);

const items = [];
for (const slug of fs.readdirSync(dir).sort()) {
  const d = path.join(dir, slug);
  if (!fs.statSync(d).isDirectory()) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
    const rel = `${slug}/${f}`;
    const blocks = parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"));
    for (const b of blocks) {
      if (!isBad(b.en)) continue;
      items.push({
        rel,
        key: blockKey(b.seif, b.marker),
        slug: b.slug,
        seif: b.seif,
        marker: b.marker || "_",
        he: b.he ?? "",
        hePlain: hePlain(b.he ?? ""),
        enBad: String(b.en ?? "").trim(),
        en: null,
      });
    }
  }
}

const outPath = path.join(WORK, `hand-slot12-siman-${siman}.json`);
fs.writeFileSync(
  outPath,
  JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n",
  "utf8"
);
console.log("wrote", outPath, items.length, "bad blocks");
