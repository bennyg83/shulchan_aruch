#!/usr/bin/env node
/**
 * Hands-off editorial pool: coordinator watch (#5) + 4 worker loops until eh_complete.
 *
 *   npm run pipeline:pool:autopilot
 *
 * Requires EH001_POOL_BACKEND=ollama (+ EH001_OLLAMA_URL) or claude-cli.
 * Not for IDE-only mode — use AGENT_SELF_LOOP_WORKER.md for Cursor chats.
 */
import fs from "fs";
import path from "path";
import { spawn, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const PID_FILE = path.join(WORK, "pool-autopilot.pids.json");
const WATCH = path.join(__dirname, "pool-coordinator-watch.mjs");
const LOOP = path.join(__dirname, "pool-worker-loop.mjs");

function parseArgs() {
  let workers = 4;
  let interval = 60;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--workers" && a[i + 1]) workers = parseInt(a[++i], 10);
    else if (a[i] === "--interval" && a[i + 1]) interval = parseInt(a[++i], 10);
    else if (a[i] === "stop") return { action: "stop" };
  }
  return { action: "start", workers, interval };
}

function backend() {
  const b = (process.env.EH001_POOL_BACKEND || "").toLowerCase();
  if (b === "ollama" || process.env.EH001_OLLAMA_URL || process.env.EH001_POOL_USE_OLLAMA === "1")
    return "ollama";
  if (b === "claude-cli" || b === "claude" || process.env.EH001_POOL_USE_CLAUDE_CLI === "1")
    return "claude-cli";
  if (b === "cursor" && process.env.CURSOR_API_KEY) return "cursor";
  return null;
}

function spawnDetached(args, label) {
  const child = spawn(process.execPath, args, {
    cwd: OC_ROOT,
    detached: true,
    stdio: "ignore",
    windowsHide: true,
    env: process.env,
  });
  child.unref();
  console.log(`  started ${label} pid=${child.pid}`);
  return child.pid;
}

function stopAutopilot() {
  if (!fs.existsSync(PID_FILE)) {
    console.log("No autopilot pid file.");
    return;
  }
  const pids = JSON.parse(fs.readFileSync(PID_FILE, "utf8"));
  for (const pid of pids) {
    try {
      process.kill(pid);
      console.log(`  stopped pid ${pid}`);
    } catch {
      console.log(`  pid ${pid} not running`);
    }
  }
  fs.unlinkSync(PID_FILE);
  console.log("Autopilot stopped.");
}

function startAutopilot(workers, interval) {
  const be = backend();
  if (!be) {
    console.error(`
No translation backend for autopilot.

  Ollama (recommended for hands-off):
    set EH001_POOL_BACKEND=ollama
    set EH001_OLLAMA_URL=http://10.100.102.14:11434
    set EH001_OLLAMA_MODEL_TRANSLATE=qwen2.5:14b-instruct

  Claude CLI (Pro, session limits apply):
    set EH001_POOL_BACKEND=claude-cli

Then: npm run pipeline:pool:autopilot
`);
    process.exit(1);
  }

  fs.mkdirSync(WORK, { recursive: true });
  spawnSync(process.execPath, [path.join(__dirname, "pool-coordinator.mjs"), "release-stale"], {
    cwd: OC_ROOT,
    stdio: "inherit",
  });

  console.log(`\nAutopilot — backend=${be} workers=${workers} coordinator interval=${interval}s\n`);

  const pids = [];
  pids.push(
    spawnDetached(
      [WATCH, "--workers", String(workers), "--interval", String(interval), "--no-spawn"],
      "coordinator (watch)"
    )
  );

  for (let slot = 1; slot <= workers; slot++) {
    pids.push(spawnDetached([LOOP, "--slot", String(slot), "--poll", "25"], `worker loop slot ${slot}`));
  }

  fs.writeFileSync(PID_FILE, JSON.stringify(pids, null, 2) + "\n", "utf8");

  console.log(`
Autopilot running (5 processes: 1 coordinator + ${workers} worker loops).
  Status:  npm run pipeline:pool:status
  Log:     pipeline/work/pool-watch.log
  Stop:    npm run pipeline:pool:autopilot:stop

Workers pick up claimed units, translate, validate, then wait for the next batch automatically.
`);
}

const opts = parseArgs();
if (opts.action === "stop") stopAutopilot();
else startAutopilot(opts.workers, opts.interval);
