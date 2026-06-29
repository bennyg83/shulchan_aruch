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

// Parse seif label from HE content
function parseSeifLabel(heContent){
  if(!heContent) return null;
  const segs=brSegs(heContent);
  if(!segs.length) return null;
  const m=segs[0].match(/<small>([\s\S]*?)<\/small>/);
  if(!m) return null;
  const label=m[1].trim();
  if(!/^סעיף/.test(label)) return null;
  const seifStr=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
  const n=hebrewNumeral(seifStr);
  return n||null;
}

const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

const chains=[], merges=[];

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
    const wrongContent=fs.readFileSync(wrongHe,'utf8');
    const correctContent=fs.readFileSync(correctHe,'utf8');
    if(!brSegs(wrongContent).length||!brSegs(correctContent).length)continue;

    // Does the correct seif's occupant ALSO have a seif label pointing elsewhere?
    const correctSeifTarget=parseSeifLabel(correctContent);
    const correctStrip=strip(correctContent).slice(0,100);
    const wrongStrip=strip(wrongContent).slice(0,100);

    if(correctSeifTarget && correctSeifTarget!==correctN){
      chains.push({si:si+1,currentN,correctN,label,
        correctOccupantTarget:correctSeifTarget,
        wrongTxt:wrongStrip,correctTxt:correctStrip});
    } else {
      merges.push({si:si+1,currentN,correctN,label,
        wrongTxt:wrongStrip,correctTxt:correctStrip});
    }
  }
}

console.log('=== CONFLICT BREAKDOWN ===');
console.log('Chain conflicts (correct seif occupant also needs to move):',chains.length);
console.log('Merge conflicts (both belong at same seif, combine segments):',merges.length);

console.log('\n--- CHAIN samples ---');
chains.slice(0,8).forEach(e=>console.log(
  's'+e.si+' seif'+e.currentN+'->seif'+e.correctN+', but seif'+e.correctN+' occupant->seif'+e.correctOccupantTarget
  +'\n  Moving:   '+e.wrongTxt
  +'\n  Blocking: '+e.correctTxt));

console.log('\n--- MERGE samples (two notes, same seif) ---');
merges.slice(0,8).forEach(e=>console.log(
  's'+e.si+' seif'+e.currentN+'->seif'+e.correctN
  +'\n  Note A (to move): '+e.wrongTxt
  +'\n  Note B (already there): '+e.correctTxt));
