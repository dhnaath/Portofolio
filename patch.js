const fs = require('fs');
const content = fs.readFileSync('src/app/App.tsx', 'utf8');

const startMarker = '<div className="relative w-full overflow-hidden flex py-8 mt-12 mb-12">';
const endMarker = '          </div>\n        </div>\n      </section>';

const startIndex = content.indexOf(startMarker);
if (startIndex === -1) {
    console.error("Start marker not found");
    process.exit(1);
}

const endIndex = content.indexOf(endMarker, startIndex);
if (endIndex === -1) {
    console.error("End marker not found");
    process.exit(1);
}

const newContent = `
          <div id="akademik-logbook" className="relative mt-12 mb-12">
            <div className="flex items-center justify-center gap-4 max-w-7xl mx-auto">
              <button
                onClick={() => setAkademikPage((prev) => Math.max(0, prev - 1))}
                disabled={akademikPage === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {akademikLogbookData.slice(akademikPage * 3, akademikPage * 3 + 3).map((doc, index) => (
                  <FlipbookCard key={index} {...doc} />
                ))}
              </div>

              <button
                onClick={() => setAkademikPage((prev) => Math.min(Math.ceil(akademikLogbookData.length / 3) - 1, prev + 1))}
                disabled={akademikPage >= Math.ceil(akademikLogbookData.length / 3) - 1 || akademikLogbookData.length === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] hover:text-[#222222] disabled:opacity-50 disabled:cursor-not-allowed hidden md:flex shrink-0"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
              <button
                onClick={() => setAkademikPage((prev) => Math.max(0, prev - 1))}
                disabled={akademikPage === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => setAkademikPage((prev) => Math.min(Math.ceil(akademikLogbookData.length / 3) - 1, prev + 1))}
                disabled={akademikPage >= Math.ceil(akademikLogbookData.length / 3) - 1 || akademikLogbookData.length === 0}
                className="p-2 rounded-full bg-[#FFFFFF] shadow-md text-[#5B6572] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
`;

const finalCode = content.substring(0, startIndex) + newContent + content.substring(endIndex);
fs.writeFileSync('src/app/App.tsx', finalCode, 'utf8');
