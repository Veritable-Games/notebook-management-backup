// Knowledge Constellation - Unified Wiki Interface
// This script provides functionality for the unified interface that
// combines wiki and notebook browsing capabilities

// Global state
const state = {
    currentPage: null,
    currentNotebook: null,
    currentNotebookFile: null,
    editor: null,
    theme: 'dark',
    isEditing: false
};

// DOM Elements
const elements = {
    // Navigation
    wikiViewBtn: document.getElementById('wiki-view-btn'),
    notebooksViewBtn: document.getElementById('notebooks-view-btn'),
    navigationList: document.getElementById('navigation-list'),
    recentPages: document.getElementById('recent-pages'),
    notebookSection: document.getElementById('notebook-section'),
    notebookDirectory: document.getElementById('notebook-directory'),
    notebookFiles: document.getElementById('notebook-files'),
    tagsCloud: document.getElementById('tags-cloud'),
    
    // Views
    wikiView: document.getElementById('wiki-view'),
    notebooksView: document.getElementById('notebooks-view'),
    editorView: document.getElementById('editor-view'),
    searchResultsView: document.getElementById('search-results-view'),
    
    // Wiki content
    pageTitle: document.getElementById('page-title'),
    pageContent: document.getElementById('page-content'),
    lastModified: document.getElementById('last-modified'),
    author: document.getElementById('author'),
    pageTags: document.getElementById('page-tags'),
    
    // Editor
    editorTitle: document.getElementById('editor-title'),
    tagsInput: document.getElementById('tags-input'),
    editNotes: document.getElementById('edit-notes'),
    
    // Notebook content
    notebookTitle: document.getElementById('notebook-title'),
    notebookContent: document.getElementById('notebook-content'),
    
    // Search
    searchInput: document.getElementById('search-input'),
    searchButton: document.getElementById('search-button'),
    searchQuery: document.getElementById('search-query'),
    searchResults: document.getElementById('search-results'),
    
    // Action buttons
    newPageBtn: document.getElementById('new-page-btn'),
    editBtn: document.getElementById('edit-btn'),
    historyBtn: document.getElementById('history-btn'),
    saveBtn: document.getElementById('save-btn'),
    cancelBtn: document.getElementById('cancel-btn'),
    importBtn: document.getElementById('import-btn'),
    toggleThemeBtn: document.getElementById('toggle-theme-btn'),
    closeSearchBtn: document.getElementById('close-search-btn'),
    
    // Modals
    newPageModal: document.getElementById('new-page-modal'),
    newPageTitle: document.getElementById('new-page-title'),
    newPageTags: document.getElementById('new-page-tags'),
    createPageBtn: document.getElementById('create-page-btn'),
    
    // Notification
    notification: document.getElementById('notification'),
    notificationMessage: document.getElementById('notification-message')
};

// Initialize the application
function init() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize the Markdown editor
    initEditor();
    
    // Load initial data
    loadRecentPages();
    loadAllTags();
    loadNotebookDirectories();
    
    // Switch to notebooks view by default to show available content
    switchView('notebooks');
}

// Set up event listeners
function setupEventListeners() {
    // View switching
    elements.wikiViewBtn.addEventListener('click', () => switchView('wiki'));
    elements.notebooksViewBtn.addEventListener('click', () => switchView('notebooks'));
    
    // Navigation
    elements.navigationList.addEventListener('click', handleNavigationClick);
    elements.recentPages.addEventListener('click', handleNavigationClick);
    
    // Notebook navigation
    elements.notebookDirectory.addEventListener('change', handleDirectoryChange);
    elements.notebookFiles.addEventListener('click', handleNotebookFileClick);
    
    // Actions
    elements.editBtn.addEventListener('click', startEditing);
    elements.saveBtn.addEventListener('click', savePage);
    elements.cancelBtn.addEventListener('click', cancelEditing);
    elements.newPageBtn.addEventListener('click', showNewPageModal);
    elements.importBtn.addEventListener('click', importNotebookToWiki);
    elements.toggleThemeBtn.addEventListener('click', toggleTheme);
    
    // Search
    elements.searchButton.addEventListener('click', performSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    elements.closeSearchBtn.addEventListener('click', closeSearch);
    
    // Modal actions
    elements.createPageBtn.addEventListener('click', createNewPage);
    document.querySelectorAll('.close-modal, .cancel-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            elements.newPageModal.style.display = 'none';
        });
    });
}

