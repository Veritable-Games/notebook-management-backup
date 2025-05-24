#!/usr/bin/env node

/**
 * Service Manager
 * 
 * A central utility for managing all Veritable Games services
 * - Handles service dependencies
 * - Manages startup and shutdown sequence
 * - Provides health checks
 * - Handles logging
 */

const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');
const http = require('http');
const https = require('https');

// Import centralized configuration
const configModule = require('../config');
const { paths } = configModule;

// Constants
const REPO_ROOT = paths.root;
const LOGS_DIR = paths.logs;
const PIDS_DIR = paths.pids;

// Ensure directories exist
[LOGS_DIR, PIDS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Read configuration
let config;
try {
  config = configModule.loadServicesConfig();
} catch (error) {
  console.error(`Failed to load configuration: ${error.message}`);
  process.exit(1);
}

// Parse command line arguments
const argv = process.argv.slice(2);
const command = argv[0];
const serviceNames = argv.slice(1);

// Utility functions
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  console.log(logMessage);
  
  // Log to service manager log file
  try {
    const logFile = path.join(LOGS_DIR, 'service-manager.log');
    fs.appendFileSync(logFile, logMessage + '\n');
  } catch (error) {
    console.error(`Failed to write to log file: ${error.message}`);
  }
}

function getServicePidFile(serviceName) {
  return path.join(PIDS_DIR, `${serviceName}.pid`);
}

function writePid(serviceName, pid) {
  const pidFile = getServicePidFile(serviceName);
  try {
    fs.writeFileSync(pidFile, pid.toString());
    log(`PID ${pid} written to ${pidFile}`, 'debug');
    return true;
  } catch (error) {
    log(`Failed to write PID file for ${serviceName}: ${error.message}`, 'error');
    return false;
  }
}

function readPid(serviceName) {
  const pidFile = getServicePidFile(serviceName);
  try {
    if (fs.existsSync(pidFile)) {
      const pid = fs.readFileSync(pidFile, 'utf8').trim();
      return parseInt(pid, 10);
    }
  } catch (error) {
    log(`Failed to read PID file for ${serviceName}: ${error.message}`, 'error');
  }
  return null;
}

function deletePid(serviceName) {
  const pidFile = getServicePidFile(serviceName);
  try {
    if (fs.existsSync(pidFile)) {
      fs.unlinkSync(pidFile);
      log(`Removed PID file for ${serviceName}`, 'debug');
    }
  } catch (error) {
    log(`Failed to delete PID file for ${serviceName}: ${error.message}`, 'error');
  }
}

async function isProcessRunning(pid) {
  return new Promise(resolve => {
    if (!pid) {
      resolve(false);
      return;
    }
    
    exec(`ps -p ${pid}`, (error) => {
      resolve(!error);
    });
  });
}

async function isServiceRunning(serviceName) {
  const pid = readPid(serviceName);
  if (!pid) return false;
  return isProcessRunning(pid);
}

async function checkHealth(serviceName) {
  const service = config.services[serviceName];
  if (!service) {
    log(`Service ${serviceName} not found in configuration`, 'error');
    return false;
  }
  
  if (!service.healthCheck || !service.healthCheck.path) {
    log(`Health check not configured for ${serviceName}`, 'warn');
    return true; // Assume healthy if no health check configured
  }
  
  return new Promise(resolve => {
    const port = service.port || 8080;
    const timeout = service.healthCheck.timeout || 5;
    const path = service.healthCheck.path;
    const url = `http://localhost:${port}${path}`;
    
    log(`Checking health for ${serviceName} at ${url}`, 'debug');
    
    const request = http.get(url, { timeout: timeout * 1000 }, (res) => {
      const statusCode = res.statusCode;
      resolve(statusCode >= 200 && statusCode < 400);
    });
    
    request.on('error', (error) => {
      log(`Health check failed for ${serviceName}: ${error.message}`, 'debug');
      resolve(false);
    });
    
    request.on('timeout', () => {
      request.destroy();
      log(`Health check timed out for ${serviceName}`, 'debug');
      resolve(false);
    });
  });
}

