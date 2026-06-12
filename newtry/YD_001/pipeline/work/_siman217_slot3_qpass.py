#!/usr/bin/env python3
"""One-shot quality pass: replace **** ENGLISH **** for siman 217 slot 3 blocks."""
from __future__ import annotations
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output" / "siman_217"

# (slug, seif, marker) -> new English (None = skip)
T: dict[tuple[str, str, str], str | None] = {}

def add(slug: str, seif: str, marker: str, text: str) -> None:
    T[(slug, seif, marker)] = text

# --- pitchei-teshuva ---
add("pitchei-teshuva", "3", "_",
    'Permitted in date honey. [See Shach, note 19; and see in responsa Meshech Chochmah, siman 49, what he wrote on this; and see Taz, note 15, and Shach, note 18.]')
add("pitchei-teshuva", "4", "_",
    '"One who vows from grain." In the Gemara, daf 55a, it is explained that if he said "the produce of the field," he is forbidden in everything that grows in the field; and it is a matter requiring study why the decisors omitted this. Tiferet Lemoshe.')
add("pitchei-teshuva", "5", "_",
    '"And if he said "all that nourishes."" See Tzelach on Berachos, daf 35, s.v. "ela she-ra\'isi," what he wrote on this.')
add("pitchei-teshuva", "6", "_",
    '"One who vows from the fruits of the land." See in responsa of the new Radbaz, susya 563, who wrote that one who vows from fruit of a tree and from fruit of the ground is permitted to eat sugar, for that is not fruit — see there.')
add("pitchei-teshuva", "7", "_",
    '"At the time of the vow." Abudraham; and see in responsa Bigdei Kehunah, part 4, siman 7.')
add("pitchei-teshuva", "8", "_",
    '"Forbidden to look at the sun." See in responsa Noda Biyehudah, second series, part 4, siman 145, the reason why the decisors omitted this ruling that is explicit at the beginning of Pesachim — one who vows from light is forbidden in the light of the stars — see there.')
add("pitchei-teshuva", "9", "_",
    '"From circumcised ones of other nations." See in Be\'er Yaakov, who wrote that the same applies to an apostate for idol worship, that he is forbidden even though he is circumcised; and for an apostate regarding foreskin, it requires study — see there.')
add("pitchei-teshuva", "10", "_",
    '"And permitted in circumcised ones of other nations." He wrote in Be\'er Yaakov that the same law applies to an apostate for idol worship, and for an apostate regarding foreskin, it requires study; and he is forbidden from doubt. And he wrote further that if one vowed from circumcised ones, he is forbidden regarding a circumcised slave — see there.')
add("pitchei-teshuva", "11", "_",
    'See in She\'elat Yaavetz, part 1, siman 165, who wrote regarding one who raises an orphan or another man\'s son and calls him his son, while the other calls him "my father" — if they vowed from each other by the name "son" and "father" without specification, or if they gave each other gifts without mentioning the essential name, it is a safek and we follow the stringent side, meaning in vows they are forbidden to each other, and in monetary matters the stringency favors the claimant. However, if this raiser has his own sons, it appears that even in vows the one being raised is not forbidden, for we say he intended his actual sons. Nevertheless, if the one being raised has a father, even though the raiser considers him his son and is forbidden regarding him, when the son made the vow one can say he intended his real father; and since the matter is balanced, as there is no proof from the mind of the giver or vower, we rule stringently here and there. His stepson whom he does not raise is certainly not included as a son for any matter — see there. [And see what is written in Pischei Teshuvah on Choshen Mishpat, siman 42, note 165, in the gloss, s.v. "he\'eil ve-gidluhu."]')
add("pitchei-teshuva", "12", "_",
    '"Also Chanukah and Purim." See in responsa Tiferet Tzvi, Yoreh De\'ah section, siman 24, regarding one who swore not to drink sharp wine except on Sabbaths and festivals — he is also permitted on Motzei Yom Kippur if the one who swore said he intended this — see there.')
add("pitchei-teshuva", "13", "_",
    '"That he will not laugh." See in responsa of R\' Eliyahu Mizrachi, siman 14, who wrote that if the community agreed and accepted upon themselves that no person would laugh while playing dice, all kinds of levity in the world are included in this agreement, even though they expressed it in the language of dice — all are included in the prohibition; see there. And see in responsa Shemesh Tzedakah, Yoreh De\'ah section, siman 32, regarding one who vowed without specification not to laugh — whether Ashkenazi-style laughter is included in this vow — see there.')
add("pitchei-teshuva", "14", "_",
    '"For his sake." See in responsa of the new Radbaz, siman 214 — he gives many reasons for this. And see in Tiferet Lemoshe, who wrote that the same applies to one who swears regarding other matters, that it is forbidden to do it through an agent, for his agent is like himself, etc. However, one can say that we follow the intent of the one who vowed — whether his way is to do that thing himself or through an agent — as below, siman 218, seif 5; and it requires study, for he does not divide here regarding levity as he does there, end of his words — see there. [And see what is written in siman 218, note 5, in the name of responsa of the Ranach, siman 9, and in Shulchan Aruch below, siman 221, seif 1, and in Shach there.]')
add("pitchei-teshuva", "15", "_",
    '"For we follow his intent." Apparently it implies that Rashi means we follow entirely the intent of the one who vowed; and accordingly, if he says that when he said he would not accept a deposit his intent was only regarding a pledge, he is forbidden to lend on a pledge and permitted to accept a deposit. And see in responsa Veshav HaKohen, siman 79, that his view is that we do not follow his intent except regarding whether, if he says his intent was only regarding a deposit, he is permitted to lend on a pledge and not the reverse — see there.')
add("pitchei-teshuva", "16", "_",
    '"His intent." See Bach; and see what Maharit wrote — one who vowed not to eat at a discretionary feast may eat at a housewarming in Eretz Yisrael and not in chutz la\'aretz; see in responsa Brit Avraham, question 16, what he wrote on this. And see in responsa Chavot Yair, siman 70, who was uncertain whether a housewarming feast is a mitzvah or not (even in Eretz Yisrael) unless they deliver a derashah there, and thereby it becomes a mitzvah feast because the speaker comes on account of the feast and all those reclining there listen to the speaker\'s voice; but if they do not deliver a derashah there, only that some Torah scholars are present among them discussing Torah, that is insufficient. And see there further, where he elaborated what feasts are called mitzvah feasts regarding one who vowed from a discretionary feast being permitted to benefit there; he wrote that a circumcision feast and a wedding are certainly mitzvah feasts, even at the wedding of a Torah scholar to a common woman, for we have no common woman about whom the Sages spoke. Likewise the feast on the night of the sivlonot before the wedding day; but what they do — a feast after writing the conditions that they call "kans" — is not called a mitzvah feast. Likewise the feast on the night before circumcision and the third day after circumcision are not mitzvah feasts, for they are only custom. The night of Shabbat of a male child — Terumat HaDeshen ruled, siman 269 (brought in Rama below, siman 265, seif 12, in the gloss) — that it is also a mitzvah feast, and one may rely on this, and one who vowed is permitted to enter there; for otherwise one could say that by the name "feast" it is not called so. Likewise the night of "shefinahel"tz," for in vows we follow the language of common people, and there they do not eat fixed meals, only some enter and some leave and drink a little minimally, and many do not taste anything. A siyum feast is certainly a mitzvah feast, and the same applies to the day after it as is customary, and possibly also the day after that. Likewise a feast that the one saved from danger makes on the day the miracle occurred, or a feast they make when one gives a Torah scroll and sacred vessels to the synagogue. But a day fixed annually for a society, or a seventieth-birthday feast — even if that seventy-year-old son recites shehecheyanu, for so it seems to me — nevertheless he need not be charged that it is a mitzvah feast; therefore it is fit to deliver a derashah at them. He wrote further regarding one who accepted upon himself not to eat at a discretionary feast and does not say in foreign language "ich vil nisht aveis heizin" — only "ich vil oyf kein seudah gein" — that is, no feast except a mitzvah feast; eating with his friend and household is not included in the word "feast" in common language, only when guests are invited there. And if he invited guests, it is insufficient for him to say it is a mitzvah feast, for although there is a mitzvah to increase at a feast — meaning with meat and delicacies — inviting guests is not a mitzvah; this is the rule, that it is not called a mitzvah feast unless the gathering of people is for the sake of the mitzvah or the required derashah that already emerged from the mouths of the early ones, because the derashah comes on account of the feast — unlike where some Torah scholars are present, which does not help, see there. And what Bach wrote — the community agreed not to wear silk garments, etc. — likewise wrote in responsa Mishpetei Shmuel, siman 58, see there.')

# --- baer-heitev seif 1 ב ---
add("baer-heitev", "1", "ב",
    '"The language." Rabbeinu Yerucham wrote: And if there is no language of common people — such as if he vowed in a foreign tongue and in that place they do not speak it — we follow the language of Torah, end of his words. (One who swore not to rent and not to mortgage his house except to so-and-so — inheritance is not included; Rashdam, Choshen Mishpat section, siman 256; and see above, siman 216, note 7, what Shach wrote in the name of the Ranach — one who swore to do a thing when he is married, or the reverse, "I will not do this thing when I am married" — he did not violate his oath as long as he has not married a woman with ketubah, kiddushin, and seven blessings; likewise he is not obligated to do it except when he is married with ketubah and seven blessings, since both in Talmudic language and in the language of common people the language of marriage is separate and the language of betrothal is separate — Knesset HaGedolah, Radbaz, and Rashdam. But Maharival, part 3, siman 117, wrote that betrothal is included in marriage, see there; see in Kesef HaGadol — one who swore not to marry another woman besides his wife — betrothal is not included; and the same where they are accustomed to a cherem of the Rambam that kiddushin is not included — Rashdam, part 4, siman 98. And according to the words of the above Maharival, even betrothal is included; see Knesset HaGedolah. One who vowed from Reuven and his sons and sons of his sons is permitted in the fourth generation — Knesset HaGedolah; and likewise in Shevut Yaakov, Choshen Mishpat section, siman 173; and Maharam of Trani, part 2, siman 28, wrote that it is a safek.)')

