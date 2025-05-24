#!/bin/bash

# Fix all issues script
# This script resolves dependency, permission, and port conflict issues

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Fixing all application issues...${NC}"
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

# Function to kill processes on a given port
kill_port() {
  local port=$1
  local pid=$(lsof -t -i:$port 2>/dev/null)
  
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}Killing process on port $port (PID: $pid)...${NC}"
    kill -9 $pid 2>/dev/null
    sleep 1
  fi
}

# Kill processes that might be causing issues
echo -e "${YELLOW}Stopping any running processes...${NC}"
kill_port 3001
kill_port 3002
kill_port 3003
kill_port 9003

# 1. Fix CM-Backend
echo -e "${YELLOW}Fixing CM-Backend...${NC}"
cd /home/user/Repository/WebProjects/Content-Management/backend
# Install Next.js locally
echo "Installing Next.js and dependencies..."
npm install next react react-dom --save 2>&1 | tee "$LOG_DIR/cm-backend-fix.log"

# 2. Fix CM-Frontend
echo -e "${YELLOW}Fixing CM-Frontend...${NC}"
cd /home/user/Repository/WebProjects/Content-Management/frontend
# Clear .next directory with sudo if needed
sudo rm -rf .next || {
  echo "Creating clean .next directory..."
  mkdir -p .next
  # Make sure directory has correct permissions
  chmod -R 755 .next
}
# Install dependencies
echo "Installing Next.js and dependencies..."
npm install next react react-dom --save 2>&1 | tee "$LOG_DIR/cm-frontend-fix.log"

# 3. Fix CV-Backend
echo -e "${YELLOW}Fixing CV-Backend...${NC}"
cd /home/user/Repository/WebProjects/Constellation-Viewer/backend

# Find and update the port in server.js
if grep -q "const port = 3003" server.js; then
  echo "Port already set to 3003 in server.js"
else
  # Replace the port in server.js to avoid conflicts
  sed -i 's/const port = [0-9]\+/const port = 3003/' server.js
  echo "Updated port to 3003 in server.js"
fi

# 4. Fix CV-Frontend
echo -e "${YELLOW}Fixing CV-Frontend...${NC}"
cd /home/user/Repository/WebProjects/Constellation-Viewer/frontend
# Install missing dependencies
npm install path-browserify --save-dev 2>&1 | tee "$LOG_DIR/cv-frontend-fix.log"

# Update webpack.config.js to use the right port
if grep -q "port: 9003" webpack.config.js; then
  echo "Port already set to 9003 in webpack.config.js"
else
  # If port line exists, update it
  if grep -q "port:" webpack.config.js; then
    sed -i 's/port: [0-9]\+/port: 9003/' webpack.config.js
    echo "Updated port to 9003 in webpack.config.js"
  fi
fi

echo -e "${GREEN}All fixes applied. Now you can run start-all-services.sh${NC}"