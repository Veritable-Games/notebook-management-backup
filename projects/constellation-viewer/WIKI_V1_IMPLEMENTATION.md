# Wiki V1 Implementation Plan

This document outlines the implementation plan for the first version of the restarted wiki component. It focuses on delivering a basic but functional wiki interface that can be built upon in future versions.

## Core Components

### 1. Server (server.js)

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Path to the wiki data directory
const wikiDataPath = path.join(__dirname, '../data/wiki');
const notebooksPath = path.join('/home/user/Notebooks');

// Ensure wiki data directory exists
if (!fs.existsSync(wikiDataPath)) {
  fs.mkdirSync(wikiDataPath, { recursive: true });
}

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/wiki.html'));
});

// API endpoint to get all wiki pages
app.get('/api/pages', (req, res) => {
  try {
    const files = fs.readdirSync(wikiDataPath)
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    
    res.json({ pages: files });
  } catch (error) {
    console.error('Error reading wiki pages:', error);
    res.status(500).json({ error: 'Failed to read wiki pages' });
  }
});

// API endpoint to get a specific wiki page
app.get('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    const pageData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.json(pageData);
  } catch (error) {
    console.error(`Error reading wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to read wiki page' });
  }
});

// API endpoint to create or update a wiki page
app.post('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    // Get the current time
    const timestamp = new Date().toISOString();
    
    // Create page data with timestamps
    const pageData = {
      title: title,
      content: req.body.content,
      created: fs.existsSync(filePath) 
        ? JSON.parse(fs.readFileSync(filePath, 'utf8')).created 
        : timestamp,
      modified: timestamp
    };
    
    // Write the page data to a file
    fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2));
    
    res.json({ message: 'Page saved successfully' });
  } catch (error) {
    console.error(`Error saving wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to save wiki page' });
  }
});

// API endpoint to delete a wiki page
app.delete('/api/pages/:title', (req, res) => {
  try {
    const title = req.params.title;
    const filePath = path.join(wikiDataPath, `${title}.json`);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    fs.unlinkSync(filePath);
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error(`Error deleting wiki page ${req.params.title}:`, error);
    res.status(500).json({ error: 'Failed to delete wiki page' });
  }
});

// API endpoint to get all notebooks
app.get('/api/notebooks', (req, res) => {
  try {
    if (!fs.existsSync(notebooksPath)) {
      return res.status(404).json({ error: 'Notebooks directory not found' });
    }
    
    const directories = fs.readdirSync(notebooksPath)
      .filter(item => fs.statSync(path.join(notebooksPath, item)).isDirectory());
    
    res.json({ directories });
  } catch (error) {
    console.error('Error reading notebooks directory:', error);
    res.status(500).json({ error: 'Failed to read notebooks directory' });
  }
});

// API endpoint to get all files in a notebook
app.get('/api/notebooks/:directory', (req, res) => {
  try {
    const dirPath = path.join(notebooksPath, req.params.directory);
    
    if (!fs.existsSync(dirPath)) {
      return res.status(404).json({ error: 'Directory not found' });
    }
    
    const files = fs.readdirSync(dirPath)
      .filter(item => {
        const itemPath = path.join(dirPath, item);
        return fs.statSync(itemPath).isFile() && 
             (item.endsWith('.txt') || item.endsWith('.md'));
      });
    
    res.json({ files });
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).json({ error: 'Failed to read directory' });
  }
});

