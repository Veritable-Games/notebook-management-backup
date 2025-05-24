#!/bin/bash

# VG-Canvas Load Test Manager
# This script runs the load testing script in a Docker container

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas WebSocket Load Test Manager${BLUE}                    ║${NC}"
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

# Default parameters
NUM_CLIENTS=20
TEST_DURATION=60
ROOM_ID="load-test-room-$(date +%s)"

# Parse command-line args
while getopts "c:d:r:" opt; do
  case $opt in
    c) NUM_CLIENTS="$OPTARG" ;;
    d) TEST_DURATION="$OPTARG" ;;
    r) ROOM_ID="$OPTARG" ;;
    *) echo "Usage: $0 [-c num_clients] [-d duration_seconds] [-r room_id]" >&2
       exit 1 ;;
  esac
done

echo -e "${YELLOW}VG-Canvas Load Test Configuration:${NC}"
echo "Number of clients: $NUM_CLIENTS"
echo "Test duration: $TEST_DURATION seconds"
echo "Room ID: $ROOM_ID"
echo

# Create results directory
mkdir -p tests/results
LOG_FILE="tests/results/load_test_$(date +%Y%m%d_%H%M%S).log"

echo -e "${YELLOW}Starting load test...${NC}"
echo "Results will be logged to: $LOG_FILE"

# Run the load test script in a container
# Connect to already running test container
docker exec -it vg-canvas-test-client \
  sh -c "SERVER_URL=http://server:5000 \
  NUM_CLIENTS=$NUM_CLIENTS \
  TEST_DURATION=$TEST_DURATION \
  ROOM_ID=$ROOM_ID \
  node load-test.js" | tee "$LOG_FILE"

echo
echo -e "${GREEN}Load test complete!${NC}"
echo -e "${BLUE}Results saved to: $LOG_FILE${NC}"
echo
echo -e "${YELLOW}Server logs during test:${NC}"
docker logs --since=5m vg-canvas-server | grep -E "error|warning|connected|disconnected" | tail -n 20

echo
echo -e "${BLUE}For a full analysis, check the server logs and the performance data${NC}"
echo "To view detailed server logs: docker logs vg-canvas-server"
echo "To monitor server performance during tests: ./tests/docker/monitor-performance.sh"