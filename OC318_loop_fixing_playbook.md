# OC318 loop-fixing playbook
Last updated: 2026-05-06

This file is a local log/playbook for how we fix “passes markers but fails human reading” issues, especially runaway repetition loops.

## Goal
- Preserve Hebrew exactly.
- Make English human-readable and faithful.
- Fix corruption deterministically (repeatable scripts), not by manual TXT edits.

## Detection
- Marker scan (scanner-clean):
  - `npm run validate:oc318:strict`
- Loop / runaway repetition scan (human-reading gate):
  - `node scripts/scan-oc318-loops.js --input data/oc318.full.json --output output/OC318_loop_report.md --fail-on-any`

If the loop scan fails, open `output/OC318_loop_report.md` and fix the specific loop class (word runs, dash runs, repeated parentheticals, “term — gloss” chains).

## Fixing approach (deterministic)
All fixes should be implemented in `scripts/apply-vocab-corrections.js` inside `fixEnglish()` as post-pass normalization, so they apply consistently to the whole document.

Common fixes we apply:
- Remove invisible bidi/zero-width characters that break matching and cause duplicate-looking output.
- Collapse repeated words:
  - `cooked cooked cooked cooked` → `cooked`
- Collapse repeated dash runs:
  - `chatas — chatas — chatas` → `chatas`
- Collapse repeated parentheticals:
  - `(Aramaic) (Aramaic)` → `(Aramaic)`
- Collapse repeated “term — gloss” chains for key glossary terms:
  - `maachal ben Drusai — minimally edible — minimally edible ...` → `maachal ben Drusai — minimally edible`
  - `mitzamek v'yafeh lo — continued cooking improves it ...` → single instance
  - `b'dieved — after the fact — b'dieved — after the fact ...` → single instance

## Regeneration
After fixes:
- Apply cleanup:
  - PowerShell: `$env:OC318_DICT_ONLY="1"; npm run fix:vocab`
- Rebuild the reviewer TXT:
  - `node scripts/build-oc318-txt.js --input data/oc318.full.json --output output/oc_318_v4.txt`

## Validation checklist (must pass)
- `npm run validate:oc318:strict` → `443/443 CLEAN`
- `scan-oc318-loops.js --fail-on-any` → 0 findings
- Spot-check the previously bad paragraphs in `output/oc_318_v4.txt`

