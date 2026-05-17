# OC 318 Halachic Translation Project — Full Task, Rules & Formatting Guide

---

## Project Overview

Translate the full text of **Orach Chayyim Siman 318** (19 seifim) from the provided alhatorah.org source document into a complete bilingual Hebrew/English reference document.

One `.docx` file is produced per seif. At the end, all files are merged into a single final document.

### Companion references (use together with this prompt)

**Use these companion references together with this prompt:**

1. **`scripts/halachic_text_translation_pipeline.md`**  
   General halachic preprocessing, OCR cleanup, rosh teivot expansion, gematria/reference normalization, source recognition, glossary protection, and post-processing architecture.

2. **`OC318_Translation_Rules_Addendum_for_Cursor.md`**  
   OC318-specific Hebrew-first workflow, failure markers, paragraph rebuild rules, phrase-level corrections, Taz / Biur Halacha / Shulchan Aruch K’pshuto guidance (within that document), and final review checklist.

3. **`OC318_Vocabulary_Corrections.md`**  
   Scripted vocabulary cleanup table used by `npm run fix:vocab`. This is a **mechanical cleanup layer only** and does **not** replace Hebrew-first review.

4. **`halachic_translation_living_cursor_guide.md`**  
   Living workflow doc: hard vs soft failure markers, scanner semantics (`scripts/scan-oc318-failures.js`), and operational commands for OC318.

**Critical review rule:** If an English paragraph contains **multiple failure markers** (see the addendum), **do not patch it locally.** **Retranslate the full paragraph from the Hebrew** immediately above it.

**Gematria caveat:** The pipeline shows **additive** letter sums (e.g. ש״ז as 300+7). Printed **Shulchan Aruch** siman marks often use **positional** gematria for chapter numbers (e.g. רמ״ז = 247). Prefer the **source edition’s Hebrew** and known OC cross-references over naive letter-sum parsing alone.

---

## Absolute Rules — No Exceptions

1. **Translate everything.** Every word of every source note must be fully rendered. Nothing may be skipped, abbreviated, summarized, or truncated.
2. **Add nothing.** No commentary, no explanations, no cross-references, no content of any kind that does not appear verbatim in the provided source document.
3. **Work strictly from the attached source document.** Do not reconstruct from memory. Search the source document before writing each seif.
4. **Every note must be complete.** If a note runs long, render it in full. No `[continued]` markers. No ellipses in place of text.
5. **Do not proceed to the next seif until the current one is fully complete.**

---

## Sources to Include

For each seif, include the following sources **when present** in the source document, in this order:

| # | Source | Notes |
|---|--------|-------|
| 1 | **Mechaber** | Interwoven with Rama in curly brackets `{}` |
| 2 | **Rama** | Not a separate section — embedded in Mechaber text in `{}` |
| 3 | **Tur** | All numbered notes in full |
| 4 | **Magen Avraham** | All numbered notes in full |
| 5 | **Taz** | All numbered notes in full |
| 6 | **Biur Halacha** | All passages in full |
| 7 | **Shulchan Aruch K'pshuto** | All numbered notes in full |

**Excluded sources:** Mishna Berurah, Mishbetzot Zahav. Do not include these even if present in the source document.

---

## Document Structure — Apply to Every Seif

For each seif, the output document follows this layout:

```
[SEIF HEADER]
  e.g. "Seif 1"

[SOURCE LABEL]
  e.g. "Mechaber and Rama"

  [Full Hebrew text of Mechaber/Rama — right to left]
  [Full English translation immediately below]

[SOURCE LABEL]
  e.g. "Tur"

  [Hebrew text of note (1)]
  [English translation of note (1)]

  [Hebrew text of note (2)]
  [English translation of note (2)]

  ... (all notes, in full, in order)

[SOURCE LABEL]
  e.g. "Magen Avraham"

  [Hebrew text of note (1)]
  [English translation of note (1)]

  ... (continue for all sources present)
```

**The Hebrew always comes first. The English translation follows immediately below it — for every single note and passage.**

---

## Formatting Specification

Use the Node.js `docx` library (v9.x). The following specs apply to all output files.

### Page Setup
```
Page size:  12240 × 15840 (US Letter)
Margins:    1440 all sides (top, right, bottom, left)
```

