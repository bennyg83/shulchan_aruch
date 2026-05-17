# OC 001 — extract by source, translate in place

**Project-wide map (Sefaria → OC001 → mobile, manifest flags, dictionary):** see **`OC_ORACH_CHAYIM_PIPELINE.md`** at the repository root.

All artifacts live under `newtry/OC_001/` (`output/`, tools). Canonical Hebrew comes from the **Sefaria-shaped** per-seif bundles under `Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/` (see **`SOURCES_POLICY.md`** at the repo root).

## Step 1 — Separate commentaries (extract)

Reads **`simanim/001/seif-NNN.json`** (via `--bundle-root`), writes **`output/<slug>/part-NNN.txt`** with labeled blocks (`**** OC001 SOURCE BLOCK ****`). Hebrew only; English is a fixed placeholder until you translate.

```bash
cd newtry/OC_001
npm install
npm run extract
```

That runs **`extract_oc001_from_sefaria_bundle.mjs`** for siman 1, seifim 1–9 (override with explicit `node …` flags).

Options:

```bash
node extract_oc001_from_sefaria_bundle.mjs --siman 1 --from 1 --to 9 --out output --max-chars 45000
node extract_oc001_from_sefaria_bundle.mjs --siman 1 --from 1 --to 9 --bundle-root "C:\path\to\Sefaria Pulls\shulchan-arukh\Orach_Chayim"
```

Legacy HTML snapshot extract (optional, not canonical):

```bash
npm run extract:legacy-html
```

Order and block counts: **`output/manifest.json`**. Human-readable order: **`TRANSLATION_QUEUE.md`**.

## Step 2 — Translate (one commentary at a time)

Follow **`TRANSLATION_QUEUE.md`**. Replace text under **`**** ENGLISH ****`** only (keep **`**** HEBREW ****`** intact).

Placeholder line (do not remove):

`English translation pending — replace after editing this block (keep Hebrew above intact).`

Optional bulk replace: `tools/fill-placeholders-from-json.mjs` + JSON array of strings in file order.

**Every English edit must then pass Step 3** so terminology matches the house glossary (no exceptions).

## Step 3 — House dictionary (mandatory on all English)

All OC 001 English—including assisted or pasted drafts—is normalized with the **single** workspace glossary:

**`full_dictionary (1).md`** (repository root). Same rules as OC 253: no alternate dictionary paths.

Run from `newtry/OC_001` after adding or changing translations:

```bash
npm run apply:dictionary:dry   # preview
npm run apply:dictionary       # write normalized English into output/**/*.txt
npm run apply:dictionary -- --root output/siman_002   # only siman 2 editorial tree (after multi-siman extract)
npm run apply:dictionary -- --simanim 32,128,301      # several simanim in one run (under output/)
```

**Translation pending vs dictionary pending:** Checklist “pending” (`npm run pipeline:refresh`) means English still starts with `English translation pending…`. Real English that the glossary would still normalize does **not** show as checklist pending. To list those files, dry-run the dictionary with a report file:

```bash
npm run apply:dictionary:dry -- --root output --report checklist-output/dictionary-would-update.txt
```

(Writes one path per line under `newtry/OC_001/`, or an empty file if nothing would change.)

Implementation: **`apply_dictionary_oc001.mjs`** (only touches **`**** ENGLISH ****`** inside OC001 blocks; Hebrew unchanged).

### Siman 2+ — one-command publish (after translating `output/siman_NNN/`)

From **`Sefaria Pulls/shulchan-arukh/Orach_Chayim`**:

`node tools/publish-oc-siman.mjs --siman 2`

Runs rebuild + Hebrew export + manifest (unless `--skip-rebuild` / `--skip-hebrew`), **skips re-extract by default** (use `--extract` only when you intend to refresh blocks from the bundle), OC001 glossary on `output/siman_NNN`, `import-oc001-english-to-seif-en.mjs`, `wire-mechaber-en-hooks-oc001.mjs`, per-seif HTML glossary, and **`sync-translated-siman-to-public.mjs`** into `oc318-mobile-reader/public/corpus/oc1/simanN`.

## Dependencies

- **`extract_oc001_from_sefaria_bundle.mjs`** reads JSON only (no HTML parser).
- **`extract_oc001_from_html_legacy.mjs`** uses **`../lib/parshan_dom_lib.mjs`** (Cheerio helpers for legacy HTML snapshots only).
- **`package.json`** provides local `cheerio` for legacy extract.

## Sprint automation (queue → batch → validate → checkpoint)

From **`newtry/OC_001`**:

| Command | Purpose |
|--------|---------|
| `npm run pipeline:sprint` | Runs `sa-checklist.mjs`, builds `pipeline/work/queue.json` from high-pending siman/slug pairs, writes **`pipeline/work/batch-latest.md`** for Cursor (full blocks + stable ids). |
| `npm run pipeline:sprint:pending-simanim` | Refreshes checklist, selects **simanim with pending > 0** (sorted by pending), then for each siman writes **`pipeline/work/queue-siman-NNN.json`** + **`batch-siman-NNN.md`** and a **`sprint-by-siman-manifest.json`** summary. Use flags via `node pipeline/sprint-pending-simanim.mjs -- --max-simanim 15 --max-blocks 40`. |
| `npm run pipeline:refresh` | Regenerate `checklist-output/` only. |
| `npm run pipeline:queue` | Rebuild queue only (see `node pipeline/queue-next.mjs --help` via source for flags: `--max-blocks`, `--siman`, `--slug`, `--full-scan`). |
| `npm run pipeline:batch` | Rebuild `batch-latest.md` from current `queue.json`. |
| `npm run pipeline:validate` | Structural checks on `output/` (or add `-- --from-queue` to check only files referenced in the queue). Use `-- --from-queue --strict-pending` only when every block in those files must be translated (whole-file gate). |
| `npm run pipeline:mark-done` | Append completed block ids to `pipeline/work/state.json` so the next queue skips them (`-- --file ids-done.txt` or `-- --ids "…"`). |

