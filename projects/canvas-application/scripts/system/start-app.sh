#!/bin/bash

# Start the Canvas App

# Navigate to the app directory
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"

# Kill any existing React development servers
echo "Checking for existing React servers..."
pkill -f "react-scripts start" 2>/dev/null || true

# Start the React development server with source map warnings disabled
echo "Starting Canvas App..."
GENERATE_SOURCEMAP=false npm start
