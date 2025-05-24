/**
 * PS2-Era Forum Implementation with Multi-Dimensional Feedback
 * This is a complete implementation for integrating into your WordPress + bbPress setup
 */

// Main configuration objects
const CONFIG = {
  // Feedback dimensions for posts/threads
  feedbackDimensions: [
    {
      id: 'thoughtfulness',
      label: 'Thoughtfulness',
      description: 'How well-considered is this contribution?',
      icon: 'brain',
      colors: { low: '#f0f0f0', high: '#3498db' }
    },
    {
      id: 'evidence',
      label: 'Evidence-Based',
      description: 'How well is this supported by evidence?',
      icon: 'scale-balanced',
      colors: { low: '#f0f0f0', high: '#27ae60' }
    },
    {
      id: 'perspective',
      label: 'New Perspective',
      description: 'Does this provide a fresh viewpoint?',
      icon: 'lightbulb',
      colors: { low: '#f0f0f0', high: '#9b59b6' }
    },
    {
      id: 'clarity',
      label: 'Clarity',
      description: 'How clear and understandable is this?',
      icon: 'glasses',
      colors: { low: '#f0f0f0', high: '#f1c40f' }
    },
    {
      id: 'helpfulness',
      label: 'Helpfulness',
      description: 'How useful is this for the community?',
      icon: 'hands-helping',
      colors: { low: '#f0f0f0', high: '#e74c3c' }
    }
  ],
  
  // Content tags for categorization
  contentTags: [
    { id: 'informative', label: 'Informative', icon: 'info-circle' },
    { id: 'question', label: 'Question', icon: 'question-circle' },
    { id: 'experience', label: 'Personal Experience', icon: 'user' },
    { id: 'creative', label: 'Creative', icon: 'paintbrush' },
    { id: 'technical', label: 'Technical', icon: 'code' },
    { id: 'critique', label: 'Constructive Critique', icon: 'comments' },
    { id: 'resource', label: 'Resource', icon: 'book' },
    { id: 'offtopic', label: 'Off-Topic', icon: 'arrow-turn-right' },
    { id: 'important', label: 'Important', icon: 'exclamation-circle' },
    { id: 'announcement', label: 'Announcement', icon: 'bullhorn' },
    { id: 'solved', label: 'Solved', icon: 'check-circle' }
  ],
  
  // Election system configuration
  electionSystem: {
    votingPeriodDays: 7,
    termsMonths: 3,
    candidateRequirements: {
      minimumPosts: 50,
      minimumJoinedDays: 30,
      minimumReputationScore: 100
    },
    // Number of ranked choices allowed
    maxRankedChoices: 5 
  },
  
  // In-game integration settings
  gameIntegration: {
    // How often to refresh game data (milliseconds)
    refreshInterval: 60000,
    // Game world coordinate system bounds
    worldBounds: {
      x: { min: -10000, max: 10000 },
      y: { min: -10000, max: 10000 },
      z: { min: -10000, max: 10000 }
    }
  },
  
  // Moderation transparency settings
  moderationTransparency: {
    // Actions that are logged publicly
    publicActions: ['post_remove', 'thread_lock', 'thread_sticky', 'user_suspend', 'user_ban'],
    // Time in days before resolved reports are anonymized
    anonymizeAfterDays: 30,
    // Whether to show moderator names on actions (true = show names, false = anonymous)
    showModeratorNames: true
  }
};

/**
 * ==========================================
 * CORE FUNCTIONALITY
 * ==========================================
 */

// Initialize the system when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  initForumSystem();
});

/**
 * Main initialization function for the forum system
 */
function initForumSystem() {
  // Set up forum theme elements
  setupRetroTheme();
  
  // Initialize multi-dimensional feedback
  initFeedbackSystem();
  
  // Set up moderation transparency
  initModerationTransparency();
  
  // Initialize election system
  if (document.querySelector('.election-container')) {
    initElectionSystem();
  }
  
  // Initialize game world integration
  initGameIntegration();
  
  // Set up search functionality
  initSearchSystem();
  
  // Register event listeners
  registerGlobalEventListeners();
  
  console.log('PS2-Era Forum System Initialized');
}

/**
 * ==========================================
 * MULTI-DIMENSIONAL FEEDBACK SYSTEM
 * ==========================================
 */

/**
 * Initialize the multi-dimensional feedback system
 */
function initFeedbackSystem() {
  // Add feedback UI to all forum posts
  document.querySelectorAll('.forum-post').forEach(post => {
    const postId = post.dataset.postId;
    const userId = window.currentUserId || 0; // Get from WordPress
    
    if (!postId) return;
    
    // Skip if user is not logged in and feedback requiring login
    if (userId === 0) return;
    
    // Add feedback UI to post
    addFeedbackUIToPost(post, postId, userId);
    
    // Initialize display of existing feedback
    updatePostFeedbackDisplay(postId);
    updatePostTagsDisplay(postId);
  });
}

/**
 * Add feedback UI elements to a forum post
 */
function addFeedbackUIToPost(postElement, postId, userId) {
  // Create container for feedback controls
  const feedbackContainer = document.createElement('div');
  feedbackContainer.className = 'post-feedback';
  
  // Create toggle button for feedback UI
  const feedbackButton = document.createElement('button');
  feedbackButton.className = 'toggle-feedback-ui retro-button';
  feedbackButton.innerHTML = '<i class="fa fa-star"></i> Give Feedback';
  
  // Create container for the actual feedback UI (hidden by default)
  const feedbackUI = document.createElement('div');
  feedbackUI.className = 'feedback-ui hidden';
  
  // Toggle visibility of feedback UI when button is clicked
  feedbackButton.addEventListener('click', function() {
    feedbackUI.classList.toggle('hidden');
    
    // Change button text based on state
    if (!feedbackUI.classList.contains('hidden')) {
      feedbackButton.innerHTML = '<i class="fa fa-times"></i> Close Feedback';
    } else {
      feedbackButton.innerHTML = '<i class="fa fa-star"></i> Give Feedback';
    }
  });
  
  // Create the feedback UI elements
  feedbackUI.appendChild(createFeedbackUI(postId, userId));
  
  // Add visualization container for showing aggregated feedback
  const visualizationContainer = document.createElement('div');
  visualizationContainer.className = 'feedback-visualization';
  visualizationContainer.id = `feedback-viz-${postId}`;
  
  // Add tags container for showing post tags
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'post-tags';
  tagsContainer.id = `post-tags-${postId}`;
  
  // Append everything to the post
  feedbackContainer.appendChild(feedbackButton);
  feedbackContainer.appendChild(feedbackUI);
  
  // Find the right place to insert the feedback elements
  const postContent = postElement.querySelector('.post-content');
  if (postContent) {
    postContent.appendChild(feedbackContainer);
    postContent.appendChild(visualizationContainer);
    postContent.appendChild(tagsContainer);
  } else {
    // Fallback if post-content not found
    postElement.appendChild(feedbackContainer);
    postElement.appendChild(visualizationContainer);
    postElement.appendChild(tagsContainer);
  }
}

/**
 * Create the feedback UI with dimension sliders and tag buttons
 */
