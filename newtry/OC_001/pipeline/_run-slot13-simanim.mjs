#!/usr/bin/env node
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const manualPath = process.argv.find((a) => a.endsWith(".mjs") && a.includes("manual"));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const results = [];
for (const siman of simanim) {
  console.log(`\n========== siman ${siman} ==========`);
  try {
    run("_export-he-slot13.mjs", [String(siman)]);
    run("_seed-hand-slot13-partial.mjs", [String(siman)]);
    const handEn = path.join(__dirname, `_hand${siman}-en.mjs`);
    if (fs.existsSync(handEn)) run("_inject-hand-en-slot13.mjs", [String(siman), handEn]);
    if (manualPath && fs.existsSync(path.resolve(manualPath))) {
      run("_inject-slot13-manual.mjs", [String(siman), path.resolve(manualPath)]);
    }
    run("_force-seed-hand-slot13.mjs", [String(siman)]);
    const audit = spawnSync(
      process.execPath,
      [path.join(__dirname, "_audit-hand-slot13.mjs"), String(siman)],
      { cwd: OC_ROOT, encoding: "utf8" }
    );
    if (audit.status !== 0) {
      console.error(audit.stdout || audit.stderr);
      results.push({ siman, status: "audit_fail" });
      continue;
    }
    const auditJson = JSON.parse(audit.stdout);
    if (auditJson.need > 0) {
      results.push({ siman, status: "need_hand", need: auditJson.need });
      continue;
    }
    run("_preflight-fix-siman-slot13.mjs", [String(siman)]);
    run("_build-slot13-siman.mjs", [String(siman)]);
    let batch = 1;
    while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot13.mjs`))) {
      run(`_apply-siman${siman}-batch${batch}-slot13.mjs`);
      batch++;
    }
    run("_checkpoint-remaining-slot13.mjs", [String(siman)]);
    run("_complete-siman-slot13.mjs", [String(siman)]);
    const hand = JSON.parse(
      fs.readFileSync(path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`), "utf8")
    );
    results.push({ siman, status: "COMPLETE", blocks: hand.count || hand.items?.length });
  } catch (e) {
    results.push({ siman, status: "error", msg: String(e) });
  }
}
console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(results, null, 2));
