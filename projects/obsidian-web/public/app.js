/**
 * Obsidian Web
 * A web interface for your Obsidian vault
 */

// Configuration
const API_BASE_URL = '/api';
const DEFAULT_FOLDER = '';

// State
let appState = {
  theme: localStorage.getItem('theme') || 'light',
  currentNotePath: '',
  currentFolder: '',
  notes: [],
  tags: [],
  isEditMode: false,
  editor: null,
  graphInstance: null,
  searchQuery: ''
};

// Elements
const elements = {
  // Sidebar
  sidebar: document.getElementById('sidebar'),
  themeToggle: document.getElementById('theme-toggle'),
  searchInput: document.getElementById('search-input'),
  searchBtn: document.getElementById('search-btn'),
  notesTree: document.getElementById('notes-tree'),
  tagsList: document.getElementById('tags-list'),
  newNoteBtn: document.getElementById('new-note-btn'),
  newFolderBtn: document.getElementById('new-folder-btn'),
  refreshNotesBtn: document.getElementById('refresh-notes-btn'),
  
  // Content
  mainContent: document.getElementById('main-content'),
  breadcrumb: document.getElementById('breadcrumb'),
  welcomeContainer: document.getElementById('welcome-container'),
  viewContainer: document.getElementById('view-container'),
  editContainer: document.getElementById('edit-container'),
  searchContainer: document.getElementById('search-container'),
  
  // Note view
  noteTitle: document.getElementById('note-title'),
  noteTags: document.getElementById('note-tags'),
  noteContent: document.getElementById('note-content'),
  backlinksContainer: document.getElementById('backlinks-container'),
  backlinksList: document.getElementById('backlinks-list'),
  
  // Edit view
  editTitle: document.getElementById('edit-title'),
  editTags: document.getElementById('edit-tags'),
  editor: document.getElementById('editor'),
  
  // Toolbar buttons
  editBtn: document.getElementById('edit-btn'),
  saveBtn: document.getElementById('save-btn'),
  cancelBtn: document.getElementById('cancel-btn'),
  deleteBtn: document.getElementById('delete-btn'),
  
  // Search
  searchQuery: document.getElementById('search-query'),
  searchResults: document.getElementById('search-results'),
  
  // Modals
  newNoteModal: new bootstrap.Modal(document.getElementById('new-note-modal')),
  newNoteForm: document.getElementById('new-note-form'),
  newNoteTitle: document.getElementById('new-note-title'),
  newNoteFolder: document.getElementById('new-note-folder'),
  newNoteTags: document.getElementById('new-note-tags'),
  createNoteBtn: document.getElementById('create-note-btn'),
  
  newFolderModal: new bootstrap.Modal(document.getElementById('new-folder-modal')),
  newFolderForm: document.getElementById('new-folder-form'),
  newFolderName: document.getElementById('new-folder-name'),
  newFolderParent: document.getElementById('new-folder-parent'),
  createFolderBtn: document.getElementById('create-folder-btn'),
  
  deleteConfirmModal: new bootstrap.Modal(document.getElementById('delete-confirm-modal')),
  deleteNoteName: document.getElementById('delete-note-name'),
  confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
  
  notificationToast: new bootstrap.Toast(document.getElementById('notification-toast')),
  toastTitle: document.getElementById('toast-title'),
  toastMessage: document.getElementById('toast-message')
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Apply theme
  applyTheme();
  
  // Load notes tree
  loadNotes();
  
  // Load tags
  loadTags();
  
  // Setup graph
  setupGraph();
  
  // Setup event listeners
  setupEventListeners();
  
  // Check for direct note path in URL
  checkUrlForNote();
});

// Function to apply theme
function applyTheme() {
  if (appState.theme === 'dark') {
    document.body.classList.add('theme-dark');
    elements.themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
  } else {
    document.body.classList.remove('theme-dark');
    elements.themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
  }
}