// API endpoint to get the content of a notebook file
app.get('/api/notebooks/:directory/:file', (req, res) => {
  try {
    const filePath = path.join(notebooksPath, req.params.directory, req.params.file);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Failed to read file');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Wiki server running at http://localhost:${port}`);
});
```

### 2. Frontend (wiki.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Constellation Viewer - Wiki</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.css">
  <script src="https://cdn.jsdelivr.net/npm/easymde/dist/easymde.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <link rel="stylesheet" href="wiki.css">
  <script src="wiki-links.js"></script>
  <script src="wiki.js" defer></script>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">
        <i class="fas fa-book-open"></i>
        <h1>Constellation Viewer</h1>
      </div>
      <div class="header-actions">
        <button id="theme-toggle" title="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
      </div>
    </header>
    
    <div class="content">
      <div class="sidebar">
        <div class="sidebar-section">
          <h3>Wiki Pages</h3>
          <button id="create-page-btn" class="action-button">
            <i class="fas fa-plus"></i> Create Page
          </button>
          <div id="pages-list" class="list"></div>
        </div>
        
        <div class="sidebar-section">
          <h3>Notebooks</h3>
          <select id="notebook-selector" class="select">
            <option value="">Select Notebook</option>
          </select>
          <div id="notebook-files" class="list"></div>
        </div>
      </div>
      
      <div class="main">
        <div class="toolbar">
          <div class="breadcrumb">
            <a href="/">Home</a>
            <span id="current-page-breadcrumb"></span>
          </div>
          <div class="actions">
            <button id="edit-btn" class="action-button" style="display: none;">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button id="save-btn" class="action-button" style="display: none;">
              <i class="fas fa-save"></i> Save
            </button>
            <button id="cancel-btn" class="action-button" style="display: none;">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </div>
        
        <div id="view-container" class="content-container">
          <div id="content-display" class="wiki-content"></div>
        </div>
        
        <div id="edit-container" class="content-container" style="display: none;">
          <textarea id="editor"></textarea>
        </div>
      </div>
    </div>
  </div>
  
  <div id="create-page-modal" class="modal" style="display: none;">
    <div class="modal-content">
      <h2>Create New Page</h2>
      <input type="text" id="new-page-title" placeholder="Page Title">
      <div class="modal-actions">
        <button id="create-page-cancel" class="action-button">Cancel</button>
        <button id="create-page-confirm" class="action-button primary">Create</button>
      </div>
    </div>
  </div>
</body>
</html>
```

### 3. JavaScript (wiki.js)

```javascript
// Configuration
const API_BASE_URL = '/api';

// State
let currentState = {
  theme: localStorage.getItem('theme') || 'light',
  currentPage: '',
  isEditMode: false,
  editor: null
};

// DOM Elements
const elements = {
  body: document.body,
  themeToggle: document.getElementById('theme-toggle'),
  pagesList: document.getElementById('pages-list'),
  notebookSelector: document.getElementById('notebook-selector'),
  notebookFiles: document.getElementById('notebook-files'),
  contentDisplay: document.getElementById('content-display'),
  viewContainer: document.getElementById('view-container'),
  editContainer: document.getElementById('edit-container'),
  editor: document.getElementById('editor'),
  editBtn: document.getElementById('edit-btn'),
  saveBtn: document.getElementById('save-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  createPageBtn: document.getElementById('create-page-btn'),
  createPageModal: document.getElementById('create-page-modal'),
  newPageTitle: document.getElementById('new-page-title'),
  createPageCancel: document.getElementById('create-page-cancel'),
  createPageConfirm: document.getElementById('create-page-confirm'),
  currentPageBreadcrumb: document.getElementById('current-page-breadcrumb')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Apply current theme
  applyTheme();
  
  // Load wiki pages
  loadWikiPages();
  
  // Load notebooks
  loadNotebooks();
  
  // Event listeners
  setupEventListeners();
});

// Apply theme
function applyTheme() {
  if (currentState.theme === 'dark') {
    elements.body.classList.add('theme-dark');
    elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    elements.body.classList.remove('theme-dark');
    elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

// Toggle theme
function toggleTheme() {
  currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentState.theme);
  applyTheme();
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Edit button
  elements.editBtn.addEventListener('click', () => {
    enterEditMode();
  });
  
  // Save button
  elements.saveBtn.addEventListener('click', () => {
    savePage();
  });
  
  // Cancel button
  elements.cancelBtn.addEventListener('click', () => {
    exitEditMode();
  });
  
  // Create page button
  elements.createPageBtn.addEventListener('click', () => {
    elements.createPageModal.style.display = 'flex';
    elements.newPageTitle.focus();
  });
  
  // Create page cancel button
  elements.createPageCancel.addEventListener('click', () => {
    elements.createPageModal.style.display = 'none';
    elements.newPageTitle.value = '';
  });
  
  // Create page confirm button
  elements.createPageConfirm.addEventListener('click', () => {
    createNewPage();
  });
  
  // Create page on Enter key
  elements.newPageTitle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      createNewPage();
    }
  });
  
  // Notebook selector
  elements.notebookSelector.addEventListener('change', () => {
    const directory = elements.notebookSelector.value;
    if (directory) {
      loadNotebookFiles(directory);
    } else {
      elements.notebookFiles.innerHTML = '';
    }
  });
}

// Load wiki pages
function loadWikiPages() {
  fetch(`${API_BASE_URL}/pages`)
    .then(response => response.json())
    .then(data => {
      elements.pagesList.innerHTML = '';
      
      if (data.pages.length === 0) {
        elements.pagesList.innerHTML = '<div class="empty-message">No pages found</div>';
        return;
      }
      
      data.pages.forEach(page => {
        const pageElement = document.createElement('div');
        pageElement.className = 'list-item';
        pageElement.innerHTML = `<i class="fas fa-file-alt"></i> ${page}`;
        pageElement.addEventListener('click', () => {
          loadPage(page);
        });
        elements.pagesList.appendChild(pageElement);
      });
    })
    .catch(error => {
      console.error('Error loading wiki pages:', error);
      elements.pagesList.innerHTML = '<div class="error-message">Failed to load pages</div>';
    });
}

// Load a specific page
function loadPage(title) {
  currentState.currentPage = title;
  elements.currentPageBreadcrumb.textContent = ` / ${title}`;
  
  fetch(`${API_BASE_URL}/pages/${title}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Page not found');
      }
      return response.json();
    })
    .then(data => {
      const renderedContent = marked.parse(data.content);
      elements.contentDisplay.innerHTML = renderedContent;
      
      // Show edit button
      elements.editBtn.style.display = 'block';
      
      // Process wiki links
      processWikiLinks();
    })
    .catch(error => {
      console.error(`Error loading page ${title}:`, error);
      elements.contentDisplay.innerHTML = `
        <div class="error-container">
          <h2>Page Not Found</h2>
          <p>The page "${title}" does not exist yet.</p>
          <button id="create-missing-page" class="action-button">Create this page</button>
        </div>
      `;
      
      // Handle creating the missing page
      document.getElementById('create-missing-page').addEventListener('click', () => {
        enterEditMode();
      });
    });
}

