#!/usr/bin/env node
/**
 * Claude-aligned per-siman validation: validator error codes + manual grep sweeps.
 *
 *   node pipeline/validate-siman-claude-aligned.mjs --siman 84
 *   node pipeline/validate-siman-claude-aligned.mjs --siman 84 --fail-on error
 *   node pipeline/validate-siman-claude-aligned.mjs --from 1 --to 99 --write-reports
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../yd001_block_lib.mjs";
import { walkOc001PartFiles, relFromOutRoot, blockStableId } from "./lib/blocks.mjs";
import { runBlockQualityChecks, plainFromHtml } from "./lib/quality-checks.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(__dirname, "..");
const DEFAULT_OUT = path.join(YD_ROOT, "output");
const DEFAULT_REPORT_DIR = path.join(YD_ROOT, "checklist-output");

/** Error-level validator codes used in Claude-aligned audit. */
const VALIDATOR_CODES = new Set([
  "mt_garbage",
  "hebrew_in_english",
  "untranslated_copy",
  "mt_api_artifact",
  "pending_placeholder",
  "literal_bow_swim",
  "html_in_english",
  "json_wrapped_english",
  "hybrid_mt_garbage",
]);

/** Grep patterns from claude-aligned audit (id → regex). */
const GREP_PATTERNS = [
  { id: "grep_meshkonah", re: /\bmeshkonah\b/i },
  { id: "grep_meluh", re: /\bmeluh\b/i },
  { id: "grep_katzuzot", re: /\bkatzuzot\b/i },
  { id: "grep_saturday", re: /\bSaturday\b/i },
  { id: "grep_lords_prayer", re: /Lord['\u2019]s Prayer/i },
  { id: "grep_her_age", re: /\bher age\b/i },
  { id: "grep_the_craft", re: /\bthe craft\b/i },
  { id: "grep_mymemory", re: /MYMEMORY/i },
  { id: "grep_haar_loop", re: /ha'ar hu ha'ar/i },
  { id: "grep_kulya", re: /\bkulya\b/i },
  { id: "grep_charitz", re: /\bcharitz\b/i },
  { id: "grep_laketah", re: /\blaketah\b/i },
  { id: "grep_hand_recoils", re: /\bhand recoils\b/i },
];

/** Simanim where treifot transliterations are expected. */
const TREIFOT_SIMANIM = new Set([
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
]);

const GREP_ALLOWLIST = new Set(["grep_kulya", "grep_charitz", "grep_laketah"]);

function parseArgs() {
  const opts = {
    siman: null,
    from: null,
    to: null,
    outRoot: DEFAULT_OUT,
    failOn: null,
    writeReports: false,
    reportDir: DEFAULT_REPORT_DIR,
  };
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--siman":
        opts.siman = parseInt(args[++i], 10);
        break;
      case "--from":
        opts.from = parseInt(args[++i], 10);
        break;
      case "--to":
        opts.to = parseInt(args[++i], 10);
        break;
      case "--root":
      case "--out":
        opts.outRoot = path.resolve(args[++i]);
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
    }
  }
  if (!opts.siman && (opts.from == null || opts.to == null)) {
    throw new Error("Need --siman N or --from A --to B");
  }
  return opts;
}

