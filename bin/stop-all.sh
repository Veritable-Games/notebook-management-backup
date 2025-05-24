#!/bin/bash
# stop-all.sh - Stop all Veritable Games services
# Usage: ./stop-all.sh

REPO_DIR="/home/user/Repository/projects"

# Function to gracefully stop a process
stop_service() {
  local name=$1
  local pid_file="$REPO_DIR/$name.pid"
  
  if [ -f "$pid_file" ]; then
    PID=$(cat "$pid_file")
    echo "Stopping $name (PID: $PID)..."
    kill $PID 2>/dev/null || true
    rm "$pid_file"
  else
    echo "$name is not running or PID file missing"
  fi
}

# Stop all services
stop_service "backend-api"
stop_service "constellation-viewer"
stop_service "canvas-application"
stop_service "content-management"
stop_service "3d-visualization"
stop_service "user-admin-portal"
stop_service "monitoring"

# Also kill any remaining Python HTTP servers (for monitoring dashboard)
PYTHON_HTTP_PID=$(ps aux | grep 'python3 -m http.server 9090' | grep -v grep | awk '{print $2}')
if [ ! -z "$PYTHON_HTTP_PID" ]; then
  echo "Stopping Python HTTP server (PID: $PYTHON_HTTP_PID)..."
  kill $PYTHON_HTTP_PID 2>/dev/null || true
fi

echo "All services stopped"