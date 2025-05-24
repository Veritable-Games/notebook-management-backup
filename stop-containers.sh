#!/bin/bash
# stop-containers.sh - Stop all Repository services

echo "🛑 Stopping all Repository services..."

docker-compose down

echo "✅ All services stopped."
echo ""
echo "💡 To start again: ./start-containers.sh"
echo "🗑️  To remove volumes: docker-compose down -v"
echo ""