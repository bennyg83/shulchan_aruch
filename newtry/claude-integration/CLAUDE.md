# CLAUDE.md — Shulchan Aruch Translation Project

## AUTOMATIC SESSION INITIALIZATION

At the start of every session, before doing anything else:
1. Read `full_dictionary.md` from the current working directory into your active context
2. Read `progress.log` from the current working directory to identify already-completed simanim
3. Confirm initialization by printing: `[INIT] Dictionary loaded. Progress log read. Ready.`

If `full_dictionary.md` is not found, stop and print: `[ERROR] full_dictionary.md not found in current directory. Cannot proceed.`
If `progress.log` does not exist, create it as an empty file and continue.

---

## PROJECT CONTEXT

This project produces accurate English translations of classical halachic texts from the
Shulchan Aruch and its commentators. Source blocks are in `.txt` files organized in
folders by siman number under the current directory. Each block contains a Hebrew section
and an English section. The English sections are bad machine translations and must be
replaced with accurate translations produced by you.

**Commentators in scope (canonical processing order within each siman):**
1. mechaber
2. rama
3. tur
4. beit-yosef
5. darkei-moshe
6. taz (turei-zahav)
7. magen-avraham
8. shach
9. bach
10. gra
11. peri-megadim
12. mishna-berurah
13. biur-halacha
14. shulchan-aruch-kpeshuta
15. chayei-adam
16. other (any remaining slug)

Always translate in canonical order within a siman. This matters — the Mechaber's ruling
is the foundation; commentators reference it. Seeing the Mechaber first improves accuracy
of all subsequent translations in that siman.

---

## TRANSLATION RULES — PERMANENT — APPLY TO EVERY SINGLE BLOCK

These rules are absolute. They are not guidelines. They apply without exception to every
block regardless of commentator, length, or content.

### R1 — COMPLETENESS
Translate every word. No omissions, no ellipses, no summarizing, no paraphrasing.
Every clause, every inference, every citation, every parenthetical must appear in English.
If the Hebrew has 300 words, the English must account for all 300 words.

### R2 — NO ADDITIONS
Output only the translation of the source text.
No introductions, no headers, no commentary, no explanatory notes, no "Note:" insertions.
Do not explain what the author means. Translate what he says.

### R3 — HALACHIC TERMS
Use full_dictionary.md Part 2 for all technical terms without exception.
Never substitute plain English for a term the dictionary specifies as transliteration.
WRONG: "work" / RIGHT: "melacha"
WRONG: "first vessel" / RIGHT: "kli rishon"
WRONG: "set aside" / RIGHT: "muktzeh"
WRONG: "hand recoils" / RIGHT: "yad soledes bo"
WRONG: "inevitable result" / RIGHT: "psik reisha"
WRONG: "Torah-level prohibition" / RIGHT: "d'oraisa prohibition"
WRONG: "rabbinic prohibition" / RIGHT: "d'rabbanan prohibition"

### R4 — COMMENTATOR NAMES
Use names exactly as listed in full_dictionary.md Part 3.
Never anglicize under any circumstances.
WRONG: "Shield of Abraham" / RIGHT: "Magen Avraham"
WRONG: "Golden Rows" / RIGHT: "Taz"
WRONG: "House of Joseph" / RIGHT: "Beit Yosef"
WRONG: "Maimonides" / RIGHT: "Rambam"
WRONG: "Nachmanides" / RIGHT: "Ramban"
WRONG: "Karo" / RIGHT: "Mechaber" or "R' Yosef Karo" depending on context

### R5 — ABBREVIATIONS
Every Hebrew abbreviation must be expanded in the English output.
Use full_dictionary.md Part 1 for all expansions.
No Hebrew abbreviation of any kind may appear in the English output.

Critical expansions:
ט״ז = Taz | מ״א = Magen Avraham | ב״י = Beit Yosef | ר״ן = Ran
שו״ע = Shulchan Aruch | ש״ע = Shulchan Aruch | צ״ע = this requires further study
ק״ו = a fortiori | ס״ל = he holds | מ״מ = nevertheless / in any case
א״כ = if so / therefore | נ״ל = it appears to me | עכ״ל = end of his words
ב״ח = Bach | ש״ך = Shach | פמ״ג = Peri Megadim | מ״ב = Mishna Berurah
ח״א = Chayei Adam | ג״כ = also / as well | בד״ה = s.v. | כ״ה = so it is
וכו׳ = etc. | וכו = etc. | כו׳ = etc. | עי׳ = see | עיי׳ = see there
לכתחילה = l'chatchila (ideally / ab initio) | בדיעבד = b'dieved (after the fact)
דאורייתא / דאוריית׳ = d'oraisa | דרבנן = d'rabbanan
אסור = forbidden | מותר = permitted | חייב = liable | פטור = exempt

### R6 — NUMBERS
Convert all Hebrew letter-numbers to Arabic numerals.
Use full_dictionary.md Part 4 for the complete conversion key.
Siman citations: סי׳ תרפ״ז = siman 687
Seif citations: סעיף א = seif 1 | ס״ב = seif 2
Note labels in parentheses: (א) = (1) | (יב) = (12) | (ל) = (30)
Daf citations: דף י״ג = daf 13 | דף י״ג ע״א = daf 13a | דף י״ג ע״ב = daf 13b

### R7 — RAMA GLOSSES
Any text introduced by הגה is the Rama's interpolation.
It must appear in the English as: {Rama: ...}
Curly braces only. "Rama" appears exactly once, immediately after the opening brace.
The entire Rama gloss is enclosed. Nothing outside the gloss goes inside the braces.
WRONG: (Rama: ...) / WRONG: [Rama: ...] / WRONG: Rama writes: ...
RIGHT: {Rama: And even if one forgot and left it there, it is permitted after the fact.}

