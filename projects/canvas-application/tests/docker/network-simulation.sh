#!/bin/bash

# VG-Canvas Network Condition Simulation
# This script simulates various network conditions for testing collaboration robustness

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Network Condition Simulation${BLUE}                   ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Check for root privileges (required for tc command)
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}Error: This script requires root privileges to modify network settings${NC}"
  echo "Please run with sudo: sudo $0"
  exit 1
fi

# Check for tc command
if ! command -v tc &> /dev/null; then
  echo -e "${RED}Error: tc command not found${NC}"
  echo "Please install the iproute2 package and try again"
  exit 1
fi

# Get Docker bridge interface
DOCKER_INTERFACE=$(ip -o link show | grep docker0 | awk '{print $2}' | cut -d':' -f1)
if [ -z "$DOCKER_INTERFACE" ]; then
  echo -e "${RED}Error: Docker network interface not found${NC}"
  echo "Make sure Docker is running and has created its network bridge"
  exit 1
fi

# Function to reset network conditions
reset_network() {
  echo -e "${YELLOW}Resetting network conditions...${NC}"
  tc qdisc del dev "$DOCKER_INTERFACE" root 2>/dev/null
  tc qdisc add dev "$DOCKER_INTERFACE" root pfifo_fast
  echo -e "${GREEN}Network reset to normal conditions${NC}"
}

# Ensure network is reset on exit
trap reset_network EXIT

# Function to apply network conditions
apply_network_condition() {
  local name=$1
  local delay=$2
  local loss=$3
  local jitter=$4
  
  echo -e "${YELLOW}Applying network condition: $name${NC}"
  echo "Delay: ${delay}ms, Loss: ${loss}%, Jitter: ${jitter}ms"
  
  # Remove any existing rules
  tc qdisc del dev "$DOCKER_INTERFACE" root 2>/dev/null
  
  # Apply new condition
  tc qdisc add dev "$DOCKER_INTERFACE" root netem delay "${delay}ms" "${jitter}ms" loss "${loss}%"
  
  echo -e "${GREEN}Network condition applied!${NC}"
  echo -e "${BLUE}Testing will continue under these conditions for 30 seconds${NC}"
  echo "Please interact with your VG-Canvas instances to observe behavior"
  
  # Wait for testing
  sleep 30
}

# Menu for network conditions
show_menu() {
  echo
  echo -e "${YELLOW}Select a network condition to simulate:${NC}"
  echo "1) Good Connection (20ms delay, 0% loss)"
  echo "2) Moderate Latency (100ms delay, 0% loss)"
  echo "3) High Latency (200ms delay, 0% loss)"
  echo "4) Packet Loss (50ms delay, 5% loss)"
  echo "5) Unstable Connection (150ms delay, 10% loss, 40ms jitter)"
  echo "6) Mobile 3G Simulation (100ms delay, 2% loss, 20ms jitter)"
  echo "7) Mobile 4G Simulation (50ms delay, 1% loss, 10ms jitter)"
  echo "8) Satellite Connection (500ms delay, 0.5% loss)"
  echo "9) Reset to normal conditions"
  echo "0) Exit"
  echo
  echo -n "Enter your choice (0-9): "
  read -r choice
  
  case "$choice" in
    1) apply_network_condition "Good Connection" 20 0 0 ;;
    2) apply_network_condition "Moderate Latency" 100 0 0 ;;
    3) apply_network_condition "High Latency" 200 0 0 ;;
    4) apply_network_condition "Packet Loss" 50 5 0 ;;
    5) apply_network_condition "Unstable Connection" 150 10 40 ;;
    6) apply_network_condition "Mobile 3G" 100 2 20 ;;
    7) apply_network_condition "Mobile 4G" 50 1 10 ;;
    8) apply_network_condition "Satellite" 500 0.5 0 ;;
    9) reset_network ;;
    0) echo "Exiting..."; exit 0 ;;
    *) echo -e "${RED}Invalid choice. Please try again.${NC}" ;;
  esac
  
  show_menu
}

# Start the menu
echo -e "${YELLOW}VG-Canvas Network Condition Simulation${NC}"
echo "This tool simulates various network conditions to test collaboration robustness"
echo -e "${RED}WARNING: This will affect all Docker container network traffic${NC}"
echo

show_menu