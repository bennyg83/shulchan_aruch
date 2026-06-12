# Branch: `eh-development`

**Volume:** Even HaEzer · **Path:** `newtry/EH_001` · **Simanim:** 1–178

## Purpose

EH translation, dictionary pass, and editorial cleanup. Does **not** deploy GitHub Pages.

## Setup

```bash
git checkout eh-development
cd newtry/EH_001
npm install
npm run libre:up
```

## Daily workflow

```bash
npm run pipeline:validate:quality
npm run translate:placeholders:libre -- --root output/siman_NNN   # if placeholders remain
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:pool:watch:assign   # multi-agent slots
```

Editorial agents: `pipeline/work/AGENT_WORKER_PROMPT.md`, `pipeline/work/COORDINATION.md`.

## PR rules

- Target: `eh-development`
- CI: `.github/workflows/sa-eh-quality-gate.yml`

## Publish (later, to `main`)

```bash
npm run publish:siman -- --siman N
```

→ `public/corpus/eh1/`

See also: `newtry/EH_001/BRANCH.md`, `PIPELINE_EH001.md`
