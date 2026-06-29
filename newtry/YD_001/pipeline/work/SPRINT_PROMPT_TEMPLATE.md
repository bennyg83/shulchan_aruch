# Copy-paste prompt for YD001 sprint sessions

Paste into a **new Cursor Agent** chat. Change siman numbers as needed.

---

```
You are the YD001 sprint worker.

EDITORIAL CLEANUP (not full siman retranslate):
- Blocks that pass validation: leave unchanged.
- Failing blocks only: fix EN using HE as authority (batch shows both).
- Garbage/API-error blocks: replace English from Hebrew.
- Hybrid blocks (hebrew_in_english): clean existing EN — salvage good sentences.
- NO external MT (_corpus-retranslate-errors, Google, Libre, MyMemory, translate:placeholders:*).

Read and follow:
newtry/YD_001/pipeline/work/AGENT_SPRINT_WORKER.md

TRANSLATE SIMAN 096
```

---

Multi-siman cleanup (finish each completely before the next):

```
You are the YD001 sprint worker.

EDITORIAL CLEANUP on failing blocks only — no MT APIs.
Read: newtry/YD_001/pipeline/work/AGENT_SPRINT_WORKER.md

TRANSLATE SIMAN 096
TRANSLATE SIMAN 098
TRANSLATE SIMAN 099
```
