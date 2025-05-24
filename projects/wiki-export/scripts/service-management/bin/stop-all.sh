#!/bin/bash

# Stop All Services Script
# Stops all services that have been started by this management system

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"
SERVICE_CONTROL="$SCRIPT_DIR/service-control.sh"
LOG_DIR="/home/user/Repository/service-logs"

echo -e "${BLUE}Stopping all running services...${NC}"

# Get list of running services from PID files
if [ -d "$LOG_DIR" ]; then
  for PID_FILE in "$LOG_DIR"/*.pid; do
    if [ -f "$PID_FILE" ]; then
      SERVICE_NAME=$(basename "$PID_FILE" .pid)
      echo -e "${YELLOW}Stopping $SERVICE_NAME...${NC}"
      $SERVICE_CONTROL stop "$SERVICE_NAME"
      echo
    fi
  done
else
  echo -e "${YELLOW}No log directory found at $LOG_DIR${NC}"
fi

echo -e "${GREEN}All running services have been stopped.${NC}"