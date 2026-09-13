const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/map-refinement';
const copy=()=>{let n,s='';const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
(async()=>{
const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
const mode=process.argv[2]||'after',report=[];
for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
const p=await b.newPage({viewport:{width,height}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const text=await p.evaluate(copy);if(mode==='before')fs.writeFileSync(`${dir}/${name}-copy.txt`,text);else assert.equal(text,fs.readFileSync(`${dir}/${name}-copy.txt`,'utf8'));
const section=p.locator('#mapa');for(const el of await section.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(160);}await p.waitForTimeout(700);
await section.screenshot({path:`${dir}/${mode}-${name}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
const m=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:document.querySelector('#mapa').offsetHeight,nodes:document.querySelectorAll('#mapa .node').length}));
assert.equal(m.width,m.scrollWidth);assert.equal(m.nodes,6);assert.deepEqual(errors,[]);
if(name==='desktop'&&mode==='before')console.log(await section.innerHTML());
if(mode==='after'){
await p.emulateMedia({reducedMotion:'reduce'});for(const el of await section.locator('.reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
const cta=section.getByRole('link',{name:'QUERO DESCOBRIR',exact:true});await cta.focus();assert.equal(await cta.evaluate(el=>getComputedStyle(el).outlineStyle),'solid');await cta.click();await p.waitForTimeout(200);assert.equal(new URL(p.url()).hash,'#oferta');
}
report.push({name,...m,textUnchanged:true,errors});console.log(name,JSON.stringify(m));await p.close();
}
fs.writeFileSync(`${dir}/${mode}-validation.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
