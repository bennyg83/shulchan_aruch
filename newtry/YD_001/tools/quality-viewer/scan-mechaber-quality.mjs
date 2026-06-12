import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile } from "../../yd001_block_lib.mjs";
import { runBlockQualityChecks, plainFromHtml } from "../../pipeline/lib/quality-checks.mjs";
import { loadLlmCacheMap } from "./llm-cache.mjs";
import { blockId as llmBlockId } from "./llm-validator.mjs";

const VIEWER_ROOT = path.dirname(fileURLToPath(import.meta.url));
const YD_ROOT = path.resolve(VIEWER_ROOT, "../..");
const OUTPUT_ROOT = path.join(YD_ROOT, "output");
const PROGRESS_LOG = path.join(YD_ROOT, "progress.log");

const FAIL_PATTERN =
  /Lord's Prayer|Hashem's Word|Capernaum|Holy Qur'an|psalmist|her age|the craft|Saturday|cold spot|hand recoils|first dish|allocated|Darbanan|Burburn|Gomma|Phosician|LibreTranslate|English translation pending/i;

export function loadProgressMeta() {
  if (!fs.existsSync(PROGRESS_LOG)) {
    return { loggedSimanim: new Set(), qualityPassSimanim: new Set(), lastLines: [] };
  }
  const loggedSimanim = new Set();
  const qualityPassSimanim = new Set();
  const lastLines = [];
  for (const line of fs.readFileSync(PROGRESS_LOG, "utf8").split("\n")) {
    const m1 = line.match(/siman_(\d+)\/mechaber (\d+) blocks DONE/);
    if (m1) loggedSimanim.add(Number(m1[1]));
    const m2 = line.match(/siman_(\d+) mechaber quality-pass/);
    if (m2) qualityPassSimanim.add(Number(m2[1]));
    if (line.includes("/mechaber") || line.includes("mechaber quality-pass")) {
      lastLines.push(line.trim());
    }
  }
  return {
    loggedSimanim,
    qualityPassSimanim,
    lastLines: lastLines.slice(-40).reverse(),
  };
}

function listMechaberSimanim() {
  if (!fs.existsSync(OUTPUT_ROOT)) return [];
  return fs
    .readdirSync(OUTPUT_ROOT)
    .filter((d) => /^siman_\d+$/.test(d))
    .map((d) => Number(d.replace("siman_", "")))
    .filter((n) =>
      fs.existsSync(path.join(OUTPUT_ROOT, `siman_${String(n).padStart(3, "0")}`, "mechaber"))
    )
    .sort((a, b) => a - b);
}

