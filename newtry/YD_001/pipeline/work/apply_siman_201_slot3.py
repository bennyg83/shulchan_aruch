#!/usr/bin/env python3
"""Apply slot-3 quality-pass English replacements for siman 201."""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_201"

# key: "slug/file|seif|marker"  marker "_" for blank
T: dict[str, str] = {}

try:
    from sk_translations_data import SK_T

    T.update(SK_T)
except ImportError:
    SK_T = {}

def k(slug, part, seif, marker="_"):
    return f"{slug}/{part}|{seif}|{marker}"

# --- beer-hagolah part-001 ---
T[k("beer-hagolah", "part-001.txt", 18)] = (
    "Mishnah 5, chapter 4 of Mikvaot, and in several places."
)
T[k("beer-hagolah", "part-001.txt", 43)] = (
    "Mishnah 4, chapter 7 of Mikvaot, and per the explanation of Rosh and Rambam, may he rest in peace."
)
T[k("beer-hagolah", "part-001.txt", 51)] = (
    "Mishnah 5, chapter 7 of Mikvaot, and per the first Tanna; and so ruled Rambam there in chapter 7, and Shulchan Aruch."
)
T[k("beer-hagolah", "part-001.txt", 67)] = (
    "Tur, from the words of his father Rosh; and he holds that one cannot say they make a complete mikveh from kneaded clay, "
    "contrary to Sukkah 19b — \"kneaded clay proves\" that it combines to forty se'ah — and one does not immerse in it."
)
T[k("beer-hagolah", "part-001.txt", 71)] = (
    "Mishnah 10, chapter 2 of Mikvaot, and like Rabbi Yehoshua."
)

# --- baer-heitev part-002 ---
T[k("baer-heitev", "part-002.txt", 71)] = (
    "The impure one — this deals even with one who is tamei with rabbinic tumah; for otherwise let it be derived that "
    "a biblical doubt is stringent. Why do I need the reason of chazakah. Taz."
)
T[k("baer-heitev", "part-002.txt", 72, "א")] = (
    "There is not — throughout the entire seif it deals where there is a majority of valid water in the mikveh, so it "
    "is a rabbinic doubt. Taz and Shach."
)
T[k("baer-heitev", "part-002.txt", 72, "ב")] = (
    "They fell — and the same applies to all other types of invalid matter that fell into invalid matter. Shach."
)

# --- rabbi-akiva-eiger-yd part-001 ---
T[k("rabbi-akiva-eiger-yd", "part-001.txt", 4)] = (
    "(Shach s.k. 71) That the view of Ra'avad and Rashi is to forbid. And see Ba'alei Nefesh to Ra'avad, who holds that "
    "even if one crushed the snow afterward and it melted, it is not valid except to combine with a majority of water — "
    "for when it fell there was no water on it — see there."
)

# --- beur-hagra ---
T[k("beur-hagra", "part-001.txt", 15, "ח")] = (
    "From two vessels, etc. — meaning specifically from two vessels; but from one vessel, all agree they combine. "
    "Ra'avad; and so is clear in the mishnah there."
)
T[k("beur-hagra", "part-001.txt", 24)] = (
    "But in drawn water, etc. — as our author wrote, mishnah 8, chapter 6: \"there was in the upper...\" Rosh and "
    "Shulchan Aruch, not like Rambam, who explains \"he gave a se'ah,\" etc., as drawn water — for so the passage in "
    "Yevamos proves, as Tosafos questioned there s.v. natan, and they strained greatly on this. That mishnah is "
    "explained in Kesef Mishneh that specifically he removed invalid water in the majority; but if it descended by "
    "itself it is valid — see there. But the plain meaning of the mishnah implies like Rosh, Rashi, and Tosafos."
)
T[k("beur-hagra", "part-001.txt", 29)] = (
    "They fell to him, mikveh lacking, etc. — Rosh 7:4; Tosefta teaches, etc."
)
T[k("beur-hagra", "part-001.txt", 60)] = (
    "Three pits, etc. — Rosh 7:5; and as our author wrote, siman 54."
)
T[k("beur-hagra", "part-002.txt", 69)] = (
    "Mikveh that he left, pipe, etc. — Rosh 2:3; and Tosafos, chapter 4 of Bava Batra; and see above, seif 64."
)
T[k("beur-hagra", "part-002.txt", 72)] = (
    "Two mikvaot, etc. — Rosh 2:3; Tosefta teaches, etc."
)

