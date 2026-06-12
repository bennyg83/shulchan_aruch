#!/usr/bin/env python3
"""Apply slot-3 quality-pass: merge all translation dicts and patch siman 201."""
import importlib.util
import re
import sys
from pathlib import Path

WORK = Path(__file__).resolve().parent
ROOT = WORK.parents[1] / "output" / "siman_201"

FAIL = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|&quot;|Burburn|Qur'an|Holy Qur|"
    r"star worker|Macau|ovary|Bible says|visa\.|Dr\. D\.|mechanche|"
    r"Gomma|Posssty|M\. Sava|snail's|the craft|allocated|Phosician",
    re.I,
)

SLUGS = {
    "siftei-kohen",
    "beur-hagra",
    "beer-hagolah",
    "baer-heitev",
    "pitchei-teshuva",
    "rabbi-akiva-eiger-yd",
}


def load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def k(slug, part, seif, marker="_"):
    return f"{slug}/{part}|{seif}|{marker}"


def build_T():
    import json

    base = load_module("apply_base", WORK / "apply_siman_201_slot3.py")
    T = dict(base.T)
    for part_file in sorted(WORK.glob("sk201_T_part*.py")):
        mod = load_module(part_file.stem, part_file)
        for name in dir(mod):
            if name.startswith("T") and isinstance(getattr(mod, name), dict):
                T.update(getattr(mod, name))
    # bulk siftei-kohen from sk_translations_data.py (preferred; sk_en_data.py often has quote issues)
    sk_data = WORK / "sk_translations_data.py"
    if sk_data.exists():
        mod = load_module("sk_translations_data", sk_data)
        if hasattr(mod, "SK_T"):
            T.update(mod.SK_T)
    for en_json in (WORK / "_sk_en_from_lines.json", WORK / "_sk_en.json"):
        if en_json.exists():
            T.update(json.loads(en_json.read_text(encoding="utf-8")))
    # beer-hagolah — all bad citation blocks
    bh = {
        k("beer-hagolah", "part-001.txt", 44): (
            "Rambam, chapter 6 of Hilchot Mikvaot, halachah 11, from mishnah 10, chapter 6 of Mikvaot: "
            "the pipe in the bathhouse, etc."
        ),
        k("beer-hagolah", "part-001.txt", 45): (
            "There, halachah 12, from the end of mishnah, chapter 6 of Mikvaot, and like Rabbi Yosi there; "
            "and it was already explained that drawn water invalidates only when there are not forty se'ah of valid water: "
            "(°) meaning less than forty se'ah — for if there are forty se'ah it is never invalidated; "
            "(°) meaning that a pool of forty se'ah of drawn water is 1,440 log according to the calculation of a se'ah — "
            "six kavim, and a kav is four log; thus one three-hundred-sixtieth is three log, for three times "
            "three-hundred-sixtieth is 1,440."
        ),
        k("beer-hagolah", "part-001.txt", 46): (
            "There, chapter 5, halachah 5, from mishnah 183 of Mikvaot, and like Rabbi Yosi."
        ),
        k("beer-hagolah", "part-001.txt", 47): (
            "There, halachah 6, from mishnah 3, chapter 3 of Mikvaot: "
            "(°) meaning of rainwater — for spring water, even in any quantity, purifies drawn water, as above seif 11 "
            "and as below in the hagahah."
        ),
        k("beer-hagolah", "part-001.txt", 48): "There, from mishnah 2 of chapter 3.",
        k("beer-hagolah", "part-001.txt", 49): "There, and like the first Tanna — agreement of the poskim.",
        k("beer-hagolah", "part-001.txt", 53): (
            "There, mishnah 3, in the name of Rabbi Yosi, and there is none who argues on it that dye has no substance — "
            "Rambam there and Shulchan Aruch."
        ),
        k("beer-hagolah", "part-001.txt", 56): (
            "As the view of Rosh and Tosafot in Yevamos, daf 82 — for that which we say there \"until the majority\" "
            "refers to fruit juice, for the Sages were stringent with fruit juice that is not fit for immersion at all."
        ),
        k("beer-hagolah", "part-001.txt", 58): "There, and like Rabbi Yosi, and as stated above.",
        k("beer-hagolah", "part-001.txt", 61): "There, mishnah 4 (Rambam, Ra'avad, and Rosh).",
        k("beer-hagolah", "part-001.txt", 64): (
            "Tosefta, and Rosh wrote in chapter 7 of Mikvaot, and Rosh explained that it deals when they did not change "
            "their appearance: (°) meaning for another mikveh to validate it, and hashakah does not help unless they "
            "poured and connected to the mikveh of water."
        ),
        k("beer-hagolah", "part-001.txt", 65): "Mishnah, beginning of chapter 7 of Mikvaot, and like the first Tanna.",
        k("beer-hagolah", "part-001.txt", 66): "There, in the mishnah: they testified, men of Midbar, etc.",
        k("beer-hagolah", "part-001.txt", 68): (
            "There, from the Tosefta: Rabbi Yehuda admits that he brings kneaded clay, etc.; and so too Ra'avad in "
            "Sefer Ba'alei Nefesh."
        ),
        k("beer-hagolah", "part-001.txt", 69): (
            "Tosafot of Taharot, and Rosh brought it, general principle 31, siman 2, in the name of the Tosefta: "
            "(°) meaning that it became ice."
        ),
        k("beer-hagolah", "part-001.txt", 70): (
            "It implies there from the words of Rosh that his explanation is valid to immerse in it, that it is a valid "
            "mikveh; and so explained Semag and Rabbenu Yerucham."
        ),
        k("beer-hagolah", "part-001.txt", 72): (
            "The conclusion of the Gemara, Zevachim, daf 22 side a, and all these measures over which tannaim argue "
            "in the mishnah — here they argue: one holds in this one drinks, and one holds in this one drinks. Rosh "
            "there in explanation of the mishnah; and so Tosafot in the first chapter of Sukkah, daf 19 side b; and "
            "Rosh at the end of Niddah; and so from the words of Rambam, chapter 8 of Hilchot Mikvaot."
        ),
        k("beer-hagolah", "part-001.txt", 74): (
            "Rambam, chapter 8, from that in Zevachim there, and as Rashi explained there."
        ),
    }
    T.update(bh)
    bh_rem = WORK / "bh201_remaining.py"
    if bh_rem.exists():
        mod = load_module("bh201_remaining", bh_rem)
        T.update(mod.BH_T)
    # beur-hagra extras
    bg = {
        k("beur-hagra", "part-001.txt", 15, "ו"): (
            "Or he threw them in his fists. In the Tosefta there, and Rosh brought the mishnah, 9, chapter 2; and so "
            "Rabbi Eliezer would sprinkle, etc.; and in mishnah 6, chapter 2: he would pluck, etc.; and there in the "
            "Tosefta Rosh brought: it teaches in the Tosefta, he had on his head, etc., he squeezed, etc.; and in "
            "Beit Yosef in the name of Ra'avad."
        ),
        k("beur-hagra", "part-001.txt", 15, "ז"): (
            "In an alternative case, etc. — there in the mishnah: in an alternative case, etc.; and the whole mishnah refers to this."
        ),
        k("beur-hagra", "part-001.txt", 15, "ט"): (
            "Specifically from three, etc. — there in the mishnah: from one vessel, etc.; and Rosh there on \"and the Sages invalidate,\" "
            "etc.; and Tosafot in Temurah, 12 side b, s.v. Yosef, etc."
        ),
        k("beur-hagra", "part-001.txt", 15, "י"): (
            "In an alternative case, etc. — there, and per Ra'avad and Tur. And Rambam explained: he intended to increase the mikveh-water."
        ),
        k("beur-hagra", "part-001.txt", 15, "כ"): (
            "And if he carried, etc. — Tosefta that Rosh brought in mishnah 9, chapter 2, and per Rosh there, end of seif 2 of the "
            "gloss: it is a pool, etc.; and if, etc.; but Rosh there wrote: and they sprinkled, etc., with the ground he speaks — "
            "meaning the latter clause refers to carrying; and so in the gloss and in an animal; and \"some say,\" etc.; and the view "
            "of Ra'avad and Rashba is like Rosh and Tur, as written in 139."
        ),
        k("beur-hagra", "part-001.txt", 16): "And likewise drawing, etc. — in Rambam's explanation there.",
        k("beur-hagra", "part-001.txt", 22, "א"): (
            "The mikveh was, etc. — Rosh 1:5: three log of drawn water fell into them, etc., and they are invalid for kashering, etc."
        ),
        k("beur-hagra", "part-001.txt", 22, "ב"): (
            "Until they increase, etc., or, etc. — there is no difference between \"they increased\" and \"they flooded\" except for "
            "impure water for challah, etc., where Beit Shammai and Beit Hillel and Rosh argue; but for a mikveh there is no dispute at all."
        ),
        k("beur-hagra", "part-001.txt", 23): "There is none, etc. — like the first Tanna and Rav, and as the conclusion of the Gemara in Makot, 4 side a.",
        k("beur-hagra", "part-001.txt", 25, "א"): (
            "Colored water, etc. — like Rabbi Yosi, from what he challenged from it in the first chapter of Makot (3 side b) and chapter 3 of Eruvin."
        ),
        k("beur-hagra", "part-001.txt", 25, "ב"): "But the mikveh, etc. — there, in the words of Rabbi Yosi.",
        k("beur-hagra", "part-001.txt", 30, "א"): "In a vessel. — Rosh there; and Rabbi Yosi agrees, etc.",
        k("beur-hagra", "part-001.txt", 30, "ב"): (
            "And when one estimates, etc., and then, etc. — for this is the dispute of the first Tanna and Rabbi Yosi there in the "
            "Tosefta mentioned, in Rosh: round masses of snow, etc.; and he says round masses must be pressed together so the measure "
            "not be lacking when they melt. Rosh, siman 8."
        ),
        k("beur-hagra", "part-001.txt", 30, "ג"): (
            "And there is, etc. — that it deals with melting; but that Tosefta implies like the first view; and so Beit Yosef; and "
            "although one can distinguish between completion and the whole, and like kneaded clay removed, nevertheless it appears to me."
        ),
        k("beur-hagra", "part-002.txt", 70): (
            "For behold there is, etc. — the language of Rambam, and not like the words of the poskim, because it is entirely drawn "
            "d'oraisa; and nevertheless there."
        ),
        k("beur-hagra", "part-002.txt", 71): (
            "An impure person descended, etc. — like the first Tanna, for by Torah law its doubt is impure; and so Rambam explicitly "
            "like the first Tanna — see there."
        ),
    }
    T.update(bg)
    # rabbi-akiva-eiger-yd remaining
    rae = {
        k("rabbi-akiva-eiger-yd", "part-001.txt", 1): (
            "(Siman 201, seif 4, in the hagahah) we follow the lenient view. See Maharit (Choshen Mishpat, siman 9) "
            "and see Tosafot (siman 199, s.k. 40)."
        ),
        k("rabbi-akiva-eiger-yd", "part-001.txt", 2): (
            '(Shulchan Aruch, seif 7) "the opening that purifies it." — this is for an earthenware vessel, whose measure '
            "is like removing an olive, which is less than the opening of a wineskin; but for a wooden barrel, whose "
            "measure of purification is like removing a pomegranate, it does not require so much, and it helps with "
            "like the opening of a wineskin, as Beit Yosef wrote explicitly; and therefore Rema wrote: and some say "
            "that it requires a hole like the opening of a wineskin, meaning that also for earthenware we require so, "
            "and this suffices for wood too. But it is difficult to me: although it helps that they not be drawn, "
            "nevertheless, since it is still a vessel that receives tumah, it is no better than immersing on the back "
            "of a wooden vessel, for immersion did not take effect according to Ra'avad, as he ruled, siman 198 "
            "(131) — and requires further study."
        ),
        k("rabbi-akiva-eiger-yd", "part-001.txt", 3): (
            '(Shach, s.k. 30) "And even though here the law of mikveh is upon them." — according to Shach\'s citation '
            "it is not understood, for behold here the water already rested; but in truth Shach abbreviated, for it is "
            "clear from Maharik there that he proved for one who invalidates below (seif 3); if so, it is proven from "
            "that below (seif 55) that it is an arranged mishnah, that even after they rested there is still spring "
            "upon them; and therefore here it must deal when there was water in the pool; and for those who hold here "
            "it deals even without water, and therefore in a stream he ruled there spring from it — in truth it is "
            "proven that that of seif 3 does not exist."
        ),
        k("rabbi-akiva-eiger-yd", "part-001.txt", 5): (
            '(Shach, s.k. 96) And Bach wrote, siman 26, in the name of Ra\'avad. — here it clearly deals when they '
            "come from a vessel; it is obvious that entirely through drawing is invalid; and Ra'avad wrote only when "
            "they come through a person without vessels, in this case it is valid even entirely through drawing."
        ),
        k("rabbi-akiva-eiger-yd", "part-001.txt", 6): (
            '(There, s.k. 99) And afterward they brought upon them a majority of valid water. — this implies that '
            "specifically in such a case, where the drawn water that was drawn does not combine for the measure of a "
            "mikveh to immerse in it; but if forty se'ah of rainwater fell upon them, it helps, for they do not have "
            "the full law of drawn water to judge regarding three log of drawn water that invalidate a mikveh, since "
            "what was drawn is not called actual drawn water, only it does not combine and a mikveh measure is needed "
            "without it — as is explicitly the view of R' Shmuel, who received from his teachers in Tosafot, Temurah "
            "(12); and even for the other explanation, nevertheless one can say they did not argue on this law — "
            "requires further study for practical halachah."
        ),
    }
    T.update(rae)
    T[k("baer-heitev", "part-002.txt", 71)] = (
        "Between in the public domain and in a karmelit. — meaning: even though generally we hold that doubtful tumah "
        "in the public domain is pure, here we say: establish the impure person on his presumption."
    )
    return T


