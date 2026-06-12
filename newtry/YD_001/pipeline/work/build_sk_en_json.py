#!/usr/bin/env python3
# Builds _sk_en.json from inline TRANSLATIONS list: (key_suffix, english)
# key_suffix = "part-001.txt|2|ה" etc (after siftei-kohen/)
import json
from pathlib import Path

TRANSLATIONS = []  # filled by exec of sk_en_data.py

if __name__ == "__main__":
    data = {}
    exec((Path(__file__).parent / "sk_en_data.py").read_text(encoding="utf-8"), {"TRANSLATIONS": TRANSLATIONS})
    for key_suffix, eng in TRANSLATIONS:
        data[f"siftei-kohen/{key_suffix}"] = eng
    out = Path(__file__).parent / "_sk_en.json"
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(len(data), "entries ->", out)
