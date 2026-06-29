import { readFileSync, writeFileSync } from 'fs';

function fixLines(file, fixes) {
  let t = readFileSync(file, 'utf8');
  const lines = t.split('\n');
  let count = 0;
  const result = lines.map(line => {
    for (const [start, replacement] of fixes) {
      if (line.startsWith(start)) { count++; return replacement; }
    }
    return line;
  });
  writeFileSync(file, result.join('\n'), 'utf8');
  console.log(`Fixed ${count}:`, file.split('/').slice(-3).join('/'));
}

const base = 'C:/Users/binya/Documents/Shulchan aruch/newtry/YD_001/output';

// ── siman_163 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_163/beur-hagra/part-001.txt`, [
  [
    'As a lesson from his hands. The Bible and the Bible',
    'As the measure of his money. Rambam; and in R.Y. (Rivash) there is a dispute, and he wrote that the main view is that of those who disagree; and he wrote that so too wrote Rosh.',
  ],
  [
    'As an old man. A.D., as usual:',
    'As the price, etc. Not exactly, as stated in seif 1.',
  ],
  [
    "If you're wrong with him. G-d is there and on:",
    'If he repays, etc. Gemara there; and see the Hagahah.',
  ],
  [
    "And if he's gone. They are only allowed because of the burden. The Bible:",
    'And if he transgressed, etc. As stated there, they are permitted only due to the evasion. Rosh.',
  ],
  [
    'Oh, yes. Dea Avii from Yuki to the waitress of the High Court and said, "This is where you are."',
    'And some say, etc. For Abbaye establishes the mishnah in such a case, and they say there folio 61b: "until now," etc.',
  ],
]);

// ── siman_165 / turei-zahav ─────────────────────────────────────────────────
fixLines(`${base}/siman_165/turei-zahav/part-001.txt`, [
  [
    '"The Lord is the Lord." In the column he concluded and the judgment if subjects and give them a quaint through the borrower, but he is the judgment through negotiation and consists of two things if they add or suffocate on the weight, i.e., that the need is added or enlarged, and the other that has been made a change to the subject of fruit or other things that are not changed for him until he is achieved:',
    'And likewise the lender, etc. The Tur concludes: and likewise is the law if they deal in commerce, etc. — meaning not specifically by way of loan but likewise by way of commerce. And he includes in this two matters: the one, if they added or diminished in weight, i.e., the denomination was added or reduced; and the second, that a change was made in the matter of mixing with copper. In all cases, if no change was made regarding fruits or other things given for it, he deducts only up to its fifth.',
  ],
  [
    'He has all the additions. And it is not my son-in-law until the sages of Dachron, who carries the whole example of this, that I will be familiar with fruit and MK C. R.C. if you come to the disabled, the whole thing is:',
    'He deducts the entire addition. And it does not suffice to deduct only up to the fifth, for since he is obligated to deduct, he deducts all of it. Analogy for this is in "the seller of fruits" and in CM siman 229: if he comes to deduct, he deducts all of it.',
  ],
]);

