const fs = require('fs');

const files = [
  'src/app/components/ExperienceCard.tsx',
  'src/app/components/PosIndoExperience.tsx',
  'src/app/components/KspNusantaraExperience.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/font-cambria/g, 'font-serif');
  content = content.replace(/font-serif">/g, 'font-cambria">');
  // Specifically target the list:
  content = content.replace('text-justify pb-8 font-serif', 'text-justify pb-8 font-cambria');
  fs.writeFileSync(file, content);
});
