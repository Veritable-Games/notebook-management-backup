/**
 * Enhanced Wiki System
 * 
 * A comprehensive improvement to the Constellation Viewer wiki implementation
 * with advanced features for navigation, editing, and content management.
 */

// Configuration variables
const API_CONFIG = {
    baseUrl: 'http://localhost:3003',
    endpoints: {
        pages: '/pages',
        notebooks: '/notebooks',
        logs: '/logs',
        systemLogs: '/logs'
    }
};

// Theme configuration with light/dark mode support
const THEME = {
    light: {
        primary: '#14418B',
        secondary: '#2e5cb8',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#333333',
        border: '#e0e0e0'
    },
    dark: {
        primary: '#3366cc',
        secondary: '#5c8de6',
        background: '#121212',
        surface: '#1e1e1e',
        text: '#e0e0e0',
        border: '#333333'
    }
};

// Cache implementation for better performance
const pageCache = {
    data: {},
    maxAge: 1000 * 60 * 5, // 5 minutes
    
    // Get an item from cache
    get(key) {
        const item = this.data[key];
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.maxAge) {
            delete this.data[key];
            return null;
        }
        
        return item.data;
    },
    
    // Add an item to cache
    set(key, data) {
        this.data[key] = {
            data,
            timestamp: Date.now()
        };
    },
    
    // Clear the cache
    clear() {
        this.data = {};
    }
};

// Navigation history management
const navigationHistory = {
    history: [],
    currentIndex: -1,
    
    // Add a page to history
    add(page) {
        // If we're not at the end of history, truncate
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        
        // Add the page
        this.history.push(page);
        this.currentIndex = this.history.length - 1;
        
        // Update navigation buttons
        this.updateButtons();
    },
    
    // Navigate back
    back() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateButtons();
            return this.history[this.currentIndex];
        }
        return null;
    },
    
    // Navigate forward
    forward() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.updateButtons();
            return this.history[this.currentIndex];
        }
        return null;
    },
    
    // Update button states
    updateButtons() {
        const backBtn = document.getElementById('nav-back');
        const forwardBtn = document.getElementById('nav-forward');
        
        if (backBtn) {
            backBtn.disabled = this.currentIndex <= 0;
            backBtn.style.opacity = this.currentIndex <= 0 ? 0.3 : 1;
        }
        
        if (forwardBtn) {
            forwardBtn.disabled = this.currentIndex >= this.history.length - 1;
            forwardBtn.style.opacity = this.currentIndex >= this.history.length - 1 ? 0.3 : 1;
        }
    }
};

// Notification system - robust implementation with inline styles
function showNotification(message, type = 'info') {
    console.log(`Notification (${type}):`, message);
    
    // Get or create container
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '70px'; // Below header
        container.style.right = '20px';
        container.style.zIndex = '1000';
        document.body.appendChild(container);
    }
    
    // Create notification element with inline styles
    const notification = document.createElement('div');
    notification.style.backgroundColor = type === 'error' ? '#ff4d4d' : type === 'success' ? '#4CAF50' : '#2196F3';
    notification.style.color = 'white';
    notification.style.padding = '12px 16px';
    notification.style.margin = '10px';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    notification.style.position = 'relative';
    notification.style.minWidth = '250px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    notification.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Add message
    notification.textContent = message;
    
    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '10px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.textContent = '×';
    closeBtn.style.fontSize = '20px';
    closeBtn.onclick = () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        setTimeout(() => notification.remove(), 300);
    };
    notification.appendChild(closeBtn);
    
    // Add to container
    container.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(50px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Content formatting with Markdown support
function formatContent(content, isMarkdown = true) {
    if (!content) return '';
    
    // Check if content is already HTML
    if (content.trim().startsWith('<')) {
        return content;
    }
    
    if (isMarkdown) {
        // Use marked library for Markdown processing
        return marked.parse(content);
    } else {
        // Basic formatting for plain text
        return content
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>')
            .replace(/^(.+)$/gm, '<p>$1</p>');
    }
}

// Wiki editor setup
function setupEditor(element, initialContent = '') {
    // Create EasyMDE editor
    const editor = new EasyMDE({
        element: element,
        initialValue: initialContent,
        spellChecker: true,
        autosave: {
            enabled: true,
            uniqueId: 'wiki-editor-draft',
            delay: 1000
        },
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|', 
            'link', 'image', 'code', 'table', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'
        ]
    });
    
    return editor;
}

// Wiki page loading
async function loadPage(title) {
    // Check cache first
    const cachedPage = pageCache.get(title);
    if (cachedPage) {
        return cachedPage;
    }
    
    try {
        // Request detailed page data
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}/${title}?detailed=true`);
        if (!response.ok) {
            return { 
                title, 
                content: `# ${title}\n\nThis page doesn't exist yet. Click 'Edit' to create it.`,
                metadata: {
                    created: new Date().toISOString(),
                    modified: new Date().toISOString(),
                    tags: [],
                    author: 'Current User'
                },
                history: []
            };
        }
        
        // Parse the full page data if it's JSON
        let page;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            // Full page data with metadata and history
            page = await response.json();
        } else {
            // Just content (backward compatibility)
            const content = await response.text();
            page = { 
                title, 
                content,
                metadata: {
                    created: new Date().toISOString(),
                    modified: new Date().toISOString(),
                    tags: [],
                    author: 'Current User'
                },
                history: []
            };
        }
        
        // Cache the result
        pageCache.set(title, page);
        
        return page;
    } catch (error) {
        console.error('Error loading page:', error);
        return { 
            title, 
            content: `# Error\n\nFailed to load page: ${error.message}`,
            metadata: {
                created: new Date().toISOString(),
                modified: new Date().toISOString(),
                tags: [],
                author: 'Current User'
            },
            history: []
        };
    }
}

// Save wiki page
async function savePage(title, content, notes = '', tags = null) {
    try {
        // If tags not provided, try to get them from existing page
        if (!tags) {
            const existingPage = pageCache.get(title);
            tags = existingPage?.metadata?.tags || [];
        }
        
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}`, {
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
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        // Invalidate cache to force reload with new metadata and history
        pageCache.data[title] = null;
        
        return true;
    } catch (error) {
        console.error('Error saving page:', error);
        return false;
    }
}

// Load all wiki pages for navigation
async function loadAllPages() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.entries || [];
    } catch (error) {
        console.error('Error loading all pages:', error);
        return [];
    }
}

// Notebook integration
async function loadNotebookDirectories() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.notebooks}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.directories || [];
    } catch (error) {
        console.error('Error loading notebook directories:', error);
        // Return static directories if API fails
        return [
            'on-command-wiki',
            'noxii-wiki-pages',
            'dodec-wiki-pages',
            'autumn-wiki-pages',
            'reference-wiki-pages'
        ];
    }
}

// Load notebook files
async function loadNotebookFiles(directory) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.notebooks}/${directory}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.files || [];
    } catch (error) {
        console.error('Error loading notebook files:', error);
        
        // Return static files based on directory
        let staticFiles = [];
        
        switch(directory) {
            case 'on-command-wiki':
                staticFiles = ['Home.txt', 'characters.txt', 'equipment.txt', 'world.txt'];
                break;
            case 'noxii-wiki-pages':
                staticFiles = ['Home.txt', 'Noxii_GDD.txt', 'Noxii_Pitch.txt'];
                break;
            case 'dodec-wiki-pages':
                staticFiles = ['Home.txt', 'the-thing-of-it.txt'];
                break;
            case 'autumn-wiki-pages':
                staticFiles = ['Home.txt', 'winter-spring-summer.txt'];
                break;
            case 'reference-wiki-pages':
                staticFiles = ['docker-key.txt', 'what-do-you-do.txt'];
                break;
            default:
                staticFiles = ['example.txt'];
        }
        
        return staticFiles;
    }
}

// Load notebook content
async function loadNotebookContent(directory, file) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.notebooks}/${directory}/${file}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        return await response.text();
    } catch (error) {
        console.error('Error loading notebook content:', error);
        
        // Return static content for display
        return `# ${file.replace('.txt', '')}

This is an example notebook file content.
The actual file could not be loaded due to access restrictions.

You can edit this content and save it as a wiki page using the "Add to Wiki" button.

## Example Content

- List item 1
- List item 2
- List item 3

> This is a blockquote showing how notebook content can be formatted.

\`\`\`
This is a code block
function example() {
    return "Hello, world!";
}
\`\`\`
`;
    }
}

// Add notebook to wiki
async function addNotebookToWiki(directory, file) {
    try {
        // Get content first to ensure we have something to add
        const content = await loadNotebookContent(directory, file);
        
        // Create a page title based on directory and file
        const title = `${directory}/${file.replace('.txt', '')}`;
        
        // Use existing save page functionality
        const success = await savePage(title, content, 'Imported from notebook', [directory]);
        
        if (!success) {
            throw new Error('Failed to save page');
        }
        
        // Clear cache to ensure fresh content
        pageCache.clear();
        
        // Show notification
        showNotification(`Added ${file} to wiki as ${title}`, 'success');
        
        return true;
    } catch (error) {
        console.error('Error adding notebook to wiki:', error);
        showNotification(`Failed to add notebook to wiki: ${error.message}`, 'error');
        return false;
    }
}

// Breadcrumb generation
function generateBreadcrumbs(title) {
    const parts = title.split('/');
    let path = '';
    
    return parts.map((part, index) => {
        path += (index > 0 ? '/' : '') + part;
        return {
            text: part,
            path: path
        };
    });
}

// UI rendering functions
function renderBreadcrumbs(title) {
    const breadcrumbPath = document.getElementById('breadcrumb-path');
    if (!breadcrumbPath) return;
    
    const breadcrumbs = generateBreadcrumbs(title);
    
    breadcrumbPath.innerHTML = breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        
        if (isLast) {
            return `<span class="breadcrumb-current">${crumb.text}</span>`;
        } else {
            return `<a href="#" data-path="${crumb.path}" class="breadcrumb-link">${crumb.text}</a> <span class="breadcrumb-separator">/</span> `;
        }
    }).join('');
    
    // Add event listeners to breadcrumb links
    const links = breadcrumbPath.querySelectorAll('.breadcrumb-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const path = link.getAttribute('data-path');
            if (path) {
                displayPage(path);
            }
        });
    });
}

// Display page content
function displayPage(title) {
    const contentTitle = document.getElementById('content-title');
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editNotesContainer = document.getElementById('editor-notes-container');
    const advancedSearchContainer = document.getElementById('advanced-search-container');
    const systemLogsContainer = document.getElementById('system-logs-container');
    
    if (!contentTitle || !contentContainer) return;
    
    // Hide all special containers
    if (historyContainer) historyContainer.style.display = 'none';
    if (editNotesContainer) editNotesContainer.style.display = 'none';
    if (advancedSearchContainer) advancedSearchContainer.style.display = 'none';
    if (systemLogsContainer) systemLogsContainer.style.display = 'none';
    
    // Make the read tab active
    const readTab = document.getElementById('read-tab');
    const editTab = document.getElementById('edit-tab');
    const historyTab = document.getElementById('history-tab');
    
    if (readTab && editTab && historyTab) {
        readTab.classList.add('active');
        editTab.classList.remove('active');
        historyTab.classList.remove('active');
    }
    
    // Show content container
    contentContainer.style.display = 'block';
    
    // Clear the quick search input
    const quickSearchInput = document.getElementById('quick-search-input');
    if (quickSearchInput) {
        quickSearchInput.value = '';
    }
    
    // Loading indicator
    contentContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Loading content...</p>
        </div>
    `;
    
    // Load and display the page
    loadPage(title).then(page => {
        // Update title
        contentTitle.textContent = page.title;
        document.title = `${page.title} - Veritable Games Wiki`;
        
        // Check if this is the home page - if so, add a list of wiki entries
        const isHomePage = title === 'Home' || title === 'home';
        
        // Update content
        contentContainer.innerHTML = formatContent(page.content);
        
        // If Home page, add wiki entries list
        if (isHomePage) {
            loadAllPages().then(pages => {
                // Group pages by category
                const pagesByCategory = {};
                
                pages.forEach(page => {
                    const parts = page.title.split('/');
                    if (parts.length > 1) {
                        const category = parts[0];
                        if (!pagesByCategory[category]) {
                            pagesByCategory[category] = [];
                        }
                        pagesByCategory[category].push(page);
                    } else if (page.title !== 'Home') {
                        if (!pagesByCategory['General']) {
                            pagesByCategory['General'] = [];
                        }
                        pagesByCategory['General'].push(page);
                    }
                });
                
                // Create HTML for page listing
                let wikiEntriesHTML = `
                    <div class="wiki-entries-list">
                        <h2>Wiki Contents</h2>
                `;
                
                // Add categories and pages
                Object.keys(pagesByCategory).sort().forEach(category => {
                    wikiEntriesHTML += `
                        <div class="wiki-category">
                            <h3>${category}</h3>
                            <ul>
                    `;
                    
                    pagesByCategory[category]
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .forEach(page => {
                            const displayName = page.title.includes('/') 
                                ? page.title.split('/').pop() 
                                : page.title;
                            
                            wikiEntriesHTML += `
                                <li><a href="#" data-page="${page.title}" class="wiki-entry-link">${displayName}</a></li>
                            `;
                        });
                    
                    wikiEntriesHTML += `
                            </ul>
                        </div>
                    `;
                });
                
                wikiEntriesHTML += `</div>`;
                
                // Append to content
                contentContainer.innerHTML += wikiEntriesHTML;
                
                // Add event listeners to links
                const links = contentContainer.querySelectorAll('.wiki-entry-link');
                links.forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const pageTitle = link.getAttribute('data-page');
                        if (pageTitle) {
                            displayPage(pageTitle);
                        }
                    });
                });
            });
        }
        
        // Set up edit button
        const editBtn = document.getElementById('edit-tab');
        if (editBtn) {
            editBtn.onclick = () => {
                showEditor(page.title, page.content);
            };
        }
        
        // Set up history button
        const historyBtn = document.getElementById('history-tab');
        if (historyBtn) {
            historyBtn.onclick = () => {
                showHistory(page.title);
            };
        }
        
        // Update breadcrumbs
        renderBreadcrumbs(page.title);
        
        // Update tags
        tagsManager.updateUI(page.title);
        
        // Setup tag button
        const addTagBtn = document.getElementById('add-tag-btn');
        if (addTagBtn) {
            addTagBtn.onclick = () => {
                const tag = prompt('Enter a new tag:');
                if (tag && tag.trim()) {
                    tagsManager.addTag(page.title, tag.trim());
                }
            };
        }
        
        // Add to recent pages
        recentPages.add(page.title);
        
        // Update navigation history
        navigationHistory.add(page.title);
        
        // Update last modified date
        const lastModifiedDate = document.getElementById('last-modified-date');
        if (lastModifiedDate) {
            const history = historyManager.getHistory(page.title);
            if (history.length > 0) {
                lastModifiedDate.textContent = new Date(history[0].timestamp).toLocaleString();
            } else {
                lastModifiedDate.textContent = 'Never modified';
            }
        }
    }).catch(error => {
        contentContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading page: ${error.message}</p>
                <button onclick="displayPage('Home')" class="action-button">
                    <i class="fas fa-home"></i> Go to Home
                </button>
            </div>
        `;
    });
}

