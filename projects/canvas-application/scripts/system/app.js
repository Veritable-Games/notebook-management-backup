#!/usr/bin/env node

/**
 * VG-Canvas Unified Launcher
 * This script provides a simple way to launch VG-Canvas in either
 * single-user or collaboration mode.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const readline = require('readline');
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

// Clear console and print header
console.clear();
console.log(`${colors.green}=== VG-Canvas Launcher ===${colors.reset}`);
console.log('');
console.log('Select mode:');
console.log('1. Single User Mode');
console.log('2. Collaboration Mode');
console.log('');

// Function to check if a port is in use
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

// Function to attempt to free a port
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

// Function to start the app in single user mode
function startSingleUserMode() {
  console.log(`${colors.green}Starting VG-Canvas in single user mode...${colors.reset}`);
  
  const npm = isWindows ? 'npm.cmd' : 'npm';
  const startProcess = spawn(npm, ['start'], { stdio: 'inherit' });
  
  startProcess.on('close', (code) => {
    console.log(`${colors.yellow}VG-Canvas has been closed. (Exit code: ${code})${colors.reset}`);
    process.exit(0);
  });
}

// Function to start the app in collaboration mode
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

// Function to actually launch the collaboration mode
function launchCollaborationMode() {
  // Clear any existing log
  try {
    fs.writeFileSync(serverLogPath, '');
  } catch (e) {
    // Ignore errors if file doesn't exist
  }
  
  // Start the server
  console.log(`${colors.green}Starting collaboration server...${colors.reset}`);
  const serverProcess = spawn('node', ['server.js'], {
    stdio: ['ignore', fs.openSync(serverLogPath, 'a'), fs.openSync(serverLogPath, 'a')]
  });
  
  // Wait for server to start
  console.log('Waiting for server to initialize...');
  setTimeout(() => {
    // Check if server started successfully
    if (!isPortInUse(5000)) {
      console.log(`${colors.red}Error: WebSocket server failed to start. Check server.log for details.${colors.reset}`);
      rl.close();
      process.exit(1);
    }
    
    console.log(`${colors.green}WebSocket server running on port 5000${colors.reset}`);
    console.log('You can view server logs in server.log');
    
    // Start the React app
    console.log(`${colors.green}Starting the React application...${colors.reset}`);
    console.log(`${colors.yellow}Important: When the app loads, click 'Collaborate' button in the top right.${colors.reset}`);
    
    const npm = isWindows ? 'npm.cmd' : 'npm';
    const startProcess = spawn(npm, ['start'], { stdio: 'inherit' });
    
    // Handle exit
    startProcess.on('close', (code) => {
      console.log(`${colors.yellow}Shutting down WebSocket server...${colors.reset}`);
      serverProcess.kill();
      console.log(`${colors.green}VG-Canvas has been shut down.${colors.reset}`);
      rl.close();
      process.exit(0);
    });
  }, 2000);
}

// Handle user selection
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