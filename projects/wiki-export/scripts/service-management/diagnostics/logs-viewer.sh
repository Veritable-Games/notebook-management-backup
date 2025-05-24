#!/bin/bash

# Service Logs Viewer
# Displays logs for services with various options for filtering and following

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"
LOG_DIR="/home/user/Repository/service-logs"

# Function to show usage
show_usage() {
  echo -e "Usage: $0 <service_name> [options]"
  echo -e "View logs for a specific service."
  echo -e ""
  echo -e "Options:"
  echo -e "  -f, --follow     Follow the log (like tail -f)"
  echo -e "  -n, --lines N    Show the last N lines (default: 20)"
  echo -e "  -g, --grep TERM  Filter logs to only show lines containing TERM"
  echo -e ""
  echo -e "Services available:"
  jq -r '.services[].name' "$CONFIG_DIR/services.json" | while read service; do
    echo -e "  $service"
  done
  exit 1
}

# Check if at least one argument
if [[ $# -lt 1 ]]; then
  show_usage
fi

SERVICE=$1
shift

# Check if service exists
if [[ -z $(jq -r ".services[] | select(.name==\"$SERVICE\") | .name" "$CONFIG_DIR/services.json") ]]; then
  echo -e "${RED}Service '$SERVICE' not found!${NC}"
  show_usage
fi

# Default options
FOLLOW=false
LINES=20
GREP_TERM=""

# Parse options
while [[ $# -gt 0 ]]; do
  case $1 in
    -f|--follow)
      FOLLOW=true
      shift
      ;;
    -n|--lines)
      LINES=$2
      shift 2
      ;;
    -g|--grep)
      GREP_TERM=$2
      shift 2
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      show_usage
      ;;
  esac
done

# Check if log file exists
LOG_FILE="${LOG_DIR}/${SERVICE}.log"
if [[ ! -f "$LOG_FILE" ]]; then
  echo -e "${RED}Log file for service '$SERVICE' not found!${NC}"
  echo -e "Expected log file: $LOG_FILE"
  exit 1
fi

# Display log
echo -e "${BLUE}Viewing logs for ${BOLD}${SERVICE}${NC}${BLUE}...${NC}"
echo -e "Log file: $LOG_FILE"
echo

# Prepare command
if [[ -n "$GREP_TERM" ]]; then
  if $FOLLOW; then
    tail -n "$LINES" -f "$LOG_FILE" | grep --color=auto "$GREP_TERM"
  else
    grep --color=auto "$GREP_TERM" "$LOG_FILE" | tail -n "$LINES"
  fi
else
  if $FOLLOW; then
    tail -n "$LINES" -f "$LOG_FILE"
  else
    tail -n "$LINES" "$LOG_FILE"
  fi
fi