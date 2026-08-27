# HE/EN segment mismatch scan

Scanned at: 2026-08-27T13:36:46.797Z

Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 382 | en_truncated_vs_multi_he(289), he_missing(59), en_has_more_segments(22) |
| yd1 | 25946 | 408 | he_has_more_segments(229), en_truncated_vs_multi_he(144), en_missing(20) |
| eh1 | 11939 | 0 | — |
| cm1 | 70186 | 576 | en_truncated_vs_multi_he(400), he_has_more_segments(154), en_has_more_segments(22) |

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| mechaber | 206 | en_truncated_vs_multi_he:206 |
| chok-yaakov | 31 | en_truncated_vs_multi_he:27, he_has_more_segments:4 |
| baer-heitev | 22 | en_truncated_vs_multi_he:20, he_missing:2 |
| magen-avraham | 19 | en_truncated_vs_multi_he:17, he_missing:2 |
| shaarei-teshuvah | 17 | en_truncated_vs_multi_he:5, he_missing:12 |
| ateret-zekenim | 15 | he_has_more_segments:2, en_truncated_vs_multi_he:6, he_missing:7 |
| yad-ephraim | 14 | en_truncated_vs_multi_he:2, en_has_more_segments:1, he_missing:11 |
| beur-hagra | 12 | he_missing:4, en_has_more_segments:8 |
| machatzit-hashekel | 11 | he_missing:3, he_has_more_segments:4, en_has_more_segments:3, en_truncated_vs_multi_he:1 |
| biur-halacha | 5 | en_has_more_segments:4, he_has_more_segments:1 |
| eshel-avraham | 5 | he_missing:5 |
| chokhmat-shlomo | 5 | en_truncated_vs_multi_he:2, he_missing:3 |
| turei-zahav | 5 | en_has_more_segments:4, he_missing:1 |
| peri-megadim | 5 | en_has_more_segments:2, en_truncated_vs_multi_he:3 |
| netiv-chayim | 4 | he_missing:4 |
| dagul-merevavah | 2 | he_missing:2 |
| levushei-serad | 2 | he_missing:2 |
| kol-yaakov | 1 | he_has_more_segments:1 |
| chatam-sofer | 1 | he_missing:1 |

### yd1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beur-hagra | 167 | he_has_more_segments:119, en_truncated_vs_multi_he:41, en_has_more_segments:7 |
| siftei-kohen | 94 | he_has_more_segments:75, en_truncated_vs_multi_he:19 |
| beer-hagolah | 52 | en_truncated_vs_multi_he:46, he_has_more_segments:6 |
| turei-zahav | 45 | he_has_more_segments:25, en_truncated_vs_multi_he:19, en_has_more_segments:1 |
| yad-avraham | 13 | en_has_more_segments:4, he_has_more_segments:1, en_missing:8 |
| baer-heitev | 13 | en_has_more_segments:3, en_truncated_vs_multi_he:7, he_has_more_segments:3 |
| mateh-yehonatan | 8 | en_missing:8 |
| mechaber | 6 | en_truncated_vs_multi_he:6 |
| rabbi-akiva-eiger-yd | 4 | en_missing:4 |
| tiferet-yisrael | 3 | en_truncated_vs_multi_he:3 |
| nekudot-hakesef | 1 | en_truncated_vs_multi_he:1 |
| torat-hashlamim | 1 | en_truncated_vs_multi_he:1 |
| chiddushei-hilkhot-niddah | 1 | en_truncated_vs_multi_he:1 |

### cm1

