#!/bin/bash

# Path to the .desktop file 
DESKTOP_FILE_PATH="$HOME/.config/autostart/vg-canvas-collaborative.desktop"

# Create the autostart directory if it doesn't exist
mkdir -p "$HOME/.config/autostart"

# Get the absolute path to the repository
REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Create the .desktop file
cat > "$DESKTOP_FILE_PATH" << EOL
[Desktop Entry]
Type=Application
Name=VG-Canvas Collaborative
Comment=Start VG-Canvas with collaboration features on login
Exec=$REPO_PATH/start-collaborative-vg-canvas.sh
Terminal=false
X-GNOME-Autostart-enabled=true
EOL

# Make it executable
chmod +x "$DESKTOP_FILE_PATH"

echo "Desktop autostart created at $DESKTOP_FILE_PATH"
echo "VG-Canvas with collaboration will start automatically when you log in to your desktop environment"