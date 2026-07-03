const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf-8');
content = content.replace('font-serif text-xl italic', 'font-cambria text-xl italic');
content = content.replace('mb-8 font-cambria origin-center', 'mb-8 font-serif origin-center');
content = content.replace('w-full font-cambria', 'w-full font-sans');
content = content.replace('leading-snug font-serif', 'leading-snug font-cambria');
fs.writeFileSync('src/app/App.tsx', content);
