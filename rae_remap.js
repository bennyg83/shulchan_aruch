const fs=require('fs'),path=require('path');

const jsonPath='C:/Users/binya/Documents/Shulchan aruch/Sefaria Pulls/shulchan-arukh/Orach_Chayim/commentaries/Rabbi_Akiva_Eiger_on_Shulchan_Arukh,_Orach_Chayim/merged.json';
const corpusBase='C:/Users/binya/Documents/Shulchan aruch/newtry/OC_Mobile/oc318-mobile-reader/public/corpus/oc1';

const DRY_RUN = process.argv.includes('--dry');

function hebrewNumeral(s){
  s=s.replace(/['"״׳\s]/g,'').trim();
  const v={'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,'ק':100,
    'ר':200,'ש':300,'ת':400};
  let n=0;
  for(const c of s) n+=v[c]||0;
  return n;
}

function seifPad(n){return 'seif-'+String(n).padStart(3,'0');}
function brSegs(h){return h.split(/<br\s*\/?>/).filter(s=>s.trim());}
function safeWrite(p,content){const tmp=p+'.tmp';fs.writeFileSync(tmp,content,'utf8');fs.renameSync(tmp,p);}

const j=JSON.parse(fs.readFileSync(jsonPath,'utf8'));

let moved=0,alreadyCorrect=0,parseFail=0,noWrongHe=0,conflict=0;
const log=[];

for(let si=0;si<j.text.length;si++){
  const seifim=j.text[si];
  if(!Array.isArray(seifim)) continue;
  for(let se=0;se<seifim.length;se++){
    const t=seifim[se];
    if(typeof t!=='string'||!t.trim()) continue;
    const smallM=t.match(/<small>([\s\S]*?)<\/small>/);
    if(!smallM) continue;
    const label=smallM[1].trim();
    if(!/^סעיף/.test(label)) continue;

    const seifStr=label.replace(/^סעיף\s*/,'').trim().split(/\s/)[0];
    const correctN=hebrewNumeral(seifStr);
    if(!correctN){parseFail++;log.push('PARSE_FAIL s'+(si+1)+' se'+(se+1)+': ['+label+']');continue;}

    const currentN=se+1;
    if(currentN===correctN){alreadyCorrect++;continue;}

    const simanDir=path.join(corpusBase,'siman'+(si+1));
    if(!fs.existsSync(simanDir)) continue;

    const wrongDir=path.join(simanDir,seifPad(currentN),'rabbi-akiva-eiger');
    const correctDir=path.join(simanDir,seifPad(correctN),'rabbi-akiva-eiger');

    const wrongHe=path.join(wrongDir,'he.html');
    const wrongEn=path.join(wrongDir,'en.html');
    if(!fs.existsSync(wrongHe)){noWrongHe++;continue;}

    const wrongHeContent=fs.readFileSync(wrongHe,'utf8');
    if(!brSegs(wrongHeContent).length){noWrongHe++;continue;}

    const correctHe=path.join(correctDir,'he.html');
    const correctEn=path.join(correctDir,'en.html');

    // Check for conflict: correct seif already has real HE
    if(fs.existsSync(correctHe)&&brSegs(fs.readFileSync(correctHe,'utf8')).length>0){
      conflict++;
      log.push('CONFLICT s'+(si+1)+' '+seifPad(currentN)+'->'+seifPad(correctN)+' ['+label+']');
      continue;
    }

    const wrongEnContent=fs.existsSync(wrongEn)?fs.readFileSync(wrongEn,'utf8'):'';
    const correctEnContent=fs.existsSync(correctEn)?fs.readFileSync(correctEn,'utf8'):'';
    const correctEnHasContent=brSegs(correctEnContent).length>0;

    log.push((DRY_RUN?'DRY ':'')+'MOVE s'+(si+1)+' '+seifPad(currentN)+'->'+seifPad(correctN)
      +' ['+label+'] en:'+(correctEnHasContent?'keep-phantom':'move-from-wrong'));

    if(!DRY_RUN){
      fs.mkdirSync(correctDir,{recursive:true});
      safeWrite(correctHe,wrongHeContent);
      // EN: prefer existing phantom EN at correct seif; if none, move from wrong seif
      if(!correctEnHasContent&&wrongEnContent){
        safeWrite(correctEn,wrongEnContent);
      }
      // Remove wrong seif files
      fs.unlinkSync(wrongHe);
      if(fs.existsSync(wrongEn)) fs.unlinkSync(wrongEn);
      try{fs.rmdirSync(wrongDir);}catch(e){}
    }
    moved++;
  }
}

console.log('=== RAE SEIF REMAP ('+(DRY_RUN?'DRY RUN':'LIVE')+') ===');
console.log('Would move / Moved:',moved);
console.log('Already correct (no change):',alreadyCorrect);
console.log('No HE in corpus (skip):',noWrongHe);
console.log('Parse fail:',parseFail);
console.log('Conflicts (correct seif already has HE):',conflict);
console.log();
log.slice(0,40).forEach(l=>console.log(l));
if(log.length>40) console.log('...('+(log.length-40)+' more lines)');
