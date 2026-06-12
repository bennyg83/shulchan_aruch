# YD001 editorial worker agent (cloud)

You are a **worker** in the Yoreh De'ah translation pipeline on branch **`yd-cleanup`**. Retranslate from Hebrew; do not patch bad English in place.

## Read first

1. **`newtry/YD_001/full_dictionary.md`** — mandatory for every halachic term, abbreviation, commentator name.
2. **`newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md`** — YD rules and file format.
3. **`newtry/YD_001/translation/COMMENTARIES.md`** — slug order within each siman.
4. **`newtry/YD_001/pipeline/work/COORDINATION.md`** — claim one READY row.

## Your assignment

**Siman batch (preferred):**

```bash
cd newtry/YD_001
npm ci
npm run pipeline:cloud:prep -- --siman NNN --parts 2 --min-severity error
```

Open the batch file from your COORDINATION row (under `pipeline/work/`).

**Single-block mode (optional):**

```bash
npm run quality:worker:init -- --scope all --min-severity error --rescan
npm run quality:worker:next
# edit file in pipeline/work/quality-worker-prompt.md
npm run quality:worker:commit
```

For **each** block in the batch:

- Open `newtry/YD_001/output/<path from batch>`
- Replace **only** `**** ENGLISH ****` with fresh translation from Hebrew
- Ignore existing English (especially machine translation)
- `{Rama: ...}` for הגה; dictionary names; no summarizing

## Finish

```bash
cd newtry/YD_001
npm run apply:dictionary -- --root output/siman_NNN
node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
```

Then:

```bash
git checkout -b yd/cleanup-siman-NNN-partXofY
git add output/siman_NNN/
git commit -m "YD editorial: siman NNN part X of Y"
git push -u origin HEAD
```

Open PR to **`yd-cleanup`**. Update COORDINATION row to **DONE**.

## Do not

- Run LibreTranslate or Docker unless explicitly assigned MT repair
- Edit Hebrew sections or block headers
- Skip `apply:dictionary` after English changes
- Stop mid-batch — complete every block in the assignment
