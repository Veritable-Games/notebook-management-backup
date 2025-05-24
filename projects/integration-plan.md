# Veritable Games Integration Plan

## Current Architecture

The system consists of 7 independent services:

1. **Backend API** (port 4000)
   - Knowledge Constellation API for relationships

2. **Constellation Viewer** (port 3003)
   - Wiki and document visualization
   - Enhanced wiki has been removed

3. **Canvas Application** (port 3000)
   - Interactive drawing application
   - Supports collaboration

4. **Content Management** (port 3001)
   - Content organization and storage

5. **3D Visualization** (port 8090)
   - 3D viewing capabilities

6. **User Admin Portal** (port 3005)
   - User management with in-memory MongoDB
   - Forum capabilities (not integrated)

7. **Monitoring Dashboard** (port 9090)
   - System monitoring

## Integration Strategy

### 1. Unified Authentication Service

Create a central authentication service that will:
- Provide single sign-on across all applications
- Manage user sessions
- Handle permissions and roles
- Support OAuth for third-party integration

Implementation:
```javascript
// In a new project: /authentication-service
const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

// Creates tokens that all services will recognize
// Service handles validation and verification
```

### 2. API Gateway

Create an API gateway that:
- Routes requests to appropriate services
- Handles cross-service communication
- Provides unified API documentation
- Implements rate limiting and security

Implementation:
```javascript
// In a new project: /api-gateway
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Routes to define:
// - /api/auth -> authentication service
// - /api/content -> content management
// - /api/users -> user admin portal
// - /api/canvas -> canvas application
// - /api/wiki -> constellation viewer
// - /api/visualization -> 3D visualization
```

### 3. UI Integration Layer

Create a consistent UI that matches the shared chat design:
- Clean, minimalist interface
- Card-based layout
- Dark/light mode toggle
- Responsive design for all devices

Key features from the shared design:
- Message threading/grouping
- Clean typography and spacing
- Smooth transitions
- Contextual actions

### 4. Forum and Wiki Integration

Connect the WordPress forum system with the User Admin Portal:
- Use the existing forum REST API endpoints
- Create proxy routes in User Admin Portal
- Implement SSO between systems
- Synchronize user profiles

## Implementation Timeline

1. **Authentication Service** (Week 1)
   - Implement core authentication
   - Create user management API
   - Implement JWT token system

2. **API Gateway** (Week 2)
   - Set up routing infrastructure
   - Implement security policies
   - Create documentation

3. **UI Integration** (Weeks 3-4)
   - Develop shared component library
   - Implement consistent theming
   - Create navigation system

4. **Forum/Wiki Integration** (Weeks 5-6)
   - Connect User Admin Portal to WordPress
   - Implement content synchronization
   - Create unified search

## Git Repository Structure

For each project, create a separate GitHub repository:

```
Veritable-Games/
├── authentication-service/
├── api-gateway/
├── backend-api/
├── canvas-application/ (already exists)
├── constellation-viewer/
├── content-management/
├── 3d-visualization/
├── user-admin-portal/
├── monitoring/
├── ui-components/
└── integration-docs/
```

Repository setup commands:
```bash
# For each new project
cd /home/user/Repository/projects/PROJECT_NAME
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:Veritable-Games/PROJECT_NAME.git
git push -u origin main
```

## Deployment Strategy

Use Docker Compose for local development and Kubernetes for production:

```yaml
# docker-compose.yml for development
version: '3'
services:
  auth:
    build: ./authentication-service
    ports:
      - "4010:4010"
  
  api-gateway:
    build: ./api-gateway
    ports:
      - "8000:8000"
    depends_on:
      - auth
  
  # Other services...
```