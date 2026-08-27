# EN_MISSING_PACK — HE present, EN absent/empty

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **20** |
| Prior expected (en_missing) | 20 |
| Delta vs prior | 0 |

### By volume

| Volume | Count |
|--------|------:|
| yd1 | 20 |

### By volume / slug

| Volume | Slug | Count |
|--------|------|------:|
| yd1 | mateh-yehonatan | 8 |
| yd1 | yad-avraham | 8 |
| yd1 | rabbi-akiva-eiger-yd | 4 |

## Files

- Full pack: [`EN_MISSING_PACK.json`](./EN_MISSING_PACK.json)
  - UTF-8 bytes: 37,716
  - SHA-256: `5a2849c98bb2b29a09a691f6d9d1c409bf8e9d5872b0111c53ff55541b546fc4`
  - Cases: 20
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Split: normalize consecutive `<br>` then split on `<br>`; strip tags for segment text
- Created: 2026-08-27T20:51:09.706Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_MISSING_PACK_part01.json` | 20 | 0 | 37,940 | 69e6ac099e0b… |  |



## Review prompt (use with each part)

Paste this prompt together with **one** `EN_MISSING_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
SA_Rebuild EN_MISSING review. INPUT: one EN_MISSING_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has HE present and EN absent/empty (enSegs === 0).
- Goal: classify how to obtain English — do NOT invent a full translation in this pass unless the user later authorizes a translation job.
- Do NOT treat old machine-translation .txt pipeline files as authority unless the user explicitly says so. Prefer marking needs_en_source.

RULES
1) needs_en_source — HE is real; EN must be restored from an approved English source (Sefaria pull / curated EN / authorized translation). Default for most cases.
2) needs_human — ambiguous path, wrong slug suspicion, or HE itself looks corrupt/misplaced.
3) skip — already filled / out of scope.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"needs_en_source"|"needs_human"|"skip","notes":"short"}]

Do not invent EN text in this kit. No corpus edits. Do not use old MT .txt as authority unless user says so.
```

## Notes

- Default action needs_en_source. Do not use old MT .txt as authority unless user says so.
- No corpus apply from this pack.
