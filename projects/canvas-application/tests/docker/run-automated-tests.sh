#!/bin/bash

# VG-Canvas Automated Testing Script
# This script runs automated tests against the Docker-based testing environment

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Automated Collaboration Testing${BLUE}                 ║${NC}"
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

# Create test results directory
mkdir -p tests/results
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_FILE="tests/results/test_results_${TIMESTAMP}.log"

echo -e "${YELLOW}Starting automated tests...${NC}"
echo "Test results will be saved to: ${RESULTS_FILE}"
echo

# Function to run a test and log results
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo -e "${YELLOW}Running test: ${test_name}${NC}"
    echo "== Test: ${test_name} ==" >> "${RESULTS_FILE}"
    echo "Command: ${test_command}" >> "${RESULTS_FILE}"
    echo "---" >> "${RESULTS_FILE}"
    
    # Run test and capture output
    if eval "${test_command}" >> "${RESULTS_FILE}" 2>&1; then
        echo -e "${GREEN}✓ Test passed: ${test_name}${NC}"
        echo "RESULT: PASS" >> "${RESULTS_FILE}"
    else
        echo -e "${RED}✗ Test failed: ${test_name}${NC}"
        echo "RESULT: FAIL" >> "${RESULTS_FILE}"
    fi
    echo "===============================" >> "${RESULTS_FILE}"
    echo >> "${RESULTS_FILE}"
}

# Network connectivity tests
run_test "Server connectivity" "curl -s http://localhost:5000 > /dev/null"
run_test "Client 1 connectivity" "curl -s http://localhost:3001 > /dev/null"
run_test "Client 2 connectivity" "curl -s http://localhost:3002 > /dev/null"
run_test "Client 3 connectivity" "curl -s http://localhost:3003 > /dev/null"

# Server log analysis
run_test "WebSocket server status" "docker logs vg-canvas-server | grep 'Server running on port' > /dev/null"

# Check container resource usage 
run_test "Resource usage check" "docker stats --no-stream --format 'table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}' >> '${RESULTS_FILE}'"

echo
echo -e "${GREEN}All tests completed!${NC}"
echo -e "${BLUE}Results saved to: ${RESULTS_FILE}${NC}"
echo
echo -e "${YELLOW}For more advanced testing, consider:${NC}"
echo "1. Installing Playwright for automated browser testing"
echo "2. Running the network simulation tests (requires tc and netem)"
echo "3. Using the load testing script for performance analysis"
echo
echo -e "${BLUE}To view detailed logs: docker logs vg-canvas-server${NC}"