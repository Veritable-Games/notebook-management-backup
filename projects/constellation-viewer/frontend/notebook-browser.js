// Notebook browser functionality
export function setupNotebookBrowser(API_BASE_URL) {
    const directorySelect = document.getElementById('notebook-directory');
    const filesContainer = document.getElementById('notebook-files');
    
    if (!directorySelect || !filesContainer) {
        console.error('Notebook browser elements not found');
        return;
    }
    
    // Load notebook directories
    fetch(`${API_BASE_URL}/notebooks`)
        .then(response => response.json())
        .then(data => {
            console.log('Loaded notebook directories:', data);
            if (data.directories && data.directories.length > 0) {
                // Add options for each directory
                data.directories.forEach(dir => {
                    const option = document.createElement('option');
                    option.value = dir;
                    option.textContent = dir;
                    directorySelect.appendChild(option);
                });
                
                // Enable the select element
                directorySelect.disabled = false;
            }
        })
        .catch(error => console.error('Failed to load notebook directories:', error));
    
    // Directory selection change event
    directorySelect.addEventListener('change', () => {
        const selectedDir = directorySelect.value;
        filesContainer.innerHTML = '';
        
        if (selectedDir) {
            // Fetch files in the selected directory
            fetch(`${API_BASE_URL}/notebooks/${selectedDir}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Loaded notebook files:', data);
                    if (data.files && data.files.length > 0) {
                        // Add each file as a clickable item
                        data.files.forEach(file => {
                            const fileElem = document.createElement('div');
                            fileElem.className = 'notebook-file';
                            fileElem.textContent = file;
                            fileElem.addEventListener('click', () => showNotebookContent(selectedDir, file, API_BASE_URL));
                            filesContainer.appendChild(fileElem);
                        });
                    } else {
                        filesContainer.innerHTML = '<p>No text files found</p>';
                    }
                })
                .catch(error => console.error('Failed to load notebook files:', error));
        }
    });
}

// Function to display notebook content
function showNotebookContent(directory, file, API_BASE_URL) {
    fetch(`${API_BASE_URL}/notebooks/${directory}/${file}`)
        .then(response => response.text())
        .then(content => {
            // Format content as HTML
            const formattedContent = formatNotebookContent(content);
            
            // Show in info container
            const infoContainer = document.getElementById('infoContainer');
            const pageContent = document.getElementById('pageContent');
            
            if (infoContainer && pageContent) {
                pageContent.innerHTML = `
                    <h2>${file}</h2>
                    <div class="notebook-content">${formattedContent}</div>
                    <button id="add-to-wiki" class="btn">Add to Wiki</button>
                `;
                
                // Add click handler for the "Add to Wiki" button
                document.getElementById('add-to-wiki').addEventListener('click', () => {
                    addNotebookToWiki(directory, file, API_BASE_URL);
                });
                
                infoContainer.style.display = 'block';
            }
        })
        .catch(error => console.error('Failed to load notebook content:', error));
}

// Format notebook content for display
function formatNotebookContent(content) {
    // Replace newlines with <br> tags
    content = content.replace(/\n/g, '<br>');
    
    // Make URLs clickable
    content = content.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank">$1</a>'
    );
    
    return content;
}

// Add notebook content to the wiki
function addNotebookToWiki(directory, file, API_BASE_URL) {
    fetch(`${API_BASE_URL}/notebooks/wiki/${directory}/${file}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(result => {
        alert('Notebook added to wiki constellation!');
        // Reload the page to show updated constellation
        window.location.reload();
    })
    .catch(error => console.error('Failed to add notebook to wiki:', error));
}