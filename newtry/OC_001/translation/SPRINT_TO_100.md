# Sprint to siman 100 — coordinator playbook

**Goal:** Editorial complete through siman **100**. Keep **4 local subagents** always claimed.

## Standing loop (parent coordinator)

1. `node pipeline/orchestrator.mjs assign --workers 4`
2. For each claimed unit: `node pipeline/build-editorial-siman-batch.mjs --siman N --part P --parts T`
3. Launch **4** `generalPurpose` subagents (one per unit) using `translation/AGENT_SPRINT_WORKER.md`
4. When subagents complete → repeat from step 1
5. On siman with **0** remaining: `npm run pipeline:editorial:loop -- finish-siman --siman N`
6. Every **5** finished simanim after publish 40: `npm run pipeline:orchestrator:sync` (pushes corpus + Pages at 50, 60, …)

## Worker finish checklist (each unit)

```bash
cd newtry/OC_001
# edit blocks per batch .md
npm run apply:dictionary -- --root output/siman_NNN
node pipeline/sync-queue-from-output.mjs pipeline/work/editorial-queue-siman-NNN*.json
node pipeline/sprint-worker.mjs --siman N --part P --parts T
```

## Status

```bash
node pipeline/orchestrator.mjs status
node -e "import{s}from'./pipeline/lib/editorial-state.mjs';..."  # or editorial-loop status
```

## Parallel: slave cleanup 10–20

`npm run pipeline:slave:cleanup` — does not block sprint to 100.
