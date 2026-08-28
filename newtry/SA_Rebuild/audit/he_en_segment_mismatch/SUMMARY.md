# HE/EN segment mismatch scan

Scanned at: 2026-08-28T07:06:34.161Z

Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 84 | he_missing(59), en_truncated_vs_multi_he(14), he_has_more_segments(11) |
| yd1 | 25946 | 334 | he_has_more_segments(189), en_truncated_vs_multi_he(135), en_has_more_segments(8) |
| cm1 | 70186 | 162 | he_has_more_segments(95), en_truncated_vs_multi_he(66), en_has_more_segments(1) |

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| shaarei-teshuvah | 14 | en_truncated_vs_multi_he:2, he_missing:12 |
| yad-ephraim | 13 | en_truncated_vs_multi_he:2, he_missing:11 |
| ateret-zekenim | 13 | he_has_more_segments:1, en_truncated_vs_multi_he:5, he_missing:7 |
| machatzit-hashekel | 8 | he_missing:3, he_has_more_segments:4, en_truncated_vs_multi_he:1 |
| eshel-avraham | 5 | he_missing:5 |
| chok-yaakov | 5 | en_truncated_vs_multi_he:1, he_has_more_segments:4 |
| beur-hagra | 4 | he_missing:4 |
| netiv-chayim | 4 | he_missing:4 |
| chokhmat-shlomo | 3 | he_missing:3 |
| peri-megadim | 3 | en_truncated_vs_multi_he:3 |
| dagul-merevavah | 2 | he_missing:2 |
| levushei-serad | 2 | he_missing:2 |
| baer-heitev | 2 | he_missing:2 |
| magen-avraham | 2 | he_missing:2 |
| kol-yaakov | 1 | he_has_more_segments:1 |
| biur-halacha | 1 | he_has_more_segments:1 |
| turei-zahav | 1 | he_missing:1 |
| chatam-sofer | 1 | he_missing:1 |

### yd1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beur-hagra | 126 | he_has_more_segments:81, en_truncated_vs_multi_he:39, en_has_more_segments:6 |
| siftei-kohen | 93 | he_has_more_segments:74, en_truncated_vs_multi_he:19 |
| beer-hagolah | 52 | en_truncated_vs_multi_he:46, he_has_more_segments:6 |
| turei-zahav | 43 | he_has_more_segments:24, en_truncated_vs_multi_he:19 |
| baer-heitev | 12 | en_has_more_segments:2, en_truncated_vs_multi_he:7, he_has_more_segments:3 |
| yad-avraham | 3 | he_has_more_segments:1, en_missing:2 |
| tiferet-yisrael | 3 | en_truncated_vs_multi_he:3 |
| torat-hashlamim | 1 | en_truncated_vs_multi_he:1 |
| chiddushei-hilkhot-niddah | 1 | en_truncated_vs_multi_he:1 |

### cm1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beur-hagra | 82 | en_truncated_vs_multi_he:31, he_has_more_segments:51 |
| urim-vetumim-tumim | 29 | he_has_more_segments:27, en_truncated_vs_multi_he:2 |
| meirat-einayim | 9 | he_has_more_segments:9 |
| turei-zahav | 8 | en_truncated_vs_multi_he:8 |
| chokhmat-shlomo | 5 | en_truncated_vs_multi_he:4, he_has_more_segments:1 |
| chelkat-mechokek | 4 | en_truncated_vs_multi_he:4 |
| rabbi-akiva-eiger | 4 | en_truncated_vs_multi_he:4 |
| netivot-hamishpat-beurim | 4 | he_has_more_segments:2, en_truncated_vs_multi_he:2 |
| siftei-kohen | 4 | he_has_more_segments:3, en_truncated_vs_multi_he:1 |
| ketzot-hachoshen | 4 | he_has_more_segments:1, en_truncated_vs_multi_he:2, en_has_more_segments:1 |
| beer-hagolah | 4 | en_truncated_vs_multi_he:4 |
| urim-vetumim-urim | 3 | en_truncated_vs_multi_he:2, he_has_more_segments:1 |
| netivot-hamishpat-hidushim | 1 | en_truncated_vs_multi_he:1 |
| haggahot-imrei-barukh | 1 | en_truncated_vs_multi_he:1 |

## Samples

### oc1

