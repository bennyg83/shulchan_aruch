# EN_HAS_MORE_REVIEW_PACK — full live set

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total en_has_more** | **68** |
| heSegs_zero | 59 |
| glued_still_open | 9 |
| other_en_has_more | 0 |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 59 |
| yd1 | 8 |
| cm1 | 1 |

### By tag × volume

| Tag | Volume | Count |
|-----|--------|------:|
| glued_still_open | cm1 | 1 |
| glued_still_open | yd1 | 8 |
| heSegs_zero | oc1 | 59 |

## Files

- Full pack: [`EN_HAS_MORE_REVIEW_PACK.json`](./EN_HAS_MORE_REVIEW_PACK.json)
  - UTF-8 bytes: 138,566
  - SHA-256: `929dda0b77de9e6e7923c4b4db683de5e90642fe6ad3e5f969c38ed7ced0e837`
  - Cases: 68
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Split strategy: **heSegs_zero parts first**, then **non_zero_he** (glued_still_open + other_en_has_more), greedy pack by size
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Split: normalize consecutive `<br>` then split on `<br>`; strip tags for segment text
- Created: 2026-08-27T20:43:51.398Z

## Parts

| Part | File | Group | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) |
|------|------|-------|------:|------------:|--------------:|------------------|
| 1 | `EN_HAS_MORE_REVIEW_PACK_part01.json` | heSegs_zero | 59 | 0 | 78,190 | e2a26a46c09c… |
| 2 | `EN_HAS_MORE_REVIEW_PACK_part02.json` | non_zero_he | 9 | 59 | 64,400 | eec55581fcc9… |

## Review prompt (use with each part)

Paste this prompt together with **one** `EN_HAS_MORE_REVIEW_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
SA_Rebuild EN_HAS_MORE structure review. INPUT: one EN_HAS_MORE_REVIEW_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has enSegs > heSegs after the same <br>-normalize/split used in corpus audits.
- Tags: heSegs_zero | glued_still_open | other_en_has_more.
- Goal is STRUCTURE only: how EN segments should map to HE slots. Do NOT invent Hebrew. Do NOT rewrite English text in this pass (notes may flag rewrite needed).

RULES BY TAG / heSegs
1) If heSegs === 0 (tag heSegs_zero):
   - EN rejoin / merge_groups CANNOT create HE.
   - Do NOT invent merge_groups to "match" 0 HE slots.
   - action MUST be needs_he_restore or skip_structure.
   - merge_groups, pair_map, drop_indices = null.
   - Optional short notes (e.g. empty HE file vs missing HE).

2) If heSegs > 0:
   - Prefer contiguous merge_groups: array of EN-index arrays, length === heSegs, partitioning 0..enSegs-1 in order. Only merge true continuations; never glue distinct HE lemmas/notes.
   - If stubs/bodies are non-contiguous, use action pair_map with pair_map as array of EN-index groups per HE slot (non-contiguous OK), length === heSegs.
   - If clear duplicate/extra EN junk, action drop_en_indices with drop_indices (0-based), remaining must be alignable.
   - If unsafe: needs_editorial or needs_human; merge_groups/pair_map/drop_indices null as appropriate.
   - skip only if out of scope / already fixed.

OUTPUT JSON array only, same ids/order as this part's cases:
[{"id":"...","action":"needs_he_restore"|"skip_structure"|"merge_groups"|"pair_map"|"drop_en_indices"|"needs_editorial"|"needs_human"|"skip","merge_groups":null|[[0],[1,2]],"pair_map":null|[[0,3],[1,4]],"drop_indices":null|[2],"notes":"short"}]

Conservative when unsure. No new case ids. No corpus edits.
```

## Notes

- `heSegs_zero` (~empty/missing HE with EN present): GPT must **not** propose merge_groups; use `needs_he_restore` or `skip_structure`.
- `glued_still_open`: the 9 remaining OPEN glued-pack cases (also in `GLUED_STILL_OPEN_9_KIT`).
- `other_en_has_more`: any live leftover with heSegs>0 that is not in the OPEN-9 set.
- No corpus apply from this pack.
