#!/bin/bash

# Start All Services Script
# Starts all manageable services defined in services.json

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"
SERVICE_CONTROL="$SCRIPT_DIR/service-control.sh"

echo -e "${BLUE}Starting all manageable services...${NC}"

# Get list of all services
SERVICES=$(jq -r '.services[] | select(.external != true) | .name' "$CONFIG_DIR/services.json")

# Start each service
for SERVICE in $SERVICES; do
  echo -e "${YELLOW}Starting $SERVICE...${NC}"
  $SERVICE_CONTROL start "$SERVICE"
  echo
done

echo -e "${GREEN}All services have been processed.${NC}"
echo -e "Run 'bin/service-control.sh status <service-name>' to check the status of a specific service."
echo -e "Run 'monitoring/dashboard.sh' to view the status dashboard."