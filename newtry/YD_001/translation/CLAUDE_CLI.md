# Claude Code CLI lane (YD001) — **disabled**

> **Status:** Lane disabled in `pipeline/work/cli_queue.json` (`mode: disabled`). Pro session limits made the 101–104 test unreliable. **Simanim 101–104 use local Cursor workers** (`editorial_101_104` in `master-pipeline-plan.json`).

Third parallel lane (inactive): whole-siman translation via `claude` CLI (no block batches).

**Auth:** Uses your **Claude Pro** subscription via Claude Code CLI — credentials live in `~/.claude/` (no separate Anthropic API key for this lane).

## Test scope (locked)

**Simanim 101–104 only** — four sessions, **one siman each**, **one concurrent** (101 → 102 → 103 → 104):

| Session | Simanim |
|---------|---------|
| 1 | 101 |
| 2 | 102 |
| 3 | 103 |
| 4 | 104 |

Config: `pipeline/work/cli_queue.json`

## Prerequisites

**Python 3** on PATH (`python` or set `PYTHON=C:\Path\to\python.exe`).

```bash
npm install -g @anthropic-ai/claude-code
claude --version
claude auth status   # should show Pro / logged in (~/.claude/)
```

No `ANTHROPIC_API_KEY` is required for the CLI lane if you are already authenticated with Claude Code (Pro account stored under `%USERPROFILE%\.claude\` on Windows).

**Working directory:** CLI runs with `cwd=newtry/YD_001` so `output/siman_NNN/` is inside the session tree (not `cli_workspace` junction). Uses `--permission-mode acceptEdits` for non-interactive writes.

**Output folders** for the test must exist first:

```bash
npm run bootstrap:oc-simanim -- --from 101 --to 104
```

(`pipeline:cli:status` reports MISSING until those folders are created.)

## Files

| Path | Role |
|------|------|
| `CLAUDE.md` | Auto-loaded by Claude CLI (also copied to `cli_workspace/`) |
| `cli_workspace/` | CLI cwd — dictionary, progress.log, `output` junction |
| `cli/siman_manager.py` | `siman_state.json` claims (`local` / `cli`; `api` reserved, unused) |
| `cli/cli_launcher.py` | Spawns CLI sessions |
| `cli/timing_config.py` | Pauses, concurrency, test pairs |
| `pipeline/cli-lane.mjs` | Node entry: status, test, claim |

## Commands

```bash
cd newtry/YD_001

# Check folders + queue + claims
npm run pipeline:cli:status

# Dry-run (claim/release only, no claude call)
npm run pipeline:cli:test:dry

# Run test (sequential: one siman per session, maxConcurrent 1)
npm run pipeline:cli:test
```

## Production (after test)

- Set `cli_queue.json` `mode` to `"production"` and `simanim` / `sessionPairs` as needed.
- Default direction: from siman **100** downward, **2 simanim per session** (`timing_config.py`).
- Local Cursor agents must claim before editing:  
  `python cli/siman_cli.py claim 53 local`

## Conflict avoidance

All lanes read/write `pipeline/work/siman_state.json`. CLI claims before spawning; failed sessions release claims.
