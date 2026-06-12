# YD001 commentaries — framework

**Purpose:** One canonical slug list for agents, checklist, publish manifests, and folder order under `output/siman_NNN/`.

**Sefaria layer keys → slugs:** `newtry/lib/yoreh_deah_layer_slug.mjs` (used by extract + `export-seif-hebrew.mjs`).

---

## Canonical order (process in this sequence)

| Order | Slug | Display name | Notes |
|------:|------|--------------|-------|
| 1 | `mechaber` | Mechaber + Rema | Primary text; English woven via `wire-mechaber-en-hooks-yd001.mjs` |
| 2 | `siftei-kohen` | Siftei Kohen (Shach) | Major YD commentary |
| 3 | `turei-zahav` | Turei Zahav (Taz) | Major YD commentary |
| 4 | `baer-heitev` | Ba'er Hetev | |
| 5 | `beer-hagolah` | Be'er HaGolah | |
| 6 | `beur-hagra` | Biur HaGRA | Often long blocks |
| 7 | `pitchei-teshuva` | Pitchei Teshuva | |
| 8 | `peleti` | Peleti | |
| 9 | `yad-avraham` | Yad Avraham | |
| 10 | `yad-ephraim` | Yad Ephraim | |
| 11 | `rabbi-akiva-eiger-yd` | Rabbi Akiva Eiger (YD) | |
| 12 | `nekudot-hakesef` | Nekudot HaKesef | |
| 13 | `peri-megadim-yd` | Peri Megadim (YD) | |
| 14 | `kaf-hachayim` | Kaf HaChayim (YD) | |
| 15 | `kereti` | Kereti | |
| 16 | `mateh-yehonatan` | Mateh Yehonatan | Often empty per siman |
| 17 | `kol-yaakov` | Kol Yaakov | Often empty |
| 18 | `tiferet-yisrael` | Tiferet Yisrael | Often empty |
| 19 | `torat-hashlamim` | Torat HaShlamim | Often empty |
| 20 | `chiddushei-hilkhot-niddah` | Chiddushei Hilkhot Niddah | Often empty |

**Empty folder / 0 blocks:** Normal when the Sefaria bundle has no layer for that commentary on that siman. Skip; do not invent text.

---

## YD terminology reminders

- **issur** / **heter**, **vadai** / **safek**, **ta'am**, **nevelah**, **treifah**, **shechitah**, **melichah**, **basar b'chalav**
- Dictionary: `full_dictionary (1).md` at repo root

---

## Stress simanim (QA after pilot)

| Siman | Topic |
|------:|-------|
| 87 | Melicha |
| 115 | Basar b'chalav |

---

## Regenerate extract

```bash
cd newtry/YD_001
node extract_yd001_from_sefaria_bundle.mjs --siman N --from 1 --to SEIF_COUNT --out-subdir siman_NNN --bundle-root "../../Sefaria Pulls/shulchan-arukh/Yoreh_Deah/simanim"
```

`sourceOrder` in each `output/siman_NNN/manifest.json` reflects what was extracted for that siman.
