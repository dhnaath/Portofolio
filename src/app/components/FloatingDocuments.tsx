import { FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { CVFlipbook } from "./CVFlipbook";

function FloatingDocumentCard({ 
  title, 
  pdfUrl,
  handleHeight = "180px"
}: { 
  title: string, 
  pdfUrl?: string,
  handleHeight?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if modal is open
      if (isModalOpen) return;
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setTimeout(() => setIsFlipped(false), 300);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModalOpen]);

  return (
    <>
      <div 
        ref={containerRef}
        className={`relative z-50 flex items-center`}
        onClick={() => {
           if (!isExpanded) setIsExpanded(true);
        }}
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
              transformStyle: "preserve-3d"
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
                else setIsModalOpen(true);
              }
            }}
          >
            {/* Front of Card (White) */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl flex items-center justify-center border border-gray-200 bg-white"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex flex-col items-center gap-6">
                <FileText size={72} className="text-gray-400" />
                <span className="text-gray-800 font-semibold tracking-wider text-xl">{title}</span>
              </div>
            </div>
            
            {/* Back of Card (Click to open) */}
            <div 
              className="absolute inset-0 rounded-lg shadow-2xl flex flex-col items-center justify-center border border-gray-200 bg-white p-4 text-center"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
            >
               <div className="text-gray-800 font-bold text-3xl mb-6">View Document</div>
               <div className="text-gray-500 text-lg font-semibold uppercase tracking-widest px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                 Click to open
               </div>
            </div>
          </motion.div>

          {/* The handle (visible when collapsed) */}
          <motion.div 
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer border border-gray-200 border-l-0 shadow-[4px_0_15px_rgba(0,0,0,0.1)] z-20 origin-left bg-white"
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
              className="text-gray-700 font-semibold text-lg tracking-widest whitespace-nowrap"
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

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <CVFlipbook title={title} pdfUrl={pdfUrl} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function FloatingDocuments() {
  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[15pt]">
      <div className="translate-y-[37pt]">
        <FloatingDocumentCard 
          title="Curriculum Vitae" 
          pdfUrl="https://raw.githubusercontent.com/dhnaath/Website-Portofolio/main/CV%20-%20DHIA%20NAJMI%20ATHALLAH.pdf" 
          handleHeight="calc(180px + 27.5pt)"
        />
      </div>
      <FloatingDocumentCard 
        title="Cover Letter" 
      />
    </div>
  );
}
