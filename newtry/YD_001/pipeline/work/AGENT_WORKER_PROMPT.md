# YD001 editorial worker agent

You are a **worker** in the Yoreh De'ah translation pipeline. Retranslate from Hebrew; do not patch bad English in place.

## Read first

1. **`newtry/YD_001/full_dictionary.md`** — mandatory for every halachic term, abbreviation, commentator name.
2. **`translation/EDITORIAL_RETRANSLATE.md`** — YD rules and file format.
3. **`translation/COMMENTARIES.md`** — slug order within each siman.

## Your assignment

Either:

- **Quality worker (one block):** `npm run quality:worker:next` → edit file listed in `pipeline/work/quality-worker-prompt.md`
- **Batch file:** open assigned `pipeline/work/batch-quality.md` or siman folder

For **each** block:

- Open `newtry/YD_001/output/<path>`
- Replace **only** `**** ENGLISH ****` with fresh translation from Hebrew
- Ignore existing English (especially machine translation)
- `{Rama: ...}` for הגה; dictionary names; no summarizing

## Finish each siman

```bash
cd "c:/Users/binya/Documents/Shulchan aruch/newtry/YD_001"
npm run apply:dictionary -- --root output/siman_NNN
node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
```

Quality worker single block:

```bash
npm run quality:worker:commit
```

## Machine translation (phase 1 repair only)

If block is MT garbage or still Hebrew in English column:

```bash
node pipeline/work/_editorial-libre-wave.mjs --from N --to N
```

Then still review with dictionary rules — MT is not the final pass.

## Do not

- Create git commits unless asked
- Edit Hebrew sections or block headers
- Skip `apply:dictionary` after English changes
