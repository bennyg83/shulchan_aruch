# Orach Chayim — project map, Sefaria sources, translation, and mobile corpus

This document ties together **where data lives**, **how it moves from Sefaria to the OC001 editor to the mobile reader**, and the **manifest-driven rule** for hiding commentaries with no Hebrew. It complements `newtry/OC_001/PIPELINE_OC001.md` (OC001 extract/translate/dictionary detail).

---

## 1. Project map (what lives where)

| Area | Path | Role |
|------|------|------|
| **Sefaria-shaped bundle (canonical Hebrew + JSON)** | `Sefaria Pulls/shulchan-arukh/Orach_Chayim/` | `mechaber/merged.json`, `commentaries/*/merged.json`, `simanim/NNN/` per siman (`meta.json`, `seif-NNN.json`, exported `seif-NNN/<slug>/he.html`). **Only Sefaria tree is the source of Hebrew slices** for this workflow. |
| **Rebuild / export tools** | `Sefaria Pulls/shulchan-arukh/Orach_Chayim/tools/` | `rebuild-by-siman.mjs`, `export-seif-hebrew.mjs`, `import-oc001-english-to-seif-en.mjs`, `wire-mechaber-en-hooks-oc001.mjs`, `publish-oc-siman.mjs`, `prepare-mobile-oc-simanim.mjs`, `sync-translated-siman-to-public.mjs`, **`annotate-manifest-include-in-reader.mjs`** (sets `includeInReader` per slug from Hebrew presence). |
| **OC001 editorial (translations)** | `newtry/OC_001/output/` (siman 1 flat) and `newtry/OC_001/output/siman_NNN/` (siman 2+) | `extract_oc001_from_sefaria_bundle.mjs` writes `part-*.txt` blocks; you edit English under `**** ENGLISH ****`. |
| **House dictionary (single glossary)** | Repo root `full_dictionary (1).md` | Normalized via `newtry/OC_001/apply_dictionary_oc001.mjs` on OC001 `.txt` only; HTML passes use `apply-inhouse-dictionary*.mjs` under `Orach_Chayim/tools/` when needed. |
| **Mobile reader corpus** | `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1/simanN/` | Static `seif-NNN/<slug>/he.html`, `en.html`, `translated-sources-manifest.json`, plus `catalog.json` and `seif-index.json`. **Vite serves this** in dev and copies into `dist/` on build. |
| **Mobile reader app** | `newtry/OC_Mobile/oc318-mobile-reader/` | Phone-oriented UI, TTS, collapsible cards. `npm run dev` (port 5173). |
| **Web reader app** | `newtry/OC_Mobile/oc-web-reader/` | Desktop browser UI (siman sidebar, seif list, side-by-side Hebrew/English). **Shares the same `public/corpus`** via Vite `publicDir`. `npm run dev` (port **5174**). URL: `?siman=308&seif=1`. |
| **Reader app logic** | `newtry/OC_Mobile/oc318-mobile-reader/src/` (imported as `@shared` in web reader) | `corpus.js` loads manifest + HTML; **`includeInReader: false`** skips a commentary entirely (no fetch, no pills). Heuristic empty checks remain as a safety net. |

---

## 2. Sources policy (Sefaria only)

See also **`SOURCES_POLICY.md`** (repository root).

- **Hebrew** for mechaber/rama and commentaries is produced from the **Sefaria** bundle under `Orach_Chayim/simanim/NNN/` (export scripts), not from third-party HTML snapshots, unless you explicitly opt into a legacy path documented elsewhere.
- **English** for commentaries flows **OC001 blocks → import** into `en.html` per slug; **mechaber** uses `wire-mechaber-en-hooks-oc001.mjs` into layered HTML in `seif-NNN.json` / hooks.

---

## 3. Bulk but safe translation workflow

1. **Extract** (per siman, all se’ifim): from `newtry/OC_001`, `npm run extract` or explicit `node extract_oc001_from_sefaria_bundle.mjs --siman N --from 1 --to K --bundle-root "<Orach_Chayim>/simanim" --out-subdir siman_NNN`.
2. **Translate** only inside `**** ENGLISH ****` in `output/siman_NNN/<slug>/part-*.txt` (keep Hebrew markers intact). See `newtry/OC_001/TRANSLATION_QUEUE.md` and `PIPELINE_OC001.md`.
3. **House dictionary (mandatory)** before publish:
   - `npm run apply:dictionary -- --root output/siman_NNN` (from `newtry/OC_001`).
   - Use `npm run apply:dictionary:dry` first to preview.
