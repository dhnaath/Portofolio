#!/bin/bash
cat << 'INNER_EOF' > patch_app.cjs
const fs = require('fs');
const content = fs.readFileSync('src/app/App.tsx', 'utf8');

const startMarker = '<div id="akademik-logbook" className="relative mt-12 mb-12">';
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
          <div className="relative w-full overflow-hidden flex py-8 mt-12 mb-12">
            <style dangerouslySetInnerHTML={{__html: \`
              @keyframes marquee-reverse {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-reverse {
                animation: marquee-reverse 66s linear infinite;
              }
            \`}} />
            <div 
              className={\`flex gap-8 px-4 animate-marquee-reverse min-w-max group cursor-pointer\`}
              style={{ animationPlayState: isCarouselPaused ? 'paused' : 'running' }}
              onClick={() => setIsCarouselPaused(!isCarouselPaused)}
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 min-w-max items-start">
                  {akademikLogbookData.map((doc, index) => (
                    <div key={index} className="w-[85vw] sm:w-[500px] md:w-[560px]">
                      <FlipbookCard {...doc} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
`;

const finalCode = content.substring(0, startIndex) + newContent + content.substring(endIndex);
fs.writeFileSync('src/app/App.tsx', finalCode, 'utf8');
INNER_EOF
node patch_app.cjs
