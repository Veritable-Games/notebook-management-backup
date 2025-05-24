#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Simple menu
echo -e "${GREEN}=== VG-Canvas Launcher ===${NC}"
echo ""
echo "Select mode:"
echo "1. Single User Mode"
echo "2. Collaboration Mode"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
  1)
    echo -e "${GREEN}Starting VG-Canvas in single user mode...${NC}"
    npm start
    ;;
  2)
    echo -e "${GREEN}Starting VG-Canvas in collaboration mode...${NC}"
    
    # Check if ports are available
    PORT_3000_AVAILABLE=true
    PORT_5000_AVAILABLE=true
    
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}Port 3000 is in use. The React app may not start correctly.${NC}"
        PORT_3000_AVAILABLE=false
    fi
    
    if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${RED}Port 5000 is in use. The collaboration server may not start correctly.${NC}"
        PORT_5000_AVAILABLE=false
    fi
    
    if [ "$PORT_3000_AVAILABLE" = false ] || [ "$PORT_5000_AVAILABLE" = false ]; then
        echo -e "${YELLOW}Would you like to free these ports? (y/n)${NC}"
        read -r response
        if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
            echo "Attempting to free ports..."
            if [ "$PORT_3000_AVAILABLE" = false ]; then
                kill $(lsof -Pi :3000 -sTCP:LISTEN -t) 2>/dev/null
            fi
            if [ "$PORT_5000_AVAILABLE" = false ]; then
                kill $(lsof -Pi :5000 -sTCP:LISTEN -t) 2>/dev/null
            fi
            sleep 1
        fi
    fi
    
    # Start the server
    echo -e "${GREEN}Starting collaboration server...${NC}"
    node server.js > server.log 2>&1 &
    SERVER_PID=$!
    sleep 2
    
    # Start the app
    echo -e "${GREEN}Starting VG-Canvas app...${NC}"
    echo -e "${YELLOW}Important: When the app loads, click 'Collaborate' button in the top right.${NC}"
    npm start
    
    # Clean up
    echo -e "${YELLOW}Shutting down server...${NC}"
    kill $SERVER_PID 2>/dev/null
    ;;
  *)
    echo -e "${RED}Invalid choice${NC}"
    ;;
esac