// Perform quick search and show results in content area
function performQuickSearch(query) {
    console.log('Performing quick search for:', query);
    const contentTitle = document.getElementById('content-title');
    const contentContainer = document.getElementById('content-container');
    
    if (!contentContainer) return;
    
    // Update title
    if (contentTitle) {
        contentTitle.textContent = `Search Results: "${query}"`;
    }
    
    // Show loading indicator
    contentContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Searching for "${query}"...</p>
        </div>
    `;
    
    // Use the client-side search for immediate results
    advancedSearchManager.clientSideSearch(query).then(results => {
        if (results.length === 0) {
            contentContainer.innerHTML = `
                <div class="search-empty-state">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                    <button onclick="displayPage('Home')" class="action-button">
                        <i class="fas fa-home"></i> Go to Home
                    </button>
                </div>
            `;
            return;
        }
        
        // Build results HTML
        let searchResultsHTML = `
            <div class="search-results-container">
                <div class="search-summary">
                    Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
                </div>
                <div class="search-results-list">
        `;
        
        results.forEach(result => {
            // Format date if available
            let dateDisplay = '';
            if (result.modified) {
                const date = new Date(result.modified);
                dateDisplay = date.toLocaleDateString();
            }
            
            // Highlight query in title and excerpt
            const titleHighlighted = result.title.replace(
                new RegExp(`(${query})`, 'gi'), 
                '<mark>$1</mark>'
            );
            
            searchResultsHTML += `
                <div class="search-result-item">
                    <div class="search-result-title">
                        <a href="#" data-page="${result.title}">${titleHighlighted}</a>
                    </div>
                    <div class="search-result-excerpt">
                        ${advancedSearchManager.highlightMatches(result.excerpt, query)}
                    </div>
                    <div class="search-result-meta">
                        <div class="search-result-tags">
                            ${result.tags.map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                        </div>
                        ${dateDisplay ? `<div class="search-result-date">Last modified: ${dateDisplay}</div>` : ''}
                    </div>
                </div>
            `;
        });
        
        searchResultsHTML += `
                </div>
            </div>
        `;
        
        // Update content container
        contentContainer.innerHTML = searchResultsHTML;
        
        // Add event listeners to result links
        const resultLinks = contentContainer.querySelectorAll('.search-result-title a');
        resultLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageTitle = link.getAttribute('data-page');
                if (pageTitle) {
                    displayPage(pageTitle);
                }
            });
        });
    }).catch(error => {
        contentContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error performing search: ${error.message}</p>
                <button onclick="displayPage('Home')" class="action-button">
                    <i class="fas fa-home"></i> Go to Home
                </button>
            </div>
        `;
    });
}

// Show editor
function showEditor(title, content) {
    const readTab = document.getElementById('read-tab');
    const editTab = document.getElementById('edit-tab');
    const historyTab = document.getElementById('history-tab');
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editNotesContainer = document.getElementById('editor-notes-container');
    
    if (!readTab || !editTab || !contentContainer) return;
    
    // Switch tabs
    readTab.classList.remove('active');
    editTab.classList.add('active');
    if (historyTab) historyTab.classList.remove('active');
    
    // Hide history container if exists
    if (historyContainer) historyContainer.style.display = 'none';
    
    // Show content container
    contentContainer.style.display = 'block';
    
    // Create editor container
    contentContainer.innerHTML = '<textarea id="editor"></textarea>';
    
    // Set up editor
    const editor = setupEditor(document.getElementById('editor'), content);
    
    // Show edit notes container
    if (editNotesContainer) {
        editNotesContainer.style.display = 'block';
        const editNotesTextarea = document.getElementById('edit-notes');
        if (editNotesTextarea) {
            editNotesTextarea.value = '';
        }
    }
    
    // Add save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-button';
    saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    saveBtn.onclick = () => {
        const newContent = editor.value();
        const notes = document.getElementById('edit-notes') ? document.getElementById('edit-notes').value : '';
        
        // Add to history before saving
        historyManager.addEntry(title, newContent, notes);
        
        savePage(title, newContent).then(success => {
            if (success) {
                showNotification('Changes saved successfully!', 'success');
                
                // Switch back to read mode
                readTab.classList.add('active');
                editTab.classList.remove('active');
                
                // Hide edit notes
                if (editNotesContainer) editNotesContainer.style.display = 'none';
                
                // Reload and display the page
                displayPage(title);
            } else {
                showNotification('Failed to save changes. Please try again.', 'error');
            }
        });
    };
    
    // Add cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-button';
    cancelBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    cancelBtn.onclick = () => {
        if (confirm('Discard unsaved changes?')) {
            // Switch back to read mode
            readTab.classList.add('active');
            editTab.classList.remove('active');
            
            // Hide edit notes
            if (editNotesContainer) editNotesContainer.style.display = 'none';
            
            showNotification('Edit canceled, changes discarded', 'info');
            
            // Reload and display the page
            displayPage(title);
        }
    };
    
    // Add buttons to the page
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'editor-buttons';
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    contentContainer.appendChild(buttonContainer);
}

// Show history view
function showHistory(title) {
    const readTab = document.getElementById('read-tab');
    const editTab = document.getElementById('edit-tab');
    const historyTab = document.getElementById('history-tab');
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editNotesContainer = document.getElementById('editor-notes-container');
    
    if (!readTab || !editTab || !historyTab || !contentContainer || !historyContainer) return;
    
    // Switch tabs
    readTab.classList.remove('active');
    editTab.classList.remove('active');
    historyTab.classList.add('active');
    
    // Hide content container and edit notes
    contentContainer.style.display = 'none';
    if (editNotesContainer) editNotesContainer.style.display = 'none';
    
    // Show history container
    historyContainer.style.display = 'block';
    
    // Display history
    historyManager.displayHistory(title);
    
    // Set up refresh button
    const refreshBtn = document.getElementById('refresh-history');
    if (refreshBtn) {
        refreshBtn.onclick = () => {
            historyManager.displayHistory(title);
        };
    }
}

// Create new page
function createNewPage(title, content = '', options = {}) {
    if (!title) return;
    
    // Extract path parts for folder organization
    const pathParts = title.split('/');
    const pageName = pathParts[pathParts.length - 1];
    const folderPath = pathParts.slice(0, -1).join('/');
    
    // Default content if not provided
    if (!content) {
        // Use a better template with more helpful starting content
        content = `# ${pageName}

${folderPath ? `> Part of: ${folderPath}\n\n` : ''}
## Overview

Add your content here...

## Details

* Item one
* Item two

## Related Pages

* [Home](Home)
${options.relatedPages ? options.relatedPages.map(page => `* [${page}](${page})`).join('\n') : ''}
`;
    }
    
    // Show loading indicator in page content if visible
    const contentContainer = document.getElementById('content-container');
    if (contentContainer && contentContainer.style.display !== 'none') {
        contentContainer.innerHTML = `
            <div class="loading-indicator">
                <div class="spinner"></div>
                <p>Creating page "${title}"...</p>
            </div>
        `;
    }
    
    // Notes for history
    const notes = options.notes || 'Initial page creation';
    
    // Tags based on folder structure
    const tags = options.tags || [];
    if (folderPath && !tags.includes(folderPath)) {
        tags.push(folderPath);
    }
    
    // Save the page with tags and notes
    savePage(title, content, notes, tags).then(success => {
        if (success) {
            showNotification(`Page "${title}" created successfully`, 'success');
            
            // Update navigation
            loadAllPages().then(pages => {
                populateNavigation(pages);
                
                // Display the new page
                displayPage(title);
            });
        } else {
            showNotification(`Failed to create page "${title}"`, 'error');
        }
    });
}

// Show the new page modal with simpler approach
function showNewPageModal() {
    console.log('Showing new page modal');
    
    // Find the modal
    const modal = document.getElementById('new-page-modal');
    if (!modal) {
        console.error('New page modal element not found in the DOM');
        alert('Error: New page modal not found. Please refresh the page.');
        return;
    }
    
    // Reset form fields
    const pageNameInput = document.getElementById('page-name');
    if (pageNameInput) {
        pageNameInput.value = '';
    }
    
    // Reset and setup category select
    const categorySelect = document.getElementById('page-category');
    if (categorySelect) {
        // Use a safer approach with predefined HTML
        categorySelect.innerHTML = `
            <option value="">No Category (Root Level)</option>
            <option value="design">Design</option>
            <option value="characters">Characters</option>
            <option value="world">World</option>
            <option value="equipment">Equipment</option>
            <option value="narrative">Narrative</option>
            <option value="documentation">Documentation</option>
            <option value="__new__">+ Create New Category</option>
        `;
    }
    
    // Reset new category field and hide it
    const newCategoryInput = document.getElementById('new-category');
    if (newCategoryInput) {
        newCategoryInput.value = '';
    }
    
    const newCategoryGroup = document.getElementById('new-category-group');
    if (newCategoryGroup) {
        newCategoryGroup.style.display = 'none';
    }
    
    // Show the modal with both class and style
    modal.classList.add('active');
    modal.style.display = 'flex';
    
    // Focus the page name input after a short delay
    setTimeout(function() {
        if (pageNameInput) {
            pageNameInput.focus();
        }
    }, 100);
    
    console.log('New page modal shown');
}

// Set up event listeners for the new page modal
function setupNewPageModalEvents() {
    const modal = document.getElementById('new-page-modal');
    if (!modal) return;
    
    // Set up category select change event
    const categorySelect = document.getElementById('page-category');
    const newCategoryGroup = document.getElementById('new-category-group');
    
    if (categorySelect && newCategoryGroup) {
        categorySelect.addEventListener('change', () => {
            if (categorySelect.value === '__new__') {
                newCategoryGroup.style.display = 'block';
                document.getElementById('new-category').focus();
            } else {
                newCategoryGroup.style.display = 'none';
            }
        });
    }
    
    // Set up modal close button
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });
    
    // Set up form submission
    const form = modal.querySelector('#new-page-form');
    const createButton = modal.querySelector('.modal-confirm');
    
    if (form && createButton) {
        createButton.onclick = function(e) {
            e.preventDefault();
            console.log('Create page button clicked');
            
            // Get form values
            const category = categorySelect.value === '__new__' 
                ? document.getElementById('new-category').value 
                : categorySelect.value;
            const pageName = document.getElementById('page-name').value;
            const templateType = document.getElementById('page-template').value;
            const tagsInput = document.getElementById('new-page-tags');
            
            // Parse tags, handling the case where the element might not exist
            const tags = tagsInput ? 
                tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag) : 
                [];
            
            // Validate inputs
            if (!pageName) {
                showNotification('Please enter a page name', 'error');
                return;
            }
            
            if (categorySelect.value === '__new__' && !category) {
                showNotification('Please enter a category name', 'error');
                return;
            }
            
            // Determine the full page title
            const title = category ? `${category}/${pageName}` : pageName;
            
            // Generate content based on template
            let content = '';
            switch (templateType) {
                case 'empty':
                    content = `# ${pageName}`;
                    break;
                case 'guide':
                    content = `# ${pageName} Guide

${category ? `> Part of: ${category}\n\n` : ''}
## Introduction

Explain the purpose of this guide here...

## Prerequisites

* Requirement one
* Requirement two

## Step 1: Getting Started

Add content for the first step...

## Step 2: Configuration

Add configuration details...

## Next Steps

* Link to related content
* Additional resources

## Conclusion

Summary of what was covered in this guide.`;
                    break;
                case 'reference':
                    content = `# ${pageName} Reference

${category ? `> Part of: ${category}\n\n` : ''}
## Overview

Provide a brief description of ${pageName} here...

## Specifications

| Property | Value |
|----------|-------|
| Property 1 | Value 1 |
| Property 2 | Value 2 |
| Property 3 | Value 3 |

## Usage Examples

\`\`\`
Example code or usage here
\`\`\`

## Notes

Important information about ${pageName}...

## Related Pages

* [Home](Home)`;
                    break;
                default: // default template
                    content = `# ${pageName}

${category ? `> Part of: ${category}\n\n` : ''}
## Overview

Add your content here...

## Details

* Item one
* Item two

## Related Pages

* [Home](Home)`;
            }
            
            console.log(`Creating new page: ${title}`);
            
            // Directly use the savePage function instead of createNewPage
            savePage(title, content, 'Initial page creation', tags).then(success => {
                if (success) {
                    showNotification(`Page "${title}" created successfully`, 'success');
                    
                    // Refresh tree view
                    initializeContentTree();
                    
                    // Display the new page
                    setTimeout(() => {
                        displayPage(title);
                    }, 500);
                } else {
                    showNotification(`Failed to create page "${title}"`, 'error');
                }
            });
            
            // Close the modal
            modal.classList.remove('active');
        };
    }
}

// Show the new folder modal
function showNewFolderModal() {
    console.log('Showing new folder modal');
    // Display the existing modal
    const modal = document.getElementById('new-folder-modal');
    if (modal) {
        // Show the modal
        modal.classList.add('active');
        
        // Set up event listeners for the modal
        setupNewFolderModalEvents();
    } else {
        console.error('New folder modal element not found in the DOM');
    }
}

