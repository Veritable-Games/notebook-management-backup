#!/bin/bash

# VG-Canvas Autostart Installation Script
# This script sets up VG-Canvas to start automatically on system boot

# Set script to exit on error
set -e

# Display banner
echo "============================================="
echo "      VG-Canvas Autostart Installation       "
echo "============================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "This script needs to be run with sudo or as root."
  echo "Please run: sudo $0"
  exit 1
fi

# Install the service file
SERVICE_FILE="/home/user/Repository/Canvas/vg-canvas.service"
TARGET_PATH="/etc/systemd/system/vg-canvas.service"

echo "Installing service file to $TARGET_PATH..."
cp "$SERVICE_FILE" "$TARGET_PATH"
chown root:root "$TARGET_PATH"
chmod 644 "$TARGET_PATH"

# Reload systemd to recognize the new service
echo "Reloading systemd..."
systemctl daemon-reload

# Enable the service to start on boot
echo "Enabling VG-Canvas service to start on boot..."
systemctl enable vg-canvas.service

# Start the service
echo "Starting VG-Canvas service..."
systemctl start vg-canvas.service

# Check status
echo "Service status:"
systemctl status vg-canvas.service

echo ""
echo "VG-Canvas is now set up to start automatically on system boot!"
echo "You can manually control the service with these commands:"
echo "  sudo systemctl start vg-canvas.service   # Start the service"
echo "  sudo systemctl stop vg-canvas.service    # Stop the service"
echo "  sudo systemctl restart vg-canvas.service # Restart the service"
echo "  sudo systemctl status vg-canvas.service  # Check service status"
echo ""
echo "The application will be available at: http://localhost:3000"