#!/bin/bash

# Start CV-Backend on alternate port
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

# Use port 3004 instead of 3003 which seems to be in use
export PORT=3004
echo "Starting CV-Backend on port 3004..."

cd /home/user/Repository/WebProjects/Constellation-Viewer/backend/
node -e "
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API routes
app.get('/api', (req, res) => {
  res.json({ message: 'CV-Backend API is working!' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', service: 'CV-Backend' });
});

// Start server
app.listen(port, () => {
  console.log(\`CV-Backend API server running on port \${port}\`);
});
" > "$LOG_DIR/CV-Backend.log" 2>&1 &

echo $! > "$LOG_DIR/CV-Backend.pid"

echo "CV-Backend started with PID $(cat "$LOG_DIR/CV-Backend.pid")"
echo "Log file: $LOG_DIR/CV-Backend.log"