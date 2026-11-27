import fs from 'node:fs';

console.log('=== AUDIT VERIFICATION: ALL 4 PAGES CONTENT & SEO ===\n');

const pages = [
  { name: 'Home Page', file: 'dist/index.html' },
  { name: 'Blogs Page', file: 'dist/blogs.html' },
  { name: 'FAQ Page', file: 'dist/faq.html' },
  { name: 'Privacy Policy', file: 'dist/privacy-policy.html' },
  { name: 'Terms of Service', file: 'dist/terms.html' }
];

let totalWords = 0;
let allPass = true;

for (const p of pages) {
  const html = fs.readFileSync(p.file, 'utf8');
  const text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                   .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                   .replace(/<[^>]+>/g, ' ')
                   .replace(/\s+/g, ' ')
                   .trim();
  const wordCount = text.split(/\s+/).length;
  totalWords += wordCount;
  const passed = wordCount >= 500;
  if (!passed) allPass = false;

  // Title check
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';

  // Meta description check
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const desc = descMatch ? descMatch[1] : '';

  // Heading check
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  const h2Count = [...html.matchAll(/<h2[^>]*>/gi)].length;

  console.log(`PAGE: ${p.name} (${p.file})`);
  console.log(`  Word Count        : ${wordCount} words (Target: > 500) -> ${passed ? 'PASS (Rich Content)' : 'FAIL (Low Content)'}`);
  console.log(`  Title (${title.length} chars) : "${title}"`);
  console.log(`  Meta Desc (${desc.length} chars) : "${desc}"`);
  console.log(`  H1 Heading        : ${h1Match ? h1Match[1].replace(/\s+/g, ' ').trim() : 'MISSING'}`);
  console.log(`  H2 Subheadings    : ${h2Count} sections found`);
  console.log('');
}

console.log(`SUMMARY: Total content across 4 pages is ${totalWords} words.`);
console.log(`Issue "Content: Low Content Pages" Status: ${allPass ? 'FULLY RESOLVED (0 pages flagged)' : 'NEEDS ATTENTION'}`);
