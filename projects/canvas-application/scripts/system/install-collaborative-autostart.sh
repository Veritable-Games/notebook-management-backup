#!/bin/bash

SERVICE_FILE="vg-canvas-collaborative.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_FILE"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run this script as root or with sudo"
  exit 1
fi

# Install service file
echo "Installing VG-Canvas collaborative service to $SERVICE_PATH..."
cp "$SERVICE_FILE" "$SERVICE_PATH"

# Reload systemd daemon
echo "Reloading systemd daemon..."
systemctl daemon-reload

# Enable the service to start on boot
echo "Enabling service to start on boot..."
systemctl enable "$SERVICE_FILE"

# Start the service now
echo "Starting service now..."
systemctl start "$SERVICE_FILE"

echo "Installation complete!"
echo ""
echo "Service management commands:"
echo "  Check service status: sudo systemctl status $SERVICE_FILE"
echo "  Start service: sudo systemctl start $SERVICE_FILE"
echo "  Stop service: sudo systemctl stop $SERVICE_FILE"
echo "  Restart service: sudo systemctl restart $SERVICE_FILE"
echo "  Disable service: sudo systemctl disable $SERVICE_FILE"
echo ""
echo "The application should now be running at http://localhost:3000"