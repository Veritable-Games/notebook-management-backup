#!/bin/bash

# VG-Canvas Startup Script
# This script starts the VG-Canvas application

# Set script to exit on error
set -e

# Display banner
echo "============================================="
echo "         Starting VG-Canvas App              "
echo "============================================="

# Navigate to the application directory
APP_DIR="$HOME/Repository/Canvas"
cd "$APP_DIR"

# Check if node_modules exists, install if not
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the application
echo "Starting VG-Canvas on http://localhost:3000"
echo "Press Ctrl+C to stop the application"
npm start

# This point is reached only if npm start exits
echo "VG-Canvas has stopped"