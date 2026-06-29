# YD001 Editorial Plan — Simanim 300–399

**Mode:** Hebrew-verified editorial cleanup (failing blocks only). Same workflow as 100–299.

## Validators
```bash
node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
node pipeline/validate-siman-claude-aligned.mjs --siman N --fail-on error
```

## After clean
```bash
npm run apply:dictionary -- --root output/siman_NNN
cd newtry/OC_Mobile/oc318-mobile-reader
node scripts/publish-yd001-siman.mjs --siman N
node scripts/bundle-corpus-yd1.mjs --siman N
```

## Helpers
- `pipeline/work/_unwrap-json-english-siman.mjs --siman N`
- `pipeline/work/_export-failing-blocks.mjs --siman N`
- `pipeline/work/_patch-siman-NNN-editorial.mjs` + `_tr-NNN-{slug}.mjs`

## Progress

| Range | Status | Notes |
|-------|--------|-------|
| 300–399 | **COMPLETE** | quality-gate pass (2026-06-17 scan) |
| 400–402 | **COMPLETE** | editorial patches: 20+23+71 blocks |
