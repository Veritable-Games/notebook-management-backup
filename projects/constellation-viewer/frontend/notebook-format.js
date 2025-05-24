/**
 * Enhanced notebook content formatting for Constellation Viewer
 * Adds better styling and structure to notebook content
 */

/**
 * Format notebook content for display with enhanced styling
 * @param {string} content - The raw notebook content
 * @returns {string} - Formatted HTML content
 */
function formatNotebookContent(content) {
    if (!content) return '';
    
    // Replace newlines with <br>
    let formattedContent = content.replace(/\n/g, '<br>');
    
    // Make URLs clickable with purple styling
    formattedContent = formattedContent.replace(
        /(https?:\/\/[^\s<]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #9c27b0; text-decoration: none; border-bottom: 1px dashed #9c27b0; transition: all 0.2s ease;">$1</a>'
    );
    
    // Format headings - lines that are all caps or have leading # 
    formattedContent = formattedContent.replace(
        /(?:<br>|^)([A-Z][A-Z0-9\s\-_]{5,})(?:<br>|$)/g,
        '<br><h3 class="notebook-heading" style="color: #7b1fa2; border-bottom: 1px solid #e1bee7; padding-bottom: 5px;">$1</h3><br>'
    );
    
    // Format # style headings with purple theme
    formattedContent = formattedContent.replace(
        /(?:<br>|^)#\s+([^\n<]+)(?:<br>|$)/g,
        '<br><h2 class="notebook-heading" style="color: #6a1b9a; border-bottom: 2px solid #e1bee7; padding-bottom: 8px; background-color: rgba(156, 39, 176, 0.05); padding: 8px; border-radius: 4px;">$1</h2><br>'
    );
    
    // Format ## style headings with purple theme
    formattedContent = formattedContent.replace(
        /(?:<br>|^)##\s+([^\n<]+)(?:<br>|$)/g,
        '<br><h3 class="notebook-heading" style="color: #8e24aa; border-left: 3px solid #9c27b0; padding-left: 10px;">$1</h3><br>'
    );
    
    // Highlight code-like sections with a purple tinted background
    formattedContent = formattedContent.replace(
        /`([^`]+)`/g,
        '<code style="background-color: rgba(156, 39, 176, 0.05); padding: 2px 5px; border-radius: 3px; color: #4a148c; font-family: monospace;">$1</code>'
    );
    
    // Add some styling for bullet lists with purple bullets
    formattedContent = formattedContent.replace(
        /(?:<br>|^)\s*[-*]\s+([^\n<]+)(?:<br>|$)/g,
        '<br><span class="notebook-list-item" style="display: block; margin-left: 20px; position: relative;"><span style="color: #9c27b0; position: absolute; left: -15px;">•</span> $1</span><br>'
    );
    
    // Add some styling for numeric lists with purple numbers
    formattedContent = formattedContent.replace(
        /(?:<br>|^)\s*(\d+)\.\s+([^\n<]+)(?:<br>|$)/g,
        '<br><span class="notebook-list-item" style="display: block; margin-left: 20px; position: relative;"><span style="color: #9c27b0; position: absolute; left: -20px; font-weight: bold;">$1.</span> $2</span><br>'
    );
    
    // Add a subtle highlight for important text (words in ALL CAPS that are at least 3 letters)
    formattedContent = formattedContent.replace(
        /\b([A-Z]{3,})\b/g,
        '<span style="color: #7b1fa2; font-weight: 500;">$1</span>'
    );
    
    return formattedContent;
}

/**
 * Add file type classes to notebook file items for proper icon display
 * @param {HTMLElement} fileItem - The file item element
 * @param {string} fileName - The file name
 */
function addFileTypeClasses(fileItem, fileName) {
    if (!fileItem || !fileName) return;
    
    // Clear existing file type classes
    fileItem.classList.remove('directory', 'markdown', 'text', 'code', 'image');
    
    // Add appropriate class based on file extension
    if (fileName.endsWith('/')) {
        fileItem.classList.add('directory');
    } else if (fileName.endsWith('.md')) {
        fileItem.classList.add('markdown');
    } else if (fileName.endsWith('.txt')) {
        fileItem.classList.add('text');
    } else if (fileName.match(/\.(js|py|java|c|cpp|cs|html|css|json)$/i)) {
        fileItem.classList.add('code');
    } else if (fileName.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
        fileItem.classList.add('image');
    }
}

/**
 * Filter notebook files based on search input
 * @param {string} searchTerm - The search term
 * @param {Array<string>} files - Array of file names
 * @param {HTMLElement} container - Container to append file items to
 * @param {Function} onFileSelect - Callback function when a file is selected
 * @returns {number} - Number of matching files
 */
function filterNotebookFiles(searchTerm, files, container, onFileSelect) {
    if (!files || !files.length || !container) return 0;
    
    // Clear container
    container.innerHTML = '';
    
    // Filter files if search term is provided
    const filteredFiles = searchTerm 
        ? files.filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()))
        : files;
    
    if (filteredFiles.length === 0) {
        container.innerHTML = '<div class="notebook-empty">No matching files found</div>';
        return 0;
    }
    
    // Create file items for each filtered file
    filteredFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.setAttribute('data-filename', file);
        
        // Add file type classes
        addFileTypeClasses(fileItem, file);
        
        // Highlight search term if provided
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
            fileItem.innerHTML = file.replace(regex, '<mark>$1</mark>');
        } else {
            fileItem.textContent = file;
        }
        
        // Add click handler
        if (typeof onFileSelect === 'function') {
            fileItem.addEventListener('click', () => onFileSelect(file));
        }
        
        container.appendChild(fileItem);
    });
    
    return filteredFiles.length;
}

// Export functions if module exports are supported
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatNotebookContent,
        addFileTypeClasses,
        filterNotebookFiles
    };
}