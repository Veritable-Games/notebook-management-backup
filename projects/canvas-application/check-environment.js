#!/usr/bin/env node

/**
 * VG-Canvas Environment Checker
 * 
 * This script helps users check their environment for compatibility
 * and fix common issues.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  bold: '\x1b[1m'
};

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Main function that runs all checks
 */
async function runAllChecks() {
  console.clear();
  console.log(`${colors.blue}${colors.bold}=== VG-Canvas Environment Check v0.0.2 ===\n${colors.reset}`);
  
  try {
    await checkVersion();
    await checkNodeVersion();
    await checkNpmVersion();
    await checkPackageIntegrity();
    await checkSecurityVulnerabilities();
    await checkPortAvailability();
    
    console.log(`\n${colors.green}${colors.bold}✅ All checks complete!${colors.reset}\n`);
    console.log(`${colors.blue}You can now run VG-Canvas with:${colors.reset}`);
    console.log(`${colors.bold}./vg-canvas.js${colors.reset}`);
    console.log(`${colors.blue}or${colors.reset}`);
    console.log(`${colors.bold}node vg-canvas.js${colors.reset}\n`);
    
    rl.close();
  } catch (error) {
    console.error(`\n${colors.red}Error during environment check: ${error.message}${colors.reset}`);
    rl.close();
  }
}

/**
 * Check if Node.js version is compatible
 */
async function checkNodeVersion() {
  console.log(`${colors.blue}Checking Node.js version...${colors.reset}`);
  
  try {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
    
    if (majorVersion < 14) {
      console.log(`${colors.red}❌ Node.js ${nodeVersion} detected. VG-Canvas requires v14 or higher.${colors.reset}`);
      console.log(`${colors.yellow}Please update Node.js: https://nodejs.org/${colors.reset}\n`);
      
      const continueAnyway = await askQuestion("Continue anyway? This may cause issues. (y/n): ");
      if (continueAnyway.toLowerCase() !== 'y') {
        throw new Error('Node.js version check failed');
      }
    } else {
      console.log(`${colors.green}✅ Node.js ${nodeVersion} is compatible${colors.reset}\n`);
    }
  } catch (error) {
    if (!error.message.includes('Node.js version check failed')) {
      console.log(`${colors.red}❌ Could not determine Node.js version${colors.reset}\n`);
    }
    throw error;
  }
}

/**
 * Check if npm version is compatible
 */
async function checkNpmVersion() {
  console.log(`${colors.blue}Checking npm version...${colors.reset}`);
  
  try {
    const npmVersion = execSync('npm --version').toString().trim();
    const majorVersion = parseInt(npmVersion.split('.')[0], 10);
    
    if (majorVersion < 6) {
      console.log(`${colors.red}❌ npm ${npmVersion} detected. VG-Canvas recommends v6 or higher.${colors.reset}`);
      
      const update = await askQuestion("Would you like to update npm? (y/n): ");
      if (update.toLowerCase() === 'y') {
        console.log(`${colors.yellow}Updating npm...${colors.reset}`);
        try {
          execSync('npm install -g npm@latest', { stdio: 'inherit' });
          console.log(`${colors.green}✅ npm updated successfully${colors.reset}\n`);
        } catch (error) {
          console.log(`${colors.red}❌ Failed to update npm. You may need to run as administrator/sudo.${colors.reset}\n`);
          const continueAnyway = await askQuestion("Continue anyway? (y/n): ");
          if (continueAnyway.toLowerCase() !== 'y') {
            throw new Error('npm update rejected');
          }
        }
      } else {
        const continueAnyway = await askQuestion("Continue with the current npm version? This may cause issues. (y/n): ");
        if (continueAnyway.toLowerCase() !== 'y') {
          throw new Error('npm version check failed');
        }
      }
    } else {
      console.log(`${colors.green}✅ npm ${npmVersion} is compatible${colors.reset}\n`);
    }
  } catch (error) {
    if (!error.message.includes('npm version check failed') && !error.message.includes('npm update rejected')) {
      console.log(`${colors.red}❌ Could not determine npm version${colors.reset}\n`);
    }
    throw error;
  }
}

/**
 * Check if all required packages are installed
 */
