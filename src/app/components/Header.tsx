import { useActiveSection } from "../hooks/useActiveSection";

export function Header() {
  const activeSection = useActiveSection(["experience", "akademik", "proyek"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <header className="w-full transition-all duration-300 border-y border-gray-200">
      <nav className="w-full px-[10pt] py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 md:gap-0">
          <button
            onClick={() => scrollToSection("experience")}
            className={getButtonClass("experience")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Working Experiences</span>
            <span className="text-sm font-cambria max-w-[320px] text-center text-gray-800">Professional Journey, Career Path,<br />and Strategic Contributions</span>
          </button>
          <button
            onClick={() => scrollToSection("akademik")}
            className={getButtonClass("akademik")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Academic Logbook</span>
            <span className="text-sm font-cambria max-w-[320px] text-center text-gray-800">Thesis, Publications, Research Planning,<br />Projects, Seminars, and Transcripts</span>
          </button>
          <button
            onClick={() => scrollToSection("proyek")}
            className={getButtonClass("proyek")}
          >
            <span className="text-xl md:text-2xl font-bold text-gray-900">Profile Qualifications</span>
            <span className="text-sm font-cambria max-w-[320px] text-center text-gray-800">Certifications, Licenses, Memberships, Competencies, Skills, and Achievements.</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
