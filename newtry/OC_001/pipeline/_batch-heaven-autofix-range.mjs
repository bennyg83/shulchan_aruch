#!/usr/bin/env node
/** Run heaven MT + autofix for siman range. Usage: node _batch-heaven-autofix-range.mjs 161 180 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10);
const to = parseInt(process.argv[3], 10);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;

function countBad(siman) {
  const dir = simanOutputDir(path.join(ROOT, "output"), siman);
  if (!fs.existsSync(dir)) return { total: 0, bad: 0, missing: true };
  let total = 0,
    bad = 0;
  for (const slug of fs.readdirSync(dir)) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        if (isBadMt447(b.en)) bad++;
      }
    }
  }
  return { total, bad, missing: false };
}

for (let siman = from; siman <= to; siman++) {
  const before = countBad(siman);
  if (before.missing) {
    console.log(`siman_${siman}: SKIP (no output dir)`);
    continue;
  }
  spawnSync(node, [path.join("pipeline", "_mt-retranslate-heaven-siman.mjs"), String(siman)], {
    cwd: ROOT,
    stdio: "inherit",
  });
  spawnSync(node, [path.join("pipeline", "_autofix-bad-patterns-siman.mjs"), String(siman)], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const after = countBad(siman);
  console.log(`siman_${siman}: total=${after.total} bad_mt=${after.bad} (was ${before.bad})`);
}
