const root=process.cwd();const fs=require('node:fs'),assert=require('node:assert/strict');
const {chromium}=require(root+'/node_modules/playwright');
const output=process.env.CRO_SCREENSHOT_DIR || root+'/artifacts/cro-visual-kit';
const origin=process.env.CRO_PREVIEW_URL || 'http://127.0.0.1:3215';
const money=value=>new Intl.NumberFormat('tr-TR',{style:'currency',currency:'TRY',maximumFractionDigits:2}).format(value);
fs.mkdirSync(output,{recursive:true});
const themeLabel={dark:'Koyu',light:'Açık',system:'Sistem'};
async function selectTheme(page,mode){await page.getByRole('button',{name:'Görünüm seçin',exact:true}).click();await page.getByRole('menuitemradio',{name:themeLabel[mode],exact:true}).click();}
async function assertTheme(page,mode){await page.getByRole('button',{name:'Görünüm seçin',exact:true}).click();assert.equal(await page.getByRole('menuitemradio',{name:themeLabel[mode],exact:true}).getAttribute('aria-checked'),'true');await page.keyboard.press('Escape');}
(async()=>{const browser=await chromium.launch({headless:true});const results=[];try{
 for(const width of [360,390,430,1440])for(const theme of ['dark','light']){
  const context=await browser.newContext({viewport:{width,height:width<768?844:1000},colorScheme:theme,reducedMotion:'reduce',isMobile:width<768,hasTouch:width<768});
  await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());await context.addInitScript(()=>{window.__croLayoutShift=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__croLayoutShift+=e.value;}).observe({type:'layout-shift',buffered:true});});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(origin,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);
  await page.waitForFunction(()=>document.documentElement.dataset.theme==='light');await selectTheme(page,theme);await page.waitForFunction(t=>document.documentElement.dataset.theme===t,theme);await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('.cro-needs-grid article').count(),4);assert.equal(await page.locator('.cro-need-visual svg').count(),4);assert.equal(await page.locator('.cro-first-call li').count(),3);assert.equal(await page.locator('.cro-start').count(),0);assert.equal(await page.locator('.cro-finance-art').count(),1);assert.equal(await page.locator('#danismanlik-sorulari details').count(),5);const schema=JSON.parse(await page.locator('#danismanlik-sorulari script[type=\"application/ld+json\"]').textContent());assert.equal(schema.mainEntity.length,5);
  assert.equal(await page.locator('h1').count(),1);assert.equal((await page.locator('h1').innerText()).replace(/\s+/g,' ').trim(),'Yüksek limitli kredi danışmanlığında yanınızdayız.');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('.ef-finance-banner,.ef-top-note,iframe,.ef-video-vitrine,.ef-guide-card').count(),0);
  const cta=page.locator('.cro-hero-copy .cro-primary');assert.equal(await cta.getAttribute('href'),'#iletisim');assert.equal(await page.locator('.cro-advisory-hero figcaption').count(),0);const type=await page.locator('h1').evaluate(e=>({size:parseFloat(getComputedStyle(e).fontSize),weight:Number(getComputedStyle(e).fontWeight)}));assert.ok(type.weight<=600);assert.ok(width<768?type.size>=32&&type.size<=38:type.size>=48&&type.size<=56);if(theme==='light'){assert.equal(await page.locator('.cro-home').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(248, 250, 252)');}
  const rect=await cta.boundingBox();assert.ok(rect.height>=44);if(width<768){
 const nav=await page.locator('nav[aria-label="Alt Menü"]').boundingBox();assert.ok(nav.height<=64,'compact bottom navigation');assert.ok(rect.y+rect.height<nav.y,'CTA visible above fixed navigation');
 const bounds=await page.locator('.cro-lead,.cro-boundary,.cro-actions,.cro-primary,.cro-phone,.cro-advisory-picture img,.cro-advisory-hero figcaption').evaluateAll(es=>es.map(e=>({x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width,scrollWidth:e.scrollWidth})));assert.ok(bounds.every(e=>e.x>=17&&e.right<=width-17&&e.scrollWidth<=e.width+1),'content is not clipped by hidden overflow: '+JSON.stringify(bounds));

 const sizes=await page.locator('.cro-lead,.cro-boundary,.cro-finance-art figcaption,.cro-needs-grid article>p,.cro-faq-list details p').evaluateAll(es=>es.filter(e=>e.getClientRects().length).map(e=>({text:e.textContent,size:parseFloat(getComputedStyle(e).fontSize),scale:getComputedStyle(e).transform})));assert.ok(sizes.every(e=>e.size>=14),JSON.stringify(sizes));
 assert.ok(await page.locator('body').evaluate(e=>parseFloat(getComputedStyle(e).paddingBottom)>=62));
 }

  const images=page.locator('.cro-advisory-picture img');assert.equal(await images.count(),8);assert.equal(await images.first().getAttribute('loading'),'eager');assert.equal(await images.first().getAttribute('fetchpriority'),'high');
  for(let i=0;i<8;i++){const img=images.nth(i);if(i)assert.equal(await img.getAttribute('loading'),'lazy');assert.ok((await img.getAttribute('alt')).includes('temsili'));await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());}
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no overflow after image loading');
  const media=await images.evaluateAll(es=>es.map(e=>({src:e.currentSrc,width:e.naturalWidth,loading:e.loading,renderWidth:e.getBoundingClientRect().width})));assert.ok(media.every(i=>i.width>0&&i.src.includes('/images/advisory/')));assert.ok(media[0].src.endsWith(width<768?'-480.webp':'-800.webp'),'responsive hero source');
  const heroBytes=fs.statSync(root+'/public'+new URL(media[0].src).pathname).size;assert.ok(heroBytes<100000,'hero transfer below 100 KB');const cls=await page.evaluate(()=>window.__croLayoutShift);assert.ok(cls<=0.1,'layout stability: '+cls);assert.equal(await page.locator('.cro-advisory-picture source').count(),8);assert.equal(await page.locator('.cro-process-grid .uk-brand-icon[role="img"]').count(),3);
  if(width<768){await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));const bottom=await page.locator('footer').boundingBox(),bar=await page.locator('nav[aria-label="Alt Menü"]').boundingBox();assert.ok(bottom.y+bottom.height<=bar.y+1,'footer reachable without bottom bar overlap');}
  await page.evaluate(()=>window.scrollTo(0,0));
