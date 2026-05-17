# Hebrew source policy

## Canonical source: Sefaria

For Orach Chayim translation and tooling in this repo, **canonical Hebrew text and structure** come from the Sefaria-shaped corpus:

- `Sefaria Pulls/shulchan-arukh/Orach_Chayim/merged.json`
- Rebuilt per siman via `tools/rebuild-by-siman.mjs` → `simanim/<siman>/seif-<seif>.json`

Scripts such as `tools/export-seif-hebrew.mjs`, `tools/import-oc001-english-to-seif-en.mjs`, and `newtry/OC_001/extract_oc001_from_sefaria_bundle.mjs` expect these bundles.

## Legacy HTML (optional)

Some folders keep **legacy HTML snapshots** for one-off comparison or migration. Parsing uses `newtry/lib/parshan_dom_lib.mjs`. These are **not** the canonical pipeline for new work.

## Not used as canonical source

**AlHaTorah.org exports** are not used as the authoritative Hebrew layer for this project.
