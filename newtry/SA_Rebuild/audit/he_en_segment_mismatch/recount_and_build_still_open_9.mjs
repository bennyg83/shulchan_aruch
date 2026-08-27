/** Live recount + build GLUED_STILL_OPEN_9_KIT.json/.md — audit only. */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CORPUS = path.resolve(
  __dirname,
  "../../../OC_Mobile/oc318-mobile-reader/public/corpus"
);
const DIR = __dirname;

function normalizeBrRuns(html) {
  return String(html ?? "").replace(/(?:<br\s*\/?>\s*){2,}/gi, "<br>");
}

function split(html) {
  if (!html) return [];
  const parts = normalizeBrRuns(html)
    .split(/(?:<br\s*\/?>)(?:\s*\n\s*)?/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return parts.length ? parts : [String(html).trim()].filter(Boolean);
}

function read(p) {
  try {
    return fs.readFileSync(p, "utf8").replace(/^\uFEFF/, "");
  } catch {
    return null;
  }
}

const OPEN_SPEC = [
  {
    id: "yd1/siman106/seif-002/baer-heitev",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 3],
      [1, 4],
      [2, 5],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman245/seif-006/beur-hagra",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman263/seif-005/baer-heitev",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 2],
      [1, 3],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman308/seif-003/beur-hagra",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 2],
      [1, 3],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman331/seif-034/beur-hagra",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 2],
      [1, 3],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman334/seif-042/beur-hagra",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 5],
      [1, 6],
      [2, 7],
      [3, 8],
      [4, 9],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman334/seif-045/beur-hagra",
    category: "rewrite_skip",
    pair_map_hint: [
      [0, 2],
      [1, 3],
    ],
    suggested_action: "propose_en_rewrite_skip",
  },
  {
    id: "yd1/siman269/seif-003/beur-hagra",
    category: "needs_human",
    pair_map_hint: null,
    suggested_action: "needs_human",
  },
  {
    id: "cm1/siman275/seif-003/ketzot-hachoshen",
    category: "needs_human",
    pair_map_hint: null,
    suggested_action: "needs_human",
  },
];

// --- Live recount ---
const vols = ["oc1", "yd1", "eh1", "cm1"];
const byVol = {};
let enHasMore = 0;
let heHasMore = 0;
let matched = 0;
let scanned = 0;
let enHasMoreHe0 = 0;
let heMissing = 0;
let enMissing = 0;
let enTruncatedVsMultiHe = 0; // enSegs===1 && heSegs>1 heuristic for "truncated" class if both exist
const uniqueCells = new Set();

for (const vol of vols) {
  const root = path.join(CORPUS, vol);
  byVol[vol] = {
    exists: false,
    scanned: 0,
    enHasMore: 0,
    heHasMore: 0,
    matched: 0,
    enHasMoreHe0: 0,
    heMissing: 0,
    enMissing: 0,
    enTruncatedVsMultiHe: 0,
  };
  if (!fs.existsSync(root)) continue;
  byVol[vol].exists = true;
  for (const sim of fs.readdirSync(root).filter((n) => /^siman\d+$/i.test(n))) {
    const simDir = path.join(root, sim);
    for (const seif of fs
      .readdirSync(simDir)
      .filter((n) => n.startsWith("seif-"))) {
      const seifDir = path.join(simDir, seif);
      let slugs;
      try {
        slugs = fs
          .readdirSync(seifDir, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name);
      } catch {
        continue;
      }
      for (const slug of slugs) {
        const hePath = path.join(seifDir, slug, "he.html");
        const enPath = path.join(seifDir, slug, "en.html");
        const heExists = fs.existsSync(hePath);
        const enExists = fs.existsSync(enPath);
        const cell = `${vol}/${sim}/${seif}/${slug}`;
        if (!heExists && enExists) {
          heMissing++;
          byVol[vol].heMissing++;
          uniqueCells.add(cell);
        }
        if (heExists && !enExists) {
          enMissing++;
          byVol[vol].enMissing++;
          uniqueCells.add(cell);
        }
        const he = heExists ? read(hePath) : null;
        const en = enExists ? read(enPath) : null;
        if (he == null || en == null) continue;
        const hn = split(he).length;
        const enN = split(en).length;
        scanned++;
        byVol[vol].scanned++;
        if (enN > hn) {
          enHasMore++;
          byVol[vol].enHasMore++;
          uniqueCells.add(cell);
          if (hn === 0) {
            enHasMoreHe0++;
            byVol[vol].enHasMoreHe0++;
          }
        } else if (hn > enN) {
          heHasMore++;
          byVol[vol].heHasMore++;
          uniqueCells.add(cell);
          if (enN === 1 && hn > 1) {
            enTruncatedVsMultiHe++;
            byVol[vol].enTruncatedVsMultiHe++;
          }
        } else {
          matched++;
          byVol[vol].matched++;
        }
      }
    }
  }
}

