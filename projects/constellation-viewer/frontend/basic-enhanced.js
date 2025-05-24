/**
 * Enhanced functionality for basic.html
 */

// Configuration
const API_BASE_URL = 'http://localhost:3003';

// State management
let currentState = {
    theme: localStorage.getItem('theme') || 'light',
    viewMode: localStorage.getItem('viewMode') || 'normal',
    currentDirectory: '',
    currentFile: '',
    currentPage: '',
    isEditMode: false,
    editor: null
};

// DOM Elements
const domElements = {
    body: document.body,
    themeToggle: null,
    viewModeButtons: {
        compact: null,
        normal: null,
        reading: null
    },
    sidebar: null,
    mainContent: null,
    directorySelect: null,
    filesContainer: null,
    contentTitle: null,
    viewContainer: null,
    editContainer: null,
    editor: null,
    actionTabs: {
        read: null,
        edit: null
    },
    breadcrumb: null
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if UI is ready to be enhanced
    if (document.getElementById('enhance-ui')) {
        enhanceUI();
    }
});

/**
 * Enhance the UI with modern features
 */
function enhanceUI() {
    // Add enhanced UI class
    document.body.classList.add('enhanced-ui');
    
    // Add theme class if set
    if (currentState.theme === 'dark') {
        document.body.classList.add('theme-dark');
    }
    
    // Add view mode class
    document.body.classList.add(`${currentState.viewMode}-mode`);
    
    // Set up theme toggle
    setupThemeToggle();
    
    // Set up view mode toggles
    setupViewModeToggles();
    
    // Initialize editor
    initializeEditor();
    
    // Set up tab switching
    setupTabSwitching();
    
    // Cache DOM elements
    cacheDomElements();
    
    // Enhance directory selector
    enhanceDirectorySelector();
    
    // Add event listeners
    addEventListeners();
}

/**
 * Cache DOM elements for faster access
 */
function cacheDomElements() {
    domElements.directorySelect = document.getElementById('notebook-directory');
    domElements.filesContainer = document.getElementById('notebook-files');
    domElements.contentTitle = document.getElementById('content-title');
    domElements.viewContainer = document.getElementById('pageContent');
    domElements.breadcrumb = document.getElementById('breadcrumb-path');
    
    if (domElements.viewModeButtons.compact) {
        domElements.viewModeButtons.compact.classList.toggle('active', currentState.viewMode === 'compact');
        domElements.viewModeButtons.normal.classList.toggle('active', currentState.viewMode === 'normal');
        domElements.viewModeButtons.reading.classList.toggle('active', currentState.viewMode === 'reading');
    }
}

/**
 * Set up theme toggle
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        const header = document.querySelector('.header-actions') || document.createElement('div');
        
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.className = 'theme-toggle';
        toggle.innerHTML = currentState.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        toggle.title = 'Toggle dark mode';
        
        header.appendChild(toggle);
        domElements.themeToggle = toggle;
        
        // Add event listener
        toggle.addEventListener('click', toggleTheme);
    } else {
        domElements.themeToggle = themeToggle;
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Toggle theme between light and dark
 */
function toggleTheme() {
    currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
    
    // Update body class
    document.body.classList.toggle('theme-dark', currentState.theme === 'dark');
    
    // Update theme toggle icon
    domElements.themeToggle.innerHTML = currentState.theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('theme', currentState.theme);
}

/**
 * Set up view mode toggles
 */
function setupViewModeToggles() {
    const viewModeSelector = document.querySelector('.view-mode-selector');
    
    if (!viewModeSelector) return;
    
    const compactModeBtn = document.getElementById('compact-mode-btn');
    const normalModeBtn = document.getElementById('normal-mode-btn');
    const readingModeBtn = document.getElementById('reading-mode-btn');
    
    domElements.viewModeButtons.compact = compactModeBtn;
    domElements.viewModeButtons.normal = normalModeBtn;
    domElements.viewModeButtons.reading = readingModeBtn;
    
    // Add event listeners
    compactModeBtn.addEventListener('click', () => setViewMode('compact'));
    normalModeBtn.addEventListener('click', () => setViewMode('normal'));
    readingModeBtn.addEventListener('click', () => setViewMode('reading'));
    
    // Set initial active state
    setViewMode(currentState.viewMode, false);
}

/**
 * Set view mode
 * @param {string} mode - View mode (compact, normal, reading)
 * @param {boolean} save - Whether to save preference
 */