// ── siman_168 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_168/baer-heitev/part-001.txt`, [
  [
    'him. The columnist said to him, "If I say to you, and the taste of his mission is given to the worker of the stars, and it is like to say to him that I am a goddessman, that he will give you a great deal of starwork, and that even the word must be processed by stars, nothing that the bridegroom gives to the worker of the stars."',
    'him. Tur wrote: and all the more if he said "I will raise it for you." The reason is that he gives interest to the non-Jew through his agency, and it is analogous to saying to his fellow "I will lend you on condition that you give the interest to the non-Jew" — which is obviously forbidden; and even if the lender owes the non-Jew nothing at all, since he gives the interest to the non-Jew on account of the loan at the lender\'s direction, it is fixed ribbit.',
  ],
  [
    "Without. For the sake of the Lord's mercy, Hashem's mercy was the responsibility of His people. Name in column:",
    'Without. For at the time he gave the money to his fellow, the responsibility for the money was upon him — it is entirely as if he lent him his money. There in Tur.',
  ],
  [
    'The first. He wrote the book, and even if someone who received the stars from Israel Hashem and gave it to Israel, Hashem would be in my place to receive a foundation and a rabbi from Israel, and the first Israel was allowed and wrote the column and not even the successor of the first star worker, Peter, and he was committed to the other and permitted:',
    'The first. Taz wrote: and even if, after the non-Jew received from the first Jew and gave to the second, he said to the first Jew "be in my place to receive my principal and interest from the second Jew" — and the first Jew did so — it is permitted. And Tur wrote: and even if the non-Jew did not explicitly release the first, for by default he released him and the second became obligated to him, and it is permitted.',
  ],
  [
    'Put down. According to Dr. D.C., the Bible said to me that the debt is the responsibility of the Levites until it is said and fired and dismissed from the U.S., but the t-shirt is still there, then the first time the IDF and the resignation of the Lord can be the firstborn, and the servant will not return',
    'Put down. Siftei Kohen wrote that one must also say "and you are released," for otherwise we rule in CM siman 120 that even if he said "throw me my debt" it remains the borrower\'s responsibility until he says "and you are released." And unlike Bach. But Taz distinguishes: if the first is still standing there, he must say "and you are released," for otherwise the first may change his mind and take them back; but if he departed and withdrew, then even without the non-Jew saying "and you are released" it is permitted.',
  ],
  [
    'allowed. And the Bible has received a great deal of this, and it is written that when the first of Israel is removed from the work of the stars, and it is taken from the Bible that the first one is given to the first, but in the Bible, it is written:',
    'allowed. Bach contested the Rabbi here and wrote that it is permitted only when the first Jew withdrew from the non-Jew and the second took him — then there is a permit even if he gives the interest to the first. But in such a case as Rama wrote, it is a complete prohibition. And Siftei Kohen agreed with him; and Taz also wrote that this Hagahah is not the halachah.',
  ],
  [
    'Demention. "And not only is it not forbidden when Hashem\'s mission is not as great as the work of the stars for the sake of its own. "Third:',
    'Appearance. And even so it is forbidden only when he lent through the agency of the first Jew; but otherwise it does not appear as ribbit, for the non-Jew borrowed from the outset for his own sake. Siftei Kohen.',
  ],
  [
    'Believe it. And it is permissible for him to take a foundation and rabbinically from Israel, and he has no knowledge of the word, and he has now known that the ISA was of Israel, saying that it is not that it is in heaven and eats a ban and the standards that is preparing for a Star worker and works to buy in attraction and everything that is now given to Israel for the working of stars. column. But if the word of it is known, it must be felt that the educated man of the Star worker is not prohibited. "Third:',
    'Believe it. And it is permitted for him to take principal and interest from the Jew, since the lender did not know at first; and even though it is now known to him that the collateral belonged to the Jew, we say by default he did not abandon a permitted path and eat forbidden matter, and he transferred the collateral to the non-Jew, and the non-Jew acquired it by pulling, and everything he now gives Israel is given on account of the non-Jew. Tur. But if the lender knows of this, he should be concerned lest he did not transfer the collateral to the non-Jew — therefore it is forbidden. Siftei Kohen.',
  ],
  [
    'to take. Who knows that the Maclin is allowed. "Third:',
    'to take. However, according to those who are lenient cited above, it is permitted. Siftei Kohen.',
  ],
  [
    'Received. This book is simple if it is already necessary for a horn and rabbinical star worker, Israel can receive it and take from Israel as well as the rabbinical one that Israel would owe to the Star of the Fund, but the rabbi still does not apply at the time that the purchase works stars to another Israel and should be known if he had bought an absolute sale to Israel that he had not even taken from a star worker, but that he had given him as a trust',
    'Received. Taz wrote: This is simple — if the non-Jew already owes principal and interest, the Jew can take it upon himself and take from that Jew both principal and interest; but the interest does not apply at the time the non-Jew transfers to another Jew, and one should know that if he bought it in an absolute sale to the Jew he would not even have taken from a non-Jew, but rather he gave it to him as a trust.',
  ],
  [
    'Because of the great material, it must be prohibited (in which the Torah has written to Israel in complete nests, and the PLO does not contain any suchial prohibition that Israel cannot claim to the first that the worker has given the stars in their laws, and not in our account, and that the Star worker cannot return from the first and foremost of Israel):',
    'Therefore it must be prohibited (and in Nekudot HaKesef he wrote that the non-Jew transferred to the Jew in a full acquisition, and even so there is no ribbit prohibition here, for it discusses where the second Jew cannot sue the first in their laws and not in our laws, and moreover the non-Jew cannot return to the first Jew — examine this carefully).',
  ],
  [
    'allowed. Even the knowledge of the word Hashem of Israel is the Daa Hakanho for the work of stars and the purchase of attraction. "Third:',
    'allowed. Even if the lender knows it belongs to Israel, for he transferred it to the non-Jew and the non-Jew acquired it by pulling. Siftei Kohen.',
  ],
  [
    'Prepared. It is written in the words of the Ramban, which is not the responsibility of the messenger, such as that it was announced that the work of the Flemish stars was either removed from him or that they were left with the star worker, and that the messenger was fired at him, and that he was not allowed by his faith, and if he did not swear that he had not given the stars that work more and had not been sent to me',
    'Collateral. Beit Yosef wrote: it appears from Ran\'s words that even without collateral it is likewise permitted when the lender\'s responsibility is not on the agent — such as when it was announced that such-and-such non-Jew is the one who borrowed from him, or when he presented him to the non-Jew and the agent was thereby released. And likewise if he says to him "how much you take from the non-Jew give me" it is permitted. And if he does not believe him, the agent swears he did not give the non-Jew more and is exempt.',
  ],
  [
    'And in the light of the stars, Hashem\'s wrath is made, and Hashem\'s promise is to be brought to him, and even if He is commanded by His words, and he is given to Hashem\'s glory, and he is not allowed to be rejected by Hashem\'s mercy. column:',
    'But if he said to him "as long as my money is in the non-Jew\'s hand you give me a dinar per month" — it is forbidden. And the reason the lender is permitted to take interest from the Jew\'s hand even though there is no agency for a non-Jew is that he became the lender\'s agent to bring his money to the non-Jew and bring him his collateral; and even if the agent redeemed it with his own money and gave the lender principal and interest — it is permitted, for the Torah only forbade interest coming directly from the borrower to the lender, and this one is not the borrower but merely an agent. Tur.',
  ],
  [
    'Your mother. Even a oath does not need. "Third:',
    'He believes you. Even an oath is not needed. Siftei Kohen.',
  ],
  [
    'known. That is to say, if he is clearly aware that the truth of the Lord of the High Court of Justice is not in the hands of the Lord, who says that I do not believe in any person only according to the words of the Levites of the USSR, he is not allowed to take the rabbinate as he knows that he is of Israel. "Third:',
    'known. That is to say, if the lender knows clearly that the truth is that the court cannot compel him, and he says "I do not believe any person except the borrower\'s own words" — nevertheless it is forbidden for him to take interest, since he knows it belongs to the Jew. Siftei Kohen.',
  ],
  [
    'And the cities. To accompany the name of a star worker and I say he is yes he is a barbarian:',
    'And the one who deceives. To borrow in the name of a non-Jew and says it is his — he is indeed wicked.',
  ],
  [
    'The interview. And the "unless" is known if it has been accompanied by a star worker and if it is not known, but the lender claims that he knows that he has accompanied them to a Barbie Star worker who is a prosecutor who receives a hiatus and column week. "Third:',
    'The collateral. And likewise "unless" — it is known if he accompanied a non-Jew; and if it is not known but the lender claims with certainty that he knows he accompanied them to a non-Jew who is a litigant who receives the collateral and keeps it for a week — he swears a heses oath and is exempt. Siftei Kohen.',
  ],
  [
    'disturbed. And if he suspects that he is more than a star worker, he will be permitted as a man who will not be satisfied. The Bible and the Bible:',
    'disturbed. And if he suspects he received more from the non-Jew, he places him under a ban since he does not make a definite claim against him. So wrote Beit Yosef and Bach.',
  ],
  [
    'The rest. And the High Court wrote Dehhar, he is a star worker, who knows that the borrower is for the audience and his promise of the audience if there is no one to pay:',
    'permission. And Taz wrote that the permit is because the non-Jew who lends knows the borrowing is for the community, and his guarantee is on the community if there is no one to pay.',
  ],
  [
    'The rabbi. P. He is the rabbi that the rioters are exalted to the others. TJ:',
    'interest. Meaning that same interest that those who pay earn — it falls upon the others to complete it. Taz.',
  ],
  [
    'Recognized. In this book, Dewey writes that Israel is permitted to make a gift of a Star worker in Israel more than he is aligned with him and the Temple will not be more than what the Starworker gives him, saying to him, "This is what he has given to him, and that he will not be able to do with him, and that he will not give him any evidence of the Lord."',
    'seller. Levush wrote on this ground that since it is like a sale it appears to me that it is permitted for a Jew to pledge a non-Jew\'s collateral with another Jew for more than is pledged with him; and the interest shall be no more than what the non-Jew gives him — we say he sold the entire collateral to the second one, and what he lent him additionally he lent him free without interest.',
  ],
  [
    'In the words of the dress, he wrote that he was simply permitted and the custom was:',
    'And Taz strongly contested this and brought proof from the Talmud that it is contrary to Levush. His conclusion: it appears to be fixed ribbit extractable by judges, one should not honor a rabbi over his colleague; let this permit be suppressed and not done among Jews. (And Nekudot HaKesef agreed with Levush and wrote it is plainly permitted and such is the custom — see there.)',
  ],
  [
    'Returning. And if the first word for the Lord is not true, but he is mine, and the other will be brought back to me, and he will never return to him. A column from the Rashi answer and the Bible wrote, "I have not told you that the Starworker should swear the above."',
    'Returning. And if afterward the first says it is not true but it is mine and return it to me for free — the second swears as his first words and will never return the collateral to him. Tur from Rosh\'s responsum. And Beit Yosef wrote: specifically here where he contradicts him saying "I did not say to you it belongs to the non-Jew" — the second must swear, unlike above seif 13.',
  ],
  [
    'Credit. He has a Starworker and "If he has any other charge. "Third:',
    'Credit debt. Meaning a promissory note he has from a non-Jew; and likewise if the non-Jew owes him orally or in any other obligation. Siftei Kohen.',
  ],
  [
    'From Israel. "And the Lord of Israel, for the sake of the Lord, shall not be taken away from the hand that the Israelites have given to him, and he shall not be given to him, but he shall not be given to him. "Third:',
    'From Israel. Unlike above seif 6, where if a Jew redeems it is forbidden — for there, from the moment the Jew gives him collateral and borrows on it, it appears he is borrowing for the Jew\'s need; or there since he pledged it against his will, certainly he did not transfer it to him. But here one can say he transferred it to him. Siftei Kohen.',
  ],
  [
    'Eye. "Third:',
    'Appearance. Siftei Kohen.',
  ],
  [
    'The eye. And it seems that even in the control, it is not because of the appearance of an eye that is not the responsibility of a column and that the Bible does not seem so from the rest of a row, and that I will not end his opinion by the Almighty, and if it is known to many, it is permissible for the Lord to even inform the borrower and the demons that they are a Starworker. B. Know the mountain:',
    'Appearance. And it seems that even in a deposit it is forbidden because of appearance — though there is no responsibility. Tur. And Bach wrote that it does not appear so from the other poskim, etc., and I cannot fathom the end of his reasoning — end quote Siftei Kohen. And if it is publicly known, meaning his occupation is this, it is permitted; otherwise even if he informs the borrower and witnesses that they belong to a non-Jew — it is forbidden. Beit Yosef in the name of Ran.',
  ],
  [
    'working stars. In such a way that it is not prohibited by the way above or by the rest of the rest, it is faithful in it without a oath by Dalai Shyyahu, etc. and certainly by the rest did everything that could have done. "Third:',
    'non-Jew. In a way that is not prohibited according to the above method or the other methods, he is trusted without an oath because "he does not abandon a permitted path," etc.; and certainly by default he did everything he could to act permissibly. Siftei Kohen.',
  ],
  [
    'allowed. The Bible wrote in a matter that the Starworker trusts the Mishkan alone that he is good or says to a Star worker I am not enslaving you at all, but to be your responsibility for the interviewer alone, Hashem is not better than if he has given us a gift to our contention with a star worker',
    'allowed. Siftei Kohen wrote: a case where the non-Jew relies on the collateral alone — that it is good; or he says to the non-Jew "I am not obligating myself to you at all, only be responsible through the collateral alone." This is not better than if he gave collateral to pledge with a non-Jew at interest.',
  ],
  [
    'Sorting. On the foundation and in the response of the PA, it means that it is done to hang its hands in the pile of stars in order to hang them to Israel in any matter that is forbidden and to see the Bible:',
    'Collateral. On the principal and interest. And from Rashba\'s responsum it implies that where it was done with intent to place one\'s money in the non-Jew\'s hand as a stratagem in order to lend them to Jews — it is forbidden in any case. See Beit Yosef.',
  ],
  [
    'Responsibility. P. For if the plagues are lost, it is to Israel, but it is not my duty to be held as a guardian even when Hashem is not made of them, and we will not be given to them as such from now on the name of S. donations and when they are responsible for Israel. The Bible:',
    'Responsibility. Meaning: if the money is lost, he pays Israel; but it does not suffice that he accept responsibility as a guardian, even as a borrower, since he was not made a borrower on them — so wrote Beit Yosef in the name of Sefer HaTerumah; and when they are on Israel\'s responsibility it is fixed ribbit. Rivash.',
  ],
  [
    'forbidden. Here too, the IDF is responsible for the way that if the debt is lost, it will be breached and if there is no responsibility, but in the way of the guardians, it is permitted and written in the Lord\'s words to Israel in the blessed manner, and if the debt will be lost, but if they are not harmed, if they are not permitted to Israel',
    'forbidden. Here too, the responsibility must be in the manner mentioned — that if the debt is lost he pays; but if there is no responsibility except as a guardian, it is permitted. And Beit Yosef wrote that if he said to the non-Jew "lend money to so-and-so Jew at interest, and if you find no assets to collect from him I will pay you" — it is permitted as the law of a guarantor. And if he said "lend them to the Jew at interest, and if the debts are lost let them be on you; but if harm occurs to them while still in my possession before I lend them to the Jew, they are on me" — it is permitted, for he is not called a borrower on them, only a guardian — end quote. However, all this is forbidden because of appearance. Siftei Kohen.',
  ],
  [
    'Eye. "Third:',
    'Appearance. Siftei Kohen.',
  ],
  [
    'Responsibility. In the Bible, if I say all the time that the worker does not work the stars for the Foundation, I give you a rabbi, he will not be held liable for the Dachron that any time he does not give the Star of the Fund must be the rabbinical rash is also the responsibility of the Foundation on him and the C.C. What makes it difficult for the G-d from here:',
    'Responsibility. Beit Yosef clarifies: likewise if he says "as long as the non-Jew does not pay principal I will pay you interest" — he must not accept this responsibility, for since as long as the non-Jew does not pay principal this one is obligated to pay interest, it follows that responsibility for the principal is also upon him. And see below siman 170 what Taz challenged from there to here.',
  ],
  [
    'to the messenger. "And the Lord of Israel, who is Hashem\'s people, is Hashem\'s promise to Israel, and so on, Hashem\'s people are blessed with Hashem\'s promise of Hashem\'s righteousness, and they are not Hashem\'s chosen people',
    'to the agent. And it is not comparable to above seif 1, for there the Jew initially borrowed for his own needs and then lent to the second Jew; and further, here the non-Jew relies on the collateral alone, and unlike the Hagahah of Derishah — end quote Siftei Kohen.',
  ],
  [
    'will lose. According to S.C., there are differences in the Qur\'an, and that belong to this section:',
    'will lose. See above s.k. 34, the distinctions in law written there that are relevant to this seif too.',
  ],
  [
    'Nathan. That is to say that the loan of the message that the petitioner must be given to Hashem\'s people, and that the people of Israel should not be taken from him, such as that the worker of the Torah gives him permission to receive the responsibility of the Mishkan, but that Israel should not be spared from the work of the stars, and to bring him back to the work of the stars',
    'Gave. That is to say, specifically when the lender gave the money to the agent to lend to the non-Jew and take the collateral from him — from that moment he becomes the lender\'s agent and the lender must accept responsibility for the collateral; but where he has not yet become the Jew\'s agent — such as where the non-Jew gives the collateral to the Jew to borrow money from a Jew and the Jew brought the collateral first from the non-Jew without the lender\'s agency — he need not return it to the non-Jew so the lender can then accept responsibility. So wrote Derishah and Bach.',
  ],
  [
    'Swearing. He wrote in the name of the Ashkenazi answer if he had been accompanied by a message that he would make a call to his wife and even witnesses, and so on, he was divided from the PA, and that he had no idea that he had not been able to return to his wife, and that he had no idea that he had to return to him',
    'To swear. Beit Yosef wrote in the name of an Ashkenazic responsum: specifically if when he lent he delivered the collateral into his hand, for he acquired by seizing it, etc. And as for what is written "and even witnesses," etc. — Maharshal disagrees and holds that where witnesses testify it is his, it is forbidden. He further wrote: where his wife pledged the collaterals — even though she deals in all matters within the home and says they belong to the non-Jew — if it is clearly established they are his, everyone agrees he must return them. And likewise if he cannot establish it and claims he himself knows the collaterals are his — he must swear he does not know — see there.',
  ],
  [
    'borrowing. According to the letter of the High Court, he wrote that the loan did not know that for Israel as the oppressor I know that the work of the stars for itself was accompanied:',
    'borrowing. Taz wrote: and even though in seif 7 he wrote specifically when the lender did not know it was for Israel, etc. — here it is different, for it is known the non-Jew borrows for his own sake.',
  ],
  [
    'The custom. That is to say, he is simply the custom of his son, Samari, who brings him back his throat and takes great care of it, but if he is obligated to return it, there is no custom only to return him when he is raised and that if he wanted not to return the authority in his hand, as is done by the Almighty:',
    'The custom. That is to say, the custom is simply that even if he pledged it with him without specification it is permitted — he returns his collateral and takes the interest. But if he is obligated to return it, there is no custom; rather the practice is to return it when he redeems it; and possibly if he wished not to return it, the authority would be in his hand according to the law — end quote Siftei Kohen.',
  ],
  [
    'In the rest. The Bible wrote this model, which was interpreted by the rest of you, and not only, nor anyone who did not want to interpret the things, and said a model of just a style that would be said in the permit to take me out of the negotiations, in fact, we must act now, so we see that many are being violated by a rabbinical prohibition and are not afraid to do so at all, and that it is necessary to investigate it and if it is not clear',
    'Permissibly. Taz wrote: this too discusses where he specifies the permission — how it was — and not by default. And even for one who does not wish to interpret the matters thus, and says it suffices to say "I took it permissibly" without specification — nevertheless it appears that as a practical matter we must conduct ourselves thus now, for we see that many transgress the ribbit prohibition and do not consider it anything, and they do not care to act permissibly at all; therefore the judge must in any case investigate him how it was done permissibly, and if it is not clear to him he must administer an oath — end quote.',
  ],
]);

