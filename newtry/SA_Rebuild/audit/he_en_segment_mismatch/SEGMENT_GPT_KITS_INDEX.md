# SEGMENT_GPT_KITS_INDEX

External AI kits for HE/EN `<br>`-segment mismatches. **Audit only — no corpus apply.**

Generated: 2026-08-28T08:18:49.559Z  
Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`  
LIVE audit base: `newtry/SA_Rebuild/audit/he_en_segment_mismatch/`

## Run order (recommended)

1. **HE_MISSING_MISALIGN_PACK** — empty HE + EN present (misalignment / wrong-seif / missing HE).
2. **EN_MISSING_2_HELD_KIT** — 2 residual en_missing holds (fresh translate + citation fix).
3. **EN_TRUNC_MODERATE_RESEGMENT_KIT** — wave1 moderate (78): re-segment with aligned HE+EN pairs.
4. **EN_TRUNC_EDITORIAL_RETRANSLATE_KIT** — needs_editorial en_trunc (~99): fresh multi-segment translate from HE.
5. **HE_HAS_MORE_WAVE2_HELD_KIT** — wave2 held split_en (18 Gra): resegment EN to match HE.
6. **HE_HAS_MORE_LIKUT_SPLIT_KIT** — 53 Gra Likut wrong-merge: split EN not merge HE.
7. **HE_HAS_MORE_EDITORIAL_KIT** — needs_editorial he_has_more (218): resegment / offset / human.
8. **GLUED_STILL_OPEN_9_KIT** — remaining glued EN overs (cross-link; already built).

## Kits (this run + prior)

| Kit | Kind | Cases | Parts | Max part bytes | Full SHA-256 (prefix) | Path |
|-----|------|------:|------:|---------------:|----------------------:|------|
| `HE_MISSING_MISALIGN_PACK` | he_missing | 59 | 1 | — | `a7523477b47d…`  | [`HE_MISSING_MISALIGN_PACK.json`](./HE_MISSING_MISALIGN_PACK.json) |
| `EN_MISSING_PACK` | en_missing | 20 | 1 | — | `d02d6c0362b9…`  | [`EN_MISSING_PACK.json`](./EN_MISSING_PACK.json) |
| `EN_TRUNC_PACK` | en_truncated_vs_multi_he | 215 | 12 | — | `b353a7cae8ef…`  | [`EN_TRUNC_PACK.json`](./EN_TRUNC_PACK.json) |
| `EN_TRUNC_MODERATE_RESEGMENT_KIT` | en_truncated_vs_multi_he (moderate) | 78 | 4 | — | `e01791eb34ab…`  | [`EN_TRUNC_MODERATE_RESEGMENT_KIT.json`](./EN_TRUNC_MODERATE_RESEGMENT_KIT.json) |
| `HE_HAS_MORE_PACK` | he_has_more_segments | 395 | 66 | — | `fb746ae50fbe…`  | [`HE_HAS_MORE_PACK.json`](./HE_HAS_MORE_PACK.json) |
| `EN_TRUNC_EDITORIAL_RETRANSLATE_KIT` | — | 99 | 6 | 84,368 | `f5910cf43813…`  | [`EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json`](./EN_TRUNC_EDITORIAL_RETRANSLATE_KIT.json) |
| `HE_HAS_MORE_WAVE2_HELD_KIT` | — | 18 | 2 | 70,055 | `f70a55b6719d…`  | [`HE_HAS_MORE_WAVE2_HELD_KIT.json`](./HE_HAS_MORE_WAVE2_HELD_KIT.json) |
| `HE_HAS_MORE_LIKUT_SPLIT_KIT` | — | 53 | 4 | 84,868 | `ea5ccb0dbb27…`  | [`HE_HAS_MORE_LIKUT_SPLIT_KIT.json`](./HE_HAS_MORE_LIKUT_SPLIT_KIT.json) |
| `EN_MISSING_2_HELD_KIT` | — | 2 | 1 | 10,679 | `c718864e6ff0…`  | [`EN_MISSING_2_HELD_KIT.json`](./EN_MISSING_2_HELD_KIT.json) |
| `HE_HAS_MORE_EDITORIAL_KIT` | — | 218 | 46 | 84,750 | `3f53accaee93…`  | [`HE_HAS_MORE_EDITORIAL_KIT.json`](./HE_HAS_MORE_EDITORIAL_KIT.json) |

### One-line purpose

- **HE_MISSING_MISALIGN_PACK**: Misalignment: empty HE + EN present — restore HE or flag wrong-seif
- **EN_MISSING_PACK**: HE present, EN absent — fresh translate (18/20 applied; 2 in EN_MISSING_2_HELD_KIT)
- **EN_TRUNC_PACK**: Split single EN blob vs multi HE, or escalate
- **EN_TRUNC_MODERATE_RESEGMENT_KIT**: Wave1 moderate en_trunc — map EN blob to HE slots; translate gaps
- **HE_HAS_MORE_PACK**: Structure review when HE has more segments than EN
- **EN_TRUNC_EDITORIAL_RETRANSLATE_KIT**: EN truncated/garbled blob — fresh multi-segment translate from HE (needs_editorial tier)
- **HE_HAS_MORE_WAVE2_HELD_KIT**: Wave2 split_en held (18 Gra) — resegment EN to match HE Likut/lemma slots
- **HE_HAS_MORE_LIKUT_SPLIT_KIT**: 53 Gra Likut cases — split EN to match HE; reject wrong merge_groups
- **EN_MISSING_2_HELD_KIT**: 2 held en_missing — fresh translate with citation/HE fixes
- **HE_HAS_MORE_EDITORIAL_KIT**: 218 needs_editorial he_has_more — resegment/offset fix or human escalation

## Apply log (post-kit)

- **2026-08-28:** EN_MISSING 18/20 applied; 2 held → **EN_MISSING_2_HELD_KIT**.
- **2026-08-28:** EN_TRUNC wave1 strict 21/24 applied; moderate → **EN_TRUNC_MODERATE_RESEGMENT_KIT** (user running in ChatGPT).
- **2026-08-28:** HE_HAS_MORE wave1 merge 62 applied; wave2 split 38/56 applied; 18 held → **HE_HAS_MORE_WAVE2_HELD_KIT**; 53 Likut wrong-merge → **HE_HAS_MORE_LIKUT_SPLIT_KIT**.

## Existing glued kit (cross-link; not rebuilt)

| Artifact | Exists | Bytes | SHA-256 (prefix) |
|----------|:------:|------:|------------------|
| `GLUED_STILL_OPEN_9_KIT.json` | yes | 69,557 | `a51a8c4c8b62…` |

See: [`GLUED_STILL_OPEN_9_KIT.md`](./GLUED_STILL_OPEN_9_KIT.md)

## Case fields (all kits)

Each case includes: `id`, `volume`, `siman`, `seif`, `slug`, `kind`, `heSegs`, `enSegs`, `he_segments[]`, `en_segments[]` (full stripped text), plus review/apply metadata where applicable.

## HE_HAS_MORE editorial priority

Worst 50 by `heSegs - enSegs` deficit are listed in `HE_HAS_MORE_EDITORIAL_KIT.json` → `meta.counts.worst_50_by_he_deficit`. Process those first if batching ChatGPT sessions.