def apply_file(rel: Path, T: dict) -> int:
    text = rel.read_text(encoding="utf-8")
    slug = rel.parent.name
    parts = text.split("**** END BLOCK ****")
    out = []
    changed = 0
    for chunk in parts:
        if "**** ENGLISH ****" not in chunk:
            out.append(chunk)
            continue
        seif_m = re.search(r"seif: (\d+)", chunk)
        marker_m = re.search(r"marker: (\S+)", chunk)
        if not seif_m:
            out.append(chunk)
            continue
        seif = seif_m.group(1)
        marker = marker_m.group(1) if marker_m else "_"
        key = k(slug, rel.name, seif, marker)
        ei = chunk.index("**** ENGLISH ****")
        eng_old = chunk[ei + len("**** ENGLISH ****") :].strip()
        new_eng = T.get(key)
        if new_eng is not None and new_eng != eng_old:
            chunk = chunk[: ei + len("**** ENGLISH ****")] + "\n" + new_eng + "\n"
            changed += 1
        out.append(chunk)
    new_text = "**** END BLOCK ****".join(out)
    if not new_text.endswith("\n"):
        new_text += "\n"
    if changed:
        rel.write_text(new_text, encoding="utf-8")
    return changed


def main():
    T = build_T()
    counts = {}
    total = 0
    for rel in sorted(ROOT.rglob("part-*.txt")):
        if rel.parent.name not in SLUGS:
            continue
        n = apply_file(rel, T)
        if n:
            counts[rel.parent.name] = counts.get(rel.parent.name, 0) + n
            total += n
            print(f"{rel.parent.name}/{rel.name}: {n}")
    print(f"Total updated: {total}")
    print(f"Keys in T: {len(T)}")
    # report remaining bad
    bad = {}
    for rel in sorted(ROOT.rglob("part-*.txt")):
        if rel.parent.name not in SLUGS:
            continue
        text = rel.read_text(encoding="utf-8")
        for chunk in text.split("**** END BLOCK ****"):
            if "**** ENGLISH ****" not in chunk:
                continue
            eng = chunk.split("**** ENGLISH ****", 1)[1].strip()
            if FAIL.search(eng):
                bad[rel.parent.name] = bad.get(rel.parent.name, 0) + 1
    print("Remaining bad blocks:", bad)
    return 0


if __name__ == "__main__":
    sys.exit(main())
