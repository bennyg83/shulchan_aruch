# YD 001 — Even HaEzer (mirror of OC_001)

**Plan:** `EH_EVEN_HAEZER_PLAN.md` (repo root).  
**Agent rules:** `CLAUDE.md`, `translation/EDITORIAL_RETRANSLATE.md`, `translation/COMMENTARIES.md`.  
**Coordinator:** `translation/COORDINATOR_AND_WORKERS.md`, `translation/MASTER_PIPELINE.md`.

Canonical Hebrew: `Sefaria Pulls/shulchan-arukh/Even_HaEzer/simanim/NNN/seif-MMM.json`.

---

## Layout (same as OC_001)

```
newtry/EH_001/
  CLAUDE.md                 # agent session init
  full_dictionary.md        # copy/symlink to repo glossary
  progress.log
  TRANSLATION_QUEUE.md      # npm run queue:generate
  output/siman_NNN/<slug>/part-*.txt
  translation/              # agent playbooks
  pipeline/                 # coordinator, sprint, orchestrator
  tools/                    # bootstrap, MT, scaffold
  docker/libretranslate/    # Hebrew→English MT
  cli_workspace/            # Claude Code cwd
```

---

## Step 1 — Bootstrap (done)

```bash
cd newtry/EH_001
npm run bootstrap:eh001-simanim -- --from 1 --to 178 --skip-existing
npm run pipeline:validate
npm run pipeline:structure-check
```

**402** simanim extracted; siman **169** skipped (bundle gap).

---

## Step 2 — Sefaria reader tree (per siman)

From `Sefaria Pulls/shulchan-arukh/Even_HaEzer`:

```bash
node tools/build-manifest-template-from-eh001.mjs --siman 1 --write-seif 1
node tools/prepare-translated-siman-slice.mjs --siman 1 --from 1 --to 14
```

Or: `npm run publish:prepare:siman1` from `EH_001`.

---

## Step 3 — Machine translation (Docker first pass)

```bash
cd newtry/EH_001
npm run libre:up
npm run libre:test
npm run translate:placeholders:libre -- --root output/siman_001
npm run apply:dictionary -- --root output/siman_001
```

---

## Step 4 — Editorial (Cursor workers or CLI)

```bash
set EH001_POOL_BACKEND=ide
npm run pipeline:pool:watch:assign
```

Open **4** agent chats using `translation/AGENT_SELF_LOOP_WORKER.md` (slots 1–4).

After each batch:

```bash
node pipeline/sprint-worker.mjs --siman N --part P --parts T
```

---

## Step 5 — Publish to `eh1` corpus

```bash
cd "Sefaria Pulls/shulchan-arukh/Even_HaEzer"
node tools/publish-eh-siman.mjs --siman 1 --skip-rebuild --skip-hebrew
```

Target: `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/eh1/simanN`.

Batch: `node tools/publish-mt-batch-to-web.mjs --from 1 --to 5 --min-translated 1`

---

## Step 6 — Re-scaffold pipeline from OC (if OC_001 pipeline changes)

```bash
node tools/scaffold-from-oc001.mjs
```

Copies core `pipeline/*.mjs` and `translation/*.md` with YD path rewrites (skips OC one-off `beer*.mjs` junk).

---

## Commentaries

All YD slugs and order: **`translation/COMMENTARIES.md`**.  
Per-siman manifest: **`output/siman_NNN/manifest.json`**.

---

## npm scripts (summary)

| Script | Purpose |
|--------|---------|
| `pipeline:structure-check` | Tooling + validate parity |
| `pipeline:validate` | Block structure |
| `pipeline:pool:watch:assign` | Coordinator (#5) |
| `translate:placeholders:libre` | Docker MT |
| `publish:siman` | One siman → eh1 corpus |
| `queue:generate` | Refresh TRANSLATION_QUEUE.md |
