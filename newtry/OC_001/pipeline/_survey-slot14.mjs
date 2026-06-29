#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { autoFix, preflightFail } from "./_slot14-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");

function run(script, args) {
  spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "pipe",
  });
}

for (const siman of simanim) {
  run("_export-he-slot14.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot14-from-en.mjs", [String(siman)]);
  run("_seed-hand-slot14-partial.mjs", [String(siman)]);
  run("_force-seed-hand-slot14.mjs", [String(siman)]);
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot14-siman-${siman}.json`), "utf8")
  );
  let need = 0;
  let ok = 0;
  for (const it of hand.items) {
    const en = it.en || autoFix(it.enBad || "", it.marker, it.he || "");
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({
      slug: it.slug,
      seif: it.seif,
      marker: it.marker,
      he: it.he,
      en,
    });
    if (pf || maxSeverity(issues) >= SEVERITY.warn) need++;
    else ok++;
  }
  console.log(JSON.stringify({ siman, total: hand.items.length, ok, need }));
}