function setViewMode(mode, save = true) {
    // Remove all mode classes
    document.body.classList.remove('compact-mode', 'normal-mode', 'reading-mode');
    
    // Add the selected mode class
    document.body.classList.add(`${mode}-mode`);
    
    // Update buttons
    if (domElements.viewModeButtons.compact) {
        domElements.viewModeButtons.compact.style.backgroundColor = mode === 'compact' ? 'var(--light-highlight)' : '';
        domElements.viewModeButtons.compact.style.color = mode === 'compact' ? 'var(--highlight-color)' : '';
        
        domElements.viewModeButtons.normal.style.backgroundColor = mode === 'normal' ? 'var(--light-highlight)' : '';
        domElements.viewModeButtons.normal.style.color = mode === 'normal' ? 'var(--highlight-color)' : '';
        
        domElements.viewModeButtons.reading.style.backgroundColor = mode === 'reading' ? 'var(--light-highlight)' : '';
        domElements.viewModeButtons.reading.style.color = mode === 'reading' ? 'var(--highlight-color)' : '';
    }
    
    // Update state
    currentState.viewMode = mode;
    
    // Save preference
    if (save) {
        localStorage.setItem('viewMode', mode);
    }
}

/**
 * Initialize editor
 */
function initializeEditor() {
    // Check if we have a container for the editor
    const editorContainer = document.getElementById('editor-container');
    
    if (!editorContainer) {
        const container = document.createElement('div');
        container.id = 'editor-container';
        container.className = 'content-edit';
        container.style.display = 'none';
        
        const textarea = document.createElement('textarea');
        textarea.id = 'editor';
        
        container.appendChild(textarea);
        
        // Add action buttons
        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';
        
        const cancelButton = document.createElement('button');
        cancelButton.className = 'btn btn-secondary';
        cancelButton.id = 'cancel-edit';
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', cancelEditing);
        
        const saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        saveButton.id = 'save-edit';
        saveButton.textContent = 'Save Changes';
        saveButton.addEventListener('click', saveChanges);
        
        actionButtons.appendChild(cancelButton);
        actionButtons.appendChild(saveButton);
        container.appendChild(actionButtons);
        
        // Append to page content
        const pageContent = document.getElementById('pageContent');
        if (pageContent && pageContent.parentNode) {
            pageContent.parentNode.appendChild(container);
        }
        
        domElements.editContainer = container;
        domElements.editor = textarea;
    }
}

/**
 * Set up tab switching
 */
function setupTabSwitching() {
    // Check if we already have tabs
    const readTab = document.getElementById('read-tab');
    const editTab = document.getElementById('edit-tab');
    
    if (!readTab || !editTab) {
        // Get content title
        const contentTitle = document.getElementById('content-title');
        
        if (contentTitle && contentTitle.parentNode) {
            // Create tabs container
            const tabsContainer = document.createElement('div');
            tabsContainer.className = 'content-actions';
            
            // Create read tab
            const readTab = document.createElement('button');
            readTab.className = 'action-tab active';
            readTab.id = 'read-tab';
            readTab.innerHTML = '<i class="fas fa-book"></i> Read';
            readTab.addEventListener('click', () => switchTab('read'));
            
            // Create edit tab
            const editTab = document.createElement('button');
            editTab.className = 'action-tab';
            editTab.id = 'edit-tab';
            editTab.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editTab.addEventListener('click', () => switchTab('edit'));
            
            // Add tabs to container
            tabsContainer.appendChild(readTab);
            tabsContainer.appendChild(editTab);
            
            // Insert after content title
            contentTitle.parentNode.insertBefore(tabsContainer, contentTitle.nextSibling);
            
            domElements.actionTabs.read = readTab;
            domElements.actionTabs.edit = editTab;
        }
    } else {
        domElements.actionTabs.read = readTab;
        domElements.actionTabs.edit = editTab;
        
        // Add event listeners
        readTab.addEventListener('click', () => switchTab('read'));
        editTab.addEventListener('click', () => switchTab('edit'));
    }
}

/**
 * Switch between tabs
 * @param {string} tab - Tab to switch to (read, edit)
 */
function switchTab(tab) {
    const pageContent = document.getElementById('pageContent');
    const editorContainer = document.getElementById('editor-container');
    
    if (!pageContent || !editorContainer) return;
    
    // Update active tab
    domElements.actionTabs.read.classList.toggle('active', tab === 'read');
    domElements.actionTabs.edit.classList.toggle('active', tab === 'edit');
    
    // Show/hide containers
    pageContent.style.display = tab === 'read' ? 'block' : 'none';
    editorContainer.style.display = tab === 'edit' ? 'block' : 'none';
    
    // Update state
    currentState.isEditMode = tab === 'edit';
    
    // Setup editor if switching to edit mode
    if (tab === 'edit') {
        setupEditor();
    }
}

/**
 * Setup editor with content
 */
