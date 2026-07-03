import { useState, useEffect } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

export function StickyHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection(["experience", "akademik", "proyek"]);

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
    return `flex flex-col items-center gap-1 group px-4 py-3 rounded-lg transition-all duration-300 ${
      isActive ? "bg-gray-100 shadow-sm" : "hover:bg-gray-50"
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#F9F8F5]/95 backdrop-blur-sm border-b border-gray-200 text-gray-900 shadow-sm transition-all duration-300 animate-in slide-in-from-top-full">
      <nav className="w-full px-[10pt] py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0">
          <button
            onClick={() => scrollToSection("experience")}
            className={getButtonClass("experience")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Working Experiences</span>
            <span className={`text-sm font-serif max-w-[320px] text-center hidden md:block transition-colors ${activeSection === "experience" ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}>Professional Journey, Career Path,<br />and Strategic Contributions</span>
          </button>
          <button
            onClick={() => scrollToSection("akademik")}
            className={getButtonClass("akademik")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Academic Logbook</span>
            <span className={`text-sm font-serif max-w-[320px] text-center hidden md:block transition-colors ${activeSection === "akademik" ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}>Thesis, Publications, Research Planning,<br />Projects, Seminars, and Transcripts</span>
          </button>
          <button
            onClick={() => scrollToSection("proyek")}
            className={getButtonClass("proyek")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Profile Qualifications</span>
            <span className={`text-sm font-serif max-w-[320px] text-center hidden md:block transition-colors ${activeSection === "proyek" ? "text-gray-800" : "text-gray-500 group-hover:text-gray-700"}`}>Certifications, Licenses, Memberships, Competencies, Skills, and Achievements.</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
