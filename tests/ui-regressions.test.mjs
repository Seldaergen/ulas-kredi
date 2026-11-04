import test, { after, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import Module, { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import React, { act } from 'react';
const require = createRequire(import.meta.url);
require('./register.cjs');
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' });
for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true })) {
  Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
}
const { createRoot, hydrateRoot } = require('react-dom/client');
const { renderToString } = require('react-dom/server');
let pathname = '/';
let search = '';
const replacements = [];
const router = { replace: value => replacements.push(value) };
const emblaEvents = new Map([['select', new Set()], ['reInit', new Set()]]);
let prev = false;
let next = true;
const embla = {
  canScrollPrev: () => prev, canScrollNext: () => next,
  scrollPrev: () => { prev = false; next = true; emitEmbla('select'); },
  scrollNext: () => { prev = true; next = false; emitEmbla('select'); },
  on: (event, fn) => { emblaEvents.get(event).add(fn); return embla; },
  off: (event, fn) => { emblaEvents.get(event).delete(fn); return embla; },
};
function emitEmbla(event) { for (const fn of emblaEvents.get(event)) fn(embla, event); }
const emblaHook = () => [() => {}, embla];
const originalLoad = Module._load;
function withMocks(load) {
  Module._load = function (request, ...args) {
    if (request === 'next/navigation') return { usePathname: () => pathname, useSearchParams: () => new URLSearchParams(search), useRouter: () => router };
    if (request === 'next/image') return { __esModule: true, default: ({ fill: _fill, priority: _priority, ...props }) => React.createElement('img', props) };
    if (request === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', { ...props, onClick: event => { props.onClick?.(event); event.preventDefault(); } }, children) };
    if (request === 'embla-carousel-react') return { __esModule: true, default: emblaHook };
    return originalLoad.call(this, request, ...args);
  };
  try { return load(); } finally { Module._load = originalLoad; }
}
const modules = withMocks(() => ({
  Video: require('../components/home/VideoSectionClient.tsx').default,
  Featured: require('../components/videos/FeaturedVideoStrip.tsx').default,
  Related: require('../components/videos/RelatedVideosByTopic.tsx').default,
  Videos: require('../components/videos/VideosClient.tsx').default,
  Navbar: require('../components/navbar.tsx').Navbar,
  carousel: require('../components/ui/carousel.tsx'),
  Skeleton: require('../components/ui/sidebar.tsx').SidebarMenuSkeleton,
  validateMarketRates: require('../components/finance-banner.tsx').safeRates,
  mobile: [require('../hooks/use-mobile.ts').useIsMobile, require('../components/ui/use-mobile.tsx').useIsMobile],
}));
const fixtures = Array.from({ length: 8 }, (_, i) => ({ id: `fixture${i}`, title: `Fixture ${i}`, url: 'https://example.invalid', thumbnail: '/fixture.jpg', thumb: '/fixture.jpg', tag: i % 2 ? 'Limit' : 'Kredi Notu', topicId: i % 2 ? 'kredi-limiti' : 'kredi-notu', isShort: i % 2 === 0 }));
const mounted = new Set();
async function mount(element) {
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  const instance = {
    container,
    render: async node => { await act(() => root.render(React.createElement(React.StrictMode, null, node))); },
    unmount: async () => { await act(() => root.unmount()); container.remove(); mounted.delete(instance); },
  };
  mounted.add(instance);
  await instance.render(element);
  return instance;
}
function button(container, text) {
  const found = [...container.querySelectorAll('button')].find(node => node.textContent.trim() === text);
  assert.ok(found, `Button: ${text}`);
  return found;
}
async function click(node) { assert.ok(node); await act(() => node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))); }
afterEach(async () => {
  for (const instance of [...mounted]) await instance.unmount();
  mock.restoreAll();
  pathname = '/'; search = ''; replacements.length = 0;
});
after(() => dom.window.close());

