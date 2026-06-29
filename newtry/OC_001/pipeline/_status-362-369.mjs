#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const WORK = path.join(__dirname, "work");
const done = loadEditorialDoneIds(WORK);

for (const siman of [362, 363, 364, 365, 366, 367, 368, 369]) {
  const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
  let total = 0;
  const base = path.join(OUT, `siman_${siman}`);
  if (!fs.existsSync(base)) {
    console.log("siman", siman, "MISSING");
    continue;
  }
  for (const slug of fs.readdirSync(base).filter((d) => fs.statSync(path.join(base, d)).isDirectory())) {
    for (const part of fs.readdirSync(path.join(base, slug)).filter((f) => /^part/.test(f))) {
      total += parseBlocksInFile(fs.readFileSync(path.join(base, slug, part), "utf8")).filter((b) =>
        String(b.he || "").trim()
      ).length;
    }
  }
  // count en.mjs files
  const enFiles = fs.readdirSync(__dirname).filter((f) => f.match(new RegExp(`${siman}-en\\.mjs$`)) || f.match(new RegExp(`${siman}-en\\.mjs$`)));
  const enCount = enFiles.length;
  console.log(`siman ${siman}: total=${total} pending=${pending.length} enFiles=${enCount}`);
}
