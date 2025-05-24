#!/bin/bash

# Service Dashboard for Projects
# This script provides a visual representation of running services

echo "=============================================="
echo "🚀 PROJECT SERVICES DASHBOARD"
echo "=============================================="

check_port() {
    nc -z localhost $1 > /dev/null 2>&1
    return $?
}

display_service() {
    local name=$1
    local port=$2
    local url=$3
    local description=$4
    
    echo -n "📌 $name ($port): "
    if check_port $port; then
        echo -e "\e[32m✅ RUNNING\e[0m"
        echo "   🔗 $url"
        echo "   🔍 $description"
    else
        echo -e "\e[31m❌ STOPPED\e[0m"
        echo "   🔗 $url (unavailable)"
        echo "   🔍 $description"
    fi
    echo
}

# Content Management System
echo "📦 CONTENT MANAGEMENT SYSTEM"
display_service "Backend API" 3001 "http://localhost:3001" "REST API for content management"
display_service "Frontend" 3002 "http://localhost:3002" "Web interface for content management"

# Constellation Viewer
echo "📦 CONSTELLATION VIEWER"
display_service "Backend API" 3003 "http://localhost:3003" "API for notebook/wiki data"
display_service "Frontend" 9003 "http://localhost:9003" "Enhanced notebook browser"

# 3D Visualization
echo "📦 3D VISUALIZATION"
display_service "3D Viewer" 8081 "http://localhost:8081" "Interactive 3D visualization tool"

# Wiki Export
echo "📦 WIKI EXPORT"
display_service "Wiki Export" 8080 "http://localhost:8080" "Wiki export interface"

echo "=============================================="
echo "⚙️  SERVICE MANAGEMENT OPTIONS"
echo "=============================================="
echo "To start all services:"
echo "  /home/user/Repository/WebProjects/wiki-export/scripts/start-all-services.sh"
echo
echo "To stop all services:"
echo "  /home/user/Repository/WebProjects/wiki-export/scripts/stop-all-services.sh"
echo
echo "To use the service manager:"
echo "  /home/user/Repository/WebProjects/wiki-export/scripts/service-manager"
echo "=============================================="