### R8 — ARAMAIC
Translate all Aramaic phrases fully into English.
Do not skip, do not leave in transliteration without translation.
Talmudic Aramaic follows standard scholarly rendering conventions.

### R9 — LOGICAL CONNECTIVES
Every logical connective must be present in the English.
Use full_dictionary.md Part 5B for correct renderings.
מיהו = however | מ״מ / מכל מקום = nevertheless / in any case
דהיינו = that is / namely | כלומר = meaning / that is to say
כיון ש = since | ולפיכך = and therefore | ומשום הכי = and for this reason
ואף על גב / ואף על פי כן = and even though / and even so
שאני הכא = this case is different | שאני התם = that case is different
אדרבה = on the contrary | הוא הדין = the same law applies
מה שאין כן = which is not so | קא משמע לן / קמ״ל = it teaches us

### R10 — OUTPUT FORMAT
Plain translated text only.
No "Translation:" label. No asterisks. No headers. No preamble. No notes.
Just the translated content, beginning immediately with the first word of the translation.

---

## HTML HANDLING

Hebrew source text contains HTML markup. Strip all tags before translating.
Tag handling rules:
- `<b>text</b>` → translate the text, no bold markers in output
- `<i data-commentator="..." data-label="א">` → this is a note marker, convert the label number only: output `(1)` at that position
- `<small>הגה ...</small>` → this marks a Rama gloss: translate as {Rama: ...}
- `<br>`, `<p>`, other structural tags → treat as paragraph or line breaks as appropriate
- All other tags → strip entirely, translate the enclosed text normally

---

## SESSION WORKFLOW — ONE SIMAN PER SESSION

Each Claude CLI session processes exactly one siman. This is the maximum safe unit
given 16 commentators per siman and Claude Pro session limits.

### Step 1 — Receive siman assignment
The orchestrator passes you a siman number, e.g.: `TRANSLATE SIMAN 687`
You will find the files in a folder matching that siman number under the current directory.

### Step 2 — Check progress.log
Read progress.log. If siman 687 already appears as COMPLETE, print:
`[SKIP] Siman 687 already complete per progress.log`
and stop. Do not reprocess.

### Step 3 — Discover and sort files
Find all `.txt` files in the siman folder.
Sort them by canonical commentator order (see PROJECT CONTEXT above).
Print the list: `[SIMAN 687] Found N files: mechaber, taz, magen-avraham, ...`

### Step 4 — Translate in order
For each file in canonical order:
  a. Read the file
  b. Parse all blocks (see BLOCK FORMAT below)
  c. Translate each block following all translation rules
  d. Write the corrected file back to disk immediately after completing all blocks in that file
  e. Append to progress.log: `[timestamp] siman_687/turei-zahav N_blocks DONE`
  f. Print: `[DONE] siman_687/turei-zahav — N blocks written`

### Step 5 — Mark siman complete
After all files in the siman are written, append to progress.log:
`[timestamp] siman_687 COMPLETE`
Print: `[COMPLETE] Siman 687 — all N commentators translated`

---

## BLOCK FORMAT

```
**** OC001 SOURCE BLOCK ****
slug: turei-zahav
seif: 2
marker: א
**** HEBREW ****
[Hebrew text with HTML tags]
**** ENGLISH ****
[existing bad translation — REPLACE THIS ENTIRELY]
**** END BLOCK ****
```

Parsing rules:
- Block starts at `**** OC` line
- Extract slug, seif, marker from the metadata lines
- Hebrew: everything between `**** HEBREW ****` and `**** ENGLISH ****`
- Existing English: everything between `**** ENGLISH ****` and `**** END BLOCK ****`
- Ignore the existing English entirely — translate fresh from the Hebrew every time

Writing rules:
- Replace ONLY the content between `**** ENGLISH ****` and `**** END BLOCK ****`
- Never modify the Hebrew section
- Never modify slug, seif, marker, or block header lines
- Never modify any other block in the file
- Preserve all blank lines between blocks exactly as they are

---

## FAILURE PATTERN DETECTION

Before writing any translation, scan it for these patterns.
If any are found, the translation is incorrect — retranslate the affected passage.

her age | the craft | Lord's Prayer | Saturday | cold spot | eastern crack |
Hashem's Word | glory of the barbarism | holy person | the beast | Darbanan |
ovary | murder and murder | the sign (used for siman) | grows and goes |
to the world (used for l'olam) | first dish | second dish | third dish |
the cauldron | brewer | butcher | Shabbat nights | allocated (used for muktzeh) |
KNH'G | PMG | CHA | Sach | Radach | BI | MA | MM | disgusted hand |
hand recoils | hand scared | shrinking and good | shrinking and bad |
I shoot at a fire | Nichom Lia | history of light | history of the sun

---

## PROGRESS LOG FORMAT

progress.log entries use this format, one entry per line:
```
2026-05-20T14:32:11 siman_687/turei-zahav 8 blocks DONE
2026-05-20T14:35:44 siman_687/magen-avraham 12 blocks DONE
2026-05-20T14:38:02 siman_687 COMPLETE
```

---

## COORDINATION WITH CURSOR ORCHESTRATOR

The Cursor orchestrator manages which simanim are assigned to this Claude CLI session
versus which are being handled by the local sub-agents. You will always receive a single
explicit siman assignment at the start of the session. Never reach outside that assigned
siman. Never modify files in any other siman folder. The orchestrator handles all
scheduling and conflict avoidance.

If you finish the assigned siman and have remaining session capacity, print:
`[READY] Siman N complete. Awaiting next assignment.`
and wait. Do not self-assign additional simanim.