| Slug | Issues | Kinds |
|------|-------:|-------|
| mechaber | 238 | en_truncated_vs_multi_he:238 |
| beur-hagra | 129 | en_truncated_vs_multi_he:69, he_has_more_segments:51, en_has_more_segments:9 |
| urim-vetumim-tumim | 94 | en_truncated_vs_multi_he:40, he_has_more_segments:53, en_has_more_segments:1 |
| beer-hagolah | 36 | he_has_more_segments:32, en_truncated_vs_multi_he:4 |
| chokhmat-shlomo | 24 | en_truncated_vs_multi_he:23, he_has_more_segments:1 |
| ketzot-hachoshen | 15 | he_has_more_segments:1, en_truncated_vs_multi_he:2, en_has_more_segments:12 |
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
- `oc1/siman1/seif-001/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 93B)
- `oc1/siman1/seif-007/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 564B)
- `oc1/siman1/seif-007/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)
- `oc1/siman1/seif-008/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3148B / 3605B)
- `oc1/siman1/seif-009/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 384B)
- `oc1/siman1/seif-009/yad-ephraim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (3422B / 3768B)
- `oc1/siman2/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (597B / 154B)
- `oc1/siman5/seif-001/ateret-zekenim` — **he_has_more_segments** heSegs=3 enSegs=2 (951B / 1140B)
- `oc1/siman8/seif-003/shaarei-teshuvah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2140B / 2263B)
- `oc1/siman12/seif-001/ateret-zekenim` — **he_has_more_segments** heSegs=3 enSegs=2 (1110B / 1208B)
- `oc1/siman13/seif-003/chokhmat-shlomo` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (10232B / 12055B)
- `oc1/siman14/seif-001/chokhmat-shlomo` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (12873B / 11113B)
- `oc1/siman26/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (814B / 397B)
- `oc1/siman27/seif-004/machatzit-hashekel` — **he_has_more_segments** heSegs=7 enSegs=6 (3021B / 3321B)
- `oc1/siman27/seif-006/machatzit-hashekel` — **en_has_more_segments** heSegs=3 enSegs=6 (4725B / 5571B)
- `oc1/siman32/seif-005/yad-ephraim` — **en_has_more_segments** heSegs=2 enSegs=4 (2149B / 2372B)
- `oc1/siman33/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2486B / 1033B)
- `oc1/siman35/seif-001/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (581B / 1152B)
- `oc1/siman35/seif-001/kol-yaakov` — **he_has_more_segments** heSegs=144 enSegs=94 (38320B / 46997B)
- `oc1/siman42/seif-003/biur-halacha` — **he_has_more_segments** heSegs=14 enSegs=13 (17696B / 14938B)
- `oc1/siman45/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (995B / 287B)
- `oc1/siman46/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2836B / 1305B)
- `oc1/siman51/seif-003/shaarei-teshuvah` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (1594B / 1704B)
- `oc1/siman51/seif-007/machatzit-hashekel` — **en_has_more_segments** heSegs=4 enSegs=5 (3383B / 3755B)
- `oc1/siman51/seif-009/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (566B / 666B)
- `oc1/siman53/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (561B / 176B)
- `oc1/siman55/seif-003/ateret-zekenim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1345B / 1637B)
- `oc1/siman56/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2949B / 1167B)
- `oc1/siman57/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1374B / 461B)
- `oc1/siman58/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2376B / 892B)
- `oc1/siman59/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (697B / 326B)
- `oc1/siman60/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (716B / 470B)
- `oc1/siman61/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (704B / 193B)
- `oc1/siman63/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1402B / 694B)
- `oc1/siman64/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (566B / 392B)
- `oc1/siman69/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5672B / 3645B)
- `oc1/siman72/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (870B / 590B)
- `oc1/siman77/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1022B / 535B)

### yd1

- `yd1/siman4/seif-004/yad-avraham` — **en_has_more_segments** heSegs=2 enSegs=3 (3301B / 6054B)
- `yd1/siman37/seif-002/yad-avraham` — **en_has_more_segments** heSegs=11 enSegs=12 (15780B / 15293B)
- `yd1/siman48/seif-004/yad-avraham` — **en_has_more_segments** heSegs=3 enSegs=4 (2055B / 3086B)
- `yd1/siman61/seif-006/yad-avraham` — **en_has_more_segments** heSegs=2 enSegs=3 (2040B / 3532B)
- `yd1/siman84/seif-006/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (1053B / 1049B)
- `yd1/siman84/seif-015/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (619B / 663B)
- `yd1/siman84/seif-017/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1740B / 1921B)
- `yd1/siman96/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=9 (2418B / 2391B)
- `yd1/siman98/seif-001/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=7 (9038B / 9950B)
- `yd1/siman105/seif-001/beur-hagra` — **he_has_more_segments** heSegs=14 enSegs=11 (3720B / 4069B)
- `yd1/siman106/seif-002/baer-heitev` — **en_has_more_segments** heSegs=3 enSegs=6 (1247B / 1325B)
- `yd1/siman107/seif-001/turei-zahav` — **he_has_more_segments** heSegs=6 enSegs=2 (18237B / 9071B)
- `yd1/siman108/seif-001/beur-hagra` — **he_has_more_segments** heSegs=25 enSegs=4 (22226B / 10908B)
- `yd1/siman109/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=4 (11530B / 5991B)
- `yd1/siman110/seif-008/yad-avraham` — **he_has_more_segments** heSegs=6 enSegs=3 (25362B / 29447B)
- `yd1/siman114/seif-001/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=8 (1881B / 2151B)
- `yd1/siman114/seif-010/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (274B / 365B)
- `yd1/siman115/seif-001/rabbi-akiva-eiger-yd` — **en_missing** heSegs=1 enSegs=0 (1730B / 0B)
- `yd1/siman115/seif-002/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (2756B / 2846B)
- `yd1/siman115/seif-003/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=8 (5994B / 6375B)
- `yd1/siman116/seif-001/yad-avraham` — **en_missing** heSegs=1 enSegs=0 (2941B / 0B)
- `yd1/siman116/seif-004/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (194B / 255B)
- `yd1/siman116/seif-005/beur-hagra` — **he_has_more_segments** heSegs=13 enSegs=12 (1640B / 1699B)
- `yd1/siman121/seif-001/mateh-yehonatan` — **en_missing** heSegs=1 enSegs=0 (6926B / 0B)
- `yd1/siman122/seif-001/mateh-yehonatan` — **en_missing** heSegs=1 enSegs=0 (3061B / 0B)
- `yd1/siman123/seif-001/mateh-yehonatan` — **en_missing** heSegs=1 enSegs=0 (2239B / 0B)
- `yd1/siman123/seif-008/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (1784B / 1935B)
- `yd1/siman123/seif-009/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (3343B / 3789B)
- `yd1/siman123/seif-014/beer-hagolah` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (264B / 301B)
- `yd1/siman123/seif-017/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (2900B / 3273B)
- `yd1/siman123/seif-026/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1580B / 1863B)
- `yd1/siman124/seif-001/mateh-yehonatan` — **en_missing** heSegs=1 enSegs=0 (2156B / 0B)
- `yd1/siman124/seif-006/nekudot-hakesef` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1192B / 1539B)
- `yd1/siman124/seif-011/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=5 (4876B / 4980B)
- `yd1/siman124/seif-012/turei-zahav` — **he_has_more_segments** heSegs=3 enSegs=2 (3720B / 3703B)
- `yd1/siman124/seif-014/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=5 (1713B / 1789B)
- `yd1/siman124/seif-018/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (926B / 1065B)
- `yd1/siman124/seif-019/beur-hagra` — **he_has_more_segments** heSegs=10 enSegs=8 (2155B / 2372B)
- `yd1/siman124/seif-024/turei-zahav` — **he_has_more_segments** heSegs=6 enSegs=5 (22234B / 20459B)
- `yd1/siman124/seif-027/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (1362B / 1354B)

