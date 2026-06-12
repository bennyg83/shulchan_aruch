# Coordinator (#5) vs workers (1–4) vs Ollama on the slave

## What you were doing (and want back)

| Role | Who | Job |
|------|-----|-----|
| **Workers 1–4** | Cursor “mini agents” (or Ollama children) | Editorial retranslate + dictionary-quality English per batch |
| **Worker #5** | Coordinator | Keep 4 slots busy, notice stalls, assign **next** blocks |

That failed because **worker #5 was a chat** that stopped when the conversation ended. **`tick` alone** only claims work; it does not watch agents.

## What should be worker #5 (not Ollama)

**Worker #5 = `pool-coordinator-watch.mjs`** — a small **Node loop on your PC** (no GPU, no LLM).

Every ~90 seconds it:

1. Counts running worker processes (Ollama mode) or claimed IDE batches (IDE mode)
2. **`tick`** — assigns up to 4 units if slots are free
3. **IDE mode:** writes `pipeline/work/coordinator-assignments.json` (who should work on what)
4. **IDE mode:** if a claim has **no file edits** for 45 minutes → **release** and put back in the queue (“push to next blocks”)
5. **Ollama mode:** spawns `pool-worker-run` children; when one exits, assigns the next unit
6. Advances waves toward siman **178** when a wave finishes

Ollama is **not** suited to “supervise” Cursor chats — it has no visibility into IDE agents. Rules + file mtimes do that job cheaply.

## Where Ollama on the slave laptop fits

Use the slave **only as the translation engine** for automated workers (optional):

| Env | Model (example) | Load on slave |
|-----|-----------------|---------------|
| `EH001_OLLAMA_MODEL_TRANSLATE` | `qwen2.5:14b-instruct` | Heavy — full editorial draft |
| *(coordinator does not call Ollama)* | — | **None** |

Do **not** run a second “coordinator Qwen” on the slave for monitoring — the Node watch already monitors. A tiny Qwen for “is this English still garbage?” is possible later but is **QA**, not coordination.

If the slave struggles: use **IDE workers** for quality + **Node watch** on the PC; slave off.

## Recommended setups

### A — Quality first (your original workflow, fixed)

**Option A1 — Self-looping IDE agents (start 4 chats once, then hands-off)**

```bash
npm run pipeline:pool:watch:assign
```

Open 4 agent chats with the prompt in **`translation/AGENT_SELF_LOOP_WORKER.md`** (slot 1–4). Each agent loops: read `coordinator-assignments.json` → translate batch → `sprint-worker` → repeat.

**Option A2 — Fully automated (no Cursor chats)**

```bash
npm run pipeline:pool:autopilot
```

(with Ollama or Claude CLI backend — see below)

### B — Bulk on slave (lighter coordinator on PC)

```bash
# On PC
set EH001_POOL_BACKEND=ollama
set EH001_OLLAMA_URL=http://10.100.102.14:11434
set EH001_OLLAMA_MODEL_TRANSLATE=qwen2.5:14b-instruct
npm run pipeline:pool:watch:ollama
```

- **PC:** Node watch only (worker #5).
- **Slave:** Ollama serves translate requests from 4 Node children — not coordination.

### C — Hybrid

- IDE agents for simanim you care about (1–20, hard simanim).
- Ollama watch for 105+ bulk; human spot-check before publish.

## Validation (unchanged)

| Step | Tool |
|------|------|
| Per batch | `sprint-worker.mjs` (preflight + dictionary + advance) |
| Per siman | `npm run pipeline:validate:quality` |
| House terms | `npm run apply:dictionary` |

Coordinator does **not** replace quality validation — it only keeps the **queue moving**.
