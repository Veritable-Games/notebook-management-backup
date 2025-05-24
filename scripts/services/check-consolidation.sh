#!/bin/bash

# Check if the consolidated interfaces are accessible

echo "Checking consolidated interfaces..."

# Check the unified wiki interface
echo -n "Unified Wiki Interface (http://localhost:3003/wiki): "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3003/wiki
echo ""

# Check the 3D visualization
echo -n "3D Visualization (http://localhost:3003/3d): "
curl -s -o /dev/null -w "%{http_code}" http://localhost:3003/3d
echo ""

# Check if the old endpoints redirect properly
echo -n "Simple Interface Redirect (http://localhost:3003/simple): "
curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3003/simple
echo ""

echo -n "Enhanced Wiki Redirect (http://localhost:3003/enhanced): "
curl -s -o /dev/null -w "%{http_code}" -L http://localhost:3003/enhanced
echo ""

echo "Note: 404 means the endpoint is not available yet"
echo "      200 means the endpoint is working properly"
echo "      302/301 means redirect is working properly"

echo ""
echo "The consolidation plan is in /home/user/consolidation-plan.md"
echo "To implement it, run: /home/user/implement-consolidation.sh"