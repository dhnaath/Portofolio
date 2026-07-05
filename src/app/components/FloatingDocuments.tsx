import { FileText, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

function FloatingDocumentCard({ 
  title, 
  pdfUrl,
  handleHeight = "180px",
  icon
}: { 
  title: string, 
  pdfUrl?: string,
  handleHeight?: string,
  icon?: React.ReactNode
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
              width: "432px",
              height: "252px",
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
              className="absolute inset-0 rounded-lg shadow-2xl flex items-center justify-center border border-[#222222] bg-[#222222]"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex flex-col items-center gap-6">
                {icon ? icon : <FileText size={72} className="text-[#5B6572]/70" />}
                <span className="text-[#FFFFFF] font-semibold tracking-wider text-xl italic">{title}</span>
              </div>
            </div>
            
            {/* Back of Card (Click to open) */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl flex flex-col items-center justify-center border border-[#222222] bg-[#222222] p-4 text-center"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            >
               <div className="flex items-center gap-2 text-[#F4F3F0] text-lg font-semibold uppercase tracking-widest px-6 py-3 border border-[#5B6572] rounded-full hover:bg-[#222222] transition-colors">
                 <span>Click to open</span>
                 <ExternalLink size={20} />
               </div>
            </div>
          </motion.div>

          {/* The handle (visible when collapsed) */}
          <motion.div 
            onClick={() => { if (!isExpanded) setIsExpanded(true); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border border-[#222222] border-l-0 shadow-[4px_0_15px_rgba(0,0,0,0.5)] z-20 origin-left bg-[#222222]"
            style={{
              borderTopRightRadius: "45px",
              borderBottomRightRadius: "45px",
              width: "72px",
              height: handleHeight,
            }}
            animate={{ 
              opacity: isExpanded ? 0 : 1, 
              scaleX: isExpanded ? 0 : 1
            }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="text-[#FFFFFF] font-semibold text-lg tracking-widest whitespace-nowrap italic"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)"
              }}
            >
              {title}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export function FloatingDocuments() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[15pt]">
      <div className="translate-y-[37pt]">
        <FloatingDocumentCard 
          title="Curriculum Vitae" 
          pdfUrl="#"
          handleHeight="calc(180px + 27.5pt)"
          icon={<img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/cv_1810684.png?raw=true" alt="CV Icon" className="w-[126px] h-[126px] object-contain" />}
        />
      </div>
      <FloatingDocumentCard 
        title="Cover Letter" 
        pdfUrl="#"
        icon={<img src="https://github.com/dhnaath/Resources-Portofolio/blob/main/envelope_5744290.png?raw=true" alt="Cover Letter Icon" className="w-[126px] h-[126px] object-contain" />}
      />
    </div>
  );
}
