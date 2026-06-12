# YD001 coordination — branch `yd-cleanup`

Claim **one** row: set status `IN_PROGRESS`, your agent ID, siman/batch. Mark `DONE` when PR merged.

| Status | Agent | Siman / batch | Notes |
|--------|-------|---------------|-------|
| READY | | 110 | Highest error count |
| READY | | 84 | |
| READY | | 98 | |
| READY | | 108 | |
| READY | | 99 | |
| DONE | | 201 | 0 errors |

**Worker prompt:** [`AGENT_WORKER_PROMPT.md`](AGENT_WORKER_PROMPT.md)

**After batch:** `npm run apply:dictionary -- --root output/siman_NNN` · validate · open PR to `yd-cleanup`.
