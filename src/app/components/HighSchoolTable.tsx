import { Fragment, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function HighSchoolTable() {
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'A' | 'B' | 'C'>('all');
  const [direction, setDirection] = useState(1);
  const groups = ['all', 'A', 'B', 'C'];

  const nextGroup = () => {
    setDirection(1);
    setSelectedGroup(prev => {
      if (prev === 'all') return 'A';
      if (prev === 'A') return 'B';
      if (prev === 'B') return 'C';
      return 'all';
    });
  };

  const prevGroup = () => {
    setDirection(-1);
    setSelectedGroup(prev => {
      if (prev === 'all') return 'C';
      if (prev === 'C') return 'B';
      if (prev === 'B') return 'A';
      return 'all';
    });
  };

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextGroup();
    if (isRightSwipe) prevGroup();
  };
  
  const subjects = [
    { name: "Pendidikan Agama dan Budi Pekerti", score: 81, group: 'A' },
    { name: "Pendidikan Pancasila dan Kewarganegaraan", score: 83, group: 'A' },
    { name: "Bahasa Indonesia", score: 86, group: 'A' },
    { name: "Matematika", score: 81, group: 'A' },
    { name: "Sejarah Indonesia", score: 80, group: 'A' },
    { name: "Bahasa Inggris", score: 83, group: 'A' },
    { name: "Seni Budaya", score: 84, group: 'B' },
    { name: "Pendidikan Jasmani, Olahraga, dan Kesehatan", score: 81, group: 'B' },
    { name: "Prakarya dan Kewirausahaan", score: 86, group: 'B' },
    { name: "Muatan Lokal", score: null, group: 'B', sub: ['a.', 'b.', 'c.'] },
    { name: "Matematika", score: 80, group: 'C' },
    { name: "Biologi", score: 79, group: 'C' },
    { name: "Fisika", score: 82, group: 'C' },
    { name: "Kimia", score: 84, group: 'C' },
    { name: "Pilihan Lintas Minat: Bahasa dan Sastra Inggris", score: 88, group: 'C' },
  ];

  const filteredSubjects = useMemo(() => {
    if (selectedGroup === 'all') return subjects;
    return subjects.filter(s => s.group === selectedGroup);
  }, [selectedGroup]);

  let currentNo = 1;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 mb-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100/60 border border-emerald-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Kelompok A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100/60 border border-blue-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Kelompok B</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100/60 border border-yellow-300/50 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Kelompok C</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevGroup}
            className="p-2 text-[#5B6572] hover:text-[#222222] shrink-0 transition-all"
            aria-label="Previous group"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="flex items-center gap-1 px-4 py-2 font-serif text-[#222222] min-w-[120px] justify-center">
            <span className="font-medium text-lg">
              {selectedGroup === 'all' ? 'All Groups' : `Kelompok ${selectedGroup}`}
            </span>
          </div>

          <button
            onClick={nextGroup}
            className="p-2 text-[#5B6572] hover:text-[#222222] shrink-0 transition-all"
            aria-label="Next group"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-[#5B6572]/30 shadow-sm bg-[#FFFFFF]" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={selectedGroup}
          custom={direction}
          initial={(direction) => ({ x: 30 * direction, opacity: 0 })}
          animate={{ x: 0, opacity: 1 }}
          exit={(direction) => ({ x: -30 * direction, opacity: 0 })}
          transition={{ duration: 0.2 }}
          className="overflow-x-auto"
        >
        <table className="w-full text-left border-collapse table-fixed min-w-[600px] font-serif">
          <thead>
            <tr className="bg-[#F4F3F0] text-[#222222] border-b border-[#5B6572]/30 font-sans">
              <th className="py-4 px-4 font-semibold w-16 text-center">No.</th>
              <th className="py-4 px-4 font-semibold w-auto">Mata Pelajaran (Kurikulum 2013)</th>
              <th className="py-4 px-4 font-semibold w-40 text-center">Nilai Ujian Sekolah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#FFFFFF]">
            {filteredSubjects.map((subject, index) => {
              const bgClass = subject.group === 'A' 
                ? 'bg-emerald-100/60 hover:bg-emerald-200/60' 
                : subject.group === 'B' 
                ? 'bg-blue-100/60 hover:bg-blue-200/60' 
                : 'bg-yellow-100/60 hover:bg-yellow-200/60';

              if (subject.sub) {
                const startNo = currentNo++;
                return (
                  <Fragment key={index}>
                    <tr className={`transition-colors ${bgClass}`}>
                      <td className="py-3 px-4 text-center text-[#5B6572] align-top" rowSpan={subject.sub.length + 1}>{startNo}.</td>
                      <td className="py-3 px-4 text-[#222222]">{subject.name}</td>
                      <td className="py-3 px-4 text-center text-[#222222] font-medium"></td>
                    </tr>
                    {subject.sub.map((s, i) => (
                      <tr key={`${index}-${i}`} className={`transition-colors ${bgClass}`}>
                        <td className="py-3 px-4 text-[#222222] pl-8">{s}</td>
                        <td className="py-3 px-4 text-center text-[#222222] font-medium"></td>
                      </tr>
                    ))}
                  </Fragment>
                );
              }

              return (
                <tr key={index} className={`transition-colors ${bgClass}`}>
                  <td className="py-3 px-4 text-center text-[#5B6572]">{currentNo++}.</td>
                  <td className="py-3 px-4 text-[#222222]">{subject.name}</td>
                  <td className="py-3 px-4 text-center text-[#222222] font-medium">{subject.score}</td>
                </tr>
              );
            })}
            <tr className="bg-[#FAFAFA] font-sans">
              <td colSpan={2} className="py-4 px-4 text-center font-bold text-[#222222]">
                Rata-rata
              </td>
              <td className="py-4 px-4 text-center font-bold text-[#222222]">
                83
              </td>
            </tr>
          </tbody>
        </table>
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
