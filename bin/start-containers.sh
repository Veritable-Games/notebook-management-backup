#!/bin/bash
# start-containers.sh - Start all Repository services using Docker

echo "🚀 Starting all Repository services with Docker..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start all services
docker-compose up -d --build

echo ""
echo "✅ All services are starting up!"
echo ""
echo "📊 Service URLs:"
echo "  • Backend API:         http://localhost:3001"
echo "  • 3D Visualization:    http://localhost:8081"
echo "  • Content Management:  http://localhost:3003"
echo "  • Content Backend:     http://localhost:3002"
echo "  • Constellation Wiki:  http://localhost:8090"
echo "  • User Admin Portal:   http://localhost:8100"
echo "  • PS2 Era Forum:       http://localhost:8030"
echo "  • Monitoring:          http://localhost:9090"
echo ""
echo "📝 View logs with:       docker-compose logs -f [service-name]"
echo "🛑 Stop all services:    docker-compose down"
echo "🔄 Restart service:      docker-compose restart [service-name]"
echo ""