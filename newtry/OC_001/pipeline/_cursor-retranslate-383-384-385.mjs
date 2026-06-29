#!/usr/bin/env node
/** Full R1-R10 retranslation — simanim 383, 384, 385 (110 blocks) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OC_ROOT = path.join(__dirname, "..");

const SIMAN_FIXES = {
  383: {
    "mechaber/part-001.txt": {
      "1:main":
        "When the gentile is not in the house he does not prevent [carrying]. And it contains one seif. A gentile who lives with two Jews — when the gentile is not in his home he does not prohibit [carrying], and they may make an eruv and be permitted. If the gentile comes on Shabbat he prohibits [carrying] and the eruv is nullified. However, they can rent from him on Shabbat, and afterwards one may nullify his domain to the other and the individual will be permitted. And all the more so if the gentile died on Shabbat — one may nullify [one domain] to the other and the individual will be permitted.",
    },
    "baer-heitev/part-001.txt": {
      "1:_":
        "Died. That is when they did not rent from him initially — they were only forbidden, and through the gentile's death permission was achieved by one nullifying his domain to the other. But if they rented from him before Shabbat and had an eruv, and only on Shabbat the gentile died — they are forbidden, as stated above in siman 382 seif 7 comment 6: they rent from the heir on that Shabbat and need no further nullification of domain — the original eruv suffices. And all the more so if the gentile died on a weekday — see Taz there. And see Magen Avraham who wrote that Tosafot daf 64a implies that even if the gentile was here from yesterday and they rented from him and he died on Shabbat, the eruv is nullified and they need to nullify — see siman 382 comment 6 as stated above.",
    },
    "beer-hagolah/part-001.txt": {
      "1:_":
        "From the incident of R' Chanina bar Yosef etc. in that inn — as Rashi explains there in our versions Eruvin 65 — and so RiF, Rosh, and Rambam chapter 2 of Laws of Eruvin.",
    },
    "beur-hagra/part-001.txt": {
      "1:א": "(א) seif 61 amud aleph.",
      "1:ב": "(ב) seif 65 amud bet, and see there Tosafot s.v. de'ata.",
      "1:ג": "(ג) there.",
      "1:ד": "(ד) seif 64 amud aleph.",
      "1:ה": "(ה) there.",
    },
    "biur-halacha/part-001.txt": {
      "1:_":
        "And all the more so if the gentile died on Shabbat — see in Mishna Berurah what we wrote, that it refers to when they made the eruv initially and the gentile was not here, etc.; so explained Eliyahu HaNavi, and see there that when the gentile was here and did not wish to rent initially until it grew dark and rented afterwards or died — clearly nullification is required. And he sides there that even per the Raavad who argues on the Rashba and holds the eruv returns and is renewed — that is specifically when the gentile was not in his house, that the eruv took effect until he came; not so here where it did not take effect at bein hashemashot at all. And see Beit Me'ir who also agrees in the essence of the law to his words.",
    },
    "eliyah-rabbah/part-001.txt": {
      "1:_":
        "[Levush] And not the one who nullifies, etc. Although nullification of one's house does not help for one against one — see siman 380 seif 4 — nevertheless there is a remedy that one nullifies his domain for half the day or a third until the other removes and brings in what he wishes, and afterwards this one returns and nullifies his domain to the second — so wrote Avodat HaKodesh there; and see end of siman 381. And in the derashot of Maharil he wrote that if one nullified to one and the other wished to nullify to him, he said: if so what was accomplished — then mine is his and his is mine and there are two domains as at the beginning. Until here — and one must say that when it was necessary he wished to nullify.",
    },
    "kaf-hachayyim/part-001.txt": {
      "1:_":
        "(א) [Seif 1] A gentile who lives with Israelites. In one courtyard — see Or Zarua, Eruvin chapter 2 end.",
    },
    "machatzit-hashekel/part-001.txt": {
      "1:א":
        "(א) And the eruv, etc. — one can derive from ships; I brought the sugya at length above in siman 362 in Magen Avraham comment 4. The main point needed here is what is taught on Shabbat daf 101 amud bet: ships tied to each other — they make eruv together and carry from one to the other; if severed — to prohibit; if reconnected, whether unintentionally, etc. — they return to their original permission, etc.",
      "1:ב":
        "(ב) And it is not applicable to say here, etc. — meaning in this answer it is also resolved why we do not say \"since it was permitted, it remains permitted.\" And from this Taz wrote comment 2 that if they made eruv and also rented from the gentile on erev Shabbat, and on Shabbat the gentile died — they need to rent from the heir as stated in siman 382 seif 7 — then they need not nullify one domain to the other, for in this case the eruv returned to permit, for he was not expected to die (unless he was moribund from erev Shabbat as above end of siman 371 in Magen Avraham). And in Chemed Moshe he wrote that in such a case they need not rent on that Shabbat from the heir, for in such a case one can say \"Shabbat — since it was permitted, it remains permitted.\"",
      "1:ג":
        "(ג) And even far — meaning it must deal with the gentile being a day's journey away, for otherwise per Rabbenu Yerucham who holds the primary view as the first opinion in siman 371 — if the gentile is within a day's journey, even if not here he prohibits — why does he write here that he does not prohibit? Rather it must be that he is far; nevertheless when he comes we say that initially the eruv was not fit to endure, for he is expected to come by traveling from his place on a weekday; all the while he did not come we are not concerned for this, as Magen Avraham wrote above siman 371 comment 2. And for this reason he does not prohibit when far within a day's journey; nevertheless when he comes afterwards the matter is revealed retroactively that it stood for this.",
      "1:ד":
        "(ד) For even if reconnected on Shabbat it is permitted. The wording is not precise — meaning the Rosh proved that the baraita about those ships must deal with when they were severed on a weekday; nevertheless when reconnected on Shabbat they return to their original permission. For if severed on Shabbat, why reconnect — even without reconnecting they would be permitted, for we say \"Shabbat — since it was permitted, it remains permitted\" — thus the Rosh holds regarding ships that even if severed on a weekday and reconnected on Shabbat (as the baraita there deals with reconnection on Shabbat, as it teaches \"whether unintentionally,\" etc., for any partition made on Shabbat, etc.) they return to their original permission. And why — they were not expected to be reconnected?",
      "1:ה":
        "(ה) And one can ask from what he says: and all the more so if the gentile died — the \"all the more so\" is that when alive he requires two things — rental and nullification; all the more so when dead one suffices — namely nullification alone, which we perform.",
      "1:ו":
        "(ו) It implies that even if the gentile was here, etc. — and I do not know the implication; perhaps because Rabbenu Yerucham is silent, and it also appears from Magen Avraham's citation that his version in Shulchan Aruch read \"met akum\" without the definite article, unlike our printed text \"ha'akum\" with the definite article, implying the known gentile referred to above; but if we read \"akum\" it implies any gentile and does not refer to the earlier one. And since Rabbenu Yerucham is silent, it implies even if he was here from yesterday.",
      "1:ז":
        "(ז) Even if opened on Shabbat — meaning in two courtyards between which was a window or opening, and they made eruv for a year, and the opening or window was sealed on a weekday and the eruv was nullified — when the window opened on Shabbat or the opening, the eruv returned to its place. And that Magen Avraham needed to precede that it implies from \"and all the more so if the gentile died,\" etc., that even if the gentile was here from yesterday, etc. — lest one distinguish only above in siman 374 where it was fit to open from erev Shabbat, not so here if the gentile was not here from yesterday and was not fit to rent from him; and as Magen Avraham wrote a similar idea in the next comment — therefore he preceded that here too it deals when the gentile was here from yesterday and was fit to rent from him, and even so the eruv did not return to its place.",
      "1:ח":
        "(ח) Therefore one can say in this law that he ruled above — meaning in siman 374 — that it appears to Magen Avraham primary as here.",
    },
    "magen-avraham/part-001.txt": {
      "1:א":
        "And the eruv is nullified. And when he again rents, the eruv did not return to its former state. And one can compare to ships that were severed and reconnected — they return to their original permitted state, for there the ships are not expected to be severed; not so here, for from the time the eruv was made its end cannot endure all Shabbat, since the gentile is expected to come, and it is not applicable to say here \"Shabbat — since it was permitted, it remains permitted\" and it will not be nullified when the gentile comes, for at bein hashemashot it stood for prohibition (Rosh and Mordechai, etc.). And even if he is far away, nevertheless he can go from his place on a weekday and come on Shabbat as stated — not like Pri Chadash. And if so, all the more so when the ships were not connected from yesterday, the eruv is nullified, for they are not expected to be connected (see siman 365 seif 7). And if so, there is a difficulty on what the Rosh wrote end of chapter 1 of Eruvin that even if they were connected on Shabbat it is permitted (see siman 355 seif 36). And one can ask from what he says: and all the more so if the gentile died, etc. — it implies that even if the gentile was here from yesterday and they made an eruv and he died on Shabbat or they rented from him, the eruv is nullified and they need to renounce, as Tosafot wrote daf 67a and daf 70b s.v. le'atuyei and s.v. vekatani — see there; if so, we learn that we do not say the eruv returns and is renewed; if so, there is a difficulty on what is written in siman 374 that he ruled it returns and is renewed even if opened on Shabbat — see there; therefore one must reconcile this law that he ruled above.",
      "1:ב":
        "If he died, etc. — one can derive for a Jew who died on Shabbat that his eruv is valid, as written siman 371 seif 4 — there if he wishes to make eruv from yesterday he can make eruv, which is not so here; see Rosh.",
    },
    "mishnah-berurah/part-001.txt": {
      "1:א": "(א) With two Jews — in one courtyard.",
      "1:ב":
        "(ב) And the gentile is not in his home — that he went before Shabbat, he and all his household, to another city.",
      "1:ג":
        "(ג) See above siman 371 — meaning that there it was explained per the first opinion that specifically when he went to a place farther than one day's journey that he cannot come on Shabbat; and per the second opinion even within a day's journey he does not prohibit.",
      "1:ד":
        "(ד) Prohibits — and we do not say that since the beginning of Shabbat was permitted it is permitted for all Shabbat; even if he went to a place farther than a day's journey, since he comes afterwards on Shabbat the matter is revealed retroactively that he left from there on a weekday, and at the entry of Shabbat he was within a day's journey and stood to come on Shabbat — therefore it is not applicable to say \"since the beginning of Shabbat was permitted it is permitted,\" for at bein hashemashot it stood to become forbidden afterwards.",
      "1:ה":
        "(ה) And the eruv is nullified — meaning as he wrote afterwards, that even if they rent from the gentile they cannot carry so long as they have not nullified one domain to the other, because the eruv was nullified immediately upon the gentile's coming to his house.",
      "1:ו":
        "(ו) They can rent from him — and this is not like buying and selling, for this is only a symbolic indication to permit carrying.",
      "1:ז":
        "(ז) And the individual will be permitted — meaning the man to whom they nullified the domain; not so the one who nullifies — he is certainly forbidden if the other did not return and nullify to the first, for then he is permitted as stated above at the end of siman 381.",
      "1:ח":
        "(ח) And all the more so if — meaning that they made eruv initially and the gentile was not here, and he came on Shabbat and died that day — certainly nullification alone helps, by a fortiori, for since even where rental and nullification are required it helps even on Shabbat, all the more so nullification alone. [And the same if they did not make eruv at all initially because of the gentile who prohibits them, and he died on Shabbat — one nullifies to the other and it is permitted.] And all this when they did not rent from the gentile; but if they rented from him initially and also made eruv, and the gentile died on Shabbat — even if he has heirs the eruv is not nullified even though they have not yet rented from the heir, for since the beginning of Shabbat was permitted it is permitted for all Shabbat.",
    },
    "netiv-chayim/part-001.txt": {
      "1:_":
        "(Magen Avraham comment 1) And if so there is a difficulty. I see the man but not the refutation — regarding a ship, even if severed on a weekday, and in a courtyard even if sealed on a weekday, although it is not expected to open or tie on that Shabbat — nevertheless at the beginning when they made eruv the ships were tied and are not expected to be severed on that Shabbat; and similarly in two courtyards when they made eruv the opening is not expected to be sealed on that Shabbat. And since from the beginning of acquisition of the eruv the eruv is complete for that Shabbat, even if severed and sealed afterwards on a weekday — if they reconnected or it reopened, even on Shabbat, they said they return to their original permission; even though when Shabbat entered it was not expected to be tied — nevertheless if tied again, even on Shabbat, the first eruv helps for the entire year, for at the beginning when he made eruv for the entire year he knows with certainty that he does not expect them to stand tied all year, but his intent was: whenever they sever they will be forbidden, and if tied again they return to their first permission — so they said. Not so here — at the beginning when the eruv was made its end cannot endure; and with this Magen Avraham's difficulty above in siman 382 comment 6 is resolved — see there.",
    },
    "peri-megadim/part-001.txt": {
      "1:_":
        "[They] can [rent] — Taz; and it is not like buying and selling but only a symbolic indication. Or Sameiach chapter 2 of Laws of Eruvin letter 13.",
    },
    "turei-zahav/part-001.txt": {
      "1:א":
        "(א) They can rent from him on Shabbat — for this is only a symbolic indication to permit carrying.",
      "1:ב":
        "(ב) One may nullify to the other — and we do not say here that the eruv they made initially returns to its former state, although regarding tied ships we say they return to their original permission, and similarly above siman 362 seif 3 — this case is different, for at the beginning when making the eruv its end cannot endure all Shabbat since the gentile is expected to come; but there the ship is not expected to be severed (Tosafot). And it appears to me that for this reason one can learn from what he wrote afterwards: and all the more so if the gentile died on Shabbat that one may nullify to the other, etc. — meaning when they did not rent from him initially but were only forbidden, and through the gentile's death permission is achieved by one nullifying to the other. But if they rented from him before Shabbat and had an eruv, and only on Shabbat the gentile died — they are forbidden, as stated siman 382 seif 7: they rent from the heir on that Shabbat and need no nullification of domain, for this is comparable to the ships we mentioned — for there too the gentile was not expected to die on Shabbat; and it is preferable to the ship case — perforce one can say here they return to their original permission and the eruv they made initially suffices. And all the more so if the gentile died on a weekday — so it appears to me.",
    },
  },
  384: {
    "mechaber/part-001.txt": {
      "1:main":
        "A gentile guest — whether he prevents [carrying]. And it contains 2 seifim. A gentile who enters as a guest — if he entered without permission he never prevents [carrying]. If he entered with permission — if he regularly comes he prevents [carrying] immediately; if he does not regularly come he does not prevent [carrying] until after thirty days.",
      "2:main":
        "The king's soldiers who entered Jewish homes, whether by force or willingly — if the homeowners have in those places where the gentiles entered utensils forbidden to move on Shabbat, [the gentiles] do not prevent [carrying] upon them.",
    },
    "baer-heitev/part-001.txt": {
      "1:_":
        "With permission. It appears to me that a gentile who has a debt on the house is called \"with permission\" — Magen Avraham; see there.",
      "2:_":
        "Whether by force. In any case they do not prohibit for less than thirty days if they do not regularly come; and if the Jew has permission to leave utensils in their room they do not prohibit — see siman 372 seif 11. Magen Avraham.",
    },
    "beer-hagolah/part-001.txt": {
      "1:_": "Yerushalmi — Tosafot wrote it; Rosh on the mishnah of courtyard residents, etc. seif 9.",
      "2:א": "(א) Responsum of the Rashba.",
      "2:ב": "(ב) Like R' Yehuda in mishnah chapter 5.",
    },
    "beur-hagra/part-001.txt": {
      "2:_":
        "Seif 2 — soldiers, etc. But in the responsum there he wrote that even if he has no hold at all he also does not prohibit if he entered without permission, as stated in Yerushalmi and in Shulchan Aruch seif 1; and see Beit Yosef who brought it. And further he wrote in the responsum there that in any case he does not prohibit, as Tosafot wrote regarding a teacher or scribe — that he did not lend them with intent that it be forbidden; and as stated siman 370 seif 63. And the same for a gentile, even with permission, as stated siman 382 seif 1; and as Maggid Mishneh wrote in his name; and Beit Yosef did not bring the beginning of the responsum, which is in the responsum to Ramban siman 200. However there is a difficulty from what is stated in Yerushalmi: what about renting domain from the innkeeper — meaning from the landlord? R' Chiya and R' Yonatan went up to Hamat. They said: we wait until the elders of the south come here. R' Apsa of the south came and they asked him, and he permitted them. R' Levi heard and said: and since the Jew comes and removes them, have we done nothing? — meaning the renter can remove renters from the inn. Shimon bar Rabbi and R' Yochanan said: and now our houses — meaning that Jews were coming into their houses by force and dwelling with them. R' Yostai bar R' Simon in the name of R' Beitus said: our houses are not for dwelling with us — to remove he cannot; but from the inn he removes us — meaning the gentile oppressors only forced them to dwell with them, but not to remove them. There in siman 218 it implies that if he can remove them he prohibits; therefore Shulchan Aruch omitted it — see there — from the guest law where it is not his place, although he entered without permission, nevertheless a Jew can enter by force. Nevertheless with permission it is difficult why Beit Yosef and Shulchan Aruch omitted it; and as stated above end of siman 382. And this too is not difficult, for there he can remove him at any time, as stated; and Magen Avraham siman 370 comment 8: and if place, etc.; and the same in the question, as stated in seif 2.",
    },
    "biur-halacha/part-001.txt": {
      "1:_":
        "He does not prohibit until after thirty — and like a Jewish guest above at the end of siman 370; and here too it deals as there, that he asked or rented the place from him to lodge — for if he stayed with him casually without asking or rental he certainly never prohibits, since he can remove him at any hour, as we wrote above end of siman 370 in Sha'ar HaTziyun. And the later authorities asked: behold above at the beginning of siman 382 it is explained in the Rama gloss that a Jew who rented or lent his house to a gentile does not prohibit him, for he did not lend to him with intent that it be forbidden — thus we are lenient regarding a gentile and say he did not lend to him, etc., even though it was by asking or full rental; all the more so here regarding casual lodging. And Ba'al Chemed Moshe answered that here it deals when the homeowner is not in his house, so it is not applicable to say he did not lend with intent that it be forbidden [and this answer is hidden in the responsum attributed to Rambam to Rashba siman 220 — see there at the beginning of the responsum]. And Gra explained that we are lenient regarding a gentile only when the asking or rental is for a long time, for it is unreasonable that his courtyard be forbidden a long time because of the gentile; not so here where he is only a guest for thirty days or a little more — in this we are not lenient at all regarding a gentile more than a Jewish guest. But Gra's view in siman 382 is that we are not lenient at all regarding a gentile more than a Jew; and that which we are lenient in siman 382 is not because he is a gentile renter — for even if he were a Jewish renter he would not prohibit, for there it deals when the landlord or lender had permission to remove him whenever he wishes; in such a manner even regarding a Jewish renter he cannot prohibit, as we wrote above that one who can remove him can never prohibit him, for he is like a casual guest for the hour, as several commentators wrote the reason regarding a teacher or scribe in siman 370 seif 63 that he does not prohibit him [and the two answers of Gra and the other are hinted by Eliyahu Rabbah — see there]. However Gra's words too are only to reconcile Shulchan Aruch's words so they do not contradict each other; but Rashba's words themselves are still not resolved thereby, for he gave another reason in Avodat HaKodesh — because it is an uncommon matter that a Jew rent or lend his house to a gentile and the Sages did not decree on this; and per this reason even without \"can remove\" it is permitted, and here he himself concluded for our matter to prohibition. One can still answer per what Eliyahu Rabbah wrote in his first answer — see there — that the law of siman 382 is specifically with the combination of the second reason mentioned in Avodat HaKodesh, as stated [and like what Beit Yosef wrote regarding a teacher or scribe — their leniency of \"he did not lend with intent that it be forbidden\" is with the combination of another reason]. And that we are not lenient in our matter regarding a gentile guest — because here the second reason is not so applicable, for it is certainly common that a gentile lodges in a Jew's house; and for the first reason alone — he did not lend with intent that it be forbidden — we are not lenient; and thereby Rashba's words on our matter are automatically resolved so they do not contradict his words in Avodat HaKodesh, as stated. And per this the law of siman 382 deals even without \"can remove.\" Nevertheless for practical law there is doubt whether to be lenient without \"can remove,\" since from Rambam's words it is proven he does not hold this law, as we brought in siman 382 seif 1 in Sha'ar HaTziyun in the name of Beit Me'ir.",
      "2:א":
        "(א) Utensils forbidden to move — the commentators asked from siman 382 seif 18 where it is explained that wherever he has permission to leave any utensil it suffices; and Eliyahu Rabbah wrote that there it is different, for through this it is like his renter and partner, not so here where he is the homeowner — and to equate the gentile as a guest we require specifically that there be utensils forbidden to move, as above siman 370 seif 2; and Chayei Adam agreed, and Gra also copied like Shulchan Aruch. However from Magen Avraham it appears he sides to be lenient in what he wrote: and if the Jew has permission, etc.; and Chayei Adam understood his words thus. However per this Magen Avraham should disagree with Shulchan Aruch and not write unconditionally; therefore it appears to us that Magen Avraham's words refer only to the above where he entered by force — he brought initially proof from Rashba that the king's soldiers are like other gentiles, called \"without permission,\" and on this he ruled that even if we are stringent in this, in any case where the Jew has permission to leave utensils in their room [even utensils permitted to move] we need not be more stringent than explained in siman 382 seif 18, that in any case it is not full permission; nevertheless even if Magen Avraham did not intend to be lenient in this, there is room for practical doubt since Mordechai wrote to be lenient, and in Peri Megadim it remains in doubt, and in Beit Me'ir he divides several distinctions — see there; and therefore one can be lenient in pressing circumstances.",
      "2:ב":
        "(ב) They do not prohibit them — but without physical hold he prohibits; and specifically without \"can remove\"; but with \"can remove\" in all manners he does not prohibit [from Gra's explanation].",
    },
    "eliyah-rabbah/part-001.txt": {
      "1:_":
        "[With] permission, etc. It appears to me that one who has a debt on the house is called permission (Magen Avraham). Jews who lodge restrict each other and need eruv and rental from Samaritans even if they are not there thirty days; and that a guest does not prohibit — this is when there is a permanent homeowner there, then they are nullified relative to him; but when they are all guests they prohibit (responsum of Rama siman 120) — and he expanded to prove there from the Gemara; and I found his proof for his law in Rabbeinu Nissim daf 70 — see there. And Rabbeinu Nissim concluded: therefore Jews coming to a fair such as Frankfurt who lodge in one courtyard in four or five houses, and the Samaritan owner of the courtyard likewise in a house or courtyard with them — need to rent, etc. And if there is a large house there and the Samaritan divided it with reed partitions and Israelites lodge there — for each group there is an opening to the courtyard, and there are also groups dwelling in other houses in the courtyard — if they bring the eruvin to one of those houses divided with reeds, one eruv suffices for the entire group in that divided house even if their partition reaches the ceiling; but if they placed their eruv in another house in the courtyard, each group needs its own eruv. And if they all exit through one opening to the courtyard, one eruv for all of them. Until here — and see siman 370 seif 3.",
      "2:_":
        "[Levush] Until thirty days, etc. The language of Tur and Shulchan Aruch — after thirty days; and so it implies at the end of siman 370.",
    },
    "kaf-hachayyim/part-001.txt": {
      "1:_":
        "(א) [Seif 1] A gentile who enters. To one of the houses of the courtyard — see Or Zarua, Eruvin chapter 2 end.",
      "2:_":
        "(ב) There. For lodging — meaning he did not enter to establish his residence there but temporarily to lodge there. Avodat HaKodesh, Eruvin chapter 2 end.",
    },
    "magen-avraham/part-001.txt": {
      "1:_":
        "Entered with permission. It appears to me that a gentile who has a debt on the house is called \"with permission\"; and see Choshen Mishpat siman 236, siman 382 comment 15, siman 370.",
      "2:_":
        "Whether by force. There is doubt, for in seif 1 he wrote that without permission he does not prohibit; and it is possible he holds that the king's soldiers are like with permission, for the law of the kingdom is law, as stated siman 404; but in Rashba it appears the king's soldiers are like other gentiles — see Beit Yosef; and there is doubt. In any case they do not prohibit for less than thirty days if they do not regularly come; and if the Jew has permission to leave utensils in their room they do not prohibit — siman 382 seif 18.",
    },
    "mishnah-berurah/part-001.txt": {
      "1:א":
        "(א) For lodging — meaning he did not enter to establish his residence there but temporarily to lodge there.",
      "1:ב": "(ב) Without permission — not precisely, but meaning he did not enter with permission.",
      "1:ג":
        "(ג) Entered with permission — meaning they lent or rented him a special room to lodge there. Magen Avraham wrote that a gentile who has a debt on the house and entered without permission for his debt is called \"with permission\" and prohibits; and there are those who are lenient in this.",
      "1:ד":
        "(ד) Regularly comes — meaning he regularly comes always to lodge there, and through this he is considered permanent and they must rent his domain from him.",
      "1:ה":
        "(ה) Until after thirty days — for until this time he is considered a guest and does not prohibit, as above end of siman 370; and see there what I wrote in Biur Halacha.",
      "2:א":
        "(ו) Whether by force — the commentators asked, for in seif 1 it is explained that without permission he never prohibits; and they answered that it deals when they lodge per the law of the kingdom, as is customary when soldiers come to a city — the officers assign places for the army in the city's houses; and in this even if the homeowner did not consent he prohibits, for the officer has permission for this from the king and it is like entering with permission [and if the officer changes from the statute the king gave and acts by force, behold he is like other gentiles and does not prohibit. In Mishkenot Yaakov siman 112 he completely disagrees with the Mechaber's ruling; his view is that regarding soldiers it is always with the owners' permission and oil is upon him — in all manners he does not prohibit].",
      "2:ב": "(ז) Utensils forbidden to move — see Biur Halacha.",
      "2:ג":
        "(ח) They do not prohibit, etc. — for this gentile is only like a guest for the hour, as above siman 370 seif 2.",
      "2:ד":
        "(ט) Upon them — but if he has no physical hold he prohibits if he stayed more than thirty days if he is not regular, as stated.",
    },
    "peri-megadim/part-001.txt": {
      "1:_":
        "Soldiers — Taz; Eliyah Rabbah 2 — soldiers are worse, for they do as they wish and the homeowner has no permission there — see there; and Magen Avraham 2; and Shaarei Teshuvah on this — that the king's soldiers do not depend on the homeowner's will; and that which Tosafot [say] a gentile guest prohibits — one can say it deals with a gentile guest in a gentile's courtyard where Jews live and rented domain from the gentile courtyard owner — a gentile guest prohibits; or a Jew who has a courtyard and rented to Jews and a gentile guest came and the homeowner does not live there — one can say in such a case we do not say \"his intent is not that they be forbidden\" — we say specifically; and there is doubt on this; and Shaarei Teshuvah there.",
    },
    "turei-zahav/part-001.txt": {
      "2:_":
        "Soldiers, etc. This is from the responsum of Rashba that Beit Yosef brought; and I wonder, for Rashba's words contradict each other — for Maggid Mishneh in chapter 2 of Laws of Eruvin in his name brought Beit Yosef and Rama siman 382 seif 1 that if he lent or rented his house to a gentile he does not prohibit, for he did not lend with intent that it be forbidden upon him — if so, why should the king's soldiers prohibit him when the homeowners have no utensils there? There is great doubt.",
    },
  },
  385: {
    "mechaber/part-001.txt": {
      "1:main":
        "The law of a Sadducee and an apostate in eruv. And it contains 4 seifim. A Sadducee — behold he is like a Jew and can nullify his domain; but an eruv is not effective since he does not acknowledge [the validity of] eruv.",
      "2:main":
        "A Samaritan — behold he is like other gentiles and has no remedy except through rental.",
      "3:main":
        "A Jew who apostatized to idol worship, or to desecrate Shabbat publicly — even if he violates only a d'rabbanan prohibition — behold he is like a gentile. But if he violates only in private, even a d'oraisa prohibition — behold he is like a Jew and can nullify his domain.",
      "4:main":
        "A Jew who converted and had houses in a Jewish neighborhood that made eruv for the entire year — if he has no other entrance at all he prohibits on every Shabbat that occurs after his conversion. But if he has another entrance to a gentile neighborhood — even a small opening that he was not initially accustomed to use — from the beginning we push him toward the entrance that opens to the gentile neighborhood.",
    },
    "baer-heitev/part-001.txt": {
      "1:_":
        "Sadducee. And even though he desecrates Shabbat in d'rabbanan matters — nevertheless they are compelled, for the custom of their fathers is in their hands.",
      "3:_":
        "Apostate. And if he desecrated Shabbat one time he is not called an apostate — see Yoreh De'ah siman 11.",
      "4:_":
        "Who converted. Ginnat Veradim general rule 3 siman 22 wrote that if they rented from the treasurer — even if after the eruv, Heaven forbid, one of the Jewish neighborhoods converted — the eruv made before the conversion helps, for since they rented from the treasurer, through this rental the individual Jewish houses also enter, that the individuals are subsidiary to the majority, and the rental of the majority is maintained in their hands — see there.",
    },
    "beer-hagolah/part-001.txt": {
      "1:_": "Mishnah Eruvin 61, and in the Gemara in explaining the mishnah, and like Rabban Shimon ben Gamliel — Rosh in the name of R' Meir, and Rambam end of chapter 3.",
      "2:_": "Explicit at the beginning of Chullin 4.",
      "3:א": "(א) Baraita Eruvin 89.",
      "3:ב": "(ב) Tosefta and Rosh and Mordechai there, and so is Rashi's view.",
      "4:_": "Rashba in a responsum.",
    },
    "beur-hagra/part-001.txt": {
      "1:א": "(א) seif 61 — Sadducee. Like Rabban Gamliel there in the mishnah; and even per R' Yehuda like the first anonymous opinion there seif 9 amud aleph.",
      "1:ב":
        "(ב) But. Letter 2 — since there is no [valid] eruv he is not an agent, as stated in chapter 2 of Gittin.",
      "3:א": "(א) seif 3 — even if not. There — who did not give, etc.; and like R' Yehuda.",
      "3:ב":
        "(ב) Even if he desecrates. There — that one went out, etc.; and see there Rashi s.v. bechumarta. And I say, etc.",
      "4:א": "(א) seif 4 — he prohibits. For he is an apostate to the entire Torah there.",
      "4:ב": "(ב) That occurs. Specifically.",
      "4:ג": "(ג) But if. There — what is the reason? One — seif 7 amud aleph; and this is what he wrote \"small opening.\"",
    },
    "biur-halacha/part-001.txt": {
      "3:א":
        "(א) Or to desecrate Shabbat — this is when he does this in casting off the yoke; but if he is mistaken in a matter he thought was permitted for him to do so, it is reasonable this is not included in apostasy [so it is proven from Tosafot daf 69 s.v. hotsi in R' Yehuda's words there; and even per Rashi it also appears he is permitted, for he says it is permitted — he is included as one who errs].",
      "3:ב":
        "(ב) Even, etc., only in a d'rabbanan prohibition — so it is proven per Rashi; and so is also the view of Tosafot and Rosh and Mordechai and Maggid Mishneh and Ritva and Or Zarua; and their main proof is from what is stated in the baraita regarding carrying from a courtyard to an alleyway, which is only a d'rabbanan prohibition. And I am in doubt whether the same applies to muktzeh prohibition, or since it is only ordinary carrying he does not become an apostate thereby. Afterwards I found in Tiferet Yisrael who was also stringent regarding muktzeh — and there is doubt.",
    },
    "eliyah-rabbah/part-001.txt": {
      "1:_":
        "[Who] does not acknowledge, etc. Rambam wrote thus — the general principle: anyone who does not acknowledge, etc.; and Maggid Mishneh wrote this is to exclude wicked people; and it is explained in chapter \"In every place one may make eruv\" 72; and it requires study, for on daf 31 he says: who does not acknowledge? A Samaritan; however in Rambam's explanation of the mishnah chapter HaDar I found: a rebellious Jew — when he does not desecrate Shabbat publicly and did not serve idol worship — nullifies his domain and does not make eruv. Until here — and it requires study.",
      "2:_":
        "[Levush] And the Karaites among us, etc. So wrote Beit Yosef; but Riaz in Shiltei HaGibborim chapter HaDar — if they transgress publicly in d'rabbanan matters, our law is like a Samaritan.",
      "3:_":
        "[In] private, etc. In the Gemara daf 69 it is explained that even if he does publicly before every person, only that he covers himself before the prince in private — we call him thus; so wrote Torat Chaim.",
      "4:_": "[Small] opening. Four by four (Rashba).",
    },
    "kaf-hachayyim/part-001.txt": {
      "1:_":
        "(א) [Seif 1] Sadducee. He is a Jew who turned to heresy and does not acknowledge the Oral Torah; and since he is a Jew he can nullify his domain without any rental. Rashi Eruvin 61 amud bet. And he is called Sadducee after Tzadok and Beitus who returned to heresy, as written in Yoreh De'ah siman 2 seif 9.",
      "2:_":
        "(ב) There. Sadducee — behold he is like a Jew, etc. — and the same for Karaites (Levush). And although in seif 3 he wrote that one who desecrates Shabbat publicly is an apostate even in d'rabbanan matters — nevertheless the Sadducees of today are not considered apostates although they transgress publicly in d'rabbanan matters, for their intentional act is like one compelled, for the practice of their fathers is in their hands, and he is like a child captured among gentiles (Beit Yosef). Taz comment 1. Magen Avraham comment 1. But in the responsum of Maharar Betzalel Ashkenazi and in responsa of Maharit it appears the opposite — that regarding these Sadducees all hold they are considered full gentiles — see there; and Shach and Peri Chadash in Yoreh De'ah siman 2 section 150 chapter HaDar agreed; and so in Halakhot Gedolot chapter HaDar in the name of Riaz — if he desecrates Shabbat in d'rabbanan matters publicly, behold he is like a gentile and is not fit to make eruv or nullify domain but must rent from him like a gentile — see there. And Eliyahu Rabbah brought it letter 2; and there is a practical difference regarding Karaites in our time who need to rent from them specifically like from a gentile. And see above siman 382 letter 80.",
      "3:_":
        "(ג) There. But an eruv is not effective, etc. — meaning even if he gave a share in the eruv it is not effective and he prohibits them until he nullifies his domain; and per what is written in the previous letter he must rent from him specifically and nullification of domain is not effective.",
      "4:_":
        "(ד) There. Since he does not acknowledge eruv — and per this it is not specifically a Sadducee, but the same for anyone who does not acknowledge the mitzvah of eruv — if he gives a share in the eruv it is not effective; and so concludes Sefer Gaon Yaakov.",
    },
    "machatzit-hashekel/part-001.txt": {
      "1:_":
        "(Comment 1) Sadducee, etc. — nevertheless they are compelled; and he is like a child captured among gentiles.",
      "2:_":
        "(Comment 2) Jew, etc. — one time he is not an apostate; and Shach in Yoreh De'ah siman 2 comment 16 — it appears he rules like those who say that on the first time he becomes an apostate; and it is possible regarding eruv we are lenient like those who say one time he is not an apostate.",
      "3:_":
        "(Comment 3) Opening, etc. — siman 383 — meaning if he returns the eruv to its place, for the eruv was nullified before he opened another entrance for himself; and if he converted on Shabbat on that Shabbat they are certainly permitted even if he has no other entrance, for \"Shabbat — since it was permitted, it remains permitted,\" for from erev Shabbat he was not expected to convert and the eruv was fit to endure. And see what Shach wrote Yoreh De'ah siman 1 comment 8 — if he converted, what he slaughtered that day before he converted is valid, for now it deteriorated.",
    },
    "magen-avraham/part-001.txt": {
      "1:_":
        "Sadducee. And even though he desecrates Shabbat in d'rabbanan matters — nevertheless they are compelled, for the custom of their fathers is in their hands.",
      "3:_":
        "Jew apostate. And if he desecrated Shabbat one time he is not called an apostate (Maggid Mishneh chapter 2 and Tosafot); see Yoreh De'ah siman 11.",
      "4:_": "Another entrance. And if he opened another entrance for himself when he converted — siman 383.",
    },
    "mishnah-berurah/part-001.txt": {
      "1:א":
        "(א) Sadducee — named after Tzadok and Beitus; they incline to heresy and do not believe in the Oral Torah; nevertheless for this matter he is like a Jew — nullification of domain helps, and even though he certainly desecrates Shabbat publicly at least in d'rabbanan prohibition; and it is stated in seif 2 that even in this he is like a gentile. A Sadducee is different, for he is presumed thus from his ancestors' days and the custom of his fathers is in his hand — so Beit Yosef; and the view of several decisors is that even a Sadducee when he desecrates Shabbat publicly his law is like a gentile; and in all this there is a practical difference regarding Karaites in our time who certainly desecrate Shabbat publicly at least in d'rabbanan matters — they cannot nullify domain until they rent from them.",
      "1:ב":
        "(ב) Is not effective, etc. — meaning even if he gave a share in the eruv it is not effective and he prohibits them until he nullifies his domain to them; and not specifically the Sadducee sect and the like who do not acknowledge the Oral Torah — the same if he only does not acknowledge the mitzvah of eruv — he cannot give a share in the eruv.",
      "3:א": "(ג) Apostatized to idol worship — even in private.",
      "3:ב":
        "(ד) Or to desecrate Shabbat publicly — for this sin is as severe as serving gentile gods — through this he becomes an apostate to the entire Torah; and specifically if he is regular in this sin; but if he desecrated Shabbat one time publicly he is not called an apostate; and some say even one time he is called an apostate. And \"publicly\" is when he desecrated before ten from Israel, or he knew it would become known among them. And know that all this is when he transgresses for appetite; but to provoke — even in other transgressions and even not publicly — his law is like a gentile.",
      "3:ג":
        "(ה) Behold he is like a gentile — meaning for this matter that nullification of domain no longer helps but specifically rental. And for other matters there are later authorities who hold he is not considered an apostate through desecrating Shabbat in d'rabbanan prohibition — see Yoreh De'ah siman 2 in Pischei Teshuvah and Beit Me'ir in this siman and Sefer Gaon Yaakov in the sugya.",
      "3:ד":
        "(ו) Only in private — and if he is ashamed to do this before an important person, even though he does this before several people — this too is considered private.",
      "4:א":
        "(ז) That made eruv for the entire year — meaning and we do not say that since it was permitted for some Shabbatot that occurred before he converted it is permitted for the entire year, for each Shabbat is a matter unto itself; and since he converted his share in the eruv was nullified and he prohibits them for subsequent Shabbatot until they rent from him.",
      "4:ב":
        "(ח) On every Shabbat that occurs — and if he converted on the day of Shabbat itself they are permitted on that Shabbat, for since part of Shabbat was permitted it is permitted for the entire Shabbat.",
      "4:ג":
        "(ט) But if he has, etc. — and if initially he did not have one and they opened for him after he converted — see above siman 383.",
      "4:ד":
        "(י) Small opening — in any case we require that it be four tefachim by four tefachim, for less than this is not considered an opening, as above siman 372.",
      "4:ה":
        "(יא) We push him, etc. — for we compel him with the measure of Sodom so he not prohibit them, as below siman 386 end of seif 9 regarding a Jew; and also since certainly once he became estranged and is regular with gentiles he prefers that opening more.",
    },
    "peri-megadim/part-001.txt": {
      "1:_":
        "Sadducee — Taz; and so Magen Avraham in the name of Beit Yosef. And an apostate in private who does not acknowledge eruv — there is doubt whether he can make eruv; and Eliyah Rabbah letter 1 in the name of R' Meir, explanation of the mishnah; and nevertheless see there. See Yoreh De'ah siman 2 — apostate to gentile gods or to provoke in other transgressions is an apostate — so Shaarei Teshuvah here.",
    },
    "rabbi-akiva-eiger/part-001.txt": {
      "1:_":
        "Seif 3 — Jew apostate. In Chiddushei Rabbi Akiva Eiger. Chapter 8 amud bet — in Tosafot s.v. lemeimra he wrote that nevertheless to be stringent his law is like a Jew, for an individual in the place of an apostate prohibits — for even though he sinned he is a Jew. And through this nullification helps, since the prohibition is only from the force that we judge him like a Jew.",
    },
    "turei-zahav/part-001.txt": {
      "1:_":
        "Sadducee, etc. In seif 2 he wrote that one who desecrates Shabbat publicly is an apostate even in d'rabbanan matters; nevertheless the Sadducees of today are not considered apostates although they transgress publicly in d'rabbanan matters, for their intentional act is like one compelled, for the practice of their fathers is in their hands, and he is like a child captured among gentiles (Beit Yosef).",
    },
  },
};

function applySiman(siman, fixes) {
  const base = path.join(OC_ROOT, "output", `siman_${siman}`);
  let total = 0;
  for (const [rel, blockFixes] of Object.entries(fixes)) {
    const fp = path.join(base, rel);
    const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
    const out = blocks
      .map((b) => {
        const key = `${b.seif}:${b.marker || "_"}`;
        if (blockFixes[key]) return { ...b, en: blockFixes[key] };
        return b;
      })
      .map(serializeBlock)
      .join("\n\n");
    fs.writeFileSync(fp, out.endsWith("\n") ? out : out + "\n", "utf8");
    total += Object.keys(blockFixes).length;
  }
  return total;
}

let grand = 0;
for (const [siman, fixes] of Object.entries(SIMAN_FIXES)) {
  const n = applySiman(Number(siman), fixes);
  console.log(`siman_${siman}: ${n} blocks written`);
  grand += n;
}
console.log(`TOTAL: ${grand} blocks`);

const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const log = path.join(OC_ROOT, "progress.log");
for (const siman of [383, 384, 385]) {
  fs.appendFileSync(log, `${ts} cursor-agent siman_${siman} retranslation COMPLETE\n`, "utf8");
}
fs.appendFileSync(log, `${ts} cursor-agent simanim 383-385 110 blocks DONE\n`, "utf8");
