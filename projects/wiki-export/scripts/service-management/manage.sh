#!/bin/bash

# Service Management Command Center
# Provides a centralized entry point for all service management operations

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/config"

# Function to display the main menu
show_menu() {
  clear
  echo -e "${BOLD}${CYAN}=== Service Management Command Center ===${NC}"
  echo -e "${CYAN}$(date)${NC}"
  echo
  echo -e "${BOLD}SERVICE CONTROL${NC}"
  echo -e "  1. Start all services"
  echo -e "  2. Stop all services"
  echo -e "  3. Restart all services"
  echo -e "  4. Control individual service"
  echo
  echo -e "${BOLD}MONITORING${NC}"
  echo -e "  5. Show dashboard (GUI)"
  echo -e "  6. Check service status (terminal)"
  echo
  echo -e "${BOLD}DIAGNOSTICS${NC}"
  echo -e "  7. View service logs"
  echo -e "  8. Check dependencies"
  echo
  echo -e "${BOLD}UTILITIES${NC}"
  echo -e "  9. Install dependencies"
  echo -e " 10. Fix permissions"
  echo -e " 11. Update configurations"
  echo
  echo -e "${BOLD}HELP${NC}"
  echo -e " 12. Show documentation"
  echo -e "  q. Quit"
  echo
  echo -n "Enter your choice [1-12 or q]: "
}

# Function to select a service
select_service() {
  echo -e "${BLUE}Select a service:${NC}"
  
  # List all services
  local services=($(jq -r '.services[].name' "$CONFIG_DIR/services.json"))
  
  for i in "${!services[@]}"; do
    echo -e "  $((i+1)). ${services[$i]}"
  done
  
  echo -e "  c. Cancel"
  echo
  
  while true; do
    echo -n "Enter your choice [1-${#services[@]} or c]: "
    read choice
    
    if [[ "$choice" == "c" ]]; then
      return 1
    elif [[ "$choice" =~ ^[0-9]+$ && "$choice" -ge 1 && "$choice" -le "${#services[@]}" ]]; then
      selected_service="${services[$((choice-1))]}"
      return 0
    else
      echo -e "${RED}Invalid choice. Please try again.${NC}"
    fi
  done
}

# Main program loop
while true; do
  show_menu
  read choice
  
  case $choice in
    1)
      clear
      echo -e "${BLUE}Starting all services...${NC}"
      "$SCRIPT_DIR/bin/start-all.sh"
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    2)
      clear
      echo -e "${BLUE}Stopping all services...${NC}"
      "$SCRIPT_DIR/bin/stop-all.sh"
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    3)
      clear
      echo -e "${BLUE}Restarting all services...${NC}"
      "$SCRIPT_DIR/bin/restart-all.sh"
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    4)
      clear
      if select_service; then
        clear
        echo -e "${BLUE}Control $selected_service${NC}"
        echo -e "  1. Start"
        echo -e "  2. Stop"
        echo -e "  3. Restart"
        echo -e "  4. Check status"
        echo -e "  c. Cancel"
        echo
        
        echo -n "Enter your choice [1-4 or c]: "
        read subchoice
        
        case $subchoice in
          1)
            clear
            "$SCRIPT_DIR/bin/service-control.sh" start "$selected_service"
            ;;
          2)
            clear
            "$SCRIPT_DIR/bin/service-control.sh" stop "$selected_service"
            ;;
          3)
            clear
            "$SCRIPT_DIR/bin/service-control.sh" restart "$selected_service"
            ;;
          4)
            clear
            "$SCRIPT_DIR/bin/service-control.sh" status "$selected_service"
            ;;
          *)
            continue
            ;;
        esac
        
        echo
        echo -e "${YELLOW}Press any key to continue...${NC}"
        read -n 1
      fi
      ;;
    5)
      clear
      echo -e "${BLUE}Launching dashboard...${NC}"
      "$SCRIPT_DIR/monitoring/dashboard.sh"
      sleep 1
      ;;
    6)
      clear
      "$SCRIPT_DIR/monitoring/status-check.sh"
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    7)
      clear
      if select_service; then
        clear
        echo -e "${BLUE}View logs for $selected_service${NC}"
        echo -e "  1. Show last 20 lines"
        echo -e "  2. Follow log (like tail -f)"
        echo -e "  3. Search in log"
        echo -e "  c. Cancel"
        echo
        
        echo -n "Enter your choice [1-3 or c]: "
        read subchoice
        
        case $subchoice in
          1)
            clear
            "$SCRIPT_DIR/diagnostics/logs-viewer.sh" "$selected_service"
            ;;
          2)
            clear
            "$SCRIPT_DIR/diagnostics/logs-viewer.sh" "$selected_service" -f
            ;;
          3)
            clear
            echo -n "Enter search term: "
            read term
            "$SCRIPT_DIR/diagnostics/logs-viewer.sh" "$selected_service" -g "$term"
            ;;
          *)
            continue
            ;;
        esac
        
        echo
        echo -e "${YELLOW}Press any key to continue...${NC}"
        read -n 1
      fi
      ;;
    8)
      clear
      if select_service; then
        "$SCRIPT_DIR/diagnostics/dependency-check.sh" "$selected_service"
      else
        "$SCRIPT_DIR/diagnostics/dependency-check.sh"
      fi
      
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    9)
      clear
      if select_service; then
        "$SCRIPT_DIR/utilities/install-dependencies.sh" "$selected_service"
      else
        "$SCRIPT_DIR/utilities/install-dependencies.sh"
      fi
      
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    10)
      clear
      if select_service; then
        "$SCRIPT_DIR/utilities/fix-permissions.sh" "$selected_service"
      else
        "$SCRIPT_DIR/utilities/fix-permissions.sh"
      fi
      
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    11)
      clear
      "$SCRIPT_DIR/utilities/update-configs.sh"
      
      echo
      echo -e "${YELLOW}Press any key to continue...${NC}"
      read -n 1
      ;;
    12)
      clear
      # Use less to display the README
      less -R "$SCRIPT_DIR/README.md" || cat "$SCRIPT_DIR/README.md"
      ;;
    q|Q)
      clear
      echo -e "${GREEN}Thank you for using the Service Management System!${NC}"
      exit 0
      ;;
    *)
      echo -e "${RED}Invalid choice. Please try again.${NC}"
      sleep 1
      ;;
  esac
done