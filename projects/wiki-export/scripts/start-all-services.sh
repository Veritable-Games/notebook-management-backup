#!/bin/bash

# Start All Services Script
# This script will start all the required services with correct port configurations

# Terminal colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting all application services...${NC}"

# Create a directory to store the log files
LOG_DIR="/home/user/Repository/service-logs"
mkdir -p "$LOG_DIR"

# Function to start a service
start_service() {
  local name=$1
  local directory=$2
  local command=$3
  local port=$4
  local log_file="${LOG_DIR}/${name}.log"
  
  echo -e "${YELLOW}Starting ${name} on port ${port}...${NC}"
  
  # Check if port is already in use
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
    echo -e "${RED}Port $port is already in use! Cannot start $name.${NC}"
    return 1
  fi
  
  # Navigate to directory and start service
  cd "$directory" || { echo -e "${RED}Directory $directory does not exist!${NC}"; return 1; }
  
  # Start the service and redirect output to log file
  echo "=== Starting $name at $(date) ===" > "$log_file"
  eval "$command" >> "$log_file" 2>&1 &
  
  # Get process ID
  local pid=$!
  
  # Wait a bit to see if the process stays alive
  sleep 2
  if kill -0 $pid 2>/dev/null; then
    echo -e "${GREEN}${name} started successfully with PID ${pid}${NC}"
    echo $pid > "${LOG_DIR}/${name}.pid"
    return 0
  else
    echo -e "${RED}Failed to start ${name}!${NC}"
    echo "Check the log file at $log_file for details."
    return 1
  fi
}

# Start Content Management Backend
start_service "CM-Backend" "/home/user/Repository/WebProjects/Content-Management/backend" \
  "PORT=3001 npx next dev" 3001

# Start Content Management Frontend
start_service "CM-Frontend" "/home/user/Repository/WebProjects/Content-Management/frontend" \
  "PORT=3002 npx next dev" 3002

# Start Constellation Viewer Backend
start_service "CV-Backend" "/home/user/Repository/WebProjects/Constellation-Viewer/backend" \
  "node server.js" 3003

# Start Constellation Viewer Frontend
start_service "CV-Frontend" "/home/user/Repository/WebProjects/Constellation-Viewer/frontend" \
  "npx webpack serve --open --config webpack.config.js --port 9003" 9003

echo -e "${BLUE}All services started. You can monitor them with ./enhanced-visual-feedback.sh${NC}"
echo -e "Log files are available in ${LOG_DIR}"

# Create a stop script for convenience
cat > "/home/user/Repository/WebProjects/wiki-export/scripts/stop-all-services.sh" << 'EOL'
#!/bin/bash

# Stop All Services Script
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

LOG_DIR="/home/user/Repository/service-logs"

echo -e "${BLUE}Stopping all application services...${NC}"

# Function to stop a service
stop_service() {
  local name=$1
  local pid_file="${LOG_DIR}/${name}.pid"
  
  if [ -f "$pid_file" ]; then
    local pid=$(cat "$pid_file")
    echo -e "${YELLOW}Stopping ${name} (PID: ${pid})...${NC}"
    
    if kill -0 $pid 2>/dev/null; then
      kill $pid
      sleep 1
      if kill -0 $pid 2>/dev/null; then
        echo -e "${RED}Force killing ${name} (PID: ${pid})...${NC}"
        kill -9 $pid 2>/dev/null
      fi
      echo -e "${GREEN}${name} stopped successfully${NC}"
    else
      echo -e "${YELLOW}${name} (PID: ${pid}) is not running${NC}"
    fi
    
    rm -f "$pid_file"
  else
    echo -e "${YELLOW}No PID file found for ${name}${NC}"
  fi
}

# Stop all services
stop_service "CM-Backend"
stop_service "CM-Frontend"
stop_service "CV-Backend"
stop_service "CV-Frontend"

echo -e "${BLUE}All services stopped${NC}"
EOL

# Make the stop script executable
chmod +x "/home/user/Repository/WebProjects/wiki-export/scripts/stop-all-services.sh"

echo -e "${GREEN}Created stop script at /home/user/Repository/WebProjects/wiki-export/scripts/stop-all-services.sh${NC}"

# Update enhanced-visual-feedback.sh to match the correct ports
cat > "/home/user/Repository/WebProjects/wiki-export/scripts/config/app-config.json" << 'EOL'
{
  "applications": [
    {
      "name": "3D-Visualization",
      "port": 8081,
      "endpoint": "/"
    },
    {
      "name": "CM-Backend",
      "port": 3001,
      "endpoint": "/"
    },
    {
      "name": "CM-Frontend",
      "port": 3002,
      "endpoint": "/"
    },
    {
      "name": "CV-Backend",
      "port": 3003,
      "endpoint": "/api"
    },
    {
      "name": "CV-Frontend",
      "port": 9003,
      "endpoint": "/"
    },
    {
      "name": "PS2-Forum",
      "port": 8000,
      "endpoint": "/"
    },
    {
      "name": "Wiki-Export",
      "port": 8080,
      "endpoint": "/"
    }
  ]
}
EOL

# Create directory for config
mkdir -p "/home/user/Repository/WebProjects/wiki-export/scripts/config"

# Update enhanced-visual-feedback.sh to read from config file
sed -i 's/APPLICATIONS=(.*)/# Load applications from config file\nAPP_CONFIG="\/home\/user\/Repository\/WebProjects\/wiki-export\/scripts\/config\/app-config.json"\nif [ -f "$APP_CONFIG" ]; then\n  APPLICATIONS=($(cat "$APP_CONFIG" | jq -r ".applications[] | .name+\"|\"+(.port|tostring)+\"|\"+.endpoint+\"|5\""))\nelse\n  # Fallback to hardcoded list\n  APPLICATIONS=(\n    "3D-Visualization|8081|\/|5"\n    "CM-Backend|3001|\/|5"\n    "CM-Frontend|3002|\/|5"\n    "CV-Backend|3003|\/api|5"\n    "CV-Frontend|9003|\/|5"\n    "PS2-Forum|8000|\/|5"\n    "Wiki-Export|8080|\/|5"\n  )\nfi/g' "/home/user/Repository/WebProjects/wiki-export/scripts/enhanced-visual-feedback.sh"