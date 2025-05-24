#!/bin/bash

# Start just the CV-Backend
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

echo "Starting CV-Backend..."

cd /home/user/Repository/WebProjects/Constellation-Viewer/backend/
node server.js > "$LOG_DIR/CV-Backend.log" 2>&1 &
echo $! > "$LOG_DIR/CV-Backend.pid"

echo "CV-Backend started with PID $(cat "$LOG_DIR/CV-Backend.pid")"
echo "Log file: $LOG_DIR/CV-Backend.log"