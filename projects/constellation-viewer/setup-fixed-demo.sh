#!/bin/bash

# Script to set up the enhanced version of Notebook Explorer with fixed display issues

echo "Setting up enhanced version with fixed display issues..."

# Stop any running instances
pkill -f "node.*server.js" || true

# Start the server
cd /home/user/Repository/projects/constellation-viewer
node backend/server.js &

# Save PID
echo $! > backend.pid

# Wait for server to start
sleep 2

# Provide summary of changes made
echo "The following improvements have been made:"
echo "1. Fixed persistent loading indicator by removing it completely"
echo "2. Added fixed height containers to prevent layout shifts"
echo "3. Simplified demo status indicator for better visibility"
echo "4. Improved content area sizing for stable rendering"
echo "5. Added performance optimizations for file display"
echo ""
echo "View the enhanced version at: http://localhost:8082/enhanced-version"
echo ""
echo "To stop the server: kill \$(cat backend.pid)"