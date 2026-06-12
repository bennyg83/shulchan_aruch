#!/usr/bin/env node
/**
 * Live terminal tracker — translation quality status for simanim 1–100.
 *
 *   node pipeline/tracker-simanim-1-100.mjs           # one-shot + chart
 *   node pipeline/tracker-simanim-1-100.mjs --watch   # refresh every 15s
 *   node pipeline/tracker-simanim-1-100.mjs --scan    # force full block scan (slow)
 *
 * Cache: pipeline/work/tracker-1-100-cache.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const CACHE_PATH = path.join(WORK, "tracker-1-100-cache.json");
const OUT_ROOT = path.join(OC_ROOT, "output");
const SLAVE_DONE = path.join(WORK, "slave-cleanup-done-ids.txt");

const FROM = 1;
const TO = 100;

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  blue: "\x1b[34m",
};

function parseArgs() {
  let watch = false;
  let scan = false;
  let interval = 15;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--watch") watch = true;
    else if (a[i] === "--scan") scan = true;
    else if (a[i] === "--interval" && a[i + 1]) interval = Math.max(5, parseInt(a[++i], 10));
  }
  return { watch, scan, interval };
}

/** Fast status from loop + sprint plan (no per-block walk). */
function fastSimanStatus(siman, loopCompleted, plan) {
  const hasOutput = simanDirExists(siman);
  if (!hasOutput) return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "missing" };

  const sp = sprintStatusForSiman(plan, siman);
  const inLoop = loopCompleted.has(siman);

  if (siman < 10) {
    return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "early" };
  }

  if (siman <= 20) {
    return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "slave" };
  }

  if (sp) {
    if (sp.pending > 0 || sp.claimed > 0) {
      return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "open" };
    }
    if (inLoop) {
      return { siman, hasOutput, editorialLeft: 0, slaveQualityLeft: -1, status: "done" };
    }
    return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "open" };
  }

  if (inLoop) {
    return { siman, hasOutput, editorialLeft: 0, slaveQualityLeft: -1, status: "done" };
  }
  return { siman, hasOutput, editorialLeft: -1, slaveQualityLeft: -1, status: "open" };
}

function loadSlaveDone() {
  if (!fs.existsSync(SLAVE_DONE)) return new Set();
  return new Set(
    fs.readFileSync(SLAVE_DONE, "utf8").split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  );
}

function loadLoopState() {
  const p = path.join(WORK, "editorial-loop-state.json");
  if (!fs.existsSync(p)) return { completedSimanim: [] };
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function loadSprintPlan() {
  const p = path.join(WORK, "sprint-plan-32-100.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function simanDirExists(siman) {
  const tag = String(siman).padStart(3, "0");
  return fs.existsSync(path.join(OUT_ROOT, `siman_${tag}`));
}

function scanSiman(siman, editorialDone, slaveDone, loopCompleted) {
  const hasOutput = simanDirExists(siman);
  let editorialLeft = 0;
  let slaveQualityLeft = 0;

  if (hasOutput && siman >= 21) {
    editorialLeft = collectEditorialBlocks(OUT_ROOT, siman, "all", "warn", editorialDone).length;
  }
  if (hasOutput && siman >= 10 && siman <= 20) {
    const q = collectEditorialBlocks(OUT_ROOT, siman, "quality", "warn", editorialDone);
    slaveQualityLeft = q.filter((it) => !slaveDone.has(it.id)).length;
  }

  let status;
  if (!hasOutput) {
    status = "missing";
  } else if (siman < 10) {
    status = editorialLeft === 0 ? "done" : "early";
  } else if (siman <= 20) {
    if (editorialLeft === 0 && slaveQualityLeft === 0) status = "done";
    else if (slaveQualityLeft > 0 && editorialLeft === 0) status = "slave";
    else if (editorialLeft > 0) status = "open";
    else status = "slave";
  } else if (editorialLeft === 0) {
    status = loopCompleted.has(siman) ? "done" : "done";
  } else if (loopCompleted.has(siman)) {
    status = "gap";
  } else {
    status = "open";
  }

  return { siman, hasOutput, editorialLeft, slaveQualityLeft, status };
}

function sprintStatusForSiman(plan, siman) {
  if (!plan?.workUnits) return null;
  const units = plan.workUnits.filter((u) => u.siman === siman);
  if (!units.length) return null;
  const st = { pending: 0, claimed: 0, done: 0 };
  for (const u of units) {
    if (u.status === "pending") st.pending++;
    else if (u.status === "claimed") st.claimed++;
    else if (u.status === "done") st.done++;
  }
  return st;
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return null;
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function saveCache(rows, meta) {
  fs.mkdirSync(WORK, { recursive: true });
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), meta, simanim: rows }, null, 2),
    "utf8"
  );
}

