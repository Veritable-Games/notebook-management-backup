# Creating a New Service

This guide provides step-by-step instructions for creating a new service in the Veritable Games platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Service Structure](#service-structure)
3. [Configuration](#configuration)
4. [Implementation](#implementation)
5. [Testing](#testing)
6. [Integration](#integration)
7. [Deployment](#deployment)

## Prerequisites

Before creating a new service, ensure you have:

- Node.js 16+ installed
- Access to the Veritable Games repository
- Understanding of the [Service Integration Guide](./SERVICE_INTEGRATION_GUIDE.md)

## Service Structure

### 1. Create the service directory

```bash
mkdir -p projects/my-new-service/{backend,frontend,config,docs}
```

### 2. Initialize package.json

```bash
cd projects/my-new-service
npm init -y
```

Edit the generated package.json:

```json
{
  "name": "my-new-service",
  "version": "1.0.0",
  "description": "Description of my new service",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1",
    "body-parser": "^1.19.0"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "nodemon": "^2.0.15"
  }
}
```

### 3. Create a README.md

```markdown
# My New Service

Part of Veritable Games platform.

## Features

* Feature 1
* Feature 2

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Development

```bash
npm run dev
```

## License

© 2025 Veritable Games. All rights reserved.
```

## Configuration

### 1. Update services.json

Add your service to `projects/config/services.json`:

```json
{
  "services": {
    "My-Service": {
      "name": "My New Service",
      "command": "node server.js",
      "directory": "/home/user/Repository/projects/my-new-service",
      "port": 3010,
      "dependencies": ["Backend-API"],
      "env": {
        "NODE_ENV": "production",
        "PORT": 3010,
        "LOG_LEVEL": "info"
      },
      "autoRestart": true,
      "healthCheck": {
        "path": "/health",
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  }
}
```

### 2. Update project-structure.json

Add your service to `projects/config/project-structure.json`:

```json
{
  "structure": {
    "projects": {
      "children": {
        "my-new-service": {
          "description": "Description of my new service",
          "type": "service",
          "port": 3010
        }
      }
    }
  }
}
```

## Implementation

### 1. Create server.js

Create a basic Express server in `backend/server.js`:

```javascript
// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const { logger, errors } = require('../../utilities');

// Load configuration
const config = {
  port: process.env.PORT || 3010,
  logLevel: process.env.LOG_LEVEL || 'info'
};

// Initialize logger
const log = logger({
  service: 'my-new-service',
  level: config.logLevel
});

// Create Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(log.middleware());
app.use(log.requestLoggerMiddleware());

// Static files (if needed)
app.use(express.static('frontend'));

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});

app.get('/api/resource', errors.asyncHandler(async (req, res) => {
  req.logger.info('Fetching resources');
  
  // Your service logic here
  const resources = [{ id: 1, name: 'Resource 1' }];
  
  res.json({ data: resources });
}));

// Error handling
app.use(errors.errorMiddleware(log));

// Start the server
app.listen(config.port, () => {
  log.info(`Service started on port ${config.port}`);
});

// Graceful shutdown
function shutdown() {
  log.info('Shutting down service...');
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

### 2. Create frontend assets (if needed)

If your service has a frontend component, create the necessary HTML, CSS, and JavaScript files in the `frontend` directory.

## Testing

### 1. Create tests

Create a simple test in `tests/server.test.js`:

```javascript
const request = require('supertest');
const app = require('../backend/server');

describe('Health Check', () => {
  it('should return status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});
```

### 2. Run tests

```bash
npm test
```

## Integration

### 1. Update the service manager

The service manager will automatically pick up your service from the `services.json` configuration.

### 2. Start the service

```bash
cd /home/user/Repository
./service-manager.sh start My-Service
```

### 3. Verify the service

Check that your service is running:

```bash
./service-manager.sh status My-Service
```

Access your service API:

```bash
curl http://localhost:3010/health
```

## Deployment

For deployment, ensure:

1. All dependencies are properly defined in `package.json`
2. Environment variables are documented
3. Service configuration is complete
4. Health check endpoint is implemented

The service manager will handle the deployment process based on the configuration in `services.json`.

## Next Steps

- Add more comprehensive tests
- Enhance documentation
- Implement additional features
- Set up CI/CD pipeline

For more detailed integration guidelines, see the [Service Integration Guide](./SERVICE_INTEGRATION_GUIDE.md).