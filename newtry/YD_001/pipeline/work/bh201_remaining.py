# -*- coding: utf-8 -*-
"""Beer HaGolah siman 201 — remaining 8 bad citation blocks."""
from pathlib import Path

def k(part, seif, marker="_"):
    return f"beer-hagolah/{part}|{seif}|{marker}"

BH_T = {
    k("part-001.txt", 4): (
        "Rashbatz in the name of Ra'avad: we require an amah that laughs; and Rashba wrote that one who is silent is "
        "better than one who is sad — half a finger — from Mishnah 9, chapter 17 of Kelim."
    ),
    k("part-001.txt", 8): (
        "Tur; and so Tosafot, Shabbat, daf 65 side b; and so appears from words of Rambam, chapter 9 of Hilchot "
        "Mikvaot, and Shulchan Aruch; and the reason is because a spring is called in every context, whether in flowing "
        "waters or in ashboran; but a mikveh is called only in ashboran, as it is written: let the waters be gathered "
        "to one place — and in this manner we explain \"mikveh\" as written in the verse."
    ),
    k("part-001.txt", 10): (
        "There, from that which Avuhu diShmuel [made mikvaot], as Rambam explained."
    ),
    k("part-001.txt", 11): (
        "In Mishnah 7, chapter 1 of Mikvaot, and in several places in mishnah and Talmud, and in Torat Kohanim they "
        "infer it from what is written: only a spring and a pit, a collection of water — as a spring is from Heaven, "
        "so too a mikveh is from Heaven."
    ),
    k("part-001.txt", 19): (
        "Wording of Rambam, chapter 6 of Mikvaot, halachah 4, from the Tosefta: Castilian who divides water, etc.; "
        "and like R' Elazar son of R' Yosi there."
    ),
    k("part-001.txt", 26): (
        "Rambam, chapter 3 of Hilchot Mikvaot, halachah 26, from the Tosefta, chapter 5."
    ),
    k("part-001.txt", 31): (
        "Mishnah 2, chapter 5 of Mikvaot, and per the explanation of Rambam and Rosh, and like Rabbi Yosi there."
    ),
    k("part-001.txt", 35): (
        "Rambam and Rosh there, from mishnah 7, chapter 1 of Mikvaot, and from mishnah 3, chapter 5; and even "
        "l'chatchila — Rosh in a responsum and Mordechai in chapter 2 of Shevuot."
    ),
}
