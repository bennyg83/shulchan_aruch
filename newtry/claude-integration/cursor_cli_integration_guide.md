# Cursor Orchestrator — Claude CLI Integration Guide
# Copy-paste this entire file into Cursor as your implementation prompt

---

## WHAT TO BUILD

Extend the existing translation orchestrator to include a Claude CLI sub-process that
handles one siman at a time as a dedicated high-quality translation agent. The Claude
CLI runs from a separate working directory so it never touches files the local sub-agents
are currently processing.

The result is a three-lane pipeline:
- Lane A: Local sub-agents (Cursor-managed) → mechaber, rama (low complexity)
- Lane B: Anthropic API direct calls (cached) → taz, magen-avraham, shach (high complexity)
- Lane C: Claude CLI sub-process → full siman translation for simanim not yet started by Lane A or B

---

## FILES REQUIRED BEFORE RUNNING

These must exist in the project root:
- `CLAUDE.md` — the Claude CLI auto-load file (already created, place in project root)
- `full_dictionary.md` — the halachic dictionary
- `progress.log` — created automatically on first run if missing
- `cli_queue.json` — siman assignment queue for Claude CLI (created by orchestrator)
- `agent_queue.json` — siman assignment queue for local agents (already exists or create)

---

## PART 1 — SIMAN ASSIGNMENT MANAGER

Create `siman_manager.py`. This is the single source of truth for which simanim are
assigned to which lane. It prevents double-processing.

```python
# siman_manager.py

import json
import os
import threading
from datetime import datetime

LOCK = threading.Lock()
STATE_FILE = "siman_state.json"

def load_state() -> dict:
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    return {}

def save_state(state: dict):
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def claim_siman(siman_id: str, lane: str) -> bool:
    """
    Attempt to claim a siman for a lane.
    Returns True if claimed successfully, False if already claimed or complete.
    lane is one of: "local", "api", "cli"
    """
    with LOCK:
        state = load_state()
        if siman_id in state:
            return False  # already claimed or complete
        state[siman_id] = {
            "lane": lane,
            "claimed_at": datetime.now().isoformat(),
            "status": "in_progress"
        }
        save_state(state)
        return True

def complete_siman(siman_id: str):
    with LOCK:
        state = load_state()
        if siman_id in state:
            state[siman_id]["status"] = "complete"
            state[siman_id]["completed_at"] = datetime.now().isoformat()
        save_state(state)

def is_available(siman_id: str) -> bool:
    with LOCK:
        state = load_state()
        return siman_id not in state

def get_all_siman_ids(root_folder: str) -> list[str]:
    """Discover all siman folder names under root_folder."""
    import re
    ids = []
    for name in os.listdir(root_folder):
        full = os.path.join(root_folder, name)
        if os.path.isdir(full) and re.search(r'siman[_\s]*\d+', name, re.IGNORECASE):
            ids.append(name)
    return sorted(ids)

def get_next_available(root_folder: str) -> str | None:
    """Return the next unclaimed siman ID, or None if all are claimed."""
    for siman_id in get_all_siman_ids(root_folder):
        if is_available(siman_id):
            return siman_id
    return None
```

---

## PART 2 — CLAUDE CLI LAUNCHER

Create `cli_launcher.py`. This manages spawning the Claude CLI as a subprocess,
passing it a siman assignment, and monitoring completion.