// ── siman_168 / beer-hagolah ────────────────────────────────────────────────
fixLines(`${base}/siman_168/beer-hagolah/part-001.txt`, [
  [
    'The Bible responds to the fact that it is intended to hang its land in the hands of star workers in the cave in order to lend them to Israel:',
    'Rashba in a responsum: because this was done with intent to place one\'s money in the hands of non-Jews as a stratagem in order to lend them to Jews.',
  ],
  [
    'The name of his father, Rashi, said to him, "He who is known to have taken away is that he has sent a mission to a Star worker to the Sun:',
    'There in the name of his father Rosh: since it is known he took them for himself, he has sent a non-Jew as his agent to the lender.',
  ],
]);

// ── siman_168 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_168/beur-hagra/part-001.txt`, [
  [
    'Who is called? D. Lao has things, even though he is known to serve, he has removed himself from him so that he can borrow by the rest and give the Starworker this way. In reply:',
    'However, etc. He says "you are not my litigant" — even though it is known to be his, he has removed himself from it so that he can borrow in a permitted manner and gave it to the non-Jew for this purpose. In a responsum.',
  ],
  [
    'That is why we need a . R. D. D.C. in a rebel against the debt and more than a place for the welfare of the Appellate, wrote that he had no business with the borrower at all:',
    'And therefore we need, etc. Meaning what Mordechai wrote — that the collateral should equal the debt and more — he wrote this for the sake of extra caution, so that the lender has no dealings at all with the borrower.',
  ],
  [
    'If they are responsible. Then, as it is, not only like this evening, will the work of the stars and the people of Israel be given to him in the evening of the Lord, who is not required for the sake of the Torah and the work of the stars from Israel, will be done to him by the day of the Lord, and who is not required for the purpose of the Lord\'s Supper and the Lord of Israel',
    'If they are responsible. Then it is also like a guarantor — that he first demands from the non-Jew and it is permitted; and as stated in Tosafeta and Yerushalmi, which Rosh brought in siman 63: a Jew who borrowed from a non-Jew, and the non-Jew from a Jew, and a second Jew became his guarantor, etc. And likewise such as they said in the Gemara that one is not first required of the guarantor; and as Raavad and Rosh wrote there; and as stated above siman 170; and see Beit Yosef 131 side 1 s.v. vehaRamban.',
  ],
  [
    'If the star worker is raped. So he is an exaggeration who has taken away from it and has given it to him that he should not give up and return to him, and as a result of the "B" of the thief, "The thief shall be called" in the wake of his name, and he shall be brought to him." Mordechai:',
    'If the non-Jew is coercive. For then he is like a thief who took from one and gave to another — as long as the first has not despaired he must return it to him; and as stated in Bava Batra: Talmud says "the thief," etc., "granted," etc.; and see Tosafot there s.v. mah, etc. Mordechai.',
  ],
  [
    'Israel is called and if the worker is the same. For he has nothing but the Star worker and the S. S. works his stars as well:',
    'A Jew is called, and if the non-Jew, etc. For he has nothing except against the non-Jew; and likewise above seif 6: a non-Jew who borrowed, etc.',
  ],
  [
    'Oh, yes. The Bible and the Bible:',
    'And some say, etc. See Taz and Siftei Kohen.',
  ],
  [
    '"And from the slumber." I think she\'s very close. There is no name in the Bible and the IDF, in addition to the death of a star worker, in Israel, a rabbi of Hashem is forbidden to be accompanied by Hashem\'s people and Hashem\'s people:',
    'And moreover, lekhatchilah, etc. I think this is very close to fixed ribbit. There is no name in Tosafeta and Yerushalmi except that of non-Jewish money deposited with a Jew — it is forbidden to lend it to Jews at interest. And this means the money is with him as a loan, as stated in Sefer HaTerumah; and likewise in reverse, from a Jew to a non-Jew, as stated.',
  ],
  [
    'And if he comes as a. It is greater than it is said in the Bible, the gift of a quaint. There is a name and a lot of money:',
    'And if he comes, etc. It is greater than what is said in Bava Kamma perek 5 (49b): "the collateral of a convert," etc. There in Rashba; and see CM siman 72 seif 40.',
  ],
  [
    'And if they were changed." All the conditions in which he exists, but he is at the end of this section and must not be changed and has already listened to him:',
    'And if they stipulated. For every monetary stipulation is valid; but it is puzzling, for if so it is fixed ribbit as he wrote at siman 174; and likewise he wrote at the end of this seif "and it is forbidden to stipulate," etc. — and all the later authorities have already challenged him on this.',
  ],
  [
    'Who is called? This is also not the case for a star worker as a chair in G-d',
    'However, etc. This too is not the case, for we rule there is no acquisition for a non-Jew, as stated in the Gemara (and this requires examination).',
  ],
  [
    'We are trained as a. It is the same as C. X.C. in the High Court and it is also called the X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X',
    'And he is trusted, etc. Same as above siman 162 seif 2 in the Hagahah; and this too requires examination as written at the beginning of siman 163 (s.k. 60).',
  ],
  [
    'And so, as a quaint, but a quaint. According to S.C.:',
    'And all this, etc., but, etc., whether, etc. See above end of siman 170.',
  ],
  [
    'Or jealous as well. In Sifa, a Star worker who told Israel as a Dispute that is so divided as a "Jazing denier" prohibits the IDF as a part of the absurdity and there is a hyenaline that is a star worker and does not owe their responsibility and as a publisher in my book your money except for other money. Total and column. But here it is forbidden, but in the spa, it is not written that it is forbidden, but in the sabbath, it is agreed to know the methrin and the column:',
    'Or disagrees, etc. In the Sifra, regarding a non-Jew who said to Israel — there is a dispute among the poskim: some forbid since one can say he has a share in the profit; and some permit since the body of the money belongs to the non-Jew and responsibility is not upon him; and as stated in Sifri: "your silver" — excluding others\' silver. Sefer HaTerumah and Tur. But here everyone agrees it is forbidden. And in the latter case he omitted and did not write the view of those who forbid; but in Sefer HaTerumah he agreed with those who permit, and likewise Tur.',
  ],
  [
    'The quaint. It is the responsibility of Hashem\'s people and His people:',
    'Collateral, etc. That its responsibility be upon the collateral; and as stated above seif 17; and see Siftei Kohen.',
  ],
  [
    'And if there is no name, but rather a place. As a result of Hashem\'s covenant with Hashem\'s people, it is Hashem\'s promise that He is Hashem\'s people, and that He is Hashem\'s people, and that He is Hashem\'s people, and that He is not Hashem\'s people, and that He is Hashem\'s people. Name (h)',
    '(Likkut) And if there is no, etc., but only, etc. As stated in Sefer HaTerumah there seif 7 — what it says "this is the rule: whoever is on responsibility," etc. — specifically when it was made as a loan with him; otherwise why is he worse than a guarantor; whoever accepted to be judged under Jewish law is permitted, because he first demands from the borrower and he does not immediately become a borrower — all the more here where he is only liable when they were seized by force. And this is what the Gemara says 71b: the Sages taught "lender," etc., "how so," etc. — there is no greater novelty in one who deposits with responsibility than specifically a borrower. There (end quote).',
  ],
  [
    'They are allowed to be married. As C. C. C. C.C. and M.D.:',
    'And it is permitted for the borrower, etc. As stated siman 173 seif 4; and see there.',
  ],
  [
    'And if Hashem is a gift. As a result of Hashem\'s promise, "He is a gift of the Lord." He said, "It is a blessing for me, and I will be able to do so, and I will be able to do so, and I will be able to do so, and I will be blessed with him, and I will be able to do so with him, and he will not be able to do so."',
    '(Likkut) And if they stipulated, etc., for a stipulation is, etc. His words are taken from Baal HaTerumah; and he brought them in the Hagahah siman 177 seif 1; and as stated in Yerushalmi; but it is not so — for if so why did they say Avodah Zarah 63a "in the possession of the buyer it is forbidden"; and likewise there regarding the ass-drivers; and as Tosafot wrote there; and in Rav Chama\'s case; and likewise Rav accepted liability for road hazards and inadvertent damage — it is a great error, for they only said this when the recipient has no benefit whatsoever and he is his agent, as stated in Yerushalmi; but whenever there is any benefit in the matter it is full ribbit.',
  ],
  [
    'It is a great deal, and it is in the midst of Hashem\'s people, and it is the same as Hashem\'s people, and He is the same as Hashem\'s people',
    '[And as stated in siman 167: lender, etc., and they shall be on responsibility, etc. — even though he currently has no benefit and he is like his agent, as stated in Yerushalmi — nevertheless since he does so for his eventual benefit he is like a borrower, and he also needs the wage of his labor. And likewise in an iska, in the half given to the iska manager, he must accept responsibility and pay the wage of his labor (end quote).]',
  ],
  [
    'And in the hearts of KW. A debt cannot be granted, but in the status of their spouse as a member of the C.C. and a member of Starfleet\'s debt despite the status of their six-year-olds to provide as a chair in the United States:',
    'And in the credit debts, etc. For an oral debt cannot be transferred except by the three-party transfer, as stated in CM siman 203 seif 9; and for Rabbeinu Tam, a non-Jew\'s debt cannot be transferred even through the three-party transfer, as stated there in siman 126 seif 22.',
  ],
  [
    'And Duke is. And then, he said, "I will give you a snail."',
    'And specifically, etc. And unlike, etc. See Siftei Kohen who disputes this and left it requiring investigation.',
  ],
]);

