const fs = require('fs');

const manualSemesterMap = {
  "Manajemen Proyek + Praktikum": 6,
  "Pemodelan dan Simulasi Logistik & Rantai Pasok + Praktikum": 6,
  "Pelayanan Pelanggan": 6,
  "Kewirausahaan": 6,
  "Kapita Selekta": 6,
  
  "Kerja Praktik 1": 7,
  "Laporan Akhir": 7,
  "Metode Penelitian": 7,
  "Hukum Kontrak dan Agen": 7,
  
  "Kerja Praktik 2": 8,
  "Skripsi": 8,
  "Logistik Halal": 8
};

let text = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');

// Find all matches for courses and replace the ones in manualSemesterMap
Object.keys(manualSemesterMap).forEach(mk => {
  const sem = manualSemesterMap[mk];
  const regex = new RegExp(`({ mataKuliah: "${mk.replace(/\\/g, '\\\\').replace(/\+/g, '\\+')}", sks: [\\d.]+, nilai: [\\d.]+, semester: )\\d+( })`, 'g');
  text = text.replace(regex, `$1${sem}$2`);
});

fs.writeFileSync('src/app/components/TranscriptTable.tsx', text);
console.log("Semesters updated");

