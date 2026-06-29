#!/usr/bin/env node
/** Apply autoFix to all editorial-pending blocks for one siman (worker-slot-11) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { autoFix, preflightFail } from "./_slot11-lib.mjs";
import { runBlockQualityChecks, maxSeverity, SEVERITY } from "./lib/quality-checks.mjs";

const siman = parseInt(process.argv[2], 10);
if (!siman) {
  console.error("usage: node _apply-pending-autofix-slot11.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const OUT = path.join(OC_ROOT, "output");
const WORK = path.join(__dirname, "work");

const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const byFile = new Map();

for (const it of pending) {
  if (!byFile.has(it.file)) byFile.set(it.file, new Set());
  byFile.get(it.file).add(`${it.seif}:${it.marker || "_"}`);
}

let applied = 0;
const fails = [];

for (const [file, keys] of byFile) {
  const fp = path.join(OUT, file);
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks.map((b) => {
    const key = `${b.seif}:${b.marker || "_"}`;
    if (!keys.has(key)) return b;
    const en = autoFix(b.en, b.marker, b.he);
    const pf = preflightFail(en);
    const issues = runBlockQualityChecks({ ...b, en });
    const sev = maxSeverity(issues);
    if (pf || sev >= SEVERITY.warn) {
      fails.push({ file, key, pf, issues: issues.map((i) => i.code) });
      return b;
    }
    applied++;
    return { ...b, en };
  });
  fs.writeFileSync(fp, out.map(serializeBlock).join("\n\n") + "\n", "utf8");
}

console.log("siman", siman, "applied", applied, "pending", pending.length);
if (fails.length) {
  console.error("FAILURES", JSON.stringify(fails.slice(0, 10), null, 2));
  process.exit(1);
}
