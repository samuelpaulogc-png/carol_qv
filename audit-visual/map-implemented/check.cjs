const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs'),assert=require('assert/strict'),dir='audit-visual/map-implemented';
const copy=()=>{let n,s='';const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(n=w.nextNode())if(!n.parentElement.closest('style,script'))s+=n.textContent;return s.replace(/\s+/g,' ').trim()};
const layout=()=>['.wrap','.sec-head','.map-stage','.ecg-track','.map-reflection','.map-outcome','.map-action'].map(selector=>{const root=document.querySelector('#mapa'),el=root.querySelector(selector),r=el.getBoundingClientRect(),base=root.getBoundingClientRect();return {selector,x:Math.round(r.x),y:Math.round(r.y-base.y),width:Math.round(r.width),height:Math.round(r.height)}});
(async()=>{
 const b=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true}),report=[];
 for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
  const p=await b.newPage({viewport:{width,height},reducedMotion:'reduce'}),errors=[],failed=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://localhost:5501/'))failed.push(r.url())});
  await p.goto('http://localhost:5501/audit-visual/map-options/integrated.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  const expected=await p.evaluate(layout),original=await p.evaluate(copy);
  await p.goto('http://localhost:5501/',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
  assert.equal(await p.evaluate(copy),original);assert.deepEqual(await p.evaluate(layout),expected);
  const section=p.locator('#mapa');
  await p.emulateMedia({reducedMotion:'no-preference'});
  for(const el of await section.locator('.reveal').all()){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(170)}await p.waitForTimeout(700);
  for(const el of await section.locator('.reveal').all())assert.equal(await el.evaluate(e=>getComputedStyle(e).opacity),'1');
  await section.screenshot({path:`${dir}/${name}.png`,style:'.topbar,.btn.is-docked{visibility:hidden!important}'});
  const metrics=await p.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,nodes:document.querySelectorAll('#mapa .node').length}));
  assert.equal(metrics.width,metrics.scrollWidth);assert.equal(metrics.nodes,6);assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  await p.emulateMedia({reducedMotion:'reduce'});
  const cta=section.getByRole('link',{name:'QUERO DESCOBRIR',exact:true});await cta.focus();assert.equal(await cta.evaluate(e=>getComputedStyle(e).outlineStyle),'solid');await cta.click();assert.equal(new URL(p.url()).hash,'#oferta');
  report.push({name,...metrics,copyPreserved:true,matchesApprovedLayout:true,errors,failed});console.log(JSON.stringify(report.at(-1)));await p.close();
 }
 fs.writeFileSync(`${dir}/validation.json`,JSON.stringify(report,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
