const fs=require('fs'),path=require('path');
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const j=JSON.parse(fs.readFileSync('C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json','utf8'));
const base='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

function hebrewNumeral(s){
  s=s.replace(/['"״׳'\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;for(const c of s)n+=v[c]||0;return n;
}

function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}

// Parse abbreviated seif labels: סעי' X, סעי X (no apostrophe)
// Does NOT match סעיף (that was handled by Phase 1/2)
function parseAbbrevSeif(entry){
  // Match <small>סעי' X</small> or <small>סעי X</small>
  const m=entry.match(/<small>([\s\S]*?)<\/small>/);
  if(!m) return null;
  const label=m[1].trim();
  // Must start with סעי' or סעי (but NOT סעיף — that was Phase1)
  if(!/^סעי[^ף]/.test(label)&&!/^סעי'/.test(label)) return null;
  const numPart=label.replace(/^סעי['׳]?\s*/,'').trim().split(/[\s,]/)[0];
  const n=hebrewNumeral(numPart);
  return n||null;
}

// Extract siman/seif cross-references from HE text (numbers like ש"א = 301, י"ב = 12)
function extractRefs(heText){
  const refs=[];
  // Siman refs: סי' followed by Hebrew numeral
  const simanMatches=heText.matchAll(/סי['"']?\s*([א-ת"'״׳]+)/g);
  for(const m of simanMatches){
    const n=hebrewNumeral(m[1]);
    if(n>0) refs.push('siman'+n);
  }
  // Seif refs: סעי' / ס"ק followed by numeral
  const seifMatches=heText.matchAll(/[סס]["']?[קעי]["']?\s*([א-ת"'״׳]+)/g);
  for(const m of seifMatches){
    const n=hebrewNumeral(m[1]);
    if(n>0) refs.push('sk'+n);
  }
  return refs;
}

// Contextual match score: check EN mentions same refs as HE
function contextScore(heText, enText){
  const heStripped=strip(heText);
  const enStripped=strip(enText).toLowerCase();
  const signals=[];
  let matches=0, total=0;

  // 1. Seif label in HE -> does EN mention the seif number?
  const seifM=heStripped.match(/^סעי['"']?\s*([א-ת"'״׳]+)/);
  if(seifM){
    const seifN=hebrewNumeral(seifM[1].split(/[\s,]/)[0]);
    total++;
    const enMentionsSeif=new RegExp('seif\\s*'+seifN+'|s"'+seifN+'|§'+seifN,'i').test(enStripped)||
      enStripped.includes('seif '+seifN)||enStripped.includes(seifN+' ');
    if(enMentionsSeif){matches++;signals.push('seif_number_match('+seifN+')');}
    else signals.push('seif_number_MISMATCH(HE_says_'+seifN+')');
  }

  // 2. Siman cross-references in HE -> appear in EN as numbers?
  const heRefs=extractRefs(heStripped);
  const simanRefs=heRefs.filter(r=>r.startsWith('siman')).slice(0,3);
  for(const ref of simanRefs){
    const n=parseInt(ref.replace('siman',''));
    total++;
    if(enStripped.includes(String(n))){matches++;signals.push('siman_ref_match('+n+')');}
    else signals.push('siman_ref_MISS('+n+')');
  }

  // 3. Known commentator abbreviations: מג"א→Magen, ט"ז→Taz, ב"י→Beit Yosef, ר"מ→Rambam
  const heComm={
    'מג"א':'magen','ט"ז':'taz','ב"י':'beit yosef','רמב"ם':'rambam',
    'בה"ג':'beer hagolah','א"ר':'eliyah rabbah','ב"ח':'bach','ש"ע':'shulchan'
  };
  for(const [heName,enKeyword] of Object.entries(heComm)){
    if(heStripped.includes(heName)){
      total++;
      if(enStripped.includes(enKeyword)){matches++;signals.push('commentator_match('+enKeyword+')');}
      else signals.push('commentator_MISS('+heName+'->'+enKeyword+')');
    }
  }

  // 4. Key talmudic tractate names: בברכות/פסחים/שבת etc.
  const tractates={
    'ברכות':'berachot','פסחים':'pesachim','שבת':'shabbat','יומא':'yoma',
    'נדה':'niddah','חולין':'chullin','בבא בתרא':'bava batra'
  };
  for(const [he,en] of Object.entries(tractates)){
    if(heStripped.includes(he)){
      total++;
      if(enStripped.includes(en)){matches++;signals.push('tractate_match('+en+')');}
      else signals.push('tractate_MISS('+he+')');
    }
  }

  const score=total>0?Math.round(matches/total*100):0;
  return {score,matches,total,signals};
}

// Find all entries with abbreviated seif labels across all simanim
let found=0, validated=0, mismatched=0;
const issues=[];

for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim))continue;
  for(let se=0;se<seifim.length;se++){
    const entry=seifim[se];
    if(typeof entry!=='string'||!entry.trim())continue;
    const correctN=parseAbbrevSeif(entry);
    if(!correctN)continue;
    const currentN=se+1;
    if(currentN===correctN)continue;

    found++;
    const simanDir=path.join(base,'siman'+(si+1));
    const wrongHePath=path.join(simanDir,seifPad(currentN),'rabbi-akiva-eiger','he.html');
    const phantomEnPath=path.join(simanDir,seifPad(correctN),'rabbi-akiva-eiger','en.html');

    if(!fs.existsSync(wrongHePath))continue;
    const heContent=fs.readFileSync(wrongHePath,'utf8');
    const heSegs=brSegs(heContent);
    if(!heSegs.length)continue;

    if(!fs.existsSync(phantomEnPath))continue;
    const enContent=fs.readFileSync(phantomEnPath,'utf8');
    const enSegs=brSegs(enContent);
    if(!enSegs.length)continue;

    // Check phantom is really a phantom (no HE at correct seif)
    const correctHePath=path.join(simanDir,seifPad(correctN),'rabbi-akiva-eiger','he.html');
    const correctHeSegs=fs.existsSync(correctHePath)?brSegs(fs.readFileSync(correctHePath,'utf8')):[];

    validated++;
    const {score,matches,total,signals}=contextScore(heSegs[0],enSegs[0]);
    const hePreview=strip(heSegs[0]).slice(0,80);
    const enPreview=strip(enSegs[0]).slice(0,80);
    const phantom=!correctHeSegs.length;
    const verdict=score>=50?'OK':'MISMATCH';
    if(verdict==='MISMATCH') mismatched++;

    console.log((verdict==='MISMATCH'?'[MISMATCH] ':'[OK]      ')+
      's'+(si+1)+' seif'+currentN+'->seif'+correctN+
      ' (phantom:'+phantom+', score:'+score+'% '+matches+'/'+total+')');
    console.log('  HE: '+hePreview);
    console.log('  EN: '+enPreview);
    console.log('  signals: '+signals.join(', '));
    if(issues.length<20&&verdict==='MISMATCH') issues.push({si:si+1,currentN,correctN,hePreview,enPreview,signals});
    console.log();
  }
}

console.log('=== SUMMARY ===');
console.log('Abbreviated-seif entries found in JSON: '+found);
console.log('Validated (HE at wrong, phantom EN at correct): '+validated);
console.log('OK (score>=50%): '+(validated-mismatched));
console.log('MISMATCH (score<50%): '+mismatched);
