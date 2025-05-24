#!/bin/bash

# Service Monitoring Dashboard
# Provides a visual dashboard for monitoring service status

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"
SERVICE_CONTROL="$SCRIPT_DIR/../bin/service-control.sh"
DASHBOARD_DIR="/home/user/Repository/feedback"
LOG_DIR="/home/user/Repository/service-logs"

# Create dashboard directories
mkdir -p "$DASHBOARD_DIR" "$DASHBOARD_DIR/logs"

# Function to generate the dashboard HTML
generate_dashboard() {
  local timestamp=$(date)
  local dashboard_file="$DASHBOARD_DIR/dashboard.html"
  local json_file="$DASHBOARD_DIR/status.json"
  
  echo -e "${BLUE}Generating service status dashboard...${NC}"
  
  # Start JSON array
  echo "[" > "$json_file"
  
  # Get all services
  local services=$(jq -r '.services[].name' "$CONFIG_DIR/services.json")
  local first=true
  
  # Process each service
  for service in $services; do
    if $first; then
      first=false
    else
      echo "," >> "$json_file"
    fi
    
    local port=$(jq -r ".services[] | select(.name==\"$service\") | .port" "$CONFIG_DIR/services.json")
    local endpoint=$(jq -r ".port_assignments[] | select(.service==\"$service\") | .endpoint" "$CONFIG_DIR/ports.json")
    local pid_file="${LOG_DIR}/${service}.pid"
    local log_file="${LOG_DIR}/${service}.log"
    local dash_log="${DASHBOARD_DIR}/logs/${service}-$(date +%Y%m%d-%H%M%S).log"
    
    echo -e "${YELLOW}Checking $service on port $port${NC}"
    
    # Check process status
    local process_status="stopped"
    local pid=""
    if [ -f "$pid_file" ]; then
      pid=$(cat "$pid_file")
      if kill -0 $pid 2>/dev/null; then
        process_status="running"
      fi
    fi
    
    # Check port status
    local port_status="closed"
    if lsof -i:$port -sTCP:LISTEN -t >/dev/null 2>&1; then
      port_status="open"
    fi
    
    # Check HTTP status
    local url="http://localhost:${port}${endpoint}"
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 "$url" 2>/dev/null)
    local response_time=$(curl -s -o /dev/null -w "%{time_total}" --max-time 2 "$url" 2>/dev/null || echo "0")
    
    local status_code="$http_code"
    local status="error"
    local is_running="false"
    local error_message=""
    
    if [[ "$http_code" == "200" ]]; then
      status="ok"
      is_running="true"
    elif [[ -n "$http_code" && "$http_code" != "000" ]]; then
      error_message="HTTP Error $http_code"
    else
      error_message="Connection failed"
    fi
    
    # Get content sample for log
    if [[ "$status" == "ok" ]]; then
      curl -s --max-time 2 "$url" | head -n 100 > "$dash_log"
      echo "..." >> "$dash_log"
    fi
    
    # Create status entry
    cat >> "$json_file" << JSON
{
  "name": "$service",
  "url": "$url",
  "status": "$status",
  "statusCode": "$status_code",
  "responseTime": "$response_time",
  "portStatus": "$port_status",
  "processStatus": "$process_status",
  "pid": "$pid",
  "isRunning": $is_running,
  "timestamp": "$(date -Iseconds)",
  "logFile": "$([ -f "$log_file" ] && echo "$log_file" || echo "")",
  "dashLog": "$dash_log",
  "errorMessage": "$error_message"
}
JSON
  done
  
  # End JSON array
  echo "]" >> "$json_file"
  
  # Generate HTML dashboard
  cat > "$dashboard_file" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Status Dashboard</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f5f5;
      color: #333;
    }
    h1 {
      margin-top: 0;
      color: #2c3e50;
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .app-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    .status-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 100%;
    }
    .status-ok {
      background-color: #2ecc71;
    }
    .status-error {
      background-color: #e74c3c;
    }
    .status-unknown {
      background-color: #f39c12;
    }
    .app-name {
      font-weight: bold;
      font-size: 18px;
      margin: 0 0 15px 0;
    }
    .app-details {
      margin-bottom: 15px;
      font-size: 14px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
    .view-log {
      display: inline-block;
      margin-top: 10px;
      padding: 5px 10px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 12px;
    }
    .action-btn {
      display: inline-block;
      margin-top: 10px;
      margin-right: 5px;
      padding: 5px 10px;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 12px;
      border: none;
      cursor: pointer;
    }
    .start-btn {
      background-color: #2ecc71;
    }
    .stop-btn {
      background-color: #e74c3c;
    }
    .restart-btn {
      background-color: #f39c12;
    }
    .refresh-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .refresh-btn {
      padding: 8px 16px;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .auto-refresh {
      display: flex;
      align-items: center;
    }
    .timestamp {
      color: #7f8c8d;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="refresh-container">
    <h1>Service Status Dashboard</h1>
    <div>
      <button class="refresh-btn" onclick="location.reload()">Refresh Now</button>
      <div class="auto-refresh">
        <input type="checkbox" id="auto-refresh" onchange="toggleAutoRefresh()">
        <label for="auto-refresh">Auto refresh every minute</label>
      </div>
    </div>
  </div>
  
  <div class="timestamp">Last updated: <span id="last-updated"></span></div>
  
  <div class="dashboard" id="app-dashboard">
    <!-- App cards will be inserted here -->
  </div>

  <script>
    // Load and display the status data
    fetch('${json_file}')
      .then(response => response.json())
      .then(data => {
        const dashboard = document.getElementById('app-dashboard');
        dashboard.innerHTML = '';
        
        data.forEach(app => {
          const card = document.createElement('div');
          card.className = 'app-card';
          
          const statusClass = app.status === 'ok' ? 'status-ok' : 
                              app.status === 'error' ? 'status-error' : 'status-unknown';
          
          card.innerHTML = \`
            <div class="status-indicator \${statusClass}"></div>
            <h2 class="app-name">\${app.name}</h2>
            <div class="app-details">
              <div class="detail-row">
                <span>Status:</span>
                <span>\${app.status.toUpperCase()}</span>
              </div>
              <div class="detail-row">
                <span>Process:</span>
                <span>\${app.processStatus.toUpperCase()}\${app.pid ? ' (PID: '+app.pid+')' : ''}</span>
              </div>
              <div class="detail-row">
                <span>URL:</span>
                <span>\${app.url}</span>
              </div>
              <div class="detail-row">
                <span>HTTP Status:</span>
                <span>\${app.statusCode || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Response Time:</span>
                <span>\${app.responseTime ? Number(app.responseTime).toFixed(3) + 's' : 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Port Status:</span>
                <span>\${app.portStatus}</span>
              </div>
              \${app.errorMessage ? \`
              <div class="detail-row">
                <span>Error:</span>
                <span>\${app.errorMessage}</span>
              </div>\` : ''}
            </div>
            <div class="action-buttons">
              <button class="action-btn start-btn" onclick="controlService('\${app.name}', 'start')">Start</button>
              <button class="action-btn stop-btn" onclick="controlService('\${app.name}', 'stop')">Stop</button>
              <button class="action-btn restart-btn" onclick="controlService('\${app.name}', 'restart')">Restart</button>
              \${app.logFile ? \`<a href="file://\${app.logFile}" class="view-log">View Logs</a>\` : ''}
            </div>
          \`;
          
          dashboard.appendChild(card);
        });
        
        // Update timestamp
        document.getElementById('last-updated').textContent = new Date().toLocaleString();
      })
      .catch(error => {
        console.error('Error loading status data:', error);
        document.getElementById('app-dashboard').innerHTML = 
          '<p>Error loading status data. Please try refreshing the page.</p>';
      });
    
    // Auto-refresh functionality
    let refreshInterval;
    
    function toggleAutoRefresh() {
      const autoRefresh = document.getElementById('auto-refresh').checked;
      
      if (autoRefresh) {
        refreshInterval = setInterval(() => {
          location.reload();
        }, 60000); // Refresh every minute
      } else {
        clearInterval(refreshInterval);
      }
    }
    
    // Control service functions
    function controlService(service, action) {
      if (confirm(\`Are you sure you want to \${action} \${service}?\`)) {
        // In a real implementation, this would make an API call
        // For now, we'll just show a message and reload
        alert(\`Command sent: \${action} \${service}\`);
        location.reload();
      }
    }
  </script>
</body>
</html>
HTML
  
  echo -e "${GREEN}Dashboard generated at $dashboard_file${NC}"
  
  # Open the dashboard in a browser if available
  if command -v xdg-open > /dev/null; then
    xdg-open "$dashboard_file" &
  elif command -v open > /dev/null; then
    open "$dashboard_file" &
  else
    echo -e "${YELLOW}Dashboard ready at: file://$dashboard_file${NC}"
  fi
}

# Function to display dashboard in terminal
display_terminal_dashboard() {
  clear
  echo -e "${BOLD}${CYAN}=== SERVICE STATUS DASHBOARD ===${NC}"
  echo -e "${CYAN}Updated: $(date)${NC}"
  echo
  
  # Get all services
  local services=$(jq -r '.services[].name' "$CONFIG_DIR/services.json")
  
  # Table header
  printf "${BOLD}%-20s %-10s %-10s %-15s %-10s${NC}\n" "SERVICE" "PROCESS" "PORT" "HTTP" "RESPONSE"
  printf "%.120s\n" "================================================================================"
  
  # Process each service
  for service in $services; do
    local port=$(jq -r ".services[] | select(.name==\"$service\") | .port" "$CONFIG_DIR/services.json")
    local endpoint=$(jq -r ".port_assignments[] | select(.service==\"$service\") | .endpoint" "$CONFIG_DIR/ports.json")
    local pid_file="${LOG_DIR}/${service}.pid"
    
    # Check process status
    local process_status="stopped"
    if [ -f "$pid_file" ]; then
      local pid=$(cat "$pid_file")
      if kill -0 $pid 2>/dev/null; then
        process_status="running"
      fi
    fi
    
    # Check port status
    local port_status="closed"
    if lsof -i:$port -sTCP:LISTEN -t >/dev/null 2>&1; then
      port_status="open"
    fi
    
    # Check HTTP status
    local url="http://localhost:${port}${endpoint}"
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 2 "$url" 2>/dev/null)
    local response_time=$(curl -s -o /dev/null -w "%{time_total}" --max-time 2 "$url" 2>/dev/null || echo "0")
    
    # Format status colors
    if [[ "$process_status" == "running" ]]; then
      process_color="${GREEN}"
    else
      process_color="${RED}"
    fi
    
    if [[ "$port_status" == "open" ]]; then
      port_color="${GREEN}"
    else
      port_color="${RED}"
    fi
    
    if [[ "$http_code" == "200" ]]; then
      http_color="${GREEN}"
      http_status="OK (200)"
    elif [[ -n "$http_code" && "$http_code" != "000" ]]; then
      http_color="${YELLOW}"
      http_status="ERROR ($http_code)"
    else
      http_color="${RED}"
      http_status="NO RESPONSE"
    fi
    
    # Print service row
    printf "%-20s ${process_color}%-10s${NC} ${port_color}%-10s${NC} ${http_color}%-15s${NC} %-10s\n" \
      "$service" "$process_status" "$port_status" "$http_status" "${response_time}s"
  done
  
  echo
  echo -e "${YELLOW}Press 'r' to refresh, 'q' to quit, or any other key to open HTML dashboard${NC}"
}

# Check for command line arguments
if [[ "$1" == "--terminal" || "$1" == "-t" ]]; then
  # Run in terminal mode with interactive controls
  while true; do
    display_terminal_dashboard
    
    # Wait for keypress
    read -n 1 -s key
    
    if [[ "$key" == "q" ]]; then
      echo -e "${BLUE}Exiting dashboard.${NC}"
      exit 0
    elif [[ "$key" == "r" ]]; then
      continue
    else
      # Any other key opens the HTML dashboard
      generate_dashboard
      break
    fi
  done
else
  # Default to HTML dashboard
  generate_dashboard
fi