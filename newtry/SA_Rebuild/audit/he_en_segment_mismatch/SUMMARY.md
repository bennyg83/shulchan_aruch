# HE/EN segment mismatch scan

Scanned at: 2026-08-30T05:55:32.017Z

Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 59 | he_missing(59) |
| yd1 | 25946 | 27 | he_has_more_segments(26), en_truncated_vs_multi_he(1) |
| eh1 | 11939 | 0 | — |
| cm1 | 70186 | 0 | — |

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| shaarei-teshuvah | 12 | he_missing:12 |
| yad-ephraim | 11 | he_missing:11 |
| ateret-zekenim | 7 | he_missing:7 |
| eshel-avraham | 5 | he_missing:5 |
| beur-hagra | 4 | he_missing:4 |
| netiv-chayim | 4 | he_missing:4 |
| machatzit-hashekel | 3 | he_missing:3 |
| chokhmat-shlomo | 3 | he_missing:3 |
| dagul-merevavah | 2 | he_missing:2 |
| levushei-serad | 2 | he_missing:2 |
| baer-heitev | 2 | he_missing:2 |
| magen-avraham | 2 | he_missing:2 |
| turei-zahav | 1 | he_missing:1 |
| chatam-sofer | 1 | he_missing:1 |

### yd1

| Slug | Issues | Kinds |
|------|-------:|-------|
| beur-hagra | 20 | he_has_more_segments:19, en_truncated_vs_multi_he:1 |
| siftei-kohen | 5 | he_has_more_segments:5 |
| beer-hagolah | 1 | he_has_more_segments:1 |
| turei-zahav | 1 | he_has_more_segments:1 |

## Samples

### oc1

- `oc1/siman1/seif-001/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 489B)
- `oc1/siman1/seif-001/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 93B)
- `oc1/siman1/seif-007/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 564B)
- `oc1/siman1/seif-007/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)
- `oc1/siman1/seif-009/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 384B)
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
- `oc1/siman135/seif-008/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 758B)
- `oc1/siman135/seif-009/beur-hagra` — **he_missing** heSegs=0 enSegs=1 (2B / 308B)
- `oc1/siman135/seif-009/yad-ephraim` — **he_missing** heSegs=0 enSegs=1 (2B / 915B)
- `oc1/siman137/seif-001/ateret-zekenim` — **he_missing** heSegs=0 enSegs=1 (2B / 202B)
- `oc1/siman137/seif-001/baer-heitev` — **he_missing** heSegs=0 enSegs=5 (2B / 1478B)
- `oc1/siman137/seif-001/chokhmat-shlomo` — **he_missing** heSegs=0 enSegs=1 (2B / 459B)
- `oc1/siman137/seif-001/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 603B)
- `oc1/siman137/seif-001/magen-avraham` — **he_missing** heSegs=0 enSegs=3 (2B / 268B)
- `oc1/siman137/seif-001/netiv-chayim` — **he_missing** heSegs=0 enSegs=1 (2B / 66B)
- `oc1/siman137/seif-001/shaarei-teshuvah` — **he_missing** heSegs=0 enSegs=1 (2B / 230B)
- `oc1/siman137/seif-002/ateret-zekenim` — **he_missing** heSegs=0 enSegs=1 (2B / 840B)

### yd1

- `yd1/siman84/seif-006/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (1053B / 1049B)
- `yd1/siman109/seif-001/beur-hagra` — **he_has_more_segments** heSegs=11 enSegs=4 (5445B / 5991B)
- `yd1/siman115/seif-002/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (2756B / 2846B)
- `yd1/siman115/seif-003/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=8 (5994B / 6375B)
- `yd1/siman127/seif-001/beur-hagra` — **he_has_more_segments** heSegs=19 enSegs=17 (7354B / 7773B)
- `yd1/siman127/seif-003/beur-hagra` — **he_has_more_segments** heSegs=20 enSegs=13 (6137B / 6221B)
- `yd1/siman128/seif-003/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=6 (1816B / 1860B)
- `yd1/siman128/seif-004/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=2 (494B / 489B)
- `yd1/siman157/seif-001/beur-hagra` — **he_has_more_segments** heSegs=21 enSegs=18 (8335B / 7871B)
- `yd1/siman160/seif-005/beur-hagra` — **he_has_more_segments** heSegs=7 enSegs=4 (1423B / 1266B)
- `yd1/siman160/seif-012/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (791B / 752B)
- `yd1/siman160/seif-016/beur-hagra` — **he_has_more_segments** heSegs=8 enSegs=6 (1693B / 1626B)
- `yd1/siman160/seif-017/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (1315B / 1369B)
- `yd1/siman160/seif-020/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (881B / 820B)
- `yd1/siman160/seif-023/beur-hagra` — **he_has_more_segments** heSegs=4 enSegs=3 (1145B / 1129B)
- `yd1/siman161/seif-002/beur-hagra` — **he_has_more_segments** heSegs=6 enSegs=2 (2823B / 2347B)
- `yd1/siman165/seif-001/beer-hagolah` — **he_has_more_segments** heSegs=4 enSegs=2 (678B / 218B)
- `yd1/siman165/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=8 enSegs=6 (7375B / 1379B)
- `yd1/siman166/seif-001/siftei-kohen` — **he_has_more_segments** heSegs=5 enSegs=4 (5543B / 1994B)
- `yd1/siman168/seif-018/siftei-kohen` — **he_has_more_segments** heSegs=9 enSegs=4 (10053B / 1707B)
- `yd1/siman170/seif-001/turei-zahav` — **he_has_more_segments** heSegs=5 enSegs=3 (19083B / 8804B)
- `yd1/siman197/seif-002/siftei-kohen` — **he_has_more_segments** heSegs=5 enSegs=2 (7424B / 737B)
- `yd1/siman199/seif-003/siftei-kohen` — **he_has_more_segments** heSegs=3 enSegs=2 (6601B / 742B)
- `yd1/siman242/seif-004/beur-hagra` — **he_has_more_segments** heSegs=8 enSegs=4 (5616B / 1193B)
- `yd1/siman246/seif-004/beur-hagra` — **he_has_more_segments** heSegs=9 enSegs=8 (2353B / 2767B)
- `yd1/siman246/seif-026/beur-hagra` — **he_has_more_segments** heSegs=5 enSegs=4 (557B / 491B)
- `yd1/siman286/seif-022/beur-hagra` — **en_truncated_vs_multi_he** heSegs=2 enSegs=1 (936B / 906B)

