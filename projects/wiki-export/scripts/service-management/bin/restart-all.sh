#!/bin/bash

# Restart All Services Script
# Restarts all manageable services

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}Restarting all services...${NC}"

# Stop all services
"$SCRIPT_DIR/stop-all.sh"

# Give services time to fully stop
sleep 2

# Start all services
"$SCRIPT_DIR/start-all.sh"

echo -e "${GREEN}All services have been restarted.${NC}"