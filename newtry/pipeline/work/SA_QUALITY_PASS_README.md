# SA quality pass — system queue (YD, EH, CM)

Machine translation is **complete** for all three volumes. Next phase: **editorial quality pass** (retranslate from Hebrew), four parallel agents, **you assign blocks in chat**.

## Quick start

1. **Build / refresh the master queue** (scans all flagged blocks; can take 30–90+ minutes on first run):
   ```bash
   node newtry/tools/queue-sa-quality-passes.mjs
   ```
2. Open **`newtry/pipeline/work/sa-quality-master-queue.json`** — YD first, worst scores first.
3. Open **four Cursor Agent chats** and paste prompts from:
   **`newtry/YD_001/translation/AGENT_QUALITY_PASS_SLOTS.md`** (slots 1–4).
4. Paste your block assignments into each chat (siman, slug, part paths, or queue `id` values).

## Files

| File | Purpose |
|------|---------|
| `sa-quality-master-queue.json` | Merged YD + EH + CM flagged blocks |
| `sa-quality-registry.json` | Phase + per-volume counts + slot registry |
| `slot-N-assignment.json` | Optional JSON mirror of your chat assignments |
| `YD_001/pipeline/work/quality-pass-queue.json` | YD-only slice |
| `EH_001/pipeline/work/quality-pass-queue.json` | EH-only slice |
| `CM_001/pipeline/work/quality-pass-queue.json` | CM-only slice |

## Per-volume commands (after editing blocks)

```bash
cd newtry/YD_001   # or EH_001 / CM_001
npm run apply:dictionary -- --root output/siman_NNN
npm run pipeline:validate -- --root output/siman_NNN
npm run pipeline:validate:quality -- --root output/siman_NNN --siman N
```

## Queue script options

```bash
node newtry/tools/queue-sa-quality-passes.mjs --volumes YD
node newtry/tools/queue-sa-quality-passes.mjs --volumes YD,EH,CM
node newtry/tools/queue-sa-quality-passes.mjs --min-severity error
node newtry/tools/queue-sa-quality-passes.mjs --skip-scan   # merge existing reports only
```

## Volume order for agents

1. **Yoreh De'ah** (`YD_001`) — all slots start here  
2. **Even HaEzer** (`EH_001`)  
3. **Choshen Mishpat** (`CM_001`)

Redirect a slot in chat when you want it on EH or CM.

## Not in scope for this phase

- `pipeline:pool:watch:assign` (old editorial sprint coordinator)
- OC_001 (Orach Chayim) — separate track unless you add it to the queue script later
