import { useState, useMemo } from "react";
import { Star, StarHalf, ArrowUpDown } from "lucide-react";

interface Course {
  mataKuliah: string;
  sks: number;
  nilai: number;
}

const courses: Course[] = [
  // 12 SKS
  { mataKuliah: "Kerja Praktik 1", sks: 12, nilai: 3.0 },
  { mataKuliah: "Kerja Praktik 2", sks: 12, nilai: 3.5 },
  // 6 SKS
  { mataKuliah: "Laporan Akhir", sks: 6, nilai: 4.0 },
  { mataKuliah: "Skripsi", sks: 6, nilai: 3.5 },
  // 3 SKS
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
  // 2 SKS
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
  { mataKuliah: "Logistik Halal", sks: 2, nilai: 3.0 },
];

const getLetterGrade = (nilai: number) => {
  if (nilai === 4.0) return 'A';
  if (nilai === 3.5) return 'AB';
  if (nilai === 3.0) return 'B';
  if (nilai === 2.5) return 'BC';
  if (nilai === 2.0) return 'C';
  if (nilai === 1.5) return 'CD';
  if (nilai === 1.0) return 'D';
  return 'E';
};

const renderStars = (nilai: number) => {
  const full = Math.floor(nilai);
  const half = nilai % 1 !== 0;
  
  const empty = Math.max(0, 4 - full - (half ? 1 : 0));
  
  return (
    <div className="flex justify-center items-center space-x-1">
      {[...Array(full)].map((_, i) => (
        <Star key={`f-${i}`} size={16} className="text-yellow-400 fill-current" />
      ))}
      {half && (
        <div className="relative">
          <Star size={16} className="text-gray-300 fill-current" />
          <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
            <Star size={16} className="text-yellow-400 fill-current" />
          </div>
        </div>
      )}
      {[...Array(empty)].map((_, i) => (
        <Star key={`e-${i}`} size={16} className="text-gray-300 fill-current" />
      ))}
    </div>
  );
};

const highlightedCourses = [
  "Pengantar Logistik",
  "Pengantar SCM",
  "Sistem dan Manajemen Transportasi + Praktikum",
  "Barang-Barang Berbahaya + Praktikum",
  "Ekspor Impor + Praktikum",
  "Manajemen Pembelian + Praktikum",
  "Manajemen Distribusi + Praktikum",
  "Manajemen Persediaan + Praktikum",
  "Manajemen Pergudangan + Praktikum",
  "Manajemen Freight + Praktikum",
];

const repeatedCourses: string[] = [
  "Riset Operasi + Praktikum",
  "Manajemen Proyek + Praktikum"
];

export function TranscriptTable() {
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>(1);

  const sortedCourses = useMemo(() => {
    let filtered = courses;
    if (selectedSemester !== 'all') {
      filtered = courses.filter((c, i) => {
        // Assume courses are distributed across 8 semesters for now
        // This is a placeholder since we don't have actual semester data
        const mockSemester = Math.floor(i / Math.ceil(courses.length / 8)) + 1;
        return (c as any).semester ? (c as any).semester === selectedSemester : mockSemester === selectedSemester;
      });
    }

    if (sortOrder === 'default') return filtered;
    return [...filtered].sort((a, b) => {
      if (sortOrder === 'desc') return b.nilai - a.nilai;
      return a.nilai - b.nilai;
    });
  }, [sortOrder, selectedSemester]);

  const toggleSort = () => {
    if (sortOrder === 'default') setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder('default');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-sm text-gray-700 font-medium">Mata Kuliah Inti</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-gray-700 font-medium">Nilai Mengulang</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <div className="px-3 py-1 text-sm font-medium text-gray-500">
              Semester
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors ${selectedSemester === sem ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {sem}
              </button>
            ))}
          </div>
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors h-10"
          >
            <ArrowUpDown size={16} />
            {sortOrder === 'default' ? 'Urutkan Nilai' : sortOrder === 'desc' ? 'Nilai Tertinggi' : 'Nilai Terendah'}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse table-fixed min-w-[800px] font-serif">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b border-gray-200 font-sans">
              <th className="py-4 px-4 font-semibold w-16 text-center">No.</th>
              <th className="py-4 px-4 font-semibold w-auto">Mata Kuliah</th>
              <th className="py-4 px-4 font-semibold w-20 text-center">SKS</th>
              <th className="py-4 px-4 font-semibold w-24 text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={toggleSort}>
                <div className="flex items-center justify-center gap-1">
                  Nilai
                  <ArrowUpDown size={14} className="opacity-50" />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold w-24 text-center">Bobot</th>
              <th className="py-4 px-4 font-semibold text-center w-36">Bintang</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedCourses.map((course, index) => {
              const isHighlighted = highlightedCourses.includes(course.mataKuliah);
              const isRepeated = repeatedCourses.includes(course.mataKuliah);
              return (
                <tr 
                  key={index} 
                  className={`transition-colors ${
                    isRepeated
                      ? 'bg-red-100 hover:bg-red-200'
                      : isHighlighted 
                      ? 'bg-yellow-100 hover:bg-yellow-200' 
                      : index % 2 === 1 
                        ? 'bg-white/50 hover:bg-gray-50' 
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-3 px-4 text-center text-gray-600">
                    {sortOrder === 'default' ? index + 1 : courses.findIndex(c => c === course) + 1}
                  </td>
                  <td className={`py-3 px-4 ${(isHighlighted || isRepeated) ? 'text-gray-900 font-medium truncate' : 'text-gray-800 truncate'}`}>{course.mataKuliah}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{course.sks}</td>
                  <td className="py-3 px-4 text-center text-gray-800 font-medium">
                    {getLetterGrade(course.nilai)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">
                    {course.nilai.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderStars(course.nilai)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
