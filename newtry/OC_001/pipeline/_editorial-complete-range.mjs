#!/usr/bin/env node
/**
 * Build + advance all editorial batches for simanim in a range (--ignore-done).
 * Usage: node pipeline/_editorial-complete-range.mjs --from 4 --to 20 --max-blocks 40
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function parseArgs() {
  let from = 1;
  let to = 1;
  let maxBlocks = 40;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
  }
  return { from, to, maxBlocks };
}

function blockCount(siman) {
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  let n = 0;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      n += parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8")).length;
    }
  }
  return n;
}

function run(args) {
  const r = spawnSync(process.execPath, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    process.exit(r.status ?? 1);
  }
  return r.stdout;
}

const { from, to, maxBlocks } = parseArgs();

for (let siman = from; siman <= to; siman++) {
  const total = blockCount(siman);
  const parts = Math.max(1, Math.ceil(total / maxBlocks));
  const tag = String(siman).padStart(3, "0");
  console.log(`\n=== Siman ${siman}: ${total} blocks, ${parts} part(s) ===`);

  for (let part = 1; part <= parts; part++) {
    const buildOut = run([
      path.join("pipeline", "build-editorial-siman-batch.mjs"),
      "--siman",
      String(siman),
      "--part",
      String(part),
      "--parts",
      String(parts),
      "--max-blocks",
      String(maxBlocks),
      "--scope",
      "all",
      "--ignore-done",
    ]);
    const m = buildOut.match(/(\d+) block\(s\) in batch/);
    const batchN = m ? parseInt(m[1], 10) : 0;
    if (!batchN) {
      console.log(`  part ${part}/${parts}: empty — skip`);
      continue;
    }

    const queue =
      parts > 1
        ? `pipeline/work/editorial-queue-siman-${tag}-part${part}of${parts}.json`
        : `pipeline/work/editorial-queue-siman-${tag}.json`;
    const advArgs = [
      path.join("pipeline", "editorial-advance.mjs"),
      "--siman",
      String(siman),
      "--queue",
      queue,
      "--skip-dictionary",
    ];
    if (part === parts) advArgs.push("--mark-siman-complete");
    run(advArgs);
    console.log(`  part ${part}/${parts}: advanced ${batchN} blocks`);
  }

  const countOut = run([path.join("pipeline", "_count-bad-mt.mjs"), String(siman)]);
  console.log(`  ${countOut.trim()}`);
}

console.log("\nDone.");