function scanBlock(b, relPath, siman) {
  const eng = b.en ?? "";
  const heb = b.he ?? "";
  const hePlain = plainFromHtml(heb);
  const enPlain = plainFromHtml(eng);
  const issues = runBlockQualityChecks({
    slug: b.slug,
    seif: b.seif,
    marker: b.marker,
    he: heb,
    en: eng,
  });
  const errors = issues.filter((i) => i.severity === "error");
  const warns = issues.filter((i) => i.severity === "warn");
  const failPattern = FAIL_PATTERN.test(eng);
  const ramaMissing = /<small>\s*הגה/i.test(heb) && !/\{Rama:/.test(eng);
  const hasRama = /\{Rama:/.test(eng);
  const passed =
    errors.length === 0 && !failPattern && !ramaMissing && !/^English translation pending/i.test(eng);

  return {
    id: llmBlockId(siman, relPath, b.seif, b.marker),
    seif: b.seif,
    marker: b.marker,
    relPath,
    passed,
    failPattern,
    ramaMissing,
    hasRama,
    errors,
    warns,
    hePreview: hePlain.slice(0, 220),
    enPreview: enPlain.slice(0, 320),
    heFull: hePlain,
    enFull: enPlain,
  };
}

export function scanMechaberQuality({ siman = null, llmCache = null } = {}) {
  const progress = loadProgressMeta();
  const cache = llmCache ?? loadLlmCacheMap();
  const simanim = siman ? [siman] : listMechaberSimanim();
  const rows = [];
  let totalBlocks = 0;
  let passedBlocks = 0;
  let errorBlocks = 0;
  let warnOnlyBlocks = 0;
  let failPatternBlocks = 0;
  let ramaMissingBlocks = 0;
  let llmReviewed = 0;
  let llmClean = 0;
  let llmPending = 0;

  for (const n of simanim) {
    const tag = String(n).padStart(3, "0");
    const dir = path.join(OUTPUT_ROOT, `siman_${tag}`, "mechaber");
    const blocks = [];
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".txt")).sort()) {
      const relPath = `siman_${tag}/mechaber/${file}`;
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      for (const b of parseBlocksInFile(raw)) {
        const row = scanBlock(b, relPath, n);
        const llm = cache.get(row.id);
        if (llm) {
          row.llm = {
            label: llm.label,
            confidence: llm.confidence,
            reason: llm.reason,
            flags: llm.flags,
            escalate: llm.escalate,
            clean: llm.clean,
            validatedAt: llm.validatedAt,
          };
          llmReviewed++;
          if (llm.clean) llmClean++;
          else llmPending++;
        }
        blocks.push(row);
        totalBlocks++;
        if (row.passed) passedBlocks++;
        if (row.errors.length) errorBlocks++;
        else if (row.warns.length) warnOnlyBlocks++;
        if (row.failPattern) failPatternBlocks++;
        if (row.ramaMissing) ramaMissingBlocks++;
      }
    }

    const failedBlocks = blocks.filter((b) => !b.passed);
    const status =
      failedBlocks.length === 0
        ? "pass"
        : failedBlocks.some((b) => b.errors.length || b.failPattern)
          ? "fail"
          : "warn";

    rows.push({
      siman: n,
      tag,
      status,
      blockCount: blocks.length,
      passedCount: blocks.filter((b) => b.passed).length,
      failedCount: failedBlocks.length,
      logged: progress.loggedSimanim.has(n),
      qualityPassTagged: progress.qualityPassSimanim.has(n),
      llmReviewed: blocks.filter((b) => b.llm).length,
      llmClean: blocks.filter((b) => b.llm?.clean).length,
      llmPending: blocks.filter((b) => b.llm && !b.llm.clean).length,
      blocks: siman ? blocks : undefined,
      topIssues: summarizeIssues(failedBlocks).slice(0, 6),
    });
  }

  const allRows = rows;
  return {
    generatedAt: new Date().toISOString(),
    scope: siman ? `siman_${String(siman).padStart(3, "0")}` : "mechaber-all",
    totals: {
      simanim: allRows.length,
      simanimPass: allRows.filter((r) => r.status === "pass").length,
      simanimWarn: allRows.filter((r) => r.status === "warn").length,
      simanimFail: allRows.filter((r) => r.status === "fail").length,
      blocks: totalBlocks,
      passedBlocks,
      warnOnlyBlocks,
      errorBlocks,
      failPatternBlocks,
      ramaMissingBlocks,
      loggedSimanim: progress.loggedSimanim.size,
      qualityPassTagged: progress.qualityPassSimanim.size,
      llmReviewed,
      llmClean,
      llmPending,
      llmUnreviewed: totalBlocks - llmReviewed,
    },
    progress: {
      lastLines: progress.lastLines,
    },
    simanim: allRows,
  };
}

function summarizeIssues(blocks) {
  const counts = {};
  for (const b of blocks) {
    if (b.failPattern) counts.fail_pattern = (counts.fail_pattern || 0) + 1;
    if (b.ramaMissing) counts.rama_missing = (counts.rama_missing || 0) + 1;
    for (const i of [...b.errors, ...b.warns]) {
      counts[i.code] = (counts[i.code] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);
}
