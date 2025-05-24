#!/bin/bash

# Stop All Services Script
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

LOG_DIR="/home/user/Repository/service-logs"

echo -e "${BLUE}Stopping all application services...${NC}"

# Function to stop a service
stop_service() {
  local name=$1
  local pid_file="${LOG_DIR}/${name}.pid"
  
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    echo -e "${YELLOW}Stopping ${name} (PID: ${pid})...${NC}"
    
    if kill -0 $pid 2>/dev/null; then
      kill $pid
      sleep 1
      if kill -0 $pid 2>/dev/null; then
        echo -e "${RED}Force killing ${name} (PID: ${pid})...${NC}"
        kill -9 $pid 2>/dev/null
      fi
      echo -e "${GREEN}${name} stopped successfully${NC}"
    else
      echo -e "${YELLOW}${name} (PID: ${pid}) is not running${NC}"
    fi
    
    rm -f "$pid_file"
  else
    echo -e "${YELLOW}No PID file found for ${name}${NC}"
  fi
}

# Stop all services
stop_service "CM-Backend"
stop_service "CM-Frontend"
stop_service "CV-Backend"
stop_service "CV-Frontend"

echo -e "${BLUE}All services stopped${NC}"