House prompts live in **`translation/STYLE.md`** and **`translation/GLOSSARY.json`** (optional hints; canonical terms remain the repo **full_dictionary** per Step 3).

### Machine translation (optional) — LibreTranslate (local Docker)

Self-hosted LibreTranslate avoids public API rate limits (Google 429, Lingva 523). Requires **Docker Desktop**.

```bash
cd newtry/OC_001
npm run libre:up          # first start downloads en/he models (several minutes)
npm run libre:logs        # watch until healthy
npm run libre:test        # Hebrew → English smoke test on http://localhost:5000
```

`--backend libre` defaults to **`http://localhost:5000`** (local Docker). Optional override:

```powershell
$env:LIBRE_URL = "http://localhost:5000"
```

In **cmd.exe** (not PowerShell): `set LIBRE_URL=http://localhost:5000` — do not use `$env:...` there.

| Command | Purpose |
|--------|---------|
| `npm run translate:placeholders:libre` | MT via local Libre only (`--ms 800` between blocks) |
| `npm run translate:placeholders:auto` | Tries chain; includes `libre` when `LIBRE_URL` is set |
| `npm run libre:down` | Stop container (models kept in Docker volume) |

Example (one siman, dry run first):

```bash
node tools/translate-oc001-pending-mymemory.mjs --backend libre --root output/siman_308 --dry-run
node tools/translate-oc001-pending-mymemory.mjs --backend libre --root output/siman_308 --ms 800
```

Copy **`libretranslate.env.example`** → **`libretranslate.env`** for reference (not loaded automatically). See **`docker/libretranslate/docker-compose.yml`**.

## Next pipeline stages (later)

Merging into one `OC_001_very_full.txt` / DOCX can mirror `newtry/OC_253/tools/` once translations exist.

## Sefaria corpus (Orach Chayim): OC_001 English into `simanim/…/en.html`

Design notes and the OC 001 narrative (including Siman 1) live in the workspace root: **`cursor_translation_and_mapping_of_texts.md`** (OC_001 section from roughly line 2640 onward).

### Marker mapping (Sefaria bundle) vs. what each tool does

The per-seif JSON (**`simanim/NNN/seif-NNN.json`**) already carries **Sefaria-aligned anchor data**:

- **`hooks`** — one object per empty `<i data-commentator="…" data-label="…" data-order="…"></i>` in **`layers.mechaber.html`** (see `tools/rebuild-by-siman.mjs` / `extractHooks`). That is the canonical map of “which commentary note sits where” in the mechaber line, including **letter labels** (e.g. Be’er HaGolah א / ב) where Sefaria provides them.
- **Mechaber + English** — your intended flow (“translate, then layer”) is implemented by **`wire-mechaber-en-hooks-oc001.mjs`**: it keeps the hook tags and splices OC001 English into the same structure.

**Commentaries** are different in this repo today: each commentary has a **`layers["…"]`** slice in the same JSON, but the mobile / `view.html` path also uses **flat** `seif-…/<slug>/he.html` and `en.html`. **`import-oc001-english-to-seif-en.mjs`** publishes English into those files and **merges** all OC001 rows for that seif into **one** `en.html` per slug. It does **not** (yet) push English back through **`hooks`** or emit one file per `data-label` / `data-order`. So OC001 **`marker: א`** in `beer-hagolah` blocks is still the right *conceptual* join key to **`hooks`** where `commentator` + `label` match, but the flat import step does not use that join automatically—only the mechaber wiring does.

After Step 3 (house dictionary on `output/**/*.txt`):

1. **Hebrew slices (`he.html`):** from `Orach_Chayim` root, export from the Sefaria-shaped bundle (not AlHaTorah):

   `node tools/export-seif-hebrew.mjs --siman 1 --seif 1` (repeat per seif, or use `prepare-translated-siman-slice.mjs` which calls this).

2. **English slices (`en.html`):** publish OC001 block translations **into** the same corpus tree (Sefaria Pulls paths — what the app loads):

   `node tools/import-oc001-english-to-seif-en.mjs --siman 1 --from 1 --to 9`

   Skips **`mechaber`** (use `wire-mechaber-en-hooks-oc001.mjs`). Merges all OC001 English rows for that seif into one `en.html`. Does **not** write `he.html`; Hebrew stays from step 1 (`layers` in `seif-NNN.json`).

3. **Mechaber (hooks preserved):** weave OC_001 English into `layers.mechaber.html` from `seif-NNN.json`:

   `node tools/wire-mechaber-en-hooks-oc001.mjs --siman 1 --from 1 --to 9`

   Then run your usual **`apply-inhouse-dictionary-to-html.mjs`** / **`apply-inhouse-dictionary-safely.mjs`** on the updated `en.html` files if needed.

4. **Mobile slice:** `prepare-translated-siman-slice.mjs` (use **`--refresh-manifest`** when adding sources), then sync into `newtry/OC_Mobile/…` per your existing npm scripts.
