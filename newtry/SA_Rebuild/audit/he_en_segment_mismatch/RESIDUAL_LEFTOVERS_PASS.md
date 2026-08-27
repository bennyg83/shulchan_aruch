# Residual thin-EN / multi-HE leftover pass

After bold-lemma split `d0a3d4c305`. Script: `fix_residual_he_en_leftovers.mjs`.

## Phase counts

| Phase | Fixed | Notes |
|-------|------:|-------|
| A — corrupt HE strip/C2 | 777 | yd1 only; strip_english_markers (770) + C2 (7). Content repair; segment counts mostly preserved. |
| B — alternate EN split | 3 | bold_lemma_relaxed ×3 (oc1×2, cm1×1) |
| C — Copy2 EN/HE | 0 | overlap/subset gates rejected unsafe restores |
| D — tiny stub HE fold | 0 | no high-confidence applies kept (unsafe apply reverted from backups) |
| E — manual queue | 750 | no fake-fix |

## Before → after scan

| Volume | Before en_trunc | After | Δ | Before he_more | After | Δ | Before issues | After |
|--------|----------------:|------:|--:|---------------:|------:|--:|--------------:|------:|
| oc1 | 18 | 16 | −2 | 12 | 12 | 0 | 111 | 109 |
| yd1 | 135 | 135 | 0 | 229 | 229 | 0 | 399 | 399 |
| cm1 | 67 | 66 | −1 | 154 | 154 | 0 | 243 | 242 |

**en_trunc total:** 220 → 217 (−3)  
**he_more total:** 395 → 395 (0)  
**issues total:** 753 → 750 (−3)

Phase A cleaned **777** yd1 `he.html` files that contained leaked `**** ENGLISH ****` markers (the bold-pass corruption quarantine). Most already had matching `<br>` counts; strip restores Hebrew-only HE without inventing EN pads.

## Manual queue size: **750**

By kind: `en_truncated_vs_multi_he` 217, `he_has_more_segments` 395, `en_has_more_segments` 59, `he_missing` 59, `en_missing` 20.

See `RESIDUAL_MANUAL_QUEUE.md`.

Rebundled affected: oc1=2, yd1=178, cm1=1 (+ D-revert refresh). `BUNDLE_CONCURRENCY=1`.

No Copy2 git. No blind TXT republish. No empty EN pads.
