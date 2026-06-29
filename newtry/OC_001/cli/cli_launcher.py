# cli_launcher.py — spawn Claude Code CLI for whole-siman translation

from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from siman_manager import (
    OUTPUT_ROOT,
    OC_ROOT,
    claim_siman,
    complete_siman,
    folder_exists,
    release_siman,
    reset_siman,
    siman_folder,
)
from timing_config import (
    CLI_INTER_SESSION_PAUSE,
    CLI_MAX_CONCURRENT,
    CLI_PERMISSION_MODE,
    CLI_RATE_LIMIT_BACKOFF,
    CLI_SESSION_TIMEOUT_SEC,
    CLI_SIMANIM_PER_SESSION,
    CLI_TEST_SESSION_PAIRS,
    CLI_TEST_SIMANIM,
)

CLI_DIR = Path(__file__).resolve().parent
CLI_WORKING_DIR = OC_ROOT / "cli_workspace"
WORK_DIR = OC_ROOT / "pipeline" / "work"
QUEUE_FILE = WORK_DIR / "cli_queue.json"
PROGRESS_LOG = OC_ROOT / "progress.log"
REPO_ROOT = OC_ROOT.parent.parent
DICTIONARY_SRC = REPO_ROOT / "full_dictionary (1).md"
CLAUDE_SRC = REPO_ROOT / "newtry" / "claude-integration" / "CLAUDE.md"
CLAUDE_OC = OC_ROOT / "CLAUDE.md"

# Auth: Claude Pro via `claude` CLI session (~/.claude/). No ANTHROPIC_API_KEY required.


def resolve_claude_cmd() -> str:
    """Resolve claude executable (Windows npm global installs claude.cmd)."""
    if os.environ.get("CLAUDE_CLI_CMD"):
        return os.environ["CLAUDE_CLI_CMD"]
    found = shutil.which("claude") or shutil.which("claude.cmd")
    if found:
        return found
    if os.name == "nt":
        npm_claude = Path(os.environ.get("APPDATA", "")) / "npm" / "claude.cmd"
        if npm_claude.is_file():
            return str(npm_claude)
    return "claude"


CLAUDE_CMD = resolve_claude_cmd()


def ensure_cli_workspace() -> None:
    """Sync CLAUDE.md + dictionary into OC_001 root (CLI cwd = OC_ROOT so output/ is in-tree)."""
    CLI_WORKING_DIR.mkdir(parents=True, exist_ok=True)
    WORK_DIR.mkdir(parents=True, exist_ok=True)

    for src, dst_name in [
        (CLAUDE_OC if CLAUDE_OC.exists() else CLAUDE_SRC, "CLAUDE.md"),
        (DICTIONARY_SRC, "full_dictionary.md"),
    ]:
        for base in (OC_ROOT, CLI_WORKING_DIR):
            dst = base / dst_name
            if src.exists() and (not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime):
                shutil.copy2(src, dst)

    if not PROGRESS_LOG.exists():
        PROGRESS_LOG.touch()


def is_pro_session_exhausted(text: str) -> bool:
    """Claude Pro 'session limit' — retrying same window is pointless."""
    low = (text or "").lower()
    return "session limit" in low or "hit your limit" in low


def session_output_ok(simanim: list[int], stdout: str) -> bool:
    """Reject permission-denied exits that still return code 0."""
    low = (stdout or "").lower()
    if "allowed working directory" in low or "approve the permission" in low:
        return False
    log = PROGRESS_LOG.read_text(encoding="utf-8") if PROGRESS_LOG.exists() else ""
    for n in simanim:
        if f"siman_{n:03d} COMPLETE" not in log:
            print(f"[CLI] Missing progress.log COMPLETE for siman_{n:03d}")
            return False
    return True


def build_prompt(simanim: list[int]) -> str:
    lines = []
    for n in simanim:
        lines.append(f"TRANSLATE SIMAN {n:03d}")
    return "\n".join(lines)


