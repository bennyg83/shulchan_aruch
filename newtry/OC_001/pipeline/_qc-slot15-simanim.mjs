#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { runBlockQualityChecks, maxSeverity } from "./lib/quality-checks.mjs";

const simanim = [577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588];
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "output");

for (const s of simanim) {
  const tag = String(s).padStart(3, "0");
  const root = path.join(OUT, `siman_${tag}`);
  let total = 0,
    warn = 0,
    err = 0;
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".txt")) {
        const blocks = parseBlocksInFile(fs.readFileSync(p, "utf8"));
        for (const b of blocks) {
          total++;
          const sev = maxSeverity(runBlockQualityChecks(b));
          if (sev === "error") err++;
          else if (sev === "warn") warn++;
        }
      }
    }
  }
  if (fs.existsSync(root)) walk(root);
  console.log(`${s}\ttotal=${total}\twarn=${warn}\terror=${err}`);
}
