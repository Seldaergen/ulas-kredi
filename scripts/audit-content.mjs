import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
require('../tests/register.cjs');
const { POSTS } = require('../lib/content/posts.ts');
const { publication } = require('../lib/content/publication.ts');
const files = fs.readdirSync('lib/content/posts').filter(file => file.endsWith('.ts')).sort();
const hashes = new Map();
const rows = files.map(file => {
  const post = Object.values(require(path.resolve('lib/content/posts', file)))[0];
  const text = [post.title, post.excerpt, post.intro, ...(post.criticalPoints ?? []), post.highlight, ...post.content.flatMap(block => block.items ?? [block.text])].filter(Boolean);
  const hash = createHash('sha256').update(JSON.stringify(post.content)).digest('hex');
  const duplicateOf = hashes.get(hash) ?? null;
  hashes.set(hash, post.slug);
  return { file, slug: post.slug, registered: POSTS.some(entry => entry.slug === post.slug), title: post.title, date: post.date, missing: ['title', 'excerpt', 'date'].filter(key => !post[key]), duplicateOf, numericClaimsForReview: text.filter(value => /\d.*(%|puan|ay|gün|TL)|%.*\d/.test(value)), ...publication(post) };
});
process.stdout.write(JSON.stringify({ sourceCount: rows.length, registeredCount: POSTS.length, published: rows.filter(row => row.status === 'published').length, editorialOwnerConfirmed: false, ownership: 'Source files -> posts.index.ts -> posts.ts -> publication.ts -> SSR/listing/sitemap. Named editorial responsibility remains unassigned.', rows }, null, 2) + '\n');
