# Service Management Guide

This guide explains how to manage services in the Veritable Games Repository using the centralized service management system.

## Overview

The repository uses a centralized service manager that handles:
- Starting and stopping services
- Managing dependencies between services
- Monitoring service health
- Handling logs and process IDs
- Providing status information

## Service Management Commands

### Basic Commands

```bash
# Start all services
./service-manager.sh start

# Start a specific service
./service-manager.sh start service-name

# Stop all services
./service-manager.sh stop

# Stop a specific service
./service-manager.sh stop service-name

# Restart all services
./service-manager.sh restart

# Restart a specific service
./service-manager.sh restart service-name

# Check status of all services
./service-manager.sh status

# Check status of a specific service
./service-manager.sh status service-name
```

### Convenience Scripts

The repository includes convenience scripts for common operations:

```bash
# Start all services
./start-all.sh

# Stop all services
./stop-all.sh

# Restart all services
./restart-all.sh
```

## Service Configuration

Services are configured in `/config/services/services.json`. The configuration for each service includes:

- `name`: Human-readable name
- `command`: Command to start the service
- `directory`: Working directory
- `port`: Port the service listens on
- `dependencies`: Other services that must be running first
- `env`: Environment variables
- `healthCheck`: Health check configuration

Example service configuration:

```json
{
  "services": {
    "backend-api": {
      "name": "Backend API",
      "command": "node server.js",
      "directory": "/home/user/Repository/projects/backend-api",
      "port": 4000,
      "dependencies": [],
      "env": {
        "NODE_ENV": "production",
        "PORT": 4000,
        "LOG_LEVEL": "info"
      },
      "healthCheck": {
        "path": "/api/health",
        "interval": 30,
        "timeout": 5
      }
    }
  }
}
```

## Adding a New Service

To add a new service to the management system:

1. Create the service in the `projects/` directory
2. Add service configuration to `/config/services/services.json`
3. Ensure the service has a health check endpoint
4. Test starting and stopping the service

## Logs and Monitoring

- Logs are stored in the `/logs` directory
- Each service has its own log file: `/logs/service-name.log`
- The service manager also logs to `/logs/service-manager.log`

## Troubleshooting

### Service Won't Start

1. Check the service's log file for errors
2. Verify the service's dependencies are running
3. Ensure the service's directory and command are correct
4. Check if another process is using the same port

### Service Shows as Unhealthy

1. Check if the service is actually running
2. Verify the health check endpoint is configured correctly
3. Check the service's log for errors
4. Restart the service

### Service Starts but Fails Health Check

1. Check if the health check endpoint is implemented correctly
2. Verify the service is fully initialized before health checks
3. Check if the service's dependencies are healthy