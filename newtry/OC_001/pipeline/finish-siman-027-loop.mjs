#!/usr/bin/env node
/**
 * Coordinator loop: advance after human/agent edits until siman 27 empty, then finish-siman.
 * Does NOT translate — run after each batch is edited.
 *
 *   node pipeline/finish-siman-027-loop.mjs status
 *   node pipeline/finish-siman-027-loop.mjs advance-once
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { buildBatch } from "./build-editorial-siman-batch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const SIMAN = 27;

function remaining() {
  const done = loadEditorialDoneIds(WORK);
  return collectEditorialBlocks(path.join(OC_ROOT, "output"), SIMAN, "all", "warn", done).length;
}

function run(cmd, args, cwd = OC_ROOT) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  return r.status ?? 1;
}

function prepareNext() {
  const n = remaining();
  if (!n) return null;
  const parts = Math.max(1, Math.ceil(n / 40));
  for (let p = 1; p <= parts; p++) {
    const tag = String(SIMAN).padStart(3, "0");
    const suffix = parts > 1 ? `-part${p}of${parts}` : "";
    const q = path.join(WORK, `editorial-queue-siman-${tag}${suffix}.json`);
    if (!fs.existsSync(q)) {
      buildBatch({
        siman: SIMAN,
        part: p,
        parts,
        maxBlocks: 40,
        scope: "all",
        minSeverity: "warn",
        outRoot: path.join(OC_ROOT, "output"),
        workDir: WORK,
      });
      return { part: p, parts, queue: q, batch: path.join(WORK, `batch-editorial-siman-${tag}${suffix}.md`) };
    }
    const data = JSON.parse(fs.readFileSync(q, "utf8"));
    const ids = new Set(loadEditorialDoneIds(WORK));
    const pending = (data.items || []).filter((it) => !ids.has(it.id));
    if (pending.length > 0) {
      return {
        part: p,
        parts,
        queue: q,
        batch: path.join(WORK, `batch-editorial-siman-${tag}${suffix}.md`),
        pending: pending.length,
      };
    }
  }
  buildBatch({
    siman: SIMAN,
    part: 1,
    parts: 1,
    maxBlocks: 40,
    scope: "all",
    minSeverity: "warn",
    outRoot: path.join(OC_ROOT, "output"),
    workDir: WORK,
  });
  const tag = String(SIMAN).padStart(3, "0");
  return {
    part: 1,
    parts: 1,
    queue: path.join(WORK, `editorial-queue-siman-${tag}.json`),
    batch: path.join(WORK, `batch-editorial-siman-${tag}.md`),
  };
}

const cmd = process.argv[2] || "status";
if (cmd === "status") {
  console.log("Siman 27 remaining blocks:", remaining());
} else if (cmd === "advance-once") {
  const info = prepareNext();
  if (!info) {
    run(process.execPath, ["pipeline/editorial-loop.mjs", "finish-siman", "--siman", String(SIMAN)]);
    console.log("Siman 27 complete.");
    process.exit(0);
  }
  console.log("Next batch:", info.batch, `(${info.pending ?? "?"} blocks pending in queue)`);
  console.log("Edit batch, then: node pipeline/finish-siman-027-loop.mjs advance-queue", info.part, info.parts);
} else if (cmd === "advance-queue") {
  const part = parseInt(process.argv[3], 10);
  const parts = parseInt(process.argv[4], 10);
  const tag = String(SIMAN).padStart(3, "0");
  const suffix = parts > 1 ? `-part${part}of${parts}` : "";
  const q = path.join(WORK, `editorial-queue-siman-${tag}${suffix}.json`);
  if (run(process.execPath, [path.join("pipeline", "editorial-advance.mjs"), "--siman", String(SIMAN), "--queue", q]) !== 0)
    process.exit(1);
  console.log("Remaining:", remaining());
} else {
  console.log("Usage: status | advance-once | advance-queue PART PARTS");
}
