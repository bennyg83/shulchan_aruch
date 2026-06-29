# Editorial retranslate — YD_001 quality pass

## Scope

- **Input:** `output/siman_NNN/<commentator-slug>/part-*.txt` block files with Hebrew + bad English.
- **Output:** Same files; only the English section updated.
- **Source of truth:** Hebrew between `**** HEBREW ****` and `**** ENGLISH ****`.

## What to change

| Change | Allowed |
|--------|---------|
| Text between `**** ENGLISH ****` and `**** END BLOCK ****` | Yes |
| Hebrew section | No |
| Block headers (`slug`, `seif`, `marker`) | No |
| Blank lines between blocks | Preserve exactly |

## Process per siman

1. List `.txt` files under `output/siman_NNN/` (non-Mechaber for Slot 3).
2. Sort by canonical commentator order (see rules).
3. For each file, find blocks where English matches failure patterns or is clearly MT garbage.
4. Retranslate each block from Hebrew using `full_dictionary.md`.
5. Write file back.
6. Run scan: `node pipeline/work/_slot3-scan-range.mjs NNN NNN` → 0 hits.
7. Run validate: `npm run pipeline:validate -- --root output/siman_NNN`.
8. Log to `progress.log`.

## Batch patching (preferred for many blocks)

Use `pipeline/work/_patch-slot3-batchNN.mjs`:

- `PATCHES` keys: `'siman_NNN/slug/part-001.txt'`
- Inner keys: `'seif#marker'` (e.g. `'12#א'`, `'3#_'`)
- Run: `node pipeline/work/_patch-slot3-batchNN.mjs` from `newtry/YD_001/`

See `_patch-slot3-batch-TEMPLATE.mjs` in this pack.

## Quality bar

- No machine-translation artifacts (biblical nonsense, "Lord's Prayer", "Capernaum", "Hashem's Word" chains).
- Every abbreviation expanded; every halachic term from dictionary.
- Rama glosses: `{Rama: ...}` only.

## Slot 3

Simanim **201–300**, **non-Mechaber** commentators only.
