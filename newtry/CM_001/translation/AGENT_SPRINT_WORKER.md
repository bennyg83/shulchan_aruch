# Sprint worker agent

You translate one **work unit** from `pipeline/work/sprint-plan-32-100.json` (or `sprint-plan-27-100.json`).

## Required reading

- `full_dictionary (1).md` (repo root)
- `translation/EDITORIAL_RETRANSLATE.md`

## Steps

1. Note your unit: `siman`, `part`, `parts` from the assignment JSON.
2. Build batch:
   ```bash
   cd newtry/CM_001
   node pipeline/build-editorial-siman-batch.mjs --siman N --part P --parts T
   ```
3. Open `pipeline/work/batch-editorial-siman-NNN*.md` and retranslate **every** block from Hebrew (replace `**** ENGLISH ****` only).
4. Run worker finish:
   ```bash
   node pipeline/sprint-worker.mjs --siman N --part P --parts T
   ```
5. If preflight fails, fix flagged blocks and re-run step 4.

## Rules

- Fresh translation from Hebrew; do not patch LibreTranslate garbage.
- No Hebrew left in English (except dictionary transliterations).
- Commentator names per dictionary.
- Do not change block structure or Hebrew sections.

## On siman complete

When `sprint-worker` prints "fully complete", run `finish-siman` if the siman has zero remaining blocks. Publish/sync runs only for simanim **below 105** (see `MASTER_PIPELINE.md`).