// Initialize the Markdown editor
function initEditor() {
    state.editor = new EasyMDE({
        element: document.getElementById('editor'),
        spellChecker: false,
        autofocus: true,
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', 'code', 'table', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'
        ],
        theme: state.theme === 'dark' ? 'easymde-dark-theme' : 'default'
    });
}

// Switch between view modes
function switchView(view) {
    // Update button states
    elements.wikiViewBtn.classList.toggle('active', view === 'wiki');
    elements.notebooksViewBtn.classList.toggle('active', view === 'notebooks');
    
    // Show/hide sidebar sections
    elements.notebookSection.style.display = view === 'notebooks' ? 'block' : 'none';
    
    // Show/hide main views
    elements.wikiView.style.display = view === 'wiki' ? 'block' : 'none';
    elements.notebooksView.style.display = view === 'notebooks' ? 'block' : 'none';
    elements.editorView.style.display = 'none';
    elements.searchResultsView.style.display = 'none';
}

// Load recent pages
async function loadRecentPages() {
    try {
        const response = await fetch('/pages/recent?limit=5');
        const data = await response.json();
        
        if (data.recentPages && data.recentPages.length > 0) {
            elements.recentPages.innerHTML = '';
            
            data.recentPages.forEach(page => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${page.title}`;
                a.dataset.page = page.title;
                a.textContent = page.title;
                li.appendChild(a);
                elements.recentPages.appendChild(li);
            });
        } else {
            elements.recentPages.innerHTML = '<li><a href="#none">No recent pages</a></li>';
        }
    } catch (error) {
        console.error('Error loading recent pages:', error);
        elements.recentPages.innerHTML = '<li><a href="#error">Error loading pages</a></li>';
        showNotification('Failed to load recent pages', 'error');
    }
}

// Load all tags
async function loadAllTags() {
    try {
        const response = await fetch('/pages');
        const data = await response.json();
        
        const allTags = new Set();
        
        if (data.entries && data.entries.length > 0) {
            data.entries.forEach(entry => {
                if (entry.metadata && entry.metadata.tags) {
                    entry.metadata.tags.forEach(tag => allTags.add(tag));
                }
            });
            
            elements.tagsCloud.innerHTML = '';
            
            Array.from(allTags).forEach(tag => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = tag;
                span.addEventListener('click', () => performSearch(tag));
                elements.tagsCloud.appendChild(span);
            });
        } else {
            elements.tagsCloud.innerHTML = '<span class="tag">No tags</span>';
        }
    } catch (error) {
        console.error('Error loading tags:', error);
        elements.tagsCloud.innerHTML = '<span class="tag">Error loading tags</span>';
    }
}

// Load notebook directories
async function loadNotebookDirectories() {
    try {
        const response = await fetch('/api/notebooks');
        const data = await response.json();
        
        if (data.directories && data.directories.length > 0) {
            elements.notebookDirectory.innerHTML = '<option value="">Select directory...</option>';
            
            data.directories.forEach(dir => {
                const option = document.createElement('option');
                option.value = dir;
                option.textContent = dir;
                elements.notebookDirectory.appendChild(option);
            });
        } else {
            elements.notebookDirectory.innerHTML = '<option value="">No directories found</option>';
        }
    } catch (error) {
        console.error('Error loading notebook directories:', error);
        elements.notebookDirectory.innerHTML = '<option value="">Error loading directories</option>';
        showNotification('Failed to load notebook directories', 'error');
    }
}

// Handle directory change
async function handleDirectoryChange() {
    const directory = elements.notebookDirectory.value;
    
    if (!directory) {
        elements.notebookFiles.innerHTML = '<li><a href="#select">Select a directory first</a></li>';
        return;
    }
    
    try {
        const response = await fetch(`/api/notebooks/${directory}`);
        const data = await response.json();
        
        if (data.files && data.files.length > 0) {
            elements.notebookFiles.innerHTML = '';
            
            data.files.forEach(file => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${directory}/${file}`;
                a.dataset.directory = directory;
                a.dataset.file = file;
                a.textContent = file;
                li.appendChild(a);
                elements.notebookFiles.appendChild(li);
            });
        } else {
            elements.notebookFiles.innerHTML = '<li><a href="#none">No files in this directory</a></li>';
        }
    } catch (error) {
        console.error('Error loading notebook files:', error);
        elements.notebookFiles.innerHTML = '<li><a href="#error">Error loading files</a></li>';
        showNotification('Failed to load notebook files', 'error');
    }
}

