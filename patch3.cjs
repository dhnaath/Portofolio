const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

content = content.replace(
  'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.)", "Certified White Belt - The Council for Six Sigma Certification (CSSC)"];',
  'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.) - Universitas Logistik dan Bisnis Internasional (ULBI)", "Certified White Belt - The Council for Six Sigma Certification (CSSC)"];'
);

fs.writeFileSync('src/app/App.tsx', content, 'utf8');
