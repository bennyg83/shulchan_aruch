#!/usr/bin/env node
/** Checkpoint all remaining pending editorial blocks for a siman */
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import {
  collectEditorialBlocks,
  loadEditorialDoneIds,
  appendEditorialDoneIds,
} from "./lib/editorial-queue.mjs";

const siman = Number(process.argv[2]);
if (!siman) {
  console.error("usage: node _checkpoint-remaining-slot15.mjs <siman>");
  process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");
const WORK = path.join(__dirname, "work");
const OUT = path.join(OC_ROOT, "output");

const done = loadEditorialDoneIds(WORK);
const pending = collectEditorialBlocks(OUT, siman, "all", "warn", done);
const ids = pending.map((x) => x.id);
if (!ids.length) {
  console.log(`siman_${siman}: no pending blocks`);
} else {
  const n = appendEditorialDoneIds(WORK, ids);
  console.log(`siman_${siman}: checkpointed ${ids.length} ids (total ${n})`);
}

const tag = String(siman).padStart(3, "0");
for (const [label, args] of [
  ["dictionary", [path.join(OC_ROOT, "apply_dictionary_oc001.mjs"), "--root", `output/siman_${tag}`]],
  ["structural", [path.join(__dirname, "validate-oc001.mjs"), "--root", path.join(OUT, `siman_${tag}`)]],
  [
    "quality",
    [
      path.join(__dirname, "validate-quality-oc001.mjs"),
      "--root",
      path.join(OUT, `siman_${tag}`),
      "--write-reports",
      "--report-dir",
      path.join(OC_ROOT, "checklist-output", `siman_${tag}`),
    ],
  ],
]) {
  console.log(`\n${label}…`);
  const r = spawnSync(process.execPath, args, { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const fin = spawnSync(process.execPath, [path.join(__dirname, "_finalize-siman-slot15.mjs"), String(siman)], {
  cwd: OC_ROOT,
  stdio: "inherit",
});
process.exit(fin.status ?? 0);
