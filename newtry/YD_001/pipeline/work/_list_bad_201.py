#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201"
FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|&quot;|Burburn|Qur'an|Holy Qur|"
    r"star worker|Macau|ovary|Bible says|visa\.|Dr\. D\.|mechanche|"
    r"Gomma|Posssty|M\. Sava|snail's|the craft|allocated|Phosician",
    re.I,
)
SLUGS = [
    "siftei-kohen",
    "beur-hagra",
    "beer-hagolah",
    "baer-heitev",
    "pitchei-teshuva",
    "rabbi-akiva-eiger-yd",
]

out_lines = []
for slug in SLUGS:
    keys = []
    for rel in sorted((ROOT / slug).glob("part-*.txt")):
        for chunk in rel.read_text(encoding="utf-8").split("**** END BLOCK ****"):
            if "**** ENGLISH ****" not in chunk:
                continue
            eng = chunk.split("**** ENGLISH ****", 1)[1].strip()
            if not FAIL.search(eng):
                continue
            seif = re.search(r"seif: (\d+)", chunk).group(1)
            m = re.search(r"marker: (\S+)", chunk)
            mk = m.group(1) if m else "_"
            keys.append(f"{rel.name}|{seif}|{mk}")
    out_lines.append(f"{slug} {len(keys)}")
    for k in keys:
        out_lines.append(f"  {k}")
out = Path(__file__).parent / "_bad_201_keys.txt"
out.write_text("\n".join(out_lines), encoding="utf-8")
print(f"Wrote {out} ({len(out_lines)} lines)")
