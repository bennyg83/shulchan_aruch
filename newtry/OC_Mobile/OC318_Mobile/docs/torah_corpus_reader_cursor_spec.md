# Torah Corpus Reader and HTML Listening Platform
## Cursor Core Project Specification

Project owner: Binyamin Goldberg
Project personas: Bill and Rav Comp
Project focus: Orach Chaim structured Torah corpus, mobile-first reader, HTML listening mode, offline access

---

# 1. Project Goal

Build a local-first Torah corpus reader that consumes already-parsed and already-translated commentary files, packages them into a reader-ready structured corpus, and renders them as both:

1. A mobile-friendly Torah learning reader
2. Clean semantic HTML pages that Chrome can read aloud using its built-in read-aloud functionality

The goal is not to build the translation system from scratch. Translation and commentary parsing already exist upstream. The goal of this project is to build the next layer:

Parsed commentary files
→ corpus packager
→ structured app data
→ searchable reader
→ bookmarkable mobile experience
→ clean HTML listening/export mode

The DOCX output is not the canonical source. The DOCX is a compiled preview or export artifact.

The parsed commentary files are the source of truth.

---

# 2. Core Principle

This project is not a static document viewer.

It is a structured Torah corpus engine with multiple render targets.

The primary runtime data should be structured JSON first, with an optional later migration to SQLite if corpus size or indexing needs require it.

HTML is an important first-class output target because Chrome can read aloud web pages. However, HTML should not be treated as the master data source. HTML should be generated from structured corpus data.

---

# 3. Existing Inputs

The existing system already provides:

- Parsed commentary files
- Commentary identity
- Commentary numbering systems
- Hebrew source text
- English translation
- Per-commentary ordering
- Compiled DOCX output for review

The app should not parse the DOCX.

The app should not rely on DOCX formatting.

The app should consume the already-parsed source files directly.

---

# 4. Desired Outputs

The project should generate:

1. Reader-ready structured JSON
2. Manifest files for navigation and lazy loading
3. Search indexes
4. HTML reading pages
5. HTML listening pages optimized for Chrome read-aloud
6. Bookmark and progress storage
7. Optional later SQLite database
8. Optional later Android app wrapper via Capacitor
9. Optional export formats such as DOCX, PDF, Markdown, EPUB

---

# 5. Recommended Tech Stack

## Frontend

- React
- Vite
- TypeScript
- TailwindCSS

## Local App Storage

Start with:

- IndexedDB using Dexie.js

Potential later upgrade:

- SQLite through Capacitor

## Search

Use one of:

- FlexSearch
- MiniSearch

Preferred initial choice:

- FlexSearch

## Mobile App Wrapper

Use later if needed:

- Capacitor

## Rendering Performance

Use when needed:

- react-window
- react-virtualized

Do not render massive Torah text blocks into the DOM all at once.

---

# 6. High-Level Architecture

```txt
Existing parsed commentary files
        ↓
Corpus packager
        ↓
Reader-ready JSON corpus
        ↓
Manifest generator
        ↓
Search index generator
        ↓
React reader app
        ↓
HTML listening/export renderer
        ↓
Optional Android wrapper
```

---

# 7. Project Directory Structure

```txt
/project-root
  /src
    /components
      /reader
      /navigation
      /commentary
      /bookmarks
      /search
      /listening
      /layout

    /hooks
    /lib
    /pages
    /styles
    /types

  /pipeline
    /packager
    /validators
    /manifest
    /search
    /html-export
    /docx-export
    /utils

  /data
    /input
      /parsed-commentaries

    /corpus
      /orach_chaim

    /indexes

    /manifests

  /exports
    /html
    /listening-html
    /docx
    /pdf

  /schemas

  /tests
```

---

# 8. Canonical Corpus Format

The app should package each siman and seif into structured JSON.

Recommended file path:

```txt
/data/corpus/orach_chaim/253/seif_1.json
```

Example structure:

