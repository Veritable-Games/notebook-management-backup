#!/bin/bash

# Start Wiki System with the new styled interface
echo "Starting Wiki System with Styled Interface..."

# Create notebooks directory if it doesn't exist
if [ ! -d "notebooks" ]; then
  echo "Creating notebooks directory..."
  mkdir -p notebooks
fi

# Create symbolic link to actual notebooks if they exist
if [ -d "/home/user/Notebooks" ] && [ ! -L "notebooks/All of it Anything Everything At Once" ]; then
  echo "Creating symbolic link to actual notebooks..."
  ln -sf "/home/user/Notebooks" "notebooks/All of it Anything Everything At Once"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js to run this application."
  exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo "package.json not found. Creating a minimal package.json..."
  cat > package.json << 'EOF'
{
  "name": "constellation-viewer",
  "version": "1.0.0",
  "description": "Veritable Games Constellation Viewer",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "marked": "^4.0.0"
  }
}
EOF
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the server
echo "Starting server at http://localhost:8081"
echo "Styled Wiki available at http://localhost:8081/basic-styled"

# Check if port 8080 is in use and modify the port in server.js if needed
if netstat -tunlp 2>/dev/null | grep -q ":8080"; then
  echo "Port 8080 is already in use. Modifying server.js to use port 8081..."
  # Make a backup of server.js first
  cp backend/server.js backend/server.js.bak_port
  # Change port from 8080 to 8081
  sed -i 's/const PORT = 8080/const PORT = 8081/g' backend/server.js
  sed -i 's/const port = 8080/const port = 8081/g' backend/server.js
  sed -i 's/\.listen(8080/\.listen(8081/g' backend/server.js
fi

# Check if basic-styled.html exists
if [ ! -f "frontend/basic-styled.html" ]; then
  echo "Error: frontend/basic-styled.html does not exist."
  echo "Please make sure the file exists before running this script."
  exit 1
fi

# Modify backend/server.js to add basic-styled route
if [ -f "backend/server.js" ]; then
  if ! grep -q "/basic-styled" backend/server.js; then
    echo "Adding basic-styled route to server.js..."
    # Make a backup first
    cp backend/server.js backend/server.js.bak4
    # Add route before the '/basic' route
    sed -i '/app.get.*\/basic/i // Styled basic interface - new design\napp.get("\/basic-styled", (req, res) => {\n  res.sendFile(path.join(__dirname, "..\/frontend\/basic-styled.html"));\n});' backend/server.js
  else
    echo "basic-styled route already exists in server.js"
  fi
else
  echo "Error: backend/server.js does not exist."
  echo "Creating a simple server.js file with basic-styled route..."
  mkdir -p backend
  cat > backend/server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const PORT = 8081;

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Styled basic interface - new design
app.get('/basic-styled', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/basic-styled.html'));
});

// Basic interface
app.get('/basic', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/basic.html'));
});

// Default route
app.get('/', (req, res) => {
  res.redirect('/basic-styled');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Basic Wiki available at http://localhost:${PORT}/basic`);
  console.log(`Styled Wiki available at http://localhost:${PORT}/basic-styled`);
});
EOF
fi

# Start the server with a simple configuration
node -e "
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create a simple Express app
const app = express();
const PORT = 8081;

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));

// Setup notebooks directory
const notebooksPath = '/home/user/Notebooks';
console.log('Notebooks directory:', notebooksPath);

// API endpoints
app.get('/api/notebooks', (req, res) => {
  try {
    const directories = fs.readdirSync(notebooksPath)
      .filter(item => fs.statSync(path.join(notebooksPath, item)).isDirectory());
    res.json({ directories });
  } catch (error) {
    console.error('Error reading notebooks directory:', error);
    res.status(500).json({ error: 'Failed to read notebooks directory' });
  }
});

app.get('/api/notebooks/:directory', (req, res) => {
  const directory = req.params.directory;
  const dirPath = path.join(notebooksPath, directory);
  
  try {
    const files = fs.readdirSync(dirPath)
      .filter(item => {
        const itemPath = path.join(dirPath, item);
        return fs.statSync(itemPath).isFile() && (item.endsWith('.txt') || item.endsWith('.md'));
      });
    res.json({ files });
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

app.get('/api/notebooks/:directory/:file', (req, res) => {
  const filePath = path.join(notebooksPath, req.params.directory, req.params.file);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Failed to read file');
  }
});

// Mock wiki pages API
app.get('/api/pages/:page', (req, res) => {
  res.send('# ' + req.params.page + '\n\nThis is a sample wiki page content. API implementation pending.');
});

// Styled basic interface - new design
app.get('/basic-styled', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/basic-styled.html'));
});

// Default route
app.get('/', (req, res) => {
  res.redirect('/basic-styled');
});

// Start server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
  console.log('Styled Wiki Interface: http://localhost:' + PORT + '/basic-styled');
});"