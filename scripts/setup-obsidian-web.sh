#!/bin/bash

# Setup script for Obsidian Web
# This script sets up the environment and starts the Obsidian Web server

# Create required directories
mkdir -p /home/user/Repository/projects/content-storage/obsidian-vault
mkdir -p /home/user/Repository/projects/obsidian-web/public

# Install required dependencies
cd /home/user/Repository/projects/obsidian-web
npm init -y
npm install express cors gray-matter marked

# Convert notebooks to Obsidian format
echo "Converting notebooks to Obsidian format..."
cd /home/user/Repository
node scripts/convert-notebooks-to-obsidian.js

# Start the Obsidian Web server
echo "Starting Obsidian Web server..."
cd /home/user/Repository/projects/obsidian-web
node server.js