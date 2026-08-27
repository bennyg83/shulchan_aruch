# HE/EN segment mismatch scan

Scanned at: 2026-08-27T10:34:38.546Z

Flags when `<br>`-split HE and EN segment counts diverge (reader zip holes).

| Volume | Pairs | Issues | Top kinds |
|--------|------:|-------:|-----------|
| oc1 | 89911 | 433 | en_truncated_vs_multi_he(314), he_missing(60), he_truncated_vs_multi_en(25) |

## By slug (issues ≥ 1)

### oc1

| Slug | Issues | Kinds |
|------|-------:|-------|
| mechaber | 232 | en_truncated_vs_multi_he:231, he_truncated_vs_multi_en:1 |
| chok-yaakov | 31 | en_truncated_vs_multi_he:27, he_has_more_segments:4 |
| baer-heitev | 22 | en_truncated_vs_multi_he:20, he_missing:2 |
| yad-ephraim | 19 | en_truncated_vs_multi_he:2, he_truncated_vs_multi_en:5, en_has_more_segments:1, he_missing:11 |
| magen-avraham | 19 | en_truncated_vs_multi_he:17, he_missing:2 |
| shaarei-teshuvah | 18 | he_missing:13, en_truncated_vs_multi_he:5 |
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
| kol-yaakov | 1 | he_has_more_segments:1 |

## Samples

### oc1

- `oc1/siman1/seif-001/biur-halacha` — **en_has_more_segments** heSegs=5 enSegs=10 (5651B / 6382B)
- `oc1/siman1/seif-001/eshel-avraham` — **he_missing** heSegs=0 enSegs=1 (2B / 489B)
- `oc1/siman1/seif-001/machatzit-hashekel` — **he_missing** heSegs=0 enSegs=1 (2B / 93B)
- `oc1/siman1/seif-007/dagul-merevavah` — **he_missing** heSegs=0 enSegs=1 (2B / 564B)
- `oc1/siman1/seif-007/levushei-serad` — **he_missing** heSegs=0 enSegs=1 (2B / 163B)

