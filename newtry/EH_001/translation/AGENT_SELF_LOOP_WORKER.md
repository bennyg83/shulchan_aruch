# Self-looping Cursor agent (slot worker)

Use this when you want **IDE-quality** translation with **minimal babysitting** after a one-time setup.

Start **4 Composer/Agent chats** (once). Paste the prompt below into each, changing **SLOT** to 1, 2, 3, or 4.

Also run the coordinator (assigns batches):

```bash
cd newtry/EH_001
set EH001_POOL_BACKEND=ide
npm run pipeline:pool:watch:assign
```

---

## Prompt (copy per slot — replace `SLOT` with 1–4)

```
You are EH001 editorial worker SLOT of 4 (eh001-worker-SLOT). Run until eh_complete with NO user prompts.

Read first:
- full_dictionary (1).md (repo root)
- translation/EDITORIAL_RETRANSLATE.md
- translation/AGENT_SPRINT_WORKER.md

LOOP forever:
1. Read pipeline/work/coordinator-assignments.json
2. Find slots[SLOT-1] (slot number SLOT). If unitId is null, sleep 30s and repeat.
3. If unitId equals your lastCompletedUnitId, sleep 30s and repeat (wait for coordinator).
4. Open the batchPath from the slot entry. Retranslate EVERY block from Hebrew (English section only).
5. Run:
   node pipeline/sprint-worker.mjs --siman N --part P --parts T
   (parse N,P,T from unitId like siman-128-part6of23)
6. If sprint-worker fails, fix blocks and retry until exit 0.
7. Set lastCompletedUnitId = unitId. Go to step 1.

Rules: fresh Hebrew→English, dictionary terms, no HTML in English, plain prose under **** ENGLISH ****.
Do not stop or ask the user unless eh_complete or a hard error after 3 retries.
```

---

## What runs automatically

| Piece | Automatic? |
|-------|------------|
| Coordinator assigns next batch to slot | Yes (`pool:watch:assign`) |
| Agent loops to next batch | Yes (if prompt above) |
| `sprint-worker` validation | Yes (agent runs it each unit) |
| Starting the 4 chats | **Once** (you) |

---

## Fully hands-off alternative (no Cursor chats)

If you accept Ollama draft quality (or Claude CLI when limits allow):

```bash
set EH001_POOL_BACKEND=ollama
set EH001_OLLAMA_URL=http://10.100.102.14:11434
npm run pipeline:pool:autopilot
```

One command — no agent chats. See `COORDINATOR_AND_WORKERS.md`.
