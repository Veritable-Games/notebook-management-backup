# Project Endpoints

This document consolidates information about all working endpoints in the Repository project.

## Current Status

All services are now working with live logging. Here are the functional endpoints:

## Constellation Viewer

### Main Interface
- **URL**: http://localhost:8090/basic.html
- **Description**: Enhanced notebook browser with dark mode and responsive design
- **Features**:
  - Directory/file browser for notebooks
  - Content viewing with formatting
  - Dark mode toggle
  - Multiple view modes (compact, normal, reading)
  - Markdown support
  - Edit capabilities for wiki content

### Backend API
- **Base URL**: http://localhost:3003/
- **Description**: API for accessing notebook and wiki content
- **Endpoints**:
  - `GET /notebooks` - List all notebook directories
  - `GET /notebooks/:directory` - List files in a specific notebook directory
  - `GET /notebooks/:directory/:file` - Get content of a specific notebook file
  - `POST /notebooks/wiki/:directory/:file` - Add notebook content as a wiki entry
  - `GET /pages` - List all wiki pages
  - `GET /pages/:title` - Get content of a specific wiki page
  - `POST /pages` - Create or update a wiki page
  - `DELETE /pages/:title` - Delete a wiki page
  - `GET /logs` - View system logs

### Alternative Interfaces
- **Test Interface**: http://localhost:3003/
  - Tab-based interface with API Explorer, Live Logs, and Notebook Browser
- **Simple Browser**: http://localhost:3003/simple
  - Simplified notebook browser

## 3D Visualization

- **URL**: http://localhost:8081/
- **Description**: Interactive 3D visualization
- **Features**:
  - WASD key controls for rotation
  - F or spacebar to focus view
  - R key to reset view
  - Click to center on object
  - Real-time logging of interactions

## Content Management System

- **Backend API**: http://localhost:3001/
  - Debug page with available pages
  - `GET /api/pages` - List all content pages
  - `GET /api/debug/env` - Show environment information
- **Frontend**: Disabled (previously on http://localhost:3000/)

## WordPress Projects

- **PS2 Forum**: http://localhost:8001/
  - Admin URL: http://localhost:8001/wp-admin/
  - Username: admin
  - Password: wordpress
- **Forum Plugins**: http://localhost:8020/
  - Admin URL: http://localhost:8020/wp-admin/
  - Username: admin
  - Password: wordpress

## Docker Containers

| Container Name | Service | Ports | Volumes |
|----------------|---------|-------|---------|
| constellation-viewer | Constellation Viewer | 8090, 3003 | ./WebProjects/Constellation-Viewer:/app, ./Notebooks:/app/notebooks |
| 3d-visualization | 3D Visualization | 8081 | ./WebProjects/3D-Visualization:/app |
| content-management-backend | Content Management | 3001 | ./WebProjects/Content-Management:/app |
| ps2-forum | WordPress PS2 Forum | 8001 | ./WebProjects/WordPress-Projects/PS2-Forum/themes:/var/www/html/wp-content/themes, ./WebProjects/WordPress-Projects/PS2-Forum/plugins:/var/www/html/wp-content/plugins |
| forum-plugins | WordPress Forum Plugins | 8020 | ./WebProjects/WordPress-Projects/Forum-Plugins/plugins:/var/www/html/wp-content/plugins |

## Testing the System

For testing the notebook integration, the most reliable endpoints are:

1. **Enhanced Interface**: http://localhost:8090/basic.html
   - Features dark mode and responsive design

2. **Simple Interface**: http://localhost:3003/simple
   - Clean, minimal interface

3. **API Explorer**: http://localhost:3003/
   - Allows direct testing of API endpoints