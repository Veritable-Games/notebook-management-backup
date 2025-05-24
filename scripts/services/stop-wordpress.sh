#!/bin/bash

# Stop WordPress services (ports 8001 and 8020)
echo "Stopping WordPress services on ports 8001 and 8020..."

# Find Docker containers running on these ports
PS2_CONTAINER=$(docker ps | grep -E "8001->80" | awk '{print $1}')
PLUGINS_CONTAINER=$(docker ps | grep -E "8020->80" | awk '{print $1}')

# Stop PS2 Forum container
if [ ! -z "$PS2_CONTAINER" ]; then
  echo "Stopping PS2 Forum container: $PS2_CONTAINER"
  docker stop $PS2_CONTAINER
else
  echo "No PS2 Forum container found running on port 8001"
fi

# Stop Forum Plugins container
if [ ! -z "$PLUGINS_CONTAINER" ]; then
  echo "Stopping Forum Plugins container: $PLUGINS_CONTAINER"
  docker stop $PLUGINS_CONTAINER
else
  echo "No Forum Plugins container found running on port 8020"
fi

# Check if we should remove volumes
read -p "Do you want to remove WordPress data volumes? (y/n): " REMOVE_VOLUMES

if [ "$REMOVE_VOLUMES" = "y" ]; then
  echo "Removing WordPress data volumes..."
  docker volume rm ps2forum_db_data
  docker volume rm forum_plugins_db_data
  echo "WordPress data volumes removed"
fi

echo "WordPress services stopped successfully"