function createFeedbackUI(postId, userId) {
  // Container for the entire feedback component
  const container = document.createElement('div');
  container.className = 'multi-dimensional-feedback';
  
  // Dimension sliders section
  const dimensionsContainer = document.createElement('div');
  dimensionsContainer.className = 'dimensions-container';
  
  // Create a slider for each dimension
  CONFIG.feedbackDimensions.forEach(dimension => {
    const dimensionEl = document.createElement('div');
    dimensionEl.className = 'dimension-slider';
    
    const label = document.createElement('label');
    label.textContent = dimension.label;
    label.title = dimension.description;
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = '50'; // Default value
    slider.dataset.dimension = dimension.id;
    
    // Add event listener to save changes
    slider.addEventListener('change', function() {
      saveDimensionFeedback(postId, userId, dimension.id, this.value);
    });
    
    dimensionEl.appendChild(label);
    dimensionEl.appendChild(slider);
    dimensionsContainer.appendChild(dimensionEl);
  });
  
  // Tags section
  const tagsContainer = document.createElement('div');
  tagsContainer.className = 'tags-container';
  
  const tagsLabel = document.createElement('div');
  tagsLabel.className = 'tags-label';
  tagsLabel.textContent = 'Add tags:';
  tagsContainer.appendChild(tagsLabel);
  
  const tagButtons = document.createElement('div');
  tagButtons.className = 'tag-buttons';
  
  // Create a button for each tag
  CONFIG.contentTags.forEach(tag => {
    const button = document.createElement('button');
    button.className = 'tag-button';
    button.dataset.tagId = tag.id;
    button.innerHTML = `<i class="fa fa-${tag.icon}"></i> ${tag.label}`;
    
    // Add event listener for toggling tags
    button.addEventListener('click', function() {
      toggleTag(postId, userId, tag.id, this);
    });
    
    tagButtons.appendChild(button);
  });
  
  tagsContainer.appendChild(tagButtons);
  
  // Append everything to the container
  container.appendChild(dimensionsContainer);
  container.appendChild(tagsContainer);
  
  return container;
}

/**
 * Save dimension feedback to the server
 */
function saveDimensionFeedback(postId, userId, dimensionId, value) {
  // Use fetch API to send to WordPress REST endpoint
  fetch('/wp-json/forum-feedback/v1/dimension', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce // WordPress security nonce
    },
    body: JSON.stringify({
      post_id: postId,
      dimension_id: dimensionId,
      value: parseInt(value)
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      updatePostFeedbackDisplay(postId);
      
      // Show feedback confirmation
      showNotification('Feedback saved!', 'success');
    }
  })
  .catch(error => {
    console.error('Error saving feedback:', error);
    showNotification('Error saving feedback', 'error');
  });
}

/**
 * Toggle a tag on a post
 */
function toggleTag(postId, userId, tagId, buttonElement) {
  buttonElement.classList.toggle('active');
  const isActive = buttonElement.classList.contains('active');
  
  // Use fetch API to send to WordPress REST endpoint
  fetch('/wp-json/forum-feedback/v1/tag', {
    method: isActive ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce // WordPress security nonce
    },
    body: JSON.stringify({
      post_id: postId,
      tag_id: tagId
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      updatePostTagsDisplay(postId);
      
      // Show tag confirmation
      if (isActive) {
        showNotification(`Tag "${tagId}" added!`, 'success');
      } else {
        showNotification(`Tag "${tagId}" removed!`, 'info');
      }
    }
  })
  .catch(error => {
    console.error('Error updating tag:', error);
    showNotification('Error updating tag', 'error');
  });
}

/**
 * Update the display of post feedback
 */
function updatePostFeedbackDisplay(postId) {
  fetch(`/wp-json/forum-feedback/v1/post/${postId}/feedback`)
    .then(response => response.json())
    .then(data => {
      // Update visualization based on aggregated feedback
      const feedbackContainer = document.querySelector(`#feedback-viz-${postId}`);
      if (feedbackContainer) {
        renderFeedbackVisualization(feedbackContainer, data);
      }
    })
    .catch(error => console.error('Error fetching feedback data:', error));
}

/**
 * Update the display of post tags
 */
function updatePostTagsDisplay(postId) {
  fetch(`/wp-json/forum-feedback/v1/post/${postId}/tags`)
    .then(response => response.json())
    .then(data => {
      // Update tag display
      const tagsContainer = document.querySelector(`#post-tags-${postId}`);
      if (tagsContainer) {
        renderTagsDisplay(tagsContainer, data);
      }
    })
    .catch(error => console.error('Error fetching tag data:', error));
}

/**
 * Render feedback visualization
 */
function renderFeedbackVisualization(container, feedbackData) {
  // Clear the container
  container.innerHTML = '';
  
  // Skip if no feedback data available
  if (!feedbackData || Object.keys(feedbackData).length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-feedback-message';
    emptyMessage.textContent = 'No feedback yet.';
    container.appendChild(emptyMessage);
    return;
  }
  
  // Create a radar/spider chart using SVG
  const dimensions = Object.keys(feedbackData).length;
  const size = 100;
  const centerX = size;
  const centerY = size;
  const radius = 80;
  
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size * 2);
  svg.setAttribute("height", size * 2);
  svg.setAttribute("class", "feedback-chart");
  
  // Draw the base shape and grid lines
  for (let i = 0; i < dimensions; i++) {
    const angle = (i / dimensions) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    // Draw the dimension line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "#ddd");
    line.setAttribute("stroke-width", "1");
    
    svg.appendChild(line);
    
    // Add dimension labels
    const labelX = centerX + (radius + 20) * Math.cos(angle);
    const labelY = centerY + (radius + 20) * Math.sin(angle);
    
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", labelX);
    label.setAttribute("y", labelY);
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("font-size", "10");
    label.setAttribute("fill", "#555");
    
    const dimensionKey = Object.keys(feedbackData)[i];
    const dimensionObj = CONFIG.feedbackDimensions.find(d => d.id === dimensionKey);
    
    if (dimensionObj) {
      label.textContent = dimensionObj.label;
    } else {
      label.textContent = dimensionKey;
    }
    
    svg.appendChild(label);
    
    // Draw grid lines (25%, 50%, 75%)
    for (let j = 1; j <= 3; j++) {
      const gridRadius = radius * (j / 4);
      const gridX = centerX + gridRadius * Math.cos(angle);
      const gridY = centerY + gridRadius * Math.sin(angle);
      
      const gridLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      gridLine.setAttribute("x1", centerX);
      gridLine.setAttribute("y1", centerY);
      gridLine.setAttribute("x2", gridX);
      gridLine.setAttribute("y2", gridY);
      gridLine.setAttribute("stroke", "#eee");
      gridLine.setAttribute("stroke-width", "1");
      gridLine.setAttribute("stroke-dasharray", "2,2");
      
      svg.appendChild(gridLine);
    }
  }
  
  // Draw the data points and polygon
  const points = [];
  let i = 0;
  
  for (const dimension in feedbackData) {
    const value = feedbackData[dimension].average / 100;
    const angle = (i / dimensions) * 2 * Math.PI;
    const x = centerX + (radius * value) * Math.cos(angle);
    const y = centerY + (radius * value) * Math.sin(angle);
    
    points.push([x, y]);
    
    // Add a dot at each data point
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", x);
    dot.setAttribute("cy", y);
    dot.setAttribute("r", "3");
    dot.setAttribute("fill", "#3498db");
    
    svg.appendChild(dot);
    i++;
  }
  
  // Create the polygon
  const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
  polygon.setAttribute("points", points.map(p => p.join(",")).join(" "));
  polygon.setAttribute("fill", "rgba(52, 152, 219, 0.5)");
  polygon.setAttribute("stroke", "#3498db");
  
  svg.appendChild(polygon);
  container.appendChild(svg);
  
  // Add legend with numerical values
  const legend = document.createElement("div");
  legend.className = "feedback-legend";
  
  i = 0;
  for (const dimension in feedbackData) {
    const dimensionObj = CONFIG.feedbackDimensions.find(d => d.id === dimension);
    if (dimensionObj) {
      const item = document.createElement("div");
      item.className = "legend-item";
      item.innerHTML = `<i class="fa fa-${dimensionObj.icon}"></i> ${dimensionObj.label}: ${Math.round(feedbackData[dimension].average)}% (${feedbackData[dimension].count})`;
      legend.appendChild(item);
    }
    i++;
  }
  
  container.appendChild(legend);
}