// Function to toggle theme
function toggleTheme() {
  appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', appState.theme);
  applyTheme();
  
  // Update graph theme if it exists
  if (appState.graphInstance) {
    updateGraphTheme();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Theme toggle
  elements.themeToggle.addEventListener('click', toggleTheme);
  
  // Search
  elements.searchBtn.addEventListener('click', () => {
    const query = elements.searchInput.value.trim();
    if (query) {
      searchNotes(query);
    }
  });
  
  elements.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = elements.searchInput.value.trim();
      if (query) {
        searchNotes(query);
      }
    }
  });
  
  // Toolbar buttons
  elements.editBtn.addEventListener('click', enterEditMode);
  elements.saveBtn.addEventListener('click', saveNote);
  elements.cancelBtn.addEventListener('click', exitEditMode);
  elements.deleteBtn.addEventListener('click', showDeleteConfirmation);
  
  // New note/folder buttons
  elements.newNoteBtn.addEventListener('click', () => {
    populateFolderDropdown(elements.newNoteFolder, appState.notes);
    elements.newNoteTitle.value = '';
    elements.newNoteTags.value = '';
    elements.newNoteModal.show();
  });
  
  elements.newFolderBtn.addEventListener('click', () => {
    populateFolderDropdown(elements.newFolderParent, appState.notes);
    elements.newFolderName.value = '';
    elements.newFolderModal.show();
  });
  
  elements.refreshNotesBtn.addEventListener('click', loadNotes);
  
  // Create note/folder buttons
  elements.createNoteBtn.addEventListener('click', createNewNote);
  elements.createFolderBtn.addEventListener('click', createNewFolder);
  
  // Delete confirmation
  elements.confirmDeleteBtn.addEventListener('click', deleteCurrentNote);
}

// Check URL for note path
function checkUrlForNote() {
  const urlParams = new URLSearchParams(window.location.search);
  const notePath = urlParams.get('note');
  
  if (notePath) {
    loadNote(notePath);
  }
}

// Load all notes
async function loadNotes() {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    const data = await response.json();
    
    appState.notes = data.notes;
    renderNotesTree(data.notes);
  } catch (error) {
    console.error('Error loading notes:', error);
    showNotification('error', 'Error', 'Failed to load notes');
  }
}

// Render the notes tree
function renderNotesTree(notes) {
  elements.notesTree.innerHTML = '';
  
  // Sort notes: folders first, then alphabetically
  notes.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
  
  // Create tree items
  notes.forEach(item => {
    if (item.type === 'folder') {
      const folderItem = document.createElement('div');
      folderItem.className = 'folder-item';
      
      const folderToggle = document.createElement('div');
      folderToggle.className = 'folder-toggle';
      folderToggle.innerHTML = `<i class="bi bi-chevron-down"></i> <i class="bi bi-folder"></i> ${item.name}`;
      
      const folderContent = document.createElement('div');
      folderContent.className = 'folder-content';
      
      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          if (child.type === 'note') {
            const noteElement = createNoteItem(child);
            folderContent.appendChild(noteElement);
          }
        });
      }
      
      folderToggle.addEventListener('click', () => {
        folderToggle.classList.toggle('collapsed');
        folderContent.style.display = folderToggle.classList.contains('collapsed') ? 'none' : 'block';
      });
      
      folderItem.appendChild(folderToggle);
      folderItem.appendChild(folderContent);
      elements.notesTree.appendChild(folderItem);
    } else {
      const noteElement = createNoteItem(item);
      elements.notesTree.appendChild(noteElement);
    }
  });
}

// Create a note item element
function createNoteItem(note) {
  const noteItem = document.createElement('div');
  noteItem.className = 'note-item';
  noteItem.dataset.path = note.path;
  noteItem.innerHTML = `<i class="bi bi-file-text"></i> ${note.name}`;
  
  noteItem.addEventListener('click', () => {
    loadNote(note.path);
  });
  
  return noteItem;
}

// Load all tags
async function loadTags() {
  try {
    const response = await fetch(`${API_BASE_URL}/tags`);
    const data = await response.json();
    
    appState.tags = data.tags;
    renderTagsList(data.tags);
  } catch (error) {
    console.error('Error loading tags:', error);
    showNotification('error', 'Error', 'Failed to load tags');
  }
}

// Render the tags list
function renderTagsList(tags) {
  elements.tagsList.innerHTML = '';
  
  // Sort tags by count (descending)
  tags.sort((a, b) => b.count - a.count);
  
  tags.forEach(tag => {
    const tagItem = document.createElement('div');
    tagItem.className = 'tag-item';
    tagItem.innerHTML = `
      <span class="tag-name">#${tag.name}</span>
      <span class="tag-count">${tag.count}</span>
    `;
    
    tagItem.addEventListener('click', () => {
      searchByTag(tag.name);
    });
    
    elements.tagsList.appendChild(tagItem);
  });
}

