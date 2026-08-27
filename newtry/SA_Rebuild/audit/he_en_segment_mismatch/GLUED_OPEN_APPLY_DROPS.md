# GLUED OPEN — high-confidence drop apply

**Date:** 2026-08-27  
**Corpus (LIVE):** `newtry/OC_Mobile/oc318-mobile-reader/public/corpus`  
**Script:** `apply_glued_open_drops.mjs`  
**Log:** `glued_open_apply_drops_log.json`  
**HE:** never modified. EN only — drop listed indices; keep remaining segments as-is (joined with `<br />`).

## Applied (5) — all verified `enSegs === heSegs`

| # | Path | Kit | Drop EN indices | Before → After | heSegs |
|--:|------|-----|-----------------|----------------|-------:|
| 1 | `yd1/siman4/seif-004/yad-avraham` | A | `[2]` | 3→2 | 2 |
| 2 | `yd1/siman37/seif-002/yad-avraham` | A | `[11]` | 12→11 | 11 |
| 3 | `yd1/siman48/seif-004/yad-avraham` | A | `[3]` | 4→3 | 3 |
| 4 | `yd1/siman61/seif-006/yad-avraham` | A | `[2]` | 3→2 | 2 |
| 5 | `yd1/siman334/seif-043/baer-heitev` | B | `[0,1,2]` | 6→3 | 3 |

### Notes

- **Kit A:** duplicate/orphan EN dropped; remaining EN left 1:1 with HE (no merge).
- **Kit B 334:43:** prefer drop stubs — keep body segments `[3,4,5]` only. **Do not** stub+space+body rejoin.

## Explicitly NOT applied

- Kit B `propose_en_rewrite_skip` / stub-body pair cases: `106`, `245`, `263`, `334:42`
- Kit C (all)
- `yd1/siman269/seif-003/beur-hagra`
- `cm1/siman275/seif-003/ketzot-hachoshen`

## Remaining OPEN from original glued 14

After this apply, **9** remain (all still `enSegs > heSegs`):

1. `yd1/siman106/seif-002/baer-heitev` — 3/6
2. `yd1/siman245/seif-006/beur-hagra` — 4/8
3. `yd1/siman263/seif-005/baer-heitev` — 2/4
4. `yd1/siman308/seif-003/beur-hagra` — 2/4
5. `yd1/siman331/seif-034/beur-hagra` — 2/4
6. `yd1/siman334/seif-042/beur-hagra` — 5/10
7. `yd1/siman334/seif-045/beur-hagra` — 2/4
8. `yd1/siman269/seif-003/beur-hagra` — 2/6
9. `cm1/siman275/seif-003/ketzot-hachoshen` — 13/17

## Broader `en_has_more` (oc1+yd1+cm1)

| Metric | After drops |
|--------|------------:|
| Pairs scanned | 106,913 |
| `enSegs > heSegs` | **68** (was 73) |
| `heSegs > enSegs` | 610 |
| Matched | 106,235 |
