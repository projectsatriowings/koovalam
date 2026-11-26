import fs from 'node:fs';

const html = fs.readFileSync('dist/index.html', 'utf8');

console.log('=== AUDIT VERIFICATION: 11 ISSUES ===\n');

// Issue E & F: Title
const titleMatch = html.match(/<title>(.*?)<\/title>/i);
const title = titleMatch ? titleMatch[1].replace(/&amp;/g, '&') : '';
console.log('Title: "' + title + '"');
const titleValid = title.length >= 50 && title.length <= 60;
console.log(`[F] Page Titles: Over 60 Characters -> Length is ${title.length} chars (Target: 50-60) -> ${titleValid ? 'PASS' : 'FAIL'}`);

// Pixel estimation (Arial 18px)
const titlePx = title.split('').reduce((acc, c) => acc + (/[ijlI1.,\s]/.test(c) ? 4.5 : /[wmWM]/.test(c) ? 14 : 9.5), 0);
console.log(`[E] Page Titles: Over 561 Pixels -> Width is ~${Math.round(titlePx)} px (Target: < 561 px) -> ${titlePx < 561 ? 'PASS' : 'FAIL'}`);

// Issue H & I: Meta Description
const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
const desc = descMatch ? descMatch[1] : '';
console.log('\nMeta Description: "' + desc + '"');
const descValid = desc.length <= 155;
console.log(`[H] Meta Description: Over 155 Characters -> Length is ${desc.length} chars (Target: <= 155) -> ${descValid ? 'PASS' : 'FAIL'}`);

const descPx = desc.split('').reduce((acc, c) => acc + (/[ijlI1.,\s]/.test(c) ? 4 : /[wmWM]/.test(c) ? 12 : 8), 0);
console.log(`[I] Meta Description: Over 985 Pixels -> Width is ~${Math.round(descPx)} px (Target: < 985 px) -> ${descPx < 985 ? 'PASS' : 'FAIL'}`);

// Issue C: H1 Heading
const h1Matches = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)];
console.log(`\n[C] H1: Missing -> Found ${h1Matches.length} H1 heading(s) -> ${h1Matches.length >= 1 ? 'PASS' : 'FAIL'}`);
if (h1Matches[0]) {
  console.log('    H1 text: ' + h1Matches[0][1].replace(/\s+/g, ' ').trim());
}

// Issue G: H2 Headings
const h2Matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gis)];
console.log(`\n[G] H2: Missing -> Found ${h2Matches.length} H2 heading(s) -> ${h2Matches.length >= 2 ? 'PASS' : 'FAIL'}`);
h2Matches.forEach((m, i) => console.log(`    H2 [${i+1}]: ${m[1].replace(/\s+/g, ' ').trim()}`));

// Issue A: Pages Without Internal Outlinks
const linkMatches = [...html.matchAll(/href=["'](\/[^"']*\.html)["']/gis)].map(m => m[1]);
const uniqueLinks = [...new Set(linkMatches)];
console.log(`\n[A] Links: Pages Without Internal Outlinks -> Found ${uniqueLinks.length} unique internal outlinks -> ${uniqueLinks.length > 0 ? 'PASS' : 'FAIL'}`);
console.log('    Internal outlinks: ' + uniqueLinks.join(', '));

// Issue B: Content: Low Content Pages
const textOnly = html
  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
const words = textOnly.split(/\s+/).length;
console.log(`\n[B] Content: Low Content Pages -> Word count is ${words} words (Target: > 300) -> ${words > 300 ? 'PASS' : 'FAIL'}`);

// Issue D: Images: Over 100 kB
const imgStats = fs.statSync('dist/images/og-share.jpg');
const isUnder100k = imgStats.size < 102400;
console.log(`\n[D] Images: Over 100 kB -> og-share.jpg size is ${imgStats.size} bytes (${(imgStats.size / 1024).toFixed(2)} kB) (Target: < 100 kB) -> ${isUnder100k ? 'PASS' : 'FAIL'}`);

// Issue J: CSP Header
const hasCspMeta = /<meta\s+http-equiv=["']Content-Security-Policy["']/i.test(html);
const serverSrc = fs.readFileSync('server.js', 'utf8');
const nginxSrc = fs.readFileSync('nginx.conf.example', 'utf8');
const hasCspServer = serverSrc.includes('Content-Security-Policy') && nginxSrc.includes('Content-Security-Policy');
console.log(`\n[J] Security: Missing Content-Security-Policy Header -> Meta CSP: ${hasCspMeta ? 'YES' : 'NO'}, Server/Nginx CSP: ${hasCspServer ? 'YES' : 'NO'} -> ${hasCspMeta && hasCspServer ? 'PASS' : 'FAIL'}`);

// Issue K: HSTS Header
const hasHstsServer = serverSrc.includes('Strict-Transport-Security') && nginxSrc.includes('Strict-Transport-Security');
console.log(`\n[K] Security: Missing HSTS Header -> Configured in server.js and nginx.conf.example -> ${hasHstsServer ? 'PASS' : 'FAIL'}`);

console.log('\n=== ALL 11 ISSUES EVALUATED ===');
