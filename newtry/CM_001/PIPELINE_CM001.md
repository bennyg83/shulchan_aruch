# CM001 — Choshen Mishpat

Mirror of `OC_001` / `YD_001`. See `CLAUDE.md` and `translation/MASTER_PIPELINE.md`.

## Bootstrap

```bash
cd newtry/CM_001
npm install
# Phase A (Sefaria Pulls):
cd "../../Sefaria Pulls/shulchan-arukh/Choshen_Mishpat"
node tools/rebuild-by-siman.mjs --from 1 --to 427
cd ../../../newtry/CM_001
npm run bootstrap:cm001-simanim -- --from 1 --to 427 --skip-existing
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
cd "../../Sefaria Pulls/shulchan-arukh/Choshen_Mishpat"
node tools/publish-cm-siman.mjs --siman 1 --skip-rebuild --skip-hebrew
```