add("baer-heitev", "4", "ב",
    '"In pickled vegetables." Shach explained: even those that are eaten only pickled; nevertheless those vegetables are forbidden to eat even cooked, but a raw vegetable is certainly permitted to eat — and likewise Maharshal. But Taz ruled that if he says "pot vegetables," he is forbidden in raw and pickled and not in cooked; and if he said "vegetables that are cooked," then he is permitted in pickled and raw — see there, where he elaborates on this.')

add("baer-heitev", "8", "_",
    '"If they appear." In Tur he wrote according to the Gemara that if he vowed on the days of bloodletting, fish are not included in the vow, for otherwise he would not eat them and would not need to vow; and this is on the first day of bloodletting, for they said "second for fish blood." However, it is astonishing, for there in the Gemara it says that one who let blood should not eat eggs, yet the world is accustomed to eat eggs immediately after bloodletting; and possibly their bloodletting was harder, for they let much blood — end of Taz\'s words. (And in Nekudot HaKesef he distinguishes between soft boiled and hard boiled, as stated in the chapter "How does one bless," and likewise known to physician-sages, end of his words.) And he wrote in responsa of Maharit — one who vowed not to buy for Shabbat except half a piece of meat — it appears he did not intend except regarding animal meat sold by the piece, but poultry is permitted (Maharam of Trani, part 1, siman 258).')

add("baer-heitev", "9", "_",
    '"In both of them." Maharshal wrote: It appears to me that nowadays he is forbidden in both, for we follow the language of common people; nevertheless we permit unspecified regarding fish, end of his words. It is clear from his words that nowadays one who vows from meat without specification is permitted in fish, for it is not the way now to consult an agent about it — Taz. And he wrote further that "this meat upon me" is a scribal error and must read "this meat."')

add("baer-heitev", "10", "א",
    '"That imparts taste." The same applies to "that I eat" — so Maharshal; and something that comes to impart taste in a pot, such as garlic and onions and the like — all are included in the name "spices," and regarding these it is relevant to divide between raw and cooked; but in peppers and the like one cannot divide thus — Beit Yosef and the later authorities.')

add("baer-heitev", "10", "ב",
    '"In asparagus." Taz wrote: And according to Rambam, who explains it is a type of vegetable greens — why is one who vows from cabbage forbidden in asparagus? Unlike one who vows from meat who is permitted in gravy? One can say that in their time they also called asparagus cabbage and not the reverse, unlike meat and gravy, which in those days were never called meat gravy — thus it appears to me.')

add("baer-heitev", "10", "ג",
    '"In field vegetables." It appears that now he is forbidden in field vegetables, for that too is included in "vegetables" in the language of common people — Shach.')

add("baer-heitev", "11", "_",
    '"In whey." Rashi explained: meaning the curdled milk; and see above, siman 81, seif 5, and siman 87, seif 8.')

add("baer-heitev", "12", "_",
    '"In fish brine." Taz and Shach wrote: meaning specifically what already emerged from them before the vow; but what emerges from them after the vow is forbidden if he said "konam fish that I taste" or "that I eat," or "konam these fish" — as above, siman 216, seif 9. (And likewise regarding whey and date honey that emerge from them after the vow — forbidden — Maharshal.) And Rosh wrote: if he said "fish" or "dag dagah," he is forbidden in large and small; but in dagah alone he is forbidden only in small ones — so all agree.')

add("baer-heitev", "14", "_",
    '"Permitted." For unspecified honey is from bees. (One who vowed not to eat for a known time anything that comes from a living creature is permitted to eat bee honey and to drink bee water that they call mead — Sha\'arei Teshuvah, siman 29, see there.)')

add("baer-heitev", "16", "_",
    '"For us." For we speak in a foreign tongue; and accordingly, if he vowed from tirosh in the holy tongue, he is forbidden in wine and permitted in all kinds of sweetening, for we call tirosh only wine in the language of Torah — end of Ran\'s words.')

add("baer-heitev", "17", "_",
    '"Even though most of their sustenance." We do not follow the majority, for a doubt in vows is ruled stringently; and see above, siman 208, seif 1.')

add("baer-heitev", "18", "_",
    '"In the five." They are wheat, barley, spelt, oats, and rye.')

add("baer-heitev", "19", "א",
    '"From food." Meaning: even in a place where they are accustomed to make bread from wheat and barley, and he vowed from food — his intent is the five species of food.')

add("baer-heitev", "19", "ב",
    '"That nourishes." And it deals with one who forbade only for a time he can withstand; otherwise it is like one who vowed from all fruits of the world, which is not a vow at all — as below, siman 232, seif 5 — so Bach and Perishah.')

add("baer-heitev", "22", "_",
    '"In all of them." And Bach in the name of Ran: meaning specifically that he did not forbid them except for a time he can withstand; but forever it is not a vow at all, for it cannot be fulfilled. And since they wrote thus in the conclusion regarding annual growths and did not write thus in the beginning regarding annual fruits, it implies that there it is a vow even forever, since he is permitted in kids and lambs and can fulfill his vow — and likewise below, siman 232, seif 5 — end of Shach\'s words.')

add("baer-heitev", "23", "_",
    '"Forbidden." Taz wrote: It appears that nevertheless he is permitted in kids and lambs and other animals — unlike Bach, see there.')

add("baer-heitev", "26", "_",
    '"The sun." For there is bodily benefit therein.')

add("baer-heitev", "28", "_",
    '"Its upper story." Rosh wrote: but a room and annex are not included in "house." (One who sells a house does not sell the annex or the room.) And see in Choshen Mishpat, siman 214.')

add("baer-heitev", "29", "_",
    '"For its pregnancy." And even though for other matters, within the boundary it has the law of a city upon it, as written in Orach Chayyim, siman 396 and 474, and below, siman 221, seif 33, in the gloss — here in vows it is different, for we follow the language of common people, which is only within seventy cubits and four handbreadths — end of Shach\'s words.')

add("baer-heitev", "32", "_",
    '"Language." He wrote in responsa of Maharit: And in these places in our time it appears that it is not called a dwelling in the language of common people in one place for less than twelve months.')

add("baer-heitev", "35", "א",
    '"Upon me." Meaning: after thirty days, seafarers are forbidden to me.')

add("baer-heitev", "35", "ב",
    '"At the time." For after the time of utterance we go in vows, not after the vow takes effect; and see above, siman 234, note 64. It appears that in all other matters the law is likewise — e.g., he said, "After such-and-such a time the inhabitants of such-and-such a city will be forbidden to me," and meanwhile one uprooted his residence from that city — he is forbidden to him, since at the time of uttering the vow he was from that city. And if at the time of utterance he was not there, even though at the time the vow takes effect he is there, he is permitted; and likewise in all similar cases — end of Shach\'s words.')

add("baer-heitev", "36", "_",
    '"Who see." Taz disagrees on this and wrote: It appears in practice one should not rely to permit the language "who see the sun" regarding blind people, since the other decisors did not divide — Tur is alone against them; and Bach wrote one should not permit, etc., see there at length.')

add("baer-heitev", "37", "_",
    '"In the sun." Meaning: forbidden to benefit from sunlight — Tur wrote. One who vows from the newborn or from those born is forbidden both in those already born and those that will be born afterward, and he is permitted only in birds and fish that lay eggs and are not accustomed to give birth; and even though a person does not consecrate something that has not yet come into the world (and as written above regarding one who vowed to give tithe from profit — possibly that is called more "come into the world"; and further, even though a person does not forbid upon himself something that has not come into the world, nevertheless a person may forbid himself regarding what has not come into the world — end of Shach\'s words.')

add("baer-heitev", "39", "_",
    '"Jerusalem." Taz wrote: In Perishah\'s gloss he wrote that if one vowed from festival pilgrims he is forbidden even in Kutim, for they ascend Mount Gerizim; and let this ruling be suppressed, etc.; and certainly these words did not emerge from the mouth of that tzaddik himself — end of his words.')

add("baer-heitev", "42", "_",
    '"In uncircumcised ones." For the name "circumcised" is called only upon the Jewish nation — Taz.')

add("baer-heitev", "47", "_",
    '"One who swears." Rambam wrote, chapter 9: After he wrote all the laws written in this siman, and in all these matters and the like, the law of one who vows and one who swears is one; Beit Yosef brings it; it is simple; and see above, siman 239 — end of Shach\'s words.')

add("baer-heitev", "48", "א",
    '"To wager." Which they call in foreign language "wetten"; Beit Yosef wrote in the name of Rabbeinu Yerucham: his main intent in his oath was to refrain from all levity that brings monetary loss; thus it implies that one who swears without specification not to play means regarding something involving monetary loss, but without loss it is permitted to play. Nevertheless it appears to me we follow the intent of the one who swore: if his concern was on account of monetary loss, or because he was wasting time in kinds of levity — then it is forbidden even to play for free — end of Taz\'s words.')

