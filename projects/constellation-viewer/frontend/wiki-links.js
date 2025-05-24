/**
 * Simple wiki link implementation for Constellation Viewer
 */

// Check if document is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  // Document already loaded, initialize immediately
  console.log('Wiki links module loaded (immediate)');
  initWikiLinks();
} else {
  // Wait for page to load
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Wiki links module loaded (on DOMContentLoaded)');
    initWikiLinks();
  });
}

// Initialize wiki links functionality
function initWikiLinks() {
  // Process existing content immediately
  processExistingContent();
  
  // Then try again after a delay for any late-loading content
  setTimeout(processExistingContent, 1000);
  
  // Monitor for content changes
  setupContentObserver();
}

/**
 * Process any content already on the page
 */
function processExistingContent() {
  console.log('Processing existing content');
  const contentDisplay = document.getElementById('content-display');
  if (contentDisplay) {
    transformContent(contentDisplay);
  }
}

/**
 * Set up observer to watch for content changes
 */
function setupContentObserver() {
  console.log('Setting up content observer');
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.target.id === 'content-display') {
        console.log('Content display changed, transforming content');
        transformContent(mutation.target);
      }
    });
  });
  
  // Start observing
  const contentDisplay = document.getElementById('content-display');
  if (contentDisplay) {
    observer.observe(contentDisplay, { childList: true });
  }
}

/**
 * Transform content to add wiki links
 */
function transformContent(element) {
  if (!element || !element.innerHTML) return;
  
  console.log('Transforming content');
  const content = element.innerHTML;
  
  // Skip processing if already processed or no wiki links
  if (content.includes('class="wiki-link"') || !content.includes('[[')) {
    return;
  }
  
  // Process wiki links
  const transformedContent = processWikiLinks(content);
  
  // Update content (if changed)
  if (transformedContent !== content) {
    element.innerHTML = transformedContent;
  }
}

/**
 * Process wiki links in content
 */
function processWikiLinks(content) {
  // Get current directory
  const directory = window.currentDirectory || '';
  console.log('Processing wiki links in directory:', directory);
  
  // Add styles if not present
  if (!document.getElementById('wiki-link-styles')) {
    addWikiLinkStyles();
  }
  
  // Process links in order of specificity (most specific first)
  
  // 1. Cross-project links with display text [[ProjectName:PageName|DisplayText]]
  content = content.replace(/\[\[([^\]|:]+):([^\]|:]+)\|([^\]]+)\]\]/g, function(match, project, page, displayText) {
    console.log(`Found cross-project link with display text: ${project}:${page}|${displayText}`);
    const projectDir = getDirectoryFromProject(project.trim());
    const pageName = page.trim();
    const display = displayText.trim();
    return `<a href="#" class="wiki-link cross-project" onclick="fetchNotebookContent('${projectDir}', '${pageName}'); return false;" title="${project}:${pageName}">${display}</a>`;
  });
  
  // 2. Cross-project links [[ProjectName:PageName]]
  content = content.replace(/\[\[([^\]|:]+):([^\]|:]+)\]\]/g, function(match, project, page) {
    console.log(`Found cross-project link: ${project}:${page}`);
    const projectDir = getDirectoryFromProject(project.trim());
    const pageName = page.trim();
    return `<a href="#" class="wiki-link cross-project" onclick="fetchNotebookContent('${projectDir}', '${pageName}'); return false;" title="${project}:${pageName}">${pageName}</a>`;
  });
  
  // 3. Links with display text [[PageName|DisplayText]]
  content = content.replace(/\[\[([^\]|:]+)\|([^\]]+)\]\]/g, function(match, page, displayText) {
    console.log(`Found link with display text: ${page}|${displayText}`);
    const pageName = page.trim();
    const display = displayText.trim();
    return `<a href="#" class="wiki-link" onclick="fetchNotebookContent('${directory}', '${pageName}'); return false;" title="${pageName}">${display}</a>`;
  });
  
  // 4. Simple links [[PageName]]
  content = content.replace(/\[\[([^\]|:]+)\]\]/g, function(match, page) {
    console.log(`Found simple link: ${page}`);
    const pageName = page.trim();
    return `<a href="#" class="wiki-link" onclick="fetchNotebookContent('${directory}', '${pageName}'); return false;" title="${pageName}">${pageName}</a>`;
  });
  
  return content;
}

/**
 * Map project names to directory names
 */
function getDirectoryFromProject(projectName) {
  const projectMap = {
    'Noxii': 'noxii-wiki-pages',
    'OnCommand': 'on-command-wiki-pages', 
    'Dodec': 'dodec-wiki-pages',
    'Autumn': 'autumn-wiki-pages',
    'CosmicKnights': 'All of it Anything Everything At Once'
  };
  
  return projectMap[projectName] || projectName;
}

/**
 * Add styles for wiki links
 */
function addWikiLinkStyles() {
  const style = document.createElement('style');
  style.id = 'wiki-link-styles';
  style.textContent = `
    .wiki-link {
      color: #14418B;
      text-decoration: none;
      border-bottom: 1px dashed #14418B;
      padding: 0 2px;
      position: relative;
    }
    
    .wiki-link:hover {
      background-color: rgba(20, 65, 139, 0.1);
      border-bottom: 1px solid #14418B;
    }
    
    .wiki-link.cross-project {
      color: #6b3e82;
      border-bottom: 1px dashed #6b3e82;
    }
    
    .wiki-link.cross-project:hover {
      background-color: rgba(107, 62, 130, 0.1);
      border-bottom: 1px solid #6b3e82;
    }
    
    .wiki-link::after {
      content: attr(title);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      padding: 3px 8px;
      background-color: #333;
      color: #fff;
      border-radius: 3px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s, visibility 0.2s;
      pointer-events: none;
      font-size: 12px;
    }
    
    .wiki-link:hover::after {
      opacity: 0.9;
      visibility: visible;
    }
  `;
  document.head.appendChild(style);
}