### Seif Section Header
```
Font:       Arial, size 32, bold
Color:      2E75B6
Border:     top + bottom, style SINGLE, size 8, color 2E75B6
Spacing:    before 440, after 160
```

### Source Label
```
Font:       Arial, size 26, bold
Color:      1A3A5C
Border:     bottom only, style SINGLE, size 4, color 999999
Spacing:    before 300, after 80
```

### Hebrew Main Text (Mechaber/Rama block)
```
Font:       David, size 24
RTL:        true
Bidirectional: true
Spacing:    before 80, after 60
```

### English Main Text (Mechaber/Rama block)
```
Font:       Arial, size 22
Spacing:    before 40, after 180
```

### Hebrew Note Text (all other sources)
```
Font:       David, size 22
RTL:        true
Bidirectional: true
Spacing:    before 120, after 40
```

### English Note Text (all other sources)
```
Font:       Arial, size 21
Spacing:    before 20, after 160
```

### Title Page (first file only)
```
Text:       "Orach Chayyim 318 — Din HaMevashel B'Shabbat"
Font:       Arial, size 38, bold
Alignment:  CENTER
Spacing:    before 0, after 120

Subtitle:   "Sources: Mechaber | Rama | Tur | Magen Avraham | Taz | Biur Halacha | Shulchan Aruch K'pshuto"
Font:       Arial, size 20
Color:      777777
Alignment:  CENTER
Spacing:    before 0, after 400
```

---

## Code Template

Use the following helper functions for all paragraph creation:

```javascript
const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');
const ch = [];

// Seif section header
function S(n) {
  ch.push(new Paragraph({
    spacing: { before: 440, after: 160 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: '2E75B6' }
    },
    children: [new TextRun({ text: n, bold: true, size: 32, font: 'Arial', color: '2E75B6' })]
  }));
}

// Source label
function src(t) {
  ch.push(new Paragraph({
    spacing: { before: 300, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '999999' } },
    children: [new TextRun({ text: t, bold: true, size: 26, font: 'Arial', color: '1A3A5C' })]
  }));
}

// Hebrew main text
function H(t) {
  ch.push(new Paragraph({
    bidirectional: true,
    spacing: { before: 80, after: 60 },
    children: [new TextRun({ text: t, size: 24, font: 'David', rtl: true })]
  }));
}

// English main text
function E(t) {
  ch.push(new Paragraph({
    spacing: { before: 40, after: 180 },
    children: [new TextRun({ text: t, size: 22, font: 'Arial' })]
  }));
}

// Hebrew + English note pair
function N(h, e) {
  ch.push(new Paragraph({
    bidirectional: true,
    spacing: { before: 120, after: 40 },
    children: [new TextRun({ text: h, size: 22, font: 'David', rtl: true })]
  }));
  ch.push(new Paragraph({
    spacing: { before: 20, after: 160 },
    children: [new TextRun({ text: e, size: 21, font: 'Arial' })]
  }));
}

// Build and save
const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: ch
  }]
});

Packer.toBuffer(doc).then(b => {
  fs.writeFileSync('/output/OC318_seif[N].docx', b);
  console.log('done');
});
```

---

## Workflow — Per Seif

1. Search the project knowledge / source document for the full text of the seif.
2. Retrieve **all** content for all seven sources listed above.
3. Write the script using the helper functions above.
4. Save to file and verify output.
5. Present the file to the user for review.
6. Only after confirmation, proceed to the next seif.

---

## Output Example

The completed **Seif 1** output document serves as the quality and completeness benchmark for all subsequent seifim. Every seif must match it in:
- Completeness of Hebrew source text
- Completeness of English translation
- Structural layout (Hebrew → English for every note)
- Formatting (fonts, sizes, colors, borders, spacing)

---

## Final Merge

After all 19 seifim are complete and approved, concatenate all individual `.docx` files into a single final document:

```
OC318_Complete.docx
```

Maintain the same formatting throughout. The title page appears once at the top of the merged document.

---

## Attachments Required to Run This Project

1. **The full alhatorah.org source document** for OC 318 (all 19 seifim, all commentators)
2. **The completed Seif 1 `.docx`** as the output quality example

---

*End of prompt guide.*
