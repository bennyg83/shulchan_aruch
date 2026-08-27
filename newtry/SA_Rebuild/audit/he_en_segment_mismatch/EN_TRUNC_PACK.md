# EN_TRUNC_PACK — en_truncated_vs_multi_he (enSegs===1, heSegs>1)

**For external AI review only. Do not apply to corpus until after human/parent check.**

## Summary

| Metric | Count |
|--------|------:|
| **Total cases** | **215** |
| Prior expected (en_truncated_vs_multi_he) | 215 |
| Delta vs prior | 0 |

### By volume

| Volume | Count |
|--------|------:|
| oc1 | 14 |
| yd1 | 135 |
| cm1 | 66 |

### By volume / slug

| Volume | Slug | Count |
|--------|------|------:|
| yd1 | beer-hagolah | 46 |
| yd1 | beur-hagra | 39 |
| cm1 | beur-hagra | 31 |
| yd1 | siftei-kohen | 19 |
| yd1 | turei-zahav | 19 |
| cm1 | turei-zahav | 8 |
| yd1 | baer-heitev | 7 |
| oc1 | ateret-zekenim | 5 |
| cm1 | beer-hagolah | 4 |
| cm1 | chelkat-mechokek | 4 |
| cm1 | chokhmat-shlomo | 4 |
| cm1 | rabbi-akiva-eiger | 4 |
| oc1 | peri-megadim | 3 |
| yd1 | tiferet-yisrael | 3 |
| cm1 | ketzot-hachoshen | 2 |
| cm1 | netivot-hamishpat-beurim | 2 |
| cm1 | urim-vetumim-tumim | 2 |
| cm1 | urim-vetumim-urim | 2 |
| oc1 | shaarei-teshuvah | 2 |
| oc1 | yad-ephraim | 2 |
| cm1 | haggahot-imrei-barukh | 1 |
| cm1 | netivot-hamishpat-hidushim | 1 |
| cm1 | siftei-kohen | 1 |
| oc1 | chok-yaakov | 1 |
| oc1 | machatzit-hashekel | 1 |
| yd1 | chiddushei-hilkhot-niddah | 1 |
| yd1 | torat-hashlamim | 1 |

## Files

- Full pack: [`EN_TRUNC_PACK.json`](./EN_TRUNC_PACK.json)
  - UTF-8 bytes: 805,788
  - SHA-256: `b353a7cae8efdc06e26ea1c1fc8427aaf8e44aa9801f9b153545eb6fd416588c`
  - Cases: 215
- Parts: each ≤ 85,000 UTF-8 bytes (hard cap)
- Corpus: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/{oc1,yd1,eh1,cm1}/`
- Split: normalize consecutive `<br>` then split on `<br>`; strip tags for segment text
- Created: 2026-08-27T20:51:09.706Z

## Parts

| Part | File | Cases | Case offset | Bytes (UTF-8) | SHA-256 (prefix) | Truncated segs |
|------|------|------:|------------:|--------------:|------------------|----------------|
| 1 | `EN_TRUNC_PACK_part01.json` | 13 | 0 | 73,342 | 8de6a93f5508… |  |
| 2 | `EN_TRUNC_PACK_part02.json` | 38 | 13 | 83,458 | 95c71d45bdd5… |  |
| 3 | `EN_TRUNC_PACK_part03.json` | 26 | 51 | 71,658 | a6b187719fe6… |  |
| 4 | `EN_TRUNC_PACK_part04.json` | 2 | 77 | 45,527 | 08b5fc53b683… |  |
| 5 | `EN_TRUNC_PACK_part05.json` | 18 | 79 | 83,464 | a3777a6c584d… |  |
| 6 | `EN_TRUNC_PACK_part06.json` | 15 | 97 | 83,746 | 0ca7c4052e2c… |  |
| 7 | `EN_TRUNC_PACK_part07.json` | 45 | 112 | 76,753 | 12c6887ea695… |  |
| 8 | `EN_TRUNC_PACK_part08.json` | 15 | 157 | 84,409 | c3428a3f9185… |  |
| 9 | `EN_TRUNC_PACK_part09.json` | 13 | 172 | 79,109 | 5f67ff31ba6a… |  |
| 10 | `EN_TRUNC_PACK_part10.json` | 6 | 185 | 59,585 | 8aff01026506… |  |
| 11 | `EN_TRUNC_PACK_part11.json` | 14 | 191 | 81,552 | 8817f9f3aa94… |  |
| 12 | `EN_TRUNC_PACK_part12.json` | 10 | 205 | 19,968 | 76ba0a2def68… |  |



## Review prompt (use with each part)

Paste this prompt together with **one** `EN_TRUNC_PACK_partNN.json` file. Return a JSON array for **only** the case ids in that part.

```
SA_Rebuild EN_TRUNC (en_truncated_vs_multi_he) review. INPUT: one EN_TRUNC_PACK_partNN.json (this chunk only).

CONTEXT
- Each case has heSegs > 1 and enSegs === 1 (one EN blob vs multiple HE segments).
- Goal: split EN into heSegs aligned segments IF clear delimiters exist; else escalate. Do NOT invent English. Do NOT invent Hebrew.

RULES
1) If EN contains clear delimiters matching HE structure (bold lemma heads, numbered markers, <br>-like breaks lost in ingest, parallel note markers): action split_en with proposed_split_count === heSegs and split_plan describing 0-based cut points / delimiter cues. Do not paste full rewritten EN here unless a cut is trivial index-only.
2) If no safe delimiter map: needs_editorial or needs_human.
3) Never propose merging HE down to 1 just to match a glued EN blob unless notes explicitly say HE was wrongly oversplit AND evidence is strong — default is split EN or escalate.
4) skip only if already fixed.

OUTPUT JSON array only, same ids/order:
[{"id":"...","action":"split_en"|"needs_editorial"|"needs_human"|"skip","proposed_split_count":null|N,"split_plan":null|"brief","notes":"short"}]

Conservative when unsure. No corpus edits.
```

## Notes

- Prefer split EN when delimiters exist; else needs_editorial / needs_human.
- No corpus apply from this pack.
