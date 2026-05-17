# Shulchan Aruch — translation flow (steps and resources)

This document describes the **end-to-end translation workflow** for Orach Chayim material in this repository: where files live, what each step does, and which tools apply. It is **not** tied to a single siman; each siman (or unit of work) typically has its own folder under `newtry/`.

---

## 1. What you are producing

- **Primary artifact:** plain-text block files under `newtry/<OC_NNN>/output/<commentary-slug>/part-NNN.txt`.
- Each block holds **Hebrew** (from the **Sefaria-shaped corpus** for OC 001 and other wired simanim; see **`SOURCES_POLICY.md`**) and **English** (human or assisted prose you add). Some simanim may still document optional legacy HTML extracts for migration only.
- **Machine extract does not translate.** It only splits sources and inserts English placeholders.

---

## 2. Canonical resources (workspace root and shared libs)

| Resource | Role |
|----------|------|
| **`full_dictionary (1).md`** (repo root) | Single **in-house glossary** for English normalization. There is **no** alternate path or env override; edit this file to change project-wide terms. Consumed by `halacha_dictionary_lib.mjs`. |
| **`newtry/OC_253/halacha_dictionary_lib.mjs`** | Loads the glossary table and applies **longest-first** replacements inside English paragraphs only. |
| **`newtry/lib/parshan_dom_lib.mjs`** | Shared **cheerio** helpers for parsing **legacy** HTML snapshots (markers, parshan blocks, slugs). Used only where a siman still ships an optional HTML extract path; canonical OC 001 Hebrew uses JSON bundles, not HTML. |
| **`cursor_translation_and_mapping_of_texts.md`** (repo root) | Long-form design notes, Sefaria paths, and narrative for wiring English into `simanim/…` and related tooling. |

Per-siman specifics (extract script name, `package.json` scripts, optional `TRANSLATION_QUEUE.md`) live **inside** that siman’s folder, e.g. `newtry/OC_001/`, `newtry/OC_253/`.

---

## 3. Per-siman layout (pattern)

```
newtry/OC_NNN/
  OC_NNN.html              # optional legacy HTML snapshot only (if that siman supports it)
  package.json             # npm scripts: extract, apply:dictionary, etc.
  extract_ocNNN_*.mjs      # name varies; OC 001 uses Sefaria bundle extract by default
  apply_dictionary_ocNNN.mjs
  ocNNN_block_lib.mjs      # OC 001 style; OC 253 may inline equivalent markers
  output/
    manifest.json          # source order, chunking metadata
    <slug>/part-001.txt    # one commentary (or mechaber) per slug folder
```

Large sources are split into multiple **`part-NNN.txt`** files (character limit is configurable on extract).

---

## 4. Phase A — Extract (Step 1)

**Goal:** Pull Hebrew from HTML into labeled blocks; set English to a **placeholder** until you translate.

**Typical commands** (adjust folder and script name to the siman you are working on):

```bash
cd newtry/OC_NNN
npm install
npm run extract
```

**Common options** (exact flags depend on the siman’s script; see that folder’s `PIPELINE_OC*.md`):

- Custom output directory: e.g. `--out translated`
- Chunk size: e.g. `--max-chars 45000`
- Alternate HTML: path to another export file

**Outputs to use:**

- **`output/manifest.json`** — order of sources (`sourceOrder`), which slugs exist, how many parts.
- **`output/<slug>/part-*.txt`** — the files you edit in Phase B.

**Block header variants** (must match the extract script for that siman):

- **OC 253–style:** `**** OC253 SOURCE BLOCK ****` … `**** END BLOCK ****`
- **OC 001–style:** `**** OC001 SOURCE BLOCK ****` … `**** END BLOCK ****`

Both use the same logical fields: `slug`, `seif`, optional `marker`, then `**** HEBREW ****` / `**** ENGLISH ****`.

---

## 5. Phase B — Translate (Step 2)

**Goal:** Replace placeholder English with real translation under **`**** ENGLISH ****`** only.

**Rules:**

