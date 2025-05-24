#!/bin/bash

# VG-Canvas Performance Monitoring Script
# This script monitors the performance of the VG-Canvas test environment

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Performance Monitoring${BLUE}                        ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Ensure we're in the project root
cd "$(dirname "$0")/../../" || exit 1

# Check if environment is running
if ! docker ps | grep vg-canvas-server > /dev/null; then
    echo -e "${RED}Error: VG-Canvas testing environment is not running${NC}"
    echo "Please start the environment with: ./tests/docker/start-test-environment.sh"
    exit 1
fi

# Create performance logs directory
mkdir -p tests/performance
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
PERFORMANCE_LOG="tests/performance/perf_log_${TIMESTAMP}.csv"

# Create CSV header
echo "Timestamp,Container,CPU%,Memory,NetworkIn,NetworkOut" > "$PERFORMANCE_LOG"

# Monitoring function
monitor_performance() {
    local duration=$1
    local interval=$2
    local elapsed=0
    
    echo -e "${YELLOW}Starting performance monitoring for ${duration} seconds...${NC}"
    echo -e "${BLUE}Data is being collected every ${interval} seconds${NC}"
    echo -e "${BLUE}Results will be saved to: ${PERFORMANCE_LOG}${NC}"
    echo
    
    while [ $elapsed -lt $duration ]; do
        # Get current timestamp
        local current_time=$(date +"%Y-%m-%d %H:%M:%S")
        
        # Get stats for each container
        docker stats --no-stream --format "{{.Name}},{{.CPUPerc}},{{.MemUsage}},{{.NetIO}}" | \
        grep "vg-canvas" | \
        while IFS="," read -r container cpu mem netio; do
            # Parse network I/O
            network_in=$(echo "$netio" | awk '{print $1}')
            network_out=$(echo "$netio" | awk '{print $3}')
            
            # Write to CSV
            echo "${current_time},${container},${cpu},${mem},${network_in},${network_out}" >> "$PERFORMANCE_LOG"
        done
        
        # Update progress
        elapsed=$((elapsed + interval))
        percent=$((elapsed * 100 / duration))
        printf "\rProgress: [%-50s] %d%%" $(printf "%0.s#" $(seq 1 $((percent / 2)))) $percent
        
        # Wait for next interval
        sleep $interval
    done
    
    echo
    echo -e "${GREEN}Monitoring complete!${NC}"
}

# Parse parameters
DURATION=300  # Default 5 minutes
INTERVAL=5    # Default 5 seconds

# Check for command-line parameters
while getopts "d:i:" opt; do
  case $opt in
    d) DURATION=$OPTARG ;;
    i) INTERVAL=$OPTARG ;;
    *) echo "Usage: $0 [-d duration_seconds] [-i interval_seconds]" >&2
       exit 1 ;;
  esac
done

# Run the monitoring
monitor_performance "$DURATION" "$INTERVAL"

# Generate summary
echo
echo -e "${YELLOW}Performance Summary:${NC}"
echo "=================================================="

# Calculate averages
echo -e "${BLUE}Average CPU Usage:${NC}"
awk -F, 'NR>1 {cpu[$2]+=$3; count[$2]++} END {for (c in cpu) printf "%-20s: %5.2f%%\n", c, cpu[c]/count[c]}' "$PERFORMANCE_LOG" | sort

echo
echo -e "${BLUE}Average Memory Usage:${NC}"
grep -v "Timestamp" "$PERFORMANCE_LOG" | cut -d, -f2,4 | sort | uniq -c | sort -nr | head -n 10 | 
    while read -r count container mem; do
        echo "$container: $mem (observed $count times)"
    done

echo
echo -e "${BLUE}Total Network I/O:${NC}"
# This is simplified - a proper analysis would need to parse network values and their units
grep -v "Timestamp" "$PERFORMANCE_LOG" | awk -F, '{print $2","$5","$6}' | sort | uniq -c | sort -nr | head -n 10 |
    while read -r count container netin netout; do
        echo "$container: IN=$netin, OUT=$netout (latest sample)"
    done

echo
echo -e "${GREEN}Complete performance data saved to: ${PERFORMANCE_LOG}${NC}"
echo -e "${BLUE}You can import this CSV file into a spreadsheet for further analysis${NC}"