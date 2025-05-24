# Enhanced Wiki Expansion Plan

This document outlines a plan to enhance the `/enhanced` endpoint (http://localhost:3003/enhanced) by incorporating features from the basic.html interface.

## Current Features Comparison

### Enhanced Wiki (/enhanced)
- Clean, modern interface design
- Navigation history management
- Breadcrumb navigation
- Page caching for better performance
- Dark/light theme support
- Markdown content support
- Wiki page editing
- Wiki categories system
- Metadata display (creation/modification dates)

### Basic.html Interface
- Enhanced responsive design
- Multiple view modes (compact, normal, reading)
- Improved notebook directory browsing
- Better content formatting
- More intuitive UI enhancements
- Persistent user preferences

## Expansion Plan

### 1. UI and Navigation Enhancements

#### Implement Multiple View Modes
- Add `compact-mode`, `normal-mode`, and `reading-mode` toggles
- Create mode-specific CSS styling for each view
- Save user preference in localStorage

```javascript
// Add to enhanced-wiki.js
function setViewMode(mode) {
    // Remove all mode classes
    document.body.classList.remove('compact-mode', 'normal-mode', 'reading-mode');
    
    // Add the selected mode class
    document.body.classList.add(`${mode}-mode`);
    
    // Update buttons styling
    // ...
    
    // Save preference
    localStorage.setItem('viewMode', mode);
}
```

#### Enhance Notebook Directory Browser
- Improve the visual design of the directory selector
- Add file icons and better styling to file listings
- Implement a more intuitive file selection interface

```css
/* Add to enhanced-wiki.css */
.notebook-file {
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--divider-color);
    cursor: pointer;
    transition: background-color var(--transition-fast);
    font-size: 0.9rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
}

.file-icon {
    font-size: 0.8rem;
    color: var(--tertiary);
    opacity: 0.7;
}
```

### 2. Content and Editing Improvements

#### Enhance the Markdown Editor
- Improve editor toolbar with more formatting options
- Add side-by-side preview mode
- Implement auto-save functionality

```javascript
// Update editor initialization in enhanced-wiki.js
function setupEditor(element, initialContent = '') {
    return new EasyMDE({
        element: element,
        initialValue: initialContent,
        spellChecker: true,
        autosave: {
            enabled: true,
            uniqueId: 'wiki-editor-autosave',
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
}
```

#### Improve Content Formatting
- Add special styling for code blocks, tables, and other markdown elements
- Enhance typography for better readability
- Implement syntax highlighting for code blocks

```css
/* Add to enhanced-wiki.css */
.wiki-content pre, 
.wiki-content code {
    font-family: 'Courier New', Courier, monospace;
    background-color: var(--surface);
    border-radius: var(--border-radius);
}

.wiki-content pre {
    padding: var(--spacing-md);
    margin-bottom: 1em;
    overflow-x: auto;
}

.wiki-content code {
    padding: 2px 4px;
}

.wiki-content blockquote {
    border-left: 4px solid var(--tertiary);
    padding-left: var(--spacing-md);
    color: var(--text-secondary);
    margin: var(--spacing-md) 0;
}
```

### 3. State Management and User Experience

#### Implement Client-side Notifications
- Add a notification system for user feedback
- Show success/error messages after actions
- Implement smooth animations for notifications

```javascript
// Add to enhanced-wiki.js
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
```

#### Improve State Management
- Implement a more comprehensive state management system
- Store user preferences and current state
- Ensure consistent state across page navigation

```javascript
// Replace with improved state management in enhanced-wiki.js
const appState = {
    theme: localStorage.getItem('theme') || 'light',
    viewMode: localStorage.getItem('viewMode') || 'normal',
    currentDirectory: '',
    currentFile: '',
    currentPage: '',
    isEditMode: false,
    
    // Update state
    update(changes) {
        Object.assign(this, changes);
        this.savePreferences();
    },
    
    // Save user preferences
    savePreferences() {
        localStorage.setItem('theme', this.theme);
        localStorage.setItem('viewMode', this.viewMode);
    }
};
```

### 4. Search and Organization

#### Implement Enhanced Search
- Add client-side search functionality
- Show search results with highlighted matches
- Implement search result ranking

```javascript
// Add to enhanced-wiki.js
function searchContent(query) {
    const results = [];
    
    // Search in cache
    Object.values(pageCache.data).forEach(item => {
        const page = item.data;
        if (page.content.toLowerCase().includes(query.toLowerCase()) ||
            page.title.toLowerCase().includes(query.toLowerCase())) {
            
            results.push({
                title: page.title,
                snippet: getSearchSnippet(page.content, query),
                score: calculateRelevanceScore(page, query)
            });
        }
    });
    
    // Sort by relevance
    results.sort((a, b) => b.score - a.score);
    
    return results;
}

function getSearchSnippet(content, query) {
    // Extract context around the match...
}
```

#### Add Tagging System
- Implement content tagging
- Add tag filtering in the sidebar
- Display tags on content pages

```javascript
// Add to enhanced-wiki.js
function displayTags(tags) {
    const tagsContainer = document.getElementById('page-tags');
    
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => filterByTag(tag));
        
        tagsContainer.appendChild(tagElement);
    });
}
```

### 5. Integration Improvements

#### Add Visual Feedback for Wiki/Notebook Integration
- Add progress indicators for operations
- Improve UI feedback when adding notebooks to wiki
- Implement success/error notifications

#### Enhance Navigation Between Wiki and Notebooks
- Create seamless navigation between wiki pages and notebook content
- Add related content suggestions
- Improve breadcrumb trail for nested content

## Implementation Steps

1. **Phase 1: UI Enhancements**
   - Implement view modes
   - Enhance notebook browser
   - Improve content formatting

2. **Phase 2: Functionality Improvements**
   - Enhance markdown editor
   - Implement client-side notifications
   - Improve state management

3. **Phase 3: Advanced Features**
   - Add enhanced search
   - Implement tagging system
   - Improve navigation

4. **Phase 4: Testing and Refinement**
   - Test all features
   - Gather feedback
   - Make necessary adjustments

## File Changes Required

1. **enhanced-wiki.js**:
   - Add view mode functionality
   - Implement improved state management
   - Enhance markdown editor
   - Add notification system
   - Implement search functionality

2. **enhanced-wiki.css**:
   - Add styles for view modes
   - Improve notebook file styling
   - Enhance content formatting
   - Add notification styles

3. **enhanced-wiki.html**:
   - Add view mode toggle buttons
   - Add notification container
   - Add search interface
   - Add tag display area

This expansion plan will significantly enhance the `/enhanced` endpoint while preserving its core functionality.