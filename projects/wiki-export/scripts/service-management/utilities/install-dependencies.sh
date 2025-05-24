#!/bin/bash

# Install Dependencies Script
# Installs required dependencies for services

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

# Function to show usage
show_usage() {
  echo -e "Usage: $0 [service_name]"
  echo -e "Install dependencies for a specific service or all services."
  echo -e ""
  echo -e "If no service name is provided, dependencies for all services will be installed."
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Install dependencies for a service
install_service_dependencies() {
  local service=$1
  local directory=$(jq -r ".services[] | select(.name==\"$service\") | .directory" "$CONFIG_DIR/services.json")
  local dependencies=$(jq -r ".services[] | select(.name==\"$service\") | .dependencies[]" "$CONFIG_DIR/services.json")
  local external=$(jq -r ".services[] | select(.name==\"$service\") | .external" "$CONFIG_DIR/services.json")
  local log_file="${LOG_DIR}/${service}-install.log"
  
  echo -e "${BLUE}Installing dependencies for ${BOLD}${service}${NC}${BLUE}...${NC}"
  
  if [[ "$external" == "true" ]]; then
    echo -e "${YELLOW}$service is an external service. Dependencies cannot be installed.${NC}"
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
  echo -e "Dependencies to install: ${dependencies}"
  
  # Change to service directory
  cd "$directory" || { echo -e "${RED}Failed to change to directory $directory${NC}"; return 1; }
  
  # Install dependencies
  echo -e "${YELLOW}Running npm install...${NC}"
  npm install $dependencies --save > "$log_file" 2>&1
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dependencies for $service installed successfully.${NC}"
    echo -e "Installation log: $log_file"
    return 0
  else
    echo -e "${RED}Failed to install dependencies for $service.${NC}"
    echo -e "Installation log: $log_file"
    echo -e "Last few lines of the log:"
    tail -n 10 "$log_file"
    return 1
  fi
}

# Check arguments
if [[ $# -gt 1 ]]; then
  show_usage
fi

# If a service name is provided, install just for that service
if [[ $# -eq 1 ]]; then
  SERVICE=$1
  
  # Check if service exists
  if [[ -z $(jq -r ".services[] | select(.name==\"$SERVICE\") | .name" "$CONFIG_DIR/services.json") ]]; then
    echo -e "${RED}Service '$SERVICE' not found!${NC}"
    show_usage
  fi
  
  install_service_dependencies "$SERVICE"
  exit $?
fi

# If no service name is provided, install for all services
echo -e "${BLUE}Installing dependencies for all services...${NC}"
echo

# Get all services that are not external
SERVICES=$(jq -r '.services[] | select(.external != true) | .name' "$CONFIG_DIR/services.json")

# Install for each service
all_ok=true
for SERVICE in $SERVICES; do
  install_service_dependencies "$SERVICE" || all_ok=false
  echo
done

if $all_ok; then
  echo -e "${GREEN}All dependencies have been installed successfully.${NC}"
  exit 0
else
  echo -e "${RED}Some dependencies could not be installed. See above for details.${NC}"
  exit 1
fi