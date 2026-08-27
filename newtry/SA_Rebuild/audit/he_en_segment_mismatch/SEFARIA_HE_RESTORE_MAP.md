# Sefaria Pulls → corpus HE restore

Generated: 2026-08-27T18:25:57.910Z

## Layout

- `Sefaria Pulls/shulchan-arukh/{Orach_Chayim,Yoreh_Deah,Even_HaEzer,Choshen_Mishpat}/`
  - `commentaries/<Sefaria_Title>/merged.json` — raw HE grids `[siman][seif]`
  - `mechaber/merged.json`
  - `simanim/SSS/seif-TTT.json` + `seif-TTT/<slug>/he.html` — **OC only** (processed)
- Corpus: `public/corpus/{oc1,yd1,eh1,cm1}/simanN/seif-TTT/<slug>/{he,en}.html`
- Editorial TXT: `newtry/{OC,YD,EH,CM}_001/output/siman_NNN/<slug>/part-*.txt`

## Slug mapping

Use `newtry/lib/{orach_chayim,yoreh_deah,even_ha_ezer,choshen_mishpat}_layer_slug.mjs`.
Examples: `Kaf HaChayim…` → `kaf-hachayim`; YD RAE → `rabbi-akiva-eiger-yd`; YD PM → `peri-megadim-yd`.

## Existing publish (avoid blind EN overwrite)

- OC: `Sefaria Pulls/.../Orach_Chayim/tools/publish-oc-siman.mjs` (+ `export-seif-hebrew.mjs`, `sync-translated-siman-to-public.mjs`)
- YD: `oc318-mobile-reader/scripts/publish-yd001-siman.mjs` writes **HE+EN** from TXT — not safe for EN-preserving restore
- This script: **he.html only**

## Dry-run / apply results

### oc1

- mismatched (target kinds): 59
- fixable: 0
- applied: 0
- unfixable: 59
- byKind: {"he_missing":59}
- bySource: {}
- affected simanim: 0