```json
{
  "work": "orach_chaim",
  "siman": 253,
  "seif": 1,
  "title": "",
  "base": {
    "source": "mechaber_rama",
    "he": "...",
    "en": "..."
  },
  "commentaries": {
    "magen_avraham": [
      {
        "number": "א",
        "sortOrder": 1,
        "dibburHamatchil": "מצטמק",
        "he": "...",
        "en": "...",
        "status": "ready",
        "reviewFlags": [],
        "sourceRef": "Magen Avraham OC 253:1:1"
      }
    ],
    "taz": [
      {
        "number": "א",
        "sortOrder": 1,
        "dibburHamatchil": "שלא נתבשל כלל",
        "he": "...",
        "en": "...",
        "status": "ready",
        "reviewFlags": [],
        "sourceRef": "Taz OC 253:1:1"
      }
    ]
  },
  "metadata": {
    "generatedAt": "",
    "inputVersion": "",
    "corpusVersion": 1
  }
}
```

---

# 9. Commentary IDs

Use stable internal commentary IDs.

Do not use display labels as database keys.

Recommended IDs:

```txt
mechaber_rama
tur
magen_avraham
taz
beer_hagolah
beur_hagra
beer_heitev
hagahot_rabbi_akiva_eiger
mishna_berurah
biur_halacha
shaar_hatziyun
```

Each commentary should have a registry entry.

Example:

```json
{
  "id": "magen_avraham",
  "displayName": "Magen Avraham",
  "hebrewName": "מגן אברהם",
  "defaultEnabled": false,
  "sortOrder": 3
}
```

---

# 10. Manifest System

Create a manifest so the app can navigate quickly without loading the entire corpus.

Recommended file:

```txt
/data/manifests/orach_chaim_manifest.json
```

Example:

```json
{
  "work": "orach_chaim",
  "displayName": "Orach Chaim",
  "simanim": [
    {
      "siman": 253,
      "title": "",
      "seifCount": 8,
      "availableCommentaries": [
        "mechaber_rama",
        "tur",
        "magen_avraham",
        "taz",
        "beer_hagolah",
        "beur_hagra",
        "beer_heitev",
        "hagahot_rabbi_akiva_eiger",
        "mishna_berurah"
      ],
      "path": "/data/corpus/orach_chaim/253/"
    }
  ]
}
```

The reader should load a seif only when needed.

Do not load the full corpus into memory.

---

# 11. Packager Responsibilities

The packager is now the most important backend/pipeline layer.

It should:

1. Read existing parsed commentary files
2. Normalize them into consistent JSON
3. Preserve commentary identity
4. Preserve commentary numbering
5. Preserve dibbur hamatchil when available
6. Preserve Hebrew and English as separate fields
7. Generate corpus files by work, siman, and seif
8. Generate manifest files
9. Generate search index files
10. Generate HTML pages
11. Generate validation reports

The packager must not rely on DOCX parsing.

---

# 12. Validation Rules

The validator should check:

- Missing Hebrew
- Missing English
- Missing commentary number
- Duplicate commentary numbers within a seif
- Missing commentary IDs
- Invalid commentary IDs
- Broken siman or seif references
- Empty commentary segments
- Unexpected ordering changes
- Unrecognized source files
- Missing manifest entries
- Broken HTML export

Validation output should be written to:

```txt
/data/reports/validation_report.json
```

Also create a readable summary:

```txt
/data/reports/validation_report.md
```

---

# 13. Review Flags

Each segment may include review flags.

Example:

```json
{
  "reviewFlags": [
    "needs_halachic_review",
    "possible_context_issue",
    "abbreviation_uncertain",
    "translation_needs_smoothing",
    "source_alignment_unclear"
  ]
}
```

The reader should optionally show review flags in developer/review mode.

The normal learning reader should hide them by default.

---

# 14. Translation Status

Even though translation already exists, each segment should still have a status field.

Recommended statuses:

```txt
raw
translated
review_needed
reviewed
approved
```

The existing translated material can default to:

```txt
translated
```

Or, if already reviewed:

```txt
approved
```

---

# 15. Reader UX

The default mobile reader should not show all commentaries expanded.

Recommended layout:

1. Header
   - Work
   - Siman
   - Seif
   - Navigation arrows

