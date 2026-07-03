const fs = require('fs');

let text = fs.readFileSync('src/app/components/TranscriptTable.tsx', 'utf-8');

// 1. Update interface
text = text.replace(/interface Course \{\n  mataKuliah: string;\n  sks: number;\n  nilai: number;\n\}/, 'interface Course {\n  mataKuliah: string;\n  sks: number;\n  nilai: number;\n  semester: number;\n}');

// 2. Update courses
const newCourses = fs.readFileSync('new_courses.txt', 'utf-8');
text = text.replace(/const courses: Course\[\] = \[\s*[\s\S]*?\s*\];/, newCourses);

// 3. Update filter logic
const filterRegex = /filtered = courses\.filter\(\(c, i\) => \{\n\s*\/\/ Assume courses are distributed across 8 semesters for now\n\s*\/\/ This is a placeholder since we don't have actual semester data\n\s*const mockSemester = Math\.floor\(i \/ Math\.ceil\(courses\.length \/ 8\)\) \+ 1;\n\s*return \(c as any\)\.semester \? \(c as any\)\.semester === selectedSemester : mockSemester === selectedSemester;\n\s*\}\);/;
text = text.replace(filterRegex, 'filtered = courses.filter(c => c.semester === selectedSemester);');

fs.writeFileSync('src/app/components/TranscriptTable.tsx', text);
