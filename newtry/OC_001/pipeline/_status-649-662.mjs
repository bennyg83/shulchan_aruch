#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles } from "./lib/blocks.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");
const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
const done = loadEditorialDoneIds(WORK);

for (let s = 649; s <= 662; s++) {
  const pad = String(s).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  let blocks = 0;
  for (const abs of walkOc001PartFiles(OUT)) {
    if (!abs.includes(needle)) continue;
    blocks += parseBlocksInFile(fs.readFileSync(abs, "utf8")).filter((b) =>
      String(b.he ?? "").trim()
    ).length;
  }
  const handPath = path.join(WORK, `hand-slot17-siman-${s}.json`);
  const hi = fs.existsSync(handPath)
    ? JSON.parse(fs.readFileSync(handPath, "utf8")).items.length
    : 0;
  const pending = collectEditorialBlocks(OUT, s, "all", "warn", done).length;
  const logged = /worker-slot-17 siman_\d+ COMPLETE/.test(
    log.split("\n").filter((l) => l.includes(`siman_${s} COMPLETE`) && l.includes("worker-slot-17")).pop() || ""
  );
  console.log(
    JSON.stringify({ siman: s, blocks, handItems: hi, pending, workerLog: logged })
  );
}
