# Part 2 bucket 1 — EN bold-lemma split

**LIVE:** `C:\Users\binya\Documents\shulchan-aruch-clean`  
**Script:** `newtry/SA_Rebuild/scripts/split_en_on_bold_lemmas.mjs`  
**Mode:** APPLY (163 cells)

## Policy (v1)

| Gate | Rule |
|------|------|
| Kind | `en_truncated_vs_multi_he` only |
| Segments | `enSegs === 1`, `heSegs >= 2` |
| Bold align | EN `<b>` open count === `heSegs` |
| HE structure | Every HE `<br>` seg starts with `<b>` |
| Content-offset | Skip if EN has non-bold visible prefix (>12 chars) / does not start with `<b>` |
| Corruption | Skip HE containing `**** ENGLISH ****` / SOURCE BLOCK |
| Empty-pad | Forbidden — every fixed EN seg must be non-empty |
| Stub ignore | **Not used** (exact bold === heSegs) |
| Writes | **en.html only** |

## Counts

| Volume | Candidates | Eligible/Applied | Skipped |
|--------|----------:|-----------------:|--------:|
| oc1 | 83 | 65 | 18 |
| yd1 | 138 | 3 | 135 |
| cm1 | 162 | 95 | 67 |
| **Total** | **383** | **163** | **220** |

### By slug (applied)

- **oc1:** chok-yaakov 26, baer-heitev 20, magen-avraham 15, chokhmat-shlomo 2, shaarei-teshuvah 2
- **yd1:** beur-hagra 2, nekudot-hakesef 1
- **cm1:** urim-vetumim-tumim 38, beur-hagra 38, chokhmat-shlomo 19

### Skip reasons

- `bold_count_ne_heSegs`: 171 (14+91+66)
- `he_corrupted_english_marker`: 44 (yd1 Gra/Shach-style — held)
- `he_segs_not_all_bold_headed`: 5

## Spot-check (≥10)

Confirmed fixed (enSegs now === heSegs):

1. `oc1/siman90/seif-007/magen-avraham` — 5 bold lemmas
2. `oc1/siman253/seif-005/magen-avraham` — 11 bold lemmas
3. `oc1/siman14/seif-001/chokhmat-shlomo` — 3
4. `cm1/siman5/seif-003/urim-vetumim-tumim` — 5 (HE `אך`/`ומעתה` ↔ EN However/Accordingly)
5. `oc1/siman132/seif-002/baer-heitev` — 7
6. `oc1/siman117/seif-001/magen-avraham` — 2
7. `oc1/siman117/seif-002/baer-heitev` — 2
8. `cm1/siman1/seif-002/urim-vetumim-tumim` — 2
9. `cm1/siman1/seif-003/urim-vetumim-tumim` — 3
10. `yd1/siman124/seif-006/nekudot-hakesef` — 2
11. `oc1/siman13/seif-003/chokhmat-shlomo` — 2
12. `cm1/siman38/seif-001/chokhmat-shlomo` — 2

No content-offset false positives spotted in the applied set (EN opens on bold lemma).

## Before → after scan

Baseline = post–Case A′ plural SUMMARY (`2026-08-27T14:01:54Z`). After = rescan `2026-08-27T14:26:59Z`.

| Volume | Before en_trunc | After en_trunc | Δ | Before he_more | After he_more | Δ | Issues |
|--------|----------------:|---------------:|--:|---------------:|--------------:|--:|-------:|
| oc1 | 83 | 18 | −65 | 12 | 12 | 0 | 176→111 |
| yd1 | 138 | 135 | −3 | 229 | 229 | 0 | 402→399 |
| cm1 | 162 | 67 | −95 | 154 | 154 | 0 | 338→243 |

**en_truncated total:** 383 → 220 (−163)  
**he_has_more:** unchanged (395)  
**Prior residual B estimate (A′):** ~376 → remaining glued-EN / Part 2 ≈ en_trunc **220** (+ he_more / Gra quarantine / non-bold cases)

## Artifacts

- `en_bold_split_dry_run.json` / `EN_BOLD_SPLIT_DRY_RUN.md`
- `en_bold_split_apply_log.json` (+ timestamped backup)
- `en_bold_split_affected_simanim.json`
- Rebundled affected only: oc1=39, yd1=3, cm1=63 (`BUNDLE_CONCURRENCY=1 --simanim`)

## Scope / STOP

- No Copy2 probe
- No manual Gra/Shach quarantine in this pass
- YD corrupted-HE cells (44) left untouched
