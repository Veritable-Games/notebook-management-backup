/**
 * Page State Reporter Tool
 * Creates a JSON representation of the current page structure and state
 */

(function() {
  // Create reporter UI
  function createReporterUI() {
    // Create container
    const container = document.createElement('div');
    container.id = 'page-state-reporter';
    container.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = 'Show Page Structure';
    toggleBtn.style.cssText = `
      padding: 8px 16px;
      background-color: #9c27b0;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;

    container.appendChild(toggleBtn);
    document.body.appendChild(container);

    // Toggle functionality
    toggleBtn.addEventListener('click', function() {
      if (document.getElementById('structure-output')) {
        removeStructureDisplay();
        toggleBtn.textContent = 'Show Page Structure';
      } else {
        showStructureDisplay();
        toggleBtn.textContent = 'Hide Page Structure';
      }
    });
  }

  // Show structure display
  function showStructureDisplay() {
    // Create display panel
    const panel = document.createElement('div');
    panel.id = 'structure-output';
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 50px;
      background-color: rgba(0, 0, 0, 0.9);
      color: #fff;
      padding: 20px;
      border-radius: 8px;
      z-index: 9998;
      overflow: auto;
      font-family: monospace;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;

    // Add controls
    const controls = document.createElement('div');
    controls.style.cssText = `
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    `;

    const captureBtn = document.createElement('button');
    captureBtn.textContent = 'Capture Current State';
    captureBtn.style.cssText = `
      padding: 8px 16px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    captureBtn.addEventListener('click', function() {
      generateReport();
    });

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
      padding: 8px 16px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: auto;
    `;
    closeBtn.addEventListener('click', function() {
      removeStructureDisplay();
      document.querySelector('#page-state-reporter button').textContent = 'Show Page Structure';
    });

    controls.appendChild(captureBtn);
    controls.appendChild(closeBtn);
    panel.appendChild(controls);

    // Add content container
    const content = document.createElement('div');
    content.id = 'structure-content';
    content.style.cssText = `
      flex: 1;
      overflow: auto;
      background-color: rgba(255, 255, 255, 0.1);
      padding: 15px;
      border-radius: 4px;
      white-space: pre;
      font-size: 14px;
      line-height: 1.5;
    `;
    panel.appendChild(content);

    document.body.appendChild(panel);
    
    // Generate initial report
    generateReport();
  }

  // Remove structure display
  function removeStructureDisplay() {
    const panel = document.getElementById('structure-output');
    if (panel) {
      panel.remove();
    }
  }

  // Get element attributes as object
  function getElementAttributes(el) {
    const attributes = {};
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      attributes[attr.name] = attr.value;
    }
    return attributes;
  }

  // Get computed styles for element
  function getComputedStyleSummary(el) {
    const styles = window.getComputedStyle(el);
    return {
      display: styles.display,
      visibility: styles.visibility,
      position: styles.position,
      width: styles.width,
      height: styles.height,
      color: styles.color,
      backgroundColor: styles.backgroundColor,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight
    };
  }

  // Get element text content
  function getTextContent(el) {
    // Get only direct text nodes
    let text = '';
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent.trim();
      }
    }
    
    // If no direct text content, try getting innerText
    if (!text && el.innerText) {
      // Limit to first 100 chars
      text = el.innerText.slice(0, 100);
      if (el.innerText.length > 100) {
        text += '...';
      }
    }
    
    return text.trim();
  }

  // Generate element tree recursively
  function generateElementTree(el, maxDepth = 3, currentDepth = 0) {
    if (currentDepth > maxDepth) {
      return {
        truncated: true,
        childCount: el.children.length
      };
    }

    // Skip hidden elements
    const styles = window.getComputedStyle(el);
    if (styles.display === 'none' || styles.visibility === 'hidden') {
      return null;
    }

    // Get element info
    const tagName = el.tagName.toLowerCase();
    const id = el.id ? el.id : null;
    const classNames = el.className && typeof el.className === 'string' ? el.className.split(' ').filter(c => c.trim()) : [];
    const textContent = getTextContent(el);
    const attributes = getElementAttributes(el);
    
    // Get simplified state
    let state = {};
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
      state.value = el.value;
      state.disabled = el.disabled;
      if (el.type === 'checkbox' || el.type === 'radio') {
        state.checked = el.checked;
      }
    }

    // Build result
    const result = {
      tagName,
      id,
      classNames,
      children: []
    };

    // Add text content if present
    if (textContent) {
      result.textContent = textContent;
    }

    // Add selected attributes
    const importantAttributes = ['role', 'aria-label', 'aria-hidden', 'aria-expanded', 'type', 'href', 'src'];
    importantAttributes.forEach(attr => {
      if (attributes[attr]) {
        if (!result.attributes) result.attributes = {};
        result.attributes[attr] = attributes[attr];
      }
    });

    // Add state if there's any
    if (Object.keys(state).length > 0) {
      result.state = state;
    }

    // Get rectangle for visualization
    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      result.rect = {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    }

    // Process children
    for (const child of el.children) {
      const childTree = generateElementTree(child, maxDepth, currentDepth + 1);
      if (childTree) {
        result.children.push(childTree);
      }
    }

    return result;
  }

  // Generate full page report
  function generateReport() {
    const output = document.getElementById('structure-content');
    if (!output) return;

    // Get viewport info
    const viewportInfo = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      devicePixelRatio: window.devicePixelRatio
    };

    // Get document info
    const documentInfo = {
      title: document.title,
      url: window.location.href,
      readyState: document.readyState,
      elementCount: document.getElementsByTagName('*').length
    };

    // Get currently focused element
    let focusedElement = null;
    if (document.activeElement && document.activeElement !== document.body) {
      const el = document.activeElement;
      focusedElement = {
        tagName: el.tagName.toLowerCase(),
        id: el.id || null,
        className: el.className || null
      };
    }

    // Generate page tree
    const pageStructure = generateElementTree(document.body, 4);

    // Count visible elements by type
    const visibleElements = {};
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const styles = window.getComputedStyle(el);
      if (styles.display !== 'none' && styles.visibility !== 'hidden') {
        visibleElements[tagName] = (visibleElements[tagName] || 0) + 1;
      }
    });

    // Get important sections
    const mainSections = {
      header: document.querySelector('header') ? true : false,
      footer: document.querySelector('footer') ? true : false,
      main: document.querySelector('main') ? true : false,
      nav: document.querySelector('nav') ? true : false,
      aside: document.querySelector('aside') ? true : false
    };

    // Collect all notifications currently visible
    const notifications = Array.from(document.querySelectorAll('.notification')).map(notif => {
      return {
        text: notif.textContent.trim(),
        type: notif.className.replace('notification', '').trim(),
        visible: true
      };
    });

    // Get sidebar state
    const sidebar = document.querySelector('.sidebar');
    const sidebarState = sidebar ? {
      visible: window.getComputedStyle(sidebar).display !== 'none',
      collapsed: sidebar.classList.contains('collapsed'),
      width: window.getComputedStyle(sidebar).width
    } : null;

    // Get current view tab
    const activeTab = document.querySelector('.tab.active');
    const currentView = activeTab ? activeTab.textContent.trim() : null;

    // Get currently displayed content
    const contentDisplay = document.getElementById('content-display');
    const currentContent = contentDisplay ? {
      title: document.getElementById('content-title')?.textContent.trim() || null,
      hasContent: contentDisplay.children.length > 0 && !contentDisplay.textContent.includes('Select a file')
    } : null;

    // Create report object
    const report = {
      timestamp: new Date().toISOString(),
      viewport: viewportInfo,
      document: documentInfo,
      focus: focusedElement,
      visibleElements,
      mainSections,
      interface: {
        sidebar: sidebarState,
        currentView,
        currentContent,
        notifications
      }
    };

    // Add visual map of main elements
    const visualMap = generateVisualMap();

    // Display report
    output.innerHTML = '<h2>Page Structure Report</h2>' +
      '<h3>Basic Information</h3>' +
      '<pre>' + JSON.stringify(report, null, 2) + '</pre>' +
      '<h3>Visual Structure</h3>' +
      visualMap +
      '<h3>Interactive Elements</h3>' +
      generateInteractiveElementsList();
  }

  // Generate visual map representation
  function generateVisualMap() {
    const width = Math.min(window.innerWidth, 700);
    const height = Math.min(window.innerHeight, 500);
    const scale = Math.min(width / window.innerWidth, height / window.innerHeight);
    
    let html = `<div style="position:relative; width:${width}px; height:${height}px; background:#222; overflow:hidden; margin:10px 0; border:1px solid #555;">`;
    
    // Add main regions
    const regions = [
      { selector: 'header', color: '#f44336', label: 'Header' },
      { selector: 'aside, .sidebar', color: '#2196f3', label: 'Sidebar' },
      { selector: 'main', color: '#4caf50', label: 'Main Content' },
      { selector: 'nav', color: '#ff9800', label: 'Navigation' },
      { selector: 'footer', color: '#9c27b0', label: 'Footer' }
    ];
    
    regions.forEach(region => {
      const element = document.querySelector(region.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        const boxTop = rect.top * scale;
        const boxLeft = rect.left * scale;
        const boxWidth = rect.width * scale;
        const boxHeight = rect.height * scale;
        
        html += `<div style="position:absolute; top:${boxTop}px; left:${boxLeft}px; width:${boxWidth}px; height:${boxHeight}px; background:${region.color}50; border:2px solid ${region.color}; z-index:1;">
          <span style="position:absolute; top:2px; left:2px; background:${region.color}; color:white; font-size:10px; padding:2px 4px;">${region.label}</span>
        </div>`;
      }
    });
    
    // Add interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth) {
        const boxTop = rect.top * scale;
        const boxLeft = rect.left * scale;
        const boxWidth = rect.width * scale;
        const boxHeight = rect.height * scale;
        
        html += `<div style="position:absolute; top:${boxTop}px; left:${boxLeft}px; width:${boxWidth}px; height:${boxHeight}px; background:#ffeb3b30; border:1px solid #ffeb3b; z-index:2;"></div>`;
      }
    });
    
    html += '</div>';
    return html;
  }
  
  // Generate list of interactive elements
  function generateInteractiveElementsList() {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    
    let html = '<div style="max-height:300px; overflow:auto;">';
    html += '<table style="width:100%; border-collapse:collapse;">';
    html += '<tr><th style="text-align:left; padding:5px; border-bottom:1px solid #555;">Element</th><th style="text-align:left; padding:5px; border-bottom:1px solid #555;">Text/Value</th><th style="text-align:left; padding:5px; border-bottom:1px solid #555;">Attributes</th></tr>';
    
    Array.from(interactiveElements).slice(0, 50).forEach(el => {
      // Skip hidden elements
      const styles = window.getComputedStyle(el);
      if (styles.display === 'none' || styles.visibility === 'hidden') {
        return;
      }
      
      const tagName = el.tagName.toLowerCase();
      let text = el.innerText || el.value || '';
      if (text.length > 30) {
        text = text.substring(0, 30) + '...';
      }
      
      const attributes = [];
      if (el.id) attributes.push(`id="${el.id}"`);
      if (el.className) attributes.push(`class="${el.className}"`);
      if (el.type) attributes.push(`type="${el.type}"`);
      if (el.getAttribute('role')) attributes.push(`role="${el.getAttribute('role')}"`);
      if (el.getAttribute('aria-label')) attributes.push(`aria-label="${el.getAttribute('aria-label')}"`);
      
      html += `<tr>
        <td style="padding:5px; border-bottom:1px solid #333;">&lt;${tagName}&gt;</td>
        <td style="padding:5px; border-bottom:1px solid #333;">${text}</td>
        <td style="padding:5px; border-bottom:1px solid #333;">${attributes.join(' ')}</td>
      </tr>`;
    });
    
    if (interactiveElements.length > 50) {
      html += `<tr><td colspan="3" style="padding:5px; text-align:center;">${interactiveElements.length - 50} more elements...</td></tr>`;
    }
    
    html += '</table></div>';
    return html;
  }

  // Initialize
  function initialize() {
    // Only initialize on HTML pages
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createReporterUI);
    } else {
      createReporterUI();
    }
  }

  // Start the reporter
  initialize();
})();