// Set up the graph visualization
function setupGraph() {
  const graphTab = document.getElementById('graph-tab');
  
  graphTab.addEventListener('shown.bs.tab', () => {
    if (!appState.graphInstance) {
      loadGraphData();
    }
  });
}

// Load graph data
async function loadGraphData() {
  try {
    const response = await fetch(`${API_BASE_URL}/graph`);
    const data = await response.json();
    
    renderGraph(data);
  } catch (error) {
    console.error('Error loading graph data:', error);
    document.getElementById('graph-visualization').innerHTML = 'Failed to load graph data';
  }
}

// Render the graph
function renderGraph(data) {
  const graphContainer = document.getElementById('graph-visualization');
  
  // Create groups based on folders
  const groups = [...new Set(data.nodes.map(node => node.group))];
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(groups);
  
  appState.graphInstance = ForceGraph()(graphContainer)
    .graphData(data)
    .nodeId('id')
    .nodeVal('size')
    .nodeLabel('label')
    .nodeColor(node => colorScale(node.group))
    .linkColor(() => appState.theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
    .linkWidth(1)
    .onNodeClick(node => {
      loadNote(node.id);
    });
  
  updateGraphTheme();
}

// Update graph theme
function updateGraphTheme() {
  if (appState.graphInstance) {
    appState.graphInstance
      .backgroundColor(appState.theme === 'dark' ? '#1e293b' : '#f8fafc')
      .linkColor(() => appState.theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)')
      .nodeColor(node => {
        const groups = [...new Set(appState.graphInstance.graphData().nodes.map(n => n.group))];
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(groups);
        return colorScale(node.group);
      });
  }
}

// Load a specific note
async function loadNote(notePath) {
  try {
    // Update URL without reloading the page
    window.history.pushState({}, '', `?note=${encodeURIComponent(notePath)}`);
    
    // Set current note path
    appState.currentNotePath = notePath;
    
    // Clear search
    elements.searchInput.value = '';
    
    // Show view container, hide others
    elements.welcomeContainer.style.display = 'none';
    elements.viewContainer.style.display = 'block';
    elements.editContainer.style.display = 'none';
    elements.searchContainer.style.display = 'none';
    
    // Highlight current note in the tree
    highlightCurrentNote(notePath);
    
    // Show buttons
    elements.editBtn.style.display = 'inline-block';
    elements.deleteBtn.style.display = 'inline-block';
    elements.saveBtn.style.display = 'none';
    elements.cancelBtn.style.display = 'none';
    
    // Fetch note data
    const response = await fetch(`${API_BASE_URL}/notes/${notePath}`);
    
    if (!response.ok) {
      throw new Error('Note not found');
    }
    
    const note = await response.json();
    
    // Update breadcrumb
    updateBreadcrumb(notePath);
    
    // Set title
    elements.noteTitle.textContent = note.title;
    
    // Set tags
    elements.noteTags.innerHTML = '';
    if (note.frontmatter && note.frontmatter.tags && note.frontmatter.tags.length > 0) {
      note.frontmatter.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = '#' + tag;
        tagElement.addEventListener('click', () => {
          searchByTag(tag);
        });
        elements.noteTags.appendChild(tagElement);
      });
    }
    
    // Set HTML content
    elements.noteContent.innerHTML = note.html;
    
    // Process internal links
    processWikiLinks();
    
    // Load backlinks
    loadBacklinks(notePath);
    
    // Highlight code blocks
    setTimeout(() => {
      Prism.highlightAll();
    }, 10);
  } catch (error) {
    console.error(`Error loading note ${notePath}:`, error);
    showNotification('error', 'Error', 'Failed to load note');
  }
}

// Process wiki links in content
function processWikiLinks() {
  const links = elements.noteContent.querySelectorAll('a[href^="/"]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    const notePath = href.substring(1); // Remove leading '/'
    
    link.classList.add('internal-link');
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadNote(notePath);
    });
  });
}