// Set up event listeners for the new folder modal
function setupNewFolderModalEvents() {
    const modal = document.getElementById('new-folder-modal');
    if (!modal) return;
    
    // Set up modal close button
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });
    
    // Set up form submission
    const createButton = modal.querySelector('.modal-confirm');
    
    if (createButton) {
        createButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get form values
            const folderName = document.getElementById('folder-name').value;
            const initialPage = document.getElementById('initial-page').value;
            const description = document.getElementById('folder-description').value;
            const tags = document.getElementById('page-tags').value
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag);
            
            // Validate inputs
            if (!folderName) {
                showNotification('Please enter a category name', 'error');
                return;
            }
            
            if (!initialPage) {
                showNotification('Please enter an initial page name', 'error');
                return;
            }
            
            // Determine the full page title for the initial page
            const title = `${folderName}/${initialPage}`;
            
            // Generate content
            const content = `# ${folderName} - ${initialPage}

## About ${folderName}

${description || `This is the main page for the ${folderName} category.`}

## Pages in this Category

* ${initialPage} (current page)

## Overview

Add your content here...

## Related Categories

* [Home](Home)`;
            
            // Create the initial page in the new folder
            createNewPage(title, content, {
                notes: `Initial page for ${folderName} category`,
                tags: [...tags, folderName]
            });
            
            // Close the modal
            modal.classList.remove('active');
        });
    }
}

// Show system logs
function showSystemLogs() {
    // Hide content containers
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editContainer = document.getElementById('edit-container');
    const discussionContainer = document.getElementById('discussion-container');
    const advancedSearchContainer = document.getElementById('advanced-search-container');
    
    // Show system logs container
    const systemLogsContainer = document.getElementById('system-logs-container');
    
    if (contentContainer) contentContainer.style.display = 'none';
    if (historyContainer) historyContainer.style.display = 'none';
    if (editContainer) editContainer.style.display = 'none';
    if (discussionContainer) discussionContainer.style.display = 'none';
    if (advancedSearchContainer) advancedSearchContainer.style.display = 'none';
    
    if (systemLogsContainer) {
        systemLogsContainer.style.display = 'block';
        
        // Load system logs
        loadSystemLogs();
        
        // Set up close button
        const closeBtn = document.getElementById('close-logs');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                systemLogsContainer.style.display = 'none';
                contentContainer.style.display = 'block';
            });
        }
        
        // Set up refresh button
        const refreshBtn = document.getElementById('refresh-logs');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                loadSystemLogs();
            });
        }
    }
}

// Load system logs from the server
async function loadSystemLogs() {
    const logsContainer = document.getElementById('logs-list');
    if (!logsContainer) return;
    
    // Show loading indicator
    logsContainer.innerHTML = `
        <div class="loading-placeholder">
            <div class="spinner"></div>
            <p>Loading system logs...</p>
        </div>
    `;
    
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.systemLogs}`);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const logs = await response.json();
        
        // Display logs
        if (logs.length === 0) {
            logsContainer.innerHTML = `
                <div class="empty-state">
                    <p>No logs available.</p>
                </div>
            `;
            return;
        }
        
        let logsHTML = '';
        logs.forEach(log => {
            const logClass = log.type || 'info';
            logsHTML += `
                <div class="log-entry ${logClass}">
                    <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
                    <div class="log-message">${log.message}</div>
                </div>
            `;
        });
        
        logsContainer.innerHTML = logsHTML;
    } catch (error) {
        logsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading logs: ${error.message}</p>
            </div>
        `;
    }
}

// Show advanced search
function showAdvancedSearch() {
    // Hide content containers
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editContainer = document.getElementById('edit-container');
    const discussionContainer = document.getElementById('discussion-container');
    const systemLogsContainer = document.getElementById('system-logs-container');
    
    // Show advanced search container
    const advancedSearchContainer = document.getElementById('advanced-search-container');
    
    if (contentContainer) contentContainer.style.display = 'none';
    if (historyContainer) historyContainer.style.display = 'none';
    if (editContainer) editContainer.style.display = 'none';
    if (discussionContainer) discussionContainer.style.display = 'none';
    if (systemLogsContainer) systemLogsContainer.style.display = 'none';
    
    if (advancedSearchContainer) {
        advancedSearchContainer.style.display = 'block';
        
        // Set up close button
        const closeBtn = document.getElementById('close-advanced-search');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                advancedSearchContainer.style.display = 'none';
                contentContainer.style.display = 'block';
            });
        }
        
        // Set up search button
        const searchBtn = document.getElementById('perform-search');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = document.getElementById('advanced-search-input').value;
                if (query) {
                    performAdvancedSearch(query);
                }
            });
        }
        
        // Handle Enter key in search input
        const searchInput = document.getElementById('advanced-search-input');
        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const query = searchInput.value;
                    if (query) {
                        performAdvancedSearch(query);
                    }
                }
            });
        }
    }
}

// Perform advanced search
async function performAdvancedSearch(query) {
    const resultsContainer = document.getElementById('advanced-search-results');
    if (!resultsContainer) return;
    
    // Get search options
    const searchTitles = document.getElementById('search-titles').checked;
    const searchContent = document.getElementById('search-content').checked;
    const searchTags = document.getElementById('search-tags').checked;
    
    // Show loading indicator
    resultsContainer.innerHTML = `
        <div class="loading-placeholder">
            <div class="spinner"></div>
            <p>Searching for "${query}"...</p>
        </div>
    `;
    
    try {
        // Build search URL with parameters
        const url = new URL(`${API_CONFIG.baseUrl}/search`);
        url.searchParams.append('q', query);
        url.searchParams.append('titles', searchTitles.toString());
        url.searchParams.append('content', searchContent.toString());
        url.searchParams.append('tags', searchTags.toString());
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const results = await response.json();
        
        // Display results
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-empty-state">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }
        
        let resultsHTML = `
            <div class="search-summary">
                Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"
            </div>
            <div class="search-results-list">
        `;
        
        results.forEach(result => {
            // Format date if available
            let dateDisplay = '';
            if (result.modified) {
                const date = new Date(result.modified);
                dateDisplay = date.toLocaleDateString();
            }
            
            resultsHTML += `
                <div class="search-result-item">
                    <div class="search-result-title">
                        <a href="#" data-page="${result.title}">${result.title}</a>
                    </div>
                    <div class="search-result-excerpt">
                        ${result.excerpt}
                    </div>
                    <div class="search-result-meta">
                        <div class="search-result-tags">
                            ${(result.tags || []).map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                        </div>
                        ${dateDisplay ? `<div class="search-result-date">Last modified: ${dateDisplay}</div>` : ''}
                    </div>
                </div>
            `;
        });
        
        resultsHTML += `</div>`;
        
        resultsContainer.innerHTML = resultsHTML;
        
        // Add event listeners to result links
        const resultLinks = resultsContainer.querySelectorAll('.search-result-title a');
        resultLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageTitle = link.getAttribute('data-page');
                if (pageTitle) {
                    // Close advanced search and show the page
                    const advancedSearchContainer = document.getElementById('advanced-search-container');
                    const contentContainer = document.getElementById('content-container');
                    
                    if (advancedSearchContainer) advancedSearchContainer.style.display = 'none';
                    if (contentContainer) contentContainer.style.display = 'block';
                    
                    displayPage(pageTitle);
                }
            });
        });
    } catch (error) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error performing search: ${error.message}</p>
            </div>
        `;
    }
}

// Initialize the content tree
function initializeContentTree() {
    const treeContainer = document.getElementById('wiki-tree');
    if (!treeContainer) return;
    
    // Show loading indicator
    treeContainer.innerHTML = `
        <div class="loading-placeholder">
            <div class="spinner"></div>
            <p>Loading content tree...</p>
        </div>
    `;
    
    // Load all pages and build tree
    loadAllPages().then(pages => {
        if (!pages || pages.length === 0) {
            // Use static tree content if no pages available from API
            const staticPages = [
                { title: "Home", modified: new Date().toISOString() },
                { title: "About", modified: new Date().toISOString() },
                { title: "Projects", modified: new Date().toISOString() },
                { title: "PS2 Forum", modified: new Date().toISOString() },
                { title: "Unity Project", modified: new Date().toISOString() },
                { title: "Three.js", modified: new Date().toISOString() },
                { title: "Notebooks", modified: new Date().toISOString() },
                { title: "design/game-design-document", modified: new Date().toISOString() },
                { title: "characters/index", modified: new Date().toISOString() },
                { title: "world/index", modified: new Date().toISOString() },
                { title: "equipment/index", modified: new Date().toISOString() },
                { title: "narrative/index", modified: new Date().toISOString() }
            ];
            pages = staticPages;
        }
        
        // Group pages by category
        const tree = {};
        
        // Add 'Home' as a special case
        tree['__root__'] = {
            pages: []
        };
        
        // Add predefined categories
        tree['design'] = { pages: [] };
        tree['characters'] = { pages: [] };
        tree['world'] = { pages: [] };
        tree['equipment'] = { pages: [] };
        tree['narrative'] = { pages: [] };
        
        // Sort pages into categories
        pages.forEach(page => {
            const parts = page.title.split('/');
            
            if (parts.length === 1) {
                // Root level page
                if (page.title !== 'Home') { // Skip Home page as it's special
                    tree['__root__'].pages.push(page);
                }
            } else {
                // Category page
                const category = parts[0];
                const pageName = parts.slice(1).join('/');
                
                if (!tree[category]) {
                    tree[category] = {
                        pages: []
                    };
                }
                
                tree[category].pages.push({
                    ...page,
                    title: pageName
                });
            }
        });
        
        // Ensure Home is at the top of the tree
        const homePage = pages.find(p => p.title === 'Home');
        if (homePage) {
            tree['__root__'].pages.unshift(homePage);
        }
        
        // Build tree HTML
        let treeHTML = '';
        
        // Always add Home first
        treeHTML += `
            <div class="tree-item active" data-page="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </div>
        `;
        
        // Add root pages
        if (tree['__root__'] && tree['__root__'].pages.length > 0) {
            tree['__root__'].pages.sort((a, b) => a.title.localeCompare(b.title));
            
            treeHTML += `
                <div class="tree-folder">
                    <div class="tree-folder-header">
                        <i class="fas fa-book tree-folder-icon"></i>
                        <span>Root Pages</span>
                    </div>
                    <div class="tree-folder-content">
            `;
            
            tree['__root__'].pages.forEach(page => {
                if (page.title !== 'Home') { // Skip Home since we already added it
                    treeHTML += `
                        <div class="tree-item" data-page="${page.title}">
                            <i class="fas fa-file"></i>
                            <span>${page.title}</span>
                        </div>
                    `;
                }
            });
            
            treeHTML += `</div></div>`;
        }
        
        // Add categories
        Object.keys(tree).sort().forEach(category => {
            if (category === '__root__') return; // Skip root pages
            
            // Skip empty categories
            if (tree[category].pages.length === 0 && 
                !['design', 'characters', 'world', 'equipment', 'narrative'].includes(category)) {
                return;
            }
            
            treeHTML += `
                <div class="tree-folder">
                    <div class="tree-folder-header">
                        <i class="fas fa-folder tree-folder-icon"></i>
                        <span>${category}</span>
                    </div>
                    <div class="tree-folder-content">
            `;
            
            // If it's one of our predefined categories but has no pages,
            // add a placeholder "index" page
            if (tree[category].pages.length === 0) {
                treeHTML += `
                    <div class="tree-item" data-page="${category}/index">
                        <i class="fas fa-file"></i>
                        <span>index</span>
                    </div>
                `;
            } else {
                // Sort pages within category
                tree[category].pages.sort((a, b) => a.title.localeCompare(b.title));
                
                tree[category].pages.forEach(page => {
                    treeHTML += `
                        <div class="tree-item" data-page="${category}/${page.title}">
                            <i class="fas fa-file"></i>
                            <span>${page.title}</span>
                        </div>
                    `;
                });
            }
            
            treeHTML += `</div></div>`;
        });
        
        // Update tree container
        treeContainer.innerHTML = treeHTML;
        
        // Add event listeners to tree elements
        const folderHeaders = treeContainer.querySelectorAll('.tree-folder-header');
        folderHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const folder = header.closest('.tree-folder');
                folder.classList.toggle('tree-folder-collapsed');
            });
        });
        
        const treeItems = treeContainer.querySelectorAll('.tree-item');
        treeItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                treeItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                const pageTitle = item.getAttribute('data-page');
                if (pageTitle) {
                    displayPage(pageTitle);
                }
            });
        });
    }).catch(error => {
        console.error('Error loading content tree:', error);
        
        // Fallback to static tree in case of error
        const staticTreeHTML = `
            <div class="tree-item active" data-page="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </div>
            <div class="tree-item" data-page="About">
                <i class="fas fa-info-circle"></i>
                <span>About</span>
            </div>
            <div class="tree-item" data-page="Projects">
                <i class="fas fa-project-diagram"></i>
                <span>Projects</span>
            </div>
            <div class="tree-folder">
                <div class="tree-folder-header">
                    <i class="fas fa-folder tree-folder-icon"></i>
                    <span>Documentation</span>
                </div>
                <div class="tree-folder-content">
                    <div class="tree-item" data-page="Notebooks">
                        <i class="fas fa-book"></i>
                        <span>Notebooks</span>
                    </div>
                    <div class="tree-item" data-page="Three.js">
                        <i class="fas fa-cube"></i>
                        <span>Three.js</span>
                    </div>
                    <div class="tree-item" data-page="Unity Project">
                        <i class="fas fa-gamepad"></i>
                        <span>Unity Project</span>
                    </div>
                    <div class="tree-item" data-page="PS2 Forum">
                        <i class="fas fa-comments"></i>
                        <span>PS2 Forum</span>
                    </div>
                </div>
            </div>
        `;
        
        treeContainer.innerHTML = staticTreeHTML;
        
        // Add event listeners to static tree
        const folderHeaders = treeContainer.querySelectorAll('.tree-folder-header');
        folderHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const folder = header.closest('.tree-folder');
                folder.classList.toggle('tree-folder-collapsed');
            });
        });
        
        const treeItems = treeContainer.querySelectorAll('.tree-item');
        treeItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                treeItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                const pageTitle = item.getAttribute('data-page');
                if (pageTitle) {
                    displayPage(pageTitle);
                }
            });
        });
    });
}

// Set up tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.wiki-tab');
    if (!tabs.length) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content containers
            const contentContainers = document.querySelectorAll('.tab-content');
            contentContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            // Show the corresponding content container
            const containerId = tab.id.replace('-tab', '-container');
            const container = document.getElementById(containerId);
            if (container) {
                container.style.display = 'block';
            }
        });
    });
}

// Set up modal close buttons
function setupModalCloseButtons() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Close modal when clicking close button
        const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        });
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// Initialize the wiki system with robust error handling
function initialize() {
    console.log('Initializing wiki system...');
    console.log('Page initialized at: ' + new Date().toISOString());
    
    // Make crucial functions available globally
    window.displayPage = displayPage;
    window.showNewPageModal = showNewPageModal;
    window.showNewFolderModal = showNewFolderModal;
    window.showSystemLogs = showSystemLogs;
    window.showAdvancedSearch = showAdvancedSearch;
    window.showNotification = showNotification;
    
    let initializeSuccess = true;
    
    // Initialize each component with separate try/catch blocks for better resilience
    try {
        // Set up basic navigation
        setupNavigation();
        console.log('Navigation setup complete');
    } catch (error) {
        console.error('ERROR setting up navigation:', error);
        showNotification('Navigation setup failed. Some navigation features may not work.', 'error');
        initializeSuccess = false;
    }
    
    try {
        // Set up content tree with static content for reliability
        setupTree();
        
        // Also try to load dynamic content tree (if setupTree fails, we still have the static tree)
        try {
            initializeContentTree();
        } catch (innerError) {
            console.error('Error initializing dynamic content tree:', innerError);
            // setupTree already provided a fallback, so no need to show another notification
        }
        
        console.log('Content tree setup complete');
    } catch (error) {
        console.error('ERROR setting up content tree:', error);
        showNotification('Content tree setup failed. Navigation may be limited.', 'error');
        initializeSuccess = false;
    }
    
    try {
        // Set up all tabs
        setupAllTabs();
        console.log('Tabs setup complete');
    } catch (error) {
        console.error('ERROR setting up tabs:', error);
        showNotification('Tab setup failed. Some tabs may not function properly.', 'error');
        initializeSuccess = false;
    }
    
    try {
        // Set up all modal functionality
        setupAllModals();
        console.log('Modals setup complete');
    } catch (error) {
        console.error('ERROR setting up modals:', error);
        showNotification('Modal setup failed. Some features like new page creation may not work.', 'error');
        initializeSuccess = false;
    }
    
    try {
        // Show the home page to start
        console.log('Loading home page...');
        displayPage('Home');
    } catch (error) {
        console.error('ERROR loading home page:', error);
        showNotification('Failed to load Home page. Please try navigating to another page.', 'error');
        initializeSuccess = false;
        
        // Show a visible error on the page
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message" style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">
                    <h3>Error Loading Home Page</h3>
                    <p>${error.message || 'Unknown error occurred'}</p>
                    <p>Please check the console for more details.</p>
                    <button onclick="location.reload()" style="padding: 8px 16px; background-color: #0d6efd; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">
                        Reload Page
                    </button>
                </div>
            `;
        }
    }
    
    // Show initialization status
    if (initializeSuccess) {
        showNotification('Wiki system initialized successfully', 'success');
    } else {
        showNotification('Wiki system initialized with some errors. Check console for details.', 'error');
    }
}

