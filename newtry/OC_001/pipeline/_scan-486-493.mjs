#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";
import { preflightFail } from "./_slot12-lib.mjs";
import { runBlockQualityChecks } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "output");
const FAIL_RE =
  /Gloss:|GLOSS:|Lord's Prayer|Hashem's Word|Hashem's promise|Saturday|her age|the craft|Shield of Abraham|first dish|allocated|hand recoils|Pmig|Aboriginally|follicles|Capernaum/i;

for (const siman of [486, 487, 488, 489, 490, 491, 492, 493]) {
  let total = 0,
    pf = 0,
    qerr = 0,
    fail = 0;
  const dir = path.join(OUT, `siman_${siman}`);
  for (const slug of fs.readdirSync(dir)) {
    const sd = path.join(dir, slug);
    if (!fs.statSync(sd).isDirectory()) continue;
    for (const f of fs.readdirSync(sd).filter((x) => x.endsWith(".txt"))) {
      const blocks = parseBlocksInFile(fs.readFileSync(path.join(sd, f), "utf8"));
      total += blocks.length;
      for (const b of blocks) {
        if (preflightFail(b.en)) pf++;
        const issues = runBlockQualityChecks(b);
        if (issues.some((i) => i.severity === "error")) qerr++;
        if (FAIL_RE.test(b.en || "")) fail++;
      }
    }
  }
  console.log(`siman_${siman}: blocks=${total} preflight=${pf} qerr=${qerr} fail_re=${fail}`);
}
