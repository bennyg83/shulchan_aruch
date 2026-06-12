# CM001 on branch `cm-development`

| | |
|--|--|
| **Git branch** | `cm-development` |
| **Central docs** | [`docs/SHULCHAN_ARUCH_MULTISECTION.md`](../../docs/SHULCHAN_ARUCH_MULTISECTION.md) |
| **Branch guide** | [`docs/branches/cm-development.md`](../../docs/branches/cm-development.md) |
| **Pipeline** | [`PIPELINE_CM001.md`](PIPELINE_CM001.md) |
| **Agent prompt** | [`pipeline/work/AGENT_WORKER_PROMPT.md`](pipeline/work/AGENT_WORKER_PROMPT.md) |

## Commands

```bash
cd newtry/CM_001
npm install
npm run libre:up
npm run pipeline:validate:quality
npm run translate:placeholders:libre -- --root output/siman_NNN
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:pool:watch:assign
```

## Mobile target

`newtry/OC_Mobile/oc318-mobile-reader/public/corpus/cm1/`
