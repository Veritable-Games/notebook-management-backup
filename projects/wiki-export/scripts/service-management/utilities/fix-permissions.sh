#!/bin/bash

# Fix Permissions Script
# Fixes common permission issues with service directories and files

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
  echo -e "Fix permissions for a specific service or all services."
  echo -e ""
  echo -e "If no service name is provided, permissions for all services will be fixed."
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Fix permissions for a service
fix_service_permissions() {
  local service=$1
  local directory=$(jq -r ".services[] | select(.name==\"$service\") | .directory" "$CONFIG_DIR/services.json")
  local external=$(jq -r ".services[] | select(.name==\"$service\") | .external" "$CONFIG_DIR/services.json")
  local log_file="${LOG_DIR}/${service}-permissions.log"
  
  echo -e "${BLUE}Fixing permissions for ${BOLD}${service}${NC}${BLUE}...${NC}"
  
  if [[ "$external" == "true" ]]; then
    echo -e "${YELLOW}$service is an external service. Permissions cannot be modified.${NC}"
    return 0
  fi
  
  if [[ ! -d "$directory" ]]; then
    echo -e "${RED}Directory '$directory' not found!${NC}"
    return 1
  fi
  
  echo -e "Directory: $directory"
  
  # Log file for commands
  echo "=== Permission fixes for $service at $(date) ===" > "$log_file"
  
  # Fix node_modules permissions if it exists
  if [[ -d "$directory/node_modules" ]]; then
    echo -e "${YELLOW}Fixing node_modules permissions...${NC}"
    echo "Fixing node_modules permissions..." >> "$log_file"
    chmod -R 755 "$directory/node_modules" >> "$log_file" 2>&1 || true
  fi
  
  # Fix Next.js build directory if it exists
  if [[ -d "$directory/.next" ]]; then
    echo -e "${YELLOW}Fixing Next.js build directory permissions...${NC}"
    echo "Fixing Next.js build directory permissions..." >> "$log_file"
    
    # Remove .next directory if it exists and recreate it with proper permissions
    rm -rf "$directory/.next" >> "$log_file" 2>&1 || true
    mkdir -p "$directory/.next" >> "$log_file" 2>&1
    chmod -R 755 "$directory/.next" >> "$log_file" 2>&1 || true
  fi
  
  # Fix package.json permissions
  if [[ -f "$directory/package.json" ]]; then
    echo -e "${YELLOW}Fixing package.json permissions...${NC}"
    echo "Fixing package.json permissions..." >> "$log_file"
    chmod 644 "$directory/package.json" >> "$log_file" 2>&1 || true
  fi
  
  # Fix package-lock.json permissions
  if [[ -f "$directory/package-lock.json" ]]; then
    echo -e "${YELLOW}Fixing package-lock.json permissions...${NC}"
    echo "Fixing package-lock.json permissions..." >> "$log_file"
    chmod 644 "$directory/package-lock.json" >> "$log_file" 2>&1 || true
  fi
  
  # Fix permissions for JavaScript/TypeScript files
  echo -e "${YELLOW}Fixing JS/TS file permissions...${NC}"
  echo "Fixing JS/TS file permissions..." >> "$log_file"
  find "$directory" -type f -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" | while read file; do
    chmod 644 "$file" >> "$log_file" 2>&1 || true
  done
  
  # Fix permissions for executable scripts
  echo -e "${YELLOW}Fixing executable script permissions...${NC}"
  echo "Fixing executable script permissions..." >> "$log_file"
  find "$directory" -type f -name "*.sh" | while read file; do
    chmod 755 "$file" >> "$log_file" 2>&1 || true
  done
  
  echo -e "${GREEN}Permissions fixed for $service.${NC}"
  echo -e "Permission fix log: $log_file"
  return 0
}

# Check arguments
if [[ $# -gt 1 ]]; then
  show_usage
fi

# If a service name is provided, fix just for that service
if [[ $# -eq 1 ]]; then
  SERVICE=$1
  
  # Check if service exists
  if [[ -z $(jq -r ".services[] | select(.name==\"$SERVICE\") | .name" "$CONFIG_DIR/services.json") ]]; then
    echo -e "${RED}Service '$SERVICE' not found!${NC}"
    show_usage
  fi
  
  fix_service_permissions "$SERVICE"
  exit $?
fi

# If no service name is provided, fix for all services
echo -e "${BLUE}Fixing permissions for all services...${NC}"
echo

# Get all services that are not external
SERVICES=$(jq -r '.services[] | select(.external != true) | .name' "$CONFIG_DIR/services.json")

# Fix for each service
all_ok=true
for SERVICE in $SERVICES; do
  fix_service_permissions "$SERVICE" || all_ok=false
  echo
done

if $all_ok; then
  echo -e "${GREEN}All service permissions have been fixed.${NC}"
  exit 0
else
  echo -e "${RED}Some service permissions could not be fixed. See above for details.${NC}"
  exit 1
fi