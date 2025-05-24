#!/bin/bash

# VG-Canvas Load Test Script
# This script runs a server and simulates many clients locally to test performance

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Default settings
NUM_CLIENTS=20
TEST_DURATION=30
UPDATE_INTERVAL=1000  # ms between updates

# Parse command-line arguments
while getopts "c:d:i:" opt; do
  case $opt in
    c) NUM_CLIENTS="$OPTARG" ;;
    d) TEST_DURATION="$OPTARG" ;;
    i) UPDATE_INTERVAL="$OPTARG" ;;
    *) echo "Usage: $0 [-c num_clients] [-d duration_seconds] [-i update_interval_ms]" >&2
       exit 1 ;;
  esac
done

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Load Testing Environment${BLUE}                      ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo

# Show configuration
echo -e "${YELLOW}Test Configuration:${NC}"
echo "Number of clients: $NUM_CLIENTS"
echo "Test duration: $TEST_DURATION seconds"
echo "Update interval: $UPDATE_INTERVAL ms"
echo

# Ensure we're in the project root
cd "$(dirname "$0")/../" || exit 1

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if there's a process already running on port 5000
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Error: Port 5000 is already in use${NC}"
    echo "Please stop any existing processes using port 5000 and try again"
    exit 1
fi

# Start the server
echo -e "${YELLOW}Starting WebSocket server on port 5000...${NC}"
node scripts/system/server.js > logs/load_server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

# Give the server time to start
echo "Waiting for server to initialize..."
sleep 3

# Verify the server is running
if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Error: Server failed to start${NC}"
    echo "Check logs/load_server.log for details"
    exit 1
fi

echo -e "${GREEN}Server is running on port 5000${NC}"

# Create a load test client
cat > tests/load-client.js << EOL
const { io } = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');

// Configuration
const SERVER_URL = 'http://localhost:5000';
const CLIENT_ID = process.argv[2];
const ROOM_ID = process.argv[3] || 'load-test-room';
const UPDATE_INTERVAL = parseInt(process.argv[4]) || 1000;
const TEST_DURATION = parseInt(process.argv[5]) || 30;

// Metrics
let updatesSent = 0;
let updatesReceived = 0;
let connectTime = null;
let disconnectTime = null;