function setupEditor() {
    // Get current content
    const pageContent = document.getElementById('pageContent');
    let content = '';
    
    if (currentState.currentFile) {
        // For notebook files, we need to fetch the raw content
        fetch(`${API_BASE_URL}/notebooks/${currentState.currentDirectory}/${currentState.currentFile}`)
            .then(response => response.text())
            .then(fileContent => {
                initializeEditorWithContent(fileContent);
            })
            .catch(error => {
                console.error('Error loading file content for editing:', error);
                showNotification('Error loading file content', 'error');
            });
    } else if (currentState.currentPage) {
        // For wiki pages, we need to fetch the raw content
        fetch(`${API_BASE_URL}/pages/${currentState.currentPage}`)
            .then(response => response.text())
            .then(pageContent => {
                initializeEditorWithContent(pageContent);
            })
            .catch(error => {
                console.error('Error loading page content for editing:', error);
                showNotification('Error loading page content', 'error');
            });
    } else {
        // If no current file or page, just use the current page content
        content = pageContent ? pageContent.innerHTML : '';
        initializeEditorWithContent(content);
    }
}

/**
 * Initialize editor with content
 * @param {string} content - Content to edit
 */
function initializeEditorWithContent(content) {
    const editorTextarea = document.getElementById('editor');
    
    if (!editorTextarea) return;
    
    // If editor already exists, just update the value
    if (currentState.editor) {
        currentState.editor.value(content);
        return;
    }
    
    // Initialize EasyMDE
    currentState.editor = new EasyMDE({
        element: editorTextarea,
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
            'preview', 'side-by-side', 'fullscreen'
        ],
        initialValue: content,
        previewRender: function(markdownText) {
            return marked.parse(markdownText);
        }
    });
}

/**
 * Cancel editing
 */
function cancelEditing() {
    switchTab('read');
}

/**
 * Save changes
 */
function saveChanges() {
    if (!currentState.editor) return;
    
    const content = currentState.editor.value();
    
    if (currentState.currentPage) {
        // Save wiki page
        fetch(`${API_BASE_URL}/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: currentState.currentPage,
                content
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to save page');
            return response.text();
        })
        .then(() => {
            showNotification('Page saved successfully', 'success');
            switchTab('read');
            
            // Update page content
            const pageContent = document.getElementById('pageContent');
            if (pageContent) {
                pageContent.innerHTML = marked.parse(content);
            }
        })
        .catch(error => {
            console.error('Error saving page:', error);
            showNotification('Error saving page', 'error');
        });
    } else if (currentState.currentFile) {
        // For notebook files, we would need a new endpoint to save changes
        // This could be implemented in the future
        showNotification('Editing notebook files is not yet supported', 'info');
    } else {
        showNotification('Nothing to save', 'info');
    }
}

/**
 * Enhance directory selector
 */
function enhanceDirectorySelector() {
    const directorySelect = document.getElementById('notebook-directory');
    
    if (directorySelect) {
        // Style the select
        directorySelect.classList.add('directory-select');
        
        // Add section title
        const label = document.createElement('div');
        label.className = 'section-title';
        label.textContent = 'Notebook Directory';
        
        if (directorySelect.parentNode) {
            directorySelect.parentNode.insertBefore(label, directorySelect);
        }
    }
}

/**
 * Add event listeners
 */
function addEventListeners() {
    // Directory select change
    const directorySelect = document.getElementById('notebook-directory');
    if (directorySelect) {
        directorySelect.addEventListener('change', () => {
            currentState.currentDirectory = directorySelect.value;
            currentState.currentFile = '';
            currentState.currentPage = '';
        });
    }
    
    // Add event delegation for file items
    const filesContainer = document.getElementById('notebook-files');
    if (filesContainer) {
        filesContainer.addEventListener('click', event => {
            const fileItem = event.target.closest('.notebook-file');
            if (fileItem) {
                // Update active state
                const allFiles = filesContainer.querySelectorAll('.notebook-file');
                allFiles.forEach(file => file.classList.remove('active'));
                fileItem.classList.add('active');
                
                // Update current file
                currentState.currentFile = fileItem.textContent;
                currentState.currentPage = '';
            }
        });
    }
}

/**
 * Show notification
 * @param {string} message - Message to show
 * @param {string} type - Notification type (success, error, info)
 */
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
    
    // Add to body
    document.body.appendChild(notification);
    
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

// Add element to initiate UI enhancement
document.addEventListener('DOMContentLoaded', () => {
    const enhanceElement = document.createElement('div');
    enhanceElement.id = 'enhance-ui';
    enhanceElement.style.display = 'none';
    document.body.appendChild(enhanceElement);
    
    // Load external CSS
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'basic-enhanced.css';
    document.head.appendChild(linkElement);
});