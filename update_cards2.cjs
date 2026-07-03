const fs = require('fs');

const files = [
  'src/app/components/ExperienceCard.tsx',
  'src/app/components/PosIndoExperience.tsx',
  'src/app/components/KspNusantaraExperience.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  // First make them all unique temp vars
  content = content.replace(/font-cambria/g, 'TEMP_FONT_CAMBRIA');
  content = content.replace(/font-serif/g, 'TEMP_FONT_SERIF');

  // h3 titles -> font-serif
  content = content.replace(/<h3 className="(.*?)TEMP_FONT_CAMBRIA(.*?)">/g, '<h3 className="$1font-serif$2">');
  // Key of Responsibilities -> font-sans
  content = content.replace(/TEMP_FONT_CAMBRIA">Key of Responsibilities:/g, 'font-sans">Key of Responsibilities:');
  // ol list -> font-cambria
  content = content.replace(/list-decimal(.*?)TEMP_FONT_CAMBRIA"/g, 'list-decimal$1font-cambria"');
  
  // any leftover TEMP_FONT_CAMBRIA make it font-serif or whatever it was
  content = content.replace(/TEMP_FONT_CAMBRIA/g, 'font-serif');
  content = content.replace(/TEMP_FONT_SERIF/g, 'font-cambria');

  fs.writeFileSync(file, content);
});
