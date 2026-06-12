#!/usr/bin/env node
/**
 * Clear editorial checkpoints for a siman range so blocks are re-queued.
 *
 *   node pipeline/reset-editorial-done.mjs --from 1 --to 20 --dry-run
 *   node pipeline/reset-editorial-done.mjs --from 1 --to 20
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadEditorialState, saveEditorialState } from "./lib/editorial-state.mjs";
import { loadEditorialDoneIds, simanPartFiles } from "./lib/editorial-queue.mjs";
import { relFromOutRoot, blockStableId } from "./lib/blocks.mjs";
import { parseBlocksInFile } from "../eh001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const DONE_IDS = path.join(WORK, "editorial-done-ids.txt");

function parseArgs() {
  let from = 1;
  let to = 20;
  let dryRun = false;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--dry-run") dryRun = true;
  }
  return { from, to, dryRun };
}

function idsForSiman(outRoot, siman) {
  const removed = [];
  for (const absPath of simanPartFiles(outRoot, siman)) {
    const rel = relFromOutRoot(absPath, outRoot);
    const blocks = parseBlocksInFile(fs.readFileSync(absPath, "utf8"));
    for (const b of blocks) {
      if (!String(b.he ?? "").trim()) continue;
      removed.push(blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker }));
    }
  }
  return removed;
}

function main() {
  const { from, to, dryRun } = parseArgs();
  const outRoot = path.join(OC_ROOT, "output");
  const done = loadEditorialDoneIds(WORK);
  const toRemove = new Set();
  for (let s = from; s <= to; s++) {
    for (const id of idsForSiman(outRoot, s)) toRemove.add(id);
  }

  const state = loadEditorialState(WORK);
  const beforeCompleted = (state.completedSimanim || []).length;
  const newCompleted = (state.completedSimanim || []).filter((s) => s < from || s > to);

  let removedFromDone = 0;
  for (const id of toRemove) {
    if (done.has(id)) removedFromDone++;
  }

  console.log(
    JSON.stringify(
      {
        from,
        to,
        dryRun,
        blockIdsInRange: toRemove.size,
        editorialDoneIdsRemoved: removedFromDone,
        completedSimanimRemoved: beforeCompleted - newCompleted.length,
      },
      null,
      2
    )
  );

  if (dryRun) return;

  const nextDone = new Set([...done].filter((id) => !toRemove.has(id)));
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(DONE_IDS, [...nextDone].sort().join("\n") + (nextDone.size ? "\n" : ""), "utf8");

  state.completedSimanim = newCompleted;
  saveEditorialState(WORK, state);
  console.log("Reset complete.");
}

main();
