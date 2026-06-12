# EH001 — Even HaEzer

Mirror of `OC_001` / `YD_001`. See `CLAUDE.md` and `translation/MASTER_PIPELINE.md`.

## Bootstrap

```bash
cd newtry/EH_001
npm install
# Phase A (Sefaria Pulls):
cd "../../Sefaria Pulls/shulchan-arukh/Even_HaEzer"
node tools/rebuild-by-siman.mjs --from 1 --to 178
cd ../../../newtry/EH_001
npm run bootstrap:eh001-simanim -- --from 1 --to 178 --skip-existing
npm run pipeline:structure-check
```

## Machine translation

```bash
npm run libre:up
npm run translate:placeholders:libre -- --root output/siman_001
npm run apply:dictionary -- --root output/siman_001
```

## Publish

```bash
cd "../../Sefaria Pulls/shulchan-arukh/Even_HaEzer"
node tools/publish-eh-siman.mjs --siman 1 --skip-rebuild --skip-hebrew
```
