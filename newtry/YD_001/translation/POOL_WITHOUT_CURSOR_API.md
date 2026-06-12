# Running the pool without Cursor API

**Coordinator (#5)** is always **`pool-coordinator-watch`** (Node on your PC) — not Ollama. See **`COORDINATOR_AND_WORKERS.md`**.

You do **not** need `CURSOR_API_KEY` or `@cursor/sdk`. Pick one path:

---

## Option 1 — Ollama (fully automated, local/LAN)

Uses your existing slave machine (`pipeline/ollama-slave-draft.mjs` defaults).

**Git Bash / PowerShell:**

```bash
cd newtry/YD_001
export YD001_POOL_BACKEND=ollama
export YD001_OLLAMA_URL=http://10.100.102.14:11434
export YD001_OLLAMA_MODEL_TRANSLATE=qwen2.5:14b-instruct
npm run pipeline:pool:watch:ollama
```

The watch daemon claims units and `pool-worker-run.mjs` translates each block via Ollama, then runs dictionary + `sprint-worker.mjs`.

**Quality:** Draft-level (same family as slave cleanup). Expect quality checks / human review on important simanim. Good for bulk progress, not final publish without review.

**One unit test:**

```bash
node pipeline/pool-worker-run.mjs --unit siman-128-part6of23
```

---

## Option 2 — Claude Code CLI (automated, Pro subscription, not API)

Uses `claude --print` from your logged-in Claude Pro (same lane as `cli/cli_launcher.py`). **No** `ANTHROPIC_API_KEY`.

```bash
export YD001_POOL_BACKEND=claude-cli
npm run pipeline:pool:watch
```

**Caveat:** You previously hit **Pro session limits** on simanim 101–104. If limits return, the pool will stall until the window resets — same as the CLI lane.

---

## Option 3 — Cursor IDE agents (no API, no Ollama)

Watch **only assigns** batches; **you** (or Composer agents in this IDE) translate.

```bash
export YD001_POOL_BACKEND=ide
npm run pipeline:pool:watch:assign
```

Or:

```bash
npm run pipeline:pool:watch:assign
```

Each cycle logs paths like `pipeline/work/batch-editorial-siman-128-part6of23.md`.

**Per unit:**

1. Open the batch `.md` + `full_dictionary (1).md` + `EDITORIAL_RETRANSLATE.md`
2. Retranslate blocks in `output/`
3. Finish:

```bash
node pipeline/sprint-worker.mjs --siman 128 --part 6 --parts 23
```

Launch up to **4** IDE agent chats in parallel on the 4 claimed batches (this is what coordinator #5 did before API limits).

---

## Option 4 — Not recommended for editorial

`npm run translate:placeholders:libre` — machine translation only; pool editorial expects fresh Hebrew→English passes.

---

## Summary

| Method | Automated? | API key? | Quality |
|--------|------------|----------|---------|
| Ollama | Yes | No | Draft — review |
| Claude CLI | Yes | No (Pro login) | High if limits allow |
| IDE + assign watch | Semi | No | Highest (your agents) |
| Cursor API | Yes | Yes | High |

**Recommended without Cursor API:** Ollama for overnight bulk + IDE agents for simanim you care about before publish.
