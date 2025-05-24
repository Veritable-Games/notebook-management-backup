#!/bin/bash

# Script to restart server with improved interface

echo "Restarting server with improved interface..."

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
echo "1. Removed unnecessary banner 'Navigate and Explore Your Text Notebooks'"
echo "2. Completely removed loading indicator"
echo "3. Removed redundant demo mode indicator"
echo "4. Fixed content area dimensions to prevent layout shifts"
echo "5. Added fixed height to system log to prevent layout changes"
echo "6. Disabled non-functional buttons and marked them appropriately"
echo "7. Streamlined interface"
echo ""
echo "View the enhanced version at: http://localhost:8082/enhanced-version"
echo ""
echo "To stop the server: kill \$(cat backend.pid)"