// Set up basic navigation
function setupNavigation() {
    console.log('Setting up navigation...');
    
    // Set up back/forward buttons
    const backBtn = document.getElementById('nav-back');
    const forwardBtn = document.getElementById('nav-forward');
    
    if (backBtn) {
        backBtn.onclick = function() {
            const page = navigationHistory.back();
            if (page) {
                displayPage(page);
            }
        };
    }
    
    if (forwardBtn) {
        forwardBtn.onclick = function() {
            const page = navigationHistory.forward();
            if (page) {
                displayPage(page);
            }
        };
    }
    
    // Set up view mode toggles
    const compactModeBtn = document.getElementById('compact-mode-btn');
    const normalModeBtn = document.getElementById('normal-mode-btn');
    const readingModeBtn = document.getElementById('reading-mode-btn');
    
    if (compactModeBtn) {
        compactModeBtn.onclick = function() { setViewMode('compact'); };
    }
    
    if (normalModeBtn) {
        normalModeBtn.onclick = function() { setViewMode('normal'); };
    }
    
    if (readingModeBtn) {
        readingModeBtn.onclick = function() { setViewMode('reading'); };
    }
    
    // Set up header buttons with direct onclick handlers
    const headerNewPageBtn = document.getElementById('header-new-page');
    if (headerNewPageBtn) {
        headerNewPageBtn.onclick = function() {
            console.log('New page button clicked');
            showNewPageModal();
        };
    }
    
    const headerNewFolderBtn = document.getElementById('header-new-folder');
    if (headerNewFolderBtn) {
        headerNewFolderBtn.onclick = function() {
            console.log('New folder button clicked');
            showNewFolderModal();
        };
    }
    
    const headerSystemLogsBtn = document.getElementById('header-system-logs');
    if (headerSystemLogsBtn) {
        headerSystemLogsBtn.onclick = function() {
            console.log('System logs button clicked');
            showSystemLogs();
        };
    }
    
    const headerAdvancedSearchBtn = document.getElementById('header-advanced-search');
    if (headerAdvancedSearchBtn) {
        headerAdvancedSearchBtn.onclick = function() {
            console.log('Advanced search button clicked');
            showAdvancedSearch();
        };
    }
    
    // Global search setup
    const globalSearchInput = document.getElementById('global-search-input');
    const globalSearchButton = document.getElementById('global-search-button');
    
    if (globalSearchInput && globalSearchButton) {
        // Handle search on Enter key
        globalSearchInput.onkeydown = function(e) {
            if (e.key === 'Enter') {
                performQuickSearch(globalSearchInput.value);
            }
        };
        
        // Handle search on button click
        globalSearchButton.onclick = function() {
            performQuickSearch(globalSearchInput.value);
        };
    }
}

