#!/bin/bash

# Update Configurations Script
# Updates service configurations based on running services

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

echo -e "${BLUE}Updating service configurations...${NC}"

# Function to check if a port is in use
is_port_in_use() {
  local port=$1
  if lsof -i:$port -sTCP:LISTEN -t >/dev/null 2>&1; then
    return 0  # Port is in use (success)
  else
    return 1  # Port is not in use (failure)
  fi
}

# Function to find an available port
find_available_port() {
  local base_port=$1
  local max_tries=100
  local port=$base_port
  
  for (( i=0; i<max_tries; i++ )); do
    if ! is_port_in_use $port; then
      echo $port
      return 0
    fi
    (( port++ ))
  done
  
  echo -1  # No available port found
  return 1
}

# Backup existing configuration files
echo -e "${YELLOW}Creating backup of current configurations...${NC}"
BACKUP_DIR="$CONFIG_DIR/backup/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp "$CONFIG_DIR/services.json" "$BACKUP_DIR/services.json" 2>/dev/null || true
cp "$CONFIG_DIR/ports.json" "$BACKUP_DIR/ports.json" 2>/dev/null || true

# Check if any ports are in conflict
echo -e "${YELLOW}Checking for port conflicts...${NC}"
CONFLICTS=false
PORTS=$(jq -r '.port_assignments[].port' "$CONFIG_DIR/ports.json")
PORT_SERVICES=$(jq -r '.port_assignments[] | .port|tostring + "|" + .service' "$CONFIG_DIR/ports.json")

# Create a temporary file for the updated port assignments
TEMP_PORTS=$(mktemp)
jq '.' "$CONFIG_DIR/ports.json" > "$TEMP_PORTS"

# Check each port for conflicts
for PORT_SERVICE in $PORT_SERVICES; do
  PORT=${PORT_SERVICE%%|*}
  SERVICE=${PORT_SERVICE##*|}
  
  # Skip external services
  EXTERNAL=$(jq -r ".services[] | select(.name==\"$SERVICE\") | .external" "$CONFIG_DIR/services.json")
  if [[ "$EXTERNAL" == "true" ]]; then
    continue
  fi
  
  # Check if port is already in use by a different service
  if is_port_in_use $PORT; then
    # Get PID of process using this port
    PID=$(lsof -i:$PORT -sTCP:LISTEN -t 2>/dev/null | head -1)
    if [[ -n "$PID" ]]; then
      # Try to get service name from PID file
      SERVICE_FROM_PID=""
      for PID_FILE in "$LOG_DIR"/*.pid; do
        if [[ -f "$PID_FILE" ]]; then
          FILE_PID=$(cat "$PID_FILE")
          if [[ "$FILE_PID" == "$PID" ]]; then
            SERVICE_FROM_PID=$(basename "$PID_FILE" .pid)
            break
          fi
        fi
      done
      
      # If the port is used by a different service than the one configured
      if [[ -n "$SERVICE_FROM_PID" && "$SERVICE_FROM_PID" != "$SERVICE" ]]; then
        echo -e "${RED}Port conflict detected:${NC} Port $PORT is assigned to $SERVICE but is being used by $SERVICE_FROM_PID"
        CONFLICTS=true
        
        # Find an available port for this service
        NEW_PORT=$(find_available_port $(( PORT + 1 )))
        if [[ $NEW_PORT -gt 0 ]]; then
          echo -e "${GREEN}Reassigning $SERVICE to port $NEW_PORT${NC}"
          
          # Update the port assignment in the temporary file
          jq ".port_assignments[] |= if .service == \"$SERVICE\" then .port = $NEW_PORT else . end" "$TEMP_PORTS" > "${TEMP_PORTS}.new"
          mv "${TEMP_PORTS}.new" "$TEMP_PORTS"
          
          # Also update the service port in services.json
          jq ".services[] |= if .name == \"$SERVICE\" then .port = $NEW_PORT else . end" "$CONFIG_DIR/services.json" > "${CONFIG_DIR}/services.json.new"
          mv "${CONFIG_DIR}/services.json.new" "$CONFIG_DIR/services.json"
        else
          echo -e "${RED}Could not find an available port for $SERVICE${NC}"
        fi
      fi
    fi
  fi
done

# Save the updated port assignments
mv "$TEMP_PORTS" "$CONFIG_DIR/ports.json"

# Generate a dashboard configuration file for the enhanced-visual-feedback.sh script
echo -e "${YELLOW}Updating dashboard configuration...${NC}"
mkdir -p "/home/user/Repository/WebProjects/wiki-export/scripts/config"

jq '{applications: .port_assignments | map({name: .service, port: .port, endpoint: .endpoint})}' "$CONFIG_DIR/ports.json" > "/home/user/Repository/WebProjects/wiki-export/scripts/config/app-config.json"

echo -e "${GREEN}Service configurations updated.${NC}"
echo -e "You should restart affected services for the changes to take effect:"
echo -e "${YELLOW}../bin/restart-all.sh${NC}"

if $CONFLICTS; then
  echo -e "${YELLOW}Port conflicts were detected and resolved. Please check the updated configurations.${NC}"
fi