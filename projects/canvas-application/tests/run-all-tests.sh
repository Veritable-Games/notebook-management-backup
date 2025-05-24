#!/bin/bash

# VG-Canvas Master Test Script
# This script runs all tests in sequence

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Complete Test Suite${BLUE}                           ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Ensure we're in the project root
cd "$(dirname "$0")/../" || exit 1

# Create a timestamped results directory
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RESULTS_DIR="tests/results/run_${TIMESTAMP}"
mkdir -p "$RESULTS_DIR"

echo -e "${YELLOW}VG-Canvas Test Suite Starting${NC}"
echo "All test results will be saved to: $RESULTS_DIR"
echo

# Function to run a test phase
run_test_phase() {
    local name=$1
    local command=$2
    local log_file="${RESULTS_DIR}/${name// /_}.log"
    
    echo "======================================================="
    echo -e "${YELLOW}Starting test phase: ${name}${NC}"
    echo "Log file: $log_file"
    echo "-------------------------------------------------------"
    
    # Run the test and capture output
    eval "$command" > "$log_file" 2>&1
    local status=$?
    
    if [ $status -eq 0 ]; then
        echo -e "${GREEN}✓ Test phase completed successfully: ${name}${NC}"
    else
        echo -e "${RED}✗ Test phase failed: ${name} (Exit code: $status)${NC}"
    fi
    
    echo "-------------------------------------------------------"
    echo "Recent log entries:"
    tail -n 10 "$log_file" | sed 's/^/  /'
    echo
    
    return $status
}

# Track overall success
FAILED_PHASES=0

# Phase 1: Start the Docker environment
run_test_phase "Environment Setup" "bash tests/docker/start-test-environment.sh"
if [ $? -ne 0 ]; then
    echo -e "${RED}Critical failure in environment setup. Aborting tests.${NC}"
    exit 1
fi

# Give containers time to fully initialize
echo -e "${YELLOW}Waiting for containers to initialize...${NC}"
sleep 10

# Phase 2: Basic connectivity tests
run_test_phase "Basic Tests" "bash tests/docker/run-automated-tests.sh"
if [ $? -ne 0 ]; then ((FAILED_PHASES++)); fi

# Phase 3: Performance monitoring (running in background)
run_test_phase "Performance Monitoring" "bash tests/docker/monitor-performance.sh -d 120 -i 2 &"

# Phase 4: Run load tests with different client counts
echo -e "${YELLOW}Running load tests with incremental client counts...${NC}"

for CLIENTS in 5 10 20; do
    run_test_phase "Load Test ($CLIENTS clients)" "bash tests/docker/run-load-test.sh -c $CLIENTS -d 30"
    if [ $? -ne 0 ]; then ((FAILED_PHASES++)); fi
    
    # Brief pause between tests
    sleep 5
done

# Phase 5: Shut down the environment
run_test_phase "Environment Cleanup" "bash tests/docker/stop-test-environment.sh"
if [ $? -ne 0 ]; then ((FAILED_PHASES++)); fi

# Generate summary report
SUMMARY_FILE="${RESULTS_DIR}/summary.md"

echo "# VG-Canvas Test Suite Summary" > "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "**Date:** $(date)" >> "$SUMMARY_FILE"
echo "**Results Directory:** \`${RESULTS_DIR}\`" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"

if [ $FAILED_PHASES -eq 0 ]; then
    echo "## ✅ All test phases completed successfully" >> "$SUMMARY_FILE"
else
    echo "## ⚠️ Some test phases failed" >> "$SUMMARY_FILE"
    echo "" >> "$SUMMARY_FILE"
    echo "**Failed Phases:** $FAILED_PHASES" >> "$SUMMARY_FILE"
fi

echo "" >> "$SUMMARY_FILE"
echo "## Test Phases" >> "$SUMMARY_FILE"

for log_file in "$RESULTS_DIR"/*.log; do
    phase_name=$(basename "$log_file" .log | tr '_' ' ')
    echo "" >> "$SUMMARY_FILE"
    echo "### $phase_name" >> "$SUMMARY_FILE"
    echo "" >> "$SUMMARY_FILE"
    echo '```' >> "$SUMMARY_FILE"
    head -n 20 "$log_file" >> "$SUMMARY_FILE"
    echo '...' >> "$SUMMARY_FILE"
    tail -n 20 "$log_file" >> "$SUMMARY_FILE"
    echo '```' >> "$SUMMARY_FILE"
done

# Final report
echo
echo -e "${GREEN}Test suite execution completed!${NC}"
echo -e "${BLUE}Summary report: ${SUMMARY_FILE}${NC}"
echo

if [ $FAILED_PHASES -eq 0 ]; then
    echo -e "${GREEN}All test phases passed successfully!${NC}"
    exit 0
else
    echo -e "${RED}Some test phases failed. Check the logs for details.${NC}"
    exit 1
fi