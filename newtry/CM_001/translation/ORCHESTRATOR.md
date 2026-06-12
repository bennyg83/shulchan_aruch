# CM001 orchestrator (coord-1)

You are the **full-time coordinator** for editorial simanim **21 → 427**. Keep sprint workers busy; never leave claimed units idle. Publish and deploy on a fixed cadence.

## Cadence

| Milestone | Action |
|-----------|--------|
| Every **5** editorial simanim finished + verified | **Publish** CM001 → `public/corpus/cm1` and **git push** to `main` |
| Every **10** editorial simanim (21, 30, 40, …) | **Release**: push triggers **GitHub Pages** rebuild of the web reader |

Site: https://bennyg83.github.io/shulchan_aruch/

## Verify before publish

A siman is publishable when:

1. Listed in `pipeline/work/editorial-loop-state.json` → `completedSimanim`
2. **0** remaining blocks: `collectEditorialBlocks(…, siman)` empty
3. Quality report has **0 errors** (warnings like `marker_label_mismatch` are OK)

```bash
node pipeline/orchestrator.mjs verify --siman 27
```

## Commands

```bash
cd newtry/CM_001
node pipeline/orchestrator.mjs status
node pipeline/orchestrator.mjs sync              # publish-due batches + release-due + push
node pipeline/orchestrator.mjs sync --dry-run
node pipeline/orchestrator.mjs publish --from 21 --to 25
node pipeline/orchestrator.mjs plan              # refresh sprint-plan-32-100.json
node pipeline/orchestrator.mjs assign --workers 4
```

`finish-siman` automatically runs `orchestrator sync`.

## Worker pool (siman 32+)

1. `node pipeline/orchestrator.mjs plan`
2. `node pipeline/orchestrator.mjs assign --workers N` — claim units for sub-agents
3. Each worker: `build-editorial-siman-batch.mjs` → edit blocks → `sprint-worker.mjs`
4. Coordinator: advance next `assign`, monitor `status`, run `sync` when gates open

**Standing order:** Keep **4+ local subagents busy** at all times. When units complete, immediately `assign --workers 4`, rebuild batches, launch next siman/parts. Do not idle the pool.

**Coordinator loop (automated):** Worker **#5** runs `translation/AGENT_POOL_COORDINATOR.md` — polls `pipeline/pool-coordinator.mjs tick --workers 4` and launches up to 4 translator subagents when slots open. Parent chat stays available for the user.

**Manual tick:** `npm run pipeline:pool:tick` | `npm run pipeline:pool:status`

## After sprint reaches siman 100

1. `node pipeline/pool-phase.mjs status` → phase `ready_retranslate_1_20`
2. `node pipeline/reset-editorial-done.mjs --from 1 --to 20`
3. `node pipeline/pool-phase.mjs prepare-1-20` && `node pipeline/pool-phase.mjs activate-1-20`
4. Resume **4 workers** — full editorial on simanim **1–20** (`translation/PASS_RETRANSLATE_1-20.md`)
5. **One dedicated agent** — HTML presentation only (`translation/AGENT_HTML_PRESENTATION.md`); `npm run pipeline:html:scan` / `pipeline:html:batch`

Simanim 10–20 were early MT/slave passes; they need this second pass for quality and to strip HTML from English.

See `translation/AGENT_SPRINT_WORKER.md` for worker rules.

## State files

| File | Purpose |
|------|---------|
| `pipeline/work/editorial-loop-state.json` | Completed simanim |
| `pipeline/work/orchestrator-state.json` | `lastPublishedThrough`, `lastReleasedThrough` |
| `pipeline/work/sprint-plan-32-100.json` | Work units for parallel agents |

## Git push scope

Only `newtry/OC_Mobile/oc318-mobile-reader/public/corpus/` is committed for publish pushes (keeps commits focused on reader data).