async function checkPackageIntegrity() {
  console.log(`${colors.blue}Checking package integrity...${colors.reset}`);
  
  try {
    // Read package.json
    const packageJsonPath = path.join(__dirname, 'package.json');
    let packageData;
    
    try {
      packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    } catch (error) {
      console.log(`${colors.red}❌ Could not read package.json: ${error.message}${colors.reset}`);
      throw new Error('Cannot read package.json');
    }
    
    // Check for specific version issues
    const excalidrawVersion = packageData.dependencies['@excalidraw/excalidraw'];
    
    // If using a version with the caret (^), it could update to an incompatible version
    if (excalidrawVersion && excalidrawVersion !== '0.14.2') {
      console.log(`${colors.red}❌ Incompatible @excalidraw/excalidraw version detected: ${excalidrawVersion}${colors.reset}`);
      console.log(`${colors.yellow}VG-Canvas requires exactly version 0.14.2 of @excalidraw/excalidraw${colors.reset}`);
      
      const fixVersion = await askQuestion("Would you like to fix the dependency version? (y/n): ");
      if (fixVersion.toLowerCase() === 'y') {
        console.log(`${colors.yellow}Fixing @excalidraw/excalidraw version...${colors.reset}`);
        packageData.dependencies['@excalidraw/excalidraw'] = '0.14.2';
        packageData.dependencies['react-scripts'] = '5.0.1';
        
        // Write the updated package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));
        
        console.log(`${colors.yellow}Installing correct versions...${colors.reset}`);
        try {
          execSync('npm install', { stdio: 'inherit' });
          console.log(`${colors.green}✅ Dependencies fixed successfully${colors.reset}\n`);
        } catch (error) {
          console.log(`${colors.red}❌ Failed to install fixed dependencies: ${error.message}${colors.reset}\n`);
          throw new Error('Dependency fix failed');
        }
      } else {
        console.log(`${colors.red}Warning: The application may not work with the current dependency versions.${colors.reset}\n`);
      }
    }
    
    // Check if node_modules exists
    if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
      console.log(`${colors.red}❌ node_modules directory not found. Dependencies may not be installed.${colors.reset}`);
      
      const install = await askQuestion("Would you like to install dependencies now? (y/n): ");
      if (install.toLowerCase() === 'y') {
        console.log(`${colors.yellow}Installing dependencies (this may take a few minutes)...${colors.reset}`);
        try {
          execSync('npm install', { stdio: 'inherit' });
          console.log(`${colors.green}✅ Dependencies installed successfully${colors.reset}\n`);
        } catch (error) {
          console.log(`${colors.red}❌ Failed to install dependencies: ${error.message}${colors.reset}\n`);
          throw new Error('Dependency installation failed');
        }
      } else {
        throw new Error('Dependencies not installed');
      }
    } else {
      // Check for key dependencies
      const requiredPackages = [
        '@excalidraw/excalidraw', 
        'react', 
        'socket.io', 
        'express', 
        'cors'
      ];
      
      let missingPackages = [];
      
      for (const pkg of requiredPackages) {
        const pkgPath = path.join(__dirname, 'node_modules', pkg);
        if (!fs.existsSync(pkgPath)) {
          missingPackages.push(pkg);
        }
      }
      
      if (missingPackages.length > 0) {
        console.log(`${colors.red}❌ Some required packages are missing: ${missingPackages.join(', ')}${colors.reset}`);
        
        const reinstall = await askQuestion("Would you like to reinstall dependencies? (y/n): ");
        if (reinstall.toLowerCase() === 'y') {
          console.log(`${colors.yellow}Reinstalling dependencies...${colors.reset}`);
          try {
            execSync('npm install', { stdio: 'inherit' });
            console.log(`${colors.green}✅ Dependencies reinstalled successfully${colors.reset}\n`);
          } catch (error) {
            console.log(`${colors.red}❌ Failed to reinstall dependencies: ${error.message}${colors.reset}\n`);
            throw new Error('Dependency reinstallation failed');
          }
        } else {
          const continueAnyway = await askQuestion("Continue without reinstalling? This will likely cause errors. (y/n): ");
          if (continueAnyway.toLowerCase() !== 'y') {
            throw new Error('Missing dependencies');
          }
        }
      } else {
        console.log(`${colors.green}✅ All required packages are installed${colors.reset}\n`);
      }
    }
  } catch (error) {
    if (!error.message.includes('Dependencies not installed') && 
        !error.message.includes('Missing dependencies')) {
      console.log(`${colors.red}❌ Error checking package integrity: ${error.message}${colors.reset}\n`);
    }
    throw error;
  }
}

/**
 * Check for security vulnerabilities in packages
 */