function buildRows(forceScan, fastOnly) {
  const editorialDone = loadEditorialDoneIds(WORK);
  const slaveDone = loadSlaveDone();
  const loop = loadLoopState();
  const loopCompleted = new Set(loop.completedSimanim || []);
  const plan = loadSprintPlan();
  const cache = loadCache();
  const cacheMap = new Map((cache?.simanim || []).map((r) => [r.siman, r]));

  const rows = [];
  for (let s = FROM; s <= TO; s++) {
    let row;
    if (fastOnly) {
      row = fastSimanStatus(s, loopCompleted, plan);
    } else if (!forceScan && cacheMap.has(s)) {
      row = { ...cacheMap.get(s) };
    } else {
      row = scanSiman(s, editorialDone, slaveDone, loopCompleted);
    }
    row.sprint = sprintStatusForSiman(plan, s);
    row.inLoop = loopCompleted.has(s);
    rows.push(row);
  }

  // Accurate slave + gap overlay on 10–20 and known stragglers when scanning
  if (forceScan || fastOnly) {
    for (let s = 10; s <= 20; s++) {
      const i = rows.findIndex((r) => r.siman === s);
      if (i < 0) continue;
      const scanned = scanSiman(s, editorialDone, slaveDone, loopCompleted);
      rows[i] = { ...rows[i], ...scanned, sprint: rows[i].sprint, inLoop: rows[i].inLoop };
    }
  }
  return { rows, loop, plan };
}

function statusChar(status) {
  switch (status) {
    case "done":
      return { ch: "█", color: C.green };
    case "gap":
      return { ch: "▒", color: C.yellow };
    case "slave":
      return { ch: "○", color: C.cyan };
    case "early":
      return { ch: "·", color: C.dim };
    case "missing":
      return { ch: "?", color: C.dim };
    case "open":
    default:
      return { ch: "░", color: C.red };
  }
}

function bar(filled, total, width = 40) {
  const n = total ? Math.round((filled / total) * width) : 0;
  return "█".repeat(n) + "░".repeat(Math.max(0, width - n));
}

