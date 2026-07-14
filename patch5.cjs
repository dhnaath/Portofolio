const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const importTarget = 'import { TranscriptTable } from "./components/TranscriptTable";';
const newImport = importTarget + '\nimport { SixSigmaTable } from "./components/SixSigmaTable";';
content = content.replace(importTarget, newImport);

const oldLogic = `{transcriptPage === 0 ? (
                  <TranscriptTable />
                ) : (
                  <div className="flex items-center justify-center h-[400px] bg-[#FFFFFF] rounded-xl border border-[#5B6572]/30 shadow-sm text-[#5B6572]">
                    <p className="font-cambria text-lg">Data transkrip untuk {transcriptLevels[transcriptPage].title} belum tersedia.</p>
                  </div>
                )}`;

const newLogic = `{transcriptPage === 0 && <TranscriptTable />}
                {transcriptPage === 1 && <SixSigmaTable />}`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/app/App.tsx', content, 'utf8');
