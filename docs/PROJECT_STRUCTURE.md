# Project Structure

This document outlines the standardized directory structure for the Veritable Games Repository. The goal is to maintain a consistent and clean organization that separates concerns appropriately.

## Root Directory Structure

```
Repository/
├── config/              # Centralized configuration
│   ├── index.js         # Main configuration module
│   └── services/        # Service-specific configurations
├── data/                # Centralized data storage
│   ├── content/         # Content storage
│   ├── exports/         # Exported data
│   ├── relationships/   # Relationship data
│   └── wiki/            # Wiki content
├── docs/                # Documentation
│   ├── api/             # API documentation
│   ├── architecture/    # System architecture
│   ├── development/     # Development guides
│   ├── guides/          # User guides
│   └── services/        # Service documentation
├── logs/                # Centralized logs
├── notebooks/           # User notebooks and content
├── pids/                # Service PID files
├── projects/            # Project code
│   ├── backend-api/     # Backend API server
│   ├── canvas-application/  # Canvas drawing application
│   ├── constellation-viewer/ # Wiki and document viewer
│   ├── content-management/   # Content organization system
│   ├── shared-ui/            # Shared UI components
│   └── ...                   # Other projects
├── scripts/             # Utility scripts
│   ├── converters/      # Content conversion utilities
│   └── services/        # Service management scripts
├── service-manager.sh   # Centralized service management script
├── start-all.sh         # Start all services
└── stop-all.sh          # Stop all services
```

## Service Structure

Each service in the `projects/` directory should follow this structure:

```
service-name/
├── config/               # Service-specific configuration (legacy)
├── src/                  # Source code
│   ├── controllers/      # API controllers
│   ├── models/           # Data models
│   ├── routes/           # API routes
│   └── services/         # Business logic
├── public/               # Static assets
├── tests/                # Tests
└── README.md             # Service documentation
```

## Configuration

All configuration is now centralized in the `/config` directory:

- `index.js` - Main configuration module that provides access to all config
- `services/services.json` - Service definitions for the service manager
- `services/{service-name}.json` - Service-specific configuration

## Service Management

Services are managed through the centralized service manager:

- `service-manager.sh` - Shell wrapper around the Node.js service manager
- `scripts/service-manager.js` - Core service management logic
- `start-all.sh`, `stop-all.sh`, `restart-all.sh` - Convenience scripts

## Documentation

All documentation is now centralized in the `/docs` directory:

- `api/` - API documentation for all services
- `architecture/` - System architecture and design
- `development/` - Development guides and standards
- `guides/` - User guides and tutorials
- `services/` - Service-specific documentation

## Data Storage

All persistent data is now stored in the `/data` directory:

- `content/` - General content storage
- `exports/` - Exported data (e.g., PDF exports)
- `relationships/` - Relationship data between content
- `wiki/` - Wiki content storage

## Logs

All logs are now centralized in the `/logs` directory, organized by service.

## Process IDs

Service PIDs are stored in the `/pids` directory, managed by the service manager.