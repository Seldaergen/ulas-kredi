import assert from 'node:assert/strict';
import fs from 'node:fs';
export async function verifyAppearance(browser, origin) {
  fs.mkdirSync('artifacts/package5/screenshots/home-regression', { recursive: true });
  const animated = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', colorScheme: 'dark' });
  await animated.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const animatedPage = await animated.newPage();
  const runtimeErrors = [];
  animatedPage.on('pageerror', error => runtimeErrors.push(error.name));
  await animatedPage.goto(origin);
  assert.equal(await animatedPage.locator('.ef-scene-bridge>span').evaluate(element => getComputedStyle(element).animationName), 'ef-process-flow');
  await animatedPage.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await animatedPage.locator('.ef-scene-bridge>span').evaluate(element => getComputedStyle(element).animationName), 'none');
  assert.deepEqual(runtimeErrors, []);
  await animated.close();
  for (const width of [1440, 360, 390, 430]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1050 : 844 }, colorScheme: 'dark', reducedMotion: 'reduce', isMobile: width < 500, hasTouch: width < 500 });
    await context.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    const page = await context.newPage();
    await page.goto(origin);
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    if (width < 500) {
      const targets = await page.locator('.ef-theme button').evaluateAll(buttons => buttons.map(button => { const rect=button.getBoundingClientRect();return rect.width>=44 && rect.height>=44; }));
      assert.ok(targets.every(Boolean), 'Mobile theme controls have 44px touch targets');
      const menu = page.getByRole('button', { name: 'Menü', exact: true });
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'), 'true');
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      await page.getByRole('navigation', { name: 'Alt Menü' }).getByRole('link', { name: 'Başvuru', exact: true }).waitFor();
    }
    for (const theme of ['dark', 'light']) {
      await page.getByRole('button', { name: theme === 'dark' ? 'Koyu tema' : 'Açık tema', exact: true }).click();
      await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `artifacts/package5/screenshots/home-regression/home-${width}-${theme}.png`, animations: 'disabled' });
      const firstScreen = await page.evaluate(() => {
        const menu = document.querySelector('nav[aria-label="Alt Menü"]');
        const bottom = menu && getComputedStyle(menu).display !== 'none' && menu.getBoundingClientRect().height > 0 ? menu.getBoundingClientRect().top : innerHeight;
        const cta = document.querySelector('.ef-hero-copy a.ef-button').getBoundingClientRect();
        const core = document.querySelector('.ef-assessment-core').getBoundingClientRect();
        const inputs = document.querySelector('.ef-scene-inputs').getBoundingClientRect();
        return { cta: cta.top >= 0 && cta.bottom <= bottom, scene: inputs.bottom <= bottom && core.top + 40 <= bottom, reserve: !menu || parseFloat(getComputedStyle(document.body).paddingBottom) >= menu.getBoundingClientRect().height };
      });
      assert.ok(firstScreen.cta && firstScreen.scene, `service CTA and meaningful assessment scene above fold ${width}/${theme}: ${JSON.stringify(firstScreen)}`);
      if (width < 500) assert.ok(firstScreen.reserve, 'Bottom menu has reserved document space');
      assert.match(await page.locator('.ef-eyebrow').first().innerText(), /KREDİ DANIŞMANLIĞI/);
      assert.match(await page.locator('.ef-scene-disclaimer').innerText(), /Skor, limit veya kredi onayı tahmini üretmez/);
      await page.locator('.ef-application .ef-test-notice').waitFor();
      assert.match(await page.locator('.ef-test-notice').first().innerText(), /İZOLE TEST ORTAMI/);
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, page: document.documentElement.scrollWidth }));
      assert.ok(dimensions.page <= dimensions.viewport, `overflow ${width}/${theme}: ${dimensions.page}`);
      const processText = await page.locator('.ef-scene-tile div>span, .ef-plan-steps span, .ef-scene-disclaimer').evaluateAll(elements => elements.every(element => parseFloat(getComputedStyle(element).fontSize) >= 10));
      assert.ok(processText, 'Process descriptions remain at least 10px');
      if (width === 1440) {
        const navigation = await page.locator('.ef-desktop-links a').evaluateAll(anchors => anchors.filter(anchor => anchor.getBoundingClientRect().height > 0).every(anchor => anchor.getBoundingClientRect().height <= 48));
        assert.ok(navigation, 'Desktop navigation labels fit a single row');
      }
      const contrast = await page.evaluate(() => {
        const color = value => value.match(/[\d.]+/g).slice(0,3).map(Number).map(v => {v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
        const lum = value => { const [r,g,b]=color(value);return .2126*r+.7152*g+.0722*b; };
        const a=lum(getComputedStyle(document.querySelector('.ef-lead')).color), b=lum(getComputedStyle(document.body).backgroundColor);
        return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
      });
      assert.ok(contrast >= 4.5, `lead contrast ${width}/${theme}: ${contrast}`);
      const formContrast = await page.evaluate(() => {
        const lum = color => { const [r,g,b]=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});return .2126*r+.7152*g+.0722*b; };
        const background=lum(getComputedStyle(document.querySelector('.ef-application')).backgroundColor);
        return ['.ef-application h2','.ef-application form p.text-muted-foreground','.ef-application label'].map(selector=>{const foreground=lum(getComputedStyle(document.querySelector(selector)).color);return (Math.max(foreground,background)+.05)/(Math.min(foreground,background)+.05);});
      });
      assert.ok(formContrast.every(ratio=>ratio>=4.5), `form contrast ${width}/${theme}: ${formContrast}`);
      assert.equal(await page.locator('.ef-scene-bridge>span').evaluate(element => getComputedStyle(element).animationName), 'none');
      await page.locator('.ef-hero-copy a.ef-button').click();
      await page.waitForFunction(() => location.hash === '#basvuru');
      await page.locator('.ef-application').screenshot({ path: `artifacts/package5/screenshots/home-regression/application-${width}-${theme}.png`, animations: 'disabled' });
      await page.getByLabel('Kredi tutarı (₺)', { exact: true }).fill('1200');
      await page.getByLabel('Varsayımsal aylık faiz (%)', { exact: true }).fill('0');
      await page.getByLabel('Vade (ay)', { exact: true }).fill('12');
      assert.match(await page.getByTestId('monthly-payment').innerText(), /100,00/);
      await page.getByLabel('Vade (ay)', { exact: true }).fill('0');
      assert.equal(await page.getByTestId('monthly-payment').count(), 0);
      await page.getByLabel('Vade (ay)', { exact: true }).fill('12');
      await page.getByLabel('Aylık net gelir (₺)', { exact: true }).fill('100');
      await page.getByLabel('Mevcut aylık borç ödemesi (₺)', { exact: true }).fill('150');
      assert.match(await page.getByTestId('remaining-budget').innerText(), /-.*50,00/);
      await page.locator('#hesaplama').screenshot({ path: `artifacts/package5/screenshots/home-regression/calculator-${width}-${theme}.png`, animations: 'disabled' });
      await page.locator('.ef-editorial').screenshot({ path: `artifacts/package5/screenshots/home-regression/editorial-${width}-${theme}.png`, animations: 'disabled' });
      for (const path of ['/iletisim', '/rehber', '/hizmetler']) {
        await page.goto(origin + path);
        assert.equal(await page.locator('html').getAttribute('data-theme'), theme);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `route overflow ${path}/${width}/${theme}`);
      }
      await page.goto(origin);
      await page.getByRole('button', { name: 'Açık tema', exact: true }).focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    }
    await page.getByRole('button', { name: 'Sistem teması', exact: true }).click();
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    await context.close();
    console.log(`PASS appearance ${width}px: dark/light, system preference, persistence, overflow, contrast, keyboard and calculators`);
  }
}
