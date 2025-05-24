# Troubleshooting Guide

This document provides solutions for common issues encountered when running the projects in this repository.

## Common Issues

### Connection Issues

If you encounter connection issues with any of the services, try these steps:

1. **Restart all services**:
   ```bash
   cd /home/user/Repository
   docker-compose down
   ./start-all.sh
   ```

2. **Check Docker container status**:
   ```bash
   docker-compose ps
   ```

3. **Check Docker logs**:
   ```bash
   docker-compose logs 3d-visualization
   docker-compose logs content-management-backend
   docker-compose logs constellation-frontend
   ```

### Service-Specific Issues

#### 3D Visualization (Port 8081)

- **Issue**: "The connection was reset"
- **Solution**: 
  - Check that webpack-dev-server is properly configured with host '0.0.0.0'
  - Ensure the correct port mapping in docker-compose.yml (8081:8080)
  - Check container logs for webpack build errors

#### Content Management Backend (Port 3001)

- **Issue**: "Error: ENOENT: no such file or directory, stat '/app/backend/dist/index.html'"
- **Solution**: 
  - The backend is looking for a file that doesn't exist
  - Check that the backend/dist directory exists and contains an index.html
  - Update server.js to better handle missing files

#### Constellation Backend (Port 3003)

- **Issue**: "Cannot GET /"
- **Solution**: 
  - This is normal behavior when accessing without a specific endpoint
  - Try accessing http://localhost:3003/notebooks or http://localhost:3003/pages
  - The API endpoints are working correctly when accessed properly

#### Constellation Frontend (Port 8090)

- **Issue**: "The connection was reset"
- **Solution**: 
  - Check webpack port configuration (should be 9003)
  - Ensure the correct port mapping in docker-compose.yml (8090:9003)
  - Make sure the frontend container is running

### Missing Dependencies

If you encounter missing dependency errors:

```bash
cd /home/user/Repository
# For 3D Visualization
cd WebProjects/3D-Visualization
npm install --save-dev babel-loader @babel/core @babel/preset-env file-loader css-minimizer-webpack-plugin

# For Constellation Viewer
cd ../Constellation-Viewer
npm install --save-dev babel-loader @babel/core @babel/preset-env
```

### Port Conflicts

If ports are already in use on your system:

1. **Check for port usage**:
   ```bash
   netstat -tulpn | grep LISTEN
   ```

2. **Edit docker-compose.yml** to use different ports if needed.

## Verifying Project Integration

Run the verification script to check the integration of components:

```bash
cd /home/user/Repository
./verify-notebook-integration.sh
```

## Debugging Tips

1. **Check for JavaScript console errors** in your browser when accessing frontends.
2. **Ensure CORS is properly configured** if frontend can't connect to backend.
3. **Validate volume mounts** in Docker to ensure files are accessible.
4. **Check for Node.js version compatibility** issues.

## Support

If issues persist after trying these troubleshooting steps, check the project documentation or create an issue in the project repository.