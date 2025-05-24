#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if ports 3000 and 5000 are available
echo -e "${YELLOW}Checking if required ports are available...${NC}"

PORT_3000_AVAILABLE=true
PORT_5000_AVAILABLE=true

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Error: Port 3000 is already in use by another application.${NC}"
    echo "This will prevent the React app from starting correctly."
    PORT_3000_AVAILABLE=false
fi

if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Error: Port 5000 is already in use by another application.${NC}"
    echo "This will prevent the WebSocket server from starting correctly."
    PORT_5000_AVAILABLE=false
fi

if [ "$PORT_3000_AVAILABLE" = false ] || [ "$PORT_5000_AVAILABLE" = false ]; then
    echo -e "${YELLOW}Would you like to attempt to free these ports? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        if [ "$PORT_3000_AVAILABLE" = false ]; then
            echo "Attempting to free port 3000..."
            kill $(lsof -Pi :3000 -sTCP:LISTEN -t) 2>/dev/null
            sleep 1
        fi
        if [ "$PORT_5000_AVAILABLE" = false ]; then
            echo "Attempting to free port 5000..."
            kill $(lsof -Pi :5000 -sTCP:LISTEN -t) 2>/dev/null
            sleep 1
        fi
    else
        echo -e "${RED}Cannot start VG-Canvas without required ports. Exiting.${NC}"
        exit 1
    fi
fi

# Start the WebSocket server in the background
echo -e "${GREEN}Starting the WebSocket server...${NC}"
node server.js > server.log 2>&1 &
SERVER_PID=$!

# Wait a moment for the server to start
echo "Waiting for server to initialize..."
sleep 2

# Check if server started successfully by looking for the "Server running" message
if ! grep -q "Server running on port" server.log; then
    echo -e "${YELLOW}Waiting a bit longer for server to start...${NC}"
    sleep 3
fi

if ! ps -p $SERVER_PID > /dev/null; then
    echo -e "${RED}Error: WebSocket server failed to start. Check server.log for details.${NC}"
    exit 1
fi

echo -e "${GREEN}WebSocket server running on port 5000 (PID: $SERVER_PID)${NC}"
echo "You can view server logs in server.log"

# Start the React app
echo -e "${GREEN}Starting the React application...${NC}"
echo "Once the application starts, open your browser to: http://localhost:3000"
echo -e "${YELLOW}To use collaboration features:${NC}"
echo "1. Click the 'Collaborate' button in the top right"
echo "2. Enter your name and create or join a room"
echo "3. Share the invite link with others to collaborate"
echo ""
echo -e "${YELLOW}If you encounter any issues:${NC}"
echo "- Check server.log for error messages"
echo "- See COLLABORATION_TROUBLESHOOTING.md for solutions to common problems"
echo ""
echo -e "${RED}Press Ctrl+C to stop both the server and the application${NC}"
echo ""

npm start

# When React app is terminated, also kill the server
echo -e "${YELLOW}Shutting down WebSocket server (PID: $SERVER_PID)...${NC}"
kill $SERVER_PID 2>/dev/null

echo -e "${GREEN}VG-Canvas has been shut down.${NC}"