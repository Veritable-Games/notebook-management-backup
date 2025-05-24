#!/bin/bash

# Navigate to the config directory
cd "$(dirname "$0")/config"

# Start the WordPress and database containers
docker-compose up -d

echo "
Forum Plugins demo is now running!
Access at: http://localhost:8020

Admin URL: http://localhost:8020/wp-admin
Default credentials:
  Username: admin
  Password: password (change this immediately in production)

Use 'docker-compose logs -f' to see logs
Use 'docker-compose down' to stop all services
"