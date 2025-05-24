/**
 * Wiki Server Index - Launcher for the server.js file
 */
const path = require('path');
const { execFile } = require('child_process');

console.log('Starting wiki server...');

// Path to the actual server.js file in parent directory
const serverPath = path.join(__dirname, '..', 'server.js');

console.log(`Server path: ${serverPath}`);

// Launch the server.js file as a child process
const child = execFile('node', [serverPath], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});

// Forward console output from child process
child.stdout.on('data', (data) => {
  console.log(`${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`${data}`);
});

// Keep the process running
process.stdin.resume();

console.log('Wiki server started in background');
