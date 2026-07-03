const fs = require('fs');

const missingCourses = [
  { "mataKuliah": "Manajemen Proyek + Praktikum", "sks": 3, "nilai": 2, "semester": 6 },
  { "mataKuliah": "Pemodelan dan Simulasi Logistik & Rantai Pasok + Praktikum", "sks": 3, "nilai": 3, "semester": 6 },
  { "mataKuliah": "Pelayanan Pelanggan", "sks": 2, "nilai": 2.5, "semester": 6 },
  { "mataKuliah": "Kewirausahaan", "sks": 2, "nilai": 4, "semester": 6 },
  
  { "mataKuliah": "Kerja Praktik 1", "sks": 12, "nilai": 3, "semester": 7 },
  { "mataKuliah": "Kapita Selekta", "sks": 2, "nilai": 3.5, "semester": 7 },
  { "mataKuliah": "Metode Penelitian", "sks": 2, "nilai": 4, "semester": 7 },
  { "mataKuliah": "Hukum Kontrak dan Agen", "sks": 2, "nilai": 3, "semester": 7 },

  { "mataKuliah": "Kerja Praktik 2", "sks": 12, "nilai": 3.5, "semester": 8 },
  { "mataKuliah": "Laporan Akhir", "sks": 6, "nilai": 4, "semester": 8 },
  { "mataKuliah": "Skripsi", "sks": 6, "nilai": 3.5, "semester": 8 },
  { "mataKuliah": "Logistik Halal", "sks": 2, "nilai": 3, "semester": 8 }
];

let text = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');

const regex = /(const courses: Course\[\] = \[\s*[\s\S]*?)(];)/;
const match = text.match(regex);

if (match) {
  let appendText = "";
  for (const c of missingCourses) {
    appendText += `  { mataKuliah: "${c.mataKuliah}", sks: ${c.sks}, nilai: ${c.nilai}, semester: ${c.semester} },\n`;
  }
  text = text.replace(regex, `$1${appendText}$2`);
  fs.writeFileSync('src/app/components/TranscriptTable.tsx', text);
  console.log("Success");
} else {
  console.log("Not found");
}

