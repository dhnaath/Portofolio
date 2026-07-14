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
}: DocumentationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const maxLength = 150;
  const isLongDescription = description.length > maxLength;
  const displayDescription = isExpanded || !isLongDescription 
    ? description 
    : `${description.slice(0, maxLength)}...`;

  return (
    <div 
      className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      style={{ backgroundColor: bgColor || '#FFFFFF' }}
    >
      <div className="flex items-start justify-between mb-4">
        {!hideFileIcon && (
          link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="bg-[#F4F3F0] p-3 rounded-lg hover:bg-[#E5E4E2] transition-colors cursor-pointer">
              <FileText size={24} className="text-[#5B6572]" />
            </a>
          ) : (
            <div className="bg-[#F4F3F0] p-3 rounded-lg">
              <FileText size={24} className="text-[#5B6572]" />
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
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      <h3 
        className={`text-xl mb-2 font-serif ${!textColor ? 'text-[#222222]' : ''}`}
        style={textColor ? { color: textColor } : {}}
      >
        {title}
      </h3>
      <p 
        className={`text-sm ${date ? 'mb-1' : 'mb-3'} font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
        style={textColor ? { color: textColor } : {}}
      >
        {type}
      </p>
      {date && (
        <p 
          className={`text-sm ${credentialId ? 'mb-1' : 'mb-3'} font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          {date}
        </p>
      )}
      {credentialId && (
        <p 
          className={`text-sm mb-3 font-sans ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          Credential ID: {credentialId}
        </p>
      )}
      <div className="mb-4">
        <p 
          className={`font-cambria leading-relaxed ${!textColor ? 'text-[#5B6572]' : ''}`}
          style={textColor ? { color: textColor } : {}}
        >
          {displayDescription}
        </p>
        {isLongDescription && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-sm font-semibold mt-1 hover:underline focus:outline-none ${!textColor ? 'text-[#222222]' : ''}`}
            style={textColor ? { color: textColor } : {}}
          >
            {isExpanded ? "Tampilkan lebih sedikit" : "Selengkapnya"}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-sm ${!textColor ? 'bg-[#F4F3F0] text-[#5B6572]' : 'bg-white/20'}`}
            style={textColor ? { color: textColor } : {}}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
