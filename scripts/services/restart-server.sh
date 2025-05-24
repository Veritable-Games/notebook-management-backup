#!/bin/bash

# Restart the Constellation Viewer server

echo "Attempting to find and stop the running server..."

# Find the PID of the running server
SERVER_PID=$(ps aux | grep "node.*Constellation-Viewer/backend/server.js" | grep -v grep | awk '{print $2}')

if [ -n "$SERVER_PID" ]; then
  echo "Found server running with PID $SERVER_PID"
  echo "Stopping server..."
  kill $SERVER_PID
  sleep 2
  
  # Check if it's still running
  if kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server didn't stop with regular kill, using kill -9..."
    kill -9 $SERVER_PID
    sleep 1
  fi
  
  echo "Server stopped"
else
  echo "No running server found"
fi

echo "Starting server..."
cd /home/user/Repository/WebProjects/Constellation-Viewer
node backend/server.js > /home/user/Repository/WebProjects/Constellation-Viewer/backend.log 2>&1 &
NEW_PID=$!

echo "Server started with PID $NEW_PID"
echo "Waiting for server to initialize..."
sleep 3

# Check if server is running
if kill -0 $NEW_PID 2>/dev/null; then
  echo "Server is running successfully"
  
  # Print endpoints
  echo ""
  echo "Available endpoints:"
  echo "- Unified Wiki Interface: http://localhost:3003/wiki"
  echo "- 3D Visualization: http://localhost:3003/3d"
  echo ""
  echo "The old /simple and /enhanced endpoints now redirect to /wiki"
else
  echo "Server failed to start. Check logs:"
  tail -n 20 /home/user/Repository/WebProjects/Constellation-Viewer/backend.log
fi