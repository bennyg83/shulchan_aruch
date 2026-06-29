#!/usr/bin/env node
/**
 * Run one sprint work unit: build batch, expect English already edited, advance + quality gate.
 * Agents call this AFTER editing batch blocks.
 *
 *   node pipeline/sprint-worker.mjs --siman 28 --part 2 --parts 4
 *   node pipeline/sprint-worker.mjs --unit siman-028-part2of4
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { collectEditorialBlocks, loadEditorialDoneIds } from "./lib/editorial-queue.mjs";
import { loadPlan, savePlan } from "./lib/sprint-plan-io.mjs";
import { runBlockQualityChecks, maxSeverity, severityLabel } from "./lib/quality-checks.mjs";
import { parseBlocksInFile } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");

const MT_PATTERNS = [
  /\b(there in the|Offerings for|According to the|in me|p\.d\.|sec\.)\b/i,
  /[א-ת]{2,}/,
  /&quot;/,
  /\b(rape|tsal nav|kovad)\b/i,
];

function parseArgs() {
  let siman = null;
  let part = 1;
  let parts = 1;
  let unit = null;
  let strict = true;
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--siman" && a[i + 1]) siman = parseInt(a[++i], 10);
    else if (a[i] === "--part" && a[i + 1]) part = parseInt(a[++i], 10);
    else if (a[i] === "--parts" && a[i + 1]) parts = parseInt(a[++i], 10);
    else if (a[i] === "--unit" && a[i + 1]) unit = a[++i];
    else if (a[i] === "--no-strict") strict = false;
  }
  if (unit) {
    const m = unit.match(/siman-(\d+)-part(\d+)of(\d+)/);
    if (m) {
      siman = parseInt(m[1], 10);
      part = parseInt(m[2], 10);
      parts = parseInt(m[3], 10);
    }
  }
  if (!siman) throw new Error("Need --siman or --unit");
  return { siman, part, parts, strict };
}

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: OC_ROOT, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function preflightQueue(queuePath, strict) {
  const q = JSON.parse(fs.readFileSync(queuePath, "utf8"));
  const bad = [];
  for (const it of q.items || []) {
    const raw = it.rawBlock || "";
    const enM = raw.match(/\*\*\*\* ENGLISH \*\*\*\*\n([\s\S]*?)\n\*\*\*\* END BLOCK/);
    const en = (enM ? enM[1] : "").trim();
    const heM = raw.match(/\*\*\*\* HEBREW \*\*\*\*\n([\s\S]*?)\n\*\*\*\* ENGLISH/);
    const he = (heM ? heM[1] : "").replace(/<[^>]+>/g, " ").trim();
    if (!he) continue;
    if (!en || en.length < 8) {
      bad.push({ id: it.id, reason: "empty_english" });
      continue;
    }
    if (strict) {
      for (const p of MT_PATTERNS) {
        if (p.test(en)) {
          bad.push({ id: it.id, reason: `mt_pattern:${p}` });
          break;
        }
      }
      const issues = runBlockQualityChecks({
        slug: it.slug,
        seif: it.seif,
        marker: it.marker,
        he,
        en,
      });
      const sev = issues.length ? severityLabel(maxSeverity(issues)) : "ok";
      if (sev === "error") bad.push({ id: it.id, reason: issues.map((i) => i.code).join(",") });
    }
  }
  return { q, bad };
}

function markPlanUnit(siman, part, parts, status, assignee) {
  const plan = loadPlan();
  const id = `siman-${String(siman).padStart(3, "0")}-part${part}of${parts}`;
  const u = plan.workUnits.find((w) => w.id === id);
  if (!u) return;
  u.status = status;
  if (assignee) u.assignee = assignee;
  u.finishedAt = new Date().toISOString();
  savePlan(plan);
}

function main() {
  const { siman, part, parts, strict } = parseArgs();
  const tag = String(siman).padStart(3, "0");
  const partSuffix = parts > 1 ? `-part${part}of${parts}` : "";
  const queuePath = path.join(WORK, `editorial-queue-siman-${tag}${partSuffix}.json`);

  if (!fs.existsSync(queuePath)) {
    console.error("Queue missing — build batch first:", queuePath);
    process.exit(1);
  }

  const { bad } = preflightQueue(queuePath, strict);
  if (bad.length) {
    console.error(`Quality preflight failed: ${bad.length} block(s)`);
    for (const b of bad.slice(0, 15)) console.error(" ", b.id, b.reason);
    if (bad.length > 15) console.error(`  … and ${bad.length - 15} more`);
    process.exit(2);
  }

  console.log(`Preflight OK (${(JSON.parse(fs.readFileSync(queuePath, "utf8")).items || []).length} blocks)`);

  run(process.execPath, [
    path.join(OC_ROOT, "apply_dictionary_oc001.mjs"),
    "--root",
    `output/siman_${tag}`,
  ]);
  run(process.execPath, [
    path.join("pipeline", "editorial-advance.mjs"),
    "--siman",
    String(siman),
    "--queue",
    queuePath,
  ]);

  const done = loadEditorialDoneIds(WORK);
  const left = collectEditorialBlocks(path.join(OC_ROOT, "output"), siman, "all", "warn", done);
  if (left.length === 0) {
    run(process.execPath, ["pipeline/editorial-loop.mjs", "finish-siman", "--siman", String(siman)]);
    console.log(`Siman ${siman} fully complete.`);
  } else {
    console.log(`Siman ${siman}: ${left.length} block(s) remaining after this unit.`);
  }

  markPlanUnit(siman, part, parts, "done", process.env.SPRINT_WORKER_ID || "worker");
}

main();