2. Base text
   - Mechaber and Rama
   - Hebrew and English display options

3. Commentary controls
   - Toggle selected commentaries
   - Expand or collapse all selected
   - Display mode selector

4. Commentary cards
   - Commentary name
   - Segment number
   - Dibbur hamatchil
   - Hebrew
   - English

5. Footer navigation
   - Previous seif
   - Next seif
   - Bookmark
   - Continue later

---

# 16. Reader Display Modes

Support these modes:

```txt
hebrew_only
english_only
hebrew_english
english_hebrew
compact
listening
review
```

Listening mode should prioritize clean English reading unless the user explicitly enables Hebrew.

---

# 17. HTML Listening Mode

This is a first-class requirement.

Chrome read-aloud works best when HTML is semantic, clean, and not cluttered by hidden or interactive content.

Generate special listening HTML pages from the corpus.

Recommended path:

```txt
/exports/listening-html/orach_chaim/253/seif_1.html
```

The listening HTML should use real text, semantic tags, and language attributes.

Example:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Orach Chaim 253, Seif 1</title>
</head>
<body>
  <article>
    <header>
      <h1>Orach Chaim 253, Seif 1</h1>
    </header>

    <section data-source="mechaber_rama">
      <h2>Mechaber and Rama</h2>
      <p lang="he" dir="rtl">...</p>
      <p lang="en">...</p>
    </section>

    <section data-source="magen_avraham">
      <h2>Magen Avraham 1</h2>
      <h3 lang="he" dir="rtl">מצטמק</h3>
      <p lang="he" dir="rtl">...</p>
      <p lang="en">...</p>
    </section>
  </article>
</body>
</html>
```

Important listening rules:

- Use actual text, not canvas or images
- Use article, section, h1, h2, h3, and p tags
- Use lang="he" and dir="rtl" for Hebrew
- Use lang="en" for English
- Avoid hidden text inside the listening article
- Avoid buttons inside the listening article
- Avoid massive all-in-one pages
- Split by siman and seif
- Optionally generate one page per selected commentary set

---

# 18. Listening Page Variants

Generate multiple listening outputs if useful:

```txt
seif_1_all.html
seif_1_base_only.html
seif_1_mishna_berurah.html
seif_1_selected.html
```

But the initial MVP can start with:

```txt
seif_1_all.html
```

Later add selected-commentary export from the app UI.

---

# 19. App-Based Listening Mode

Inside the React app, include a Listening Mode page.

This should render clean semantic HTML directly in the page.

It should allow the user to select:

- Base text only
- Base plus selected commentaries
- English only
- Hebrew only
- Hebrew and English
- Current seif
- Current siman

When Listening Mode is on, reduce UI clutter.

Display text in a clean article-like view.

---

# 20. Bookmark System

Bookmarks should store exact learning position.

Example:

```json
{
  "id": "bookmark_001",
  "work": "orach_chaim",
  "siman": 253,
  "seif": 1,
  "chunkId": null,
  "commentaryId": "mishna_berurah",
  "segmentNumber": "א",
  "scrollPosition": 1280,
  "activeCommentaries": [
    "mishna_berurah",
    "biur_halacha"
  ],
  "displayMode": "hebrew_english",
  "note": "Continue from here",
  "updatedAt": ""
}
```

Bookmarks should be stored in IndexedDB.

Support:

- Continue where I left off
- Multiple bookmarks
- Notes on bookmarks
- Recent locations

---

# 21. Search System

Search should support:

- Hebrew text
- English text
- Commentary names
- Siman and seif references
- Dibbur hamatchil
- Common transliterations
- Abbreviations

Examples that should resolve well:

```txt
מאכל בן דרוסאי
maachal ben drusai
ben drusai
geruf
ketum
שהיה
hatmanah
mitztamek
```

Search results should show:

- Work
- Siman
- Seif
- Commentary
- Segment number
- Snippet
- Link to open the reader at that location

---

# 22. Terminology Registry

Create a terminology registry for important halachic terms.

Recommended file:

```txt
/data/manifests/terminology_registry.json
```

Example:

```json
{
  "mitztamek": {
    "hebrew": "מצטמק",
    "preferredEnglish": "continues reducing",
    "alternateEnglish": [
      "shrinks",
      "keeps cooking down",
      "overcooks"
    ],
    "tags": ["bishul", "shehiyah"]
  },
  "maachal_ben_drusai": {
    "hebrew": "מאכל בן דרוסאי",
    "preferredEnglish": "maachal ben Drusai",
    "alternateEnglish": [
      "partially cooked",
      "one-third cooked",
      "half cooked"
    ],
    "tags": ["bishul", "shehiyah"]
  }
}
```

The search index should use this registry to improve results.

---

# 23. Corpus Inspector

Before building the polished app, build a developer-facing Corpus Inspector.

It should show:

```txt
Orach Chaim
  Siman 253
    Seif 1
      Base Text
      Magen Avraham
        1
        2
        3
      Taz
        1
        2
