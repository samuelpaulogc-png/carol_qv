const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict');
const copy=()=>{let n,s='';const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{
const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const mode=process.argv[2]||'after';const report=[];
const ref=await b.newPage();await ref.goto('http://localhost:5501/audit-visual/section-pain/before.html');const original=await ref.evaluate(copy);await ref.close();
for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
const p=await b.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:5501/'+(process.argv[3]||''),{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);assert.equal(await p.evaluate(copy),original,'Preserve all page text');
const el=p.locator('.pain-diagnostic');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(900);
await el.screenshot({path:`audit-visual/section-pain/${mode}-${name}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
const m=await p.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,questions:document.querySelectorAll('.pain-question-card').length,emptyImageVisible:getComputedStyle(document.querySelector('.pain-diagnostic-visual')).display!=='none',height:document.querySelector('.pain-diagnostic').offsetHeight}));
assert.equal(m.scrollWidth,m.clientWidth);assert.equal(m.questions,5);assert.deepEqual(errors,[]);
if(mode==='fullwidth'){
const bounds=await p.evaluate(()=>{
const panel=document.querySelector('.pain-diagnostic').getBoundingClientRect();
const intro=document.querySelector('.pain-sub').getBoundingClientRect();
const media=document.querySelector('.pain-diagnostic-visual').getBoundingClientRect();
return {panelLeft:panel.left,panelRight:panel.right,textLeft:intro.left,textRight:intro.right,imageWidth:media.width};
});
if(width<=760){assert.equal(bounds.panelLeft,0);assert.equal(bounds.panelRight,width);assert.equal(bounds.textLeft,24);assert.equal(bounds.textRight,width-24);assert.equal(bounds.imageWidth,width);}
m.bounds=bounds;
await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
}
if(mode==='after'){
assert(!m.emptyImageVisible);await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
}
report.push({name,textUnchanged:true,...m,errors});console.log(name,JSON.stringify(m));await p.close();
}
fs.writeFileSync(`audit-visual/section-pain/${mode}-validation.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
