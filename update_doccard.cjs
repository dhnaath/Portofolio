const fs = require('fs');

let content = fs.readFileSync('src/app/components/DocumentationCard.tsx', 'utf-8');
content = content.replace('className="text-xl mb-2 text-gray-900"', 'className="text-xl mb-2 text-gray-900 font-serif"');
content = content.replace('className="text-gray-700 mb-4"', 'className="text-gray-700 mb-4 font-cambria"');
content = content.replace('className="text-sm text-gray-500 mb-3"', 'className="text-sm text-gray-500 mb-3 font-sans"');
fs.writeFileSync('src/app/components/DocumentationCard.tsx', content);
