# Branch: `yd-cleanup`

**Volume:** Yoreh De'ah · **Path:** `newtry/YD_001` · **Simanim:** 1–403

## Purpose

Active editorial and quality cleanup for YD. Does **not** deploy GitHub Pages.

**Cloud-first:** editorial in Cursor Cloud Agents; GitHub Actions for scan + batch prep.

## Setup (local — optional)

```bash
git checkout yd-cleanup
cd newtry/YD_001
npm install
```

## Cloud workflow

1. **GitHub Actions → YD cloud prep** (weekly Monday 06:00 UTC, or manual) — quality report + batch artifacts
2. **Cursor Cloud Agent** on `yd-cleanup` — see `newtry/YD_001/pipeline/work/CLOUD_AGENTS.md`
3. Agent PRs to `yd-cleanup`; you merge on GitHub

```bash
# Regenerate batches inside a cloud agent VM:
npm run pipeline:cloud:prep -- --siman 110 --parts 2
```

## CI

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `sa-yd-quality-gate.yml` | push/PR | Block format validation |
| `sa-yd-cloud-prep.yml` | schedule + manual | Quality scan + agent batch files |

## PR rules

- Target branch: `yd-cleanup`
- Branch name: `yd/cleanup-siman-NNN-partXofY`
- One siman part per PR preferred

## Publish (later, to `main`)

```bash
npm run publish:siman -- --siman N
```

→ `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/`

See also: `newtry/YD_001/BRANCH.md`, `PIPELINE_YD001.md`