const openStatus = OPEN_SPEC.map((spec) => {
  const [vol, sim, seif, slug] = spec.id.split("/");
  const he = read(path.join(CORPUS, vol, sim, seif, slug, "he.html"));
  const en = read(path.join(CORPUS, vol, sim, seif, slug, "en.html"));
  const heSegs = split(he || "");
  const enSegs = split(en || "");
  return {
    id: spec.id,
    heSegs: heSegs.length,
    enSegs: enSegs.length,
    stillOpen: enSegs.length > heSegs.length,
    he_segments: heSegs,
    en_segments: enSegs,
  };
});

const recount = {
  scannedAt: new Date().toISOString(),
  corpus: CORPUS,
  scanned,
  enHasMore,
  enHasMoreHe0,
  enHasMoreNonZeroHe: enHasMore - enHasMoreHe0,
  heHasMore,
  heHasMoreEnTruncatedHeuristic: enTruncatedVsMultiHe,
  matched,
  heMissing,
  enMissing,
  uniqueMismatchCells:
    uniqueCells.size /* note: he/en missing + seg mismatches */,
  byVol,
  openStillMismatched: openStatus.filter((x) => x.stillOpen).length,
  openStatus: openStatus.map(({ id, heSegs, enSegs, stillOpen }) => ({
    id,
    heSegs,
    enSegs,
    stillOpen,
  })),
};

fs.writeFileSync(
  path.join(DIR, "GLUED_STILL_OPEN_9_RECOUNT.json"),
  JSON.stringify(recount, null, 2) + "\n",
  "utf8"
);

// Pull prior notes/hints/pack_meta from existing kits if present
function loadKitCases(...files) {
  const map = {};
  for (const f of files) {
    const p = path.join(DIR, f);
    if (!fs.existsSync(p)) continue;
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    for (const c of j.cases || []) map[c.id] = c;
  }
  return map;
}

const prior = loadKitCases(
  "GLUED_OPEN_KIT_B_stub_body.json",
  "GLUED_OPEN_KIT_C_garbled_uncertain.json",
  "GLUED_OPEN_KIT_A_dupes.json"
);