// Set up the content tree with static data for reliability
function setupTree() {
    console.log('Setting up content tree...');
    try {
        const treeContainer = document.getElementById('wiki-tree');
        if (!treeContainer) {
            console.error('Tree container not found');
            showNotification('Navigation tree container not found. Some features may not work correctly.', 'error');
            return;
        }
        
        // Use a static tree for reliability
        const staticTreeHTML = `
            <div class="tree-item active" data-page="Home">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </div>
            <div class="tree-item" data-page="About">
                <i class="fas fa-info-circle"></i>
                <span>About</span>
            </div>
            <div class="tree-item" data-page="Projects">
                <i class="fas fa-project-diagram"></i>
                <span>Projects</span>
            </div>
            <div class="tree-folder">
                <div class="tree-folder-header">
                    <i class="fas fa-folder tree-folder-icon"></i>
                    <span>Documentation</span>
                </div>
                <div class="tree-folder-content">
                    <div class="tree-item" data-page="Notebooks">
                        <i class="fas fa-book"></i>
                        <span>Notebooks</span>
                    </div>
                    <div class="tree-item" data-page="Three.js">
                        <i class="fas fa-cube"></i>
                        <span>Three.js</span>
                    </div>
                    <div class="tree-item" data-page="Unity Project">
                        <i class="fas fa-gamepad"></i>
                        <span>Unity Project</span>
                    </div>
                    <div class="tree-item" data-page="PS2 Forum">
                        <i class="fas fa-comments"></i>
                        <span>PS2 Forum</span>
                    </div>
                </div>
            </div>
            <div class="tree-folder">
                <div class="tree-folder-header">
                    <i class="fas fa-folder tree-folder-icon"></i>
                    <span>Design</span>
                </div>
                <div class="tree-folder-content">
                    <div class="tree-item" data-page="design/game-design-document">
                        <i class="fas fa-file-alt"></i>
                        <span>Game Design Document</span>
                    </div>
                </div>
            </div>
            <div class="tree-folder">
                <div class="tree-folder-header">
                    <i class="fas fa-folder tree-folder-icon"></i>
                    <span>Characters</span>
                </div>
                <div class="tree-folder-content">
                    <div class="tree-item" data-page="characters/index">
                        <i class="fas fa-file-alt"></i>
                        <span>Index</span>
                    </div>
                </div>
            </div>
            <div class="tree-folder">
                <div class="tree-folder-header">
                    <i class="fas fa-folder tree-folder-icon"></i>
                    <span>Notebooks</span>
                </div>
                <div class="tree-folder-content">
                    <div class="tree-folder">
                        <div class="tree-folder-header">
                            <i class="fas fa-folder tree-folder-icon"></i>
                            <span>On Command Wiki</span>
                        </div>
                        <div class="tree-folder-content">
                            <div class="tree-item" data-page="notebooks/on-command-wiki/Home">
                                <i class="fas fa-file-alt"></i>
                                <span>Home</span>
                            </div>
                            <div class="tree-item" data-page="notebooks/on-command-wiki/human-weapons">
                                <i class="fas fa-file-alt"></i>
                                <span>Human Weapons</span>
                            </div>
                            <div class="tree-item" data-page="notebooks/on-command-wiki/renlei-buried-city">
                                <i class="fas fa-file-alt"></i>
                                <span>Renlei Buried City</span>
                            </div>
                        </div>
                    </div>
                    <div class="tree-folder">
                        <div class="tree-folder-header">
                            <i class="fas fa-folder tree-folder-icon"></i>
                            <span>Noxii Wiki</span>
                        </div>
                        <div class="tree-folder-content">
                            <div class="tree-item" data-page="notebooks/noxii-wiki-pages/Home">
                                <i class="fas fa-file-alt"></i>
                                <span>Home</span>
                            </div>
                            <div class="tree-item" data-page="notebooks/noxii-wiki-pages/Noxii_-_Pitch">
                                <i class="fas fa-file-alt"></i>
                                <span>Noxii - Pitch</span>
                            </div>
                            <div class="tree-item" data-page="notebooks/noxii-wiki-pages/cauterizing-suit">
                                <i class="fas fa-file-alt"></i>
                                <span>Cauterizing Suit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Try to set the HTML content
        try {
            treeContainer.innerHTML = staticTreeHTML;
        } catch (error) {
            console.error('Error setting tree HTML:', error);
            showNotification('Error loading navigation tree structure', 'error');
            
            // Fallback to a simpler tree structure
            treeContainer.innerHTML = `
                <div class="tree-item active" data-page="Home">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </div>
                <div class="tree-item" data-page="About">
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                </div>
            `;
        }
        
        // Add event listeners to folder headers with try/catch for reliability
        try {
            const folderHeaders = treeContainer.querySelectorAll('.tree-folder-header');
            folderHeaders.forEach(header => {
                header.onclick = function() {
                    try {
                        const folder = header.closest('.tree-folder');
                        folder.classList.toggle('tree-folder-collapsed');
                    } catch (e) {
                        console.error('Error toggling folder:', e);
                    }
                };
            });
            
            // Add event listeners to tree items with try/catch for reliability
            const treeItems = treeContainer.querySelectorAll('.tree-item');
            treeItems.forEach(item => {
                item.onclick = function() {
                    try {
                        // Remove active class from all items
                        treeItems.forEach(i => i.classList.remove('active'));
                        
                        // Add active class to clicked item
                        item.classList.add('active');
                        
                        const pageTitle = item.getAttribute('data-page');
                        if (pageTitle) {
                            displayPage(pageTitle);
                        }
                    } catch (e) {
                        console.error('Error handling tree item click:', e);
                        showNotification('Error navigating to page. Please try again.', 'error');
                    }
                };
            });
            
            console.log('Content tree setup complete with', treeItems.length, 'items and', folderHeaders.length, 'folders');
            showNotification('Navigation tree loaded successfully', 'success');
        } catch (error) {
            console.error('Error setting up tree event listeners:', error);
            showNotification('Navigation tree may not be fully functional', 'error');
        }
    } catch (error) {
        console.error('Critical error in setupTree:', error);
        showNotification('Failed to initialize navigation tree. Some features will not work.', 'error');
    }
}

// Set up all tabs in the wiki
function setupAllTabs() {
    console.log('Setting up tabs...');
    const tabs = document.querySelectorAll('.wiki-tab');
    if (!tabs.length) {
        console.error('No tabs found');
        return;
    }
    
    tabs.forEach(tab => {
        tab.onclick = function() {
            console.log('Tab clicked:', tab.id);
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all content containers
            const contentContainers = document.querySelectorAll('.tab-content');
            contentContainers.forEach(container => {
                container.style.display = 'none';
            });
            
            // Show the corresponding content container
            const containerId = tab.id.replace('-tab', '-container');
            const container = document.getElementById(containerId);
            if (container) {
                console.log('Showing container:', containerId);
                container.style.display = 'block';
            } else {
                console.error('Container not found:', containerId);
            }
        };
    });
    
    console.log('Tab setup complete with', tabs.length, 'tabs');
}

// Set up all modals in the system
function setupAllModals() {
    console.log('Setting up modals...');
    
    // Find all modals
    const modals = document.querySelectorAll('.modal');
    if (!modals.length) {
        console.error('No modals found');
    } else {
        console.log('Found', modals.length, 'modals');
        
        // Set up close buttons for all modals
        modals.forEach(modal => {
            // Close modal when clicking close button
            const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
            closeButtons.forEach(button => {
                button.onclick = function() {
                    console.log('Modal close button clicked for', modal.id);
                    modal.classList.remove('active');
                    modal.style.display = 'none'; // Add explicit display:none
                };
            });
            
            // Close modal when clicking outside content
            modal.onclick = function(e) {
                if (e.target === modal) {
                    console.log('Modal background clicked for', modal.id);
                    modal.classList.remove('active');
                    modal.style.display = 'none'; // Add explicit display:none
                }
            };
        });
    }
    
    // Specifically set up the new page modal form
    const newPageModal = document.getElementById('new-page-modal');
    if (newPageModal) {
        console.log('Setting up new page modal form');
        
        // Set up category select change event
        const categorySelect = document.getElementById('page-category');
        const newCategoryGroup = document.getElementById('new-category-group');
        
        if (categorySelect && newCategoryGroup) {
            categorySelect.onchange = function() {
                if (categorySelect.value === '__new__') {
                    newCategoryGroup.style.display = 'block';
                    const newCategoryInput = document.getElementById('new-category');
                    if (newCategoryInput) newCategoryInput.focus();
                } else {
                    newCategoryGroup.style.display = 'none';
                }
            };
        }
        
        // Set up form submission
        const createButton = newPageModal.querySelector('.modal-confirm');
        if (createButton) {
            createButton.onclick = function(e) {
                e.preventDefault();
                console.log('Create page button clicked');
                
                // Get form values
                const pageName = document.getElementById('page-name').value.trim();
                
                if (!pageName) {
                    alert('Please enter a page name');
                    return;
                }
                
                // Get category
                let category = '';
                if (categorySelect && categorySelect.value === '__new__') {
                    const newCategoryInput = document.getElementById('new-category');
                    if (newCategoryInput) {
                        category = newCategoryInput.value.trim();
                        if (!category) {
                            alert('Please enter a category name');
                            return;
                        }
                    }
                } else if (categorySelect) {
                    category = categorySelect.value;
                }
                
                // Get template type and tags
                const templateType = document.getElementById('page-template') ? 
                    document.getElementById('page-template').value : 'default';
                
                const tagsInput = document.getElementById('new-page-tags');
                const tags = tagsInput ? 
                    tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag) : 
                    [];
                
                // Determine the full page title
                const title = category ? `${category}/${pageName}` : pageName;
                
                // Show creating state
                createButton.disabled = true;
                createButton.textContent = 'Creating...';
                
                console.log('Creating page:', title);
                
                // Generate content based on template
                let content = '';
                switch (templateType) {
                    case 'empty':
                        content = `# ${pageName}`;
                        break;
                    case 'guide':
                        content = `# ${pageName} Guide\n\n${category ? `> Part of: ${category}\n\n` : ''}## Introduction\n\nExplain the purpose of this guide here...\n\n## Steps\n\n1. First step\n2. Second step\n3. Third step`;
                        break;
                    case 'reference':
                        content = `# ${pageName} Reference\n\n${category ? `> Part of: ${category}\n\n` : ''}## Overview\n\nAdd overview here...\n\n## Details\n\n* Detail one\n* Detail two`;
                        break;
                    default: // default template
                        content = `# ${pageName}\n\n${category ? `> Part of: ${category}\n\n` : ''}## Overview\n\nAdd content here...\n\n## Details\n\n* Item one\n* Item two\n\n## Related\n\n* [Home](Home)`;
                        break;
                }
                
                // Save the page
                savePage(title, content, 'Initial page creation', tags)
                    .then(success => {
                        if (success) {
                            alert(`Page "${title}" created successfully!`);
                            
                            // Close the modal
                            newPageModal.classList.remove('active');
                            newPageModal.style.display = 'none';
                            
                            // Refresh nav and display the new page
                            loadAllPages().then(pages => {
                                populateNavigation(pages);
                                displayPage(title);
                            }).catch(err => {
                                console.error('Error refreshing navigation:', err);
                                displayPage(title);
                            });
                        } else {
                            alert('Failed to create page.');
                            createButton.disabled = false;
                            createButton.textContent = 'Create Page';
                        }
                    })
                    .catch(error => {
                        console.error('Error creating page:', error);
                        alert(`Error creating page: ${error.message}`);
                        createButton.disabled = false;
                        createButton.textContent = 'Create Page';
                    });
            };
        }
    }
}
    
    // Set up new page button
    const newPageBtn = document.getElementById('new-page-btn');
    if (newPageBtn) {
        newPageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('New page button clicked');
            
            // Get existing categories for dropdown
            loadAllPages().then(pages => {
                // Extract categories from page titles
                const categories = new Set();
                pages.forEach(page => {
                    const parts = page.title.split('/');
                    if (parts.length > 1) {
                        categories.add(parts[0]);
                    }
                });
                
                console.log('Creating new page modal');
                // Create modal dialog for page creation
                const modal = document.createElement('div');
                modal.className = 'modal-overlay';
                modal.style.display = 'flex';
                modal.innerHTML = `
                    <div class="modal-container">
                        <div class="modal-header">
                            <h3>Create New Page</h3>
                            <button class="modal-close" aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form id="new-page-form">
                                <div class="form-group">
                                    <label for="page-category">Category (optional):</label>
                                    <select id="page-category">
                                        <option value="">No Category (Root Level)</option>
                                        ${Array.from(categories).sort().map(category => 
                                            `<option value="${category}">${category}</option>`
                                        ).join('')}
                                        <option value="__new__">+ Create New Category</option>
                                    </select>
                                </div>
                                <div id="new-category-group" class="form-group" style="display: none;">
                                    <label for="new-category">New Category Name:</label>
                                    <input type="text" id="new-category" placeholder="e.g. Projects, Documentation, etc.">
                                </div>
                                <div class="form-group">
                                    <label for="page-name">Page Name:</label>
                                    <input type="text" id="page-name" required placeholder="e.g. Getting Started, Installation, etc.">
                                </div>
                                <div class="form-group">
                                    <label for="page-template">Template:</label>
                                    <select id="page-template">
                                        <option value="default">Default</option>
                                        <option value="empty">Empty</option>
                                        <option value="guide">Guide</option>
                                        <option value="reference">Reference</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="new-page-tags">Tags (comma separated):</label>
                                    <input type="text" id="new-page-tags" placeholder="e.g. documentation, guide, important">
                                </div>
                                <div class="modal-actions">
                                    <button type="button" class="btn-cancel">Cancel</button>
                                    <button type="submit" class="btn-create">Create Page</button>
                                </div>
                            </form>
                        </div>
                    </div>
                `;
                
                // Add modal to document
                document.body.appendChild(modal);
                
                // Handle new category dropdown
                const categorySelect = document.getElementById('page-category');
                const newCategoryGroup = document.getElementById('new-category-group');
                
                categorySelect.addEventListener('change', () => {
                    if (categorySelect.value === '__new__') {
                        newCategoryGroup.style.display = 'block';
                        document.getElementById('new-category').focus();
                    } else {
                        newCategoryGroup.style.display = 'none';
                    }
                });
                
                // Template content generator
                function getTemplateContent(template, title, category) {
                    switch(template) {
                        case 'empty':
                            return `# ${title}`;
                        case 'guide':
                            return `# ${title} Guide

${category ? `> Part of: ${category}\n\n` : ''}
## Introduction

Explain the purpose of this guide here...

## Prerequisites

* Requirement one
* Requirement two

## Step 1: Getting Started

Detailed instructions...

## Step 2: Next Steps

More instructions...

## Troubleshooting

Common issues and solutions...

## Related Information

* [Home](Home)
${category ? `* [${category} Home](${category}/Home)` : ''}
`;
                        case 'reference':
                            return `# ${title} Reference

${category ? `> Part of: ${category}\n\n` : ''}
## Overview

Technical summary...

## Specifications

| Property | Value | Description |
|----------|-------|-------------|
| Property 1 | Value 1 | Description 1 |
| Property 2 | Value 2 | Description 2 |

## Examples

\`\`\`
Example code or usage
\`\`\`

## Notes

Additional information...

## Related References

* [Home](Home)
${category ? `* [${category} Home](${category}/Home)` : ''}
`;
                        default: // 'default'
                            return `# ${title}

${category ? `> Part of: ${category}\n\n` : ''}
## Overview

Add your content here...

## Details

* Item one
* Item two

## Related Pages

* [Home](Home)
${category ? `* [${category} Home](${category}/Home)` : ''}
`;
                    }
                }
                
                // Handle form submission
                const form = document.getElementById('new-page-form');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Get form values
                    let category = document.getElementById('page-category').value;
                    const pageName = document.getElementById('page-name').value.trim();
                    const template = document.getElementById('page-template').value;
                    const tagsInput = document.getElementById('new-page-tags').value.trim();
                    
                    // Check if creating new category
                    if (category === '__new__') {
                        category = document.getElementById('new-category').value.trim();
                        if (!category) {
                            // Show error
                            showNotification('Please enter a category name', 'error');
                            return;
                        }
                    }
                    
                    if (pageName) {
                        // Full page title with category if present
                        const fullPageName = category ? `${category}/${pageName}` : pageName;
                        
                        // Parse tags
                        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
                        
                        // Add category as tag if present
                        if (category && !tags.includes(category)) {
                            tags.push(category);
                        }
                        
                        // Get content from template
                        const content = getTemplateContent(template, pageName, category);
                        
                        // If creating new category, create index page first
                        if (category && category === document.getElementById('new-category')?.value.trim()) {
                            // Check if category already exists
                            loadPage(`${category}/Home`).then(existingPage => {
                                const categoryExists = existingPage && existingPage.content && 
                                    !existingPage.content.includes("This page doesn't exist yet");
                                
                                if (!categoryExists) {
                                    // Create index page for the folder
                                    const indexContent = `# ${category}

## Overview

This section contains pages related to ${category}.

## Pages

* [${pageName}](${fullPageName})

`;
                                    
                                    createNewPage(`${category}/Home`, indexContent, {
                                        notes: `Initial category creation for ${category}`,
                                        tags: [category, 'index', 'category']
                                    }).then(() => {
                                        // Create the page after index is created
                                        createNewPage(fullPageName, content, {
                                            notes: `New page in ${category} category`,
                                            tags
                                        });
                                    });
                                } else {
                                    // Just create the page
                                    createNewPage(fullPageName, content, {
                                        notes: `New page in ${category} category`,
                                        tags
                                    });
                                }
                            });
                        } else {
                            // Create page normally
                            createNewPage(fullPageName, content, {
                                notes: category ? `New page in ${category} category` : 'New page creation',
                                tags
                            });
                        }
                        
                        // Close modal
                        document.body.removeChild(modal);
                    }
                });
                
                // Handle close button
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Handle cancel button
                const cancelBtn = modal.querySelector('.btn-cancel');
                cancelBtn.addEventListener('click', () => {
                    document.body.removeChild(modal);
                });
                
                // Handle clicks outside modal
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        document.body.removeChild(modal);
                    }
                });
                
                // Focus first input
                document.getElementById('page-name').focus();
            });
        });
    }
    
    // Set up new folder (category) button
    const newFolderBtn = document.getElementById('new-folder-btn');
    if (newFolderBtn) {
        newFolderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('New folder button clicked');
            
            // Create modal dialog for folder creation
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>Create New Category</h3>
                        <button class="modal-close" aria-label="Close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="new-folder-form">
                            <div class="form-group">
                                <label for="folder-name">Category Name:</label>
                                <input type="text" id="folder-name" required placeholder="e.g. Projects, Documentation, etc.">
                            </div>
                            <div class="form-group">
                                <label for="initial-page">Initial Page Name:</label>
                                <input type="text" id="initial-page" required placeholder="e.g. Overview, Introduction, etc.">
                            </div>
                            <div class="form-group">
                                <label for="page-tags">Tags (comma separated):</label>
                                <input type="text" id="page-tags" placeholder="e.g. documentation, guide, important">
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="btn-cancel">Cancel</button>
                                <button type="submit" class="btn-create">Create Category</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            
            // Add modal to document
            document.body.appendChild(modal);
            
            // Handle form submission
            const form = document.getElementById('new-folder-form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const folderName = document.getElementById('folder-name').value.trim();
                const pageName = document.getElementById('initial-page').value.trim();
                const tagsInput = document.getElementById('page-tags').value.trim();
                
                if (folderName && pageName) {
                    const fullPageName = `${folderName}/${pageName}`;
                    
                    // Parse tags
                    const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];
                    
                    // Add folder as tag
                    if (!tags.includes(folderName)) {
                        tags.push(folderName);
                    }
                    
                    // Create template for index page
                    const indexContent = `# ${folderName}

## Overview

This section contains pages related to ${folderName}.

## Pages

* [${pageName}](${fullPageName})

`;
                    
                    // Create index page for the folder
                    createNewPage(`${folderName}/Home`, indexContent, {
                        notes: `Initial category creation for ${folderName}`,
                        tags: [folderName, 'index', 'category']
                    }).then(() => {
                        // Create the initial page
                        createNewPage(fullPageName, '', {
                            notes: `Initial page in ${folderName} category`,
                            tags
                        });
                    });
                    
                    // Close modal
                    document.body.removeChild(modal);
                }
            });
            
            // Handle close button
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Handle cancel button
            const cancelBtn = modal.querySelector('.btn-cancel');
            cancelBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Handle clicks outside modal
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Focus first input
            document.getElementById('folder-name').focus();
        });
    }
    
    // Load and populate navigation
    loadAllPages().then(pages => {
        populateNavigation(pages);
    });
    
    // Fetch recent pages from server
    recentPages.fetchFromServer().catch(() => {
        // If server fetch fails, use local storage
        recentPages.updateUI();
    });
    
    // Initial page load
    const initialPage = 'Home';
    displayPage(initialPage);
    
    // Set up notebook browser
    setupNotebookBrowser();
}

// Populate navigation sidebar
function populateNavigation(pages) {
    const navList = document.getElementById('nav-pages');
    if (!navList) return;
    
    // Group pages by category
    const categories = {};
    
    pages.forEach(page => {
        const parts = page.title.split('/');
        
        if (parts.length > 1) {
            const category = parts[0];
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(page);
        } else {
            if (!categories['General']) {
                categories['General'] = [];
            }
            categories['General'].push(page);
        }
    });
    
    // Build navigation
    Object.keys(categories).sort().forEach(category => {
        // Skip special pages
        if (category === 'System') return;
        
        const categorySection = document.createElement('div');
        categorySection.className = 'nav-category';
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);
        
        const pagesList = document.createElement('ul');
        pagesList.className = 'nav-pages-list';
        
        categories[category].sort((a, b) => a.title.localeCompare(b.title)).forEach(page => {
            const pageItem = document.createElement('li');
            
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = page.title.includes('/') ? page.title.split('/').pop() : page.title;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayPage(page.title);
            });
            
            pageItem.appendChild(pageLink);
            pagesList.appendChild(pageItem);
        });
        
        categorySection.appendChild(pagesList);
        navList.appendChild(categorySection);
    });
}

