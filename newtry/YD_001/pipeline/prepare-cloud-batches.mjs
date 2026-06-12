#!/usr/bin/env node
/**
 * Build editorial batch files for Cursor cloud agents (no LLM — prep only).
 *
 *   npm run pipeline:cloud:prep
 *   npm run pipeline:cloud:prep -- --siman 110 --parts 2
 *   npm run pipeline:cloud:prep -- --top 10 --parts 2 --min-severity error
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import { buildBatch } from "./build-editorial-siman-batch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(__dirname, "..");
const WORK = path.join(__dirname, "work");
const REPORT = path.join(YD_ROOT, "checklist-output", "quality-report.json");
const MANIFEST = path.join(WORK, "cloud-manifest.json");
const STATUS = path.join(WORK, "cloud-coordinator-status.md");

function parseArgs() {
  const opts = {
    top: 10,
    parts: 2,
    minSeverity: "error",
    simanim: [],
    writeReport: false,
    maxBlocks: 45,
  };
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (x === "--top" && a[i + 1]) opts.top = parseInt(a[++i], 10);
    else if (x === "--parts" && a[i + 1]) opts.parts = parseInt(a[++i], 10);
    else if (x === "--min-severity" && a[i + 1]) opts.minSeverity = a[++i];
    else if (x === "--siman" && a[i + 1]) opts.simanim.push(parseInt(a[++i], 10));
    else if (x === "--write-report") opts.writeReport = true;
    else if (x === "--max-blocks" && a[i + 1]) opts.maxBlocks = parseInt(a[++i], 10);
  }
  return opts;
}

function runQualityReport() {
  const r = spawnSync(
    process.execPath,
    ["pipeline/validate-quality-yd001.mjs", "--root", "output", "--write-reports", "--min-severity", "warn"],
    { cwd: YD_ROOT, stdio: "inherit" }
  );
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function rankSimanim(minSeverity) {
  if (!fs.existsSync(REPORT)) {
    console.error(`Missing ${REPORT}. Run pipeline:validate:quality first.`);
    process.exit(1);
  }
  const doc = JSON.parse(fs.readFileSync(REPORT, "utf8"));
  const rank = { error: 3, warn: 2, info: 1 };
  const minRank = rank[minSeverity] ?? 2;
  const bySiman = new Map();
  for (const b of doc.blocks || []) {
    if ((rank[b.severity] ?? 0) < minRank) continue;
    const m = b.relPath?.match(/siman_(\d+)/);
    if (!m) continue;
    const siman = parseInt(m[1], 10);
    bySiman.set(siman, (bySiman.get(siman) || 0) + 1);
  }
  return [...bySiman.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([siman, errors]) => ({ siman, errors }));
}

function tag(siman) {
  return String(siman).padStart(3, "0");
}

function main() {
  const opts = parseArgs();
  if (opts.writeReport || !fs.existsSync(REPORT)) runQualityReport();

  const ranked = rankSimanim(opts.minSeverity);
  const simanim =
    opts.simanim.length > 0
      ? opts.simanim.map((siman) => ({ siman, errors: ranked.find((r) => r.siman === siman)?.errors ?? 0 }))
      : ranked.slice(0, opts.top);

  if (!simanim.length) {
    console.log("No simanim with quality issues at requested severity.");
    process.exit(0);
  }

  fs.mkdirSync(WORK, { recursive: true });
  const units = [];

  for (const { siman, errors } of simanim) {
    for (let part = 1; part <= opts.parts; part++) {
      const r = buildBatch({
        siman,
        part,
        parts: opts.parts,
        maxBlocks: opts.maxBlocks,
        scope: "all",
        minSeverity: opts.minSeverity,
        outRoot: path.join(YD_ROOT, "output"),
        workDir: WORK,
        ignoreDone: false,
      });
      if (r.sliceCount === 0) continue;
      const t = tag(siman);
      const partSuffix = opts.parts > 1 ? `-part${part}of${opts.parts}` : "";
      units.push({
        id: `siman-${t}${partSuffix}`,
        siman,
        part,
        parts: opts.parts,
        errorsInSiman: errors,
        blockCount: r.sliceCount,
        batchPath: `pipeline/work/batch-editorial-siman-${t}${partSuffix}.md`,
        queuePath: `pipeline/work/editorial-queue-siman-${t}${partSuffix}.json`,
        prBranch: `yd/cleanup-siman-${t}${partSuffix}`,
      });
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    branch: "yd-cleanup",
    minSeverity: opts.minSeverity,
    units,
    rankedTop: ranked.slice(0, 20),
  };
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), "utf8");

  const lines = [
    "# YD cloud coordinator status",
    "",
    `Generated: ${manifest.generatedAt}`,
    "",
    "## Top simanim by error count",
    "",
    "| Siman | Errors |",
    "|-------|--------|",
    ...ranked.slice(0, 20).map((r) => `| ${r.siman} | ${r.errors} |`),
    "",
    "## Ready units (claim one per cloud agent)",
    "",
    "| Unit | Blocks | Batch | PR branch |",
    "|------|--------|-------|-----------|",
    ...units.map(
      (u) => `| ${u.id} | ${u.blockCount} | \`${u.batchPath}\` | \`${u.prBranch}\` |`
    ),
    "",
    "See `pipeline/work/CLOUD_AGENTS.md` for the worker playbook.",
  ];
  fs.writeFileSync(STATUS, lines.join("\n"), "utf8");

  console.log(`Wrote ${path.relative(YD_ROOT, MANIFEST)} (${units.length} unit(s))`);
  console.log(`Wrote ${path.relative(YD_ROOT, STATUS)}`);
  for (const u of units) console.log(`  ${u.id} → ${u.batchPath} (${u.blockCount} blocks)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
