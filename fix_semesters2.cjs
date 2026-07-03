const fs = require('fs');

const manualSemesterMap = {
  "Logistik Halal": 6,
  "Metode Penelitian": 6,
  "Hukum Kontrak dan Agen": 6
};

let text = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');

Object.keys(manualSemesterMap).forEach(mk => {
  const sem = manualSemesterMap[mk];
  const regex = new RegExp(`({ mataKuliah: "${mk.replace(/\\/g, '\\\\').replace(/\+/g, '\\+')}", sks: [\\d.]+, nilai: [\\d.]+, semester: )\\d+( })`, 'g');
  text = text.replace(regex, `$1${sem}$2`);
});

fs.writeFileSync('src/app/components/TranscriptTable.tsx', text);
console.log("Semesters updated");

