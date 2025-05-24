# Windows Setup Guide for VG-Canvas

This guide provides detailed instructions for setting up and running VG-Canvas on Windows systems.

## Prerequisites

1. **Install Node.js**:
   - Download from [nodejs.org](https://nodejs.org/) (LTS version recommended)
   - During installation, ensure "Add to PATH" is checked

2. **Verify installation**:
   - Open Command Prompt (Win+R, type "cmd", press Enter)
   - Run `node -v` and `npm -v` to confirm both are installed

## Installation

1. **Clone or download the repository**:
   - If using Git: `git clone https://github.com/Veritable-Games/VG-Canvas.git`
   - Or download and extract the ZIP file from GitHub

2. **Navigate to the project directory**:
   ```
   cd path\to\VG-Canvas
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

## Running the Application

### Single-User Mode

1. **Start the application**:
   ```
   npm start
   ```

2. **Access the application**:
   - Open your browser to http://localhost:3000

### Collaborative Mode

#### Method 1: Using Two Command Prompts

1. **Start the WebSocket server** (in one Command Prompt):
   ```
   npm run server
   ```

2. **Start the React application** (in another Command Prompt):
   ```
   npm start
   ```

#### Method 2: Using the Batch File

1. **Run the provided batch file**:
   ```
   start-collaborative.bat
   ```
   This will automatically open two Command Prompt windows and start both the server and application.

## Creating Desktop Shortcuts

### For Single-User Mode

1. Right-click on your desktop
2. Select "New > Shortcut"
3. Enter the command:
   ```
   cmd.exe /k "cd /d C:\path\to\VG-Canvas && npm start"
   ```
   (Replace `C:\path\to\VG-Canvas` with your actual path)
4. Click Next
5. Name the shortcut "VG-Canvas" and click Finish
6. Optional: Right-click the shortcut, select Properties, and change the icon

### For Collaborative Mode

1. Right-click on your desktop
2. Select "New > Shortcut"
3. Enter the command:
   ```
   cmd.exe /k "cd /d C:\path\to\VG-Canvas && start-collaborative.bat"
   ```
   (Replace `C:\path\to\VG-Canvas` with your actual path)
4. Click Next
5. Name the shortcut "VG-Canvas Collaborative" and click Finish

## Auto-Start with Windows

1. Press Win+R
2. Type `shell:startup` and press Enter
3. Copy your shortcut(s) into this folder

## Troubleshooting

### Port Already in Use

If you see an error like "Something is already running on port 3000":

1. Find the process:
   ```
   netstat -ano | findstr :3000
   ```

2. Note the PID (Process ID) in the last column

3. Kill the process:
   ```
   taskkill /PID <PID> /F
   ```
   Replace `<PID>` with the actual number

### Network Connectivity Issues

For collaboration features to work properly:

1. Ensure your firewall allows Node.js to access the network
2. If using a corporate network, port 5000 must be open for the WebSocket server
3. For collaborating across different networks, you may need to set up port forwarding on your router

### Missing Dependencies

If you encounter errors about missing modules:

```
npm install --save socket.io socket.io-client uuid cors
```

## Running in Production Mode

For better performance in a production environment:

1. Build the application:
   ```
   npm run build
   ```

2. Install the serve package:
   ```
   npm install -g serve
   ```

3. Serve the production build:
   ```
   serve -s build
   ```

4. In another command prompt, start the WebSocket server:
   ```
   npm run server
   ```

## Further Assistance

If you encounter any issues not covered in this guide, please:

1. Check the project's GitHub Issues page
2. Contact support at support@veritable-games.com