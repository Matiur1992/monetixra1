const fs = require('fs');
const acorn = require('acorn');
const src = fs.readFileSync('temp_script26_check.js', 'utf8');
const tokenizer = acorn.tokenizer(src, { ecmaVersion: 2024, sourceType: 'script', locations: true });
let token;
while ((token = tokenizer.getToken()).type.label !== 'eof') {
  if (token.loc.start.line === 78) {
    console.log(token.type.label, token.value, token.loc.start, token.loc.end);
  }
}
