#!/usr/bin/env node
/** Slot3: verify bad_mt=0 and append progress.log for simanim 550,552,553,555,557,558,559,560 */
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { isBadMt447 as isBad } from "./lib/bad-mt-447.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");

function run(script, args = []) {
  const full = path.join(__dirname, script);
  console.log(`\n>> node pipeline/${script} ${args.join(" ")}`);
  const r = spawnSync(process.execPath, [full, ...args], { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const SIMANIM = [550, 552, 553, 555, 557, 558, 559, 560];

// Fixes already applied via pipeline/work/hand-en-550-560.json

for (const n of SIMANIM) {
  const pad = String(n).padStart(3, "0");
  let total = 0;
  let bad = 0;
  const dir = path.join(OC_ROOT, "output", `siman_${pad}`);
  for (const slug of fs.readdirSync(dir).sort()) {
    const d = path.join(dir, slug);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const f of fs.readdirSync(d).filter((x) => x.endsWith(".txt")).sort()) {
      for (const b of parseBlocksInFile(fs.readFileSync(path.join(d, f), "utf8"))) {
        total++;
        if (isBad(b.en)) bad++;
      }
    }
  }
  console.log(`\nVERIFY siman_${pad}: total=${total} bad_mt=${bad}`);
  if (bad > 0) {
    console.error(`siman ${n}: bad_mt not zero`);
    process.exit(1);
  }

  const logPath = path.join(OC_ROOT, "progress.log");
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  const line = `${ts} worker-slot-3 siman_${pad} bad_mt=0 apply-pipeline COMPLETE\n`;
  fs.appendFileSync(logPath, line);
  console.log(`[COMPLETE] Siman ${n} — ${total} blocks, bad_mt=0`);
}

console.log("\n[COMPLETE] Session done — simanim: 550, 552, 553, 555, 557, 558, 559, 560");
