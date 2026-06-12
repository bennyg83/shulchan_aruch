#!/usr/bin/env python3
"""Apply mechaber editorial retranslations for simanim 305-320 (subset)."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "output"

# (siman, seif) -> english text (between ENGLISH markers)
TRANSLATIONS: dict[tuple[int, int], str] = {}

def T(siman: int, seif: int, text: str):
    TRANSLATIONS[(siman, seif)] = text.strip()

# ========== SIMAN 305 — pidyon ha'ben ==========
T(305, 1, """Who is obligated in pidyon ha'ben, when it is fit for redemption, and all its laws. It contains 31 seifim:
It is a positive mitzvah to redeem every Israelite man his son who is a bechor to his Israelite mother with 5 selaim, which are 120 ma'ot, which are 30 silver dirham refined: (and see above siman 294 how much is a ma'ah; and some say the 5 selaim are approximately two Rhine gold coins, which are 2 Polish gold coins) (Piskei Maharai siman 48):""")

T(305, 2, """A woman is not obligated to redeem her son (language of the Rambam chapter 11 Laws of Bechoros paragraph 2):""")

T(305, 3, """These five selaim one gives to the kohen in silver or in the equivalent of silver from anything he wishes, except land, slaves, and promissory notes; and if he redeemed him with them he is not redeemed:""")

T(305, 4, """If he wrote to the kohen that he owes him five selaim on account of the pidyon of his son, he is obligated to give them to him, and his son is not redeemed (Tur in the name of Halakhot Gedolot). If he told the kohen that he will give him to redeem his son, it is forbidden to retract; however, if he retracted it is considered retraction (Mordechai end of chapter Kol HaGet) (and see above siman 264):""")

T(305, 5, """If he gave him a utensil that is not worth five selaim in the market and the kohen accepted it for five selaim, his son is redeemed (Rambam there), provided that it is worth five selaim to any person:""")

T(305, 6, """If he gave him a utensil for the pidyon of his son without specification, if it is worth 5 selaim even though they did not appraise it at the outset his son is redeemed: {Rama: And if it is not worth it his son is not redeemed (Tur); and if the kohen wishes to keep the utensil he need not return it to him and he completes for him up to 5 selaim (Maharil)}""")

T(305, 7, """If he gave 5 selaim even to ten kohanim, whether at once or one after another, his son is redeemed:""")

T(305, 8, """If the kohen wished to return the pidyon to him he may; but he may not give to the kohen on condition that he return it to him, and if he did so and returned it to him (and the kohen's intent from the outset was not to accept it on condition to return) (so it appears in Beit Yosef) his son is not redeemed until he resolves in his heart to give him a complete gift; and if the kohen later wished to return he may return. And the kohen should not be accustomed to return to everyone, lest he cause loss to other kohanim—for through this not everyone will give the pidyon of their bechorim except to him; but to the poor he may return each time. And all the more so for this reason he should not accept them on condition to return; nevertheless if he transgressed and accepted them and specified that he gives to him on condition to return, the son is redeemed, for a gift on condition to return is called a gift. And this is specifically when he said on condition to return; but if he said, "Here are 5 selaim for you and return them to me," it is not a gift and his son is not redeemed (Rashba siman 198 and responsum 359):""")

T(305, 9, """If he set aside five selaim for the pidyon of his son and they were lost, he is liable for them until they come into the hand of the kohen:""")

T(305, 10, """At the time he gives the pidyon to the kohen he recites asher kidashanu b'mitzvotav v'tzivanu on the redemption of the son, and he recites shehecheyanu; and afterward he gives the pidyon to the kohen. And if he redeems himself he recites asher kidashanu b'mitzvotav v'tzivanu to redeem the bechor, and recites shehecheyanu (Rambam there paragraph 8): {Rama: And some say that even one who redeems himself recites on the redemption of the bechor, and such is the practice (Tur and Rivash siman 131). And see above siman 265: some bring the bechor before the kohen and inform him that he is a bechor petter rechem, and the kohen asks him, "Which do you prefer—your firstborn son or the five selaim that you are obligated to redeem him with?" and the father says, "My firstborn son," and here are 5 selaim for his redemption; and while giving him the money he recites the berachot mentioned (Tur and Rosh in the name of the Geonim), and such is the practice in these lands if the father is with the son; but if he is not with him he redeems him in any case, only he tells the kohen that he has a bechor to redeem and he says, "Which do you prefer," etc. (so it is in Hagahot Mordechai end of chapter HaIshah, and so Beit Yosef in the name of Semak). And if the father wished to leave the son to the kohen he does not discharge his obligation—he must redeem him (Piskei Maharai siman 135). And some wrote that they are accustomed to make a seudah at the time of the pidyon (there in Hagahot Mordechai and Maharil and Terumat HaDeshen siman 269). And if there is wine in the city the kohen recites the berachah on wine immediately after the pidyon (Maharil), and such is practiced now in order to publicize the matter; and they are not accustomed to recite "Who has granted us life..." (Abudraham). And the father cannot redeem through an agent, and also beit din does not redeem him without the father (Rivash siman 131)}""")

T(305, 11, """The bechor is not fit for redemption until thirty days have passed over him; and after thirty days one redeems him immediately so as not to delay the mitzvah. And if day 31 falls on Shabbat, one does not redeem him on Shabbat but waits until Sunday (some say one does not perform pidyon ha'ben on chol hamoed (Mahariv in the name of Sefer HaMitzvos Metzurak); and some permit) (Tosafos first chapter of Moed Katan); and such is the essential ruling:""")

T(305, 12, """If the son died within thirty days—even on day thirty—or if he became a treifah before thirty days passed over him, he is not obligated in pidyon; and even if he preceded and gave the pidyon to the kohen he returns it to him: (if he died after thirty he is obligated to redeem him (Tur) and to recite the berachah on the pidyon, but he does not recite shehecheyanu) (it is evident, and so Maharik end of root 49):""")

T(305, 13, """One who redeemed his son within thirty days: if he said to him "from now" his son is not redeemed; and if he said "after thirty days" his son is redeemed even though the money does not exist after 30 days: {Rama: And some say that if the money does not exist or he returned them to the father within 30, even b'dieved his son is not redeemed (Maharai in Terumat HaDeshen siman 264 and in his writings siman 234); and it is good to be stringent and redeem again}. One who is in doubt whether he is obligated in pidyon is exempt, for the burden of proof rests on the one who extracts from his fellow:""")

T(305, 14, """If the father died within thirty days, the son remains in the presumption that he was not redeemed until proof is brought that his father redeemed him; and if the father died after thirty days he remains in the presumption that he was redeemed until they inform him that he commanded at the time of death and said that he was not redeemed:""")

T(305, 15, """If the father transgressed and did not redeem his son, when he grows up he is obligated to redeem himself (and some wrote that they write for him on a silver plate that he is unredeemed and hang it on his neck so he knows to redeem himself when he grows up) (Maharil). If he was obligated to redeem himself and his son to redeem, he redeems himself first and afterward redeems his son; and if he has only enough for one redemption he redeems himself:""")

T(305, 16, """If he has no free property for redemption, the kohen does not collect from encumbered property even though the obligation of pidyon preceded the creditor's debt:""")

T(305, 17, """Pidyon of the bechor depends only on petter rechem—for if he is not a bechor to the mother, even though he is a bechor to the father, he is not obligated in pidyon; and if he has several wives and has a bechor from each and every one he is obligated to redeem all of them:""")

T(305, 18, """Kohanim and Levites are exempt from pidyon ha'ben; and even a kohenet and leviah married to an Israelite—the son is not obligated in pidyon, for the matter does not depend on the father but on the mother, as it is said "petter rechem in Israel." And if she conceived from a non-Jew, the son of the leviah is exempt from pidyon, and the son of the kohenet is obligated in pidyon—for behold his mother was profaned from the kehunah through intercourse with the non-Jew: {Rama: And if she says she conceived from an Israelite and the Israelite denies her and says she conceived from a non-Jew, the son is exempt from pidyon (Terumat HaDeshen siman 264)}""")

T(305, 19, """A kohen to whom was born a son who is a chalal: if the father died within thirty days the son is obligated to redeem himself, for the father did not acquire his redemption; and if the father died after thirty days the father already acquired his redemption and his son inherits it from him; therefore he sets aside the pidyon and keeps it for himself:""")

T(305, 20, """A maidservant who was freed and a convert who converted while pregnant and gave birth—even though their conception was not in holiness, since the birth was in holiness he is obligated, as it is said "petter rechem in Israel," and behold his womb opened in Israel; it is not known whether before she converted or after she converted:""")

T(305, 21, """A convert and a maidservant who gave birth and afterward converted and were freed and afterward gave birth—they are exempt, for this is not petter rechem:""")

T(305, 22, """An eight-month fetus that put forth its head and it lived and returned and died, or a nine-month fetus that put forth its head even after it died and was returned and afterward his brother emerged and she gave birth to a viable child—he is not petter rechem, for he was released through the head of the first; and when its forehead emerged it releases what comes after it. And likewise one who miscarries in the form of a beast, wild animal, or bird whose half-face resembles the form of a man, or a sandal, or a placenta, or an embroidered fetus (meaning a piece of flesh in the form of a sandal; and placenta means the sac in which the fetus lies; and embroidered fetus means a piece of flesh that has the form of a man—Aruch), or the child emerged cut limb by limb—the one born after any of these is not petter rechem: (language of Tur):""")

T(305, 23, """An eight-month fetus that put forth its head dead; and one who miscarries a fetus full of blood or full of water or full of shades; and one who miscarries in the form of fish and creeping things that are impure and swarming things; and one who miscarries on day forty—the one born after all these is a bechor for pidyon. (And as long as its limbs are not formed it does not release what comes after it; and even nowadays they rely on this) (Maharik root 143):""")

T(305, 24, """A yotzei dofek and the one born after him in the normal way—both are exempt: the first because it did not emerge from the womb, and the second because another preceded it:""")

T(305, 25, """One whose wife had not previously given birth and she bore a male and a female and it is not known which of them emerged first—there is nothing here for the kohen. If she bore two males, even though it is not known which of them is the bechor, he gives 5 selaim to the kohen. If one of them died within 30 days he is exempt, lest the bechor died; and the burden of proof rests on the one who extracts from his fellow:""")

T(305, 26, """If the father died before he redeemed them—whether he died within 30 or after 30—and the sons remain, they give between the two of them 5 selaim, even if they already divided the property:""")

T(305, 27, """Two wives who had not previously given birth and bore two males—he gives ten selaim to the kohen. If one of them died within 30 days: if he gave to one kohen he returns 5 selaim to him; and if he gave to two kohanim he cannot extract from them, for this pidyon was not applied to one son against the other and each will say "I take for the living one." If they bore a male and a female, or two males and a female, he gives 5 selaim to the kohen; and if one of the males died within 30 days he gives nothing to the kohen. If they bore two females and a male, or two males and two females, and it is not known which was born first—there is nothing here for the kohen, for I say a female was born first and afterward a male. (language of Tur):""")

T(305, 28, """Two wives, one who had previously given birth and one who had not, and they bore two males and they became mixed—he gives 5 selaim to the kohen; and if one of them died within 30 there is nothing for the kohen. And if the father died they give between the two of them 5 selaim. Male and female, or two males and a female—there is nothing for the kohen:""")

T(305, 29, """Two wives of two men who had not previously given birth and bore two males and became mixed—this one gives 5 selaim and that one gives 5 selaim. If they gave and afterward one of the sons died within 30 days: if they gave to two kohanim they cannot extract from their hands; and if they gave to one kohen, one of them writes authorization to his fellow and this one goes with authorization and extracts 5 selaim from the kohen. And if they bore a male and a female and it is not known which bore the male and which bore the female; or they bore two males and became mixed and one of them died—the fathers are exempt and the living son is obligated to redeem himself:""")

T(305, 30, """And likewise a woman who had previously given birth who did not wait three months after her husband and remarried and bore a male—there is a doubt whether he is a nine-month son of the first or a seven-month son of the last; the fathers are exempt and the son is obligated to redeem himself. And if they bore two females and a male, or two males and two females—there is nothing for the kohen:""")

T(305, 31, """Two wives of two men, one who had previously given birth and one who had not, and they bore two males—the one whose wife had not previously given birth gives 5 selaim to the kohen. Male and female, or two males and a female—there is nothing for the kohen:""")

# ========== SIMAN 306 — bechor beheimah ==========
T(306, 1, """The law of a bechor of a pure animal—at what time and in what place it applies. It contains 12 seifim:
A bechor of a pure animal applies to males and not to females; and it applies even outside the time of the Temple, both in Eretz Yisrael and outside Eretz Yisrael; and it is a mitzvah to sanctify it and say "Behold this is holy," as it is said "You shall sanctify to the Lord your God," and if he did not sanctify it it becomes sanctified by itself from the womb: (and they give it to the kohen and not to the kohenet) (Tur):""")

T(306, 2, """One does not give the bechor to the kohen at birth, for this is not an honor for the kohen; rather the owner tends it until it grows somewhat. And how much must Israel tend it? For a small animal 30 days, and for a large animal 50 days. And if he has no kohen available he must tend it until a kohen becomes available to him:""")

T(306, 3, """If the kohen said to him, "Give it to me within this time and I will tend it myself," he is not permitted to give it to him, for this is like assisting with his gifts. And if it had a blemish and he said to him, "Within this time give it to me for we will eat it now," he is permitted to give it to him:""")

T(306, 4, """If the kohen refuses to accept it because there is great trouble at this time to tend it until a blemish falls upon it, he is not permitted, because he appears to disparage the gifts of kehunah: {Rama: And even a doubtful bechor—the kohen must accept it immediately from the Israelite who gives it to him (Piskei Maharai siman 167 and Maharil siman 204). And this is specifically in a doubt that arose on its own; but in a place where the Israelite was negligent, such as that he bought a milking cow from a non-Jew, or that he could have sold the bechor to a non-Jew before it was born and did not do so—the kohen need not accept it (there). And even in a place where he must accept it, it is forbidden for the Israelite to give it to him in order to provoke him or to take revenge on him (likewise there in the name of Maharam)}""")

T(306, 5, """The bechor in this time one keeps until a blemish falls upon it and slaughters it according to an expert and eats it [everywhere], and feeds it even to a non-Jew [or to dogs] (Hagahot Mordechai chapter HaIshah SheHalachah):""")

T(306, 6, """The bechor in this time—the kohen sells it even to an Israelite, whether unblemished alive or with a blemish alive or slaughtered; and he may betroth a woman with it as with his other property. But it is not sold by weight in the market nor weighed by litra; nevertheless it is permitted to weigh it measure for measure and against utensils and a kopitz (meaning like a large, broad knife whose sharp edge protrudes in its middle). And these matters apply to its flesh; but its milk, blood, forbidden fat, and horns are sold in the market and weighed by litra; and the fat of the gid has the law of flesh since it is permitted from the Torah:""")

T(306, 7, """The bechor, even with a blemish, is eaten within its year. From when is its year counted? If it was born with a blemish, its year is counted from the day it was born, provided he knows that its months were completed—for behold it is fit for eating on the day of its birth; but if he does not know with certainty that its months were completed, its year is counted from the day it was appraised:""")

T(306, 8, """If a blemish befell it within its year, he may keep it all twelve months. If a blemish befell it at the end of its year, he may keep it 30 days from the day the blemish befell it, even though it extends after its year. How so? For example, if a blemish befell it fifteen days before the completion of its year—they complete for it fifteen days after its year. If a blemish befell it after its year, he may not keep it except until 30 days and he eats it:""")

T(306, 9, """The bechor in this time—before it is shown to a sage for display—one may keep it two or three years; and once it is shown to a sage for display, if a blemish befell it within its year he may keep it all twelve months; and if a blemish befell it after its year he keeps it 30 days:""")

T(306, 10, """The year of a bechor is a full lunar year—twelve months from day to day; and if it was an intercalated year, an extra month is added for it and thirteen months are counted for it:""")

T(306, 11, """If two lambs were born to him, one on the 15th of the first Adar and one on Rosh Chodesh of the second Adar—the one born on Rosh Chodesh of the second Adar, once the first day of Adar of the coming year arrives, a year has completed for it; and the one born in the middle of the first Adar—a year has not completed for it until the middle of Adar of the coming year, since it was born in the leap month they count an extra month for it:""")

T(306, 12, """If he transgressed and kept it beyond its time it is not disqualified:""")

# ========== SIMAN 307 ==========
T(307, 1, """The law of the bechor after slaughter and one who cannot sell it or slaughter it until a blemish falls upon it. It contains 3 seifim:
One does not flay a bechor—that is, to remove its hide whole through its legs:""")

T(307, 2, """If he slaughtered it and it was found to be a treifah, its hide with its flesh is forbidden in benefit and requires burial: (and therefore it is good to sell it to a non-Jew before slaughter) (Hagahot Mordechai chapter HaIshah, and so Beit Yosef in the name of an Ashkenazic responsum, which is in the responsum of Maharil):""")

T(307, 3, """The kohen must keep it and raise it forever until a blemish falls upon it; and he may sell it even to an Israelite even though it is unblemished, and the purchaser observes upon it the sanctity of bechor. This is when the purchaser buys it for his need; but it is forbidden to make merchandise of it—that is, to buy it in order to profit. And if he bought it for his need and did not need it, he may return and sell it:""")

# ========== SIMAN 309 ==========
T(309, 1, """The laws of bechor in this time. It contains 2 seifim:
A bechor in this time has no permission except through a blemish; and even if the owners or the kohen wish to put it in a pen until it dies on its own—they are not permitted; rather the kohen must raise it until a blemish falls upon it:""")

T(309, 2, """Even when a clear blemish falls upon it recognizable to all, such as that its hand or foot was cut off and the like—he is not permitted to slaughter it except according to an expert who tells him that it is a blemish fit to slaughter upon it. And if there is no expert sage, it is permitted according to three members of the synagogue—that is, somewhat learned men who are not so expert. And nowadays when there are no experts, it is not slaughtered according to three members of the synagogue except for clear blemishes, such as that its eye was blinded or its hand cut off and the like. And crumpling of the ear is a clear blemish where it is evident that the fetus was damaged and visible to the eyes that it is more than a crack of the nail; and how is crumpling of the ear? When it was damaged with a deficiency from the cartilage and not the skin at the edge of the ear, whether it was damaged by human action or by heaven: {Rama: If the tail was cut above the joint it is a blemish (Piskei Maharai siman 246). And the author of the Tur enumerated further several blemishes upon which they slaughter in this time; and the rabbi who composed this book followed the words of the Rambam; and it appears to me that one who relies on the words of the Tur, which are built on the view of the Rosh, does not lose}""")

# ========== SIMAN 310 ==========
T(310, 1, """The law of one who slaughters a bechor not according to a sage. It contains 3 seifim:
One who slaughters the bechor not according to a sage—even if he showed it to a sage afterward and a blemish was found in it—it is forbidden; and the same applies in this time if he did not show it to three members of the synagogue:""")

T(310, 2, """One who slaughters the bechor not according to an expert and sold it and they ate it—he returns the money to them; if they did not eat it he buries it and returns the money to them:""")

T(310, 3, """One who is not an expert and saw the bechor and it was slaughtered at his word—he buries it and pays from his house. And how much does he pay? If it is in Eretz Yisrael he pays for a large animal half its value and for a small animal a quarter of its value; and outside Eretz Yisrael, whether small or large, half its value. And nowadays, since even in Eretz Yisrael most of the fields of Israel are not permitted to raise small livestock—even in Eretz Yisrael, even for a small animal he pays half the value:""")

# ========== SIMAN 313 ==========
T(313, 1, """Not to inflict a blemish on a bechor. It contains 7 seifim:
It is forbidden to inflict a blemish on a bechor, even to cause a blemish indirectly, such as to place a cake on its ear so that a dog will take it from there and cut off its ear with it, and the like; or that he tells a non-Jew to inflict a blemish upon it. And if he made a blemish with his hands or through his causation, they do not slaughter it through him until another blemish falls upon it by itself. And if it died, they do not penalize his son after him but slaughter it through him:""")

T(313, 2, """If a non-Jew or a minor inflicted a blemish by itself—if he did not intend to permit it, it is permitted, even if he asked why they do not slaughter it and they answered him innocently that it is forbidden to slaughter it until a blemish falls upon it; but if he intended to permit it, such as after he sees that they permitted through this he does so for others—it is forbidden: (if there is a doubt whether he intended to permit it or not, we follow the lenient view) (Hagahot Mordechai on Chullin). And if a non-Jew speaks innocently and says that the Israelite commanded him—it is forbidden (Terumat HaDeshen siman 169):""")

T(313, 3, """If they said to a non-Jewish maidservant serving in a Jewish house about the bechor that it is not eaten without a blemish and she went and cut its ear—it is considered intentional and they do not slaughter it through her, because this non-Jewish maidservant intended to permit it; and also those who told her that it is not eaten without a blemish intended that she inflict a blemish upon it: {Rama: It is permitted to give a bechor to a non-Jew in order to raise it; and if the guardian inflicted a blemish upon it, it is permitted, and we do not say that he intended to permit it, even though he knows it is permitted through its blemish and that it is a bechor (Piskei Maharai siman 168)}""")

T(313, 4, """If the bechor was pursuing him and he kicked it and through this made a blemish in it—it is permitted to slaughter it through this, even if he kicked it after he was saved from it:""")

T(313, 5, """By Torah law, a bechor upon which a blemish fell—it is permitted to inflict upon it a permanent blemish; but the Sages forbade it:""")

T(313, 6, """A bechor seized by blood—one may let blood from it provided he does not intend to make a blemish; and if through this letting a blemish was made, behold it is slaughtered through it:""")

T(313, 7, """It is permitted to inflict a blemish on a bechor in this time before it comes into the air of the world:""")

# ========== SIMAN 314 ==========
T(314, 1, """Who is believed regarding inflicting a blemish on a bechor. It contains 11 seifim:
Kohanim are suspected of inflicting a blemish on a bechor—even if he is a sage sitting in yeshiva; if he did something that appears deceitful, such as that he gave the bechor barley in a basket in a manner that when it comes to eat them it will damage its lip, or the like—they do not slaughter it for that blemish. (And therefore every blemish that is fit to come through human action—they do not slaughter it for that blemish until witnesses testify that it fell upon it by itself) (Tur):""")

T(314, 2, """For all blemishes that are fit to come through human action, the shepherd is believed to say they fell by themselves and were not made intentionally, and they slaughter for them. In what matter is this said? When the shepherd was an Israelite and the bechor is in the hand of the kohen; but if the shepherd was a kohen and the bechor is still in the hand of its Israelite owner—behold he is not believed and they suspect him that perhaps he inflicted it in order that he give it to him. (And some say a kohen shepherd is believed regarding an Israelite's bechor, and one may be lenient) (Tur in the name of the Rosh and Ramban):""")

T(314, 3, """A kohen who testified for another kohen that this blemish fell by itself is believed, and they are not concerned that perhaps they do favors for one another:""")

T(314, 4, """Even his sons and the members of his household testify for him about the bechor; but not his wife, because she is like his own body:""")

T(314, 5, """A witness who testified from the mouth of another witness that this blemish fell unintentionally is believed; even a woman is believed to say, "In my presence this blemish fell by itself," and they slaughter for it:""")

T(314, 6, """If they were not established that it is a bechor and the kohen said, "This is a bechor and this blemish fell upon it by itself"—he is believed:""")

T(314, 7, """A bechor that was in the hand of a kohen and a blemish befell it, and one witness testified about it that this blemish fell by itself, and we do not know whether for this blemish they slaughter the bechor—and the kohen in whose hand it is came and said, "I showed this blemish [to an expert] and they permitted slaughter"—behold he is believed and they are not concerned that perhaps he did not show it:""")

T(314, 8, """And likewise the kohen is believed to say about a bechor with a blemish, "This bechor Israel gave me in its blemished state," and they are not concerned that perhaps he inflicted it—for a matter that will become revealed people do not lie:""")

T(314, 9, """An Israelite is believed to say, "I gave this bechor to the kohen in its blemished state," even if it was a lamb and grew up, and we are not concerned that perhaps he does not recognize it:""")

T(314, 10, """Israelites are not suspected regarding bechorot, even their own; therefore an Israelite who has a doubt about a bechor that was eaten in its blemished state by the owners is believed to say that a blemish fell upon it by itself:""")

T(314, 11, """One does not show the bechor to an Israelite until a kohen is with him, lest the expert say to him "it is a blemish" and it is permitted to slaughter for it and he go and slaughter it for himself and not give it to the kohen—for although he is not suspected of eating kodashim outside, he is suspected of stealing the gifts of kehunah; therefore if he was a sage known to be scrupulous with himself, they show it to him (and likewise if) the blemish was evident to all, such as that its hand or foot was cut off—since he brought it to the expert sage, he is in the presumption of being scrupulous with himself; therefore they show it to him even though a kohen is not with him:""")

# ========== SIMAN 315 ==========
T(315, 1, """The law of a doubtful bechor, yotzei dofek, tumtum, and androgynous. It contains 7 seifim:
A doubtful bechor—the owners need not give it to the kohen; rather they keep it until a blemish falls upon it and they eat it; and it is forbidden in shearing and work. And if the kohen seized it they do not remove it from his hand: {Rama: And some say they remove it from the hand of the kohen (Tur in the name of the Rosh); and such is the halachah; and even if the Israelite gave it to him in error thinking he needed to give it to him and afterward it became known to him—the kohen must return it to him (Piskei Maharai siman 166)}""")

T(315, 2, """A yotzei dofek and one born after him through the womb—both are not bechorot; even if she bore a female first through the extraordinary birth and a male afterward through the womb, since another preceded. A bechor that is a tumtum—behold this is a doubtful bechor and he eats it in its blemished state by the owners; and this is specifically when it urinates in the place of females; but if it urinates in the place of males it is certainly a bechor and must be given to the kohen. (Tur in the name of the Rosh, and not like the Rambam):""")

T(315, 3, """An androgynous is a doubtful bechor and eats it in its blemished state by the owners:""")

T(315, 4, """An animal that had previously given birth that went out full and returned empty—the one following it is a bechor out of doubt lest she discharged something that does not release from bechorah:""")

T(315, 5, """A ewe that gave birth in the form of a goat, or a goat that gave birth in the form of a ewe—is exempt from bechorah, as it is said "only the firstborn ox"—until it itself is an ox and its firstborn is an ox. And if it had some of its mother's signs, behold it is a bechor and it has a permanent blemish, for you have no greater blemish than the change of its creation. (language of Rambam chapter 5 Laws of Bechoros paragraph 6):""")

T(315, 6, """A cow that gave birth in the form of a donkey—and it has some signs of a cow—behold it is a bechor for the kohen, since the species of donkey has the law of bechor; but if it gave birth in the form of a horse or camel, even though it has some signs of a cow, behold it is a doubtful bechor; therefore he eats it by the owners, and if the kohen seized it they do not remove it from his hand. And the same applies to a donkey that gave birth in the form of a horse and has some signs of a donkey—this is doubtful bechor. (And it was already explained that if the kohen seized it they remove it from his hand):""")

T(315, 7, """A small animal that miscarried a dissolution—that is, the fetus melted and the discharge emerged—is exempt from bechorah; and one must show it to a wise shepherd who will see whether it is fetal discharge and offspring. And a large animal that discharged a placenta is exempt from bechorah; and the placenta itself has no sanctity and it is permitted to feed it to dogs. A profuse discharge of blood is exempt from bechorah; and the clot is buried in order to publicize that it is exempt from bechorah:""")

# ========== SIMAN 316 ==========
T(316, 1, """The law of one who buys an animal from a non-Jew and does not know whether it had previously given birth. It contains 6 seifim:
One who buys an animal from a non-Jew and it is not known whether it had previously given birth and gave birth—this is a doubtful bechor and he eats it in its blemished state by the owners and it is not for the kohen, for the burden of proof rests on the one who extracts from his fellow—whether he bought it within its year or after its year; and even if the non-Jew speaks innocently that it had already given birth, he is not believed: (and signs in the cracks of its horns neither raise nor lower to rely upon them) (Hagahot Mordechai chapter HaIshah):""")

T(316, 2, """If he bought a nursing animal from a non-Jew he is not concerned that perhaps it is nursing the child of another; rather it remains in the presumption that it gave birth—even if what is nursing appears like another species, and even like a pig—it is exempt from bechorah:""")

T(316, 3, """And likewise an animal that is milking is exempt from bechorah, for most animals do not milk unless they have given birth: {Rama: And some say one does not rely on what it is milking (Tur in the name of Halakhot Gedolot and Hagahot Mordechai chapter HaIshah), and the later authorities ruled thus (Maharai in his rulings siman 166 and Terumat HaDeshen siman 471 and Mahariv siman 174), and such is practiced in all these lands. However, if there is another side of permission for this, or a non-Jew speaks innocently not to enhance his sale and says it gave birth—they rely to permit; and specifically with cows and in a place where it is not heard that they milk without offspring; but with goats, which are accustomed to milk without offspring, we do not rely on this—even in a place where there is a double doubt, such as that it gave birth to two and one can say each ate from one that is not a bechor—nevertheless it is forbidden (Piskei Maharai siman 130); and it appears to me that in a place where goats are not accustomed thus, or where cows are accustomed thus, one need not distinguish, and one should investigate this}""")

T(316, 4, """An animal that we saw milking and we know it had not given birth—if afterward we saw it nursing and we do not know whether it gave birth to this offspring or not—behold it is in the presumption that it gave birth to it:""")

T(316, 5, """One who has in his flock animals that had previously given birth and that had not, and they gave birth and no person was there, and he finds those that had previously given birth nursing females and those that had not nursing males—he is not concerned that perhaps the son of this one came to this one and of this one to that one; rather the matter remains in its presumption that each nurses its own child:""")

T(316, 6, """One who buys an animal from an Israelite—behold it is in the presumption that it had previously given birth until the seller informs him that it has not yet given birth: (and some say it is a doubtful bechor) (Tur in the name of the Rosh and R' Yonah):""")

# ========== SIMAN 319 ==========
T(319, 1, """The law of cutting limbs of the bechor and the remaining laws of bechor. It contains 4 seifim:
An animal that strains to give birth—one may cut it limb by limb and throw to dogs (and from the majority onward burial is required) (Beit Yosef in the name of Tosafot). And the one born after it is a bechor (and some say it is not a bechor) (Tur in the name of the Rosh). If the majority emerged—he buries it and she is released from bechorah; and if he cut a limb and left a limb and left it until the majority was completed—behold all the limbs require burial and she is released from bechorah once the majority emerged, whether whole or cut limb by limb [and behold it is before us] it became sanctified retroactively: (and some say it is not sanctified retroactively) (Tur):""")

T(319, 2, """If a third emerged and he sold it to a non-Jew and returned and another third emerged—it became sanctified retroactively (and some say it is not sanctified retroactively) (Tur):""")

T(319, 3, """If a third emerged through the extraordinary birth and two thirds through the womb—it is not holy (and some say it is holy) (likewise Tur):""")

T(319, 4, """If the majority of the fetus emerged through one minority of the limbs that complete the majority—it is considered birth even though most of the limbs are inside; and it is forbidden to sell it to a non-Jew and to throw it to dogs, and it releases what comes after it. And if half the fetus emerged through a majority of one of the limbs through which the emergence of half the fetus was completed—behold this is a doubt, and it is forbidden to sell it to a non-Jew and to throw it to dogs; and what comes after it is a doubtful bechor:""")

# ========== SIMAN 320 ==========
T(320, 1, """Who are obligated in bechor of a pure animal and the laws of partnership with a non-Jew. It contains 7 seifim:
Kohanim and Levites are obligated in bechor of a pure animal; and the kohen separates it and keeps it for himself:""")

T(320, 2, """Partners' animal is obligated in bechorah:""")

T(320, 3, """Partnership with a non-Jew releases—for if the non-Jew was a partner in the cow or in the fetus, even if he had one part in a thousand in the mother or in the offspring, behold it is exempt from bechorah; therefore one who receives an animal from a non-Jew to tend it and the offspring are between them, or a non-Jew who received from an Israelite thus—behold these are exempt from bechorah, as it is said "petter rechem among the children of Israel"—until everything is from Israel:""")

T(320, 4, """If he had in one of the two a single limb, such as a hand or foot—they see: whatever this one will cut will have a blemish—this one is exempt; and if it is possible that the non-Jew will cut a limb and it will not be disqualified, it is obligated in bechorah:""")

T(320, 5, """A flock that the king takes from it tithe—since the king's tithe is within it, the hand of a non-Jew is considered in the middle and it is exempt from bechorah: {Rama: And even if he can remove the non-Jew with money, the hand of a non-Jew is considered in the middle, since the main enslavement of the non-Jew is over the animals (Beit Yosef for Rif and Rosh and Piskei Mahariv siman 130); but if they stipulated from the outset that they will give him money for the offspring, it is obligated in bechorah (likewise there)}""")

T(320, 6, """In this time it is a mitzvah to partner with a non-Jew before it comes into the air of the world in order to release it from bechorah, even though this nullifies its sanctity—for nevertheless it is preferable so that one not come to a stumbling block of benefiting from it in shearing and work. And if he buys for the non-Jew a share in the fetus, the acquisition does not take effect, for it is something that has not yet come into the world; therefore he buys for him a share in the mother (or he buys the mother for him in order to acquire for him a share in the fetus). And the acquisition should be that he accepts a perutah from the non-Jew and acquires for him the place where the animal stands, and he acquires for him a share in the mother: (or that he accepts money from the non-Jew and pulls the animal to his domain or to an alley—for then pulling acquires for him together with the money) (Tur per the view of Rashi and Rabbeinu Tam):""")

T(320, 7, """One who receives sheep from a non-Jew [for a fixed sum] and agreed with him that the wages shall be between them, and if they diminish they diminish for the Israelite—even though they are in the domain of the Israelite and behold they are like his acquisition, since if the non-Jew does not find money with him to collect from him he collects from these animals and their offspring—it is as one who has liability upon them and upon their offspring, and behold the hand of the non-Jew is in the middle and they and their offspring are exempt from bechorah; but offspring of offspring are obligated, for behold they belong to Israel and the non-Jew has no authority over them. And if he placed the offspring under their mothers, offspring of offspring are exempt and offspring of offspring of offspring are obligated: {Rama: And a non-Jew creditor who received an animal from an Israelite to raise it and desired a share in the offspring, and the Israelite said he will give him money—and since his hand was strong over his debtor he trusted that against the non-Jew's will he will need to take money—nevertheless it is exempt from bechorah, since the non-Jew did not wish to tend it except for a share in the offspring (Piskei Maharai siman 130). A non-Jew who received an Israelite's animal to tend it and has no share in it, only accepted liability for it—it is obligated in bechorah (Mahariv siman 174)}""")


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
    simanim = [305, 306, 307, 309, 310, 313, 314, 315, 316, 319, 320]
    total = 0
    for s in simanim:
        p = ROOT / f"siman_{s:03d}" / "mechaber" / "part-001.txt"
        if not p.exists():
            print(f"MISSING {p}")
            continue
        n = apply_file(s, p)
        print(f"siman_{s:03d}: {n} blocks")
        total += n
    print(f"TOTAL: {total} blocks")


if __name__ == "__main__":
    main()
