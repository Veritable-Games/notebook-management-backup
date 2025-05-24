#!/bin/bash

# Start CV-Frontend on alternate port
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

echo "Starting CV-Frontend on port 9003..."

cd /home/user/Repository/WebProjects/Constellation-Viewer/frontend/
node -e "
const express = require('express');
const app = express();
const port = 9003;

// Serve static files from current directory
app.use(express.static('.'));

// Create a simple index.html if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./index.html')) {
  const html = \`
<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>CV Frontend</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { color: #333; }
    .card { background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <h1>Constellation Viewer Frontend</h1>
  <div class='card'>
    <h2>Status: Online</h2>
    <p>The frontend server is running on port 9003</p>
  </div>
  <div class='card'>
    <h2>Backend Connection</h2>
    <p>Attempting to connect to backend...</p>
    <div id='backend-status'>Checking...</div>
  </div>
  <script>
    // Check backend connection
    fetch('http://localhost:3004/api/status')
      .then(response => response.json())
      .then(data => {
        document.getElementById('backend-status').innerHTML = 
          'Backend is online! Status: ' + data.status;
      })
      .catch(error => {
        document.getElementById('backend-status').innerHTML = 
          'Error connecting to backend: ' + error.message;
      });
  </script>
</body>
</html>
  \`;
  fs.writeFileSync('./index.html', html);
}

// Start server
app.listen(port, () => {
  console.log(\`CV-Frontend server running on port \${port}\`);
});
" > "$LOG_DIR/CV-Frontend.log" 2>&1 &

echo $! > "$LOG_DIR/CV-Frontend.pid"

echo "CV-Frontend started with PID $(cat "$LOG_DIR/CV-Frontend.pid")"
echo "Log file: $LOG_DIR/CV-Frontend.log"