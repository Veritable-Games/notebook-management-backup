#!/bin/bash

# Start Wiki Server
echo "Starting Constellation Viewer Wiki..."

# Make script executable
chmod +x "$(dirname "$0")/stop-wiki.sh"

# Check if server is already running on port 8081
if command -v netstat &> /dev/null && netstat -tunlp 2>/dev/null | grep -q ":8081"; then
  echo "Port 8081 is already in use. Another server might be running."
  echo "Checking if it's our wiki server..."
  
  # Try accessing the wiki interface
  if command -v curl &> /dev/null && curl -s http://localhost:8081/ | grep -q "Constellation Viewer"; then
    echo "Wiki is already running and accessible at http://localhost:8081/"
    exit 0
  else
    echo "A different service is using port 8081."
    echo "Please stop that service and try again, or modify the port in server.js"
    exit 1
  fi
fi

# Create data directory if it doesn't exist
if [ ! -d "data/wiki" ]; then
  echo "Creating data directory structure..."
  mkdir -p data/wiki
fi

# Ensure logs directory exists and is linked to the central logs
if [ ! -d "logs" ]; then
  echo "Setting up logs directory..."
  if [ -d "../../projects/logs" ]; then
    echo "Creating symlink to central logs directory..."
    ln -s ../../projects/logs logs
  else
    echo "Central logs directory not found. Creating local logs directory..."
    mkdir -p logs
  fi
fi

# Check for notebooks directory 
if [ ! -d "notebooks" ]; then
  echo "Setting up notebooks directory..."
  # Check if the repository root notebooks directory exists
  if [ -d "../../notebooks" ]; then
    echo "Creating symlink to repository notebooks directory..."
    ln -s ../../notebooks notebooks
  else
    echo "Repository notebooks directory not found. Creating local notebooks directory..."
    mkdir -p notebooks
  fi
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    npm install
  else
    echo "Creating minimal package.json and installing dependencies..."
    cat > package.json << 'EOF'
{
  "name": "constellation-viewer",
  "version": "1.0.0",
  "description": "Veritable Games Wiki Browser",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "body-parser": "^1.19.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}
EOF
    npm install
  fi
fi

# Check if frontend files exist
if [ -f "frontend/wiki.html" ] && [ -f "frontend/wiki.js" ] && [ -f "frontend/wiki.css" ]; then
  echo "Wiki interface files found..."
else
  echo "ERROR: Wiki interface files not found!"
  echo "Required files: frontend/wiki.html, frontend/wiki.js, frontend/wiki.css"
  echo "Please ensure these files exist before starting the server."
  exit 1
fi

# Start the server and save PID
echo "Starting server at http://localhost:8081"
node backend/server.js &
echo $! > backend/server.pid

# Wait for server to start
echo "Waiting for server to start..."
sleep 2

# Check if server is running
if command -v curl &> /dev/null && curl -s http://localhost:8081/ > /dev/null; then
  echo "=================================================="
  echo "Constellation Viewer Wiki started successfully!"
  echo "Access it at http://localhost:8081/"
  echo "=================================================="
else
  echo "Server started but may not be responding yet."
  echo "Try accessing http://localhost:8081/ in your browser."
fi

echo "To stop the server, run: kill $(cat backend/server.pid)"