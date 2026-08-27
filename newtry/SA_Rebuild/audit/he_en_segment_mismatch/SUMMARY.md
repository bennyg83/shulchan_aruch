# HE/EN segment mismatch scan

Scanned at: 2026-08-27T10:07:23.580Z

Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 1219 | he_truncated_vs_multi_en(792), en_truncated_vs_multi_he(315), he_missing(61) |
| yd1 | 25946 | 1510 | he_truncated_vs_multi_en(796), en_truncated_vs_multi_he(336), he_has_more_segments(315) |
| eh1 | 11939 | 0 | — |
| cm1 | 70186 | 618 | en_truncated_vs_multi_he(433), he_has_more_segments(154), en_has_more_segments(22) |

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| kaf-hachayyim | 766 | he_truncated_vs_multi_en:751, en_has_more_segments:15 |
| mechaber | 232 | en_truncated_vs_multi_he:231, he_truncated_vs_multi_en:1 |
| chok-yaakov | 31 | en_truncated_vs_multi_he:27, he_has_more_segments:4 |
| baer-heitev | 22 | en_truncated_vs_multi_he:20, he_missing:2 |
| kol-yaakov | 20 | en_has_more_segments:2, he_truncated_vs_multi_en:15, en_truncated_vs_multi_he:1, he_has_more_segments:1, he_missing:1 |
| shaarei-teshuvah | 19 | he_truncated_vs_multi_en:1, he_missing:13, en_truncated_vs_multi_he:5 |
| yad-ephraim | 19 | en_truncated_vs_multi_he:2, he_truncated_vs_multi_en:5, en_has_more_segments:1, he_missing:11 |
| magen-avraham | 19 | en_truncated_vs_multi_he:17, he_missing:2 |
| ateret-zekenim | 15 | he_has_more_segments:2, en_truncated_vs_multi_he:6, he_missing:7 |
| beur-hagra | 14 | he_missing:4, en_has_more_segments:8, he_truncated_vs_multi_en:2 |
| machatzit-hashekel | 12 | he_missing:3, he_has_more_segments:4, en_has_more_segments:3, he_truncated_vs_multi_en:1, en_truncated_vs_multi_he:1 |
| biur-halacha | 9 | en_has_more_segments:4, he_has_more_segments:1, he_truncated_vs_multi_en:4 |
| chokhmat-shlomo | 9 | en_truncated_vs_multi_he:2, he_missing:3, he_truncated_vs_multi_en:4 |
| peri-megadim | 9 | en_has_more_segments:2, en_truncated_vs_multi_he:3, he_truncated_vs_multi_en:4 |
| turei-zahav | 6 | en_has_more_segments:4, he_missing:1, he_truncated_vs_multi_en:1 |
| eshel-avraham | 5 | he_missing:5 |
| netiv-chayim | 5 | he_missing:4, he_truncated_vs_multi_en:1 |
| chatam-sofer | 3 | he_truncated_vs_multi_en:2, he_missing:1 |
| dagul-merevavah | 2 | he_missing:2 |
| levushei-serad | 2 | he_missing:2 |

