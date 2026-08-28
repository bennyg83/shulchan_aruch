# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

Generated: 2026-08-27T20:51:09.706Z  
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`  
Scan: live (122853ms), pairs=197,982, both-files=118,852

## Run order (recommended)

1. **HE_MISSING_MISALIGN_PACK** — empty HE + EN present (misalignment / wrong-seif / missing HE). Do **not** mix with structure rejoin.
2. **EN_MISSING_PACK** — HE present, EN absent — fresh translate from HE (1:1) with attached `full_dictionary.md`; not needs_en_source / not old MT.
3. **EN_TRUNC_PACK** — single EN blob vs multi HE (split EN or escalate).
3b. **EN_TRUNC_MODERATE_RESEGMENT_KIT** — wave1 moderate tier (78 cases): re-segment with aligned HE+EN pairs for eval; excludes strict applied/held + editorial tier.
4. **HE_HAS_MORE_PACK** — heSegs > enSegs with both > 0 (HE rejoin or EN split).
5. **GLUED_STILL_OPEN_9_KIT** / existing en_has_more packs — remaining non-zero EN overs (already packed; do not rebuild here).

## Kits built this run

| Kit | Kind | Cases | Parts | Max part bytes | Full SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|----------------------:|------|
| `HE_HAS_MORE_PACK` | he_has_more_segments | 395 | 66 | 84,615 | `fb746ae50fbe…` | [`HE_HAS_MORE_PACK.json`](./HE_HAS_MORE_PACK.json) |
| `EN_TRUNC_PACK` | en_truncated_vs_multi_he | 215 | 12 | 84,409 | `b353a7cae8ef…` | [`EN_TRUNC_PACK.json`](./EN_TRUNC_PACK.json) |
| `HE_MISSING_MISALIGN_PACK` | he_missing | 59 | 1 | 63,808 | `a7523477b47d…` | [`HE_MISSING_MISALIGN_PACK.json`](./HE_MISSING_MISALIGN_PACK.json) |
| `EN_MISSING_PACK` | en_missing | 20 | 1 | 40,867 | `b3c99c12f386…` | [`EN_MISSING_PACK.json`](./EN_MISSING_PACK.json) |
| `EN_TRUNC_MODERATE_RESEGMENT_KIT` | en_truncated_vs_multi_he (moderate) | 78 | 4 | 84,359 | `e01791eb34ab…` | [`EN_TRUNC_MODERATE_RESEGMENT_KIT.json`](./EN_TRUNC_MODERATE_RESEGMENT_KIT.json) |

### One-line purpose

- **HE_HAS_MORE_PACK**: Structure review when HE has more <br>-segments than EN (rejoin HE or split EN)
- **EN_TRUNC_PACK**: Split single EN blob vs multi HE, or escalate to editorial/human
- **HE_MISSING_MISALIGN_PACK**: Misalignment kit: empty/absent HE with EN present — restore HE or flag wrong-seif (NOT structure rejoin)
- **EN_MISSING_PACK**: HE present, EN absent — fresh EN from HE using attached `full_dictionary.md` (Parts 1–5); not needs_en_source / not old MT
- **EN_TRUNC_MODERATE_RESEGMENT_KIT**: Wave1 moderate en_trunc — map EN blob to HE slots; translate gaps from HE; output paired segments[] for evaluation

## Counts vs prior (395 / 215 / 59 / 20)

| Kind | Prior | Live | Delta |
|------|------:|-----:|------:|
| he_has_more_segments | 395 | 395 | 0 |
| en_truncated_vs_multi_he | 215 | 215 | 0 |
| he_missing | 59 | 59 | 0 |
| en_missing | 20 | 20 | 0 |

**Note:** live scan matches prior counts 395 / 215 / 59 / 20.

### Apply log (post-kit)

- **2026-08-28:** Applied **18/20** `EN_MISSING` APPROVE fresh translates to LIVE corpus (citation fixes on mateh-yehonatan 122/124). Held 2. See [`EN_MISSING_APPLY.md`](./EN_MISSING_APPLY.md). Residual yd1 `en_missing` (HE present): **2**.

Other live kinds (not packed here): en_has_more_segments=9, he_truncated_vs_multi_en=0.

## Existing en_has_more / glued kits (cross-link; not rebuilt)

- Skipped rebuilding glued / non-zero en_has_more kits — already present (cross-linked below).

| Artifact | Exists | Bytes | SHA-256 (prefix) |
|----------|:------:|------:|------------------|
| `GLUED_STILL_OPEN_9_KIT.json` | yes | 69,557 | `a51a8c4c8b62…` |
| `EN_HAS_MORE_GLUED_REVIEW_PACK.json` | yes | 690,050 | `556d5889a90e…` |
| `EN_HAS_MORE_REVIEW_PACK.json` | yes | 138,566 | `929dda0b77de…` |
| `EN_HAS_MORE_NONZERO_HE_PACK.json` | no | — | — |

See also: [`GLUED_STILL_OPEN_9_KIT.md`](./GLUED_STILL_OPEN_9_KIT.md), [`EN_HAS_MORE_GLUED_REVIEW_PACK.md`](./EN_HAS_MORE_GLUED_REVIEW_PACK.md) (if present).

## Case fields (all kits)

Each case includes: `id`, `volume`, `siman`, `seif`, `slug`, `kind`, `heSegs`, `enSegs`, `he_segments[]`, `en_segments[]` (full stripped text), plus file-present flags.
