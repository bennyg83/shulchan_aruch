# EN continuation rejoin — DRY-RUN

Scanned at: 2026-08-27T18:24:01.463Z
Corpus: `C:\Users\binya\Documents\shulchan-aruch-clean\newtry\OC_Mobile\oc318-mobile-reader\public\corpus`

**Nothing applied to corpus.**

## Counts

| Metric | Count |
|--------|------:|
| en_has_more_segments (total) | 59 |
| eligible (safe dry-run) | 11 |
| unsafe | 48 |
| skip | 0 |

## By volume

| Volume | Total | Eligible | Unsafe | Skip |
|--------|------:|---------:|-------:|-----:|
| oc1 | 22 | 3 | 19 | 0 |
| yd1 | 15 | 3 | 12 | 0 |
| eh1 | 0 | 0 | 0 | 0 |
| cm1 | 22 | 5 | 17 | 0 |

## Top slugs

| Slug | Total | Eligible | Unsafe |
|------|------:|---------:|-------:|
| beur-hagra | 24 | 4 | 20 |
| ketzot-hachoshen | 12 | 3 | 9 |
| turei-zahav | 5 | 2 | 3 |
| biur-halacha | 4 | 0 | 4 |
| yad-avraham | 4 | 0 | 4 |
| machatzit-hashekel | 3 | 0 | 3 |
| baer-heitev | 3 | 0 | 3 |
| peri-megadim | 2 | 1 | 1 |
| yad-ephraim | 1 | 1 | 0 |
| urim-vetumim-tumim | 1 | 0 | 1 |

## Example rows

### `oc1/siman32/seif-005/yad-ephraim` — **eligible** (strong_heads_match_heSegs)

- heSegs=2 enSegs=4 excess=2; strongEnHeads=2; alignHint=strong_eq_heSegs
- Proposed groups: `[[0],[1,2,3]]`
- EN before:
  - [0|strong] Shulchan Aruch, seif 5. “If possible.” See Beit Shmuel, Even HaEzer, siman 123, 
  - [1|strong] Seif katan 23: Even if he erased part of the drop. The case there is one where h
  - [2|weak] At first glance this requires study. In the case of a mem whose parts became att
  - [3|weak] When a drop fell into the hollow of a bet, the reason for invalidation is that a
- EN after (proposed):
  - [0] Shulchan Aruch, seif 5. “If possible.” See Beit Shmuel, Even HaEzer, siman 123, 
  - [1] Seif katan 23: Even if he erased part of the drop. The case there is one where h

### `oc1/siman128/seif-003/turei-zahav` — **eligible** (strong_heads_match_heSegs)

- heSegs=2 enSegs=3 excess=1; strongEnHeads=2; alignHint=strong_eq_heSegs
- Proposed groups: `[[0],[1,2]]`
- EN before:
  - [0|strong] One of the things. This is difficult, for it implies that if one of these things
  - [1|strong] The Tur wrote. The Tur wrote in the name of Rabbeinu Peretz that if there is onl
  - [2|weak] And the Levi should pour water. My teacher and father-in-law wrote in the name o
- EN after (proposed):
  - [0] One of the things. This is difficult, for it implies that if one of these things
  - [1] The Tur wrote. The Tur wrote in the name of Rabbeinu Peretz that if there is onl

### `oc1/siman137/seif-004/peri-megadim` — **eligible** (strong_heads_match_heSegs)

- heSegs=4 enSegs=5 excess=1; strongEnHeads=4; alignHint=strong_eq_heSegs
- Proposed groups: `[[0],[1],[2,3],[4]]`
- EN before:
  - [0|strong] He must. See Taz. His view is that so long as the sefer Torah was not completely
  - [1|strong] According to this, Taz apparently disagrees with Magen Avraham in three respects
  - [2|strong] Regarding practical law, I will copy from my short booklet bound with the siddur
  - [3|weak] If on Pesach or Shavuos they called the fourth reader for the entire reading and
  - [4|strong] Know also that if the kohen read only two verses and the Levi and Yisrael each r
- EN after (proposed):
  - [0] He must. See Taz. His view is that so long as the sefer Torah was not completely
  - [1] According to this, Taz apparently disagrees with Magen Avraham in three respects
  - [2] Regarding practical law, I will copy from my short booklet bound with the siddur
  - [3] Know also that if the kohen read only two verses and the Levi and Yisrael each r

### `yd1/siman245/seif-006/beur-hagra` — **eligible** (strong_heads_match_heSegs)

