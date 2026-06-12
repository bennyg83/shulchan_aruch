import re
from pathlib import Path

FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|Burburn|Gomma|ovary|Phosician|IDF|Ps 119|LibreTranslate",
    re.I,
)
root = Path(__file__).resolve().parents[2] / "output" / "siman_201" / "siftei-kohen"
for fp in sorted(root.glob("part-*.txt")):
    text = fp.read_text(encoding="utf-8")
    chunks = text.split("**** END BLOCK ****")
    bad = []
    for ch in chunks:
        if "**** ENGLISH ****" not in ch:
            continue
        seif = re.search(r"seif: (\S+)", ch)
        marker = re.search(r"marker: (\S+)", ch)
        eng = ch.split("**** ENGLISH ****", 1)[1].strip()
        if FAIL.search(eng):
            bad.append(f"{seif.group(1) if seif else '?'}/{marker.group(1) if marker else '?'}")
    print(fp.name, len(bad))