async function checkSecurityVulnerabilities() {
  console.log(`${colors.blue}Checking for security vulnerabilities...${colors.reset}`);
  
  try {
    console.log(`${colors.yellow}Note: VG-Canvas is designed for local use and utilizes older compatible versions of some packages.${colors.reset}`);
    console.log(`${colors.yellow}Some reported vulnerabilities are expected and don't affect local usage.${colors.reset}`);
    
    // Run npm audit but don't fail if vulnerabilities are found
    const auditOutput = execSync('npm audit --json', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] });
    const auditData = JSON.parse(auditOutput);
    
    if (auditData.vulnerabilities) {
      const vulnerabilityCount = Object.values(auditData.vulnerabilities).length;
      
      if (vulnerabilityCount > 0) {
        const criticalCount = Object.values(auditData.vulnerabilities)
          .filter(v => v.severity === 'critical').length;
          
        if (criticalCount > 0) {
          console.log(`${colors.red}❌ ${vulnerabilityCount} vulnerabilities found (${criticalCount} critical)${colors.reset}`);
          
          console.log(`${colors.yellow}Important: Fixing these might break compatibility with Excalidraw 0.14.2${colors.reset}`);
          const fixVulnerabilities = await askQuestion("Would you like to attempt to fix critical vulnerabilities anyway? (y/n): ");
          if (fixVulnerabilities.toLowerCase() === 'y') {
            console.log(`${colors.yellow}Attempting to fix vulnerabilities...${colors.reset}`);
            try {
              // Only try to fix critical vulnerabilities
              execSync('npm audit fix --only=prod', { stdio: 'inherit' });
              console.log(`${colors.green}✅ Vulnerabilities fixed (where possible)${colors.reset}\n`);
              
              // Check if we need to reinstall excalidraw
              console.log(`${colors.yellow}Checking if Excalidraw version was changed...${colors.reset}`);
              const packageData = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
              if (packageData.dependencies['@excalidraw/excalidraw'] !== '0.14.2') {
                console.log(`${colors.red}⚠️ Excalidraw version changed. Restoring compatible version...${colors.reset}`);
                execSync('npm install @excalidraw/excalidraw@0.14.2 --save-exact', { stdio: 'inherit' });
              }
            } catch (error) {
              console.log(`${colors.red}❌ Some vulnerabilities could not be fixed automatically${colors.reset}`);
              console.log(`${colors.yellow}This is normal and won't affect functionality for local use.${colors.reset}\n`);
            }
          } else {
            console.log(`${colors.yellow}Vulnerabilities not fixed. This is acceptable for local use.${colors.reset}\n`);
          }
        } else {
          console.log(`${colors.yellow}⚠️ ${vulnerabilityCount} vulnerabilities found, but none are critical${colors.reset}`);
          console.log(`${colors.yellow}These are acceptable for local use and fixing them might break compatibility.${colors.reset}\n`);
        }
      } else {
        console.log(`${colors.green}✅ No vulnerabilities found${colors.reset}\n`);
      }
    } else {
      console.log(`${colors.green}✅ No vulnerabilities found${colors.reset}\n`);
    }
  } catch (error) {
    // If npm audit fails to parse output, we'll run a simpler check
    try {
      const simpleAudit = execSync('npm audit').toString();
      
      if (simpleAudit.includes('found 0 vulnerabilities')) {
        console.log(`${colors.green}✅ No vulnerabilities found${colors.reset}\n`);
      } else if (simpleAudit.includes('critical')) {
        console.log(`${colors.red}❌ Critical vulnerabilities found${colors.reset}`);
        console.log(`${colors.yellow}Important: Fixing these might break compatibility with Excalidraw 0.14.2${colors.reset}`);
        
        const fixVulnerabilities = await askQuestion("Would you like to attempt to fix critical vulnerabilities anyway? (y/n): ");
        if (fixVulnerabilities.toLowerCase() === 'y') {
          console.log(`${colors.yellow}Attempting to fix critical vulnerabilities...${colors.reset}`);
          try {
            execSync('npm audit fix --only=prod', { stdio: 'inherit' });
            console.log(`${colors.green}✅ Vulnerabilities fixed (where possible)${colors.reset}\n`);
            
            // Check if we need to reinstall excalidraw
            console.log(`${colors.yellow}Checking if Excalidraw version was changed...${colors.reset}`);
            const packageData = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
            if (packageData.dependencies['@excalidraw/excalidraw'] !== '0.14.2') {
              console.log(`${colors.red}⚠️ Excalidraw version changed. Restoring compatible version...${colors.reset}`);
              execSync('npm install @excalidraw/excalidraw@0.14.2 --save-exact', { stdio: 'inherit' });
            }
          } catch (e) {
            console.log(`${colors.red}❌ Some vulnerabilities could not be fixed automatically${colors.reset}`);
            console.log(`${colors.yellow}This is normal and won't affect functionality for local use.${colors.reset}\n`);
          }
        } else {
          console.log(`${colors.yellow}Vulnerabilities not fixed. This is acceptable for local use.${colors.reset}\n`);
        }
      } else {
        console.log(`${colors.yellow}⚠️ Some vulnerabilities exist, but none are critical${colors.reset}`);
        console.log(`${colors.yellow}These are acceptable for local use and fixing them might break compatibility.${colors.reset}\n`);
      }
    } catch (e) {
      console.log(`${colors.yellow}⚠️ Could not check for vulnerabilities. This is often normal for local use.${colors.reset}\n`);
    }
  }
}