add("baer-heitev", "48", "ב",
    '"His intent." It is written in responsa of Maharash. Sofer of Reuven gave a Torah scroll to Shimon when Reuven\'s work is finished that he will write to no man except Shimon; afterward the city burned and one booklet of Reuven that the scribe had written burned; now the scribe asks whether he may write that booklet when he finishes his work before writing for Shimon — and when the booklet burned, Reuven had not yet finished the book — he may certainly write, for Reuven\'s work was not yet finished; certainly if the booklet burned after he finished the entire book, then his work was finished and he could not write — end of his words. And the same law applies in all crafts — Shach. (One who vowed not to eat at any discretionary feast may eat at a housewarming in Eretz Yisrael and not in chutz la\'aretz — Be\'er Sheva, folio 113. The community agreed not to wear silk garments, even tabi\'a that is mostly silk and minority wool is included in the agreement. One who vowed from garments and clothing — gold bracelets are not included at all — Knesset HaGedolah, see there.)')

# --- beer-hagolah (all bad blocks) ---
add("beer-hagolah", "1", "_",
    'Mishnah and Gemara, Nedarim 49a. (°) (Rosh explains: in nivushal — more than unspecified cooking; and Ran explains: shalil and not shalut.)')
add("beer-hagolah", "2", "_",
    'Rambam, chapter 9 of Hilchot Nedarim, and Tur brought it; his reason: in vows we follow the language of common people; and if there is no known language, this is a doubt in vows, and every doubt in vows is ruled stringently — as below, seif 3.')
add("beer-hagolah", "3", "_",
    'There in the Mishnah.')
add("beer-hagolah", "4", "_",
    'Tur and Rambam from Yerushalmi; and he explains: rifiot — wheat products that are crushed; and he explains: levivot — soft dough that they scald in boiling water and then in oil.')
add("beer-hagolah", "5", "_",
    'There in the Mishnah.')
add("beer-hagolah", "6", "_",
    'Braita there, daf 51a.')
add("beer-hagolah", "7", "_",
    'Language of the Rambam there, chapter 9, from Mishnah there 52a, according to his explanation in the Mishnah.')
add("beer-hagolah", "8", "_",
    'There and there.')
add("beer-hagolah", "9", "_",
    'Rambam there.')
add("beer-hagolah", "10", "_",
    'Language of Tur from Mishnah and Gemara there, daf 54b, according to Rosh\'s explanation there.')
add("beer-hagolah", "11", "_",
    'Like R\' Akiva there, as explained there in the Gemara; and Ran explains: even though it is not a vegetable but fruit; and some explain that unspecified "vegetable" is eaten as it is raw, and gourds are not so.')
add("beer-hagolah", "12", "_",
    'Yerushalmi, chapter "One who vows from vegetables" — Beit Yosef brought it.')
add("beer-hagolah", "13", "_",
    'There in the name of R\' Yehuda in the name of Yerushalmi.')
add("beer-hagolah", "14", "_",
    'In chapter 7 of Nedarim.')
add("beer-hagolah", "15", "_",
    'There in Yerushalmi: one who vows from the main item is forbidden in the secondary.')
add("beer-hagolah", "16", "_",
    'Words of Rambam there, law 6 in chapter 9, from braita and as explained there in Gemara, daf 54b, and Tanna Kamma; and R\' Akiva — agreement of the decisors.')
add("beer-hagolah", "17", "_",
    'There; and Tanna Kamma.')
add("beer-hagolah", "18", "_",
    'There in Gemara, according to Rambam\'s explanation there in the Gemara.')
add("beer-hagolah", "19", "_",
    'There; and explained in the Gemara — e.g., they are bound to him by the eyes; and at the time of the vow the illness was beginning, that fish are hard for the eyes; but presumably he vowed only regarding what he can eat; and as I glossed, so is Rambam from the Gemara\'s resolution there. (°) Explanation: it refers to the first division — animal meat alone.')
add("beer-hagolah", "20", "_",
    'Braita there, daf 52b. (°) Rosh and Ran explained: meaning fine crumbs of meat that descend to the bottom of the pot; and from Rambam\'s words, chapter 5 of Hilchot Nedarim, it appears he explains kefiah means spices.')
add("beer-hagolah", "21", "_",
    'Mishnah there, daf 51b.')
add("beer-hagolah", "22", "_",
    'Mishnah there, daf 53b; and it appears to me the reason is as I noted above in seif 7 in the name of Yerushalmi.')
add("beer-hagolah", "23", "_",
    'And because they were accustomed to put garlic in every stew.')
add("beer-hagolah", "24", "_",
    'Tosefta — Rosh wrote it in chapter 10 of Nedarim; and Bach wrote, such as garlic and onions and the like that come to impart taste in a pot — they too are called spices; but in peppers and the like one cannot divide between raw and cooked.')
add("beer-hagolah", "25", "_",
    'There in the Mishnah. (°) So Taz emended according to the Mishnah, and so in Tur; and not like Levush, which had the books\' version reading "permitted" — see there.')
add("beer-hagolah", "26", "_",
    'Mishnah there 51a. (°) Explanation: a type of leek that has a head; in Greek they call the head kefal; Aruch.')
add("beer-hagolah", "27", "_",
    'Mishnah there, daf 51b.')
add("beer-hagolah", "28", "_",
    'Braita there, daf 52b.')
add("beer-hagolah", "29", "_",
    'There in the Mishnah in the name of Abba Shaul.')
add("beer-hagolah", "30", "_",
    'Tur.')
add("beer-hagolah", "31", "_",
    'Mishnah there; and Ran explains: tzir is the fat that emerges from them, and fish innards are mixed in it; and all the more so permitted in morayis, which is fish oil alone.')
add("beer-hagolah", "32", "_",
    'Mishnah, daf 53a.')
add("beer-hagolah", "33", "_",
    'Tur; and learn from "all the more so": if one vowed from dates, which are the main item, he is permitted in the honey that emerges from them — all the more so one who vows from honey, etc.')
add("beer-hagolah", "34", "_",
    'There in the Mishnah.')
add("beer-hagolah", "35", "_",
    'Mishnah there: unspecified honey is bee honey.')
add("beer-hagolah", "36", "_",
    'There in the Mishnah; and he concludes: because it is a secondary name.')
add("beer-hagolah", "37", "_",
    'Yerushalmi — Rosh brought it; and likewise Perishah: wine and beer from one species.')
add("beer-hagolah", "38", "_",
    'So it is in Yerushalmi.')
add("beer-hagolah", "39", "_",
    'Tur, from the words of Rosh his father there, according to the Rabbanan.')
add("beer-hagolah", "40", "_",
    'Ran there; and not like the Tosefta that Rosh and Ran brought, which teaches there the reverse; and Ran brought proof on this from Yerushalmi.')
add("beer-hagolah", "41", "_",
    'Language of Tur from Mishnah and Gemara there in the Bavli, daf 53b.')
add("beer-hagolah", "42", "_",
    'Mishnah there, daf 55a.')
add("beer-hagolah", "43", "_",
    'Tur, from that which Mar Shmuel was appointed, etc.; and as Bach wrote, it is like one who vows from grain, only he vowed in the language of translation. (°) Explanation: every superior and praiseworthy thing — so Rosh.')
add("beer-hagolah", "44", "_",
    'There in the Mishnah; and like the Sages; and Ramban and Tur in the name of Rambam there, law 9.')
add("beer-hagolah", "45", "_",
    'Chapter 9, Yerushalmi from tractate Challah — Rosh brought it, chapter 6 of Nedarim.')
add("beer-hagolah", "46", "_",
    'From Mishnah and Gemara, Eruvin 30a.')
add("beer-hagolah", "47", "_",
    'Words of Rambam, chapter 9 of Hilchot Nedarim; and likewise Ran from the braita below.')
add("beer-hagolah", "48", "_",
    'Mishnah there, daf 53b.')

# --- beur-hagra ---
add("beur-hagra", "1", "א",
    '"A vow, etc." Mishnah 49a; and Gemara there — not all agree, etc.; and Rambam in his commentary there; and the main point is that they are dragged along, etc.; and he said "or he swore" — likewise in Shulchan Aruch to teach that also in oaths we follow the language of common people.')
add("beur-hagra", "1", "ב",
    '"And likewise, etc." A question there in Yerushalmi, unresolved; Rosh brought it there. And for stringency — Tur and Shulchan Aruch; Rambam and Shulchan Aruch wrote "we follow," etc., as above.')
add("beur-hagra", "2", "_",
    '"Such as, etc." Yerushalmi; Rosh and Ran brought it there.')
add("beur-hagra", "3", "א",
    '"A vow, etc." According to the Mishnah\'s explanation there — "and you shall not be negligent," etc.; meaning: what the Mishnah divides between saying with the definite article or without is according to their place and time, as above.')
add("beur-hagra", "3", "ב",
    '"If they were, etc. there is not, etc." There 53a; and as written in seif 17.')
add("beur-hagra", "4", "א",
    '"He said, etc." According to Rosh\'s explanation there; but Ran explains in a different manner — see there.')
add("beur-hagra", "4", "ב",
    '"However, etc." Ran there, s.v. "ule-inyan," etc.')
add("beur-hagra", "4", "ג",
    '"But if, etc." Yerushalmi there: all agree regarding one who vows from gourds that he is permitted in vegetables, as in that which was taught: one who vows from the main item is forbidden in the secondary; from the secondary he is permitted in the main item. One who vows from meat is forbidden in sinews; from sinews he is permitted in meat.')
