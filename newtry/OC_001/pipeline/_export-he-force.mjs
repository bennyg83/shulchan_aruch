#!/usr/bin/env node
/** Export ALL Hebrew blocks for a siman (ignore editorial-done-ids). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { simanPartFiles } from "./lib/editorial-queue.mjs";
import { hePlain, blockKey } from "./_slot12-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _export-he-force.mjs <siman>");

const items = [];
for (const absPath of simanPartFiles(OUT, siman)) {
  const rel = absPath.replace(OUT + path.sep, "").replace(/\\/g, "/");
  const relShort = rel.replace(/^siman_\d+\//, "");
  const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
  for (const b of blocks) {
    if (!String(b.he ?? "").trim()) continue;
    items.push({
      rel: relShort,
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
const outPath = path.join(WORK, `hand-slot12-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, items.length, "blocks");
