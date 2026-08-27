# GLUED OPEN kits — GPT editorial (14 cases)

**Date:** 2026-08-27  
**LIVE audit folder:** `newtry/SA_Rebuild/audit/he_en_segment_mismatch/`  
**Source segments:** `EN_HAS_MORE_GLUED_REVIEW_PACK.json` (full HE/EN)  
**Corpus apply:** **none** — kits only. Contiguous `merge_groups` track for the glued pack is closed except these OPEN cases.

## Kit inventory

| Kit | File | Cases | UTF-8 bytes | Failure mode |
|-----|------|------:|------------:|--------------|
| A | `GLUED_OPEN_KIT_A_dupes.json` | 4 | 57477 | Yad Avraham duplicate / extra EN |
| B | `GLUED_OPEN_KIT_B_stub_body.json` | 5 | 15097 | Stub-then-body / interleave |
| C | `GLUED_OPEN_KIT_C_garbled_uncertain.json` | 5 | 56092 | Garbled / non-contig / uncertain |

Hard cap: **≤85,000 UTF-8 bytes** per kit (plain JSON, no compression). All kits under cap.

## Cases by kit

### Kit A — dupes / extra EN
1. `yd1/siman4/seif-004/yad-avraham` — duplicate_en (EN2 ≈ EN0+1)
2. `yd1/siman37/seif-002/yad-avraham` — extra_en (EN11 no HE)
3. `yd1/siman48/seif-004/yad-avraham` — duplicate_en (EN3 ≈ EN0–2)
4. `yd1/siman61/seif-006/yad-avraham` — duplicate_en (EN2 ≈ EN0+1)

### Kit B — stub / body
5. `yd1/siman106/seif-002/baer-heitev`
6. `yd1/siman245/seif-006/beur-hagra`
7. `yd1/siman263/seif-005/baer-heitev`
8. `yd1/siman334/seif-042/beur-hagra`
9. `yd1/siman334/seif-043/baer-heitev`

### Kit C — garbled / non-contiguous / uncertain
10. `yd1/siman308/seif-003/beur-hagra` — garbled
11. `yd1/siman331/seif-034/beur-hagra` — garbled + distinct notes
12. `yd1/siman334/seif-045/beur-hagra` — non_contiguous (likely [[0,2],[1,3]])
13. `yd1/siman269/seif-003/beur-hagra` — uncertain
14. `cm1/siman275/seif-003/ketzot-hachoshen` — unsafe contiguous

## How to use

Paste **one kit JSON** + the matching prompt below into GPT. Return JSON array only for that kit’s ids.

### Semantics (read once)

- `drop_indices`: remove those EN indices first.
- After drop/reorder, `merge_groups` indexes the **resulting** EN sequence (contiguous partitions).
- `pair_map`: list of EN-index groups in **HE slot order**; each group joins into one HE segment. **Non-contiguous EN indices allowed only in `pair_map`.**
- Do not modify HE. No corpus writes from this review.

### Expected output schema

```json
[{
  "id": "...",
  "action": "drop_en_indices" | "pair_then_merge" | "merge_groups" | "needs_human" | "propose_en_rewrite_skip",
  "drop_indices": null | [2],
  "pair_map": null | [[0,3],[1,4],[2,5]],
  "merge_groups": null | [[0],[1,2]],
  "notes": "short",
  "confidence": "high" | "medium" | "low"
}]
```

---

## Copy-paste prompt — Kit A

```
SA_Rebuild GLUED OPEN kit A — Yad Avraham duplicate/extra EN (editorial, not plain contiguous rejoin).

INPUT: GLUED_OPEN_KIT_A_dupes.json only. For each case compare HE vs EN segments.

Allowed actions (pick one primary):
- drop_en_indices: remove exact duplicate or orphan EN indices, then optional merge_groups on the *remaining* EN sequence (indices remapped 0..n-1 after drop).
- pair_then_merge: use pair_map (HE-slot order; each inner array = EN indices joining into that HE slot; non-contiguous OK).
- merge_groups: contiguous partition only if truly safe after drop/reorder; len(groups)===heSegs.
- needs_human: cannot safely decide.
- propose_en_rewrite_skip: structure clear but EN text too broken to trust for apply (still give drop/pair if known).

Rules: Never modify HE. Prefer drop when EN is a verbatim/near-verbatim replay of earlier EN. Do not invent new EN text. Conservative when unsure.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,3],[1,4]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]

Semantics: after drop, merge_groups indexes the resulting EN sequence. pair_map joins listed EN indices into one HE slot (non-contiguous allowed for pair_map only).
```

---

## Copy-paste prompt — Kit B

```
SA_Rebuild GLUED OPEN kit B — Baer Heitev / Beur HaGra stub-then-body / interleave.

INPUT: GLUED_OPEN_KIT_B_stub_body.json only. Pattern: short EN lemma stubs listed first, full bodies later (or interleaved), so contiguous merge_groups is usually WRONG.

Prefer pair_then_merge with pair_map pairing each stub to its body (often [[0,k],[1,k+1],…] where k=heSegs). reorder_en_then_merge is OK if you first state the reordered EN index order via pair_map.

Allowed actions: drop_en_indices | pair_then_merge | merge_groups (contiguous only if safe) | needs_human | propose_en_rewrite_skip.

Never modify HE. Do not glue distinct Gra/Baer lemmas. If body EN is garbled MT, still return pair_map if pairing is clear and set action propose_en_rewrite_skip or note rewrite needed.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,3],[1,4],[2,5]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]

Semantics: pair_map = EN indices per HE slot (non-contiguous OK). merge_groups only on contiguous resulting EN order.
```

---

## Copy-paste prompt — Kit C

```
SA_Rebuild GLUED OPEN kit C — garbled MT / non-contiguous / uncertain / unsafe contiguous.

INPUT: GLUED_OPEN_KIT_C_garbled_uncertain.json only. These failed plain contiguous rejoin.

For each case: if a clear non-contiguous pairing exists use pair_then_merge (pair_map). If EN is broken MT but pairing is clear, use propose_en_rewrite_skip with pair_map filled. If unsafe or unclear, needs_human. Contiguous merge_groups only when truly safe.

Special hint: yd1/siman334/seif-045/beur-hagra likely pair_map [[0,2],[1,3]] (not contiguous [[0],[1,2,3]]).

Allowed actions: drop_en_indices | pair_then_merge | merge_groups | needs_human | propose_en_rewrite_skip.

Never modify HE. No new cases. Conservative.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"drop_en_indices"|"pair_then_merge"|"merge_groups"|"needs_human"|"propose_en_rewrite_skip","drop_indices":null|[2],"pair_map":null|[[0,2],[1,3]],"merge_groups":null|[[0],[1]],"notes":"short","confidence":"high"|"medium"|"low"}]
```

---

## Reusable short template (any future OPEN kit)

```
SA_Rebuild GLUED OPEN kit <X>. INPUT: <kit file> only.
For each case pick one action: drop_en_indices | pair_then_merge | merge_groups | needs_human | propose_en_rewrite_skip.
pair_map = EN indices per HE slot (non-contiguous OK). merge_groups only on contiguous resulting EN after drop/reorder; len===heSegs.
Never modify HE. Conservative. OUTPUT JSON array only:
[{"id":"...","action":"...","drop_indices":null|[n],"pair_map":null|[[...]],"merge_groups":null|[[...]],"notes":"short","confidence":"high"|"medium"|"low"}]
```
