# GLUED STILL-OPEN 9 — GPT rewrite kit

**Date:** 2026-08-27  
**LIVE audit:** `newtry/SA_Rebuild/audit/he_en_segment_mismatch/`  
**Kit JSON:** `GLUED_STILL_OPEN_9_KIT.json`  
**UTF-8 bytes:** 69557  
**SHA-256:** `a51a8c4c8b6293cb02430ad7406aed188083f50a5a609f750f2c989456efb051`  
**Corpus apply:** **none**

## Number clarification (glued vs broader `en_has_more`)

**Why “applied 5 → en_has_more 73→68” but “still open 9”?**

These are **two different tracks**:

1. **Glued pack track** (the curated EN-oversplit review pack that started at **58** cases):  
   - Structurally fixed **50** = 44 curated space-rejoins + 1 prior `oc1/…/yad-ephraim` + **5** high-confidence EN drops.  
   - **9 remain** in that pack’s OPEN set → **this kit**.

2. **Broader `en_has_more`** = every corpus pair where br-split `enSegs > heSegs` (any cause).  
   - Was **73**, now **68** (−5 from those drops).  
   - Of the **68**: **59** have `heSegs===0` (empty/stub HE — formal kind **`he_missing`**, not “glued oversplit”).  
   - The other **9** with non-zero HE are **exactly** this glued OPEN set. There are no other non-zero-HE `en_has_more` leftovers.

So: drops moved the broad counter 73→68; the glued OPEN leftover count is separately **9**.

## Live recount (oc1+yd1+eh1+cm1) — formal-style kinds

Pairs with both `he.html`+`en.html` scanned: **118,852**. eh1: 0 issues. Open 9 confirmed still `enSegs > heSegs`: **9/9**.

| Kind | Count | Definition |
|------|------:|------------|
| `he_missing` | **59** | Visually empty HE, EN present (`heSegs===0` overs) |
| `en_has_more_segments` | **9** | `enSegs > heSegs` with non-empty HE (= glued OPEN 9) |
| `en_truncated_vs_multi_he` | **215** | `enSegs===1` and `heSegs>1` |
| `he_has_more_segments` | **395** | `heSegs > enSegs`, not the truncated class (610−215) |
| `en_missing` | **20** | HE present, EN absent/empty (all yd1; matches prior ALL_volumes) |
| **Total issue cells** | **698** | Sum of rows above (= unique seif×commentary cells needing fix) |

Light br-count cross-check: `en_has_more` raw **68** (=59+9); `he_has_more` raw **610** (=215+395).

## Cases in this kit

| # | id | he/en | category | pair_map_hint |
|--:|----|------:|----------|---------------|
| 1 | `yd1/siman106/seif-002/baer-heitev` | 3/6 | rewrite_skip | [[0,3],[1,4],[2,5]] |
| 2 | `yd1/siman245/seif-006/beur-hagra` | 4/8 | rewrite_skip | [[0,4],[1,5],[2,6],[3,7]] |
| 3 | `yd1/siman263/seif-005/baer-heitev` | 2/4 | rewrite_skip | [[0,2],[1,3]] |
| 4 | `yd1/siman308/seif-003/beur-hagra` | 2/4 | rewrite_skip | [[0,2],[1,3]] |
| 5 | `yd1/siman331/seif-034/beur-hagra` | 2/4 | rewrite_skip | [[0,2],[1,3]] |
| 6 | `yd1/siman334/seif-042/beur-hagra` | 5/10 | rewrite_skip | [[0,5],[1,6],[2,7],[3,8],[4,9]] |
| 7 | `yd1/siman334/seif-045/beur-hagra` | 2/4 | rewrite_skip | [[0,2],[1,3]] |
| 8 | `yd1/siman269/seif-003/beur-hagra` | 2/6 | needs_human | — |
| 9 | `cm1/siman275/seif-003/ketzot-hachoshen` | 13/17 | needs_human | — |

---

## Full ChatGPT prompt (copy-paste)

```
SA_Rebuild GLUED STILL-OPEN 9 — rewrite-focused editorial kit (ChatGPT direct).

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

FAILURE RULES — DO NOT (causes REJECT/HOLD in eval pipeline)

UNIVERSAL — any EN segment text:
- Do NOT add editorial notes, "Note:", "Meaning:", explanations, or confidence commentary inside EN output.
- Do NOT leave Hebrew characters, raw Hebrew abbreviations, or placeholder text in EN ("TBD", "translation pending", etc.).
- Do NOT wrap the response in markdown fences or add prose outside valid JSON.

JSON OUTPUT (mandatory):
- Return en_segments[] as the primary deliverable; segments[] with he+en is optional for audit alignment.
- Valid JSON only — escape every " as \" inside strings; use straight ASCII quotes only (no smart quotes).
- Prefer returning en_segments[] without embedding he in strings when possible.
- en_segments.length MUST equal heSegs for every case.

REWRITE_EN_BY_HE_SLOT (this kit):
- corrected_en[i] must be a complete fresh translation of he_segments[i]; one segment per HE slot.
- Use full_dictionary.md for halachic terms; expand abbreviations; Arabic numerals; {Rama: ...} for Rama glosses.
- You may use paired EN stubs as draft material but output clean halachic English — no MT garbage, no Hebrew in EN.
- Do NOT invent HE content; do NOT drop a HE slot; do NOT fabricate EN on needs_human cases.

OUTPUT JSON array only, same ids/order:
[{
  "id": "...",
  "action": "rewrite_en_by_he_slot" | "propose_en_rewrite_skip" | "needs_human" | "pair_then_merge",
  "pair_map": null | [[0,3],[1,4]],
  "corrected_en": null | ["EN for HE0", "EN for HE1"],
  "notes": "short",
  "confidence": "high" | "medium" | "low"
}]

Rules: Never modify HE. corrected_en[i] must correspond 1:1 to he_segments[i]. Conservative on needs_human cases (269 Gra, 275 Ketzot). No corpus writes from this review.
```

Then attach / paste the contents of `GLUED_STILL_OPEN_9_KIT.json`.