function baselineVideo() {
  const filename = path.resolve('components/home/VideoSectionClient.tsx');
  const source = execFileSync('git', ['show', '5a769730a515f4ef687879cbd0dd36d532be90a3:components/home/VideoSectionClient.tsx'], { encoding: 'utf8' });
  const code = require('typescript').transpileModule(source, { compilerOptions: { module: require('typescript').ModuleKind.CommonJS, jsx: require('typescript').JsxEmit.ReactJSX, esModuleInterop: true } }).outputText;
  const baselineModule = new Module(filename);
  baselineModule.filename = filename;
  baselineModule.paths = Module._nodeModulePaths(path.dirname(filename));
  return withMocks(() => { baselineModule._compile(code, filename); return baselineModule.exports.default; });
}

async function videoTrace(Component) {
  let now = 1000;
  let id = 0;
  const frames = new Map();
  mock.method(performance, 'now', () => now);
  const oldRequest = globalThis.requestAnimationFrame;
  const oldCancel = globalThis.cancelAnimationFrame;
  globalThis.requestAnimationFrame = callback => { frames.set(++id, callback); return id; };
  globalThis.cancelAnimationFrame = key => frames.delete(key);
  const view = await mount(React.createElement(Component, { videos: fixtures, youtubeShortsUrl: 'https://example.invalid', secondsPerVideo: 10 }));
  const { container } = view;
  const trace = [];
  const snapshot = label => {
    const card = container.querySelector('[aria-label="Videoyu site içinde izle"] img');
    const progress = [...container.querySelectorAll('[style]')].find(node => node.style.transform.startsWith('scaleX'));
    trace.push({ label, video: card?.alt, iframe: container.querySelector('iframe')?.getAttribute('src'), progress: progress?.style.transform, frames: frames.size });
  };
  async function advance(ms) {
    now += ms;
    await act(() => { const pending = [...frames.values()]; frames.clear(); pending.forEach(fn => fn(now)); });
  }
  try {
    snapshot('mount');
    await advance(3000); snapshot('progress');
    await view.render(React.createElement(Component, { videos: fixtures, youtubeShortsUrl: 'https://example.invalid/updated', secondsPerVideo: 10 }));
    snapshot('unrelated rerender');
    await view.render(React.createElement(Component, { videos: [...fixtures], youtubeShortsUrl: 'https://example.invalid', secondsPerVideo: 10 }));
    snapshot('equivalent new video array');
    await advance(7000); snapshot('auto next');
    await click(button(container, 'İzle')); snapshot('player');
    await click(button(container, 'Sonraki →')); snapshot('player next');
    await click(button(container, '← Önceki')); snapshot('player previous');
    await click(button(container, 'Vitrine dön →')); snapshot('back');
    await advance(5000); snapshot('half progress');
    await click(button(container, '⏸️ Duraklat')); snapshot('pause');
    await advance(20000); snapshot('paused time');
    await click(button(container, '▶️ Devam')); snapshot('resume');
    await advance(5000); snapshot('resumed progress');
    await click(button(container, 'Sonraki →')); snapshot('manual next');
    const target = container.querySelector('[aria-label="Videoyu site içinde izle"]').parentElement.parentElement;
    await act(() => target.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true })));
    snapshot('hover pause');
    await act(() => target.dispatchEvent(new window.MouseEvent('mouseout', { bubbles: true })));
    snapshot('hover resume');
    const touch = async (type, x) => {
      const event = new window.Event(type, { bubbles: true });
      Object.defineProperty(event, 'touches', { value: [{ clientX: x }] });
      await act(() => target.dispatchEvent(event));
    };
    await touch('touchstart', 0); await touch('touchmove', 100); await touch('touchend', 100);
    snapshot('swipe previous');
    await view.render(React.createElement(Component, { videos: fixtures.slice(0, 3), youtubeShortsUrl: 'https://example.invalid', secondsPerVideo: 2 }));
    snapshot('changed count and min duration');
    assert.ok(container.textContent.includes('~6 sn.'));
    await advance(3000); snapshot('min duration progress');
    await view.render(React.createElement(Component, { videos: [], youtubeShortsUrl: 'https://example.invalid' }));
    assert.ok(container.textContent.includes('Videolar yüklenemedi')); snapshot('empty');
    await view.render(React.createElement(Component, { videos: fixtures, youtubeShortsUrl: 'https://example.invalid', secondsPerVideo: 50 }));
    assert.ok(container.textContent.includes('~20 sn.')); snapshot('restored max duration');
    await view.unmount(); assert.equal(frames.size, 0);
    assert.equal(trace.find(row => row.label === 'progress').progress, 'scaleX(0.3)');
    assert.equal(trace.find(row => row.label === 'pause').frames, 0);
    assert.equal(trace.find(row => row.label === 'player').frames, 0);
    assert.ok(trace.find(row => row.label === 'auto next').video.includes('1'));
    return trace;
  } finally {
    if (mounted.has(view)) await view.unmount();
    globalThis.requestAnimationFrame = oldRequest;
    globalThis.cancelAnimationFrame = oldCancel;
    mock.restoreAll();
  }
}