- `oc1/siman1/seif-001/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 489B)
- `oc1/siman1/seif-001/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 93B)
- `oc1/siman1/seif-007/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 564B)
- `oc1/siman1/seif-007/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)
- `oc1/siman1/seif-008/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3148B / 3605B)
- `oc1/siman1/seif-009/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 384B)
- `oc1/siman1/seif-009/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3422B / 3768B)
- `oc1/siman5/seif-001/ateret-zekenim` — **he_has_more_segments** heSegs=3 enSegs=2 (951B / 1140B)
- `oc1/siman27/seif-004/machatzit-hashekel` — **he_has_more_segments** heSegs=7 enSegs=6 (3021B / 3321B)
- `oc1/siman35/seif-001/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (581B / 1152B)
- `oc1/siman35/seif-001/kol-yaakov` — **he_has_more_segments** heSegs=144 enSegs=94 (38320B / 46997B)
- `oc1/siman42/seif-003/biur-halacha` — **he_has_more_segments** heSegs=14 enSegs=13 (17696B / 14938B)
- `oc1/siman51/seif-003/shaarei-teshuvah` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (1594B / 1704B)
- `oc1/siman51/seif-009/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (566B / 666B)
- `oc1/siman55/seif-003/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1345B / 1637B)
- `oc1/siman128/seif-043/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2089B / 2411B)
- `oc1/siman135/seif-002/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 360B)
- `oc1/siman135/seif-002/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 494B)
- `oc1/siman135/seif-003/ateret-zekenim` — **he_missing** heSegs=0 enSegs=1 (2B / 1200B)
- `oc1/siman135/seif-003/baer-heitev` — **he_missing** heSegs=0 enSegs=1 (2B / 58B)
- `oc1/siman135/seif-003/beur-hagra` — **he_missing** heSegs=0 enSegs=1 (2B / 113B)
- `oc1/siman135/seif-003/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 141B)
- `oc1/siman135/seif-003/magen-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 132B)
- `oc1/siman135/seif-003/netiv-chayim` — **he_missing** heSegs=0 enSegs=1 (2B / 1114B)
- `oc1/siman135/seif-003/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 797B)
- `oc1/siman135/seif-003/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 368B)
- `oc1/siman135/seif-004/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 117B)
- `oc1/siman135/seif-004/turei-zahav` — **he_missing** heSegs=0 enSegs=1 (2B / 1179B)
- `oc1/siman135/seif-004/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 1029B)
- `oc1/siman135/seif-005/ateret-zekenim` — **he_missing** heSegs=0 enSegs=1 (2B / 554B)
- `oc1/siman135/seif-005/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 165B)
- `oc1/siman135/seif-005/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 106B)
- `oc1/siman135/seif-005/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)
- `oc1/siman135/seif-006/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 1704B)
- `oc1/siman135/seif-006/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 401B)
- `oc1/siman135/seif-007/ateret-zekenim` — **he_missing** heSegs=0 enSegs=1 (2B / 2917B)
- `oc1/siman135/seif-007/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 721B)
- `oc1/siman135/seif-007/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 82B)
- `oc1/siman135/seif-008/beur-hagra` — **he_missing** heSegs=0 enSegs=1 (2B / 203B)
- `oc1/siman135/seif-008/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 185B)

### yd1

- `yd1/siman84/seif-006/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (1053B / 1049B)
- `yd1/siman84/seif-015/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (619B / 663B)
- `yd1/siman84/seif-017/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1740B / 1921B)
- `yd1/siman96/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=9 (2418B / 2391B)
- `yd1/siman98/seif-001/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=7 (9038B / 9950B)
- `yd1/siman106/seif-002/baer-heitev` — **en_has_more_segments** heSegs=3 enSegs=6 (1247B / 1325B)
- `yd1/siman107/seif-001/turei-zahav` — **he_has_more_segments** heSegs=6 enSegs=2 (9097B / 9071B)
- `yd1/siman108/seif-001/beur-hagra` — **he_has_more_segments** heSegs=25 enSegs=4 (11040B / 10908B)
- `yd1/siman109/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=4 (5445B / 5991B)
- `yd1/siman110/seif-008/yad-avraham` — **he_has_more_segments** heSegs=6 enSegs=3 (25362B / 29447B)
- `yd1/siman114/seif-010/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (274B / 365B)
- `yd1/siman115/seif-002/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (2756B / 2846B)
- `yd1/siman115/seif-003/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=8 (5994B / 6375B)
- `yd1/siman116/seif-004/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (194B / 255B)
- `yd1/siman123/seif-014/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (264B / 301B)
- `yd1/siman123/seif-026/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1580B / 1863B)
- `yd1/siman124/seif-012/turei-zahav` — **he_has_more_segments** heSegs=3 enSegs=2 (3720B / 3703B)
- `yd1/siman124/seif-014/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=5 (1713B / 1789B)
- `yd1/siman124/seif-024/turei-zahav` — **he_has_more_segments** heSegs=6 enSegs=5 (22234B / 20459B)
- `yd1/siman125/seif-010/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=3 (530B / 539B)
- `yd1/siman125/seif-011/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (339B / 339B)
- `yd1/siman127/seif-001/beur-hagra` — **he_has_more_segments** heSegs=19 enSegs=17 (7354B / 7773B)
- `yd1/siman127/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=20 enSegs=9 (41635B / 3566B)
- `yd1/siman127/seif-003/beur-hagra` — **he_has_more_segments** heSegs=20 enSegs=13 (6137B / 6221B)
- `yd1/siman127/seif-003/siftei-kohen` — **he_has_more_segments** heSegs=10 enSegs=7 (4507B / 2307B)
- `yd1/siman127/seif-004/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (371B / 341B)
- `yd1/siman128/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=4 enSegs=2 (3962B / 661B)
- `yd1/siman128/seif-002/siftei-kohen` — **he_has_more_segments** heSegs=4 enSegs=3 (2162B / 1083B)
- `yd1/siman128/seif-003/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (1816B / 1860B)
- `yd1/siman128/seif-004/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=2 (494B / 489B)
- `yd1/siman129/seif-009/siftei-kohen` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3004B / 163B)
- `yd1/siman129/seif-011/siftei-kohen` — **he_has_more_segments** heSegs=5 enSegs=4 (3753B / 1327B)
- `yd1/siman129/seif-020/siftei-kohen` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (3186B / 915B)
- `yd1/siman130/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=3 enSegs=2 (2025B / 1174B)
- `yd1/siman131/seif-001/beer-hagolah` — **he_has_more_segments** heSegs=15 enSegs=13 (1125B / 1016B)
- `yd1/siman131/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=15 enSegs=9 (9151B / 2455B)
- `yd1/siman131/seif-002/siftei-kohen` — **he_has_more_segments** heSegs=3 enSegs=2 (3443B / 966B)
- `yd1/siman133/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=4 enSegs=3 (888B / 886B)
- `yd1/siman134/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=6 enSegs=5 (3935B / 2079B)
- `yd1/siman134/seif-003/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (345B / 398B)

