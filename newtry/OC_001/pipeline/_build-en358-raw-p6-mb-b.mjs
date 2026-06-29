import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const dir = path.dirname(fileURLToPath(import.meta.url));

export const mbB = {
  "mishnah-berurah:8:א": `(56) Does not help — already enclosed; extra on top ineffective:`,
  "mishnah-berurah:8:ב": `(57) Lower swallowed — soft earth, wall less than ten high remained:`,
  "mishnah-berurah:8:ג": `(58) Permitted by them — made for dwelling from start, ineffective until lower gone; now upper permits karpef:`,
  "mishnah-berurah:8:ד": `(59) Made partitions — to dwell on tel:`,
  "mishnah-berurah:8:ה": `(60) Even on edge — not only distanced three from tel edge — certainly helps, as seif 6:`,
  "mishnah-berurah:8:ו": `(61) Helps — though tel ten+ self-enclosed, dwells above not below — upper partitions help, lower do not; dwells in airspace of new partitions:`,
  "mishnah-berurah:8:ז": `(62) Airspace of partitions — one partition for dwelling suffices; other three from tel ten high seif 3; partition need not span entire tel width — ten+ length for dwelling enough, as seif 16:`,
  "mishnah-berurah:9:א": `(63) Planted most — all trees same law:`,
  "mishnah-berurah:9:ב": `(64) Row by row — unless mixed:`,
  "mishnah-berurah:9:ג": `(65) Do not cancel dwelling — people plant trees in courtyards for shade:`,
  "mishnah-berurah:9:ד": `(66) Seeds cancel dwelling — people do not dwell in crops — becomes garden; forbidden even unsown part nullified to majority like all sown:`,
  "mishnah-berurah:9:ה": `(67) Even only beit se'ah — sown area; beit se'ah needs no enclosure, still forbidden — minority nullified to majority, whole more than beit se'ah:`,
  "mishnah-berurah:9:ו": `(68) Only beit se'ah — same less, majority with minority exceeds beit se'ah:`,
  "mishnah-berurah:9:ז": `(69) Minority sown — appears half-half same:`,
  "mishnah-berurah:9:ח": `(70) If only — in sown place:`,
  "mishnah-berurah:9:ט": `(71) Permitted — minority cannot nullify majority enclosed for dwelling; minority itself permitted — less than beit se'ah needs no enclosure:`,
  "mishnah-berurah:9:י": `(72) More than beit se'ah forbidden — entire karpef; minority forbidden if more than beit se'ah without enclosure; seeds cancel dwelling partition; majority also forbidden as open to forbidden sown area:`,
  "mishnah-berurah:10:א": `(73) One with garden, etc. — repeated for courtyard: seeds cancel courtyard partitions like karpef; not say courtyard more significant; added laws courtyard-house movement:`,
  "mishnah-berurah:10:ב": `(74) Even only — entire courtyard:`,
  "mishnah-berurah:10:ג": `(75) Only beit se'ah — or less:`,
  "mishnah-berurah:10:ד": `(76) May not move, etc. — courtyard itself permitted throughout even sown part — less than beit se'ah needs no enclosure:`,
  "mishnah-berurah:10:ה": `(77) From it and courtyard — dwelling canceled — all courtyard like karpef forbidden to house; even karpef less than beit se'ah one owner:`,
  "mishnah-berurah:10:ו": `(78) If more, etc. — entire courtyard:`,
  "mishnah-berurah:10:ז": `(79) Only four amot — karmelit law; majority seeds canceled courtyard dwelling seif 9:`,
  "mishnah-berurah:10:ח": `(80) What is in it more — in sown portion:`,
  "mishnah-berurah:10:ט": `(81) Forbids entire courtyard — majority garden, seeds cancel for sown part; courtyard forbidden as breached to forbidden sown area:`,
  "mishnah-berurah:10:י": `(82) Forbidden to remove — sown part permitted internally seif 9; forbidden sown to house like unenclosed karpef:`,
  "mishnah-berurah:10:כ": `(83) From it — implies courtyard to house permitted when beit se'ah measure; some forbid courtyard to house — garden forbidden place, courtyard breached to garden; lenient if seeds less than beit se'ah; pressure permit garden-house both ways; no fence between — separate domains; with fence: courtyard permitted house; sown part alone: if more than beit se'ah karmelit forbidden; beit se'ah or less permitted internally and with courtyard, not house objects; do not eat in garden Shabbat; more than beit se'ah forbidden four amot:`,
  "mishnah-berurah:11:א": `(84) Water entered — standing water in karpef:`,
  "mishnah-berurah:11:ב": `(85) Fit for drinking — human drinking; some lenient laundry etc.:`,
  "mishnah-berurah:11:ג": `(86) Do not cancel dwelling — superior dwelling:`,
  "mishnah-berurah:11:ד": `(87) More than beit se'ah spread — large pool common; Tur: even entire courtyard filled permitted:`,
  "mishnah-berurah:11:ה": `(88) Not fit for drinking — not for drinking or laundry, very murky:`,
  "mishnah-berurah:11:ו": `(89) Law like seeds — majority spread all forbidden even less than beit se'ah; minority more than beit se'ah all forbidden; Acharonim: unless edge not ten deep and not ten collected in four amot walking — water walls partition — forbidden only water area; Biur Halacha:`,
  "mishnah-berurah:11:ז": `(90) Provided depth ten — less than ten like mud without domain division:`,
  "mishnah-berurah:12:א": `(91) Permitted — roof mouth descends and seals — only one se'ah roofed remains beit se'ah:`,
  "mishnah-berurah:12:ב": `(92) Even slanted roof — our slanted roofs; mouth descends and seals; siman 361:2 slanted mouth not always descending — here karpef Torah reshut ha-yachid, Sages decreed more than beit se'ah — lenient slanted mouth here, unlike breach seif 361:`,
  "mishnah-berurah:13:א": `(93) Exactly — not enclosed for dwelling:`,
  "mishnah-berurah:13:ב": `(94) Breached fully each other — wording unclear: if both fully breached both forbidden open to forbidden karpef; deals courtyard wider, projections remain — courtyard permitted not fully breached; breach not more than ten amot — more than ten even with projections both forbidden as breach not doorway:`,
  "mishnah-berurah:13:ג": `(95) Partition place adds — permitted courtyard air does not add; partition place not in courtyard joined karpef exceeds beit se'ah:`,
  "mishnah-berurah:13:ד": `(96) Becomes more than beit se'ah — karpef walls inside courtyard hollow, or courtyard side walls wider than karpef four amot — else not full breach:`,
  "mishnah-berurah:14:א": `(97) Opened door, etc. — source: three walls at house end, fourth house wall with door after three walls; opened door after three walls ineffective; new inner partition after opening permits; partition also had door for use inside:`,
  "mishnah-berurah:14:ב": `(98) Partition before it — inside; distanced three from house wall seif 6:`,
  "mishnah-berurah:14:ג": `(99) More than ten — seif 6 measure; see Biur Halacha:`,
  "mishnah-berurah:14:ד": `(100) Then fell — intentional demolition for old partition also ineffective:`,
  "mishnah-berurah:14:ה": `(101) Returns to prohibition — not permanent permit once; poskim: if karpef side is house wall, open-then-enclose, wall fell — forbidden though inner room walls remain — inner partitions for rooms not for karpef:`,
};

const existing = JSON.parse(fs.readFileSync(path.join(dir, "_en358-small-raw.json"), "utf8"));
fs.writeFileSync(path.join(dir, "_en358-small-raw.json"), JSON.stringify({ ...existing, ...mbB }, null, 2));
console.log("mbB", Object.keys(mbB).length, "total", Object.keys({ ...existing, ...mbB }).length);
