const fs = require('fs');
const path = require('path');

// Path to server.js file
const serverPath = '/home/user/Repository/WebProjects/Constellation-Viewer/backend/server.js';

// Read the original file
console.log(`Reading ${serverPath}...`);
const originalContent = fs.readFileSync(serverPath, 'utf8');

// Add import for routes
const importStatement = "const { setupRoutes } = require('./routes');";

// Add call to setupRoutes before app.listen
const setupRoutesCall = "// Setup routes for unified interface\nsetupRoutes(app);";

// Modify the server.js file
const modifiedContent = originalContent
  .replace('const express = require(\'express\');', 'const express = require(\'express\');\n' + importStatement)
  .replace('// Integrate relationship API', setupRoutesCall + '\n\n// Integrate relationship API');

// Backup the original file
fs.writeFileSync(serverPath + '.bak2', originalContent);

// Write the modified file
fs.writeFileSync(serverPath, modifiedContent);

console.log(`Successfully updated ${serverPath}`);
console.log(`Original file backed up to ${serverPath}.bak2`);
