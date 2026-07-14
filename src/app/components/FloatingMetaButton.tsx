import { MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";

export function FloatingMetaButton() {
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
    <div 
      ref={containerRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
      
    >
      <motion.div
        className="relative flex items-center"
        initial={{ x: "calc(100% - 48px)" }}
        animate={{ x: isExpanded ? -28 : "calc(100% - 48px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* The 3-dot handle (visible when collapsed) */}
        <motion.div 
          onClick={() => { if (!isExpanded) setIsExpanded(true); }}
          className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer shadow-[-4px_0_15px_rgba(0,0,0,0.1)] z-20 origin-right"
          style={{
            borderTopLeftRadius: "30px",
            borderBottomLeftRadius: "30px",
            width: "48px",
            height: "120px",
            backgroundColor: '#D4B886',
            backgroundImage: 'radial-gradient(circle at center, #D4B886 0%, #C4A570 100%)'
          }}
          animate={{ 
            opacity: isExpanded ? 0 : 1, 
            scaleX: isExpanded ? 0 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="mr-1">
            <MoreVertical size={28} className="text-[#222222]" strokeWidth={2.5} />
          </div>
        </motion.div>
        
        {/* The Horizontal Squid Game Card */}
        <motion.div 
          className="relative z-10 cursor-pointer"
          style={{
            width: "288px",
            height: "168px",
            transformStyle: "preserve-3d",
            pointerEvents: isExpanded ? "auto" : "none"
          }}
          animate={{ 
            rotateY: isFlipped ? 180 : 0,
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.8
          }}
          transition={{ duration: 0.6, type: "spring", stiffness: 70, damping: 15 }}
          onClick={() => isExpanded && setIsFlipped(!isFlipped)}
        >
          {/* Front of Card (Squid Game Shapes) */}
          <div 
            className="absolute inset-0 rounded-lg shadow-2xl flex items-center justify-center"
            style={{ 
              backgroundColor: '#D4B886', 
              backfaceVisibility: 'hidden', 
              backgroundImage: 'radial-gradient(circle at center, #D4B886 0%, #C4A570 100%)' 
            }}
          >
            <svg width="156" height="53" viewBox="0 0 130 44" className="text-[#222222] fill-transparent stroke-current stroke-[4] stroke-linejoin-round">
              <circle cx="22" cy="22" r="16" />
              <polygon points="65,6 81,38 49,38" />
              <rect x="94" y="6" width="30" height="30" />
            </svg>
          </div>
          
          {/* Back of Card (Text) */}
          <div 
            className="absolute inset-0 rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 text-center"
            style={{ 
              backgroundColor: '#D4B886', 
              transform: 'rotateY(180deg)', 
              backfaceVisibility: 'hidden', 
              backgroundImage: 'radial-gradient(circle at center, #D4B886 0%, #C4A570 100%)' 
            }}
          >
             <div className="text-[#222222] font-mono font-bold text-3xl tracking-[0.3em] opacity-80 mb-2">001</div>
             <div className="text-[#222222] text-base font-semibold tracking-widest opacity-70">CONFIDENTIAL</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
