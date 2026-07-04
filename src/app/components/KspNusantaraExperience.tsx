import { useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface Position {
  title: string;
  period: string;
  location: string;
  achievements: string[];
  image: string;
  image2?: string;
}

interface KspNusantaraExperienceProps {
  company: string;
  companyLogo?: string;
  positions: Position[];
  description?: string;
}

export function KspNusantaraExperience({ company, companyLogo, positions, description = "" }: KspNusantaraExperienceProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Collect all unique images from all positions
  const allImages = Array.from(new Set(positions.flatMap(pos => [pos.image, pos.image2]).filter(Boolean) as string[]));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {(() => {
            const tags = description.split(/[;:\n]+/).map(t => t.trim()).filter(Boolean);
            const totalBars = tags.length;
            const renderedTags = [];
            for (let i = 0; i < totalBars; i++) {
              if (i < tags.length) {
                renderedTags.push(
                  <span key={i} className="bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full border border-blue-100">
                    {tags[i]}
                  </span>
                );
              } else {
                renderedTags.push(
                  <span key={i} className="bg-gray-50 text-transparent text-sm font-medium px-3 py-1 rounded-full border border-gray-100 w-24 inline-block">
                    &nbsp;
                  </span>
                );
              }
            }
            return renderedTags;
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
              className="w-full h-full object-cover " 
              
            />
          </div>
        ) : allImages.length === 2 ? (
          <div className="grid grid-cols-2 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {allImages.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover " 
                  
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
                  className="w-full h-full object-cover " 
                  
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
                  className="w-full h-full object-cover " 
                  
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
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
            {allImages.slice(2).map((src, i) => (
              <div key={i + 2} className="col-span-2 overflow-hidden">
                <img 
                  src={src} 
                  alt={company} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-8">
            <div className="flex items-start gap-4">
              {companyLogo && (
                <img src={companyLogo} alt={`${company} logo`} className="w-16 h-16 object-contain shrink-0" />
              )}
        
              <div>
                <h3 className="text-2xl mb-2 text-gray-900 font-serif">{company}</h3>
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
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 bg-white mt-1.5 shrink-0 relative z-10"></div>
                    
                    <div className="flex-1">
                      <h4 className="text-xl mb-3 text-gray-900 font-medium">{pos.title}</h4>
                      <div className="flex flex-col gap-2 mb-4 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{pos.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{pos.period}</span>
                        </div>
                      </div>

                      <div>
                        <div>
                          <p className="font-semibold text-gray-900 mb-2 font-sans">Key of Responsibilities:</p>
                          <ol className="list-decimal list-outside ml-4 space-y-1 text-gray-700 text-justify">
                            {pos.achievements.map((achievement, i) => (
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
              <div className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full shadow-md border border-gray-100 p-1">
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
