#!/bin/bash
cat << 'INNER_EOF' > patch_transcript.cjs
const fs = require('fs');
let content = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf8');

// Update imports
content = content.replace(
  'import { Star, StarHalf, ArrowUpDown } from "lucide-react";',
  'import { Star, StarHalf, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";'
);

const oldSelector = `<div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-1 bg-[#F4F3F0] p-1 rounded-lg">
            <div className="px-3 py-1 text-sm font-medium text-[#5B6572]">
              Semester
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={\`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-colors \${selectedSemester === sem ? 'bg-[#FFFFFF] text-[#222222] shadow-sm' : 'text-[#5B6572] hover:text-[#5B6572]'}\`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>`;

const newSelector = `<div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setSelectedSemester(prev => (prev === 'all' ? 8 : Math.max(1, prev - 1)))}
            disabled={selectedSemester === 1}
            className="p-2 rounded-full bg-[#FFFFFF] shadow-sm border border-[#5B6572]/10 text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all"
            aria-label="Previous semester"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-1 bg-[#F4F3F0] px-4 py-2 rounded-full font-serif text-[#222222] min-w-[120px] justify-center">
            <span className="font-medium text-lg">
              {selectedSemester === 'all' ? 'All Semesters' : \`Semester \${selectedSemester}\`}
            </span>
          </div>

          <button
            onClick={() => setSelectedSemester(prev => (prev === 'all' ? 1 : Math.min(8, prev + 1)))}
            disabled={selectedSemester === 8}
            className="p-2 rounded-full bg-[#FFFFFF] shadow-sm border border-[#5B6572]/10 text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all"
            aria-label="Next semester"
          >
            <ChevronRight size={20} />
          </button>
        </div>`;

content = content.replace(oldSelector, newSelector);
fs.writeFileSync('src/app/components/TranscriptTable.tsx', content, 'utf8');
INNER_EOF
node patch_transcript.cjs
