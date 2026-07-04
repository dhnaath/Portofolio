const fs = require('fs');

const originalArray = [
  { mataKuliah: "Kerja Praktik 1", sks: 12, nilai: 3.0 },
  { mataKuliah: "Kerja Praktik 2", sks: 12, nilai: 3.5 },
  { mataKuliah: "Laporan Akhir", sks: 6, nilai: 4.0 },
  { mataKuliah: "Skripsi", sks: 6, nilai: 3.5 },
  { mataKuliah: "Manajemen Distribusi + Praktikum", sks: 3, nilai: 3.5 },
  { mataKuliah: "Manajemen Pergudangan + Praktikum", sks: 3, nilai: 3.5 },
  { mataKuliah: "Manajemen Persediaan + Praktikum", sks: 3, nilai: 4.0 },
  { mataKuliah: "Sistem dan Manajemen Transportasi + Praktikum", sks: 3, nilai: 2.0 },
  { mataKuliah: "Riset Operasi + Praktikum", sks: 3, nilai: 2.0 },
  { mataKuliah: "Pengendalian Kualitas + Praktikum", sks: 3, nilai: 3.0 },
  { mataKuliah: "Manajemen Freight + Praktikum", sks: 3, nilai: 2.0 },
  { mataKuliah: "Barang-Barang Berbahaya + Praktikum", sks: 3, nilai: 4.0 },
  { mataKuliah: "Ekspor Impor + Praktikum", sks: 3, nilai: 3.0 },
  { mataKuliah: "Analisis Keputusan + Praktikum", sks: 3, nilai: 3.0 },
  { mataKuliah: "Aplikasi Dasar SAP (ERP) + Praktikum", sks: 3, nilai: 4.0 },
  { mataKuliah: "Manajemen Proyek + Praktikum", sks: 3, nilai: 2.0 },
  { mataKuliah: "Pemodelan dan Simulasi Logistik & Rantai Pasok + Praktikum", sks: 3, nilai: 3.0 },
  { mataKuliah: "Pengantar Logistik", sks: 2, nilai: 2.0 },
  { mataKuliah: "Pengantar Manajemen", sks: 2, nilai: 4.0 },
  { mataKuliah: "Literasi Teknologi 1 + Praktikum", sks: 2, nilai: 4.0 },
  { mataKuliah: "Matematika Bisnis + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Pengantar Ekonomi", sks: 2, nilai: 4.0 },
  { mataKuliah: "Pendidikan Agama", sks: 2, nilai: 3.0 },
  { mataKuliah: "Pendidikan Pancasila", sks: 2, nilai: 3.0 },
  { mataKuliah: "Bahasa Indonesia", sks: 2, nilai: 3.0 },
  { mataKuliah: "Bahasa Inggris 1 + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Manajemen Pembelian + Praktikum", sks: 2, nilai: 4.0 },
  { mataKuliah: "Pengantar SCM", sks: 2, nilai: 3.0 },
  { mataKuliah: "Manajemen SDM", sks: 2, nilai: 4.0 },
  { mataKuliah: "Literasi Teknologi 2 + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Statistika Bisnis + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Proyek 1", sks: 2, nilai: 4.0 },
  { mataKuliah: "Pengantar Akuntansi & Perpajakan + Praktikum", sks: 2, nilai: 4.0 },
  { mataKuliah: "PKN", sks: 2, nilai: 3.0 },
  { mataKuliah: "Bahasa Inggris 2 + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "SIM Logistik + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Proyek 2", sks: 2, nilai: 4.0 },
  { mataKuliah: "Bahasa Inggris 3", sks: 2, nilai: 2.0 },
  { mataKuliah: "Global & Marketing Logistics", sks: 2, nilai: 4.0 },
  { mataKuliah: "Kemasan Pelindung & Penanganan Material + Praktikum", sks: 2, nilai: 2.5 },
  { mataKuliah: "Bahasa Inggris 4 + Praktikum", sks: 2, nilai: 3.0 },
  { mataKuliah: "Etika Profesi", sks: 2, nilai: 3.0 },
  { mataKuliah: "Kepabeanan + Praktikum", sks: 2, nilai: 4.0 },
  { mataKuliah: "Proyek 3", sks: 2, nilai: 4.0 },
  { mataKuliah: "Akuntansi Biaya Logistik + Praktikum", sks: 2, nilai: 3.5 },
  { mataKuliah: "Asuransi + Praktikum", sks: 2, nilai: 2.5 },
  { mataKuliah: "Proses Bisnis Logistik", sks: 2, nilai: 3.0 },
  { mataKuliah: "E-Commerce + Praktikum", sks: 2, nilai: 3.5 },
  { mataKuliah: "Pelayanan Pelanggan", sks: 2, nilai: 2.5 },
  { mataKuliah: "Kewirausahaan", sks: 2, nilai: 4.0 },
  { mataKuliah: "Kapita Selekta", sks: 2, nilai: 3.5 },
  { mataKuliah: "Metode Penelitian", sks: 2, nilai: 4.0 },
  { mataKuliah: "Hukum Kontrak dan Agen", sks: 2, nilai: 3.0 },
  { mataKuliah: "Logistik Halal", sks: 2, nilai: 3.0 }
];

const mappedSemesters = {
  "Literasi Teknologi 1 + Praktikum": 1,
  "Bahasa Indonesia": 1,
  "Bahasa Inggris 1 + Praktikum": 1,
  "Matematika Bisnis + Praktikum": 1,
  "Pendidikan Agama": 1,
  "Pengantar Ekonomi": 1,
  "Pengantar Manajemen": 1,
  "Pengantar Logistik": 1,
  "Pendidikan Pancasila": 1,
  "Manajemen Pembelian + Praktikum": 2,
  "Pengantar SCM": 2,
  "Bahasa Inggris 2 + Praktikum": 2,
  "Manajemen SDM": 2,
  "Literasi Teknologi 2 + Praktikum": 2,
  "Statistika Bisnis + Praktikum": 2,
  "Pengantar Akuntansi & Perpajakan + Praktikum": 2,
  "Proyek 1": 2,
  "PKN": 2,
  "Manajemen Persediaan + Praktikum": 3,
  "Manajemen Distribusi + Praktikum": 3,
  "Sistem dan Manajemen Transportasi + Praktikum": 3,
  "Riset Operasi + Praktikum": 3,
  "SIM Logistik + Praktikum": 3,
  "Pengendalian Kualitas + Praktikum": 3,
  "Bahasa Inggris 3": 3,
  "Proyek 2": 3,
  "Manajemen Freight + Praktikum": 4,
  "Manajemen Pergudangan + Praktikum": 4,
  "Barang-Barang Berbahaya + Praktikum": 4,
  "Ekspor Impor + Praktikum": 4,
  "Kemasan Pelindung & Penanganan Material + Praktikum": 4,
  "Bahasa Inggris 4 + Praktikum": 4,
  "Global & Marketing Logistics": 4,
  "Asuransi + Praktikum": 5,
  "Proses Bisnis Logistik": 5,
  "Proyek 3": 5,
  "Etika Profesi": 5,
  "Kepabeanan + Praktikum": 5,
  "E-Commerce + Praktikum": 5,
  "Akuntansi Biaya Logistik + Praktikum": 5,
  "Analisis Keputusan + Praktikum": 5,
  "Aplikasi Dasar SAP (ERP) + Praktikum": 5,
  
  "Manajemen Proyek + Praktikum": 6,
  "Pemodelan dan Simulasi Logistik & Rantai Pasok + Praktikum": 6,
  "Pelayanan Pelanggan": 6,
  "Kewirausahaan": 6,
  "Kerja Praktik 1": 7,
  "Kapita Selekta": 7,
  "Metode Penelitian": 7,
  "Hukum Kontrak dan Agen": 7,
  "Kerja Praktik 2": 8,
  "Laporan Akhir": 8,
  "Skripsi": 8,
  "Logistik Halal": 8
};

// "Manajemen Persediaan + Praktikum" appears in 3 and 5 in the prompt, but it's only 1 item in the original array.
// The user prompt mapped it to both. I'll put it in 3 for the main one. We will duplicate it if needed, but original array has it ONCE.
// Let's just create an array using the original items, but add `semester` based on the mapping.

const finalArray = originalArray.map(c => {
  return {
    ...c,
    semester: mappedSemesters[c.mataKuliah] || 8
  };
});

// Since the user had "Manajemen Persediaan + Praktikum" in sem 5 as well, maybe we can add a clone of it at the end? Or just leave it as it was in original array (once).
// To keep exactly original, let's keep it once. In user's prompt, they probably re-took it or it was a typo.

let text = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');

const regex = /(const courses: Course\[\] = \[\s*)([\s\S]*?)(\s*\];)/;

let appendText = "";
for (const c of finalArray) {
  appendText += `  { mataKuliah: "${c.mataKuliah}", sks: ${c.sks}, nilai: ${c.nilai}, semester: ${c.semester} },\n`;
}

// But wait, they might have noticed a DIFFERENT string change?
// Let's print out what `newCourses` I injected in my LAST tool call vs `appendText`.
text = text.replace(regex, `$1${appendText}$3`);
fs.writeFileSync('src/app/components/TranscriptTable.tsx', text);
console.log("Restored array order and mapped semesters correctly.");
