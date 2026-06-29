#!/usr/bin/env node
/**
 * Claude CLI lane — status, dry-run test (101–104), start test/worker.
 *
 *   node pipeline/cli-lane.mjs status
 *   node pipeline/cli-lane.mjs test --dry-run
 *   node pipeline/cli-lane.mjs test
 *   node pipeline/cli-lane.mjs claim --siman 101 --lane local
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const CLI_DIR = path.join(OC_ROOT, "cli");
const STATE_FILE = path.join(WORK, "siman_state.json");
const QUEUE_FILE = path.join(WORK, "cli_queue.json");

function parseArgs() {
  const opts = { action: "status", siman: null, lane: "local", dry: false };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (["status", "test", "claim", "release", "available", "exists"].includes(x)) opts.action = x;
    else if (x === "--siman" && a[i + 1]) opts.siman = parseInt(a[++i], 10);
    else if (x === "--lane" && a[i + 1]) opts.lane = a[++i];
    else if (x === "--dry-run") opts.dry = true;
  }
  return opts;
}

function runPython(args, inherit = true) {
  const py = process.env.PYTHON || "python";
  return spawnSync(py, [path.join(CLI_DIR, "siman_cli.py"), ...args], {
    cwd: OC_ROOT,
    encoding: "utf8",
    stdio: inherit ? "inherit" : "pipe",
  });
}

function runCliLauncher(extra = [], dry = false) {
  const py = process.env.PYTHON || "python";
  const args = [path.join(CLI_DIR, "cli_launcher.py"), ...extra];
  if (dry) args.push("--dry-run");
  return spawnSync(py, args, {
    cwd: OC_ROOT,
    stdio: "inherit",
    env: { ...process.env, PYTHONUNBUFFERED: "1" },
  });
}

function status() {
  const queue = fs.existsSync(QUEUE_FILE) ? JSON.parse(fs.readFileSync(QUEUE_FILE, "utf8")) : {};
  console.log("\n── Claude CLI lane ──\n");
  console.log("Queue:", JSON.stringify(queue, null, 2));
  if (fs.existsSync(STATE_FILE)) {
    const state = JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    const keys = Object.keys(state);
    console.log(`\nsiman_state.json: ${keys.length} entries`);
    for (const k of keys.sort()) {
      const e = state[k];
      console.log(`  ${k}: lane=${e.lane} status=${e.status}`);
    }
  } else {
    console.log("\nsiman_state.json: (empty)");
  }
  for (const n of queue.simanim || [101, 102, 103, 104]) {
    const ex = spawnSync(process.env.PYTHON || "python", [
      path.join(CLI_DIR, "siman_cli.py"),
      "exists",
      String(n),
    ], { cwd: OC_ROOT, encoding: "utf8" });
    const folder = (ex.stdout || "").trim() === "yes";
    console.log(`  output/siman_${String(n).padStart(3, "0")}: ${folder ? "present" : "MISSING"}`);
  }
  console.log("");
}

function main() {
  const opts = parseArgs();
  switch (opts.action) {
    case "status":
      status();
      break;
    case "test":
      process.exit(runCliLauncher(["test"], opts.dry).status ?? 1);
    case "claim":
      if (!opts.siman) {
        console.error("--siman required");
        process.exit(1);
      }
      process.exit(runPython(["claim", String(opts.siman), opts.lane], true).status ?? 1);
    case "release":
      process.exit(runPython(["release", String(opts.siman)], true).status ?? 1);
    case "available":
      runPython(["available", String(opts.siman)], true);
      break;
    case "exists":
      runPython(["exists", String(opts.siman)], true);
      break;
    default:
      console.error("Unknown action");
      process.exit(1);
  }
}

main();