test('video animation matches HEAD across timer, pause/resume, player, hover, swipe, props and empty states; StrictMode unmount cancels RAF', async () => {
  const previous = await videoTrace(baselineVideo());
  const current = await videoTrace(modules.Video);
  assert.deepEqual(current, previous);
});

test('featured selection and related-video modal retain selected IDs across rerenders', async () => {
  const featuredProps = { videos: fixtures, youtubeChannelUrl: 'https://example.invalid' };
  const view = await mount(React.createElement(modules.Featured, featuredProps));
  assert.ok(view.container.querySelector('iframe').src.includes('fixture0'));
  await click(view.container.querySelector('[aria-label="Fixture 2 videosunu aç"]'));
  await view.render(React.createElement(modules.Featured, { ...featuredProps, videos: [...fixtures] }));
  assert.ok(view.container.querySelector('iframe').src.includes('fixture2'));
  await view.render(React.createElement(modules.Related, { videos: fixtures, topicId: 'kredi-notu' }));
  await click(view.container.querySelector('[aria-label="Sitede izle"]'));
  assert.ok(view.container.querySelector('iframe').src.includes('fixture0'));
  await click(view.container.querySelector('[aria-label="Kapat"]'));
  assert.equal(view.container.querySelector('iframe'), null);
});

test('video URL filters follow navigation while keeping pending local search edits and modal selection', async () => {
  const node = () => React.createElement(modules.Videos, { initialVideos: fixtures });
  const view = await mount(node());
  const input = () => view.container.querySelector('input');
  const setValue = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  await act(() => { setValue.call(input(), 'Fixture 2'); input().dispatchEvent(new window.Event('input', { bubbles: true })); });
  assert.equal(input().value, 'Fixture 2');
  assert.equal(replacements.at(-1), '?q=Fixture+2');
  await view.render(node());
  assert.equal(input().value, 'Fixture 2');
  search = 'q=Fixture&topic=kredi-notu&shorts=1'; await view.render(node());
  assert.equal(input().value, 'Fixture');
  assert.equal(view.container.querySelector('select').value, 'kredi-notu');
  await click(view.container.querySelector('[aria-label="Site içinde izle"]'));
  assert.ok(view.container.querySelector('iframe'));
  search = 'q=Fixture&topic=kredi-limiti'; await view.render(node());
  assert.equal(view.container.querySelector('select').value, 'kredi-limiti');
  assert.ok(view.container.querySelector('iframe'));
  await click(view.container.querySelector('[aria-label="Kapat"]'));
  await click(button(view.container, 'Temizle'));
  assert.equal(input().value, ''); assert.equal(view.container.querySelector('select').value, '');
  search = 'q=Fixture&topic=not-a-topic'; await view.render(node());
  assert.equal(view.container.querySelector('select').value, '');
});