add("beur-hagra", "5", "_",
    '"One who vows, etc." Rabbeinu Yerucham in the name of Yerushalmi (and it is there). (And "permitted, etc." — Mishnah there.)')
add("beur-hagra", "7", "_",
    '"One who vows, etc." The above Yerushalmi.')
add("beur-hagra", "8", "א",
    '"A place, etc." In the days of the Gemara they would consult an agent everywhere, unlike now when they do not consult everywhere — so Tur wrote; unlike poultry, where they still consult everywhere — unlike Ran, who wondered at Rambam.')
add("beur-hagra", "8", "ב",
    '"And permitted in locusts." Since he did not say "fish and locusts" also, etc. — Ran there.')
add("beur-hagra", "8", "ג",
    '"And if, etc. and even, etc." There — e.g., if he let blood, etc.; Abaye, etc.; and Tosafot in Chullin 104a, s.v. "hanoder," etc.; and Tur did not write thus.')
add("beur-hagra", "8", "ד",
    '"Or for meat, etc." There and there: "they are bound," etc.')
add("beur-hagra", "9", "_",
    '"If not, etc." There in Mishnah and braita; and the same for "that I taste" or "that I eat," for we rule stringently, as in siman 216; and it is missing here and must read "this meat upon me" or "that I," etc.')
add("beur-hagra", "10", "א",
    '"From spices, etc." Tosefta that Rosh brought, chapter 7, 62b.')
add("beur-hagra", "10", "ב",
    '"And if he said, etc." Tur; but in Rosh he wrote in different language.')
add("beur-hagra", "11", "_",
    '"And some say: if, etc." Gemara there — one authority, etc.; and from Rav Mesharshia it implies even in the latter part; and as Rashba and Ran wrote in the Mishnah there, s.v. "min hakum," etc.; "however," etc.; and in the Gemara there, s.v. "verminhei," etc. But Bach already wondered at them, for this braita is not in our Gemara text; and likewise Tur, Rambam, and Shulchan Aruch — apparently one can say they hold the sugya is like Rabbah there 53a; but in Yerushalmi he divides between them; and see in seif 13 in the gloss. But he relied on Yerushalmi; Rosh brought there 49, R\' Yehuda regarding kum — Abaye answered him — for R\' Yehuda, one who vows from wine is forbidden in cooked wine; they call it "chamra mevushla"; and Avraham and Rambam, in their method, rely on Yerushalmi.')
add("beur-hagra", "13", "א",
    '"One who vows from dates, etc." Tanna Kamma; and Ran there, s.v. "ule-inyan," etc.')
add("beur-hagra", "13", "ב",
    '"Even though, etc. and further, etc." There, s.v. "vechachamim," etc.; but in Yerushalmi he divides in a different manner; and thus: nevertheless R\' Yehuda there — Abaye answered him — for Rabbah there his son answered him: Rabbah would concede to R\' Yehuda, but R\' Yehuda would not concede to Rabbah; Rabbah concedes to R\' Yehuda there regarding his son — all the more so regarding his father R\' Yehuda would not concede to Rabbah; he said only regarding his father, but not regarding his son. Rosh brought it briefly there in the Mishnah of kum and Abaye.')
add("beur-hagra", "13", "ג",
    '"From honey, etc." There — unlike Rashba.')
add("beur-hagra", "15", "א",
    '"And forbidden, etc." Rosh, chapter 6, 3; and likewise Rashba; and Ran 53a, s.v. "asur beyrakot," etc.; but for Rambam, who permits in kum as in seif 11, here too he is permitted.')
add("beur-hagra", "15", "ב",
    '"And permitted, etc." Yerushalmi there: R\' Yehuda — one who vows from wine is permitted in conditum; Beit Yosef wrote that all the more so for the Rabbanan; but Rosh 65 wrote: for the Rabbanan forbidden — and likewise Tur.')
add("beur-hagra", "16", "_",
    '"One who vows from tirosh, etc." Ran 55b, s.v. "tosefta," etc.; and the Tosefta is brought in the Gemara, chapter 5 of Yoma (76b) — see there.')
add("beur-hagra", "18", "א",
    '"One who vows from grain." Gemara there: all agree, etc.')
add("beur-hagra", "18", "ב",
    '"If so, etc." There; and Ran ruled like Abaye and Rava, except regarding beer of houses it was unresolved; and see there, s.v. "ule-inyan," etc.; but Rosh wrote it is reasonable like Rav Yosef — and Tur likewise; and Bach challenged, for Rosh wrote "reasonable," etc., to exclude money, and strained himself in Beit Yosef; but Lechem Mishneh wrote it is not precise, and Rosh wrote only to strengthen his words — see there.')
add("beur-hagra", "19", "א",
    '"One who vows from bread, etc." Mishnah in chapter 1 of Challah: one who vows from bread, etc.; and we say in Yerushalmi there: behold, one who vows from bread and from grain is forbidden in everything — Rabbanan, R\' Chiya in the name of R\' Yochanan: thus the Mishnah — also one who vows from grain is forbidden only from them. What are we dealing with? If when saying "bread" of Torah — then also one who says "grain" of Torah should be forbidden in everything, as written "and the produce of the vineyard"; if when saying unspecified bread — you have no unspecified bread called so except wheat and barley alone. R\' Yosi established it in a place where they eat bread of all kinds — you have bread called so only of the five species alone. Rosh brought it in Nedarim there briefly.')
add("beur-hagra", "19", "ב",
    '"Or from food, etc." Even though they established it regarding rice (Berachos 37a), nevertheless in the language of common people it is not called food.')
add("beur-hagra", "20", "א",
    '"One who vows, etc." For he permits there only in its waste, as explained below; and Ran there, s.v. "chitah," etc.')
add("beur-hagra", "20", "ב",
    '"One who says bread, etc. and there is, etc." As in Shevuot 23a: "perhaps bread of wheat to eat," etc. — all these are included in unspecified vows, as in chapter 2 of Nedarim; and this is what "unless," etc. means; but some say bread certainly pulls everything, only he erred thus; and likewise all the difficulties there.')
add("beur-hagra", "20", "ג",
    '"Or it is known, etc." Likewise in this section.')
add("beur-hagra", "21", "_",
    'Girsa, etc. Braita there; and Rosh in his commentary on the Mishnah there, s.v. "R\' Yehuda," etc.')
add("beur-hagra", "23", "_",
    '"And in fruit of the tree." Rosh, s.v. "bekhol," etc.; and proof from what follows — except mushrooms; Beit Yosef.')
add("beur-hagra", "31", "א",
    '"Three houses, etc." As in the beginning of Avodah Zarah.')
add("beur-hagra", "31", "ב",
    '"Community, etc. this, etc." As in the chapter "One who borrows" (100a): one who exchanges a cow, etc., "until I have not sold," etc.; and we say (Gittin 25a and Shavuot) — brothers who divided are like purchasers, etc.')
add("beur-hagra", "32", "_",
    '"And if he vowed, etc." As above — in vows we follow, etc.')
add("beur-hagra", "33", "_",
    '"And even in those, etc." Ran and Rosh in the name of Yerushalmi.')
add("beur-hagra", "35", "_",
    'He said "descendants of the sea," etc. Rosh and Ran in the name of Yerushalmi, see there (in Ran he wrote: but it appears to me the law is not so, see there chapter 4, 1); and like R\' Akiva; and Abudraham.')
add("beur-hagra", "36", "א",
    '"And even if he said, etc." As explained above, 25a: he said to him, "when you swear," etc.')
add("beur-hagra", "36", "ב",
    '"And permitted in all that, etc." Since he said "fish," etc. — he specified specifically living things; and no difficulty from things hidden in the ground.')
add("beur-hagra", "36", "ג",
    '"And if he vowed, etc." Gemara there.')
add("beur-hagra", "37", "_",
    '"One who vows from all that, etc." Tosafot Bava Batra, chapter 4, 1, s.v. "hai," etc.')
add("beur-hagra", "38", "_",
    '(Likkutim) "One who vows, etc." He omitted what Shach wrote — one who vows from the newborn, etc. — that Tur wrote according to Rambam\'s method, and omitted this according to his explanation, unlike Rosh and Abudraham (end of matter).')
add("beur-hagra", "46", "_",
    '"One who vows from sons, etc." Chapter 9 of Bava Batra (143b).')
add("beur-hagra", "47", "_",
    '"Who, etc." As in chapter 2 (18b): unspecified vows to be stringent; and he explains, etc.')
add("beur-hagra", "48", "א",
    '"Who, etc." As above.')
add("beur-hagra", "48", "ב",
    '"One who vowed not, etc." As in the chapter "The judges" — "who swore," etc.')
add("beur-hagra", "48", "ג",
    '"One who vowed, etc." Orach Chayyim, siman 568, seif 1.')
add("beur-hagra", "48", "ד",
    '"And likewise who, etc." There, seif 10.')

# --- turei-zahav (seif 1 full + other bad blocks) ---
add("turei-zahav", "1", "_",
    '"Even for roasting and for shaluk." In Tur it is not written "and for shaluk," only roasting alone; and he concludes with it: forbidden in it and in shaluk — which is astonishing, why he did not write first "and for shaluk"; and if the word "and for shaluk" was truly missing at first, it would have been difficult for him to say "forbidden in them" as he says afterward "permitted in them." Therefore Perishah explained that everything called "cooked" in unspecified speech includes shaluk as well; thus he wrote properly that everything called roasting in "cooked" is forbidden also in shaluk. It appears to me there is proof for this from what we say in the Gemara that R\' Yoshiah forbids from "and they shall cook the Passover offering," and R\' Yoshiah refers also to ashiluk as implied in the sugya; and he did not bring support only for roasting, but it must be that one depends on the other: since roasting too is called "cooked," a fortiori for shaluk. And shaluk here means shalil, not shalut — for so it is in the language of common people; but generally shaluk is shalil more than regular cooking.')