const PROMPT = `SA_Rebuild GLUED STILL-OPEN 9 — rewrite-focused editorial kit (ChatGPT direct).

CONTEXT
- These 9 are the remaining OPEN cases from the glued EN-oversplit pack (started 58; 44 curated rejoin + 1 prior yad-ephraim + 5 high-confidence drops = 50 structurally fixed; 9 remain).
- Structure (pair_map) is already known for 7 of 9. You MAY rewrite English now so each HE slot has one correct EN segment.
- Never modify Hebrew. Output corrected EN text per HE slot, OR confirm needs_human.

INPUT: GLUED_STILL_OPEN_9_KIT.json only (this file's cases array).

FOR EACH CASE
1. Confirm heSegs / enSegs from the kit.
2. If category is rewrite_skip (or suggested_action propose_en_rewrite_skip):
   - Use pair_map_hint (EN indices → HE slots; non-contiguous OK).
   - For each HE slot i, produce corrected_en[i]: one English segment translating he_segments[i].
   - You may join the paired EN stubs+bodies as draft material, then rewrite into clean halachic English (dictionary terms, expand abbreviations, no MT garbage).
   - Do NOT invent HE content. Do not drop a HE slot.
3. If category is needs_human:
   - Prefer action needs_human unless you can give a high-confidence pair_map AND corrected_en.
   - If still unclear, return needs_human with short notes (no fabricated EN).

Allowed actions (pick one primary):
- rewrite_en_by_he_slot: provide corrected_en length === heSegs (preferred when pair_map known).
- propose_en_rewrite_skip: structure only (pair_map) but you decline to rewrite text.
- needs_human: cannot safely decide structure or rewrite.
- pair_then_merge: structure-only confirm of pair_map without new EN text (discouraged here — prefer rewrite).

OUTPUT JSON array only, same ids/order:
[{
  "id": "...",
  "action": "rewrite_en_by_he_slot" | "propose_en_rewrite_skip" | "needs_human" | "pair_then_merge",
  "pair_map": null | [[0,3],[1,4]],
  "corrected_en": null | ["EN for HE0", "EN for HE1"],
  "notes": "short",
  "confidence": "high" | "medium" | "low"
}]

Rules: Never modify HE. corrected_en[i] must correspond 1:1 to he_segments[i]. Conservative on needs_human cases (269 Gra, 275 Ketzot). No corpus writes from this review.`;

const cases = OPEN_SPEC.map((spec) => {
  const live = openStatus.find((o) => o.id === spec.id);
  const old = prior[spec.id] || {};
  const [vol, , , slug] = spec.id.split("/");
  const siman = Number(spec.id.match(/siman(\d+)/i)?.[1]);
  const seif = Number(spec.id.match(/seif-(\d+)/i)?.[1]);
  return {
    id: spec.id,
    category: spec.category,
    suggested_action: spec.suggested_action,
    pair_map_hint: spec.pair_map_hint,
    volume: vol,
    siman,
    seif,
    slug,
    heSegs: live.heSegs,
    enSegs: live.enSegs,
    still_en_has_more: live.stillOpen,
    he_segments: live.he_segments,
    en_segments: live.en_segments,
    prior_notes: old.prior_notes || null,
    prior_hint: old.hint || null,
    pack_meta: old.pack_meta || null,
  };
});

const kit = {
  meta: {
    purpose:
      "Still-open glued pack leftovers (9): rewrite EN per HE slot where pair_map known, else needs_human.",
    kit: "GLUED_STILL_OPEN_9",
    created: "2026-08-27",
    case_count: cases.length,
    hard_cap_utf8_bytes: 85000,
    corpus_apply: "none",
    prompt: PROMPT,
    allowed_actions: [
      "rewrite_en_by_he_slot",
      "propose_en_rewrite_skip",
      "needs_human",
      "pair_then_merge",
    ],
    track_note:
      "Glued pack: 58 start → 50 structurally fixed (44 curated + 1 prior + 5 drops) → 9 OPEN. Broader en_has_more is a separate metric.",
  },
  cases,
};

let json = JSON.stringify(kit, null, 2) + "\n";
let bytes = Buffer.byteLength(json, "utf8");

// Compact if over 85k (keep under 100k hard)
if (bytes > 85000) {
  const compactKit = {
    meta: {
      ...kit.meta,
      prompt: PROMPT,
      compacted: true,
      note: "cases omit pack_meta to stay under 85k",
    },
    cases: cases.map(
      ({
        id,
        category,
        suggested_action,
        pair_map_hint,
        volume,
        siman,
        seif,
        slug,
        heSegs,
        enSegs,
        still_en_has_more,
        he_segments,
        en_segments,
        prior_notes,
        prior_hint,
      }) => ({
        id,
        category,
        suggested_action,
        pair_map_hint,
        volume,
        siman,
        seif,
        slug,
        heSegs,
        enSegs,
        still_en_has_more,
        he_segments,
        en_segments,
        prior_notes,
        prior_hint,
      })
    ),
  };
  json = JSON.stringify(compactKit, null, 2) + "\n";
  bytes = Buffer.byteLength(json, "utf8");
  if (bytes > 85000) {
    json = JSON.stringify(compactKit) + "\n";
    bytes = Buffer.byteLength(json, "utf8");
  }
}

