# Wiki Hyperlink System Plan

## Current Status
The Constellation Viewer currently displays content as standalone pages with no internal hyperlinks between them. This limits navigation and doesn't reflect the interconnected nature of your project documentation.

## Implementation Plan for Wiki-Style Hyperlinks

### 1. Link Syntax in Content Files

First, we need to define how links should be formatted in your ZIM wiki files:

```
Standard ZIM Wiki syntax: [[PageName]]
Extended syntax for cross-project links: [[ProjectName:PageName]]
```

### 2. Link Detection & Processing

Modify the content rendering function to detect and process these links:

```javascript
function processWikiLinks(content, currentDirectory) {
    // Pattern for standard wiki links [[PageName]]
    const linkPattern = /\[\[(.*?)\]\]/g;
    
    // Replace links with proper HTML
    return content.replace(linkPattern, (match, linkText) => {
        // Check if it's a cross-project link (contains ":")
        if (linkText.includes(':')) {
            // Format: [[ProjectName:PageName]]
            const [projectName, pageName] = linkText.split(':');
            
            // Map project names to directory names
            const projectMap = {
                'Noxii': 'noxii-wiki-pages',
                'OnCommand': 'on-command-wiki-pages', 
                'Dodec': 'dodec-wiki-pages',
                'Autumn': 'autumn-wiki-pages',
                'CosmicKnights': 'All of it Anything Everything At Once'
            };
            
            const targetDirectory = projectMap[projectName.trim()] || projectName.trim();
            
            return `<a href="#" class="wiki-link cross-project-link" 
                      data-directory="${targetDirectory}" 
                      data-page="${pageName.trim()}">${pageName.trim()}</a>`;
        } else {
            // Simple link within the same directory
            return `<a href="#" class="wiki-link" 
                      data-directory="${currentDirectory}" 
                      data-page="${linkText.trim()}">${linkText.trim()}</a>`;
        }
    });
}
```

### 3. Link Click Handler

Add an event handler for the wiki links:

```javascript
function setupWikiLinkHandlers() {
    // Delegate event handler for all wiki links
    document.addEventListener('click', (e) => {
        // Check if the clicked element is a wiki link
        if (e.target.classList.contains('wiki-link')) {
            e.preventDefault();
            
            const directory = e.target.dataset.directory;
            const page = e.target.dataset.page;
            
            // Handle special case for Cosmic Knights which is stored as a specific file
            if (directory === 'All of it Anything Everything At Once' && page === 'Cosmic_Knights_GDD') {
                fetchNotebookContent(directory, page);
                return;
            }
            
            // Normal case - load the linked page
            fetchNotebookContent(directory, page);
            
            // Update the breadcrumb and current state
            currentDirectory = directory;
            currentFile = page;
            updateBreadcrumb();
            
            // Update directory selection in UI
            if (directorySelect) {
                directorySelect.value = directory;
            }
        }
    });
}
```

### 4. Content Rendering Update

Modify the content rendering function to process links:

```javascript
function renderContent(content, directory, filename) {
    // Process wiki links first
    content = processWikiLinks(content, directory);
    
    // Convert markdown using marked.js
    const htmlContent = marked(content);
    
    // Add classes for styling
    const wrappedContent = `<div class="wiki-content">${htmlContent}</div>`;
    
    return wrappedContent;
}
```

### 5. Automatic Link Generation

Create a utility to scan content for potential links:

```javascript
function scanForPotentialLinks(content, allPages) {
    // Get all words/phrases that could be page names
    const words = content.match(/\b[A-Z][a-z]+(?:[A-Z][a-z]+)*\b/g) || [];
    
    // Filter to only those that match existing pages
    return words.filter(word => allPages.includes(word));
}

// Function to suggest links while editing
function suggestLinks() {
    // Get all page names
    fetch(`${API_BASE_URL}/notebooks/all-pages`)
        .then(response => response.json())
        .then(data => {
            const allPages = data.pages || [];
            const editorContent = editor.getValue();
            
            // Find potential links
            const potentialLinks = scanForPotentialLinks(editorContent, allPages);
            
            // Show suggestions in UI
            if (potentialLinks.length > 0) {
                showLinkSuggestions(potentialLinks);
            }
        });
}
```

### 6. Backlinks System

Add tracking of pages that link to the current page:

