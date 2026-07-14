const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

content = content.replace(
  'const [transcriptPage, setTranscriptPage] = useState(3);',
  'const [transcriptPage, setTranscriptPage] = useState(0);'
);

content = content.replace(
  'const transcriptLevels = ["Sekolah Dasar (SD)", "Sekolah Menengah Pertama (SMP)", "Sekolah Menengah Atas (SMA)", "Sarjana Terapan Logistik (S.Tr.Log.)", "Sertifikasi Lainnya"];',
  'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.)", "Certified White Belt (The Council for Six Sigma Certification)"];'
);

content = content.replace(
  '{transcriptPage === 3 ? (',
  '{transcriptPage === 0 ? ('
);

fs.writeFileSync('src/app/App.tsx', content, 'utf8');
