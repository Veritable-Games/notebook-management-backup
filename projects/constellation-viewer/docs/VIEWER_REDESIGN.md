# Constellation Viewer Redesign

## Current Structure
The Constellation Viewer (localhost:8090/basic.html) currently displays:
- A dropdown directory selector
- A file list for the selected directory
- Content view/edit area
- Basic action buttons

## Proposed Enhancements

### 1. Categorized Project View

Replace the simple directory dropdown with a categorized structure:

```javascript
function enhanceDirectorySelector() {
    const directorySelect = document.getElementById('notebook-directory');
    const sidebarContent = document.querySelector('.sidebar-content');
    
    if (directorySelect && sidebarContent) {
        // Remove the current dropdown
        directorySelect.style.display = 'none';
        
        // Create project categories container
        const categoryContainer = document.createElement('div');
        categoryContainer.className = 'project-categories';
        
        // Add category sections
        const categories = [
            {
                name: 'Game Projects',
                icon: 'gamepad',
                projects: [
                    { name: 'Noxii', directory: 'noxii-wiki-pages' },
                    { name: 'On Command', directory: 'on-command-wiki-pages' },
                ]
            },
            {
                name: 'Narrative Projects',
                icon: 'book',
                projects: [
                    { name: 'Dodec: Beyond Our Home', directory: 'dodec-wiki-pages' },
                    { name: 'Autumn', directory: 'autumn-wiki-pages' },
                ]
            },
            {
                name: 'Toolkit Projects',
                icon: 'tools',
                projects: [
                    { name: 'LLM Integration', directory: 'LLM-confusion' },
                    { name: 'References', directory: 'reference-wiki-pages' },
                ]
            },
            {
                name: 'Archives',
                icon: 'archive',
                projects: [
                    { name: 'Miscellaneous', directory: 'All of it Anything Everything At Once' },
                    { name: 'Recovery Items', directory: 'Recovery Sorting & Archive' },
                ]
            }
        ];
        
        // Build the UI
        categories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'category-section';
            
            const heading = document.createElement('h3');
            heading.innerHTML = `<i class="fas fa-${category.icon}"></i> ${category.name}`;
            section.appendChild(heading);
            
            const projectList = document.createElement('ul');
            projectList.className = 'project-list';
            
            category.projects.forEach(project => {
                const item = document.createElement('li');
                item.innerHTML = `<a href="#" data-directory="${project.directory}">${project.name}</a>`;
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    fetchNotebookFiles(project.directory);
                    currentDirectory = project.directory;
                    
                    // Update visual selection
                    document.querySelectorAll('.project-list li a').forEach(a => a.classList.remove('active'));
                    e.target.classList.add('active');
                });
                projectList.appendChild(item);
            });
            
            section.appendChild(projectList);
            categoryContainer.appendChild(section);
        });
        
        // Add to sidebar
        sidebarContent.insertBefore(categoryContainer, directorySelect);
    }
}
```

### 2. Project Landing Pages

Create a "main" page for each project that serves as an entry point:

