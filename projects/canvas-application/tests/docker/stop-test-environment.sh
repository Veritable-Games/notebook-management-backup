#!/bin/bash

# VG-Canvas Docker Testing Environment Shutdown
# This script stops the Docker-based testing environment for VG-Canvas

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Testing Environment - Shutdown${BLUE}                  ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Ensure we're in the project root
cd "$(dirname "$0")/../../" || exit 1

echo -e "${YELLOW}Stopping VG-Canvas testing environment...${NC}"

# Stop the containers
docker-compose down

echo
echo -e "${GREEN}VG-Canvas testing environment has been stopped${NC}"
echo
echo -e "${BLUE}Testing logs are preserved in the ./logs directory${NC}"