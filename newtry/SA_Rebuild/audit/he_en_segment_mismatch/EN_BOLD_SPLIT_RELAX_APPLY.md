# Part 2 bucket 1 — EN bold-lemma split (relax HE bold-heads)

**LIVE:** `C:\Users\binya\Documents\shulchan-aruch-clean`  
**Script:** `newtry/SA_Rebuild/scripts/split_en_on_bold_lemmas.mjs --relax-he-bold-heads`  
**Mode:** APPLY (2 cells)

## Policy delta

- Drops requirement that every HE `<br>` seg starts with `<b>`
- When first HE seg is not bold-headed, allows EN non-bold prefix (first bold maps mid-first-seg)
- Still requires EN `<b>` open count === `heSegs`
- Still skips `bold_count_ne_heSegs`, corrupted HE, empty-pad
- Writes `en.html` only

## Applied

| Path | heSegs | enSegs before → after | EN bolds |
|------|-------:|----------------------:|---------:|
| `oc1/siman132/seif-002/magen-avraham` | 6 | 1 → 6 | 6 |
| `oc1/siman175/seif-001/magen-avraham` | 2 | 1 → 2 | 2 |

Prior `he_segs_not_all_bold_headed` leftovers that already had `enSegs===heSegs` (no-op): shaarei-teshuvah 8:3, ateret-zekenim 448:2, urim 66:24.

## Rebundle

`BUNDLE_CONCURRENCY=1` — oc1 simanim **132, 175** only.
