#!/usr/bin/env node
/** Extract pending editorial blocks for a siman → JSON for translation */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _extract-editorial-blocks.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const outRoot = path.join(OC_ROOT, "output");
const workDir = path.join(__dirname, "work");
const done = loadEditorialDoneIds(workDir);
const items = collectEditorialBlocks(outRoot, siman, "all", "warn", done);
const pad = String(siman).padStart(3, "0");
const byFile = {};

for (const it of items) {
  const fp = path.join(outRoot, it.file);
  const rel = it.file.replace(new RegExp(`^siman_${pad}/`), "");
  if (!byFile[rel]) byFile[rel] = {};
  const raw = fs.readFileSync(fp, "utf8");
  const blocks = parseBlocksInFile(raw);
  const b = blocks.find(
    (x) =>
      String(x.seif) === String(it.seif) &&
      String(x.marker || "_") === String(it.marker || "_")
  );
  if (!b) {
    console.error("missing block", it.id);
    continue;
  }
  const key = `${b.seif}:${b.marker || "_"}`;
  byFile[rel][key] = plainFromHtml(b.he || "");
}

const outPath = path.join(__dirname, `_extract-siman${siman}.json`);
fs.writeFileSync(outPath, JSON.stringify(byFile, null, 2), "utf8");
const n = Object.values(byFile).reduce((a, o) => a + Object.keys(o).length, 0);
console.log("wrote", outPath, "files", Object.keys(byFile).length, "blocks", n);
