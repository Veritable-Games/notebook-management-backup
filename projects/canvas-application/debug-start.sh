#!/bin/bash

# VG-Canvas Debugging Launcher
# This script starts VG-Canvas with detailed debugging enabled

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Debugging Launcher${BLUE}                           ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Ask to kill existing processes
echo -e "${YELLOW}Checking for existing Node.js processes...${NC}"
node_processes=$(ps aux | grep -i "node" | grep -v grep | wc -l)

if [ $node_processes -gt 0 ]; then
  echo -e "Found ${RED}$node_processes${NC} running Node.js processes"
  ps aux | grep -i "node" | grep -v grep
  
  read -p "Would you like to kill all Node.js processes? (y/n): " kill_answer
  if [[ $kill_answer == "y" || $kill_answer == "Y" ]]; then
    echo "Killing all Node.js processes..."
    killall node 2>/dev/null
    killall npm 2>/dev/null
    sleep 2
  fi
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the app with debugging
echo -e "${YELLOW}Starting VG-Canvas in Debug Mode...${NC}"
echo -e "${BLUE}Logs will be saved to logs/debug.log${NC}"

# Add debugging environment variables
export NODE_ENV=development
export DEBUG=*
export BROWSERSLIST_IGNORE_OLD_DATA=true
export SKIP_PREFLIGHT_CHECK=true

# Start the React app with detailed output
echo -e "${GREEN}Starting React application...${NC}"
npm start --no-install --loglevel verbose > logs/debug.log 2>&1

echo -e "${YELLOW}Application exited. See logs/debug.log for details.${NC}"