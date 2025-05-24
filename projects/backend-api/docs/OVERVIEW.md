# Project Overview

This document provides a comprehensive overview of the Repository project, consolidating information from various documentation files.

## Repository Structure

```
Repository/
├── WebProjects/                       # All web projects in a unified structure
│   ├── 3D-Visualization/              # Simple 3D dodecahedron visualization
│   ├── Content-Management/            # Content management system
│   ├── Constellation-Viewer/          # 3D constellation wiki visualization
│   └── WordPress-Projects/            # WordPress-based web projects
│
├── Notebooks/                         # Project notebooks and wiki pages
│   ├── All of it Anything Everything At Once/  # General notes, drafts, and ideas
│   ├── LLM-confusion/                 # Notes related to language models
│   ├── autumn-wiki-pages/             # Wiki pages for Project Autumn
│   ├── dodec-wiki-pages/              # Wiki pages for Project Dodec
│   ├── noxii-wiki-pages/              # Wiki pages for Noxii project
│   ├── on-command-wiki-pages/         # Wiki pages for On Command project
│   └── reference-wiki-pages/          # Reference materials and resources
│
├── Documentation/                     # Legacy project documentation
├── docs/                              # New consolidated documentation
├── docker-compose.yml                 # Current Docker composition for all services
├── docker-compose-modified.yml        # Alternative Docker configuration
├── start-all.sh                       # Script to start all services
├── start-project.sh                   # Script to start individual projects
├── verify-notebook-integration.sh     # Testing script for notebook integration
└── visual-feedback.sh                 # Script for UI-related functionality
```

## Key Services and Access Points

| Service | Port | Description |
|---------|------|-------------|
| Constellation Viewer | 8090 | Main interface for browsing notebooks at `/basic.html` |
| Constellation API | 3003 | API for accessing notebook and wiki data |
| 3D Visualization | 8081 | Interactive 3D viewer with smooth rotation |
| Content Management | 3001 | CMS backend API |
| PS2 Forum | 8001 | WordPress forum site |
| Forum Plugins | 8020 | WordPress plugin testing environment |

## Notebook Integration

The Notebooks directory has been integrated with the Constellation Viewer for browsing and visualization:

1. **Integration Points**:
   - Notebooks mounted to the Constellation Viewer containers
   - API endpoints for accessing notebook content
   - Frontend UI for browsing and viewing notebooks
   - Ability to import notebook content into the wiki system

2. **Key Components**:
   - **Backend API** (port 3003): Provides endpoints for accessing notebook data
   - **Frontend UI** (port 8090): Provides interface for browsing notebooks
   - **Docker Configuration**: Mounts notebooks directory into containers

3. **Recent Enhancements**:
   - Dark mode support
   - Multiple view modes (compact, normal, reading)
   - Improved responsive design
   - Better markdown editing capabilities
   - Enhanced navigation with breadcrumbs

## Running the Project

### Starting All Services

```bash
cd /home/user/Repository
./start-all.sh
```

### Starting Individual Projects

```bash
cd /home/user/Repository
./start-project.sh
```
Then select the project you want to start from the menu.

### Direct Docker Commands

```bash
# Start Constellation Viewer
docker-compose up -d constellation-viewer

# Start 3D Visualization
docker-compose up -d 3d-visualization

# Start Content Management
docker-compose up -d content-management-backend

# Start PS2 Forum
docker-compose up -d ps2-forum-db ps2-forum
```

## Verification and Testing

To verify the notebook integration is working correctly:

```bash
cd /home/user/Repository
./verify-notebook-integration.sh
```

## Project Access

### Main Interfaces

- **Notebook Browser**: http://localhost:8090/basic.html
- **3D Visualization**: http://localhost:8081
- **Content Management**: http://localhost:3001
- **PS2 Forum**: http://localhost:8001

### API Endpoints

- **Notebook Directories**: http://localhost:3003/notebooks
- **Notebook Files**: http://localhost:3003/notebooks/:directory
- **Notebook Content**: http://localhost:3003/notebooks/:directory/:file
- **Wiki Pages**: http://localhost:3003/pages
- **Logs**: http://localhost:3003/logs