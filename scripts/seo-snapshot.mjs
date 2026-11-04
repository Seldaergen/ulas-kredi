// Copy only the values used by SEO assertions. Never retain a DOM node/window.
const selectors = [
  'h1', 'main', 'link[rel="canonical"]', 'meta[name="description"]',
  'meta[property="og:url"]', 'meta[property="og:title"]',
  'meta[property="og:image"]', 'meta[name="robots"]', 'a[href]',
  'script[type="application/ld+json"]', '#iletisim form',
  '[data-application-contact-fallback]', 'fieldset[hidden][disabled]',
  'a[href="tel:+905416061356"]', 'a[href="https://wa.me/905416061356"]',
  'a[href*="kredi-yapilandirma-nedir"]', 'a[href*="/rehber/banka-ic-skor-nedir"]',
  'a[href="/iletisim#iletisim"]', 'a[href^="/hizmetler"]', 'a[href^="/rehber/"]',
];

export function seoSnapshot(document) {
  const values = new Map(selectors.map(selector => [selector,
    [...document.querySelectorAll(selector)].map(node => copyValues(
      node.textContent, node.href, node.content, node.getAttribute('href'),
    )),
  ]));
  const ids = new Set([...document.querySelectorAll('[id]')].map(node => node.id));
  return snapshotFromValues(values, ids, document.body.textContent);
}

function snapshotFromValues(values, ids, bodyText) {
  function querySelectorAll(selector) {
    if (!values.has(selector)) throw Error(`Unsupported SEO selector: ${selector}`);
    return values.get(selector);
  }
  return {
    body: { textContent: bodyText },
    querySelectorAll,
    querySelector: selector => querySelectorAll(selector)[0] ?? null,
    getElementById: id => ids.has(id) ? { id } : null,
  };
}

function copyValues(textContent, href, content, rawHref) {
  return { textContent, href, content,
    getAttribute(name) {
      if (name !== 'href') throw Error(`Unsupported snapshot attribute: ${name}`);
      return rawHref;
    },
  };
}
