# Case A′ HE heading/stub rejoin — audit

**LIVE repo:** `C:\Users\binya\Documents\shulchan-aruch-clean`  
**Script:** `newtry/SA_Rebuild/scripts/rejoin_oversplit_he.mjs --case-a-prime`

## Heuristic / policy

| Bucket | Pattern | Auto-apply? |
|--------|---------|-------------|
| `title_singular_seif` | siman title with **singular** `סעיף` (final pe ף), e.g. `ובו סעיף אחד` | **YES** |
| `title_plural_seifim` | siman title with **plural** `סעיפים` (pe פ + ים), e.g. `ובו ו סעיפים` | **YES** (unlocked after human verify) |
| `shem_stub` | `שם:` / `(שם)` / short `…שם:` | **YES** |
| `other_stub` | ס״ק labels, letter labels, short colon stubs | **HOLD** |

Codepoint-built needles so pe (פ) vs final-pe (ף) are never conflated.

---

## Pass 1 — singular + שם (`5fecb79dc4`)

| Bucket | Detected | Auto applied |
|--------|---------:|-------------:|
| title_singular_seif | 58 | 58 |
| title_plural_seifim | 450 | 0 (held) |
| shem_stub | 10 | 10 |
| other_stub | 5 | 0 (held) |
| **Total applied** | | **68** |

By volume: oc1=25, yd1=10, cm1=33.

### Before → after (pass 1)

| Volume | Before en_trunc | After en_trunc | Δ | Before he_more | After he_more | Δ |
|--------|----------------:|---------------:|--:|---------------:|--------------:|--:|
| oc1 | 314 | 289 | −25 | 12 | 12 | 0 |
| yd1 | 154 | 144 | −10 | 229 | 229 | 0 |
| cm1 | 433 | 400 | −33 | 154 | 154 | 0 |

---

## Pass 2 — plural `סעיפים` (this commit)

**Mode:** apply (`title_plural_seifim` only remaining; singular/שם already joined)  
**Spot-check:** ≥8 dry-run samples (oc1/yd1/cm1) — all `ובו <N> סעיפים:` title + body, heSegs=2, enSegs=1.

| Bucket | Detected | Auto applied |
|--------|---------:|-------------:|
| title_singular_seif | 0 | 0 |
| title_plural_seifim | 450 | 450 |
| shem_stub | 0 | 0 |
| other_stub | 5 | 0 (held) |
| **Total applied** | | **450** |

By volume: oc1=206, yd1=6, cm1=238.

Residual Part 2 estimate (`B_candidate` from A′ pass): **376**.

Held: **5** `other_stub`.

### Before → after scan (`en_truncated_vs_multi_he` / `he_has_more_segments`)

Baseline = post–pass 1 SUMMARY (2026-08-27T13:36:46Z). After = rescan 2026-08-27T14:01:54Z.

| Volume | Before en_trunc | After en_trunc | Δ | Before he_more | After he_more | Δ |
|--------|----------------:|---------------:|--:|---------------:|--------------:|--:|
| oc1 | 289 | 83 | −206 | 12 | 12 | 0 |
| yd1 | 144 | 138 | −6 | 229 | 229 | 0 |
| cm1 | 400 | 162 | −238 | 154 | 154 | 0 |

Total issues: oc1 382→176, yd1 408→402, cm1 576→338 (−450 overall).

## Artifacts

- `he_rejoin_a_prime_dry_run.json`
- `he_rejoin_a_prime_apply_log.json` (+ timestamped backup)
- `he_rejoin_a_prime_affected_simanim.json`
- `HE_REJOIN_A_PRIME.md`

## Scope

- Modified **he.html only** (join with space).
- Never invented EN; no TXT republish; no Part 2 EN split.
- Rebundled affected simanim only (`BUNDLE_CONCURRENCY=1 --simanim`).
