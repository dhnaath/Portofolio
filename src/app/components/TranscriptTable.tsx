import { useState, useMemo } from "react";
import { Star, StarHalf, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Course {
  mataKuliah: string;
  sks: number;
  nilai: number;
  semester: number;
}

const courses: Course[] = [
    { mataKuliah: "Kerja Praktik 1", sks: 12, nilai: 3, semester: 7 },
  { mataKuliah: "Kerja Praktik 2", sks: 12, nilai: 3.5, semester: 8 },
  { mataKuliah: "Laporan Akhir", sks: 6, nilai: 4, semester: 7 },
  { mataKuliah: "Skripsi", sks: 6, nilai: 3.5, semester: 8 },
  { mataKuliah: "Manajemen Distribusi + Praktikum", sks: 3, nilai: 3.5, semester: 3 },
  { mataKuliah: "Manajemen Pergudangan + Praktikum", sks: 3, nilai: 3.5, semester: 4 },
  { mataKuliah: "Manajemen Persediaan + Praktikum", sks: 3, nilai: 4, semester: 3 },
  { mataKuliah: "Sistem dan Manajemen Transportasi + Praktikum", sks: 3, nilai: 2, semester: 3 },
  { mataKuliah: "Riset Operasi + Praktikum", sks: 3, nilai: 2, semester: 3 },
  { mataKuliah: "Pengendalian Kualitas + Praktikum", sks: 3, nilai: 3, semester: 3 },
  { mataKuliah: "Manajemen Freight + Praktikum", sks: 3, nilai: 2, semester: 4 },
  { mataKuliah: "Barang-Barang Berbahaya + Praktikum", sks: 3, nilai: 4, semester: 4 },
  { mataKuliah: "Ekspor Impor + Praktikum", sks: 3, nilai: 3, semester: 4 },
  { mataKuliah: "Analisis Keputusan + Praktikum", sks: 3, nilai: 3, semester: 5 },
  { mataKuliah: "Aplikasi Dasar SAP (ERP) + Praktikum", sks: 3, nilai: 4, semester: 5 },
  { mataKuliah: "Manajemen Proyek + Praktikum", sks: 3, nilai: 2, semester: 6 },
  { mataKuliah: "Pemodelan dan Simulasi Logistik & Rantai Pasok + Praktikum", sks: 3, nilai: 3, semester: 6 },
  { mataKuliah: "Pengantar Logistik", sks: 2, nilai: 2, semester: 1 },
  { mataKuliah: "Pengantar Manajemen", sks: 2, nilai: 4, semester: 1 },
  { mataKuliah: "Literasi Teknologi 1 + Praktikum", sks: 2, nilai: 4, semester: 1 },
  { mataKuliah: "Matematika Bisnis + Praktikum", sks: 2, nilai: 3, semester: 1 },
  { mataKuliah: "Pengantar Ekonomi", sks: 2, nilai: 4, semester: 1 },
  { mataKuliah: "Pendidikan Agama", sks: 2, nilai: 3, semester: 1 },
  { mataKuliah: "Pendidikan Pancasila", sks: 2, nilai: 3, semester: 1 },
  { mataKuliah: "Bahasa Indonesia", sks: 2, nilai: 3, semester: 1 },
  { mataKuliah: "Bahasa Inggris 1 + Praktikum", sks: 2, nilai: 3, semester: 1 },
  { mataKuliah: "Manajemen Pembelian + Praktikum", sks: 2, nilai: 4, semester: 2 },
  { mataKuliah: "Pengantar SCM", sks: 2, nilai: 3, semester: 2 },
  { mataKuliah: "Manajemen SDM", sks: 2, nilai: 4, semester: 2 },
  { mataKuliah: "Literasi Teknologi 2 + Praktikum", sks: 2, nilai: 3, semester: 2 },
  { mataKuliah: "Statistika Bisnis + Praktikum", sks: 2, nilai: 3, semester: 2 },
  { mataKuliah: "Proyek 1", sks: 2, nilai: 4, semester: 2 },
  { mataKuliah: "Pengantar Akuntansi & Perpajakan + Praktikum", sks: 2, nilai: 4, semester: 2 },
  { mataKuliah: "PKN", sks: 2, nilai: 3, semester: 2 },
  { mataKuliah: "Bahasa Inggris 2 + Praktikum", sks: 2, nilai: 3, semester: 2 },
  { mataKuliah: "SIM Logistik + Praktikum", sks: 2, nilai: 3, semester: 3 },
  { mataKuliah: "Proyek 2", sks: 2, nilai: 4, semester: 3 },
  { mataKuliah: "Bahasa Inggris 3", sks: 2, nilai: 2, semester: 3 },
  { mataKuliah: "Global & Marketing Logistics", sks: 2, nilai: 4, semester: 4 },
  { mataKuliah: "Kemasan Pelindung & Penanganan Material + Praktikum", sks: 2, nilai: 2.5, semester: 4 },
  { mataKuliah: "Bahasa Inggris 4 + Praktikum", sks: 2, nilai: 3, semester: 4 },
  { mataKuliah: "Etika Profesi", sks: 2, nilai: 3, semester: 5 },
  { mataKuliah: "Kepabeanan + Praktikum", sks: 2, nilai: 4, semester: 5 },
  { mataKuliah: "Proyek 3", sks: 2, nilai: 4, semester: 5 },
  { mataKuliah: "Akuntansi Biaya Logistik + Praktikum", sks: 2, nilai: 3.5, semester: 5 },
  { mataKuliah: "Asuransi + Praktikum", sks: 2, nilai: 2.5, semester: 5 },
  { mataKuliah: "Proses Bisnis Logistik", sks: 2, nilai: 3, semester: 5 },
  { mataKuliah: "E-Commerce + Praktikum", sks: 2, nilai: 3.5, semester: 5 },
  { mataKuliah: "Pelayanan Pelanggan", sks: 2, nilai: 2.5, semester: 6 },
  { mataKuliah: "Kewirausahaan", sks: 2, nilai: 4, semester: 6 },
  { mataKuliah: "Kapita Selekta", sks: 2, nilai: 3.5, semester: 6 },
  { mataKuliah: "Metode Penelitian", sks: 2, nilai: 4, semester: 6 },
  { mataKuliah: "Hukum Kontrak dan Agen", sks: 2, nilai: 3, semester: 6 },
  { mataKuliah: "Logistik Halal", sks: 2, nilai: 3, semester: 6 },

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
          <Star size={16} className="text-[#F4F3F0] fill-current" />
          <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
            <Star size={16} className="text-yellow-400 fill-current" />
          </div>
        </div>
      )}
      {[...Array(empty)].map((_, i) => (
        <Star key={`e-${i}`} size={16} className="text-[#F4F3F0] fill-current" />
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
  const [sortSKS, setSortSKS] = useState<'default' | 'asc' | 'desc'>('default');
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>(1);

  const sortedCourses = useMemo(() => {
    let filtered = courses;
    if (selectedSemester !== 'all') {
      filtered = courses.filter(c => c.semester === selectedSemester);
    }

    if (sortOrder !== 'default') {
      return [...filtered].sort((a, b) => {
        if (sortOrder === 'desc') return b.nilai - a.nilai;
        return a.nilai - b.nilai;
      });
    }

    if (sortSKS !== 'default') {
      return [...filtered].sort((a, b) => {
        if (sortSKS === 'desc') return b.sks - a.sks;
        return a.sks - b.sks;
      });
    }

    return filtered;
  }, [sortOrder, sortSKS, selectedSemester]);

  const toggleSort = () => {
    setSortSKS('default');
    if (sortOrder === 'default') setSortOrder('desc');
    else if (sortOrder === 'desc') setSortOrder('asc');
    else setSortOrder('default');
  };

  const toggleSortSKS = () => {
    setSortOrder('default');
    if (sortSKS === 'default') setSortSKS('desc');
    else if (sortSKS === 'desc') setSortSKS('asc');
    else setSortSKS('default');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Prasyarat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Ujian Khusus</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setSelectedSemester(prev => (prev === 'all' ? 8 : Math.max(1, prev - 1)))}
            disabled={selectedSemester === 1}
            className="p-2 text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all"
            aria-label="Previous semester"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-1 px-4 py-2 font-serif text-[#222222] min-w-[120px] justify-center">
            <span className="font-medium text-lg">
              {selectedSemester === 'all' ? 'All Semesters' : `Semester ${selectedSemester}`}
            </span>
          </div>

          <button
            onClick={() => setSelectedSemester(prev => (prev === 'all' ? 1 : Math.min(8, prev + 1)))}
            disabled={selectedSemester === 8}
            className="p-2 text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all"
            aria-label="Next semester"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#5B6572]/30 shadow-sm bg-[#FFFFFF]">
        <table className="w-full text-left border-collapse table-fixed min-w-[800px] font-serif">
          <thead>
            <tr className="bg-[#F4F3F0] text-[#222222] border-b border-[#5B6572]/30 font-sans">
              <th className="py-4 px-4 font-semibold w-auto">Mata Kuliah</th>
              <th className="py-4 px-4 font-semibold w-20 text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={toggleSortSKS}>
                <div className="flex items-center justify-center gap-1">
                  SKS
                  <ArrowUpDown size={14} className={sortSKS !== 'default' ? 'opacity-100 text-blue-600' : 'opacity-50'} />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold w-16 text-center">Teori</th>
              <th className="py-4 px-4 font-semibold w-20 text-center">Praktik</th>
              <th className="py-4 px-4 font-semibold w-24 text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={toggleSort}>
                <div className="flex items-center justify-center gap-1">
                  Nilai
                  <ArrowUpDown size={14} className={sortOrder !== 'default' ? 'opacity-100 text-blue-600' : 'opacity-50'} />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold w-24 text-center">Bobot</th>
              <th className="py-4 px-4 font-semibold text-center w-36">
                <div className="flex items-center justify-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#F4F3F0] fill-current" />
                  ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#FFFFFF]">
            {sortedCourses.map((course, index) => {
              const isHighlighted = highlightedCourses.includes(course.mataKuliah);
              const isRepeated = repeatedCourses.includes(course.mataKuliah);
              
              const isKerjaPraktik = course.mataKuliah.includes('Kerja Praktik') || course.mataKuliah.includes('Skripsi') || course.mataKuliah.includes('Laporan Akhir');
              const hasPraktikum = course.mataKuliah.includes('+ Praktikum');
              const praktik = isKerjaPraktik ? course.sks : (hasPraktikum ? 1 : 0);
              const teori = course.sks - praktik;
              return (
                <tr 
                  key={index} 
                  className={`transition-colors ${
                    isRepeated
                      ? 'bg-red-100 hover:bg-red-200'
                      : isHighlighted 
                      ? 'bg-yellow-100 hover:bg-yellow-200' 
                      : index % 2 === 1 
                        ? 'bg-[#FFFFFF]/50 hover:bg-[#F4F3F0]' 
                        : 'hover:bg-[#F4F3F0]'
                  }`}
                >
                  <td className={`py-3 px-4 ${(isHighlighted || isRepeated) ? 'text-[#222222] font-medium truncate' : 'text-[#222222] truncate'}`}>{course.mataKuliah}</td>
                  <td className="py-3 px-4 text-center text-[#5B6572]">{course.sks}</td>
                  <td className="py-3 px-4 text-center text-[#5B6572]">{teori}</td>
                  <td className="py-3 px-4 text-center text-[#5B6572]">{praktik}</td>
                  <td className="py-3 px-4 text-center text-[#222222] font-medium">
                    {getLetterGrade(course.nilai)}
                  </td>
                  <td className="py-3 px-4 text-center text-[#5B6572]">
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
