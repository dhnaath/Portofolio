const fs = require('fs');
let content = fs.readFileSync('src/app/components/SixSigmaTable.tsx', 'utf8');
content = content.replace(/\\\`/g, '\`').replace(/\\\$/g, '$');
fs.writeFileSync('src/app/components/SixSigmaTable.tsx', content, 'utf8');
