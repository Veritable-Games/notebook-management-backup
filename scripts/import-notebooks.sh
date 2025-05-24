#!/bin/bash

# Notebook Importer Launcher
# Run this script to import notebooks into the Constellation Viewer wiki

echo "Starting Notebook Import Process..."

# Ensure services are running
echo "Checking if services are running..."
BACKEND_API_RUNNING=$(curl -s http://localhost:4000/api/health | grep -c "up")
CONSTELLATION_RUNNING=$(curl -s http://localhost:8081/api/relationships/check | grep -c "true")

if [ "$BACKEND_API_RUNNING" -eq "0" ] || [ "$CONSTELLATION_RUNNING" -eq "0" ]; then
  echo "Error: Required services are not running."
  echo "Please ensure Backend API (port 4000) and Constellation Viewer (port 8081) are running."
  exit 1
fi

echo "Services are running. Starting import..."

# Run the node script
cd /home/user/Repository
node ./scripts/services/import-notebooks-to-wiki.js

echo "Import process complete!"
echo "You can now view your notebooks as wiki pages at http://localhost:8081/"
echo "View relationship visualizations at http://localhost:8081/relationships"