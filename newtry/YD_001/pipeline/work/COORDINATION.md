# YD001 coordination — branch `yd-cleanup`

**Cloud playbook:** [`CLOUD_AGENTS.md`](CLOUD_AGENTS.md) · **Worker rules:** [`AGENT_WORKER_PROMPT.md`](AGENT_WORKER_PROMPT.md)

Claim **one** row: set status `IN_PROGRESS`, your agent ID, open PR branch from table. Mark `DONE` when PR merged.

| Status | Agent | Siman / unit | Batch file | PR branch |
|--------|-------|--------------|------------|-----------|
| DONE | yd001-cloud-singleton-f6d2 | 110 | parts 1–7/7 | `yd/cleanup-siman-110-part1of7-f6d2` |
| DONE | yd001-cloud-singleton-f6d2 | 84 | parts 1–5/5 | `yd/cleanup-siman-084-f6d2` |
| DONE | yd001-cloud-singleton-f6d2 | 228 | parts 1–5/5 | `yd/cleanup-siman-228-f6d2` |
| DONE | yd001-cloud-singleton-f6d2 | 98 | parts 1–5/5 | `cursor/cleanup-siman-098-f6d2` |
| DONE | yd001-cloud-singleton-f6d2 | 331 | parts 1–5/5 | `cursor/cleanup-siman-331-f6d2` |
| DONE | yd001-cloud-singleton-f6d2 | 108 | seif-by-seif | `cursor/cleanup-siman-108-f6d2` |
| READY | | 98 part 1of2 | `batch-editorial-siman-098-part1of2.md` | `yd/cleanup-siman-098-part1of2` |
| READY | | 98 part 2of2 | `batch-editorial-siman-098-part2of2.md` | `yd/cleanup-siman-098-part2of2` |
| READY | | 108 part 1of2 | `batch-editorial-siman-108-part1of2.md` | `yd/cleanup-siman-108-part1of2` |
| READY | | 108 part 2of2 | `batch-editorial-siman-108-part2of2.md` | `yd/cleanup-siman-108-part2of2` |
| READY | | 99 part 1of2 | `batch-editorial-siman-099-part1of2.md` | `yd/cleanup-siman-099-part1of2` |
| READY | | 99 part 2of2 | `batch-editorial-siman-099-part2of2.md` | `yd/cleanup-siman-099-part2of2` |
| READY | | 228 part 1of2 | `batch-editorial-siman-228-part1of2.md` | `yd/cleanup-siman-228-part1of2` |
| READY | | 228 part 2of2 | `batch-editorial-siman-228-part2of2.md` | `yd/cleanup-siman-228-part2of2` |
| READY | | 331 part 1of2 | `batch-editorial-siman-331-part1of2.md` | `yd/cleanup-siman-331-part1of2` |
| READY | | 331 part 2of2 | `batch-editorial-siman-331-part2of2.md` | `yd/cleanup-siman-331-part2of2` |
| DONE | | 201 | — | — |

Regenerate batches + ranking: `npm run pipeline:cloud:prep` or GitHub Action **YD cloud prep**.
