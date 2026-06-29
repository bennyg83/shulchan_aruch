#!/usr/bin/env node
/** Post-MT patch, verify bad_mt=0, log progress for simanim 386-509. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const from = parseInt(process.argv[2], 10) || 386;
const to = parseInt(process.argv[3], 10) || 509;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const patch = spawnSync(process.execPath, [path.join(__dirname, "_post-mt-patch-range.mjs"), String(from), String(to)], {
  encoding: "utf8",
  stdio: "inherit",
});

let anyBad = false;
for (let s = from; s <= to; s++) {
  const r = spawnSync(process.execPath, [path.join(__dirname, "_count-bad-mt.mjs"), String(s)], { encoding: "utf8" });
  const line = (r.stdout || "").trim();
  console.log(line);
  if (!line.includes("bad_mt=0")) anyBad = true;
}

const log = path.join(ROOT, "progress.log");
const ts = new Date().toISOString().slice(0, 19).replace("T", "T");
if (anyBad) {
  console.error("\nNOT ALL bad_mt=0 — see remainders JSON from post-mt-patch");
  process.exit(patch.status || 1);
}
for (let s = from; s <= to; s++) {
  fs.appendFileSync(log, `${ts} cursor bad_mt_fix siman_${s} bad_mt=0 verified\n`, "utf8");
}
fs.appendFileSync(log, `${ts} cursor bad_mt_fix simanim_${from}-${to} COMPLETE\n`, "utf8");
console.log(`\n[COMPLETE] simanim ${from}-${to} bad_mt=0 logged`);
