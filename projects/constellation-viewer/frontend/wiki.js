/**
 * Wiki System for Constellation Viewer
 * 
 * This file contains the JavaScript for the wiki interface, handling page loading,
 * editing, notebook integration, and more.
 */

// Configuration
const API_BASE_URL = '/api';

// State
let currentState = {
  theme: localStorage.getItem('theme') || 'light',
  currentPage: '',
  isEditMode: false,
  editor: null,
  currentNotebookDirectory: '',
  currentNotebookFile: '',
  isNotebookMode: false,
  searchQuery: ''
};

// DOM Elements
const elements = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  initializeElements();
  
  // Apply current theme
  applyTheme();
  
  // Load wiki pages
  loadWikiPages();
  
  // Load notebooks
  loadNotebooks();
  
  // Event listeners
  setupEventListeners();
  
  // Check for page parameter in URL
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  
  if (pageParam) {
    // Load the requested page
    loadPage(pageParam);
  } else {
    // Show welcome page if no specific page is requested
    showWelcomePage();
  }
});

/**
 * Initialize DOM elements
 */
function initializeElements() {
  elements.body = document.body;
  elements.themeToggle = document.getElementById('theme-toggle');
  elements.pagesList = document.getElementById('pages-list');
  elements.notebookSelector = document.getElementById('notebook-selector');
  elements.notebookFiles = document.getElementById('notebook-files');
  elements.contentDisplay = document.getElementById('content-display');
  elements.viewContainer = document.getElementById('view-container');
  elements.editContainer = document.getElementById('edit-container');
  elements.searchContainer = document.getElementById('search-container');
  elements.editor = document.getElementById('editor');
  elements.editBtn = document.getElementById('edit-btn');
  elements.saveBtn = document.getElementById('save-btn');
  elements.cancelBtn = document.getElementById('cancel-btn');
  elements.convertBtn = document.getElementById('convert-btn');
  elements.createPageBtn = document.getElementById('create-page-btn');
  elements.createPageModal = document.getElementById('create-page-modal');
  elements.newPageTitle = document.getElementById('new-page-title');
  elements.createPageCancel = document.getElementById('create-page-cancel');
  elements.createPageConfirm = document.getElementById('create-page-confirm');
  elements.currentPageBreadcrumb = document.getElementById('current-page-breadcrumb');
  elements.notification = document.getElementById('notification');
  elements.searchInput = document.getElementById('search-input');
  elements.searchBtn = document.getElementById('search-btn');
  elements.searchResults = document.getElementById('search-results');
  elements.searchQuery = document.getElementById('search-query');
}

/**
 * Apply theme
 */
function applyTheme() {
  if (currentState.theme === 'dark') {
    elements.body.classList.add('theme-dark');
    elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    elements.body.classList.remove('theme-dark');
    elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
}

/**
 * Toggle theme
 */
function toggleTheme() {
  currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentState.theme);
  applyTheme();
}

/**
 * Setup event listeners
 */
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
  
  // Convert button
  elements.convertBtn.addEventListener('click', () => {
    convertNotebookToWikiPage();
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
  
  // Search input
  elements.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = elements.searchInput.value.trim();
      if (query) {
        searchWiki(query);
      }
    }
  });
  
  // Search button
  elements.searchBtn.addEventListener('click', () => {
    const query = elements.searchInput.value.trim();
    if (query) {
      searchWiki(query);
    }
  });
}

/**
 * Load wiki pages
 */
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
        
        // Create a proper link instead of just a div with onclick
        pageElement.innerHTML = `<a href="?page=${encodeURIComponent(page)}" class="page-link"><i class="fas fa-file-alt"></i> ${page}</a>`;
        
        // Add click handler that updates the URL properly
        pageElement.querySelector('a').addEventListener('click', (e) => {
          e.preventDefault();
          loadPage(page);
          // Update URL without reloading the page
          history.pushState(null, page, `?page=${encodeURIComponent(page)}`);
        });
        
        elements.pagesList.appendChild(pageElement);
      });
    })
    .catch(error => {
      console.error('Error loading wiki pages:', error);
      elements.pagesList.innerHTML = '<div class="error-message">Failed to load pages</div>';
    });
}

/**
 * Load a specific page
 * @param {string} title - Page title to load
 * @returns {boolean} - True if page request was initiated (doesn't mean it exists)
 */