// Set up notebook browser
function setupNotebookBrowser() {
    const directorySelect = document.getElementById('notebook-directory');
    const filesContainer = document.getElementById('notebook-files');
    
    if (!directorySelect || !filesContainer) {
        console.error('Notebook browser elements not found');
        return;
    }
    
    // Load notebook directories
    loadNotebookDirectories().then(directories => {
        if (directories.length > 0) {
            // Add options for each directory
            directories.forEach(dir => {
                const option = document.createElement('option');
                option.value = dir;
                option.textContent = dir;
                directorySelect.appendChild(option);
            });
            
            // Enable the select element
            directorySelect.disabled = false;
        }
    });
    
    // Directory selection change event
    directorySelect.addEventListener('change', () => {
        const selectedDir = directorySelect.value;
        filesContainer.innerHTML = '';
        
        if (selectedDir) {
            // Fetch files in the selected directory
            loadNotebookFiles(selectedDir).then(files => {
                if (files.length > 0) {
                    // Add each file as a clickable item
                    files.forEach(file => {
                        const fileElem = document.createElement('div');
                        fileElem.className = 'notebook-file';
                        fileElem.innerHTML = `
                            <i class="fas fa-file-alt file-icon"></i>
                            <span>${file}</span>
                        `;
                        fileElem.addEventListener('click', () => {
                            // Remove active class from all files
                            document.querySelectorAll('.notebook-file').forEach(el => {
                                el.classList.remove('active');
                            });
                            
                            // Add active class to clicked file
                            fileElem.classList.add('active');
                            
                            showNotebookContent(selectedDir, file);
                        });
                        filesContainer.appendChild(fileElem);
                    });
                } else {
                    filesContainer.innerHTML = '<p>No text files found</p>';
                }
            });
        }
    });
}

// Show notebook content
function showNotebookContent(directory, file) {
    // Show loading indicator
    const contentContainer = document.getElementById('content-container');
    const contentTitle = document.getElementById('content-title');
    
    if (!contentTitle || !contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Loading notebook content...</p>
        </div>
    `;
    
    // Update title immediately to show loading state
    contentTitle.textContent = `Loading ${file}...`;
    
    loadNotebookContent(directory, file).then(content => {
        // Update title
        contentTitle.textContent = file;
        document.title = `${file} - Notebook - Veritable Games Wiki`;
        
        // Attempt to detect if content is markdown
        const isMarkdown = (
            content.includes('# ') || 
            content.includes('## ') || 
            content.includes('**') || 
            content.includes('```')
        );
        
        // Format content
        const formattedContent = formatContent(content, isMarkdown);
        
        // Create wiki title from filename
        const wikiTitle = file.replace('.txt', '');
        
        // Check if this notebook already exists as a wiki page
        loadPage(wikiTitle)
            .then(existingPage => {
                const isExistingPage = existingPage && existingPage.content && 
                    !existingPage.content.includes("This page doesn't exist yet");
                
                // Update content
                contentContainer.innerHTML = `
                    <div class="notebook-header">
                        <div class="notebook-meta">
                            <div class="notebook-path">
                                <i class="fas fa-folder"></i> ${directory}/${file}
                            </div>
                            <div class="notebook-format-badge">
                                <span class="format-badge ${isMarkdown ? 'markdown' : 'text'}">
                                    <i class="fas ${isMarkdown ? 'fa-markdown' : 'fa-file-alt'}"></i>
                                    ${isMarkdown ? 'Markdown' : 'Plain Text'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="notebook-content">${formattedContent}</div>
                    <div class="notebook-actions">
                        ${isExistingPage ? 
                            `<div class="wiki-page-exists">
                                <i class="fas fa-info-circle"></i>
                                This notebook already exists as wiki page
                                <a href="#" id="view-wiki-page">View Wiki Page</a>
                             </div>` : ''
                        }
                        <button id="add-to-wiki" class="action-button">
                            <i class="fas fa-plus-circle"></i> ${isExistingPage ? 'Update Wiki Page' : 'Add to Wiki'}
                        </button>
                        <button id="edit-before-add" class="action-button secondary">
                            <i class="fas fa-edit"></i> Edit Before Adding
                        </button>
                    </div>
                `;
                
                // View wiki page button
                const viewWikiBtn = document.getElementById('view-wiki-page');
                if (viewWikiBtn) {
                    viewWikiBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        displayPage(wikiTitle);
                    });
                }
                
                // Add to wiki button
                const addToWikiBtn = document.getElementById('add-to-wiki');
                if (addToWikiBtn) {
                    addToWikiBtn.addEventListener('click', () => {
                        // Show processing indicator
                        addToWikiBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                        addToWikiBtn.disabled = true;
                        
                        addNotebookToWiki(directory, file).then(success => {
                            if (success) {
                                showNotification(`Notebook ${isExistingPage ? 'updated in' : 'added to'} wiki successfully!`, 'success');
                                
                                // Clear cache and reload navigation
                                pageCache.clear();
                                loadAllPages().then(pages => {
                                    const navList = document.getElementById('nav-pages');
                                    if (navList) {
                                        navList.innerHTML = '';
                                        populateNavigation(pages);
                                    }
                                    
                                    // Display the wiki page
                                    displayPage(wikiTitle);
                                });
                            } else {
                                // Reset button
                                addToWikiBtn.innerHTML = `<i class="fas fa-plus-circle"></i> ${isExistingPage ? 'Update Wiki Page' : 'Add to Wiki'}`;
                                addToWikiBtn.disabled = false;
                                
                                showNotification('Failed to add notebook to wiki. Please try again.', 'error');
                            }
                        });
                    });
                }
                
                // Edit before adding button
                const editBeforeAddBtn = document.getElementById('edit-before-add');
                if (editBeforeAddBtn) {
                    editBeforeAddBtn.addEventListener('click', () => {
                        // Create temporary editor
                        contentContainer.innerHTML = `
                            <div class="editor-instructions">
                                <p>Edit the content below before adding to wiki:</p>
                            </div>
                            <textarea id="notebook-editor" style="width: 100%; height: 400px;">${content}</textarea>
                            <div class="editor-buttons" style="margin-top: 20px;">
                                <button id="cancel-notebook-edit" class="cancel-button">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                                <button id="save-to-wiki" class="save-button">
                                    <i class="fas fa-save"></i> Save to Wiki
                                </button>
                            </div>
                        `;
                        
                        // Setup editor
                        const editor = setupEditor(document.getElementById('notebook-editor'), content);
                        
                        // Cancel button
                        const cancelBtn = document.getElementById('cancel-notebook-edit');
                        if (cancelBtn) {
                            cancelBtn.addEventListener('click', () => {
                                // Just reload the notebook content
                                showNotebookContent(directory, file);
                            });
                        }
                        
                        // Save to wiki button
                        const saveBtn = document.getElementById('save-to-wiki');
                        if (saveBtn) {
                            saveBtn.addEventListener('click', () => {
                                const editedContent = editor.value();
                                
                                // Save directly to wiki
                                savePage(wikiTitle, editedContent, `Imported from notebook ${directory}/${file} with edits`).then(success => {
                                    if (success) {
                                        showNotification('Content saved to wiki successfully!', 'success');
                                        
                                        // Clear cache and reload navigation
                                        pageCache.clear();
                                        loadAllPages().then(pages => {
                                            const navList = document.getElementById('nav-pages');
                                            if (navList) {
                                                navList.innerHTML = '';
                                                populateNavigation(pages);
                                            }
                                            
                                            // Display the wiki page
                                            displayPage(wikiTitle);
                                        });
                                    } else {
                                        showNotification('Failed to save to wiki. Please try again.', 'error');
                                    }
                                });
                            });
                        }
                    });
                }
            });
    }).catch(error => {
        // Show error
        contentContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading notebook content: ${error.message}</p>
                <button id="retry-load" class="action-button">Retry</button>
            </div>
        `;
        
        // Retry button
        const retryBtn = document.getElementById('retry-load');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                showNotebookContent(directory, file);
            });
        }
    });
}

// Set view mode
function setViewMode(mode) {
    const body = document.body;
    const compactModeBtn = document.getElementById('compact-mode-btn');
    const normalModeBtn = document.getElementById('normal-mode-btn');
    const readingModeBtn = document.getElementById('reading-mode-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    
    // Reset buttons
    [compactModeBtn, normalModeBtn, readingModeBtn].forEach(btn => {
        if (btn) {
            btn.style.backgroundColor = '';
            btn.style.color = 'var(--text-secondary)';
        }
    });
    
    // Apply appropriate mode
    switch (mode) {
        case 'compact':
            if (sidebar) sidebar.style.width = '180px';
            if (mainContent) mainContent.style.marginLeft = '180px';
            if (compactModeBtn) {
                compactModeBtn.style.backgroundColor = 'var(--light-highlight)';
                compactModeBtn.style.color = 'var(--highlight-color)';
            }
            body.classList.remove('reading-mode', 'normal-mode');
            body.classList.add('compact-mode');
            localStorage.setItem('viewMode', 'compact');
            break;
            
        case 'normal':
            if (sidebar) sidebar.style.width = '250px';
            if (mainContent) mainContent.style.marginLeft = '250px';
            if (normalModeBtn) {
                normalModeBtn.style.backgroundColor = 'var(--light-highlight)';
                normalModeBtn.style.color = 'var(--highlight-color)';
            }
            body.classList.remove('reading-mode', 'compact-mode');
            body.classList.add('normal-mode');
            localStorage.setItem('viewMode', 'normal');
            break;
            
        case 'reading':
            if (sidebar) sidebar.style.width = '0';
            if (mainContent) mainContent.style.marginLeft = '0';
            if (readingModeBtn) {
                readingModeBtn.style.backgroundColor = 'var(--light-highlight)';
                readingModeBtn.style.color = 'var(--highlight-color)';
            }
            body.classList.remove('normal-mode', 'compact-mode');
            body.classList.add('reading-mode');
            localStorage.setItem('viewMode', 'reading');
            break;
    }
}

// Advanced search functionality
function setupSearch() {
    // Quick search in navigation
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (searchInput && searchResults) {
        let debounceTimeout;
        
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            
            debounceTimeout = setTimeout(() => {
                const query = searchInput.value.trim().toLowerCase();
                
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    searchResults.style.display = 'none';
                    return;
                }
                
                // Search in all pages
                loadAllPages().then(pages => {
                    const matches = pages.filter(page => 
                        page.title.toLowerCase().includes(query) || 
                        page.content.toLowerCase().includes(query)
                    );
                    
                    // Display results
                    if (matches.length > 0) {
                        searchResults.innerHTML = matches.map(page => `
                            <div class="search-result">
                                <a href="#" data-page="${page.title}">${page.title}</a>
                                <p>${highlightMatches(page.content, query)}</p>
                            </div>
                        `).join('');
                        
                        // Add click handlers
                        const resultLinks = searchResults.querySelectorAll('a');
                        resultLinks.forEach(link => {
                            link.addEventListener('click', (e) => {
                                e.preventDefault();
                                const page = link.getAttribute('data-page');
                                if (page) {
                                    displayPage(page);
                                    searchResults.innerHTML = '';
                                    searchResults.style.display = 'none';
                                    searchInput.value = '';
                                }
                            });
                        });
                        
                        searchResults.style.display = 'block';
                    } else {
                        searchResults.innerHTML = '<p>No results found</p>';
                        searchResults.style.display = 'block';
                    }
                });
            }, 300);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Advanced search functionality
    const advancedSearchBtn = document.getElementById('advanced-search-btn');
    
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAdvancedSearch();
        });
    }
}

// Advanced search manager
const advancedSearchManager = {
    // Perform search against API endpoint
    async search(query, options = {}) {
        try {
            console.log('Advanced search for:', query, 'with options:', options);
            
            // Default options
            const searchOptions = {
                searchTitles: true,
                searchContent: true,
                searchTags: true,
                ...options
            };
            
            // Build query params
            const params = new URLSearchParams();
            params.append('q', query);
            params.append('titles', searchOptions.searchTitles);
            params.append('content', searchOptions.searchContent);
            params.append('tags', searchOptions.searchTags);
            
            const searchUrl = `${API_CONFIG.baseUrl}/search?${params.toString()}`;
            console.log('Fetching search results from:', searchUrl);
            
            // Fetch results from API
            const response = await fetch(searchUrl);
            
            if (!response.ok) {
                console.warn(`Server search error: ${response.status}`);
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('API search results:', data);
            return data.results || [];
        } catch (error) {
            console.error('Error performing search, falling back to client-side search:', error);
            
            // Fallback to client-side search if API fails
            return this.clientSideSearch(query, options);
        }
    },
    
    // Client-side search fallback
    async clientSideSearch(query, options = {}) {
        console.log('Client-side search for:', query, 'with options:', options);
        
        const searchOptions = {
            searchTitles: true,
            searchContent: true,
            searchTags: true,
            ...options
        };
        
        try {
            const pages = await loadAllPages();
            console.log('Loaded pages for client-side search:', pages.length);
            
            if (!pages || pages.length === 0) {
                console.warn('No pages found for search');
                return [];
            }
            
            const results = [];
            const lowerQuery = query.toLowerCase();
            
            // Create sample mock results if in development mode
            if (window.location.hostname === 'localhost' && pages.length < 3) {
                console.log('Creating sample results for testing');
                return [
                    {
                        title: 'Sample Result 1',
                        excerpt: 'This is a sample result with the search term "' + query + '" highlighted.',
                        tags: ['sample', 'testing'],
                        modified: new Date().toISOString(),
                        score: 10
                    },
                    {
                        title: 'Sample Result 2',
                        excerpt: 'Another example showing "' + query + '" in context with surrounding text.',
                        tags: ['example', 'demo'],
                        modified: new Date().toISOString(),
                        score: 8
                    }
                ];
            }
            
            for (const page of pages) {
                let match = false;
                let score = 0;
                let excerpt = '';
                
                // Search in title
                if (searchOptions.searchTitles && page.title && page.title.toLowerCase().includes(lowerQuery)) {
                    match = true;
                    score += 10;
                }
                
                // Search in content
                if (searchOptions.searchContent && page.content && page.content.toLowerCase().includes(lowerQuery)) {
                    match = true;
                    score += 5;
                    
                    // Create excerpt with context
                    try {
                        const lowerContent = page.content.toLowerCase();
                        const index = lowerContent.indexOf(lowerQuery);
                        if (index !== -1) {
                            const start = Math.max(0, index - 40);
                            const end = Math.min(page.content.length, index + lowerQuery.length + 40);
                            excerpt = page.content.substring(start, end);
                            if (start > 0) excerpt = '...' + excerpt;
                            if (end < page.content.length) excerpt = excerpt + '...';
                        } else {
                            excerpt = page.content.substring(0, 80) + '...';
                        }
                    } catch (err) {
                        console.error('Error creating excerpt:', err);
                        excerpt = 'Error generating excerpt';
                    }
                } else {
                    // Default excerpt from beginning of content
                    try {
                        excerpt = page.content ? (page.content.substring(0, 80) + '...') : 'No content available';
                    } catch (err) {
                        excerpt = 'No content available';
                    }
                }
                
                // Search in tags
                if (searchOptions.searchTags && page.metadata?.tags?.some(tag => 
                    tag.toLowerCase().includes(lowerQuery)
                )) {
                    match = true;
                    score += 3;
                }
                
                if (match) {
                    results.push({
                        title: page.title,
                        excerpt: excerpt,
                        tags: page.metadata?.tags || [],
                        modified: page.metadata?.modified,
                        score: score
                    });
                }
            }
            
            // Sort by score (descending)
            results.sort((a, b) => b.score - a.score);
            console.log('Client-side search found:', results.length, 'results');
            return results;
        } catch (err) {
            console.error('Error in client-side search:', err);
            return [];
        }
    },
    
    // Display search results
    displayResults(results, query) {
        const resultsContainer = document.getElementById('advanced-search-results');
        if (!resultsContainer) return;
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-empty-state">
                    <i class="fas fa-search"></i>
                    <p>No results found for "${query}"</p>
                </div>
            `;
            return;
        }
        
        resultsContainer.innerHTML = '';
        
        // Create results elements
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.className = 'search-result-item';
            
            // Format date if available
            let dateDisplay = '';
            if (result.modified) {
                const date = new Date(result.modified);
                dateDisplay = date.toLocaleDateString();
            }
            
            // Build tags display
            const tagsHtml = result.tags.length > 0 
                ? `<div class="search-result-tags">
                      ${result.tags.map(tag => `<span class="search-result-tag">${tag}</span>`).join('')}
                   </div>`
                : '';
            
            resultElement.innerHTML = `
                <div class="search-result-title">
                    <a href="#" data-page="${result.title}">${result.title}</a>
                </div>
                <div class="search-result-excerpt">
                    ${this.highlightMatches(result.excerpt, query)}
                </div>
                <div class="search-result-meta">
                    ${tagsHtml}
                    ${dateDisplay ? `<div class="search-result-date">Last modified: ${dateDisplay}</div>` : ''}
                </div>
            `;
            
            resultsContainer.appendChild(resultElement);
        });
        
        // Add click handlers to result links
        const resultLinks = resultsContainer.querySelectorAll('.search-result-title a');
        resultLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                if (page) {
                    displayPage(page);
                }
            });
        });
    },
    
    // Highlight search matches
    highlightMatches(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};

