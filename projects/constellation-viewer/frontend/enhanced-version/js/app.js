/**
 * Main application script for the Notebook Explorer
 */

// Don't show the loading indicator at all
const loadingIndicator = document.getElementById('loading-indicator');
if (loadingIndicator) {
  loadingIndicator.setAttribute('hidden', 'true');
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Immediately hide any loading indicators
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) {
    loadingIndicator.setAttribute('hidden', 'true');
  }
  
  initApp();
});

/**
 * Initialize the application
 */
function initApp() {
  console.log('Initializing Notebook Explorer application with fixed layout...');
  
  // Get references to key elements
  const elements = {
    collectionSelect: document.getElementById('notebook-collection'),
    fileList: document.getElementById('file-list'),
    tagsContainer: document.getElementById('tags-container'),
    recentFiles: document.getElementById('recent-files'),
    contentDisplay: document.getElementById('content-display'),
    searchInput: document.getElementById('file-search'),
    newFileBtn: document.getElementById('new-file-btn'),
    newFolderBtn: document.getElementById('new-folder-btn'),
    loadingIndicator: document.getElementById('loading-indicator'),
    notificationContainer: document.getElementById('notification-container'),
    logsContainer: document.getElementById('logs-container'),
    sidebarToggle: document.getElementById('sidebar-toggle')
  };
  
  // Set up event listeners
  setupEventListeners(elements);
  
  // Load mock data instead of waiting for API
  loadMockData(elements);
  
  // Example log message
  logMessage('Application initialized', 'info');
  
  // No need to hide loading indicator as we don't show it anymore
  // if (elements.loadingIndicator) {
  //   elements.loadingIndicator.setAttribute('hidden', 'true');
  // }
  
  // Show a welcome notification
  showNotification('Welcome to Notebook Explorer Demo', 'This is a demonstration with sample data.', 'info');
}

/**
 * Set up event listeners
 * @param {Object} elements - References to DOM elements
 */
function setupEventListeners(elements) {
  // Collection selector
  if (elements.collectionSelect) {
    elements.collectionSelect.addEventListener('change', function(e) {
      const collectionId = e.target.value;
      if (collectionId) {
        loadFiles(collectionId, elements);
      }
    });
  }
  
  // File search
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      filterFiles(searchTerm, elements);
    });
  }
  
  // New file button
  if (elements.newFileBtn) {
    elements.newFileBtn.addEventListener('click', function() {
      showDialog('New File', 
        '<div class="form-group">' +
        '<label for="file-name">File Name:</label>' +
        '<input type="text" id="file-name" class="form-control" placeholder="Enter file name">' +
        '</div>' +
        '<div class="form-group">' +
        '<label for="parent-folder">Parent Folder:</label>' +
        '<select id="parent-folder" class="form-control">' +
        '<option value="/">/</option>' +
        '<option value="/notes">Notes</option>' +
        '<option value="/projects">Projects</option>' +
        '</select>' +
        '</div>',
        function() {
          const fileName = document.getElementById('file-name').value;
          if (fileName) {
            showNotification('File Created', `Created new file: ${fileName}`, 'success');
            logMessage(`Created file: ${fileName}`, 'success');
          }
        }
      );
    });
  }
  
  // Sidebar toggle
  if (elements.sidebarToggle) {
    elements.sidebarToggle.addEventListener('click', function() {
      document.querySelector('.sidebar').classList.toggle('collapsed');
      const isExpanded = elements.sidebarToggle.getAttribute('aria-expanded') === 'true';
      elements.sidebarToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }
  
  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Hide all views
      document.querySelectorAll('.view').forEach(view => {
        view.hidden = true;
      });
      
      // Set this tab as active
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      
      // Show corresponding view
      const viewId = this.getAttribute('aria-controls');
      const view = document.getElementById(viewId);
      if (view) {
        view.hidden = false;
      }
    });
  });
  
  // More actions dropdown
  const moreActionsBtn = document.getElementById('more-actions-btn');
  if (moreActionsBtn) {
    moreActionsBtn.addEventListener('click', function() {
      const dropdownContent = document.getElementById('dropdown-content');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      this.setAttribute('aria-expanded', !isExpanded);
      dropdownContent.classList.toggle('show');
      
      // Close dropdown when clicking outside
      if (!isExpanded) {
        const closeDropdown = function(e) {
          if (!moreActionsBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('show');
            moreActionsBtn.setAttribute('aria-expanded', 'false');
            document.removeEventListener('click', closeDropdown);
          }
        };
        
        // Add listener after a small delay to avoid immediate trigger
        setTimeout(() => {
          document.addEventListener('click', closeDropdown);
        }, 10);
      }
    });
  }
  
  // Notification close buttons
  elements.notificationContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('notification-close')) {
      const notification = e.target.closest('.notification');
      if (notification) {
        notification.classList.add('notification-hiding');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }
  });
}

