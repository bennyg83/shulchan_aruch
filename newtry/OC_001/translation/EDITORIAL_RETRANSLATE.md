# OC001 editorial re-translation (Cursor / agent)

**Authoritative dictionary:** `full_dictionary (1).md` at the **repository root**  
(`c:\Users\binya\Downloads\Shulchan Aruch\full_dictionary (1).md`).  
Consult it for every halachic term, abbreviation, and commentator name.  
Do not use `translation/GLOSSARY.json` as a substitute — that file is optional hints only.

**Source of truth for edits:** `newtry/OC_001/output/` — block files `siman_NNN/<commentary>/part-*.txt`.

**Core rule:** Hebrew is authoritative. Existing English (especially LibreTranslate) is disposable.  
Translate fresh from Hebrew; do not patch bad English in place.

---

## Translation rules (every block)

**COMPLETENESS:** Translate every word. No omissions, no ellipses, no summarizing.

**NO ADDITIONS:** Output only translation of the source. No commentary, headers, or notes of your own.

**HALACHIC TERMS:** Use the dictionary. Never substitute plain English when the dictionary specifies a transliteration  
(e.g. melacha, kli rishon, muktzeh, psik reisha, yad soledes bo).

**COMMENTATOR NAMES:** Exactly as in the dictionary. Never anglicize (Magen Avraham, Taz, Beit Yosef, Rambam).

**ABBREVIATIONS:** Expand every Hebrew abbreviation per dictionary Part 1 in English.  
No Hebrew abbreviation may remain in English output.

**NUMBERS:** Convert Hebrew letter-numbers to Arabic numerals where appropriate  
(siman references, seif labels: note markers (א) → (1) when using numeric note style in running text).

**RAMA GLOSSES:** Text introduced by הגה → `{Rama: ...}` (once, right after `{`).

**ARAMAIC:** Translate fully; do not leave untranslated.

**LOGICAL CONNECTIVES:** Use dictionary Part 5 (מיהו, מ״מ, דהיינו, כיון ש, ולפיכך, etc.).

**OUTPUT:** Plain translated English only under `**** ENGLISH ****`. No "Translation:" label.

---

## File format (do not change structure)

```
**** OC001 SOURCE BLOCK ****
slug: turei-zahav
seif: 2
marker: א
**** HEBREW ****
[Hebrew — may contain HTML]
**** ENGLISH ****
[REPLACE THIS ONLY]
**** END BLOCK ****
```

- Leave `slug`, `seif`, `marker`, `**** HEBREW ****`, headers, and `**** END BLOCK ****` unchanged.
- Strip HTML when reading Hebrew; preserve intentional structure in English where needed (`<small>` for Rama, etc.).
- `<small>הגה …</small>` → translate inner text as `{Rama: …}`.

---

## Per-file workflow

1. Read the `.txt` file under `output/`.
2. For each block: translate Hebrew → replace English only.
3. Write the file back.
4. Run `npm run apply:dictionary` on touched trees (terminology pass).
5. Run `npm run pipeline:validate` and `npm run pipeline:validate:quality` on changed paths.

---

## Full OC loop (siman 21 → 697) — recommended

Simanim **1–20** were largely filled from Sefaria; **21+** need this editorial pass (LibreTranslate is draft-only).

```bash
cd newtry/OC_001
npm run pipeline:editorial:loop -- init          # once: start at siman 21
npm run pipeline:editorial:loop -- prepare      # writes batch-editorial-siman-NNN.md
# Cursor: @full_dictionary (1).md + @pipeline/work/batch-editorial-siman-NNN.md
# Retranslate every block from Hebrew (ignore existing English)
npm run pipeline:editorial:loop -- advance      # dictionary + validate + checkpoint
npm run pipeline:editorial:loop -- prepare      # next part or next siman
npm run pipeline:editorial:loop -- finish-siman --siman 21   # when siman quality OK
npm run pipeline:editorial:loop -- status
```

Default: **40 blocks/batch**, **scope=all** (every Hebrew block in the siman). Slower, higher quality.  
Manifest: `pipeline/work/editorial-loop-manifest.md`.

## Ad-hoc batches

```bash
npm run pipeline:validate:quality -- --write-reports
npm run pipeline:quality:batch
node pipeline/build-editorial-siman-batch.mjs --siman 113
```

---

## After a batch

```bash
npm run apply:dictionary
npm run pipeline:validate:all
npm run pipeline:editorial:loop -- finish-siman --siman N   # when siman is clean
```

## Publish & web reader (orchestrator)

The **coordinator** runs `node pipeline/orchestrator.mjs sync` (also auto-runs after `finish-siman`):

- **Every 5** finished simanim → publish to `oc318-mobile-reader/public/corpus/oc1` + git push
- **Every 10** finished simanim → release deploy (GitHub Pages rebuild on push to `main`)

See `translation/ORCHESTRATOR.md`.
