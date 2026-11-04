import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
require('./register.cjs');

test('all three converted guide links render the same destination and label using actual Next Link', () => {
  const cases = [
    [require('../app/soru-cevap/page.tsx').default, 'Kredi Rehberi’ne git'],
    [require('../components/home/GuideTeaser.tsx').default, 'Tüm rehberi gör'],
    [require('../components/home/HeroSection.tsx').default, 'Rehberi incele'],
  ];
  for (const [Component, label] of cases) {
    const html = renderToStaticMarkup(React.createElement(Component));
    const anchor = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/g)?.find(value => value.includes(label));
    assert.ok(anchor, label);
    assert.match(anchor, /href="\/rehber"/, label);
  }
});
