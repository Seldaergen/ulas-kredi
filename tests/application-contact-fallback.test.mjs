import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
const require = createRequire(import.meta.url);
require('./register.cjs');
const { ApplicationForm } = require('../components/application-form.tsx');
const { ApplicationContactFallback } = require('../components/application-contact-fallback.tsx');

test('before policy approval both forms disable and hide PII fields and expose existing direct contact links', () => {
  for (const channel of ['HERO_FORM', 'CONTACT_FORM']) {
    const dom = new JSDOM(renderToStaticMarkup(React.createElement(ApplicationForm, { channel })));
    try {
      const doc = dom.window.document;
      assert.ok(doc.querySelector('fieldset[hidden][disabled]'));
      for (const name of ['name', 'phone', 'topic', 'note', 'privacyAcknowledged']) {
        assert.ok(doc.querySelector(`[name="${name}"]`).matches(':disabled'));
      }
      const fallback = doc.querySelector('[data-application-contact-fallback]');
      assert.ok(fallback.querySelector('a[href="tel:+905416061356"]'));
      assert.ok(fallback.querySelector('a[href="https://wa.me/905416061356"]'));
      assert.ok(!fallback.querySelector('input,textarea,select,button[type="submit"]'));
      assert.match(fallback.textContent, /kaydı veya takip numarası oluşturmaz/);
      assert.equal(doc.querySelector('button[type="submit"]').disabled, true);
    } finally { dom.window.close(); }
  }
});

test('closed fallback states intake is unavailable and never embeds form data into external links', () => {
  const html = renderToStaticMarkup(React.createElement(ApplicationContactFallback));
  assert.match(html, /Çevrimiçi başvuru kaydı şu anda kapalı/);
  assert.ok(!html.includes('?text='));
  assert.ok(!html.includes('Başvurunuz kaydedildi'));
});
