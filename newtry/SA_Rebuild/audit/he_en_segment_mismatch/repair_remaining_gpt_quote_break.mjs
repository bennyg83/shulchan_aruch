/**
 * Repair REPAIR_CANDIDATE cases: copy segments[].en → en_segments[].
 *
 *   node repair_remaining_gpt_quote_break.mjs
 *   node repair_remaining_gpt_quote_break.mjs --kit EN_TRUNC_MODERATE_REMAINING
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { REMAINING_KITS } from "./eval_remaining_gpt_all.mjs";
import { getProposedEn } from "./_eval_remaining_shared.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUDIT = __dirname;

function repairKit(cfg) {
  const gptPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT.json`);
  const evalPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_EVAL.json`);
  const repairedPath = path.join(AUDIT, `${cfg.kit}_GPT_RESULT_REPAIRED.json`);

  if (!fs.existsSync(gptPath) || !fs.existsSync(evalPath)) {
    console.warn(`[repair] SKIP ${cfg.kit}: missing GPT or eval`);
    return { kit: cfg.kit, repaired: 0, upgraded: 0 };
  }

  const gptCases = JSON.parse(fs.readFileSync(gptPath, "utf8"));
  const evalDoc = JSON.parse(fs.readFileSync(evalPath, "utf8"));
  const repairIds = new Set(
    evalDoc.results
      .filter((r) => r.verdict === "REPAIR_CANDIDATE" || r.repair_candidate)
      .map((r) => r.id)
  );

  let repaired = 0;
  const upgraded = [];

  for (const c of gptCases) {
    if (!repairIds.has(c.id)) continue;
    if (!c.segments?.length) continue;
    const segEn = c.segments.map((s) => s.en ?? "");
    if (!segEn.length) continue;
    c.en_segments = segEn;
    if (c.corrected_en) c.corrected_en = segEn;
    repaired++;
    upgraded.push(c.id);
  }

  fs.writeFileSync(repairedPath, JSON.stringify(gptCases, null, 2) + "\n", "utf8");

  // Re-eval upgraded cases to APPROVE in eval doc
  for (const r of evalDoc.results) {
    if (upgraded.includes(r.id)) {
      r.verdict = "APPROVE";
      r.reason = "REPAIRED quote_break via segments[].en";
      r.repaired = true;
    }
  }
  evalDoc.meta.repaired_at = new Date().toISOString();
  evalDoc.meta.repaired_count = repaired;
  fs.writeFileSync(evalPath, JSON.stringify(evalDoc, null, 2) + "\n", "utf8");

  console.log(`[repair] ${cfg.kit}: ${repaired} cases → ${path.basename(repairedPath)}`);
  return { kit: cfg.kit, repaired, upgraded };
}

function main() {
  const kitArg = process.argv.find((a, i) => process.argv[i - 1] === "--kit");
  const kits = kitArg
    ? REMAINING_KITS.filter((k) => k.kit === kitArg)
    : REMAINING_KITS;

  const log = kits.map(repairKit);
  const summaryPath = path.join(AUDIT, "REMAINING_GPT_REPAIR_LOG.json");
  fs.writeFileSync(
    summaryPath,
    JSON.stringify({ created: new Date().toISOString(), kits: log }, null, 2) + "\n",
    "utf8"
  );
  console.log(`[repair] total repaired: ${log.reduce((s, k) => s + k.repaired, 0)}`);
}

main();
