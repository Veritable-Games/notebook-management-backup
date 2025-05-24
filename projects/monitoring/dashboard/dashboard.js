// Dashboard controller script

// Load and display the status data
function loadStatusData() {
  fetch('status.json')
    .then(response => response.json())
    .then(data => {
      const dashboard = document.getElementById('app-dashboard');
      dashboard.innerHTML = '';
      
      data.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        
        const statusClass = app.status === 'ok' ? 'status-ok' : 
                           app.status === 'error' ? 'status-error' : 'status-unknown';
        
        card.innerHTML = `
          <div class="status-indicator ${statusClass}"></div>
          <h2 class="app-name">${app.name}</h2>
          <div class="app-details">
            <div class="detail-row">
              <span>Status:</span>
              <span>${app.status.toUpperCase()}</span>
            </div>
            <div class="detail-row">
              <span>Process:</span>
              <span>${app.processStatus.toUpperCase()}${app.pid ? ' (PID: '+app.pid+')' : ''}</span>
            </div>
            <div class="detail-row">
              <span>URL:</span>
              <span>${app.url}</span>
            </div>
            <div class="detail-row">
              <span>HTTP Status:</span>
              <span>${app.statusCode || 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span>Response Time:</span>
              <span>${app.responseTime ? Number(app.responseTime).toFixed(3) + 's' : 'N/A'}</span>
            </div>
            <div class="detail-row">
              <span>Port Status:</span>
              <span>${app.portStatus}</span>
            </div>
            ${app.errorMessage ? `
            <div class="detail-row">
              <span>Error:</span>
              <span>${app.errorMessage}</span>
            </div>` : ''}
          </div>
          <div class="action-buttons">
            <button class="action-btn start-btn" onclick="controlService('${app.name}', 'start')">Start</button>
            <button class="action-btn stop-btn" onclick="controlService('${app.name}', 'stop')">Stop</button>
            <button class="action-btn restart-btn" onclick="controlService('${app.name}', 'restart')">Restart</button>
            ${app.logFile ? `<a href="${app.logFile}" class="view-log" target="_blank">View Logs</a>` : ''}
          </div>
        `;
        
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
}

// Auto-refresh functionality
let refreshInterval;

function toggleAutoRefresh() {
  const autoRefresh = document.getElementById('auto-refresh').checked;
  
  if (autoRefresh) {
    refreshInterval = setInterval(() => {
      loadStatusData();
    }, 60000); // Refresh every minute
  } else {
    clearInterval(refreshInterval);
  }
}

// Control service functions
function controlService(service, action) {
  if (confirm(`Are you sure you want to ${action} ${service}?`)) {
    // In a real implementation, this would make an API call
    // For now, we'll just show a message and reload
    alert(`Command sent: ${action} ${service}`);
    loadStatusData();
  }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
  loadStatusData();
  document.getElementById('auto-refresh').checked = true;
  toggleAutoRefresh();
});