function inferSimanFromPath(relPath) {
  const m = relPath.match(/siman_(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function grepHits(enPlain, siman) {
  const hits = [];
  for (const { id, re } of GREP_PATTERNS) {
    if (!re.test(enPlain)) continue;
    if (GREP_ALLOWLIST.has(id) && TREIFOT_SIMANIM.has(siman)) continue;
    if (id === "grep_the_craft" && siman === 24) continue;
    hits.push(id);
  }
  return hits;
}

function scanSiman(outRoot, siman) {
  const pad = String(siman).padStart(3, "0");
  const needle = `${path.sep}siman_${pad}${path.sep}`;
  const files = [...walkOc001PartFiles(outRoot)].filter((f) => f.includes(needle));
  const failingBlocks = [];
  let totalBlocks = 0;
  const validatorCounts = {};
  const grepCounts = {};
  const fileSet = new Set();

  for (const absPath of files) {
    const rel = relFromOutRoot(absPath, outRoot);
    const raw = fs.readFileSync(absPath, "utf8");
    const blocks = parseBlocksInFile(raw);
    for (const b of blocks) {
      const he = String(b.he ?? "").trim();
      if (!he) continue;
      totalBlocks++;
      const enPlain = plainFromHtml(b.en);
      const issues = runBlockQualityChecks(b).filter(
        (i) => i.severity === "error" && VALIDATOR_CODES.has(i.code)
      );
      const grep = grepHits(enPlain, siman);
      if (!issues.length && !grep.length) continue;

      const id = blockStableId(rel, { slug: b.slug, seif: b.seif, marker: b.marker });
      for (const i of issues) validatorCounts[i.code] = (validatorCounts[i.code] || 0) + 1;
      for (const g of grep) grepCounts[g] = (grepCounts[g] || 0) + 1;
      fileSet.add(rel);
      failingBlocks.push({
        id,
        relPath: rel,
        slug: b.slug,
        seif: b.seif,
        marker: b.marker,
        validator: issues.map((i) => i.code),
        grep,
        enPreview: enPlain.slice(0, 80),
      });
    }
  }

  return {
    siman,
    pass: failingBlocks.length === 0,
    failBlocks: failingBlocks.length,
    totalBlocks,
    validator: validatorCounts,
    grep: grepCounts,
    files: [...fileSet].sort(),
    blocks: failingBlocks,
  };
}

function simanRange(opts) {
  if (opts.siman != null) return [opts.siman];
  const out = [];
  for (let n = opts.from; n <= opts.to; n++) out.push(n);
  return out;
}

function main() {
  const opts = parseArgs();
  const simanim = simanRange(opts);
  const results = simanim.map((s) => scanSiman(opts.outRoot, s));
  const passCount = results.filter((r) => r.pass).length;
  const failCount = results.length - passCount;

  for (const r of results) {
    const tag = String(r.siman).padStart(3, "0");
    if (r.pass) {
      console.log(`siman_${tag}: PASS (${r.totalBlocks} blocks)`);
    } else {
      console.log(
        `siman_${tag}: FAIL — ${r.failBlocks}/${r.totalBlocks} block(s) — validator: ${JSON.stringify(r.validator)} grep: ${JSON.stringify(r.grep)}`
      );
      for (const b of r.blocks.slice(0, 8)) {
        console.log(`  ${b.id} [${[...b.validator, ...b.grep].join(",")}] ${b.enPreview}…`);
      }
      if (r.failBlocks > 8) console.log(`  … and ${r.failBlocks - 8} more`);
    }
  }

  if (simanim.length > 1) {
    console.log(`\nSummary: ${passCount} pass, ${failCount} fail (${simanim.length} simanim)`);
  }

  if (opts.writeReports) {
    fs.mkdirSync(opts.reportDir, { recursive: true });
    const doc = {
      generatedAt: new Date().toISOString(),
      method: "claude-aligned",
      validatorCodes: [...VALIDATOR_CODES],
      grepPatterns: GREP_PATTERNS.map((p) => p.id),
      passCount,
      failCount,
      simanim: results.map(({ blocks, ...rest }) => rest),
      failingSimanim: results.filter((r) => !r.pass).map(({ blocks, ...rest }) => rest),
    };
    const outPath =
      simanim.length === 1
        ? path.join(opts.reportDir, `claude-aligned-siman-${String(simanim[0]).padStart(3, "0")}.json`)
        : path.join(
            opts.reportDir,
            `claude-aligned-${String(simanim[0]).padStart(3, "0")}-${String(simanim[simanim.length - 1]).padStart(3, "0")}.json`
          );
    fs.writeFileSync(outPath, JSON.stringify(doc, null, 2), "utf8");
    console.log(`Wrote ${path.relative(YD_ROOT, outPath)}`);
  }

  if (opts.failOn === "error") {
    const bad = results.filter((r) => !r.pass);
    if (bad.length) {
      console.error(`\nFail-on error: ${bad.length} siman(s) with failing blocks`);
      process.exit(1);
    }
  }
}

main();
