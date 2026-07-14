const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

content = content.replace(
  'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.)", "Certified White Belt (The Council for Six Sigma Certification)"];',
  'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.)", "Certified White Belt - The Council for Six Sigma Certification (CSSC)"];'
);

fs.writeFileSync('src/app/App.tsx', content, 'utf8');
