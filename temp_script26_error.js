const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf8');
const regex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
let idx = 0;
while ((match = regex.exec(text)) !== null) {
  idx++;
  const attrs = match[1];
  const content = match[2];
  if (/\bsrc\s*=\s*['\"]/.test(attrs) || /\btype\s*=\s*['\"]application\/ld\+json['\"]/i.test(attrs) || !content.trim()) continue;
  if (idx !== 26) continue;
  try {
    new Function(content);
    console.log('ok');
  } catch (e) {
    console.log('message:', e.message);
    console.log('stack:', e.stack);
    const lines = content.split(/\r?\n/);
    const lineno = e.lineNumber || e.line || 0;
    console.log('lineno', lineno);
    for (let i=Math.max(0, lineno-5); i<Math.min(lines.length, lineno+3); i++) {
      console.log(`${i+1}: ${lines[i]}`);
    }
  }
  break;
}
