# OC 318 — Mobile corpus (packaged JSON)

This folder follows [docs/torah_corpus_reader_cursor_spec.md](./docs/torah_corpus_reader_cursor_spec.md): **parsed / merged text is the source of truth**, not DOCX.

## Inputs

- Default merged file: `../../newtryoutput/oc_318_very_full.txt` (built by `newtry/newtryoutput/build_oc318_very_full.mjs`).

Override:

```bash
node pipeline/packager/package-oc318.mjs --input "C:/path/to/oc_318_very_full.txt"
```

## Outputs

- `data/corpus/orach_chaim/318/seif_XXX.json` — one file per seif (structured bands + `OC 318 ·` blocks with split Hebrew / English).
- `data/manifests/orach_chaim_318_manifest.json` — navigation manifest.
- `exports/listening-html/oc318/` — optional semantic HTML for Chrome read-aloud (`--html`).

## Commands

No npm dependencies are required. From this folder:

```bash
npm run package
npm run package:dry
node pipeline/packager/package-oc318.mjs --html
```

## Next steps (not in this MVP)

- FlexSearch index generation, Dexie bookmarks, and the React/Vite reader app live outside this packager; wire manifests once the app scaffold exists.