add("turei-zahav", "2", "_",
    '"Rifiot." Wheat products that are crushed; and levivot are a bubbling product.')
add("turei-zahav", "4", "א",
    '"Even in what is pickled in them, etc." Maharshal wrote: all the more so in cooked — whether eaten raw or not eaten raw, from anywhere a raw vegetable is permitted to eat — thus it appears to me, end of his words. And Maharach brought this and wrote on it: it is simple. And it is difficult from the Talmud\'s words against him in what it challenges on what was stated in the Mishnah — one who vows from a vegetable is forbidden in gourds according to R\' Akiva, but he said "vegetable" (Rosh explains: unspecified vegetable in common language is unspecified vegetable eaten raw). Ulla said: when saying "pot vegetables upon me," perhaps he means vegetables eaten in a pot (and Rashi explains: through pickling of the pot; and in common language more is called "vegetable" from vegetables cooked in a pot). And they answer: when saying "vegetables that are cooked in a pot" — meaning therefore forbidden in gourds that are eaten through cooking; and before us, when saying "pot vegetables upon me," he is permitted in gourds, for he said "vegetable" only in the manner of pickling, as is common unspecified language; and gourds are something cooked. And in Perishah he raised this difficulty on him and wrote it appears to him what Tur wrote — forbidden even in pickled — means all the more forbidden in what is eaten raw; but it requires study whence Tur has this. It appears to me his words are correct according to Tur\'s view, and Tur\'s words are built on this matter as the Talmud\'s explanation: the word "vegetable" does not depart from its simple meaning — unspecified vegetable eaten raw — until it is clarified he did not intend otherwise; therefore the questioner asked: perhaps he meant vegetables eaten in a pot, i.e., pickled; if so, his explanation would be that it is not cooked, and although for the law pickled is like cooked, nevertheless in common language it is not so; and when we explain his words that he said "pot" regarding pickled, we gain that "vegetable" remains in its simple meaning of something eaten raw — therefore forbidden to eat raw, and even through pickling forbidden, but through cooking he did not vow at all and it is permitted. And they answer that he explicitly said "vegetables that are cooked in a pot" — thus we rule that when saying "my pot vegetables upon me," forbidden in raw and pickled and not in cooked, unless he said "vegetables that are cooked," then permitted in pickled and raw; and the prohibition of gourds is also after cooking. In Perishah he wrote the prohibition of gourds is because they are not eaten raw — but he did not analyze finely: the prohibition of gourds is no better than any vegetable not forbidden except after cooking, not raw; likewise gourds — even though possible to eat raw. Thus Tur\'s view appears correct to me, not Maharshal\'s words we mentioned. In Tur it is written: Rambam wrote we follow common language according to place and time, and he permitted a rolled egg — "not clear" until here his words. In Kesef Mishneh he understood Tur wrote "not clear" on what Rambam wrote that we go according to place, etc., and wondered, for Tur did not come to argue, only regarding rolled egg alone; and he had to write first what Rambam wrote according to place so one should not resolve what Rambam wrote to permit rolled egg from local custom; therefore he wrote one cannot say so, for Rambam wrote first we go according to place, and with this he wrote unspecified is permitted — meaning from the law he said so, and "not clear" — thus it appears to my humble opinion.')
add("turei-zahav", "4", "ב",
    '"And if he said to his agent, etc." Explanation: and here is proof that if he said to his agent, etc.')
add("turei-zahav", "5", "_",
    '"Forbidden even when dry." Explanation: although a vegetable is called "moist," nevertheless here forbidden even when dry, since they do not make a threshing floor for vegetables — even dry does not leave the category of vegetable. And what is written "permitted in sinews" is a scribal error and must read "forbidden," as in Yerushalmi; and Beit Yosef brings it also in the version "forbidden"; and Levush wrote to explain it is permitted because they are two species, and it is a mistake.')
add("turei-zahav", "8", "א",
    '"He is forbidden even in fish meat." In seif 9 we copied Maharshal\'s words that nowadays he is permitted in fish.')
add("turei-zahav", "8", "ב",
    '"And if the matters appear, etc." In Tur he wrote according to the Gemara: if he vowed on bloodletting days, fish are not in the vow, for otherwise he would not eat them and need not vow; and this is on the first day of bloodletting, for they said "second for fish blood." And the Gemara challenges: if so, birds too should be said thus, for they said one who lets blood and eats should eat roasted bird so his heart flies; and they answer that it is possible to eat through shaluk; therefore the vow applies to them properly. Rosh wrote Shmuel did not say "his heart flies," only roasted; and in Perishah he wondered, for Tur and other decisors did not mention this; and furthermore the world is accustomed to eat chickens on the bloodletting day; therefore he divided between chicken meat and birds, and strained needlessly — only roasted one does not eat even chickens; and on Tur in Kesef Mishneh: why did he not divide, since any eating of birds applies the vow and forbids in all manners? Nevertheless it is astonishing what we say there in the Gemara that one who let blood should not eat milk, cheese, or eggs, etc., yet the world eats eggs immediately after bloodletting; possibly their bloodletting was harder, for they let much blood.')
add("turei-zahav", "9", "א",
    '"From the scum." Explanation: fine crumbs that accumulate at the bottom of the pot.')
add("turei-zahav", "9", "ב",
    '"From meat he is permitted in both." Maharshal wrote: it appears to me nowadays forbidden in both, for we follow common language; nevertheless we permit unspecified in fish, end of his words. It is clear from his words that nowadays one who vows from meat without specification is permitted in fish, for it is not the way now to consult an agent about it.')
add("turei-zahav", "9", "ג",
    '"Unless he says konam meat upon me, etc." Tur also wrote thus; but truth guides his way that it is missing here, and must read "this meat," as proven in siman 217, seif 9.')
add("turei-zahav", "10", "א",
    '"Forbidden in a stew of groats." Makafah is a thick dish; regarding garlic prohibition he did not mention "stew of garlic," because even garlic alone is forbidden, since he said "any stew is forbidden upon me," and garlic is put in every stew, as Rosh wrote at the end of the chapter "One who vows from cooked": garlic is regularly put in every kind of stew because it imparts taste, and the garlic is the stew; but they do not make a stew of groats alone, rather from several kinds. That which we say one who vows from groats is forbidden even in a stew of groats — because he calls it "stew of groats," as Beit Yosef wrote in Ran\'s name; but one who vows from stew without specification — groats alone are not included, for groats are not essential to stew, unlike garlic which is essential; therefore even in one who vows from stew, garlic alone is forbidden, for unspecified stew is of garlic; but one who vows from garlic is forbidden only alone, not when put in stew, for then it is something else; likewise the name garlic is not called upon the stew to call it "stew of garlic," as with groats — thus appears to me the reason for these laws.')
add("turei-zahav", "10", "ב",
    '"Spices that I taste." The same applies to "that I eat" — so Maharshal.')
add("turei-zahav", "10", "ג",
    '"From asparagus." Tur\'s language: Rashi explains asparagus is a type of cabbage; Rambam explains a type of cabbage greens, end of Ran\'s words. And according to Rambam: why forbidden to one who vows from cabbage from asparagus, unlike one who vows from meat permitted in gravy? One can say in vows we follow common language; in their time they also called asparagus cabbage, not cabbage asparagus; unlike meat and gravy, never called meat gravy in those days — thus it appears. In Shulchan Aruch\'s version: one who vows from cabbage is permitted in asparagus — a scribal error; and likewise in Beit Yosef it was copied "permitted," also an error; rather as Tur\'s version, so in Mishnah and all decisors; and Levush thought Shulchan Aruch\'s version is true and gave a reason that they are two species and it is a mistake.')
add("turei-zahav", "11", "_",
    '"Permitted in whey." Explanation: the milk that separates from it.')
add("turei-zahav", "12", "א",
    '"One who vows from fish." In Tur: "fish that I taste" — forbidden in large and small; Maharshal wrote: in truth one who forbids upon himself "dag dagah" is forbidden in both, for dag implies large and dagah small in common language; but "fish" alone — it appears not necessary "dag fish," for even "fish" alone forbids everything, as implied; and Rosh wrote; but in dagah alone, all agree specifically small ones; and in dag dagah forbidden in both — so all agree, end of his words.')
add("turei-zahav", "12", "ב",
    '"Permitted in fish brine, etc." A simple matter: meaning brine that emerged before the vow; but after the vow forbidden, as in siman 216, seif 9, regarding meat and wine; automatically the same here — if he said "fish that I taste" or "eat," or "these fish upon me," forbidden in brine emerging after the vow; and likewise whey in seif 11 and date honey in seif 13 — thus it appears to me.')
add("turei-zahav", "13", "א",
    '"Even though the name of dates, etc." This answer Beit Yosef wrote in Ran\'s name; and I found Maharal of Prague answered: whey of milk is different, for it was still drinkable as at first, unlike date honey that was first food and now became drink.')
add("turei-zahav", "13", "ב",
    '"Masticon." Explanation: ends of grapes that are not cooked.')
add("turei-zahav", "14", "_",
    '"Permitted in date honey." For unspecified honey is from bees.')
