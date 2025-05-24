#!/bin/bash

# Build and link the shared UI library to all Veritable Games projects
# This script should be run from the shared-ui directory

set -e

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Build the shared UI library
echo -e "${YELLOW}Building shared UI library...${NC}"
npm run build
echo -e "${GREEN}Build complete!${NC}"

# Get the absolute path to the shared-ui directory
SHARED_UI_PATH=$(pwd)

# Function to link the shared UI library to a project
link_to_project() {
  local project_path="$1"
  local project_name="$2"
  
  echo -e "\n${YELLOW}Linking to $project_name...${NC}"
  
  # Check if the project exists
  if [ -d "$project_path" ]; then
    # Check if package.json exists
    if [ -f "$project_path/package.json" ]; then
      cd "$project_path"
      
      # Check if shared-ui is already in dependencies
      if grep -q "\"@veritable-games/shared-ui\"" package.json; then
        echo "shared-ui already in dependencies, updating..."
      else
        echo "Adding shared-ui to dependencies..."
      fi
      
      # Install the shared UI library
      npm install --save "$SHARED_UI_PATH"
      
      echo -e "${GREEN}Successfully linked shared UI to $project_name!${NC}"
    else
      echo -e "${RED}No package.json found in $project_name, skipping...${NC}"
    fi
  else
    echo -e "${RED}$project_name directory not found, skipping...${NC}"
  fi
}

# Link to Canvas Application
link_to_project "../../projects/canvas-application" "Canvas Application"

# Link to Constellation Viewer frontend
link_to_project "../../projects/constellation-viewer/frontend" "Constellation Viewer"

# Link to Content Management frontend
link_to_project "../../projects/content-management/frontend" "Content Management"

# Link to User Admin Portal frontend
link_to_project "../../projects/user-admin-portal/frontend" "User Admin Portal"

echo -e "\n${GREEN}All projects linked successfully!${NC}"
echo -e "${YELLOW}Note: You may need to restart your development servers for changes to take effect.${NC}"