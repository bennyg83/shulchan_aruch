# EN has_more glued — review pack

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Files

- JSON (full HE/EN segments): [`EN_HAS_MORE_GLUED_REVIEW_PACK.json`](./EN_HAS_MORE_GLUED_REVIEW_PACK.json)
- Audit folder: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/`

## Scope

| Bucket | Count |
|--------|------:|
| REJECT from spot review (excl. applied APPROVE) | 10 |
| unsafe from continuations dry-run | 48 |
| **Deduped total** | **58** |

Excluded (already applied): `oc1/siman32/seif-005/yad-ephraim`

## Ask the other AI to return

A **JSON array** (only), one object per case:

```json
[
  {
    "id": "oc1/siman128/seif-003/turei-zahav",
    "merge_groups": [[0,1],[2]],
    "verdict": "ok_rejoin",
    "notes": "brief reason"
  }
]
```

- `merge_groups`: array of EN-index arrays; `merge_groups.length === heSegs`; indices must partition `0..enSegs-1` contiguously.
- `verdict`: `ok_rejoin` | `needs_editorial` | `skip`
- If `needs_editorial` / `skip`, `merge_groups` may be `null`.
- Do not invent HE/EN text; only propose regrouping.

Created: 2026-08-27T18:39:43.547Z
