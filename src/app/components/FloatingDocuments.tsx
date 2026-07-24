import { FileText, ExternalLink, Linkedin } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

function FloatingDocumentCard({ 
  title, 
  pdfUrl,
  handleHeight = "180px",
  handleWidth = "72px",
  cardWidth = "432px",
  cardHeight = "252px",
  icon,
  bgColor = "#222222",
  customBack,
  customFront,
  handleContent
}: { 
  title: string, 
  pdfUrl?: string,
  handleHeight?: string,
  handleWidth?: string,
  cardWidth?: string,
  cardHeight?: string,
  icon?: React.ReactNode,
  bgColor?: string,
  customBack?: React.ReactNode,
  customFront?: React.ReactNode,
  handleContent?: React.ReactNode
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setTimeout(() => setIsFlipped(false), 300);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative z-50 flex items-center`}
        
      >
        <motion.div
          className="relative flex items-center"
          initial={{ x: "calc(-100% + 72px)" }}
          animate={{ x: isExpanded ? 42 : "calc(-100% + 72px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* The Horizontal Card */}
          <motion.div 
            className="relative z-10 cursor-pointer"
            style={{
              width: cardWidth,
              height: cardHeight,
              transformStyle: "preserve-3d",
              pointerEvents: isExpanded ? "auto" : "none"
            }}
            animate={{ 
              rotateY: isFlipped ? 180 : 0,
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 0.8
            }}
            transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 15 }}
            onClick={() => {
              if (isExpanded) {
                if (!isFlipped) setIsFlipped(true);
                else {
                  if (pdfUrl) {
                    window.open(pdfUrl, '_blank');
                  }
                }
              }
            }}
          >
            {/* Front of Card (White) */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl flex items-center justify-center border" style={{ backfaceVisibility: 'hidden', backgroundColor: bgColor === "#222222" ? "#FFFFFF" : bgColor, borderColor: bgColor === "#222222" ? "#FFFFFF" : bgColor }}
              
            >
              {customFront ? customFront : (
                <div className="flex flex-col items-center gap-6">
                  {icon ? icon : <FileText size={72} className="text-[#5B6572]/70" />}
                  <span className={`font-semibold tracking-wider text-xl italic ${bgColor === "#222222" ? "text-[#222222]" : "text-[#FFFFFF]"}`}>{title}</span>
                </div>
              )}
            </div>
            
            {/* Back of Card (Click to open) */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl flex flex-col items-center justify-center border p-4 text-center" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', backgroundColor: bgColor === "#222222" ? "#FFFFFF" : bgColor, borderColor: bgColor === "#222222" ? "#FFFFFF" : bgColor }}
              
            >
               {customBack ? customBack : (
                 <div className={`flex items-center gap-2 text-lg font-semibold uppercase tracking-widest px-6 py-3 border rounded-full transition-colors ${bgColor === "#222222" ? "text-[#222222] border-[#222222] hover:bg-[#F4F3F0]" : "text-[#F4F3F0] border-[#F4F3F0] hover:bg-[#222222] hover:text-[#FFFFFF] hover:border-[#222222]"}`}>
                   <span>Click to open</span>
                   <ExternalLink size={20} />
                 </div>
               )}
            </div>
          </motion.div>

          {/* The handle (visible when collapsed) */}
          <motion.div 
            onClick={() => { if (!isExpanded) setIsExpanded(true); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border border-l-0 shadow-[4px_0_15px_rgba(0,0,0,0.5)] z-20 origin-left pointer-events-auto" style={{ borderTopRightRadius: "45px", borderBottomRightRadius: "45px", width: handleWidth, height: handleHeight, backgroundColor: bgColor, borderColor: bgColor }}
            
            animate={{ 
              opacity: isExpanded ? 0 : 1, 
              scaleX: isExpanded ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            {handleContent ? (
              handleContent
            ) : (
              <div 
                className="text-[#FFFFFF] font-semibold text-lg tracking-widest whitespace-nowrap italic"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)"
                }}
              >
                {title}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}



export function FloatingDocuments() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[15pt] pointer-events-none">
      <div className="translate-y-[57pt]">
        <FloatingDocumentCard 
          title="Curriculum Vitae" 
          pdfUrl="#"
          handleHeight="calc(180px + 30.5pt)"
          icon={<img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/cv_1810684.png?raw=true" alt="CV Icon" className="w-[126px] h-[126px] object-contain" />}
        />
      </div>
      <div className="translate-y-[15pt]">
        <FloatingDocumentCard 
          title="Cover Letter" 
          pdfUrl="#"
          icon={<img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/envelope_5744290.png?raw=true" alt="Cover Letter Icon" className="w-[126px] h-[126px] object-contain" />}
        />
      </div>
      <div className="-translate-y-[37pt]">
        <FloatingDocumentCard 
          title="LinkedIn" 
          pdfUrl="https://linkedin.com/in/dhnaath"
          handleHeight="80px"
          cardWidth="248px"
          cardHeight="145px"
          bgColor="#0a66c2"
          customFront={<div className="flex w-full h-full items-center justify-center p-8"><img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/Linkedin-logo-white-png-wordmark-icon-horizontal-900x233.png?raw=true" alt="LinkedIn Logo" className="w-[158px] h-auto object-contain drop-shadow-md" /></div>}
          customBack={<div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest px-4 py-2 border rounded-full transition-colors text-[#F4F3F0] border-[#F4F3F0] hover:bg-[#222222] hover:text-[#FFFFFF] hover:border-[#222222]"><span>Click to open</span><ExternalLink size={16} /></div>}
          handleContent={<div className="flex w-full h-full items-center justify-center -translate-x-[4px]"><img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/linkedin-130_1024.png?raw=true" alt="LinkedIn" className="w-[42px] h-auto object-contain" style={{ transform: "rotate(0deg)" }} /></div>}
        />
      </div>
    </div>
  );
}
