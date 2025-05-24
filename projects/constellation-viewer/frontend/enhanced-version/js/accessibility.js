/**
 * Accessibility enhancements for the Notebook Explorer application
 */

import NotebookUtils from './utils.js';

class AccessibilityManager {
  constructor() {
    // DOM references
    this.elements = {
      skipLink: document.querySelector('.skip-link'),
      focusableElements: null, // Will be populated on init
      modals: document.querySelectorAll('[role="dialog"]'),
      mainContent: document.getElementById('main-content'),
      announcer: null // Will be created on init
    };
    
    // State
    this.state = {
      lastFocusedElement: null,
      keyboardUser: false,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: more)').matches
    };
    
    // Initialize
    this.init();
  }

  /**
   * Initialize accessibility features
   */
  init() {
    // Create screen reader announcer
    this.createAnnouncer();
    
    // Cache focusable elements
    this.updateFocusableElements();
    
    // Track whether user is navigating with keyboard
    this.detectKeyboardUser();
    
    // Implement skip link functionality
    this.setupSkipLink();
    
    // Listen for preference changes
    this.listenForPreferenceChanges();
    
    // Apply initial preferences
    this.applyUserPreferences();
    
    // Set up keyboard navigation enhancements
    this.enhanceKeyboardNavigation();
    
    // Initialize focus trap for modals
    this.setupModalFocusTraps();
    
    // Override any animations if reduced motion is preferred
    if (this.state.reducedMotion) {
      this.applyReducedMotion();
    }
    
    // Add high contrast if preferred
    if (this.state.highContrast) {
      this.applyHighContrast();
    }
  }

  /**
   * Create screen reader announcer element
   */
  createAnnouncer() {
    // Create live region for screen reader announcements
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    
    document.body.appendChild(announcer);
    this.elements.announcer = announcer;
  }

  /**
   * Cache all focusable elements in the document
   */
  updateFocusableElements() {
    this.elements.focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
      'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), details, summary'
    );
  }

  /**
   * Detect if user is navigating with keyboard
   */
  detectKeyboardUser() {
    // Add 'using-keyboard' class when Tab is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.state.keyboardUser = true;
        document.body.classList.add('using-keyboard');
      }
    });
    
    // Remove class when mouse is used
    document.addEventListener('mousedown', () => {
      this.state.keyboardUser = false;
      document.body.classList.remove('using-keyboard');
    });
  }

  /**
   * Set up skip link functionality
   */
  setupSkipLink() {
    if (!this.elements.skipLink) return;
    
    this.elements.skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = this.elements.skipLink.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
        
        // Remove tabindex after focus to avoid interfering with normal tab order
        setTimeout(() => {
          targetElement.removeAttribute('tabindex');
        }, 1000);
      }
    });
  }

  /**
   * Listen for user preference changes
   */
  listenForPreferenceChanges() {
    // Listen for reduced motion preference changes
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionMediaQuery.addEventListener('change', (e) => {
      this.state.reducedMotion = e.matches;
      this.applyUserPreferences();
    });
    
    // Listen for contrast preference changes
    const contrastMediaQuery = window.matchMedia('(prefers-contrast: more)');
    contrastMediaQuery.addEventListener('change', (e) => {
      this.state.highContrast = e.matches;
      this.applyUserPreferences();
    });
  }

  /**
   * Apply user preferences
   */
  applyUserPreferences() {
    if (this.state.reducedMotion) {
      this.applyReducedMotion();
    } else {
      this.removeReducedMotion();
    }
    
    if (this.state.highContrast) {
      this.applyHighContrast();
    } else {
      this.removeHighContrast();
    }
  }

  /**
   * Apply reduced motion settings
   */
  applyReducedMotion() {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  }

  /**
   * Remove reduced motion settings
   */
  removeReducedMotion() {
    document.documentElement.removeAttribute('data-reduced-motion');
  }

  /**
   * Apply high contrast settings
   */
  applyHighContrast() {
    document.documentElement.setAttribute('data-high-contrast', 'true');
  }

  /**
   * Remove high contrast settings
   */
  removeHighContrast() {
    document.documentElement.removeAttribute('data-high-contrast');
  }

  /**
   * Enhance keyboard navigation
   */
  enhanceKeyboardNavigation() {
    // Add keyboard shortcuts for main sections
    document.addEventListener('keydown', (e) => {
      // Only handle keyboard shortcuts when not in input fields
      const activeElement = document.activeElement;
      const isInInput = activeElement.tagName === 'INPUT' || 
                         activeElement.tagName === 'TEXTAREA' || 
                         activeElement.isContentEditable;
      
      if (isInInput && e.key !== 'Escape') return;
      
      // Common shortcuts
      this.handleKeyboardShortcuts(e);
    });
  }

  /**
   * Handle keyboard shortcuts
   * @param {KeyboardEvent} e - The keyboard event
   */
  handleKeyboardShortcuts(e) {
    // Alt + number - quick navigation
    if (e.altKey && !e.ctrlKey && !e.metaKey && !isNaN(parseInt(e.key))) {
      const num = parseInt(e.key);
      this.handleNumberShortcut(num, e);
    }
    
    // Alt + letter shortcuts
    if (e.altKey && !e.ctrlKey && !e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'h': // Help
          e.preventDefault();
          this.showAccessibilityHelp();
          break;
          
        case 's': // Search
          e.preventDefault();
          this.focusElement('#search-input');
          break;
          
        case 'n': // Notebooks
          e.preventDefault();
          this.focusFirstInRegion('#notebook-list');
          break;
          
        case 'p': // Pages
          e.preventDefault();
          this.focusFirstInRegion('#page-list');
          break;
          
        case 'c': // Content
          e.preventDefault();
          this.focusElement('#main-content');
          break;
      }
    }
  }

  /**
   * Handle numeric keyboard shortcuts (Alt + number)
   * @param {number} num - The pressed number
   * @param {KeyboardEvent} e - The original event
   */
  handleNumberShortcut(num, e) {
    switch (num) {
      case 1: // Main content
        e.preventDefault();
        this.focusElement('#main-content');
        break;
        
      case 2: // Notebooks
        e.preventDefault();
        this.focusFirstInRegion('#notebook-list');
        break;
        
      case 3: // Pages
        e.preventDefault();
        this.focusFirstInRegion('#page-list');
        break;
        
      case 4: // Search
        e.preventDefault();
        this.focusElement('#search-input');
        break;
        
      case 0: // Help
        e.preventDefault();
        this.showAccessibilityHelp();
        break;
    }
  }

  /**
   * Focus a specific element
   * @param {string} selector - CSS selector for the element
   */
  focusElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
      this.announce(`Moved to ${element.getAttribute('aria-label') || element.tagName}`);
    }
  }

  /**
   * Focus the first focusable element in a region
   * @param {string} selector - CSS selector for the region
   */
  focusFirstInRegion(selector) {
    const region = document.querySelector(selector);
    if (!region) return;
    
    const firstFocusable = region.querySelector(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
      'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), details, summary'
    );
    
    if (firstFocusable) {
      firstFocusable.focus();
      this.announce(`Moved to ${region.getAttribute('aria-label') || region.id || 'new section'}`);
    }
  }

  /**
   * Set up focus traps for modal dialogs
   */
  setupModalFocusTraps() {
    // Observe for new modals being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.getAttribute('role') === 'dialog') {
              this.trapFocusInModal(node);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Set up existing modals
    this.elements.modals.forEach(modal => {
      this.trapFocusInModal(modal);
    });
  }

  /**
   * Trap focus inside a modal dialog
   * @param {HTMLElement} modal - The modal element
   */
  trapFocusInModal(modal) {
    // Store last focused element to restore focus when modal closes
    this.state.lastFocusedElement = document.activeElement;
    
    // Find all focusable elements in the modal
    const focusableElements = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Focus the first element
    setTimeout(() => {
      firstElement.focus();
    }, 50);
    
    // Handle Tab key to trap focus
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab on first element should move to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      
      // Tab on last element should move to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
    
    // When modal is closed, restore focus
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && 
            mutation.attributeName === 'style' && 
            modal.style.display === 'none') {
          if (this.state.lastFocusedElement) {
            this.state.lastFocusedElement.focus();
          }
          observer.disconnect();
        }
      });
    });
    
    observer.observe(modal, { attributes: true });
  }

  /**
   * Show accessibility help dialog
   */
  showAccessibilityHelp() {
    const content = `
      <div class="accessibility-help">
        <h3>Keyboard Shortcuts</h3>
        <ul>
          <li><strong>Alt + 1:</strong> Jump to main content</li>
          <li><strong>Alt + 2:</strong> Jump to notebooks list</li>
          <li><strong>Alt + 3:</strong> Jump to pages list</li>
          <li><strong>Alt + 4:</strong> Jump to search</li>
          <li><strong>Alt + 0:</strong> Show this help dialog</li>
          <li><strong>Alt + H:</strong> Show this help dialog</li>
          <li><strong>Alt + S:</strong> Focus search input</li>
          <li><strong>Alt + N:</strong> Focus notebooks list</li>
          <li><strong>Alt + P:</strong> Focus pages list</li>
          <li><strong>Alt + C:</strong> Focus content area</li>
          <li><strong>Tab:</strong> Navigate through interactive elements</li>
          <li><strong>Shift + Tab:</strong> Navigate backwards</li>
          <li><strong>Enter/Space:</strong> Activate focused element</li>
          <li><strong>Escape:</strong> Close dialogs or cancel actions</li>
        </ul>

        <h3>Accessibility Features</h3>
        <ul>
          <li>High contrast mode is automatically applied when system preferences are set</li>
          <li>Reduced motion is automatically applied when system preferences are set</li>
          <li>All interactive elements are keyboard accessible</li>
          <li>Screen reader announcements for dynamic content</li>
          <li>ARIA roles and attributes for improved screen reader navigation</li>
          <li>Focus indicators for keyboard users</li>
        </ul>
      </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'accessibility-help-title');
    modal.setAttribute('aria-modal', 'true');
    modal.className = 'modal accessibility-help-modal';
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="accessibility-help-title">Accessibility Help</h2>
          <button aria-label="Close" class="close-button">&times;</button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Close</button>
        </div>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-button');
    const primaryBtn = modal.querySelector('.btn-primary');
    
    const closeModal = () => {
      document.body.removeChild(modal);
      if (this.state.lastFocusedElement) {
        this.state.lastFocusedElement.focus();
      }
    };
    
    closeBtn.addEventListener('click', closeModal);
    primaryBtn.addEventListener('click', closeModal);
    
    // Close on Escape
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
    
    // Trap focus in modal
    this.trapFocusInModal(modal);
  }

  /**
   * Announce message to screen readers
   * @param {string} message - The message to announce
   * @param {string} priority - 'polite' or 'assertive'
   */
  announce(message, priority = 'polite') {
    if (!this.elements.announcer) {
      this.createAnnouncer();
    }
    
    // Set the appropriate aria-live attribute
    this.elements.announcer.setAttribute('aria-live', priority);
    
    // Clear any existing text (necessary to ensure new identical messages are announced)
    this.elements.announcer.textContent = '';
    
    // Set the new text in a setTimeout to ensure it's read
    setTimeout(() => {
      this.elements.announcer.textContent = message;
    }, 50);
    
    // Clear after a delay to prevent re-announcing
    setTimeout(() => {
      this.elements.announcer.textContent = '';
    }, 3000);
  }

  /**
   * Create a focus outline around an element
   * Used to highlight elements for visual keyboard users
   * @param {HTMLElement} element - Element to highlight
   */
  highlightElement(element) {
    if (!element || !this.state.keyboardUser) return;
    
    // Create or get highlight element
    let highlight = document.getElementById('keyboard-highlight');
    
    if (!highlight) {
      highlight = document.createElement('div');
      highlight.id = 'keyboard-highlight';
      highlight.className = 'keyboard-focus-highlight';
      document.body.appendChild(highlight);
    }
    
    // Position the highlight
    const rect = element.getBoundingClientRect();
    highlight.style.top = `${rect.top + window.scrollY - 4}px`;
    highlight.style.left = `${rect.left + window.scrollX - 4}px`;
    highlight.style.width = `${rect.width + 8}px`;
    highlight.style.height = `${rect.height + 8}px`;
    highlight.style.display = 'block';
    
    // Remove after a delay
    setTimeout(() => {
      highlight.style.display = 'none';
    }, 2000);
  }
}

// Initialize accessibility manager
const accessibility = new AccessibilityManager();
export default accessibility;