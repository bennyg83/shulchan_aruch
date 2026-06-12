# YD001 on branch `yd-cleanup`

| | |
|--|--|
| **Git branch** | `yd-cleanup` |
| **Central docs** | [`docs/SHULCHAN_ARUCH_MULTISECTION.md`](../../docs/SHULCHAN_ARUCH_MULTISECTION.md) |
| **Branch guide** | [`docs/branches/yd-cleanup.md`](../../docs/branches/yd-cleanup.md) |
| **Pipeline** | [`PIPELINE_YD001.md`](PIPELINE_YD001.md) |
| **Agent prompt** | [`pipeline/work/AGENT_WORKER_PROMPT.md`](pipeline/work/AGENT_WORKER_PROMPT.md) |
| **Coordination** | [`pipeline/work/COORDINATION.md`](pipeline/work/COORDINATION.md) |

## Commands

```bash
cd newtry/YD_001
npm install
npm run pipeline:validate:quality
npm run quality:worker:init -- --scope all --min-severity error --rescan
npm run quality:worker:next
npm run quality:libre:wave -- --from 1 --to 403 --workers 4
```

## Mobile target

Published simanim → `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/yd1/`
