#!/usr/bin/env node
import { patchFile } from "./_patch-siman-utils.mjs";

let n = 0;
const p = (rel, slug, T) => { n += patchFile(rel, slug, T); };

p("siman_028/turei-zahav/part-001.txt", "turei-zahav", {
  "1#א": `And if they came — not betrothed, for plain robbery is not owners' despair.`,
  "1#ב": `Betrothed rabbinically — implies specifically after despair; for Shulchan Aruch already wrote despair only when known; if plain even rabbinically no kiddushin at all and no get needed. I wrote this to exclude from what Mahari Chayim wrote; I already wrote in chapter 4 Choshen Mishpat 361.`,
  "2#_": `Not betrothed for she can say I did not take and I took mine; but if shiddukhin first or she said yes — she waives the robbery.`,
  "3#א": `Even though shiddukhin first etc. — initially accepted as debt and now at kiddushin gives her nothing (if returned debt she can also say accepted for my debt). Words of the corrector — I do not know who corrected this and it is unnecessary; Taz cited in seif 3.`,
  "3#ב": `And payment time arrived — not mentioned except to include that even so we do not consider repayment; but if said first take this for debt — not dependent on payment time; even if time not arrived we say not betrothed for though we hold end that debtor pays on time — this is different.`,
  "3#ג": `Some say betrothed — Ran who brought this first wrote not betrothed since initially said for debt can say I hold to first language on my debt; and concludes for law not kiddushin certainly but safek.`,
  "3#ד": `Safek kiddushin if can say I took mine since she has nothing on pledge and not acquired to her; even per Beit Yosef pledge acquires — still did not pull yet and at pulling not given for pledge but for kiddushin — so responsum Rashba 127.`,
  "4#_": `And silence is nothing — silence after giving money is nothing; this silence because she does not care since initially not for kiddushin accepted for this money; but if says yes — as if gives now for kiddushin for she owes nothing.`,
  "5#א": `Safek betrothed — can say since initially accepted for kiddushin though object not perutah since returned said betroth with zuz in it; if not please would throw — not obligated guard since not deposit in her hand; from not throwing implies consented to kiddushin.`,
  "5#ב": `And if did not return etc. — wonder Rabba appears here for Rava said in this silence after giving money implies if said yes certainly kiddushin for language of kiddushin he said then and she consented; if so here since did not return and said behold inside perutah — not like tzipita case.`,
  "5#ג": `Woman who snatched etc. Maharam Padua 24 wrote silence after giving money does not help; and for Rif who wrote like one view concern and safek (needs) get — since shiddukhin first i.e. said kiddushin language first unlike here not for kiddushin initially.`,
  "6#א": `And specifically she does not know — this is Tur language in name Rosh; Perishah seems even though opened with two in deposit and loan — this latter law specifically deposit; but loan of vessel deals in all cases even if knew amount initially and at kiddushin did not know.`,
  "6#ב": `And consents betroth — not meaning explicitly says so but presumably; if explicitly obvious we follow her; so too end not consenting — also presumably as if says from my money.`,
  "6#ג": `She does not consent etc. — Tur concluded also he not obligated complete since does not mention deposit amount at kiddushin; as siman 29: if said be betrothed with maneh and gave dinar betrothed and completes maneh; here if knew deposit amount not consent except whole.`,
  "7#א": `Even money still in her hand — her money was spent since loan for expenditure given; thus not giving now anything.`,
  "7#ב": `Even returned document — since did not mention at kiddushin kiddushin in it like betrothing with loan; and some stringent hold since gives document like loan and perutah.`,
  "8#_": `This safek betrothed — perhaps perutah elsewhere.`,
  "9#_": `Because it is interest — Tur wrote thus; since did not deduct not full interest only dust of interest until said four in five; question in Choshen Mishpat 73 seems giving money for time is monetary claim; if borrower said time until ten days and other says today — see there.`,
  "10#_": `In what I profit you time etc. — from loan already made; from all views here if betroths with cut interest not betrothed; reason since must return before judges — robbery and interest same law; as in chapter Which is Interest that cut interest is robbery.`,
  "11#א": `Explanation pledged at time of loan etc. — all the more pledge not at loan time lender acquires from R. Yitzchak who expounds verse yours shall be charity — if not acquire pledge charity from where; and this not at loan time verse refers.`,
  "11#ב": `And some say even if did not return — explanation betroths through benefit of waiving loan i.e. said so; if so pledge worse since thought not rely since not return — teaches so Tosafot first chapter Kiddushin 19; this view holds as first view in seif.`,
  "12#א": `Has acquisition etc. — Rambam view holds R. Yitzchak even pledged at loan time acquires pledge; Rambam wrote partial acquisition; therefore some say though not fully acquire from R. Yitzchak where pledged at loan — still acquired partially since has partial acquisition in body of pledge.`,
  "12#ב": `And if sold etc. — refers to gentile pledge; Mahari"v 138 wrote for borrower; his view Mar since robbery rabbinically not kiddushin like chametz hour six; here not robbery but like annulled his loan permitted; though in Choshen Mishpat 361 gentile pledge Israel acquires — here different.`,
  "13#א": `Even loan by document — reason since can waive debt to borrower she not rely on kiddushin worried perhaps he waives and document in her hand not help claim debt.`,
  "13#ב": `Not betrothed except safek — Tur wrote not betrothed except appraise paper if perutah certainly betrothed if not safek; per his words since mentioned document and betroths in it appraise it; therefore no need writing and delivery; mentioned alone and not transferred — safek.`,
  "14#א": `And gave now perutah etc. (and if gives from his for work need) — even though she said first be betrothed for wage you do for me — say intent only on this as siman this seif 6 if knew deposit amount not consent except whole.`,
  "14#ב": `With loan and perutah — Tur wrote therefore if said make me ornaments and I be betrothed for wage — not betrothed for rental from start to end; per his words since betroth only with money not loan — also this becomes loan; R. Yerucham wrote.`,
  "15#א": `Craftsman acquires improvement — Tur wrote Rosh also holds; Rashal here author not precise thinks father's view like R. Yehuda and R. Tam craftsman acquires from gemara chapter 2 Kiddushin beginning Rif view craftsman not acquire; afterward R. Yehuda and R. Tam view.`,
  "15#ב": `And if vessel still etc. — Darkhei Moshe explains R. Yerucham: if made vessel for woman still with him for wage — betrothed betrothing with loan with pledge on it; wrote on this though Tur in name Rambam specifically pledge comes to her as pledge.`,
  "15#ג": `Gave from his etc. — even per first view beginning this seif.`,
  "16#_": `Get from doubt; same betrothed conditionally as siman 38:35 — reason perhaps had relations for kiddushin since first kiddushin not kiddushin person does not make relations promiscuous relations; question here we say relations not per first kiddushin.`,
  "17#א": `So as not shame — Yoreh Deah 251 regarding terumah not from knowledge we do not say so since terumah must separate; unlike here takes for self.`,
  "17#ב": `Thing not particular — Perishah wrote means homeowner not particular — safek kiddushin perhaps perutah elsewhere; but does not seem if perutah safek since took without knowledge homeowner; says not particular implies waived and his — see Beit Yosef.`,
  "17#ג": `Guest took portion etc. — very wonder this ruling for in chapter 25:94 guests not permitted give from before them to homeowner's son unless took permission; so ruled Orach Chayim 170; all the more not give others without permission; and here betrothed woman.`,
  "18#_": `She does not will betroth etc. — seems if revealed half partnership betrothed for relied only on his half and like perutah like betrothing loan and perutah intent only perutah.`,
  "19#א": `Borrower borrows from friend — Tur brought first requires Ba'al HaItur dispute some hold like gift on condition return as if gives gift on condition return; we hold siman 29 not betrothed like exchange woman not acquired in exchange.`,
  "19#ב": `And informed wants betroth etc. — Terumat Hadeshen 210: need inform so not think hers and betroth only ring itself; but explicitly betroths with ornament benefit though not informed — kiddushin; also Rosh needs give him ring or money.`,
  "19#ג": `And betrothed in it — Darkhei Moshe: if betrothed ornament benefit alone all betrothed; but in thing itself per Tosafot chapter HaZahav can say rental for day sale only for onaah not kiddushin even if knew rented.`,
  "20#א": `Recipient went betrothed etc. — specifically if betrothed woman who will return — not kiddushin like exchange; unlike here kiddushin did not mention return language though must return after.`,
  "20#ב": `Behold betrothed — Tur concluded only return gift to giver or its value; return and acquire from woman or give value to lender.`,
  "21#_": `Issur hanaah — Rosh view if biblical side in chametz or time not betrothed; but no biblical side betrothed; Rambam holds even no biblical side not betrothed; Shulchan Aruch safek both rabbinic sides; Tur wrote Rosh e.g.`,
});

console.log(`siman 028 turei-zahav: ${n} blocks patched`);
