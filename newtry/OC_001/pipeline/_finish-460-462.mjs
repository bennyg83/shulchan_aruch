#!/usr/bin/env node
/** Complete simanim 460-462 only */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { OVERRIDES } from "./_manual-overrides-459-462.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [460, 461, 462];

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  const blocks = OVERRIDES[String(siman)];
  if (!blocks) continue;
  const handPath = path.join(__dirname, "work", "hand-slot11-siman-" + siman + ".json");
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  let n = 0;
  for (const it of hand.items) {
    const marker = it.marker === "main" ? "main" : it.marker || "_";
    const key = it.slug + ":" + it.seif + ":" + marker;
    if (blocks[key]) {
      it.en = blocks[key];
      n++;
    }
  }
  fs.writeFileSync(handPath, JSON.stringify(hand, null, 2) + "\n", "utf8");
  console.log("siman " + siman + ": overrides applied " + n);
}

for (const siman of SIMANIM) {
  console.log("\n######## siman " + siman + " pipeline ########");
  run("_refresh-editorial-queue.mjs", [String(siman)]);
  run("_export-hand-en-to-mjs.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot11-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot11.mjs", [
    String(siman),
    path.join(__dirname, "_fixes-siman" + siman + "-slot11.mjs"),
  ]);
  run("_build-slot11-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, "_apply-siman" + siman + "-batch" + batch + "-slot11.mjs"))) {
    run("_apply-siman" + siman + "-batch" + batch + "-slot11.mjs");
    batch++;
  }
  run("_complete-siman-slot11.mjs", [String(siman)]);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(
  path.join(OC_ROOT, "progress.log"),
  ts + " cursor-agent simanim 460-462 COMPLETE\n",
  "utf8"
);
console.log("\n[COMPLETE] simanim 460, 461, 462");
