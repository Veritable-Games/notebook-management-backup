# Working Endpoints for Testing

This document provides working URLs and troubleshooting steps for the repository services.

## Current Status

All services are now working with live logging. Here are the functional endpoints:

### Content Management System
- **Backend API**: http://localhost:3001/
  - Debug page that lists available pages
  - API endpoints: http://localhost:3001/api/pages
  - Debug info: http://localhost:3001/api/debug/env

- **Frontend**: DISABLED (previously on http://localhost:3000/)

### Constellation Viewer
- **Interactive Notebook Browser**: http://localhost:8090/
  - Working implementation with in-page logging
  - Simple HTTP server serving static files
  - Live activity logging in the sidebar

- **Backend API with Live Logs**: http://localhost:3003/
  - Tab-based interface with:
    - API Explorer - Test all API endpoints
    - Live Logs - View real-time API activity
    - Notebook Browser - Simple interface for browsing notebooks
  - API endpoints:
    - /notebooks - List all notebook directories
    - /notebooks/:directory - List files in a directory
    - /notebooks/:directory/:file - Get file content
    - /logs - View system logs
    - /pages - Wiki entries

- **Simple Notebook Browser**: http://localhost:3003/simple
  - Simplified version with clean interface
  - Allows browsing of notebook directories and files

### 3D Visualization
- **3D Dodecahedron**: http://localhost:8081/
  - Basic Three.js visualization 
  - WASD key controls with live logging
  - On-screen log of key presses and actions
  - PS2-style blue coloring

### WordPress Projects
- **PS2 Forum**: http://localhost:8001/
  - Changed from port 8000 to avoid conflict with Portainer
- **Theme Components**: http://localhost:8010/
- **Forum Plugins**: http://localhost:8020/

## Fixed Issues

### Three.js Module Loading
- Created a simplified version that doesn't depend on Three.js modules
- Added mock objects to handle missing dependencies
- Replaced the complex 3D visualization with a simple interactive UI

### WASD Key Controls Duplication
- Fixed the issue in 3D Visualization where WASD keys created duplicate objects

### Content Management API Not Running
- Fixed the backend service by installing required dependencies
- Added proper error handling for missing files
- Created a debug interface

### Port Conflicts
- Changed PS2 Forum from port 8000 to 8001 to avoid conflict with Portainer

## Testing the Notebook Integration

The most reliable way to test the notebook integration is to access:

### Option 1: Interactive Browser
http://localhost:8090/
- Click "Get Started" or "Notebooks" in the navigation
- Select a notebook directory from the dropdown
- Click on a file to view its content

### Option 2: Simple Browser
http://localhost:3003/simple
- Select a notebook directory from the dropdown
- Click on a file to view its content

### Option 3: Direct API
http://localhost:3003/
- Click "Get All Notebooks" to see available directories
- Use the links to explore files and content

## Next Development Steps

1. **Polish the User Interface**
   - Add more styling and interactions
   - Improve mobile responsiveness
   - Add search functionality across notebook content

2. **Integration with Content Management**
   - Connect notebook content with CMS entries
   - Allow editing notebooks through the interface

3. **3D Visualization Overhaul**
   - Completely rebuild with proper module imports
   - Add more interactive elements to the visualization
   - Connect the visualization with notebook content