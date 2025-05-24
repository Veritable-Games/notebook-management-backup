#!/bin/bash

# Enhance Unified Interface Script
# This script improves the existing unified interface at port 9001
# without replacing it, adding better integration with existing tools

echo "==========================================================="
echo "ENHANCING UNIFIED INTERFACE"
echo "==========================================================="

# First, let's check if the unified interface is running
echo "Checking if unified interface is running on port 9001..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:9001 | grep -q "200"; then
  echo "✓ Unified interface is running"
else
  echo "✗ Unified interface is not running"
  echo "Please make sure the unified interface is running on port 9001"
  exit 1
fi

# Create a directory for our enhancements
echo "Creating directory for enhancements..."
mkdir -p /home/user/interface-enhancements

# Create a CSS file with enhanced styles
echo "Creating enhanced styles..."
cat > /home/user/interface-enhancements/enhanced-styles.css << 'EOL'
/* Enhanced styles for the unified interface */
:root {
  --primary-color: #4285f4;
  --secondary-color: #34a853;
  --accent-color: #ea4335;
  --dark-bg: #121212;
  --darker-bg: #1e1e1e;
  --light-text: #e0e0e0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--dark-bg);
  color: var(--light-text);
}

/* Improve header styling */
header {
  background-color: var(--darker-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 1rem;
}

/* Improve view cards */
.view-card {
  background-color: var(--darker-bg);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.view-card:hover {
  transform: translateY(-5px);
}

.view-card h2 {
  color: var(--primary-color);
}

.view-card a {
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  padding: 8px 16px;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
}

/* Add notebook browser panel */
.notebook-panel {
  background-color: var(--darker-bg);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.notebook-panel h2 {
  color: var(--primary-color);
  margin-top: 0;
}

.notebook-browser {
  display: flex;
  margin-top: 1rem;
}

.notebook-sidebar {
  width: 200px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 4px 0 0 4px;
}

.notebook-content {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 0 4px 4px 0;
  font-family: monospace;
  white-space: pre-wrap;
}

select, button {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  background-color: var(--darker-bg);
  color: var(--light-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

button {
  background-color: var(--primary-color);
  cursor: pointer;
}

.file-list {
  max-height: 300px;
  overflow-y: auto;
}

.file-item {
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.file-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Navigation bar */
.main-nav {
  background-color: var(--darker-bg);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin-right: 1rem;
}

.nav-links a {
  color: var(--light-text);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 4px;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.active {
  background-color: var(--primary-color);
  color: white;
}
EOL

# Create the JavaScript file for notebook browsing
echo "Creating notebook browser script..."
cat > /home/user/interface-enhancements/notebook-browser.js << 'EOL'
// Notebook Browser Component for Unified Interface

// State
let currentDirectory = '';
let currentFile = '';
let fileContent = '';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to elements
  const directorySelect = document.getElementById('directory-select');
  const fileList = document.getElementById('file-list');
  const contentArea = document.getElementById('notebook-content');
  const importButton = document.getElementById('import-button');
  
  // Add event listeners
  directorySelect.addEventListener('change', handleDirectoryChange);
  importButton.addEventListener('click', handleImport);
  
  // Initial load of directories
  loadDirectories();
  
  // Function to load directories
  async function loadDirectories() {
    try {
      const response = await fetch('http://localhost:3003/notebooks');
      const data = await response.json();
      
      if (data.directories && data.directories.length > 0) {
        // Clear select
        directorySelect.innerHTML = '<option value="">Select a directory...</option>';
        
        // Add options
        data.directories.forEach(dir => {
          const option = document.createElement('option');
          option.value = dir;
          option.textContent = dir;
          directorySelect.appendChild(option);
        });
      } else {
        directorySelect.innerHTML = '<option value="">No directories found</option>';
      }
    } catch (error) {
      console.error('Error loading directories:', error);
      directorySelect.innerHTML = '<option value="">Error loading directories</option>';
    }
  }
  
  // Handle directory change
  async function handleDirectoryChange() {
    const directory = directorySelect.value;
    currentDirectory = directory;
    
    if (!directory) {
      fileList.innerHTML = '<div class="file-item">Select a directory first</div>';
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3003/notebooks/${directory}`);
      const data = await response.json();
      
      if (data.files && data.files.length > 0) {
        fileList.innerHTML = '';
        
        data.files.forEach(file => {
          const div = document.createElement('div');
          div.className = 'file-item';
          div.textContent = file;
          div.addEventListener('click', () => loadFile(directory, file));
          fileList.appendChild(div);
        });
      } else {
        fileList.innerHTML = '<div class="file-item">No files in this directory</div>';
      }
    } catch (error) {
      console.error('Error loading files:', error);
      fileList.innerHTML = '<div class="file-item">Error loading files</div>';
    }
  }
  
  // Load file content
  async function loadFile(directory, file) {
    try {
      const response = await fetch(`http://localhost:3003/notebooks/${directory}/${file}`);
      const content = await response.text();
      
      contentArea.textContent = content;
      currentFile = file;
      fileContent = content;
      
      // Enable import button
      importButton.disabled = false;
    } catch (error) {
      console.error('Error loading file:', error);
      contentArea.textContent = 'Error loading file';
    }
  }
  
  // Handle import
  async function handleImport() {
    if (!currentDirectory || !currentFile) {
      alert('Please select a file first');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3003/notebooks/wiki/${currentDirectory}/${currentFile}`, {
        method: 'POST'
      });
      
      if (response.ok) {
        alert('File imported to wiki successfully');
        
        // Provide link to view in wiki
        const fileName = currentFile.replace('.txt', '');
        const wikiLink = document.createElement('a');
        wikiLink.href = `http://localhost:3003/pages/${fileName}`;
        wikiLink.target = '_blank';
        wikiLink.textContent = 'View in Wiki';
        wikiLink.style.display = 'block';
        wikiLink.style.marginTop = '10px';
        contentArea.appendChild(wikiLink);
      } else {
        alert('Failed to import to wiki');
      }
    } catch (error) {
      console.error('Error importing file:', error);
      alert('Error importing file');
    }
  }
});
EOL

# Create the enhanced HTML template to inject into the unified interface
echo "Creating enhanced HTML template..."
cat > /home/user/interface-enhancements/enhancements.html << 'EOL'
<!-- Notebook Browser Panel -->
<div class="notebook-panel">
  <h2>Notebook Browser</h2>
  <div class="notebook-browser">
    <div class="notebook-sidebar">
      <select id="directory-select">
        <option value="">Select a directory...</option>
      </select>
      <div id="file-list" class="file-list">
        <div class="file-item">Select a directory first</div>
      </div>
    </div>
    <div id="notebook-content" class="notebook-content">
      Select a file to view its content...
    </div>
  </div>
  <button id="import-button" disabled>Import to Wiki</button>
</div>

<!-- Improved Navigation -->
<nav class="main-nav">
  <ul class="nav-links">
    <li><a href="http://localhost:3003/enhanced" target="_blank">Enhanced Wiki</a></li>
    <li><a href="http://localhost:3003/simple" target="_blank">Notebook Browser</a></li>
    <li><a href="http://localhost:8081" target="_blank">3D Visualization</a></li>
  </ul>
</nav>

<!-- External Resources -->
<script src="/notebook-browser.js"></script>
<link rel="stylesheet" href="/enhanced-styles.css">
EOL

# Create an injection script to modify the unified interface
echo "Creating injection script..."
cat > /home/user/interface-enhancements/inject-enhancements.js << 'EOL'
// This script is meant to be loaded into the unified interface
// It will inject our enhanced features

document.addEventListener('DOMContentLoaded', () => {
  // Get the container element
  const container = document.querySelector('.container');
  
  if (!container) {
    console.error('Container element not found');
    return;
  }
  
  // Create a request to fetch our enhancements
  fetch('/enhancements.html')
    .then(response => response.text())
    .then(html => {
      // Insert the enhancements before the views
      const views = document.querySelector('.views');
      if (views) {
        // Create a div for our enhancements
        const enhancementsDiv = document.createElement('div');
        enhancementsDiv.innerHTML = html;
        
        // Insert before the views
        container.insertBefore(enhancementsDiv, views);
      }
    })
    .catch(error => {
      console.error('Error loading enhancements:', error);
    });
});
EOL

# Create a server to serve our enhancements
echo "Creating enhancement server..."
cat > /home/user/interface-enhancements/server.js << 'EOL'
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3005;

// Serve static files
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
  console.log(`Enhancement server running on port ${PORT}`);
});
EOL

# Create package.json for the enhancement server
echo "Creating package.json..."
cat > /home/user/interface-enhancements/package.json << 'EOL'
{
  "name": "interface-enhancements",
  "version": "1.0.0",
  "description": "Enhancements for the unified interface",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
EOL

# Create a browser script to inject the enhancements
echo "Creating integration instructions..."
cat > /home/user/integration-instructions.md << 'EOL'
# Integrating Enhanced Features

This guide explains how to integrate the new enhancements with your existing unified interface.

## Option 1: Using Browser Extensions

1. Install the "User JavaScript and CSS" extension for your browser
2. Configure it to inject the following script into http://localhost:9001:

```javascript
// Create a script element for the enhancements
const script = document.createElement('script');
script.src = 'http://localhost:3005/inject-enhancements.js';
document.head.appendChild(script);

// Create a link element for the styles
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'http://localhost:3005/enhanced-styles.css';
document.head.appendChild(link);
```

## Option 2: Modifying the Unified Interface Directly

If you have access to modify the unified interface code:

1. Copy these files to your unified interface directory:
   - enhanced-styles.css
   - notebook-browser.js
   - enhancements.html

2. Add these lines to your HTML file:
   ```html
   <link rel="stylesheet" href="enhanced-styles.css">
   <script src="notebook-browser.js"></script>
   ```

3. Insert the contents of enhancements.html before the views div in your HTML

## Option 3: Using the Enhancement Server

1. Start the enhancement server:
   ```
   cd /home/user/interface-enhancements
   npm install
   node server.js
   ```

2. Add this script tag to your unified interface HTML file:
   ```html
   <script src="http://localhost:3005/inject-enhancements.js"></script>
   ```

## Testing the Integration

After integrating the enhancements:

1. You should see a new notebook browser panel above the existing view cards
2. The navigation bar should provide direct links to all components
3. The styling should be enhanced with improved colors and hover effects

## Customizing the Enhancements

Feel free to modify the CSS and JavaScript files to match your preferred style and functionality.
EOL

# Install dependencies for the enhancement server
echo "Installing dependencies..."
cd /home/user/interface-enhancements
npm install --silent

# Start the enhancement server
echo "Starting enhancement server..."
node server.js > /dev/null 2>&1 &
ENHANCEMENT_PID=$!

# Wait a moment to make sure the server starts
sleep 2

# Check if server is running
if kill -0 $ENHANCEMENT_PID 2>/dev/null; then
  echo "Enhancement server started successfully on port 3005"
else
  echo "Failed to start enhancement server"
fi

echo "==========================================================="
echo "INTEGRATION READY"
echo "==========================================================="
echo "The enhancements have been prepared and are ready to be"
echo "integrated with your existing unified interface."
echo ""
echo "To integrate the enhancements, follow the instructions in:"
echo "/home/user/integration-instructions.md"
echo ""
echo "You can test the enhancement server by visiting:"
echo "http://localhost:3005/enhanced-styles.css"
echo "http://localhost:3005/notebook-browser.js"
echo "http://localhost:3005/enhancements.html"
echo ""
echo "This approach enhances your existing interface without"
echo "replacing it, adding new capabilities while preserving"
echo "your familiar workflow."
echo "==========================================================="