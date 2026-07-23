import { useState } from "react";
import { FileText, ExternalLink } from "lucide-react";

interface DocumentationCardProps {
  title: string;
  description: string;
  type: string;
  tags: string[];
  link?: string;
  externalLink?: string;
  bgColor?: string;
  textColor?: string;
  hideFileIcon?: boolean;
  date?: string;
  credentialId?: string;
  compact?: boolean;
}

export function DocumentationCard({
  title,
  description,
  type,
  tags,
  link,
  externalLink,
  bgColor,
  textColor,
  hideFileIcon,
  date,
  credentialId,
  compact = false,
}: DocumentationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const maxLength = compact ? 80 : 150;
  const isLongDescription = description.length > maxLength;
  const displayDescription = isExpanded || !isLongDescription 
    ? description 
    : `${description.slice(0, maxLength)}...`;

  return (
    <div 
      className={`rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full ${compact ? 'p-4' : 'p-6'}`}
      style={{ backgroundColor: bgColor || '#FFFFFF' }}
    >
      <div className={`flex items-start justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
        {!hideFileIcon && (
          link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className={`bg-[#F4F3F0] rounded-lg hover:bg-[#E5E4E2] transition-colors cursor-pointer ${compact ? 'p-2' : 'p-3'}`}>
              <FileText size={compact ? 16 : 24} className="text-[#5B6572]" />
            </a>
          ) : (
            <div className={`bg-[#F4F3F0] rounded-lg ${compact ? 'p-2' : 'p-3'}`}>
              <FileText size={compact ? 16 : 24} className="text-[#5B6572]" />
            </div>
          )
        )}
        {(externalLink || link) && (
          <a
            href={externalLink || link}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ml-auto ${textColor ? 'hover:opacity-80' : 'text-[#5B6572] hover:text-[#222222]'}`}
            style={textColor ? { color: textColor } : {}}
          >
            <ExternalLink size={compact ? 16 : 20} />
          </a>
        )}
      </div>
      <h3 
        className={`${compact ? 'text-base mb-1' : 'text-xl mb-2'} font-serif ${!textColor ? 'text-[#222222]' : ''}`}
        style={textColor ? { color: textColor } : {}}
      >
        {title}
      </h3>
      <p 
        className={`${compact ? 'text-xs' : 'text-sm'} ${date ? 'mb-1' : (compact ? 'mb-1' : 'mb-3')} font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
        style={textColor ? { color: textColor } : {}}
      >
        {type}
      </p>
      {date && (
        <p 
          className={`${compact ? 'text-xs' : 'text-sm'} ${credentialId ? 'mb-1' : (compact ? 'mb-1' : 'mb-3')} font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          {date}
        </p>
      )}
      {credentialId && (
        <p 
          className={`${compact ? 'text-xs mb-2' : 'text-sm mb-3'} font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          Credential ID: {credentialId}
        </p>
      )}
      <div className={`${compact ? 'mb-2' : 'mb-4'} flex-1`}>
        <p 
          className={`font-cambria leading-relaxed ${compact ? 'text-[11px]' : ''} ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          {displayDescription}
        </p>
        {isLongDescription && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${compact ? 'text-xs' : 'text-sm'} font-semibold mt-1 hover:underline focus:outline-none ${!textColor ? 'text-[#222222]' : ''}`}
            style={textColor ? { color: textColor } : {}}
          >
            {isExpanded ? "Tampilkan lebih sedikit" : "Selengkapnya"}
          </button>
        )}
      </div>
      <div className={`flex flex-wrap ${compact ? 'gap-1 mt-auto' : 'gap-2'}`}>
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`${compact ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-sm'} rounded-full ${!textColor ? 'bg-[#F4F3F0] text-[#5B6572]' : 'bg-white/20'}`}
            style={textColor ? { color: textColor } : {}}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