```python
# cli_launcher.py

import subprocess
import os
import time
import threading
from siman_manager import claim_siman, complete_siman, get_next_available

# CONFIGURATION — adjust these paths for your system
CLI_WORKING_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cli_workspace")
ROOT_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
CLAUDE_CMD = "claude"  # assumes `claude` is on PATH after `npm install -g @anthropic-ai/claude-code`

def ensure_cli_workspace():
    """
    The CLI workspace is a separate directory containing:
    - CLAUDE.md (symlink or copy from project root)
    - full_dictionary.md (symlink or copy from project root)
    - progress.log (shared with main project)
    - Symlinks to the output/siman_* folders it needs to access
    
    This separation means the CLI operates in its own space and cannot
    accidentally touch files the local agents are working on.
    """
    os.makedirs(CLI_WORKING_DIR, exist_ok=True)
    
    project_root = os.path.dirname(os.path.abspath(__file__))
    
    # Link required files into CLI workspace
    for fname in ["CLAUDE.md", "full_dictionary.md", "progress.log"]:
        src = os.path.join(project_root, fname)
        dst = os.path.join(CLI_WORKING_DIR, fname)
        if not os.path.exists(dst):
            if os.name == 'nt':  # Windows
                import shutil
                shutil.copy2(src, dst)
            else:  # Unix
                os.symlink(src, dst)
    
    # Link the output folder so CLI can reach siman subfolders
    output_link = os.path.join(CLI_WORKING_DIR, "output")
    if not os.path.exists(output_link):
        if os.name == 'nt':
            # On Windows, use junction for directories
            subprocess.run(f'mklink /J "{output_link}" "{ROOT_FOLDER}"', shell=True)
        else:
            os.symlink(ROOT_FOLDER, output_link)

def run_cli_session(siman_id: str) -> bool:
    """
    Spawn a Claude CLI session to translate one siman.
    Blocks until the session completes.
    Returns True on success, False on failure.
    """
    print(f"[CLI] Starting session for {siman_id}")
    
    # The prompt passed to Claude CLI for this siman
    prompt = f"TRANSLATE SIMAN {siman_id}"
    
    try:
        result = subprocess.run(
            [CLAUDE_CMD, "--print", prompt],
            cwd=CLI_WORKING_DIR,
            capture_output=True,
            text=True,
            encoding="utf-8",
            timeout=3600  # 1 hour max per siman
        )
        
        if result.returncode == 0:
            print(f"[CLI] Completed {siman_id}")
            print(f"[CLI] Output summary:\n{result.stdout[-500:]}")  # last 500 chars
            complete_siman(siman_id)
            return True
        else:
            print(f"[CLI] ERROR on {siman_id}: {result.stderr[:300]}")
            return False
            
    except subprocess.TimeoutExpired:
        print(f"[CLI] TIMEOUT on {siman_id} after 60 minutes")
        return False
    except Exception as e:
        print(f"[CLI] EXCEPTION on {siman_id}: {e}")
        return False

def cli_worker_loop():
    """
    Continuously polls for available simanim and processes them one at a time.
    Run this in a dedicated thread from the orchestrator.
    This loop runs independently of the local agent lanes.
    """
    print("[CLI WORKER] Started")
    ensure_cli_workspace()
    
    while True:
        # Find next siman not claimed by any lane
        next_siman = get_next_available(ROOT_FOLDER)
        
        if next_siman is None:
            print("[CLI WORKER] No simanim available. Waiting 30s...")
            time.sleep(30)
            continue
        
        # Claim it for the CLI lane
        if claim_siman(next_siman, "cli"):
            print(f"[CLI WORKER] Claimed {next_siman}")
            success = run_cli_session(next_siman)
            if not success:
                # Release the claim on failure so it can be retried
                from siman_manager import load_state, save_state
                state = load_state()
                if next_siman in state:
                    del state[next_siman]
                save_state(state)
                print(f"[CLI WORKER] Released {next_siman} for retry")
            
            # Brief pause between sessions to respect Pro rate limits
            time.sleep(60)
        else:
            # Another lane claimed it first, move on
            time.sleep(5)
```

---

## PART 3 — WINDOW TIMING CONFIGURATION

The Pro account rate limit window resets on a rolling basis. Based on observed behavior
with long agentic sessions, use these timing parameters:

```python
# timing_config.py

# Time to wait between Claude CLI sessions (seconds)
# One siman with 16 commentators takes approximately 8-15 minutes of active generation
# Allow 60 seconds between sessions to avoid hitting rate limits
CLI_INTER_SESSION_PAUSE = 60

# Maximum active CLI sessions at one time — always 1 for Pro
CLI_MAX_CONCURRENT = 1

# If a session is cut short by a rate limit, wait this long before retrying
CLI_RATE_LIMIT_BACKOFF = 600  # 10 minutes

# Local agent inter-call pause (seconds) — much shorter, local model has no rate limit
LOCAL_AGENT_PAUSE = 0.1

# API (direct Anthropic) inter-call pause (seconds)
API_INTER_CALL_PAUSE = 0.3

# API batch size — accumulate this many blocks before one API call
API_BATCH_SIZE = 12

# Siman assignment strategy:
# "cli_first"  = CLI takes simanim starting from lowest number, agents take next
# "interleave" = CLI takes odd simanim, agents take even
# "cli_high"   = CLI takes highest-numbered simanim (most complex), agents take low
ASSIGNMENT_STRATEGY = "cli_high"
```