// Handle notebook file click
async function handleNotebookFileClick(event) {
    event.preventDefault();
    
    if (event.target.tagName !== 'A' || !event.target.dataset.directory || !event.target.dataset.file) {
        return;
    }
    
    const directory = event.target.dataset.directory;
    const file = event.target.dataset.file;
    
    state.currentNotebook = directory;
    state.currentNotebookFile = file;
    
    try {
        const response = await fetch(`/api/notebooks/${directory}/${file}`);
        const content = await response.text();
        
        elements.notebookTitle.textContent = file;
        elements.notebookContent.textContent = content;
        elements.importBtn.disabled = false;
        
        switchView('notebooks');
    } catch (error) {
        console.error('Error loading notebook file:', error);
        showNotification('Failed to load notebook file', 'error');
    }
}

// Import notebook to wiki
async function importNotebookToWiki() {
    if (!state.currentNotebook || !state.currentNotebookFile) {
        showNotification('No notebook file selected', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/api/notebooks/${state.currentNotebook}/${state.currentNotebookFile}`, {
            method: 'POST'
        });
        
        if (response.ok) {
            showNotification('Notebook added to wiki successfully');
            
            // Refresh recent pages
            loadRecentPages();
            
            // Load the imported page
            const title = state.currentNotebookFile.replace('.txt', '');
            loadPage(title);
            
            // Switch to wiki view
            switchView('wiki');
        } else {
            showNotification('Failed to add notebook to wiki', 'error');
        }
    } catch (error) {
        console.error('Error importing notebook:', error);
        showNotification('Error importing notebook', 'error');
    }
}

// Handle navigation click
function handleNavigationClick(event) {
    event.preventDefault();
    
    if (event.target.tagName !== 'A' || !event.target.dataset.page) {
        return;
    }
    
    const page = event.target.dataset.page;
    loadPage(page);
}

// Load a wiki page
async function loadPage(title) {
    try {
        const response = await fetch(`/pages/${title}?detailed=true`);
        
        if (!response.ok) {
            if (response.status === 404) {
                // Page doesn't exist, go to edit mode
                startNewPage(title);
                return;
            }
            throw new Error(`Failed to load page: ${response.statusText}`);
        }
        
        const page = await response.json();
        state.currentPage = page;
        
        // Update UI
        elements.pageTitle.textContent = page.title;
        elements.pageContent.innerHTML = marked.parse(page.content);
        
        // Update metadata
        if (page.metadata) {
            const created = new Date(page.metadata.created);
            const modified = new Date(page.metadata.modified);
            
            elements.lastModified.textContent = `Last modified: ${modified.toLocaleString()}`;
            elements.author.textContent = `Author: ${page.metadata.author || 'Unknown'}`;
            
            // Update tags
            elements.pageTags.innerHTML = '<span class="tag-label">Tags:</span>';
            
            if (page.metadata.tags && page.metadata.tags.length > 0) {
                page.metadata.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tag;
                    elements.pageTags.appendChild(span);
                });
            } else {
                const span = document.createElement('span');
                span.textContent = 'No tags';
                elements.pageTags.appendChild(span);
            }
        }
        
        // Update navigation
        document.querySelectorAll('.nav-list a').forEach(a => {
            a.classList.toggle('active', a.dataset.page === title);
        });
        
        // Switch to wiki view
        switchView('wiki');
    } catch (error) {
        console.error('Error loading page:', error);
        showNotification('Failed to load page', 'error');
    }
}

// Start editing a page
function startEditing() {
    if (!state.currentPage) {
        showNotification('No page selected', 'error');
        return;
    }
    
    state.isEditing = true;
    
    // Set editor values
    elements.editorTitle.value = state.currentPage.title;
    state.editor.value(state.currentPage.content);
    
    // Set tags
    if (state.currentPage.metadata && state.currentPage.metadata.tags) {
        elements.tagsInput.value = state.currentPage.metadata.tags.join(', ');
    } else {
        elements.tagsInput.value = '';
    }
    
    // Clear edit notes
    elements.editNotes.value = '';
    
    // Show editor view
    elements.wikiView.style.display = 'none';
    elements.notebooksView.style.display = 'none';
    elements.searchResultsView.style.display = 'none';
    elements.editorView.style.display = 'block';
    
    // Focus editor
    state.editor.codemirror.focus();
}

// Start creating a new page
function startNewPage(title) {
    state.currentPage = { title };
    state.isEditing = false;
    
    // Set editor values
    elements.editorTitle.value = title;
    state.editor.value('');
    elements.tagsInput.value = '';
    elements.editNotes.value = '';
    
    // Show editor view
    elements.wikiView.style.display = 'none';
    elements.notebooksView.style.display = 'none';
    elements.searchResultsView.style.display = 'none';
    elements.editorView.style.display = 'block';
    
    // Focus editor
    state.editor.codemirror.focus();
}

// Save the current page
async function savePage() {
    const title = elements.editorTitle.value.trim();
    const content = state.editor.value();
    const tagsInput = elements.tagsInput.value.trim();
    const notes = elements.editNotes.value.trim();
    
    if (!title) {
        showNotification('Title is required', 'error');
        return;
    }
    
    // Parse tags
    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
    
    try {
        const response = await fetch('/pages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content,
                notes,
                tags
            })
        });
        
        if (response.ok) {
            showNotification('Page saved successfully');
            
            // Refresh recent pages
            loadRecentPages();
            loadAllTags();
            
            // Load the saved page
            loadPage(title);
        } else {
            showNotification('Failed to save page', 'error');
        }
    } catch (error) {
        console.error('Error saving page:', error);
        showNotification('Error saving page', 'error');
    }
}

// Cancel editing
function cancelEditing() {
    if (state.currentPage && state.currentPage.title) {
        loadPage(state.currentPage.title);
    } else {
        switchView('wiki');
    }
}

// Show the new page modal
function showNewPageModal() {
    elements.newPageTitle.value = '';
    elements.newPageTags.value = '';
    elements.newPageModal.style.display = 'flex';
    
    // Focus title input
    setTimeout(() => elements.newPageTitle.focus(), 100);
}

// Create a new page from the modal
function createNewPage() {
    const title = elements.newPageTitle.value.trim();
    
    if (!title) {
        showNotification('Title is required', 'error');
        return;
    }
    
    // Hide modal
    elements.newPageModal.style.display = 'none';
    
    // Start new page
    startNewPage(title);
    
    // Set tags if provided
    elements.tagsInput.value = elements.newPageTags.value.trim();
}

// Perform search
async function performSearch(searchTerm) {
    let query = searchTerm;
    
    if (!query) {
        query = elements.searchInput.value.trim();
    }
    
    if (!query) {
        showNotification('Enter a search query', 'error');
        return;
    }
    
    try {
        const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        elements.searchQuery.textContent = query;
        
        if (data.results && data.results.length > 0) {
            elements.searchResults.innerHTML = '';
            
            data.results.forEach(result => {
                const div = document.createElement('div');
                div.className = 'search-result';
                div.innerHTML = `
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-excerpt">${result.excerpt}</div>
                    <div class="search-result-meta">
                        <div>${result.author} | ${new Date(result.modified).toLocaleDateString()}</div>
                        <div class="search-result-tags">
                            ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                div.addEventListener('click', () => {
                    loadPage(result.title);
                });
                
                elements.searchResults.appendChild(div);
            });
        } else {
            elements.searchResults.innerHTML = '<p>No results found</p>';
        }
        
        // Show search results view
        elements.wikiView.style.display = 'none';
        elements.notebooksView.style.display = 'none';
        elements.editorView.style.display = 'none';
        elements.searchResultsView.style.display = 'block';
        
        // Clear search input
        elements.searchInput.value = '';
    } catch (error) {
        console.error('Error searching:', error);
        showNotification('Error performing search', 'error');
    }
}

// Close search results
function closeSearch() {
    if (state.currentPage) {
        loadPage(state.currentPage.title);
    } else {
        switchView('wiki');
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    
    if (body.classList.contains('theme-dark')) {
        body.classList.remove('theme-dark');
        body.classList.add('theme-light');
        state.theme = 'light';
        elements.toggleThemeBtn.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
    } else {
        body.classList.remove('theme-light');
        body.classList.add('theme-dark');
        state.theme = 'dark';
        elements.toggleThemeBtn.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
    }
}

// Show a notification
function showNotification(message, type = 'success') {
    elements.notificationMessage.textContent = message;
    elements.notification.className = 'notification';
    
    if (type === 'error') {
        elements.notification.style.backgroundColor = 'rgba(234, 67, 53, 0.9)';
    } else {
        elements.notification.style.backgroundColor = 'rgba(66, 133, 244, 0.9)';
    }
    
    elements.notification.classList.add('show');
    
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
