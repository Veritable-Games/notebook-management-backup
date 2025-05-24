#!/bin/bash
# simple-cleanup.sh
#
# A simplified script to remove the most obvious redundant files

REPO_ROOT="/home/user/Repository"
cd "$REPO_ROOT"

# Terminal colors
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Simple Cleanup Script${NC}"
echo "This script will clean up obvious redundancies in the repository."

# Create needed directories if they don't exist
mkdir -p config/services
mkdir -p logs
mkdir -p data
mkdir -p pids

# 1. Move main services.json to the right place
if [ -f "projects/config/services.json" ] && [ ! -f "config/services/services.json" ]; then
  echo "Moving services.json to the central config directory..."
  cp projects/config/services.json config/services/
fi

# 2. Move any logs to the central logs directory
if [ -d "projects/logs" ]; then
  echo "Moving logs to the central logs directory..."
  cp -r projects/logs/* logs/ 2>/dev/null || true
fi

# 3. Clean up WebProjects directory (if it exists and is empty)
if [ -d "WebProjects" ]; then
  if [ -z "$(ls -A WebProjects 2>/dev/null)" ]; then
    echo "Removing empty WebProjects directory..."
    rmdir WebProjects
  else
    echo -e "${YELLOW}WebProjects directory contains files and was not removed.${NC}"
  fi
fi

echo -e "${GREEN}Basic cleanup complete!${NC}"
echo ""
echo "Key directories:"
echo "- config/    : Configuration files"
echo "- data/      : Data storage"
echo "- logs/      : Log files"
echo "- notebooks/ : Notebooks and content"
echo "- projects/  : Project code"
echo ""
echo "To get started, see GETTING_STARTED.md"