// Load backlinks for a note
async function loadBacklinks(notePath) {
  try {
    const response = await fetch(`${API_BASE_URL}/backlinks/${notePath}`);
    const data = await response.json();
    
    elements.backlinksList.innerHTML = '';
    
    if (data.backlinks.length === 0) {
      elements.backlinksContainer.style.display = 'none';
      return;
    }
    
    elements.backlinksContainer.style.display = 'block';
    
    data.backlinks.forEach(backlink => {
      const backlinkItem = document.createElement('div');
      backlinkItem.className = 'backlink-item';
      
      // Highlight the backlink context
      const highlightedContext = backlink.context.replace(/\[\[([^\]]+)\]\]/g, (match, link) => {
        const parts = link.split('|');
        const actualLink = parts[0].trim();
        const displayText = parts.length > 1 ? parts[1].trim() : actualLink;
        
        if (actualLink === appState.currentNotePath || actualLink === path.basename(appState.currentNotePath)) {
          return `<span class="backlink-highlight">${displayText}</span>`;
        }
        return match;
      });
      
      backlinkItem.innerHTML = `
        <span class="backlink-title">${backlink.sourceTitle}</span>
        <div class="backlink-context">${highlightedContext}</div>
      `;
      
      backlinkItem.querySelector('.backlink-title').addEventListener('click', () => {
        loadNote(backlink.source);
      });
      
      elements.backlinksList.appendChild(backlinkItem);
    });
  } catch (error) {
    console.error(`Error loading backlinks for ${notePath}:`, error);
    elements.backlinksContainer.style.display = 'none';
  }
}

// Highlight the current note in the tree
function highlightCurrentNote(notePath) {
  // Remove active class from all notes
  document.querySelectorAll('.note-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to current note
  const currentNote = document.querySelector(`.note-item[data-path="${notePath}"]`);
  
  if (currentNote) {
    currentNote.classList.add('active');
    
    // Make sure parent folder is expanded
    const parentFolder = currentNote.closest('.folder-content');
    if (parentFolder) {
      parentFolder.style.display = 'block';
      const folderToggle = parentFolder.previousElementSibling;
      folderToggle.classList.remove('collapsed');
    }
    
    // Scroll into view
    currentNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Update breadcrumb
function updateBreadcrumb(notePath) {
  elements.breadcrumb.innerHTML = '<li class="breadcrumb-item"><a href="#">Home</a></li>';
  
  const parts = notePath.split('/');
  let currentPath = '';
  
  // Add each part to the breadcrumb
  parts.forEach((part, index) => {
    currentPath += (index > 0 ? '/' : '') + part;
    
    // Create breadcrumb item
    const breadcrumbItem = document.createElement('li');
    breadcrumbItem.className = 'breadcrumb-item';
    
    if (index === parts.length - 1) {
      // Last part (current note)
      breadcrumbItem.classList.add('active');
      breadcrumbItem.textContent = part;
    } else {
      // Directory part
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = part;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        appState.currentFolder = currentPath;
        // TODO: Navigate to folder view
      });
      
      breadcrumbItem.appendChild(link);
    }
    
    elements.breadcrumb.appendChild(breadcrumbItem);
  });
}

// Enter edit mode
function enterEditMode() {
  // Show edit container, hide others
  elements.welcomeContainer.style.display = 'none';
  elements.viewContainer.style.display = 'none';
  elements.editContainer.style.display = 'block';
  elements.searchContainer.style.display = 'none';
  
  // Update toolbar buttons
  elements.editBtn.style.display = 'none';
  elements.deleteBtn.style.display = 'none';
  elements.saveBtn.style.display = 'inline-block';
  elements.cancelBtn.style.display = 'inline-block';
  
  // Set edit mode
  appState.isEditMode = true;
  
  // Fetch note data for editing
  fetch(`${API_BASE_URL}/notes/${appState.currentNotePath}`)
    .then(response => response.json())
    .then(note => {
      // Set title
      elements.editTitle.value = note.title;
      
      // Set tags
      if (note.frontmatter && note.frontmatter.tags) {
        elements.editTags.value = note.frontmatter.tags.join(', ');
      } else {
        elements.editTags.value = '';
      }
      
      // Initialize editor if not already
      if (!appState.editor) {
        appState.editor = new EasyMDE({
          element: elements.editor,
          autofocus: true,
          spellChecker: true,
          autosave: {
            enabled: true,
            uniqueId: 'obsidian-web-editor',
            delay: 1000
          },
          toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', 'code', 'table', '|',
            'preview', 'side-by-side', 'fullscreen'
          ]
        });
      }
      
      // Set editor content
      appState.editor.value(note.content);
    })
    .catch(error => {
      console.error(`Error loading note for editing: ${error}`);
      showNotification('error', 'Error', 'Failed to load note for editing');
      exitEditMode();
    });
}

