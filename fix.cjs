const fs = require('fs');
const files = [
  'src/app/components/ExperienceCard.tsx',
  'src/app/components/PosIndoExperience.tsx',
  'src/app/components/KspNusantaraExperience.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    /\{\(\(\) => \{\n\s*const tags = description\.split\(\/\[;:\\n\]\+\/\)\.map\(t => t\.trim\(\)\)\.filter\(Boolean\);[\s\S]*?return renderedTags;\n\s*\}\)\(\)\}/,
    `{(() => {
            const tags = description.split(/[;:\\n]+/).map(t => t.trim()).filter(Boolean);
            return tags.map((tag, i) => (
              <span key={i} className="bg-[#102A43]/10 text-[#102A43] text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full border border-[#102A43]/20 flex-1 text-center whitespace-nowrap">
                {tag}
              </span>
            ));
          })()}`
  );
  fs.writeFileSync(file, content);
}
