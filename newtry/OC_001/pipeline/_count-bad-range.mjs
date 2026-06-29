#!/usr/bin/env node
import fs from "fs";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { simanOutputDir } from "./lib/siman-path.mjs";

const from = parseInt(process.argv[2], 10) || 641;
const to = parseInt(process.argv[3], 10) || 670;
const dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(dir, "..");
const OUT = path.join(ROOT, "output");
let totalBad = 0;
for (let s = from; s <= to; s++) {
  if (!fs.existsSync(simanOutputDir(OUT, s))) {
    console.log(`siman_${s}: (no output folder)`);
    continue;
  }
  const r = spawnSync(process.execPath, [path.join(dir, "_count-bad-mt.mjs"), String(s)], {
    encoding: "utf8",
  });
  const line = (r.stdout || "").trim();
  const m = line.match(/bad_mt=(\d+)/);
  if (m) totalBad += Number(m[1]);
  console.log(line);
}
console.log(`RANGE ${from}-${to} total_bad_mt=${totalBad}`);
