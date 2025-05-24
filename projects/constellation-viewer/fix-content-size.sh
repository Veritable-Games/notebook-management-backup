#!/bin/bash

# Script to restart server with fixed content size

echo "Restarting server with fixed content size..."

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
echo "The following fixes were applied to stabilize content dimensions:"
echo "1. Applied strict fixed height (500px) to content display area"
echo "2. Added CSS containment to prevent layout recalculation"
echo "3. Fixed content article structure with min-height"
echo "4. Disabled transitions that could cause layout shifts"
echo "5. Applied proper box-sizing to all content elements"
echo "6. Added overflow control to handle varying content sizes"
echo "7. Used word-wrapping and hyphenation to prevent text overflow issues"
echo ""
echo "The content area will now maintain consistent dimensions regardless of content."
echo ""
echo "View the enhanced version at: http://localhost:8082/enhanced-version"
echo ""
echo "To stop the server: kill \$(cat backend.pid)"