import fs from 'node:fs';

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function analyzeReadability(text) {
  // Clean text
  text = text.replace(/&[a-z]+;/gi, ' ');
  // Split into sentences
  const rawSentences = text.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);
  const sentences = rawSentences.map(s => s.trim());
  const words = text.split(/\s+/).filter(w => /[a-zA-Z]/.test(w));
  
  if (sentences.length === 0 || words.length === 0) return { score: 0, asl: 0, asw: 0 };

  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const asl = words.length / sentences.length;
  const asw = totalSyllables / words.length;

  // Flesch Reading Ease
  const flesch = 206.835 - (1.015 * asl) - (84.6 * asw);
  const longSentences = sentences.filter(s => s.split(/\s+/).length > 20).length;

  return {
    flesch: Math.round(flesch),
    words: words.length,
    sentences: sentences.length,
    asl: Math.round(asl * 10) / 10,
    asw: Math.round(asw * 100) / 100,
    longSentencesPct: Math.round((longSentences / sentences.length) * 100)
  };
}

const pages = [
  'dist/index.html',
  'dist/blogs.html',
  'dist/faq.html',
  'dist/privacy-policy.html',
  'dist/terms.html'
];

console.log('=== READABILITY BASELINE ANALYSIS ===\n');

for (const p of pages) {
  const html = fs.readFileSync(p, 'utf8');
  const bodyText = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const res = analyzeReadability(bodyText);
  let grade = 'Difficult (< 50)';
  if (res.flesch >= 60) grade = 'Standard / Easy (60-100)';
  else if (res.flesch >= 50) grade = 'Fairly Difficult (50-59)';

  console.log(`Page: ${p}`);
  console.log(`  Flesch Reading Ease : ${res.flesch} / 100  ->  [${grade}]`);
  console.log(`  Avg Sentence Length : ${res.asl} words/sentence`);
  console.log(`  Avg Syllables/Word  : ${res.asw}`);
  console.log(`  Sentences > 20 words: ${res.longSentencesPct}%\n`);
}
