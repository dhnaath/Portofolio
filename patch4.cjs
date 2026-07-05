const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');

const oldLevels = 'const transcriptLevels = ["Sarjana Terapan Logistik (S.Tr.Log.) - Universitas Logistik dan Bisnis Internasional (ULBI)", "Certified White Belt - The Council for Six Sigma Certification (CSSC)"];';
const newLevels = `const transcriptLevels = [
    { title: "Sarjana Terapan Logistik (S.Tr.Log.)", institution: "Universitas Logistik dan Bisnis Internasional (ULBI)" },
    { title: "Certified White Belt", institution: "The Council for Six Sigma Certification (CSSC)" }
  ];`;

content = content.replace(oldLevels, newLevels);

const oldHeader = `<div id="transcript" className="text-center mb-8">
                <h3 className="text-3xl mb-4 text-[#222222] font-serif transition-opacity duration-300">
                  {transcriptLevels[transcriptPage]}
                </h3>
              </div>`;
const newHeader = `<div id="transcript" className="text-center mb-8 flex flex-col items-center" style={{ gap: '1.5pt' }}>
                <h3 className="text-3xl text-[#222222] font-serif transition-opacity duration-300 m-0 leading-tight">
                  {transcriptLevels[transcriptPage].title}
                </h3>
                <p className="text-xl text-[#5B6572] font-serif transition-opacity duration-300 m-0 leading-tight">
                  {transcriptLevels[transcriptPage].institution}
                </p>
              </div>`;

content = content.replace(oldHeader, newHeader);

const oldFallback = `<p className="font-cambria text-lg">Data transkrip untuk {transcriptLevels[transcriptPage]} belum tersedia.</p>`;
const newFallback = `<p className="font-cambria text-lg">Data transkrip untuk {transcriptLevels[transcriptPage].title} belum tersedia.</p>`;

content = content.replace(oldFallback, newFallback);

fs.writeFileSync('src/app/App.tsx', content, 'utf8');
