#!/usr/bin/env python3
"""Apply mechaber editorial retranslations for siman 334 (nidui)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output"
TRANSLATIONS: dict[tuple[int, int], str] = {}


def T(siman: int, seif: int, text: str):
    TRANSLATIONS[(siman, seif)] = text.strip()


# ========== SIMAN 334 — nidui ==========
T(334, 1, """How they would conduct themselves with one under nidui or cherem, for what matters they impose nidui, and the law of its release. It contains 48 seifim:
One who transgresses a forbidden matter—they impose nidui upon him immediately: {Rama: But for monetary matters they do not impose nidui until they warn him three times—that is, 2, 5, 2 (Tur)—from the court, as will be explained in section 5 siman 11.} And nidui is not less than thirty days; and if he does not repent they repeat nidui upon him after thirty days; and if he does not repent they wait for him another thirty and impose cherem upon him; even if a festival occurs within the thirty days it does not cancel it. In what case is this said? Nidui of thirty days in their nidui; but our nidui is like their nezifah, which is seven days, and our nezifah is one day: {Rama: And they impose nidui on one who is liable for nidui even if there is concern that through this he will go to bad culture—one need not be concerned about this (Piskei Maharai siman 138).}""")

T(334, 2, """One under nidui—one does not sit within four cubits of him except his wife and children (Ran) (and some say also members of his household are permitted) (Tur and Terumat HaDeshen siman 276) (and one may be lenient); and one does not eat (and drink with him) (Tur) and does not invite him and does not include him in anything requiring ten: {Rama: But if they did not impose nidui upon him explicitly—even though he is a criminal or transgressed communal decrees—they may include him in a minyan of ten to pray with them (Rivash siman 172 and Mordechai beginning of Shevuot Shetayim and Hagahot Alfasi chapter Elu Megalchin); and even an actual menudeh whom they do not include in the minyan—nevertheless it is permitted to pray while he is in the synagogue (Beit Yosef in the name of responsum of Rashba and Rivash siman 173); and what they practice to expel him from the synagogue is so individuals who need to distance themselves from four cubits of him not be crowded (there in Rivash).} And he is forbidden in laundering, haircut, and wearing shoes (Raavad and Rosh) like a mourner; and Torah matters—he studies and they study with him, he benefits and they benefit from him; but one under cherem—neither he studies nor do they study with him, neither he benefits nor do they benefit from him; and likewise it is forbidden to benefit him beyond what is needed for his livelihood (responsum of Rashba); but he studies for himself so he not forget his learning, and he makes for himself a small shop for his sustenance; and it is permitted to speak with one under nidui and one under cherem unless the court explicitly intensified upon him: {Rama: Nevertheless one should not increase words with him and should not speak with him except for need, as one speaks with a mourner (Hagahot Alfasi and Rivash cited); in a place where it is forbidden to sit within four cubits of him—wherever a person sat first and the menudeh comes there, he need not move from there (Beit Yosef in the name of HaKuntres); and it is forbidden to enter his house, for it is like four cubits of him; and there is no distinction between standing and sitting (there).}""")

T(334, 3, """A menudeh who died—the court sends and places a stone on his coffin; and they do not tear for him, remove shoes, or eulogize him—and this is for contempt of court and transgression of words of the sages; but for monetary matters, once he died he is exempt from their decree and they do not stone his coffin and eulogize him properly:""")

T(334, 4, """Even if they imposed nidui upon him for transgressing words of the sages—if he repented, even though they did not release his nidui, they engage with him for everything:""")

T(334, 5, """Even though it is forbidden to eat and drink with a menudeh or one under cherem—nevertheless one who eats and drinks with him does not have the status of a menudeh:""")

T(334, 6, """If the court wished to reduce nidui from forty days or to add—the authority is in their hands: {Rama: And the court has authority to intensify upon him that they not circumcise his sons and not bury him if he dies (Binyamin Ze'ev siman 289 and so Beit Yosef in the name of Ramban siman 244); and to expel his sons from the school and his wife from the synagogue until he accepts the judgment (Nimukei Yosef chapter HaGozel).}""")

T(334, 7, """When the time arrives they release him if they wish, even if he does not repent; nevertheless it is good that they not release him if he does not repent, so their awe not be diminished:""")

T(334, 8, """If the court wishes to intensify upon him further and impose cherem—the authority is in their hands:""")

T(334, 9, """If the court saw the severity of the prohibition and the transgression—they may also impose cherem on one who eats and drinks with him and one who sits within four cubits of him:""")

T(334, 10, """If the court saw fit to impose nidui that he not be invited with three, not pray with ten, not bury his dead, not circumcise his son—they are permitted:""")

T(334, 11, """If he was placed under nidui for a transgression—he is not counted for a minyan of ten:""")

T(334, 12, """That which we say regarding a menudeh without specification—that he is forbidden in the laws of a menudeh—refers specifically to one under nidui of the court who is a menudeh to every person, whether he did not come to court or did not obey judgment, or for contempt, or for a matter of transgression—whether the court imposed nidui or any person imposed it, his law is equal whether in his city or another city; but one under nidui in part, such as a disciple whom they imposed nidui for his honor, and likewise one under nidui to another city whom they imposed nidui for their honor—he is not forbidden in all laws of a menudeh, but people distance him in order to shame him; but mourning laws do not apply to him:""")

T(334, 13, """That which we say nidui without specification is thirty—refers to when they impose nidui upon him, saying "So-and-so shall be under nidui thirty days"; nevertheless if he repented—if the nidui was for monetary matters or contempt and he appeased his fellow litigant, they release him immediately; and even if he did not repent—some say they release him after thirty days provided he comes to court and requests that they release him; but if he treats nidui lightly and does not request release, they leave him under nidui until he dies; and some disagree in this (and hold that even after thirty they do not release him until he repents) (Beit Yosef in the name of Rambam); and within thirty they do not release him even if he repented from what he did (it appears in Beit Yosef according to Rambam):""")

T(334, 14, """Nezifah is when a great person rebukes him, saying "How impudent is so-and-so" and the like; and this is its law—that he should hide and sit in his house and be ashamed and not show his face to one who shamed him, and diminish in laughter, speech, and affairs, and afflict himself before all who see him; but he need not distance from people neither in eating and drinking nor in asking of peace; and he need not conduct any of mourning laws; and he need not appease one who was impudent toward him; and he need not have release—rather once he conducted as one rebuked for the time of nezifah he is permitted automatically: {Rama: And even if the great one said nothing to him, only that he knows himself that a great person harbored resentment against him—he must conduct nezifah upon himself (responsum of R' David Kohen siman 22).}""")

T(334, 15, """A menudeh to a rabbi is a menudeh to the disciple (but he is not a menudeh to other sages) (Beit Yosef in the name of Rambam); a menudeh to a disciple whom they imposed nidui for his honor is not a menudeh to the rabbi, but he is a menudeh to the rest of the people (who are not sages—but not to sages even if younger than him) (Beit Yosef from implication of Rambam's language); and specifically when nidui was not in the rabbi's presence—but in the rabbi's presence it is contempt, and if he argues with his rabbi it is called well done; (a rabbi who decreed cherem and nidui in some matter and his disciples cannot uphold his decrees—they need not fulfill) (Piskei Maharai siman 222):""")

T(334, 16, """A disciple may impose nidui on one who shamed in his presence his rabbi or his father; nevertheless since the rabbi did not impose nidui and also the court did not impose nidui—he is not a menudeh to the rabbi:""")

T(334, 17, """In what case is this said? For one whom they imposed nidui because he shamed a Torah scholar; but one whom they imposed nidui for other matters for which he is liable for nidui—even if a minor in Israel imposed it, the nasi and all Israel are obligated to conduct nidui upon him until he repents from the matter for which he was imposed nidui and they release him:""")

T(334, 18, """A rabbi from the side of the government who is not a rabbi in Torah could not impose nidui for his honor: {Rama: And all the more so one who conducts lordship or rabbinic authority from his money or lineage who cannot impose nidui for his honor (Beit Yosef in the name of Kuntresim); and specifically they impose nidui for the rabbi's honor—but they do not impose cherem (Beit Yosef and Rivash siman 173) unless he persists in dispute excessively (there in Rivash). That which we say—a rabbi who imposed nidui for his honor is a menudeh to his disciples—refers if the menudeh did not repent before he imposed nidui upon him; even if the rabbi promised afterward to appease him it does not help until he acts; but if before he was placed under nidui the rabbi said he would appease and he did not heed and imposed nidui—he is not a menudeh at all to his disciples; and immediately when he says he will fix what he corrupted as the sages tell him, nidui is not upon him (Maharik root 169). A community that enacted that no person may impose nidui for his honor—their enactment is nothing; and if a rabbi stood and imposed nidui for his honor, his nidui is nidui (responsum of Rashba siman 400).}""")

T(334, 19, """An elder who imposed nidui for his own need—even as halachah—is not nidui: {Rama: Meaning he did not intend for honor of Torah but only to profit money that he give him to release his nidui (Tur in the name of Avi HaEzri); or that he did so out of hatred, such as we see he imposed nidui on one and others who did likewise he did not impose nidui (Terumat HaDeshen siman 274); and all similar cases.}""")

T(334, 20, """A menudeh to his city is a menudeh to another city (even if greater than it) (Tur); a menudeh to another city is not a menudeh to his city: {Rama: But he is a menudeh to other towns like the city that imposed nidui upon him (Tur). Members of a city who made cherem on anyone who comes to dwell in their city—it does not apply to one who comes to dwell there unless he has a rabbi in the city—for then he must uphold his rabbi's nidui; but they may enact among themselves and fence themselves not to do business with him (Mordechai chapter Lo Yachpor).}""")

T(334, 21, """A menudeh to the nasi is a menudeh to all Israel; a menudeh to all Israel is not a menudeh to the nasi:""")

T(334, 22, """They practiced not to conduct nidui on one who transgressed a communal decree with cherem and nidui until they proclaim upon him: {Rama: One who transgressed the decree of Rabbenu Gershom—if he transgressed unintentionally he does not need release; and if they warned him and he transgressed intentionally—all courts of ten are agents of Rabbenu Gershom to release him when he repents, for we assess Rabbenu Gershom's intent that from the outset his intent was to conduct nezifah and nidui upon him according to their view (Hagahot Mordechai Bava Kamma in the name of responsum of Rashi); but in a matter he decreed explicitly that he be under nidui forever—then he is under nidui forever if he transgressed intentionally (likewise there).}""")

T(334, 23, """How is release of nidui? They say to him "You are permitted" or "It is forgiven you"; and if not in his presence they say "So-and-so is permitted.":""")

T(334, 24, """They release nidui with three laymen or with one expert; and a disciple releases cherem and nidui even in the rabbi's place: {Rama: And any cherem and nidui that was not released—even if a long time passed under nidui and he repented—nevertheless he is not permitted until they release him explicitly (Beit Yosef in the name of Kuntres that so wrote in the name of Raavad).}""")

T(334, 25, """Three who imposed nidui and went away and he repented from the matter for which they imposed nidui—three others release him; and some say they must be as great as them (in wisdom, fear, greatness, and years) (so it appears from Tur):""")

T(334, 26, """Three imposed nidui—two cannot release him unless the third gives them permission; but all three release him, even this one not in the presence of that one, even though they were together at the time of nidui; and if many were present when they imposed nidui—all must release him; and all those consulted at the time of nidui are considered like those who imposed nidui and must also release him:""")

T(334, 27, """They imposed nidui without specification—even though thirty days passed—he remains under nidui forever until they release him:""")

T(334, 28, """If he treated his nidui and cherem lightly—he must conduct prohibition like the days he conducted permission before they release him:""")

T(334, 29, """They imposed nidui in his presence—they do not release him except in his presence (and if they released him not in his presence—some say b'dieved it is release) (Ran first chapter of Nedarim and so it appears from responsum of Rashba siman 503); they imposed nidui not in his presence—they release him even not in his presence:""")

T(334, 30, """They imposed nidui conditionally—the nidui takes effect and release is required even though he fulfilled the condition; and even if he imposed nidui upon himself conditionally; and specifically when the menudeh was doubtful at the time of the condition whether he could fulfill it—but if it was clear to him that he could fulfill it, release is not required:""")

T(334, 31, """Even if he set a time, saying he shall be under nidui if he does not do such-and-such by such-and-such time—they may release him immediately even though the time has not arrived:""")

T(334, 32, """One who imposes nidui upon himself in this world and the next—some say he has no release; therefore one who guards his soul distances from him. (And see above siman 228 seif 45):""")

T(334, 33, """A Torah scholar who imposed nidui upon himself releases himself; even if he imposed nidui with intent of so-and-so; and even for a matter for which he is liable for nidui; and some say if he was liable for nidui he cannot release himself; and some say if it was through an oath he cannot release himself:""")

T(334, 34, """One who is not a Torah scholar who imposed nidui upon himself—some say ten must release him:""")

T(334, 35, """They imposed nidui upon him in a dream—it is nidui and release is required; and even if they released him in a dream it is nothing; and even if he knows who imposed nidui he cannot release him; and ten people who study halachot are needed to release him; if they did not find such—they follow them up to a parasang; if they did not find—they do not release him even ten who study mishnah; if they did not find—they do not release him even ten who know how to read Torah; if they did not find—even ten who do not know how to read; if they did not find in his place ten—they release him even with three (and some say he has no release except through ten who studied halachot or mishnayot (Tosafot); nevertheless it suffices if they release him one after another) (Tur in the name of Rosh):""")

T(334, 36, """Some say one whom they imposed nidui in a dream and sent an agent to release him not in his presence—if the agent found the ten assembled, they release him; and if not, not:""")

T(334, 37, """One who hears mention of the Name from his fellow in vain, or who swore falsely before him, or who blessed a blessing not needed—he is obligated to impose nidui upon him; and if he did not impose nidui, he himself is liable for nidui; and he must release him immediately so there not be a stumbling block for others:""")

T(334, 38, """In what case is this said? When this one who swore or who blessed in vain did so intentionally; but if he did so unintentionally and did not know this is forbidden—it is forbidden to impose nidui upon him:""")

T(334, 39, """One who imposes nidui upon his fellow not as law and the other said to him "On the contrary, nidui of two"—and this is when the second is a great man (even if not ordained) (Maharik root 158) or when it is not known who he is, for we are concerned perhaps he is greater than the imposer; but if the imposer not as law is a Torah scholar and the other is not a Torah scholar—not: {Rama: And likewise a disciple against his rabbi cannot say "on the contrary" unless he took permission from court (Maharik root 170). One who said to his fellow "Do not do this thing under nidui" and this one says to him "on the contrary"—even though he acts not as law, nevertheless the second nidui is also nothing, since he did not impose nidui without specification, only that he said he should not do the thing under nidui (Beit Yosef in the name of responsum of Rivash).}""")

T(334, 40, """A Torah scholar whom a wicked person shamed until he imposed nidui and the wicked one said to him "On the contrary, let them proclaim upon the wicked one that he is a menudeh and let him stand under nidui thirty days and afterward seek forgiveness publicly"—so ruled the Rosh:""")

T(334, 41, """An older brother by two years who shamed his younger brother by two years, and he is a Torah scholar, and the younger by two years imposed nidui on the older by two years—his nidui is nidui:""")

T(334, 42, """A sage, elder in wisdom, or head of court who turned wicked—they do not impose nidui upon him in public ever, unless he acted like Yerovam ben Nevat and his companions; but when he sinned other sins—they flog him in private; and likewise any Torah scholar who became liable for nidui—it is forbidden for the court to jump and impose nidui upon him quickly, but they flee and slip away from him; and pious sages would boast that they never counted themselves to impose nidui on a Torah scholar; and even though they count themselves to flog him if he became liable for lashes or makat mardut; and if he is hated—such as one who occupies himself with books of heretics and drinks at kinds of musical gatherings, or whose fellows are ashamed of him and the Name of Heaven is profaned through him—they place him under cherem:""")

T(334, 43, """For twenty-four matters they impose nidui on a person—and these are they: (1) One who shames a sage, even after his death. (2) One who shames an agent of the court. (3) One who calls his fellow a slave. (4) One who treats lightly one matter of words of the scribes—and needless to say words of Torah. (5) One whom the court sent and set a time and he did not come. (6) One who did not accept judgment from them—they impose nidui until he gives. (7) One who has in his possession something harmful—they impose nidui until he removes the damage. (8) One who sells his land to a non-Jew by force—they impose nidui until he accepts upon himself every force that may come from the oppressor to his fellow Israelite, owner of the border. (9) One who testifies against an Israelite in courts of idolaters by force and extracted money from him through his testimony not as law—they impose nidui until he pays. (10) A kohen slaughterer who does not separate the gifts and gives them to another kohen—they impose nidui until he gives. (11) One who profanes the two days of exile festivals even though it is custom. (12) One who does melacha on erev Pesach after midday. (13) One who mentions the Name in vain or swears in matters of vanity. (14) One who brings the many to eat sacred things outside. (15) One who brings the many to profanation of the Name. (16) One who calculates years and fixes months outside the land. (17) One who misleads the blind. (18) One who hinders the many from doing a mitzvah. (19) A slaughterer from whom a treifah emerged under his hand. (20) A slaughterer who did not show examination of his knife to a sage. (21) One who afflicts himself intentionally. (22) One who divorces his wife and they made partnership or business dealings between them that bring them to attend to one another when they come to court—they impose nidui upon them. (23) A sage whose reputation is bad. (24) One who imposes nidui on one not liable for nidui: {Rama: And for matters of nidui they do not need clear testimony and evidence, but assessment of the mind on truth of what the claimant claims with certainty; and then even a woman, even a minor is believed if the mind gives that it is truth (Maharik root 120).}""")

T(334, 44, """A sage who ruled to permit in waters that have no end is liable for nidui; and likewise one who transgresses his vow and any court that attends to him for a baraita question; and likewise those who do melacha while there is a dead person in the city who has not yet been buried—they are liable for nidui unless there are guilds in the city; and likewise one who makes light and heavy or a gezeirah shavah to uproot something from Torah; or asks something impossible; and likewise one who has a grievance against his fellow in one matter and delivers him to the king or to a judge—they place him under cherem until he comes and stands in court; and likewise a Torah scholar who persists in dispute against the many; and likewise one who rules a ruling in his rabbi's place:""")

T(334, 45, """A young Torah scholar may impose nidui on one who treated with contempt against him; and if his judgment is decided, such as that they called him a slave—he is a menudeh to all Israel; and if his judgment is not decided he is not a menudeh except to those smaller than him: (and even if he did not shame him explicitly, only that he intended to shame him according to clear assessment) (Maharik siman 1):""")

T(334, 46, """Reuven who owes Shimon money and refuses to pay—if Shimon imposed nidui on Reuven to pay him, his nidui is nidui: {Rama: And some say a person does not judge himself to impose nidui on his fellow for a monetary matter (there root 25 in the name of Maharam and Raavad), and so is essential; all the more if his fellow says he is willing to obey judgment (Maharam siman 129).}""")

T(334, 47, """One who shames a sage—even in words, and even after death—if there are witnesses to the matter, the court imposes nidui upon him publicly and they release him when he repents; but if the sage is alive they do not release him until the sage whom they imposed nidui for his sake wishes (nevertheless if he did what is incumbent upon him and the sage does not wish to forgive, they release his nidui) (Beit Yosef); and likewise the sage himself imposes nidui for his honor on an am ha'aretz who treated him with contempt, and he needs neither witnesses nor warning; and they do not release him until the sage wishes; and if the sage died, three come and release him: {Rama: And see below end of siman 243 (in Hagahah) whether they judge in this time the law of a Torah scholar. One who calls a sage informer or traitor—there is no greater shame than this, and they impose nidui for this (Maharik root 180).}""")

T(334, 48, """If they imposed nidui on one person for transgressing a transgression and the ruler decreed punishment on whoever supports the menudeh—they must enter possible punishment in order to uphold their religion; but if they imposed nidui for matters between him and his fellow, such as that they led him to gentile courts—they are not obligated to enter danger of punishment: {Rama: And see above siman 228 seif 47 and also siman 232 seif 12. Even though a person is obligated to protest against transgressors, and whoever does not protest when he is able to protest is caught in that sin—nevertheless a person is not obligated to spend his money for this; therefore they practiced to be lenient from protesting against transgressors when there is concern they will stand against our persons and our money (Mahariv siman 157).}""")


def apply_file(siman: int, path: Path) -> int:
    text = path.read_text(encoding="utf-8")
    count = 0
    pattern = re.compile(
        r"(\*\*\*\* YD001 SOURCE BLOCK \*\*\*\*\n"
        r"slug: mechaber\n"
        r"seif: (\d+)\n"
        r"marker: [^\n]+\n"
        r"\*\*\*\* HEBREW \*\*\*\*\n"
        r"[\s\S]*?"
        r"\*\*\*\* ENGLISH \*\*\*\*\n)"
        r"[\s\S]*?"
        r"(\n\*\*\*\* END BLOCK \*\*\*\*)",
        re.MULTILINE,
    )

    def repl(m):
        nonlocal count
        seif = int(m.group(2))
        key = (siman, seif)
        if key not in TRANSLATIONS:
            raise KeyError(f"Missing translation for siman {siman} seif {seif}")
        count += 1
        return m.group(1) + TRANSLATIONS[key] + m.group(3)

    new_text, n = pattern.subn(repl, text)
    if n == 0:
        raise ValueError(f"No blocks updated in {path}")
    path.write_text(new_text, encoding="utf-8", newline="\n")
    return count


def main():
    siman = 334
    total = 0
    base = ROOT / f"siman_{siman:03d}" / "mechaber"
    for p in sorted(base.glob("part-*.txt")):
        n = apply_file(siman, p)
        print(f"{p.name}: {n} blocks")
        total += n
    print(f"TOTAL: {total} blocks")


if __name__ == "__main__":
    main()
