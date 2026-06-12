#!/usr/bin/env python3
"""Extract (key_suffix, english) from sk_en_data.py without executing it."""
import json
import re
from pathlib import Path

path = Path(__file__).parent / "sk_en_data.py"
lines = path.read_text(encoding="utf-8").splitlines()
out = {}


def parse_value(s: str) -> str:
    s = s.strip()
    if s.startswith("'''"):
        if not s.endswith("'''"):
            raise ValueError("bad triple")
        return s[3:-3]
    if s.startswith('"""'):
        return s[3:-3]
    q = s[0]
    if s[-1] != q:
        raise ValueError(f"unclosed: {s[:40]}...")
    body = s[1:-1]
    if q == '"':
        return body.replace('\\"', '"').replace("\\'", "'")
    return body.replace("\\'", "'").replace('\\"', '"')


for line in lines:
    line = line.strip()
    if not line.startswith('("part-'):
        continue
    if not line.endswith("),") and not line.endswith('"),'):
        continue
    m = re.match(r'\("([^"]+)",\s*(.*)\),?\s*$', line)
    if not m:
        # multiline not supported
        continue
    key, val_part = m.group(1), m.group(2)
    try:
        out[key] = parse_value(val_part)
    except ValueError:
        pass

dest = Path(__file__).parent / "_sk_en_from_lines.json"
data = {f"siftei-kohen/{k}": v for k, v in out.items()}
dest.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print(len(data), "parsed ->", dest)
