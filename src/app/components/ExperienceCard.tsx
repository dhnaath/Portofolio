import { useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: React.ReactNode;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  image: string;
  images?: string[];
  licenses?: string;
  employmentType?: string;
  companyLogo?: string;
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  description,
  achievements,
  image,
  images,
  licenses,
  employmentType,
  companyLogo,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const photoList = images && images.length > 0 ? images : [image];

  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {(() => {
            const tags = description.split(/[;:\n]+/).map(t => t.trim()).filter(Boolean);
            const totalBars = tags.length;
            const renderedTags = [];
            for (let i = 0; i < totalBars; i++) {
              if (i < tags.length) {
                renderedTags.push(
                  <span key={i} className="bg-[#102A43]/10 text-[#102A43] text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-[#102A43]/20 flex-auto text-center whitespace-nowrap">
                    {tags[i]}
                  </span>
                );
              } else {
                renderedTags.push(
                  <span key={i} className="bg-[#F4F3F0] text-transparent text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border border-[#5B6572]/20 flex-auto text-center whitespace-nowrap">
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
        {photoList.length === 1 ? (
          <div className="aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
            <img 
              src={photoList[0]} 
              alt={typeof company === 'string' ? company : 'Company'} 
              className="w-full h-full object-cover " 
              
            />
          </div>
        ) : photoList.length === 2 ? (
          <div className="grid grid-cols-2 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {photoList.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
          </div>
        ) : photoList.length === 3 ? (
          <div className="grid grid-cols-3 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {photoList.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
          </div>
        ) : photoList.length === 4 ? (
          <div className="grid grid-cols-2 gap-1 aspect-square sm:aspect-[4/3]">
            {photoList.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-1 aspect-square sm:aspect-[4/3]">
            {photoList.slice(0, 2).map((src, i) => (
              <div key={i} className="col-span-3 overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
            {photoList.slice(2).map((src, i) => (
              <div key={i + 2} className="col-span-2 overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover " 
                  
                />
              </div>
            ))}
          </div>
        )}
        <div className="p-6 pt-4">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex items-start gap-4">
              {companyLogo && (
                <img src={companyLogo} alt={`${company} logo`} className="w-16 h-16 object-contain shrink-0" />
              )}
        
              <div>
                <h3 className="text-2xl mb-2 text-[#222222] font-serif">{title}</h3>
                <p className="text-xl text-[#5B6572]">{company}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#5B6572]">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{period}</span>
            </div>
          </div>
          {licenses && (
            <div className="mb-4">
              <p className="font-semibold text-[#222222] mb-1">Professional Licenses:</p>
              <p className="text-[#5B6572]">{licenses}</p>
            </div>
          )}
          {employmentType && (
            <div className="mb-4">
              <p className="font-semibold text-[#222222] mb-1">Type of Employment:</p>
              <p className="text-[#5B6572]">{employmentType}</p>
            </div>
          )}
          
          <div className="relative">
            <div className={`overflow-hidden transition-all duration-300 relative ${isExpanded ? 'max-h-[2000px]' : 'max-h-[100pt]'}`}>
              <p className="font-semibold text-[#222222] mb-2 font-sans">Key of Responsibilities:</p>
              <ol className="list-decimal list-outside ml-4 space-y-1 text-[#5B6572] text-justify pb-8 font-cambria">
                {achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ol>
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
