# Slot 3 — Full cursor rules (human-readable)

Install the machine-readable version as `.cursor/rules/yd001-slot3-quality-pass.mdc` from `cursor-rules/` in this migration pack.

---

# YD_001 — Slot 3 quality pass (editorial retranslation)

## Project root

All paths below are relative to: `newtry/YD_001/`

## What this work is

- **Goal:** Fix machine-translated English in **non-Mechaber** commentator files for **simanim 201–300** only.
- **Method:** Retranslate **only** from Hebrew. Replace **only** text between `**** ENGLISH ****` and `**** END BLOCK ****`.
- **Do not** edit Mechaber files in this slot unless explicitly reassigned.
- **Do not** touch simanim outside 201–300 in this slot.

## Session init (every session — first actions)

1. Read `newtry/YD_001/full_dictionary.md` into context.
2. Read `newtry/YD_001/progress.log` (create empty if missing).
3. Print exactly: `[INIT] Dictionary loaded. Progress log read. Ready.`
4. If `full_dictionary.md` is missing, print `[ERROR] full_dictionary.md not found` and stop.

## Key files

| Purpose | Path |
|--------|------|
| Dictionary | `full_dictionary.md` |
| Progress | `progress.log` |
| Editorial spec | `translation/EDITORIAL_RETRANSLATE.md` |
| Slot assignment | `translation/AGENT_QUALITY_PASS_SLOTS.md` |
| Output blocks | `output/siman_NNN/<slug>/part-*.txt` |
| Failure scan | `pipeline/work/_slot3-scan-range.mjs` |
| Batch patches | `pipeline/work/_patch-slot3-batchNN.mjs` |
| Validate | `npm run pipeline:validate -- --root output/siman_NNN` |

## Block format (YD001)

```
**** YD001 SOURCE BLOCK ****
slug: turei-zahav
seif: 2
marker: א
**** HEBREW ****
[Hebrew with HTML — strip tags when translating]
**** ENGLISH ****
[REPLACE THIS ENTIRELY from Hebrew]
**** END BLOCK ****
```

- Block starts at `**** YD001 SOURCE BLOCK ****`
- Parse `slug`, `seif`, `marker` from metadata (`marker: _` → key `seif#_`)
- **Never** change Hebrew, headers, or blank lines between blocks.

## HTML handling

- Strip all HTML tags before translating.
- `<small>הגה ...</small>` → `{Rama: ...}` (curly braces only; "Rama" once after `{`)
- `<i data-commentator="...">` note markers → `(1)`, `(2)` per label number
- `<br>`, `<p>` → paragraph/line breaks as appropriate

## Translation rules (mandatory — R1–R10)

**R1 — COMPLETENESS:** Every Hebrew word in English. No summary, ellipsis, or omission.

**R2 — NO ADDITIONS:** Translation only. No headers, notes, or "Translation:" labels.

**R3 — HALACHIC TERMS:** Use `full_dictionary.md` Part 2. Examples: melacha, kli rishon, muktzeh, yad soledes bo, psik reisha, d'oraisa, d'rabbanan — never plain-English substitutes.

**R4 — COMMENTATOR NAMES:** Use Part 3 exactly (Magen Avraham, Taz, Beit Yosef, Rambam, Ramban, Mechaber — never anglicized).

**R5 — ABBREVIATIONS:** Expand all Hebrew abbreviations per Part 1. No Hebrew abbreviations in English output.

**R6 — NUMBERS:** Hebrew letter-numbers → Arabic numerals per Part 4.

**R7 — RAMA:** Glosses from הגה / `<small>הגה` → `{Rama: ...}` only.

**R8 — ARAMAIC:** Full English, standard scholarly rendering.

**R9 — CONNECTIVES:** Preserve logical connectives per dictionary Part 5B.

**R10 — OUTPUT:** Plain text only; start with first word of translation.

## Failure-pattern detection (retranslate if any appear)

her age | the craft | Lord's Prayer | Saturday | cold spot | Hashem's Word (as filler) | psalmist (for Rashi) | Capernaum (garbled) | first dish | second dish | allocated (for muktzeh) | hand recoils | Magen Avraham anglicized | Darbanan | Starworker | Hendro | IDF | Bible (for Tur) | Goon | Guana | Henderson | KNH'G | grows and goes | to the world (for l'olam)

After each batch:
`node pipeline/work/_slot3-scan-range.mjs 201 300`

## Commentator order (canonical — within each siman)

mechaber → rama → tur → beit-yosef → darkei-moshe → taz → magen-avraham → shach → bach → gra → peri-megadim → mishna-berurah → biur-halacha → shulchan-aruch-kpeshuta → chayei-adam → other

Slot 3: **non-mechaber** files only.

## Workflow per session

1. Init (above).
2. Scan 201–300; pick simanim with most hits.
3. Read Hebrew for each failing block (`seif#marker` from scan).
4. Patch via `pipeline/work/_patch-slot3-batchNN.mjs` (keys `'siman_NNN/slug/part-001.txt': { 'seif#marker': '...' }`).
5. Run: `node pipeline/work/_patch-slot3-batchNN.mjs`
6. Scan each siman → **0 hits**.
7. Validate: `npm run pipeline:validate -- --root output/siman_NNN`
8. Append `progress.log`: `YYYY-MM-DDTHH:mm:ss siman_NNN slot3-batchNN M blocks DONE`
9. Print `[COMPLETE] Batch NN — simanim: ...`

## Git

Do **not** commit unless the user asks.

## Handoff (verify against progress.log)

- batch30: 221, 229, 259, 268, 269
- batch31: 211, 235, 236
- Next likely: 264, 283, 293
