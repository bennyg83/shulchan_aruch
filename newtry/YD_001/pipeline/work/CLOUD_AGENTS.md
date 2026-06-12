# YD001 — Cursor cloud agents (no local machine)

**Branch:** `yd-cleanup` · **Repo:** `bennyg83/shulchan_aruch`

Editorial work runs in **Cursor Cloud Agents** (or any cloud VM). Your laptop only coordinates PRs.

---

## Division of labor

| Layer | Where | What |
|-------|-------|------|
| **GitHub Actions** | `sa-yd-quality-gate.yml` | Block format on every push/PR |
| **GitHub Actions** | `sa-yd-cloud-prep.yml` | Weekly + manual quality scan + batch artifacts |
| **Cloud agent** | Cursor | Retranslate English from Hebrew, dictionary, PR |
| **Local** | Optional | Review/merge PRs only |

**Do not** run LibreTranslate waves on your laptop unless you explicitly want a tactical MT repair.

---

## Start a cloud agent

1. **New Cloud Agent** → repo `bennyg83/shulchan_aruch` → branch **`yd-cleanup`**
2. Paste the prompt below (fill in siman + part).
3. Agent opens PR → you merge on GitHub.

### Worker prompt (copy/paste)

```
You are a YD001 editorial cloud worker on branch yd-cleanup.

Read first:
- newtry/YD_001/pipeline/work/AGENT_WORKER_PROMPT.md
- newtry/YD_001/full_dictionary.md
- newtry/YD_001/translation/EDITORIAL_RETRANSLATE.md

Assignment: siman SIMAN_NNN part PART of PARTS

Steps:
1. cd newtry/YD_001 && npm ci
2. npm run pipeline:cloud:prep -- --siman SIMAN_NNN --parts PARTS --min-severity error
3. Open pipeline/work/batch-editorial-siman-NNN-partXofY.md
4. For each block: edit output/... part files — replace **** ENGLISH **** only from Hebrew
5. npm run apply:dictionary -- --root output/siman_NNN
6. node pipeline/validate-quality-yd001.mjs --root output/siman_NNN --min-severity error --fail-on error
7. git checkout -b yd/cleanup-siman-NNN-partXofY
8. Commit only output/siman_NNN/ changes. PR to yd-cleanup.

Mark your row IN_PROGRESS then DONE in pipeline/work/COORDINATION.md in the same PR.
Do not ask for permission between blocks. Finish the full batch.
```

Replace `SIMAN_NNN`, `PART`, `PARTS`, and batch filename zeros.

---

## Claim work

Open [`COORDINATION.md`](COORDINATION.md). Pick a **READY** row, set **IN_PROGRESS** + your agent id.

Or download the latest **yd-cloud-prep** artifact from [Actions](https://github.com/bennyg83/shulchan_aruch/actions/workflows/sa-yd-cloud-prep.yml) and use `cloud-manifest.json` units.

---

## PR rules

- Target: **`yd-cleanup`**
- Branch name: `yd/cleanup-siman-110-part1of2` (see manifest)
- CI must pass block format; quality errors on untouched simanim are OK
- One siman (or one part) per PR preferred

---

## After merge

Coordinator (human or scheduled Action) re-runs cloud prep; completed simanim drop off the ranked list when errors reach 0.
