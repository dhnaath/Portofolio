const fs = require('fs');
let content = fs.readFileSync('src/app/App.tsx', 'utf8');
content = content.replace(
  `<div className="w-[80vw] sm:w-[361px] md:w-[406px]">\n                    <FlipbookCard \n                      category="KATEGORI BARU"\n                      title="Kartu Baru"\n                      content="Deskripsi kartu baru."\n                      darkImage=""\n                      disableFlip={true}\n                      lightMode={true}\n                    />\n                  </div>`,
  `<div className="w-[80vw] sm:w-[361px] md:w-[406px] shrink-0">
                    <div className="w-full h-[290px] rounded-[2rem] border-2 border-[#5B6572]/20 overflow-hidden shadow-sm bg-white relative">
                      <img 
                        src="https://github.com/dhnaath/Resources-Portofolio/blob/main/sertif%20pramuka%20suhaid.png?raw=true" 
                        alt="Sertifikat Pramuka" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" draggable={false} onContextMenu={(e) => e.preventDefault()} 
                      />
                    </div>
                  </div>`
);
fs.writeFileSync('src/app/App.tsx', content);
