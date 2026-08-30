/**
 * Post OPEN_CLASS_B_C apply: write SEGMENT_RESCAN, rebuild remaining 1-case kit, update INDEX.
 *   node post_open_class_b_c_rescan_rebuild.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const AUDIT = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(AUDIT, "../../../..");

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

const remainingOpen = [
  {
    id: "yd1/siman109/seif-001/beur-hagra",
    reason: "content_drift HOLD — split_en not verbatim vs corpus",
    he: 11,
    en: 4,
  },
];

const apply = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "OPEN_CLASS_B_C_APPLY.json"), "utf8")
);
const evalDoc = JSON.parse(
  fs.readFileSync(
    path.join(AUDIT, "OPEN_CLASS_B_C_GPT_KIT_GPT_RESULT_EVAL.json"),
    "utf8"
  )
);

const doc = {
  scannedAt: all.scannedAt,
  label: "post_open_class_b_c_apply_2026-08-30",
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
    source: "Pre B+C apply — Class A closed; 15 B+C open (27 actionable total with prior)",
    totals: {
      issues: 86,
      actionable_excluding_he_missing: 27,
      byKind: { he_missing: 59, he_has_more_segments: 26, en_truncated_vs_multi_he: 1 },
    },
  },
  deltaFromBaseline: {
    totalIssues: issues - 86,
    actionable_delta: actionable - 27,
  },
  apply_session: {
    batch: "OPEN_CLASS_B_C_GPT",
    cells_applied: apply.reallyApplied?.length ?? 14,
    commit: "30298d6f8b",
    eval: "OPEN_CLASS_B_C_GPT_KIT_GPT_RESULT_EVAL.json",
    apply_log: "OPEN_CLASS_B_C_APPLY.json",
    verdicts: evalDoc.meta?.summary,
    hold_ids: remainingOpen.map((r) => r.id),
  },
  remaining_open_actionable: remainingOpen,
};

fs.writeFileSync(
  path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.json"),
  JSON.stringify(doc, null, 2) + "\n"
);

const md = `# Segment rescan — post OPEN_CLASS_B_C apply (2026-08-30)

**Scanned:** ${all.scannedAt}  
**Apply:** ${apply.reallyApplied?.length ?? 14} cells from OPEN_CLASS_B_C GPT (commit \`30298d6f8b\`)  
**HOLD (not applied):** \`yd1/siman109/seif-001/beur-hagra\` — content_drift

## Totals

| Metric | Prior (pre B+C) | Post B+C | Δ |
|--------|----------------:|---------:|--:|
| **All issues** | 86 | ${issues} | **${issues - 86}** |
| **Actionable** (excl. he_missing) | 27 | ${actionable} | **${actionable - 27}** |
| he_missing | 59 | ${heMissing} | ${heMissing - 59} |
| he_has_more_segments | 26 | ${byKind.he_has_more_segments || 0} | |
| en_truncated_vs_multi_he | 1 | ${byKind.en_truncated_vs_multi_he || 0} | |

## Remaining actionable (excl. he_missing)

| ID | Reason |
|----|--------|
| \`yd1/siman109/seif-001/beur-hagra\` | content_drift HOLD — GPT \`split_en\` not verbatim; do not force-apply |

Machine JSON: \`SEGMENT_RESCAN_2026-08-30.json\`
`;

fs.writeFileSync(path.join(AUDIT, "SEGMENT_RESCAN_2026-08-30.md"), md);
console.log(
  JSON.stringify({ issues, actionable, heMissing, byKind, remaining: remainingOpen }, null, 2)
);

// Patch build_open_class_b_c lists to remaining-only, rebuild, then restore via rewrite of arrays in a temp approach:
// Prefer editing the build script's CLASS arrays via a remaining-only rebuild runner.
const buildSrc = fs.readFileSync(
  path.join(AUDIT, "build_open_class_b_c_gpt_kit.mjs"),
  "utf8"
);

// Write remaining-only builder by overriding CLASS_B / CLASS_C at runtime via env isn't supported —
// call node -e that imports after patching file temporarily.
const patched = buildSrc
  .replace(
    /const CLASS_B = \[[\s\S]*?\];/,
    `const CLASS_B = [];`
  )
  .replace(
    /const CLASS_C = \[[\s\S]*?\];/,
    `const CLASS_C = [\n  "yd1/siman109/seif-001/beur-hagra",\n];`
  )
  .replace(
    /15 open B\+C cases for GPT[^\"]*/,
    "1 remaining B+C case after GPT apply (content_drift HOLD) — retry split_en verbatim"
  )
  .replace(
    /# OPEN_CLASS_B_C_GPT_KIT — 15 open B\+C cases/,
    "# OPEN_CLASS_B_C_GPT_KIT — 1 remaining open B+C case"
  );

const tmpBuild = path.join(AUDIT, "_tmp_build_open_class_b_c_remaining.mjs");
fs.writeFileSync(tmpBuild, patched, "utf8");
try {
  execFileSync(process.execPath, [tmpBuild], {
    cwd: AUDIT,
    stdio: "inherit",
  });
} finally {
  fs.unlinkSync(tmpBuild);
}

// Update INDEX header + rescan totals to reflect post-apply state
const indexPath = path.join(AUDIT, "SEGMENT_GPT_KITS_INDEX.md");
let index = fs.readFileSync(indexPath, "utf8");
index = index.replace(
  /\*\*Last rebuild:\*\*[^\n]*/,
  `**Last rebuild:** ${new Date().toISOString()} (post OPEN_CLASS_B_C apply — 1 remaining)`
);

// Replace Rescan totals section
const rescanBlock = `## Rescan totals (post-apply)

| Kind | Open count |
|------|----------:|
| en_truncated_vs_multi_he | ${byKind.en_truncated_vs_multi_he || 0} |
| he_has_more_segments | ${byKind.he_has_more_segments || 0} |
| en_has_more_segments | ${byKind.en_has_more_segments || 0} |
| en_missing | ${byKind.en_missing || 0} |
| he_missing | ${heMissing} (EXCLUDED) |
| **Actionable** | **${actionable}** |
`;
if (/## Rescan totals \(post-apply\)/.test(index)) {
  index = index.replace(
    /## Rescan totals \(post-apply\)[\s\S]*?(?=\n## )/,
    rescanBlock + "\n"
  );
}

// Apply log append
if (!/OPEN_CLASS_B_C GPT — 14 applied/.test(index)) {
  index = index.replace(
    /(## Apply log\n)/,
    `$1\n- **2026-08-30:** OPEN_CLASS_B_C GPT — 14 applied (\`30298d6f8b\`); 1 HOLD content_drift (\`yd1/siman109/seif-001/beur-hagra\`); actionable → ${actionable}.\n`
  );
}

fs.writeFileSync(indexPath, index, "utf8");

const postPath = path.join(AUDIT, "OPEN_CLASS_B_C_POST_APPLY_RESCAN.json");
fs.writeFileSync(
  postPath,
  JSON.stringify(
    {
      scannedAt: all.scannedAt,
      after: "open_class_b_c_gpt_apply",
      commit: "30298d6f8b",
      applied: apply.reallyApplied?.length ?? 14,
      hold: remainingOpen,
      totals: doc.totals,
      actionable,
    },
    null,
    2
  ) + "\n"
);

console.log(`[done] actionable=${actionable} remaining kit rebuilt; INDEX updated`);
