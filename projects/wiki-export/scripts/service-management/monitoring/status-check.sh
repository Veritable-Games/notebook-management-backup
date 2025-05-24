#!/bin/bash

# Service Status Check
# Checks the status of one or all services

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVICE_CONTROL="$SCRIPT_DIR/../bin/service-control.sh"
CONFIG_DIR="$SCRIPT_DIR/../config"

# Function to show usage
show_usage() {
  echo -e "Usage: $0 [service_name]"
  echo -e "Check the status of one or all services."
  echo -e ""
  echo -e "If no service name is provided, the status of all services will be shown."
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Check if JQ is available
if ! command -v jq &> /dev/null; then
  echo -e "${RED}Error: jq is required but not installed.${NC}"
  echo -e "Please install jq and try again."
  exit 1
fi

# Check arguments
if [[ $# -gt 1 ]]; then
  show_usage
fi

# If a service name is provided, check just that service
if [[ $# -eq 1 ]]; then
  SERVICE=$1
  
  # Check if service exists
  if [[ -z $(jq -r ".services[] | select(.name==\"$SERVICE\") | .name" "$CONFIG_DIR/services.json") ]]; then
    echo -e "${RED}Service '$SERVICE' not found!${NC}"
    show_usage
  fi
  
  "$SERVICE_CONTROL" status "$SERVICE"
  exit $?
fi

# If no service name is provided, check all services
echo -e "${BLUE}Checking status of all services...${NC}"
echo

# Get all services
SERVICES=$(jq -r '.services[].name' "$CONFIG_DIR/services.json")

# Check each service
for SERVICE in $SERVICES; do
  "$SERVICE_CONTROL" status "$SERVICE"
  echo
done

echo -e "${BLUE}Status check complete.${NC}"
echo -e "For a graphical view, run: monitoring/dashboard.sh"