add("turei-zahav", "15", "_",
    '"And some forbid in conditum." And it is not similar to seif 10 regarding one who vows from vegetables who is permitted in field vegetables because they have a secondary name; here too there is a secondary name, for it is called cooked wine. I am different there, for it is another species, unlike here where both are wine; and because it was cooked it did not lose its nature — Ran.')
add("turei-zahav", "16", "_",
    '"From tirosh — for us." For we call tirosh only wine in the language of Torah.')
add("turei-zahav", "17", "_",
    '"Even though most of their sustenance is from one." See what I wrote on this in siman 208, seif 1.')
add("turei-zahav", "18", "א",
    '"Ma\'alalta." Every superior and praiseworthy thing — so Rosh there.')
add("turei-zahav", "18", "ב",
    '"And the same for one who vows from grain." In Tur: "from grain" — R\' Meir speaks, who forbids all kinds of legumes except chilka and tisni; Rashi explains: wheat divided into two, three, or four parts — therefore permitted, for the wheat already changed; and the Sages say he is forbidden only in the five species alone. It appears from Rif\'s words he rules like R\' Meir; from Ramban\'s words he rules like the Sages — so is reasonable; and Rambam wrote thus, end of his words. One should wonder: in the Gemara R\' Meir counts except rice and chilka, etc. — why did Tur omit rice? And one can say it is missing in Tur, for he wrote except chilka — if he counted rice it should say "and chilka." It appears to me Tur holds the Sages are more lenient than R\' Chiya, and it is reasonable to them that other species not of the five are permitted; all the more they are lenient where R\' Meir is lenient — in divided wheat, chilka, tisni, etc.; for although wheat is one of the five, nevertheless permitted because it changed; and I saw Perishah bring this in Maharshal\'s name, though he wrote Rambam should have written these are permitted — nevertheless Tur\'s view is reasonable, and therefore he brought it in R\' Meir\'s words, since his intent is to rule like the Sages, teaching that even for the Sages there is this leniency of chilka, tisni, etc.; therefore he did not bring rice, for the Sages explicitly said only five species, and rice is not among them; therefore Tur brought those needed as a stringency according to the halachah, i.e., like the Sages; and if he brought rice too we would have no sense it comes to include the Sages\' leniencies — thus it appears to me for halachah, but not for practice to be lenient in chilka and tisni, since the author of Shulchan Aruch did not write so explicitly.')
add("turei-zahav", "19", "_",
    '"Or from food." Meaning things that sustain the heart — and that is specifically in the five species; but "that nourishes" means even if it does not sustain the heart, nevertheless it satiates and nourishes. Ran wrote: here it deals with one who forbade for a short time he can withstand; but for a long time it is a vow that cannot be fulfilled and the vow does not take effect at all. And this "or from food" means: even in a place where they make bread specifically from wheat and barley, nevertheless he speaks of the five species specifically.')
add("turei-zahav", "22", "א",
    '"Forbidden in all fruits." Simple: in mushrooms and truffles he is forbidden.')
add("turei-zahav", "22", "ב",
    '"And permitted in kids and lambs." Even though we say at the beginning "the majority in cattle and flock" excludes, etc. — what the exclusion explains is fruit from fruit and growths of the ground, etc. — learn from this that animals are called fruit; one can say in vows it is different, for we follow common language, and in common language animals are not called fruit; and Ran wrote: here it deals only with one who vowed for a time, as above in seif 19.')
add("turei-zahav", "23", "א",
    '"And permitted in mushrooms and truffles." Because they are not included in fruit of the land, for they draw from the air, even though they grow from the ground.')
add("turei-zahav", "23", "ב",
    '"Forbidden in all of them." It appears that nevertheless kids and lambs are permitted, for even though they are also growths of the ground as I mentioned in the Gemara\'s "majority" in seif 22, nevertheless in vows it is not so, for in common language animals are not called growths of the ground, as we say "fruit" is not called in seif 22; likewise regarding growths of the ground. Maharach wrote: forbidden in animals, since they are called growths of the ground in chapter HaPoalim — it does not appear so to me, as I wrote: what is called growths of the ground from the language of fruit we do not follow, since in common language it is not called so; likewise in common language growths of the ground are only what is in the body of the ground itself; and further, if you do not say so, he should have written the stringency that even animals are forbidden because of growths of the ground — a fortiori mushrooms and truffles; but as I explained, and so many times in this siman we do not follow what is called in the language of the Sages, but the language of common people.')
add("turei-zahav", "36", "א",
    '"One who vows from those who see the sun, etc." This follows Tur\'s view, who divided between saying ro\'ei chammah and ro\'im chammah; and it is truly astonishing what difference between this expression and that, for even if you say in ro\'ei chammah one can explain the sun sees them, nevertheless that explanation is strained, and we prefer to interpret simply that they see the sun, as above in seif 4 regarding vegetables — we follow simple language. It is harder what Rama wrote, since the language is certainly so, and in the Mishnah it states: one who vows from ro\'ei hachammah is forbidden even in blind people — he did not intend except for those the sun sees; and we say in the Gemara: what is the reason? Since he did not say "from those who see," to exclude fish and fetuses whom the sun does not see. Simple explanation: the Talmud infers from language precision — he could have said "from those who see" alone and excluded the blind; why mention the sun at all? Certainly he intended the sun sees them, excluding fish and fetuses; thus there is no difference between ro\'ei chammah and ro\'im hachammah, for also in ro\'im hachammah there is extra language of the sun; so Ran, and so Rambam and Rosh in their rulings did not mention permitting blind people when saying ro\'im hachammah; also from Tosafot\'s words it appears so to me, except there is a scribal error in their words. Correct girsa in Tosafot: since he did not say "the man who vows vows from those who see" — then certainly it would imply to exclude blind people; and if you say: why not say "from those who see" because then fish and fetuses would be included and he did not want them included — one can say: even now when saying mer\'ei hachammah, as long as we do not interpret the sun sees them, he means they see the sun, for fish see the sun well, but the sun does not see them since they are covered in water, end of Tosafot. According to the beginning of their words it implies there is permission for blind if he said ro\'im et hachammah; but the end is not so, for they wrote "and if you say," etc. — implying the proof is because he did not say "from those who see" alone; and further, how can there be proof from his not saying ro\'im et hachammah — why not make proof from his not needing to mention the sun at all, only "from those who see"? Also the challenge "and if you say" has no understanding on this assumption that permitting blind depends on saying min haro\'im et hachammah. We see clearly there is afterward a scribal error in Tosafot\'s words; correct girsa: since he did not say "the man who vows vows from those who see" without the sun — then certainly would imply to exclude blind; and if you say he did not say "from those who see" because then fish and fetuses would be included and he did not want them — one can say, etc.; their intent is to challenge: since the main proof is because he did not say "from those who see" alone — perhaps if he said so fish and fetuses would be included and he did not want that — therefore he mentioned the sun to exclude fish, who do not see the sun since they are in water; and they answered: if so, mentioning the sun did not help, for fish really see the sun and were not excluded, only the sun does not see them; and one must say likewise regarding fetuses — they see the sun, and Tosafot did not need to mention fetuses, for automatically from fish; and there is proof from Gemara chapter 3 of Niddah that the fetus looks from one end of the world to the other, only the sun does not see the fetus, i.e., it is not exposed toward the sun, as Tosafot wrote regarding fish; otherwise Tosafot\'s challenge on fetuses would be difficult. Thus their words appear to me; do not wonder that I emended Tosafot — those Tosafot are full of errors for anyone who reads them regularly; but Tur\'s view requires study, for he wrote: if he said mer\'im hachammah, permitted in blind — what difference between this expression and ro\'ei chammah? It appears his intent: also here there is extra language — why mention the sun? He must speak in strained language that the sun sees them; ro\'ei chammah is precise and is like saying they have evidence of sun; if so we can say in that expression the sun sees them, which is not so when saying mer\'im et hachammah; even though there is difficulty why extra language of the sun, nevertheless you have no answer to the difficulty that ro\'im cannot bear the explanation the sun sees them — only ro\'ei chammah can be explained thus on the side of strain; and ro\'im is a familiar word not adhering to the next word, so automatically it means they see simply; and since you have no answer on the extra language, we learn nothing from it and it is as if he said mer\'im alone — therefore permitted in blind; thus Tur\'s intent appears; and what Rama wrote — since the language is certainly so — we interpret from the difficulty of extra language we are forced to interpret thus since there is an answer before us; and Maharach wrote from these Tosafot it implies permission only when saying mer\'im et hachammah, for the main point is the language et hachammah; therefore he emended Tur\'s words also to et hachammah — but this does not appear from the end of Tosafot that challenged "and if you say"; also in Tur\'s explanation it does not appear so, for then Tur should not have divided between ro\'ei chammah and ro\'im et hachammah, but in ro\'im itself he should divide whether he said et or not; also I know no proof at all from the word et; and as without et one strains to explain haro\'im hachammah as those seen by the sun, likewise if he said et it would be like min, "I am about to destroy the earth," "as I went out of the city"; and Tosafot did not intend that in any event. However Tur\'s explanation may be, it appears in practice one should not rely to permit the language ro\'im hachammah regarding blind, since other decisors did not divide — Tur is alone; and Maharach ruled one should not permit in ro\'im et hachammah — this does not appear at all; rather as other decisors\' simple meaning: wherever there is extra language of the sun, we interpret his intent in any expression he says that the sun sees them — thus it appears to my humble opinion.')
