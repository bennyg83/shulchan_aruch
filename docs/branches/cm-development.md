# Branch: `cm-development`

**Volume:** Choshen Mishpat · **Path:** `newtry/CM_001` · **Simanim:** 1–427

## Purpose

CM translation, dictionary pass, and editorial cleanup. Does **not** deploy GitHub Pages.

## Setup

```bash
git checkout cm-development
cd newtry/CM_001
npm install
npm run libre:up
```

## Daily workflow

```bash
npm run pipeline:validate:quality
npm run translate:placeholders:libre -- --root output/siman_NNN
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:pool:watch:assign
```

Editorial agents: `pipeline/work/AGENT_WORKER_PROMPT.md`, `pipeline/work/COORDINATION.md`.

## PR rules

- Target: `cm-development`
- CI: `.github/workflows/sa-cm-quality-gate.yml`

## Publish (later, to `main`)

```bash
npm run publish:siman -- --siman N
```

→ `public/corpus/cm1/`

See also: `newtry/CM_001/BRANCH.md`, `PIPELINE_CM001.md`
