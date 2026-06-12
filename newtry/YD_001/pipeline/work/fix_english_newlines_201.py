#!/usr/bin/env python3
"""Ensure **** ENGLISH **** is followed by newline before content (slot-3 slugs)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201"
SLUGS = {
    "siftei-kohen",
    "beur-hagra",
    "beer-hagolah",
    "baer-heitev",
    "pitchei-teshuva",
    "rabbi-akiva-eiger-yd",
}
MARKER = "**** ENGLISH ****"
fixed_files = 0
fixed_blocks = 0

for rel in sorted(ROOT.rglob("part-*.txt")):
    if rel.parent.name not in SLUGS:
        continue
    text = rel.read_text(encoding="utf-8")
    count = [0]

    def repl(m):
        count[0] += 1
        return MARKER + "\n" + m.group(1).strip() + "\n"

    new_text, _ = re.subn(
        re.escape(MARKER) + r"\r?\n?([^\n\r].*?)(?=\r?\n\*\*\*\* END BLOCK \*\*\*\*)",
        repl,
        text,
        flags=re.DOTALL,
    )
    n = count[0]
    if n:
        rel.write_text(new_text, encoding="utf-8")
        fixed_files += 1
        fixed_blocks += n
        print(f"{rel.parent.name}/{rel.name}: {n}")

print(f"Done: {fixed_blocks} blocks in {fixed_files} files")