/**
 * Check if required ports are available
 */
async function checkPortAvailability() {
  console.log(`${colors.blue}Checking port availability...${colors.reset}`);
  
  const ports = [3000, 5000];
  let allPortsAvailable = true;
  
  for (const port of ports) {
    try {
      // Try to detect if port is in use
      let portInUse = false;
      
      try {
        if (process.platform === 'win32') {
          const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`).toString();
          portInUse = output.length > 0;
        } else {
          const output = execSync(`lsof -i:${port} -P -n -sTCP:LISTEN`).toString();
          portInUse = output.length > 0;
        }
      } catch (error) {
        // Command failed, port is likely free
        portInUse = false;
      }
      
      if (portInUse) {
        console.log(`${colors.red}❌ Port ${port} is already in use${colors.reset}`);
        allPortsAvailable = false;
        
        if (port === 3000) {
          console.log(`${colors.yellow}⚠️ This will prevent the React app (frontend) from starting${colors.reset}`);
        } else if (port === 5000) {
          console.log(`${colors.yellow}⚠️ This will prevent the collaboration server from starting${colors.reset}`);
        }
      }
    } catch (error) {
      console.log(`${colors.yellow}⚠️ Could not check if port ${port} is available${colors.reset}`);
      allPortsAvailable = false;
    }
  }
  
  if (!allPortsAvailable) {
    console.log(`${colors.yellow}One or more required ports are in use.${colors.reset}`);
    
    const freePorts = await askQuestion("Would you like to attempt to free the ports? (y/n): ");
    if (freePorts.toLowerCase() === 'y') {
      console.log(`${colors.yellow}Attempting to free ports...${colors.reset}`);
      
      for (const port of ports) {
        try {
          if (process.platform === 'win32') {
            const output = execSync(`netstat -ano | findstr :${port} | findstr LISTENING`).toString();
            if (output.length > 0) {
              const pid = output.trim().split(/\s+/).pop();
              if (pid) {
                execSync(`taskkill /F /PID ${pid}`);
                console.log(`${colors.green}✅ Freed port ${port} (PID: ${pid})${colors.reset}`);
              }
            }
          } else {
            const output = execSync(`lsof -i:${port} -P -n -sTCP:LISTEN -t`).toString();
            const pid = output.trim();
            if (pid) {
              execSync(`kill ${pid}`);
              console.log(`${colors.green}✅ Freed port ${port} (PID: ${pid})${colors.reset}`);
            }
          }
        } catch (error) {
          console.log(`${colors.red}❌ Failed to free port ${port}: ${error.message}${colors.reset}`);
        }
      }
    } else {
      const continueAnyway = await askQuestion("Continue anyway? The application may not start correctly. (y/n): ");
      if (continueAnyway.toLowerCase() !== 'y') {
        throw new Error('Required ports are not available');
      }
    }
  } else {
    console.log(`${colors.green}✅ All required ports are available${colors.reset}\n`);
  }
}

/**
 * Utility function to ask a question and get a response
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Check for updates to VG-Canvas
 */
async function checkVersion() {
  console.log(`${colors.blue}Checking VG-Canvas version...${colors.reset}`);
  
  try {
    // Read package.json to get current version
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageData.version;
    
    console.log(`${colors.green}✅ Running VG-Canvas version ${currentVersion}${colors.reset}`);
    console.log(`${colors.blue}Latest version: 0.0.2${colors.reset}\n`);
    
    // Here we would normally check if there's a newer version available
    // For now, we'll just provide instructions for v0.0.2
    
    if (currentVersion !== '0.0.2') {
      console.log(`${colors.yellow}⚠️ You're not running the latest version.${colors.reset}`);
      console.log(`${colors.yellow}To update to the latest version:${colors.reset}`);
      console.log(`${colors.bold}git pull${colors.reset}`);
      console.log(`${colors.bold}npm install${colors.reset}\n`);
      
      const update = await askQuestion("Would you like instructions to update? (y/n): ");
      if (update.toLowerCase() === 'y') {
        console.log(`\n${colors.blue}Update Instructions:${colors.reset}`);
        console.log(`1. ${colors.bold}cd ${__dirname}${colors.reset}`);
        console.log(`2. ${colors.bold}git pull${colors.reset}`);
        console.log(`3. ${colors.bold}npm install${colors.reset}`);
        console.log(`4. ${colors.bold}./check-environment.js${colors.reset}\n`);
      }
    }
  } catch (error) {
    console.log(`${colors.yellow}⚠️ Could not check for updates: ${error.message}${colors.reset}\n`);
  }
}

// Start the checks
runAllChecks();