### cm1

- `cm1/siman3/seif-003/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (614B / 235B)
- `cm1/siman7/seif-008/chelkat-mechokek` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1421B / 1514B)
- `cm1/siman11/seif-002/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (132B / 81B)
- `cm1/siman12/seif-002/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (6338B / 7109B)
- `cm1/siman12/seif-012/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (561B / 546B)
- `cm1/siman20/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=8 (1314B / 1230B)
- `cm1/siman24/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=5 enSegs=3 (17157B / 17391B)
- `cm1/siman25/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=7 enSegs=4 (45401B / 28374B)
- `cm1/siman25/seif-003/urim-vetumim-tumim` — **he_has_more_segments** heSegs=22 enSegs=10 (134403B / 73593B)
- `cm1/siman28/seif-005/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (462B / 286B)
- `cm1/siman28/seif-006/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (670B / 727B)
- `cm1/siman28/seif-017/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=5 (469B / 381B)
- `cm1/siman30/seif-006/beur-hagra` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (554B / 414B)
- `cm1/siman33/seif-006/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (236B / 119B)
- `cm1/siman33/seif-009/rabbi-akiva-eiger` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (553B / 446B)
- `cm1/siman34/seif-005/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (664B / 471B)
- `cm1/siman34/seif-018/beur-hagra` — **he_has_more_segments** heSegs=8 enSegs=7 (1146B / 1106B)
- `cm1/siman34/seif-023/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (233B / 170B)
- `cm1/siman39/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=4 enSegs=3 (50096B / 42073B)
- `cm1/siman43/seif-007/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (811B / 1019B)
- `cm1/siman43/seif-011/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (191B / 148B)
- `cm1/siman43/seif-018/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (371B / 322B)
- `cm1/siman46/seif-004/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (259B / 199B)
- `cm1/siman46/seif-006/beur-hagra` — **he_has_more_segments** heSegs=3 enSegs=2 (448B / 611B)
- `cm1/siman46/seif-009/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (167B / 125B)
- `cm1/siman46/seif-017/chelkat-mechokek` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (6266B / 3249B)
- `cm1/siman46/seif-020/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (157B / 105B)
- `cm1/siman48/seif-001/turei-zahav` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (4111B / 2104B)
- `cm1/siman49/seif-003/turei-zahav` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4483B / 1840B)
- `cm1/siman49/seif-008/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (459B / 338B)
- `cm1/siman51/seif-007/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (467B / 292B)
- `cm1/siman56/seif-001/netivot-hamishpat-beurim` — **he_has_more_segments** heSegs=11 enSegs=10 (44694B / 13880B)
- `cm1/siman60/seif-003/turei-zahav` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (10948B / 2041B)
- `cm1/siman65/seif-010/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (2062B / 1826B)
- `cm1/siman65/seif-010/turei-zahav` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (14883B / 1671B)
- `cm1/siman65/seif-023/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (1277B / 1448B)
- `cm1/siman66/seif-007/chokhmat-shlomo` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (7879B / 5414B)
- `cm1/siman66/seif-015/beur-hagra` — **he_has_more_segments** heSegs=16 enSegs=15 (2751B / 2838B)
- `cm1/siman66/seif-033/netivot-hamishpat-hidushim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (518B / 639B)
- `cm1/siman66/seif-036/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (427B / 274B)

2 enSegs=1 (427B / 274B)