function render(rows, loop, plan) {
  const lines = [];
  const now = new Date().toISOString().replace("T", " ").slice(0, 19);

  const editorialRange = rows.filter((r) => r.siman >= 21 && r.hasOutput);
  const edDone = editorialRange.filter((r) => r.status === "done").length;
  const edGap = editorialRange.filter((r) => r.status === "gap").length;
  const edOpen = editorialRange.filter((r) => r.status === "open").length;

  const slaveRange = rows.filter((r) => r.siman >= 10 && r.siman <= 20 && r.hasOutput);
  const slDone = slaveRange.filter((r) => r.slaveQualityLeft === 0).length;

  lines.push("");
  lines.push(`${C.bold}CM001 quality tracker — simanim ${FROM}–${TO}${C.reset}  ${C.dim}${now}${C.reset}`);
  lines.push("");

  lines.push(
    `${C.bold}Editorial (21–100)${C.reset}  ${bar(edDone, editorialRange.length, 50)}  ${edDone}/${editorialRange.length} clean`
  );
  if (edGap) lines.push(`  ${C.yellow}▒ ${edGap} simanim marked done but blocks remain (gaps)${C.reset}`);
  if (edOpen) lines.push(`  ${C.red}░ ${edOpen} simanim with open editorial work${C.reset}`);

  lines.push(
    `${C.bold}Slave MT cleanup (10–20)${C.reset}  ${bar(slDone, slaveRange.length, 50)}  ${slDone}/${slaveRange.length} simanim clear`
  );
  lines.push("");

  lines.push(
    `${C.dim}Legend: ${C.green}█${C.dim} done  ${C.yellow}▒${C.dim} gap  ${C.red}░${C.dim} open  ${C.cyan}○${C.dim} slave due  ${C.dim}· early 1–9${C.reset}`
  );
  lines.push("");

  // 10×10 grid
  lines.push(`${C.bold}Siman grid (columns = ones digit)${C.reset}`);
  lines.push("      " + Array.from({ length: 10 }, (_, i) => String(i).padStart(4)).join(""));
  for (let decade = 0; decade <= 9; decade++) {
    let line = `${String(decade).padStart(2, "0")}x |`;
    for (let d = 0; d <= 9; d++) {
      const s = decade * 10 + d;
      if (s < FROM || s > TO || (s === 0 && decade === 0)) {
        line += "    ";
        continue;
      }
      if (s < FROM) continue;
      const row = rows.find((r) => r.siman === s);
      if (!row) {
        line += "    ";
        continue;
      }
      const { ch, color } = statusChar(row.status);
      line += ` ${color}${ch}${C.reset}  `;
    }
    if (decade * 10 + 9 >= FROM) lines.push(line);
  }
  lines.push("");

  // Pending table (compact)
  const pending = rows.filter((r) => r.status === "open" || r.status === "gap" || r.status === "slave");
  lines.push(`${C.bold}Pending / gaps (${pending.length})${C.reset}`);
  if (!pending.length) {
    lines.push("  (none — all simanim 1–100 quality-clean)");
  } else {
    for (const r of pending.slice(0, 30)) {
      const sp = r.sprint
        ? ` sprint:${r.sprint.done}d/${r.sprint.claimed}c/${r.sprint.pending}p`
        : "";
      const ed =
        r.editorialLeft >= 0 ? ` ed:${r.editorialLeft}` : r.editorialLeft === -1 ? "" : " ed:?";
      const sl = r.slaveQualityLeft > 0 ? ` slave:${r.slaveQualityLeft}` : "";
      lines.push(
        `  siman ${String(r.siman).padStart(3)}  ${r.status.padEnd(6)}${ed}${sl}${sp}${r.inLoop ? " loop✓" : ""}`
      );
    }
    if (pending.length > 30) lines.push(`  … +${pending.length - 30} more (see --watch or cache json)`);
  }

  if (plan) {
    const claimed = (plan.workUnits || []).filter((u) => u.status === "claimed");
    if (claimed.length) {
      lines.push("");
      lines.push(`${C.bold}Active sprint units${C.reset}`);
      for (const u of claimed) {
        lines.push(`  ${u.id}  (${u.blocks} blocks)`);
      }
    }
  }

  if (loop?.completedSimanim?.length) {
    const in100 = loop.completedSimanim.filter((s) => s >= 21 && s <= 100);
    lines.push("");
    lines.push(
      `${C.dim}Loop completed (21–100): ${in100.length} simanim — latest: ${Math.max(...in100.filter((s) => s <= 100))}${C.reset}`
    );
  }

  lines.push("");
  return lines.join("\n");
}

function clearScreen() {
  process.stdout.write("\x1b[2J\x1b[H");
}

async function main() {
  const opts = parseArgs();
  const fastOnly = !opts.scan;

  const run = () => {
    const { rows, loop, plan } = buildRows(opts.scan, fastOnly);
    const meta = {
      mode: opts.scan ? "scan" : "fast",
      editorialDone: rows.filter((r) => r.siman >= 21 && r.status === "done").length,
      gaps: rows.filter((r) => r.status === "gap").length,
      open: rows.filter((r) => r.status === "open").length,
    };
    saveCache(rows, meta);
    if (opts.watch) clearScreen();
    console.log(render(rows, loop, plan));
    if (fastOnly && !opts.scan) {
      console.log(
        `${C.dim}Fast mode (sprint + loop). Gaps may be understated. Run: npm run pipeline:tracker:scan${C.reset}\n`
      );
    }
  };

  if (opts.watch) {
    console.log(
      `${C.dim}Live tracker — refresh ${opts.interval}s. Accurate counts: npm run pipeline:tracker:scan${C.reset}`
    );
    run();
    setInterval(run, opts.interval * 1000);
  } else {
    if (opts.scan) {
      process.stderr.write("Full block scan 1–100 (several minutes)…\n");
    }
    run();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
