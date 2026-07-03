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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <FileText size={24} className="text-gray-700" />
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ExternalLink size={20} />
          </a>
        )}
      </div>
      <h3 className="text-xl mb-2 text-gray-900 font-serif">{title}</h3>
      <p className="text-sm text-gray-500 mb-3 font-sans">{type}</p>
      <p className="text-gray-700 mb-4 font-cambria">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
