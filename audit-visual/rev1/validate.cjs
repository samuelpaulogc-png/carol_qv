const {chromium}=require(process.env.TEMP+'\\gancho-validation\\node_modules\\playwright-core');
const fs=require('fs');
const assert=require('assert/strict');
const extract=()=>{
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node,parts=[];
  while(node=walker.nextNode()) if(!node.parentElement.closest('script,style')) parts.push(node.textContent);
  return parts.join('').replace(/\s+/g,' ').trim();
};
(async()=>{
  const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true});
  const report=[];
  const baseline=await browser.newPage();
  await baseline.goto('http://localhost:5501/audit-visual/rev1/before.html');
  const originalText=await baseline.evaluate(extract);await baseline.close();
  for(const [name,width,height] of [['desktop',1440,1000],['mobile',375,812],['tablet',768,1024]]){
    const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1,isMobile:name==='mobile',hasTouch:name==='mobile'});
    const errors=[],badResponses=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('response',r=>{if(r.status()>=400)badResponses.push({url:r.url(),status:r.status()})});
    await page.goto('http://localhost:5501/',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(1100);
    const currentText=await page.evaluate(extract);
    if(currentText!==originalText){fs.writeFileSync('audit-visual/rev1/text-before.txt',originalText);fs.writeFileSync('audit-visual/rev1/text-after.txt',currentText);}
    assert.equal(currentText,originalText,'Page copy must remain identical');
    await page.screenshot({path:`audit-visual/rev1/${name}-hero.png`});
    for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(65);}
    await page.waitForTimeout(800);
    if(name!=='tablet'){
      for(const [label,selector] of [['pain','.pain'],['map','#mapa'],['carol','.sec-who'],['offer','#oferta']]){
        const el=page.locator(selector);await el.scrollIntoViewIfNeeded();await page.waitForTimeout(800);
        await el.screenshot({path:`audit-visual/rev1/${name}-${label}.png`});
      }
    }
    await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);
    const heroButton=page.locator('.hero-cta-slot .btn');
    const initialDock=await page.locator('.btn.is-docked').count();
    let sticky=null;
    if(name==='mobile'){
      const cutoff=await page.locator('.map-stage').evaluate(e=>e.getBoundingClientRect().top+scrollY);
      await page.evaluate(y=>window.scrollTo(0,y),cutoff);await page.waitForTimeout(200);
      sticky=await page.locator('.btn.is-docked').evaluate(e=>({text:e.textContent,href:e.getAttribute('href'),position:getComputedStyle(e).position,rect:{top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom,width:e.getBoundingClientRect().width}}));
      assert.equal(sticky.position,'fixed');assert(sticky.rect.bottom<=height);assert(sticky.rect.top>=0);
      await page.screenshot({path:'audit-visual/rev1/mobile-sticky.png'});
      await page.locator('.btn.is-docked').click();await page.waitForTimeout(1000);
      assert.equal(new URL(page.url()).hash,'#oferta');
      await page.locator('.offer-purchase').scrollIntoViewIfNeeded();await page.waitForTimeout(200);
      assert.equal(await page.locator('.btn.is-docked').count(),0,'Dock is suppressed at purchase panel');
      await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(200);
      assert.equal(await heroButton.count(),1,'Original CTA returns to its place');
    }
    await page.locator('.faq summary').first().click();assert(await page.locator('.faq').first().evaluate(e=>e.open));
    const overflow=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
    assert.equal(overflow.scrollWidth,overflow.clientWidth,'No page overflow');
    const imageStatus=await page.locator('img').evaluateAll(images=>images.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0})));
    assert(imageStatus.every(i=>i.loaded),'All supplied photos load');
    const playTabIndex=await page.locator('.play').evaluate(e=>e.tabIndex);assert.equal(playTabIndex,0);
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
    const reduced=await page.evaluate(()=>({hiddenReveals:[...document.querySelectorAll('.reveal')].filter(e=>getComputedStyle(e).opacity==='0').length,marquee:getComputedStyle(document.querySelector('.marquee')).animationName,ecgOffset:getComputedStyle(document.querySelector('.hero-ecg path')).strokeDashoffset,svgs:[...document.querySelectorAll('svg:has(animateMotion)')].map(e=>e.animationsPaused())}));
    assert.equal(reduced.hiddenReveals,0);assert.equal(reduced.marquee,'none');assert.equal(reduced.ecgOffset,'0px');assert(reduced.svgs.every(Boolean));
    assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);
    report.push({name,width,height,textUnchanged:true,initialDock,sticky,overflow,imageStatus,reduced,errors,badResponses});
    console.log(name,'PASS');await page.close();
  }
  fs.writeFileSync('audit-visual/rev1/validation.json',JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
