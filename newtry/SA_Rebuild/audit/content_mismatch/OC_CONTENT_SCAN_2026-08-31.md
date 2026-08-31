# OC Content Quality Scan — 2026-08-31

## Scope
- Volume: **oc1** only
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/`
- Pass: mechaber full analysis + cheap expand (MT/Rama/leaks) across other slugs
- Corpus not modified (scan + kit only)

## Seed
- `oc1/siman244/seif-001/mechaber` — **CONFIRMED in flagged list**
- Known: HE full; EN truncated/incomplete; `{Rama: RAMA:` duplicate; Rama placement / missing clauses

## Counts
| Metric | Value |
|--------|------:|
| Cells scanned | 48243 |
| Flagged cells | 1257 |
| Mechaber cut-EN candidates | 77 |
| Kit cases (GPT-ready) | 120 |

## Counts by kind
| Kind | Count |
|------|------:|
| rama_he_hagah_unreflected | 491 |
| mt_garbage | 270 |
| rama_spurious | 251 |
| html_json_leak | 117 |
| rama_outside_braces | 115 |
| rama_placement_or_cut_post_rama | 61 |
| cut_post_rama | 61 |
| rama_bare_rema_only_dropped | 52 |
| rama_partial_missing | 50 |
| missing_cross_ref | 49 |
| rama_duplicate_prefix | 46 |
| cut_en_strict | 12 |
| rama_bare_rema_not_braced | 11 |
| cut_en_loose | 5 |
| seed_confirmed | 1 |
| rama_wrong_wrapper | 1 |

## Top severity (25)
| # | Sev | Id | Kinds | EN/HE ratio |
|--:|----:|----|-------|------------:|
| 1 | 34 | `oc1/siman244/seif-001/mechaber` | rama_duplicate_prefix, rama_placement_or_cut_post_rama, cut_post_rama, missing_cross_ref, seed_confirmed | 1.703 |
| 2 | 32 | `oc1/siman303/seif-015/mechaber` | cut_en_strict, rama_he_hagah_unreflected, rama_placement_or_cut_post_rama, cut_post_rama | 0.005 |
| 3 | 24 | `oc1/siman664/seif-001/mechaber` | rama_duplicate_prefix, rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 1.658 |
| 4 | 22 | `oc1/siman119/seif-001/mechaber` | rama_placement_or_cut_post_rama, cut_post_rama, html_json_leak | 2.064 |
| 5 | 22 | `oc1/siman122/seif-001/mechaber` | rama_placement_or_cut_post_rama, cut_post_rama, html_json_leak | 2.518 |
| 6 | 20 | `oc1/siman158/seif-005/mechaber` | rama_duplicate_prefix, rama_placement_or_cut_post_rama, cut_post_rama | 1.476 |
| 7 | 20 | `oc1/siman198/seif-001/mechaber` | rama_he_hagah_unreflected, rama_placement_or_cut_post_rama, cut_post_rama | 2.346 |
| 8 | 20 | `oc1/siman273/seif-001/mechaber` | rama_duplicate_prefix, rama_placement_or_cut_post_rama, cut_post_rama | 2.296 |
| 9 | 20 | `oc1/siman301/seif-025/mechaber` | rama_duplicate_prefix, rama_placement_or_cut_post_rama, cut_post_rama | 2.409 |
| 10 | 20 | `oc1/siman326/seif-010/eliyah-rabbah` | mt_garbage, html_json_leak | 0.357 |
| 11 | 20 | `oc1/siman332/seif-004/eliyah-rabbah` | mt_garbage, html_json_leak | 0.165 |
| 12 | 20 | `oc1/siman649/seif-005/mechaber` | rama_duplicate_prefix, rama_placement_or_cut_post_rama, cut_post_rama | 1.745 |
| 13 | 19 | `oc1/siman171/seif-005/eliyah-rabbah` | mt_garbage, html_json_leak | 0.479 |
| 14 | 19 | `oc1/siman199/seif-010/eliyah-rabbah` | mt_garbage, html_json_leak | 0.586 |
| 15 | 19 | `oc1/siman308/seif-001/mechaber` | rama_duplicate_prefix, rama_partial_missing, mt_garbage | 2.148 |
| 16 | 18 | `oc1/siman167/seif-014/mechaber` | rama_placement_or_cut_post_rama, cut_post_rama, missing_cross_ref | 2.401 |
| 17 | 18 | `oc1/siman25/seif-012/mechaber` | rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 2.409 |
| 18 | 18 | `oc1/siman286/seif-004/mechaber` | rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 1.992 |
| 19 | 18 | `oc1/siman307/seif-011/mechaber` | cut_en_strict, rama_he_hagah_unreflected | 0.009 |
| 20 | 18 | `oc1/siman307/seif-021/mechaber` | cut_en_strict, rama_he_hagah_unreflected | 0.019 |
| 21 | 18 | `oc1/siman307/seif-022/mechaber` | cut_en_strict, rama_he_hagah_unreflected | 0.005 |
| 22 | 18 | `oc1/siman325/seif-008/mechaber` | rama_outside_braces, rama_placement_or_cut_post_rama, cut_post_rama | 1.893 |
| 23 | 18 | `oc1/siman357/seif-001/mechaber` | rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 1.713 |
| 24 | 18 | `oc1/siman370/seif-003/mechaber` | rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 1.652 |
| 25 | 18 | `oc1/siman475/seif-001/mechaber` | rama_partial_missing, rama_placement_or_cut_post_rama, cut_post_rama | 1.957 |

## Outputs
- `OC_CONTENT_SCAN_2026-08-31.json`
- `OC_CONTENT_SCAN_2026-08-31.md`
- `OC_MECHABER_CUT_EN_KIT.json` (120 cases, full HE+EN)

## Next
Editorial/GPT pass on kit; do not apply until reviewed.
