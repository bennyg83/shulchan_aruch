# HE/EN content mismatch scan

Scanned at: 2026-08-27T11:02:49.907Z

Flags likely **wrong-EN-for-HE** pairs even when `<br>` segment counts match
(YD 4:2 Rabbi Akiva Eiger pattern: Shach HE paired with Taz EN).

Heuristics: cross-commentator head, seif-katan mismatch, EN wrong siman,
duplicate EN across seifs, length imbalance, lemma conflict, EN Hebrew leak.

| Volume | Pairs | Issues | RAE pairs | RAE issues | Top kinds |
|--------|------:|-------:|----------:|-----------:|-----------|
| oc1 | 89911 | 688 | 3863 | 41 | duplicate_en_across_seifs(237), seif_katan_mismatch(223), en_wrong_folder_seif(147), cross_commentator(108) |
| yd1 | 25946 | 1525 | 1468 | 299 | duplicate_en_across_seifs(1022), seif_katan_mismatch(472), lemma_head_conflict(100), cross_commentator(99) |
| eh1 | 11939 | 25 | 483 | 4 | cross_commentator(15), duplicate_en_across_seifs(7), en_wrong_siman(2), seif_katan_mismatch(1) |
| cm1 | 70186 | 232 | 3694 | 10 | seif_katan_mismatch(172), lemma_head_conflict(143), en_wrong_folder_seif(25), cross_commentator(18) |

**Totals:** 2470 issues across volumes; **rabbi-akiva-eiger\*** issues: 354.

## YD 4:2 rabbi-akiva-eiger check

- **Clean:** `yd1/siman4/seif-002/rabbi-akiva-eiger*` did **not** flag (expected after fix 19200cd199).

## RAE hits (all volumes)

