import { Sparkles } from "lucide-react";

interface CreativeCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

export function CreativeCard({
  title,
  description,
  category,
  image,
  tags,
}: CreativeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="h-64 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
          <Sparkles size={16} className="text-gray-700" />
          <span className="text-sm text-gray-700">{category}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
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
    </div>
  );
}
