import { FileText, ExternalLink } from "lucide-react";

interface DocumentationCardProps {
  title: string;
  description: string;
  type: string;
  tags: string[];
  link?: string;
}

export function DocumentationCard({
  title,
  description,
  type,
  tags,
  link,
}: DocumentationCardProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-[#F4F3F0] p-3 rounded-lg">
          <FileText size={24} className="text-[#5B6572]" />
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5B6572] hover:text-[#222222] transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      <h3 className="text-xl mb-2 text-[#222222] font-serif">{title}</h3>
      <p className="text-sm text-[#5B6572] mb-3 font-sans">{type}</p>
      <p className="text-[#5B6572] mb-4 font-cambria">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-[#F4F3F0] text-[#5B6572] rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
