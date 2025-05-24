# Service Integration Guide

This guide provides detailed instructions for integrating services within the Veritable Games platform.

## Table of Contents

1. [Service Architecture](#service-architecture)
2. [Configuration Standards](#configuration-standards)
3. [Dependency Management](#dependency-management)
4. [Using Shared Components](#using-shared-components)
5. [Logging Standards](#logging-standards)
6. [Error Handling](#error-handling)
7. [Service Lifecycle](#service-lifecycle)
8. [Health Checks](#health-checks)
9. [API Standards](#api-standards)

## Service Architecture

The Veritable Games platform uses a microservices architecture with the following principles:

- Each service has a specific, focused responsibility
- Services communicate through well-defined APIs
- Services can be deployed and scaled independently
- Services manage their own data and state
- Services rely on shared utilities for common functionality

### Service Types

The platform includes these types of services:

1. **Core Services** - Provide fundamental platform capabilities
   - Backend API
   - Content Management

2. **User-Facing Applications** - Direct user interaction
   - Canvas Application
   - Constellation Viewer
   - 3D Visualization

3. **Infrastructure Services** - Support platform operations
   - Monitoring
   - Logging

## Configuration Standards

### Service Configuration

All services should use the following configuration approach:

1. **Configuration Files**:
   - Primary configuration in `/projects/config/services.json`
   - Service-specific configuration in the service's `config` directory

2. **Environment Variables**:
   - Use environment variables for deployment-specific settings
   - Follow the naming convention: `SERVICE_NAME_SETTING_NAME`

3. **Configuration Hierarchy**:
   - Environment variables override file-based configuration
   - Service-specific configuration overrides global configuration

### Example Configuration

```javascript
// Load configuration with fallbacks
const config = {
  // Default configuration
  port: 3000,
  logLevel: 'info',
  
  // Load from environment variables
  ...(process.env.SERVICE_PORT && { port: parseInt(process.env.SERVICE_PORT, 10) }),
  ...(process.env.SERVICE_LOG_LEVEL && { logLevel: process.env.SERVICE_LOG_LEVEL }),
};
```

## Dependency Management

### Service Dependencies

Services declare their dependencies in the main configuration:

```json
{
  "services": {
    "ServiceName": {
      "dependencies": ["OtherService1", "OtherService2"]
    }
  }
}
```

### Managing Dependencies

The service manager handles dependencies by:

1. Starting services in dependency order
2. Stopping services in reverse dependency order
3. Health-checking dependencies before starting dependent services
4. Providing circuit breakers for resilient service interaction

### Circuit Breaker Pattern

Use the circuit breaker for resilient inter-service communication:

```javascript
const { errors } = require('@vg/utilities');

const breaker = errors.circuitBreaker({
  failureThreshold: 3,
  resetTimeout: 10000
});

async function callDependentService() {
  return breaker(async () => {
    // Call to external service
    const response = await fetch('http://other-service/api/resource');
    return response.json();
  });
}
```

## Using Shared Components

### Shared UI Library

For frontend applications:

```javascript
import { Button, ThemeProvider } from '@vg/shared-ui';

function MyComponent() {
  return (
    <ThemeProvider>
      <Button variant="primary">Click Me</Button>
    </ThemeProvider>
  );
}
```

### Utilities

For backend services:

```javascript
const { logger, errors } = require('@vg/utilities');

// Create logger
const log = logger({
  service: 'my-service',
  level: process.env.LOG_LEVEL || 'info'
});

// Use error handling
app.use(errors.errorMiddleware(log));
```

## Logging Standards

All services must use the standardized logging utility:

```javascript
const { logger } = require('@vg/utilities');

const log = logger({
  service: 'my-service',
  level: process.env.LOG_LEVEL || 'info',
  format: 'json'
});

// Application logging
log.info('Service started', { port: config.port });
log.error('Service error', { error: err.message });

// HTTP request logging
app.use(log.middleware());

// Request-scoped logging
app.use(log.requestLoggerMiddleware());
app.get('/api/resource', (req, res) => {
  req.logger.info('Processing request', { resourceId: req.params.id });
  // ...
});
```

### Log Levels

- **debug** - Detailed information for debugging
- **info** - Normal operation information
- **warn** - Warning conditions
- **error** - Error conditions that should be addressed

## Error Handling

### Custom Error Classes

Use the standardized error classes for consistent error handling:

```javascript
const { errors } = require('@vg/utilities');

// Create custom errors
throw new errors.NotFoundError('Resource not found');
throw new errors.BadRequestError('Invalid input', 'VALIDATION_ERROR', validationDetails);

// Express error middleware
app.use(errors.errorMiddleware(logger));

// Async error handling
app.get('/api/resource/:id', errors.asyncHandler(async (req, res) => {
  const resource = await resourceService.findById(req.params.id);
  if (!resource) {
    throw new errors.NotFoundError('Resource not found');
  }
  res.json(resource);
}));
```

### Error Response Format

All API error responses should follow this format:

```json
{
  "error": {
    "message": "Human-readable error message",
    "code": "ERROR_CODE",
    "requestId": "unique-request-id",
    "details": {
      "field1": "Error details"
    }
  }
}
```

## Service Lifecycle

### Startup Sequence

1. Load configuration
2. Connect to dependencies
3. Initialize resources
4. Start HTTP server
5. Register with service registry

Example implementation:

```javascript
async function startService() {
  // 1. Load configuration
  const config = loadConfig();
  
  // 2. Initialize logger
  const log = initializeLogger(config);
  
  // 3. Connect to dependencies
  await connectToDependencies(config);
  
  // 4. Initialize resources
  await initializeResources(config);
  
  // 5. Start HTTP server
  const server = await startServer(config);
  
  // 6. Register shutdown handlers
  registerShutdownHandlers(server);
  
  log.info('Service started successfully');
}
```

### Shutdown Sequence

1. Stop accepting new requests
2. Complete in-progress requests
3. Close resource connections
4. Exit process

Example implementation:

```javascript
function registerShutdownHandlers(server) {
  const shutdown = async () => {
    log.info('Shutdown initiated');
    
    // 1. Stop accepting new requests
    server.close();
    
    // 2. Wait for in-progress requests (optional)
    await waitForRequestsToComplete();
    
    // 3. Close resource connections
    await closeResourceConnections();
    
    log.info('Service shutdown complete');
    process.exit(0);
  };
  
  // Handle termination signals
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}
```

## Health Checks

Each service must implement a health check endpoint:

```javascript
app.get('/health', (req, res) => {
  const health = {
    status: 'UP',
    uptime: process.uptime(),
    timestamp: Date.now(),
    dependencies: {
      database: isDatabaseConnected ? 'UP' : 'DOWN',
      redis: isRedisConnected ? 'UP' : 'DOWN'
    }
  };
  
  const status = Object.values(health.dependencies).includes('DOWN') ? 503 : 200;
  res.status(status).json(health);
});
```

## API Standards

### REST API Design

1. **Resource-Oriented**:
   - Use nouns for resources: `/users`, `/documents`
   - Use plural for collections: `/users`
   - Use singular for specific items: `/users/:id`

2. **HTTP Methods**:
   - GET: Retrieve resources
   - POST: Create resources
   - PUT: Replace resources
   - PATCH: Update resources
   - DELETE: Remove resources

3. **Status Codes**:
   - 200: Success
   - 201: Created
   - 204: No Content
   - 400: Bad Request
   - 401: Unauthorized
   - 403: Forbidden
   - 404: Not Found
   - 500: Internal Server Error

4. **Response Format**:
   ```json
   {
     "data": { /* Resource data */ },
     "meta": {
       "total": 100,
       "page": 1,
       "pageSize": 10
     }
   }
   ```
   
5. **Error Format**:
   ```json
   {
     "error": {
       "message": "Error message",
       "code": "ERROR_CODE",
       "requestId": "unique-request-id"
     }
   }
   ```