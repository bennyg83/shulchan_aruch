#!/usr/bin/env node
/**
 * Quality validation for CM001 English (post machine translation).
 *
 *   node pipeline/validate-quality-cm001.mjs --root output
 *   node pipeline/validate-quality-cm001.mjs --root output --siman 308
 *   node pipeline/validate-quality-cm001.mjs --root output --min-severity warn --fail-on error
 *   node pipeline/validate-quality-cm001.mjs --root output --write-reports
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../cm001_block_lib.mjs";
import { walkOc001PartFiles, relFromOutRoot, blockStableId } from "./lib/blocks.mjs";
import {
  runBlockQualityChecks,
  scoreBlock,
  maxSeverity,
  severityLabel,
  SEVERITY,
  plainFromHtml,
} from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.resolve(__dirname, "..");
const DEFAULT_REPORT_DIR = path.join(OC_ROOT, "checklist-output");

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    outRoot: path.join(OC_ROOT, "output"),
    siman: null,
    minSeverity: "warn",
    failOn: null,
    writeReports: false,
    reportDir: DEFAULT_REPORT_DIR,
    maxQueueLines: 500,
  };
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--root":
      case "--out":
        opts.outRoot = path.resolve(args[++i]);
        break;
      case "--siman":
        opts.siman = parseInt(args[++i], 10);
        break;
      case "--min-severity":
        opts.minSeverity = args[++i];
        break;
      case "--fail-on":
        opts.failOn = args[++i];
        break;
      case "--write-reports":
        opts.writeReports = true;
        break;
      case "--report-dir":
        opts.reportDir = path.resolve(args[++i]);
        break;
      case "--max-queue":
        opts.maxQueueLines = Math.max(50, parseInt(args[++i], 10) || 500);
        break;
    }
  }
  if (!["info", "warn", "error"].includes(opts.minSeverity)) {
    throw new Error("--min-severity must be info, warn, or error");
  }
  if (opts.failOn && !["info", "warn", "error"].includes(opts.failOn)) {
    throw new Error("--fail-on must be info, warn, or error");
  }
  return opts;
}

function shouldInclude(issueSeverity, minSeverity) {
  return (SEVERITY[issueSeverity] ?? 0) >= (SEVERITY[minSeverity] ?? 0);
}

function collectFiles(outRoot, siman) {
  const all = [...walkOc001PartFiles(outRoot)];
  if (!siman) return all;
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  return all.filter((f) => f.includes(needle) || (siman === 1 && !f.includes(`${path.sep}siman_`)));
}

function scanFile(absPath, outRoot, minSeverity) {
  const rel = relFromOutRoot(absPath, outRoot);
  const raw = fs.readFileSync(absPath, "utf8");
  const blocks = parseBlocksInFile(raw);
  const flagged = [];
  for (const b of blocks) {
    const issues = runBlockQualityChecks(b).filter((i) => shouldInclude(i.severity, minSeverity));
    if (!issues.length) continue;
    const entry = {
      id: blockStableId(rel, {
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
      }),
      relPath: rel,
      slug: b.slug,
      seif: b.seif,
      marker: b.marker,
      score: scoreBlock(issues),
      severity: severityLabel(maxSeverity(issues)),
      issues,
      hePreview: plainFromHtml(b.he).slice(0, 72),
      enPreview: plainFromHtml(b.en).slice(0, 72),
    };
    flagged.push(entry);
  }
  return flagged;
}

function summarize(allFlagged) {
  const byCode = {};
  const bySeverity = { error: 0, warn: 0, info: 0 };
  let totalBlocks = 0;
  for (const row of allFlagged) {
    totalBlocks++;
    bySeverity[row.severity] = (bySeverity[row.severity] || 0) + 1;
    for (const iss of row.issues) {
      byCode[iss.code] = (byCode[iss.code] || 0) + 1;
    }
  }
  return { byCode, bySeverity, flaggedBlocks: totalBlocks };
}

function writeReports(opts, allFlagged, filesScanned, blocksScanned) {
  fs.mkdirSync(opts.reportDir, { recursive: true });
  const summary = summarize(allFlagged);
  const generatedAt = new Date().toISOString();

  const jsonPath = path.join(opts.reportDir, "quality-report.json");
  const doc = {
    generatedAt,
    outRoot: opts.outRoot,
    filesScanned,
    blocksScanned,
    flaggedBlocks: allFlagged.length,
    summary,
    blocks: allFlagged,
  };
  fs.writeFileSync(jsonPath, JSON.stringify(doc, null, 2), "utf8");

  const mdLines = [
    "# CM001 — English quality report",
    "",
    `Generated: ${generatedAt}`,
    "",
    `| Metric | Count |`,
    `|--------|------:|`,
    `| Files scanned | ${filesScanned} |`,
    `| Blocks scanned | ${blocksScanned} |`,
    `| Blocks flagged (≥ ${opts.minSeverity}) | ${allFlagged.length} |`,
    `| Error-level blocks | ${summary.bySeverity.error || 0} |`,
    `| Warn-level blocks | ${summary.bySeverity.warn || 0} |`,
    `| Info-level blocks | ${summary.bySeverity.info || 0} |`,
    "",
    "## Issue codes",
    "",
    "| Code | Blocks |",
    "|------|-------:|",
  ];
  for (const [code, n] of Object.entries(summary.byCode).sort((a, b) => b[1] - a[1])) {
    mdLines.push(`| \`${code}\` | ${n} |`);
  }
  mdLines.push("", "## Samples (lowest scores)", "", "| Score | Sev | Siman/file | Issue | EN preview |", "|------:|-----|--------------|-------|-------------|");
  const samples = [...allFlagged].sort((a, b) => a.score - b.score).slice(0, 40);
  for (const row of samples) {
    const codes = row.issues.map((i) => i.code).join(", ");
    const en = row.enPreview.replace(/\|/g, "\\|");
    mdLines.push(`| ${row.score} | ${row.severity} | \`${row.relPath}\` | ${codes} | ${en}… |`);
  }
  fs.writeFileSync(path.join(opts.reportDir, "quality-report.md"), mdLines.join("\n") + "\n", "utf8");

  const queue = [...allFlagged].sort((a, b) => {
    const sd = (SEVERITY[b.severity] ?? 0) - (SEVERITY[a.severity] ?? 0);
    if (sd !== 0) return sd;
    return a.score - b.score;
  });
  const qLines = [
    "# Quality review queue",
    "",
    `Generated: ${generatedAt}`,
    "",
    "> Blocks needing editorial attention (machine translation heuristics).",
    "",
    "| Score | Sev | Path | seif | marker | Issues | Hebrew | English |",
    "|------:|-----|------|------|--------|--------|--------|---------|",
  ];
  for (const row of queue.slice(0, opts.maxQueueLines)) {
    const issues = row.issues.map((i) => i.code).join(", ");
    const he = row.hePreview.replace(/\|/g, "\\|");
    const en = row.enPreview.replace(/\|/g, "\\|");
    qLines.push(
      `| ${row.score} | ${row.severity} | \`${row.relPath}\` | ${row.seif} | ${row.marker} | ${issues} | ${he}… | ${en}… |`
    );
  }
  if (queue.length > opts.maxQueueLines) {
    qLines.push("", `_… and ${queue.length - opts.maxQueueLines} more in quality-report.json_`);
  }
  fs.writeFileSync(path.join(opts.reportDir, "quality-review-queue.md"), qLines.join("\n") + "\n", "utf8");

  return { jsonPath };
}

function main() {
  const opts = parseArgs();
  const minLevel = SEVERITY[opts.minSeverity];
  const files = collectFiles(opts.outRoot, opts.siman);
  const allFlagged = [];
  let blocksScanned = 0;

  for (const fp of files) {
    const raw = fs.readFileSync(fp, "utf8");
    blocksScanned += parseBlocksInFile(raw).length;
    allFlagged.push(...scanFile(fp, opts.outRoot, opts.minSeverity));
  }

  const summary = summarize(allFlagged);
  console.log(`Quality scan: ${files.length} file(s), ${blocksScanned} block(s)`);
  console.log(
    `Flagged (≥ ${opts.minSeverity}): ${allFlagged.length} — error: ${summary.bySeverity.error || 0}, warn: ${summary.bySeverity.warn || 0}, info: ${summary.bySeverity.info || 0}`
  );
  if (Object.keys(summary.byCode).length) {
    console.log("Top issue codes:");
    for (const [code, n] of Object.entries(summary.byCode).sort((a, b) => b[1] - a[1]).slice(0, 8)) {
      console.log(`  ${code}: ${n}`);
    }
  }

  if (opts.writeReports) {
    const { jsonPath } = writeReports(opts, allFlagged, files.length, blocksScanned);
    console.log(`Wrote ${path.relative(OC_ROOT, jsonPath)}`);
    console.log(`Wrote ${path.relative(OC_ROOT, path.join(opts.reportDir, "quality-report.md"))}`);
    console.log(`Wrote ${path.relative(OC_ROOT, path.join(opts.reportDir, "quality-review-queue.md"))}`);
  }

  if (opts.failOn) {
    const failLevel = SEVERITY[opts.failOn];
    const bad = allFlagged.filter((r) => (SEVERITY[r.severity] ?? 0) >= failLevel);
    if (bad.length) {
      console.error(`\nFail-on ${opts.failOn}: ${bad.length} block(s) at or above threshold`);
      process.exit(1);
    }
  }
}

main();
