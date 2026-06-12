#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201" / "siftei-kohen"
FAIL = re.compile(
    r"Lord's Prayer|Hashem|&quot;|Capernaum|Burburn|Qur'an|mechanche|Gomma|"
    r"the craft|allocated|Phosician|talent\. I don't",
    re.I,
)
BAD_KEYS = [
    "part-001.txt|14|ב",
    "part-001.txt|15|א",
    "part-001.txt|15|ג",
    "part-001.txt|22|א",
    "part-001.txt|24|א",
    "part-001.txt|24|ג",
    "part-001.txt|25|ב",
    "part-001.txt|30|ג",
    "part-002.txt|36|א",
    "part-002.txt|36|ג",
    "part-002.txt|40|ד",
    "part-002.txt|44|ד",
    "part-002.txt|48|א",
    "part-002.txt|49|ב",
    "part-002.txt|50|א",
    "part-002.txt|50|ב",
    "part-002.txt|52|ב",
    "part-002.txt|52|ה",
    "part-002.txt|53|א",
    "part-002.txt|53|ב",
    "part-002.txt|54|א",
    "part-002.txt|55|ב",
    "part-002.txt|58|א",
    "part-002.txt|58|ב",
    "part-002.txt|59|א",
    "part-002.txt|60|א",
    "part-002.txt|60|ב",
    "part-002.txt|62|ב",
    "part-002.txt|65|ב",
    "part-002.txt|66|א",
    "part-002.txt|66|ב",
    "part-002.txt|72|א",
    "part-002.txt|72|ב",
]

out = {}
for rel in ROOT.glob("part-*.txt"):
    text = rel.read_text(encoding="utf-8")
    for chunk in text.split("**** END BLOCK ****"):
        if "**** HEBREW ****" not in chunk:
            continue
        seif = re.search(r"seif: (\d+)", chunk).group(1)
        m = re.search(r"marker: (\S+)", chunk)
        mk = m.group(1) if m else "_"
        key = f"{rel.name}|{seif}|{mk}"
        if key not in BAD_KEYS:
            continue
        hi = chunk.index("**** HEBREW ****")
        ei = chunk.index("**** ENGLISH ****")
        heb = chunk[hi + len("**** HEBREW ****") : ei].strip()
        eng = chunk[ei + len("**** ENGLISH ****") :].strip()
        out[key] = {"hebrew": heb, "english_bad": eng[:120]}

Path(__file__).parent.joinpath("_sk_bad33.json").write_text(
    json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(len(out), "blocks")
