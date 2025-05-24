#!/bin/bash

# Dependency Check Script
# Checks if all required dependencies for services are installed

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"

# Function to show usage
show_usage() {
  echo -e "Usage: $0 [service_name]"
  echo -e "Check dependencies for a specific service or all services."
  echo -e ""
  echo -e "If no service name is provided, dependencies for all services will be checked."
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Check if a Node.js package is installed in a directory
check_node_package() {
  local package=$1
  local directory=$2
  
  if [ -d "$directory/node_modules/$package" ]; then
    echo -e "${GREEN}✓ $package${NC}"
    return 0
  else
    echo -e "${RED}✗ $package${NC}"
    return 1
  fi
}

# Check dependencies for a service
check_service_dependencies() {
  local service=$1
  local directory=$(jq -r ".services[] | select(.name==\"$service\") | .directory" "$CONFIG_DIR/services.json")
  local dependencies=$(jq -r ".services[] | select(.name==\"$service\") | .dependencies[]" "$CONFIG_DIR/services.json")
  local external=$(jq -r ".services[] | select(.name==\"$service\") | .external" "$CONFIG_DIR/services.json")
  
  echo -e "${BLUE}Checking dependencies for ${BOLD}${service}${NC}${BLUE}...${NC}"
  
  if [[ "$external" == "true" ]]; then
    echo -e "${YELLOW}$service is an external service. Dependencies cannot be checked.${NC}"
    return 0
  fi
  
  if [[ ! -d "$directory" ]]; then
    echo -e "${RED}Directory '$directory' not found!${NC}"
    return 1
  fi
  
  if [[ -z "$dependencies" ]]; then
    echo -e "${YELLOW}No dependencies defined for $service.${NC}"
    return 0
  fi
  
  echo -e "Directory: $directory"
  echo -e "Dependencies:"
  
  local all_installed=true
  
  for dep in $dependencies; do
    echo -n "  "
    check_node_package "$dep" "$directory" || all_installed=false
  done
  
  if $all_installed; then
    echo -e "${GREEN}All dependencies for $service are installed.${NC}"
    return 0
  else
    echo -e "${RED}Some dependencies for $service are missing.${NC}"
    echo -e "Run the following to install missing dependencies:"
    echo -e "${YELLOW}cd $directory && npm install ${dependencies}${NC}"
    return 1
  fi
}

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
  
  check_service_dependencies "$SERVICE"
  exit $?
fi

# If no service name is provided, check all services
echo -e "${BLUE}Checking dependencies for all services...${NC}"
echo

# Get all services
SERVICES=$(jq -r '.services[].name' "$CONFIG_DIR/services.json")

# Check each service
all_ok=true
for SERVICE in $SERVICES; do
  check_service_dependencies "$SERVICE" || all_ok=false
  echo
done

if $all_ok; then
  echo -e "${GREEN}All dependencies are properly installed.${NC}"
  exit 0
else
  echo -e "${RED}Some dependencies are missing. See above for details.${NC}"
  echo -e "To install missing dependencies, run:"
  echo -e "${YELLOW}../utilities/install-dependencies.sh${NC}"
  exit 1
fi