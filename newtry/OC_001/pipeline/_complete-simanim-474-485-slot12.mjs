#!/usr/bin/env node
/** worker-slot-12 — simanim 474-485 editorial COMPLETE */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485];
const EXPECTED = {
  474: 21,
  475: 228,
  476: 59,
  477: 77,
  478: 42,
  479: 50,
  480: 47,
  481: 38,
  482: 38,
  483: 44,
  484: 42,
  485: 22,
};

function run(script, args = []) {
  const r = spawnSync(process.execPath, [path.join(__dirname, script), ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} (${EXPECTED[siman]} blocks) ########`);
  const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
  const legacy11 = path.join(__dirname, "work", `hand-slot11-siman-${siman}.json`);

  if (!fs.existsSync(handPath) || JSON.parse(fs.readFileSync(handPath, "utf8")).count === 0) {
    if (fs.existsSync(legacy11)) {
      fs.copyFileSync(legacy11, handPath);
      console.log("seeded hand from slot11", siman);
    } else {
      run("_export-he-slot12.mjs", [String(siman)]);
    }
  }

  const handBefore = JSON.parse(fs.readFileSync(handPath, "utf8"));
  if (handBefore.count !== EXPECTED[siman]) {
    console.warn(`warn: siman ${siman} hand count ${handBefore.count} != expected ${EXPECTED[siman]}`);
  }

  run("_translate-hand-batch.mjs", [String(siman)]);

  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const need = (hand.items || []).filter((it) => !it.en || !String(it.en).trim()).length;
  if (need) {
    console.error(`siman ${siman}: ${need} blocks still missing en after translate`);
    process.exit(1);
  }

  const pending = (() => {
    const r = spawnSync(
      process.execPath,
      [path.join(__dirname, "_audit-hand-slot12.mjs"), String(siman)],
      { cwd: OC_ROOT, encoding: "utf8" }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
    return JSON.parse(r.stdout);
  })();
  if (pending.need > 0) {
    console.error(`siman ${siman}: ${pending.need} blocks fail audit`);
    process.exit(1);
  }

  run("_hand-to-en-mjs.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot12-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot12.mjs", [
    String(siman),
    path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`),
  ]);
  const build = spawnSync(process.execPath, [path.join(__dirname, "_build-slot12-siman.mjs"), String(siman)], {
    cwd: OC_ROOT,
    encoding: "utf8",
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
  const built = (build.stdout || "").match(/(\d+) blocks in/);
  if (built && Number(built[1]) > 0) {
    let batch = 1;
    while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
      run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
      batch++;
    }
  } else {
    console.log(`siman ${siman}: skip apply (0 pending editorial blocks)`);
  }
  run("_complete-siman-slot12.mjs", [String(siman)]);
}

console.log("\n[COMPLETE] Session done — simanim: 474-485");
