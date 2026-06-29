#!/usr/bin/env python3
"""CLI for Node orchestrator: claim / release / status on siman_state.json."""

import json
import sys

from siman_manager import (
    claim_siman,
    complete_siman,
    folder_exists,
    is_available,
    load_state,
    release_siman,
    siman_folder,
)


def main() -> None:
    if len(sys.argv) < 2:
        print("usage: siman_cli.py claim|release|complete|available|status <siman> [lane]")
        sys.exit(2)

    cmd = sys.argv[1]
    if cmd == "status":
        print(json.dumps(load_state(), indent=2))
        return

    if len(sys.argv) < 3:
        print("siman number required")
        sys.exit(2)

    siman = int(sys.argv[2])
    lane = sys.argv[3] if len(sys.argv) > 3 else "local"

    if cmd == "claim":
        ok = claim_siman(siman, lane)
        print("ok" if ok else "fail")
        sys.exit(0 if ok else 1)
    if cmd == "release":
        release_siman(siman)
        print("ok")
    elif cmd == "complete":
        complete_siman(siman)
        print("ok")
    elif cmd == "available":
        print("yes" if is_available(siman) else "no")
    elif cmd == "exists":
        print("yes" if folder_exists(siman) else "no")
    else:
        print(f"unknown command: {cmd}")
        sys.exit(2)


if __name__ == "__main__":
    main()