def run_cli_session(simanim: list[int], dry_run: bool = False) -> tuple[bool, bool]:
    """Returns (success, abort_remaining_test_sessions)."""
    missing = [n for n in simanim if not folder_exists(n)]
    if missing:
        print(f"[CLI] SKIP — folders missing: {[siman_folder(n) for n in missing]}")
        return False, False

    claimed = []
    for n in simanim:
        if not claim_siman(n, "cli"):
            print(f"[CLI] Could not claim {siman_folder(n)}")
            for c in claimed:
                release_siman(c)
            return False, False
        claimed.append(n)

    prompt = build_prompt(simanim)
    print(f"[CLI] Session simanim {simanim}")
    print(f"[CLI] Prompt:\n{prompt}")

    if dry_run:
        for n in claimed:
            release_siman(n)
        print("[CLI] dry-run — released claims")
        return True, False

    env = {
        **os.environ,
        "PYTHONIOENCODING": "utf-8",
        "PYTHONUTF8": "1",
    }

    try:
        cmd = [
            CLAUDE_CMD,
            "--print",
            "--permission-mode",
            CLI_PERMISSION_MODE,
            prompt,
        ]
        print(f"[CLI] cmd: {CLAUDE_CMD} (cwd={OC_ROOT})")
        result = subprocess.run(
            cmd,
            cwd=str(OC_ROOT),
            capture_output=True,
            text=True,
            encoding="utf-8",
            timeout=CLI_SESSION_TIMEOUT_SEC,
            env=env,
            stdin=subprocess.DEVNULL,
        )
        stdout = result.stdout or ""
        ok = result.returncode == 0 and session_output_ok(simanim, stdout)
        tail = stdout[-800:]
        if ok:
            print(f"[CLI] OK simanim {simanim}\n{tail}")
            for n in simanim:
                complete_siman(n)
            return True, False

        err = (result.stderr or result.stdout or "")[:500]
        print(f"[CLI] FAIL simanim {simanim}: {err}")
        abort = is_pro_session_exhausted(err)
        if abort:
            print("[CLI] Pro session quota exhausted — skip remaining sessions in this run")
        elif "rate" in err.lower() or "limit" in err.lower():
            print(f"[CLI] Rate limit — backoff {CLI_RATE_LIMIT_BACKOFF}s")
            time.sleep(CLI_RATE_LIMIT_BACKOFF)
        for n in claimed:
            release_siman(n)
        return False, abort

    except subprocess.TimeoutExpired:
        print(f"[CLI] TIMEOUT simanim {simanim}")
        for n in claimed:
            release_siman(n)
        return False, False
    except FileNotFoundError:
        print(f"[CLI] Command not found: {CLAUDE_CMD}")
        print("Install: npm install -g @anthropic-ai/claude-code")
        print("Then: claude auth login  (Pro account; config in ~/.claude/)")
        for n in claimed:
            release_siman(n)
        return False, False
    except Exception as e:
        print(f"[CLI] EXCEPTION: {e}")
        for n in claimed:
            release_siman(n)
        return False, False


def load_queue() -> dict:
    if QUEUE_FILE.exists():
        with open(QUEUE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def session_pairs_from_queue() -> list[list[int]]:
    q = load_queue()
    if q.get("sessionPairs"):
        return q["sessionPairs"]
    simanim = q.get("simanim") or CLI_TEST_SIMANIM
    per = q.get("simanimPerSession", CLI_SIMANIM_PER_SESSION)
    pairs = []
    for i in range(0, len(simanim), per):
        pairs.append(simanim[i : i + per])
    return pairs


def run_test(dry_run: bool = False) -> int:
    ensure_cli_workspace()
    for n in CLI_TEST_SIMANIM:
        reset_siman(n)
    pairs = session_pairs_from_queue()
    print(f"[CLI TEST] Simanim 101–104 — {len(pairs)} sessions, max concurrent {CLI_MAX_CONCURRENT}")

    failures = 0
    quota_exhausted = False

    def handle_result(pair: list[int], ok: bool, abort: bool) -> None:
        nonlocal failures, quota_exhausted
        if not ok:
            failures += 1
        if abort:
            quota_exhausted = True

    if CLI_MAX_CONCURRENT <= 1:
        for pair in pairs:
            if quota_exhausted:
                print(f"[CLI TEST] SKIP {pair} — Pro session limit already hit")
                failures += 1
                continue
            ok, abort = run_cli_session(pair, dry_run)
            handle_result(pair, ok, abort)
            if CLI_INTER_SESSION_PAUSE > 0 and not quota_exhausted:
                time.sleep(CLI_INTER_SESSION_PAUSE)
    else:
        with ThreadPoolExecutor(max_workers=CLI_MAX_CONCURRENT) as pool:
            futures = {pool.submit(run_cli_session, pair, dry_run): pair for pair in pairs}
            for fut in as_completed(futures):
                pair = futures[fut]
                ok, abort = fut.result()
                handle_result(pair, ok, abort)
                if CLI_INTER_SESSION_PAUSE > 0:
                    time.sleep(CLI_INTER_SESSION_PAUSE)

    if failures:
        print(f"[CLI TEST] Done with {failures} failed session(s)")
        return 1
    print("[CLI TEST] All sessions succeeded")
    return 0


def cli_worker_loop() -> None:
    print("[CLI WORKER] Started")
    ensure_cli_workspace()
    while True:
        pairs = session_pairs_from_queue()
        ran = False
        for pair in pairs:
            if all(folder_exists(n) for n in pair):
                run_cli_session(pair)[0]
                ran = True
                time.sleep(CLI_INTER_SESSION_PAUSE)
        if not ran:
            print("[CLI WORKER] No work — sleep 30s")
            time.sleep(30)


if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    if "test" in sys.argv:
        sys.exit(run_test(dry_run=dry))
    if "worker" in sys.argv:
        cli_worker_loop()
    else:
        print("Usage: python cli_launcher.py test [--dry-run] | worker")