// Exit edit mode
function exitEditMode() {
  // Restore view
  loadNote(appState.currentNotePath);
  
  // Set edit mode
  appState.isEditMode = false;
}

// Save the current note
function saveNote() {
  // Get note data from form
  const title = elements.editTitle.value.trim();
  const tagsString = elements.editTags.value.trim();
  const content = appState.editor.value();
  
  // Validate title
  if (!title) {
    showNotification('warning', 'Validation Error', 'Note title is required');
    return;
  }
  
  // Prepare tags
  const tags = tagsString
    ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];
  
  // Prepare frontmatter
  const frontmatter = {
    tags: tags
  };
  
  // Save note
  fetch(`${API_BASE_URL}/notes/${appState.currentNotePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: content,
      frontmatter: frontmatter
    })
  })
    .then(response => response.json())
    .then(data => {
      showNotification('success', 'Success', 'Note saved successfully');
      loadNote(appState.currentNotePath);
      
      // Reload tags list
      loadTags();
    })
    .catch(error => {
      console.error(`Error saving note: ${error}`);
      showNotification('error', 'Error', 'Failed to save note');
    });
}

// Show delete confirmation modal
function showDeleteConfirmation() {
  elements.deleteNoteName.textContent = path.basename(appState.currentNotePath);
  elements.deleteConfirmModal.show();
}

// Delete the current note
function deleteCurrentNote() {
  fetch(`${API_BASE_URL}/notes/${appState.currentNotePath}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      elements.deleteConfirmModal.hide();
      showNotification('success', 'Success', 'Note deleted successfully');
      
      // Go back to welcome page
      elements.welcomeContainer.style.display = 'block';
      elements.viewContainer.style.display = 'none';
      elements.editContainer.style.display = 'none';
      elements.searchContainer.style.display = 'none';
      
      // Clear current note
      appState.currentNotePath = '';
      
      // Hide buttons
      elements.editBtn.style.display = 'none';
      elements.deleteBtn.style.display = 'none';
      elements.saveBtn.style.display = 'none';
      elements.cancelBtn.style.display = 'none';
      
      // Update breadcrumb
      elements.breadcrumb.innerHTML = '<li class="breadcrumb-item"><a href="#">Home</a></li>';
      
      // Reload notes
      loadNotes();
      
      // Reload tags
      loadTags();
    })
    .catch(error => {
      console.error(`Error deleting note: ${error}`);
      showNotification('error', 'Error', 'Failed to delete note');
      elements.deleteConfirmModal.hide();
    });
}

// Create a new note
function createNewNote() {
  // Get data from form
  const title = elements.newNoteTitle.value.trim();
  const folder = elements.newNoteFolder.value;
  const tagsString = elements.newNoteTags.value.trim();
  
  // Validate
  if (!title) {
    showNotification('warning', 'Validation Error', 'Note title is required');
    return;
  }
  
  // Prepare tags
  const tags = tagsString
    ? tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    : [];
  
  // Create note path
  const notePath = folder ? `${folder}/${title}` : title;
  
  // Create note content with frontmatter
  const frontmatter = {
    tags: tags
  };
  
  // Create note
  fetch(`${API_BASE_URL}/notes/${notePath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: `# ${title}\n\nNew note content.`,
      frontmatter: frontmatter
    })
  })
    .then(response => response.json())
    .then(data => {
      elements.newNoteModal.hide();
      showNotification('success', 'Success', 'Note created successfully');
      
      // Reload notes
      loadNotes().then(() => {
        // Load the new note
        loadNote(notePath);
      });
      
      // Reload tags if there were any
      if (tags.length > 0) {
        loadTags();
      }
    })
    .catch(error => {
      console.error(`Error creating note: ${error}`);
      showNotification('error', 'Error', 'Failed to create note');
    });
}