```

The inspector should help verify:

- structure
- ordering
- missing translations
- missing Hebrew
- duplicate numbering
- commentary availability
- broken anchors

This is the best first internal tool.

---

# 24. Performance Rules

Do not load everything at once.

Required:

- Load manifest first
- Load current siman or seif on demand
- Lazy-load commentary content
- Collapse commentaries by default
- Use virtualization for long pages
- Keep listening pages clean and smaller

Forbidden:

- One giant HTML page for the whole corpus
- One giant JSON file for all Orach Chaim
- Rendering all commentaries expanded by default
- Loading all commentaries into the DOM when hidden

---

# 25. MVP Scope

Initial MVP:

1. Use existing parsed files for OC 253
2. Package into reader-ready JSON
3. Generate manifest
4. Build Corpus Inspector
5. Build basic reader
6. Add commentary toggles
7. Add bookmarks
8. Generate listening HTML for OC 253
9. Add simple search within OC 253

Do not begin with the whole Orach Chaim.

Use OC 253 as the proof of architecture.

---

# 26. Phase 2

Expand to:

- Hilchot Shabbat
- Better search
- More commentaries
- Review flags UI
- Listening mode options
- Export selected siman as HTML
- Export selected siman as DOCX

---

# 27. Phase 3

Expand to:

- Full Orach Chaim
- SQLite migration if needed
- Capacitor Android wrapper
- Device-local notes
- Cross-device sync if desired later
- Full terminology-aware search
- Print booklet generation

---

# 28. Important Implementation Notes for Cursor

Cursor should preserve the following rules:

1. Do not parse DOCX as the source of truth
2. Do not overwrite original Hebrew
3. Do not merge commentaries destructively
4. Do not flatten siman, seif, commentary, and segment hierarchy
5. Do not render hidden commentaries into the DOM unnecessarily
6. Do not create one giant corpus file
7. Do not create one giant HTML page
8. Do not discard commentary numbering
9. Do not discard dibbur hamatchil
10. Do not remove review flags
11. Do not hardcode commentary names throughout the UI
12. Use commentary registry IDs
13. Generate clean semantic HTML for listening mode
14. Store bookmarks locally
15. Keep the system offline-first

---

# 29. Definition of Done for First Working Version

The first working version is complete when:

- OC 253 can be loaded from existing parsed files
- Packager creates structured JSON
- Manifest is generated
- Corpus Inspector displays all seifim and commentaries
- Reader opens OC 253 by siman and seif
- User can toggle commentaries
- User can switch Hebrew, English, or Hebrew plus English
- User can save and restore bookmark
- User can export or open a clean HTML listening page
- Chrome can read the listening page in a sensible order
- Simple search finds Hebrew and English results

---

# 30. Final Design Philosophy

The project should treat Torah text as structured data, not as static documents.

The parsed files are the source of truth.

The DOCX is a review/export artifact.

The app should be mobile-first, offline-first, searchable, bookmarkable, and commentary-aware.

HTML is a first-class output target because listening matters.

The system should be designed so that one corpus can produce many experiences:

- mobile reader
- listening HTML
- review interface
- search database
- printable DOCX
- PDF
- future Android app

Build the corpus engine first. The reader and exports should flow naturally from it.
