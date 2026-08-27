# EN rejoin — curated allowlist apply

**Date:** 2026-08-27  
**Corpus (LIVE):** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus`  
**Script:** `apply_en_rejoin_curated.mjs`  
**Join rule:** EN segments within a group joined with **spaces** (same as `oc1/siman32/seif-005/yad-ephraim` / `d4f6ef2c06`).  
**HE:** never modified.

## Counts

| Result | Count |
|--------|------:|
| **Applied** | **44** |
| Skipped (already matched / prior) | 1 (`oc1/siman32/seif-005/yad-ephraim` — applied earlier) |
| Failed | 0 |

Allowlist size this run: 44 (yad-ephraim not re-listed). All 44 verified `enSegs === heSegs` after write.

## Corrections used (not raw AI)

| Path | Groups applied | Rejected AI plan |
|------|----------------|------------------|
| `oc1/siman271/seif-013/biur-halacha` | `[[0],[1,2,3],[4,5,6,7,8]]` | `[[0],[1,2,3,4],[5..8]]` |
| `oc1/siman486/seif-001/beur-hagra` | `[[0..13],[14],[15,16,17]]` | `[[0..12],[13],[14..17]]` |
| `cm1/siman340/seif-003/ketzot-hachoshen` | `[[0],[1..8]]` | `[[0..4],[5..8]]` |

## Applied list (44)

1. `oc1/siman1/seif-001/biur-halacha` — 10→5 — `[[0],[1],[2,3,4,5,6,7],[8],[9]]`
2. `oc1/siman27/seif-006/machatzit-hashekel` — 6→3 — `[[0,1],[2,3,4],[5]]`
3. `oc1/siman51/seif-007/machatzit-hashekel` — 5→4 — `[[0],[1,2],[3],[4]]`
4. `oc1/siman128/seif-003/turei-zahav` — 3→2 — `[[0,1],[2]]`
5. `oc1/siman137/seif-004/peri-megadim` — 5→4 — `[[0,1],[2],[3],[4]]`
6. `oc1/siman272/seif-007/beur-hagra` — 10→2 — `[[0..8],[9]]`
7. `oc1/siman271/seif-013/biur-halacha` — 9→3 — **corrected** `[[0],[1,2,3],[4..8]]`
8. `oc1/siman273/seif-005/machatzit-hashekel` — 6→5 — `[[0,1],[2],[3],[4],[5]]`
9. `oc1/siman299/seif-001/beur-hagra` — 4→3 — `[[0],[1],[2,3]]`
10. `oc1/siman422/seif-002/biur-halacha` — 4→2 — `[[0],[1,2,3]]`
11. `oc1/siman466/seif-005/biur-halacha` — 7→2 — `[[0..5],[6]]`
12. `oc1/siman467/seif-016/beur-hagra` — 4→2 — `[[0],[1,2,3]]`
13. `oc1/siman484/seif-001/turei-zahav` — 11→3 — `[[0],[1],[2..10]]`
14. `oc1/siman490/seif-009/beur-hagra` — 7→5 — `[[0],[1],[2],[3,4,5],[6]]`
15. `oc1/siman524/seif-001/peri-megadim` — 3→2 — `[[0],[1,2]]`
16. `oc1/siman581/seif-001/turei-zahav` — 7→4 — `[[0..3],[4],[5],[6]]`
17. `oc1/siman585/seif-001/beur-hagra` — 5→2 — `[[0],[1..4]]`
18. `oc1/siman638/seif-002/beur-hagra` — 11→10 — `[[0,1],[2]…[10]]`
19. `oc1/siman668/seif-001/beur-hagra` — 3→2 — `[[0],[1,2]]`
20. `oc1/siman687/seif-002/turei-zahav` — 6→2 — `[[0..4],[5]]`
21. `yd1/siman198/seif-039/beur-hagra` — 6→2 — `[[0],[1..5]]`
22. `oc1/siman486/seif-001/beur-hagra` — 18→3 — **corrected** `[[0..13],[14],[15,16,17]]`
23. `yd1/siman371/seif-001/turei-zahav` — 4→3 — `[[0],[1],[2,3]]`
24. `cm1/siman39/seif-003/beur-hagra` — 17→16 — `[[0]…[9],[10,11],[12]…[16]]`
25. `cm1/siman42/seif-005/beur-hagra` — 6→5 — `[[0],[1],[2],[3,4],[5]]`
26. `cm1/siman45/seif-012/beur-hagra` — 11→10 — `[[0]…[8],[9,10]]`
27. `cm1/siman50/seif-001/urim-vetumim-tumim` — 8→7 — `[[0]…[5],[6,7]]`
28. `cm1/siman71/seif-017/beur-hagra` — 4→3 — `[[0],[1],[2,3]]`
29. `cm1/siman72/seif-016/beur-hagra` — 3→2 — `[[0],[1,2]]`
30. `cm1/siman78/seif-001/beur-hagra` — 19→18 — `[[0]…[5],[6,7],[8]…[18]]`
31. `cm1/siman81/seif-023/beur-hagra` — 5→4 — `[[0],[1],[2],[3,4]]`
32. `cm1/siman146/seif-008/ketzot-hachoshen` — 5→2 — `[[0..3],[4]]`
33. `cm1/siman157/seif-012/ketzot-hachoshen` — 4→3 — `[[0,1],[2],[3]]`
34. `cm1/siman195/seif-001/ketzot-hachoshen` — 5→2 — `[[0],[1..4]]`
35. `cm1/siman204/seif-002/beur-hagra` — 3→2 — `[[0],[1,2]]`
36. `cm1/siman212/seif-007/ketzot-hachoshen` — 5→2 — `[[0],[1..4]]`
37. `cm1/siman216/seif-013/ketzot-hachoshen` — 3→2 — `[[0],[1,2]]`
38. `cm1/siman250/seif-003/ketzot-hachoshen` — 8→3 — `[[0],[1],[2..7]]`
39. `cm1/siman252/seif-002/ketzot-hachoshen` — 11→3 — `[[0..4],[5,6],[7..10]]`
40. `cm1/siman269/seif-004/ketzot-hachoshen` — 6→3 — `[[0],[1],[2..5]]`
41. `cm1/siman273/seif-014/ketzot-hachoshen` — 4→3 — `[[0],[1],[2,3]]`
42. `cm1/siman388/seif-007/ketzot-hachoshen` — 7→6 — `[[0],[1],[2],[3,4],[5],[6]]`
43. `cm1/siman411/seif-001/beur-hagra` — 9→8 — `[[0],[1],[2],[3,4],[5],[6],[7],[8]]`
44. `cm1/siman340/seif-003/ketzot-hachoshen` — 9→2 — **corrected** `[[0],[1..8]]`

**Prior (not in this run):** `oc1/siman32/seif-005/yad-ephraim` — `[[0],[1,2,3]]` (`d4f6ef2c06`).

---

## OPEN list (do not apply as contiguous EN rejoin)

Originally 14 open after contiguous curated apply. **5 high-confidence drops applied** 2026-08-27 — see `GLUED_OPEN_APPLY_DROPS.md`. **9 remain.**

### Applied via drop_en_indices (closed)

1. ~~`yd1/siman4/seif-004/yad-avraham`~~ — drop EN `[2]` (3→2)
2. ~~`yd1/siman37/seif-002/yad-avraham`~~ — drop EN `[11]` (12→11)
3. ~~`yd1/siman48/seif-004/yad-avraham`~~ — drop EN `[3]` (4→3)
4. ~~`yd1/siman61/seif-006/yad-avraham`~~ — drop EN `[2]` (3→2)
5. ~~`yd1/siman334/seif-043/baer-heitev`~~ — drop stubs EN `[0,1,2]`; keep bodies (6→3)

### Still OPEN — needs_editorial / rewrite_skip

1. `yd1/siman106/seif-002/baer-heitev` (Kit B rewrite_skip — do not apply stub+body glue)
2. `yd1/siman245/seif-006/beur-hagra` (Kit B; non-contiguous lemma/body)
3. `yd1/siman263/seif-005/baer-heitev` (Kit B)
4. `yd1/siman308/seif-003/beur-hagra` (Kit C garbled)
5. `yd1/siman331/seif-034/beur-hagra` (Kit C; non-contiguous / broken MT)
6. `yd1/siman334/seif-042/beur-hagra` (Kit B rewrite_skip)
7. `cm1/siman275/seif-003/ketzot-hachoshen` (Kit C; contiguous rejoin unsafe)

### Still OPEN — disagree / non-contiguous

8. `yd1/siman334/seif-045/beur-hagra` — true fix likely **non-contiguous** `[[0,2],[1,3]]`. Do not space-rejoin.

### Still OPEN — uncertain

9. `yd1/siman269/seif-003/beur-hagra` — **UNCERTAIN** (no apply).

---

## Remaining `en_has_more` (live recount)

Full br-split scan after drop apply (`recount_en_has_more.mjs`, oc1+yd1+cm1):

| Metric | Count |
|--------|------:|
| Pairs scanned | 106,913 |
| `enSegs > heSegs` | **68** (was 73; −5 from these drops) |
| `heSegs > enSegs` | 610 |
| Matched | 106,235 |

Note: many of the 68 include `heSegs=0` (HE missing / empty) with a single EN stub — not the glued oversplit class. Glued pack leftovers: **9 OPEN** above.

## Artifacts

- Apply log: `en_rejoin_curated_apply_log.json`
- Script: `apply_en_rejoin_curated.mjs`
- Drop apply: `apply_glued_open_drops.mjs`, `GLUED_OPEN_APPLY_DROPS.md`, `glued_open_apply_drops_log.json`
