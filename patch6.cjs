const fs = require('fs');
let content = fs.readFileSync('src/app/components/SixSigmaTable.tsx', 'utf8');

content = content.replace('import { ChevronLeft, ChevronRight } from "lucide-react";', 'import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";');

const oldTd = '<td className="py-3 px-4 font-cambria text-[#222222]">{topic.materi}</td>';
const newTd = `<td className="py-3 px-4 font-cambria text-[#222222]">
                  <div className="flex items-center justify-between cursor-pointer group hover:bg-[#E4E2DC]/50 p-2 -mx-2 rounded-md transition-colors">
                    <span>{topic.materi}</span>
                    <ChevronDown size={18} className="text-[#5B6572] group-hover:text-[#222222] transition-colors" />
                  </div>
                </td>`;

content = content.replace(oldTd, newTd);
fs.writeFileSync('src/app/components/SixSigmaTable.tsx', content, 'utf8');
