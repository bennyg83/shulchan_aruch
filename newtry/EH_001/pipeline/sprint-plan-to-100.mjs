#!/usr/bin/env node
/**
 * Plan editorial sprint through siman 100: queue work units (siman + part).
 *
 *   node pipeline/sprint-plan-to-100.mjs
 *   node pipeline/sprint-plan-to-100.mjs --to 100 --max-blocks 40
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { buildBatch } from "./build-editorial-siman-batch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

function parseArgs() {
  let from = 27;
  let to = 100;
  let maxBlocks = 40;
  let outName = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
    else if (a[i] === "--out" && a[i + 1]) outName = a[++i];
  }
  return { from, to, maxBlocks, outName };
}

function sliceParts(items, maxBlocks) {
  const parts = Math.max(1, Math.ceil(items.length / maxBlocks));
  const units = [];
  const size = Math.ceil(items.length / parts);
  for (let p = 1; p <= parts; p++) {
    const start = (p - 1) * size;
    const chunk = items.slice(start, start + size);
    if (chunk.length) units.push({ part: p, parts, count: chunk.length });
  }
  return units;
}

function main() {
  const { from, to, maxBlocks, outName } = parseArgs();
  const outRoot = path.join(OC_ROOT, "output");
  const done = loadEditorialDoneIds(WORK);
  const simanim = [];
  let totalBlocks = 0;
  const workUnits = [];

  for (let s = from; s <= to; s++) {
    const items = collectEditorialBlocks(outRoot, s, "all", "warn", done);
    if (!items.length) continue;
    totalBlocks += items.length;
    const parts = sliceParts(items, maxBlocks);
    simanim.push({ siman: s, blocks: items.length, parts: parts.length });
    for (const u of parts) {
      workUnits.push({
        id: `siman-${String(s).padStart(3, "0")}-part${u.part}of${u.parts}`,
        siman: s,
        part: u.part,
        parts: u.parts,
        blocks: u.count,
        status: "pending",
        assignee: null,
      });
    }
  }

  const plan = {
    version: 1,
    generatedAt: new Date().toISOString(),
    range: { from, to },
    maxBlocksPerBatch: maxBlocks,
    totalBlocks,
    simanimWithWork: simanim.length,
    simanim,
    workUnits,
    completedSimanim: JSON.parse(
      fs.existsSync(path.join(WORK, "editorial-loop-state.json"))
        ? fs.readFileSync(path.join(WORK, "editorial-loop-state.json"), "utf8")
        : '{"completedSimanim":[]}'
    ).completedSimanim.filter((s) => s < from),
  };

  const planPath = path.join(
    WORK,
    outName || (from >= 21 ? "sprint-plan-27-100.json" : "sprint-plan-1-20-pass.json")
  );
  fs.writeFileSync(planPath, JSON.stringify(plan, null, 2), "utf8");

  console.log(`Plan: ${simanim.length} simanim, ${workUnits.length} work units, ${totalBlocks} blocks`);
  console.log(`Wrote ${planPath}`);

  if (process.argv.includes("--build-first")) {
    const first = workUnits.find((w) => w.status === "pending");
    if (first) {
      buildBatch({
        siman: first.siman,
        part: first.part,
        parts: first.parts,
        maxBlocks,
        scope: "all",
        minSeverity: "warn",
        outRoot,
        workDir: WORK,
      });
    }
  }
}

main();