### yd1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beur-hagra | 281 | he_truncated_vs_multi_en:21, en_truncated_vs_multi_he:79, he_has_more_segments:166, en_has_more_segments:15 |
| kaf-hachayim | 185 | he_truncated_vs_multi_en:182, en_truncated_vs_multi_he:1, en_has_more_segments:2 |
| siftei-kohen | 185 | en_has_more_segments:1, he_truncated_vs_multi_en:14, he_has_more_segments:94, en_truncated_vs_multi_he:76 |
| pitchei-teshuva | 160 | he_truncated_vs_multi_en:160 |
| rabbi-akiva-eiger-yd | 149 | he_truncated_vs_multi_en:145, en_missing:4 |
| beer-hagolah | 110 | he_truncated_vs_multi_en:12, en_truncated_vs_multi_he:82, he_has_more_segments:13, en_has_more_segments:3 |
| yad-avraham | 90 | en_truncated_vs_multi_he:22, en_has_more_segments:6, he_truncated_vs_multi_en:47, he_has_more_segments:7, en_missing:8 |
| turei-zahav | 79 | he_truncated_vs_multi_en:19, he_has_more_segments:27, en_truncated_vs_multi_he:31, en_has_more_segments:2 |
| yad-ephraim | 60 | he_truncated_vs_multi_en:47, he_has_more_segments:4, en_truncated_vs_multi_he:6, en_has_more_segments:3 |
| nekudot-hakesef | 59 | he_truncated_vs_multi_en:56, en_has_more_segments:1, en_truncated_vs_multi_he:2 |
| mateh-yehonatan | 54 | he_truncated_vs_multi_en:41, en_truncated_vs_multi_he:2, en_has_more_segments:3, en_missing:8 |
| baer-heitev | 53 | he_truncated_vs_multi_en:30, en_has_more_segments:7, en_truncated_vs_multi_he:13, he_has_more_segments:3 |
| peleti | 19 | he_truncated_vs_multi_en:19 |
| mechaber | 14 | en_truncated_vs_multi_he:14 |
| chiddushei-hilkhot-niddah | 5 | en_truncated_vs_multi_he:4, he_truncated_vs_multi_en:1 |
| tiferet-yisrael | 5 | he_has_more_segments:1, en_truncated_vs_multi_he:3, he_truncated_vs_multi_en:1 |
| kereti | 1 | he_truncated_vs_multi_en:1 |
| torat-hashlamim | 1 | en_truncated_vs_multi_he:1 |

### cm1

| Slug | Issues | Kinds |
|------|-------:|-------|
| mechaber | 270 | en_truncated_vs_multi_he:270 |
| beur-hagra | 132 | en_truncated_vs_multi_he:70, he_has_more_segments:51, en_has_more_segments:9, he_truncated_vs_multi_en:2 |
| urim-vetumim-tumim | 94 | en_truncated_vs_multi_he:40, he_has_more_segments:53, en_has_more_segments:1 |
| beer-hagolah | 36 | he_has_more_segments:32, en_truncated_vs_multi_he:4 |
| chokhmat-shlomo | 25 | he_truncated_vs_multi_en:1, en_truncated_vs_multi_he:23, he_has_more_segments:1 |
| ketzot-hachoshen | 21 | he_has_more_segments:1, en_truncated_vs_multi_he:2, en_has_more_segments:12, he_truncated_vs_multi_en:6 |
| meirat-einayim | 9 | he_has_more_segments:9 |
| turei-zahav | 8 | en_truncated_vs_multi_he:8 |
| netivot-hamishpat-beurim | 5 | he_has_more_segments:3, en_truncated_vs_multi_he:2 |
| chelkat-mechokek | 4 | en_truncated_vs_multi_he:4 |
| rabbi-akiva-eiger | 4 | en_truncated_vs_multi_he:4 |
| urim-vetumim-urim | 4 | en_truncated_vs_multi_he:3, he_has_more_segments:1 |
| siftei-kohen | 4 | he_has_more_segments:3, en_truncated_vs_multi_he:1 |
| netivot-hamishpat-hidushim | 1 | en_truncated_vs_multi_he:1 |
| haggahot-imrei-barukh | 1 | en_truncated_vs_multi_he:1 |

## Samples

### oc1