await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
  await page.screenshot({path:`${output}/home-${width}-${theme}.png`,animations:'disabled'});
  await page.screenshot({path:`${output}/full-${width}-${theme}.png`,fullPage:true,animations:'disabled'});
 const contrast=await page.locator('.cro-lead,.cro-boundary,.cro-needs-grid article>p,.cro-trust-lines p,.cro-primary').evaluateAll(es=>{
  const rgb=c=>(c.match(/[\d.]+/g)||[]).slice(0,3).map(Number);
  const lum=c=>rgb(c).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0);
  return es.map(e=>{let p=e,bg;while(p){bg=getComputedStyle(p).backgroundColor;if(bg!=='rgba(0, 0, 0, 0)'&&bg!=='transparent')break;p=p.parentElement;}const a=lum(getComputedStyle(e).color),b=lum(bg);return {text:e.textContent,ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};});
 });assert.ok(contrast.every(c=>c.ratio>=4.5),JSON.stringify(contrast));

  if(width<768){const menu=page.getByRole('button',{name:'Menü',exact:true});await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');}
  await page.locator('.cro-explore').click();assert.equal(new URL(page.url()).hash,'#finansman-ihtiyaci');const question=page.locator('#danismanlik-sorulari details').first();await question.locator('summary').click();assert.equal(await question.getAttribute('open'),null);await question.locator('summary').press('Enter');assert.notEqual(await question.getAttribute('open'),null);await cta.click();assert.equal(new URL(page.url()).hash,'#iletisim');const form=page.getByRole('form',{name:'Danışmanlık başvurusu'});await form.locator('[data-application-contact-fallback]').waitFor();assert.equal(await form.locator('fieldset[hidden][disabled]').count(),1);assert.ok(await form.locator('button[type="submit"]').isDisabled());
  for(const href of ['tel:+905416061356','https://wa.me/905416061356'])assert.ok(await page.locator(`a[href="${href}"]`).count());
  await page.goto(origin+'/#hesaplama');await page.locator('.cro-toolbox[open]').waitFor();
  const amount=page.getByLabel('Kredi tutarı (₺)',{exact:true}),rate=page.getByLabel('Varsayımsal aylık faiz (%)',{exact:true}),months=page.getByLabel('Vade (ay)',{exact:true}),payment=page.getByTestId('monthly-payment');
  await rate.fill('3.49');await months.fill('24');
  for(const value of [200000,400000,125000]){await amount.fill(String(value));const r=.0349;const expected=value*r/(1-Math.pow(1+r,-24));await page.waitForFunction(e=>document.querySelector('[data-testid="monthly-payment"]')?.textContent===e,money(expected));}
  await rate.fill('0');await amount.fill('1200');await months.fill('12');assert.equal(await payment.innerText(),money(100));
  await amount.fill('2400');assert.equal(await payment.innerText(),money(200));await amount.press('ArrowUp');assert.equal(await payment.innerText(),money(2401/12));
  await amount.fill('');assert.equal(await payment.count(),0);await amount.fill('1200');
  const income=page.getByLabel('Aylık net gelir (₺)',{exact:true}),debt=page.getByLabel('Mevcut aylık borç ödemesi (₺)',{exact:true});
  await income.fill('35000');await debt.fill('3000');assert.equal(await page.getByTestId('remaining-budget').innerText(),money(32000));await income.fill('50000');assert.equal(await page.getByTestId('remaining-budget').innerText(),money(47000));await debt.fill('60000');assert.equal(await page.getByTestId('remaining-budget').innerText(),money(-10000));
  await page.locator('#hesaplama').screenshot({path:`${output}/calculator-${width}-${theme}.png`,animations:'disabled'});
  await selectTheme(page,theme==='dark'?'light':'dark');assert.equal(await page.locator('html').getAttribute('data-theme'),theme==='dark'?'light':'dark');
  assert.deepEqual(errors,[]);results.push({width,theme,calculator:'PASS: fill, keyboard, zero rate, invalid input, budget updates',flow:'PASS',errors,images:media,heroBytes,cls});await context.close();console.log(`PASS ${width}/${theme}`);
 }

 const themeChecks=[];
 for(const width of [390,1440]){
  const c=await browser.newContext({viewport:{width,height:900},colorScheme:'dark'}),p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(origin);await p.waitForFunction(()=>document.documentElement.dataset.theme==='light');
  for(const mode of ['dark','light','system']){
   await p.getByRole('button',{name:'Görünüm seçin',exact:true}).click();const label=themeLabel[mode],button=p.getByRole('menuitemradio',{name:label,exact:true});
   const buttonRect=await button.boundingBox();assert.ok(buttonRect.width>=40&&buttonRect.height>=44,'theme touch target');await button.focus();await p.keyboard.press('Enter');await p.waitForFunction(t=>localStorage.getItem('theme')===t,mode);await p.reload();
   await p.waitForFunction(t=>document.documentElement.dataset.theme===t,mode==='system'?'dark':mode);await assertTheme(p,mode);
   await p.goto(origin+'/iletisim');await p.waitForFunction(t=>document.documentElement.dataset.theme===t,mode==='system'?'dark':mode);await assertTheme(p,mode);await p.goto(origin);
  }
  await p.emulateMedia({colorScheme:'light'});await p.waitForFunction(()=>document.documentElement.dataset.theme==='light');assert.equal(await p.evaluate(()=>localStorage.getItem('theme')),'system');
  await p.emulateMedia({colorScheme:'dark'});await p.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
  const second=await c.newPage();await second.goto(origin);await selectTheme(second,'light');await p.waitForFunction(()=>document.documentElement.dataset.theme==='light');await second.close();
  assert.deepEqual(errors,[]);themeChecks.push({width,keyboard:'PASS',reload:'PASS',navigation:'PASS',liveSystem:'PASS',crossTab:'PASS'});await c.close();console.log('PASS theme persistence/system/keyboard '+width);
 }
 const policy=await fetch(origin+'/api/application-policy');assert.equal(policy.status,503);assert.deepEqual(await policy.json(),{enabled:false});
 const submission=await fetch(origin+'/api/applications',{method:'POST',headers:{'Content-Type':'application/json'},body:'unread-body'});assert.equal(submission.status,503);assert.equal((await submission.json()).code,'APPLICATION_INTAKE_DISABLED');
 fs.writeFileSync(output+'/browser-result.json',JSON.stringify({results,themeChecks,closedAPI:'PASS'},null,2));
}catch(e){fs.writeFileSync(output+'/browser-failure.txt',e.stack);throw e;}finally{await browser.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
