const existingCourses = [
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

const userData = {
  1: [
    "LITERASI TEKNOLOGI 1 + PRAKTIKUM",
    "BAHASA INDONESIA",
    "BAHASA INGGRIS 1",
    "MATEMATIKA BISNIS + PRAKTIKUM",
    "PENDIDIKAN AGAMA",
    "PENGANTAR EKONOMI",
    "PENGANTAR MANAJEMEN",
    "PENGANTAR LOGISTIK",
    "PENDIDIKAN PANCASILA"
  ],
  2: [
    "MANAJEMEN PEMBELIAN + PRAKTIKUM",
    "PENGANTAR SCM",
    "BAHASA INGGRIS 2 + PRAKTIKUM",
    "MANAJEMEN SDM (L)",
    "APLIKASI DASAR KOMPUTER 2 + PRAKTIKUM (L)",
    "STATISTIKA BISNIS + PRAKTIKUM (L)",
    "PENGANTAR AKUNTANSI + PRAKTIKUM (L)",
    "PROYEK 1 (L)",
    "PKN"
  ],
  3: [
    "MANAJEMEN PERSEDIAAN + PRAKTIKUM",
    "MANAJEMEN DISTRIBUSI + PRAKTIKUM",
    "SISTEM DAN MANAJEMEN TRANSPORTASI + PRAKTIKUM",
    "RISET OPERASI + PRAKTIKUM",
    "SIM LOGISTIK + PRAKTIKUM",
    "PENGENDALIAN KUALITAS + PRAKTIKUM",
    "BAHASA INGGRIS III + PRAKTIKUM",
    "PROYEK 2"
  ],
  4: [
    "MANAJEMEN FREIGHT + PRAKTIKUM",
    "MANAJEMEN PERGUDANGAN + PRAKTIKUM",
    "BARANG-BARANG BERBAHAYA + PRAKTIKUM",
    "EKSPOR - IMPOR + PRAKTIKUM",
    "KEMASAN PELINDUNG & PENANGANGAN MATERIAL + PRAKTIK",
    "BAHASA INGGRIS IV + PRAKTIKUM",
    "GLOBAL & MARKETING LOGISTIK"
  ],
  5: [
    "MANAJEMEN PERSEDIAAN + PRAKTIKUM",
    "ASURANSI + PRAKTIKUM",
    "PROSES BISNIS LOGISTIK",
    "PROYEK 3",
    "ETIKA PROFESI",
    "KEPABEANAN + PRAKTIKUM",
    "E-COMMERCE + PRAKTIKUM",
    "AKUNTANSI BIAYA LOGISTIK + PRAKTIKUM",
    "ANALISIS KEPUTUSAN + PRAKTIKUM",
    "SAP FUNDAMENTAL + PRAKTIKUM"
  ]
};

const mapName = (name) => {
  const n = name.toUpperCase().replace(/\s*\(L\)/g, '').replace(/IV/g, '4').replace(/III/g, '3').replace(/II/g, '2').replace(/ - /g, ' ').replace(/&/g, 'DAN').replace(/PRAKTIK$/, 'PRAKTIKUM');
  
  // Custom maps
  if (n.includes('BAHASA INGGRIS 1')) return 'Bahasa Inggris 1 + Praktikum';
  if (n.includes('APLIKASI DASAR KOMPUTER 2')) return 'Literasi Teknologi 2 + Praktikum';
  if (n.includes('PENGANTAR AKUNTANSI')) return 'Pengantar Akuntansi & Perpajakan + Praktikum';
  if (n.includes('KEMASAN PELINDUNG')) return 'Kemasan Pelindung & Penanganan Material + Praktikum';
  if (n.includes('GLOBAL DAN MARKETING LOGISTIK')) return 'Global & Marketing Logistics';
  if (n.includes('SAP FUNDAMENTAL')) return 'Aplikasi Dasar SAP (ERP) + Praktikum';
  if (n.includes('MANAJEMEN SDM')) return 'Manajemen SDM';
  if (n.includes('EKSPOR IMPOR')) return 'Ekspor Impor + Praktikum';

  const found = existingCourses.find(c => {
    const cname = c.mataKuliah.toUpperCase().replace(/&/g, 'DAN');
    return cname.includes(n) || n.includes(cname);
  });
  
  if (found) return found.mataKuliah;
  
  // Try fallback
  const fallback = existingCourses.find(c => {
    return c.mataKuliah.toUpperCase().replace(/[^A-Z]/g, '') === name.toUpperCase().replace(/[^A-Z]/g, '');
  });
  if (fallback) return fallback.mataKuliah;
  
  return existingCourses.find(c => c.mataKuliah.toUpperCase() === name.toUpperCase())?.mataKuliah || name;
};

const finalCourses = [];

for (const [semester, courses] of Object.entries(userData)) {
  for (const cName of courses) {
    const mapped = mapName(cName);
    const existing = existingCourses.find(c => c.mataKuliah === mapped);
    if (existing) {
      finalCourses.push({
        mataKuliah: mapped,
        sks: existing.sks,
        nilai: existing.nilai,
        semester: parseInt(semester, 10)
      });
    } else {
      finalCourses.push({
        mataKuliah: cName, // original name from user
        sks: 2, // default
        nilai: 3.0, // default
        semester: parseInt(semester, 10)
      });
    }
  }
}

let out = "const courses: Course[] = [\n";
for (const c of finalCourses) {
  out += `  { mataKuliah: "${c.mataKuliah}", sks: ${c.sks}, nilai: ${c.nilai}, semester: ${c.semester} },\n`;
}
out += "];";
console.log(out);
