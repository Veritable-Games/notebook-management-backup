# Service Management System

A comprehensive set of tools for managing, monitoring, and diagnosing the web services infrastructure.

## Overview

This service management system provides tools for:

1. **Service Control**: Starting, stopping, and restarting services
2. **Monitoring**: Real-time visual dashboard of service status
3. **Diagnostics**: Detailed logging and troubleshooting tools
4. **Configuration**: Centralized management of service settings
5. **Dependency Management**: Tools to install and update dependencies

## Directory Structure

```
service-management/
├── README.md                     # This documentation
├── bin/                          # Executable scripts
│   ├── start-all.sh              # Start all services
│   ├── stop-all.sh               # Stop all services
│   ├── restart-all.sh            # Restart all services
│   └── service-control.sh        # Control individual services
├── config/                       # Configuration files
│   ├── services.json             # Service definitions
│   └── ports.json                # Port assignments
├── monitoring/                   # Monitoring tools
│   ├── dashboard.sh              # Launch monitoring dashboard
│   └── status-check.sh           # Check service status
├── diagnostics/                  # Diagnostic tools
│   ├── logs-viewer.sh            # View service logs
│   └── dependency-check.sh       # Check dependencies
└── utilities/                    # Utility scripts
    ├── fix-permissions.sh        # Fix permission issues
    ├── install-dependencies.sh   # Install dependencies
    └── update-configs.sh         # Update configurations
```

## Getting Started

1. **Start All Services**:
   ```bash
   ./bin/start-all.sh
   ```

2. **View Dashboard**:
   ```bash
   ./monitoring/dashboard.sh
   ```

3. **Stop All Services**:
   ```bash
   ./bin/stop-all.sh
   ```

## Service Descriptions

| Service Name | Port | Description | Dependencies |
|--------------|------|-------------|------------|
| CV-Backend | 3004 | Constellation Viewer backend API | express, body-parser |
| CV-Frontend | 9003 | Constellation Viewer frontend interface | express |
| CM-Backend | 3001 | Content Management backend API | next.js, react |
| CM-Frontend | 3002 | Content Management frontend interface | next.js, react |
| 3D-Visualization | 8081 | 3D visualization service | - |
| PS2-Forum | 8000 | Forum service | - |
| Wiki-Export | 8080 | Wiki export service | - |

## Common Tasks

### Starting a Specific Service
```bash
./bin/service-control.sh start CV-Backend
```

### Checking Status of a Service
```bash
./monitoring/status-check.sh CV-Backend
```

### Viewing Logs for a Service
```bash
./diagnostics/logs-viewer.sh CV-Frontend
```

### Updating Service Configurations
```bash
./utilities/update-configs.sh
```

## Troubleshooting

### Port Conflicts
If you encounter port conflicts, update the port mapping in `config/ports.json` and restart the affected service:

```bash
./bin/service-control.sh restart <service-name>
```

### Permission Issues
Fix permission issues with:

```bash
./utilities/fix-permissions.sh
```

### Dependency Errors
Install or update dependencies with:

```bash
./utilities/install-dependencies.sh <service-name>
```

## Advanced Usage

### Creating Custom Services
Add a new service definition to `config/services.json` with the following format:

```json
{
  "name": "my-service",
  "port": 3000,
  "command": "node server.js",
  "directory": "/path/to/service",
  "dependencies": ["express", "body-parser"]
}
```

### Custom Monitoring
Configure custom monitoring checks in the dashboard settings.