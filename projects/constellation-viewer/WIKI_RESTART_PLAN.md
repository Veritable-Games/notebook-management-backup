# Wiki Component Restart Plan

This document outlines a detailed plan for restarting the constellation-viewer wiki component with a cleaner, more maintainable implementation.

## 1. Cleanup Phase

### 1.1 Remove Deprecated Components
- Delete or archive `enhanced-wiki.html`, `enhanced-wiki.js`, and `enhanced-wiki.css`
- Remove code in server.js that redirects from enhanced to basic
- Clean up any other references to the enhanced wiki

### 1.2 Consolidate Interface Files
- Choose `basic.html` as the primary interface
- Merge any useful features from `basic-styled.html` into `basic.html`
- Remove or archive `basic-styled.html` after migration

### 1.3 Fix Port Configuration
- Update server.js to use a consistent port (8080)
- Update start-wiki.sh to use the same port
- Document the port usage to avoid future conflicts

## 2. Implementation Phase

### 2.1 Server Improvements
- Update server.js with consistent error handling
- Implement proper API routes for wiki functionality
- Add better logging for troubleshooting
- Ensure CORS is properly configured

### 2.2 Core Wiki Functionality
- Implement a robust markdown parser for wiki content
- Create a proper wiki page storage system (using JSON files)
- Implement version history for wiki pages
- Add search functionality across all wiki content

### 2.3 Wiki Links Enhancement
- Improve wiki-links.js to handle all link formats consistently
- Add auto-completion for wiki links in the editor
- Implement backlinks to show which pages link to the current page
- Add support for external links in wiki content

### 2.4 UI Improvements
- Create a clean, responsive interface based on basic.html
- Implement proper navigation with breadcrumbs
- Add dark/light mode toggle with persistent settings
- Improve the editor interface with syntax highlighting

### 2.5 Notebook Integration
- Ensure proper integration with the notebooks directory
- Add ability to convert notebook files to wiki pages
- Implement proper handling of notebook content in wiki pages
- Add bidirectional links between notebooks and wiki pages

## 3. Testing Phase

### 3.1 Functionality Testing
- Test all wiki features (page creation, editing, linking)
- Test notebook integration
- Test search functionality
- Test markdown rendering

### 3.2 UI Testing
- Test responsive design on different screen sizes
- Test dark/light mode toggle
- Test navigation between pages
- Test editor functionality

### 3.3 Performance Testing
- Test loading times for large wiki pages
- Test search performance with many pages
- Test concurrent access to the wiki

## 4. Documentation Phase

### 4.1 User Documentation
- Create a user guide for the wiki
- Document how to create and edit wiki pages
- Document how to use wiki links
- Document how to integrate with notebooks

### 4.2 Developer Documentation
- Document the API endpoints
- Document the code structure
- Document how to extend the wiki functionality
- Create JSDoc comments for all functions

## 5. Deployment Phase

### 5.1 Create Deployment Scripts
- Update start-wiki.sh for the new implementation
- Create a stop-wiki.sh script if needed
- Add proper error handling to scripts

### 5.2 Test Deployment
- Test deployment on a clean system
- Test starting and stopping the wiki
- Ensure all dependencies are properly installed

## Timeline

- Cleanup Phase: 1 day
- Implementation Phase: 3-5 days
- Testing Phase: 1-2 days
- Documentation Phase: 1 day
- Deployment Phase: 1 day

Total: 7-10 days

## Success Criteria

The wiki restart will be considered successful when:

1. Users can create, edit, and view wiki pages without errors
2. Wiki links function correctly in all supported formats
3. Notebook content can be integrated seamlessly
4. The UI is responsive and user-friendly
5. Documentation is complete and accurate
6. The system can be deployed with a single command