- `oc1/siman1/seif-001/biur-halacha` — **en_has_more_segments** heSegs=5 enSegs=10 (5651B / 6382B)
- `oc1/siman1/seif-001/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 489B)
- `oc1/siman1/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (271B / 2239B)
- `oc1/siman1/seif-001/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 93B)
- `oc1/siman1/seif-001/shaarei-teshuvah` — **he_truncated_vs_multi_en** heSegs=1 enSegs=5 (311B / 3399B)
- `oc1/siman1/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (227B / 6438B)
- `oc1/siman1/seif-007/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 564B)
- `oc1/siman1/seif-007/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)
- `oc1/siman1/seif-007/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 913B)
- `oc1/siman1/seif-008/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3148B / 3605B)
- `oc1/siman1/seif-009/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 384B)
- `oc1/siman1/seif-009/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3422B / 3768B)
- `oc1/siman2/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (326B / 1332B)
- `oc1/siman2/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (597B / 154B)
- `oc1/siman2/seif-003/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (999B / 1742B)
- `oc1/siman3/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=7 (313B / 2761B)
- `oc1/siman3/seif-004/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=4 (546B / 982B)
- `oc1/siman3/seif-005/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (383B / 1816B)
- `oc1/siman4/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=15 (1162B / 14654B)
- `oc1/siman4/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=7 (1130B / 5574B)
- `oc1/siman4/seif-003/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=7 (1149B / 4972B)
- `oc1/siman5/seif-001/ateret-zekenim` — **he_has_more_segments** heSegs=3 enSegs=2 (951B / 1140B)
- `oc1/siman6/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (844B / 2716B)
- `oc1/siman7/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (1162B / 4129B)
- `oc1/siman7/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (2238B / 1899B)
- `oc1/siman8/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (1531B / 7371B)
- `oc1/siman8/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=10 (1020B / 11557B)
- `oc1/siman8/seif-003/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=5 (2892B / 3019B)
- `oc1/siman8/seif-003/shaarei-teshuvah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2140B / 2263B)
- `oc1/siman9/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (402B / 2929B)
- `oc1/siman10/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=5 (874B / 3921B)
- `oc1/siman10/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (422B / 1946B)
- `oc1/siman10/seif-004/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (256B / 2184B)
- `oc1/siman11/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=4 (305B / 1919B)
- `oc1/siman11/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=7 (453B / 6696B)
- `oc1/siman11/seif-003/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (565B / 1978B)
- `oc1/siman11/seif-004/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (323B / 922B)
- `oc1/siman12/seif-001/ateret-zekenim` — **he_has_more_segments** heSegs=3 enSegs=2 (1110B / 1208B)
- `oc1/siman12/seif-001/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (3129B / 4987B)
- `oc1/siman13/seif-002/kaf-hachayyim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (1652B / 2389B)

### yd1

- `yd1/siman1/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=13 (1933B / 8046B)
- `yd1/siman1/seif-001/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=8 (210B / 8312B)
- `yd1/siman1/seif-001/yad-ephraim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (354B / 8005B)
- `yd1/siman1/seif-003/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=5 (177B / 7284B)
- `yd1/siman1/seif-003/yad-avraham` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1797B / 658B)
- `yd1/siman1/seif-004/yad-avraham` — **en_has_more_segments** heSegs=2 enSegs=3 (1215B / 2506B)
- `yd1/siman1/seif-007/yad-ephraim` — **he_has_more_segments** heSegs=4 enSegs=3 (10655B / 7630B)
- `yd1/siman1/seif-009/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1501B / 884B)
- `yd1/siman2/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (558B / 635B)
- `yd1/siman2/seif-001/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (1428B / 1710B)
- `yd1/siman2/seif-002/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (413B / 855B)
- `yd1/siman2/seif-002/nekudot-hakesef` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (224B / 3216B)
- `yd1/siman2/seif-002/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (7620B / 9010B)
- `yd1/siman2/seif-002/yad-avraham` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2875B / 1279B)
- `yd1/siman2/seif-003/yad-avraham` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1042B / 486B)
- `yd1/siman2/seif-005/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (957B / 13570B)
- `yd1/siman2/seif-006/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (23124B / 1430B)
- `yd1/siman2/seif-009/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=6 (1121B / 3221B)
- `yd1/siman4/seif-003/pitchei-teshuva` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (100B / 597B)
- `yd1/siman4/seif-003/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (3668B / 2908B)
- `yd1/siman4/seif-004/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=4 (521B / 3553B)
- `yd1/siman4/seif-004/yad-avraham` — **en_has_more_segments** heSegs=2 enSegs=3 (3301B / 6054B)
- `yd1/siman5/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (178B / 386B)
- `yd1/siman5/seif-001/pitchei-teshuva` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (591B / 1248B)
- `yd1/siman5/seif-001/yad-avraham` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3962B / 1617B)
- `yd1/siman6/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=4 (291B / 2170B)
- `yd1/siman6/seif-001/yad-ephraim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (311B / 987B)
- `yd1/siman10/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (898B / 1952B)
- `yd1/siman10/seif-001/nekudot-hakesef` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (211B / 797B)
- `yd1/siman10/seif-001/pitchei-teshuva` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (531B / 1259B)
- `yd1/siman10/seif-001/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (2597B / 10061B)
- `yd1/siman10/seif-001/yad-avraham` — **he_truncated_vs_multi_en** heSegs=1 enSegs=3 (881B / 1916B)
- `yd1/siman10/seif-003/yad-avraham` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (649B / 287B)
- `yd1/siman11/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (700B / 1296B)
- `yd1/siman11/seif-001/rabbi-akiva-eiger-yd` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (231B / 516B)
- `yd1/siman11/seif-002/pitchei-teshuva` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (179B / 253B)
- `yd1/siman11/seif-004/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (374B / 830B)
- `yd1/siman12/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (226B / 1009B)
- `yd1/siman12/seif-002/peleti` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (1969B / 4408B)
- `yd1/siman13/seif-001/kaf-hachayim` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (695B / 1276B)