console.log(\`Client \${CLIENT_ID} starting\`);
console.log(\`Connecting to \${SERVER_URL}\`);
console.log(\`Room ID: \${ROOM_ID}\`);
console.log(\`Update interval: \${UPDATE_INTERVAL}ms\`);
console.log(\`Test duration: \${TEST_DURATION}s\`);

const startTime = Date.now();
const socket = io(SERVER_URL);

socket.on('connect', () => {
  connectTime = Date.now();
  console.log(\`Connected with socket ID: \${socket.id} (took \${connectTime - startTime}ms)\`);
  
  // Join the test room
  socket.emit('join-room', ROOM_ID, \`LoadClient-\${CLIENT_ID}\`);
  
  // Send updates periodically
  const intervalId = setInterval(() => {
    // Send scene update
    const sceneData = {
      elements: [{
        id: uuidv4(),
        type: 'rectangle',
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 600),
        width: Math.floor(Math.random() * 100) + 20,
        height: Math.floor(Math.random() * 100) + 20,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }],
      version: Date.now()
    };
    
    socket.emit('scene-update', ROOM_ID, sceneData);
    updatesSent++;
    
    // Send pointer update
    const pointerData = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 600)
    };
    
    socket.emit('pointer-update', ROOM_ID, pointerData);
    updatesSent++;
    
  }, UPDATE_INTERVAL);
  
  // End the test after the specified duration
  setTimeout(() => {
    clearInterval(intervalId);
    disconnectTime = Date.now();
    const testDuration = (disconnectTime - connectTime) / 1000;
    
    console.log(\`Test completed for client \${CLIENT_ID}\`);
    console.log(\`Duration: \${testDuration.toFixed(2)}s\`);
    console.log(\`Updates sent: \${updatesSent}\`);
    console.log(\`Updates received: \${updatesReceived}\`);
    console.log(\`Updates per second sent: \${(updatesSent / testDuration).toFixed(2)}\`);
    console.log(\`Updates per second received: \${(updatesReceived / testDuration).toFixed(2)}\`);
    
    socket.disconnect();
    process.exit(0);
  }, TEST_DURATION * 1000);
});

// Count received updates
socket.on('scene-update', () => {
  updatesReceived++;
});

socket.on('pointer-update', () => {
  updatesReceived++;
});

socket.on('error', (err) => {
  console.error(\`Error: \${err.message}\`);
});

socket.on('disconnect', () => {
  console.log(\`Disconnected from server\`);
});
EOL

# Create a unique room ID for this test
TEST_ROOM="load-test-room-$(date +%s)"

# Create a directory for client logs
mkdir -p logs/load_clients

# Start load test clients
echo -e "${YELLOW}Starting $NUM_CLIENTS test clients...${NC}"

# Function to start clients in batches to avoid overwhelming the server
start_clients() {
  local batch_size=5
  local num_clients=$1
  local client_pids=()
  
  for ((i=1; i<=num_clients; i++)); do
    echo -n "Starting client $i... "
    node tests/load-client.js "$i" "$TEST_ROOM" "$UPDATE_INTERVAL" "$TEST_DURATION" > "logs/load_clients/client_$i.log" 2>&1 &
    client_pids+=($!)
    echo "PID: ${client_pids[-1]}"
    
    # Sleep briefly after each batch
    if ((i % batch_size == 0)) && ((i < num_clients)); then
      echo "Pausing to avoid overwhelming server..."
      sleep 1
    fi
  done
  
  echo "${client_pids[@]}"
}

# Start clients and get PIDs
CLIENT_PIDS=($(start_clients "$NUM_CLIENTS"))

echo -e "${GREEN}All $NUM_CLIENTS clients started successfully!${NC}"

# Function to show server stats
show_server_stats() {
  echo -e "${YELLOW}Server Stats:${NC}"
  # Get CPU and memory usage of node process
  local cpu_mem=$(ps -p $SERVER_PID -o %cpu,%mem | tail -n 1)
  echo "CPU/Memory usage: $cpu_mem"
  
  # Show connection count from server log
  echo "Recent server log entries:"
  tail -n 10 logs/load_server.log
  
  # Show network stats
  echo "Network connections:"
  netstat -an | grep 5000 | wc -l
}

# Wait for all clients to finish their tests
echo -e "${YELLOW}Test is running. Monitoring server for $TEST_DURATION seconds...${NC}"

# Show server stats every 5 seconds
for ((i=0; i<TEST_DURATION; i+=5)); do
  sleep 5
  show_server_stats
done

# Make sure all client processes are terminated
echo -e "${YELLOW}Ensuring all clients are stopped...${NC}"
for pid in "${CLIENT_PIDS[@]}"; do
  if kill -0 $pid 2>/dev/null; then
    kill $pid
  fi
done

# Compile test results
echo -e "${YELLOW}Compiling test results...${NC}"

# Calculate total updates
TOTAL_SENT=0
TOTAL_RECEIVED=0

for ((i=1; i<=NUM_CLIENTS; i++)); do
  if [[ -f "logs/load_clients/client_$i.log" ]]; then
    SENT=$(grep "Updates sent:" "logs/load_clients/client_$i.log" | awk '{print $3}')
    RECEIVED=$(grep "Updates received:" "logs/load_clients/client_$i.log" | awk '{print $3}')
    
    if [[ -n "$SENT" ]]; then
      TOTAL_SENT=$((TOTAL_SENT + SENT))
    fi
    
    if [[ -n "$RECEIVED" ]]; then
      TOTAL_RECEIVED=$((TOTAL_RECEIVED + RECEIVED))
    fi
  fi
done

echo -e "${GREEN}Test Summary:${NC}"
echo "Total clients: $NUM_CLIENTS"
echo "Test duration: $TEST_DURATION seconds"
echo "Total updates sent: $TOTAL_SENT"
echo "Total updates received: $TOTAL_RECEIVED"
echo "Updates per second sent: $(echo "scale=2; $TOTAL_SENT / $TEST_DURATION" | bc)"
echo "Updates per second received: $(echo "scale=2; $TOTAL_RECEIVED / $TEST_DURATION" | bc)"

# Stop the server
echo -e "${YELLOW}Stopping server...${NC}"
kill $SERVER_PID

echo -e "${GREEN}Load test completed!${NC}"