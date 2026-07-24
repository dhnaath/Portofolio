import { useState } from "react";
import { Calendar, MapPin, ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceCardProps {
  title: string;
  company: React.ReactNode;
  location: string;
  period: string;
  periodEn?: string;
  description: string;
  achievements: string[];
  achievementsEn?: string[];
  image: string;
  images?: string[];
  licenses?: string;
  employmentType?: string;
  employmentTypeEn?: string;
  companyLogo?: string;
  tagColor?: string;
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  periodEn,
  description,
  achievements,
  achievementsEn,
  image,
  images,
  licenses,
  employmentType,
  employmentTypeEn,
  companyLogo,
  tagColor,
  lang = 'ID',
}: ExperienceCardProps & { lang?: 'ID' | 'EN' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const photoList = images && images.length > 0 ? images : [image];
  const color = tagColor || '#102A43';

  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 pb-4">
        <div className="flex flex-nowrap justify-center gap-2 w-full">
          {(() => {
            const tags = description.split(/[;:\n]+/).map(t => t.trim()).filter(Boolean);
            return tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full border flex-1 text-center whitespace-nowrap"
                style={{ backgroundColor: `${color}1A`, color: color, borderColor: `${color}33` }}
              >
                {tag}
              </span>
            ));
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
              className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
              
            />
          </div>
        ) : photoList.length === 2 ? (
          <div className="grid grid-cols-2 gap-1 aspect-[4/3] sm:aspect-[16/9]">
            {photoList.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
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
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
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
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
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
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
            {photoList.slice(2).map((src, i) => (
              <div key={i + 2} className="col-span-2 overflow-hidden">
                <img 
                  src={src} 
                  alt={typeof company === 'string' ? company : 'Company'} 
                  className="w-full h-full object-cover pointer-events-none select-none" onContextMenu={(e) => e.preventDefault()} draggable={false} 
                  
                />
              </div>
            ))}
          </div>
        )}
        <div className="p-6 pt-4">
          <div className="flex justify-between items-start gap-4 mb-4">
            <div className="flex items-center gap-4">
              {companyLogo && (
                <img src={companyLogo} alt={`${company} logo`} className="w-24 h-24 object-contain shrink-0" />
              )}
        
              <div>
                <h3 className="text-xl mb-2 text-[#222222] font-serif">{title}</h3>
                <p className="text-lg text-[#5B6572] whitespace-pre-line">{company}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4 text-[#5B6572] text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{lang === 'EN' && periodEn ? periodEn : period}</span>
            </div>
          </div>
          {licenses && (
            <div className="mb-4">
              <p className="font-semibold text-[#222222] mb-1 text-sm">{lang === 'EN' ? 'Professional Licenses:' : 'Sertifikasi & Lisensi Profesional:'}</p>
              <p className="text-[#5B6572] text-sm">{licenses}</p>
            </div>
          )}
          {employmentType && (
            <div className="mb-4">
              <p className="font-semibold text-[#222222] mb-1 text-sm">{lang === 'EN' ? 'Type of Employment:' : 'Jenis Pekerjaan:'}</p>
              <p className="text-[#5B6572] text-sm">{lang === 'EN' && employmentTypeEn ? employmentTypeEn : employmentType}</p>
            </div>
          )}
          
          <div className="relative">
            <div className={`overflow-hidden transition-all duration-300 relative ${isExpanded ? 'max-h-[2000px]' : 'max-h-[100pt]'}`}>
              <p className="font-semibold text-[#222222] mb-2 text-sm font-sans">{lang === 'EN' ? 'Key of Responsibilities:' : 'Tanggung Jawab Utama:'}</p>
              <ol className="list-decimal list-outside ml-4 space-y-1 text-[#5B6572] text-justify text-sm pb-8 font-cambria">
                {(lang === 'EN' && achievementsEn ? achievementsEn : achievements).map((achievement, index) => (
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
