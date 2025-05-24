#!/bin/bash

# Service Control Script
# Controls individual services (start, stop, restart, status)

# Color definitions
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"
CONFIG_DIR="$SCRIPT_DIR/../config"
LOG_DIR="/home/user/Repository/service-logs"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Function to display usage
show_usage() {
  echo -e "Usage: $0 <action> <service_name>"
  echo -e "Actions:"
  echo -e "  start   - Start the specified service"
  echo -e "  stop    - Stop the specified service"
  echo -e "  restart - Restart the specified service"
  echo -e "  status  - Show the status of the specified service"
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Function to check if a port is in use
is_port_in_use() {
  local port=$1
  if lsof -i:$port -sTCP:LISTEN -t >/dev/null ; then
    return 0  # Port is in use (success)
  else
    return 1  # Port is not in use (failure)
  fi
}

# Function to get service info
get_service_info() {
  local service_name=$1
  local field=$2
  jq -r ".services[] | select(.name==\"$service_name\") | .$field" "$CONFIG_DIR/services.json"
}

# Function to start a service
start_service() {
  local service_name=$1
  local directory=$(get_service_info "$service_name" "directory")
  local port=$(get_service_info "$service_name" "port")
  local start_command=$(get_service_info "$service_name" "start_command")
  local external=$(get_service_info "$service_name" "external")
  local log_file="${LOG_DIR}/${service_name}.log"
  local pid_file="${LOG_DIR}/${service_name}.pid"
  
  echo -e "${BLUE}Starting ${service_name} on port ${port}...${NC}"
  
  # Check if service is already running
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    if kill -0 $pid 2>/dev/null; then
      echo -e "${YELLOW}${service_name} is already running with PID ${pid}${NC}"
      return 0
    else
      echo -e "${YELLOW}Removing stale PID file${NC}"
      rm -f "$pid_file"
    fi
  fi
  
  # Check if port is already in use
  if is_port_in_use "$port"; then
    echo -e "${RED}Port $port is already in use! Cannot start $service_name.${NC}"
    return 1
  fi
  
  # If service is marked as external, we can't start it
  if [[ "$external" == "true" ]]; then
    echo -e "${YELLOW}${service_name} is an external service and cannot be started manually.${NC}"
    return 1
  fi
  
  # Navigate to directory and start service
  if [ ! -d "$directory" ]; then
    echo -e "${RED}Directory $directory does not exist!${NC}"
    return 1
  fi
  
  cd "$directory" || { echo -e "${RED}Failed to change to directory $directory${NC}"; return 1; }
  
  # Start the service and redirect output to log file
  echo "=== Starting $service_name at $(date) ===" > "$log_file"
  eval "$start_command" >> "$log_file" 2>&1 &
  
  # Get process ID
  local pid=$!
  
  # Wait a bit to see if the process stays alive
  sleep 2
  if kill -0 $pid 2>/dev/null; then
    echo $pid > "$pid_file"
    echo -e "${GREEN}${service_name} started successfully with PID ${pid}${NC}"
    return 0
  else
    echo -e "${RED}Failed to start ${service_name}!${NC}"
    echo "Check the log file at $log_file for details."
    return 1
  fi
}

# Function to stop a service
stop_service() {
  local service_name=$1
  local pid_file="${LOG_DIR}/${service_name}.pid"
  
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    echo -e "${BLUE}Stopping ${service_name} (PID: ${pid})...${NC}"
    
    if kill -0 $pid 2>/dev/null; then
      kill $pid
      sleep 1
      
      # Check if process is still running
      if kill -0 $pid 2>/dev/null; then
        echo -e "${YELLOW}Process didn't exit gracefully, force killing...${NC}"
        kill -9 $pid 2>/dev/null
        sleep 1
      fi
      
      # Verify process is gone
      if kill -0 $pid 2>/dev/null; then
        echo -e "${RED}Failed to kill process ${pid}${NC}"
        return 1
      else
        echo -e "${GREEN}${service_name} stopped successfully${NC}"
        rm -f "$pid_file"
        return 0
      fi
    else
      echo -e "${YELLOW}No process found with PID ${pid}${NC}"
      rm -f "$pid_file"
      return 0
    fi
  else
    echo -e "${YELLOW}No PID file found for ${service_name}${NC}"
    return 1
  fi
}

# Function to check service status
check_service_status() {
  local service_name=$1
  local port=$(get_service_info "$service_name" "port")
  local endpoint=$(jq -r ".port_assignments[] | select(.service==\"$service_name\") | .endpoint" "$CONFIG_DIR/ports.json")
  local pid_file="${LOG_DIR}/${service_name}.pid"
  
  echo -e "${BLUE}Checking status of ${service_name}...${NC}"
  
  local process_status="stopped"
  local port_status="closed"
  local http_status="unknown"
  
  # Check process status
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    if kill -0 $pid 2>/dev/null; then
      process_status="running"
    fi
  fi
  
  # Check port status
  if is_port_in_use "$port"; then
    port_status="open"
  fi
  
  # Check HTTP status
  local url="http://localhost:${port}${endpoint}"
  local http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 "$url" 2>/dev/null)
  
  if [[ "$http_code" == "200" ]]; then
    http_status="ok"
  elif [[ -n "$http_code" && "$http_code" != "000" ]]; then
    http_status="error (HTTP $http_code)"
  else
    http_status="not responding"
  fi
  
  # Print status
  echo -e "Service: ${service_name}"
  echo -e "Process: $(if [[ "$process_status" == "running" ]]; then echo -e "${GREEN}running (PID: $(cat "$pid_file"))${NC}"; else echo -e "${RED}stopped${NC}"; fi)"
  echo -e "Port ${port}: $(if [[ "$port_status" == "open" ]]; then echo -e "${GREEN}open${NC}"; else echo -e "${RED}closed${NC}"; fi)"
  echo -e "HTTP Status: $(if [[ "$http_status" == "ok" ]]; then echo -e "${GREEN}ok${NC}"; else echo -e "${RED}${http_status}${NC}"; fi)"
  echo -e "URL: ${url}"
  
  if [[ "$process_status" == "running" && "$port_status" == "open" && "$http_status" == "ok" ]]; then
    echo -e "${GREEN}${service_name} is fully operational${NC}"
    return 0
  else
    echo -e "${RED}${service_name} has issues${NC}"
    return 1
  fi
}

# Main execution
if [[ $# -lt 2 ]]; then
  show_usage
fi

ACTION=$1
SERVICE=$2

# Check if service exists
if [[ -z $(get_service_info "$SERVICE" "name") ]]; then
  echo -e "${RED}Service '$SERVICE' not found!${NC}"
  show_usage
fi

case $ACTION in
  start)
    start_service "$SERVICE"
    ;;
  stop)
    stop_service "$SERVICE"
    ;;
  restart)
    stop_service "$SERVICE"
    sleep 1
    start_service "$SERVICE"
    ;;
  status)
    check_service_status "$SERVICE"
    ;;
  *)
    echo -e "${RED}Unknown action: $ACTION${NC}"
    show_usage
    ;;
esac