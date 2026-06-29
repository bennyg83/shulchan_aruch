#!/usr/bin/env node
/** Finish slot14 simanim: translate needs, build, apply, complete */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
if (!simanim.length) simanim.push(559, 560, 561, 562, 563);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of simanim) {
  console.log(`\n######## siman ${siman} ########`);
  run("_translate-need-slot14.mjs", [String(siman)]);
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
    console.error(`siman ${siman}: ${auditJson.need} still need after translate`);
    process.exit(1);
  }
  run("_preflight-fix-siman-slot14.mjs", [String(siman)]);
  run("_build-slot14-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot14.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot14.mjs`);
    batch++;
  }
  run("_complete-siman-slot14.mjs", [String(siman)]);
}

const logPath = path.join(OC_ROOT, "progress.log");
const line = `${new Date().toISOString().replace(/\.\d{3}Z$/, "Z")} worker-slot-14 SLOT COMPLETE simanim 529-563\n`;
fs.appendFileSync(logPath, line, "utf8");
console.log("\nappended", line.trim());
console.log("[COMPLETE] slot14 simanim:", simanim.join(", "));
