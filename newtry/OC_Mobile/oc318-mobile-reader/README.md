# OC mobile reader (translated corpus slice)

**Desktop web reader:** see sibling app [`../oc-web-reader/`](../oc-web-reader/) (`npm run dev` on port 5174). Both apps read the same `public/corpus/oc1/` tree.

The UI follows the **mobile mock-up flow** you sketched: sticky reference strip for Mechaber/Rama, expandable preview, full Mechaber block, per-commentary collapsible cards with speaker buttons, **Play all (interwoven)** TTS queue, bottom **playback bar** (pause / stop), **day–night** theme, quick **א / A** language toggles, and a **filter drawer** for which commentaries appear. Data is not the OC 318 sample array; it is loaded from **`Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/…`** (synced into `public/corpus/…`): **`he.html`** comes from the per-seif JSON bundle export (`export-seif-hebrew.mjs`), and **`en.html`** is whatever was published into that same tree (e.g. OC001 block translations). Canonical Hebrew for this workspace follows **`SOURCES_POLICY.md`** (Sefaria-shaped bundles under `Sefaria Pulls/…`); this app does **not** load third-party Torah sites at runtime.

This Vite + React shell loads **only** sources listed in the canonical manifest next to each seif bundle, and lets you page through the whole siman:

`Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/001/seif-001/translated-sources-manifest.json` (template)

That file lists real translations (no placeholder-only English, no policy-skipped layers). Each entry’s `slug` is the folder name under the seif directory; `dataKey` is a stable snake_case id for app code or APIs.

## Sync into this app’s `public/` tree (siman 1, seif 1–9)

From this directory:

```bash
npm install
npm run sync:oc1-siman1
npm run dev
```

`sync:oc1-siman1` copies each seif’s manifest plus each listed source’s `he.html` and `en.html` into:

`public/corpus/oc1/siman1/seif-00N/<slug>/`

The React app reads them at `/corpus/oc1/siman1/seif-00N/...` and uses `/corpus/oc1/siman1/seif-index.json` for navigation.

You can also run the sync script directly (absolute paths work):

```bash
node "../../../Sefaria Pulls/shulchan-arukh/Orach_Chayim/tools/sync-translated-seif-to-public.mjs" ^
  --manifest "../../../Sefaria Pulls/shulchan-arukh/Orach_Chayim/simanim/001/seif-001/translated-sources-manifest.json" ^
  --out "public/corpus/oc1/siman1/seif-001"
```

(Use `^` line continuation in cmd, or one line in PowerShell / Git Bash.)

## Local static reader (no React)

Open `simanim/001/seif-001/view.html` via a static server from the `seif-001` folder. It loads the same manifest and only builds panels for listed sources.