/**
 * Render tags display
 */
function renderTagsDisplay(container, tagsData) {
  container.innerHTML = '';
  
  if (!tagsData || tagsData.length === 0) {
    return;
  }
  
  const tagsTitle = document.createElement("div");
  tagsTitle.className = "tags-title";
  tagsTitle.textContent = "Tags:";
  container.appendChild(tagsTitle);
  
  tagsData.forEach(tag => {
    const tagObj = CONFIG.contentTags.find(t => t.id === tag.id);
    if (tagObj) {
      const tagEl = document.createElement("span");
      tagEl.className = "post-tag";
      tagEl.innerHTML = `<i class="fa fa-${tagObj.icon}"></i> ${tagObj.label} (${tag.count})`;
      container.appendChild(tagEl);
    }
  });
}

/**
 * ==========================================
 * MODERATION TRANSPARENCY SYSTEM
 * ==========================================
 */

function initModerationTransparency() {
  // Set up the public moderation logs page
  if (document.querySelector('.moderation-logs')) {
    loadModerationLogs();
  }
  
  // Set up the report system
  if (document.querySelector('.report-button')) {
    initReportSystem();
  }
  
  // Set up appeal system
  if (document.querySelector('.appeal-form')) {
    initAppealSystem();
  }
}

function loadModerationLogs() {
  const logsContainer = document.querySelector('.moderation-logs-container');
  if (!logsContainer) return;
  
  fetch('/wp-json/forum-moderation/v1/logs')
    .then(response => response.json())
    .then(logs => {
      renderModerationLogs(logsContainer, logs);
    })
    .catch(error => {
      console.error('Error loading moderation logs:', error);
      logsContainer.innerHTML = '<div class="error-message">Error loading moderation logs</div>';
    });
}

function renderModerationLogs(container, logs) {
  container.innerHTML = '';
  
  if (!logs || logs.length === 0) {
    container.innerHTML = '<div class="empty-message">No moderation actions logged yet.</div>';
    return;
  }
  
  const table = document.createElement('table');
  table.className = 'moderation-logs-table';
  
  // Create table header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Date</th>
      <th>Action</th>
      <th>Details</th>
      ${CONFIG.moderationTransparency.showModeratorNames ? '<th>Moderator</th>' : ''}
      <th>Reason</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Create table body
  const tbody = document.createElement('tbody');
  
  playersData.forEach(player => {
    const row = document.createElement('tr');
    
    // Format location
    const location = `X: ${player.x.toFixed(0)}, Y: ${player.y.toFixed(0)}, Z: ${player.z.toFixed(0)}`;
    
    // Format last seen time
    const lastSeen = player.online 
      ? 'Online Now' 
      : timeSince(new Date(player.last_logout));
    
    row.innerHTML = `
      <td>
        <div class="player-info">
          <img src="${player.avatar_url || '/wp-content/themes/ps2-era-forum/img/default-avatar.png'}" class="player-mini-avatar">
          <a href="/profile/${player.id}">${player.name}</a>
        </div>
      </td>
      <td>
        <span class="status-indicator ${player.online ? 'online' : 'offline'}">
          ${player.online ? 'Online' : 'Offline'}
        </span>
      </td>
      <td>${location}</td>
      <td>${lastSeen}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);
  
  // Add filter controls
  const filterContainer = document.createElement('div');
  filterContainer.className = 'player-filters';
  
  filterContainer.innerHTML = `
    <div class="filter-control">
      <label>
        <input type="checkbox" class="show-online" checked>
        <span>Show Online</span>
      </label>
    </div>
    <div class="filter-control">
      <label>
        <input type="checkbox" class="show-offline" checked>
        <span>Show Offline</span>
      </label>
    </div>
    <div class="filter-control">
      <input type="text" class="player-search" placeholder="Search players...">
    </div>
  `;
  
  // Add filter event listeners
  const showOnlineCheckbox = filterContainer.querySelector('.show-online');
  const showOfflineCheckbox = filterContainer.querySelector('.show-offline');
  const playerSearch = filterContainer.querySelector('.player-search');
  
  showOnlineCheckbox.addEventListener('change', () => filterPlayerTable());
  showOfflineCheckbox.addEventListener('change', () => filterPlayerTable());
  playerSearch.addEventListener('input', () => filterPlayerTable());
  
  // Insert filter container before the table
  container.insertBefore(filterContainer, table);
  
  // Filter function
  function filterPlayerTable() {
    const showOnline = showOnlineCheckbox.checked;
    const showOffline = showOfflineCheckbox.checked;
    const searchTerm = playerSearch.value.toLowerCase();
    
    const rows = tbody.querySelectorAll('tr');
    
    rows.forEach(row => {
      let showRow = true;
      
      // Filter by online status
      const isOnline = row.querySelector('.status-indicator').classList.contains('online');
      if ((isOnline && !showOnline) || (!isOnline && !showOffline)) {
        showRow = false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const playerName = row.querySelector('.player-info a').textContent.toLowerCase();
        if (!playerName.includes(searchTerm)) {
          showRow = false;
        }
      }
      
      // Show or hide the row
      row.style.display = showRow ? '' : 'none';
    });
  }
}
  const tbody = document.createElement('tbody');
  
  logs.forEach(log => {
    const row = document.createElement('tr');
    row.className = `action-type-${log.action_type}`;
    
    // Format date
    const date = new Date(log.timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    
    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${formatActionType(log.action_type)}</td>
      <td>${formatActionDetails(log)}</td>
      ${CONFIG.moderationTransparency.showModeratorNames ? `<td>${log.moderator_name}</td>` : ''}
      <td>${log.reason}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  table.appendChild(tbody);
  container.appendChild(table);
  
  // Add filter controls
  addModerationLogFilters(container, table);
}

function formatActionType(actionType) {
  const actionTypes = {
    'post_remove': 'Post Removed',
    'thread_lock': 'Thread Locked',
    'thread_sticky': 'Thread Stickied',
    'thread_unsticky': 'Thread Unstickied',
    'thread_unlock': 'Thread Unlocked',
    'user_suspend': 'User Suspended',
    'user_ban': 'User Banned',
    'user_warn': 'User Warned',
    'user_unsuspend': 'User Unsuspended',
    'user_unban': 'User Unbanned'
  };
  
  return actionTypes[actionType] || actionType;
}

function formatActionDetails(log) {
  switch (log.action_type) {
    case 'post_remove':
      return `Post #${log.target_id} in thread "${log.target_title}"`;
    case 'thread_lock':
    case 'thread_unlock':
    case 'thread_sticky':
    case 'thread_unsticky':
      return `Thread "${log.target_title}"`;
    case 'user_suspend':
    case 'user_ban':
    case 'user_warn':
    case 'user_unsuspend':
    case 'user_unban':
      return `User "${log.target_name}"${log.duration ? ` for ${log.duration}` : ''}`;
    default:
      return log.target_title || log.target_id;
  }
}

function addModerationLogFilters(container, table) {
  const filterContainer = document.createElement('div');
  filterContainer.className = 'moderation-log-filters';
  
  // Create action type filter
  const actionTypeFilter = document.createElement('select');
  actionTypeFilter.id = 'action-type-filter';
  
  const actionTypes = [
    { value: '', label: 'All Actions' },
    { value: 'post_remove', label: 'Post Removals' },
    { value: 'thread_lock', label: 'Thread Locks' },
    { value: 'thread_sticky', label: 'Thread Stickies' },
    { value: 'user_suspend', label: 'User Suspensions' },
    { value: 'user_ban', label: 'User Bans' }
  ];
  
  actionTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type.value;
    option.textContent = type.label;
    actionTypeFilter.appendChild(option);
  });
  
  // Create date range filter
  const dateRangeFilter = document.createElement('select');
  dateRangeFilter.id = 'date-range-filter';
  
  const dateRanges = [
    { value: '', label: 'All Time' },
    { value: '1', label: 'Today' },
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' }
  ];
  
  dateRanges.forEach(range => {
    const option = document.createElement('option');
    option.value = range.value;
    option.textContent = range.label;
    dateRangeFilter.appendChild(option);
  });
  
  // Add event listeners for filters
  actionTypeFilter.addEventListener('change', () => filterModerationLogs(table));
  dateRangeFilter.addEventListener('change', () => filterModerationLogs(table));
  
  // Add labels and controls to filter container
  filterContainer.innerHTML = `
    <div class="filter-control">
      <label for="action-type-filter">Action Type:</label>
    </div>
    <div class="filter-control">
      <label for="date-range-filter">Time Period:</label>
    </div>
  `;
  
  filterContainer.querySelector('.filter-control:nth-child(1)').appendChild(actionTypeFilter);
  filterContainer.querySelector('.filter-control:nth-child(2)').appendChild(dateRangeFilter);
  
  // Insert filter container before the table
  container.insertBefore(filterContainer, table);
}

