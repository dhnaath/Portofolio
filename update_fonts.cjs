const fs = require('fs');

function updateFile(file) {
  let content = fs.readFileSync(file, 'utf-8');
  // Replace some fonts
  // We'll just review files manually and apply sed or inline node script
}
