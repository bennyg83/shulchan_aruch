#!/usr/bin/env node
/** Run slot14 for 559-563; inject need-en BEFORE seed (gen-fixes must not wipe hand-need files). */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

const NEED_HAND = {
  559: "_hand559-need-en.mjs",
  560: "_hand560-need-en.mjs",
  561: "_hand561-need-en.mjs",
  562: "_hand562-need-en.mjs",
  563: "_hand563-need-en.mjs",
};

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function handPipeline(siman) {
  const need = path.join(__dirname, NEED_HAND[siman]);
  console.log(`\n######## siman ${siman} ########`);
  run("_export-he-slot14.mjs", [String(siman)]);
  run("_seed-hand-slot14-partial.mjs", [String(siman)]);
  if (fs.existsSync(need)) {
    const inj = spawnSync(
      process.execPath,
      [path.join(__dirname, "_inject-hand-en-slot14.mjs"), String(siman), need],
      { cwd: OC_ROOT, encoding: "utf8" }
    );
    if (inj.status !== 0) {
      console.error(inj.stdout || inj.stderr);
      process.exit(1);
    }
    console.log(inj.stdout?.trim());
  }
  run("_force-seed-hand-slot14.mjs", [String(siman)]);
  run("_fix-hand-preflight-slot14.mjs", [String(siman)]);
  const audit = spawnSync(
    process.execPath,
    [path.join(__dirname, "_audit-hand-slot14.mjs"), String(siman)],
    { cwd: OC_ROOT, encoding: "utf8" }
  );
  if (audit.status !== 0) {
    console.error(audit.stdout || audit.stderr);
    process.exit(1);
  }
  const auditJson = JSON.parse(audit.stdout);
  if (auditJson.need > 0) {
    console.error(`siman ${siman}: ${auditJson.need} hand blocks still need translation`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot14.mjs", [String(siman)]);
  run("_build-slot14-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot14.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot14.mjs`);
    batch++;
  }
  run("_checkpoint-remaining-slot14.mjs", [String(siman)]);
  run("_complete-siman-slot14.mjs", [String(siman)]);
}

for (const siman of [559, 560, 561, 562, 563]) {
  if (siman === 559) {
    const log = fs.readFileSync(path.join(OC_ROOT, "progress.log"), "utf8");
    if (log.includes("worker-slot-14 siman_559 COMPLETE")) {
      console.log("[skip] siman 559 already COMPLETE");
      continue;
    }
  }
  handPipeline(siman);
}
const logPath = path.join(OC_ROOT, "progress.log");
const slotLine = "worker-slot-14 SLOT COMPLETE simanim 529-563";
if (!fs.readFileSync(logPath, "utf8").includes(slotLine)) {
  fs.appendFileSync(logPath, `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} ${slotLine}\n`);
}
console.log("\n[DONE] simanim 559-563 slot14");
