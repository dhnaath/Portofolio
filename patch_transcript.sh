#!/bin/bash
cat << 'INNER_EOF' > patch.cjs
const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const stateMarker = 'const [docPage, setDocPage] = useState(0);';
if (content.includes(stateMarker)) {
  content = content.replace(stateMarker, stateMarker + '\n  const [transcriptPage, setTranscriptPage] = useState(3);\n  const transcriptLevels = ["Sekolah Dasar (SD)", "Sekolah Menengah Pertama (SMP)", "Sekolah Menengah Atas (SMA)", "Sarjana Terapan Logistik (S.Tr.Log.)", "Sertifikasi Lainnya"];');
}

const tableTarget = `          <div id="transcript" className="text-center mb-12">
            <h3 className="text-3xl mb-4 text-[#222222] font-serif">Sarjana Terapan Logistik (S.Tr.Log.)</h3>
          </div>
          <TranscriptTable />`;

const newTableBlock = `          <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto w-full">
            <button
              onClick={() => setTranscriptPage((prev) => Math.max(0, prev - 1))}
              disabled={transcriptPage === 0}
              className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
              aria-label="Previous transcript"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="w-full max-w-5xl overflow-hidden min-h-[500px]">
              <div id="transcript" className="text-center mb-8">
                <h3 className="text-3xl mb-4 text-[#222222] font-serif transition-opacity duration-300">
                  {transcriptLevels[transcriptPage]}
                </h3>
              </div>
              
              <div className="transition-opacity duration-300">
                {transcriptPage === 3 ? (
                  <TranscriptTable />
                ) : (
                  <div className="flex items-center justify-center h-[400px] bg-[#FFFFFF] rounded-xl border border-[#5B6572]/30 shadow-sm text-[#5B6572]">
                    <p className="font-cambria text-lg">Data transkrip untuk {transcriptLevels[transcriptPage]} belum tersedia.</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setTranscriptPage((prev) => Math.min(transcriptLevels.length - 1, prev + 1))}
              disabled={transcriptPage === transcriptLevels.length - 1}
              className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
              aria-label="Next transcript"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
            <button
              onClick={() => setTranscriptPage((prev) => Math.max(0, prev - 1))}
              disabled={transcriptPage === 0}
              className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="Previous transcript"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setTranscriptPage((prev) => Math.min(transcriptLevels.length - 1, prev + 1))}
              disabled={transcriptPage === transcriptLevels.length - 1}
              className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="Next transcript"
            >
              <ChevronRight size={24} />
            </button>
          </div>`;

content = content.replace(tableTarget, newTableBlock);
fs.writeFileSync('src/app/App.tsx', content, 'utf8');
INNER_EOF
node patch.cjs