// ── siman_168 / pitchei-teshuva ─────────────────────────────────────────────
fixLines(`${base}/siman_168/pitchei-teshuva/part-001.txt`, [
  [
    'The first thing I believe. A. In the answer to the new Radb report, "The author of Dach was the bookkeeper, and the same way that it is clear that Israel\'s admission requires that Daimour Israel have given them to the Starworker to their neighbors for the work of stars. And yet another writer didn\'t tell him to begin with the idea that the neighborliness of the Star worker was only told him for the work of the stars, but the rest gave him a mere impure that gave them to the Starworker to serve as an AHP that is known that they have',
    'To your first words I believe. A. See in responsum Radbaz HaChadashot siman 305 who wrote that even if the collaterals were books and the like, where it is clear they belong to the Jew, his oral admission obligates him — for we say the Jew transferred them to the non-Jew in order to pledge them for the non-Jew\'s sake. And another writer: even if he did not say to him explicitly from the outset that the collaterals belong to the non-Jew, but said to him "it is for the non-Jew\'s sake" — while giving the collaterals to him without specification — we say he transferred them to the non-Jew in order for him to pledge them, even though it is known they belong to the Jew.',
  ],
  [
    'Rael, but if he is required for the purpose of the Star worker, I am Loh, but my continuedness is not to have been given to a Star worker by this, I say that he did not work them but to ensure the safety of the Fund, but cannot delay them for the rabbi and that he does not lose his soul and give him any other neighbors who claim not to himself or to the need of the stars and the worker did not give him a great deal',
    'But if he explicitly said to him "I am borrowing for the non-Jew\'s sake, but the collaterals are mine and I did not transfer them to the non-Jew" — then I say he only pledged them to secure the principal, and he cannot hold them for the interest; and he who loses thereby loses through his own actions; and he gives him the principal and takes his collaterals, after swearing that he only borrowed for his own sake or that he borrowed for the non-Jew\'s sake and the non-Jew did not give him interest — see there.',
  ],
  [
    'The public leaders. [T.S.A. S. C.C.] In order to build a place for poor guests and a home of the people who make their money and sit in a single star worker for the audience for a sum of hundreds of golden gold and their heavy weight, and the head of the crowd, the head of the people who come to him, and they pay him the same time',
    'Community leaders. [See Taz s.k. 22; and see in responsum Chatam Sofer siman 132 regarding a certain town where the community needed money to build a lodging place for poor guests and a cemetery wall, and the community head deposited his silver and gold with a certain non-Jew and borrowed for the community\'s need a sum of hundreds of gold coins at interest, and he paid the interest from his own pocket; and afterward the community head demanded from the community that they pay him his money, and they appeased him not to press them, and in turn, as long as he pays the aforementioned interest on their behalf, they would exempt him from the burden of taxes falling to his share from the hospitality fund;',
  ],
  [
    'And when it comes to this humiliating hill, it is doubtful that it is seen as a blessing for the people of the earth that is not trusted, but rather the wisdom of the head of the public, that he has accompanied the workers of the stars and is accompanied by the audience, and that he has been exalted to the extent of his life, and that I have heard the response of Hashem\'s promise to him',
    'and when the matter reached the rabbi of that city, he had doubts and it appeared to him as fixed ribbit, since the non-Jew relies only on the community head\'s collateral — it turns out he is the one who borrowed from the non-Jew and lends to the community, and the exemption from the burden mentioned is fixed ribbit. And he responded: similar to this I heard in a responsum of Ranak siman 37, which Siftei Kohen alluded to in s.k. 54, about a case where community officers built houses for community need to rent them out for profit;',
  ],
  [
    'The Barbie Sea to pay the sellers and to establish in the raids of the crowd should return to the rabbinical masses and return to Israel for the sake of the work of stars, and to which it is forbidden to take care of the rabbinical burden that I am responsible for the children and the houses that are built before them, and that the land of the land is better, and that the land of the land is better',
    'and they took stones and beams on credit, and afterward the sellers pressed them, and these officers borrowed money from a non-Jew at interest to pay the sellers; and they ruled plainly that the community must return to the officers the interest — for it is not comparable to one who borrows from a non-Jew and goes and lends to a Jew, which is forbidden to take interest; here it is different, since they spent it on construction and the houses are built before them — and added to the expenses is the interest paid to the creditors; it is like a trustee conducting business who credits to the profits the wages of porters and carriers — see there.',
  ],
  [
    'Agrater dilia is that he will not feed the poor as a quaint, and he is more likely to do so here',
    'And the earned delay payment for him is that they should not press the poor, etc.; and he elaborated further that there is no concern of any prohibition here — see there.]',
  ],
]);