```javascript
function showBacklinks(directory, page) {
    // Get all pages that link to this one
    fetch(`${API_BASE_URL}/notebooks/backlinks?directory=${directory}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            const backlinks = data.backlinks || [];
            
            // Create backlinks section if there are any
            if (backlinks.length > 0) {
                const backlinksSection = document.createElement('div');
                backlinksSection.className = 'backlinks-section';
                backlinksSection.innerHTML = `
                    <h3>Pages that link here:</h3>
                    <ul class="backlinks-list">
                        ${backlinks.map(link => `
                            <li>
                                <a href="#" class="wiki-link" 
                                   data-directory="${link.directory}" 
                                   data-page="${link.page}">
                                   ${link.title || link.page}
                                </a>
                                ${link.context ? `<span class="link-context">${link.context}</span>` : ''}
                            </li>
                        `).join('')}
                    </ul>
                `;
                
                // Add to content display
                document.getElementById('pageContent').appendChild(backlinksSection);
            }
        });
}
```

### 7. API Enhancements Needed

Add these endpoints to the backend API:

1. `/notebooks/all-pages` - Returns a list of all page names across all directories
2. `/notebooks/backlinks` - Returns pages that link to a specified page
3. `/notebooks/search-content` - Searches content for specific text (useful for backlink tracking)

### 8. New CSS for Wiki Links

```css
/* Wiki link styling */
.wiki-link {
    color: #14418B;
    text-decoration: none;
    border-bottom: 1px dashed #14418B;
    cursor: pointer;
}

.wiki-link:hover {
    color: #0d2a5e;
    border-bottom: 1px solid #0d2a5e;
}

.cross-project-link {
    color: #6b3e82;
    border-bottom: 1px dashed #6b3e82;
}

.cross-project-link:hover {
    color: #4a2a5a;
    border-bottom: 1px solid #4a2a5a;
}

/* For pages that don't exist yet */
.wiki-link.missing {
    color: #d15050;
    border-bottom: 1px dashed #d15050;
}

.wiki-link.missing:hover {
    color: #b03535;
    border-bottom: 1px solid #b03535;
}

/* Backlinks section */
.backlinks-section {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.backlinks-section h3 {
    font-size: 16px;
    color: #666;
    font-weight: normal;
}

.backlinks-list {
    list-style: none;
    padding: 0;
}

.backlinks-list li {
    margin: 8px 0;
}

.link-context {
    display: block;
    margin-left: 15px;
    font-size: 0.9em;
    color: #777;
    border-left: 2px solid #eee;
    padding-left: 10px;
    margin-top: 3px;
}

/* Link suggestion dropdown */
.link-suggestions {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}

.link-suggestion {
    padding: 8px 12px;
    cursor: pointer;
}

.link-suggestion:hover {
    background-color: #f5f5f5;
}
```

## Expanded Content Organization

To prepare for growth, we need a standard for wiki organization:

### 1. Project Template Structure

Each project should have these key pages:

- **Home**: Overview/entry point for the project
- **GDD**: Full game design document
- **Characters**: Information about characters
- **Mechanics**: Details about game mechanics
- **World**: World-building and setting details
- **References**: External references and inspiration

### 2. Standardized Link Formats

To maintain consistency:

- Use CamelCase for page names (e.g., GameDesign, CharacterList)
- Use Project:PageName format for cross-project references
- Keep a template of common link patterns

### 3. Content Migration Plan

To update existing content:

1. Convert plain text references to wiki links
2. Create Home pages for each project
3. Standardize cross-project references
4. Add backlink sections to highly-referenced pages

### 4. File Naming Scheme

To improve organization:

1. Use consistent prefixes for related content (e.g., Character_, Location_, Item_)
2. Use suffixes for document types (_GDD, _Reference, _Concept)
3. Replace spaces with underscores to avoid URL encoding issues

## Implementation Phases

### Phase 1: Core Link System
- Implement basic link detection and processing
- Add click handlers for navigation

### Phase 2: Link Management
- Add link suggestion system while editing
- Implement backlinks tracking
- Add "what links here" functionality

### Phase 3: Content Standardization
- Create templates for each document type
- Add quick-link buttons for common references
- Implement content migration

This plan preserves your existing content while adding wiki hyperlink functionality, allowing your projects to grow as interconnected knowledge bases.