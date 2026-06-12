#!/usr/bin/env python3
"""Generate sk201_T_bulk.py from Hebrew JSON + manual translation file."""
import json
from pathlib import Path

WORK = Path(__file__).parent
items = json.loads((WORK / "_hebrew_bad_201.json").read_text(encoding="utf-8"))
done = set()
for pf in ["sk201_T_part1.py", "sk201_T_part2.py"]:
    text = (WORK / pf).read_text(encoding="utf-8")
    import re
    for m in re.finditer(r'k\("([^"]+)", (\d+)(?:, "([^"]+)")?\)', text):
        part, seif, marker = m.group(1), m.group(1), m.group(3)
    # simpler: parse keys from T dict lines
for m in __import__("re").finditer(r'k\("part-[^"]+", \d+(?:, "[^"]+")?\)', (WORK/"sk201_T_part1.py").read_text() + (WORK/"sk201_T_part2.py").read_text()):
    pass

# list missing keys to file
from sk201_T_part1 import k, T1
from sk201_T_part2 import T2
done = set(T1) | set(T2)
missing = [x for x in items if x["key"] not in done]
(WORK / "_missing_keys.txt").write_text("\n".join(x["key"] for x in missing), encoding="utf-8")
print(len(missing))
