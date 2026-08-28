/**
 * HE_HAS_MORE editorial ALL — apply APPROVE resegments from GPT eval.
 *
 * Actions: split_en, mixed_resegment_translate — join en_segments with <br /> in en.html only.
 * Hebrew untouched (editorial kit is EN-focused).
 *
 *   node apply_he_has_more_editorial_all.mjs --dry-run
 *   node apply_he_has_more_editorial_all.mjs --apply
 *   node apply_he_has_more_editorial_all.mjs --apply --ids oc1/siman5/seif-001/ateret-zekenim,...
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "../../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const EVAL = path.join(__dirname, "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_EVAL.json");
const GPT = path.join(__dirname, "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL.json");
const APPROVE_IDS = path.join(
  __dirname,
  "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL_APPROVE_IDS.txt"
);

const ALLOWED_ACTIONS = new Set(["split_en", "mixed_resegment_translate"]);

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function splitHtmlByBrSegments(html) {
  if (!html || typeof html !== "string") return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length > 0 ? parts : [String(html).trim()].filter(Boolean);
}

function joinSegments(segs) {
  return segs.join("<br />\n") + (segs.length ? "\n" : "");
}

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

function parseIdsArg() {
  const idx = process.argv.indexOf("--ids");
  if (idx === -1) return null;
  return process.argv[idx + 1].split(",").map((s) => s.trim()).filter(Boolean);
}

function loadApproveIds(evalDoc) {
  const overrideIds = parseIdsArg();
  if (overrideIds?.length) {
    return overrideIds.filter((id) => {
      const row = evalDoc.results.find((r) => r.id === id);
      if (!row || row.verdict !== "APPROVE") {
        console.warn(`SKIP ${id}: not APPROVE in eval`);
        return false;
      }
      return true;
    });
  }

  const fromFile = readText(APPROVE_IDS);
  if (fromFile) {
    const ids = fromFile
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    const evalApprove = new Set(
      evalDoc.results.filter((r) => r.verdict === "APPROVE").map((r) => r.id)
    );
    return ids.filter((id) => {
      if (!evalApprove.has(id)) {
        console.warn(`SKIP ${id}: not APPROVE in eval`);
        return false;
      }
      return true;
    });
  }

  return evalDoc.results
    .filter((r) => r.verdict === "APPROVE")
    .map((r) => r.id);
}

function main() {
  const apply = process.argv.includes("--apply");
  const dryRun = process.argv.includes("--dry-run") || !apply;
  const evalDoc = JSON.parse(fs.readFileSync(EVAL, "utf8"));
  const gptCases = JSON.parse(fs.readFileSync(GPT, "utf8"));
  const gptById = new Map(gptCases.map((c) => [c.id, c]));

  const approvedIds = loadApproveIds(evalDoc);

  console.log(
    `[he-has-more-editorial-all] mode=${apply ? "APPLY" : "DRY-RUN"} approved=${approvedIds.length}`
  );

  const applied = [];
  const failed = [];

  for (const id of approvedIds) {
    const gptCase = gptById.get(id);
    const evalRow = evalDoc.results.find((r) => r.id === id);
    const action = gptCase?.action ?? evalRow?.action;
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enBefore = readText(enPath);
    const heRaw = readText(hePath);

    if (!gptCase) {
      failed.push({ id, reason: "missing_case" });
      console.log(`FAIL ${id}: missing GPT case`);
      continue;
    }
    if (!ALLOWED_ACTIONS.has(action)) {
      failed.push({ id, reason: `bad_action:${action}` });
      console.log(`FAIL ${id}: action ${action} not in APPROVE set`);
      continue;
    }
    if (enBefore == null || heRaw == null) {
      failed.push({ id, reason: "missing_corpus_file" });
      console.log(`FAIL ${id}: missing corpus file`);
      continue;
    }

    const segs = gptCase.en_segments;
    if (!Array.isArray(segs) || segs.length < 2) {
      failed.push({ id, reason: `bad_en_segments len=${segs?.length ?? 0}` });
      console.log(`FAIL ${id}: en_segments invalid`);
      continue;
    }

    const heSegs = splitHtmlByBrSegments(heRaw).length;
    const enSegsBefore = splitHtmlByBrSegments(enBefore).length;
    const enAfter = joinSegments(segs);
    const enSegsAfter = splitHtmlByBrSegments(enAfter).length;

    const note = evalRow?.reason ?? gptCase.notes ?? "";

    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id} [${action}]: en ${enSegsBefore}->${enSegsAfter} (he=${heSegs}) — ${note}`
    );

    if (enSegsAfter !== heSegs) {
      failed.push({
        id,
        action,
        reason: `post_apply_mismatch enAfter=${enSegsAfter} he=${heSegs}`,
        enSegsBefore,
        enSegsAfter,
        heSegs,
      });
      console.log(`  FAIL: segment count mismatch vs HE (${heSegs})`);
      continue;
    }

    if (apply) {
      fs.writeFileSync(enPath, enAfter, "utf8");
    }

    applied.push({
      id,
      action,
      enPath,
      heSegs,
      enSegsBefore,
      enSegsAfter,
      applied: apply,
      reason: note,
    });
  }

  const auditPath = path.join(__dirname, "HE_HAS_MORE_EDITORIAL_ALL_APPLY.json");
  fs.writeFileSync(
    auditPath,
    JSON.stringify(
      {
        scannedAt: new Date().toISOString(),
        mode: apply ? "APPLY" : "DRY-RUN",
        source: "HE_HAS_MORE_EDITORIAL_GPT_RESULT_ALL",
        approvedIds,
        applied,
        failed,
        counts: {
          applied: applied.length,
          failed: failed.length,
          total: approvedIds.length,
        },
      },
      null,
      2
    ) + "\n",
    "utf8"
  );
  console.log(`\n[audit] ${auditPath}`);
  console.log(`Applied: ${applied.length} Failed: ${failed.length}`);
  if (failed.length) process.exitCode = 1;
}

main();