add("turei-zahav", "36", "ב",
    '"In everything that is not a living creature, etc." In Tosafot that Beit Yosef brought: they explained thus — since he mentioned ro\'ei hachammah, it implies specifically living creatures fit to see the sun, until here his words. It is difficult: we interpret his words that the sun sees and not that they see; and one can say nevertheless the language does not depart from simplicity that they see the sun without any break between — meaning the sun sees them, unlike fish who see through a break, as Tosafot wrote above; and Tur above holds that in ro\'im hachammah this is not in its meaning, since he said min haro\'im hachammah — the word haro\'im does not adhere to the following word as ro\'ei chammah; automatically it means they see in any case, excluding blind.')
add("turei-zahav", "37", "_",
    '"Forbidden in bald people and those with white hair." The reason in the Gemara: since he did not say "from those with hair" but certainly he does not exclude hair except from those regularly black-headed; and I still have no proof to forbid those with white hair; and one can say excluding white-haired people: since in any event this one is permitted in bald people from the proof he should have said "from those with hair" — he must have intended also regarding white-haired people the same law. So Ran explained — and it is hard for me either way: if there is good reason to explain black-headed as one who once had black hair, as there is reason to interpret one who is now black — why does the Talmud need proof? Even without proof we should be stringent, for unspecified vows are stringent, as siman 208; and if there is no such reason, whence do we forbid bald and white-haired — let us permit in both, since it is more reasonable they now have black hair; and that he did not say "those with hair" — if so he would be forbidden in white-haired and permitted only in bald — therefore he used language that excludes both to permit. And one can say: certainly if we follow the simpler explanation, it is more reasonable one who now has the difficulty before us lest he permit both; but truth is there is no meaning to interpret black-headed comes to exclude bald, for that is the opposite of black-headed, rather the opposite of "those with hair"; therefore certainly bald is not excluded, and thus white hair is excluded, since we are forced his explanation is one who had black hair; and if you say if he said "those with hair" we would say women and minors forbidden — if so he should have said "from every person"; therefore he used language separated from them.')
add("turei-zahav", "38", "_",
    '"Even in Kutim." Because they are commanded regarding Shabbat and do so; but idolaters, even if they observe Shabbat, nevertheless are not commanded thus — Gemara.')
add("turei-zahav", "39", "_",
    '"And permitted in Kutim." Because they do not ascend there, even though commanded regarding this; and Beit Yosef wrote Kutim ascend Mount Gerizim in place of Jerusalem; and in Perishah\'s gloss he wrote if one vowed from festival pilgrims he forbids even Kutim, for they ascend Mount Gerizim — let such a ruling be suppressed, for even if they ascended to Jerusalem and were not commanded, he did not intend them, only one commanded and performing; a fortiori here he did not intend them; and certainly these words did not emerge from that tzaddik himself.')
add("turei-zahav", "40", "א",
    '"And in converts." No source is found for this; it appears he derived it from what we find regarding blessing that a convert can say "God of our fathers," as it is written "for I have made you father of a multitude of nations," as Tosafot wrote in chapter HaSefinah, folio 81.')
add("turei-zahav", "40", "ב",
    '"Even in sons of Ishmael and Esau." As written: "for in Isaac shall seed be called to you" — not all Isaac, to exclude Esau; all the more Ishmael.')
add("turei-zahav", "41", "_",
    '"Forbidden in circumcised ones of other nations." Because foreskin is called in Scripture upon all other nations specifically; and likewise "circumcised" upon the Jewish nation specifically.')
add("turei-zahav", "47", "_",
    '"Also Chanukah and Purim." Because these days too in common language are called good days, like "I shall make a good day for the Sages" — meaning whatever has joy; and the rule in this entire siman is we follow common language; but here it was somewhat strained that these days be included, therefore the one who vowed had to say explicitly he intended this.')
add("turei-zahav", "48", "_",
    '"That they call aposter." In Ashkenaz language "wetten"; Beit Yosef wrote in Rabbeinu Yerucham\'s name: his main intent in his oath was to refrain from all levity leading to monetary loss, end of his words; thus it implies one who swears without specification not to play means where there is monetary loss, but without loss permitted to play. Nevertheless it appears we follow the swearer\'s intent: if his concern was monetary loss, or wasting time in kinds of levity — then forbidden even to play for free — thus it appears to me.')

# --- rabbi-akiva-eiger-yd ---
add("rabbi-akiva-eiger-yd", "1", "_",
    '(Siman 217, seif 1) "A vow" or "he swore" from what is cooked. One married a woman and swore to her he would not marry over her — if permitted to marry her when she was already betrothed before the oath — see responsa Ginat Veradim (Even HaEzer, siman 5).')
add("rabbi-akiva-eiger-yd", "2", "_",
    '(There, seif 14) "One who vows" from honey. Regarding one who vows from something that comes from a living creature — if forbidden in honey — see Sha\'ar Ephraim (siman 69).')
add("rabbi-akiva-eiger-yd", "3", "_",
    '(There, seif 15) "Permitted" in apple wine. It implies raisin wine is forbidden — Torat Chesed (63); and he challenged from this responsa of Maharash Halevi (Yoreh De\'ah 232) who permitted raisin wine.')
add("rabbi-akiva-eiger-yd", "4", "_",
    '(There, seif 18) "Or" one who vows from ma\'alalta. See in Beit Yosef; and nevertheless it is hard for me: even if one says so according to Tur, nevertheless from what Ran wrote regarding ship beer that in vows we go stringently — it appears he holds also in vows ma\'alalta implies everything; and why did the Mechaber not consider Ran\'s view to be stringent in Torah matters? It requires study.')
add("rabbi-akiva-eiger-yd", "5", "_",
    '(There, seif 19) "Forbidden" in the five species. It is hard for me why he is not forbidden in rice, which is also food over which we bless hamotzi, as in Orach Chayyim (siman 208); it requires study.')
add("rabbi-akiva-eiger-yd", "6", "_",
    '(There) "Except" water and salt, even if salt and water are mixed together — Mahariyk (shoresh 99).')
add("rabbi-akiva-eiger-yd", "7", "_",
    '(There, seif 28) "One who vows" from a house is forbidden only in a house that has four by four cubits — Tosafot (chapter 1 of Sukkah, 3) in the name of Yerushalmi.')
add("rabbi-akiva-eiger-yd", "8", "_",
    '(Seif 29) "From the words" of Rashi and Rambam in their Mishnah commentary, and Ra\'avad and Tosefet Yom Tov — it is clear they hold it deals when there is some building within seventy cubits and four handbreadths; it implies in open air it is not like a city; and he compared it to Shulchan Aruch Orach Chayyim (siman 398, seif 5); and likewise Bach there in one answer; and likewise Maggid Mishneh (chapter 28 of Hilchot Shabbat) in the name of some who rejected; but Maggid Mishneh\'s view there is that here it is different, for we follow common language; and likewise Bach in the first answer; and see in Urim Gedolim (simanim 97–98).')
add("rabbi-akiva-eiger-yd", "9", "_",
    '(Shach, note 35) "Within" seventy cubits and four handbreadths — see in Tosefet Shabbat (siman 244, note 7).')
add("rabbi-akiva-eiger-yd", "10", "_",
    '(There, seif 32) "One who vows" from city residents — see Maharival (part 2, siman 87).')
add("rabbi-akiva-eiger-yd", "11", "_",
    '(There, in the gloss) "After" common language — see responsa Maharit (part 2, siman 61).')
add("rabbi-akiva-eiger-yd", "12", "_",
    '(There, seif 35) "And one" who is not a seafarer — I wonder that the Mechaber ruled leniently like Tur and did not consider Ran (folio 84), who raised that whether he is a seafarer at the time of the vow or at the time the vow takes effect, he is forbidden — see there; and it requires study. It also appears to me from Ran\'s proof there from "konam that I benefit from creatures" — even if he does not tie his vow to time but said simply he will not benefit from seafarers, and one was now a land-dweller and later became a seafarer — forbidden to benefit, for whenever at the time of benefit he is a seafarer he is in the prohibition. Afterward I found in Korban Netanel he wondered similarly at Shulchan Aruch and the later authorities omitting Ran\'s view.')
add("rabbi-akiva-eiger-yd", "13", "_",
    '(There, seif 37, in the gloss) "Forbidden" to look at the sun. I do not think so, for it does not imply to people the excessively red; everything is according to the matter and the vower\'s intent — end of Maharikash\'s words.')
add("rabbi-akiva-eiger-yd", "14", "_",
    '(There, Shach, note 42) "That lay" eggs — and even non-kosher fish permitted — see above (beginning, seif 8); and according to Rif and Rashba in Tur here, forbidden in non-kosher fish — see Peri Chadash (there, note 25).')
add("rabbi-akiva-eiger-yd", "15", "_",
    '(There, seif 40) "And permitted" in nations of the world; and one who vows from seed of Isaac — see Magen Avraham (siman 491, note 7).')
add("rabbi-akiva-eiger-yd", "16", "_",
    '(Taz, note 35) "No" source is found for this explicitly; Rosh in his commentary there forbids converts; and the reason they are called seed of Abraham — as written "for I have made you father of a multitude of nations"; and see in Birkhei Yosef (Orach Chayyim, siman 199).')
add("rabbi-akiva-eiger-yd", "17", "_",
    '(There, seif 41) "And permitted" in uncircumcised Jews. Bach wrote: specifically when his brother died on account of circumcision, but not an apostate regarding foreskin; and Peri Chadash in Mayim Chayyim challenged and raised that whoever is not for provocation is included in "circumcised."')
