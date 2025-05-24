#!/bin/bash

# VG-Canvas Simple Test Script
# This script runs a server and simulates multiple clients locally

# Set text colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}║  ${YELLOW}VG-Canvas Simple Testing Environment${BLUE}                    ║${NC}"
echo -e "${BLUE}║                                                            ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
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
node scripts/system/server.js > logs/server.log 2>&1 &
SERVER_PID=$!
echo "Server started with PID $SERVER_PID"

# Give the server time to start
echo "Waiting for server to initialize..."
sleep 3

# Verify the server is running
if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}Error: Server failed to start${NC}"
    echo "Check logs/server.log for details"
    exit 1
fi

echo -e "${GREEN}Server is running on port 5000${NC}"

# Create a simple test for the WebSocket server
cat > tests/simple-client.js << 'EOL'
const { io } = require('socket.io-client');
const { v4: uuidv4 } = require('uuid');

// Configuration
const SERVER_URL = 'http://localhost:5000';
const roomId = process.argv[2] || 'test-room';
const username = process.argv[3] || `User-${Math.floor(Math.random() * 1000)}`;

console.log(`Connecting to ${SERVER_URL}`);
console.log(`Room ID: ${roomId}`);
console.log(`Username: ${username}`);

const socket = io(SERVER_URL);

socket.on('connect', () => {
  console.log(`Connected with socket ID: ${socket.id}`);
  
  // Join the test room
  socket.emit('join-room', roomId, username);
  
  // Send test data
  setInterval(() => {
    const sceneData = {
      elements: [{
        id: uuidv4(),
        type: 'rectangle',
        x: Math.floor(Math.random() * 1000),
        y: Math.floor(Math.random() * 600),
        width: 100,
        height: 80,
        backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
      }],
      version: Date.now()
    };
    
    socket.emit('scene-update', roomId, sceneData);
    console.log('Sent scene update');
    
    // Also send pointer updates
    const pointerData = {
      x: Math.floor(Math.random() * 1000),
      y: Math.floor(Math.random() * 600)
    };
    
    socket.emit('pointer-update', roomId, pointerData);
    console.log('Sent pointer update');
  }, 2000);
});

socket.on('room-info', (data) => {
  console.log('Received room info:', data);
});

socket.on('user-joined', (data) => {
  console.log('User joined:', data);
});

socket.on('scene-update', (data) => {
  console.log('Received scene update from:', data.socketId);
});

socket.on('pointer-update', (data) => {
  console.log('Received pointer update from:', data.socketId);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('Closing connection...');
  socket.disconnect();
  process.exit(0);
});
EOL

# Start multiple client instances
echo -e "${YELLOW}Starting test clients...${NC}"

# Create a unique room ID for this test
TEST_ROOM="test-room-$(date +%s)"

# Start client 1
echo "Starting client 1 (room creator)..."
node tests/simple-client.js "$TEST_ROOM" "Client1" > logs/client1.log 2>&1 &
CLIENT1_PID=$!

# Wait briefly before connecting other clients
sleep 2

# Start client 2
echo "Starting client 2 (joiner)..."
node tests/simple-client.js "$TEST_ROOM" "Client2" > logs/client2.log 2>&1 &
CLIENT2_PID=$!

# Start client 3
echo "Starting client 3 (joiner)..."
node tests/simple-client.js "$TEST_ROOM" "Client3" > logs/client3.log 2>&1 &
CLIENT3_PID=$!

echo -e "${GREEN}All clients started successfully!${NC}"
echo "Client 1 PID: $CLIENT1_PID"
echo "Client 2 PID: $CLIENT2_PID"
echo "Client 3 PID: $CLIENT3_PID"

# Function to show logs
tail_logs() {
  echo -e "${YELLOW}Showing recent logs...${NC}"
  echo -e "${BLUE}Server log:${NC}"
  tail -n 10 logs/server.log
  echo
  echo -e "${BLUE}Client 1 log:${NC}"
  tail -n 10 logs/client1.log
  echo
  echo -e "${BLUE}Client 2 log:${NC}"
  tail -n 10 logs/client2.log
  echo
  echo -e "${BLUE}Client 3 log:${NC}"
  tail -n 10 logs/client3.log
}

# Function to clean up processes
cleanup() {
  echo -e "${YELLOW}Cleaning up...${NC}"
  kill $SERVER_PID $CLIENT1_PID $CLIENT2_PID $CLIENT3_PID 2>/dev/null
  echo "All processes terminated"
  exit 0
}

# Handle Ctrl+C
trap cleanup SIGINT

# Run test for 30 seconds
echo -e "${YELLOW}Test is running. Press Ctrl+C to stop...${NC}"
echo "Will automatically stop after 30 seconds"

# Show logs every 5 seconds for 30 seconds
for i in {1..6}; do
  sleep 5
  tail_logs
done

# Clean up after 30 seconds
cleanup