#!/usr/bin/env node
/** Preflight all simanim: export, gen-fixes, seed-partial, report need counts */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const simanim = process.argv.slice(2).map(Number).filter(Boolean);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

function run(script, args) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  return r;
}

const rows = [];
for (const siman of simanim) {
  run("_export-he-slot13.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot13-from-en.mjs", [String(siman)]);
  const fixes = path.join(__dirname, `_fixes-siman${siman}-slot13.mjs`);
  if (fs.existsSync(fixes)) run("_inject-hand-en-slot13.mjs", [String(siman), fixes]);
  run("_force-seed-hand-slot13.mjs", [String(siman)]);
  const seed = run("_seed-hand-slot13-partial.mjs", [String(siman)]);
  const hand = JSON.parse(
    fs.readFileSync(path.join(__dirname, "work", `hand-slot13-siman-${siman}.json`), "utf8")
  );
  const seeded = hand.items.filter((x) => x.en).length;
  const audit = run("_audit-hand-slot13.mjs", [String(siman)]);
  let need = 0;
  try {
    need = JSON.parse(audit.stdout).need;
  } catch {
    need = -1;
  }
  rows.push({ siman, blocks: hand.count, seeded, need });
  console.log(`siman ${siman}: ${hand.count} blocks, seeded=${seeded}, need=${need}`);
}
console.log("\n--- summary ---");
console.table(rows);
