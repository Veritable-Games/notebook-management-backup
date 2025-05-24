#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Update the configuration for the enhanced-visual-feedback.sh script
echo -e "${BLUE}Updating visual feedback configuration...${NC}"

# Create the config directory if it doesn't exist
mkdir -p /home/user/Repository/WebProjects/wiki-export/scripts/config

# Create a corrected app-config.json file
cat > /home/user/Repository/WebProjects/wiki-export/scripts/config/app-config.json << 'EOL'
{
  "applications": [
    {
      "name": "3D-Visualization",
      "port": 8081,
      "endpoint": "/"
    },
    {
      "name": "CM-Backend",
      "port": 3001,
      "endpoint": "/"
    },
    {
      "name": "CM-Frontend",
      "port": 3002,
      "endpoint": "/"
    },
    {
      "name": "CV-Backend",
      "port": 3004,
      "endpoint": "/api"
    },
    {
      "name": "CV-Frontend",
      "port": 9003,
      "endpoint": "/"
    },
    {
      "name": "PS2-Forum",
      "port": 8000,
      "endpoint": "/"
    },
    {
      "name": "Wiki-Export",
      "port": 8080,
      "endpoint": "/"
    }
  ]
}
EOL

# Run the enhanced-visual-feedback.sh script
/home/user/Repository/WebProjects/wiki-export/scripts/enhanced-visual-feedback.sh

echo -e "${GREEN}Visual feedback configuration updated.${NC}"
echo "Open the dashboard at /home/user/Repository/feedback/dashboard.html to see the status of all services."