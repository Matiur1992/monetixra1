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
  if (idx === 26) {
    fs.writeFileSync('temp_script26_check.js', content, 'utf8');
    break;
  }
}