// Service management functions
async function startService(serviceName) {
  const service = config.services[serviceName];
  if (!service) {
    log(`Service ${serviceName} not found in configuration`, 'error');
    return false;
  }
  
  // Check if already running
  if (await isServiceRunning(serviceName)) {
    const pid = readPid(serviceName);
    log(`Service ${serviceName} is already running (PID: ${pid})`);
    return true;
  }
  
  // Check dependencies
  if (service.dependencies && service.dependencies.length > 0) {
    log(`Checking dependencies for ${serviceName}: ${service.dependencies.join(', ')}`, 'debug');
    
    for (const dep of service.dependencies) {
      if (!(await isServiceRunning(dep))) {
        log(`Dependency ${dep} is not running, starting it...`);
        const success = await startService(dep);
        if (!success) {
          log(`Failed to start dependency ${dep} for ${serviceName}`, 'error');
          return false;
        }
      }
      
      // Check health of dependency
      if (!(await checkHealth(dep))) {
        log(`Dependency ${dep} is not healthy for ${serviceName}`, 'error');
        return false;
      }
    }
  }
  
  // Start the service
  log(`Starting service ${serviceName}...`);
  
  const directory = service.directory;
  const command = service.command;
  const env = { ...process.env, ...service.env };
  const logFile = path.join(LOGS_DIR, `${serviceName}.log`);
  
  try {
    // Special case for Constellation Viewer that uses a custom start script
    if (serviceName === 'CV-Backend' && fs.existsSync(path.join(directory, 'start-wiki.sh'))) {
      log(`Using custom start script for ${serviceName}`);
      
      // Execute the start script
      const startScript = spawn('bash', ['start-wiki.sh'], {
        cwd: directory,
        env,
        detached: true,
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      // Capture output for logging
      startScript.stdout.on('data', (data) => {
        fs.appendFileSync(logFile, data);
      });
      
      startScript.stderr.on('data', (data) => {
        fs.appendFileSync(logFile, data);
      });
      
      // Detach and continue
      startScript.unref();
      
      // Wait for the script to create its PID file
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Try to read PID from script's output file
      const serverPidPath = path.join(directory, 'backend', 'server.pid');
      if (fs.existsSync(serverPidPath)) {
        const pid = parseInt(fs.readFileSync(serverPidPath, 'utf8').trim(), 10);
        writePid(serviceName, pid);
        log(`Service ${serviceName} started with PID ${pid}`);
        return true;
      } else {
        log(`Failed to get PID for ${serviceName} from custom start script`, 'error');
        return false;
      }
    } else {
      // Normal service startup
      const [cmd, ...args] = command.split(' ');
      const child = spawn(cmd, args, {
        cwd: directory,
        env,
        detached: true,
        stdio: ['ignore', fs.openSync(logFile, 'a'), fs.openSync(logFile, 'a')]
      });
      
      // Store PID
      const pid = child.pid;
      writePid(serviceName, pid);
      
      // Detach and continue
      child.unref();
      
      log(`Service ${serviceName} started with PID ${pid}`);
      
      // Wait a bit for service to initialize
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Health check
      const isHealthy = await checkHealth(serviceName);
      if (!isHealthy) {
        log(`Service ${serviceName} started but health check failed`, 'warn');
      }
      
      return true;
    }
  } catch (error) {
    log(`Failed to start service ${serviceName}: ${error.message}`, 'error');
    return false;
  }
}

async function stopService(serviceName) {
  const pid = readPid(serviceName);
  if (!pid) {
    log(`Service ${serviceName} is not running or PID file is missing`);
    return true;
  }
  
  const service = config.services[serviceName];
  if (!service) {
    log(`Service ${serviceName} not found in configuration, but found PID ${pid}`, 'warn');
    // Try to kill the process anyway
  }
  
  // Special case for Constellation Viewer that uses a custom stop script
  if (serviceName === 'CV-Backend' && 
      service && 
      fs.existsSync(path.join(service.directory, 'stop-wiki.sh'))) {
    
    log(`Using custom stop script for ${serviceName}`);
    
    return new Promise(resolve => {
      exec(`cd ${service.directory} && ./stop-wiki.sh`, (error) => {
        if (error) {
          log(`Error executing stop script for ${serviceName}: ${error.message}`, 'error');
          resolve(false);
        } else {
          deletePid(serviceName);
          log(`Service ${serviceName} stopped using custom script`);
          resolve(true);
        }
      });
    });
  } else {
    // Normal service shutdown
    log(`Stopping service ${serviceName} with PID ${pid}...`);
    
    return new Promise(resolve => {
      // First try SIGTERM for graceful shutdown
      process.kill(pid, 'SIGTERM');
      
      // Check if process is still running after a timeout
      setTimeout(async () => {
        if (await isProcessRunning(pid)) {
          log(`Service ${serviceName} did not stop gracefully, sending SIGKILL`, 'warn');
          try {
            process.kill(pid, 'SIGKILL');
          } catch (error) {
            // Process might have exited between our check and kill
          }
        }
        
        // Final check
        setTimeout(async () => {
          const isRunning = await isProcessRunning(pid);
          if (isRunning) {
            log(`Failed to stop service ${serviceName} with PID ${pid}`, 'error');
            resolve(false);
          } else {
            deletePid(serviceName);
            log(`Service ${serviceName} stopped successfully`);
            resolve(true);
          }
        }, 1000);
      }, 3000); // Give it 3 seconds to shut down gracefully
    });
  }
}

async function restartService(serviceName) {
  log(`Restarting service ${serviceName}...`);
  const stopped = await stopService(serviceName);
  if (!stopped) {
    log(`Failed to stop service ${serviceName}, cannot restart`, 'error');
    return false;
  }
  
  // Wait a bit before starting
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return startService(serviceName);
}

async function statusService(serviceName) {
  const service = config.services[serviceName];
  if (!service) {
    log(`Service ${serviceName} not found in configuration`, 'error');
    return false;
  }
  
  const pid = readPid(serviceName);
  const isRunning = await isServiceRunning(serviceName);
  const isHealthy = isRunning ? await checkHealth(serviceName) : false;
  
  let status = isRunning ? 'Running' : 'Stopped';
  if (isRunning && !isHealthy) {
    status = 'Running (Unhealthy)';
  }
  
  log(`${serviceName}: ${status}${pid ? ' (PID: ' + pid + ')' : ''} - ${service.name}`);
  
  return { name: serviceName, status, pid, healthy: isHealthy };
}

// Command handlers
async function startAll() {
  log('Starting all services...');
  
  // Get all service names, sorted by dependencies
  const serviceNames = Object.keys(config.services);
  
  // Create a dependency graph
  const graph = {};
  serviceNames.forEach(name => {
    graph[name] = {
      name,
      dependencies: config.services[name].dependencies || [],
      visited: false
    };
  });
  
  // Topological sort to respect dependencies
  const sortedServices = [];
  
  function visit(name) {
    if (!graph[name]) return;
    
    const node = graph[name];
    if (node.visited) return;
    
    node.visited = true;
    
    (node.dependencies || []).forEach(dep => {
      if (graph[dep]) visit(dep);
    });
    
    sortedServices.push(name);
  }
  
  // Start visit from each node
  serviceNames.forEach(name => {
    if (!graph[name].visited) visit(name);
  });
  
  // Start services in order
  for (const name of sortedServices) {
    await startService(name);
  }
  
  log('All services started');
}

async function stopAll() {
  log('Stopping all services...');
  
  // Get all service names, sorted by reverse dependencies
  const serviceNames = Object.keys(config.services);
  
  // Create a dependency graph with reverse edges
  const graph = {};
  serviceNames.forEach(name => {
    graph[name] = {
      name,
      dependents: [],
      visited: false
    };
  });
  
  // Add reverse edges
  serviceNames.forEach(name => {
    const dependencies = config.services[name].dependencies || [];
    dependencies.forEach(dep => {
      if (graph[dep]) {
        graph[dep].dependents.push(name);
      }
    });
  });
  
  // Topological sort on reverse graph
  const sortedServices = [];
  
  function visit(name) {
    if (!graph[name]) return;
    
    const node = graph[name];
    if (node.visited) return;
    
    node.visited = true;
    
    (node.dependents || []).forEach(dep => {
      if (graph[dep]) visit(dep);
    });
    
    sortedServices.push(name);
  }
  
  // Start visit from each node
  serviceNames.forEach(name => {
    if (!graph[name].visited) visit(name);
  });
  
  // Stop services in order
  for (const name of sortedServices) {
    await stopService(name);
  }
  
  log('All services stopped');
}

async function restartAll() {
  await stopAll();
  await startAll();
}

async function statusAll() {
  log('Status of all services:');
  
  const serviceNames = Object.keys(config.services);
  const statuses = [];
  
  for (const name of serviceNames) {
    const status = await statusService(name);
    statuses.push(status);
  }
  
  // Print a summary table
  const running = statuses.filter(s => s.status === 'Running').length;
  const unhealthy = statuses.filter(s => s.status === 'Running (Unhealthy)').length;
  const stopped = statuses.filter(s => s.status === 'Stopped').length;
  
  log(`Summary: ${running} running, ${unhealthy} unhealthy, ${stopped} stopped`);
  
  return statuses;
}

// Main function
async function main() {
  if (!command) {
    console.log(`
Usage: node service-manager.js <command> [services...]

Commands:
  start   [service...]  Start services (all if none specified)
  stop    [service...]  Stop services (all if none specified)
  restart [service...]  Restart services (all if none specified)
  status  [service...]  Show service status (all if none specified)

Examples:
  node service-manager.js start               # Start all services
  node service-manager.js start CV-Backend    # Start Constellation Viewer Backend
  node service-manager.js stop                # Stop all services
  node service-manager.js restart CV-Backend  # Restart Constellation Viewer Backend
  node service-manager.js status              # Show status of all services
    `);
    process.exit(0);
  }
  
  switch (command) {
    case 'start':
      if (serviceNames.length === 0) {
        await startAll();
      } else {
        for (const name of serviceNames) {
          await startService(name);
        }
      }
      break;
      
    case 'stop':
      if (serviceNames.length === 0) {
        await stopAll();
      } else {
        for (const name of serviceNames) {
          await stopService(name);
        }
      }
      break;
      
    case 'restart':
      if (serviceNames.length === 0) {
        await restartAll();
      } else {
        for (const name of serviceNames) {
          await restartService(name);
        }
      }
      break;
      
    case 'status':
      if (serviceNames.length === 0) {
        await statusAll();
      } else {
        for (const name of serviceNames) {
          await statusService(name);
        }
      }
      break;
      
    default:
      console.error(`Unknown command: ${command}`);
      process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  log(`Unhandled error: ${error.message}`, 'error');
  console.error(error);
  process.exit(1);
});