const kitPath = path.join(DIR, "GLUED_STILL_OPEN_9_KIT.json");
fs.writeFileSync(kitPath, json, "utf8");
const sha = crypto.createHash("sha256").update(json, "utf8").digest("hex");

const md = `# GLUED STILL-OPEN 9 — GPT rewrite kit

**Date:** 2026-08-27  
**LIVE audit:** \`newtry/SA_Rebuild/audit/he_en_segment_mismatch/\`  
**Kit JSON:** \`GLUED_STILL_OPEN_9_KIT.json\`  
**UTF-8 bytes:** ${bytes}  
**SHA-256:** \`${sha}\`  
**Corpus apply:** **none**

## Number clarification (glued vs broader)

- **Glued pack track:** started **58**; structurally fixed **50** (44 curated rejoin + 1 prior \`yad-ephraim\` + 5 drop applies) → **9 remain** in this pack’s OPEN set (this kit).
- **Broader \`en_has_more\`:** all corpus pairs with \`enSegs > heSegs\` (any cause). Live recount: **${enHasMore}** (of which **${enHasMoreHe0}** have \`heSegs===0\`). The other non-zero-HE leftovers (~${enHasMore - enHasMoreHe0 - 9}) are **not** these glued OPEN 9 — different problems (stubs, other overs splits, etc.).

## Live recount snapshot

| Metric | Count |
|--------|------:|
| Pairs scanned (both he+en) | ${scanned.toLocaleString()} |
| en_has_more | **${enHasMore}** |
| … of which heSegs===0 | **${enHasMoreHe0}** |
| … non-zero HE | **${enHasMore - enHasMoreHe0}** |
| he_has_more | ${heHasMore} |
| … heuristic enSegs===1 & heSegs>1 | ${enTruncatedVsMultiHe} |
| he_missing (en exists, he file absent) | ${heMissing} |
| en_missing (he exists, en file absent) | ${enMissing} |
| Unique commentary-cells needing fix | **${uniqueCells.size}** |

Open 9 still \`enSegs > heSegs\`: **${openStatus.filter((x) => x.stillOpen).length}/9**

## Cases

| # | id | he/en | category | pair_map_hint |
|--:|----|------:|----------|---------------|
${OPEN_SPEC.map(
  (s, i) => {
    const o = openStatus.find((x) => x.id === s.id);
    return `| ${i + 1} | \`${s.id}\` | ${o.heSegs}/${o.enSegs} | ${s.category} | ${s.pair_map_hint ? JSON.stringify(s.pair_map_hint) : "—"} |`;
  }
).join("\n")}

---

## Full ChatGPT prompt (copy-paste)

\`\`\`
${PROMPT}
\`\`\`

Then attach / paste the contents of \`GLUED_STILL_OPEN_9_KIT.json\`.
`;

fs.writeFileSync(path.join(DIR, "GLUED_STILL_OPEN_9_KIT.md"), md, "utf8");

console.log(
  JSON.stringify(
    {
      recountSummary: {
        scanned,
        enHasMore,
        enHasMoreHe0,
        enHasMoreNonZeroHe: enHasMore - enHasMoreHe0,
        heHasMore,
        enTruncatedVsMultiHe,
        heMissing,
        enMissing,
        uniqueMismatchCells: uniqueCells.size,
        openStillMismatched: openStatus.filter((x) => x.stillOpen).length,
        byVol,
      },
      kit: { path: kitPath, bytes, sha256: sha },
      openStatus: openStatus.map(({ id, heSegs, enSegs, stillOpen }) => ({
        id,
        heSegs,
        enSegs,
        stillOpen,
      })),
    },
    null,
    2
  )
);
