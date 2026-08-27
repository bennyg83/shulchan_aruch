# HE_MISSING_MISALIGN_PACK — MISALIGNMENT (heSegs===0, EN present)

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **59** |
| Prior expected (he_missing) | 59 |
| Delta vs prior | 0 |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 59 |

### By volume / slug

| Volume | Slug | Count |
|--------|------|------:|
| oc1 | shaarei-teshuvah | 12 |
| oc1 | yad-ephraim | 11 |
| oc1 | ateret-zekenim | 7 |
| oc1 | eshel-avraham | 5 |
| oc1 | beur-hagra | 4 |
| oc1 | netiv-chayim | 4 |
| oc1 | chokhmat-shlomo | 3 |
| oc1 | machatzit-hashekel | 3 |
| oc1 | baer-heitev | 2 |
| oc1 | dagul-merevavah | 2 |
| oc1 | levushei-serad | 2 |
| oc1 | magen-avraham | 2 |
| oc1 | chatam-sofer | 1 |
| oc1 | turei-zahav | 1 |

## Files

- Full pack: [`HE_MISSING_MISALIGN_PACK.json`](./HE_MISSING_MISALIGN_PACK.json)
  - UTF-8 bytes: 63,575
  - SHA-256: `a7523477b47dcb7d2bef539ca2b91842689fc632e8c656d713e8793185d53614`
  - Cases: 59
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Split: normalize consecutive `<br>` then split on `<br>`; strip tags for segment text
- Created: 2026-08-27T20:51:09.706Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `HE_MISSING_MISALIGN_PACK_part01.json` | 59 | 0 | 63,808 | 840be88ba353… |  |



## Review prompt (use with each part)

Paste this prompt together with **one** `HE_MISSING_MISALIGN_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
SA_Rebuild HE_MISSING MISALIGNMENT review. INPUT: one HE_MISSING_MISALIGN_PACK_partNN.json (this chunk only).

CONTEXT — MISALIGNMENT / WRONG-SEIF / MISSING HE INGEST
- Each case has heSegs === 0 (visually empty or absent HE) while EN is present.
- This is NOT a structure-rejoin / merge_groups problem. Empty HE cannot be fixed by rejoining EN.
- Do NOT invent Hebrew. Do NOT fabricate HE segments from EN.

RULES
1) needs_he_restore — HE should exist for this slug/seif (EN looks like a real translation of that commentary); restore from authoritative HE source later.
2) wrong_seif_suspect — EN content appears to belong to a different seif/siman/slug (misfiled); note suspected target if clear.
3) needs_human — ambiguous; cannot classify safely.
4) skip — already restored / out of scope.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"needs_he_restore"|"wrong_seif_suspect"|"needs_human"|"skip","suspected_target":null|"vol/simanN/seif-NNN/slug","notes":"short"}]

No merge_groups. No invented HE. No corpus edits.
```

## Notes

- **Misalignment / wrong-seif / missing HE ingest** — not a merge_groups structure pack.
- Do not invent Hebrew. Do not mix into HE_HAS_MORE or glued EN rejoin kits.
- No corpus apply from this pack.