// Show advanced search interface
function showAdvancedSearch() {
    console.log('Opening advanced search');
    // Get containers
    const contentContainer = document.getElementById('content-container');
    const historyContainer = document.getElementById('history-container');
    const editNotesContainer = document.getElementById('editor-notes-container');
    const systemLogsContainer = document.getElementById('system-logs-container');
    const advancedSearchContainer = document.getElementById('advanced-search-container');
    
    if (!advancedSearchContainer) {
        console.error('Advanced search container not found');
        alert('Advanced search is not available');
        return;
    }
    
    // Hide other containers
    if (contentContainer) contentContainer.style.display = 'none';
    if (historyContainer) historyContainer.style.display = 'none';
    if (editNotesContainer) editNotesContainer.style.display = 'none';
    if (systemLogsContainer) systemLogsContainer.style.display = 'none';
    
    // Show advanced search container
    advancedSearchContainer.style.display = 'block';
    
    // Set page title
    const contentTitle = document.getElementById('content-title');
    if (contentTitle) {
        contentTitle.textContent = 'Advanced Search';
    }
    
    // Get UI elements
    const searchInput = document.getElementById('advanced-search-input');
    const searchButton = document.getElementById('perform-search');
    const clearButton = document.getElementById('clear-search');
    const searchTitles = document.getElementById('search-titles');
    const searchContent = document.getElementById('search-content');
    const searchTags = document.getElementById('search-tags');
    const resultsContainer = document.getElementById('advanced-search-results');
    
    console.log('Advanced search UI elements:', {
        input: searchInput,
        button: searchButton,
        clear: clearButton,
        titlesCheckbox: searchTitles,
        contentCheckbox: searchContent,
        tagsCheckbox: searchTags,
        results: resultsContainer
    });
    
    // Remove any existing event listeners by cloning elements
    if (searchButton) {
        const newSearchButton = searchButton.cloneNode(true);
        searchButton.parentNode.replaceChild(newSearchButton, searchButton);
        searchButton = newSearchButton;
    }
    
    if (clearButton) {
        const newClearButton = clearButton.cloneNode(true);
        clearButton.parentNode.replaceChild(newClearButton, clearButton);
        clearButton = newClearButton;
    }
    
    if (searchInput) {
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        searchInput = newSearchInput;
    }
    
    // Perform search action
    const performSearch = async () => {
        const inputElement = document.getElementById('advanced-search-input');
        if (!inputElement) {
            console.error('Search input element not found');
            return;
        }
        
        const query = inputElement.value.trim();
        if (query.length < 2) {
            showNotification('Please enter at least 2 characters for search', 'info');
            return;
        }
        
        console.log('Performing search for:', query);
        
        // Show loading
        const container = document.getElementById('advanced-search-results');
        if (container) {
            container.innerHTML = '<div class="loading-indicator"><div class="spinner"></div><p>Searching...</p></div>';
        }
        
        try {
            // Get search options
            const titleElement = document.getElementById('search-titles');
            const contentElement = document.getElementById('search-content');
            const tagsElement = document.getElementById('search-tags');
            
            const options = {
                searchTitles: titleElement ? titleElement.checked : true,
                searchContent: contentElement ? contentElement.checked : true, 
                searchTags: tagsElement ? tagsElement.checked : true
            };
            
            console.log('Search options:', options);
            
            // Perform search
            const results = await advancedSearchManager.search(query, options);
            console.log('Search results:', results);
            
            // Display results
            advancedSearchManager.displayResults(results, query);
        } catch (err) {
            console.error('Error during search:', err);
            if (resultsContainer) {
                resultsContainer.innerHTML = '<div class="error-message">Error performing search. Please try again.</div>';
            }
        }
    };
    
    // Clear search
    const clearSearch = () => {
        const inputElement = document.getElementById('advanced-search-input');
        if (inputElement) inputElement.value = '';
        
        const container = document.getElementById('advanced-search-results');
        if (container) {
            container.innerHTML = '';
        }
    };
    
    // Set up event listeners
    if (searchButton) {
        console.log('Setting up search button event listener');
        searchButton.addEventListener('click', performSearch);
    }
    
    if (clearButton) {
        console.log('Setting up clear button event listener');
        clearButton.addEventListener('click', clearSearch);
    }
    
    if (searchInput) {
        console.log('Setting up search input event listeners');
        // Focus input
        searchInput.focus();
        
        // Handle enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Initial empty state
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="search-start-state">Enter search terms above and click Search</div>';
    }
}

// Highlight matches in search results
function highlightMatches(content, query) {
    // Strip HTML tags
    let text = content.replace(/<[^>]*>/g, '');
    
    // Find first match and surrounding context
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text.substring(0, 100) + '...';
    
    // Get context around the match
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 50);
    let excerpt = text.substring(start, end);
    
    // Add ellipsis at the beginning/end if needed
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt += '...';
    
    // Highlight the match
    const regex = new RegExp(`(${query})`, 'gi');
    return excerpt.replace(regex, '<mark>$1</mark>');
}

