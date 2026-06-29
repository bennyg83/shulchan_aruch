#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const lo = Number(process.argv[2]);
const hi = Number(process.argv[3]);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (let siman = lo; siman <= hi; siman++) {
  const handPath = path.join(__dirname, "work", `hand-slot18-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    console.error("skip", siman, "no hand");
    continue;
  }
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const miss = hand.items.filter((x) => !x.en || String(x.en).trim().length < 8);
  if (miss.length) {
    console.error("siman", siman, "still missing", miss.length);
    process.exit(1);
  }
  console.log("\n######## finish siman", siman, "########");
  run("_build-slot18-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot18.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot18.mjs`);
    batch++;
  }
  run("_complete-siman-slot18.mjs", [String(siman)]);
}
