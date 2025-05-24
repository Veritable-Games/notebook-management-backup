#!/bin/bash

# Launch Relationship API Service
echo "Starting Knowledge Constellation Relationship API..."

# Go to the data directory
cd /home/user/Repository/data

# Check if node modules are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the API server
echo "Starting API server on port 4000..."
node server.js > api.log 2>&1 &
PID=$!

# Save the PID to a file
echo $PID > api.pid

# Wait a moment to make sure the server starts
sleep 2

# Check if server is running
if kill -0 $PID 2>/dev/null; then
  echo "API server started successfully"
  echo "Access the visualization at: http://localhost:4000"
  echo "API endpoints available at: http://localhost:4000/api/v1/relationships"
else
  echo "Failed to start API server. Check the logs at: /home/user/Repository/data/api.log"
  exit 1
fi

# Restart the Constellation Viewer service to use the updated configuration
echo "Restarting Constellation Viewer service..."
pkill -f "node /home/user/Repository/WebProjects/Constellation-Viewer/backend/server.js" || echo "Constellation Viewer not running"

# Wait a moment
sleep 1

# Start the Constellation Viewer service
cd /home/user/Repository/WebProjects/Constellation-Viewer
node backend/server.js > /home/user/Repository/WebProjects/Constellation-Viewer/backend.log 2>&1 &
CV_PID=$!

# Check if service started correctly
if kill -0 $CV_PID 2>/dev/null; then
  echo "Constellation Viewer restarted successfully"
else
  echo "Failed to restart Constellation Viewer"
fi

echo ""
echo "To access the components:"
echo "- Relationship Visualization: http://localhost:4000"
echo "- API Documentation: http://localhost:4000/api/v1"
echo "- Constellation Viewer: http://localhost:3003"
echo "- Unified Interface: http://localhost:9001"
echo ""
echo "To stop the API server, run: kill $(cat /home/user/Repository/data/api.pid)"