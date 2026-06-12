# CM001 editorial worker agent

Branch: **`cm-development`**. Retranslate from Hebrew; do not patch bad English in place.

## Read first

1. **`full_dictionary (1).md`** (repo root) — mandatory glossary.
2. **`translation/EDITORIAL_RETRANSLATE.md`**
3. **`translation/COMMENTARIES.md`**
4. **`pipeline/work/COORDINATION.md`** — claim one READY row.

## Per block

- Open `newtry/CM_001/output/<path>`
- Replace **only** `**** ENGLISH ****` from Hebrew
- `{Rama: ...}` for הגה; dictionary names; no summarizing

## Finish

```bash
cd newtry/CM_001
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:validate:quality
```

Open PR to **`cm-development`**.
