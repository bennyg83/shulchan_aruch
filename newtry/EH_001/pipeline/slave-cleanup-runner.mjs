#!/usr/bin/env node
/**
 * Loop Ollama slave drafts over simanim 10–20 (quality-flagged blocks) until idle or cap.
 *
 *   node pipeline/slave-cleanup-runner.mjs --from 10 --to 20
 *   node pipeline/slave-cleanup-runner.mjs --once --siman 10
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const STATE_PATH = path.join(WORK, "slave-cleanup-state.json");
const SLAVE_DONE = path.join(WORK, "slave-cleanup-done-ids.txt");

function parseArgs() {
  let from = 10;
  let to = 20;
  let maxBlocks = 6;
  let maxRounds = 500;
  let once = false;
  let siman = null;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--from" && a[i + 1]) from = parseInt(a[++i], 10);
    else if (a[i] === "--to" && a[i + 1]) to = parseInt(a[++i], 10);
    else if (a[i] === "--siman" && a[i + 1]) {
      siman = parseInt(a[++i], 10);
      from = siman;
      to = siman;
    } else if (a[i] === "--max-blocks" && a[i + 1]) maxBlocks = parseInt(a[++i], 10);
    else if (a[i] === "--max-rounds" && a[i + 1]) maxRounds = parseInt(a[++i], 10);
    else if (a[i] === "--once") once = true;
  }
  return { from, to, maxBlocks, maxRounds, once };
}

function loadSlaveDone() {
  if (!fs.existsSync(SLAVE_DONE)) return new Set();
  return new Set(
    fs
      .readFileSync(SLAVE_DONE, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)
  );
}

function countRemaining(from, to) {
  const editorialDone = loadEditorialDoneIds(WORK);
  const slaveDone = loadSlaveDone();
  const outRoot = path.join(OC_ROOT, "output");
  let n = 0;
  for (let s = from; s <= to; s++) {
    const items = collectEditorialBlocks(outRoot, s, "quality", "warn", editorialDone);
    n += items.filter((it) => !slaveDone.has(it.id)).length;
  }
  return n;
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { version: 1, from: 10, to: 20, rounds: 0, lastAt: null, lastRemaining: null };
  }
  return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
}

function saveState(state) {
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8");
}

function pingSlave() {
  const url = (process.env.EH001_OLLAMA_URL || "http://10.100.102.14:11434").replace(/\/$/, "");
  const r = spawnSync("curl.exe", ["-s", "-m", "8", `${url}/api/tags`], { encoding: "utf8" });
  return r.status === 0 && (r.stdout || "").includes("models");
}

function runDraft(siman, maxBlocks) {
  const r = spawnSync(
    process.execPath,
    [
      path.join(__dirname, "ollama-slave-draft.mjs"),
      "--siman",
      String(siman),
      "--scope",
      "quality",
      "--max-blocks",
      String(maxBlocks),
    ],
    { cwd: OC_ROOT, stdio: "inherit", env: process.env }
  );
  return r.status === 0;
}

function main() {
  const opts = parseArgs();
  if (!pingSlave()) {
    console.error("Ollama slave not reachable. Start on BennyGDev:");
    console.error("  powershell -ExecutionPolicy Bypass -File C:\\eh001-slave\\Start-OllamaServe.ps1");
    process.exit(1);
  }

  const state = loadState();
  state.from = opts.from;
  state.to = opts.to;
  let round = 0;

  while (round < opts.maxRounds) {
    const remaining = countRemaining(opts.from, opts.to);
    state.lastRemaining = remaining;
    state.lastAt = new Date().toISOString();
    saveState(state);

    if (remaining === 0) {
      console.log(`Slave cleanup complete for simanim ${opts.from}–${opts.to}.`);
      break;
    }

    console.log(`\n=== Round ${round + 1} | ${remaining} quality blocks left ===`);

    let progressed = false;
    for (let s = opts.from; s <= opts.to; s++) {
      const before = countRemaining(s, s);
      if (before === 0) continue;
      console.log(`\n--- Siman ${s} (${before} due) ---`);
      if (!runDraft(s, opts.maxBlocks)) {
        console.error("Draft batch failed; pausing runner.");
        process.exit(1);
      }
      const after = countRemaining(s, s);
      if (after < before) progressed = true;
    }

    state.rounds = (state.rounds || 0) + 1;
    saveState(state);
    round++;
    if (opts.once) break;
    if (!progressed) {
      console.warn("No progress this round; stopping to avoid spin.");
      break;
    }
  }
}

main();