# --- pitchei-teshuva part-001 ---
T[k("pitchei-teshuva", "part-001.txt", 24)] = (
    "Since he did not make it intentionally by a person. See well in Hagahot Mordechai to Kiddushin siman 540, "
    "and in Maharik root 56, and in Beit Yosef here, and in responsa Noda B'Yehuda, second series, siman 142, "
    "in the hagahah of Maharam Benet there; and see in responsa Chasam Sofer siman 201, who expanded on all this "
    "and wrote there that this reason — \"he did not make it intentionally by a person\" — requires further study "
    "according to what is explained in Chullin 13 and in Rambam, chapter 14 of Ma'achalot Assurot, and in Ra'avad "
    "to Mishnah, chapter 2 of Parah. It is also possible to say that for practical halachah most poskim would agree "
    "regarding plastering that is made by itself in a detached vessel that it invalidates, and they do not argue "
    "with Mordechai except regarding what was made through rotting of water after they were set — and for the reason "
    "that they set it and afterward hollowed it out, it is valid. He concludes there that to satisfy all doubts one "
    "should make it of metal, over which decay has no dominion; and so in chapter 89 of Mayim — only that one who "
    "makes it of metal should be careful that water not come to the mikveh through something that receives tumah, "
    "per what is explained in Shulchan Aruch, seifim 35 and 48 — see there; and there in siman 212 he wrote, etc., "
    "regarding repairing the mikveh: there is nothing better than making a mikveh through rainwater, which is valid "
    "and straight for all without doubt, through metal pipes from roofs; but near the mikveh one should make a pipe "
    "of wood, smooth inside with planing, so there are no pits or any obstruction of water. If the matter continues "
    "until the face of the earth is filled with snow and frost, they can fill with a shoulder of snow and ice, and "
    "afterward when it melts it will be a valid mikveh. It is better if they make two adjacent excavations and the "
    "partition between them is breached above, so that if one is full the other is filled through that breach. Then "
    "the mixture will never lack: once one of them is filled permissibly through rainwater or snow, they fill it with "
    "water in a shoulder with vessels — for it is not again invalidated by drawn water (as above, seif 15) — and "
    "whatever they pour into it all becomes valid mikveh-water. When it is full to all its banks, its companion is "
    "also filled through the breach between them; when the second is also full, if they wish to clean one they "
    "empty the water from it and clean it, then pour with a shoulder into the full one until the empty one is filled; "
    "after the empty one is filled they empty the two and clean that one too, and return to pour with a shoulder to "
    "the first — and so forever. They do so here in the large mikveh (mentioned there in siman 212; I brought it "
    "above, seif 15 — see there). It is good and proper advice without any doubt at all — end of his words; see "
    "there further in siman 214."
)
T[k("pitchei-teshuva", "part-001.txt", 43)] = (
    "Both are lacking. See in responsa Noda B'Yehuda, Yoreh De'ah part 2, siman 65, who wrote that it deals only "
    "if rain afterward descended and they were filled — for otherwise it is invalid in any case, for behold they "
    "are lacking; and so one must say in seif 72 regarding \"if they afterward fell,\" etc., and it is known to "
    "which it fell — therefore when they were again filled, both cases deal with that. Accordingly, according to "
    "Shach in seif 73, brought in Beit Heitev s.k. 108, here too b'dieved it is valid — see there."
)

