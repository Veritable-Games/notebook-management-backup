#!/bin/bash

# VG-Canvas Docker Testing Environment Launcher
# This script starts the Docker-based testing environment for VG-Canvas

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Multi-Instance Testing Environment${BLUE}               ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Make sure Docker is installed and running
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed or not in PATH${NC}"
    echo "Please install Docker and try again"
    exit 1
fi

if ! docker info &> /dev/null; then
    echo -e "${RED}Error: Docker daemon is not running${NC}"
    echo "Please start Docker and try again"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed or not in PATH${NC}"
    echo "Please install docker-compose and try again"
    exit 1
fi

# Ensure we're in the project root
cd "$(dirname "$0")/../../" || exit 1

echo -e "${YELLOW}Starting VG-Canvas testing environment...${NC}"
echo -e "${BLUE}This will launch multiple instances of VG-Canvas in Docker containers${NC}"
echo

# Build and start the environment
echo -e "${YELLOW}Building Docker images...${NC}"
docker-compose build

echo -e "${YELLOW}Starting Docker containers...${NC}"
docker-compose up -d

# Display access information
echo
echo -e "${GREEN}VG-Canvas testing environment is running!${NC}"
echo
echo -e "${YELLOW}Access Points:${NC}"
echo -e "${BLUE}• Server:${NC}  http://localhost:5000"
echo -e "${BLUE}• Client 1:${NC} http://localhost:3001"
echo -e "${BLUE}• Client 2:${NC} http://localhost:3002" 
echo -e "${BLUE}• Client 3:${NC} http://localhost:3003"
echo
echo -e "${YELLOW}Testing Instructions:${NC}"
echo "1. Open Client 1 in a browser"
echo "2. Create a drawing room"
echo "3. Open Client 2 and Client 3 in separate browser windows"
echo "4. Join the same room from all clients"
echo "5. Test collaborative drawing functionality"
echo
echo -e "${YELLOW}To stop the testing environment:${NC}"
echo "Run: ./tests/docker/stop-test-environment.sh"
echo
echo -e "${BLUE}Logs are being collected in the ./logs directory${NC}"