function filterModerationLogs(table) {
  const actionTypeFilter = document.getElementById('action-type-filter');
  const dateRangeFilter = document.getElementById('date-range-filter');
  
  const actionType = actionTypeFilter.value;
  const dateRange = parseInt(dateRangeFilter.value) || 0;
  
  // Get all rows except header
  const rows = table.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    let showRow = true;
    
    // Filter by action type
    if (actionType && !row.classList.contains(`action-type-${actionType}`)) {
      showRow = false;
    }
    
    // Filter by date range
    if (dateRange > 0) {
      const dateCell = row.cells[0].textContent;
      const rowDate = new Date(dateCell);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - dateRange);
      
      if (rowDate < cutoffDate) {
        showRow = false;
      }
    }
    
    // Show or hide the row
    row.style.display = showRow ? '' : 'none';
  });
}

function initReportSystem() {
  // Add event listeners to report buttons
  document.querySelectorAll('.report-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.dataset.targetId;
      const targetType = this.dataset.targetType;
      
      if (!targetId || !targetType) return;
      
      openReportDialog(targetId, targetType);
    });
  });
}

function openReportDialog(targetId, targetType) {
  // Create modal dialog
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-content report-dialog">
      <h3>Report ${targetType.charAt(0).toUpperCase() + targetType.slice(1)}</h3>
      <form id="report-form">
        <input type="hidden" name="target_id" value="${targetId}">
        <input type="hidden" name="target_type" value="${targetType}">
        
        <div class="form-group">
          <label for="report-reason">Reason:</label>
          <select id="report-reason" name="reason" required>
            <option value="">-- Select a reason --</option>
            <option value="spam">Spam</option>
            <option value="harassment">Harassment</option>
            <option value="inappropriate">Inappropriate Content</option>
            <option value="offtopic">Off-Topic</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="report-details">Details:</label>
          <textarea id="report-details" name="details" rows="4" required></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button">Cancel</button>
          <button type="submit" class="submit-button">Submit Report</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  modal.querySelector('.cancel-button').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modal.querySelector('#report-form').addEventListener('submit', function(e) {
    e.preventDefault();
    submitReport(this, modal);
  });
}

function submitReport(form, modal) {
  const formData = new FormData(form);
  
  fetch('/wp-json/forum-moderation/v1/report', {
    method: 'POST',
    headers: {
      'X-WP-Nonce': wpApiSettings.nonce
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.body.removeChild(modal);
      showNotification('Report submitted successfully. A moderator will review it.', 'success');
    } else {
      showNotification('Error submitting report: ' + (data.message || 'Unknown error'), 'error');
    }
  })
  .catch(error => {
    console.error('Error submitting report:', error);
    showNotification('Error submitting report. Please try again.', 'error');
  });
}

function initAppealSystem() {
  const appealForm = document.querySelector('.appeal-form');
  if (!appealForm) return;
  
  appealForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('/wp-json/forum-moderation/v1/appeal', {
      method: 'POST',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showNotification('Appeal submitted successfully.', 'success');
        appealForm.reset();
      } else {
        showNotification('Error submitting appeal: ' + (data.message || 'Unknown error'), 'error');
      }
    })
    .catch(error => {
      console.error('Error submitting appeal:', error);
      showNotification('Error submitting appeal. Please try again.', 'error');
    });
  });
}

/**
 * ==========================================
 * ELECTION SYSTEM
 * ==========================================
 */

function initElectionSystem() {
  // Initialize the election page
  if (document.querySelector('.election-container')) {
    loadActiveElection();
  }
  
  // Initialize voting interface if present
  if (document.querySelector('.voting-interface')) {
    initVotingInterface();
  }
  
  // Initialize candidate nomination if present
  if (document.querySelector('.nomination-form')) {
    initNominationForm();
  }
}

function loadActiveElection() {
  const electionContainer = document.querySelector('.election-container');
  if (!electionContainer) return;
  
  fetch('/wp-json/forum-election/v1/active')
    .then(response => response.json())
    .then(data => {
      if (data.active) {
        renderActiveElection(electionContainer, data);
      } else {
        renderNoActiveElection(electionContainer);
      }
    })
    .catch(error => {
      console.error('Error loading election data:', error);
      electionContainer.innerHTML = '<div class="error-message">Error loading election data</div>';
    });
}

