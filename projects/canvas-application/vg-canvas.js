#!/usr/bin/env node

/**
 * VG-Canvas All-In-One Tool
 * 
 * This single file handles:
 * 1. Application launcher (single-user and collaboration modes)
 * 2. Collaboration server (WebSocket implementation)
 * 3. Error handling and port management
 * 
 * Usage: ./vg-canvas.js
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const readline = require('readline');

// Platform detection
const isWindows = process.platform === 'win32';
const serverLogPath = path.join(__dirname, 'server.log');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

//=========================================
// COLLABORATION SERVER IMPLEMENTATION
//=========================================

/**
 * Creates and configures a WebSocket server for collaboration
 * @returns {http.Server} The HTTP server instance
 */
function createCollaborationServer() {
  const express = require('express');
  const http = require('http');
  const { Server } = require('socket.io');
  const cors = require('cors');
  const path = require('path');

  const app = express();
  app.use(cors());

  // Serve static files from the build directory in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
  }

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Store rooms and their participants
  const rooms = {};

  io.on('connection', (socket) => {
    logToServer(`User connected: ${socket.id}`);

    // Handle room creation or joining
    socket.on('join-room', (roomId, username) => {
      logToServer(`${username} joined room ${roomId}`);
      
      // Create room if it doesn't exist
      if (!rooms[roomId]) {
        rooms[roomId] = { users: {} };
      }
      
      // Add user to room
      rooms[roomId].users[socket.id] = { 
        username,
        socketId: socket.id 
      };
      
      // Join socket.io room
      socket.join(roomId);
      
      // Broadcast to others in the room
      socket.to(roomId).emit('user-joined', {
        username,
        socketId: socket.id
      });
      
      // Send room info to the new user
      socket.emit('room-info', {
        roomId,
        users: rooms[roomId].users
      });
      
      logToServer(`Room ${roomId} has ${Object.keys(rooms[roomId].users).length} users`);
    });

    // Handle scene updates
    socket.on('scene-update', (roomId, sceneData) => {
      socket.to(roomId).emit('scene-update', {
        socketId: socket.id,
        sceneData
      });
    });

    // Handle pointer updates
    socket.on('pointer-update', (roomId, pointerData) => {
      socket.to(roomId).emit('pointer-update', {
        socketId: socket.id,
        pointerData
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logToServer(`User disconnected: ${socket.id}`);
      // Remove user from all rooms they were in
      Object.keys(rooms).forEach(roomId => {
        if (rooms[roomId].users[socket.id]) {
          // Inform others in the room
          socket.to(roomId).emit('user-left', socket.id);
          // Remove user from room
          delete rooms[roomId].users[socket.id];
          // Check if room is empty
          if (Object.keys(rooms[roomId].users).length === 0) {
            delete rooms[roomId];
            logToServer(`Room ${roomId} deleted (empty)`);
          } else {
            logToServer(`Room ${roomId} has ${Object.keys(rooms[roomId].users).length} users left`);
          }
        }
      });
    });
  });

  return server;
}

//=========================================
// UTILITY FUNCTIONS
//=========================================

/**
 * Check if a port is in use
 * @param {number} port - The port to check
 * @returns {boolean} - True if port is in use, false otherwise
 */
function isPortInUse(port) {
  try {
    if (isWindows) {
      const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`).toString();
      return output.length > 0;
    } else {
      const output = execSync(`lsof -i:${port} -P -n -sTCP:LISTEN`).toString();
      return output.length > 0;
    }
  } catch (e) {
    // If the command fails, it usually means the port is free
    return false;
  }
}

/**
 * Attempt to free a port that's in use
 * @param {number} port - The port to free
 * @returns {boolean} - True if successful, false otherwise
 */
function freePort(port) {
  try {
    if (isWindows) {
      const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`).toString();
      const pid = output.trim().split(/\s+/).pop();
      if (pid) {
        execSync(`taskkill /F /PID ${pid}`);
        console.log(`${colors.yellow}Freed port ${port} (PID: ${pid})${colors.reset}`);
      }
    } else {
      const output = execSync(`lsof -i:${port} -P -n -sTCP:LISTEN -t`).toString();
      const pid = output.trim();
      if (pid) {
        execSync(`kill ${pid}`);
        console.log(`${colors.yellow}Freed port ${port} (PID: ${pid})${colors.reset}`);
      }
    }
    return true;
  } catch (e) {
    console.error(`${colors.red}Failed to free port ${port}: ${e.message}${colors.reset}`);
    return false;
  }
}

/**
 * Write a log message to the server log file
 * @param {string} message - The message to log
 */
function logToServer(message) {
  try {
    fs.appendFileSync(serverLogPath, `${new Date().toISOString()} - ${message}\n`);
  } catch (e) {
    // If we can't write to the log, just ignore
  }
}

//=========================================
// APPLICATION MODES
//=========================================

/**
 * Start the app in single user mode
 */
function startSingleUserMode() {
  console.log(`${colors.green}Starting VG-Canvas in single user mode...${colors.reset}`);
  
  const npm = isWindows ? 'npm.cmd' : 'npm';
  const startProcess = spawn(npm, ['start'], { stdio: 'inherit' });
  
  startProcess.on('close', (code) => {
    console.log(`${colors.yellow}VG-Canvas has been closed. (Exit code: ${code})${colors.reset}`);
    process.exit(0);
  });
}

