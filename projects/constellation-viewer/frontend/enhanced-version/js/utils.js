/**
 * Utility functions for the Notebook Explorer application
 */

const NotebookUtils = {
  /**
   * Debounce function to limit the rate at which a function can fire
   * @param {Function} func - The function to debounce
   * @param {number} wait - The time to wait in milliseconds
   * @returns {Function} - The debounced function
   */
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Generate a unique ID
   * @param {string} prefix - Optional prefix for the ID
   * @returns {string} - A unique ID
   */
  generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Format a date string
   * @param {string|Date} date - The date to format
   * @param {Object} options - Formatting options
   * @returns {string} - Formatted date string
   */
  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(undefined, { ...defaultOptions, ...options });
  },

  /**
   * Safely get a nested property from an object
   * @param {Object} obj - The object to get the property from
   * @param {string} path - The path to the property
   * @param {*} defaultValue - The default value to return if the property doesn't exist
   * @returns {*} - The property value or default value
   */
  getNestedProperty(obj, path, defaultValue = null) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current !== undefined ? current : defaultValue;
  },

  /**
   * Truncate a string to a specified length
   * @param {string} str - The string to truncate
   * @param {number} length - The max length
   * @param {string} ending - The ending to append
   * @returns {string} - Truncated string
   */
  truncateString(str, length = 50, ending = '...') {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length - ending.length) + ending;
  },

  /**
   * Sanitize a string for safe insertion into HTML
   * @param {string} str - The string to sanitize
   * @returns {string} - Sanitized string
   */
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  /**
   * Create an element with attributes and content
   * @param {string} tag - The HTML tag name
   * @param {Object} attrs - The attributes to set
   * @param {string|Node|Array} children - The children to append
   * @returns {HTMLElement} - The created element
   */
  createElement(tag, attrs = {}, children = null) {
    const element = document.createElement(tag);
    
    // Set attributes
    for (const [key, value] of Object.entries(attrs)) {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset') {
        for (const [dataKey, dataValue] of Object.entries(value)) {
          element.dataset[dataKey] = dataValue;
        }
      } else if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    }
    
    // Add children
    if (children) {
      if (Array.isArray(children)) {
        children.forEach(child => {
          if (child) {
            element.append(typeof child === 'string' ? document.createTextNode(child) : child);
          }
        });
      } else {
        element.append(typeof children === 'string' ? document.createTextNode(children) : children);
      }
    }
    
    return element;
  },

  /**
   * Parse markdown content into HTML
   * @param {string} markdown - The markdown content
   * @returns {string} - The HTML string
   */
  parseMarkdown(markdown) {
    if (!markdown) return '';
    
    // Simple markdown parsing (replace with a proper library in production)
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Code
      .replace(/`(.*?)`/gim, '<code>$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      // Lists
      .replace(/^\s*\n\*/gim, '<ul>\n*')
      .replace(/^(\*)(.*)/gim, '<li>$2</li>')
      .replace(/^\s*\n$/gim, '</ul>\n\n')
      // Line breaks
      .replace(/\n/gim, '<br>');
    
    return html;
  },

  /**
   * Store data in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  saveToStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  /**
   * Retrieve data from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key not found
   * @returns {*} - Retrieved value or default
   */
  getFromStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Check if a string contains another string (case insensitive)
   * @param {string} str - The string to search in
   * @param {string} searchTerm - The string to search for
   * @returns {boolean} - True if found
   */
  containsText(str, searchTerm) {
    if (!str || !searchTerm) return false;
    return str.toLowerCase().includes(searchTerm.toLowerCase());
  },

  /**
   * Escape regular expression special characters
   * @param {string} str - The string to escape
   * @returns {string} - Escaped string
   */
  escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  /**
   * Create a slug from a string
   * @param {string} str - The string to convert
   * @returns {string} - URL-friendly slug
   */
  createSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};

export default NotebookUtils;