#!/usr/bin/env node
/** After MT run: post-patch each siman, rebuild remainders, log progress. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const from = parseInt(process.argv[2], 10) || 244;
const to = parseInt(process.argv[3], 10) || 299;
const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, "..");
const log = path.join(ROOT, "progress.log");
const ts = () => new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

for (let s = from; s <= to; s++) {
  spawnSync(process.execPath, [path.join(dir, "_post-mt-patch-range.mjs"), String(s), String(s)], {
    stdio: "inherit",
  });
  const r = spawnSync(process.execPath, [path.join(dir, "_count-bad-mt.mjs"), String(s)], {
    encoding: "utf8",
  });
  const m = (r.stdout || "").match(/bad_mt=(\d+)/);
  const bad = m ? Number(m[1]) : -1;
  if (bad === 0) {
    fs.appendFileSync(log, `${ts()} cursor bad_mt_fix siman_${s} bad_mt=0 verified\n`, "utf8");
    console.log(`siman_${s}: COMPLETE bad_mt=0`);
  } else {
    console.log(`siman_${s}: still bad_mt=${bad}`);
  }
}
