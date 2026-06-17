# Master pipeline — Even HaEzer to completion

**Standing order:** Run **`npm run pipeline:pool:watch`** (daemon) or pool coordinator chat (#5) until `phase: eh_complete`. Target: **4 workers** busy through siman **178** (`finishThrough: 178`).

## Sequence

| Order | Phase | Work |
|-------|-------|------|
| 1 | `retranslate_1_20` | Full editorial simanim **1–20** |
| 2 | `editorial_gaps` | **61, 66, 71, 74–76, 79, 89–92, 94** (blocks still open after sprint) |
| 3 | `editorial_101_104` | Local workers — **101–104** (CLI lane disabled) |
| 4 | `html_presentation` | **One** dedicated agent — `AGENT_HTML_PRESENTATION.md` |
| 5 | `editorial_6_403` | Editorial **105 → 178** (waves of ~96 simanim) |
| 6 | `eh_complete` | Done |

Phases auto-advance when the active sprint plan has **0 pending, 0 claimed** (`pool-coordinator tick` calls `advance-if-idle`).

## Commands

```bash
cd newtry/EH_001
npm run pipeline:phase:status
npm run pipeline:phase:start-1-20      # reset + plan + activate 1–20
npm run pipeline:pool:watch            # daemon: tick + spawn workers until done
npm run pipeline:pool:tick             # assign only (no translate)
npm run pipeline:phase:mark-html-complete   # after HTML agent
```

## Publish / webapp

- **Simanim &lt; 105:** `finish-siman` may still run `orchestrator sync` for publish through **88+** (gaps, 1–20 when ready).
- **Simanim ≥ 105:** **No auto-publish** (`noPublishFromSiman: 50` in `orchestrator-state.json`). User must ask to update GitHub Pages.

## Automated watch (preferred)

```bash
export CURSOR_API_KEY=...   # or EH001_OLLAMA_URL=...
npm run pipeline:pool:watch
```

## Manual coordinator loop (if not using watch)

1. `pool-coordinator.mjs status`
2. `pool-coordinator.mjs tick --workers 4`
3. Launch **generalPurpose** subagent per `assigned` unit
4. Wait ~90s; if `claimed < 4`, tick again
5. Every 10 cycles: `release-stale`
6. On `html_presentation`: stop watch; launch **one** HTML agent
7. After HTML: `npm run pipeline:phase:mark-html-complete` then resume watch