// Create a new folder
function createNewFolder() {
  // Get data from form
  const folderName = elements.newFolderName.value.trim();
  const parentFolder = elements.newFolderParent.value;
  
  // Validate
  if (!folderName) {
    showNotification('warning', 'Validation Error', 'Folder name is required');
    return;
  }
  
  // Create folder path
  const folderPath = parentFolder ? `${parentFolder}/${folderName}` : folderName;
  
  // Create a placeholder note to establish the folder
  fetch(`${API_BASE_URL}/notes/${folderPath}/.folder_info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: `# ${folderName}\n\nFolder information.`,
      frontmatter: { tags: ['folder_info'] }
    })
  })
    .then(response => response.json())
    .then(data => {
      elements.newFolderModal.hide();
      showNotification('success', 'Success', 'Folder created successfully');
      
      // Reload notes
      loadNotes();
    })
    .catch(error => {
      console.error(`Error creating folder: ${error}`);
      showNotification('error', 'Error', 'Failed to create folder');
    });
}

// Populate folder dropdown
function populateFolderDropdown(select, notes, path = '') {
  // Clear existing options except for the root option
  while (select.options.length > 1) {
    select.remove(1);
  }
  
  // Find all folders
  const folders = [];
  
  function findFolders(items, currentPath) {
    items.forEach(item => {
      if (item.type === 'folder') {
        const folderPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        folders.push({ name: item.name, path: folderPath });
        
        if (item.children) {
          findFolders(item.children, folderPath);
        }
      }
    });
  }
  
  findFolders(notes, '');
  
  // Sort folders alphabetically
  folders.sort((a, b) => a.path.localeCompare(b.path));
  
  // Add folder options
  folders.forEach(folder => {
    const option = document.createElement('option');
    option.value = folder.path;
    option.textContent = folder.path;
    select.appendChild(option);
  });
  
  // Set default selection
  select.value = path;
}

// Search notes
function searchNotes(query) {
  // Update state
  appState.searchQuery = query;
  
  // Show search container, hide others
  elements.welcomeContainer.style.display = 'none';
  elements.viewContainer.style.display = 'none';
  elements.editContainer.style.display = 'none';
  elements.searchContainer.style.display = 'block';
  
  // Hide action buttons
  elements.editBtn.style.display = 'none';
  elements.deleteBtn.style.display = 'none';
  elements.saveBtn.style.display = 'none';
  elements.cancelBtn.style.display = 'none';
  
  // Update UI
  elements.searchQuery.textContent = query;
  elements.searchResults.innerHTML = '<div class="loading">Searching...</div>';
  
  // Update breadcrumb
  elements.breadcrumb.innerHTML = `
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active">Search: ${query}</li>
  `;
  
  // Perform search
  fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      renderSearchResults(data);
    })
    .catch(error => {
      console.error(`Error searching: ${error}`);
      elements.searchResults.innerHTML = '<div class="error">Failed to search notes</div>';
    });
}

// Search by tag
function searchByTag(tag) {
  searchNotes(`#${tag}`);
}

// Render search results
function renderSearchResults(data) {
  const { results, query } = data;
  
  if (results.length === 0) {
    elements.searchResults.innerHTML = `<div class="no-results">No results found for "${query}"</div>`;
    return;
  }
  
  elements.searchResults.innerHTML = '';
  
  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.className = 'search-result';
    
    let tagsHtml = '';
    if (result.tags && result.tags.length > 0) {
      tagsHtml = `
        <div class="search-result-tags">
          ${result.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      `;
    }
    
    resultElement.innerHTML = `
      <div class="search-result-title">${result.title}</div>
      <div class="search-result-path">${result.path}</div>
      <div class="search-result-excerpt">${highlightSearch(result.excerpt, query)}</div>
      ${tagsHtml}
    `;
    
    resultElement.addEventListener('click', () => {
      loadNote(result.path);
    });
    
    elements.searchResults.appendChild(resultElement);
  });
}

// Highlight search terms in text
function highlightSearch(text, query) {
  // Remove # for tag searches
  const searchTerm = query.startsWith('#') ? query.substring(1) : query;
  
  return text.replace(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'), '<mark>$1</mark>');
}

// Escape special characters for RegExp
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Path utilities
const path = {
  basename(path) {
    return path.split('/').pop();
  },
  
  dirname(path) {
    const parts = path.split('/');
    parts.pop();
    return parts.join('/');
  },
  
  join(...parts) {
    return parts.filter(part => part !== '').join('/');
  }
};

// Show notification
function showNotification(type, title, message) {
  elements.toastTitle.textContent = title;
  elements.toastMessage.textContent = message;
  
  const toast = document.getElementById('notification-toast');
  toast.className = `toast ${type}`;
  
  elements.notificationToast.show();
}