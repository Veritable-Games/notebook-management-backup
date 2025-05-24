#!/bin/bash
# start-all.sh - Start all Veritable Games services
# Usage: ./start-all.sh

# Directory containing all projects
REPO_DIR="/home/user/Repository/projects"
LOGS_DIR="$REPO_DIR/logs"

# Ensure logs directory exists
mkdir -p "$LOGS_DIR"

# Start Backend API
echo "Starting Backend API..."
cd "$REPO_DIR/backend-api" && npm start > "$LOGS_DIR/backend-api.log" 2>&1 &
echo $! > "$REPO_DIR/backend-api.pid"
echo "Backend API started on port 4000"

# Start Constellation Viewer (Wiki)
echo "Starting Constellation Viewer..."
cd "$REPO_DIR/constellation-viewer" && node backend/server.js > "$LOGS_DIR/constellation-viewer.log" 2>&1 &
echo $! > "$REPO_DIR/constellation-viewer.pid"
echo "Constellation Viewer started on port 3003"

# Start Canvas Application
echo "Starting Canvas Application..."
cd "$REPO_DIR/canvas-application" && ./vg-canvas.js 1 > "$LOGS_DIR/canvas-application.log" 2>&1 &
echo $! > "$REPO_DIR/canvas-application.pid"
echo "Canvas Application started on port 3000"

# Start Content Management
echo "Starting Content Management..."
cd "$REPO_DIR/content-management" && npm start > "$LOGS_DIR/content-management.log" 2>&1 &
echo $! > "$REPO_DIR/content-management.pid"
echo "Content Management started on port 3001"

# Start 3D Visualization
echo "Starting 3D Visualization..."
cd "$REPO_DIR/3d-visualization" && npm start > "$LOGS_DIR/3d-visualization.log" 2>&1 &
echo $! > "$REPO_DIR/3d-visualization.pid"
echo "3D Visualization started on port 8090"

# Start User Admin Portal
echo "Starting User Admin Portal..."
cd "$REPO_DIR/user-admin-portal" && npm start > "$LOGS_DIR/user-admin-portal.log" 2>&1 &
echo $! > "$REPO_DIR/user-admin-portal.pid"
echo "User Admin Portal started on port 3005"

# Start Monitoring Dashboard
echo "Starting Monitoring Dashboard..."
cd "$REPO_DIR/monitoring/dashboard" && python3 -m http.server 9090 > "$LOGS_DIR/monitoring.log" 2>&1 &
echo $! > "$REPO_DIR/monitoring.pid"
echo "Monitoring Dashboard started on port 9090"

echo ""
echo "All services started. View logs in $LOGS_DIR/"
echo "Access the main dashboard at: http://localhost:9090/dashboard.html"
echo ""
echo "To stop all services, run: ./stop-all.sh"