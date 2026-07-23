import { useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface Position {
  title: string;
  period: string;
  periodEn?: string;
  location: string;
  achievements: string[];
  achievementsEn?: string[];
  employmentType?: string;
  employmentTypeEn?: string;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
}

interface KspNusantaraExperienceProps {
  company: string;
  companyLogo?: string;
  positions: Position[];
  description?: string;
}

export function KspNusantaraExperience({ company, companyLogo, positions, description = "", lang = 'ID' }: KspNusantaraExperienceProps & { lang?: 'ID' | 'EN' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Collect all unique images from all positions
  const allImages = Array.from(new Set(positions.flatMap(pos => [pos.image, pos.image2, pos.image3, pos.image4]).filter(Boolean) as string[]));

  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex flex-nowrap justify-center gap-2 w-full">
          {(() => {
            const tags = description.split(/[;:\n]+/).map(t => t.trim()).filter(Boolean);
            return tags.map((tag, i) => (
              <span key={i} className="bg-[#102A43]/10 text-[#102A43] text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full border border-[#102A43]/20 flex-1 text-center whitespace-nowrap">
                {tag}
              </span>
            ));
          })()}
        </div>
      </div>

      {/* Images */}
      <div>
        {allImages.length === 1 ? (
          <div className="aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
            <img 
              src={allImages[0]} 
              alt={company} 
              className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
              
            />
          </div>
        ) : allImages.length === 2 ? (
          <div className="grid grid-cols-2 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {allImages.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
          </div>
        ) : allImages.length === 3 ? (
          <div className="grid grid-cols-3 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {allImages.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
          </div>
        ) : allImages.length === 4 ? (
          <div className="grid grid-cols-2 gap-1 aspect-square sm:aspect-[4/3]">
            {allImages.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
          </div>
        ) : allImages.length > 0 ? (
          <div className="grid grid-cols-6 gap-1 aspect-square sm:aspect-[4/3]">
            {allImages.slice(0, 2).map((src, i) => (
              <div key={i} className="col-span-3 overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
            {allImages.slice(2).map((src, i) => (
              <div key={i + 2} className="col-span-2 overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-8">
            <div className="flex items-center gap-4">
              {companyLogo && (
                <img src={companyLogo} alt={`${company} logo`} className="w-24 h-24 object-contain shrink-0" />
              )}
        
              <div>
                <h3 className="text-xl mb-2 text-[#222222] font-serif whitespace-pre-line">{company}</h3>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className={`flex flex-col gap-8 overflow-hidden transition-all duration-300 relative ${isExpanded ? 'max-h-[3000px]' : 'max-h-[100pt]'} pb-8`}>
              {positions.map((pos, index) => (
                <div key={index} className="relative pb-6 last:pb-0">
                  {/* Timeline connector */}
                  {index !== positions.length - 1 && (
                    <div className="absolute left-[7px] top-6 bottom-0 w-[2px] bg-gray-200"></div>
            
                  )}
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-[#FFFFFF] mt-1.5 shrink-0 relative z-10"></div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg mb-3 text-[#222222] font-medium">{pos.title}</h4>
                      <div className="flex flex-col gap-2 mb-4 text-[#5B6572] text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{pos.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{lang === 'EN' && pos.periodEn ? pos.periodEn : pos.period}</span>
                        </div>
                      </div>
                      {pos.employmentType && (
                        <div className="mb-4">
                          <p className="font-semibold text-[#222222] mb-1 text-sm">{lang === 'EN' ? 'Type of Employment:' : 'Jenis Pekerjaan:'}</p>
                          <p className="text-[#5B6572] text-sm">{lang === 'EN' && pos.employmentTypeEn ? pos.employmentTypeEn : pos.employmentType}</p>
                        </div>
                      )}

                      <div>
                        <div>
                          <p className="font-semibold text-[#222222] mb-2 text-sm font-sans">{lang === 'EN' ? 'Key of Responsibilities:' : 'Tanggung Jawab Utama:'}</p>
                          <ol className="list-decimal list-outside ml-4 space-y-1 text-[#5B6572] text-justify text-sm">
                            {(lang === 'EN' && pos.achievementsEn ? pos.achievementsEn : pos.achievements).map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              )}
        
            </div>
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex justify-center items-center cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <div className="text-[#5B6572]/70 hover:text-[#5B6572] transition-colors bg-[#FFFFFF] rounded-full shadow-md border border-[#5B6572]/20 p-1">
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
