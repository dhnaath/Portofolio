const fs = require('fs');
let code = fs.readFileSync('src/app/App.tsx', 'utf8');

const target = `                  <div className="w-[80vw] sm:w-[361px] md:w-[406px] shrink-0">
                    <div className="w-full h-[290px] rounded-[2rem] border-2 border-[#5B6572]/20 overflow-hidden shadow-sm bg-[#F4F3F0] relative">
                      <img 
                        src="https://github.com/dhnaath/Resources-Portofolio/blob/main/ChatGPT%20Image%2023%20Jul%202026,%2011.29.33.png?raw=true" 
                        alt="Foto Kegiatan"
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={(e) => e.preventDefault()} 
                      />
                    </div>
                  </div>`;

const replacement = `                  <div className="w-[80vw] sm:w-[361px] md:w-[406px]">
                    <FlipbookCard 
                      category="PRAMUKA"
                      title="Bumi Perkemahan Siluk Muara Tawang"
                      content="Kegiatan Bumi Perkemahan Siluk Muara Tawang."
                      darkImage="https://github.com/dhnaath/Resources-Portofolio/blob/main/ChatGPT%20Image%2023%20Jul%202026,%2011.29.33.png?raw=true"
                      disableFlip={true}
                      lightMode={true}
                    />
                  </div>`;

let newCode = code.replace(target, replacement);

fs.writeFileSync('src/app/App.tsx', newCode);
console.log('done');
