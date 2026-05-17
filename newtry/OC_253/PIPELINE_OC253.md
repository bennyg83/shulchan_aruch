# OC 253 — extract by source, translate in place

## In-house dictionary (always)

Glossary normalization **always** reads the single file at the **workspace root**:

**`full_dictionary (1).md`**

(from `newtry/OC_253`, that is **`../../full_dictionary (1).md`**). There are **no** environment-variable or `--dictionary` overrides — update that markdown file to change project-wide terminology (aligned with OC 318 when both live under the same repo root).

## Step 1 — Extract

Writes **`output/<slug>/part-NNN.txt`**.

- **`mechaber/`** first — Shulchan Arukh + Rama from the main column (includes `{הגה: …}`).
- Other commentaries follow **first-appearance order** in the saved HTML (see **`output/manifest.json`** → **`sourceOrder`**).

Large sources split across multiple **`part-NNN.txt`** files (default max chunk **45000** characters).

**Important:** Extract only pulls Hebrew from the HTML and inserts an English **placeholder**. It does **not** machine-translate. English halakhic prose must be added manually (or by your own translation workflow) under **`**** ENGLISH ****`**.

```bash
cd newtry/OC_253
npm install
npm run extract
```

Options:

```bash
node extract_oc253_sources.mjs --out translated --max-chars 40000
node extract_oc253_sources.mjs "path\to\other.html"
```

## Step 2 — Translate

Edit **`**** ENGLISH ****`** under each **`**** OC253 SOURCE BLOCK ****`**. Keep Hebrew intact unless you intend to correct the source.

**Required:** after adding or editing English, run Step 3 so every translation uses the house glossary (same rule for human, AI-assisted, or imported drafts).

Optional: copy **`output/`** to **`translated/`** and work only there; point future tooling at **`translated/`** if you add merge scripts.

## Step 3 — Glossary pass (mandatory after English)

Normalizes Hebrew abbreviations and standard terms inside **English** paragraphs using **`full_dictionary (1).md`** only.

```bash
npm run apply:dictionary
```

Dry run:

```bash
node apply_dictionary_oc253.mjs --dry-run
```

## Block shape

Each unit:

```
**** OC253 SOURCE BLOCK ****
slug: …
seif: …
marker: …
**** HEBREW ****
…
**** ENGLISH ****
…
**** END BLOCK ****
```

## Dependency

**`cheerio`**

Optional HTML snapshot extract uses shared DOM helpers: **`../lib/parshan_dom_lib.mjs`**. Canonical Orach Chayim text for translation is Sefaria **`merged.json`** → **`rebuild-by-siman.mjs`** → **`seif-NNN.json`** (see `SOURCES_POLICY.md` at repo root).
