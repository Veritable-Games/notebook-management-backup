/**
 * Notebook formatting utilities for the Notebook Explorer application
 */

const NotebookFormat = {
  /**
   * Parse markdown to HTML with support for wiki links
   * @param {string} markdown - Markdown content to parse
   * @returns {string} - HTML content
   */
  parseMarkdown(markdown) {
    if (!markdown) return '';
    
    // Use marked library if available
    if (window.marked) {
      // Configure marked
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
      });
      
      // Process wiki links before passing to marked
      const processedMarkdown = this.processWikiLinks(markdown);
      
      // Convert to HTML
      return marked.parse(processedMarkdown);
    }
    
    // Fallback to basic markdown parsing
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
    
    // Process wiki links in the HTML
    html = this.processWikiLinks(html);
    
    return html;
  },
  
  /**
   * Process wiki-style links in text
   * @param {string} text - Text to process
   * @returns {string} - Text with wiki links converted to HTML links
   */
  processWikiLinks(text) {
    if (!text) return '';
    
    // Convert CamelCase wiki links
    text = text.replace(/\b([A-Z][a-z]+[A-Z][a-z]+\w*)\b/g, (match) => {
      return `<a href="#${match}" class="wiki-link">${match}</a>`;
    });
    
    // Convert [[link]] style wiki links
    text = text.replace(/\[\[([\w\s-]+)(?:\|([\w\s-]+))?\]\]/g, (match, link, label) => {
      const displayText = label || link;
      return `<a href="#${link.replace(/\s+/g, '_')}" class="wiki-link">${displayText}</a>`;
    });
    
    return text;
  },
  
  /**
   * Format a notebook entry
   * @param {Object} notebook - Notebook data
   * @returns {string} - Formatted HTML for the notebook
   */
  formatNotebook(notebook) {
    if (!notebook) return '';
    
    return `
      <div class="notebook-header">
        <h2>${this.escapeHTML(notebook.title)}</h2>
        <p class="notebook-description">${this.escapeHTML(notebook.description || '')}</p>
      </div>
      
      <div class="notebook-meta">
        <p><strong>Last Modified:</strong> ${this.formatDate(notebook.lastModified)}</p>
        <p><strong>Pages:</strong> ${notebook.pageCount || 'Unknown'}</p>
      </div>
    `;
  },
  
  /**
   * Format a page entry
   * @param {Object} page - Page data
   * @param {boolean} includeToc - Whether to include table of contents
   * @returns {string} - Formatted HTML for the page
   */
  formatPage(page, includeToc = true) {
    if (!page) return '';
    
    // Parse content
    const contentHtml = this.parseMarkdown(page.content);
    
    // Generate table of contents if requested
    let tocHtml = '';
    if (includeToc) {
      tocHtml = this.generateTableOfContents(contentHtml);
    }
    
    return `
      <article class="page-content">
        <div class="page-header">
          <h1>${this.escapeHTML(page.title)}</h1>
          ${page.tags ? `<div class="page-tags">${this.formatTags(page.tags)}</div>` : ''}
          <div class="page-meta">
            <span class="page-date">Last modified: ${this.formatDate(page.lastModified)}</span>
          </div>
        </div>
        
        ${tocHtml ? `<div class="page-toc">${tocHtml}</div>` : ''}
        
        <div class="page-body">
          ${contentHtml}
        </div>
      </article>
    `;
  },
  
  /**
   * Generate a table of contents from HTML content
   * @param {string} html - HTML content
   * @returns {string} - Table of contents HTML
   */
  generateTableOfContents(html) {
    if (!html) return '';
    
    // Create temporary element to parse headings
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Get all headings (h1, h2, h3)
    const headings = temp.querySelectorAll('h1, h2, h3');
    
    if (headings.length < 3) {
      return ''; // Not enough headings to warrant a TOC
    }
    
    // Generate TOC
    let toc = '<div class="toc"><h4>Table of Contents</h4><ul>';
    
    headings.forEach((heading, index) => {
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
      
      // Determine indentation level
      const level = parseInt(heading.tagName.substring(1));
      const indentClass = `toc-level-${level}`;
      
      // Add TOC entry
      toc += `<li class="${indentClass}"><a href="#${heading.id}">${heading.textContent}</a></li>`;
    });
    
    toc += '</ul></div>';
    return toc;
  },
  
  /**
   * Format tags as HTML
   * @param {Array|string} tags - Array of tags or comma-separated string
   * @returns {string} - HTML for tags
   */
  formatTags(tags) {
    if (!tags) return '';
    
    // Convert string to array if needed
    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    
    // Format each tag
    const tagHtml = tagArray.map(tag => {
      return `<span class="tag">#${this.escapeHTML(tag)}</span>`;
    }).join(' ');
    
    return tagHtml;
  },
  
  /**
   * Format a date
   * @param {string|Date} date - Date to format
   * @returns {string} - Formatted date string
   */
  formatDate(date) {
    if (!date) return 'Unknown';
    
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      return dateObj.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  },
  
  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} - Escaped text
   */
  escapeHTML(text) {
    if (!text) return '';
    
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

export default NotebookFormat;