// ── siman_168 / rabbi-akiva-eiger-yd ────────────────────────────────────────
fixLines(`${base}/siman_168/rabbi-akiva-eiger-yd/part-001.txt`, [
  [
    'And there is a cliche. At the gate of the king (p.g. from Mila) and in S. Gumma to the Purim of Joseph (P.C.) listened to my mother not too much to say to a star worker. by:',
    'And those who are lenient. In Sha\'ar HaMelech (ch. 8 of Malveh) and in the book Teivat Gome to the Gaon Purat Yosef (parashat Korach), they asked why it should not be forbidden because of the rule of stating a matter to a non-Jew, which is forbidden for all prohibitions — see there.',
  ],
  [
    'And we will resign the messenger. And if I teach her, I will sue the star worker and if I do not violate my responsibility for you, and he can sue the star worker in their own laws, and this is the night and so on',
    '(Siftei Kohen s.k. 34) And the agent is thereby released. And if he said to him: "I will sue the non-Jew, and if he does not pay, my responsibility is upon you" — and he can sue the non-Jew under their law — it is permitted, as the law of a guarantor, etc. See there.',
  ],
  [
    '(A.) is deposited in the hands of a star worker. Israel who has given land to a Star worker in his business to deal with them for half the wage and borrowing from them the Star worker to Israel in the Barkat, who is aware that when they are given to Israel from the IDF of Sri Lankan',
    '(Seif 11) deposited in the hands of a non-Jew. A Jew who gave a field to a non-Jew as a business arrangement to work it for half the profit, and the non-Jew borrowed from the Jew against the field at interest — be aware that when paid to the Jew from the half-share.',
  ],
]);