function loadPage(title) {
  if (!title) return false;
  
  // Update state
  currentState.currentPage = title;
  currentState.isNotebookMode = false;
  
  // Show breadcrumb
  elements.currentPageBreadcrumb.textContent = ` / ${title}`;
  
  // Show view container, hide others
  elements.viewContainer.style.display = 'block';
  elements.searchContainer.style.display = 'none';
  elements.editContainer.style.display = 'none';
  
  // Show edit button, hide other buttons
  elements.editBtn.style.display = 'block';
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  elements.convertBtn.style.display = 'none';
  
  // Highlight current page in the sidebar
  highlightCurrentPage(title);
  
  // Update URL without reloading the page
  history.pushState(null, title, `?page=${encodeURIComponent(title)}`);
  
  // Fetch and display the page
  fetch(`${API_BASE_URL}/pages/${title}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Page not found');
      }
      return response.json();
    })
    .then(data => {
      const renderedContent = marked.parse(data.content);
      
      // Create tags display if page has tags
      let tagsHtml = '';
      if (data.tags && data.tags.length > 0) {
        tagsHtml = `
          <div class="page-tags">
            ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        `;
      }
      
      // Create metadata display
      let metadataHtml = '';
      if (data.created || data.modified || data.source) {
        metadataHtml = `
          <div class="page-metadata">
            ${data.created ? `<div class="metadata-item"><strong>Created:</strong> ${new Date(data.created).toLocaleString()}</div>` : ''}
            ${data.modified ? `<div class="metadata-item"><strong>Modified:</strong> ${new Date(data.modified).toLocaleString()}</div>` : ''}
            ${data.source ? `<div class="metadata-item"><strong>Source:</strong> ${data.source.type}${data.source.path ? ': ' + data.source.path : ''}</div>` : ''}
          </div>
        `;
      }
      
      // Combine content with tags and metadata
      elements.contentDisplay.innerHTML = `
        ${tagsHtml}
        <div class="content-body">
          ${renderedContent}
        </div>
        ${metadataHtml}
      `;
      
      // Process wiki links
      processWikiLinks();
      
      // Make tags clickable for filtering
      document.querySelectorAll('.tag').forEach(tagElement => {
        tagElement.addEventListener('click', () => {
          searchWiki(tagElement.textContent);
        });
      });
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
    
  return true;
}

/**
 * Highlight the current page in the sidebar
 */
function highlightCurrentPage(title) {
  // Remove active class from all items
  const allItems = document.querySelectorAll('.list-item');
  allItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to the current page
  const pageItems = document.querySelectorAll('.list-item');
  pageItems.forEach(item => {
    const itemText = item.textContent.trim();
    if (itemText === title || itemText.endsWith(` ${title}`)) {
      item.classList.add('active');
    }
  });
}

/**
 * Enter edit mode
 */
function enterEditMode() {
  elements.viewContainer.style.display = 'none';
  elements.editContainer.style.display = 'block';
  elements.searchContainer.style.display = 'none';
  elements.editBtn.style.display = 'none';
  elements.saveBtn.style.display = 'block';
  elements.cancelBtn.style.display = 'block';
  elements.convertBtn.style.display = 'none';
  
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
        return { content: `# ${currentState.currentPage}\n\nEnter page content here.` };
      }
      return response.json();
    })
    .then(data => {
      currentState.editor.value(data.content);
    });
  
  currentState.isEditMode = true;
}

/**
 * Exit edit mode
 */
function exitEditMode() {
  elements.viewContainer.style.display = 'block';
  elements.editContainer.style.display = 'none';
  elements.searchContainer.style.display = 'none';
  
  if (currentState.isNotebookMode) {
    elements.editBtn.style.display = 'none';
    elements.convertBtn.style.display = 'block';
  } else {
    elements.editBtn.style.display = 'block';
    elements.convertBtn.style.display = 'none';
  }
  
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  
  currentState.isEditMode = false;
  
  // Reload current page or notebook
  if (currentState.isNotebookMode) {
    loadNotebookContent(currentState.currentNotebookDirectory, currentState.currentNotebookFile);
  } else if (currentState.currentPage) {
    loadPage(currentState.currentPage);
  }
}

/**
 * Save page
 */
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
      showNotification('Page saved successfully', 'success');
      loadWikiPages(); // Refresh page list
    })
    .catch(error => {
      console.error(`Error saving page ${currentState.currentPage}:`, error);
      showNotification('Failed to save page. Please try again.', 'error');
    });
}

/**
 * Create new page
 */
function createNewPage() {
  const title = elements.newPageTitle.value.trim();
  
  if (!title) {
    showNotification('Please enter a page title', 'warning');
    return;
  }
  
  // Close modal
  elements.createPageModal.style.display = 'none';
  elements.newPageTitle.value = '';
  
  // Set as current page and enter edit mode
  currentState.currentPage = title;
  currentState.isNotebookMode = false;
  elements.currentPageBreadcrumb.textContent = ` / ${title}`;
  
  enterEditMode();
}

