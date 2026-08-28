/**
 * EN_TRUNC editorial part01 — apply APPROVE fresh translations from GPT eval.
 *
 *   node apply_en_trunc_editorial_part01.mjs --dry-run
 *   node apply_en_trunc_editorial_part01.mjs --apply
 *   node apply_en_trunc_editorial_part01.mjs --apply --ids oc1/siman289/seif-001/peri-megadim,...
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
const EVAL = path.join(__dirname, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01_EVAL.json");
const GPT = path.join(__dirname, "EN_TRUNC_EDITORIAL_GPT_RESULT_part01.json");

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

function pickSegments(gptCase, heSegs) {
  const enSegs = gptCase.en_segments;
  const fullSegs = gptCase.segments_en;
  if (Array.isArray(enSegs) && enSegs.length === heSegs) {
    return { segs: enSegs, source: "en_segments" };
  }
  if (Array.isArray(fullSegs) && fullSegs.length === heSegs) {
    return { segs: fullSegs, source: "segments_en" };
  }
  if (Array.isArray(enSegs) && enSegs.length >= 2) {
    return { segs: enSegs, source: "en_segments" };
  }
  if (Array.isArray(fullSegs) && fullSegs.length >= 2) {
    return { segs: fullSegs, source: "segments_en" };
  }
  return { segs: enSegs ?? fullSegs, source: "none" };
}

function main() {
  const apply = process.argv.includes("--apply");
  const evalDoc = JSON.parse(fs.readFileSync(EVAL, "utf8"));
  const gptCases = JSON.parse(fs.readFileSync(GPT, "utf8"));
  const gptById = new Map(gptCases.map((c) => [c.id, c]));

  let approvedIds = evalDoc.results
    .filter((r) => r.verdict === "APPROVE")
    .map((r) => r.id);

  const overrideIds = parseIdsArg();
  if (overrideIds?.length) {
    approvedIds = overrideIds.filter((id) => {
      const row = evalDoc.results.find((r) => r.id === id);
      if (!row || row.verdict !== "APPROVE") {
        console.warn(`SKIP ${id}: not APPROVE in eval`);
        return false;
      }
      return true;
    });
  }

  console.log(
    `[en-trunc-editorial-part01] mode=${apply ? "APPLY" : "DRY-RUN"} approved=${approvedIds.length}`
  );

  const applied = [];
  const failed = [];

  for (const id of approvedIds) {
    const gptCase = gptById.get(id);
    const evalRow = evalDoc.results.find((r) => r.id === id);
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const enBefore = readText(enPath);
    const heRaw = readText(hePath);

    if (!gptCase) {
      failed.push({ id, reason: "missing_gpt_case" });
      console.log(`FAIL ${id}: missing GPT case`);
      continue;
    }
    if (enBefore == null || heRaw == null) {
      failed.push({ id, reason: "missing_corpus_file" });
      console.log(`FAIL ${id}: missing corpus file`);
      continue;
    }

    const heSegs = splitHtmlByBrSegments(heRaw).length;
    const enSegsBefore = splitHtmlByBrSegments(enBefore).length;
    const { segs, source } = pickSegments(gptCase, heSegs);

    if (!Array.isArray(segs) || segs.length < 2) {
      failed.push({ id, reason: `bad_segments len=${segs?.length ?? 0}` });
      console.log(`FAIL ${id}: segments invalid`);
      continue;
    }

    const enAfter = joinSegments(segs);
    const enSegsAfter = splitHtmlByBrSegments(enAfter).length;

    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id}: en ${enSegsBefore}→${enSegsAfter} (he=${heSegs}) [${source}] — ${evalRow?.reason ?? ""}`
    );

    if (enSegsAfter !== heSegs) {
      failed.push({
        id,
        reason: `post_apply_mismatch enAfter=${enSegsAfter} he=${heSegs}`,
      });
      console.log(`  WARN: segment count mismatch vs HE (${heSegs})`);
      continue;
    }

    if (apply) {
      fs.writeFileSync(enPath, enAfter, "utf8");
    }

    applied.push({
      id,
      enPath,
      heSegs,
      enSegsBefore,
      enSegsAfter,
      segmentSource: source,
      applied: apply,
    });
  }

  const auditPath = path.join(__dirname, "EN_TRUNC_EDITORIAL_PART01_APPLY.json");
  fs.writeFileSync(
    auditPath,
    JSON.stringify(
      {
        scannedAt: new Date().toISOString(),
        mode: apply ? "APPLY" : "DRY-RUN",
        approvedIds,
        applied,
        failed,
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
