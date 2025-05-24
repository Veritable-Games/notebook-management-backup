/**
 * UI management module for the Notebook Explorer application
 */

import NotebookUtils from './utils.js';
import api from './api.js';

class NotebookUI {
  constructor() {
    // Element references
    this.elements = {
      notebookList: document.getElementById('notebook-list'),
      pageList: document.getElementById('page-list'),
      contentViewer: document.getElementById('content-viewer'),
      searchInput: document.getElementById('search-input'),
      searchResults: document.getElementById('search-results'),
      loadingIndicator: document.getElementById('loading-indicator'),
      notificationContainer: document.getElementById('notification-container'),
      modalContainer: document.getElementById('modal-container'),
      toggleThemeBtn: document.getElementById('toggle-theme'),
      toggleSidebarBtn: document.getElementById('toggle-sidebar')
    };

    // State
    this.state = {
      activeNotebook: null,
      activePage: null,
      searchQuery: '',
      theme: NotebookUtils.getFromStorage('theme', 'light'),
      sidebarOpen: NotebookUtils.getFromStorage('sidebarOpen', true),
      relationshipsVisible: false
    };

    // Initialize UI
    this.init();
  }

  /**
   * Initialize the UI and event listeners
   */
  async init() {
    // Set initial theme
    this.setTheme(this.state.theme);
    
    // Set initial sidebar state
    this.toggleSidebar(this.state.sidebarOpen);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Use mock data directly instead of waiting for API
    this.showNotification('Using sample data for demonstration', 'info');
    const mockNotebooks = api.getMockData('notebooks');
    this.renderNotebooks(mockNotebooks);
    this.showLoading(false);
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // Theme toggle
    if (this.elements.toggleThemeBtn) {
      this.elements.toggleThemeBtn.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
    
    // Sidebar toggle
    if (this.elements.toggleSidebarBtn) {
      this.elements.toggleSidebarBtn.addEventListener('click', () => {
        this.toggleSidebar();
      });
    }
    
    // Search input
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', NotebookUtils.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 500));
    }
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    
    // Add responsive behavior
    window.addEventListener('resize', NotebookUtils.debounce(() => {
      this.handleResize();
    }, 200));
  }

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - The keyboard event
   */
  handleKeyboardShortcuts(e) {
    // Command/Ctrl + / - Toggle sidebar
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
      e.preventDefault();
      this.toggleSidebar();
    }
    
