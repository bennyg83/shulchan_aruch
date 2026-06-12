# YD001 on branch `yd-cleanup`

| | |
|--|--|
| **Git branch** | `yd-cleanup` |
| **Central docs** | [`docs/SHULCHAN_ARUCH_MULTISECTION.md`](../../docs/SHULCHAN_ARUCH_MULTISECTION.md) |
| **Branch guide** | [`docs/branches/yd-cleanup.md`](../../docs/branches/yd-cleanup.md) |
| **Pipeline** | [`PIPELINE_YD001.md`](PIPELINE_YD001.md) |
| **Cloud agents** | [`pipeline/work/CLOUD_AGENTS.md`](pipeline/work/CLOUD_AGENTS.md) |
| **Agent prompt** | [`pipeline/work/AGENT_WORKER_PROMPT.md`](pipeline/work/AGENT_WORKER_PROMPT.md) |
| **Coordination** | [`pipeline/work/COORDINATION.md`](pipeline/work/COORDINATION.md) |

## Cloud-first workflow

```bash
# GitHub: Actions → "YD cloud prep" (weekly + manual) uploads batches + quality report
# Cursor Cloud Agent on branch yd-cleanup — see pipeline/work/CLOUD_AGENTS.md
```

```bash
cd newtry/YD_001
npm install
npm run pipeline:cloud:prep -- --top 10 --parts 2
npm run pipeline:validate:quality
```

## Mobile target

Published simanim → `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/`
