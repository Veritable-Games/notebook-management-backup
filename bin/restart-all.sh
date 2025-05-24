#!/bin/bash
# restart-all.sh - Restart all Veritable Games services
# Usage: ./restart-all.sh

# Use the new service manager to restart all services
./service-manager.sh restart

echo ""
echo "All services restarted. View logs in projects/logs/"
echo "View service status with: ./service-manager.sh status"
echo "Access the monitoring dashboard at: http://localhost:9090/dashboard.html"
echo ""
echo "To stop all services, run: ./stop-all.sh"