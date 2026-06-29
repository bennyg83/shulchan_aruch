#!/usr/bin/env node
import fs from "fs";
import { parseBlocksInFile, serializeBlock } from "../oc001_block_lib.mjs";

const fixes = {
  "mishnah-berurah/part-001.txt": {
    "5:_": `(20) His left of every man—if controls both hands holds right which is right for everyone; know what mentioned from seif 4 until this seif Biur HaGra agreed only hiddur mitzvah l'chatchila.`,
    "6:א": `(21) From when cup given—until after drinking which is after finish birkat hamazon.`,
    "6:ב": `(22) From when blesser begins—but before permitted to speak even if blesser already took cup; some poskim stringent and proper to heed.`,
    "6:ג": `(23) Must hear etc.—blesser fulfills them in birkat hamazon; if do not hear they do not fulfill.`,
    "6:ד": `(24) Should not speak—for hearer is like answerer considered like blesser himself.`,
    "6:ה": `(25) Even—speech between does not invalidate blessings b'dieved; Magen Avraham sides only accidental speech but intentional even little between blessings returns to start birkat hamazon like tefillah siman 114 s.7; in Acharonim remained requires study; we ruled siman 65 b'dieved no return even intentional see Biur Halacha; l'chatchila careful; if wait between blessings so long could finish whole birkat hamazon some say return to start only if under duress needed bathroom or place unclean as siman 65 shema; see Biur Halacha law unclear in practice return only for between blessings; if wait mid-blessing return only to start that blessing.`,
    "6:ו": `(26) Did not fulfill—if blesser not finished blessing diners return bless themselves from where stopped listening; if blesser finished and they intended hear must return start blessing and bless themselves for skipped middle as not said; only if through speech mid did not hear skipped essential parts like covenant Torah which are me'akev siman 287; if skipped non-essential b'dieved need not return; all the more if did not skip e.g. blesser spoke mid and they too b'dieved fulfilled need not return.`,
    "7:א": `(27) Proper—though legally better diners hear all birkat hamazon from zimmun leader he fulfills in his blessing they not bless at all; nevertheless common diners distract not intend blesser's words lacking birkat hamazon nullifying Torah mitzvah with hands; therefore better today diners say quietly each word with blesser bless together called zimmun blessing fulfilling verse magnify Hashem with me we exalt His name together from which we derive zimmun as wrote below siman 192 Mishna Berurah.`,
    "7:ב": `(28) Every blessing—at least say quietly first blessing for many poskim otherwise not called zimmun at all as below siman 200 [Acharonim]; therefore many practice after said Blessed is He we ate each bless aloud alone wrongly; only blesser must bless first blessing aloud so diners hear they say quietly word for word only at end finish early to answer amen as Rema; see Magen Avraham sides teach like Tashbetz hold must be silent hear intend fulfill from blesser until Who sustains [then bless quietly with blesser]; we do not practice; nevertheless when know diners will intend do as Tashbetz inform them intend fulfill and he intends fulfill; only when all hearers understand Hebrew otherwise certainly better each bless whole birkat hamazon alone not fulfill through blesser [Acharonim].`,
    "7:ג": `(29) Generous eye—hates ill-gotten gain does kindness with money as written good eye he will be blessed do not read yevorekh but yevarekh [Gemara].`,
    "8:_": `(30) Law like tefillah—do not ask and respond at all; reason since Sages stringent birkat hamazon bless only one place like tefillah unlike shema can say walking from first verse and some from upon your heart as above siman 63 Mishna Berurah.`,
    "9:א": `(31) When blessing—conclusion of poskim implies fourth blessing though rabbinic must sit so not treat lightly.`,
    "9:ב": `(32) In his house—walking on road see below s.11.`,
    "9:ג": `(33) Same all diners—since all fulfill through his blessing must sit with awe like blesser.`,
    "9:ד": `(34) Even blessed walking—when walking in house at eating place; if went elsewhere and blessed opinions see below siman 184 s.1 in Hagahot.`,
  },
  "peri-megadim/part-001.txt": {
    "1:_": `After whole cup Taz—even if revi'it in hole below; Acharonim letter hei even lip defective fingernail width—stringency; b'dieved if no other permitted like defective cup siman 182 s.7 see there.`,
    "2:_": `Receives Taz in Levush since not written yadkhem with yod between dalet and kaf in Acharonim letter vav truly written without yod only vowel yod in shuruk of dalet with tzeirei tav gimel should say yod in segol of dalet in shuruk teaches one hand as tefillin see there (Psalms 134 see there).`,
    "3:_": `And this Taz to support feminine refers right hand even this forbidden; Mechaber omitted wrapping in cup; Beit Yosef wrote uncovered head forbidden in all blessings; Darkei Moshe wrote listeners permitted other blessings birkat hamazon forbidden; Bach wrote even other blessings hearer is like answerer forbidden uncovered head see there; naked forbidden slaughter for hearer is like answerer; perhaps uncovered nakedness Torah-level; practically heed Bach words even other blessings hearer like answerer forbidden uncovered head siman 91.`,
    "4:_": `Called Taz brought Tur reason raising tefach diners look and puts eyes in it—demand siman 182 s.2 some meticulous do not grasp in hands but requires raising tefach—perhaps this when three look; unlike individual; from Tur puts eyes means blesser even individual raises tefach; Taz s.84 s.2; regarding glance glass no other b'dieved seems fine; if cannot drink revi'it measure to join as need say below if so Biur Halacha; perhaps do not take such cup siman 182 Taz s.8; four things Mechaber counts more see Netziv from this see there.`,
    "5:_": `From when blesser began Taz—and this before they took hands siman 179 Magen Avraham letter alef and Magen Avraham here letter yod from this.`,
    "6:_": `Say quietly Taz and siman 193 s.5 (Taz 193) appears hear until blessing Who sustains and intend not fulfill through him then begin from start birkat hamazon quietly Magen Avraham letter yod and Biur Halacha letter dalet.`,
  },
  "rabbi-akiva-eiger/part-001.txt": {
    "1:_": `Some say law like tefillah. Source Orach Chaim laws birkat hamazon letter 53 wrote like tefillah—what tefillah only in one place standing so birkat hamazon only seated unlike shema can say walking from upon your heart onward—end quote.`,
  },
  "shaarei-teshuvah/part-001.txt": {
    "1:_": `Cups Ba'er Heitev—and wrote Tiferet Shmuel in Hagahot Rosh though we do not practice adornment nevertheless do not do opposite and do not leave empty vessels on table at birkat hamazon; great ones careful in this see there; brought in Be'er Heitef.`,
    "8:_": `For his wife—see Ba'er Heitev reason so she be blessed; Perishah wrote Ba'er Heitev spread somewhat not drink between man and wife; brought in Acharonim.`,
  },
  "turei-zahav/part-001.txt": {
    "3:_": `After whole cup—this explains undiluted they said vessel defect is all while not broken.`,
    "4:א": `Receives with both hands etc.—heard reason from my master may he live bless to show affection receiving cup desiring receive with all strength then hold one hand so not appear burden; at least right is main more honored for cup.`,
    "4:ב": `And this specifically etc.—Tur wrote Gemara doubt left assist right means support with left—implies even not touching cup with left only supports right hand forbidden for support refers to cup masculine would be support it; from receive certainly on right hand forbidden support with left; Beit Yosef brought Shelah specifically hold entirely in left forbidden but assist left under right permitted for we hold assisting no substance; wonder we concluded stringently—appears only when grasps cup also in left; when not touching cup only right if left under to assist nothing; Beit Yosef and per this Rema Hagahah divides touching cup or hand; wonder how abandoned Tur view we drink his waters daily and rule unpublished posek—appears should not rely on this leniency all assistance forbidden; what challenged no substance assisting—no substance here certainly unlike melacha prohibition they forbade explicitly even without substance.`,
    "4:ג": `Called glance glass—in Hagahot Maharal Prague wrote some meticulous bless only wide cup not glance narrow mouth; perhaps relied Sukkah 49b Rava cup of blessing swallowed swallow Rashi large swallows manner of satiation affection mitzvah; Darkei Moshe brought Rema wrote appears reason must put eyes in cup cannot well in narrow mouth—both reasons weak in my view; Maharal reason no disqualification—we say there main satiation of wine in throat gathers much in mouth then little by little to throat possible in this cup too; only not take little swallow immediately much at once on throat; Rema reason wondrous—for Sages put eyes in it means cup not inside honored vessel itself as other things; proof Kiddushin 48 Teachers taught sanctify me with this cup—one taught in it and what is in it other in it not what is in it—no difficulty one water one wine; Rashi if wine in it wine not nullified to vessel therefore no combination; if say in this cup refers inside would say also there therefore on inside from language meaning—certainly contrary meaning only cup itself unless inside subordinate to vessel; here only Sages said put eyes certainly not on inside; Tur raises tefach from table reason visible to diners look and put eyes not lose concentration—if on inside diners cannot look only neighbor; certainly on cup; therefore not stringent look inside; Maharal language some meticulous not law; Rema makes disqualification—certainly not; Tur distraction from blessing depends seeing cup—appears since from Rema's mouth bless on other cup; if no other easily bless on this no disqualification at all in my view. I saw many do not fill cup leave empty above—unknown reason; on contrary Tur Rema seif 2 remember in this cup full on banks; some say included adornment crown above filling—not found any posek explains adornment so; even if adornment we hold not require adornment for us hold like R' Yehudah only four sign chameshah living full rinsing washing; adding some poskim from Tur nevertheless adornment not required—reason if very full spills disgraces as do not pass full cup over diners.`,
    "6:_": `From when blesser began—in this lenient for hearers from blesser—from blesser from giving cup; hearers need only from when blesser began.`,
    "7:_": `Say quietly—Rosh and Tur siman 59 Creator blessing and evening we say with congregation quietly for cannot constantly intend with shaliach tzibur in silence; even if intended shaliach tzibur words mid-blessing turned elsewhere lost intent interrupted mid; when speaks mouth even partial without intent fulfilled—end quote. Scandal common among us when blesser in zimmun blesses do not hear speak other matters transgress Torah mitzvah bless Hashem your God with satiety especially large feasts—very good not bless zimmun at all then each alone unlike now err think fulfill through blesser not hearing—certainly obligation each speak blessings quietly with blesser not come to Torah stumbling block; though early generations silent and intended bless nevertheless for lack intent practice so; wrote siman 193 s.1.`,
  },
};

const base = "output/siman_183";
let total = 0;
for (const [rel, blockFixes] of Object.entries(fixes)) {
  const fp = `${base}/${rel}`;
  const blocks = parseBlocksInFile(fs.readFileSync(fp, "utf8"));
  const out = blocks
    .map((b) => {
      const key = `${b.seif}:${b.marker || "_"}`;
      if (blockFixes[key]) return { ...b, en: blockFixes[key] };
      return b;
    })
    .map(serializeBlock)
    .join("\n\n");
  fs.writeFileSync(fp, out);
  total += Object.keys(blockFixes).length;
}
console.log("fixed", total);
