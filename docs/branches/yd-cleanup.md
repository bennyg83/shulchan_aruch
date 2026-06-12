# Branch: `yd-cleanup`

**Volume:** Yoreh De'ah · **Path:** `newtry/YD_001` · **Simanim:** 1–403

## Purpose

Active editorial and quality cleanup for YD. Does **not** deploy GitHub Pages.

## Setup

```bash
git checkout yd-cleanup
cd newtry/YD_001
npm install
npm run libre:up    # optional local MT repair
```

## Daily workflow

```bash
npm run pipeline:validate:quality
npm run quality:worker:init -- --scope all --min-severity error --rescan
npm run quality:worker:next
# edit block per pipeline/work/quality-worker-prompt.md
npm run quality:worker:commit
```

Libre repair wave (phase 1 stragglers):

```bash
npm run quality:libre:wave -- --from N --to N --workers 4
```

## PR rules

- Target branch: `yd-cleanup`
- CI: `.github/workflows/sa-yd-quality-gate.yml`
- One siman or small batch per PR preferred

## Publish (later, to `main`)

```bash
npm run publish:siman -- --siman N
```

→ `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/`

See also: `newtry/YD_001/BRANCH.md`, `PIPELINE_YD001.md`
