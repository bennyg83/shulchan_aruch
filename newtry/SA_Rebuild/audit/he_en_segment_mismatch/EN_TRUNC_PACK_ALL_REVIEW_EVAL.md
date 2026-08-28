# EN_TRUNC_PACK ChatGPT review — evaluation

**Created:** 2026-08-28  
**Review:** `EN_TRUNC_PACK_ALL_REVIEW.json` (copied from Downloads)  
**Pack:** `EN_TRUNC_PACK.json` (215 cases, built 2026-08-27)  
**Corpus:** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/`  
**Live rescan:** 2026-08-28 — **215** `en_truncated_vs_multi_he` (oc1:14, yd1:135, cm1:66)

## Was GPT feedback applied?

**No — dry-run / advisory only.** No EN_TRUNC review-driven corpus edits exist. This differs from HE_HAS_MORE (Wave1 merges + Wave2 split_en already applied) and from bold-lemma auto-split (4 cells applied separately).

## Review schema

```json
[{"id":"...","action":"split_en|needs_editorial|needs_human|skip",
  "proposed_split_count":null|N,"split_plan":null|"brief","notes":"short"}]
```

No `merge_groups`, no `split_hints`, no cut indices, no confidence field.

## Counts table

| Metric | Count |
|--------|------:|
| Review / pack cases | 215 / 215 |
| ID coverage | 100% (order match ✓) |
| `split_en` | 116 |
| `needs_editorial` | 99 |
| `needs_human` / `skip` | 0 |
| Structural split_en pass (`proposed_split_count === heSegs`) | 116 / 116 |
| **Generic boilerplate split_plan** (all split_en) | **116** |

### By volume (review actions)

| Volume | split_en | needs_editorial |
|--------|--------:|----------------:|
| oc1 | 11 | 3 |
| yd1 | 68 | 67 |
| cm1 | 37 | 29 |

## Classification (conservative, HE_HAS_MORE-style)

| Tier | Count | Notes |
|------|------:|-------|
| **Wave1 apply-ready (strict)** | **24** | Clear EN delimiter: `(Collection)` / `Likut` / `There:` / `Ibid.` / `Regarding` transition + coverage ≥0.7 |
| Wave1 moderate (hold for tooling) | 78 | Binary/multi split plausible (high EN/HE ratio) but **no reliable marker** — needs sentence-boundary or manual cut |
| Hold split_en weak | 14 | GPT split_en but low delimiter signal or heSegs≥4 without markers |
| Hold editorial | 99 | GPT `needs_editorial` — includes truly truncated EN and MT-garbage |
| Reject structural | 0 | All split counts match heSegs |

## Wave1 criteria (strict tier)

1. Action `split_en`, structural pass  
2. EN blob appears **complete** (EN chars ≥ 70% of HE; pack strips HTML — most glued EN is full translation, not truncated)  
3. **Visible split cue** in EN: note marker (`Collection`, `Likut`, etc.) OR lemma-style transition (`There:`, `Ibid.`, `Regarding …`)  
4. **Not** sufficient alone: GPT generic split_plan text (116/116 are identical boilerplate with no byte offsets)

## Overlap with prior bold-lemma splits

| Prior work | Applied | Overlap with EN_TRUNC pack |
|------------|--------:|---------------------------|
| `split_en_on_bold_lemmas.mjs` (strict + relax) | **4** cells (oc1 magen-avraham 132:2, 175:1) | **0** ids |
| HE_HAS_MORE Wave2 split_en | 38 cells (yd1 beur-hagra Likut markers) | **0** ids (different kind: he_has_more) |

Re-running bold-lemma split would **not** duplicate EN_TRUNC fixes. The "~163" figure refers to other lanes (HE_HAS_MORE merges/splits), not EN_TRUNC GPT review.

## Semantic spot-check (20 cases)

| Id | GPT | Verdict | Notes |
|----|-----|---------|-------|
| `oc1/siman1/seif-008/yad-ephraim` | split_en | ✓ strict | Full EN; clear break at "Regarding Magen Avraham's objection" |
| `oc1/siman1/seif-009/yad-ephraim` | split_en | △ moderate | Full EN; no marker — sentence split only |
| `oc1/siman438/seif-001/chok-yaakov` | split_en | ✓ strict | 6-way; `(Collection)` markers in EN |
| `oc1/siman162/seif-007/peri-megadim` | editorial | ✓ hold | EN genuinely shorter than HE |
| `yd1/siman129/seif-009/siftei-kohen` | editorial | ✓ hold | EN 163B vs HE 3004B — truncated |
| `yd1/siman129/seif-020/siftei-kohen` | editorial | ✓ hold | EN 915B vs HE 3186B |
| `cm1/siman11/seif-002/beur-hagra` | editorial | ✓ hold | EN 81B vs HE 132B |
| `cm1/siman46/seif-017/chelkat-mechokek` | split_en | △ moderate | EN half length of HE — risky 3-way |
| `yd1/siman242/seif-036/siftei-kohen` | split_en | ✓ strict | 28 segs; `(Collection)` + numbered notes |
| `yd1/siman190/seif-038/torat-hashlamim` | editorial | ✓ hold | MT garbage ("Medium ed explained") |
| `oc1/siman35/seif-001/ateret-zekenim` | split_en | △ moderate | "Regarding the number of lines" — weak 2-way |
| `yd1/siman114/seif-010/beer-hagolah` | split_en | △ moderate | Full EN; no Collection marker |
| `cm1/siman60/seif-003/turei-zahav` | editorial | ✓ hold | EN 2041B vs HE 10948B — severely truncated |
| `cm1/siman48/seif-001/turei-zahav` | editorial | ✓ hold | EN ~half of HE |
| `yd1/siman135/seif-005/siftei-kohen` | editorial | △ revisit | High coverage 2-seg — might split manually |

## Sample fails / risky GPT split_en

- `cm1/siman46/seif-017/chelkat-mechokek` — he=3, EN ~52% of HE; GPT split_en unsafe  
- `cm1/siman60/seif-003/turei-zahav` — editorial correct (not split_en)  
- `yd1/siman129/seif-009/siftei-kohen` — editorial correct; EN missing most of HE  
- Binary OC ateret-zekenim cases (35:1, 51:9, 55:3, …) — GPT split_en with **no internal marker**; sentence heuristics only

## Recommendation

**Spot-review first — do not apply now.**

- GPT output is **100% generic** split plans; no machine-applicable cut map.  
- Only **24** cases meet strict Wave1 (marker-based tooling, similar to HE_HAS_MORE Wave2).  
- **78** additional split_en need manual or sentence-boundary tooling before apply.  
- **99** editorial holds should stay hold (many are truly truncated EN or bad MT).  
- Build `apply_en_trunc_wave1.mjs` (marker insert only) for strict tier after spot-checking the 24 ids in `EN_TRUNC_PACK_ALL_REVIEW_EVAL.json` → `wave1_strict_ids`.

---
Machine eval: `EN_TRUNC_PACK_ALL_REVIEW_EVAL.json` · Script: `_eval_en_trunc_review.mjs`