- `oc1/siman8/seif-004/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman11/seif-009/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman46/seif-006/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman55/seif-008/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman108/seif-006/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman128/seif-012/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman128/seif-013/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman134/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham, note 1)
- `oc1/siman168/seif-004/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman204/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman205/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman216/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman277/seif-004/rabbi-akiva-eiger` score=2 — seif_katan_mismatch | HE:(—) EN:(Seif 4.)
- `oc1/siman293/seif-003/rabbi-akiva-eiger` score=2 — seif_katan_mismatch | HE:(—) EN:(Seif 3.)
- `oc1/siman306/seif-005/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman306/seif-011/rabbi-akiva-eiger` score=2 — seif_katan_mismatch | HE:(—) EN:(Seif 11 in the gloss.)
- `oc1/siman308/seif-006/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.)
- `oc1/siman318/seif-005/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman318/seif-010/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman328/seif-003/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman328/seif-004/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman362/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman363/seif-002/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman363/seif-003/rabbi-akiva-eiger` score=3 — duplicate_en_across_seifs
- `oc1/siman363/seif-009/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman372/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman397/seif-016/rabbi-akiva-eiger` score=2 — seif_katan_mismatch | HE:(—) EN:(Seif 16.)
- `oc1/siman451/seif-007/rabbi-akiva-eiger` score=2 — seif_katan_mismatch | HE:(—) EN:(Magen Avraham s.k. 17.)
- `oc1/siman455/seif-003/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman467/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.k. 8.)
- `oc1/siman467/seif-008/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.k. 22.)
- `oc1/siman472/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.k. 5.)
- `oc1/siman498/seif-014/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman498/seif-016/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman507/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman517/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman548/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman551/seif-006/rabbi-akiva-eiger` score=3 — cross_commentator
- `oc1/siman551/seif-007/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.k. 42)
- `oc1/siman562/seif-001/rabbi-akiva-eiger` score=3 — cross_commentator | HE:(—) EN:(Magen Avraham s.k. 1)
- `yd1/siman1/seif-003/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(בהג"ה) EN:(In the gloss.)
- `yd1/siman1/seif-005/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(בהג"ה) EN:(In the gloss.)
- `yd1/siman1/seif-010/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(בא"ד) EN:(In the response.)
- `yd1/siman1/seif-012/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(בא"ד) EN:(In the response.)
- `yd1/siman2/seif-006/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ו') EN:(seif 6)
- `yd1/siman2/seif-008/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ו') EN:(seif 6)
- `yd1/siman16/seif-001/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סימן ט"ז ס"ד) EN:(And if he slaughtered the first at bein hashemashos, etc., until night of sixth.)
- `yd1/siman16/seif-002/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ו') EN:(And if he slaughtered the first at bein hashemashos, etc., until night of sixth.)
- `yd1/siman18/seif-002/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(שם) EN:(But if it was lost, his shechitah is valid.)
- `yd1/siman18/seif-004/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ט"ו) EN:(But if it was lost, his shechitah is valid.)
- `yd1/siman30/seif-002/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(סעיף ב' הג"ה) EN:(Seif 2, Hagahah)
- `yd1/siman31/seif-003/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(ט"ז סק"ג) EN:(Such as in the nostril — kosher.)
- `yd1/siman31/seif-004/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ג') EN:(Such as in the nostril — kosher.)
- `yd1/siman32/seif-001/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(שם סעיף ג') EN:(There seif 3)
- `yd1/siman32/seif-003/rabbi-akiva-eiger-yd` score=5 — seif_katan_mismatch, duplicate_en_across_seifs | HE:(סימן ל"ב ט"ז סק"ד) EN:(There seif 3)
- `yd1/siman33/seif-001/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סימן ל"ג ס"ג) EN:(Siman 33 s.k. 3)
- `yd1/siman33/seif-002/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(שם ט"ז סק"ה) EN:(There s.k. 5)
- `yd1/siman33/seif-003/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ו') EN:(Siman 33 s.k. 3)
- `yd1/siman33/seif-004/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ח') EN:(There s.k. 5)
- `yd1/siman33/seif-009/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(בנקודות הכסף ס"ק י"ח) EN:(Nekudat HaKesef s.k. 18)
- `yd1/siman35/seif-003/rabbi-akiva-eiger-yd` score=5 — length_he_tiny_en_long, duplicate_en_across_seifs | HE:(שם סק"ד) EN:(—)
- `yd1/siman35/seif-004/rabbi-akiva-eiger-yd` score=5 — cross_commentator, length_he_tiny_en_long | HE:(ש"ך סק"ח) EN:(—)
- `yd1/siman35/seif-007/rabbi-akiva-eiger-yd` score=3 — cross_commentator | HE:(ט"ז ס"ק ס') EN:(—)
- `yd1/siman35/seif-008/rabbi-akiva-eiger-yd` score=6 — cross_commentator, duplicate_en_across_seifs | HE:(ש"ך סקט"ו) EN:(—)
- `yd1/siman35/seif-009/rabbi-akiva-eiger-yd` score=8 — cross_commentator, length_he_tiny_en_long, duplicate_en_across_seifs | HE:(שם סקט"ז) EN:(—)
- `yd1/siman35/seif-010/rabbi-akiva-eiger-yd` score=5 — length_he_tiny_en_long, duplicate_en_across_seifs | HE:(שם סקי"ז) EN:(—)
- `yd1/siman36/seif-006/rabbi-akiva-eiger-yd` score=5 — seif_katan_mismatch, duplicate_en_across_seifs | HE:(ש"ך סק"ה) EN:(Shach s.k. 29)
- `yd1/siman36/seif-013/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סעיף ז' בהג"ה) EN:(Seif 13 in hagahah)
- `yd1/siman36/seif-016/rabbi-akiva-eiger-yd` score=5 — seif_katan_mismatch, duplicate_en_across_seifs | HE:(סעיף י"ג בהג"ה) EN:(Seif 13 in hagahah)
- `yd1/siman36/seif-017/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(ש"ך סקכ"ט) EN:(Shach s.k. 29)
- `yd1/siman37/seif-003/rabbi-akiva-eiger-yd` score=5 — seif_katan_mismatch, duplicate_en_across_seifs | HE:(ש"ך סק"ב) EN:(There s.k. 3)
- `yd1/siman37/seif-005/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(שם סק"ג) EN:(There s.k. 3)
- `yd1/siman39/seif-001/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סי' ל"ט סעיף ב' בהג"ה) EN:(Siman 39, seif 2, in the hagahah)
- `yd1/siman39/seif-002/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(ש"ך סקי"ט) EN:(Siman 39, seif 2, in the hagahah)
- `yd1/siman39/seif-004/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(ש"ך ס"ק כ"ז) EN:(Shach, s.k. 29)
- `yd1/siman39/seif-007/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(ט"ז ס"ק כ"ג) EN:(Taz, s.k. 23)
- `yd1/siman39/seif-015/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(ט"ז ס"ק כ"ג) EN:(Taz, s.k. 23)
- `yd1/siman44/seif-001/rabbi-akiva-eiger-yd` score=3 — duplicate_en_across_seifs | HE:(סימן מ"ד ט"ז סק"ח) EN:(Siman 44, Taz s.k. 8)
- `yd1/siman44/seif-002/rabbi-akiva-eiger-yd` score=6 — cross_commentator, duplicate_en_across_seifs | HE:(ש"ך סקי"ו) EN:(Siman 44, Taz s.k. 8)
- `yd1/siman46/seif-004/rabbi-akiva-eiger-yd` score=2 — seif_katan_mismatch | HE:(ש"ך סקי"ד) EN:(Shach s.k. 14)
- `eh1/siman1/seif-006/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 10: Rabbenu Gershom imposed the cherem.)
- `eh1/siman1/seif-008/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 13 in the gloss: because of suspicion.)
- `eh1/siman4/seif-002/rabbi-akiva-eiger` score=3 — cross_commentator
- `eh1/siman28/seif-003/rabbi-akiva-eiger` score=3 — cross_commentator
- `cm1/siman28/seif-018/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 20, and so it is.)
- `cm1/siman28/seif-019/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 29.)
- `cm1/siman34/seif-006/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 58.)
- `cm1/siman34/seif-017/rabbi-akiva-eiger` score=4 — cross_commentator, lemma_head_conflict | HE:(—) EN:(And this is not comparable to what the Rama wrote.)
- `cm1/siman66/seif-019/rabbi-akiva-eiger` score=3 — cross_commentator
- `cm1/siman121/seif-008/rabbi-akiva-eiger` score=4 — cross_commentator, lemma_head_conflict | HE:(—) EN:(And perhaps this is what the Rama understood.)
- `cm1/siman176/seif-016/rabbi-akiva-eiger` score=4 — cross_commentator, lemma_head_conflict | HE:(—) EN:(In practice, in accordance with the words of the Rama.)
- `cm1/siman233/seif-001/rabbi-akiva-eiger` score=4 — cross_commentator, lemma_head_conflict | HE:(—) EN:(And the Rama did not write it.)
- `cm1/siman235/seif-014/rabbi-akiva-eiger` score=3 — en_wrong_siman | HE:(—) EN:(Siman 42.)
- `cm1/siman248/seif-006/rabbi-akiva-eiger` score=4 — cross_commentator, lemma_head_conflict | HE:(—) EN:(Rama, seif 7, in the gloss.)

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| kaf-hachayyim | 292 | duplicate_en_across_seifs:200, en_wrong_folder_seif:147, cross_commentator:6, lemma_head_conflict:4, length_he_tiny_en_long:2 |
| machatzit-hashekel | 76 | seif_katan_mismatch:56, lemma_head_conflict:38, en_wrong_siman:19, length_en_tiny_he_long:1 |
| yad-ephraim | 72 | seif_katan_mismatch:54, lemma_head_conflict:17, cross_commentator:14, length_he_tiny_en_long:5 |
| netiv-chayim | 51 | seif_katan_mismatch:48, cross_commentator:3 |
| rabbi-akiva-eiger | 41 | cross_commentator:30, duplicate_en_across_seifs:6, seif_katan_mismatch:5 |
| chatam-sofer | 36 | seif_katan_mismatch:22, cross_commentator:17 |
| chokhmat-shlomo | 21 | seif_katan_mismatch:20, lemma_head_conflict:3, cross_commentator:1 |
| kol-yaakov | 16 | duplicate_en_across_seifs:16 |
| shaarei-teshuvah | 15 | cross_commentator:9, duplicate_en_across_seifs:5, length_he_tiny_en_long:1, seif_katan_mismatch:1 |
| beur-hagra | 15 | seif_katan_mismatch:10, lemma_head_conflict:9, en_wrong_siman:3, cross_commentator:1, length_he_tiny_en_long:1 |
| peri-megadim | 14 | duplicate_en_across_seifs:8, cross_commentator:6, lemma_head_conflict:1 |
| levushei-serad | 11 | seif_katan_mismatch:6, cross_commentator:5 |
| eliyah-rabbah | 6 | cross_commentator:4, length_he_tiny_en_long:2, lemma_head_conflict:1 |
| turei-zahav | 4 | duplicate_en_across_seifs:2, en_wrong_siman:1, length_he_tiny_en_long:1 |
| magen-avraham | 4 | cross_commentator:4 |
| mechaber | 4 | length_he_tiny_en_long:4 |
| baer-heitev | 3 | cross_commentator:2, en_wrong_siman:1 |
| biur-halacha | 2 | cross_commentator:2 |
| dagul-merevavah | 2 | seif_katan_mismatch:1, cross_commentator:1 |
| eshel-avraham | 2 | cross_commentator:2 |
| beer-hagolah | 1 | cross_commentator:1 |

### yd1

| Slug | Issues | Kinds |
|------|-------:|-------|
| nekudot-hakesef | 311 | seif_katan_mismatch:246, duplicate_en_across_seifs:92, lemma_head_conflict:87, cross_commentator:18, length_en_tiny_he_long:3 |
| rabbi-akiva-eiger-yd | 299 | duplicate_en_across_seifs:204, seif_katan_mismatch:114, cross_commentator:14, length_he_tiny_en_long:8, lemma_head_conflict:4 |
| pitchei-teshuva | 268 | duplicate_en_across_seifs:247, cross_commentator:19, length_he_tiny_en_long:9, length_en_tiny_he_long:7, keyword_theme_mismatch:1 |
| kaf-hachayim | 171 | duplicate_en_across_seifs:163, en_wrong_folder_seif:4, cross_commentator:4, seif_katan_mismatch:4, length_he_tiny_en_long:2 |
| mateh-yehonatan | 104 | seif_katan_mismatch:76, duplicate_en_across_seifs:36 |
| yad-avraham | 83 | duplicate_en_across_seifs:60, seif_katan_mismatch:26, en_wrong_siman:4, cross_commentator:3, lemma_head_conflict:1 |
| yad-ephraim | 68 | duplicate_en_across_seifs:54, cross_commentator:13, length_he_tiny_en_long:3, seif_katan_mismatch:2, lemma_head_conflict:1 |
| baer-heitev | 57 | duplicate_en_across_seifs:48, cross_commentator:7, length_he_tiny_en_long:3, lemma_head_conflict:3, length_en_tiny_he_long:1 |
| siftei-kohen | 40 | duplicate_en_across_seifs:24, length_he_tiny_en_long:7, cross_commentator:5, length_en_tiny_he_long:3, en_wrong_siman:1 |
| beur-hagra | 35 | duplicate_en_across_seifs:24, length_en_tiny_he_long:4, cross_commentator:3, seif_katan_mismatch:2, lemma_head_conflict:2 |
| turei-zahav | 29 | duplicate_en_across_seifs:24, length_en_tiny_he_long:2, cross_commentator:2, length_extreme_ratio:1, length_he_tiny_en_long:1 |
| beer-hagolah | 24 | duplicate_en_across_seifs:22, cross_commentator:2, length_extreme_ratio:1 |
| peleti | 20 | duplicate_en_across_seifs:18, cross_commentator:2, length_en_tiny_he_long:1 |
| tiferet-yisrael | 6 | cross_commentator:3, duplicate_en_across_seifs:2, seif_katan_mismatch:1, lemma_head_conflict:1 |
| mechaber | 4 | duplicate_en_across_seifs:2, cross_commentator:1, length_en_tiny_he_long:1 |
| kereti | 3 | cross_commentator:3 |
| chiddushei-hilkhot-niddah | 3 | duplicate_en_across_seifs:2, length_en_tiny_he_long:1 |

### eh1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beit-shmuel | 6 | duplicate_en_across_seifs:5, cross_commentator:1 |
| beit-meir | 6 | cross_commentator:4, duplicate_en_across_seifs:2 |
| rabbi-akiva-eiger | 4 | en_wrong_siman:2, cross_commentator:2 |
| baer-hetev | 4 | cross_commentator:4 |
| pitchei-teshuva | 2 | cross_commentator:2 |
| turei-zahav | 1 | cross_commentator:1 |
| ezer-mikodesh | 1 | seif_katan_mismatch:1 |
| beur-hagra | 1 | cross_commentator:1 |

### cm1

| Slug | Issues | Kinds |
|------|-------:|-------|
| haggahot-imrei-barukh | 79 | seif_katan_mismatch:77, lemma_head_conflict:75, duplicate_en_across_seifs:2 |
| turei-zahav | 78 | seif_katan_mismatch:52, lemma_head_conflict:47, en_wrong_folder_seif:25, en_wrong_siman:1 |
| chokhmat-shlomo | 30 | seif_katan_mismatch:30, lemma_head_conflict:9 |
| kessef-hakodashim | 15 | seif_katan_mismatch:13, lemma_head_conflict:7, cross_commentator:2 |
| rabbi-akiva-eiger | 10 | cross_commentator:6, lemma_head_conflict:5, en_wrong_siman:4 |
| netivot-hamishpat-hidushim | 4 | cross_commentator:3, en_wrong_siman:1 |
| pitchei-teshuva | 4 | duplicate_en_across_seifs:4 |
| baer-hetev | 3 | en_wrong_siman:3 |
| chatam-sofer | 3 | cross_commentator:3 |
| ketzot-hachoshen | 2 | cross_commentator:2 |
| siftei-kohen | 2 | en_wrong_siman:2 |
| meirat-einayim | 1 | cross_commentator:1 |
| netivot-hamishpat-beurim | 1 | cross_commentator:1 |

## Top samples (by score)

### oc1

- `oc1/siman13/seif-002/yad-ephraim` **score=6** cross_commentator, seif_katan_mismatch, lemma_head_conflict (676B / 815B) EN«Taz, seif katan 5.»
- `oc1/siman1/seif-005/shaarei-teshuvah` **score=5** length_he_tiny_en_long, duplicate_en_across_seifs (116B / 912B) EN«Seif katan 10.»
- `oc1/siman10/seif-005/kaf-hachayyim` **score=5** en_wrong_folder_seif, duplicate_en_across_seifs (698B / 965B) EN«5) [Seif 2] It has four corners, and he cut one diagonally, etc.»
- `oc1/siman10/seif-008/kaf-hachayyim` **score=5** en_wrong_folder_seif, duplicate_en_across_seifs (1591B / 1729B) EN«8) [Seif 3] He folded the corners of his tallis, etc.»
- `oc1/siman11/seif-014/kaf-hachayyim` **score=5** en_wrong_folder_seif, duplicate_en_across_seifs (416B / 465B) EN«14) [Seif 4] The length of the eight threads must be no less than four thumbbreadths; the measuremen»
- `oc1/siman1/seif-002/shaarei-teshuvah` **score=3** duplicate_en_across_seifs (901B / 3779B) EN«And at the end.»
- `oc1/siman1/seif-004/shaarei-teshuvah` **score=3** duplicate_en_across_seifs (180B / 355B) EN«With concentration.»
- `oc1/siman1/seif-006/shaarei-teshuvah` **score=3** duplicate_en_across_seifs (3815B / 3790B) EN«And at the end.»
- `oc1/siman1/seif-008/shaarei-teshuvah` **score=3** duplicate_en_across_seifs (289B / 356B) EN«With concentration.»
- `oc1/siman3/seif-003/kaf-hachayyim` **score=3** duplicate_en_across_seifs (373B / 582B)
- `oc1/siman3/seif-005/kaf-hachayyim` **score=3** duplicate_en_across_seifs (2043B / 1816B)
- `oc1/siman3/seif-006/kaf-hachayyim` **score=3** duplicate_en_across_seifs (881B / 946B)
- `oc1/siman3/seif-008/kaf-hachayyim` **score=3** duplicate_en_across_seifs (154B / 384B)
- `oc1/siman3/seif-009/kaf-hachayyim` **score=3** duplicate_en_across_seifs (644B / 587B)
- `oc1/siman3/seif-014/kaf-hachayyim` **score=3** duplicate_en_across_seifs (486B / 450B)
- `oc1/siman3/seif-016/kaf-hachayyim` **score=3** duplicate_en_across_seifs (1373B / 954B)
- `oc1/siman3/seif-017/kaf-hachayyim` **score=3** duplicate_en_across_seifs (419B / 388B)
- `oc1/siman4/seif-004/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (200B / 204B) EN«S.k. 4, fit, etc.»
- `oc1/siman4/seif-011/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (176B / 177B) EN«S.k. 11, and to remove, etc.»
- `oc1/siman4/seif-012/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (2815B / 3014B) EN«S.k. 12, without a blessing.»
- `oc1/siman4/seif-013/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (637B / 640B) EN«S.k. 13, spirit, etc.»
- `oc1/siman4/seif-014/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (151B / 186B) EN«S.k. 14, one who slept, etc.»
- `oc1/siman4/seif-015/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (297B / 314B) EN«S.k. 15, that he should not, etc.»
- `oc1/siman4/seif-016/machatzit-hashekel` **score=3** seif_katan_mismatch, lemma_head_conflict (783B / 823B) EN«S.k. 16, chapter, etc.»
- `oc1/siman4/seif-021/turei-zahav` **score=3** en_wrong_siman (227B / 198B) EN«Siman 164.»

