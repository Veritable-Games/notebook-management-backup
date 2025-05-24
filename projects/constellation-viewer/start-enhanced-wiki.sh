#!/bin/bash

# Start Enhanced Wiki System
echo "Starting Enhanced Wiki System..."

# Create notebooks directory if it doesn't exist
if [ ! -d "notebooks" ]; then
  echo "Creating notebooks directory..."
  mkdir -p notebooks
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the server
echo "Starting server at http://localhost:3003"
echo "Enhanced Wiki available at http://localhost:3003/enhanced"
node backend/server.js

# In case of error
echo "Server stopped. Check for errors above."