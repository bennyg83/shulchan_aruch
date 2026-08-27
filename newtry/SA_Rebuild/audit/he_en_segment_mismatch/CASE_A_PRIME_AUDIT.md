# Case A′ HE heading/stub rejoin — audit

**LIVE repo:** `C:\Users\binya\Documents\shulchan-aruch-clean`  
**Mode:** apply (singular `סעיף` + `שם` stubs only)  
**Script:** `newtry/SA_Rebuild/scripts/rejoin_oversplit_he.mjs --case-a-prime`

## Heuristic change

| Bucket | Pattern | Auto-apply? |
|--------|---------|-------------|
| `title_singular_seif` | siman title with **singular** `סעיף` (final pe ף), e.g. `ובו סעיף אחד` | **YES** |
| `title_plural_seifim` | siman title with **plural** `סעיפים` (pe פ + ים), e.g. `ובו ו סעיפים` | **HOLD** (separate case) |
| `shem_stub` | `שם:` / `(שם)` / short `…שם:` | **YES** |
| `other_stub` | ס״ק labels, letter labels, short colon stubs | **HOLD** |

Codepoint-built needles so pe (פ) vs final-pe (ף) are never conflated.

**No prior apply** under the mixed (stem-`סעיפ`) rule — dry-run revised before first apply.

## Dry-run / apply counts

| Bucket | Detected | Auto applied |
|--------|---------:|-------------:|
| title_singular_seif | 58 | 58 |
| title_plural_seifim | 450 | 0 (held) |
| shem_stub | 10 | 10 |
| other_stub | 5 | 0 (held) |
| **Total applied** | | **68** |

By volume applied: oc1=25, yd1=10, cm1=33.

Residual Part 2 estimate (`B_candidate` from A′ pass): **376** (true multi-note / non-stub first HE segs with `enSegs===1`).

Plural held for later: **450**.

## Before → after scan (`en_truncated_vs_multi_he` / `he_has_more_segments`)

| Volume | Before en_trunc | After en_trunc | Δ | Before he_more | After he_more | Δ |
|--------|----------------:|---------------:|--:|---------------:|--------------:|--:|
| oc1 | 314 | 289 | −25 | 12 | 12 | 0 |
| yd1 | 154 | 144 | −10 | 229 | 229 | 0 |
| cm1 | 433 | 400 | −33 | 154 | 154 | 0 |

Total issues: oc1 407→382, yd1 418→408, cm1 609→576 (−68 overall).

## Artifacts

- `he_rejoin_a_prime_dry_run.json`
- `he_rejoin_a_prime_apply_log.json` (+ timestamped backup)
- `he_rejoin_a_prime_affected_simanim.json`
- `HE_REJOIN_A_PRIME.md`

## Scope

- Modified **he.html only** (join with space).
- Never invented EN; no TXT republish.
- Rebundled affected simanim only (`BUNDLE_CONCURRENCY=1`).
- **STOP** — no Part 2 EN split.
