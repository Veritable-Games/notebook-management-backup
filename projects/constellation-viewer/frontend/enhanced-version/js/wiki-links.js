/**
 * Wiki links handling for the Notebook Explorer application
 */

const WikiLinks = {
  /**
   * Process wiki links in a document
   * Converts various wiki link formats to clickable links
   */
  processDocument() {
    // Process after the document is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.setupLinkHandlers();
    });
  },
  
  /**
   * Set up event handlers for wiki links
   */
  setupLinkHandlers() {
    // Handle wiki link clicks
    document.addEventListener('click', event => {
      const link = event.target.closest('.wiki-link');
      if (link) {
        event.preventDefault();
        this.handleWikiLinkClick(link);
      }
    });
  },
  
  /**
   * Handle wiki link clicks
   * @param {HTMLElement} link - The clicked link element
   */
  handleWikiLinkClick(link) {
    if (!link) return;
    
    const target = link.getAttribute('href').substring(1); // Remove '#'
    
    // Dispatch custom event that other components can listen for
    const wikiLinkEvent = new CustomEvent('wiki-link-clicked', {
      detail: {
        target: target,
        source: window.location.hash.substring(1) || 'index',
        element: link
      },
      bubbles: true
    });
    
    link.dispatchEvent(wikiLinkEvent);
    
    // For demo purposes, show link info in a notification
    this.showLinkNotification(target);
  },
  
  /**
   * Show a notification about the clicked link
   * @param {string} target - The link target
   */
  showLinkNotification(target) {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-info';
    notification.setAttribute('role', 'status');
    notification.innerHTML = `
      <div class="notification-content">
        <p>Navigating to wiki page: <strong>${target}</strong></p>
        <p>This is a demo notification for wiki links.</p>
      </div>
      <button class="notification-close" aria-label="Dismiss notification">&times;</button>
    `;
    
    // Add close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      notification.classList.add('notification-hiding');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Add to container
    container.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('notification-hiding');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  },
  
  /**
   * Parse a text string to extract wiki links
   * @param {string} text - Text to parse
   * @returns {Array} - Array of extracted link objects
   */
  extractLinks(text) {
    if (!text) return [];
    
    const links = [];
    
    // Match CamelCase wiki links
    const camelCasePattern = /\b([A-Z][a-z]+[A-Z][a-z]+\w*)\b/g;
    let camelMatch;
    while ((camelMatch = camelCasePattern.exec(text)) !== null) {
      links.push({
        type: 'camelcase',
        text: camelMatch[1],
        target: camelMatch[1],
        position: camelMatch.index
      });
    }
    
    // Match [[link]] style wiki links
    const bracketPattern = /\[\[([\w\s-]+)(?:\|([\w\s-]+))?\]\]/g;
    let bracketMatch;
    while ((bracketMatch = bracketPattern.exec(text)) !== null) {
      links.push({
        type: 'bracket',
        text: bracketMatch[2] || bracketMatch[1], // Use the label if provided, otherwise the link
        target: bracketMatch[1].replace(/\s+/g, '_'),
        position: bracketMatch.index
      });
    }
    
    // Sort by position in text
    links.sort((a, b) => a.position - b.position);
    
    return links;
  },
  
  /**
   * Generate a graph representation of links
   * @param {Array} pages - Array of page objects with content
   * @returns {Object} - Graph representation with nodes and edges
   */
  generateLinkGraph(pages) {
    if (!pages || !Array.isArray(pages)) return { nodes: [], edges: [] };
    
    const nodes = [];
    const edges = [];
    const nodeMap = {};
    
    // Create nodes first
    pages.forEach((page, index) => {
      const node = {
        id: page.id || `page-${index}`,
        label: page.title || `Page ${index}`,
        type: 'page'
      };
      
      nodes.push(node);
      nodeMap[node.id] = node;
    });
    
    // Extract links and create edges
    pages.forEach((page) => {
      if (!page.content) return;
      
      const links = this.extractLinks(page.content);
      
      links.forEach((link) => {
        // Check if target exists as a node
        if (nodeMap[link.target]) {
          edges.push({
            source: page.id,
            target: link.target,
            type: 'link'
          });
        } else {
          // Create missing node
          const missingNode = {
            id: link.target,
            label: link.text,
            type: 'missing'
          };
          
          nodes.push(missingNode);
          nodeMap[link.target] = missingNode;
          
          edges.push({
            source: page.id,
            target: link.target,
            type: 'missing_link'
          });
        }
      });
    });
    
    return { nodes, edges };
  }
};

// Initialize wiki links processing
WikiLinks.processDocument();

export default WikiLinks;