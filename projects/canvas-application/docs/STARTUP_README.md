# VG-Canvas Startup Scripts

This document explains the startup scripts available for VG-Canvas.

## Available Scripts

### 1. Manual Startup

**File:** `start-vg-canvas.sh`

This script lets you manually start the VG-Canvas application.

```bash
# Make it executable (one-time setup)
chmod +x start-vg-canvas.sh

# Run the script
./start-vg-canvas.sh
```

The application will start and be available at http://localhost:3000.

### 2. System Startup (systemd)

**Files:** 
- `vg-canvas.service` - systemd service definition
- `install-autostart.sh` - installation script

This setup makes VG-Canvas start automatically when your system boots, even before anyone logs in.

```bash
# Make the script executable (one-time setup)
chmod +x install-autostart.sh

# Run the installation script with sudo
sudo ./install-autostart.sh
```

After installation, the service will:
- Start automatically on system boot
- Restart automatically if it crashes
- Be accessible at http://localhost:3000

**Managing the service:**
```bash
# Start the service
sudo systemctl start vg-canvas.service

# Stop the service
sudo systemctl stop vg-canvas.service

# Restart the service
sudo systemctl restart vg-canvas.service

# Check status
sudo systemctl status vg-canvas.service

# Disable autostart
sudo systemctl disable vg-canvas.service
```

### 3. Desktop Environment Autostart

**File:** `install-desktop-autostart.sh`

This script sets up VG-Canvas to start automatically when you log in to your desktop environment.

```bash
# Make the script executable (one-time setup)
chmod +x install-desktop-autostart.sh

# Run the installation script
./install-desktop-autostart.sh
```

The script creates a desktop entry in `~/.config/autostart/` that starts VG-Canvas when you log in to your desktop environment.

## Troubleshooting

If you encounter issues with the scripts:

1. Make sure all scripts are executable:
   ```bash
   chmod +x start-vg-canvas.sh install-autostart.sh install-desktop-autostart.sh
   ```

2. Check if Node.js and npm are properly installed:
   ```bash
   node --version
   npm --version
   ```

3. For system service issues, check the logs:
   ```bash
   sudo journalctl -u vg-canvas.service
   ```