# --- siftei-kohen part-001 seif 1 ---
T[k("siftei-kohen", "part-001.txt", 1, "א")] = (
    "\"With the water of a mikveh,\" etc. — that is, rainwater gathered in a pit; and even though they are not "
    "mayim chayim, for mayim chayim are required only for a zav (as it is written of him, \"mayim chayim\"), but "
    "not for a niddah or a zavah. Tur and the poskim. But wells that flow are a complete spring (for every purpose), "
    "as Maharik wrote and Beit Yosef in the name of Terumat HaDeshen, and in responsum of Ramban siman 231 — see there."
)
T[k("siftei-kohen", "part-001.txt", 1, "ב")] = (
    "\"Or a spring,\" etc. Beit Yosef wrote that it implies that if the water is drawn along — such as a spring that "
    "flows and nowhere along it has forty se'ah — but when one combines all the water from beginning to end they are "
    "forty se'ah, one may immerse anywhere in it, for the body of the person immersing is covered by it, whether a "
    "person or a vessel — end of his words; and he brought proofs, and Darkei Moshe brings it; and it is straightforward."
)

# --- siftei-kohen part-002 ---
T[k("siftei-kohen", "part-002.txt", 41, "ה")] = (
    "And they do not invalidate. And all the more so if he placed them in a courtyard not under the pipe at the time "
    "the clouds were gathering and afterward they dispersed — they do not invalidate. But the view of Ramban is that "
    "when one places them under the pipe at all times in every case it is considered intentional; and in a courtyard, "
    "at the time the clouds were gathering and they did not disperse, even if he forgot them there it is considered "
    "intentional. But if he placed them at the time the clouds were gathering and they returned and dispersed — and "
    "all the more so if he placed them in a courtyard at the time the clouds were dispersing — they are valid. And "
    "see Beit Yosef, who explained his reason correctly, and as his words prove in Rambam's explanation of the "
    "mishnah; also according to his words our passage in the Gemara, Shabbat 16b, \"and for Rabbi Yosi, who says the "
    "dispute still stands in its place,\" etc., fits well; also what is said there, 17b, \"it works out for Rabbi "
    "Meir but not for Rabbi Yosi,\" etc. — if so, for Rabbi Meir too, etc.; and Bach explained another explanation "
    "and wrote that Beit Yosef's explanation is far-fetched and reversed, and also not like R' Avraham son of Rambam "
    "whom Kesef Mishneh brings, who explained another far-fetched explanation — and according to him Rambam ruled like "
    "Rabbi Yosi; but explicitly it is proven in Rambam's explanation of the mishnah, chapter 4 of Mikvaot, and chapter "
    "1 of Shabbat, that he ruled like Rabbi Meir — see there. And Bach wrote the reason: although we hold Rabbi Meir "
    "and Rabbi Yosi — the halachah follows Rabbi Yosi — these matters are only where they argue for themselves; but "
    "here they argue according to Beit Shammai and Beit Hillel — not so; and this requires further study, for in "
    "several places it implies that in all cases we hold like Rabbi Yosi. Rather it appears to me because in "
    "Yerushalmi, chapter 1 of Shabbat, this matter of the pipe is counted among eighteen matters, and that is like "
    "Rabbi Meir; and also the plain sense of the sugya in the Gemara, eighteen matters, runs like Rabbi Meir — see "
    "there; and examine."
)
T[k("siftei-kohen", "part-002.txt", 66, "ג")] = (
    "But with vessels it is invalid — the wording of Beit Yosef; and Rashbatz wrote in a responsum that specifically "
    "with wood or stones; but with vessels it is invalid, as stated in the chapter Chomer baKodesh — end of his words. "
    "One must give a reason why wood and stones differ from vessels; and in Taz he wrote the reason: because their "
    "formation is through something that receives tumah. It is difficult: if so, he should have distinguished between "
    "wood and stones and something that receives tumah; also in Magen Avraham 213a it appears so — therefore he wrote "
    "that this requires further study from what is above, seif 50, that they nullify streaming through vessels, and "
    "the matter of formation through tumah does not apply here, for the mikveh is valid in any case — rather they "
    "want its water diminished; and it is preferable more than nullifying streaming above, for there, if not for the "
    "vessel, it would be invalidated entirely through streaming, which is not so here. Furthermore, Rashbatz wrote as "
    "in the chapter Chomer baKodesh, and there this matter is not found at all; and the essence of the matter of "
    "formation through taharah is in chapter 2 of Zevachim. Rather it appears that Rashbatz says thus: specifically "
    "wood and stones — because they have the measure of the opening of a wineskin; but not vessels, for ordinarily "
    "they do not have that measure — for if they have that measure, there is no vessel upon it, even though they have "
    "many openings, as in the chapter Chomer baKodesh: a mikveh divided with a basket and sieve — even though it has "
    "many openings, it is certain they do not combine. According to this, the author's wording is ambiguous; and one "
    "must say the tanna of the latter clause clarifies the first clause, and this is what it means: provided the entire "
    "mikveh is not divided — that is, that there be an opening like the opening of a wineskin; but with vessels that "
    "do not have an opening like the opening of a wineskin, it is invalid — examine. Tur wrote here the law of a "
    "vessel placed at the side of the mikveh through which one draws and brings the wave upon it, etc.; and it is "
    "written in Ma'adanei Melech 214a: a wonder in my eyes that Shulchan Aruch omitted this law, and also Rema, may "
    "he rest in peace, did not mention it — end of his words. A wonder exalted in my eyes that the words of our rabbi "
    "and Rema, may he rest in peace, escaped him above, seif 57, where they mentioned it explicitly — see there."
)

