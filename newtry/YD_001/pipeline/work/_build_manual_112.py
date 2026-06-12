# -*- coding: utf-8 -*-
"""Build _manual-112.json from complete English translations for siman 112."""
import json
import re
from pathlib import Path

WORK = Path(__file__).parent
HEBREW = WORK / "_hebrew-112.json"
OUT = WORK / "_manual-112.json"

HEBREW_RE = re.compile(r"[\u0590-\u05FF\uFB1D-\uFB4F]")

T = {
  "baer-heitev": {
    "1#א": "Marriage [concern]. The Shach wrote: but regarding the revulsion of gentiles there is no concern, for ordinarily their vessels are not ben yomo; also, pat akum is not forbidden unless a non-Jew baked it. And what he wrote regarding a place where there is no marriage concern — meaning, such as the bread of heretics who have no children — is forbidden, for if this one has no children, that one does; the Sages did not differentiate.",
    "1#ב": "Grain. For this is an important matter and leads to familiarity. Taz.",
    "1#ג": "Kings. The Bach challenged this and wrote that there is no doubt that bread of legumes, rice, and millet does not go upon a king's table; rather, the Rosh deals with a cooked dish made from rice and millet, regarding which there is a distinction whether it goes upon a king's table or not. See Turei Chayim, law 11, in the name of Issur VeHeter.",
    "2#א": "Baker. The Shach wrote: specifically pat akum; but pat Yisrael that a non-Jew baked — [and did not kasher the oven by throwing kisam] — nowhere was the practice to permit it, for it is like bishulei akum; the reason they did not forbid pat akum is that it is a decree the majority of the community cannot abide by; but regarding pat Yisrael that a non-Jew baked, that reason does not apply; therefore it is forbidden.",
    "2#ב": "Available. In the Mordechai he wrote the reason: because those places that practice leniency did so since the prohibition of pat akum did not spread at the beginning of the decree in those places, for the prohibition of pat akum did not spread throughout all Israel. Accordingly it appears that even pat baal habayit is permitted for that reason; but from the words of Issur VeHeter and the Rama it is clear that even those who practiced leniency regarding pat palter forbid pat baal habayit. Turei Chayim wrote that even those who practice leniency regarding pat akum should be careful on the Ten Days of Repentance; and so explained Orach Chaim, siman 242, seif 2 — see there. However, it appears one should be careful all year round not to buy pat akum from the palter where there is a Jewish palter, unless the pat akum is better — then it is permitted. Shach.",
    "3#_": "He ordered. The Shach wrote: it is difficult, for the Mechaber holds below, seif 7, that we follow the beginning; how then did he write this law here? Perhaps for that reason they wrote in the name of \"some say,\" or it is possible he holds according to his reasoning to distinguish that when the palter was ordered by him it is worse — end of his words.",
    "4#_": "To buy. What the Shach challenged here was corrected [by us] in Nachalat Binyamin, that he erred between the word \"likach\" and \"lekach\" — see there; investigate. All this is according to the Mechaber, seif 2; but according to the second view in the gloss, it is plainly permitted.",
    "6#א": "With eggs. Why should we be concerned? If because of blood — the majority of eggs have no blood, as above, siman 66, seif 8. If because of an egg of an impure bird — they are not common among us, as above, siman 86, seif 2. If because of bishulei akum — eggs are forbidden; we establish that flour is primary — end of his words, Shach; and see above, siman 113.",
    "6#ב": "Sweet kinds. Since if one establishes a meal upon them he recites ha-Motzi, their law is like bread proper. Taz; and specifically those whose batter is [thick] and have the status of bread; and so too in Turei Chayim.",
    "10#_": "Kashering. Hagahot ShaDa wrote that if one is in doubt whether a Jew kashered the oven or not, it is permitted, for it is a d'rabbanan doubt and we rule leniently; and so too the Rav in Turei Chayim.",
    "13#_": "He cuts. The Taz and Shach wrote; and what the Mechaber wrote in Orach Chaim, siman 168, that one removes pat akum from the table until after ha-Motzi — there it deals with when no other person is reclining with him; but here, since another Jew is reclining with him, if he does not bless on clean bread there is enmity. And even though it appears there that if only one person is reclining with him there is no enmity — what comparison is there between this and that? — nevertheless, since regarding ha-Motzi one is obligated to bless on the finest, if he does not bless there is great enmity. Alternatively, specifically when both their breads are equal is there no enmity when there is only one [guest]; but when the bread of one who is not careful is cleaner and finer and nevertheless he does not eat it, there is certainly enmity.",
    "14#א": "Kutach. The Taz wrote that one should not forbid it because of gentile milk, for impure milk does not stand; and if we say there is a slight admixture of milk in it, nevertheless it is nullified in its minority since it is mixed in, and it is not comparable to butter in siman 115 which is not mixed in — end of Rashal's words. To me, the younger, it seems astonishing that milk admixture is certainly not nullified in its minority; proof from the Gemara, chapter Elu Overin, Babylonian kutach, etc.; and also in chapter Ein Ma'amidin it states that one who curdled kemakha — which is kutach — the milk is forbidden. Rather, here it deals with when it was made with supervision that a Jew sees it, only that the non-Jew puts his bread there, for there is no prohibition of pat akum in that — end of his words.",
    "14#ב": "Moist. Even if it is an important item, these laws apply even to actual bishulei akum — so too in Issur VeHeter and Turei Chayim. And what he wrote, \"but it is forbidden to mix it\" — Darkei Moshe wrote on this, and it appears to me that nevertheless one may be permitted to eat in one bowl and there is no reason to forbid because of taste that became mixed; they only forbade mixing l'chatchila to eat the bread itself; but regarding taste there is no concern. However, in Hagahot ShaDa he forbids l'chatchila — end of his words. The Shach wrote that this is not necessary; one may say it also deals when one eats the bread itself; and in any case the bowl is a second vessel and he is not cooking.",
    "15#_": "Prohibitions. The Shach wrote: even gentile butter and the like — in a place where they practice prohibition, a light prohibition is still a prohibition; specifically regarding bread there is enmity, because \"by bread shall man live\"; but not regarding other foods, for many people have no desire to eat butter, and the like. The Taz wrote that the Beit Yosef proved one may buy gentile leaven and use it to ferment dough, even for one who is careful about pat akum, for the Sages did not decree on pat akum regarding taste like the substance itself; but regarding crumbs that are visible, they are certainly forbidden as long as they were not nullified in the majority — end of his words.",
  },
  "beer-hagolah": {
    "1#א": "Mishnah, Avodah Zarah, daf 35.",
    "1#ב": "Tur in the name of his father's responsum, the Rosh (and Rabbeinu Yerucham).",
    "2#א": "Tur in the name of the second view, and according to the Yerushalmi; and so the Rashba and Ran (and Rambam, chapter 17 of Hilchot Ma'achalot Assurot) — Rabbi Yochanan does not disagree; on the contrary, Rabbi Chelbo there, daf 35; and we rule according to both leniently.",
    "2#ב": "There.",
    "3#_": "Orach Chayim in the name of the Ra'ah (and Kelbo, and it is in Bedek HaBayit, daf 88, side 2).",
    "4#_": "There.",
    "5#א": "Tur in the name of the Rashba in Torat HaBayit (and so the Ran).",
    "5#ב": "Beit Yosef in the name of the Rashba there in Torat HaBayit; and so is the view of his teacher the Rav R' Yosef.",
    "6#א": "Tosafot, the Rosh, and the Ran there; and the Rashba in Torat HaBayit.",
    "6#ב": "There, in seif 5, that there is no concern of bishulei akum in them, for flour is primary; and one need not be concerned about blood in eggs or an egg of an impure bird, for we follow the majority.",
    "6#ג": "There; and see in the siman after this, seif 3.",
    "7#_": "The Rosh in a responsum, the Rashba in Torat HaBayit, and the Ran in chapter 2 of Avodah Zarah — from that house of wheat upon which a barrel of yayin nesech fell, that Rav permitted to grind and to sift and to sell to gentiles, there, daf 65.",
    "8#_": "Sefer Orach Chayim in the name of the Ra'am and Kelbo.",
    "9#א": "The statement of Ravina: the halachah is this bread, etc. — Avodah Zarah, daf 38.",
    "9#ב": "Tur in the name of the Rambam, chapter 7 of Hilchot Ma'achalot Assurot.",
    "10#_": "Mordechai, chapter 2 of Avodah Zarah, according to the incident.",
    "11#_": "There in the Mordechai in the name of Rabbeinu Meir — from that boat that sank in a swamp, Pesachim, daf 40; and Agudah; and ShaDa; and Semak; and Kol Bo.",
    "12#א": "There.",
    "12#ב": "The Agur in the name of ShaDa (and from Maharai; and Issur VeHeter).",
    "13#_": "Mordechai there in the name of Ravyah — from that in Eruvin, daf 41: if he is clever he enters his boundary, etc. — that they were not stringent regarding d'rabbanan prohibitions, for there is no honor of Heaven that he should again refrain because of a prohibition when he has already transgressed (Agudah and Terumat HaDeshen, siman 32).",
    "14#_": "Tur in the name of the Geonim and the Rashba in the name of the Rosh.",
    "15#_": "There in the name of R' Yitzchak in Tosafot, Avodah Zarah, daf 35 — from that they did not decree on mixtures of demai, Chullin, daf 6.",
    "16#_": "So too in the name of Sefer Agudah, chapter 9 of Chullin.",
  },
}

# Continue in part 2 - loaded from external for size
exec((WORK / "_build_manual_112_part2.py").read_text(encoding="utf-8"), {"T": T, "WORK": WORK})

def has_hebrew(s):
    return bool(HEBREW_RE.search(s))

def main():
    with open(HEBREW, encoding="utf-8") as f:
        heb_data = json.load(f)
    total = sum(len(v) for v in heb_data.values())
    missing = []
    extra_heb = []
    for slug, blocks in heb_data.items():
        for key in blocks:
            if slug not in T or key not in T[slug]:
                missing.append(f"{slug}/{key}")
            else:
                val = T[slug][key]
                if has_hebrew(val):
                    extra_heb.append(f"{slug}/{key}")
    if missing:
        raise SystemExit(f"Missing translations ({len(missing)}): " + ", ".join(missing[:20]))
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(T, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"Wrote {OUT}")
    print(f"Block count: {total}")
    print(f"Keys with Hebrew remaining: {len(extra_heb)}")
    if extra_heb:
        for k in extra_heb[:30]:
            print(f"  {k}")

if __name__ == "__main__":
    main()
