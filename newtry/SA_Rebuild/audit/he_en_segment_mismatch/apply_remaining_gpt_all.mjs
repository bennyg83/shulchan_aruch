/**
 * Apply APPROVE (+ repaired) _REMAINING GPT batches to corpus en.html only.
 *
 *   node apply_remaining_gpt_all.mjs --dry-run
 *   node apply_remaining_gpt_all.mjs --apply
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REMAINING_KITS } from "./eval_remaining_gpt_all.mjs";
import {
  getProposedEn,
  joinSegments,
  splitHtmlByBrSegments,
} from "./_eval_remaining_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const REPO = path.resolve(__dirname, "../../../..");
const CORPUS_ROOT = path.join(
  REPO,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

function loadGptCases(cfg) {
  const repaired = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_REPAIRED.json`);
  const gpt = path.join(AUDIT, `${cfg.kit}_GPT_RESULT.json`);
  const p = fs.existsSync(repaired) ? repaired : gpt;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function applyKit(cfg, apply) {
  const evalPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_EVAL.json`);
  if (!fs.existsSync(evalPath)) {
    console.warn(`[apply] SKIP ${cfg.kit}: no eval`);
    return { kit: cfg.kit, applied: [], failed: [] };
  }

  const evalDoc = JSON.parse(fs.readFileSync(evalPath, "utf8"));
  const gptCases = loadGptCases(cfg);
  const gptById = new Map(gptCases.map((c) => [c.id, c]));

  const approvedIds = evalDoc.results
    .filter((r) => r.verdict === "APPROVE")
    .map((r) => r.id);

  console.log(`[apply] ${cfg.kit}: ${approvedIds.length} APPROVE`);

  const applied = [];
  const failed = [];

  for (const id of approvedIds) {
    const gptCase = gptById.get(id);
    const evalRow = evalDoc.results.find((r) => r.id === id);
    const enPath = path.join(CORPUS_ROOT, id, "en.html");
    const hePath = path.join(CORPUS_ROOT, id, "he.html");
    const heRaw = readText(hePath);

    if (!gptCase) {
      failed.push({ id, reason: "missing_gpt_case" });
      continue;
    }
    if (heRaw == null) {
      failed.push({ id, reason: "missing_he_html" });
      continue;
    }

    const segs = getProposedEn(gptCase);
    if (!Array.isArray(segs) || !segs.length) {
      failed.push({ id, reason: "empty_en_segments" });
      continue;
    }

    const enBefore = readText(enPath);
    const enSegsBefore = enBefore ? splitHtmlByBrSegments(enBefore).length : 0;
    const heSegs = splitHtmlByBrSegments(heRaw).length;
    const enAfter = joinSegments(segs);
    const enSegsAfter = splitHtmlByBrSegments(enAfter).length;

    if (enSegsBefore === heSegs && enSegsBefore > 0) {
      console.log(`SKIP ${id}: already aligned (${heSegs} segs)`);
      applied.push({
        id,
        kit: cfg.kit,
        enPath,
        heSegs,
        enSegsBefore,
        enSegsAfter: enSegsBefore,
        created_en: false,
        applied: false,
        skipped: true,
        reason: "already_aligned",
      });
      continue;
    }

    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id}: en ${enSegsBefore}->${enSegsAfter} (he=${heSegs}) — ${evalRow?.reason ?? ""}`
    );

    if (enSegsAfter !== heSegs) {
      failed.push({
        id,
        reason: `post_apply_mismatch enAfter=${enSegsAfter} he=${heSegs}`,
      });
      continue;
    }

    if (apply) {
      fs.mkdirSync(path.dirname(enPath), { recursive: true });
      fs.writeFileSync(enPath, enAfter, "utf8");
    }

    applied.push({
      id,
      kit: cfg.kit,
      enPath,
      heSegs,
      enSegsBefore,
      enSegsAfter,
      created_en: enBefore == null,
      applied: apply,
      reason: evalRow?.reason,
    });
  }

  const auditPath = path.join(AUDIT, `${cfg.kit}_REMAINING_APPLY.json`);
  fs.writeFileSync(
    auditPath,
    JSON.stringify(
      {
        scannedAt: new Date().toISOString(),
        kit: cfg.kit,
        mode: apply ? "APPLY" : "DRY-RUN",
        approvedIds,
        applied,
        failed,
        counts: { applied: applied.length, failed: failed.length },
      },
      null,
      2
    ) + "\n",
    "utf8"
  );

  return { kit: cfg.kit, num: cfg.num, applied, failed };
}

function main() {
  const apply = process.argv.includes("--apply");
  const kitArg = process.argv.find((a, i) => process.argv[i - 1] === "--kit");
  const kits = kitArg
    ? REMAINING_KITS.filter((k) => k.kit === kitArg)
    : REMAINING_KITS;

  const allApplied = [];
  const allFailed = [];
  const byKit = [];

  for (const cfg of kits) {
    const out = applyKit(cfg, apply);
    byKit.push({
      kit: out.kit,
      num: cfg.num,
      applied: out.applied.length,
      failed: out.failed.length,
    });
    allApplied.push(...out.applied);
    allFailed.push(...out.failed);
  }

  const masterPath = path.join(AUDIT, "REMAINING_GPT_ALL_APPLY.json");
  const reallyApplied = allApplied.filter((a) => a.applied && !a.skipped);
  const skipped = allApplied.filter((a) => a.skipped);
  fs.writeFileSync(
    masterPath,
    JSON.stringify(
      {
        scannedAt: new Date().toISOString(),
        mode: apply ? "APPLY" : "DRY-RUN",
        batch: "full_reupload_all_10_2026-08-30",
        byKit,
        totalApplied: reallyApplied.length,
        totalSkippedAligned: skipped.length,
        totalFailed: allFailed.length,
        applied: reallyApplied,
        skipped,
        failed: allFailed,
      },
      null,
      2
    ) + "\n",
    "utf8"
  );

  console.log(
    `\n[apply] total applied=${reallyApplied.length} skipped_aligned=${skipped.length} failed=${allFailed.length} → ${masterPath}`
  );
  if (allFailed.length) process.exitCode = 1;
}

main();
