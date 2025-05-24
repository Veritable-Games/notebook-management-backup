// Simple Notebook browser that doesn't depend on Three.js
export function setupNotebookBrowser(API_BASE_URL) {
    const directorySelect = document.getElementById('notebook-directory');
    const filesContainer = document.getElementById('notebook-files');
    
    if (!directorySelect || !filesContainer) {
        console.error('Notebook browser elements not found');
        return;
    }
    
    console.log('Setting up notebook browser with API URL:', API_BASE_URL);
    
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
            } else {
                console.log('No directories found');
                directorySelect.innerHTML = '<option value="">No directories found</option>';
            }
        })
        .catch(error => {
            console.error('Failed to load notebook directories:', error);
            directorySelect.innerHTML = '<option value="">Error loading directories</option>';
        });
    
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
                .catch(error => {
                    console.error('Failed to load notebook files:', error);
                    filesContainer.innerHTML = '<p>Error loading files</p>';
                });
        }
    });
}

// Function to display notebook content
function showNotebookContent(directory, file, API_BASE_URL) {
    fetch(`${API_BASE_URL}/notebooks/${directory}/${file}`)
        .then(response => response.text())
        .then(content => {
            // Create a simple dialog to show content
            const dialog = document.createElement('div');
            dialog.style.position = 'fixed';
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.backgroundColor = 'white';
            dialog.style.padding = '20px';
            dialog.style.borderRadius = '5px';
            dialog.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
            dialog.style.maxWidth = '80%';
            dialog.style.maxHeight = '80%';
            dialog.style.overflow = 'auto';
            dialog.style.zIndex = '1000';
            
            const closeBtn = document.createElement('button');
            closeBtn.textContent = 'Close';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '10px';
            closeBtn.style.backgroundColor = '#14418B';
            closeBtn.style.color = 'white';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '5px';
            closeBtn.style.padding = '5px 10px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.addEventListener('click', () => document.body.removeChild(dialog));
            
            const title = document.createElement('h2');
            title.textContent = file;
            
            const contentDiv = document.createElement('pre');
            contentDiv.style.whiteSpace = 'pre-wrap';
            contentDiv.style.overflow = 'auto';
            contentDiv.textContent = content;
            
            dialog.appendChild(closeBtn);
            dialog.appendChild(title);
            dialog.appendChild(contentDiv);
            
            document.body.appendChild(dialog);
        })
        .catch(error => console.error('Failed to load notebook content:', error));
}