// Initialize theme settings
function initializeTheme() {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    
    // Setup theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

// Set theme
function setTheme(theme) {
    const root = document.documentElement;
    const themeColors = THEME[theme];
    
    // Apply theme colors to CSS variables
    for (const [key, value] of Object.entries(themeColors)) {
        root.style.setProperty(`--${key}`, value);
    }
    
    // Set body class
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Update theme toggle icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
}

// Recent pages management
const recentPages = {
    items: JSON.parse(localStorage.getItem('recentPages') || '[]'),
    maxItems: 5,
    
    // Add a page to recent pages
    add(title) {
        // Remove if already exists
        this.items = this.items.filter(item => item !== title);
        
        // Add to the beginning
        this.items.unshift(title);
        
        // Limit to maxItems
        if (this.items.length > this.maxItems) {
            this.items = this.items.slice(0, this.maxItems);
        }
        
        // Save to localStorage
        localStorage.setItem('recentPages', JSON.stringify(this.items));
        
        // Update UI
        this.updateUI();
    },
    
    // Fetch recent pages from server
    async fetchFromServer() {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}/recent?limit=${this.maxItems}`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            if (data.recentPages && Array.isArray(data.recentPages)) {
                // Update items from server data
                this.items = data.recentPages.map(page => page.title);
                
                // Save to localStorage
                localStorage.setItem('recentPages', JSON.stringify(this.items));
                
                // Update UI
                this.updateUI();
                
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching recent pages:', error);
            return false;
        }
    },
    
    // Update the UI
    updateUI() {
        const container = document.getElementById('recent-pages');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.items.forEach(title => {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.className = 'nav-item';
            pageLink.innerHTML = `<i class="fas fa-clock"></i> ${title}`;
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayPage(title);
            });
            
            container.appendChild(pageLink);
        });
        
        // Show empty state if no items
        if (this.items.length === 0) {
            container.innerHTML = '<div style="padding: var(--spacing-sm); color: var(--text-tertiary); font-size: 0.9rem;">No recent pages</div>';
        }
    }
};

// Tags management
const tagsManager = {
    // Get tags for a page
    getTags(pageTitle) {
        const cachedPage = pageCache.get(pageTitle);
        if (cachedPage && cachedPage.metadata && cachedPage.metadata.tags) {
            return cachedPage.metadata.tags;
        }
        return [];
    },
    
    // Save tags for a page
    async saveTags(pageTitle, tags) {
        try {
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}/${pageTitle}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tags })
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            // Invalidate cache to force reload with new tags
            pageCache.data[pageTitle] = null;
            
            // Load the page again to update cache
            await loadPage(pageTitle);
            
            // Update UI
            this.updateUI(pageTitle);
            
            return true;
        } catch (error) {
            console.error('Error saving tags:', error);
            
            // Fallback to localStorage if API fails
            localStorage.setItem(`tags_${pageTitle}`, JSON.stringify(tags));
            this.updateUI(pageTitle);
            
            return false;
        }
    },
    
    // Add a tag
    async addTag(pageTitle, tag) {
        const tags = this.getTags(pageTitle);
        if (!tags.includes(tag)) {
            tags.push(tag);
            const success = await this.saveTags(pageTitle, tags);
            
            if (success) {
                showNotification(`Tag "${tag}" added`, 'success');
            } else {
                showNotification(`Tag "${tag}" added (locally)`, 'info');
            }
        }
    },
    
    // Remove a tag
    async removeTag(pageTitle, tag) {
        const tags = this.getTags(pageTitle);
        const index = tags.indexOf(tag);
        if (index !== -1) {
            tags.splice(index, 1);
            const success = await this.saveTags(pageTitle, tags);
            
            if (success) {
                showNotification(`Tag "${tag}" removed`, 'info');
            } else {
                showNotification(`Tag "${tag}" removed (locally)`, 'info');
            }
        }
    },
    
    // Update UI
    updateUI(pageTitle) {
        const tagsContainer = document.querySelector('.tags-container');
        if (!tagsContainer) return;
        
        const tags = this.getTags(pageTitle);
        
        tagsContainer.innerHTML = '';
        
        tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.innerHTML = `
                ${tag}
                <span class="remove-tag" title="Remove tag">
                    <i class="fas fa-times"></i>
                </span>
            `;
            
            // Add event listener to remove button
            tagElement.querySelector('.remove-tag').addEventListener('click', () => {
                this.removeTag(pageTitle, tag);
            });
            
            tagsContainer.appendChild(tagElement);
        });
    }
};

// Page history management
const historyManager = {
    // Get page history from cache or API
    async getHistory(pageTitle) {
        try {
            // Try to get from page cache first
            const cachedPage = pageCache.get(pageTitle);
            if (cachedPage && cachedPage.history) {
                return cachedPage.history;
            }
            
            // If not in cache, try to fetch from API
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.pages}/${pageTitle}/history`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const history = await response.json();
            return history;
        } catch (error) {
            console.error('Error getting page history:', error);
            
            // Fallback to localStorage if API fails
            const stored = localStorage.getItem(`history_${pageTitle}`);
            return stored ? JSON.parse(stored) : [];
        }
    },
    
    // Add history entry (not needed as this is now handled by savePage)
    addEntry(pageTitle, content, notes = '') {
        // This is a no-op since history is now tracked by the server
        // when a page is saved
        console.log('History entry will be added when page is saved');
    },
    
    // Display history
    async displayHistory(pageTitle) {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;
        
        // Show loading indicator
        historyList.innerHTML = '<div style="padding: var(--spacing-md); text-align: center; color: var(--text-tertiary);">Loading history...</div>';
        
        // Get history from server
        const history = await this.getHistory(pageTitle);
        
        if (!history || history.length === 0) {
            historyList.innerHTML = '<div style="padding: var(--spacing-md); text-align: center; color: var(--text-tertiary);">No history available for this page</div>';
            return;
        }
        
        historyList.innerHTML = '';
        
        history.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'history-entry';
            
            const date = new Date(entry.timestamp).toLocaleString();
            
            entryElement.innerHTML = `
                <div class="history-timestamp">${date}</div>
                <div class="history-user">${entry.user || 'Anonymous'}</div>
                ${entry.notes ? `<div class="history-notes">${entry.notes}</div>` : ''}
                <div class="history-actions">
                    <button class="history-button history-view-btn" data-index="${index}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="history-button history-restore-btn" data-index="${index}">
                        <i class="fas fa-undo"></i> Restore
                    </button>
                </div>
            `;
            
            historyList.appendChild(entryElement);
        });
        
        // Add event listeners to buttons
        historyList.querySelectorAll('.history-view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                this.viewVersion(pageTitle, index);
            });
        });
        
        historyList.querySelectorAll('.history-restore-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                this.restoreVersion(pageTitle, index);
            });
        });
    },
    
    // View specific version
    async viewVersion(pageTitle, index) {
        // Get history - ensure it's the most recent data
        const history = await this.getHistory(pageTitle);
        if (!history || !history[index]) return;
        
        const content = history[index].content;
        const timestamp = history[index].timestamp;
        
        // Get current page for comparison
        const currentPage = await loadPage(pageTitle);
        const currentContent = currentPage.content;
        
        // Display content in a modal or temporary view
        const contentContainer = document.getElementById('content-container');
        const historyContainer = document.getElementById('history-container');
        
        // Save current container state
        const originalHistoryDisplay = historyContainer.style.display;
        const originalContentHtml = contentContainer.innerHTML;
        
        // Hide history container, show content container
        historyContainer.style.display = 'none';
        contentContainer.style.display = 'block';
        
        // Function to create diff highlighting
        function createDiffHtml(oldText, newText) {
            // Basic diff algorithm 
            function findDiff(oldArr, newArr) {
                let result = [];
                let oldIndex = 0;
                let newIndex = 0;
                
                while (oldIndex < oldArr.length || newIndex < newArr.length) {
                    // Lines are the same
                    if (oldIndex < oldArr.length && newIndex < newArr.length && 
                        oldArr[oldIndex] === newArr[newIndex]) {
                        result.push({ type: 'same', text: oldArr[oldIndex] });
                        oldIndex++;
                        newIndex++;
                    }
                    // Lines are different
                    else if (oldIndex < oldArr.length && newIndex < newArr.length) {
                        result.push({ type: 'removed', text: oldArr[oldIndex] });
                        result.push({ type: 'added', text: newArr[newIndex] });
                        oldIndex++;
                        newIndex++;
                    }
                    // Old has extra lines
                    else if (oldIndex < oldArr.length) {
                        result.push({ type: 'removed', text: oldArr[oldIndex] });
                        oldIndex++;
                    }
                    // New has extra lines
                    else if (newIndex < newArr.length) {
                        result.push({ type: 'added', text: newArr[newIndex] });
                        newIndex++;
                    }
                }
                return result;
            }
            
            // Split text into lines
            const oldLines = oldText.split('\n');
            const newLines = newText.split('\n');
            
            // Calculate differences
            const diff = findDiff(oldLines, newLines);
            
            // Create HTML
            let html = '<div class="diff-container">';
            diff.forEach(line => {
                if (line.type === 'same') {
                    html += `<div class="diff-line">${line.text}</div>`;
                } else if (line.type === 'added') {
                    html += `<div class="diff-line diff-added">+ ${line.text}</div>`;
                } else if (line.type === 'removed') {
                    html += `<div class="diff-line diff-removed">- ${line.text}</div>`;
                }
            });
            html += '</div>';
            
            return html;
        }
        
        // Show historical version with controls
        contentContainer.innerHTML = `
            <div class="history-view-header">
                <div style="color: var(--tertiary); margin-bottom: var(--spacing-md); padding: var(--spacing-sm); background-color: var(--light-highlight); border-radius: var(--border-radius);">
                    <i class="fas fa-history"></i> Viewing historical version from ${new Date(timestamp).toLocaleString()}
                </div>
                <div class="history-view-controls" style="margin-bottom: var(--spacing-md); display: flex; gap: var(--spacing-md);">
                    <button id="view-formatted" class="btn-secondary active">
                        <i class="fas fa-eye"></i> View Formatted
                    </button>
                    <button id="view-raw" class="btn-secondary">
                        <i class="fas fa-code"></i> View Raw
                    </button>
                    <button id="view-diff" class="btn-secondary">
                        <i class="fas fa-exchange-alt"></i> View Diff
                    </button>
                    <button id="back-to-history" class="btn-secondary">
                        <i class="fas fa-arrow-left"></i> Back to History
                    </button>
                </div>
            </div>
            <div class="history-content-wrapper">
                <div id="formatted-view" class="history-content">
                    ${formatContent(content)}
                </div>
                <pre id="raw-view" class="history-content" style="display: none;">${content}</pre>
                <div id="diff-view" class="history-content" style="display: none;">
                    ${createDiffHtml(content, currentContent)}
                </div>
            </div>
            <div class="history-actions" style="margin-top: var(--spacing-md); display: flex; justify-content: flex-end;">
                <button id="restore-version" class="action-button">
                    <i class="fas fa-undo"></i> Restore This Version
                </button>
            </div>
        `;
        
        // Add event listeners to control buttons
        document.getElementById('view-formatted').addEventListener('click', (e) => {
            document.getElementById('formatted-view').style.display = 'block';
            document.getElementById('raw-view').style.display = 'none';
            document.getElementById('diff-view').style.display = 'none';
            
            // Update active button
            document.querySelectorAll('.history-view-controls button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
        
        document.getElementById('view-raw').addEventListener('click', (e) => {
            document.getElementById('formatted-view').style.display = 'none';
            document.getElementById('raw-view').style.display = 'block';
            document.getElementById('diff-view').style.display = 'none';
            
            // Update active button
            document.querySelectorAll('.history-view-controls button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
        
        document.getElementById('view-diff').addEventListener('click', (e) => {
            document.getElementById('formatted-view').style.display = 'none';
            document.getElementById('raw-view').style.display = 'none';
            document.getElementById('diff-view').style.display = 'block';
            
            // Update active button
            document.querySelectorAll('.history-view-controls button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        });
        
        // Back to history view
        document.getElementById('back-to-history').addEventListener('click', () => {
            contentContainer.innerHTML = originalContentHtml;
            contentContainer.style.display = 'none';
            historyContainer.style.display = originalHistoryDisplay;
        });
        
        // Restore version button
        document.getElementById('restore-version').addEventListener('click', () => {
            if (confirm('Are you sure you want to restore this version?')) {
                this.restoreVersion(pageTitle, index);
            }
        });
    },
    
    // Restore specific version
    async restoreVersion(pageTitle, index) {
        // Get the most recent history data
        const history = await this.getHistory(pageTitle);
        if (!history || !history[index]) return;
        
        if (confirm('Are you sure you want to restore this version? Current content will be saved in history.')) {
            const content = history[index].content;
            
            // Get current content
            const currentPage = await loadPage(pageTitle);
            const currentContent = currentPage.content;
            
            // Note: We don't need to manually add to history anymore as the server handles it
            
            // Create meaningful note for this restoration
            const restorationNote = `Restored version from ${new Date(history[index].timestamp).toLocaleString()}`;
            
            // Restore the content
            const success = await savePage(pageTitle, content, restorationNote);
            
            if (success) {
                showNotification('Historical version restored successfully', 'success');
                
                // Force reload history after restoration
                await this.displayHistory(pageTitle);
                
                // Display page with restored content
                displayPage(pageTitle);
            } else {
                showNotification('Failed to restore version', 'error');
            }
        }
    }
};

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

// System logs manager
const systemLogsManager = {
    // Fetch system logs
    async fetchLogs() {
        try {
            console.log('Fetching logs from:', `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.systemLogs}`);
            const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.systemLogs}`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Logs fetched:', data);
            return data.logs || [];
        } catch (error) {
            console.error('Error fetching system logs:', error);
            return [];
        }
    },
    
    // Display system logs
    async displayLogs(filter = 'all') {
        console.log('Displaying logs with filter:', filter);
        const logsContainer = document.getElementById('logs-list');
        if (!logsContainer) {
            console.error('Logs container not found');
            return;
        }
        
        // Show loading
        logsContainer.innerHTML = '<div class="loading-indicator"><div class="spinner"></div><p>Loading system logs...</p></div>';
        
        try {
            // Fetch logs
            const logs = await this.fetchLogs();
            console.log('Fetched logs:', logs);
            
            if (!logs || logs.length === 0) {
                logsContainer.innerHTML = '<div class="empty-state">No system logs available</div>';
                return;
            }
            
            // Clear container
            logsContainer.innerHTML = '';
            
            // Process and display logs
            logs.forEach(log => {
                // Extract timestamp and message
                let timestamp, message, type;
                if (typeof log === 'string' && log.startsWith('[') && log.includes(']')) {
                    const timestampEnd = log.indexOf(']');
                    timestamp = log.substring(1, timestampEnd);
                    message = log.substring(timestampEnd + 1).trim();
                    
                    // Determine log type
                    if (message.includes('ERROR') || message.toLowerCase().includes('error')) {
                        type = 'error';
                    } else if (message.includes('POST /pages') || message.includes('DELETE /pages')) {
                        type = 'page';
                    } else {
                        type = 'api';
                    }
                } else {
                    timestamp = 'Unknown';
                    message = typeof log === 'string' ? log : JSON.stringify(log);
                    type = 'api';
                }
                
                // Apply filter
                if (filter !== 'all' && filter !== type) {
                    return;
                }
                
                // Create log entry element
                const logElement = document.createElement('div');
                logElement.className = `log-entry ${type}`;
                logElement.innerHTML = `
                    <div class="log-timestamp">${timestamp}</div>
                    <div class="log-message">${message}</div>
                `;
                
                logsContainer.appendChild(logElement);
            });
        } catch (err) {
            console.error('Error displaying logs:', err);
            logsContainer.innerHTML = '<div class="error-message">Error loading logs. Please try again.</div>';
        }
    },
    
    // Show system logs view
    show() {
        console.log('Showing system logs view');
        // Hide other containers
        const contentContainer = document.getElementById('content-container');
        const historyContainer = document.getElementById('history-container');
        const editNotesContainer = document.getElementById('editor-notes-container');
        const systemLogsContainer = document.getElementById('system-logs-container');
        const advancedSearchContainer = document.getElementById('advanced-search-container');
        
        if (!systemLogsContainer) {
            console.error('System logs container not found');
            alert('System logs view is not available');
            return;
        }
        
        // Hide other containers
        if (contentContainer) contentContainer.style.display = 'none';
        if (historyContainer) historyContainer.style.display = 'none';
        if (editNotesContainer) editNotesContainer.style.display = 'none';
        if (advancedSearchContainer) advancedSearchContainer.style.display = 'none';
        
        // Show system logs container
        systemLogsContainer.style.display = 'block';
        
        // Set page title
        const contentTitle = document.getElementById('content-title');
        if (contentTitle) {
            contentTitle.textContent = 'System Activity Logs';
        }
        
        // Display logs
        this.displayLogs();
        
        // Set up filter - removing old event listeners first
        const logsFilter = document.getElementById('logs-filter');
        if (logsFilter) {
            // Clone and replace to remove event listeners
            const newFilter = logsFilter.cloneNode(true);
            logsFilter.parentNode.replaceChild(newFilter, logsFilter);
            
            // Add new event listener
            newFilter.addEventListener('change', () => {
                this.displayLogs(newFilter.value);
            });
        }
        
        // Set up refresh button - removing old event listeners first
        const refreshBtn = document.getElementById('refresh-logs');
        if (refreshBtn) {
            // Clone and replace to remove event listeners
            const newRefreshBtn = refreshBtn.cloneNode(true);
            refreshBtn.parentNode.replaceChild(newRefreshBtn, refreshBtn);
            
            // Add new event listener
            newRefreshBtn.addEventListener('click', () => {
                const currentFilter = document.getElementById('logs-filter');
                this.displayLogs(currentFilter ? currentFilter.value : 'all');
            });
        }
    }
};

// Highlight matches in search results
function highlightMatches(content, query) {
    // Strip HTML tags
    let text = content.replace(/<[^>]*>/g, '');
    
    // Find first match and surrounding context
    const index = text.toLowerCase().indexOf(query);
    if (index === -1) return text.substring(0, 100) + '...';
    
    // Get context around the match
    const start = Math.max(0, index - 50);
    const end = Math.min(text.length, index + query.length + 50);
    let excerpt = text.substring(start, end);
    
    // Add ellipsis at the beginning/end if needed
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt += '...';
    
    // Highlight the match
    const regex = new RegExp(`(${query})`, 'gi');
    return excerpt.replace(regex, '<mark>$1</mark>');
}

// This function was conflicting with the earlier initialize() function
function setupQuickSearch() {
    console.log('Setting up quick search...');
    
    // Set up quick search in content area
    const quickSearchInput = document.getElementById('quick-search-input');
    const quickSearchButton = document.getElementById('quick-search-button');
    
    if (quickSearchInput && quickSearchButton) {
        // Search button click handler
        quickSearchButton.addEventListener('click', () => {
            const query = quickSearchInput.value.trim();
            if (query.length >= 2) {
                // Show directly in content area with highlighted results
                performQuickSearch(query);
            } else {
                showNotification('Please enter at least 2 characters to search', 'info');
            }
        });
        
        // Enter key in search input
        quickSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = quickSearchInput.value.trim();
                if (query.length >= 2) {
                    performQuickSearch(query);
                } else {
                    showNotification('Please enter at least 2 characters to search', 'info');
                }
            }
        });
    }
    
    // Set up system logs button
    const systemLogsBtn = document.getElementById('system-logs-btn');
    if (systemLogsBtn) {
        systemLogsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            systemLogsManager.show();
        });
    }
    
    // Set up advanced search button
    const advancedSearchBtn = document.getElementById('advanced-search-btn');
    if (advancedSearchBtn) {
        advancedSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAdvancedSearch();
        });
    }
    
    // Restore view mode from localStorage
    const savedViewMode = localStorage.getItem('viewMode') || 'normal';
    setViewMode(savedViewMode);
}

// Make initialize and displayPage functions globally available
window.initialize = initialize;
window.displayPage = displayPage;