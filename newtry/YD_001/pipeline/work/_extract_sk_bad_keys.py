import re
from pathlib import Path

FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|Burburn|Gomma|ovary|Phosician|IDF|Ps 119|"
    r"Posssty|mechanche|star worker|Macau|Bashburn|M\. Sava|Tor and Phos",
    re.I,
)
root = Path(__file__).resolve().parents[2] / "output" / "siman_201" / "siftei-kohen"
out = Path(__file__).parent / "_sk_bad_keys.txt"
lines = []
for fp in sorted(root.glob("part-*.txt")):
    text = fp.read_text(encoding="utf-8")
    for ch in text.split("**** END BLOCK ****"):
        if "**** ENGLISH ****" not in ch:
            continue
        seif = re.search(r"seif: (\d+)", ch)
        marker = re.search(r"marker: (\S+)", ch)
        eng = ch.split("**** ENGLISH ****", 1)[1].strip()
        if not FAIL.search(eng):
            continue
        s = seif.group(1) if seif else "?"
        m = marker.group(1) if marker else "_"
        heb = ch.split("**** HEBREW ****", 1)[1].split("**** ENGLISH ****", 1)[0]
        heb = re.sub(r"<[^>]+>", "", heb).replace('\\"', '"')[:120]
        lines.append(f"siftei-kohen/{fp.name}|{s}|{m}|{heb}")
out.write_text("\n".join(lines), encoding="utf-8")
print(len(lines), "keys written")
