# EH001 editorial re-translation (Cursor / agent)

**Authoritative dictionary:** `full_dictionary (1).md` at the **repository root**.  
Consult it for every halachic term, abbreviation, and commentator name.

**Source of truth:** `newtry/EH_001/output/siman_NNN/<commentary>/part-*.txt`.  
**Commentary order:** `translation/COMMENTARIES.md`.

**Core rule:** Hebrew is authoritative. Translate fresh from Hebrew; do not patch bad English in place.

---

## YD-specific terminology (examples)

Use the dictionary; these recur in Even HaEzer:

- **issur** / **heter** — forbidden / permitted (not generic "prohibited" if dictionary says issur)
- **vadai** / **safek** — definite / doubtful
- **ta'am** / **noten ta'am** — taste / imparting taste (basar b'chalav, ta'aruvos)
- **nevelah**, **treifah**, **shechitah**, **melichah**, **nikkur**
- **Shach** → Siftei Kohen; **Taz** → Turei Zahav (slug folders `siftei-kohen`, `turei-zahav`)

---

## Translation rules (every block)

Same as OC: completeness, no additions, dictionary halachic terms, expand abbreviations, `{Rama: …}` for הגה, full Aramaic, logical connectives per dictionary Part 5.

---

## File format

```
**** EH001 SOURCE BLOCK ****
slug: siftei-kohen
seif: 2
marker: א
**** HEBREW ****
[Hebrew — may contain HTML]
**** ENGLISH ****
[REPLACE THIS ONLY]
**** END BLOCK ****
```

---

## Per-file workflow

1. Read `output/siman_NNN/<slug>/part-*.txt`.
2. Translate each block from Hebrew.
3. `npm run apply:dictionary -- --root output/siman_NNN`
4. `npm run pipeline:validate -- --root output/siman_NNN`

---

## Pilot scope (Phase C)

Simanim **1–5** first, then stress simanim **87** (melicha) and **115** (basar b'chalav) per `EH_EVEN_HAEZER_PLAN.md`.