function renderActiveElection(container, electionData) {
  // Clear the container
  container.innerHTML = '';
  
  // Create election header
  const header = document.createElement('div');
  header.className = 'election-header';
  
  // Calculate days remaining
  const endDate = new Date(electionData.end_date);
  const today = new Date();
  const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  
  header.innerHTML = `
    <h2>${electionData.title}</h2>
    <div class="election-meta">
      <div class="election-status ${daysRemaining > 0 ? 'active' : 'ended'}">
        ${daysRemaining > 0 ? 'Active' : 'Ended'}
      </div>
      <div class="election-dates">
        <span>Started: ${new Date(electionData.start_date).toLocaleDateString()}</span>
        <span>Ends: ${new Date(electionData.end_date).toLocaleDateString()}</span>
        ${daysRemaining > 0 ? `<span class="days-remaining">${daysRemaining} days remaining</span>` : ''}
      </div>
    </div>
    <div class="election-description">${electionData.description}</div>
  `;
  
  container.appendChild(header);
  
  // Create candidates section
  const candidatesSection = document.createElement('div');
  candidatesSection.className = 'candidates-section';
  
  const candidatesHeader = document.createElement('h3');
  candidatesHeader.textContent = 'Candidates';
  candidatesSection.appendChild(candidatesHeader);
  
  // Create candidates list
  const candidatesList = document.createElement('div');
  candidatesList.className = 'candidates-list';
  
  if (electionData.candidates && electionData.candidates.length > 0) {
    electionData.candidates.forEach(candidate => {
      const candidateCard = document.createElement('div');
      candidateCard.className = 'candidate-card';
      candidateCard.dataset.candidateId = candidate.id;
      
      candidateCard.innerHTML = `
        <div class="candidate-avatar">
          <img src="${candidate.avatar_url || '/wp-content/themes/ps2-era-forum/img/default-avatar.png'}" alt="${candidate.display_name}">
        </div>
        <div class="candidate-info">
          <h4 class="candidate-name">${candidate.display_name}</h4>
          <div class="candidate-meta">
            <span>Member since: ${new Date(candidate.registered_date).toLocaleDateString()}</span>
            <span>Posts: ${candidate.post_count}</span>
          </div>
          <div class="candidate-statement">${candidate.statement}</div>
        </div>
      `;
      
      candidatesList.appendChild(candidateCard);
    });
  } else {
    candidatesList.innerHTML = '<div class="empty-message">No candidates have registered yet.</div>';
  }
  
  candidatesSection.appendChild(candidatesList);
  container.appendChild(candidatesSection);
  
  // Add voting interface if election is active
  if (daysRemaining > 0 && electionData.candidates && electionData.candidates.length > 0) {
    const votingSection = document.createElement('div');
    votingSection.className = 'voting-section';
    
    const votingHeader = document.createElement('h3');
    votingHeader.textContent = 'Cast Your Vote';
    votingSection.appendChild(votingHeader);
    
    // Check if user has already voted
    if (electionData.has_voted) {
      votingSection.innerHTML += `
        <div class="already-voted-message">
          You have already cast your vote in this election.
        </div>
      `;
    } else {
      votingSection.innerHTML += `
        <div class="voting-instructions">
          Rank the candidates by clicking on them in your preferred order.
          You can rank up to ${CONFIG.electionSystem.maxRankedChoices} candidates.
        </div>
        <div class="voting-interface" id="voting-interface">
          <div class="candidates-pool">
            <h4>Available Candidates</h4>
            <ul class="candidate-options">
              ${electionData.candidates.map(candidate => `
                <li class="candidate-option" data-candidate-id="${candidate.id}">
                  ${candidate.display_name}
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="chosen-candidates">
            <h4>Your Ranked Choice</h4>
            <ol class="ranked-candidates"></ol>
          </div>
          <button type="button" class="submit-vote-button">Submit Vote</button>
        </div>
      `;
    }
    
    container.appendChild(votingSection);
    
    // Initialize the voting interface
    if (!electionData.has_voted) {
      initVotingInterface();
    }
  }
  
  // Add nomination form if user is eligible and nomination period is active
  if (electionData.can_nominate && electionData.nomination_active) {
    const nominationSection = document.createElement('div');
    nominationSection.className = 'nomination-section';
    
    const nominationHeader = document.createElement('h3');
    nominationHeader.textContent = 'Nominate Yourself';
    nominationSection.appendChild(nominationHeader);
    
    nominationSection.innerHTML += `
      <div class="nomination-instructions">
        You are eligible to run as a moderator candidate. Submit your nomination below.
      </div>
      <form class="nomination-form">
        <div class="form-group">
          <label for="candidate-statement">Candidate Statement:</label>
          <textarea id="candidate-statement" name="statement" rows="5" 
            placeholder="Explain why you would make a good moderator and what your priorities would be." required></textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="submit-nomination-button">Submit Nomination</button>
        </div>
      </form>
    `;
    
    container.appendChild(nominationSection);
    
    // Initialize the nomination form
    initNominationForm();
  }
}

function renderNoActiveElection(container) {
  container.innerHTML = `
    <div class="no-active-election">
      <h2>No Active Election</h2>
      <p>There is currently no active moderator election. The next election is scheduled to begin soon.</p>
      <p>If you're interested in becoming a moderator, keep an eye on the announcements forum for updates.</p>
    </div>
  `;
}

function initVotingInterface() {
  const votingInterface = document.getElementById('voting-interface');
  if (!votingInterface) return;
  
  const candidateOptions = votingInterface.querySelectorAll('.candidate-option');
  const rankedCandidates = votingInterface.querySelector('.ranked-candidates');
  const submitButton = votingInterface.querySelector('.submit-vote-button');
  
  // Add click event to candidate options
  candidateOptions.forEach(option => {
    option.addEventListener('click', function() {
      const candidateId = this.dataset.candidateId;
      const candidateName = this.textContent.trim();
      
      // Skip if already selected
      if (this.classList.contains('selected')) return;
      
      // Check if we've reached the maximum number of choices
      const currentChoices = rankedCandidates.querySelectorAll('li').length;
      if (currentChoices >= CONFIG.electionSystem.maxRankedChoices) {
        showNotification(`You can only rank up to ${CONFIG.electionSystem.maxRankedChoices} candidates.`, 'warning');
        return;
      }
      
      // Add to ranked list
      const rankedItem = document.createElement('li');
      rankedItem.className = 'ranked-candidate';
      rankedItem.dataset.candidateId = candidateId;
      rankedItem.innerHTML = `
        ${candidateName}
        <button type="button" class="remove-candidate">&times;</button>
      `;
      
      // Add remove button functionality
      rankedItem.querySelector('.remove-candidate').addEventListener('click', function() {
        // Remove from ranked list
        rankedCandidates.removeChild(rankedItem);
        
        // Unselect from options
        const option = document.querySelector(`.candidate-option[data-candidate-id="${candidateId}"]`);
        if (option) {
          option.classList.remove('selected');
        }
      });
      
      rankedCandidates.appendChild(rankedItem);
      this.classList.add('selected');
    });
  });
  
  // Add submit vote functionality
  submitButton.addEventListener('click', function() {
    const rankedChoices = Array.from(rankedCandidates.querySelectorAll('li')).map((item, index) => ({
      candidate_id: item.dataset.candidateId,
      rank: index + 1
    }));
    
    if (rankedChoices.length === 0) {
      showNotification('Please rank at least one candidate before submitting.', 'warning');
      return;
    }
    
    submitVote(rankedChoices);
  });
}

function submitVote(rankedChoices) {
  fetch('/wp-json/forum-election/v1/vote', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce
    },
    body: JSON.stringify({
      ranked_choices: rankedChoices
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showNotification('Your vote has been recorded successfully!', 'success');
      
      // Reload the election interface after a short delay
      setTimeout(() => {
        loadActiveElection();
      }, 1500);
    } else {
      showNotification('Error recording vote: ' + (data.message || 'Unknown error'), 'error');
    }
  })
  .catch(error => {
    console.error('Error submitting vote:', error);
    showNotification('Error submitting vote. Please try again.', 'error');
  });
}

function initNominationForm() {
  const nominationForm = document.querySelector('.nomination-form');
  if (!nominationForm) return;
  
  nominationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const statement = this.querySelector('#candidate-statement').value;
    
    fetch('/wp-json/forum-election/v1/nominate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce
      },
      body: JSON.stringify({
        statement: statement
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showNotification('Your nomination has been submitted successfully!', 'success');
        
        // Reload the election interface after a short delay
        setTimeout(() => {
          loadActiveElection();
        }, 1500);
      } else {
        showNotification('Error submitting nomination: ' + (data.message || 'Unknown error'), 'error');
      }
    })
    .catch(error => {
      console.error('Error submitting nomination:', error);
      showNotification('Error submitting nomination. Please try again.', 'error');
    });
  });
}

/**
 * ==========================================
 * GAME INTEGRATION SYSTEM
 * ==========================================
 */

function initGameIntegration() {
  // Set up the game map if it exists
  if (document.querySelector('.game-world-map')) {
    initGameWorldMap();
  }
  
  // Load player location data if available
  if (document.querySelector('.player-location-data')) {
    loadPlayerLocations();
  }
  
  // Set up in-game event notifications
  initGameEventNotifications();
}

function initGameWorldMap() {
  const mapContainer = document.querySelector('.game-world-map');
  if (!mapContainer) return;
  
  // Initialize the map
  const gameMap = document.createElement('div');
  gameMap.className = 'map-container';
  gameMap.innerHTML = '<div class="map-loading">Loading game world map...</div>';
  mapContainer.appendChild(gameMap);
  
  // Load player positions
  fetch('/wp-json/game-integration/v1/player-positions')
    .then(response => response.json())
    .then(data => {
      renderGameMap(gameMap, data);
    })
    .catch(error => {
      console.error('Error loading game map data:', error);
      gameMap.innerHTML = '<div class="error-message">Error loading game map</div>';
    });
}

function renderGameMap(container, playerData) {
  // Clear the container
  container.innerHTML = '';
  
  // Create the map SVG
  const mapSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  mapSvg.setAttribute("viewBox", "0 0 1000 1000");
  mapSvg.setAttribute("class", "game-map-svg");
  
  // Add map background (simplified)
  const background = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  background.setAttribute("x", "0");
  background.setAttribute("y", "0");
  background.setAttribute("width", "1000");
  background.setAttribute("height", "1000");
  background.setAttribute("fill", "#2D4263");
  mapSvg.appendChild(background);
  
  // Add grid lines
  for (let i = 0; i <= 10; i++) {
    // Vertical lines
    const vLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    vLine.setAttribute("x1", i * 100);
    vLine.setAttribute("y1", 0);
    vLine.setAttribute("x2", i * 100);
    vLine.setAttribute("y2", 1000);
    vLine.setAttribute("stroke", "#4a5568");
    vLine.setAttribute("stroke-width", "1");
    mapSvg.appendChild(vLine);
    
    // Horizontal lines
    const hLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hLine.setAttribute("x1", 0);
    hLine.setAttribute("y1", i * 100);
    hLine.setAttribute("x2", 1000);
    hLine.setAttribute("y2", i * 100);
    hLine.setAttribute("stroke", "#4a5568");
    hLine.setAttribute("stroke-width", "1");
    mapSvg.appendChild(hLine);
  }
  
  // Plot player positions
  playerData.forEach(player => {
    // Convert game coordinates to SVG coordinates
    const x = mapCoordinateToSvg(player.x, CONFIG.gameIntegration.worldBounds.x.min, CONFIG.gameIntegration.worldBounds.x.max, 0, 1000);
    const y = mapCoordinateToSvg(player.z, CONFIG.gameIntegration.worldBounds.z.min, CONFIG.gameIntegration.worldBounds.z.max, 0, 1000);
    
    // Create player marker
    const playerMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    playerMarker.setAttribute("cx", x);
    playerMarker.setAttribute("cy", y);
    playerMarker.setAttribute("r", "5");
    playerMarker.setAttribute("fill", player.online ? "#4CD964" : "#FF3B30");
    playerMarker.setAttribute("class", "player-marker");
    playerMarker.dataset.playerId = player.id;
    
    // Add tooltip with player info
    const playerTooltip = document.createElementNS("http://www.w3.org/2000/svg", "title");
    playerTooltip.textContent = `${player.name} - ${player.online ? 'Online' : 'Last Seen: ' + new Date(player.last_logout).toLocaleString()}`;
    playerMarker.appendChild(playerTooltip);
    
    // Add click event
    playerMarker.addEventListener('click', function() {
      showPlayerInfo(player);
    });
    
    mapSvg.appendChild(playerMarker);
  });
  
  container.appendChild(mapSvg);
  
  // Add map controls
  addMapControls(container, mapSvg);
}

function mapCoordinateToSvg(gameCoord, gameMin, gameMax, svgMin, svgMax) {
  // Convert game coordinate to SVG coordinate
  return svgMin + ((gameCoord - gameMin) / (gameMax - gameMin)) * (svgMax - svgMin);
}

function addMapControls(container, mapSvg) {
  const controlsContainer = document.createElement('div');
  controlsContainer.className = 'map-controls';
  
  // Create zoom controls
  const zoomControls = document.createElement('div');
  zoomControls.className = 'zoom-controls';
  
  const zoomIn = document.createElement('button');
  zoomIn.className = 'zoom-in';
  zoomIn.innerHTML = '<i class="fa fa-plus"></i>';
  zoomIn.addEventListener('click', () => {
    const currentViewBox = mapSvg.getAttribute('viewBox').split(' ').map(Number);
    const centerX = currentViewBox[0] + currentViewBox[2] / 2;
    const centerY = currentViewBox[1] + currentViewBox[3] / 2;
    const newWidth = currentViewBox[2] * 0.8;
    const newHeight = currentViewBox[3] * 0.8;
    const newX = centerX - newWidth / 2;
    const newY = centerY - newHeight / 2;
    mapSvg.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
  });
  
  const zoomOut = document.createElement('button');
  zoomOut.className = 'zoom-out';
  zoomOut.innerHTML = '<i class="fa fa-minus"></i>';
  zoomOut.addEventListener('click', () => {
    const currentViewBox = mapSvg.getAttribute('viewBox').split(' ').map(Number);
    const centerX = currentViewBox[0] + currentViewBox[2] / 2;
    const centerY = currentViewBox[1] + currentViewBox[3] / 2;
    const newWidth = currentViewBox[2] * 1.2;
    const newHeight = currentViewBox[3] * 1.2;
    const newX = centerX - newWidth / 2;
    const newY = centerY - newHeight / 2;
    mapSvg.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
  });
  
  const resetZoom = document.createElement('button');
  resetZoom.className = 'reset-zoom';
  resetZoom.innerHTML = '<i class="fa fa-home"></i>';
  resetZoom.addEventListener('click', () => {
    mapSvg.setAttribute('viewBox', '0 0 1000 1000');
  });
  
  zoomControls.appendChild(zoomIn);
  zoomControls.appendChild(zoomOut);
  zoomControls.appendChild(resetZoom);
  
  // Create filter controls
  const filterControls = document.createElement('div');
  filterControls.className = 'filter-controls';
  
  const showOnline = document.createElement('label');
  showOnline.innerHTML = `
    <input type="checkbox" class="show-online" checked>
    <span>Online Players</span>
  `;
  
  const showOffline = document.createElement('label');
  showOffline.innerHTML = `
    <input type="checkbox" class="show-offline" checked>
    <span>Offline Players</span>
  `;
  
  showOnline.querySelector('input').addEventListener('change', function() {
    const markers = mapSvg.querySelectorAll('.player-marker');
    markers.forEach(marker => {
      const player = marker.dataset.playerId;
      // TODO: Apply filter based on player online status
    });
  });
  
  showOffline.querySelector('input').addEventListener('change', function() {
    const markers = mapSvg.querySelectorAll('.player-marker');
    markers.forEach(marker => {
      const player = marker.dataset.playerId;
      // TODO: Apply filter based on player online status
    });
  });
  
  filterControls.appendChild(showOnline);
  filterControls.appendChild(showOffline);
  
  // Add controls to container
  controlsContainer.appendChild(zoomControls);
  controlsContainer.appendChild(filterControls);
  container.appendChild(controlsContainer);
}

function showPlayerInfo(player) {
  // Create modal dialog
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-content player-info-dialog">
      <div class="player-header">
        <div class="player-avatar">
          <img src="${player.avatar_url || '/wp-content/themes/ps2-era-forum/img/default-avatar.png'}" alt="${player.name}">
        </div>
        <div class="player-details">
          <h3>${player.name}</h3>
          <div class="player-status ${player.online ? 'online' : 'offline'}">
            ${player.online ? 'Online Now' : 'Offline'}
          </div>
          <div class="player-location">
            Last seen at X: ${player.x}, Y: ${player.y}, Z: ${player.z}
          </div>
          <div class="player-last-login">
            ${player.online ? `Online since: ${new Date(player.last_login).toLocaleString()}` : `Last online: ${new Date(player.last_logout).toLocaleString()}`}
          </div>
        </div>
      </div>
      
      <div class="player-forum-stats">
        <h4>Forum Activity</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">${player.post_count}</div>
            <div class="stat-label">Posts</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${player.thread_count}</div>
            <div class="stat-label">Threads</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${new Date(player.joined_date).toLocaleDateString()}</div>
            <div class="stat-label">Joined</div>
          </div>
        </div>
      </div>
      
      <div class="player-actions">
        <a href="/profile/${player.id}" class="view-profile-button">View Forum Profile</a>
        ${player.online ? `<button class="send-in-game-message">Send In-Game Message</button>` : ''}
      </div>
      
      <button class="close-modal">&times;</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  if (player.online) {
    modal.querySelector('.send-in-game-message').addEventListener('click', () => {
      openInGameMessageDialog(player);
    });
  }
}

function openInGameMessageDialog(player) {
  // Create modal dialog
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-content message-dialog">
      <h3>Send Message to ${player.name}</h3>
      <form id="in-game-message-form">
        <input type="hidden" name="player_id" value="${player.id}">
        
        <div class="form-group">
          <label for="message-text">Message:</label>
          <textarea id="message-text" name="message" rows="4" maxlength="200" required></textarea>
          <div class="char-counter"><span id="char-count">0</span>/200</div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button">Cancel</button>
          <button type="submit" class="submit-button">Send Message</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add character counter
  const messageText = modal.querySelector('#message-text');
  const charCount = modal.querySelector('#char-count');
  
  messageText.addEventListener('input', function() {
    charCount.textContent = this.value.length;
  });
  
  // Add event listeners
  modal.querySelector('.cancel-button').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modal.querySelector('#in-game-message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    sendInGameMessage(this, modal, player);
  });
}

function sendInGameMessage(form, modal, player) {
  const message = form.querySelector('#message-text').value;
  
  fetch('/wp-json/game-integration/v1/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce
    },
    body: JSON.stringify({
      player_id: player.id,
      message: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      document.body.removeChild(modal);
      showNotification(`Message sent to ${player.name}!`, 'success');
    } else {
      showNotification('Error sending message: ' + (data.message || 'Unknown error'), 'error');
    }
  })
  .catch(error => {
    console.error('Error sending in-game message:', error);
    showNotification('Error sending message. Please try again.', 'error');
  });
}

function loadPlayerLocations() {
  const playerLocationContainer = document.querySelector('.player-location-data');
  if (!playerLocationContainer) return;
  
  fetch('/wp-json/game-integration/v1/player-locations')
    .then(response => response.json())
    .then(data => {
      renderPlayerLocations(playerLocationContainer, data);
    })
    .catch(error => {
      console.error('Error loading player locations:', error);
      playerLocationContainer.innerHTML = '<div class="error-message">Error loading player locations</div>';
    });
}

/**
 * Helper function to format time since a given date
 */
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + ' years ago';
  if (interval === 1) return '1 year ago';
  
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + ' months ago';
  if (interval === 1) return '1 month ago';
  
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + ' days ago';
  if (interval === 1) return '1 day ago';
  
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + ' hours ago';
  if (interval === 1) return '1 hour ago';
  
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + ' minutes ago';
  if (interval === 1) return '1 minute ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

function initGameEventNotifications() {
  // Check for game events periodically
  checkGameEvents();
  
  // Set interval to check periodically
  setInterval(checkGameEvents, 60000); // Check every minute
}

function checkGameEvents() {
  fetch('/wp-json/game-integration/v1/events')
    .then(response => response.json())
    .then(events => {
      if (events && events.length > 0) {
        processGameEvents(events);
      }
    })
    .catch(error => {
      console.error('Error checking game events:', error);
    });
}

function processGameEvents(events) {
  events.forEach(event => {
    // Show notification for new events
    if (!event.seen) {
      showGameEventNotification(event);
    }
  });
}

function showGameEventNotification(event) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `game-event-notification event-type-${event.type}`;
  
  // Format the notification based on event type
  switch (event.type) {
    case 'boss_spawn':
      notification.innerHTML = `
        <div class="event-icon"><i class="fa fa-skull"></i></div>
        <div class="event-content">
          <div class="event-title">Boss Spawned: ${event.title}</div>
          <div class="event-details">${event.details}</div>
          <div class="event-location">Location: ${event.location}</div>
        </div>
      `;
      break;
    
    case 'area_unlock':
      notification.innerHTML = `
        <div class="event-icon"><i class="fa fa-unlock"></i></div>
        <div class="event-content">
          <div class="event-title">New Area Unlocked: ${event.title}</div>
          <div class="event-details">${event.details}</div>
        </div>
      `;
      break;
    
    case 'server_event':
      notification.innerHTML = `
        <div class="event-icon"><i class="fa fa-bell"></i></div>
        <div class="event-content">
          <div class="event-title">Server Event: ${event.title}</div>
          <div class="event-details">${event.details}</div>
          <div class="event-time">Time: ${new Date(event.time).toLocaleString()}</div>
        </div>
      `;
      break;
    
    default:
      notification.innerHTML = `
        <div class="event-icon"><i class="fa fa-info-circle"></i></div>
        <div class="event-content">
          <div class="event-title">${event.title}</div>
          <div class="event-details">${event.details}</div>
        </div>
      `;
  }
  
  // Add close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-notification';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    document.body.removeChild(notification);
    
    // Mark event as seen
    fetch(`/wp-json/game-integration/v1/events/${event.id}/seen`, {
      method: 'POST',
      headers: {
        'X-WP-Nonce': wpApiSettings.nonce
      }
    }).catch(error => {
      console.error('Error marking event as seen:', error);
    });
  });
  
  notification.appendChild(closeButton);
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 10000);
}

/**
 * ==========================================
 * RETRO STYLING & UTILITY FUNCTIONS
 * ==========================================
 */

function setupRetroTheme() {
  // Add PS2-era elements and styles
  addRetroElements();
  
  // Add theme toggle if available
  if (document.querySelector('.theme-toggle')) {
    initThemeToggle();
  }
}

function addRetroElements() {
  // Add loading screen effect
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'retro-loading-screen';
  loadingScreen.innerHTML = `
    <div class="loading-content">
      <div class="loading-logo">PS2-Era Forum</div>
      <div class="loading-bar-container">
        <div class="loading-bar"></div>
      </div>
      <div class="loading-text">Loading...</div>
    </div>
  `;
  
  document.body.appendChild(loadingScreen);
  
  // Simulate loading and then hide
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1500);
  
  // Add forum signature if user is logged in
  const currentUser = window.currentUser || {};
  if (currentUser.id && document.querySelector('.post-signature')) {
    document.querySelectorAll('.post-signature').forEach(sig => {
      if (sig.innerHTML.trim() === '') {
        sig.innerHTML = '<div class="signature-edit-prompt">Click here to add a signature</div>';
        sig.addEventListener('click', function() {
          openSignatureEditor(this);
        });
      }
    });
  }
  
  // Add classic forum button styling
  document.querySelectorAll('button:not(.tag-button):not(.close-modal)').forEach(button => {
    button.classList.add('retro-button');
  });
}

function openSignatureEditor(signatureElement) {
  // Create modal dialog
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-content signature-editor">
      <h3>Edit Your Signature</h3>
      <form id="signature-form">
        <div class="form-group">
          <textarea id="signature-text" name="signature" rows="4" maxlength="200">${signatureElement.textContent !== 'Click here to add a signature' ? signatureElement.innerHTML : ''}</textarea>
          <div class="signature-help">
            You can use basic BBCode: [b]bold[/b], [i]italic[/i], [url=http://example.com]link[/url]
          </div>
        </div>
        
        <div class="form-actions">
          <button type="button" class="cancel-button">Cancel</button>
          <button type="submit" class="submit-button">Save Signature</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listeners
  modal.querySelector('.cancel-button').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  modal.querySelector('#signature-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newSignature = this.querySelector('#signature-text').value;
    
    fetch('/wp-json/forum-user/v1/signature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': wpApiSettings.nonce
      },
      body: JSON.stringify({
        signature: newSignature
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.body.removeChild(modal);
        signatureElement.innerHTML = data.formatted_signature || '';
        showNotification('Signature updated successfully!', 'success');
      } else {
        showNotification('Error updating signature: ' + (data.message || 'Unknown error'), 'error');
      }
    })
    .catch(error => {
      console.error('Error updating signature:', error);
      showNotification('Error updating signature. Please try again.', 'error');
    });
  });
}

function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('forum-theme', currentTheme);
    
    // Update toggle text
    this.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
  });
  
  // Set initial theme based on localStorage or default to light
  const savedTheme = localStorage.getItem('forum-theme') || 'light';
  document.body.classList.add(savedTheme + '-theme');
  themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  
  // Add appropriate icon based on notification type
  let icon = 'info-circle';
  switch (type) {
    case 'success': icon = 'check-circle'; break;
    case 'error': icon = 'exclamation-circle'; break;
    case 'warning': icon = 'exclamation-triangle'; break;
  }
  
  notification.innerHTML = `
    <i class="fa fa-${icon}"></i>
    <span class="notification-message">${message}</span>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.classList.add('notification-hiding');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

/**
 * Initialize advanced search functionality
 */
function initSearchSystem() {
  const searchForm = document.querySelector('.forum-search-form');
  if (!searchForm) return;
  
  // Add advanced search toggle
  const advancedToggle = document.createElement('div');
  advancedToggle.className = 'advanced-search-toggle';
  advancedToggle.innerHTML = '<span>Advanced Search</span> <i class="fa fa-caret-down"></i>';
  
  // Create advanced search options (initially hidden)
  const advancedOptions = document.createElement('div');
  advancedOptions.className = 'advanced-search-options hidden';
  advancedOptions.innerHTML = `
    <div class="search-option">
      <label for="search-forum">Forum:</label>
      <select id="search-forum" name="forum_id">
        <option value="">All Forums</option>
        <!-- Forum options will be populated dynamically -->
      </select>
    </div>
    
    <div class="search-option">
      <label for="search-user">Posted by:</label>
      <input type="text" id="search-user" name="author" placeholder="Username">
    </div>
    
    <div class="search-option">
      <label for="search-tags">Has tags:</label>
      <div class="tag-select-container">
        <!-- Tags will be populated dynamically -->
      </div>
    </div>
    
    <div class="search-option">
      <label for="search-date-from">Date range:</label>
      <div class="date-range">
        <input type="date" id="search-date-from" name="date_from">
        <span>to</span>
        <input type="date" id="search-date-to" name="date_to">
      </div>
    </div>
  `;
  
  // Toggle advanced options visibility
  advancedToggle.addEventListener('click', function() {
    advancedOptions.classList.toggle('hidden');
    this.querySelector('i').classList.toggle('fa-caret-down');
    this.querySelector('i').classList.toggle('fa-caret-up');
  });
  
  // Add to form
  searchForm.appendChild(advancedToggle);
  searchForm.appendChild(advancedOptions);
  
  // Populate forum options and tags
  populateSearchOptions();
}

function populateSearchOptions() {
  // Load forums for dropdown
  fetch('/wp-json/forum-search/v1/forums')
    .then(response => response.json())
    .then(forums => {
      const forumSelect = document.getElementById('search-forum');
      if (!forumSelect) return;
      
      forums.forEach(forum => {
        const option = document.createElement('option');
        option.value = forum.id;
        option.textContent = forum.name;
        forumSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error loading forums for search:', error);
    });
  
  // Load tags for selection
  fetch('/wp-json/forum-search/v1/tags')
    .then(response => response.json())
    .then(tags => {
      const tagContainer = document.querySelector('.tag-select-container');
      if (!tagContainer) return;
      
      tags.forEach(tag => {
        const tagItem = document.createElement('label');
        tagItem.className = 'tag-option';
        tagItem.innerHTML = `
          <input type="checkbox" name="tags[]" value="${tag.id}">
          <span>${tag.name}</span>
        `;
        tagContainer.appendChild(tagItem);
      });
    })
    .catch(error => {
      console.error('Error loading tags for search:', error);
    });
}

/**
 * Register global event listeners for the forum
 */
function registerGlobalEventListeners() {
  // Handle BBCode toolbar buttons
  document.querySelectorAll('.bbcode-toolbar button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.dataset.target);
      if (!target) return;
      
      const tag = this.dataset.tag;
      if (!tag) return;
      
      insertBBCode(target, tag);
    });
  });
  
  // Post preview functionality
  document.querySelectorAll('.preview-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const form = this.closest('form');
      if (!form) return;
      
      const contentField = form.querySelector('textarea[name="content"]');
      if (!contentField) return;
      
      const content = contentField.value;
      showPostPreview(content);
    });
  });
}

