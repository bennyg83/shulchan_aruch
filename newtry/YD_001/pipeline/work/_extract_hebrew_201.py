"""Extract Hebrew for bad blocks into JSON for batch translation."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201"
FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|&quot;|Burburn|Qur'an|Holy Qur|"
    r"star worker|Macau|ovary|Bible says|visa\.|Dr\. D\.|mechanche",
    re.I,
)
TARGET = {"siftei-kohen"}  # argv override via env
import sys

if len(sys.argv) > 1:
    TARGET = set(sys.argv[1:])

items = []
for rel in sorted(ROOT.rglob("part-*.txt")):
    slug = rel.parent.name
    if slug not in TARGET:
        continue
    text = rel.read_text(encoding="utf-8")
    for chunk in text.split("**** END BLOCK ****"):
        if "**** ENGLISH ****" not in chunk:
            continue
        seif_m = re.search(r"seif: (\d+)", chunk)
        marker_m = re.search(r"marker: (\S+)", chunk)
        if not seif_m:
            continue
        eng = chunk.split("**** ENGLISH ****", 1)[1].strip()
        if not FAIL.search(eng):
            continue
        heb_raw = chunk.split("**** HEBREW ****", 1)[1].split("**** ENGLISH ****")[0].strip()
        heb = re.sub(r"<br\s*/?>", "\n", heb_raw, flags=re.I)
        heb = re.sub(r"<[^>]+>", "", heb)
        heb = heb.replace('\\"', '"')
        if heb.startswith("[") and heb.endswith("]"):
            heb = heb[1:-1]
        heb = heb.strip()
        items.append(
            {
                "key": f"{slug}/{rel.name}|{seif_m.group(1)}|{marker_m.group(1) if marker_m else '_'}",
                "hebrew": heb,
            }
        )

out = Path(__file__).with_name("_hebrew_bad_201.json")
out.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
print(len(items), "blocks ->", out)
