#!/bin/bash

# VG-Canvas Desktop Autostart Installation Script
# This script sets up VG-Canvas to start automatically when you log in to your desktop

# Set script to exit on error
set -e

# Display banner
echo "============================================="
echo "     VG-Canvas Desktop Autostart Setup       "
echo "============================================="

# Create autostart directory if it doesn't exist
AUTOSTART_DIR="$HOME/.config/autostart"
mkdir -p "$AUTOSTART_DIR"

# Create desktop entry file
DESKTOP_FILE="$AUTOSTART_DIR/vg-canvas.desktop"

echo "Creating desktop autostart entry at $DESKTOP_FILE..."

cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Type=Application
Name=VG-Canvas
Comment=Drawing and diagramming application
Exec=/home/user/Repository/Canvas/start-vg-canvas.sh
Terminal=false
X-GNOME-Autostart-enabled=true
EOF

# Make sure the file has the right permissions
chmod 644 "$DESKTOP_FILE"

echo ""
echo "VG-Canvas is now set up to start automatically when you log in."
echo "The application will be available at: http://localhost:3000"
echo ""
echo "To manually start it now, run:"
echo "/home/user/Repository/Canvas/start-vg-canvas.sh"