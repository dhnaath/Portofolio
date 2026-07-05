const fs = require('fs');
let content = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf8');

// Set default semester to 'all'
content = content.replace(
  "const [selectedSemester, setSelectedSemester] = useState<number | 'all'>(1);",
  "const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');"
);

// Add legend for A, B, C
const legendTarget = `<div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Prasyarat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Ujian Khusus</span>
          </div>
        </div>`;

const newLegend = `<div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100/60 border border-emerald-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Nilai A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100/60 border border-blue-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Nilai B</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100/60 border border-yellow-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Nilai C</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Mengulang</span>
          </div>
        </div>`;

content = content.replace(legendTarget, newLegend);

// Update map
const mapTarget = `              const isKerjaPraktik = course.mataKuliah.includes('Kerja Praktik') || course.mataKuliah.includes('Skripsi') || course.mataKuliah.includes('Laporan Akhir');
              const hasPraktikum = course.mataKuliah.includes('+ Praktikum');
              const praktik = isKerjaPraktik ? course.sks : (hasPraktikum ? 1 : 0);
              const teori = course.sks - praktik;

              return (
                <tr 
                  key={index} 
                  className={\`transition-colors \${
                    isRepeated
                      ? 'bg-red-100 hover:bg-red-200'
                      : isHighlighted 
                      ? 'bg-yellow-100 hover:bg-yellow-200' 
                      : index % 2 === 1 
                        ? 'bg-[#FFFFFF]/50 hover:bg-[#F4F3F0]' 
                        : 'hover:bg-[#F4F3F0]'
                  }\`}
                >`;

const newMap = `              const isKerjaPraktik = course.mataKuliah.includes('Kerja Praktik') || course.mataKuliah.includes('Skripsi') || course.mataKuliah.includes('Laporan Akhir');
              const hasPraktikum = course.mataKuliah.includes('+ Praktikum');
              const praktik = isKerjaPraktik ? course.sks : (hasPraktikum ? 1 : 0);
              const teori = course.sks - praktik;
              const grade = getLetterGrade(course.nilai);
              let rowColor = index % 2 === 1 ? 'bg-[#FFFFFF]/50 hover:bg-[#F4F3F0]' : 'hover:bg-[#F4F3F0]';
              if (grade.startsWith('A')) rowColor = 'bg-emerald-100/60 hover:bg-emerald-200/60';
              else if (grade.startsWith('B')) rowColor = 'bg-blue-100/60 hover:bg-blue-200/60';
              else if (grade.startsWith('C')) rowColor = 'bg-yellow-100/60 hover:bg-yellow-200/60';

              return (
                <tr 
                  key={index} 
                  className={\`transition-colors \${
                    isRepeated
                      ? 'bg-red-100 hover:bg-red-200'
                      : isHighlighted 
                      ? 'bg-yellow-200 hover:bg-yellow-300' 
                      : rowColor
                  }\`}
                >`;

content = content.replace(mapTarget, newMap);

// Hide pagination if selectedSemester === 'all'
const paginationTarget = `<div className="flex items-center justify-center gap-4">
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
              {selectedSemester === 'all' ? 'All Semesters' : \`Semester \${selectedSemester}\`}
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
        </div>`;

content = content.replace(paginationTarget, ``);

fs.writeFileSync('src/app/components/TranscriptTable.tsx', content);
console.log('Success');
