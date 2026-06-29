#!/usr/bin/env node
/** Retranslate bad_mt for siman range: build export if missing, MT, apply. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const from = parseInt(process.argv[2], 10) || 641;
const to = parseInt(process.argv[3], 10) || 670;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

for (let siman = from; siman <= to; siman++) {
  const exp = path.join(__dirname, `he${siman}-bad-export.json`);
  if (!fs.existsSync(exp)) {
    spawnSync(process.execPath, [path.join(__dirname, "_build-he-bad-export.mjs"), String(siman)], {
      stdio: "inherit",
    });
  }
  const n = Object.keys(JSON.parse(fs.readFileSync(exp, "utf8"))).length;
  if (!n) {
    console.log(`siman ${siman}: skip (0 bad)`);
    continue;
  }
  console.log(`\n=== MT siman ${siman} (${n} blocks) ===`);
  const r = spawnSync(process.execPath, [path.join(__dirname, "_mt-retranslate-bad-siman.mjs"), String(siman)], {
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
