# -*- coding: utf-8 -*-
import json
import re
from pathlib import Path
from _t112_all import T

WORK = Path(__file__).parent
HEBREW = WORK / "_hebrew-112.json"
OUT = WORK / "_manual-112.json"
HEBREW_RE = re.compile(r"[\u0590-\u05FF\uFB1D-\uFB4F]")

with open(HEBREW, encoding="utf-8") as f:
    heb_data = json.load(f)

missing = []
extra = []
total = 0
for slug, blocks in heb_data.items():
    for key in blocks:
        total += 1
        if slug not in T or key not in T[slug]:
            missing.append(f"{slug}/{key}")
        elif HEBREW_RE.search(T[slug][key]):
            extra.append(f"{slug}/{key}")

if missing:
    raise SystemExit(f"Missing {len(missing)}: " + ", ".join(missing))

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(T, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"Wrote {OUT}")
print(f"Block count: {total}")
print(f"Keys with Hebrew remaining: {len(extra)}")
for k in extra:
    print(f"  {k}")