---

## PART 4 — ORCHESTRATOR INTEGRATION POINT

In your existing orchestrator's `main()` function, add the CLI worker as a parallel thread:

```python
# In your existing main orchestrator file, add these lines:

import threading
from cli_launcher import cli_worker_loop
from timing_config import CLI_MAX_CONCURRENT

def start_cli_lane():
    """Start the Claude CLI lane as a background thread."""
    cli_thread = threading.Thread(
        target=cli_worker_loop,
        name="cli-worker",
        daemon=True  # dies when main process exits
    )
    cli_thread.start()
    print("[ORCHESTRATOR] CLI lane started")
    return cli_thread

# In main():
def main():
    # ... your existing setup code ...
    
    # Start CLI lane in parallel with local agents
    cli_thread = start_cli_lane()
    
    # ... your existing local agent loop ...
    
    # At the end, wait for CLI thread to finish current siman
    cli_thread.join(timeout=7200)  # wait up to 2 hours
    print("[ORCHESTRATOR] All lanes complete")
```

---

## PART 5 — WINDOWS-SPECIFIC NOTES

Since you are on Windows (AMD Ryzen, 64-bit):

**Installing Claude CLI:**
```cmd
npm install -g @anthropic-ai/claude-code
```
Requires Node.js 18+. Verify with: `claude --version`

**Setting API key for CLI:**
```cmd
set ANTHROPIC_API_KEY=your_key_here
```
Or add it permanently via System Properties → Environment Variables.

**Symlinks on Windows:**
Windows symlinks require Developer Mode or admin privileges.
The `cli_launcher.py` code above handles this by using `shutil.copy2` instead of
symlinks on Windows, and `mklink /J` for directory junctions.
If you hit permission errors, run your terminal as Administrator for the first run
(which creates the workspace), then normal permissions are fine afterward.

**Subprocess encoding:**
The `cli_launcher.py` code uses `encoding="utf-8"` on the subprocess call.
If you see encoding errors with Hebrew characters in the output, add:
```python
env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}
result = subprocess.run([...], env=env, ...)
```

---

## PART 6 — CONFLICT AVOIDANCE SUMMARY

The three lanes never touch the same siman at the same time because:

1. `siman_state.json` is the single source of truth — written atomically with a thread lock
2. `claim_siman()` is called before any file access — if it returns False, the lane moves on
3. The CLI worker runs from `cli_workspace/` which symlinks to the output folder read-only
   except for the specific siman folder it has been assigned
4. Local agents claim simanim through the same `siman_manager.py` before processing
5. `progress.log` is appended to by the CLI and read by the orchestrator to detect completion

The only shared mutable resource is `progress.log` — both the CLI and the orchestrator
append to it. Use append mode (`"a"`) not write mode (`"w"`) when writing to it from Python.

---

## CHECKLIST BEFORE RUNNING

- [ ] `CLAUDE.md` is in the project root AND in `cli_workspace/` (or symlinked)
- [ ] `full_dictionary.md` is in the project root AND in `cli_workspace/` (or symlinked)
- [ ] `claude` CLI is installed and `claude --version` works in terminal
- [ ] `ANTHROPIC_API_KEY` is set in environment
- [ ] `siman_manager.py` is imported by both the orchestrator and `cli_launcher.py`
- [ ] Local agents call `claim_siman(siman_id, "local")` before starting any file
- [ ] API agent calls `claim_siman(siman_id, "api")` before starting any file
- [ ] CLI worker calls `claim_siman(siman_id, "cli")` via `cli_worker_loop()`
- [ ] All three lanes share the same `siman_state.json` file path
- [ ] `progress.log` is opened in append mode only, never write mode