```javascript
function createProjectLandingPage(projectName, directoryName) {
    // HTML structure for a project landing page
    const content = `
    <div class="project-landing">
        <h1>${projectName}</h1>
        <div class="project-description">
            <p>This is the main page for ${projectName}. Select a document from the list or use the links below to navigate.</p>
        </div>
        
        <div class="project-links">
            <h2>Key Documents</h2>
            <ul id="key-documents">
                <li><i class="fas fa-spinner fa-spin"></i> Loading important documents...</li>
            </ul>
        </div>
        
        <div class="project-metadata">
            <h2>Project Information</h2>
            <div id="project-metadata">
                <i class="fas fa-spinner fa-spin"></i> Loading project metadata...
            </div>
        </div>
    </div>
    `;
    
    // Display the landing page
    const contentDisplay = document.getElementById('pageContent');
    if (contentDisplay) {
        contentDisplay.innerHTML = content;
        
        // Load the key documents from the directory
        fetch(`${API_BASE_URL}/notebooks/${directoryName}`)
            .then(response => response.json())
            .then(data => {
                const keyDocsList = document.getElementById('key-documents');
                if (keyDocsList && data.files && data.files.length > 0) {
                    // Sort files to prioritize important ones
                    const sortedFiles = data.files.sort((a, b) => {
                        // Prioritize files with these keywords
                        const keywords = ['README', 'GDD', 'Home', 'Overview', 'Design'];
                        
                        // Check if any keyword is in the filename
                        const aScore = keywords.reduce((score, keyword) => 
                            a.toLowerCase().includes(keyword.toLowerCase()) ? score + 1 : score, 0);
                        const bScore = keywords.reduce((score, keyword) => 
                            b.toLowerCase().includes(keyword.toLowerCase()) ? score + 1 : score, 0);
                            
                        return bScore - aScore;
                    });
                    
                    // Display top 5 most important files
                    keyDocsList.innerHTML = '';
                    sortedFiles.slice(0, 5).forEach(file => {
                        const item = document.createElement('li');
                        const fileName = file.replace(/\.txt$/, '');
                        item.innerHTML = `<a href="#" data-file="${fileName}">${fileName}</a>`;
                        item.querySelector('a').addEventListener('click', (e) => {
                            e.preventDefault();
                            fetchNotebookContent(directoryName, fileName);
                        });
                        keyDocsList.appendChild(item);
                    });
                }
            });
            
        // Add placeholder project metadata
        const metadataDiv = document.getElementById('project-metadata');
        if (metadataDiv) {
            metadataDiv.innerHTML = `
                <p><strong>Files:</strong> <span id="file-count">Loading...</span></p>
                <p><strong>Last Updated:</strong> <span id="last-updated">Loading...</span></p>
            `;
            
            // Count files
            fetch(`${API_BASE_URL}/notebooks/${directoryName}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('file-count').textContent = data.files ? data.files.length : 0;
                    
                    // Find most recently modified file
                    if (data.files && data.files.length > 0) {
                        let mostRecent = new Date(0);
                        
                        Promise.all(data.files.map(file => 
                            fetch(`${API_BASE_URL}/notebooks/${directoryName}/${file}/metadata`)
                                .then(response => response.json())
                                .catch(() => ({ modifiedDate: new Date(0) }))
                        )).then(results => {
                            results.forEach(fileData => {
                                if (fileData.modifiedDate) {
                                    const modDate = new Date(fileData.modifiedDate);
                                    if (modDate > mostRecent) {
                                        mostRecent = modDate;
                                    }
                                }
                            });
                            
                            document.getElementById('last-updated').textContent = 
                                mostRecent.getTime() === 0 ? 'Unknown' : mostRecent.toLocaleDateString();
                        });
                    }
                });
        }
    }
}
```

### 3. CSS Styling for Project Categories

```css
/* Project categories styling */
.project-categories {
    margin-top: 15px;
}

.category-section {
    margin-bottom: 20px;
}

.category-section h3 {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee;
    color: #444;
}

.category-section h3 i {
    margin-right: 8px;
    color: #14418B;
}

.project-list {
    list-style: none;
    padding: 0;
    margin: 0 0 0 10px;
}

.project-list li {
    margin: 5px 0;
}

.project-list li a {
    display: block;
    padding: 6px 10px;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.project-list li a:hover {
    background-color: #f0f0f0;
}

.project-list li a.active {
    background-color: #14418B;
    color: white;
}

/* Project landing page styling */
.project-landing {
    padding: 20px;
}

.project-landing h1 {
    margin-top: 0;
    color: #14418B;
    border-bottom: 2px solid #14418B;
    padding-bottom: 10px;
}

.project-links, .project-metadata {
    margin-top: 30px;
}

.project-links h2, .project-metadata h2 {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

#key-documents {
    list-style: none;
    padding: 0;
}

#key-documents li {
    margin: 8px 0;
}

#key-documents li a {
    display: inline-block;
    padding: 8px 15px;
    background-color: #f7f7f7;
    border-radius: 4px;
    text-decoration: none;
    color: #14418B;
    transition: background-color 0.2s;
    border: 1px solid #e0e0e0;
}

#key-documents li a:hover {
    background-color: #e6e6e6;
}
```

## Implementation Steps

1. Add the new CSS to the existing basic-enhanced.css file
2. Replace the enhanceDirectorySelector function in basic-enhanced.js
3. Add the new createProjectLandingPage function
4. Update fetchNotebookFiles to call createProjectLandingPage when a directory is selected

This redesign creates a more organized view that properly categorizes your projects and makes navigation more intuitive while preserving the existing functionality.