/**
 * Write SEGMENT_RESCAN_2026-08-30.json/.md from ALL_volumes.json + apply meta.
 *   node _write_segment_rescan_2026-08-30.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const AUDIT = path.dirname(fileURLToPath(import.meta.url));
const all = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "ALL_volumes.json"), "utf8")
);

const byKind = {};
let pairs = 0;
let issues = 0;
for (const v of all.volumes) {
  pairs += v.pairs;
  issues += v.issues;
  for (const [k, n] of Object.entries(v.byKind || {})) {
    byKind[k] = (byKind[k] || 0) + n;
  }
}
const heMissing = byKind.he_missing || 0;
const actionable = issues - heMissing;
const priorActionable = 39;
const priorTotal = 98;

const marker = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "REMAINING_MARKER_FIX_REPORT.json"), "utf8")
);
const apply = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "REMAINING_GPT_ALL_APPLY.json"), "utf8")
);
const evalSummary = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "REMAINING_GPT_EVAL_SUMMARY.json"), "utf8")
);

const doc = {
  scannedAt: all.scannedAt,
  label: "post_reupload_apply_2026-08-30",
  corpusRoot: all.corpusRoot,
  volumes: ["oc1", "yd1", "eh1", "cm1"],
  totals: {
    pairs,
    issues,
    actionable_excluding_he_missing: actionable,
    byKind,
  },
  byVolume: all.volumes,
  baseline: {
    source:
      "After marker fixes (commit 17357dda2d) — ~39 actionable + 59 he_missing",
    totals: {
      issues: priorTotal,
      actionable_excluding_he_missing: priorActionable,
      byKind: { he_missing: 59 },
    },
  },
  deltaFromBaseline: {
    totalIssues: issues - priorTotal,
    actionable_delta: actionable - priorActionable,
  },
  apply_session: {
    batch: "full_reupload_all_10_2026-08-30",
    cells_applied: apply.totalApplied ?? 12,
    kits: "03 EN_TRUNC_MODERATE (10) + 04 BEER_DEGREE (2)",
    eval_summary: "REMAINING_GPT_EVAL_SUMMARY.json",
    marker_fix: "REMAINING_MARKER_FIX_REPORT.json",
    apply_log: "REMAINING_GPT_ALL_APPLY.json",
    marker_slots_fixed: marker.counts?.slotsFixed ?? null,
    still_hold: marker.counts?.stillHold ?? null,
    still_hold_by_reason: marker.stillHoldByReason ?? null,
    eval_kits: evalSummary.kits,
  },
};

fs.writeFileSync(
  path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"),
  JSON.stringify(doc, null, 2) + "\n"
);

const volRows = all.volumes
  .map((v) => {
    const top =
      Object.entries(v.byKind || {})
        .map(([k, n]) => `${k} (${n})`)
        .join(", ") || "—";
    return `| ${v.volume} | ${v.pairs} | ${v.issues} | ${top} |`;
  })
  .join("\n");

const md = `# Segment rescan — post reupload apply (2026-08-30)

**Scanned:** ${all.scannedAt}  
**Baseline:** ~39 actionable + 59 he_missing (after marker fixes, commit 17357dda2d)  
**Apply:** ${apply.totalApplied ?? 12} cells from reupload kits 03+04 ([REMAINING_GPT_ALL_APPLY.json](./REMAINING_GPT_ALL_APPLY.json))

## Totals

| Metric | Prior (post-marker) | Post-reupload | Δ |
|--------|--------------------:|--------------:|--:|
| **All issues** | ${priorTotal} | ${issues} | **${issues - priorTotal}** |
| **Actionable** (excl. he_missing) | ${priorActionable} | ${actionable} | **${actionable - priorActionable}** |
| he_missing | 59 | ${heMissing} | ${heMissing - 59} |
| he_has_more_segments | — | ${byKind.he_has_more_segments || 0} | |
| en_truncated_vs_multi_he | — | ${byKind.en_truncated_vs_multi_he || 0} | |
| en_has_more_segments | — | ${byKind.en_has_more_segments || 0} | |
| en_missing | — | ${byKind.en_missing || 0} | |

## By volume

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
${volRows}

## Eval this round

| Kit | APPROVE | HOLD | Applied |
|-----|--------:|-----:|--------:|
| 03 EN_TRUNC_MODERATE_REMAINING | 10 | 1 | 10 |
| 04 BEER_DEGREE_SPLIT_REMAINING | 2 | 0 | 2 |
| 06 HE_HAS_MORE_LIKUT_REMAINING | 0 | 9 | 0 |
| 07 HE_HAS_MORE_LIKUT_MERGED_REMAINING | 0 | 1 | 0 |
| 10 HE_HAS_MORE_EDITORIAL_REMAINING | 0 | 16 | 0 |
| **Total** | **12** | **27** | **12** |

HOLD reasons: content_drift (18), content_drift_vs_corpus_en (1), fresh_translate_quality (8).

Machine JSON: \`SEGMENT_RESCAN_2026-08-30.json\`
`;

fs.writeFileSync(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.md"), md);
console.log(
  JSON.stringify({ issues, actionable, heMissing, byKind }, null, 2)
);
