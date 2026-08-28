# EN_TRUNC Wave 1 — split_en APPLY audit

**Date:** 2026-08-28T07:18:07.263Z
**Mode:** apply
**Strict tier:** 24 ids from `wave1_strict_ids`
**Prior live en_trunc:** 215

## Summary

| Tier | Count |
|------|-------|
| Applied | 21 |
| Skipped (already matched) | 0 |
| Held | 3 |
| Failed | 0 |

## Split rule

Insert <br /> before internal (Likut|Collection|Collected|Supplement), <b> lemma, or transition (There:/Regarding/Ibid./Through speech./etc.); EN text unchanged; HE untouched; conservative hold if marker count ≠ heSegs−1

## Applied

- `oc1/siman1/seif-008/yad-ephraim` — en 1→2 (=he 2); @1895 transition "Regarding"
- `oc1/siman35/seif-001/ateret-zekenim` — en 1→2 (=he 2); @603 transition "In the head"
- `oc1/siman51/seif-003/shaarei-teshuvah` — en 1→3 (=he 3); @874 transition "The same responsum"; @1040 bold_open "<b>"
- `oc1/siman438/seif-001/chok-yaakov` — en 1→6 (=he 6); @613 bold_open "<b>"; @1185 bold_open "<b>"; @3272 bold_open "<b>"; @3413 transition "If a child"; @3542 bold_open "<b>"
- `yd1/siman84/seif-015/beur-hagra` — en 1→2 (=he 2); @51 note_marker "(Collection)"
- `yd1/siman84/seif-017/beur-hagra` — en 1→2 (=he 2); @188 note_marker "(Collection)"
- `yd1/siman123/seif-026/beur-hagra` — en 1→2 (=he 2); @831 note_marker "(Supplement)"
- `yd1/siman125/seif-011/beur-hagra` — en 1→2 (=he 2); @231 note_marker "(Likut)"
- `yd1/siman127/seif-004/beur-hagra` — en 1→2 (=he 2); @24 note_marker "(Collection)"
- `yd1/siman134/seif-011/beer-hagolah` — en 1→2 (=he 2); @614 transition "Regarding"
- `yd1/siman141/seif-006/beur-hagra` — en 1→2 (=he 2); @1020 note_marker "(Collected)"
- `yd1/siman146/seif-002/beur-hagra` — en 1→2 (=he 2); @1304 note_marker "(Collected)"
- `yd1/siman146/seif-012/beur-hagra` — en 1→2 (=he 2); @79 note_marker "(Collected)"
- `yd1/siman148/seif-008/beur-hagra` — en 1→2 (=he 2); @61 note_marker "(Collected)"
- `yd1/siman269/seif-008/beur-hagra` — en 1→2 (=he 2); @2 note_marker "(Collection)"
- `yd1/siman294/seif-005/beur-hagra` — en 1→2 (=he 2); @3049 note_marker "(Likut)"
- `yd1/siman294/seif-007/beur-hagra` — en 1→3 (=he 3); @3086 note_marker "(Likut)"; @3394 note_marker "(Likut)"
- `yd1/siman294/seif-010/beur-hagra` — en 1→2 (=he 2); @138 note_marker "(Likut)"
- `yd1/siman296/seif-045/beur-hagra` — en 1→3 (=he 3); @56 note_marker ". Likut:"; @156 note_marker ". Likut:"
- `cm1/siman66/seif-033/netivot-hamishpat-hidushim` — en 1→2 (=he 2); @195 transition "Under responsibility"
- `cm1/siman188/seif-001/ketzot-hachoshen` — en 1→2 (=he 2); @633 transition "In siman"

## Skipped

_None._

## Held

- `yd1/siman173/seif-018/beer-hagolah` — **insufficient_markers found=0 need=1** (he=2 en=1 candidates=0)
- `yd1/siman242/seif-036/siftei-kohen` — **insufficient_markers found=10 need=27** (he=28 en=1 candidates=10)
- `cm1/siman358/seif-004/beur-hagra` — **insufficient_markers found=0 need=2** (he=3 en=1 candidates=0)

## Post-apply rescan

Live en_truncated_vs_multi_he: **194** (was 215)
