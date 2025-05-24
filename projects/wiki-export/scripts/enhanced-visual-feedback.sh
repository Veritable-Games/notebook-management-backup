#!/bin/bash

# Enhanced Visual Feedback Script
# This script provides comprehensive status monitoring for multiple applications
# with improved visual feedback and error handling

# Configuration
FEEDBACK_DIR="/home/user/Repository/feedback"
HTML_REPORT="${FEEDBACK_DIR}/dashboard.html"
JSON_REPORT="${FEEDBACK_DIR}/status.json"
LOG_DIR="${FEEDBACK_DIR}/logs"

# Ensure directories exist
mkdir -p "$FEEDBACK_DIR" "$LOG_DIR"

# Color codes for terminal output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Applications to monitor - format: "name|port|endpoint|timeout"
APPLICATIONS=(
  "3D-Visualization|8081|/|5"
  "CM-Backend|3001|/|5"
  "CM-Frontend|3002|/|5"
  "CV-Backend|3002|/api|5"
  "CV-Frontend|9003|/|5"
  "PS2-Forum|8000|/|5"
  "Wiki-Export|8080|/|5"
)

# Function to check if a port is in use
is_port_in_use() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    return 0  # Port is in use (success)
  else
    return 1  # Port is not in use (failure)
  fi
}

# Function to capture application status with improved error handling
capture_app_status() {
  local app_info=$1
  local name=$(echo "$app_info" | cut -d'|' -f1)
  local port=$(echo "$app_info" | cut -d'|' -f2)
  local endpoint=$(echo "$app_info" | cut -d'|' -f3)
  local timeout=$(echo "$app_info" | cut -d'|' -f4)
  
  local timestamp=$(date +"%Y%m%d-%H%M%S")
  local log_file="${LOG_DIR}/${name}-${timestamp}.log"
  local url="http://localhost:${port}${endpoint}"
  
  echo -e "${BLUE}Checking ${name}${NC} (${url})"
  
  # Initialize status variables
  local status="unknown"
  local status_code=""
  local response_time=""
  local is_running="false"
  local port_status="closed"
  local error_message=""
  
  # Check if port is open
  if is_port_in_use "$port"; then
    port_status="open"
  fi
  
  # Try to fetch the status with timeout
  local start_time=$(date +%s.%N)
  local curl_output=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$timeout" "$url" 2>/dev/null)
  local end_time=$(date +%s.%N)
  
  # Calculate response time
  response_time=$(echo "$end_time - $start_time" | bc)
  
  # Check status code
  if [[ -n "$curl_output" ]]; then
    status_code=$curl_output
    
    if [[ "$status_code" == "200" ]]; then
      status="ok"
      is_running="true"
      echo -e "${GREEN}✅ ${name} is running${NC} (HTTP $status_code, ${response_time}s)"
    else
      status="error"
      is_running="false"
      error_message="HTTP Error $status_code"
      echo -e "${RED}❌ ${name} returned error${NC} (HTTP $status_code, ${response_time}s)"
    fi
  else
    status="error"
    is_running="false"
    error_message="Connection failed"
    echo -e "${RED}❌ ${name} is not responding${NC} (Connection timeout after ${timeout}s)"
  fi
  
  # Get first 100 lines of HTML content for logging
  if [[ "$status" == "ok" ]]; then
    echo -e "${YELLOW}Capturing content sample...${NC}"
    curl -s --max-time "$timeout" "$url" | head -n 100 > "$log_file"
    echo -e "..." >> "$log_file"
  fi
  
  # Log detailed information
  {
    echo "===== $name Status Report ====="
    echo "Timestamp: $(date)"
    echo "URL: $url"
    echo "Status: $status"
    echo "HTTP Status: $status_code"
    echo "Response Time: ${response_time}s"
    echo "Port Status: $port_status"
    echo "Is Running: $is_running"
    
    if [[ -n "$error_message" ]]; then
      echo "Error: $error_message"
    fi
    
    echo -e "\nDetailed connection information:"
    curl -s -v --max-time "$timeout" "$url" 2>&1 | grep -v "^{.*$" | grep -v "^}.*$"
    
    echo -e "\n================================"
  } >> "$log_file"
  
  # Return JSON for this application (to be used in summary)
  echo "{\"name\":\"$name\",\"url\":\"$url\",\"status\":\"$status\",\"statusCode\":\"$status_code\",\"responseTime\":\"$response_time\",\"portStatus\":\"$port_status\",\"isRunning\":$is_running,\"timestamp\":\"$(date -Iseconds)\",\"logFile\":\"$log_file\",\"errorMessage\":\"$error_message\"}"
}

# Start the status capture process
echo -e "${BLUE}Starting enhanced visual feedback capture...${NC}"
echo "Timestamp: $(date)"
echo ""

# Capture status for all applications and build JSON
echo "[" > "$JSON_REPORT"
first=true

for app in "${APPLICATIONS[@]}"; do
  if $first; then
    first=false
  else
    echo "," >> "$JSON_REPORT"
  fi
  
  # Capture status and append to JSON
  capture_app_status "$app" >> "$JSON_REPORT"
done

echo "]" >> "$JSON_REPORT"

# Generate HTML dashboard
cat > "$HTML_REPORT" << HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Status Dashboard</title>
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
    <h1>Application Status Dashboard</h1>
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
    fetch('${JSON_REPORT}')
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
                <span>URL:</span>
                <span>\${app.url}</span>
              </div>
              <div class="detail-row">
                <span>HTTP Status:</span>
                <span>\${app.statusCode || 'N/A'}</span>
              </div>
              <div class="detail-row">
                <span>Response Time:</span>
                <span>\${app.responseTime ? app.responseTime + 's' : 'N/A'}</span>
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
            <a href="file://\${app.logFile}" class="view-log">View Details</a>
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
  </script>
</body>
</html>
HTML

echo -e "${GREEN}Visual feedback capture complete.${NC}"
echo "Dashboard: $HTML_REPORT"
echo "JSON Status: $JSON_REPORT"
echo "Log files: $LOG_DIR"

# Open the dashboard in the default browser
if command -v xdg-open > /dev/null; then
  xdg-open "$HTML_REPORT" &
elif command -v open > /dev/null; then
  open "$HTML_REPORT" &
fi

exit 0