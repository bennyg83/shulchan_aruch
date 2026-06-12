# -*- coding: utf-8 -*-
"""Build _manual-111.json from Hebrew keys + English translations."""
import json
import re
from pathlib import Path

WORK = Path(__file__).parent
HEBREW = WORK / "_hebrew-111.json"
OUT = WORK / "_manual-111.json"

MECHABER = {
    "1#main": (
        "The law of pots of tereifah meat that became mixed with kosher ones. In it are 7 seifim: "
        "Two pots — one of heter and one of issur — and before him two pieces, one of heter and one of issur; "
        "if the piece is from a d'rabbanan issur, such as the fat of the gid hanasheh, and these fell into each other — "
        "they are permitted, for we suspend judgment to say the issur fell into the issur and the heter into the heter; "
        "and even if the heter in the pot is not greater than what is before him; and the same law applies if there was only one pot of slaughtered meat and one of these two pieces fell into it and it is not known which it is — "
        "we suspend judgment that the heter piece fell, even if the heter is not greater than the issur; "
        "or if there was only one piece of d'rabbanan issur and there are two pots, one of heter and one of issur, and it is not known into which it fell — in this too we suspend judgment to be lenient."
    ),
    "2#main": (
        "In what case is this stated — that we suspend judgment in all these to be lenient even if the heter is not greater than the issur — "
        "when the issur is also not greater than the heter; but if the issur is greater than the heter we do not suspend judgment to be lenient."
    ),
    "3#main": (
        "If the issur was from the Torah we do not suspend judgment to be lenient to say it fell into the issur "
        "until the heter is greater than the issur so that it will be nullified within it by Torah law."
    ),
    "4#main": (
        "If the heter was greater than the issur so that it would be nullified within it by Torah law — we suspend judgment to be lenient. How so? "
        "Two pots — one of slaughtered meat and one of nevelah — and a piece of nevelah fell into one of them; "
        "if the heter in the pot of heter is slightly greater than the piece of nevelah we suspend judgment to be lenient, "
        "because by Torah law species in its species is nullified in the majority, except that the Sages required sixty. "
        "If the two pots were of one species and the issur of another species we do not suspend judgment to be lenient until the heter is sixty times the issur."
    ),
    "5#main": (
        "If there were two pots of heter and before them two pieces, one of heter and one of issur, and one fell into this one and one into that one — "
        "both are forbidden, even in d'rabbanan issur, if neither has enough to nullify the issur; "
        "but if one of them has enough to nullify the issur — both are permitted."
    ),
    "6#main": (
        "If there were two pots of heter and issur fell into one of them and it is known into which it fell, and again issur fell into one of them and it is not known into which — "
        "I say that to the place of the first issur the second also fell; "
        "but if issur fell into one of them and it is not known into which, and afterward issur fell into one of them and it is known into which — both are forbidden: "
        "{Rama: And specifically when there is not sixty to nullify the issur that fell there; but if there was sixty to nullify the issur that fell there it is as if no issur fell there at all (Beit Yosef in name of Rashba).}"
    ),
    "7#main": (
        "If there were two pots of heter and issur fell into one of them and it is not known into which, and one does not have enough to nullify the issur but both together have enough to nullify it — both combine to nullify it; "
        "and not only that but even one in the house and one in the attic combine; and the same law applies even for a hundred. In what case? When all belong to one person, for whatever belongs to one person will eventually become mixed; "
        "but if they belong to two people they do not combine: "
        "{Rama: And some are stringent that even for one person one may not be lenient; and for need of loss one may permit for one person; however one may not eat it except after they have been mixed together, for then the issur has already been nullified (Arukh general rule 26 in name of Maharish).}"
    ),
}

# Load additional translations from companion module
from translations_111_data import TRANSLATIONS  # noqa: E402

def main():
    with HEBREW.open(encoding="utf-8") as f:
        hebrew = json.load(f)

    out = {}
    missing = []
    hebrew_pat = re.compile(r"[\u0590-\u05FF]")

    for slug, blocks in hebrew.items():
        out[slug] = {}
        src = MECHABER if slug == "mechaber" else TRANSLATIONS.get(slug, {})
        for key in blocks:
            if slug == "mechaber" and key in MECHABER:
                text = MECHABER[key]
            elif key in src:
                text = src[key]
            else:
                missing.append(f"{slug}/{key}")
                continue
            if hebrew_pat.search(text):
                raise ValueError(f"Hebrew in translation {slug}/{key}")
            out[slug][key] = text

    if missing:
        raise SystemExit(f"Missing {len(missing)} keys:\n" + "\n".join(missing[:30]))

    total = sum(len(v) for v in out.values())
    if total != 110:
        raise SystemExit(f"Expected 110 blocks, got {total}")

    with OUT.open("w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Wrote {OUT} ({total} blocks)")

if __name__ == "__main__":
    main()