// Enter edit mode
function enterEditMode() {
  elements.viewContainer.style.display = 'none';
  elements.editContainer.style.display = 'block';
  elements.editBtn.style.display = 'none';
  elements.saveBtn.style.display = 'block';
  elements.cancelBtn.style.display = 'block';
  
  // Initialize or update editor
  if (!currentState.editor) {
    currentState.editor = new EasyMDE({
      element: elements.editor,
      spellChecker: true,
      autosave: {
        enabled: true,
        uniqueId: `wiki-editor-${currentState.currentPage}`,
        delay: 1000
      }
    });
  }
  
  // Set editor content
  fetch(`${API_BASE_URL}/pages/${currentState.currentPage}`)
    .then(response => {
      if (!response.ok) {
        return { content: '# ' + currentState.currentPage + '\n\nEnter page content here.' };
      }
      return response.json();
    })
    .then(data => {
      currentState.editor.value(data.content);
    });
  
  currentState.isEditMode = true;
}

// Exit edit mode
function exitEditMode() {
  elements.viewContainer.style.display = 'block';
  elements.editContainer.style.display = 'none';
  elements.editBtn.style.display = 'block';
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  
  currentState.isEditMode = false;
  
  // Reload current page
  if (currentState.currentPage) {
    loadPage(currentState.currentPage);
  }
}

