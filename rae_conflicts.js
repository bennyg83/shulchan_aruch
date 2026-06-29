const fs=require('fs'),path=require('path');

const jsonPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const corpusBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

function hebrewNumeral(s){
  s=s.replace(/['"״׳\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;for(const c of s)n+=v[c]||0;return n;
}
function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function strip(h){return h.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();}

const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

// Classify conflicts
const same=[], wrongHasSeifLabel=[], correctLooksRight=[], other=[];

for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim))continue;
  for(let se=0;se<seifim.length;se++){
    const t=seifim[se];
    if(typeof t!=='string'||!t.trim())continue;
    const smallM=t.match(/<small>([\s\S]*?)<\/small>/);
    if(!smallM)continue;
    const label=smallM[1].trim();
    if(!/^סעיף/.test(label))continue;
    const seifStr=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
    const correctN=hebrewNumeral(seifStr);
    if(!correctN)continue;
    const currentN=se+1;
    if(currentN===correctN)continue;

    const simanDir=path.join(corpusBase,'siman'+(si+1));
    if(!fs.existsSync(simanDir))continue;
    const wrongHe=path.join(simanDir,seifPad(currentN),'rabbi-akiva-eiger','he.html');
    const correctHe=path.join(simanDir,seifPad(correctN),'rabbi-akiva-eiger','he.html');
    if(!fs.existsSync(wrongHe)||!fs.existsSync(correctHe))continue;
    const wrongSegs=brSegs(fs.readFileSync(wrongHe,'utf8'));
    const correctSegs=brSegs(fs.readFileSync(correctHe,'utf8'));
    if(!wrongSegs.length||!correctSegs.length)continue;

    const wrongTxt=strip(wrongSegs[0]).slice(0,120);
    const correctTxt=strip(correctSegs[0]).slice(0,120);

    // Check if wrong entry also has explicit seif label pointing elsewhere
    const wrongSmall=wrongSegs[0].match(/<small>([\s\S]*?)<\/small>/);
    const wrongLabel=wrongSmall?wrongSmall[1].trim():'';

    // Are they the same content?
    const similarity=wrongTxt.slice(0,40)===correctTxt.slice(0,40);

    const entry={si:si+1,currentN,correctN,label,wrongTxt,correctTxt,wrongLabel};

    if(similarity){
      same.push(entry);
    } else if(/^סעיף/.test(wrongLabel)){
      wrongHasSeifLabel.push(entry);
    } else {
      other.push(entry);
    }
  }
}

console.log('=== CONFLICT ANALYSIS ===');
console.log('Same content (duplicate at correct seif):',same.length);
console.log('Wrong seif also has explicit seif label:',wrongHasSeifLabel.length);
console.log('Other (different content, needs review):',other.length);
console.log('Total:',same.length+wrongHasSeifLabel.length+other.length);

console.log('\n--- SAME CONTENT samples (safe to delete wrong seif) ---');
same.slice(0,5).forEach(e=>console.log(
  's'+e.si+' wrong=seif'+e.currentN+'->correct=seif'+e.correctN+' ['+e.label+']\n  Wrong:  '+e.wrongTxt+'\n  Correct:'+e.correctTxt));

console.log('\n--- WRONG SEIF HAS SEIF LABEL (remap chain?) ---');
wrongHasSeifLabel.slice(0,5).forEach(e=>console.log(
  's'+e.si+' wrong=seif'+e.currentN+'->correct=seif'+e.correctN+' ['+e.label+']\n  WrongLabel:['+e.wrongLabel+']\n  Wrong:  '+e.wrongTxt+'\n  Correct:'+e.correctTxt));

console.log('\n--- OTHER (different content, both seifim have unique content) ---');
other.slice(0,10).forEach(e=>console.log(
  's'+e.si+' wrong=seif'+e.currentN+'->correct=seif'+e.correctN+' ['+e.label+']\n  Wrong:  '+e.wrongTxt+'\n  Correct:'+e.correctTxt));
