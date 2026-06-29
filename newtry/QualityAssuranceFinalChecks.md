# Quality Assurance — Final Checks
## Shulchan Aruch Translation Project

Applies to all four sections: **OC_001**, **YD_001**, **EH_001**, **CM_001**.

Each section has its own `output/siman_NNN/<slug>/part-*.txt` files. Run this checklist per siman before marking it COMPLETE in `progress.log`, and again as a volume-wide pass before publication.

---

## 1. Commentary header `<br>` placement

**Rule:** English block headers in commentary files must end with `</b>` — no `<br>` after the closing tag.

```
CORRECT:   <b>(א) "lemma" — topic.</b>
INCORRECT: <b>(א) "lemma" — topic.</b><br>
```

**Why it breaks:** The corpus reader (`corpus.js` → `splitHtmlByBrSegments`) splits both Hebrew and English on every `<br>` to create bilingual rows. A stray `<br>` after a header creates an extra blank row and shifts all subsequent content into the wrong row — columns appear blank or content is misaligned.

**Exception — mechaber and rama only:** These bypass the row-splitter and render via `dangerouslySetInnerHTML` directly. They require `<br>` after each seif header and after the siman title line:
```
<b>Siman Title — N Seifim</b><br>
<b>Seif 1.</b><br>
```

**Quick check:**
```
grep -r "</b><br>" output/siman_NNN/
```
Any hit outside `mechaber/` or `rama/` is a bug.

---

## 2. Hebrew/English `<br>` count mismatch within a block

**Rule:** When a Hebrew block contains multiple bold sub-lemmas separated internally by `<br>` (producing N+1 segments), the English for that same block must contain exactly N matching `<br>` separators at the corresponding split points.

**Why it breaks:** Hebrew and English are each split into an array of segments, then zipped into bilingual rows. If Hebrew yields 2 segments and English yields 1, the second Hebrew row renders with no English. If English yields more, content overflows into unrelated rows.

**Example (siman 61, Taz marker ב):**
- Hebrew: `<b>אשה חולנית</b> ... <br> <b>דברי המגיה</b> ...` → 2 segments
- English originally had 1 segment → second Hebrew sub-lemma showed no English
- Fix: added `<br>` before the annotator section in English

**Check:** For each block, count `<br>` inside `**** HEBREW ****` and compare to count inside `**** ENGLISH ****`. They must match. (Do not count the inter-block `<br>` added by `mergeHtml` between blocks — those are outside the block delimiters.)

---

## 3. Mechaber/Rama seif headers intact

**Rule:** Every mechaber and rama block must have `<br>` after the siman title line and after each `<b>Seif N.</b>` tag. Without these the title and seif numbers run together inline.

**Pattern to verify:**
```
<b>Siman Title</b><br>
<b>Seif 1.</b><br>
...body...
```

**Check:** Open each siman in the browser and confirm seif numbers appear on their own lines above the body text.

---

## 4. "Seif N —" prefix leakage in commentary files

**Rule:** Commentary English blocks must not contain "Seif 1 —", "Seif 2 —", etc. as prefixes in either the header or the body. These belong only in mechaber/rama seif markers.

**Why:** Old pipeline format used seif prefixes in commentary headers. These were superseded by the `(marker) "lemma" — topic` format and must not appear in final output.

**Check:**
```
grep -r "Seif [0-9]" output/siman_NNN/
```
Hits outside `mechaber/` or `rama/` are bugs.

---

## 5. Commentary header format consistency

**Expected format (every commentary block):**
```
<b>(marker) "opening lemma words" — brief topic summary.</b>
```

- `(marker)` — the Hebrew letter (א, ב, …) or `_` if there is only one block for that seif
- `"lemma"` — the opening Hebrew words being commented on, translated to English, enclosed in double quotes
- `— topic.` — a short English phrase summarising the subject of the note, ending with a period

**Failure modes to check:**
| Failure | Example |
|---|---|
| Missing quotes around lemma | `<b>(א) Even though she was not intimate — ...</b>` |
| Cross-reference replacing lemma | `<b>(See Beit Shmuel §4) — ...</b>` |
| Topic absent | `<b>(א) "lemma"</b>` |
| Marker absent | `<b>"lemma" — topic.</b>` |
| Wrong bracket style | `<b>[א] ...` or `<b>§1 ...` |

---

## 6. Duplicate phrase artifacts at edit boundaries

**Why it happens:** When a block is edited across session boundaries or resumptions, phrases can be doubled at the splice point (e.g. "The Beit Shmuel The Beit Shmuel in subsection 4").

**Check (regex):**
```
(\b\w{4,}\b) \1
```
Run on the `**** ENGLISH ****` sections. Any match is likely a duplication artifact.

---

## 7. Translation content quality (spot-check list)

Known bad translation patterns produced by machine translation — retranslate immediately if seen:

| Bad output | Correct rendering |
|---|---|
| "her age" | her niddah period / her days of impurity |
| "the craft" | the prohibited labor / melachah |
| "Lord's Prayer" | the blessing / tefillah |
| "Saturday" | Shabbat |
| "hand recoils" | the hand withdraws / is forbidden |
| "first dish" | first course / taamei hamitzvot context |
| "muktzeh" rendered as "allocated" | muktzeh (set aside / designated) |
| "Magen Avraham" anglicized as "Shield of Abraham" | Magen Avraham |
| Commentator names translated literally | Use canonical English names (see `full_dictionary.md`) |

---

## 8. Per-siman browser verification

After every corpus rebuild (`npm run corpus:eh:local` from `newtry/OC_Mobile/oc-web-reader/`), open the siman in the reader and verify:

- [ ] All commentary columns show English text (no blank columns)
- [ ] Bilingual rows align — Hebrew sub-lemma matches its English translation in the same row
- [ ] Mechaber seif numbers appear on separate lines
- [ ] No raw Hebrew appearing where English should be
- [ ] Headers display in bold above the body text (not merged inline)

Browser: `http://localhost:5174/?vol=eh1&siman=NNN`

---

## Pipeline completion checklist (per siman)

- [ ] All commentary headers: `</b>` not `</b><br>` (except mechaber/rama)
- [ ] Mechaber/rama seif headers: `</b><br>` present after title and after each seif
- [ ] Hebrew `<br>` count == English `<br>` count within each block
- [ ] No "Seif N —" in commentary headers or body
- [ ] No duplicate phrases at edit boundaries
- [ ] Header format: `<b>(marker) "lemma" — topic.</b>` for all commentary blocks
- [ ] Bad machine-translation patterns replaced (see §7)
- [ ] Corpus rebuilt and siman verified in browser
- [ ] `progress.log` updated with `siman_NNN COMPLETE`