// ── siman_170 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_170/baer-heitev/part-001.txt`, [
  [
    'Evening. For in their own words, Hashem forbids the word of the night from which the debt is made, and Hashem\'s name is not for the Lord\'s sake, and Hashem\'s mercy is not the night of Hashem\'s wrath, but Hashem\'s wrath is not for him. "Third:',
    'Guarantor. For under their law, the lender can demand from whomever he wishes — whether borrower or guarantor — and if a Jew becomes guarantor for a non-Jew for a Jew, he may be liable; therefore it appears like ribbit and is forbidden. Siftei Kohen.',
  ],
]);

// ── siman_170 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_170/beur-hagra/part-001.txt`, [
  [
    'Unless they are. In addition to the Jews of Israel, who borrowed from the Star worker and Star Workers from Israel to another day, and does not fear:',
    'Unless they are. In Tosafeta and Yerushalmi: a Jew who borrowed from a non-Jew and the non-Jew from a Jew — a second Jew became guarantor for him and has no concern.',
  ],
  [
    'And Durk is a quay, but he is. Same as C. X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X X',
    'And specifically, etc., but, etc. Same as above siman 169 seif 1; and even if he presented him, etc.; and the non-Jew said to him, etc.; and as Tosafot wrote there.',
  ],
]);

// ── siman_170 / turei-zahav ─────────────────────────────────────────────────
fixLines(`${base}/siman_170/turei-zahav/part-001.txt`, [
  [
    'And yes, a star worker who was married. Because in their own law, the Levites the word for the evening from which the debt will be sued, and if such a thing has been made, Israel will be engaged and the evening is accompanied by Lola:',
    'And yes, a non-Jew who was a guarantor. For under their law, the lender can demand payment of the debt from the guarantor; and if such was done, the Jew is engaged and the guarantor is thereby obligated.',
  ],
  [
    'Or on the other hand, it is only for him. In the dress, he wrote about it and the PLO is not even the burden of the working-star worker immediately, and not even the evening of Israel only for the rabbinate, it is forbidden to be a contractor in favor of the Star worker, who tells him that Israel is constantly in charge of the working hand of the stars, I give you a dinar to the month, all the time that I owe you to you is the foundation of Hashem\'s responsibility to you',
    'Or in any case, it is only this. Levush wrote: and the non-Jew is not even an arev kablan for the non-Jew immediately; and even a guarantor of Israel just for the interest — it is forbidden to be a contractor for the non-Jew who says to him that Israel constantly bears the obligation, "I will give you a dinar per month as long as what I owe you is the principal responsibility to you,"',
  ],
  [
    'A new one will not be able to give you the foundation, which is not here in the Bible, but above, it is a sign of the X-Men in the Bible that says to Israel as the Lord, "If I have heard in the hands of a Star worker, you give me a dinar to the month that does not have any responsibility for him."',
    'a new one will not be able to give you the principal, which is not here in the Shulchan Aruch, but above siman 170 it states regarding a non-Jew who says to Israel as a guarantor: "If I receive in the hands of a non-Jew, you give me a dinar per month" — that the non-Jew has no responsibility to him.',
  ],
  [
    'Or at all, and the PLO, which poisoned Israel for Star Workers, and here the work of the stars from Israel and Israel was done on the eve of this term, does not imply that you say that in the evening for the rabbinate, we will also be held in favor of the foundation for what the oppressor has given to me, if Israel is the evening for a foundation that is forbidden by the working stars. And he wrote about the dress and the rest of Leah Maria Dalailaid that there was an intoxicated Israel and as we remembered and did not know what was dark',
    'Or in any case, and the non-Jew who obligated Israel for the non-Jew — and here the non-Jew from Israel and Israel was guarantor for the non-Jew\'s term — it does not follow that you say that as guarantor for the interest we should also hold him liable for the principal for what he gave me. If Israel is guarantor for principal, it is forbidden because of the non-Jew\'s obligation. And Levush wrote that it remains requiring investigation — that there was a confused Israelite who forgot and did not know what was decided.',
  ],
]);

