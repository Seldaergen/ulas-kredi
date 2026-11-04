import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// Rasterize the repository SVG without launching Chromium or loading URLs.
// Resolve the image engine bundled as an optional dependency of Next.js.
const requireNext = createRequire(import.meta.resolve('next/package.json'));
const sharp = requireNext('sharp');
sharp.concurrency(1);
sharp.cache(false);
const source = fileURLToPath(new URL('../public/electric-finance-og.svg', import.meta.url));
const target = fileURLToPath(new URL('../public/electric-finance-og.png', import.meta.url));
const result = await sharp(source, { limitInputPixels: 1200 * 630 * 4 })
  .resize(1200, 630).png().toFile(target);
if (result.width !== 1200 || result.height !== 630) throw Error('INVALID_SOCIAL_IMAGE_SIZE');
console.log('PASS social image: 1200x630 PNG; no browser or network');
