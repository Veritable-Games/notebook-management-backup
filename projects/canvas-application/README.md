# <span style="color:#6200EA">VG-Canvas</span>

<div align="center">
  <img src="https://img.shields.io/badge/Status-Active-6200EA?style=for-the-badge" alt="Status: Active">
  <img src="https://img.shields.io/badge/Version-0.1.0-black?style=for-the-badge" alt="Version 0.1.0">
  <img src="https://img.shields.io/badge/License-Proprietary-6200EA?style=for-the-badge" alt="License: Proprietary">
</div>

<p align="center">A modern diagramming and collaborative drawing application built with Excalidraw.</p>

<div align="center">
  <img src="https://via.placeholder.com/800x400/6200EA/FFFFFF?text=VG-Canvas" alt="VG-Canvas Screenshot" width="80%">
</div>

## <span style="color:#6200EA">✨ Features</span>

- **Intuitive Drawing Tools**: Create diagrams, sketches, and drawings with a clean interface
- **Real-time Collaboration**: Work together with multiple users simultaneously
- **Room-Based Collaboration**: Create or join rooms to collaborate with specific teams
- **Export Options**: Save your work as PNG or SVG for use in other applications
- **Customization**: Personalize colors, fill styles, and strokes for your diagrams
- **Presentation Mode**: Switch between edit and view modes for presentations
- **Local Storage**: Automatically save your work to continue later

## <span style="color:#6200EA">🚀 Quick Start</span>

### Complete Installation Guide

#### Prerequisites

First, make sure you have these installed on your computer:
- [Node.js and npm](https://nodejs.org/) (Download and run the installer)
- [Git](https://git-scm.com/downloads) (Optional, for installation via Git)

#### Option 1: Download the ZIP file

1. Click the green "Code" button on the [repository page](https://github.com/Veritable-Games/VG-Canvas)
2. Select "Download ZIP"
3. Extract the ZIP file to a location on your computer
4. Open a terminal/command prompt
5. Navigate to the extracted folder:
   ```bash
   cd path/to/extracted/VG-Canvas
   ```

#### Option 2: Clone with Git

If you're familiar with Git:

```bash
# Clone the repository
git clone https://github.com/Veritable-Games/VG-Canvas.git

# Navigate to the project directory
cd VG-Canvas
```

#### Installing Dependencies

Once you have the files on your computer:

```bash
# Install required packages
npm install
```

#### Checking Your Environment (Recommended)

Before running the application, we recommend checking your environment for compatibility:

```bash
# Make the environment checker executable (Linux/macOS)
chmod +x ./check-environment.js

# Run the environment checker
./check-environment.js
# OR
node check-environment.js
```

This will:
- Check if you have compatible versions of Node.js and npm
- Verify all required packages are installed
- Check for security vulnerabilities
- Ensure required ports are available
- Help fix common issues automatically

#### Running the Application

After the environment check is complete:

**For Linux/macOS users:**
```bash
# Make the launcher executable
chmod +x ./vg-canvas.js

# Run the application
./vg-canvas.js
```

**For Windows users:**
```bash
# Open Command Prompt (cmd) or PowerShell
# Navigate to the project directory (if not already there)
# Run with Node.js
node vg-canvas.js
```

**If you encounter any issues:**
```bash
# Alternative method for all platforms
node ./vg-canvas.js
```

#### Choose Your Mode

When the application starts, you'll see a menu:
- Select **Option 1** for Single User Mode
- Select **Option 2** for Collaboration Mode

#### Accessing the Application

After starting, the application will:
1. Automatically launch in your default web browser
2. If it doesn't open automatically, visit: [http://localhost:3000](http://localhost:3000) in your browser

> **Note:** Keep the terminal/command prompt window open while using the application. Closing it will stop the application.

## <span style="color:#6200EA">🤝 Collaboration Guide</span>

### Starting a Collaborative Session

1. Choose option **2** (Collaboration Mode) when starting the app
2. Click the **"Collaborate"** button in the top right corner
3. Enter your name in the dialog box
4. Click **"Create New Room"** to start a new session
5. Share the room ID with others who want to join

### Joining a Collaborative Session

1. Choose option **2** (Collaboration Mode) when starting the app
2. Click the **"Collaborate"** button in the top right corner
3. Enter your name in the dialog box
4. Enter the shared room ID in the "Room ID" field
5. Click **"Join Room"** to connect to the session

### Collaboration Tools

- **User List**: See all users currently in your room
- **Live Cursors**: View where others are working in real-time
- **Shared Canvas**: All changes appear simultaneously for all users
- **Room Link**: Use the "Copy Invite Link" button to share access easily

## <span style="color:#6200EA">🔧 Repository Structure</span>

- `vg-canvas.js` - All-in-one launcher script (**this is all you need!**)
- `src/` - Application source code
- `public/` - Static web assets
- `config/` - Configuration files
- `scripts/` - Utility scripts and legacy code
- `docs/` - Additional documentation
- `logs/` - Server log files

## <span style="color:#6200EA">📋 System Requirements</span>

- **Node.js**: v14+ 
- **npm**: v6+
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Chrome, Firefox, Edge, or Safari (latest versions)
- **Network**: Required for collaboration features

### <span style="color:#6200EA">⚠️ Important Compatibility Notes</span>

VG-Canvas requires specific versions of some dependencies to function properly:

- **Excalidraw**: Version 0.14.2 (exact version required)
- **React Scripts**: Version 5.0.1

Updating these packages may break functionality. Our environment checker will detect and fix version mismatches automatically.

## <span style="color:#6200EA">🔍 Troubleshooting</span>

### Running the Environment Checker

The fastest way to diagnose and fix issues is to run the environment checker:

```bash
./check-environment.js
# OR
node check-environment.js
```

This tool will:
- Find and fix common issues automatically
- Guide you through resolving more complex problems
- Ensure your environment is properly configured

### Common Issues

If you encounter specific problems:

- **Application Won't Start**: 
  - Run the environment checker to verify your setup
  - Check if ports 3000 and 5000 are available

- **Collaboration Not Working**:
  - Check the server log in the `logs` directory
  - Verify your network connection and firewall settings
  - Ensure all users are using the same version of VG-Canvas

- **Dependencies/Packages Issues**:
  - Run `npm install` to reinstall dependencies
  - Use the environment checker to identify missing packages

- **Version Conflicts**:
  - Run `npm install` with a specific version: `npm install @excalidraw/excalidraw@0.14.2`
  - Check for version compatibility in package.json

For detailed troubleshooting information, see `docs/COLLABORATION_TROUBLESHOOTING.md`

## <span style="color:#6200EA">🔒 Privacy & Security</span>

- All drawing data is stored locally in your browser
- Collaboration data is transmitted directly between participants
- No external storage of your drawings without explicit export
- Sessions are isolated by unique room IDs

## <span style="color:#6200EA">📚 License</span>

© 2025 Veritable Games, Corp. All rights reserved.

---

<div align="center">
  <p>Built with <a href="https://github.com/excalidraw/excalidraw">Excalidraw</a></p>
  <p style="color:#6200EA">Veritable Games</p>
</div>