4. **Publish one siman** (from `Orach_Chayim` root):  
   `node tools/publish-oc-siman.mjs --siman N`  
   (optional `--skip-rebuild`, `--skip-hebrew`, `--skip-extract`, dictionary skips as in script help).  
   This runs OC001 glossary, English import, mechaber wire, optional HTML dictionary, and **sync to `public/corpus/oc1/simanN`**.
5. **Premap / visibility (new)** — after Hebrew export + sync, or whenever slices change:  
   `node tools/annotate-manifest-include-in-reader.mjs --siman N`  
   Sets each commentary row’s **`includeInReader`** from substantive **Hebrew** in that seif’s `he.html` (see §4). Re-run publish or sync if you patched **Sefaria** `simanim/NNN` manifests only.

**Safety:** default publish skips `--extract` so OC001 translated `.txt` files are not overwritten. Use `--extract` only when you intend to refresh blocks from JSON.

---

## 4. Manifest premap: `includeInReader` (no Hebrew → hide)

**Product rule (deliberate):** if a commentary has **no substantive Hebrew** for that seif, it must **not** appear in the app (no empty cards). English-only rows do not count.

**Implementation:**

- Each `translated-sources-manifest.json` entry under `sources[]` may include **`includeInReader`: boolean**.
- **`true` or omitted** — commentary is eligible (reader still applies language toggles and segment heuristics).
- **`false`** — `corpus.js` **does not fetch** that slug; it never appears in pills or body.
- **`mechaber`** is always treated as visible.

**Tool:** `Orach_Chayim/tools/annotate-manifest-include-in-reader.mjs`

- Scans every `seif-*/translated-sources-manifest.json` under the Sefaria siman folder and/or the mobile `public/.../simanN` folder (see `--no-sefaria` / `--no-public`).
- For each non-mechaber source, reads `seif-NNN/<slug>/he.html` next to that manifest, computes substantive Hebrew using the same helper as the reader (`htmlHasLetterOrDigit` from `corpus.js`), and writes `includeInReader`.

This keeps the **reader dumb**: it only honors the flag + fetches listed slugs; it does not need to infer Sefaria coverage.

---

## 5. One-command bulk prep (simanim 2–20)

From `Orach_Chayim`:

`node tools/prepare-mobile-oc-simanim.mjs --from 2 --to 20`

Rebuilds slices, exports Hebrew, ensures manifests, OC001 extract, import English, wire mechaber, sync to public. Add `--apply-dictionary` if you want per-seif HTML dictionary on `en.html` (slower). After a slice refresh, run **`annotate-manifest-include-in-reader.mjs`** per siman (or extend automation later).

---

## 6. Operational checklist (per siman)

1. `meta.json` present under `simanim/NNN/` with correct `seif_count`.
2. `publish-oc-siman.mjs --siman N` (or full `prepare-mobile-oc-simanim` for first-time mass prep).
3. `annotate-manifest-include-in-reader.mjs --siman N` on **Sefaria** and **public** trees as needed.
4. `npm run build` inside `oc318-mobile-reader` before shipping `dist/`.
5. Ensure `public/corpus/oc1/catalog.json` lists the siman entry.

---

## 7. Related files

- `newtry/OC_001/PIPELINE_OC001.md` — OC001 extract / translate / dictionary commands.
- `newtry/OC_Mobile/oc318-mobile-reader/scripts/validate-corpus-empty-rules.mjs` — regression checks for empty HTML / segment rules.
- `cursor_translation_and_mapping_of_texts.md` — long-form design and mapping notes (including hooks vs flat `en.html`).

---

## 8. Changelog (this document)

- **2026-05-12** — Added manifest `includeInReader` policy, `annotate-manifest-include-in-reader.mjs`, and end-to-end map for Sefaria → OC001 → public → reader.