/**
 * Load notebooks
 */
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

/**
 * Load notebook files
 */
function loadNotebookFiles(directory) {
  currentState.currentNotebookDirectory = directory;
  
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

/**
 * Load notebook content
 */
function loadNotebookContent(directory, file) {
  // Update state
  currentState.currentNotebookDirectory = directory;
  currentState.currentNotebookFile = file;
  currentState.isNotebookMode = true;
  
  // Show view container, hide others
  elements.viewContainer.style.display = 'block';
  elements.editContainer.style.display = 'none';
  elements.searchContainer.style.display = 'none';
  
  // Show convert button, hide other buttons
  elements.editBtn.style.display = 'none';
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  elements.convertBtn.style.display = 'block';
  
  // Update breadcrumb
  elements.currentPageBreadcrumb.textContent = ` / Notebooks / ${directory} / ${file}`;
  
  // Highlight current file in the sidebar
  highlightCurrentNotebook(file);
  
  // Fetch and display the notebook content
  fetch(`${API_BASE_URL}/notebooks/${directory}/${file}`)
    .then(response => response.text())
    .then(content => {
      // Display notebook content
      const renderedContent = marked.parse(content);
      elements.contentDisplay.innerHTML = renderedContent;
      
      // Process wiki links
      processWikiLinks();
    })
    .catch(error => {
      console.error(`Error loading notebook file ${directory}/${file}:`, error);
      elements.contentDisplay.innerHTML = '<div class="error-message">Failed to load notebook file</div>';
    });
}

/**
 * Highlight the current notebook in the sidebar
 */
function highlightCurrentNotebook(file) {
  // Remove active class from all items
  const allItems = document.querySelectorAll('.list-item');
  allItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to the current notebook
  const notebookItems = document.querySelectorAll('.list-item');
  notebookItems.forEach(item => {
    const itemText = item.textContent.trim();
    if (itemText === file || itemText.endsWith(` ${file}`)) {
      item.classList.add('active');
    }
  });
}

/**
 * Convert notebook to wiki page
 */
function convertNotebookToWikiPage() {
  const directory = currentState.currentNotebookDirectory;
  const file = currentState.currentNotebookFile;
  
  if (!directory || !file) {
    showNotification('No notebook file selected', 'error');
    return;
  }
  
  fetch(`${API_BASE_URL}/notebooks/${directory}/${file}/convert`, {
    method: 'POST'
  })
    .then(response => response.json())
    .then(data => {
      showNotification('Notebook converted to wiki page successfully', 'success');
      loadWikiPages(); // Refresh page list
      
      // Load the newly created wiki page
      setTimeout(() => {
        const title = file.replace(/\.(txt|md)$/, '');
        loadPage(title);
      }, 500);
    })
    .catch(error => {
      console.error(`Error converting notebook to wiki page:`, error);
      showNotification('Failed to convert notebook to wiki page', 'error');
    });
}

/**
 * Search wiki
 */
function searchWiki(query) {
  currentState.searchQuery = query;
  
  // Show search container, hide others
  elements.viewContainer.style.display = 'none';
  elements.editContainer.style.display = 'none';
  elements.searchContainer.style.display = 'block';
  
  // Hide all action buttons
  elements.editBtn.style.display = 'none';
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  elements.convertBtn.style.display = 'none';
  
  // Update breadcrumb
  elements.currentPageBreadcrumb.textContent = ` / Search / ${query}`;
  elements.searchQuery.textContent = query;
  
  // Show loading indicator
  elements.searchResults.innerHTML = '<div class="loading">Searching...</div>';
  
  fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      renderSearchResults(data);
    })
    .catch(error => {
      console.error('Error searching wiki:', error);
      elements.searchResults.innerHTML = '<div class="error-message">Failed to search wiki</div>';
    });
}

/**
 * Render search results
 */
function renderSearchResults(data) {
  const { results, query } = data;
  
  if (results.length === 0) {
    elements.searchResults.innerHTML = `
      <div class="empty-message">No results found for "${query}"</div>
    `;
    return;
  }
  
  elements.searchResults.innerHTML = '';
  
  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'search-result';
    resultElement.innerHTML = `
      <div class="search-result-title">${result.title}</div>
      <div class="search-result-excerpt">${highlightSearchTerm(result.excerpt, query)}</div>
      <div class="search-result-meta">
        <span>Created: ${formatDate(result.created)}</span>
        <span>Modified: ${formatDate(result.modified)}</span>
      </div>
    `;
    resultElement.addEventListener('click', () => {
      loadPage(result.title);
    });
    elements.searchResults.appendChild(resultElement);
  });
}

