const fs = require('fs');
const content = `import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";

interface Topic {
  no: number;
  materi: string;
  keterangan: string;
  items?: string[];
}

const topics: Topic[] = [
  { 
    no: 1, 
    materi: "What is Six Sigma?", 
    keterangan: "Lulus",
    items: [
      "Data Driven Processes and Decisions",
      "Decision Making Without Six Sigma",
      "Decision Making With Six Sigma",
      "Defining Six Sigma",
      "Real World Examples",
      "Calculating Sigma Level",
      "Sigma Level Is Not a Final Indicator",
      "Common Six Sigma Principles",
      "Customer-Focused Improvement",
      "Value Streams",
      "Continuous Process Improvement",
      "Variation",
      "Removing Waste",
      "Equipping People",
      "Controlling the Process",
      "Challenges of Six Sigma",
      "Lack of Support",
      "Lack of Resources or Knowledge",
      "Poor Project Execution",
      "Data Access Issues",
      "Concerns about Using Six Sigma in a Specific Industry"
    ]
  },
  { no: 2, materi: "Six Sigma History and Application", keterangan: "Lulus", items: [] },
  { no: 3, materi: "Other Process Improvement and Quality Methods", keterangan: "Lulus", items: [] },
];

export function SixSigmaTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(topics.length / itemsPerPage);

  const paginatedTopics = topics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleRow = (no: number) => {
    setExpandedRows(prev => 
      prev.includes(no) ? prev.filter(id => id !== no) : [...prev, no]
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FFFFFF] rounded-xl border border-[#5B6572]/30 shadow-sm overflow-hidden text-[#222222]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#E4E2DC] border-b border-[#5B6572]/30 text-sm md:text-base font-serif">
              <th className="py-4 px-4 font-semibold w-16 text-center">No</th>
              <th className="py-4 px-4 font-semibold">Materi Pelatihan</th>
              <th className="py-4 px-4 font-semibold w-32 text-center">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTopics.map((topic, index) => {
              const isExpanded = expandedRows.includes(topic.no);
              return (
                <Fragment key={topic.no}>
                  <tr 
                    className={\`border-b border-[#5B6572]/20 hover:bg-[#F4F3F0] transition-colors \${index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#FAFAFA]'}\`}
                  >
                    <td className="py-3 px-4 text-center font-cambria text-[#5B6572]">{topic.no}</td>
                    <td className="py-3 px-4 font-cambria text-[#222222]">
                      <div 
                        className="flex items-center justify-between cursor-pointer group hover:bg-[#E4E2DC]/50 p-2 -mx-2 rounded-md transition-colors"
                        onClick={() => toggleRow(topic.no)}
                      >
                        <span>{topic.materi}</span>
                        {isExpanded ? (
                          <ChevronUp size={18} className="text-[#222222] transition-colors" />
                        ) : (
                          <ChevronDown size={18} className="text-[#5B6572] group-hover:text-[#222222] transition-colors" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-cambria">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#222222] text-[#FFFFFF]">
                        {topic.keterangan}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && topic.items && topic.items.length > 0 && (
                    <tr className="bg-[#F9F9F8] border-b border-[#5B6572]/20">
                      <td></td>
                      <td colSpan={2} className="py-3 px-4">
                        <ul className="list-disc list-inside space-y-1 font-cambria text-sm text-[#5B6572]">
                          {topic.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {paginatedTopics.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-[#5B6572] font-cambria">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-3 bg-[#FAFAFA] border-t border-[#5B6572]/30 font-cambria">
          <span className="text-sm text-[#5B6572]">
            Halaman {currentPage} dari {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-[#E4E2DC] text-[#222222] disabled:opacity-50 hover:bg-[#D4D2CC] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-[#E4E2DC] text-[#222222] disabled:opacity-50 hover:bg-[#D4D2CC] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
\`;

fs.writeFileSync('src/app/components/SixSigmaTable.tsx', content, 'utf8');
