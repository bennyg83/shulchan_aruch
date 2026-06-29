#!/usr/bin/env node
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { plainFromHtml } from "./lib/quality-checks.mjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "output");
const work = path.join(__dirname, "work");
const done = loadEditorialDoneIds(work);

const GARBAGE =
  /Capernaum|Lord's Prayer|Hashem's Word|QUERY LENGTH|the rest of the hole|\.{10,}|Holy Spirit|excavat|Borsky|near the host\b|in me\b|p\.d\./i;

for (const s of [227, 228, 229, 230, 231, 232]) {
  const all = collectEditorialBlocks(out, s, "all", "warn", done);
  let garb = 0;
  for (const it of all) {
    const fp = path.join(out, it.file);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const b = blocks.find(
      (x) =>
        String(x.seif) === String(it.seif) &&
        String(x.marker || "_") === String(it.marker || "_")
    );
    if (GARBAGE.test(b?.en || "")) {
      garb++;
      console.log("GARB", s, it.slug, it.seif, it.marker || "_");
    }
  }
  console.log("siman", s, "total", all.length, "garbage", garb);
}
