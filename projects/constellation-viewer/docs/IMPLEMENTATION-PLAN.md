# Enhanced Wiki Implementation Plan

This document outlines a detailed plan for implementing the enhancements to the `/enhanced` endpoint (http://localhost:3003/enhanced) based on features from the basic.html interface.

## Architecture Overview

The enhanced wiki system consists of three main files:
- `enhanced-wiki.html` - The HTML structure and container
- `enhanced-wiki.css` - Styling and theming
- `enhanced-wiki.js` - Core functionality and interactions

The implementation plan will enhance these files to incorporate the best features from basic.html.

## Phase 1: Setup and Preparation

### Step 1: Create Development Branches

```bash
cd /home/user/Repository/WebProjects/Constellation-Viewer
git checkout -b enhanced-wiki-upgrade
```

### Step 2: Back Up Current Files

```bash
mkdir -p backups
cp frontend/enhanced-wiki.html backups/
cp frontend/enhanced-wiki.css backups/
cp frontend/enhanced-wiki.js backups/
```

## Phase 2: CSS Enhancements

### Step 1: Implement CSS Variables for Theming

Update `enhanced-wiki.css` to use CSS variables for consistent theming:

```css
/* Add at the top of enhanced-wiki.css */
:root {
    /* Base colors */
    --primary: #14418B;
    --secondary: #2e5cb8;
    --tertiary: #5c8de6;
    --accent: #ffb74d;
    
    /* Background colors */
    --background: #ffffff;
    --surface: #f8f9fa;
    --card-bg: #ffffff;
    --hover-bg: #f0f4f8;
    
    /* Text colors */
    --text-primary: #333333;
    --text-secondary: #5f6368;
    --text-tertiary: #80868b;
    --text-on-primary: #ffffff;
    
    /* Border colors */
    --border-color: #e0e0e0;
    --divider-color: #eeeeee;
    
    /* Shadows and effects */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
}

/* Dark theme variables */
body.theme-dark {
    --primary: #3366cc;
    --secondary: #5c8de6;
    --tertiary: #8ab4ff;
    
    --background: #121212;
    --surface: #1e1e1e;
    --card-bg: #2d2d2d;
    --hover-bg: #3d3d3d;
    
    --text-primary: #e0e0e0;
    --text-secondary: #bbbbbb;
    --text-tertiary: #999999;
    
    --border-color: #444444;
    --divider-color: #333333;
}
```

### Step 2: Add CSS for View Modes

```css
/* Add to enhanced-wiki.css */
/* View Modes */
.compact-mode .sidebar {
    width: 180px;
}

.compact-mode .main-content {
    margin-left: 180px;
}

.compact-mode .nav-section-title,
.compact-mode .notebook-browser-title {
    font-size: 0.75rem;
}

.compact-mode .nav-item {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.85rem;
}

.reading-mode .sidebar {
    width: 0;
    transform: translateX(-100%);
}

.reading-mode .main-content {
    margin-left: 0;
    max-width: 800px;
    margin: 0 auto;
}

/* View mode controls */
.view-mode-selector {
    display: flex;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
}

.view-mode-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.9rem;
    opacity: 0.7;
}

.view-mode-btn:hover {
    opacity: 1;
    background-color: var(--hover-bg);
}

.view-mode-btn.active {
    color: var(--primary);
    opacity: 1;
    background-color: var(--light-highlight);
}
```

### Step 3: Enhance Notebook Browser Styling

```css
/* Add to enhanced-wiki.css */
.notebook-file {
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color var(--transition-fast);
    font-size: 0.9rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.notebook-file:last-child {
    border-bottom: none;
}

.notebook-file:hover {
    background-color: var(--hover-bg);
    color: var(--text-primary);
}

.notebook-file.active {
    background-color: var(--selected-item);
    color: var(--primary);
    font-weight: 500;
}

.file-icon {
    font-size: 0.8rem;
    color: var(--tertiary);
    opacity: 0.7;
}

/* Notification style */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-md);
    z-index: 1000;
    transition: all var(--transition-normal);
    opacity: 0;
    transform: translateY(-10px);
}

.notification.show {
    opacity: 1;
    transform: translateY(0);
}

.notification.success {
    background-color: #28a745;
    color: white;
}

.notification.error {
    background-color: #dc3545;
    color: white;
}

.notification.info {
    background-color: #17a2b8;
    color: white;
}
```

## Phase 3: HTML Structure Updates

### Step 1: Add View Mode Toggle Buttons

Update the navigation area in `enhanced-wiki.html`:

```html
<!-- Add after the breadcrumb navigation -->
<div class="view-controls">
    <div class="view-mode-selector">
        <button id="compact-mode-btn" title="Compact mode" class="view-mode-btn">
            <i class="fas fa-compress"></i>
        </button>
        <button id="normal-mode-btn" title="Normal mode" class="view-mode-btn active">
            <i class="fas fa-desktop"></i>
        </button>
        <button id="reading-mode-btn" title="Reading mode" class="view-mode-btn">
            <i class="fas fa-book-open"></i>
        </button>
    </div>
    <button id="theme-toggle" class="theme-btn" title="Toggle dark mode">
        <i class="fas fa-moon"></i>
    </button>
</div>
```

### Step 2: Add Notification Container

Add this just before the closing `</body>` tag in `enhanced-wiki.html`:

```html
<!-- Notification container -->
<div id="notification-container"></div>
```

### Step 3: Enhance Editor Area

Update the editor section in `enhanced-wiki.html`:

```html
<div id="edit-container" style="display: none;">
    <textarea id="editor"></textarea>
    <div class="editor-actions">
        <button id="cancel-edit" class="btn secondary-btn">Cancel</button>
        <button id="save-edit" class="btn primary-btn">Save Changes</button>
    </div>
</div>
```

## Phase 4: JavaScript Implementation

### Step 1: Implement State Management

Add to the top of `enhanced-wiki.js`:

```javascript
// Application state management
const appState = {
    theme: localStorage.getItem('theme') || 'light',
    viewMode: localStorage.getItem('viewMode') || 'normal',
    currentPage: null,
    currentDirectory: '',
    currentFile: '',
    isEditMode: false,
    
    // Update state
    update(changes) {
        Object.assign(this, changes);
        this.savePreferences();
        this.applyState();
    },
    
    // Save user preferences
    savePreferences() {
        localStorage.setItem('theme', this.theme);
        localStorage.setItem('viewMode', this.viewMode);
    },
    
    // Apply current state to UI
    applyState() {
        // Apply theme
        document.body.classList.toggle('theme-dark', this.theme === 'dark');
        
        // Apply view mode
        document.body.classList.remove('compact-mode', 'normal-mode', 'reading-mode');
        document.body.classList.add(`${this.viewMode}-mode`);
        
        // Update buttons
        updateViewModeButtons();
        
        // Update theme toggle
        updateThemeToggle();
    }
};
```

### Step 2: Implement View Mode Controls

Add to `enhanced-wiki.js`:

```javascript
// Set view mode
function setViewMode(mode) {
    appState.update({ viewMode: mode });
}

// Update view mode buttons
function updateViewModeButtons() {
    const compactBtn = document.getElementById('compact-mode-btn');
    const normalBtn = document.getElementById('normal-mode-btn');
    const readingBtn = document.getElementById('reading-mode-btn');
    
    if (!compactBtn || !normalBtn || !readingBtn) return;
    
    compactBtn.classList.toggle('active', appState.viewMode === 'compact');
    normalBtn.classList.toggle('active', appState.viewMode === 'normal');
    readingBtn.classList.toggle('active', appState.viewMode === 'reading');
}

// Toggle theme
function toggleTheme() {
    const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
    appState.update({ theme: newTheme });
}

// Update theme toggle button
function updateThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.innerHTML = appState.theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}
```

### Step 3: Add Notification System

Add to `enhanced-wiki.js`:

```javascript
// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to container or body
    const container = document.getElementById('notification-container') || document.body;
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
```

### Step 4: Enhance Editor Initialization

Update the editor initialization in `enhanced-wiki.js`:

```javascript
// Setup editor
function setupEditor(element, initialContent = '') {
    // If editor already exists, just update the value
    if (window.editor) {
        window.editor.value(initialContent);
        return window.editor;
    }
    
    // Initialize EasyMDE
    window.editor = new EasyMDE({
        element: element,
        spellChecker: true,
        autosave: {
            enabled: true,
            uniqueId: 'wiki-editor-autosave',
            delay: 1000,
        },
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', 'code', 'table', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'
        ],
        initialValue: initialContent,
        previewRender: function(markdownText) {
            return marked.parse(markdownText);
        }
    });
    
    return window.editor;
}
```

### Step 5: Update Event Listeners

Add to the initialization function in `enhanced-wiki.js`:

```javascript
// Add event listeners for view mode buttons
document.getElementById('compact-mode-btn').addEventListener('click', () => setViewMode('compact'));
document.getElementById('normal-mode-btn').addEventListener('click', () => setViewMode('normal'));
document.getElementById('reading-mode-btn').addEventListener('click', () => setViewMode('reading'));

// Add event listener for theme toggle
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Apply initial state
appState.applyState();
```

## Phase 5: Integration and Enhancement

### Step 1: Implement Search Functionality

Add to `enhanced-wiki.js`:

```javascript
// Search content
function searchContent(query) {
    query = query.toLowerCase();
    const results = [];
    
    // Search in page cache
    for (const key in pageCache.data) {
        const item = pageCache.data[key];
        const page = item.data;
        const title = page.title.toLowerCase();
        const content = page.content.toLowerCase();
        
        if (title.includes(query) || content.includes(query)) {
            results.push({
                title: page.title,
                snippet: getSearchSnippet(page.content, query),
                relevance: calculateRelevanceScore(page, query)
            });
        }
    }
    
    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    
    return results;
}

// Get search snippet
function getSearchSnippet(content, query) {
    const maxLength = 100;
    const lowerContent = content.toLowerCase();
    const index = lowerContent.indexOf(query);
    
    if (index === -1) return content.substring(0, maxLength) + '...';
    
    // Get context around match
    const start = Math.max(0, index - 40);
    const end = Math.min(content.length, index + query.length + 40);
    
    // Add ellipsis at beginning/end if needed
    let snippet = '';
    if (start > 0) snippet += '...';
    snippet += content.substring(start, end);
    if (end < content.length) snippet += '...';
    
    // Highlight match
    return snippet.replace(
        new RegExp(query, 'gi'),
        match => `<mark>${match}</mark>`
    );
}

// Calculate relevance score
function calculateRelevanceScore(page, query) {
    let score = 0;
    
    // Title matches are more important
    if (page.title.toLowerCase().includes(query)) {
        score += 10;
    }
    
    // Count occurrences in content
    const regex = new RegExp(query, 'gi');
    const contentMatches = (page.content.match(regex) || []).length;
    score += contentMatches;
    
    return score;
}
```

### Step 2: Enhance Notebook File Browsing

Update the notebook file display in `enhanced-wiki.js`:

```javascript
// Display notebook files
function displayNotebookFiles(directory, files) {
    const container = document.getElementById('notebookFiles');
    container.innerHTML = '';
    
    if (!files || files.length === 0) {
        container.innerHTML = '<div class="empty-state">No files found</div>';
        return;
    }
    
    files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'notebook-file';
        fileElement.innerHTML = `
            <i class="fas fa-file-alt file-icon"></i>
            <span>${file}</span>
        `;
        
        fileElement.addEventListener('click', () => {
            // Remove active class from all files
            document.querySelectorAll('.notebook-file').forEach(el => {
                el.classList.remove('active');
            });
            
            // Add active class to clicked file
            fileElement.classList.add('active');
            
            // Load file content
            loadNotebookContent(directory, file);
        });
        
        container.appendChild(fileElement);
    });
}
```

### Step 3: Update Save and Load Functions

Enhance the save functionality in `enhanced-wiki.js`:

```javascript
// Save page
function savePage(title, content) {
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to save page');
        return response.text();
    })
    .then(() => {
        // Show success notification
        showNotification('Page saved successfully', 'success');
        
        // Update cache
        if (pageCache.data[title]) {
            pageCache.data[title].data.content = content;
            pageCache.data[title].timestamp = Date.now();
        }
        
        // Switch to view mode
        switchToViewMode();
        
        // Reload page content
        loadPage(title);
    })
    .catch(error => {
        console.error('Error saving page:', error);
        showNotification(`Error saving page: ${error.message}`, 'error');
    });
}
```

## Phase 6: Testing and Deployment

### Step 1: Test All Features

1. Test theme toggling
2. Test view modes
3. Test notebook browsing
4. Test page editing and saving
5. Test notifications
6. Test responsive design

### Step 2: Update Docker Container

1. Restart the container to apply changes
2. Test the endpoint in the Docker environment

```bash
docker-compose restart constellation-viewer
```

### Step 3: Update Documentation

1. Update the documentation to reflect the new features
2. Create a user guide for the enhanced wiki

## Timeline Estimate

- Phase 1 (Setup): 1 hour
- Phase 2 (CSS): 2 hours
- Phase 3 (HTML): 1 hour
- Phase 4 (JavaScript): 3 hours
- Phase 5 (Integration): 2 hours
- Phase 6 (Testing): 2 hours

Total: Approximately 11 hours of development time

## Future Enhancements

After implementing these initial improvements, consider these future enhancements:

1. **Advanced Search**: Implement full-text search with indexing
2. **Tagging System**: Add a robust tagging and categorization system
3. **Version History**: Track changes to pages over time
4. **User Authentication**: Add login system with user roles
5. **Rich Media Support**: Enhance image and media handling
6. **Real-time Collaboration**: Implement collaborative editing

This implementation plan provides a comprehensive approach to enhancing the wiki system while preserving its core functionality.