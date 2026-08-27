/**
 * Build EN_HAS_MORE_GLUED_REVIEW_PACK.json (+ .md pointer).
 * Read-only on corpus. Writes audit JSON/MD only.
 *
 *   node build_en_has_more_glued_review_pack.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIVE = path.resolve(__dirname, "../../../..");
const AUDIT = __dirname;
const CORPUS = path.join(
  LIVE,
  "newtry/OC_Mobile/oc318-mobile-reader/public/corpus"
);

const APPLIED = "oc1/siman32/seif-005/yad-ephraim";

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

function stripTags(html) {
  return String(html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function seifNum(seif) {
  if (typeof seif === "number") return seif;
  const m = String(seif).match(/(\d+)/);
  return m ? Number(m[1]) : seif;
}

function loadSegs(relPath) {
  const hePath = path.join(CORPUS, relPath, "he.html");
  const enPath = path.join(CORPUS, relPath, "en.html");
  if (!fs.existsSync(hePath) || !fs.existsSync(enPath)) {
    throw new Error(`Missing he/en for ${relPath}`);
  }
  const heRaw = fs.readFileSync(hePath, "utf8");
  const enRaw = fs.readFileSync(enPath, "utf8");
  return {
    he_segments: splitHtmlByBrSegments(heRaw).map(stripTags),
    en_segments: splitHtmlByBrSegments(enRaw).map(stripTags),
  };
}

const spot = JSON.parse(
  fs.readFileSync(path.join(AUDIT, "en_rejoin_11_spot_review.json"), "utf8")
);
const dry = JSON.parse(
  fs.readFileSync(
    path.join(AUDIT, "en_rejoin_continuations_dry_run.json"),
    "utf8"
  )
);

const rejectSpot = spot.cases.filter((c) => c.verdict === "REJECT");
const unsafeDry = dry.allCases.filter((c) => c.status === "unsafe");

const byId = new Map();

for (const c of rejectSpot) {
  const id = c.path;
  if (id === APPLIED) continue;
  const segs = loadSegs(id);
  byId.set(id, {
    id,
    volume: c.volume,
    siman: c.siman,
    seif: seifNum(c.seif),
    slug: c.slug,
    bucket: "reject_spot_review",
    heSegs: c.heSegs,
    enSegs: c.enSegs,
    unsafe_reason: null,
    prior_auto_merge_groups: c.proposedGroups,
    spot_review_suggested_alt: c.suggestedGroups ?? null,
    spot_verdict: "REJECT",
    spot_reason: c.reason,
    he_segments: segs.he_segments,
    en_segments: segs.en_segments,
    reviewer_output_template: {
      id,
      merge_groups: null,
      verdict: "ok_rejoin|needs_editorial|skip",
      notes: "",
    },
    _loaded: {
      he: segs.he_segments.length,
      en: segs.en_segments.length,
    },
  });
}

for (const c of unsafeDry) {
  const id = c.path;
  if (id === APPLIED) continue;
  if (byId.has(id)) {
    const existing = byId.get(id);
    existing.bucket = "reject_spot_review+unsafe_dry_run";
    existing.unsafe_reason = c.reason;
    continue;
  }
  const segs = loadSegs(id);
  byId.set(id, {
    id,
    volume: c.volume,
    siman: c.siman,
    seif: seifNum(c.seif),
    slug: c.slug,
    bucket: "unsafe_dry_run",
    heSegs: c.heSegs,
    enSegs: c.enSegs,
    unsafe_reason: c.reason,
    prior_auto_merge_groups: c.groups ?? null,
    spot_review_suggested_alt: null,
    spot_verdict: null,
    alignHint: c.alignHint,
    strongEnHeads: c.strongEnHeads,
    he_segments: segs.he_segments,
    en_segments: segs.en_segments,
    reviewer_output_template: {
      id,
      merge_groups: null,
      verdict: "ok_rejoin|needs_editorial|skip",
      notes: "",
    },
    _loaded: {
      he: segs.he_segments.length,
      en: segs.en_segments.length,
    },
  });
}

const volOrder = { oc1: 0, yd1: 1, eh1: 2, cm1: 3 };
const casesRaw = [...byId.values()].sort(
  (a, b) =>
    (volOrder[a.volume] ?? 9) - (volOrder[b.volume] ?? 9) ||
    a.siman - b.siman ||
    a.seif - b.seif ||
    a.slug.localeCompare(b.slug)
);

const mismatches = casesRaw.filter(
  (c) => c._loaded.he !== c.heSegs || c._loaded.en !== c.enSegs
);
if (mismatches.length) {
  console.warn(
    "[warn] segment count mismatches vs dry-run meta:",
    mismatches.map((c) => ({
      id: c.id,
      meta: [c.heSegs, c.enSegs],
      loaded: c._loaded,
    }))
  );
}

// Prefer live loaded counts if they differ (corpus may have changed for applied path only)
for (const c of casesRaw) {
  if (c._loaded.he !== c.heSegs || c._loaded.en !== c.enSegs) {
    c.heSegs = c._loaded.he;
    c.enSegs = c._loaded.en;
    c.seg_count_note =
      "Updated heSegs/enSegs from live corpus split (differed from prior audit meta)";
  }
}

const cases = casesRaw.map(({ _loaded, ...rest }) => rest);

const buckets = {};
for (const c of cases) buckets[c.bucket] = (buckets[c.bucket] || 0) + 1;

const pack = {
  meta: {
    created: new Date().toISOString(),
    purpose:
      "External AI: propose correct EN merge groups so enSegs===heSegs without gluing distinct notes",
    applied_excluded: [APPLIED],
    sources: {
      spot_review: "en_rejoin_11_spot_review.json",
      dry_run: "en_rejoin_continuations_dry_run.json",
      corpus: CORPUS,
      split: "normalize consecutive <br> then split on <br>; strip tags for segment text",
    },
    counts: {
      reject_spot_review: rejectSpot.length,
      unsafe_dry_run: unsafeDry.length,
      deduped_total: cases.length,
      expected: 58,
      by_bucket: buckets,
    },
    instructions_for_reviewer: [
      "For each case, read he_segments and en_segments.",
      "Propose merge_groups: array of arrays of EN indices, length === heSegs.",
      "Only merge true continuations; never glue distinct HE lemmas/notes.",
      'If not safely fixable by contiguous EN rejoin, set verdict: "needs_editorial" and explain.',
      "Return same case id; do not invent content.",
      "Output a JSON array of objects matching reviewer_output_template for every case.",
    ],
  },
  cases,
};

const outJson = path.join(AUDIT, "EN_HAS_MORE_GLUED_REVIEW_PACK.json");
fs.writeFileSync(outJson, JSON.stringify(pack, null, 2), "utf8");

const md = `# EN has_more glued — review pack

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Files

- JSON (full HE/EN segments): [\`EN_HAS_MORE_GLUED_REVIEW_PACK.json\`](./EN_HAS_MORE_GLUED_REVIEW_PACK.json)
- Audit folder: \`newtry/SA_Rebuild/audit/he_en_segment_mismatch/\`

## Scope

| Bucket | Count |
|--------|------:|
| REJECT from spot review (excl. applied APPROVE) | ${rejectSpot.length} |
| unsafe from continuations dry-run | ${unsafeDry.length} |
| **Deduped total** | **${cases.length}** |

Excluded (already applied): \`${APPLIED}\`

## Ask the other AI to return

A **JSON array** (only), one object per case:

\`\`\`json
[
  {
    "id": "oc1/siman128/seif-003/turei-zahav",
    "merge_groups": [[0,1],[2]],
    "verdict": "ok_rejoin",
    "notes": "brief reason"
  }
]
\`\`\`

- \`merge_groups\`: array of EN-index arrays; \`merge_groups.length === heSegs\`; indices must partition \`0..enSegs-1\` contiguously.
- \`verdict\`: \`ok_rejoin\` | \`needs_editorial\` | \`skip\`
- If \`needs_editorial\` / \`skip\`, \`merge_groups\` may be \`null\`.
- Do not invent HE/EN text; only propose regrouping.

Created: ${pack.meta.created}
`;

const outMd = path.join(AUDIT, "EN_HAS_MORE_GLUED_REVIEW_PACK.md");
fs.writeFileSync(outMd, md, "utf8");

console.log(
  JSON.stringify(
    {
      outJson,
      outMd,
      caseCount: cases.length,
      buckets,
      mismatches: mismatches.length,
      bytes: fs.statSync(outJson).size,
    },
    null,
    2
  )
);
