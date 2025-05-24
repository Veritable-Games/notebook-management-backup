#!/bin/bash

# Launch Unified Interface Script
# This script finds an available port and launches the unified interface

echo "Starting unified interface..."

# Define ports to try
PORTS=(9000 9001 9002 9003 9004 9005)

# Create project directories if they don't exist
mkdir -p /home/user/Repository/WebProjects/unified-interface
mkdir -p /home/user/Repository/WebProjects/unified-interface/public

# Find an available port
AVAILABLE_PORT=""
for PORT in "${PORTS[@]}"; do
  # Check if port is in use
  if ! nc -z localhost $PORT &>/dev/null; then
    AVAILABLE_PORT=$PORT
    break
  fi
done

if [ -z "$AVAILABLE_PORT" ]; then
  echo "Error: Could not find an available port. Please free up one of these ports: ${PORTS[*]}"
  exit 1
fi

echo "Found available port: $AVAILABLE_PORT"

# Create a unified entry point
cat > /home/user/Repository/WebProjects/unified-interface/public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Knowledge Constellation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #121212;
            color: #e0e0e0;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        header {
            background-color: #1e1e1e;
            padding: 1rem;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        header h1 {
            font-size: 1.8rem;
            margin: 0;
        }
        .views {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
        }
        .view-card {
            flex: 1;
            background-color: #1e1e1e;
            border-radius: 8px;
            padding: 1.5rem;
            min-height: 200px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            display: flex;
            flex-direction: column;
            transition: transform 0.2s;
        }
        .view-card:hover {
            transform: translateY(-5px);
        }
        .view-card h2 {
            margin-top: 0;
            color: #90caf9;
        }
        .view-card p {
            flex-grow: 1;
        }
        .view-card a {
            display: inline-block;
            background-color: #303030;
            color: #ffffff;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            margin-top: 1rem;
            transition: background-color 0.2s;
        }
        .view-card a:hover {
            background-color: #4285f4;
        }
        .status {
            margin-top: 2rem;
            background-color: #1e1e1e;
            border-radius: 8px;
            padding: 1rem;
        }
        .status-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #333;
        }
        .status-label {
            font-weight: bold;
        }
        .status-value.online {
            color: #81c784;
        }
        .status-value.offline {
            color: #e57373;
        }
    </style>
</head>
<body>
    <header>
        <h1>Knowledge Constellation</h1>
        <div class="user-info">
            Connected to 3 services
        </div>
    </header>

    <div class="container">
        <div class="views">
            <div class="view-card">
                <h2>3D Visualization</h2>
                <p>Explore your content as an interactive 3D constellation. See relationships between pieces of knowledge visually.</p>
                <a href="http://localhost:8081" target="_blank">Launch 3D View</a>
            </div>
            <div class="view-card">
                <h2>Wiki Interface</h2>
                <p>Browse and edit your knowledge wiki with a traditional interface. Create, update, and manage content.</p>
                <a href="http://localhost:3003/enhanced" target="_blank">Launch Wiki</a>
            </div>
            <div class="view-card">
                <h2>Notebook Browser</h2>
                <p>Direct access to your notebook files. Import content from notebooks into your knowledge wiki.</p>
                <a href="http://localhost:3003/simple" target="_blank">Launch Browser</a>
            </div>
        </div>

        <div class="status">
            <h2>Service Status</h2>
            <div class="status-item">
                <span class="status-label">Backend API</span>
                <span class="status-value">Checking...</span>
            </div>
            <div class="status-item">
                <span class="status-label">3D Visualization</span>
                <span class="status-value">Checking...</span>
            </div>
            <div class="status-item">
                <span class="status-label">File Storage</span>
                <span class="status-value">Checking...</span>
            </div>
        </div>
    </div>

    <script>
        // Check service status
        async function checkService(url) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                
                const response = await fetch(url, { 
                    method: 'HEAD',
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                return response.ok;
            } catch (error) {
                return false;
            }
        }

        // Update status display
        async function updateStatus() {
            const services = [
                { name: 'Backend API', url: 'http://localhost:3003', selector: '.status-item:nth-child(1) .status-value' },
                { name: '3D Visualization', url: 'http://localhost:8081', selector: '.status-item:nth-child(2) .status-value' },
                { name: 'File Storage', url: 'http://localhost:8080', selector: '.status-item:nth-child(3) .status-value' }
            ];

            for (const service of services) {
                const statusEl = document.querySelector(service.selector);
                statusEl.textContent = 'Checking...';
                
                const isOnline = await checkService(service.url);
                
                if (isOnline) {
                    statusEl.textContent = \`Online (Port \${new URL(service.url).port})\`;
                    statusEl.className = 'status-value online';
                } else {
                    statusEl.textContent = \`Offline (Port \${new URL(service.url).port})\`;
                    statusEl.className = 'status-value offline';
                }
            }
        }

        // Update on load
        document.addEventListener('DOMContentLoaded', updateStatus);
        // Update every 30 seconds
        setInterval(updateStatus, 30000);
    </script>
</body>
</html>
EOL

# Create a simple server to serve the unified interface
cat > /home/user/Repository/WebProjects/unified-interface/server.js << EOL
const express = require('express');
const app = express();
const port = $AVAILABLE_PORT;

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(\`Unified interface running at http://localhost:\${port}\`);
});
EOL

# Create package.json
cat > /home/user/Repository/WebProjects/unified-interface/package.json << 'EOL'
{
  "name": "unified-interface",
  "version": "1.0.0",
  "description": "Unified interface for Knowledge Constellation",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOL

# Install dependencies
cd /home/user/Repository/WebProjects/unified-interface && npm install

# Start the unified interface
cd /home/user/Repository/WebProjects/unified-interface
node server.js > /home/user/Repository/WebProjects/unified-interface/server.log 2>&1 &

# Save the PID
PID=$!
echo $PID > /home/user/Repository/WebProjects/unified-interface/server.pid

# Wait a moment to make sure the server starts
sleep 2

# Check if server is running
if kill -0 $PID 2>/dev/null; then
  echo "Unified interface started successfully"
  echo "Access it at: http://localhost:$AVAILABLE_PORT"
  echo "This provides a centralized entry point to all services"
  echo ""
  echo "To stop the unified interface, run: kill $PID"
else
  echo "Failed to start the unified interface. Check the logs at:"
  echo "/home/user/Repository/WebProjects/unified-interface/server.log"
fi