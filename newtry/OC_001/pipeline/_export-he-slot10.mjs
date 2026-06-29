#!/usr/bin/env node
/** Export Hebrew blocks for slot10 hand translation: work/hand-slot10-siman-NNN.json */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { hePlain, blockKey } from "./_slot10-lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");

const siman = parseInt(process.argv[2], 10);
if (!siman) throw new Error("Usage: _export-he-slot10.mjs <siman>");

const done = loadEditorialDoneIds(WORK);
const blocks = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const items = [];
for (const it of blocks) {
  const rel = it.file.replace(/^siman_\d+\//, "");
  const parsed = parseBlocksInFile(fs.readFileSync(path.join(OUT, it.file), "utf8"));
  const b = parsed.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  items.push({
    rel,
    key: blockKey(it.seif, it.marker),
    slug: it.slug,
    seif: it.seif,
    marker: it.marker || "_",
    he: b?.he ?? "",
    hePlain: hePlain(b?.he ?? ""),
    enBad: String(b?.en ?? "").trim(),
  });
}
const outPath = path.join(WORK, `hand-slot10-siman-${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify({ siman, count: items.length, items }, null, 2) + "\n", "utf8");
console.log("wrote", outPath, items.length, "blocks");
