import fs from 'node:fs';

const pages = ['dist/index.html', 'dist/faq.html', 'dist/privacy-policy.html', 'dist/terms.html'];

console.log('=== H1 & H2 HEADING AUDIT (dist/) ===\n');

let allPassed = true;

for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/\s+/g, ' ').trim());
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/\s+/g, ' ').trim());
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/\s+/g, ' ').trim());
  
  const h1Pass = h1s.length === 1;
  const h2Pass = h2s.length === 1;

  if (!h1Pass || !h2Pass) allPassed = false;

  console.log(`Page: ${p}`);
  console.log(`  H1 Count: ${h1s.length} -> [${h1Pass ? 'PASS: Exactly 1 H1' : 'FAIL'}]`);
  console.log(`    Title : "${h1s[0]}"`);
  console.log(`  H2 Count: ${h2s.length} -> [${h2Pass ? 'PASS: Exactly 1 H2' : 'FAIL: Multiple or Missing'}]`);
  console.log(`    Subhead: "${h2s[0]}"`);
  console.log(`  H3 Count: ${h3s.length} sub-sections`);
  console.log('');
}

console.log(`OVERALL STATUS: ${allPassed ? 'ALL 4 PAGES PASS: Exactly 1 H2 per page' : 'FAIL'}`);
