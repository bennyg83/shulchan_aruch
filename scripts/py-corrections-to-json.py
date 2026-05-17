"""
Convert a Python file that assigns `corrections = { int: "...", ... }` to JSON
{ "5": "...", ... } for apply-oc318-line-corrections.js.

Usage: python scripts/py-corrections-to-json.py data/corrections_import.py data/oc318-paragraph-corrections.json
"""
import json
import runpy
import sys


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: python scripts/py-corrections-to-json.py <import.py> <out.json>", file=sys.stderr)
        sys.exit(1)
    src = sys.argv[1]
    dst = sys.argv[2]
    ns = runpy.run_path(src)
    corrections = ns.get("corrections")
    if not isinstance(corrections, dict):
        print("Source must define dict corrections = {...}", file=sys.stderr)
        sys.exit(1)
    out = {str(k): v for k, v in corrections.items()}
    with open(dst, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Wrote {len(out)} keys to {dst}")


if __name__ == "__main__":
    main()