    // Command/Ctrl + k - Focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      this.elements.searchInput?.focus();
    }
    
    // Escape - Close modal/dialog if open
    if (e.key === 'Escape') {
      this.closeModal();
      this.elements.searchInput?.blur();
    }
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    const width = window.innerWidth;
    
    // Auto-close sidebar on small screens
    if (width < 768 && this.state.sidebarOpen) {
      this.toggleSidebar(false);
    }
  }

  /**
   * Load notebooks from API
   */
  async loadNotebooks() {
    try {
      this.showLoading(true);
      
      // Try to get notebooks from API
      const response = await api.getNotebooks();
      
      if (response.success && response.data) {
        this.renderNotebooks(response.data);
      } else {
        // Fallback to mock data if API fails
        const mockNotebooks = api.getMockData('notebooks');
        this.renderNotebooks(mockNotebooks);
        
        // Show notification that we're using mock data
        this.showNotification('Using sample data. API connection unavailable.', 'warning');
      }
    } catch (error) {
      console.error('Error loading notebooks:', error);
      this.showNotification('Failed to load notebooks. Using sample data.', 'error');
      
      // Fallback to mock data
      const mockNotebooks = api.getMockData('notebooks');
      this.renderNotebooks(mockNotebooks);
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Render notebooks in the sidebar
   * @param {Array} notebooks - The notebooks to render
   */
  renderNotebooks(notebooks) {
    if (!this.elements.notebookList || !notebooks) return;
    
    this.elements.notebookList.innerHTML = '';
    
    notebooks.forEach(notebook => {
      const notebookItem = NotebookUtils.createElement('div', {
        className: 'notebook-item',
        tabIndex: 0,
        'aria-label': `Notebook: ${notebook.title}`,
        dataset: { 
          id: notebook.id,
          testid: 'notebook-item'
        },
        onClick: () => this.selectNotebook(notebook.id)
      }, [
        NotebookUtils.createElement('h3', { className: 'notebook-title' }, notebook.title),
        NotebookUtils.createElement('p', { className: 'notebook-description' }, 
          NotebookUtils.truncateString(notebook.description, 60)
        ),
        NotebookUtils.createElement('span', { className: 'notebook-date' }, 
          NotebookUtils.formatDate(notebook.lastModified, { year: 'numeric', month: 'short', day: 'numeric' })
        )
      ]);
      
      this.elements.notebookList.appendChild(notebookItem);
    });
    
    // Select first notebook by default if none is active
    if (notebooks.length > 0 && !this.state.activeNotebook) {
      this.selectNotebook(notebooks[0].id);
    }
  }

  /**
   * Select a notebook and load its pages
   * @param {string} notebookId - The notebook ID to select
   */
  async selectNotebook(notebookId) {
    if (this.state.activeNotebook === notebookId) return;
    
    try {
      this.showLoading(true);
      this.state.activeNotebook = notebookId;
      
      // Update UI to show selected notebook
      this.updateSelectedNotebook();
      
      // Get pages for this notebook
      const response = await api.getPages(notebookId);
      
      if (response.success && response.data) {
        this.renderPages(response.data);
      } else {
        // Fallback to mock data
        const mockPages = api.getMockData('pages')[notebookId] || [];
        this.renderPages(mockPages);
      }
    } catch (error) {
      console.error('Error selecting notebook:', error);
      this.showNotification('Failed to load notebook pages', 'error');
      
      // Fallback to mock data
      const mockPages = api.getMockData('pages')[notebookId] || [];
      this.renderPages(mockPages);
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Update UI to reflect the selected notebook
   */
  updateSelectedNotebook() {
    // Remove selected class from all notebooks
    document.querySelectorAll('.notebook-item').forEach(item => {
      item.classList.remove('selected');
      item.setAttribute('aria-selected', 'false');
    });
    
    // Add selected class to active notebook
    const selectedNotebook = document.querySelector(`.notebook-item[data-id="${this.state.activeNotebook}"]`);
    if (selectedNotebook) {
      selectedNotebook.classList.add('selected');
      selectedNotebook.setAttribute('aria-selected', 'true');
    }
  }

  /**
   * Render pages for the selected notebook
   * @param {Array} pages - The pages to render
   */
  renderPages(pages) {
    if (!this.elements.pageList || !pages) return;
    
    this.elements.pageList.innerHTML = '';
    
    if (pages.length === 0) {
      const emptyMessage = NotebookUtils.createElement('p', { 
        className: 'empty-state',
        'aria-live': 'polite'
      }, 'No pages found in this notebook');
      
      this.elements.pageList.appendChild(emptyMessage);
      return;
    }
    
    // Create pages list
    const pagesList = NotebookUtils.createElement('ul', {
      className: 'pages-list',
      role: 'list',
      'aria-label': 'Notebook pages'
    });
    
    pages.forEach(page => {
      const pageItem = NotebookUtils.createElement('li', {
        className: 'page-item',
        dataset: { id: page.id },
        role: 'listitem'
      }, [
        NotebookUtils.createElement('button', {
          className: 'page-button',
          onClick: () => this.selectPage(page.id),
          'aria-label': `Page: ${page.title}`
        }, [
          NotebookUtils.createElement('span', { className: 'page-title' }, page.title),
          NotebookUtils.createElement('span', { className: 'page-tags' }, 
            page.tags ? page.tags.map(tag => `#${tag}`).join(' ') : ''
          ),
          NotebookUtils.createElement('span', { className: 'page-date' }, 
            NotebookUtils.formatDate(page.lastModified, { month: 'short', day: 'numeric' })
          )
        ])
      ]);
      
      pagesList.appendChild(pageItem);
    });
    
    this.elements.pageList.appendChild(pagesList);
    
    // Select first page by default
    if (pages.length > 0) {
      this.selectPage(pages[0].id);
    }
  }

  /**
   * Select and display a page
   * @param {string} pageId - The page ID to select
   */
  async selectPage(pageId) {
    if (this.state.activePage === pageId) return;
    
    try {
      this.showLoading(true);
      this.state.activePage = pageId;
      
      // Update UI to show selected page
      this.updateSelectedPage();
      
      // Get page content
      const response = await api.getPage(pageId);
      
      if (response.success && response.data) {
        this.renderPageContent(response.data);
      } else {
        // Fallback to mock data
        const mockContent = api.getMockData('pageContent')[pageId] || 'No content available';
        this.renderPageContent({ id: pageId, content: mockContent });
      }
      
      // Get relationships for this page
      this.loadRelationships(pageId);
    } catch (error) {
      console.error('Error selecting page:', error);
      this.showNotification('Failed to load page content', 'error');
      
      // Show error in content area
      this.renderPageContent({
        id: pageId,
        content: '# Error Loading Content\n\nThe requested content could not be loaded. Please try again later.'
      });
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Update UI to reflect the selected page
   */
  updateSelectedPage() {
    // Remove selected class from all pages
    document.querySelectorAll('.page-item').forEach(item => {
      item.classList.remove('selected');
      item.querySelector('.page-button')?.setAttribute('aria-selected', 'false');
    });
    
    // Add selected class to active page
    const selectedPage = document.querySelector(`.page-item[data-id="${this.state.activePage}"]`);
    if (selectedPage) {
      selectedPage.classList.add('selected');
      selectedPage.querySelector('.page-button')?.setAttribute('aria-selected', 'true');
    }
  }

  /**
   * Render page content in the content viewer
   * @param {Object} pageData - The page data to render
   */
  renderPageContent(pageData) {
    if (!this.elements.contentViewer || !pageData) return;
    
    // Parse markdown to HTML
    const contentHtml = NotebookUtils.parseMarkdown(pageData.content);
    
    // Create content area with header and body
    this.elements.contentViewer.innerHTML = '';
    
    const contentHeader = NotebookUtils.createElement('header', { className: 'content-header' });
    const contentBody = NotebookUtils.createElement('div', { 
      className: 'content-body',
      innerHTML: contentHtml 
    });
    
    // Get page title and other metadata from DOM
    let pageTitle = 'Unknown Page';
    const pageTitleElement = document.querySelector(`.page-item[data-id="${pageData.id}"] .page-title`);
    if (pageTitleElement) {
      pageTitle = pageTitleElement.textContent;
    }
    
    // Add title to header
    contentHeader.appendChild(
      NotebookUtils.createElement('h1', { className: 'content-title' }, pageTitle)
    );
    
    // Add toolbar with actions
    const toolbar = NotebookUtils.createElement('div', { className: 'content-toolbar' }, [
      NotebookUtils.createElement('button', {
        className: 'toolbar-button',
        'aria-label': 'Toggle relationships view',
        onClick: () => this.toggleRelationships()
      }, 'Relationships'),
      NotebookUtils.createElement('button', {
        className: 'toolbar-button',
        'aria-label': 'Export page',
        onClick: () => this.exportPage(pageData.id)
      }, 'Export')
    ]);
    
    contentHeader.appendChild(toolbar);
    
    // Add header and body to content viewer
    this.elements.contentViewer.appendChild(contentHeader);
    this.elements.contentViewer.appendChild(contentBody);
    
    // Update document title
    document.title = `${pageTitle} - Notebook Explorer`;
  }

  /**
   * Load relationships for a page
   * @param {string} pageId - The page ID to load relationships for
   */
  async loadRelationships(pageId) {
    if (!pageId) return;
    
    try {
      const response = await api.getRelationships(pageId);
      
      if (response.success && response.data) {
        this.renderRelationships(response.data);
      } else {
        // Fallback to mock data
        const mockRelationships = api.getMockData('relationships')[pageId] || [];
        this.renderRelationships(mockRelationships);
      }
    } catch (error) {
      console.error('Error loading relationships:', error);
    }
  }

  /**
   * Render relationships for the current page
   * @param {Array} relationships - The relationships to render
   */
  renderRelationships(relationships) {
    // Store relationships data for toggling
    this.relationships = relationships;
    
    // If relationships view is active, display them
    if (this.state.relationshipsVisible) {
      this.showRelationships();
    }
  }

  /**
   * Toggle relationships view
   */
  toggleRelationships() {
    this.state.relationshipsVisible = !this.state.relationshipsVisible;
    
    if (this.state.relationshipsVisible) {
      this.showRelationships();
    } else {
      this.hideRelationships();
    }
  }

  /**
   * Show relationships visualization
   */
  showRelationships() {
    // Generate relationships element if it doesn't exist
    const existingVisualization = document.getElementById('relationships-visualization');
    
    if (!existingVisualization) {
      // Create a placeholder for the visualization
      const visualization = NotebookUtils.createElement('div', {
        id: 'relationships-visualization',
        className: 'relationships-visualization',
        'aria-label': 'Page relationships visualization'
      });
      
      if (this.relationships && this.relationships.length > 0) {
        // Create table representation of relationships
        const table = NotebookUtils.createElement('table', {
          className: 'relationships-table',
          role: 'table',
          'aria-label': 'Page relationships'
        }, [
          NotebookUtils.createElement('thead', {}, 
            NotebookUtils.createElement('tr', {}, [
              NotebookUtils.createElement('th', {}, 'Source'),
              NotebookUtils.createElement('th', {}, 'Relationship'),
              NotebookUtils.createElement('th', {}, 'Target'),
              NotebookUtils.createElement('th', {}, 'Strength')
            ])
          )
        ]);
        
        const tbody = NotebookUtils.createElement('tbody', {});
        
        this.relationships.forEach(rel => {
          tbody.appendChild(
            NotebookUtils.createElement('tr', {}, [
              NotebookUtils.createElement('td', {}, rel.source),
              NotebookUtils.createElement('td', {}, rel.type),
              NotebookUtils.createElement('td', {}, rel.target),
              NotebookUtils.createElement('td', {}, `${Math.round(rel.strength * 100)}%`)
            ])
          );
        });
        
        table.appendChild(tbody);
        visualization.appendChild(table);
        
        // Note about better visualization
        const note = NotebookUtils.createElement('p', { className: 'visualization-note' }, 
          'Note: A graphical network visualization will be implemented in the next version.'
        );
        visualization.appendChild(note);
      } else {
        // No relationships
        visualization.appendChild(
          NotebookUtils.createElement('p', { className: 'empty-state' }, 
            'No relationships found for this page.'
          )
        );
      }
      
      // Add close button
      const closeBtn = NotebookUtils.createElement('button', {
        className: 'close-btn',
        'aria-label': 'Close relationships view',
        onClick: () => this.toggleRelationships()
      }, '×');
      
      visualization.appendChild(closeBtn);
      
      // Add to content viewer
      this.elements.contentViewer.appendChild(visualization);
    } else {
      existingVisualization.style.display = 'block';
    }
  }

  /**
   * Hide relationships visualization
   */
  hideRelationships() {
    const visualization = document.getElementById('relationships-visualization');
    if (visualization) {
      visualization.style.display = 'none';
    }
  }

  /**
   * Export current page
   * @param {string} pageId - The page ID to export
   */
  exportPage(pageId) {
    if (!pageId) return;
    
    try {
      // Get page title
      let pageTitle = 'page';
      const pageTitleElement = document.querySelector(`.page-item[data-id="${pageId}"] .page-title`);
      if (pageTitleElement) {
        pageTitle = pageTitleElement.textContent;
      }
      
      // Get content
      const content = this.elements.contentViewer.querySelector('.content-body').textContent;
      
      // Create download link
      const filename = NotebookUtils.createSlug(pageTitle) + '.md';
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      
      URL.revokeObjectURL(url);
      
      this.showNotification(`Exported ${filename}`, 'success');
    } catch (error) {
      console.error('Error exporting page:', error);
      this.showNotification('Failed to export page', 'error');
    }
  }

  /**
   * Show a notification message
   * @param {string} message - The notification message
   * @param {string} type - The notification type (info, success, warning, error)
   * @param {number} duration - Duration in ms to show the notification
   */
  showNotification(message, type = 'info', duration = 5000) {
    if (!this.elements.notificationContainer) return;
    
    const notification = NotebookUtils.createElement('div', {
      className: `notification notification-${type}`,
      role: 'status',
      'aria-live': type === 'error' ? 'assertive' : 'polite'
    }, [
      NotebookUtils.createElement('div', { className: 'notification-message' }, message),
      NotebookUtils.createElement('button', {
        className: 'notification-close',
        'aria-label': 'Dismiss notification',
        onClick: (e) => {
          e.target.closest('.notification').remove();
        }
      }, '×')
    ]);
    
    this.elements.notificationContainer.appendChild(notification);
    
    // Automatically remove after duration
    if (duration) {
      setTimeout(() => {
        notification.classList.add('notification-hiding');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, duration);
    }
  }

  /**
   * Show/hide loading indicator
   * @param {boolean} show - Whether to show or hide
   */
  showLoading(show = true) {
    if (!this.elements.loadingIndicator) return;
    
    if (show) {
      this.elements.loadingIndicator.style.display = 'flex';
      this.elements.loadingIndicator.setAttribute('aria-hidden', 'false');
    } else {
      this.elements.loadingIndicator.style.display = 'none';
      this.elements.loadingIndicator.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Show a modal dialog
   * @param {string} title - The modal title
   * @param {string|HTMLElement} content - The modal content
   * @param {Object} options - Modal options
   */
  showModal(title, content, options = {}) {
    if (!this.elements.modalContainer) return;
    
    const defaults = {
      closeButton: true,
      width: 'medium', // small, medium, large, or 'auto'
      onClose: null,
      actions: [] // Array of { label, action, primary }
    };
    
    const settings = { ...defaults, ...options };
    
    // Create modal
    const modal = NotebookUtils.createElement('div', {
      className: `modal modal-${settings.width}`,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'modal-title'
    });
    
    // Modal header
    const header = NotebookUtils.createElement('div', { className: 'modal-header' }, [
      NotebookUtils.createElement('h2', { id: 'modal-title', className: 'modal-title' }, title)
    ]);
    
    if (settings.closeButton) {
      header.appendChild(
        NotebookUtils.createElement('button', {
          className: 'modal-close',
          'aria-label': 'Close dialog',
          onClick: () => this.closeModal()
        }, '×')
      );
    }
    
    modal.appendChild(header);
    
    // Modal body
    const body = NotebookUtils.createElement('div', { className: 'modal-body' });
    
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.appendChild(content);
    }
    
    modal.appendChild(body);
    
    // Modal footer with actions
    if (settings.actions.length > 0) {
      const footer = NotebookUtils.createElement('div', { className: 'modal-footer' });
      
      settings.actions.forEach(action => {
        footer.appendChild(
          NotebookUtils.createElement('button', {
            className: `btn ${action.primary ? 'btn-primary' : 'btn-secondary'}`,
            onClick: () => {
              if (action.action) {
                action.action();
              }
              if (action.closeOnClick !== false) {
                this.closeModal();
              }
            }
          }, action.label)
        );
      });
      
      modal.appendChild(footer);
    }
    
    // Add modal to container
    this.elements.modalContainer.innerHTML = '';
    this.elements.modalContainer.appendChild(modal);
    this.elements.modalContainer.style.display = 'flex';
    
    // Store onClose callback
    this._modalOnClose = settings.onClose;
    
    // Focus first focusable element
    setTimeout(() => {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 100);
    
    // Trap focus inside modal
    this._handleTabKey = (e) => {
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    document.addEventListener('keydown', this._handleTabKey);
  }

  /**
   * Close the modal dialog
   */
  closeModal() {
    if (!this.elements.modalContainer) return;
    
    this.elements.modalContainer.style.display = 'none';
    this.elements.modalContainer.innerHTML = '';
    
    // Remove tab trap
    document.removeEventListener('keydown', this._handleTabKey);
    
    // Execute onClose callback if defined
    if (this._modalOnClose && typeof this._modalOnClose === 'function') {
      this._modalOnClose();
      this._modalOnClose = null;
    }
  }

  /**
   * Set the theme (light or dark)
   * @param {string} theme - The theme to set
   */
  setTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    NotebookUtils.saveToStorage('theme', theme);
    
    // Update button aria-pressed state
    if (this.elements.toggleThemeBtn) {
      this.elements.toggleThemeBtn.setAttribute('aria-pressed', theme === 'dark');
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Toggle sidebar visibility
   * @param {boolean} open - Whether to open or close the sidebar
   */
  toggleSidebar(open = !this.state.sidebarOpen) {
    this.state.sidebarOpen = open;
    document.documentElement.setAttribute('data-sidebar', open ? 'open' : 'closed');
    NotebookUtils.saveToStorage('sidebarOpen', open);
    
    // Update button aria-pressed and label
    if (this.elements.toggleSidebarBtn) {
      this.elements.toggleSidebarBtn.setAttribute('aria-pressed', open);
      this.elements.toggleSidebarBtn.setAttribute('aria-label', open ? 'Hide sidebar' : 'Show sidebar');
    }
    
    // Announce to screen readers
    this.announceForScreenReader(open ? 'Sidebar opened' : 'Sidebar closed');
  }

  /**
   * Handle search input
   * @param {string} query - The search query
   */
  async handleSearch(query) {
    this.state.searchQuery = query;
    
    if (!query || query.length < 2) {
      this.clearSearchResults();
      return;
    }
    
    try {
      this.showLoading(true);
      
      // Search API
      const response = await api.search(query);
      
      if (response.success && response.data) {
        this.renderSearchResults(response.data);
      } else {
        // Search in mock data as fallback
        const results = this.searchMockData(query);
        this.renderSearchResults(results);
      }
    } catch (error) {
      console.error('Search error:', error);
      this.showNotification('Search failed', 'error');
      
      // Search in mock data as fallback
      const results = this.searchMockData(query);
      this.renderSearchResults(results);
    } finally {
      this.showLoading(false);
    }
  }

  /**
   * Search in mock data
   * @param {string} query - The search query
   * @returns {Array} - Search results
   */
  searchMockData(query) {
    if (!query) return [];
    
    const results = [];
    const lcQuery = query.toLowerCase();
    
    // Search in notebooks
    const notebooks = api.getMockData('notebooks');
    notebooks.forEach(notebook => {
      if (notebook.title.toLowerCase().includes(lcQuery) || 
          notebook.description.toLowerCase().includes(lcQuery)) {
        results.push({
          id: notebook.id,
          type: 'notebook',
          title: notebook.title,
          description: notebook.description,
          lastModified: notebook.lastModified
        });
      }
    });
    
    // Search in pages
    const pagesData = api.getMockData('pages');
    Object.values(pagesData).flat().forEach(page => {
      if (page.title.toLowerCase().includes(lcQuery)) {
        results.push({
          id: page.id,
          type: 'page',
          title: page.title,
          notebookId: page.notebookId,
          path: page.path,
          lastModified: page.lastModified
        });
      }
    });
    
    // Search in page content
    const contentData = api.getMockData('pageContent');
    Object.entries(contentData).forEach(([pageId, content]) => {
      if (content.toLowerCase().includes(lcQuery)) {
        const page = Object.values(pagesData).flat().find(p => p.id === pageId);
        if (page) {
          results.push({
            id: pageId,
            type: 'content',
            title: page.title,
            notebookId: page.notebookId,
            path: page.path,
            excerpt: this.generateExcerpt(content, lcQuery),
            lastModified: page.lastModified
          });
        }
      }
    });
    
    return results;
  }

  /**
   * Generate an excerpt of text containing a query
   * @param {string} text - The text to excerpt
   * @param {string} query - The query to highlight
   * @returns {string} - The excerpt
   */
  generateExcerpt(text, query) {
    const lcText = text.toLowerCase();
    const index = lcText.indexOf(query);
    
    if (index === -1) return text.substring(0, 100) + '...';
    
    let start = Math.max(0, index - 50);
    let end = Math.min(text.length, index + query.length + 50);
    
    // Adjust start to not cut off words
    if (start > 0) {
      while (start > 0 && text[start] !== ' ') {
        start--;
      }
    }
    
    // Adjust end to not cut off words
    if (end < text.length) {
      while (end < text.length && text[end] !== ' ') {
        end++;
      }
    }
    
    const excerpt = text.substring(start, end);
    
    return (start > 0 ? '...' : '') + excerpt + (end < text.length ? '...' : '');
  }

  /**
   * Render search results
   * @param {Array} results - The search results
   */
  renderSearchResults(results) {
    if (!this.elements.searchResults) return;
    
    this.elements.searchResults.innerHTML = '';
    
    if (results.length === 0) {
      this.elements.searchResults.innerHTML = '<p class="empty-state">No results found</p>';
      return;
    }
    
    const resultsList = NotebookUtils.createElement('div', {
      className: 'search-results-list',
      role: 'list',
      'aria-label': `${results.length} search results`
    });
    
    results.forEach(result => {
      const resultType = result.type === 'notebook' ? 'Notebook' : result.type === 'page' ? 'Page' : 'Content';
      
      const resultItem = NotebookUtils.createElement('div', {
        className: `search-result search-result-${result.type}`,
        role: 'listitem'
      }, [
        NotebookUtils.createElement('div', { className: 'search-result-header' }, [
          NotebookUtils.createElement('span', { className: 'search-result-type' }, resultType),
          NotebookUtils.createElement('h3', { className: 'search-result-title' }, result.title)
        ]),
        result.excerpt ? 
          NotebookUtils.createElement('p', { className: 'search-result-excerpt' }, result.excerpt) :
          null,
        NotebookUtils.createElement('div', { className: 'search-result-footer' }, [
          NotebookUtils.createElement('span', { className: 'search-result-path' }, result.path || ''),
          NotebookUtils.createElement('span', { className: 'search-result-date' }, 
            NotebookUtils.formatDate(result.lastModified, { year: 'numeric', month: 'short', day: 'numeric' })
          )
        ]),
        NotebookUtils.createElement('button', {
          className: 'search-result-action',
          onClick: () => this.navigateToSearchResult(result),
          'aria-label': `Open ${resultType}: ${result.title}`
        }, 'Open')
      ]);
      
      resultsList.appendChild(resultItem);
    });
    
    this.elements.searchResults.appendChild(resultsList);
    this.elements.searchResults.style.display = 'block';
  }

  /**
   * Clear search results
   */
  clearSearchResults() {
    if (!this.elements.searchResults) return;
    
    this.elements.searchResults.innerHTML = '';
    this.elements.searchResults.style.display = 'none';
  }

  /**
   * Navigate to a search result
   * @param {Object} result - The search result
   */
  navigateToSearchResult(result) {
    if (result.type === 'notebook') {
      this.selectNotebook(result.id);
    } else {
      if (result.notebookId !== this.state.activeNotebook) {
        // First select the notebook, then the page
        this.selectNotebook(result.notebookId);
        setTimeout(() => {
          this.selectPage(result.id);
        }, 500);
      } else {
        // Just select the page if notebook is already active
        this.selectPage(result.id);
      }
    }
    
    // Clear search
    if (this.elements.searchInput) {
      this.elements.searchInput.value = '';
    }
    this.clearSearchResults();
  }

  /**
   * Announce a message to screen readers
   * @param {string} message - The message to announce
   */
  announceForScreenReader(message) {
    let announcer = document.getElementById('sr-announcer');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
    
    // Clear after a delay to ensure it's not announced multiple times
    setTimeout(() => {
      announcer.textContent = '';
    }, 3000);
  }
}

// Create and export UI instance
const ui = new NotebookUI();
export default ui;