#!/bin/bash

# Start the Notebook Explorer
echo "Starting Notebook Explorer..."

# First, check if the server is already running
SERVER_PID=$(ps aux | grep "node.*projects/constellation-viewer/backend/server.js" | grep -v grep | awk '{print $2}')

if [ -n "$SERVER_PID" ]; then
  echo "Notebook Explorer is already running with PID $SERVER_PID"
  echo "Stopping current instance..."
  kill $SERVER_PID
  sleep 2
  
  # Check if it's still running
  if kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server didn't stop with regular kill, using kill -9..."
    kill -9 $SERVER_PID
    sleep 1
  fi
fi

# Start the server
cd /home/user/Repository/projects/constellation-viewer/
node backend/server.js > /home/user/Repository/projects/constellation-viewer/backend.log 2>&1 &
NEW_PID=$!

echo "Server started with PID $NEW_PID"
echo "Waiting for server to initialize..."
sleep 3

# Check if server is running
if kill -0 $NEW_PID 2>/dev/null; then
  echo "Notebook Explorer is running successfully"
  
  # Print endpoints
  echo ""
  echo "Available endpoints:"
  echo "- Main Interface: http://localhost:8082"
  echo "- Basic Interface: http://localhost:8082/basic"
  echo ""
  
  # Save PID for later reference
  echo $NEW_PID > /home/user/Repository/projects/constellation-viewer/backend.pid
else
  echo "Server failed to start. Check logs:"
  tail -n 20 /home/user/Repository/projects/constellation-viewer/backend.log
fi