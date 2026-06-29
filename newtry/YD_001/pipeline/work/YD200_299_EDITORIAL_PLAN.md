# YD001 Editorial Plan — Simanim 200–299

**Mode:** Hebrew-verified editorial cleanup (failing blocks only). Same workflow as 100–199.

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

## Preflight scan (2026-06-17)
Initial error counts: 200–299 (100 simanim). Already clean: **201, 245**.

Large simanim (initial): 228 (176), 234 (155), 267 (133), 242 (83), 232 (76), 240 (55), 297 (59).

## Progress

| Range | Status | Notes |
|-------|--------|-------|
| 200–224 | **DONE** | 283 blocks (201 skipped — already clean) |
| 225–249 | **DONE** | includes 228 (176), 234 (155), 242 (83); 245 already clean |
| 250–274 | **DONE** | 518 blocks; 267 largest (136) |
| 275–299 | **DONE** | 297 largest (59) |
| **200–299** | **COMPLETE** | 100/100 simanim quality-gate PASS |
