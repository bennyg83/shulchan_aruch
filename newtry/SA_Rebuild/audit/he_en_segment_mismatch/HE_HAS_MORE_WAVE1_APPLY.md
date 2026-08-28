# HE_HAS_MORE Wave1 apply — non-Likut merge_groups

**Date:** 2026-08-28  
**Corpus (LIVE):** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus`  
**Script:** `apply_he_has_more_wave1.mjs`  
**Allowlist:** `HE_HAS_MORE_PACK_ALL_REVIEW_EVAL.json` → `refined.strict_merge_ids` (62)  
**Excluded:** 53 `likut_merge_ids` (beur-hagra Likut glued merges), all `split_en` (56), all editorial/human holds (224)

## Join rule

- HE segments within each `merge_groups` group joined with **spaces** (same as Case A′ / curated EN rejoin).
- Groups rejoined with `<br />\n`.
- **EN untouched.**
- Per-case verify: `heSegs === enSegs` after write.

## Counts

| Result | Count |
|--------|------:|
| **Applied** | **62** |
| Skipped | 0 |
| Failed | 0 |

### By slug

| Slug | Applied |
|------|--------:|
| beer-hagolah | 32 |
| urim-vetumim-tumim | 26 |
| ateret-zekenim | 1 |
| siftei-kohen | 1 |
| turei-zahav | 1 |
| netivot-hamishpat-beurim | 1 |

### By volume

| Volume | Applied | Affected simanim |
|--------|--------:|-----------------:|
| oc1 | 1 | 1 |
| yd1 | 2 | 2 |
| cm1 | 59 | 50 |

## Not applied (held for later waves)

| Bucket | Count | Reason |
|--------|------:|--------|
| hold_semantic_likut_merge | 53 | Prefer `split_en` — never glue distinct Gra Likut notes |
| apply_ready_split_en | 56 | Wave2 tooling |
| hold_editorial | 218 | Needs editorial |
| hold_human_truncated | 6 | Truncated review text |

## Artifacts

- `he_has_more_wave1_apply_log.json`
- `he_has_more_wave1_affected_simanim.json`
- `apply_he_has_more_wave1.mjs`

## Post-apply

- Rebundled affected volumes (oc1 / yd1 / cm1) with `BUNDLE_CONCURRENCY=1`.
- Remaining HE_HAS_MORE (pack baseline 395 − 62 Wave1) ≈ **333** pending other actions (Likut / split_en / editorial / human).

## Commit

- **SHA:** `07b4315ea5` (pushed to `origin/main`)
