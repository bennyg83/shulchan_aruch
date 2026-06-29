#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
let anyBad = false;
for (let s = 671; s <= 697; s++) {
  const r = spawnSync(process.execPath, ["pipeline/_count-bad-mt.mjs", String(s)], {
    cwd: ROOT,
    encoding: "utf8",
  });
  const line = (r.stdout || "").trim();
  console.log(line);
  if (!line.includes("bad_mt=0")) anyBad = true;
}
if (anyBad) {
  console.error("NOT ALL bad_mt=0");
  process.exit(1);
}
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const log = path.join(ROOT, "progress.log");
for (let s = 671; s <= 697; s++) {
  fs.appendFileSync(log, `${ts} cursor bad_mt_fix siman_${s} bad_mt=0 verified\n`, "utf8");
}
fs.appendFileSync(log, `${ts} cursor bad_mt_fix simanim_671-697 COMPLETE\n`, "utf8");
console.log("\n[COMPLETE] simanim 671-697 bad_mt=0 logged");
