#!/usr/bin/env node
/** Build export + heaven MT + autofix for simanim with bad_mt > 0 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 } from "./lib/bad-mt-447.mjs";
import { simanOutputDir } from "./lib/siman-path.mjs";

const FROM = parseInt(process.argv[2], 10) || 244;
const TO = parseInt(process.argv[3], 10) || 299;
const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, "..");
const node = process.execPath;

function countBad(siman) {
  const d = simanOutputDir(path.join(ROOT, "output"), siman);
  if (!fs.existsSync(d)) return 0;
  let bad = 0;
  for (const slug of fs.readdirSync(d)) {
    const sd = path.join(d, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"))) {
        if (isBadMt447(b.en)) bad++;
      }
    }
  }
  return bad;
}

for (let siman = FROM; siman <= TO; siman++) {
  const before = countBad(siman);
  if (!before) continue;
  console.log(`\n=== siman ${siman} bad=${before} ===`);
  spawnSync(node, [path.join(dir, "_mt-retranslate-heaven-siman.mjs"), String(siman)], {
    cwd: ROOT,
    stdio: "inherit",
  });
  spawnSync(node, [path.join(dir, "_autofix-bad-patterns-siman.mjs"), String(siman)], {
    cwd: ROOT,
    stdio: "pipe",
  });
  const after = countBad(siman);
  if (after > 0) {
    spawnSync(node, [path.join(dir, "_build-he-bad-export.mjs"), String(siman)], {
      cwd: ROOT,
      stdio: "inherit",
    });
    spawnSync(node, [path.join(dir, "_mt-retranslate-bad-siman.mjs"), String(siman)], {
      cwd: ROOT,
      stdio: "inherit",
    });
    spawnSync(node, [path.join(dir, "_autofix-bad-patterns-siman.mjs"), String(siman)], {
      cwd: ROOT,
      stdio: "pipe",
    });
  }
  console.log(`siman_${siman}: ${countBad(siman)} bad (was ${before})`);
}

let total = 0;
for (let s = FROM; s <= TO; s++) total += countBad(s);
console.log(`\nRANGE ${FROM}-${TO} total_bad_mt=${total}`);
process.exit(total > 0 ? 2 : 0);
