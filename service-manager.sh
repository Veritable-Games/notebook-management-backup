#!/bin/bash
# service-manager.sh - Wrapper for the Node.js service manager
# Usage: ./service-manager.sh <command> [services...]
#
# Commands:
#   start   [service...]  Start services (all if none specified)
#   stop    [service...]  Stop services (all if none specified)
#   restart [service...]  Restart services (all if none specified)
#   status  [service...]  Show service status (all if none specified)

# Terminal colors for better output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Make sure Node.js is installed
if ! command -v node &> /dev/null; then
  echo -e "${RED}Node.js is required but not installed. Please install Node.js to continue.${NC}"
  exit 1
fi

# Make service manager executable
chmod +x scripts/service-manager.js

# Check if config directories exist, create them if they don't
if [ ! -d "config/services" ]; then
  echo -e "${YELLOW}Creating config directories...${NC}"
  mkdir -p config/services
fi

# Check if the main services.json exists, copy from projects if needed
if [ ! -f "config/services/services.json" ] && [ -f "projects/config/services.json" ]; then
  echo -e "${YELLOW}Copying services.json from old location...${NC}"
  cp projects/config/services.json config/services/
fi

# Execute the service manager with all arguments
echo -e "${BLUE}Executing service manager...${NC}"
node scripts/service-manager.js "$@"

# Show a helpful message if no arguments were provided
if [ $# -eq 0 ]; then
  echo -e "\n${YELLOW}Usage: ./service-manager.sh <command> [services...]${NC}"
  echo -e "\n${GREEN}Commands:${NC}"
  echo "  start   [service...]  Start services (all if none specified)"
  echo "  stop    [service...]  Stop services (all if none specified)"
  echo "  restart [service...]  Restart services (all if none specified)"
  echo "  status  [service...]  Show service status (all if none specified)"
  echo -e "\n${GREEN}Examples:${NC}"
  echo "  ./service-manager.sh start               # Start all services"
  echo "  ./service-manager.sh start backend-api   # Start a specific service"
  echo "  ./service-manager.sh status              # Check status of all services"
fi