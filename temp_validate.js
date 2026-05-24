const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const pattern = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let idx = 0;
while ((match = pattern.exec(text)) !== null) {
  const attrs = match[1];
  const content = match[2];
  idx++;
  const hasSrc = /\bsrc\s*=\s*['\"]/.test(attrs);
  const typeJson = /\btype\s*=\s*['\"]application\/ld\+json['\"]/i.test(attrs);
  if (hasSrc || typeJson || !content.trim()) continue;
  try {
    new Function(content);
    console.log(`inline script #${idx}: OK`);
  } catch (e) {
    console.log(`inline script #${idx}: ERROR ${e.message}`);
    const lines = content.split(/\r?\n/);
    const lineno = e.lineNumber || e.line || 0;
    for (let i=Math.max(0, lineno-3); i<Math.min(lines.length, lineno+2); i++) {
      console.log(`${i+1}: ${lines[i]}`);
    }
    break;
  }
}