### cm1

- `cm1/siman1/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4509B / 568B)
- `cm1/siman1/seif-002/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5183B / 5594B)
- `cm1/siman1/seif-003/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=3 enSegs=1 (18429B / 11283B)
- `cm1/siman3/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2972B / 1171B)
- `cm1/siman3/seif-003/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (614B / 235B)
- `cm1/siman5/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (775B / 140B)
- `cm1/siman5/seif-003/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=5 enSegs=1 (28914B / 20369B)
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
- `cm1/siman15/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2447B / 392B)
- `cm1/siman15/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (7069B / 7834B)
- `cm1/siman16/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1977B / 662B)
- `cm1/siman17/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (4126B / 789B)
- `cm1/siman17/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (17420B / 15931B)
- `cm1/siman17/seif-012/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (12356B / 12630B)
- `cm1/siman19/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (1259B / 459B)
- `cm1/siman20/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=8 (1314B / 1230B)
- `cm1/siman21/seif-001/urim-vetumim-tumim` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (13501B / 12001B)
- `cm1/siman22/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (8275B / 973B)
- `cm1/siman22/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=9 enSegs=5 (23937B / 23393B)
- `cm1/siman22/seif-003/urim-vetumim-tumim` — **he_has_more_segments** heSegs=3 enSegs=2 (11298B / 11061B)
- `cm1/siman24/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=5 enSegs=3 (17157B / 17391B)
- `cm1/siman25/seif-001/urim-vetumim-tumim` — **he_has_more_segments** heSegs=7 enSegs=4 (45401B / 28374B)
- `cm1/siman25/seif-003/urim-vetumim-tumim` — **he_has_more_segments** heSegs=22 enSegs=10 (134403B / 73593B)
- `cm1/siman28/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (5061B / 1067B)
- `cm1/siman28/seif-005/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (462B / 286B)
- `cm1/siman28/seif-006/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (670B / 727B)
- `cm1/siman28/seif-017/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=5 (469B / 381B)
- `cm1/siman29/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (6735B / 1892B)
- `cm1/siman30/seif-001/mechaber` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (2293B / 777B)
- `cm1/siman30/seif-002/urim-vetumim-tumim` — **he_has_more_segments** heSegs=7 enSegs=6 (36370B / 21023B)

