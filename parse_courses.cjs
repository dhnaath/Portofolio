const fs = require('fs');

const coursesText = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');
const courseMatch = coursesText.match(/const courses: Course\[\] = \[\s*([\s\S]*?)\s*\];/);
if (!courseMatch) {
  console.log("courses not found");
  process.exit(1);
}

const lines = courseMatch[1].split('\n').map(l => l.trim()).filter(l => l.startsWith('{'));
const existingCourses = lines.map(l => {
  const mkMatch = l.match(/mataKuliah:\s*"([^"]+)"/);
  const sksMatch = l.match(/sks:\s*([\d.]+)/);
  const nilaiMatch = l.match(/nilai:\s*([\d.]+)/);
  if (!mkMatch) return null;
  return {
    mataKuliah: mkMatch[1],
    sks: sksMatch ? parseFloat(sksMatch[1]) : 0,
    nilai: nilaiMatch ? parseFloat(nilaiMatch[1]) : 0,
    original: l
  };
}).filter(Boolean);

console.log(JSON.stringify(existingCourses, null, 2));
