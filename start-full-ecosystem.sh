#!/bin/bash

echo "🚀 Starting Repository Hub Full Ecosystem..."

# Kill any existing processes on our ports
echo "🔧 Cleaning up existing processes..."
for port in 3001 3002 8000 8020 8030 8080 8081 8090 4000; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

sleep 2

# Start Backend API (Core service)
echo "📡 Starting Backend API (Port 4000)..."
cd /home/user/Repository/projects/backend-api
node server.js > /tmp/backend-api.log 2>&1 &
echo $! > /tmp/backend-api.pid

# Start Content Management Backend
echo "📝 Starting Content Management Backend (Port 3001)..."
cd /home/user/Repository/projects/content-management/backend
node server.js > /tmp/content-management.log 2>&1 &
echo $! > /tmp/content-management.pid

# Start Repository Hub File Browser
echo "📂 Starting Repository Hub File Browser (Port 3002)..."
cd /home/user/Repository
python3 simple-server.py > /tmp/file-browser.log 2>&1 &
echo $! > /tmp/file-browser.pid

# Start Canvas Application
echo "🎨 Starting Canvas Application (Port 8000)..."
cd /home/user/Repository/projects/canvas-application
if [ -f "vg-canvas.js" ]; then
    node vg-canvas.js > /tmp/canvas.log 2>&1 &
    echo $! > /tmp/canvas.pid
fi

# Start Constellation Viewer
echo "🌌 Starting Constellation Viewer (Port 8020)..."
cd /home/user/Repository/projects/constellation-viewer/backend
node server.js > /tmp/constellation.log 2>&1 &
echo $! > /tmp/constellation.pid

# Start Forum
echo "📋 Starting Forum (Port 8030)..."
cd /home/user/Repository/projects/simple-forum
node server.js > /tmp/forum.log 2>&1 &
echo $! > /tmp/forum.pid

# Start Monitoring Dashboard
echo "📊 Starting Monitoring Dashboard (Port 8080)..."
cd /home/user/Repository/projects/monitoring
if [ -f "dashboard/dashboard.html" ]; then
    python3 -m http.server 8080 > /tmp/monitoring.log 2>&1 &
    echo $! > /tmp/monitoring.pid
fi

# Start User Admin Portal
echo "👥 Starting User Admin Portal (Port 8081)..."
cd /home/user/Repository/projects/user-admin-portal/backend
node server.js > /tmp/user-admin.log 2>&1 &
echo $! > /tmp/user-admin.pid

# Start 3D Visualization
echo "🌐 Starting 3D Visualization (Port 8090)..."
cd /home/user/Repository/projects/3d-visualization
npm run dev > /tmp/3d-viz.log 2>&1 &
echo $! > /tmp/3d-viz.pid

echo "⏳ Waiting for services to start..."
sleep 5

echo ""
echo "✅ Repository Hub Full Ecosystem Started!"
echo ""
echo "🌐 Services Available:"
echo "  📡 Backend API:           http://localhost:4000"
echo "  📝 Content Management:    http://localhost:3001" 
echo "  📂 File Browser:          http://localhost:3002"
echo "  🎨 Canvas Application:    http://localhost:8000"
echo "  🌌 Constellation Viewer:  http://localhost:8020"
echo "  📋 Forum:                 http://localhost:8030"
echo "  📊 Monitoring Dashboard:  http://localhost:8080"
echo "  👥 User Admin Portal:     http://localhost:8081"
echo "  🌐 3D Visualization:      http://localhost:8090"
echo ""
echo "🎛️  Unified Dashboard:      http://localhost:7000"
echo ""
echo "To stop all services: ./stop-full-ecosystem.sh"