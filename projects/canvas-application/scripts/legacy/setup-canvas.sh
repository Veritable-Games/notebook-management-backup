#!/bin/bash

# Canvas App Setup Script
# This script ensures proper installation of Canvas and its dependencies

set -e
echo "=== Setting up Canvas App ==="

# Navigate to the app directory
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"

# Clean existing installation
echo "=== Cleaning previous installation ==="
rm -rf node_modules package-lock.json

# Update package.json with correct dependencies and name
echo "=== Creating compatible package.json ==="
cat > package.json << 'EOL'
{
  "name": "canvas",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@excalidraw/excalidraw": "^0.14.2",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "roughjs": "^4.5.2",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "DISABLE_ESLINT_PLUGIN=true react-scripts --openssl-legacy-provider start",
    "build": "DISABLE_ESLINT_PLUGIN=true react-scripts --openssl-legacy-provider build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix",
    "serve": "serve -s build"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
EOL

# Make sure public directory exists
mkdir -p public

# Create manifest.json
echo "=== Creating manifest.json ==="
cat > public/manifest.json << 'EOL'
{
  "short_name": "Canvas",
  "name": "Canvas - Drawing App",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
EOL

# Create index.html
echo "=== Creating index.html ==="
cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Canvas - A drawing and diagramming application"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Canvas</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

# Install dependencies with clean cache
echo "=== Installing dependencies ==="
npm cache clean --force
npm install

# Create the main App.js file
echo "=== Creating App.js ==="
mkdir -p src
cat > src/App.js << 'EOL'
import React, { useState, useRef } from 'react';
import './App.css';
import { Excalidraw } from "@excalidraw/excalidraw";

function App() {
  const excalidrawRef = useRef(null);
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  
  const toggleViewMode = () => {
    setViewModeEnabled(!viewModeEnabled);
  };

  const handleSave = () => {
    if (!excalidrawRef.current) return;
    
    const elements = excalidrawRef.current.getSceneElements();
    const appState = excalidrawRef.current.getAppState();
    
    const data = JSON.stringify({ elements, appState });
    localStorage.setItem('canvas-data', data);
    
    alert('Drawing saved!');
  };
  
  const handleLoad = () => {
    if (!excalidrawRef.current) return;
    
    const savedData = localStorage.getItem('canvas-data');
    if (savedData) {
      try {
        const { elements, appState } = JSON.parse(savedData);
        excalidrawRef.current.updateScene({ elements, appState });
        alert('Drawing loaded!');
      } catch (error) {
        console.error('Error loading saved data:', error);
        alert('Error loading drawing');
      }
    } else {
      alert('No saved drawing found');
    }
  };
  
  const handleClear = () => {
    if (!excalidrawRef.current) return;
    
    if (window.confirm('Are you sure you want to clear the canvas?')) {
      excalidrawRef.current.resetScene();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Canvas</h1>
        <div className="header-controls">
          <button onClick={toggleViewMode}>
            {viewModeEnabled ? 'Edit Mode' : 'View Mode'}
          </button>
        </div>
      </header>
      <div className="control-panel">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleLoad}>Load</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={{
            elements: [],
            appState: {
              viewBackgroundColor: '#ffffff',
              currentItemFontFamily: 1,
            },
          }}
          viewModeEnabled={viewModeEnabled}
          theme="light"
          collaborators={[]}
        />
      </div>
    </div>
  );
}

export default App;
EOL

# Create the CSS file
echo "=== Creating App.css ==="
cat > src/App.css << 'EOL'
.App {
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.App-header h1 {
  margin: 0;
  font-size: 1.5em;
}

.header-controls button {
  background-color: #61dafb;
  border: none;
  border-radius: 4px;
  color: #282c34;
  padding: 8px 16px;
  font-weight: bold;
  cursor: pointer;
}

.header-controls button:hover {
  background-color: #4fa8d1;
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.control-panel button {
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
}

.control-panel button:hover {
  background-color: #3367d6;
}

.excalidraw-wrapper {
  flex-grow: 1;
  height: calc(100vh - 130px);
  position: relative;
}

.excalidraw-container {
  height: 100%;
}
EOL

# Create the index.js file
echo "=== Creating index.js ==="
cat > src/index.js << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
EOL

# Create the index.css file
echo "=== Creating index.css ==="
cat > src/index.css << 'EOL'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOL

# Create reportWebVitals.js
echo "=== Creating reportWebVitals.js ==="
cat > src/reportWebVitals.js << 'EOL'
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
EOL

# Create environment file to disable source map warnings
echo "=== Creating .env.development ==="
cat > .env.development << 'EOL'
# Disable source-map warnings
GENERATE_SOURCEMAP=false
EOL

# Create webpack config override to suppress source map warnings
echo "=== Creating config-overrides.js ==="
cat > config-overrides.js << 'EOL'
// config-overrides.js
module.exports = function override(config, env) {
  // Disable source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];
  
  // Return the modified config
  return config;
};
EOL

# Create ESLint config to suppress source map warnings
echo "=== Creating .eslintrc.js ==="
cat > .eslintrc.js << 'EOL'
module.exports = {
  extends: ["react-app", "react-app/jest"],
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx"],
      rules: {
        // Disable source map warnings
        "no-unused-expressions": "off",
        "no-unused-vars": "warn",
        "import/no-webpack-loader-syntax": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules/**/*", "build/**/*"],
};
EOL

# Create a start script
echo "=== Creating start-app.sh ==="
cat > start-app.sh << 'EOL'
#!/bin/bash

# Start the Canvas App

# Navigate to the app directory
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
cd "$SCRIPT_DIR"

# Kill any existing React development servers
echo "Checking for existing React servers..."
pkill -f "react-scripts start" 2>/dev/null || true

# Start the React development server with source map warnings disabled
echo "Starting Canvas App..."
GENERATE_SOURCEMAP=false npm start
EOL

# Make the start script executable
chmod +x start-app.sh

# Update README
echo "=== Creating README.md ==="
cat > README.md << 'EOL'
# Canvas

A drawing and diagramming application.

## Features

- Create diagrams, sketches, and drawings with a clean interface
- Export your drawings as PNG or SVG
- Customize colors, fill styles, and strokes
- Virtual whiteboard for brainstorming and planning

## Installation

This project requires Node.js and npm to be installed.

```bash
# Set up the app
./setup-canvas.sh

# Or just install dependencies if setup is already done
npm install
```

## Usage

```bash
# Start the development server
./start-app.sh
# or
npm start
```

This will start the development server and open the application in your default web browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run lint:fix`: Run ESLint and automatically fix issues

## Troubleshooting

If you encounter errors:

1. Run the setup script again to reinstall dependencies:
   ```bash
   ./setup-canvas.sh
   ```

2. If issues persist, try clearing npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```
EOL

echo "=== Setup complete! ==="
echo "You can now run the app with: ./start-app.sh"