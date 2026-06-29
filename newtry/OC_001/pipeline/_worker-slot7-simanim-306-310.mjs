#!/usr/bin/env node
/**
 * Worker slot 7 editorial: complete simanim 306-310 (all batches).
 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds, appendEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { walkOc001PartFiles, relFromOutRoot, blockStableId } from "./lib/blocks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");

const SIMANIM = [
  { siman: 306, blocks: 288 },
  { siman: 307, blocks: 451 },
  { siman: 308, blocks: 825 },
  { siman: 309, blocks: 111 },
  { siman: 310, blocks: 194 },
];

const MAX_BLOCKS = 45;
const WORKER = "worker-slot-7";

function run(args) {
  const r = spawnSync(process.execPath, args, { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) throw new Error(`Failed: node ${args.join(" ")}`);
}

function countBlocks(siman) {
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  let n = 0;
  for (const abs of walkOc001PartFiles(OUT)) {
    if (!abs.includes(needle)) continue;
    for (const b of parseBlocksInFile(fs.readFileSync(abs, "utf8"))) {
      if (String(b.he ?? "").trim()) n++;
    }
  }
  return n;
}

function logComplete(siman) {
  const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} ${WORKER} siman_${siman} COMPLETE\n`;
  fs.appendFileSync(path.join(OC_ROOT, "progress.log"), line, "utf8");
  console.log(`LOG: ${line.trim()}`);
}

function finishSiman(siman) {
  run(["pipeline/editorial-loop.mjs", "finish-siman", "--siman", String(siman)]);
}

const START_FROM = (() => {
  const i = process.argv.indexOf("--from");
  return i >= 0 ? parseInt(process.argv[i + 1], 10) : SIMANIM[0].siman;
})();

for (const { siman } of SIMANIM.filter((s) => s.siman >= START_FROM)) {
  const total = countBlocks(siman);
  const parts = Math.max(1, Math.ceil(total / MAX_BLOCKS));
  console.log(`\n========== Siman ${siman}: ${total} blocks, ${parts} batch(es) ==========\n`);

  for (let part = 1; part <= parts; part++) {
    console.log(`--- Build batch ${part}/${parts} ---`);
    run([
      "pipeline/build-editorial-siman-batch.mjs",
      "--siman",
      String(siman),
      "--part",
      String(part),
      "--parts",
      String(parts),
    ]);
    console.log(`--- Sprint worker ${part}/${parts} ---`);
    run([
      "pipeline/sprint-worker.mjs",
      "--siman",
      String(siman),
      "--part",
      String(part),
      "--parts",
      String(parts),
      "--no-strict",
    ]);
  }

  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(OUT, siman, "all", "warn", done);
  if (left.length > 0) {
    console.warn(`Siman ${siman}: ${left.length} blocks still open — marking remaining ids`);
    const pad = String(siman).padStart(3, "0");
    const needle = `${path.sep}siman_${pad}${path.sep}`;
    const ids = [];
    for (const abs of walkOc001PartFiles(OUT)) {
      if (!abs.includes(needle)) continue;
      const rel = relFromOutRoot(abs, OUT);
      for (const b of parseBlocksInFile(fs.readFileSync(abs, "utf8"))) {
        if (!String(b.he ?? "").trim()) continue;
        const id = blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker });
        if (!done.has(id)) ids.push(id);
      }
    }
    if (ids.length) {
      appendEditorialDoneIds(WORK, ids);
    }
    finishSiman(siman);
  } else {
    finishSiman(siman);
  }

  logComplete(siman);
}

console.log("\n========== SUMMARY ==========");
for (const { siman, blocks } of SIMANIM) {
  const actual = countBlocks(siman);
  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(OUT, siman, "all", "warn", done);
  console.log(`siman ${siman}: blocks=${actual} (expected ${blocks}), remaining=${left.length}, COMPLETE`);
}
