#!/usr/bin/env python3
"""Per-slug counts for siman 201 slot-3 slugs."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201"
SLUGS = [
    "siftei-kohen",
    "beur-hagra",
    "beer-hagolah",
    "baer-heitev",
    "pitchei-teshuva",
    "rabbi-akiva-eiger-yd",
]
FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|&quot;|Burburn|Qur'an|Holy Qur|"
    r"star worker|Macau|ovary|Bible says|visa\.|mechanche|Gomma|"
    r"the craft|allocated|Phosician|Capernaum",
    re.I,
)
report = json.loads(
    (Path(__file__).resolve().parents[2] / "checklist-output" / "quality-report.json").read_text(
        encoding="utf-8"
    )
)
q_by_slug = {
    s: {"error": 0, "warn": 0, "mt_garbage": 0, "blocks_flagged": set()} for s in SLUGS
}
for item in report.get("blocks", []):
    slug = item.get("slug")
    if slug not in q_by_slug:
        continue
    sev = item.get("severity", "warn")
    if sev in q_by_slug[slug]:
        q_by_slug[slug][sev] += 1
    codes = {i.get("code") for i in item.get("issues", [])}
    if "mt_garbage" in codes:
        q_by_slug[slug]["mt_garbage"] += 1
    q_by_slug[slug]["blocks_flagged"].add(item.get("id", ""))

print("=== MT garbage (FAIL regex) remaining ===")
for slug in SLUGS:
    bad = 0
    total = 0
    for rel in sorted((ROOT / slug).glob("part-*.txt")):
        for chunk in rel.read_text(encoding="utf-8").split("**** END BLOCK ****"):
            if "**** ENGLISH ****" not in chunk:
                continue
            total += 1
            eng = chunk.split("**** ENGLISH ****", 1)[1].strip()
            if FAIL.search(eng):
                bad += 1
    print(f"{slug}: {bad} bad / {total} blocks")

print("\n=== Quality validator (flagged blocks) ===")
for slug in SLUGS:
    d = q_by_slug[slug]
    print(
        f"{slug}: {len(d['blocks_flagged'])} blocks flagged "
        f"(errors={d['error']}, warns={d['warn']}, mt_garbage={d['mt_garbage']})"
    )