### cm1

- `cm1/siman1/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4509B / 568B)
- `cm1/siman1/seif-002/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5183B / 5594B)
- `cm1/siman1/seif-003/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (18429B / 11283B)
- `cm1/siman2/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (6379B / 2102B)
- `cm1/siman3/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2972B / 1171B)
- `cm1/siman3/seif-003/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (614B / 235B)
- `cm1/siman4/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (8443B / 3141B)
- `cm1/siman5/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (775B / 140B)
- `cm1/siman5/seif-003/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=5 enSegs=1 (28914B / 20369B)
- `cm1/siman6/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1624B / 169B)
- `cm1/siman7/seif-005/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (15556B / 14546B)
- `cm1/siman7/seif-008/chelkat-mechokek` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1421B / 1514B)
- `cm1/siman9/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3120B / 422B)
- `cm1/siman10/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1076B / 330B)
- `cm1/siman11/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5014B / 1886B)
- `cm1/siman11/seif-002/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (132B / 81B)
- `cm1/siman12/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2505B / 979B)
- `cm1/siman12/seif-002/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (6338B / 7109B)
- `cm1/siman12/seif-012/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (561B / 546B)
- `cm1/siman13/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4721B / 1613B)
- `cm1/siman14/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (10566B / 3728B)
- `cm1/siman15/seif-001/chokhmat-shlomo` — **he_truncated_vs_multi_en** heSegs=1 enSegs=2 (3966B / 6645B)
- `cm1/siman15/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2447B / 392B)
- `cm1/siman15/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (7069B / 7834B)
- `cm1/siman16/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1977B / 662B)
- `cm1/siman17/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4126B / 789B)
- `cm1/siman17/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (17420B / 15931B)
- `cm1/siman17/seif-012/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (12356B / 12630B)
- `cm1/siman19/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1259B / 459B)
- `cm1/siman20/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=8 (1314B / 1230B)
- `cm1/siman20/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (7733B / 2977B)
- `cm1/siman21/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2910B / 557B)
- `cm1/siman21/seif-001/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (13501B / 12001B)
- `cm1/siman22/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (8275B / 973B)
- `cm1/siman22/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=9 enSegs=5 (23937B / 23393B)
- `cm1/siman22/seif-003/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (11298B / 11061B)
- `cm1/siman23/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5052B / 1016B)
- `cm1/siman24/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5877B / 1128B)
- `cm1/siman24/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=5 enSegs=3 (17157B / 17391B)
- `cm1/siman25/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=7 enSegs=4 (45401B / 28374B)