/**
 * Load mock data for demo
 * @param {Object} elements - References to DOM elements
 */
function loadMockData(elements) {
  // Mock collections
  const collections = [
    { id: 'game-design', name: 'Game Design Documents' },
    { id: 'project-logs', name: 'Project Logs' },
    { id: 'reference', name: 'Reference Materials' }
  ];
  
  // Populate collection selector
  if (elements.collectionSelect) {
    elements.collectionSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a collection...';
    elements.collectionSelect.appendChild(defaultOption);
    
    collections.forEach(collection => {
      const option = document.createElement('option');
      option.value = collection.id;
      option.textContent = collection.name;
      elements.collectionSelect.appendChild(option);
    });
    
    // Set default collection
    elements.collectionSelect.value = 'game-design';
    
    // Trigger change to load files
    const event = new Event('change');
    elements.collectionSelect.dispatchEvent(event);
  }
  
  // Add some recent files
  const recentFiles = [
    { id: 'recent1', name: 'Autumn_GDD.pdf.md', type: 'file', icon: 'fa-file-alt' },
    { id: 'recent2', name: 'Character_Design.gdoc.md', type: 'file', icon: 'fa-file-alt' },
    { id: 'recent3', name: 'Project_-_Dodec.md', type: 'file', icon: 'fa-file-alt' }
  ];
  
  if (elements.recentFiles) {
    elements.recentFiles.innerHTML = '';
    
    recentFiles.forEach(file => {
      const fileElement = createFileElement(file);
      fileElement.addEventListener('click', () => loadFileContent(file.id, elements));
      elements.recentFiles.appendChild(fileElement);
    });
  }
  
  // Add some tags
  const tags = ['design', 'documentation', 'concept', 'character', 'mechanics', 'story'];
  
  if (elements.tagsContainer) {
    elements.tagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
      const tagTemplate = document.getElementById('tag-item-template');
      const tagElement = document.importNode(tagTemplate.content, true).querySelector('.tag');
      
      tagElement.querySelector('.tag-name').textContent = tag;
      
      tagElement.addEventListener('click', () => {
        // Toggle selection
        tagElement.classList.toggle('selected');
        
        // Filter files based on selected tags
        const selectedTags = Array.from(elements.tagsContainer.querySelectorAll('.tag.selected'))
          .map(el => el.querySelector('.tag-name').textContent);
        
        if (selectedTags.length > 0) {
          logMessage(`Filtering by tags: ${selectedTags.join(', ')}`, 'info');
        } else {
          logMessage('Tag filter cleared', 'info');
        }
      });
      
      elements.tagsContainer.appendChild(tagElement);
    });
  }
}

/**
 * Load files for a collection
 * @param {string} collectionId - The collection ID
 * @param {Object} elements - References to DOM elements
 */