/**
 * Highlight search term in text
 */
function highlightSearchTerm(text, query) {
  const regex = new RegExp(query, 'gi');
  return text.replace(regex, match => `<mark>${match}</mark>`);
}

/**
 * Format date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Process wiki links in content
 */
function processWikiLinks() {
  const content = elements.contentDisplay.innerHTML;
  
  // Process [[PageName]] links
  const processedContent = content.replace(/\[\[([^\]]+)\]\]/g, (match, pageName) => {
    return `<a href="?page=${encodeURIComponent(pageName)}" class="wiki-link" data-page="${pageName}">${pageName}</a>`;
  });
  
  if (processedContent !== content) {
    elements.contentDisplay.innerHTML = processedContent;
    
    // Add click handlers to all wiki links
    document.querySelectorAll('.wiki-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageName = link.getAttribute('data-page') || link.textContent;
        loadPage(pageName);
        // Update URL without reloading the page
        history.pushState(null, pageName, `?page=${encodeURIComponent(pageName)}`);
      });
    });
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  elements.notification.textContent = message;
  elements.notification.className = `notification ${type}`;
  elements.notification.style.display = 'block';
  elements.notification.classList.add('show');
  
  setTimeout(() => {
    elements.notification.classList.remove('show');
    setTimeout(() => {
      elements.notification.style.display = 'none';
    }, 300);
  }, 3000);
}

/**
 * Show welcome page
 */
function showWelcomePage() {
  // Only show welcome page if no page is loaded
  if (window.location.pathname === '/' || window.location.pathname === '') {
    elements.contentDisplay.innerHTML = `
      <div class="welcome-container">
        <h1>Welcome to Constellation Viewer Wiki</h1>
        <p>This wiki is a system for documenting and browsing content with notebook integration.</p>
        
        <div class="features-list">
          <div class="feature-item">
            <i class="fas fa-book"></i>
            <h3>Wiki Pages</h3>
            <p>Create and edit wiki pages with Markdown.</p>
          </div>
          
          <div class="feature-item">
            <i class="fas fa-file-alt"></i>
            <h3>Notebooks</h3>
            <p>Browse and import notebook content.</p>
          </div>
          
          <div class="feature-item">
            <i class="fas fa-search"></i>
            <h3>Search</h3>
            <p>Find content across all wiki pages.</p>
          </div>
          
          <div class="feature-item">
            <i class="fas fa-link"></i>
            <h3>Wiki Links</h3>
            <p>Create links between pages with [[PageName]] syntax.</p>
          </div>
        </div>
        
        <p>Get started by creating a new page or exploring the available notebooks.</p>
        
        <div class="welcome-actions">
          <button id="welcome-create-page-btn" class="action-button primary">
            <i class="fas fa-plus"></i> Create New Page
          </button>
          <button id="welcome-browse-notebooks-btn" class="action-button">
            <i class="fas fa-folder-open"></i> Browse Notebooks
          </button>
          <button id="welcome-explore-pages-btn" class="action-button">
            <i class="fas fa-compass"></i> Explore Pages
          </button>
        </div>
      </div>
    `;
    
    // Set breadcrumb
    elements.currentPageBreadcrumb.textContent = '';
    
    // Hide action buttons
    elements.editBtn.style.display = 'none';
    elements.saveBtn.style.display = 'none';
    elements.cancelBtn.style.display = 'none';
    elements.convertBtn.style.display = 'none';
    
    // Set up welcome page buttons
    document.getElementById('welcome-create-page-btn').addEventListener('click', () => {
      elements.createPageModal.style.display = 'flex';
      elements.newPageTitle.focus();
    });
    
    document.getElementById('welcome-browse-notebooks-btn').addEventListener('click', () => {
      // Focus on notebook selector and simulate a click to show dropdown
      elements.notebookSelector.focus();
      elements.notebookSelector.classList.add('highlighted-select');
      
      // Add temporary highlighting 
      setTimeout(() => {
        elements.notebookSelector.classList.remove('highlighted-select');
      }, 2000);
    });
    
    document.getElementById('welcome-explore-pages-btn').addEventListener('click', () => {
      // If we have a "Welcome" page, load it
      if (loadPage('Welcome')) {
        return;
      }
      
      // Otherwise highlight the pages section
      const pagesSection = document.querySelector('.sidebar-section:first-child');
      pagesSection.classList.add('highlighted-section');
      
      // Remove highlighting after a moment
      setTimeout(() => {
        pagesSection.classList.remove('highlighted-section');
      }, 2000);
    });
  }
}

// Export functions for global access
window.app = {
  loadPage: loadPage,
  loadNotebookContent: loadNotebookContent
};