### yd1

- `yd1/siman13/seif-002/nekudot-hakesef` **score=6** seif_katan_mismatch, lemma_head_conflict, duplicate_en_across_seifs (425B / 1125B) EN«s.k. 6»
- `yd1/siman14/seif-005/pitchei-teshuva` **score=6** length_he_tiny_en_long, keyword_theme_mismatch, duplicate_en_across_seifs (100B / 1126B) EN«In kosher milk.»
- `yd1/siman1/seif-002/nekudot-hakesef` **score=5** seif_katan_mismatch, duplicate_en_across_seifs (1868B / 116B) EN«s.k. 8»
- `yd1/siman1/seif-005/nekudot-hakesef` **score=5** seif_katan_mismatch, duplicate_en_across_seifs (444B / 1363B) EN«s.k. 9»
- `yd1/siman1/seif-005/yad-avraham` **score=5** seif_katan_mismatch, duplicate_en_across_seifs (475B / 308B) HE«בש"ך ס"ק ל"ז» EN«Seif 5.»
- `yd1/siman15/seif-003/nekudot-hakesef` **score=5** seif_katan_mismatch, en_wrong_siman (818B / 1436B) EN«Siman 66 s.k. 1»
- `yd1/siman1/seif-002/yad-avraham` **score=3** duplicate_en_across_seifs (348B / 309B) HE«סעיף ה» EN«Seif 5.»
- `yd1/siman1/seif-003/kaf-hachayim` **score=3** duplicate_en_across_seifs (575B / 433B) EN«14»
- `yd1/siman1/seif-003/nekudot-hakesef` **score=3** duplicate_en_across_seifs (117B / 117B) EN«s.k. 8»
- `yd1/siman1/seif-003/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (7065B / 7284B) HE«בהג"ה» EN«In the gloss.»
- `yd1/siman1/seif-004/nekudot-hakesef` **score=3** duplicate_en_across_seifs (1395B / 1364B) EN«s.k. 9»
- `yd1/siman1/seif-005/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (732B / 736B) HE«בהג"ה» EN«In the gloss.»
- `yd1/siman1/seif-010/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (1820B / 1975B) HE«בא"ד» EN«In the response.»
- `yd1/siman1/seif-012/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (3140B / 1974B) HE«בא"ד» EN«In the response.»
- `yd1/siman1/seif-014/kaf-hachayim` **score=3** duplicate_en_across_seifs (429B / 434B) EN«14»
- `yd1/siman2/seif-001/yad-avraham` **score=3** duplicate_en_across_seifs (1823B / 1627B) HE«סי' ב סעיף ד» EN«siman 2 seif 4»
- `yd1/siman2/seif-003/beur-hagra` **score=3** seif_katan_mismatch, lemma_head_conflict (1177B / 1120B) EN«seif 3»
- `yd1/siman2/seif-004/yad-avraham` **score=3** duplicate_en_across_seifs (1711B / 1626B) HE«סעיף י» EN«siman 2 seif 4»
- `yd1/siman2/seif-006/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (1707B / 1430B) HE«סעיף ו'» EN«seif 6»
- `yd1/siman2/seif-008/rabbi-akiva-eiger-yd` **score=3** duplicate_en_across_seifs (604B / 471B) HE«סעיף ו'» EN«seif 6»
- `yd1/siman4/seif-001/pitchei-teshuva` **score=3** duplicate_en_across_seifs (513B / 435B) EN«Kosher.»
- `yd1/siman4/seif-003/pitchei-teshuva` **score=3** duplicate_en_across_seifs (708B / 597B) EN«Kosher.»
- `yd1/siman11/seif-003/pitchei-teshuva` **score=3** duplicate_en_across_seifs (108B / 138B) EN«One may not slaughter.»
- `yd1/siman11/seif-004/pitchei-teshuva` **score=3** duplicate_en_across_seifs (147B / 139B) EN«One may not slaughter.»
- `yd1/siman13/seif-002/kaf-hachayim` **score=3** duplicate_en_across_seifs (459B / 174B) EN«f»

### eh1

- `eh1/siman1/seif-006/rabbi-akiva-eiger` **score=3** en_wrong_siman (237B / 282B) EN«Siman 10: Rabbenu Gershom imposed the cherem.»
- `eh1/siman1/seif-008/rabbi-akiva-eiger` **score=3** en_wrong_siman (426B / 464B) EN«Siman 13 in the gloss: because of suspicion.»
- `eh1/siman4/seif-002/rabbi-akiva-eiger` **score=3** cross_commentator (96B / 85B)
- `eh1/siman4/seif-024/pitchei-teshuva` **score=3** cross_commentator (2110B / 1555B)
- `eh1/siman5/seif-013/turei-zahav` **score=3** cross_commentator (1033B / 760B)
- `eh1/siman17/seif-012/beit-shmuel` **score=3** duplicate_en_across_seifs (147B / 61B)
- `eh1/siman17/seif-030/beit-shmuel` **score=3** duplicate_en_across_seifs (221B / 61B)
- `eh1/siman17/seif-033/beit-shmuel` **score=3** duplicate_en_across_seifs (566B / 126B)
- `eh1/siman17/seif-034/beit-meir` **score=3** duplicate_en_across_seifs (6151B / 895B)
- `eh1/siman17/seif-040/beit-shmuel` **score=3** duplicate_en_across_seifs (538B / 126B)
- `eh1/siman17/seif-043/beit-meir` **score=3** duplicate_en_across_seifs (711B / 895B)
- `eh1/siman17/seif-045/beit-shmuel` **score=3** duplicate_en_across_seifs (605B / 126B)
- `eh1/siman28/seif-003/rabbi-akiva-eiger` **score=3** cross_commentator (274B / 189B)
- `eh1/siman29/seif-001/baer-hetev` **score=3** cross_commentator (893B / 790B)
- `eh1/siman29/seif-001/beit-shmuel` **score=3** cross_commentator (5457B / 4009B)
- `eh1/siman35/seif-007/beur-hagra` **score=3** cross_commentator (109B / 64B)
- `eh1/siman64/seif-003/beit-meir` **score=3** cross_commentator (924B / 473B)
- `eh1/siman85/seif-011/beit-meir` **score=3** cross_commentator (2282B / 2815B)
- `eh1/siman88/seif-010/baer-hetev` **score=3** cross_commentator (313B / 152B)
- `eh1/siman90/seif-011/beit-meir` **score=3** cross_commentator (1393B / 616B)
- `eh1/siman96/seif-006/baer-hetev` **score=3** cross_commentator (856B / 286B)
- `eh1/siman102/seif-001/beit-meir` **score=3** cross_commentator (4194B / 1027B)
- `eh1/siman125/seif-020/baer-hetev` **score=3** cross_commentator (527B / 247B)
- `eh1/siman156/seif-009/pitchei-teshuva` **score=3** cross_commentator (864B / 268B)
- `eh1/siman35/seif-002/ezer-mikodesh` **score=2** seif_katan_mismatch (1453B / 1148B) EN«Beit Shmuel s.k. 28»

### cm1

- `cm1/siman34/seif-017/rabbi-akiva-eiger` **score=4** cross_commentator, lemma_head_conflict (247B / 281B) EN«And this is not comparable to what the Rama wrote.»
- `cm1/siman66/seif-002/kessef-hakodashim` **score=4** cross_commentator, lemma_head_conflict (2114B / 2383B) EN«See Shach, seif katan 18.»
- `cm1/siman1/seif-004/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (271B / 310B) EN«Sema, seif katan 21»
- `cm1/siman7/seif-003/turei-zahav` **score=3** seif_katan_mismatch, lemma_head_conflict (506B / 689B) EN«Seif 7: One who placed his fellow under a ban, etc.»
- `cm1/siman8/seif-005/kessef-hakodashim` **score=3** seif_katan_mismatch, lemma_head_conflict (3996B / 2503B) EN«See Sema, seif katan 22.»
- `cm1/siman9/seif-002/turei-zahav` **score=3** seif_katan_mismatch, lemma_head_conflict (1916B / 1305B) EN«Seif 5, “and he said to the litigants: Pay”»
- `cm1/siman12/seif-002/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (512B / 565B) EN«Shach, seif katan 17»
- `cm1/siman12/seif-003/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (158B / 157B) EN«Sema, seif katan 21»
- `cm1/siman22/seif-001/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (233B / 272B) EN«Siman 22, Shach, seif katan 17»
- `cm1/siman28/seif-002/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (441B / 503B) EN«Sema, seif katan 9»
- `cm1/siman28/seif-006/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (249B / 281B) EN«Sema, seif katan 28»
- `cm1/siman28/seif-007/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (227B / 213B) EN«Sema, seif katan 33»
- `cm1/siman28/seif-010/turei-zahav` **score=3** seif_katan_mismatch, lemma_head_conflict (1148B / 734B) EN«Seif 16: “Lest the property fall before orphans”»
- `cm1/siman28/seif-018/rabbi-akiva-eiger` **score=3** en_wrong_siman (86B / 96B) EN«Siman 20, and so it is.»
- `cm1/siman28/seif-019/rabbi-akiva-eiger` **score=3** en_wrong_siman (183B / 195B) EN«Siman 29.»
- `cm1/siman30/seif-004/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (2490B / 2267B) EN«Netivot HaMishpat, seif katan 4»
- `cm1/siman33/seif-003/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (131B / 157B) EN«Sema, seif katan 23»
- `cm1/siman34/seif-006/rabbi-akiva-eiger` **score=3** en_wrong_siman (114B / 112B) EN«Siman 58.»
- `cm1/siman34/seif-021/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (1620B / 1709B) EN«Netivot HaMishpat, seif katan 17»
- `cm1/siman34/seif-025/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (122B / 122B) EN«Shach, seif katan 33»
- `cm1/siman35/seif-007/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (675B / 782B) EN«Sema, seif katan 11»
- `cm1/siman37/seif-001/turei-zahav` **score=3** seif_katan_mismatch, lemma_head_conflict (1614B / 1541B) EN«Seif 1: even concerning the partner’s share.»
- `cm1/siman37/seif-002/turei-zahav` **score=3** seif_katan_mismatch, lemma_head_conflict (420B / 510B) EN«Seif 3: before they testified.»
- `cm1/siman37/seif-006/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (671B / 691B) EN«Sema, seif katan 24»
- `cm1/siman39/seif-002/haggahot-imrei-barukh` **score=3** seif_katan_mismatch, lemma_head_conflict (329B / 385B) EN«Shach, seif katan 6»