// ── siman_172 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_172/baer-heitev/part-001.txt`, [
  [
    'When responsibility. P. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . "Third:',
    'When responsibility. Siftei Kohen.',
  ],
  [
    'removed. The above is because he receives responsibility from the Almighty that the responsibility is not here, and the taste of the mechanic is due to the fact that he is written to him in such a hurry or because there is no power in the hand of the word to collect his debt. "Third:',
    'removed. The above is because he accepts responsibility from the lender and the responsibility here is not by force; and the reason of the Mechaber is either because he is written into it in such urgency or because there is no power in the borrower\'s hand to collect his debt. Siftei Kohen.',
  ],
  [
    'return. Epic was on the buyer to his puzzles, as in their law, he was a sale until he was disturbed, and he would not be as beautiful as the force of the star worker and when he was picked up, the word was broken and sold to him. The name of the occupiers:',
    'return. For the burden was on the buyer against his interests — as under their law it was a sale until the matter was disturbed; and the field was not as good as the amount; and when it was seized, the valuation was broken and it was sold to him. The name of Poskim.',
  ],
  [
    'removed. Epic was on the buyer to his puzzles, as in their law, he was a sale until he was disturbed, and he would not be as beautiful as the force of the star worker and when he was picked up, the word was broken and sold to him. The name of the occupiers:',
    'removed. For the burden was on the buyer against his interests — as under their law it was a sale until the matter was dissolved; and the field was not as good as the amount paid; and when it was seized, what was assessed was broken and sold to him. The name of Poskim.',
  ],
]);

// ── siman_172 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_172/beur-hagra/part-001.txt`, [
  [
    "And there's a quaint. Same as C. C.C. and the Bible:",
    'And those who permit, etc. Same as above siman 160 seif 18; and see Siftei Kohen.',
  ],
]);

// ── siman_173 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_173/baer-heitev/part-001.txt`, [
  [
    'To my tongue. The columnist wrote to her guests, but in my ears, it is forbidden to speak out of the way that he is sold and sold as a "Judeo" and the Rashiel is not the most important. "Third:',
    'In the manner. Tur wrote regarding his words: but in my opinion it is forbidden in any case where it is outright sold and sold, and the Rashiel is not the most significant. Siftei Kohen.',
  ],
  [
    'in bubbles. There are no bubbles that are another species, but do not circumvent in the rumours that are both sex A and fruit in the fruit of the halves are not permitted, nor do they sing, but rather than exalted, but if he said in the word that he is through a fruitful glaze in the fruits of the species, he is not allowed to accompany him even as "forth" he is not permitted. "Third:',
    'in a sale. There is no prohibition of "you shall not lend at interest" but only of evasion — where he intends through a sale to circumvent. And if both transactions are of the same species and fruit for fruit — in the half they are not permitted to give, nor to take. But on the contrary it is permitted. But if he explicitly said he is going through a sale in the fruits of the species — it is not permitted to accompany him even as a "go-ahead" — it is not permitted. Siftei Kohen.',
  ],
  [
    'Responsibility. It seems that DAM gives him a fee for bringing him even without responsibility and an important person who receives responsibility and gives him a fee that is permitted. "Third:',
    'Responsibility. It seems that even without responsibility he gives him a fee for bringing; and an important person who accepts responsibility and gives him a fee — it is permitted. Siftei Kohen.',
  ],
]);

// ── siman_173 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_173/beur-hagra/part-001.txt`, [
  [
    "It's just a quaint, but a turn. As a result, the island is close to the capital of the Lord, and the Lord is:",
    'It is just like a turning, but a turning. For the island is close to the principal; and see above.',
  ],
]);

// ── siman_175 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_175/baer-heitev/part-001.txt`, [
  [
    'Darin. That is to say that a wise man is nothing but a dormant. "Third:',
    'According to the law. That is to say that a sage is nothing but an idler. Siftei Kohen.',
  ],
  [
    'The word. He will give him even one of his covets in the rock of Dassssam, but he is allowed to be caught with a blaze that will give him a rock. The Bible and the Bible:',
    'The matter. He will give him even one of his possessions at the current value of a sela; but he is permitted to assess it at a value that he will give him a sela. Beit Yosef and Beit Yosef.',
  ],
]);

// ── siman_175 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_175/beur-hagra/part-001.txt`, [
  [
    '(Lycott) was a. As our G-d in G-d, but Rashi wrote that the G-d plusa P.A. does not stop the news as a quaint, but our G-d does not stop at all between the old and old as a fixed gate. "And they were like." As our DJ and G. R. R. R. R.R. and I heard A.D. give him a new afternoon from D. D. D.D. as the PA license is permitted in the JC. A.D. and S. (b)',
    '(Likkut) They were, etc. As our version in the Gemara; but Rashi there wrote: the correct version is in the Tosafeta, etc. — "they do not fix a price on new produce," etc. But according to our version, they do not fix a price at all, whether for new or old, since there is no established market price. Mishneh LaMelech (end quote). (Likkut) They were, etc. As our version and the version of Rif and others; and it implies that even to give him new produce afterward — like the fourth view — and unlike Rashi, for according to his view it is permitted in such a case. Mishneh LaMelech, Sefer HaTerumah, and others. Beit Yosef (end quote).',
  ],
]);

// ── siman_176 / nekudot-hakesef ─────────────────────────────────────────────
fixLines(`${base}/siman_176/nekudot-hakesef/part-001.txt`, [
  [
    'But it looks like a quaint. Look at the Bible, it does not mean that it is harvested as a doll by the borrower:',
    'But it appears like evasion. See Beit Yosef; it does not mean that it is taken as interest by the borrower.',
  ],
]);

