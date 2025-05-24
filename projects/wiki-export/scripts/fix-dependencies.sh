#!/bin/bash

# Fix Dependencies Script
# This script will fix dependency issues in projects

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing project dependencies...${NC}"

# Fix CM-Backend
echo -e "${YELLOW}Installing dependencies for CM-Backend...${NC}"
cd /home/user/Repository/WebProjects/Content-Management/backend
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}CM-Backend dependencies installed successfully${NC}"
else
  echo -e "${RED}Failed to install CM-Backend dependencies${NC}"
fi

# Fix CM-Frontend permissions
echo -e "${YELLOW}Fixing permissions for CM-Frontend...${NC}"
cd /home/user/Repository/WebProjects/Content-Management/frontend
rm -rf .next || true
mkdir -p .next
chmod -R 755 .next
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}CM-Frontend dependencies fixed successfully${NC}"
else
  echo -e "${RED}Failed to fix CM-Frontend dependencies${NC}"
fi

# Fix CV-Frontend
echo -e "${YELLOW}Installing dependencies for CV-Frontend...${NC}"
cd /home/user/Repository/WebProjects/Constellation-Viewer/frontend
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}CV-Frontend dependencies installed successfully${NC}"
else
  echo -e "${RED}Failed to install CV-Frontend dependencies${NC}"
fi

# Create missing index.js in the wiki-server directory
echo -e "${YELLOW}Creating missing server file for CV-Backend...${NC}"
mkdir -p /home/user/Repository/WebProjects/Constellation-Viewer/backend/wiki-server
cat > /home/user/Repository/WebProjects/Constellation-Viewer/backend/wiki-server/index.js << 'EOL'
/**
 * Wiki Server Index - Launcher for the server.js file
 */
const path = require('path');
const { execFile } = require('child_process');

console.log('Starting wiki server...');

// Path to the actual server.js file in parent directory
const serverPath = path.join(__dirname, '..', 'server.js');

console.log(`Server path: ${serverPath}`);

// Launch the server.js file as a child process
const child = execFile('node', [serverPath], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

// Forward console output from child process
child.stdout.on('data', (data) => {
  console.log(`${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`${data}`);
});

// Keep the process running
process.stdin.resume();

console.log('Wiki server started in background');
EOL

echo -e "${GREEN}Dependencies fixed. Now you can run start-all-services.sh${NC}"