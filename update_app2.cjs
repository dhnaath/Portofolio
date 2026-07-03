const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf-8');
content = content.replace('<h3 className="text-3xl mb-4 text-gray-900">Transkrip Nilai</h3>', '<h3 className="text-3xl mb-4 text-gray-900 font-serif">Transkrip Nilai</h3>');
content = content.replace('<h3 className="text-3xl text-center mb-8 text-gray-900">Profile Qualifications</h3>', '<h3 className="text-3xl text-center mb-8 text-gray-900 font-serif">Profile Qualifications</h3>');
fs.writeFileSync('src/app/App.tsx', content);
