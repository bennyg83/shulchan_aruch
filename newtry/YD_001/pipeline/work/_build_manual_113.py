#!/usr/bin/env python3
"""Build _manual-113.json with complete English translations."""
import json
import re
from pathlib import Path

WORK = Path(__file__).parent
HEBREW = json.loads((WORK / "_hebrew-113.json").read_text(encoding="utf-8"))

MANUAL = {
  "baer-heitev": {
    "1#_": '"Rises [on the king\'s table]." The Shach wrote that from the words of the Mechaber and the Rav in Darkei Moshe it appears that even if it was not changed from its natural state by fire it is forbidden; but in truth the essence of the Gemara appears that it is not forbidden because of bishul akum except when it was changed from its natural state by fire. And the Issur ve-Heter wrote that gizzards, crop, and innards — even though we said above in siman 87 that their food is not human food and is not a piece worthy of honor — nevertheless they are forbidden because of bishul akum; and herbs and mushrooms rise on the king\'s table as relish, and there is in them [the prohibition] of bishul akum — end of his words.',
    "2#_": '"Permitted." The Turei Chayim wrote that they practice leniency in the community of Krakow to buy whole nuts called shtendlen nussen that gentiles cook, for they are permitted because they do not rise on the king\'s table.',
    "3#א": '"Forbidden." Specifically of fish or raw fat of meat; but fat of meat or of goose that has already been rendered has no [prohibition] of bishul akum, for there is no cooking after cooking. Shach.',
    "3#ב": '"In bread." The Taz wrote, and some say [this refers to] bread kneaded with eggs in siman 112, because there the flour is primary and the eggs are secondary; not so here, since the fat is still visible and is not nullified.',
    "4#_": '"With maidservants." The Taz and Shach explain that this means those acquired by us, and a Jew is warned about their [work] on Shabbos from the Torah; therefore they are not included in the decrees of [intermarriage] feasts. But not with our maidservants in these lands, who are not acquired by us but only hired for a year, and we are not warned about them on Shabbos, as written in Orach Chayim siman 344. And what the Rama wrote that b\'dieved one may rely [on the lenient view], etc. — his reason is that it is impossible that one of the household will not stoke [the fire] a little. And Darkei Moshe wrote that we learn from here that even if he did not intend to permit through this stoking but did it without intention, it is permitted; and so too in Kol Bo — end of his words. And in Issur ve-Heter he wrote that one should nevertheless be careful that this stoking should help repair the fire and help hasten its cooking by a Jew.',
    "5#_": 'In the Tur it is written: therefore, if it is known that there is meat in the oven, even if they heated it to dry a vessel in it, it is forbidden, for we are concerned lest he also intended for cooking. The Taz wrote on this: it is difficult for me — behold, the Tur wrote afterward in this siman that if a non-Jew turned it over and it is not known whether he removed it, etc., we are not concerned lest he removed it; if so, a fortiori here. And one must press and distinguish that the case of removal is different, for it is not so common to do as here, where it is common to also intend for cooking — end of his words.',
    "6#_": 'Behold, the Taz and Shach challenged the Rama that this ruling is against the Gemara — see there. And one must say that here we deal with a case where it could not be fully cooked without the aid of gentiles, but as maachal ben drusai it could have been cooked by a Jew alone. And the Taz wrote that in any case we establish that there are disputants whom the Rama brought below, that lighting a fire or stoking coals is effective.',
    "7#_": '"Intention." (And Issur ve-Heter disagrees.) Darkei Moshe wrote that the same applies to blowing on the fire with the mouth — it is effective. And see below seif 4 in the gloss.',
    "8#_": '"And she removed it." The Shach wrote that it is not specifically that a Jew removed it, but the same applies if a non-Jew removed it and returned it — it is forbidden. (And so too the Taz.)',
    "9#_": '"The matter." For only for leniency do we say that as maachal ben drusai it is considered cooked so that a non-Jew will not forbid it afterward; but for stringency, no — and it still helps if a Jew finishes it afterward. Taz. (And so agreed most poskim.)',
    "11#_": '"To guard it." And this is in a matter where there is no concern that the non-Jew switched them — and see above siman 118 seif 10.',
    "12#א": '"If they roasted them." For since they are eaten as they are when raw through salting, there is no [prohibition] of bishul akum in them; and for salting at the outset they did not decree — they only decreed on cooking by fire. And the Bach wrote that when small fish do not rise on the king\'s table, that is with small fish whose growth is large and those fish in their small state are not significant and do not rise on the king\'s table; but small fish whose growth is always small are significant and rise on the king\'s table. And Maharshal wrote that we deal with a case where they are not completely small. (And so too Shlah, daf 77.)',
    "12#ב": '"By pressing." Issur ve-Heter wrote that beets and chestnuts called in foreign tongue castan are not eaten raw except by pressing, and there is in them [the prohibition] of bishul akum. And the Turei Chayim wrote that it does not appear [so] with chestnuts, for in all these lands most of their eating is raw — end of his words. (And so I have seen in the lands of Holland.)',
    "12#ג": '"Salted." The Taz wrote that if they salted them greatly and it stood a long time in the salt until it is fit to be eaten thus without cooking, its law is like small fish.',
    "13#_": '"And smoked." Beit Yosef and Darkei Moshe wrote that even though a Jew made them [smoked], if a non-Jew cooked them it is forbidden. And the Shach wrote that according to those who permit in seif 12 large salted fish that a non-Jew cooked, the same applies to large smoked fish that a non-Jew cooked — they are permitted.',
    "14#_": '"Raw." Because they are only eaten by pressing, and it is worse than large fish in seif 12. Taz.',
    "15#_": '"Dates." Issur ve-Heter wrote: however, these pears and apples — even though most of their eating is by roasting and cooking, if a non-Jew roasted and cooked them they are permitted, for they are nevertheless also eaten raw; and moreover most of the essence of their eating is raw — until here. And he wrote in the Taz that those large nuts that they spice with their bitter peel and their pits are forbidden because of bishul akum, for they are not eaten raw and rise on the king\'s table — end of his words.',
    "16#א": '"Kashering." The Turei Chayim wrote: therefore one must be careful with gentile maidservants who cook for themselves in the rabbi\'s house that they not place [food] on the fire; and if they preceded and placed it, etc., hagalah is required — end of his words. And even though they permit above because it is impossible that one of the household will not stoke — one may say that if she cooks for herself there is no custom at all that one of the household will stoke. Shach. And he wrote further: however, if it was cooked in them b\'dieved and there is a majority in the dish, it is permitted, for in the Shulchan Aruch [prohibitions] are nullified in the majority, as above siman 112 seif 14 and in siman 115 seif 1 in the gloss.',
    "16#ב": '"For a healthy person." And the Taz disagrees with this ruling and forbids for a healthy person in what he wrote; and even for the sick person himself it is not permitted except in a time of pressing need — end of his words. (And see Nachalat Binyamin who is lenient in this.) (And later authorities disagreed — Heaven forbid to be lenient; and even for the sick person himself it is not permitted except on Shabbos, and after Shabbos it returns to prohibition, and how much more so for a healthy person. And the Taz wrote: and proof from siman 112 seif 8 that where there is no professional baker available they permitted [bread] of homeowners; and this is certainly that after he comes to a place where a professional baker is available, etc. And I cannot understand — did not the Mechaber himself write in explanation thus in seif 4? See there. And it appears to me to prove that it is forbidden to eat it in what he wrote, as stated in the Gemara: one who slaughters for a sick person on Shabbos — it is permitted for a healthy person in its raw state; but one who cooks for a sick person — it is forbidden for a healthy person, [by] decree lest he increase on his account. If so, the same applies if it were permitted for a sick person in what he wrote — lest he increase on his account. Investigate.)',
  },
  "beer-hagolah": {
    "1#_": "Avodah Zarah daf 38 — the statement of Rav Shmuel bar Yitzchak, Rav said, etc., on the Mishnah of parched grain of a non-Jew; and there are two versions there. And Tosafot, the Rosh, and the Ran wrote that Rabbeinu Tam ruled like both versions to be lenient.",
    "2#_": "Tur and poskim in the name of Rabbeinu Tam (and not like R' Avraham).",
    "3#_": "There — from the words of the Rashba, from the law of a cup of wine diluted with water there in the Gemara.",
    "4#_": "Tur; and so too the Rashba in Terumat HaDeshen and Shulchan Shel Pesachim.",
    "5#_": "Orach Chayim in the name of the Ramban regarding acquired maidservants.",
    "6#_": "The conclusion of the Gemara Avodah Zarah daf 38 (and the wording of the Rambam, chapter 17 of Hilchot Maachalot Assurot, halachah 19).",
    "7#_": "The statement of Rabbi Yochanan there.",
    "8#_": "The statement of Ravina there, and the Tur.",
    "9#_": "The wording of the Rambam there, halachah 16, and the statement of Rav Yehudah said Shmuel there; and there it concludes where the non-Jew only did an approximation of cooking. And so the Mechaber in Kesef Mishneh and in Beit Yosef. And what the Rama wrote — I did not merit here to find his source in Darkei Moshe; and it is possible he relied on \"there are disputants\" whom he brought in the seif after this, or he explained that it would not cook more than maachal ben drusai without the aid of the non-Jew, as below seif 8.",
    "10#_": "The Ran there on that which Rav Yehudah [said], etc.; and so wrote the early authorities. And so it appears from the words of the Rashba, Rivash, and Rabbeinu Yonah. (°) R' Asi said R' Yochanan there.",
    "11#_": "Tur in the name of the Rashba and in the name of R' Hillel; and so the Ran; and so agreed the Rivash.",
    "12#_": "Beit Yosef, and he concluded: it is fitting to rely on these great ones.",
    "13#_": "There in the name of the Rashba.",
    "14#_": "So too there in the name of the Rashba, from the baraita: a Jew places meat, etc., Avodah Zarah daf 38.",
    "15#_": "The statement of Rav Asi said Rav there.",
    "16#_": "Tur in the name of the Rashba.",
  },
}

PART2 = Path(__file__).with_name("_manual_113_part2.json")

def hebrew_remaining(text):
    return len(re.findall(r"[\u0590-\u05FF]", text or ""))

def main():
    if not PART2.exists():
        print("ERROR: _manual_113_part2.json missing")
        raise SystemExit(1)
    MANUAL.update(json.loads(PART2.read_text(encoding="utf-8")))
    out = {}
    missing = []
    for slug, blocks in HEBREW.items():
        out[slug] = {}
        for key in blocks:
            if slug in MANUAL and key in MANUAL[slug]:
                out[slug][key] = MANUAL[slug][key]
            else:
                missing.append(f"{slug}/{key}")
    if missing:
        print(f"Missing {len(missing)} keys:", missing[:20])
        raise SystemExit(1)
    path = WORK / "_manual-113.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    total = sum(len(v) for v in out.values())
    heb = sum(hebrew_remaining(t) for s in out.values() for t in s.values())
    print(f"Wrote {path}")
    print(f"Blocks: {total}")
    print(f"Hebrew chars remaining: {heb}")

if __name__ == "__main__":
    main()