function insertBBCode(textarea, tag) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  
  let insertion = '';
  
  switch (tag) {
    case 'b':
      insertion = `[b]${selectedText}[/b]`;
      break;
    case 'i':
      insertion = `[i]${selectedText}[/i]`;
      break;
    case 'u':
      insertion = `[u]${selectedText}[/u]`;
      break;
    case 'img':
      insertion = selectedText ? `[img]${selectedText}[/img]` : '[img]https://example.com/image.jpg[/img]';
      break;
    case 'url':
      insertion = selectedText ? `[url]${selectedText}[/url]` : '[url=https://example.com]Visit Example[/url]';
      break;
    case 'quote':
      insertion = `[quote]${selectedText}[/quote]`;
      break;
    case 'code':
      insertion = `[code]${selectedText}[/code]`;
      break;
    default:
      insertion = `[${tag}]${selectedText}[/${tag}]`;
  }
  
  textarea.focus();
  textarea.setRangeText(insertion, start, end, 'end');
}

function showPostPreview(content) {
  // Create modal dialog
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-content post-preview">
      <h3>Preview Post</h3>
      <div class="preview-content">
        Loading preview...
      </div>
      <button class="close-modal">Close Preview</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add event listener for close button
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Fetch formatted content
  fetch('/wp-json/forum-post/v1/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpApiSettings.nonce
    },
    body: JSON.stringify({
      content: content
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      modal.querySelector('.preview-content').innerHTML = data.formatted_content;
    } else {
      modal.querySelector('.preview-content').innerHTML = 'Error generating preview.';
    }
  })
  .catch(error => {
    console.error('Error generating preview:', error);
    modal.querySelector('.preview-content').innerHTML = 'Error generating preview.';
  });
}

function renderPlayerLocations(container, playersData) {
  // Clear the container
  container.innerHTML = '';
  
  // Create the table
  const table = document.createElement('table');
  table.className = 'player-locations-table';
  
  // Create table header
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Player</th>
      <th>Status</th>
      <th>Location</th>
      <th>Last Seen</th>
    </tr>
  `;
  table.appendChild(thead);
  
  // Create table body
