const fs = require('fs');
let content = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf8');

const legendTarget = `<div className="flex items-center gap-4 flex-wrap">
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
            <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Prasyarat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span className="text-sm text-[#5B6572] font-medium">Ujian Khusus</span>
          </div>
        </div>`;

content = content.replace(legendTarget, newLegend);
fs.writeFileSync('src/app/components/TranscriptTable.tsx', content);
