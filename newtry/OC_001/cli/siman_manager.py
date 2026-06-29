# siman_manager.py — shared siman claims for local / cli lanes (api reserved, unused)

from __future__ import annotations

import json
import os
import re
import threading
from datetime import datetime
from pathlib import Path

LOCK = threading.Lock()

CLI_DIR = Path(__file__).resolve().parent
OC_ROOT = CLI_DIR.parent
WORK_DIR = OC_ROOT / "pipeline" / "work"
STATE_FILE = WORK_DIR / "siman_state.json"
OUTPUT_ROOT = OC_ROOT / "output"


def siman_folder(siman: int | str) -> str:
    n = int(siman)
    return f"siman_{n:03d}"


def load_state() -> dict:
    if STATE_FILE.exists():
        with open(STATE_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_state(state: dict) -> None:
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)


def claim_siman(siman: int | str, lane: str) -> bool:
    """Claim siman for lane: local | cli (api reserved). Returns False if taken or complete."""
    key = siman_folder(siman)
    with LOCK:
        state = load_state()
        entry = state.get(key)
        if entry and entry.get("status") in ("in_progress", "complete"):
            return False
        state[key] = {
            "siman": int(siman),
            "lane": lane,
            "claimed_at": datetime.now().isoformat(),
            "status": "in_progress",
        }
        save_state(state)
        return True


def release_siman(siman: int | str) -> None:
    key = siman_folder(siman)
    with LOCK:
        state = load_state()
        if key in state and state[key].get("status") == "in_progress":
            del state[key]
            save_state(state)


def reset_siman(siman: int | str) -> None:
    """Remove claim/complete entry so a siman can be retried."""
    key = siman_folder(siman)
    with LOCK:
        state = load_state()
        if key in state:
            del state[key]
            save_state(state)


def complete_siman(siman: int | str) -> None:
    key = siman_folder(siman)
    with LOCK:
        state = load_state()
        if key in state:
            state[key]["status"] = "complete"
            state[key]["completed_at"] = datetime.now().isoformat()
            save_state(state)


def is_available(siman: int | str) -> bool:
    key = siman_folder(siman)
    with LOCK:
        state = load_state()
        entry = state.get(key)
        return entry is None or entry.get("status") not in ("in_progress", "complete")


def folder_exists(siman: int | str) -> bool:
    return (OUTPUT_ROOT / siman_folder(siman)).is_dir()


def get_all_siman_ids(root_folder: str | Path | None = None) -> list[str]:
    root = Path(root_folder or OUTPUT_ROOT)
    if not root.is_dir():
        return []
    ids = []
    for name in os.listdir(root):
        full = root / name
        if full.is_dir() and re.search(r"siman[_\s]*\d+", name, re.IGNORECASE):
            ids.append(name)
    return sorted(ids)


def get_next_available(root_folder: str | Path | None = None) -> str | None:
    for siman_id in get_all_siman_ids(root_folder):
        if is_available(siman_id):
            return siman_id
    return None