function loadFiles(collectionId, elements) {
  // Show loading indicator
  if (elements.loadingIndicator) {
    elements.loadingIndicator.removeAttribute('hidden');
  }
  
  // Log message
  logMessage(`Loading collection: ${collectionId}`, 'info');
  
  // Mock files for each collection
  const mockFiles = {
    'game-design': [
      { id: 'gd1', name: 'Autumn_GDD.pdf.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'gd2', name: 'Character_Design.gdoc.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'gd3', name: 'Game_Development_&_Design.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'gd4', name: 'Mechanics', type: 'folder', icon: 'fa-folder' },
      { id: 'gd5', name: 'Project_-_Dodec.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'gd6', name: 'Sentience_GDD.docx.md', type: 'file', icon: 'fa-file-alt' }
    ],
    'project-logs': [
      { id: 'pl1', name: 'Game_Logs.docx.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'pl2', name: 'Log_Count_-_All.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'pl3', name: 'Ongoing_Production.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'pl4', name: 'Archive', type: 'folder', icon: 'fa-folder' }
    ],
    'reference': [
      { id: 'ref1', name: 'Publisher_Pitch_Tips.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'ref2', name: 'kickstarter_tips.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'ref3', name: 'game_difficulty_tips.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'ref4', name: 'convention_tips.txt.md', type: 'file', icon: 'fa-file-alt' },
      { id: 'ref5', name: 'External Links', type: 'folder', icon: 'fa-folder' }
    ]
  };
  
  // Get files for selected collection
  const files = mockFiles[collectionId] || [];
  
  // Update file list
  if (elements.fileList) {
    elements.fileList.innerHTML = '';
    
    if (files.length === 0) {
      elements.fileList.innerHTML = '<div class="empty-state">No files found</div>';
    } else {
      files.forEach(file => {
        const fileElement = createFileElement(file);
        
        fileElement.addEventListener('click', () => {
          if (file.type === 'folder') {
            showNotification('Folder Selected', `Selected folder: ${file.name}`, 'info');
          } else {
            loadFileContent(file.id, elements);
          }
        });
        
        elements.fileList.appendChild(fileElement);
      });
    }
  }
  
  // No need to hide loading indicator as we don't show it anymore
  // if (elements.loadingIndicator) {
  //   elements.loadingIndicator.setAttribute('hidden', 'true');
  // }
}

/**
 * Create a file element from template
 * @param {Object} file - File data
 * @returns {HTMLElement} - The file element
 */
function createFileElement(file) {
  const fileTemplate = document.getElementById('file-item-template');
  const fileElement = document.importNode(fileTemplate.content, true).querySelector('.file-item');
  
  fileElement.dataset.id = file.id;
  fileElement.dataset.type = file.type;
  
  const fileIcon = fileElement.querySelector('.file-icon');
  fileIcon.classList.add('fas', file.icon || (file.type === 'folder' ? 'fa-folder' : 'fa-file-alt'));
  
  fileElement.querySelector('.file-name').textContent = file.name;
  
  return fileElement;
}

/**
 * Load content for a file
 * @param {string} fileId - The file ID to load
 * @param {Object} elements - References to DOM elements
 */
function loadFileContent(fileId, elements) {
  // Don't show loading indicator - load immediately from mock data
  // if (elements.loadingIndicator) {
  //   elements.loadingIndicator.removeAttribute('hidden');
  // }
  
  // Mock file contents
  const fileContents = {
    'gd1': {
      title: 'Autumn Game Design Document',
      content: '# Autumn Game Design Document\n\n## Overview\nAutumn is a narrative-driven adventure game set in a world where seasons have stopped changing.\n\n## Core Mechanics\n- Environmental puzzles\n- Character interactions\n- Season manipulation abilities\n\n## Visual Style\nA unique blend of watercolor aesthetics with 3D environments, creating a dreamlike atmosphere that enhances the game\'s themes of change and transformation.\n\n## Gameplay Loop\n1. Explore environments\n2. Solve season-based puzzles\n3. Unlock new abilities\n4. Progress the narrative\n\n## Characters\n### Ember (Protagonist)\nA young forest guardian tasked with restoring the seasonal balance.\n\n### The Season Keepers\n- **Winter Keeper**: Stoic and principled\n- **Spring Weaver**: Creative and nurturing\n- **Summer Guardian**: Passionate and impulsive\n- **Autumn Shepherd**: Wise and contemplative\n\n## Technical Requirements\n- Unity Engine 2023\n- Target platforms: PC, Console\n- Minimum 60 FPS performance target\n- Full controller support',
      lastModified: '2023-10-10T09:45:00Z'
    },
    'gd2': {
      title: 'Character Design',
      content: '# Character Design Notes\n\n## Main Character\n- **Name**: Ember\n- **Age**: 24\n- **Background**: Forest guardian\n- **Personality**: Determined, curious, adaptive\n\n## Supporting Characters\n\n### Winter Keeper\n- **Name**: Frost\n- **Role**: Guardian of winter\n- **Appearance**: Tall, silver-haired, blue garments\n- **Abilities**: Ice manipulation, snow creation\n\n### Spring Weaver\n- **Name**: Bloom\n- **Role**: Guardian of spring\n- **Appearance**: Floral-themed clothing, vibrant colors\n- **Abilities**: Plant growth, healing\n\n### Summer Guardian\n- **Name**: Solara\n- **Role**: Guardian of summer\n- **Appearance**: Warm colors, sun motifs\n- **Abilities**: Heat manipulation, light control\n\n### Autumn Shepherd\n- **Name**: Amber\n- **Role**: Guardian of autumn\n- **Appearance**: Earth tones, leaf patterns\n- **Abilities**: Wind control, transformative magic',
      lastModified: '2023-10-12T11:30:00Z'
    },
    'gd3': {
      title: 'Game Development & Design',
      content: '# Game Development & Design Notes\n\n1. Focus on atmospheric storytelling\n2. Minimize UI elements\n3. Use environmental cues for player guidance\n4. Implement a modular quest system\n\n## Design Principles\n\n### Player Agency\nEnsure players feel their choices matter and have meaningful impact on the game world. Avoid false choices that don\'t affect outcomes.\n\n### Consistent Rules\nGame mechanics should follow consistent rules that players can learn and master. Avoid arbitrary exceptions unless narratively justified.\n\n### Balanced Challenge\nDifficulty should scale progressively, with appropriate feedback mechanisms to help players learn from failures.\n\n### Meaningful Rewards\nRewards should feel proportional to the challenge overcome and be useful within the game\'s systems.\n\n## Development Process\n\n### Pre-production\n- Concept development\n- Market research\n- Technical requirements\n- Team formation\n\n### Production\n- Asset creation\n- Feature implementation\n- Level design\n- Iterative testing\n\n### Post-production\n- Bug fixing\n- Performance optimization\n- User feedback integration\n- Marketing preparation',
      lastModified: '2023-10-14T16:20:00Z'
    },
    'pl1': {
      title: 'Game Logs',
      content: '# Game Development Logs\n\n## Week 1: Project Kickoff\n\n### Monday\nProject kickoff meeting. Discussed core concept and established initial timeline. Team roles assigned.\n\n### Tuesday\nBegan concept art exploration. Initial sketches for protagonist and first environment.\n\n### Wednesday\nTechnical requirements document drafted. Decided on Unity 2023 with custom rendering pipeline.\n\n### Thursday\nFirst prototype of movement mechanics. Basic character controller implemented.\n\n### Friday\nWeekly review. Adjusted timeline for character design phase. Need more exploration.\n\n## Week 2: Core Mechanics\n\n### Monday\nStarted implementing season changing mechanic. Initial testing shows promise.\n\n### Tuesday\nContinued work on character design. Finalized protagonist concept art.\n\n### Wednesday\nBuilt first environmental puzzle prototype. Team playtest revealed timing issues.\n\n### Thursday\nRefined character controller based on feedback. Added subtle animation improvements.\n\n### Friday\nWeekly review. Season changing mechanic functioning but needs visual polish.',
      lastModified: '2023-11-01T10:15:00Z'
    },
    'ref1': {
      title: 'Publisher Pitch Tips',
      content: '# Publisher Pitch Tips\n\n## Before the Pitch\n\n### Research\n- Research the publisher thoroughly\n- Understand their catalog and target audience\n- Know their recent successes and failures\n- Identify the decision makers\n\n### Preparation\n- Create a concise pitch deck (10-15 slides max)\n- Prepare a playable demo if possible\n- Rehearse your pitch multiple times\n- Time your presentation (aim for 15-20 minutes)\n\n## During the Pitch\n\n### Opening\n- Start with a strong hook\n- Clearly state what makes your game unique\n- Use a compelling elevator pitch (30 seconds)\n\n### Content\n- Focus on gameplay and player experience\n- Explain your target audience clearly\n- Show market analysis and competition awareness\n- Present realistic budget and timeline\n\n### Closing\n- Summarize key points\n- Clearly state what you\'re asking for\n- Leave time for questions\n\n## After the Pitch\n\n### Follow-up\n- Send a thank you email\n- Provide any promised additional information\n- Be patient but follow up appropriately\n- Be prepared to negotiate terms',
      lastModified: '2023-09-25T11:20:00Z'
    },
    'recent1': {
      title: 'Autumn Game Design Document',
      content: '# Autumn Game Design Document\n\n## Overview\nAutumn is a narrative-driven adventure game set in a world where seasons have stopped changing.\n\n## Core Mechanics\n- Environmental puzzles\n- Character interactions\n- Season manipulation abilities\n\n## Visual Style\nA unique blend of watercolor aesthetics with 3D environments, creating a dreamlike atmosphere that enhances the game\'s themes of change and transformation.\n\n## Gameplay Loop\n1. Explore environments\n2. Solve season-based puzzles\n3. Unlock new abilities\n4. Progress the narrative\n\n## Characters\n### Ember (Protagonist)\nA young forest guardian tasked with restoring the seasonal balance.\n\n### The Season Keepers\n- **Winter Keeper**: Stoic and principled\n- **Spring Weaver**: Creative and nurturing\n- **Summer Guardian**: Passionate and impulsive\n- **Autumn Shepherd**: Wise and contemplative\n\n## Technical Requirements\n- Unity Engine 2023\n- Target platforms: PC, Console\n- Minimum 60 FPS performance target\n- Full controller support',
      lastModified: '2023-10-10T09:45:00Z'
    }
  };
  
  // Update UI for selected file
  document.querySelectorAll('.file-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedItem = document.querySelector(`.file-item[data-id="${fileId}"]`);
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }
  
  // Get file content
  const fileData = fileContents[fileId];
  
  if (fileData) {
    // Update document title
    document.title = `${fileData.title} - Notebook Explorer`;
    
    // Update content title
    const contentTitle = document.getElementById('content-title');
    if (contentTitle) {
      contentTitle.textContent = fileData.title;
    }
    
    // Parse markdown to HTML
    let contentHtml = '';
    if (window.marked) {
      contentHtml = marked.parse(fileData.content);
    } else {
      // Simple markdown parsing fallback
      contentHtml = fileData.content
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/- (.*)/gim, '<li>$1</li>')
        .replace(/\n\n/gim, '<br><br>');
    }
    
    // Update content display with fixed structure
    if (elements.contentDisplay) {
      // Preserve the exact structure for consistency
      elements.contentDisplay.innerHTML = `
        <article class="content-article">
          <div class="content-meta">
            <span class="content-date">Last modified: ${new Date(fileData.lastModified).toLocaleString()}</span>
          </div>
          <div class="content-body" style="min-height: 400px;">
            ${contentHtml}
          </div>
        </article>
      `;
      
      // Show file operations
      const fileOperations = document.getElementById('file-operations');
      if (fileOperations) {
        fileOperations.hidden = false;
      }
    }
    
    // Log message
    logMessage(`Loaded file: ${fileData.title}`, 'success');
  } else {
    // File not found
    if (elements.contentDisplay) {
      elements.contentDisplay.innerHTML = `
        <div class="error-state">
          <h3>File Not Found</h3>
          <p>The requested file could not be loaded.</p>
        </div>
      `;
    }
    
    // Log error
    logMessage(`Error: File not found (ID: ${fileId})`, 'error');
  }
  
  // No need to hide loading indicator as we don't show it anymore
  // if (elements.loadingIndicator) {
  //   elements.loadingIndicator.setAttribute('hidden', 'true');
  // }
}

/**
 * Filter files based on search term
 * @param {string} searchTerm - The search term
 * @param {Object} elements - References to DOM elements
 */
function filterFiles(searchTerm, elements) {
  const fileItems = elements.fileList.querySelectorAll('.file-item');
  
  fileItems.forEach(item => {
    const fileName = item.querySelector('.file-name').textContent.toLowerCase();
    
    if (fileName.includes(searchTerm)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
  
  // Log search
  if (searchTerm) {
    logMessage(`Searching for: ${searchTerm}`, 'info');
  }
}

/**
 * Show a dialog
 * @param {string} title - Dialog title
 * @param {string} content - Dialog content
 * @param {Function} confirmCallback - Function to call when confirmed
 */
function showDialog(title, content, confirmCallback) {
  const dialogContainer = document.getElementById('dialog-container');
  if (!dialogContainer) return;
  
  // Create dialog
  const dialog = document.createElement('div');
  dialog.className = 'dialog-overlay';
  dialog.innerHTML = `
    <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div class="dialog-header">
        <h3 id="dialog-title">${title}</h3>
        <button class="dialog-close" aria-label="Close dialog">&times;</button>
      </div>
      <div class="dialog-content">
        ${content}
      </div>
      <div class="dialog-footer">
        <button class="btn btn-secondary dialog-cancel">Cancel</button>
        <button class="btn btn-primary dialog-confirm">Confirm</button>
      </div>
    </div>
  `;
  
  // Add to container
  dialogContainer.innerHTML = '';
  dialogContainer.appendChild(dialog);
  
  // Show dialog
  setTimeout(() => {
    dialog.classList.add('show');
  }, 10);
  
  // Add event listeners
  const closeBtn = dialog.querySelector('.dialog-close');
  const cancelBtn = dialog.querySelector('.dialog-cancel');
  const confirmBtn = dialog.querySelector('.dialog-confirm');
  
  const closeDialog = () => {
    dialog.classList.remove('show');
    setTimeout(() => {
      dialogContainer.innerHTML = '';
    }, 300);
  };
  
  closeBtn.addEventListener('click', closeDialog);
  cancelBtn.addEventListener('click', closeDialog);
  
  confirmBtn.addEventListener('click', () => {
    if (typeof confirmCallback === 'function') {
      confirmCallback();
    }
    closeDialog();
  });
  
  // Close on Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeDialog();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Focus first input if present
  const firstInput = dialog.querySelector('input, button:not(.dialog-close)');
  if (firstInput) {
    setTimeout(() => {
      firstInput.focus();
    }, 100);
  }
}

/**
 * Show a notification
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, warning, error)
 */
function showNotification(title, message, type = 'info') {
  const container = document.getElementById('notification-container');
  if (!container) return;
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.setAttribute('role', 'status');
  notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
  
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                  type === 'error' ? 'fa-exclamation-circle' : 
                  type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}" 
         aria-hidden="true"></i>
    </div>
    <div class="notification-content">
      <h4 class="notification-title">${title}</h4>
      <p class="notification-message">${message}</p>
    </div>
    <button class="notification-close" aria-label="Dismiss notification">&times;</button>
  `;
  
  // Add to container
  container.appendChild(notification);
  
  // Add close button functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.classList.add('notification-hiding');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
  
  // Auto-remove after 5 seconds (except for errors)
  if (type !== 'error') {
    setTimeout(() => {
      notification.classList.add('notification-hiding');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
}

/**
 * Add a log message to the system log
 * @param {string} message - Log message
 * @param {string} level - Log level (info, success, warning, error)
 */
function logMessage(message, level = 'info') {
  const logsContainer = document.getElementById('logs-container');
  if (!logsContainer) return;
  
  const timestamp = new Date().toLocaleTimeString();
  
  const logEntry = document.createElement('div');
  logEntry.className = `log-entry log-${level}`;
  
  logEntry.innerHTML = `
    <span class="log-timestamp">${timestamp}</span>
    <span class="log-message">${message}</span>
  `;
  
  logsContainer.appendChild(logEntry);
  
  // Scroll to bottom
  logsContainer.scrollTop = logsContainer.scrollHeight;
}