1. **Do not change Hebrew** unless you are deliberately correcting the source text.
2. Keep block delimiters and metadata lines (`slug`, `seif`, `marker`) intact so parsers can round-trip the file.
3. If your siman uses the OC 001 default placeholder, replace the whole placeholder **sentence** with your English (do not leave the pending line in place).

**Optional aids:**

- A human-readable checklist **`TRANSLATION_QUEUE.md`** in the siman folder (when present) lists slugs or parts in recommended order.
- **`newtry/OC_001/tools/fill-placeholders-from-json.mjs`** — bulk fill from a JSON array of strings in block order (OC 001 family only; read the script header for usage).

---

## 6. Phase C — House dictionary (Step 3, mandatory after any English change)

**Goal:** Normalize abbreviations and standard terms **inside English** using **`full_dictionary (1).md`** only.

Run from **that siman’s** `newtry/OC_NNN` directory (script names vary):

```bash
npm run apply:dictionary:dry    # preview when available
npm run apply:dictionary        # write changes back into output/**/*.txt
```

Implementation reuses **`halacha_dictionary_lib.mjs`**; OC 001 wiring is in **`apply_dictionary_oc001.mjs`**, OC 253 in **`apply_dictionary_oc253.mjs`**. All apply **only** to English inside recognized blocks; Hebrew is left unchanged.

If the run reports **0 files updated**, the current English may already match the glossary, or no rows matched—still run this step after substantive edits so the tree stays consistent with house style.

---

## 7. Phase D — Optional downstream (corpus HTML, hooks, mobile)

These steps vary by branch of the project. They assume Phase C is done on the block files first.

**Design and command examples** (including import/wire scripts under `tools/`) are summarized in **`newtry/OC_001/PIPELINE_OC001.md`** and in depth in **`cursor_translation_and_mapping_of_texts.md`**.

At a high level:

1. **Commentary `he.html`** — `Orach_Chayim/tools/export-seif-hebrew.mjs` writes Hebrew from the per-seif JSON bundle (`layers.*`), i.e. the Sefaria-oriented corpus.
2. **Commentary `en.html`** — `Orach_Chayim/tools/import-oc001-english-to-seif-en.mjs` publishes OC001 block English into the same `simanim/…/seif-…/<slug>/` tree (merged rows → one `en.html` per commentary per seif). The mobile reader loads both files from this **Sefaria Pulls** layout. OC 001 block Hebrew in `newtry/OC_001/output/` is produced by **`extract_oc001_from_sefaria_bundle.mjs`** so it stays aligned with those layers.
3. **Mechaber inline hooks** — separate tooling may weave English into layered mechaber HTML without destroying hook markup.
4. **HTML glossary** — if you maintain `en.html` with a separate pass, use your existing **`apply-inhouse-dictionary-to-html.mjs`** / **`apply-inhouse-dictionary-safely.mjs`** (or equivalent) as documented near those scripts.
5. **Mobile slice** — manifest refresh and sync into `newtry/OC_Mobile/…` per your established npm workflow.

Treat Phase D as **siman-specific and path-sensitive**; always read the target script’s `--help` or header comments before running.

---

## 8. Dependency note

Extract and HTML tooling use **Node.js**, **npm**, and **`cheerio`** (declared in the siman’s `package.json`). No MongoDB; other project rules (e.g. PostgreSQL for unrelated apps) do not change this text pipeline.

---

## 9. Quick checklist (any siman)

1. [ ] `npm install` in `newtry/OC_NNN`
2. [ ] `npm run extract` (regenerate when HTML source changes)
3. [ ] Edit **`**** ENGLISH ****`** in `output/<slug>/part-*.txt` (Hebrew untouched)
4. [ ] `npm run apply:dictionary` (mandatory after English edits)
5. [ ] (Optional) Import / wire / mobile per `cursor_translation_and_mapping_of_texts.md` and local `PIPELINE_OC*.md`

For siman-local flags and one-liners, keep **`newtry/OC_NNN/PIPELINE_OCNNN.md`** as the short operational companion to this file.
