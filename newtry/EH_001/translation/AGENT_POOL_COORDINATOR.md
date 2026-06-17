# Pool coordinator — automated (watch daemon)

**Preferred:** run the watch daemon instead of manually looping in chat.

```bash
cd newtry/EH_001

# Cursor Cloud Agents API (recommended)
# export CURSOR_API_KEY=...
# npm install @cursor/sdk

# OR LAN Ollama (draft quality — review before publish)
# export EH001_OLLAMA_URL=http://10.100.102.14:11434
# export EH001_OLLAMA_MODEL=qwen2.5:14b-instruct

npm run pipeline:pool:watch
```

The daemon (`pipeline/pool-coordinator-watch.mjs`):

1. `tick --workers 4` when slots are open  
2. Spawns `pool-worker-run.mjs` per claimed unit (translate → dictionary → sprint-worker)  
3. Reaps finished children and assigns more work  
4. `release-stale` every 10 cycles (>2h claims)  
5. Auto-advances phases and **waves** through siman **178** (`finishThrough` in `master-pipeline-plan.json`)

**Status / logs**

```bash
npm run pipeline:pool:status
type pipeline\work\pool-watch.log
```

**One-shot test cycle**

```bash
npm run pipeline:pool:watch:once
```

---

## Manual coordinator (chat agent #5)

Use only if you are not running `pipeline:pool:watch`. The Node `tick` script **does not** launch Cursor subagents — it only claims units and writes batches.

If using chat coordinator: loop `tick` + launch **generalPurpose** subagents per `assigned` unit (see `AGENT_SPRINT_WORKER.md`).

---

## Phase → action

| Phase | Action |
|-------|--------|
| `editorial_6_403` | Watch spawns workers; waves 105→100→296→…→178 |
| `html_presentation` | Stop watch; one HTML agent; `mark-html-complete` |
| `eh_complete` | Watch exits |

## Publish

- Auto publish only simanim **&lt; 105** (orchestrator cadence).  
- **Do not** publish 105+ unless the user asks.