test('navbar preserves same-route menu state, closes on navigation and Escape, and keeps delayed dropdown close', async () => {
  const view = await mount(React.createElement(modules.Navbar));
  const menu = () => view.container.querySelector('[aria-controls="mobile-nav"]');
  await click(menu()); assert.equal(menu().getAttribute('aria-expanded'), 'true');
  await view.render(React.createElement(modules.Navbar)); assert.equal(menu().getAttribute('aria-expanded'), 'true');
  pathname = '/rehber'; await view.render(React.createElement(modules.Navbar));
  assert.equal(menu().getAttribute('aria-expanded'), 'false');
  await click(menu());
  await act(() => window.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape' })));
  assert.equal(menu().getAttribute('aria-expanded'), 'false');
  const dropdown = view.container.querySelector('[aria-haspopup="menu"]');
  await act(() => dropdown.parentElement.dispatchEvent(new window.MouseEvent('mouseover', { bubbles: true })));
  assert.equal(dropdown.getAttribute('aria-expanded'), 'true');
  await act(() => dropdown.parentElement.dispatchEvent(new window.MouseEvent('mouseout', { bubbles: true })));
  await act(() => new Promise(resolve => setTimeout(resolve, 150)));
  assert.equal(dropdown.getAttribute('aria-expanded'), 'false');
});

test('both mobile hooks preserve SSR false, breakpoint updates and subscription cleanup', async () => {
  for (const useIsMobile of modules.mobile) {
    const listeners = new Set();
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: 1024 });
    window.matchMedia = () => ({ addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) });
    function Probe() { return React.createElement('output', null, String(useIsMobile())); }
    assert.ok(renderToString(React.createElement(Probe)).includes('false'));
    const view = await mount(React.createElement(Probe));
    assert.equal(view.container.textContent, 'false'); assert.equal(listeners.size, 1);
    for (const [width, expected] of [[767, 'true'], [768, 'false'], [375, 'true']]) {
      await act(() => { window.innerWidth = width; [...listeners].forEach(fn => fn()); });
      assert.equal(view.container.textContent, expected);
    }
    await view.unmount(); assert.equal(listeners.size, 0);
  }
});

test('carousel exposes initial bounds, handles selection/reInit/keyboard and removes every subscription', async () => {
  prev = false; next = true;
  const { Carousel, CarouselPrevious, CarouselNext } = modules.carousel;
  const view = await mount(React.createElement(Carousel, null, React.createElement(CarouselPrevious), React.createElement(CarouselNext)));
  const previous = () => button(view.container, 'Previous slide');
  const following = () => button(view.container, 'Next slide');
  assert.equal(previous().disabled, true); assert.equal(following().disabled, false);
  await click(following()); assert.equal(previous().disabled, false); assert.equal(following().disabled, true);
  await act(() => view.container.querySelector('[role="region"]').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })));
  assert.equal(previous().disabled, true); assert.equal(following().disabled, false);
  await act(() => { prev = true; next = true; emitEmbla('reInit'); });
  assert.equal(previous().disabled, false); assert.equal(following().disabled, false);
  await view.unmount();
  assert.equal(emblaEvents.get('select').size, 0); assert.equal(emblaEvents.get('reInit').size, 0);
});

test('sidebar skeleton preserves width range and hydrates without a server/client width mismatch', async () => {
  const element = React.createElement('div', null, React.createElement(modules.Skeleton), React.createElement(modules.Skeleton, { showIcon: true }));
  const container = document.createElement('div'); document.body.append(container);
  container.innerHTML = renderToString(element);
  const widths = () => [...container.querySelectorAll('[data-sidebar="menu-skeleton-text"]')].map(node => node.style.getPropertyValue('--skeleton-width'));
  const serverWidths = widths();
  assert.ok(serverWidths.every(width => parseInt(width, 10) >= 50 && parseInt(width, 10) < 90));
  const errors = [];
  let root;
  try {
    await act(() => { root = hydrateRoot(container, element, { onRecoverableError: error => errors.push(error.message) }); });
    assert.deepEqual(widths(), serverWidths); assert.deepEqual(errors, []);
  } finally { if (root) await act(() => root.unmount()); container.remove(); }
});

test('market display rejects legacy prices, request timestamps and unofficial provenance', () => {
  const legacy = { ok: true, ts: new Date().toISOString(), rates: [{ name: 'USD/TRY', value: '34.52', symbol: '₺' }] };
  assert.equal(modules.validateMarketRates(legacy), null);
  assert.equal(modules.validateMarketRates({ ...legacy, asOf: 'invalid', sourceUrl: 'https://www.tcmb.gov.tr/' }), null);
  assert.equal(modules.validateMarketRates({ ...legacy, asOf: '2026-10-31', sourceUrl: 'https://example.invalid/' }), null);
});