// Save page
function savePage() {
  const content = currentState.editor.value();
  
  fetch(`${API_BASE_URL}/pages/${currentState.currentPage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
    .then(response => response.json())
    .then(data => {
      exitEditMode();
      loadWikiPages(); // Refresh page list
    })
    .catch(error => {
      console.error(`Error saving page ${currentState.currentPage}:`, error);
      alert('Failed to save page. Please try again.');
    });
}

// Create new page
function createNewPage() {
  const title = elements.newPageTitle.value.trim();
  
  if (!title) {
    alert('Please enter a page title');
    return;
  }
  
  // Close modal
  elements.createPageModal.style.display = 'none';
  elements.newPageTitle.value = '';
  
  // Set as current page and enter edit mode
  currentState.currentPage = title;
  elements.currentPageBreadcrumb.textContent = ` / ${title}`;
  
  enterEditMode();
}

// Load notebooks
function loadNotebooks() {
  fetch(`${API_BASE_URL}/notebooks`)
    .then(response => response.json())
    .then(data => {
      elements.notebookSelector.innerHTML = '<option value="">Select Notebook</option>';
      
      data.directories.forEach(directory => {
        const option = document.createElement('option');
        option.value = directory;
        option.textContent = directory;
        elements.notebookSelector.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error loading notebooks:', error);
      elements.notebookSelector.innerHTML = '<option value="">Failed to load notebooks</option>';
    });
}

// Load notebook files
function loadNotebookFiles(directory) {
  fetch(`${API_BASE_URL}/notebooks/${directory}`)
    .then(response => response.json())
    .then(data => {
      elements.notebookFiles.innerHTML = '';
      
      if (data.files.length === 0) {
        elements.notebookFiles.innerHTML = '<div class="empty-message">No files found</div>';
        return;
      }
      
      data.files.forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'list-item';
        fileElement.innerHTML = `<i class="fas fa-file-alt"></i> ${file}`;
        fileElement.addEventListener('click', () => {
          loadNotebookContent(directory, file);
        });
        elements.notebookFiles.appendChild(fileElement);
      });
    })
    .catch(error => {
      console.error(`Error loading files for ${directory}:`, error);
      elements.notebookFiles.innerHTML = '<div class="error-message">Failed to load files</div>';
    });
}

// Load notebook content
function loadNotebookContent(directory, file) {
  fetch(`${API_BASE_URL}/notebooks/${directory}/${file}`)
    .then(response => response.text())
    .then(content => {
      // Display notebook content
      const renderedContent = marked.parse(content);
      elements.contentDisplay.innerHTML = renderedContent;
      
      // Update breadcrumb
      elements.currentPageBreadcrumb.textContent = ` / Notebooks / ${directory} / ${file}`;
      
      // Hide edit button (notebooks are read-only)
      elements.editBtn.style.display = 'none';
      
      // Process wiki links
      processWikiLinks();
    })
    .catch(error => {
      console.error(`Error loading notebook file ${directory}/${file}:`, error);
      elements.contentDisplay.innerHTML = '<div class="error-message">Failed to load notebook file</div>';
    });
}

// Process wiki links in content
function processWikiLinks() {
  const content = elements.contentDisplay.innerHTML;
  
  // Process [[PageName]] links
  const processedContent = content.replace(/\[\[([^\]]+)\]\]/g, (match, pageName) => {
    return `<a href="#" class="wiki-link" onclick="loadPage('${pageName}'); return false;">${pageName}</a>`;
  });
  
  if (processedContent !== content) {
    elements.contentDisplay.innerHTML = processedContent;
  }
}

// Global function to load page (used by wiki links)
window.loadPage = loadPage;
```

### 4. CSS (wiki.css)

```css
/* Base styling */
:root {
  --primary: #14418B;
  --secondary: #2e5cb8;
  --accent: #9c27b0;
  --text: #333;
  --text-light: #666;
  --text-on-primary: #fff;
  --background: #fff;
  --surface: #f5f5f5;
  --border: #ddd;
  --shadow: rgba(0, 0, 0, 0.1);
  --header-height: 60px;
  --sidebar-width: 250px;
}

/* Dark theme */
.theme-dark {
  --primary: #3366cc;
  --secondary: #5c8de6;
  --accent: #ce93d8;
  --text: #eee;
  --text-light: #bbb;
  --text-on-primary: #fff;
  --background: #121212;
  --surface: #1e1e1e;
  --border: #444;
  --shadow: rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: var(--text);
  background-color: var(--background);
  line-height: 1.6;
  transition: background-color 0.3s, color 0.3s;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: var(--header-height);
  background-color: var(--primary);
  color: var(--text-on-primary);
  box-shadow: 0 2px 4px var(--shadow);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Content layout */
.content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: var(--sidebar-width);
  background-color: var(--surface);
  border-right: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
}

.main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* Sidebar sections */
.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-section h3 {
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: var(--primary);
  border-bottom: 1px solid var(--border);
  padding-bottom: 5px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 15px;
}

.list-item {
  padding: 8px 12px;
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.list-item:hover {
  background-color: var(--primary);
  color: var(--text-on-primary);
}

.list-item i {
  margin-right: 8px;
  color: var(--primary);
}

.list-item:hover i {
  color: var(--text-on-primary);
}

.empty-message, .error-message {
  padding: 12px;
  text-align: center;
  background-color: var(--surface);
  border-radius: 4px;
  font-size: 0.9rem;
  font-style: italic;
  color: var(--text-light);
}

.error-message {
  color: #e57373;
  background-color: rgba(229, 115, 115, 0.1);
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.breadcrumb {
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--primary);
  text-decoration: none;
}

.actions {
  display: flex;
  gap: 10px;
}

/* Buttons */
.action-button {
  background-color: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-button:hover {
  background-color: var(--primary);
  color: var(--text-on-primary);
}

.action-button.primary {
  background-color: var(--primary);
  color: var(--text-on-primary);
}

.action-button.primary:hover {
  background-color: var(--secondary);
}

/* Form elements */
.select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--background);
  color: var(--text);
  font-size: 0.9rem;
}

/* Content containers */
.content-container {
  background-color: var(--background);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 20px;
  min-height: 500px;
}

/* Wiki content styling */
.wiki-content {
  line-height: 1.6;
}

.wiki-content h1, .wiki-content h2, .wiki-content h3 {
  margin-top: 1.2em;
  margin-bottom: 0.8em;
  color: var(--primary);
}

.wiki-content h1 {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.3em;
}

.wiki-content h2 {
  font-size: 1.5rem;
}

.wiki-content h3 {
  font-size: 1.2rem;
}

.wiki-content p {
  margin-bottom: 1em;
}

.wiki-content ul, .wiki-content ol {
  margin-bottom: 1em;
  margin-left: 1.5em;
}

.wiki-content code {
  background-color: var(--surface);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}

.wiki-content pre {
  background-color: var(--surface);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 1em;
}

.wiki-content pre code {
  background-color: transparent;
  padding: 0;
}

.wiki-content blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 1em;
  color: var(--text-light);
  font-style: italic;
  margin-bottom: 1em;
}

/* Wiki links */
.wiki-link {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px dashed var(--accent);
  cursor: pointer;
  transition: all 0.2s;
}

.wiki-link:hover {
  background-color: rgba(156, 39, 176, 0.1);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--background);
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: var(--primary);
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid var(--border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--background);
  color: var(--text);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Error container */
.error-container {
  text-align: center;
  padding: 40px 20px;
}

.error-container h2 {
  color: var(--primary);
  margin-bottom: 15px;
}

.error-container p {
  margin-bottom: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}
```

## Implementation Steps

1. **Cleanup**:
   - Remove or rename existing conflicting files (enhanced-wiki.*, basic-styled.html)
   - Create new directories (data/wiki) for wiki storage

2. **Server Setup**:
   - Create new server.js with the implementation above
   - Update startup script to use port 8080 consistently

3. **Frontend Implementation**:
   - Create wiki.html, wiki.js, and wiki.css files
   - Implement basic functionality for creating and editing wiki pages
   - Implement notebook browsing integration

4. **Wiki Links**:
   - Update wiki-links.js to work with the new implementation
   - Ensure proper rendering of wiki links in content

5. **Testing**:
   - Test page creation and editing
   - Test notebook integration
   - Test wiki links functionality
   - Test theme toggling

## Success Criteria

The implementation will be considered successful when:

1. Users can create, view, and edit wiki pages
2. Wiki pages are stored as JSON files on disk
3. Wiki links work correctly
4. Notebook integration allows browsing and viewing notebook content
5. Theme switching (light/dark) works properly

This implementation provides a solid foundation that can be enhanced in future versions with more advanced features like search, tagging, and version history.