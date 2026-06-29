#!/usr/bin/env node
/** Full pipeline COMPLETE for worker-slot-12 simanim 486-493 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [486, 487, 488, 489, 490, 491, 492, 493];
const EXPECTED = {
  486: 22,
  487: 99,
  488: 67,
  489: 271,
  490: 139,
  491: 27,
  492: 31,
  493: 112,
};

function run(script, args = []) {
  const fp = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [fp, ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
    env: { ...process.env, SLOT: "slot12" },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} (${EXPECTED[siman]} blocks) ########`);
  const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
  if (!fs.existsSync(handPath)) {
    run("_export-he-slot12.mjs", [String(siman)]);
  }
  run("_translate-hand-batch.mjs", [String(siman)]);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const need = (hand.items || []).filter((it) => !it.en || !String(it.en).trim()).length;
  if (need) {
    console.error(`siman ${siman}: ${need} blocks still missing en after translate`);
    process.exit(1);
  }
  run("_hand-to-en-mjs.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot12-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot12.mjs", [
    String(siman),
    path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`),
  ]);
  run("_build-slot12-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
    batch++;
  }
  run("_complete-siman-slot12.mjs", [String(siman)]);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
fs.appendFileSync(
  path.join(OC_ROOT, "progress.log"),
  `${ts} worker-slot-12 SLOT COMPLETE simanim 459-493\n`,
  "utf8"
);
console.log("\n[COMPLETE] Session done — simanim: 486-493");
