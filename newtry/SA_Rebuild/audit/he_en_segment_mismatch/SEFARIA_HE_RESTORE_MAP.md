# Sefaria Pulls → corpus HE restore

Generated: 2026-08-27

## Layout

- `Sefaria Pulls/shulchan-arukh/{Orach_Chayim,Yoreh_Deah,Even_HaEzer,Choshen_Mishpat}/`
  - `commentaries/<Sefaria_Title>/merged.json` — raw HE grids `[siman][seif]`
  - `mechaber/merged.json`
  - `simanim/SSS/seif-TTT.json` + `seif-TTT/<slug>/he.html` — **OC only** (processed)
- Corpus: `public/corpus/{oc1,yd1,eh1,cm1}/simanN/seif-TTT/<slug>/{he,en}.html`
- Editorial TXT: `newtry/{OC,YD,EH,CM}_001/output/siman_NNN/<slug>/part-*.txt`

## Slug mapping

Use `newtry/lib/{orach_chayim,yoreh_deah,even_ha_ezer,choshen_mishpat}_layer_slug.mjs`.

Examples:

| Sefaria title / folder | Corpus slug |
|------------------------|-------------|
| Kaf HaChayim on … Orach Chayim | `kaf-hachayim` (OC001 folder often `kaf-hachayyim`) |
| Rabbi Akiva Eiger on … Yoreh De'ah | `rabbi-akiva-eiger-yd` |
| Peri Megadim on Yoreh De'ah | `peri-megadim-yd` |
| Siftei Kohen on … | `siftei-kohen` |
| Magen Avraham | `magen-avraham` |

YD/EH/CM have **no** `simanim/` tree under Sefaria Pulls — only `commentaries/` + `mechaber/`. HE for those volumes is normally published from editorial `output/` TXT.

## Existing publish (avoid blind EN overwrite)

- OC: `Sefaria Pulls/.../Orach_Chayim/tools/publish-oc-siman.mjs` (+ `export-seif-hebrew.mjs`, `sync-translated-siman-to-public.mjs`)
- YD: `oc318-mobile-reader/scripts/publish-yd001-siman.mjs` writes **HE+EN** from TXT — not safe for EN-preserving restore
- Prefer: `newtry/SA_Rebuild/scripts/restore_he_from_sefaria_pulls.mjs` (**he.html only**)

## Why most leftovers are not Sefaria-fixable

Typical `he_truncated_vs_multi_en` / `en_has_more_segments` (e.g. OC yad-ephraim 32:3):

- Sefaria `merged.json` cell, `seif-*.json` layer, exported `he.html`, and OC001 Hebrew are the **same single blob**
- Live EN was split into multiple `<br>` notes; HE was never multi-segment upstream
- Republishing from Sefaria cannot invent matching HE segments without unsafe HE-splitting heuristics

Many OC `he_missing`:

- Sefaria layer is `null` (no mechaber hook for that seif); commentary lives on other seifim
- Corpus often has orphan EN under the wrong seif

## Apply results (2026-08-27)

### oc1

- Target-kind leftovers: 107 (he_missing 60, he_truncated 25, en_has_more 22)
- Fixable from Sefaria/editorial/sibling: **1** → applied (`sibling_en_similar`: siman1/seif-007/shaarei-teshuvah)
- Rebundled: siman 1

### yd1

- Target-kind leftovers: 20
- Fixable: **2** → applied (`editorial_txt`: beur-hagra on simanim 136, 158; internal `<br>` in blocks normalized so block count == EN segments)
- Rebundled: simanim 136, 158

### Remains

- OC ~106 + YD ~18 of these HE-side kinds still need either EN re-join / note re-zip, or hook-based seif remapping for orphan EN — not a HE-only Sefaria copy.