FAIL_PAT = re.compile(
    r"Lord's Prayer|Hashem|Capernaum|Burburn|Gomma|ovary|Phosician|IDF|Ps 119|"
    r"LibreTranslate|Who's the name|Tor and Phos|snail|M\. Sava|Bashburn|"
    r"star worker|Macau|visa\.|Posssty|mechanche",
    re.I,
)


def strip_html(s: str) -> str:
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace('\\"', '"')
    if s.startswith("[") and s.endswith("]"):
        s = s[1:-1]
    return s.strip()


def apply_file(rel: Path):
    text = rel.read_text(encoding="utf-8")
    parts = text.split("**** END BLOCK ****")
    out = []
    changed = 0
    for i, chunk in enumerate(parts):
        if "**** ENGLISH ****" not in chunk:
            out.append(chunk)
            continue
        slug_m = re.search(r"slug: (\S+)", chunk)
        seif_m = re.search(r"seif: (\d+)", chunk)
        marker_m = re.search(r"marker: (\S+)", chunk)
        if not slug_m or not seif_m:
            out.append(chunk)
            continue
        slug = slug_m.group(1)
        seif = seif_m.group(1)
        marker = marker_m.group(1) if marker_m else "_"
        key = k(slug, rel.name, seif, marker)
        hi = chunk.index("**** HEBREW ****")
        ei = chunk.index("**** ENGLISH ****")
        heb = chunk[hi + len("**** HEBREW ****") : ei].strip()
        eng_old = chunk[ei + len("**** ENGLISH ****") :].strip()
        new_eng = T.get(key)
        if new_eng is None and FAIL_PAT.search(eng_old):
            # leave unchanged but count
            pass
        elif new_eng is not None and new_eng != eng_old:
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
    total = 0
    for rel in sorted(ROOT.rglob("part-*.txt")):
        slug = rel.parent.name
        if slug not in {
            "siftei-kohen",
            "beur-hagra",
            "beer-hagolah",
            "baer-heitev",
            "pitchei-teshuva",
            "rabbi-akiva-eiger-yd",
        }:
            continue
        n = apply_file(rel)
        if n:
            print(f"{slug}/{rel.name}: {n} blocks")
            total += n
    print(f"Total blocks updated: {total}")
    print(f"Translations defined: {len(T)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
