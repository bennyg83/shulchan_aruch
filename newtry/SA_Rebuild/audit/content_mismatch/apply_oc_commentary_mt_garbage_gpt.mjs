/**
 * Apply APPROVE-only OC kit 02 commentary MT-garbage GPT completions to corpus en.html.
 *
 *   node apply_oc_commentary_mt_garbage_gpt.mjs --dry-run
 *   node apply_oc_commentary_mt_garbage_gpt.mjs --apply
 *
 * Requires prior eval:
 *   02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT_GPT_RESULT_EVAL.json
 *   02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT_GPT_RESULT.json
 *
 * Writes en.html only. Never touches he.html. Never applies HOLD/REJECT.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;
const LIVE = path.resolve(__dirname, "../../../..");
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);
const KIT_NAME = "02_OC_COMMENTARY_MT_GARBAGE_GPT_KIT";
const SEED_ID = "oc1/siman244/seif-005/netiv-chayim";

function parseArgs(argv) {
  let mode = null;
  for (const a of argv) {
    if (a === "--dry-run") mode = "dry-run";
    else if (a === "--apply") mode = "apply";
    else if (a === "--help" || a === "-h") {
      console.log(
        "Usage: node apply_oc_commentary_mt_garbage_gpt.mjs --dry-run | --apply"
      );
      process.exit(0);
    }
  }
  if (!mode) {
    console.error("Specify --dry-run or --apply");
    process.exit(1);
  }
  return { apply: mode === "apply", mode };
}

function readText(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

function normalizeEnCell(text) {
  let t = String(text ?? "").replace(/\r\n/g, "\n").trim();
  if (!t.endsWith("\n")) t += "\n";
  return t;
}

function main() {
  const { apply, mode } = parseArgs(process.argv.slice(2));
  const evalPath = path.join(AUDIT, `${KIT_NAME}_GPT_RESULT_EVAL.json`);
  const gptPath = path.join(AUDIT, `${KIT_NAME}_GPT_RESULT.json`);

  if (!fs.existsSync(evalPath)) {
    console.error(`Missing eval: ${evalPath}`);
    process.exit(1);
  }
  if (!fs.existsSync(gptPath)) {
    console.error(`Missing GPT result: ${gptPath}`);
    process.exit(1);
  }

  const evalDoc = JSON.parse(fs.readFileSync(evalPath, "utf8"));
  const gptCases = JSON.parse(fs.readFileSync(gptPath, "utf8"));
  const gptById = new Map(gptCases.map((c) => [c.id, c]));

  const approved = (evalDoc.results || []).filter((r) => r.verdict === "APPROVE");
  console.log(
    `[apply] ${KIT_NAME}: ${approved.length} APPROVE (mode=${mode})`
  );

  const applied = [];
  const failed = [];
  const skipped = [];

  for (const row of approved) {
    const id = row.id;
    const gpt = gptById.get(id);
    const enPath = path.join(CORPUS, id, "en.html");
    const hePath = path.join(CORPUS, id, "he.html");

    if (!gpt) {
      failed.push({ id, reason: "missing_gpt_case" });
      continue;
    }
    if (!fs.existsSync(hePath)) {
      failed.push({ id, reason: "missing_he_html" });
      continue;
    }

    const newEn = typeof gpt.new_en === "string" ? gpt.new_en.trim() : "";
    if (!newEn) {
      failed.push({ id, reason: "empty_new_en" });
      continue;
    }

    const before = readText(enPath);
    const after = normalizeEnCell(newEn);

    if (before != null && before.replace(/\r\n/g, "\n").trim() === newEn) {
      skipped.push({ id, reason: "already_identical" });
      console.log(`SKIP ${id}: already identical`);
      continue;
    }

    console.log(
      `${apply ? "APPLY" : "PLAN"} ${id}: en ${before?.length ?? 0} -> ${after.length} chars`
    );

    if (apply) {
      fs.mkdirSync(path.dirname(enPath), { recursive: true });
      fs.writeFileSync(enPath, after, "utf8");
    }

    applied.push({
      id,
      enPath,
      enCharsBefore: before?.length ?? 0,
      enCharsAfter: after.length,
      created_en: before == null,
      applied: apply,
      reason: row.reason,
      part: row.part,
    });
  }

  const auditPath = path.join(
    AUDIT,
    `${KIT_NAME}_${apply ? "APPLY" : "DRY_RUN"}.json`
  );
  const doc = {
    scannedAt: new Date().toISOString(),
    kit: KIT_NAME,
    mode: apply ? "APPLY" : "DRY-RUN",
    approvedCount: approved.length,
    applied,
    skipped,
    failed,
    counts: {
      applied: applied.length,
      skipped: skipped.length,
      failed: failed.length,
    },
    seed_netiv_244_5:
      applied.find((a) => a.id === SEED_ID) ||
      skipped.find((a) => a.id === SEED_ID) ||
      null,
  };
  fs.writeFileSync(auditPath, JSON.stringify(doc, null, 2) + "\n", "utf8");

  console.log(
    `[done] applied=${doc.counts.applied} skipped=${doc.counts.skipped} failed=${doc.counts.failed}`
  );
  console.log(`wrote ${path.basename(auditPath)}`);
}

main();