- heSegs=4 enSegs=8 excess=4; strongEnHeads=4; alignHint=strong_eq_heSegs
- Proposed groups: `[[0,1],[2,3,4],[5],[6,7]]`
- EN before:
  - [0|strong] If there was a custom, etc.
  - [1|weak] He is obligated, etc.
  - [2|strong] Torah, etc.
  - [3|weak] This applies specifically, etc.
  - [4|weak] If the custom was, etc. ; meaning as explained in Nedarim 36-37.
  - [5|strong] Liable, etc. ; Kedushin 40 side a, and as written in Shulchan Aruch.
  - [6|strong] Torah, etc. ; not like Rashi there who explains chumash alone; and as explained 
  - [7|weak] And the “Ps.” It is like Hashem Himself as a “t
- EN after (proposed):
  - [0] If there was a custom, etc. He is obligated, etc.
  - [1] Torah, etc. This applies specifically, etc. If the custom was, etc. ; meaning as
  - [2] Liable, etc. ; Kedushin 40 side a, and as written in Shulchan Aruch.
  - [3] Torah, etc. ; not like Rashi there who explains chumash alone; and as explained 

### `yd1/siman331/seif-034/beur-hagra` — **eligible** (strong_heads_match_heSegs)

- heSegs=2 enSegs=4 excess=2; strongEnHeads=2; alignHint=strong_eq_heSegs
- Proposed groups: `[[0,1,2],[3]]`
- EN before:
  - [0|strong] One who says, etc.
  - [1|weak] And some say, etc.
  - [2|weak] They say so. Absolutely, he is called “Ah.” And to Hashem:
  - [3|strong] Oh, yes. He says, “Go forth there and the light of Hashem.” But the words of the
- EN after (proposed):
  - [0] One who says, etc. And some say, etc. They say so. Absolutely, he is called “Ah.
  - [1] Oh, yes. He says, “Go forth there and the light of Hashem.” But the words of the

### `oc1/siman1/seif-001/biur-halacha` — **unsafe** (would_glue_distinct_numbered_notes)

- heSegs=5 enSegs=10 excess=5; strongEnHeads=8; alignHint=no_head_align
- Proposed groups: `[[0,1],[2],[3],[4],[5,6,7,8,9]]`
- EN before:
  - [0|strong] That he should awaken the dawn. It is very proper to take care to recite before 
  - [1|weak] It is a great principle in the Torah, etc. One who wishes to fulfill “I have set
  - [2|strong] 1. To believe that there is one God in the world, Who brought all beings into ex
  - [3|strong] 2. Not to believe in any deity other than Him, as it is stated, “You shall have 
  - [4|strong] 3. To affirm His unity, as it is stated, “Hear, O Israel, Hashem is our God, Has
  - [5|strong] 4. To love the Omnipresent, blessed is He, as it is stated, “You shall love Hash
  - [6|strong] 5. To have fear of Hashem constantly before him so that he will not sin. Concern
  - [7|strong] 6. Not to stray after the thoughts of the heart and the sight of the eyes, as it
  - [8|strong] All this I have gathered briefly from his beautiful language. These words are he
  - [9|weak] And he should not be ashamed, etc. See Mishnah Berurah in the name of Beit Yosef

### `oc1/siman27/seif-006/machatzit-hashekel` — **unsafe** (under_grouped_cannot_split)

- heSegs=3 enSegs=6 excess=3; strongEnHeads=2; alignHint=no_head_align
- Proposed groups: `[[0],[1,2,3,4,5]]`
- EN before:
  - [0|strong] Seif katan 6: Head tefillin over a hat, etc. As Magen Avraham writes at the end 
  - [1|strong] The Bach asks from the end of the chapter HaKometz: The Gemara expounds "upon yo
  - [2|weak] As Magen Avraham writes at the end of this siman. There is therefore no difficul
  - [3|weak] This also explains Magen Avraham's statement, "For this reason it appears that i
  - [4|weak] And the fact that the kohanim did not place them. The kohanim did not wear the a
  - [5|weak] It would have been possible to wrap another item over the arm tefillin so they w

### `oc1/siman51/seif-007/machatzit-hashekel` — **unsafe** (under_grouped_cannot_split)

- heSegs=4 enSegs=5 excess=1; strongEnHeads=3; alignHint=no_head_align
- Proposed groups: `[[0,1,2],[3],[4]]`
- EN before:
  - [0|strong] Seif katan 7: And we say, etc., that we should merit, etc. Our intent in recitin
  - [1|weak] Therefore he wrote that it should not be said at Minchah. The responsum is abbre
  - [2|weak] At Shacharis before LaMenatzeach, however, he did not conclude that Tehillah LeD
  - [3|strong] The second occurrence of "Who is like You." This refers to the phrase in the Son
  - [4|strong] The gimel of "ga'al" should be pronounced with a dagesh, because if it is soft t

## Recommendation

SELECTIVE HOLD — 11/59 pass strict strong-head alignment. Review those 11 before any apply. Remaining are unsafe/ambiguous (greedy collapse or under-grouped). Existing rejoin_oversplit_en.mjs cannot apply these (requires heSegs===1); need a NEW apply script gated on strong_heads_match_heSegs only.