/**
 * Start the app in collaboration mode
 */
function startCollaborationMode() {
  console.log(`${colors.green}Starting VG-Canvas in collaboration mode...${colors.reset}`);
  
  const ports = [3000, 5000];
  let portConflicts = false;
  
  // Check if ports are available
  ports.forEach(port => {
    if (isPortInUse(port)) {
      console.log(`${colors.red}Port ${port} is already in use.${colors.reset}`);
      portConflicts = true;
    }
  });
  
  if (portConflicts) {
    rl.question(`${colors.yellow}Would you like to attempt to free these ports? (y/n) ${colors.reset}`, (answer) => {
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        ports.forEach(port => freePort(port));
        setTimeout(() => launchCollaborationMode(), 1000);
      } else {
        console.log(`${colors.red}Cannot start VG-Canvas without required ports. Exiting.${colors.reset}`);
        rl.close();
        process.exit(1);
      }
    });
  } else {
    launchCollaborationMode();
  }
}

/**
 * Launch the collaboration mode with server and client
 */
function launchCollaborationMode() {
  // Clear any existing log
  try {
    fs.writeFileSync(serverLogPath, '');
  } catch (e) {
    // Ignore errors if file doesn't exist
  }
  
  // Start the server
  console.log(`${colors.green}Starting collaboration server...${colors.reset}`);
  
  // Create and start the collaboration server
  const server = createCollaborationServer();
  const PORT = 5000;
  
  server.listen(PORT, () => {
    logToServer(`Server running on port ${PORT}`);
    console.log(`${colors.green}WebSocket server running on port ${PORT}${colors.reset}`);
    console.log('You can view server logs in server.log');
    
    // Start the React app
    console.log(`${colors.green}Starting the React application...${colors.reset}`);
    console.log(`${colors.yellow}Important: When the app loads, click 'Collaborate' button in the top right.${colors.reset}`);
    
    const npm = isWindows ? 'npm.cmd' : 'npm';
    const startProcess = spawn(npm, ['start'], { stdio: 'inherit' });
    
    // Handle exit
    startProcess.on('close', (code) => {
      console.log(`${colors.yellow}Shutting down WebSocket server...${colors.reset}`);
      server.close();
      console.log(`${colors.green}VG-Canvas has been shut down.${colors.reset}`);
      rl.close();
      process.exit(0);
    });
  });
}

//=========================================
// MAIN APPLICATION FLOW
//=========================================

// Check if this is likely the first run
const isLikelyFirstRun = (() => {
  try {
    // Check if server.log exists and has content
    const logExists = fs.existsSync(path.join(__dirname, 'logs', 'server.log'));
    // Check if .vg-canvas-history exists
    const historyExists = fs.existsSync(path.join(__dirname, '.vg-canvas-history'));
    
    return !logExists && !historyExists;
  } catch (e) {
    return true; // Assume first run if we can't determine
  }
})();

// Create history marker
try {
  const historyDir = path.join(__dirname, '.vg-canvas-history');
  if (!fs.existsSync(historyDir)) {
    fs.writeFileSync(historyDir, new Date().toISOString());
  }
} catch (e) {
  // Ignore errors creating history marker
}

// Clear console and print header
console.clear();
console.log(`${colors.green}=== VG-Canvas Launcher ===${colors.reset}`);

// Suggest environment check if this is the first run
if (isLikelyFirstRun) {
  console.log('');
  console.log(`${colors.yellow}It looks like this might be your first time running VG-Canvas.${colors.reset}`);
  console.log(`${colors.yellow}It's recommended to run the environment checker first:${colors.reset}`);
  console.log('');
  console.log(`${colors.bold}./check-environment.js${colors.reset}  or  ${colors.bold}node check-environment.js${colors.reset}`);
  console.log('');
  rl.question(`Would you like to run the environment checker now? (y/n): `, (answer) => {
    if (answer.toLowerCase() === 'y') {
      // Run the environment checker
      rl.close();
      const checker = spawn(process.execPath, [path.join(__dirname, 'check-environment.js')], { 
        stdio: 'inherit'
      });
      checker.on('exit', (code) => {
        if (code === 0) {
          // After successful check, restart this script
          const current = spawn(process.execPath, [__filename], { 
            stdio: 'inherit'
          });
        }
      });
      return;
    } else {
      // Continue with normal startup
      console.log('');
      console.log('Select mode:');
      console.log('1. Single User Mode');
      console.log('2. Collaboration Mode');
      console.log('');
      
      // Continue with user selection
      handleModeSelection();
    }
  });
} else {
  // Normal startup for returning users
  console.log('');
  console.log('Select mode:');
  console.log('1. Single User Mode');
  console.log('2. Collaboration Mode');
  console.log('');
  
  // Continue with user selection
  handleModeSelection();
}

// Function to handle mode selection
function handleModeSelection() {
  rl.question('Enter choice (1 or 2): ', (answer) => {
    if (answer === '1') {
      startSingleUserMode();
    } else if (answer === '2') {
      startCollaborationMode();
    } else {
      console.log(`${colors.red}Invalid choice${colors.reset}`);
      rl.close();
      process.exit(1);
    }
  });
}