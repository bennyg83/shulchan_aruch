#!/usr/bin/env node
/** Force retranslate simanim 486-493: export, claude translate, inject, apply, validate. */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const SIMANIM = [486, 487, 488, 489, 490, 491, 492, 493];

function run(script, args = []) {
  const fp = path.join(__dirname, script);
  const r = spawnSync(process.execPath, [fp, ...args], {
    cwd: OC_ROOT,
    stdio: "inherit",
    env: { ...process.env, SLOT: "slot12" },
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// Purge editorial-done for these simanim
const donePath = path.join(__dirname, "work", "editorial-done-ids.txt");
if (fs.existsSync(donePath)) {
  const lines = fs.readFileSync(donePath, "utf8").split(/\r?\n/);
  const keep = lines.filter((l) => !SIMANIM.some((s) => l.includes(`siman_${String(s).padStart(3, "0")}/`)));
  fs.writeFileSync(donePath, keep.filter(Boolean).join("\n") + (keep.length ? "\n" : ""), "utf8");
  console.log("purged editorial-done for", SIMANIM.join(","));
}

for (const siman of SIMANIM) {
  console.log(`\n######## siman ${siman} ########`);
  run("_export-he-force.mjs", [String(siman)]);
  if (siman === 489) {
    run("_translate-mech-small-489.mjs");
  } else {
    run("_translate-hand-batch-stdin.mjs", [String(siman)]);
  }
  const handPath = path.join(__dirname, "work", `hand-slot12-siman-${siman}.json`);
  const hand = JSON.parse(fs.readFileSync(handPath, "utf8"));
  const need = (hand.items || []).filter((it) => !it.en || !String(it.en).trim()).length;
  if (need) {
    console.error(`siman ${siman}: ${need} blocks still missing en`);
    process.exit(1);
  }
  run("_hand-to-en-mjs.mjs", [String(siman)]);
  run("_gen-fixes-siman-slot12-from-en.mjs", [String(siman)]);
  run("_inject-hand-en-slot12.mjs", [
    String(siman),
    path.join(__dirname, `_fixes-siman${siman}-slot12.mjs`),
  ]);
  // Remove old batch apply scripts
  for (const f of fs.readdirSync(__dirname)) {
    if (f.match(new RegExp(`^_apply-siman${siman}-batch`)) || f.match(new RegExp(`^_siman${siman}-slot12-batch`))) {
      fs.unlinkSync(path.join(__dirname, f));
    }
  }
  run("_build-slot12-siman.mjs", [String(siman)]);
  let batch = 1;
  while (fs.existsSync(path.join(__dirname, `_apply-siman${siman}-batch${batch}-slot12.mjs`))) {
    run(`_apply-siman${siman}-batch${batch}-slot12.mjs`);
    batch++;
  }
  run("_complete-siman-slot12.mjs", [String(siman)]);
}

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
for (const siman of SIMANIM) {
  fs.appendFileSync(path.join(OC_ROOT, "progress.log"), `${ts} worker-slot-12 siman_${siman} COMPLETE\n`, "utf8");
}
console.log("\n[COMPLETE] Session done — simanim: 486-493");
