import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(["experience", "proyek", "akademik"]);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky header when scrolled past a certain point (e.g., past the Hero section)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isScrolled) return null;

  const getButtonClass = (section: string) => {
    const isActive = activeSection === section;
    const isAnyActive = activeSection !== "";
    
    if (!isAnyActive) {
      return "flex flex-col items-center gap-1 group px-4 py-3 transition-all duration-300 opacity-100";
    }
    
    return `flex flex-col items-center gap-1 group px-4 py-3 transition-all duration-300 ${
      isActive ? "opacity-100 drop-shadow-md" : "opacity-50 hover:opacity-100 hover:drop-shadow-sm"
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F4F3F0]/95 backdrop-blur-sm border-b border-[#5B6572]/30 text-[#222222] shadow-sm transition-all duration-300 animate-in slide-in-from-top-full">
      <nav className="w-full px-[10pt] py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <button
            onClick={() => scrollToSection("experience")}
            className={getButtonClass("experience")}
          >
            <span className="text-xl md:text-2xl font-bold text-[#222222]">Working Experiences</span>
            <span className="text-sm font-cambria max-w-[320px] text-center hidden md:block text-[#222222]">Professional Journey, Career Path,<br />and Strategic Contributions</span>
          </button>
          <button
            onClick={() => scrollToSection("proyek")}
            className={getButtonClass("proyek")}
          >
            <span className="text-xl md:text-2xl font-bold text-[#222222]">Profile Qualifications</span>
            <span className="text-sm font-cambria max-w-[320px] text-center hidden md:block text-[#222222]">Certifications, Licenses, Memberships, Competencies, Skills, and Achievements.</span>
          </button>
          <button
            onClick={() => scrollToSection("akademik")}
            className={getButtonClass("akademik")}
          >
            <span className="text-xl md:text-2xl font-bold text-[#222222]">Academic Logbook</span>
            <span className="text-sm font-cambria max-w-[320px] text-center hidden md:block text-[#222222]">Thesis, Publications, Research Planning,<br />Projects, Seminars, and Transcripts</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