add("rabbi-akiva-eiger-yd", "18", "_",
    '(There, seif 43) "One who vows" from Israel — see responsa Maharit (part 2, siman 47).')
add("rabbi-akiva-eiger-yd", "19", "_",
    '(There, seif 46) "Permitted" in sons of sons. And the same: permitted in daughters; and where he has only daughters and sons of sons — Noda Biyehudah wrote in the chapter "One who died" he is forbidden in sons of sons and permitted in daughters; from "one who vowed from Reuven and his sons and sons of his sons" it appears to me permitted in the fourth generation; and from Maharam of Trani (part 2, siman 28) it appears it is a safek — Knesset HaGedolah; and see Shach, Choshen Mishpat (siman 257, note 3).')
add("rabbi-akiva-eiger-yd", "20", "_",
    '(There, seif 48) "Or" one who swore he will not laugh — see responsa of the RaaM (part 2, siman 14): even if he swore not to play with dice, all kinds of levity are included; and if he swore he will not laugh — only fruits? In fruits? See responsa Rashba (part 3, siman 388) — what is included in "fruits"; and see in this siman, note 23.')
add("rabbi-akiva-eiger-yd", "21", "_",
    '(There, in the gloss) "And as will be explained" in siman 218 — one who swore not to sell: if permitted to give as a gift or to give a dowry to his daughter — see responsa Ranach (part 2, siman 94) and responsa Kol Eliyahu (136) — exchange is included in sale; see responsa Ranach (part 2, siman 97); and see above (seif 31, in the gloss).')
add("rabbi-akiva-eiger-yd", "22", "_",
    '(There, end, note 57) "And as written" the Rav — see responsa Veshav HaKohen (siman 79).')

# --- yad-avraham ---
add("yad-avraham", "1", "_",
    '(Siman 217, seif 14) "One who vows from honey is permitted in date honey." Explanation: because it has a secondary name, as stated in the Mishnah in chapter 6 of Nedarim; and accordingly it appears the same — permitted in bee honey and hornet honey for one who permits above in the beginning of chapter 1, for unspecified honey is not called so; but one can say there is a secondary name, as taught in Bechoros (7a).')
add("yad-avraham", "2", "_",
    '(There, seif 28) "One who vows from a house is forbidden in its upper story." See Shach in the name of Rosh that a room and annex are not included in "house," and he compared it to one who sells a house does not sell the room or annex. And in my work on Rambam, chapter 9 of Hilchot Nedarim, I wrote: we compare sale to vows only for stringency — the advantage to the buyer holding the document is that his hand is on the lower part; and in such a case they equated in the Gemara chapter "One who vows" sale to vows: as in vows he is forbidden also in the upper story, so in sale when he sold a house without specification he gives him only the upper story — a stringency for the buyer, whose hand holding the document is on the lower part — as Rosh and Ran there according to the sugya in Menachot. Accordingly here too regarding room and annex there is no proof from sale, which is a stringency for the buyer, to permit in vows in room and annex. Proof: an upper story not open to the house is not sold at all as part of the house according to Rambam and other decisors in Shulchan Aruch Choshen Mishpat, siman 214; yet regarding vows it is included in "house." Thus room and annex — although in sale they are not included in "house," for vows they are included. Rosh follows his reason that he holds regarding "he sold the house" that room and annex are not included even if he bounded outer boundaries and wrote "and left nothing in the sale" — as Bach wrote in Choshen Mishpat there. Thus according to his view no one calls it a "house" at all; if so, even a minority called "house" would help this language, as we say regarding one who sold a house in a large courtyard; and since it did not help, learn no one calls room and annex "house," and therefore regarding vows too he permits. But the decisors who disagree, brought in Choshen Mishpat there seif 2 and 11 and siman 256, who hold if he wrote so, room and annex are included — they must hold some call them "house"; thus regarding vows we cannot be lenient, for it is no worse than an upper story. And in my work on Rambam I elaborated.')
add("yad-avraham", "3", "_",
    '(There, seif 32) "One who vows from city residents is forbidden to one who sat there thirty days." It appears one whose intent is to sit and settle there is forbidden to benefit from him immediately, for then he is among city residents immediately, as written in siman 256 regarding charity; and the same for vows; and likewise in this siman, seif 34, we follow ultimately becoming dry-land residents.')
add("yad-avraham", "4", "_",
    '(There, seif 36) "One who vows from those who see the sun is forbidden even in blind people — he intended only those the sun sees." The gloss wrote in Rosh\'s name: even if he said he did not intend so, it does not help. In Tuv Ta\'am VaDa\'at, chapter 3 of Shevuot, he challenged Rosh and the gloss here from the Tosefta, chapter 7 of Taharot, brought by Maggid Mishneh, chapter 2 of Shevuot: there it teaches explicitly a person is believed about himself — how? They said to him, "You vowed," and he said, "There was a condition in my heart" — we listen to him; implying a person is believed to say "such and such I intended and I erred in my language." Rambam there ruled likewise: if one swore before us not to eat today and ate, and they released him, and he said, "I did not have in heart except not to go out today and I erred in my language and expressed eating not in my heart" — he is not lashed. He wrote the main view is like Rambam, unlike the gloss here. I say Rosh and the gloss are not as Tuv Ta\'am understood: a person is never believed to say he erred in language — for in chapter 3 of Shevuot Rosh brings: one who intended to utter wheat bread and uttered barley bread is permitted in both, for he did not intend barley though he uttered it; evidently we believe him that he erred in language to say what he did not intend; and likewise siman 210 and siman 232 seif 12 brought in the gloss that a person is believed to say his oath was under duress or on a condition — this is the above Tosefta. According to Tuv Ta\'am, Rosh and the gloss contradict each other. But in truth these fine points Tuv Ta\'am inferred from Rosh — Rosh does not hold the Tosefta law that a person is believed to say he erred; for what he inferred from Rosh in Nedarim (16a) — Rav Ashi regarding "I will eat for you" — an oath that "I will not eat for you" — what to say? One authority: it is language that tripped him — teaches us. Rosh: lest you say we believe him if he said he meant to say "I will eat" and stammered and said "I will not eat" — teaches us that since he uttered "I will not eat," we do not believe what he says afterward. On this Tuv Ta\'am wrote it implies Rosh holds one is not believed to say "such was in my heart when I vowed and I did not intend that." In my view Rosh deduced and concluded we do not believe what he says afterward: his intent is certainly if immediately at his vow when asked he said he stammered and erred — believed; only if immediately at his vow when asked he did not say so, afterward we do not believe him. This distinction one learns from Rambam and the gloss in siman 232. Thus there is no dispute between Rambam and Rosh — unlike it appears from Mahaneh Efrayim, Hilchot Nedarim, siman 5, that Rosh argues on Rambam. Also what Tuv Ta\'am inferred from Rosh and the gloss here — the case is not similar to the proof: here he did not err in language at all and uttered what was in his heart; rather he says he intended a different meaning the language does not bear — therefore we do not heed him and it does not help, not because we do not believe him, but because we rule we follow common language; and since the language is certainly so and he uttered it intentionally without error, we follow it. Similar is Chavot Yair\'s responsa. Unlike when he erred and uttered language he did not intend — we do not follow language and we believe he erred and did not intend to utter so, for people commonly err in language. Unlike responsa Maharit brought in Shach, siman 218, that he is not believed to say a condition was in his heart — Chavot Yair agreed in siman 15; and he also sided there to say: but for the above Tosefta, one could say all decisors agree he is not believed to say a condition was in his heart, and we do not rule like the Tosefta, which is against our Gemara\'s implication — end of his words.')


def apply_file(path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    n = 0
    parts = re.split(r"(\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*\r?\n)", text)
    out: list[str] = []
    i = 0
    while i < len(parts):
        chunk = parts[i]
        if not chunk.startswith("**** YD001"):
            out.append(chunk)
            i += 1
            continue
        header = chunk
        i += 1
        body = parts[i] if i < len(parts) else ""
        i += 1
        slug_m = re.search(r"^slug: (.+)$", body, re.M)
        seif_m = re.search(r"^seif: (.+)$", body, re.M)
        marker_m = re.search(r"^marker: (.+)$", body, re.M)
        if slug_m and seif_m and marker_m:
            key = (slug_m.group(1).strip(), seif_m.group(1).strip(), marker_m.group(1).strip())
            repl = T.get(key)
            if repl is not None:
                body = re.sub(
                    r"(\*\*\*\* ENGLISH \*\*\*\*\r?\n)(.*?)(\r?\n\*\*\*\* END BLOCK \*\*\*\*)",
                    lambda m: m.group(1) + repl + m.group(3),
                    body,
                    count=1,
                    flags=re.S,
                )
                n += 1
        out.append(header)
        out.append(body)
    path.write_text("".join(out), encoding="utf-8", newline="\n")
    return n


def main() -> None:
    counts: dict[str, int] = {}
    for slug_dir in sorted(ROOT.iterdir()):
        if not slug_dir.is_dir():
            continue
        slug = slug_dir.name
        for part in sorted(slug_dir.glob("part-*.txt")):
            c = apply_file(part)
            if c:
                counts[slug] = counts.get(slug, 0) + c
    print("Blocks updated per slug:")
    total = 0
    for slug, c in sorted(counts.items()):
        print(f"  {slug}: {c}")
        total += c
    print(f"  TOTAL: {total}")


if __name__ == "__main__":
    main()