// ── siman_177 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_177/baer-heitev/part-001.txt`, [
  [
    'He is. Even Diner to a thousand, and even another business is not from this kind of business that Sri Lankan from his business against his people. "Third:',
    'He is. Even a dinar to a thousand; and even another type of business is not of this type of business that separates a person from his business against his people. Siftei Kohen.',
  ],
  [
    'as a partnership. And they are divided into what kind of thing they want and are not afraid of. "Third:',
    'as a partnership. And they may divide into whatever type of goods they choose, and need not be concerned. Siftei Kohen.',
  ],
  [
    'divided. The first explained as the S. X. "Third:',
    'divided. The first part is as explained by Siftei Kohen. Siftei Kohen.',
  ],
  [
    'was. P. Against all the farms, and not a little bit of it as a C.C. lock. The Bible and the Bible:',
    'was. Siftei Kohen. Against all the collaterals, and not even a little of it as a double lock. Beit Yosef and Beit Yosef.',
  ],
  [
    'announced. That is to say that I will not deal with the loss and I will not deal until you receive an exception from the present day, nor will there be an enslavement for the authority in his hand. "Third:',
    'announced. That is to say that I will not deal with the loss, and I will not deal with you until you receive an exemption from the present day; nor will there be an obligation, for the authority is in his hand. Siftei Kohen.',
  ],
  [
    'Due to him. That is to say, in some of the horns and in the parts of the grove, the "all the other two species are forbidden but will be all dead. "Third:',
    'Due to him. That is to say, in some of the principals and parts of the increase — "all the other two species are forbidden" but will all be counted. Siftei Kohen.',
  ],
  [
    'C. "Third:',
    'Siftei Kohen.',
  ],
]);

// ── siman_177 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_177/beur-hagra/part-001.txt`, [
  [
    "It's not a quaint and not a quaint.\" And seeing Dam was not the name of the pay for the middle and the pen:",
    'It is not evasion and not evasion. And seemingly the blood-payment was not the name of the wage for the mediator and the broker.',
  ],
  [
    '(Lycott) is the gift. The first verse in the Bible and "Our G-d is in G-d and G-d and R&D."',
    '(Likkut) is the gift. The first as in Beit Yosef; and "our version and the Rif\'s version."',
  ],
]);

// ── siman_178 / beer-hagolah ────────────────────────────────────────────────
fixLines(`${base}/siman_178/beer-hagolah/part-001.txt`, [
  [
    'Marbria D. Starworker who was a star worker and so on a page as "T" and wrote the Rambam that it is called a lion:',
    'Maggid: a non-Jew who acted as a non-Jew, etc., on a folio marked "T"; and Rambam wrote that this is called a lion.',
  ],
]);

// ── siman_178 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_178/beur-hagra/part-001.txt`, [
  [
    'As a Star worker and as well as P.D., she is wearing a blasphemy as a star-headed Rava, Dr. A.D., ripped off because of a star worker costume:',
    'As a non-Jew and likewise Peri Davar; she wears it as heresy like a non-Jewish practice; Rava; due to the non-Jewish custom.',
  ],
  [
    'And not just a quaint. Same as:',
    'And not merely evasion. Same as above.',
  ],
]);

// ── siman_178 / turei-zahav ─────────────────────────────────────────────────
fixLines(`${base}/siman_178/turei-zahav/part-001.txt`, [
  [
    'And he will not grow his head. This is the words of Rambam, without any trace, said this prohibition, namely, that the way of star workers with wars in many countries to grow their gate very much and do not at all reveal itself will not be Israel, nor does it at all, in any case, that there is an exception to Israel, and what it means to distinguish it from them from it and what it means to me',
    'And he shall not grow his hair. This is Rambam\'s language, without citing a source. He states this prohibition — namely, that the custom of non-Jews in many countries is to grow their hair very long and not reveal it at all — and that this is likewise not for Israel; and in any case what matters is to distinguish oneself from them in what makes them distinctive.',
  ],
]);

// ── siman_179 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_179/beur-hagra/part-001.txt`, [
  [
    'If there is a quaint. There is no such name:',
    'If there is an evasion. There is no such concept.',
  ],
  [
    'The quaint. by:',
    'The evasion. As follows.',
  ],
]);

// ── siman_179 / turei-zahav ─────────────────────────────────────────────────
fixLines(`${base}/siman_179/turei-zahav/part-001.txt`, [
  [
    'And then he calls him. The taste of the Dachron reminds us of the lightning of Hashem\'s wrath, and therefore there is no difficulty in what is used in lightning before, and we are excavated by everything that is known that the combustion is the ageing vision of Starworkers and is the honor of Heaven that reminds us later. Yes, yes:',
    'And then he calls him. The reasoning of the later authorities is that it reminds one of lightning; and therefore there is no difficulty in what was used regarding lightning before; and we are compelled by the fact that it is known that lightning is the practice of astrologers, and it is the honor of Heaven that this reminds us of. Indeed, yes.',
  ],
]);

// ── siman_180 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_180/baer-heitev/part-001.txt`, [
  [
    'exempt. He wrote in the book, "Nonsen from the Head of Fuelman C. K.C. and P.C., that they were deposed by a ban from the IAA, which did not help the "death". "Third:',
    'exempt. He wrote in a responsum, Noda BeYehudah, by the leading authorities — CM, Kaf HaChayyim, and Peri Chadash — that they were placed under a ban by the rabbinic court, and this did not help to save him from death. Siftei Kohen.',
  ],
]);

// ── siman_180 / beer-hagolah ────────────────────────────────────────────────
fixLines(`${base}/siman_180/beer-hagolah/part-001.txt`, [
  [
    'In fact, a page has been hit by A. D.C. and D. D. D.C. does not even write the work of the stars, and our rabbis are shot and the Rambans at the end of the Starwork:',
    'Indeed, a folio has been noted by the authorities; and Rambam does not even write the non-Jewish practice; and our rabbis cite Ramban at the end of the section on non-Jewish practices.',
  ],
  [
    'A column called the Rambam at the end of the Tooth Starwork Division encompasses the sign that otherwise:',
    'Tur cited Rambam at the end of the section on non-Jewish practices; it encompasses the siman, for otherwise.',
  ],
]);

// ── siman_180 / beur-hagra ──────────────────────────────────────────────────
fixLines(`${base}/siman_180/beur-hagra/part-001.txt`, [
  [
    'And as a "six." D. A. B.A. admits that he or she is nothing but a quaint, and is not a gift',
    'And as Siftei Kohen. Meaning Siftei Kohen admits that it is nothing but an evasion, and is not a gift.',
  ],
]);

// ── siman_181 / baer-heitev ─────────────────────────────────────────────────
fixLines(`${base}/siman_181/baer-heitev/part-001.txt`, [
  [
    'as a eye. Spoke in numbers near the flesh as an eye. "Third:',
    'as an eye. Mentioned in counting near the flesh as an eye. Siftei Kohen.',
  ],
]);

// ── siman_181 / beer-hagolah ────────────────────────────────────────────────
fixLines(`${base}/siman_181/beer-hagolah/part-001.txt`, [
  [
    'Rambam at the end of the Starwork and FIFA:',
    'Rambam at the end of the section on non-Jewish practices and so forth.',
  ],
]);

// ── siman_182 / beer-hagolah ────────────────────────────────────────────────
fixLines(`${base}/siman_182/beer-hagolah/part-001.txt`, [
  [
    'A column called the Rambam at the end of the Starwork Act: (°C) P.D. and Affi. B:',
    'Tur cited Rambam at the end of the section on non-Jewish practices: (°) Peri Davar and so forth.',
  ],
]);

console.log('Done.');
